import React from "react";
import { Link } from "react-router-dom";
import "./CompanyDownload.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faDownload, faBook } from "@fortawesome/free-solid-svg-icons";

const CompanyDownload = () => {
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
            <h2>다운로드</h2>
          </div>
        </div>
      </div>
      <div className="menuBar downloadBar">
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
        <h1>지명원</h1>
        <div className="designated">
          <img src="/assets/icons/sub/bgBook.png" alt="" />
          <div>
            <h2>Catalogue Download</h2>
            <p>
              저희 한국미광은 고객 여러분들의 힘을 얻어 그동안 축적된 기술력으로
              무한 성장의 잠재력을 가지고 다양한 제품 개발에 힘쓰고 있습니다.
            </p>
            <div className="downBtn">
              <a
                href="/assets/files/book.pdf"
                download="한국미광_지명원.pdf"
                className="downloadBtn"
              >
                다운로드
                <FontAwesomeIcon icon={faDownload} />
              </a>
              <a
                href="https://online.fliphtml5.com/aljak/srhf/"
                className="downloadBtn"
                target="_blank"
                rel="noopener noreferrer"
              >
                eBook <FontAwesomeIcon icon={faBook} />
              </a>
            </div>
          </div>
          <img src="/assets/icons/sub/bgLogo.png" alt="" className="bgLogo" />
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default CompanyDownload;
