import React from "react";
import { Link } from "react-router-dom";
import "./Qna.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const Qna = () => {
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
            <select name="menu" id="menu">
              <option value="news">한국미광 소식</option>
              <option value="qna">문의하기</option>
              <option value="download">다운로드</option>
            </select>
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
      <div class="contact-form">
        <form>
          <div class="form-group">
            <label for="title">제목</label>
            <input type="text" id="title" placeholder="제목을 입력하세요" />
          </div>
          <div class="form-group">
            <label for="name">담당자명</label>
            <input type="text" id="name" placeholder="담당자명을 입력하세요" />
          </div>
          <div class="form-group">
            <label for="email">이메일</label>
            <input type="email" id="email" placeholder="이메일을 입력하세요" />
          </div>
          <div class="form-group">
            <label for="contact">연락처</label>
            <input type="text" id="contact" placeholder="연락처를 입력하세요" />
          </div>
          <div class="form-group">
            <label for="message">문의내용</label>
            <textarea
              id="message"
              placeholder="문의내용을 작성해 주세요"
            ></textarea>
          </div>
          <button type="submit" className="qnaBtn">
            문의하기
          </button>
        </form>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Qna;
