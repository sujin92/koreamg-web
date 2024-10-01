import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Qna.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const Qna = () => {
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    email: "",
    contact: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // 상태 업데이트
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/send-email",
        formData
      );
      if (response.status === 200) {
        setSuccess(true);
        alert("문의 내용이 성공적으로 전송되었습니다.");
        setFormData({
          title: "",
          name: "",
          email: "",
          contact: "",
          message: "",
        });
      }
    } catch (error) {
      setError("문의 내용 전송 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newsDatail">
      <Header />
      <div className="container">
        <img src="/assets/images/sub/sub01.jpg" alt="" className="mainImg" />
        <div className="innerTop">
          <div className="subTitle">
            <h2>고객지원</h2>
            <h1>
              일상을 환하게,
              <br />
              공간을 특별하게
            </h1>
          </div>
          <div className="menuNav">
            <FontAwesomeIcon icon={faHouse} className="faHouse" />
            <span>/</span>
            <h2>고객지원</h2>
            <span>/</span>
            <h2>문의하기</h2>
          </div>
        </div>
      </div>
      <div className="menuBar qnaBar">
        <Link to="/news" className="newsMenu">
          <h2>한국미광 소식</h2>
        </Link>
        <Link to="/qna" className="qnaMenu">
          <h2>문의하기</h2>
        </Link>
        <Link to="/company" className="downloadMenu">
          <h2>다운로드</h2>
        </Link>
      </div>

      <div className="contentInner">
        <h1>문의하기</h1>
        <h2>
          문의사항을 남겨주시면 작성하신 이메일로 신속하게 답변을 보내드립니다.
        </h2>
        <div className="callInfo">
          <p>
            <span>TEL</span>070-7784-6679
          </p>
          <p className="bar">|</p>
          <p>
            <span>FAX</span>055-762-6679
          </p>
          <p className="bar">|</p>
          <p>
            <span>E-MAIL</span>osy6679@hanmail.net
          </p>
        </div>
      </div>

      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="제목을 입력하세요"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">담당자명</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="담당자명을 입력하세요"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일을 입력하세요"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact">연락처</label>
            <input
              type="text"
              id="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="연락처를 입력하세요"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">문의내용</label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="문의내용을 작성해 주세요"
              required
            ></textarea>
          </div>
          <button type="submit" className="qnaBtn" disabled={loading}>
            {loading ? "전송 중..." : "문의하기"}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        {success && (
          <p className="success">문의가 성공적으로 전송되었습니다.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Qna;
