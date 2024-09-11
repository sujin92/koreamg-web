import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./InstallCase.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faSearch,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";

const InstallCase = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded JWT: ", decoded);
        if (decoded.username === "admin") {
          setIsAdmin(true);
        } else {
          console.log("관리자 아님");
        }
      } catch (error) {
        console.error("JWT 해석 오류:", error);
      }
    } else {
      console.log("토큰이 없음");
    }
  }, []);

  const handleWriteClick = () => {
    navigate("/casewrite");
  };

  const handleCaseClick = () => {
    navigate("/detail");
  };

  return (
    <div className="installCase">
      <Header />

      <div className="container">
        <img src="/assets/images/sub/sub01.jpg" alt="" className="mainImg" />
        <div className="innerTop">
          <div className="subTitle">
            <h2>설치사례</h2>
            <h1>
              일상을 환하게,
              <br />
              공간을 특별하게
            </h1>
          </div>
          <div className="menuNav">
            <FontAwesomeIcon icon={faHouse} className="faHouse" />
            <span>/</span>
            <h2>설치사례</h2>
            <span>/</span>
            <h2>설치사례</h2>
          </div>
        </div>
      </div>
      <div className="menuBar">
        <Link to="/cases" className="installCaseMenu">
          <h2>설치사례</h2>
        </Link>
      </div>

      <div className="contentInner">
        <h1>설치 / 시공 사례</h1>
        {isAdmin && (
          <button className="writeBtn" onClick={handleWriteClick}>
            게시글 작성
          </button>
        )}
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

export default InstallCase;
