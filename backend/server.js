const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.JWT_SECRET || "koad9401";

// MySQL 설정
const db = mysql.createConnection({
  host: process.env.DB_HOST || "db.hklighting.co.kr",
  user: process.env.DB_USER || "hklighting",
  password: process.env.DB_PASSWORD || "korea75321!",
  database: process.env.DB_NAME || "dbhklighting",
  port: process.env.DB_PORT || 3306,
});

db.connect((err) => {
  if (err) {
    console.error("MySQL 연결 실패:", err);
    return;
  }
  console.log("MySQL 연결 성공!");
});

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 로그인 API
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // 데이터베이스에서 사용자 정보 확인
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (err) return res.status(500).json({ message: "로그인 오류" });
      if (results.length === 0)
        return res.status(401).json({ message: "사용자가 없습니다." });

      const user = results[0];

      // 비밀번호 비교
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res
          .status(401)
          .json({ message: "비밀번호가 일치하지 않습니다." });

      // JWT 토큰 발급
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      res.json({ token });
    }
  );
});

// 인증된 사용자 전용 라우트 (JWT 토큰 검증)
app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "인증된 사용자만 접근 가능합니다." });
});

// JWT 토큰 검증 미들웨어
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "토큰이 없습니다." });

  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
    if (err)
      return res.status(401).json({ message: "토큰이 유효하지 않습니다." });
    req.user = decoded;
    next();
  });
}

// 파일 업로드 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// 게시글 작성 API
app.post(
  "/api/case-write",
  verifyToken,
  upload.single("thumbnail"),
  (req, res) => {
    const { title, content } = req.body;
    const thumbnail = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !content) {
      return res.status(400).json({ message: "제목과 내용을 입력해 주세요." });
    }

    const query =
      "INSERT INTO cases (title, content, thumbnail, user_id, created_at) VALUES (?, ?, ?, ?, NOW())";
    db.query(query, [title, content, thumbnail, 1], (err, result) => {
      if (err) {
        console.error("게시글 저장 중 오류:", err);
        return res
          .status(500)
          .json({ message: "게시글 저장 중 오류가 발생했습니다." });
      }

      res.status(201).json({ message: "게시글이 성공적으로 저장되었습니다." });
    });
  }
);

// 이미지 업로드 API
router.post("/api/upload-image", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "이미지 업로드 실패" });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  return res.json({ url: imageUrl });
});

app.use("/", router);

// 게시글 전체 조회 API
app.get("/api/cases", (req, res) => {
  const query =
    "SELECT id, title, content, thumbnail, user_id, created_at FROM cases ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("게시글 조회 중 오류:", err);
      return res
        .status(500)
        .json({ message: "게시글 조회 중 오류가 발생했습니다." });
    }
    res.json(results);
  });
});

// 게시글 상세 조회 API
app.get("/api/cases/:id", (req, res) => {
  const { id } = req.params;
  const query =
    "SELECT id, title, content, thumbnail, user_id, created_at FROM cases WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("게시글 조회 중 오류:", err);
      return res
        .status(500)
        .json({ message: "게시글 조회 중 오류가 발생했습니다." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    res.json(results[0]);
  });
});

// 게시글 수정 API
app.put(
  "/api/case-edit/:id",
  verifyToken,
  upload.single("thumbnail"),
  (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const thumbnail = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !content) {
      return res.status(400).json({ message: "제목과 내용을 입력해 주세요." });
    }

    // 수정할 게시글 쿼리
    let query =
      "UPDATE cases SET title = ?, content = ?, updated_at = NOW() WHERE id = ?";
    let values = [title, content, id];

    // 썸네일이 새로 업로드되었을 때, 썸네일도 수정
    if (thumbnail) {
      query =
        "UPDATE cases SET title = ?, content = ?, thumbnail = ?, updated_at = NOW() WHERE id = ?";
      values = [title, content, thumbnail, id];
    }

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("게시글 수정 중 오류:", err);
        return res
          .status(500)
          .json({ message: "게시글 수정 중 오류가 발생했습니다." });
      }

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "해당 게시글을 찾을 수 없습니다." });
      }

      res.status(200).json({ message: "게시글이 성공적으로 수정되었습니다." });
    });
  }
);

