import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./News.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faSearch,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const News = () => {
  const navigate = useNavigate();

  const handleCaseClick = () => {
    navigate("/newsDetail");
  };

  return (
    <div className="about">
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
      <div className="menuBar newsBar">
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
        <h1>한국미광 소식</h1>
        <div className="search-bar">
          <input type="text" placeholder="검색어를 입력해 주세요." />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
        <div className="caseItem">
          <div onClick={handleCaseClick}>
            <img src="/assets/images/sub/cases.jpg" alt="" />
            <h2>다산 아이파크</h2>
            <p>24.09.03</p>
          </div>
          <div onClick={handleCaseClick}>
            <img src="/assets/images/sub/cases.jpg" alt="" />
            <h2>다산 아이파크</h2>
            <p>24.09.03</p>
          </div>
          <div onClick={handleCaseClick}>
            <img src="/assets/images/sub/cases.jpg" alt="" />
            <h2>다산 아이파크</h2>
            <p>24.09.03</p>
          </div>
          <div onClick={handleCaseClick}>
            <img src="/assets/images/sub/cases.jpg" alt="" />
            <h2>다산 아이파크</h2>
            <p>24.09.03</p>
          </div>
        </div>
        <div className="pagenation">
          <FontAwesomeIcon icon={faChevronLeft} />
          <p>01</p>
          <p>02</p>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default News;
