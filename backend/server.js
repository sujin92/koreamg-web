const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.JWT_SECRET || "koad9401";

// MySQL 설정
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "koreamg_user",
  password: process.env.DB_PASSWORD || "koad9401",
  database: process.env.DB_NAME || "koreamg_db",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL 연결 실패:", err);
    return;
  }
  console.log("MySQL 연결 성공!");
});

app.use(cors());
app.use(express.json());

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
        { id: user.id, username: user.username },
        SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      res.json({ token });
    }
  );
});

// 사용자 등록
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "등록 오류" });
      }
      res.status(201).json({ message: "사용자 등록 성공" });
    }
  );
});

// 사용자 로그인
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // 사용자 정보 확인
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
        { id: user.id, username: user.username },
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

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
