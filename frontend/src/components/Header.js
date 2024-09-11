import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(true);
  };

  const handleCloseClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src="/assets/images/logo.png" alt="logo" />
        </Link>
      </div>

      <nav>
        <ul className="main-menu">
          <li>
            <Link to="/about">회사소개</Link>
          </li>
          <li>
            <Link to="/led">LED 사업</Link>
          </li>
          <li>
            <Link to="/cases">설치사례</Link>
          </li>
          <li>
            <Link to="/news">고객지원</Link>
          </li>
        </ul>
        <div className="dropdown-content">
          <ul>
            <li>
              <Link to="/about">회사소개</Link>
            </li>
            <li>
              <Link to="/history">연혁</Link>
            </li>
            <li>
              <Link to="/contact">찾아오시는 길</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/led">LED 사업</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/cases">설치사례</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/news">한국미광 소식</Link>
            </li>
            <li>
              <Link to="/qna">문의하기</Link>
            </li>
            <li>
              <Link to="/company">다운로드</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="navBg"></div>
      <div
        className="site-map"
        style={{ display: isMenuOpen ? "block" : "none" }}
      >
        <div>
          <h1>SITEMAP</h1>
          <div>
            <div className="menu-box">
              <span>01</span>
              <h2>회사소개</h2>

              <li>
                <Link to="/about">회사소개</Link>
              </li>
              <li>
                <Link to="/history">연혁</Link>
              </li>
              <li>
                <Link to="/contact">찾아오시는 길</Link>
              </li>
            </div>
            <div className="menu-box">
              <span>02</span>
              <h2>LED 사업</h2>

              <li>
                <Link to="/led">LED 사업</Link>
              </li>
            </div>
            <div className="menu-box">
              <span>03</span>
              <h2>설치사례</h2>

              <li>
                <Link to="/cases">설치사례</Link>
              </li>
            </div>
            <div className="menu-box">
              <span>04</span>
              <h2>고객지원</h2>

              <li>
                <Link to="/news">한국미광 소식</Link>
              </li>
              <li>
                <Link to="/qna">문의하기</Link>
              </li>
              <li>
                <Link to="/company">다운로드</Link>
              </li>
            </div>
          </div>
        </div>
      </div>

      <div className="allmenuBtn">
        <img
          src="/assets/icons/main/menu.png"
          alt="menu"
          className="menuBtn"
          onClick={handleMenuClick}
          style={{ display: isMenuOpen ? "none" : "block" }}
        />
        <img
          src="/assets/icons/main/close.png"
          alt="menu"
          className="closeBtn"
          onClick={handleCloseClick}
          style={{ display: isMenuOpen ? "block" : "none" }}
        />
      </div>
    </header>
  );
};

export default Header;
