import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="/assets/images/logoWhite.png" alt="회사 로고" />
        </div>
        <div className="footer-links">
          <h3>
            <Link to="/qna">문의하기</Link>
          </h3>
          <h3>
            <Link to="/company">지명원 다운로드</Link>
          </h3>
          <h3>
            <Link to="/contact">찾아오시는 길</Link>
          </h3>
        </div>
        <div className="footer-company-info">
          <div>
            <h3>(주)한국미광</h3>
            <h3>대표이사 : 김은경</h3>
            <h3>사업자등록번호 : 000-00-00000</h3>
          </div>
          <h3>주소 : 경남 진주시 범골로54번길 5 6층 603, 604호</h3>
          <div>
            <h3>TEL : 070-7784-6679</h3>
            <h3>FAX : 055-762-6679</h3>
            <h3>E-MAIL : osy6679@hanmail.net</h3>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <h3>Copyright ⓒ Hangukmigwang, All rights reserved.</h3>
      </div>
    </footer>
  );
};

export default Footer;