// 게시글 삭제 API
app.delete("/api/case-delete/:id", verifyToken, (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM cases WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("게시글 삭제 중 오류:", err);
      return res
        .status(500)
        .json({ message: "게시글 삭제 중 오류가 발생했습니다." });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "해당 게시글을 찾을 수 없습니다." });
    }

    res.status(200).json({ message: "게시글이 성공적으로 삭제되었습니다." });
  });
});

// news 게시글 작성
app.post("/api/news-write", verifyToken, (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "제목과 내용을 입력해 주세요." });
  }

  const query =
    "INSERT INTO news (title, content, user_id, created_at) VALUES (?, ?, ?, NOW())";
  db.query(query, [title, content, 1], (err, result) => {
    if (err) {
      console.error("뉴스 게시글 저장 중 오류:", err);
      return res
        .status(500)
        .json({ message: "뉴스 게시글 저장 중 오류가 발생했습니다." });
    }

    res
      .status(201)
      .json({ message: "뉴스 게시글이 성공적으로 저장되었습니다." });
  });
});

// news 게시글 수정
app.put("/api/news-edit/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "제목과 내용을 입력해 주세요." });
  }

  const query =
    "UPDATE news SET title = ?, content = ?, updated_at = NOW() WHERE id = ?";
  db.query(query, [title, content, id], (err, result) => {
    if (err) {
      console.error("뉴스 게시글 수정 중 오류:", err);
      return res
        .status(500)
        .json({ message: "뉴스 게시글 수정 중 오류가 발생했습니다." });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "해당 뉴스 게시글을 찾을 수 없습니다." });
    }

    res
      .status(200)
      .json({ message: "뉴스 게시글이 성공적으로 수정되었습니다." });
  });
});

//news 게시글 조회
app.get("/api/news", (req, res) => {
  const query =
    "SELECT id, title, content, user_id, created_at FROM news ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("뉴스 게시글 조회 중 오류:", err);
      return res
        .status(500)
        .json({ message: "뉴스 게시글 조회 중 오류가 발생했습니다." });
    }
    res.json(results);
  });
});

//news 게시글 상세 조회
app.get("/api/news/:id", (req, res) => {
  const { id } = req.params;
  const query =
    "SELECT id, title, content, user_id, created_at FROM news WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("뉴스 게시글 상세 조회 중 오류:", err);
      return res
        .status(500)
        .json({ message: "뉴스 게시글 상세 조회 중 오류가 발생했습니다." });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "해당 뉴스 게시글을 찾을 수 없습니다." });
    }

    res.json(results[0]);
  });
});

// news 게시글 삭제
app.delete("/api/news-delete/:id", verifyToken, (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM news WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("뉴스 게시글 삭제 중 오류:", err);
      return res
        .status(500)
        .json({ message: "뉴스 게시글 삭제 중 오류가 발생했습니다." });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "해당 뉴스 게시글을 찾을 수 없습니다." });
    }

    res
      .status(200)
      .json({ message: "뉴스 게시글이 성공적으로 삭제되었습니다." });
  });
});

// Nodemailer 설정
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "designkoad@gmail.com",
    pass: "xarl jyzp izit nvje",
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  rateLimit: 10,
});

// 이메일 전송 API (비동기 방식)
app.post("/api/send-email", async (req, res) => {
  const { title, name, email, contact, message } = req.body;

  const mailOptions = {
    from: `"${name}" <designkoad@gmail.com>`,
    to: "recompany@daum.net",
    subject: `[문의] ${title}`,
    text: `담당자명: ${name}\n연락처: ${contact}\n문의 내용:\n${message}`,
    replyTo: email,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return res.status(200).send("이메일 전송 성공");
  } catch (error) {
    console.log("Error occurred: ", error);
    return res.status(500).send("이메일 전송 실패");
  }
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
