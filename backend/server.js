// backend/server.js

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config(); // 환경 변수 사용

const app = express();
const PORT = process.env.PORT || 3000;

// MySQL 연결 설정
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "koreamg_user", // 전용 MySQL 사용자
  password: process.env.DB_PASSWORD || "koad9401", // 사용자의 비밀번호
  database: process.env.DB_NAME || "koreamg_db", // 데이터베이스 이름
});

// MySQL 연결
db.connect((err) => {
  if (err) {
    console.error("MySQL 연결 실패:", err);
    return;
  }
  console.log("MySQL 연결 성공!");
});

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 기본 라우트 (API 테스트)
app.get("/", (req, res) => {
  res.send("서버가 정상적으로 동작합니다.");
});

// 사용자 목록 가져오기 API 엔드포인트
app.get("/api/users", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    if (err) {
      console.error("사용자 데이터를 가져오는 중 오류 발생:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
