import React from "react";
import { Link } from "react-router-dom";
import "./InstallCaseDetail.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const InstallCaseDetail = () => {
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
        <Link to="/cases" className="installCaseDetailMenu">
          <h2>설치사례</h2>
        </Link>
      </div>

      <div className="contentInner detailTitle">
        <h2>다산 아이파크</h2>
        <p>2004.09.03</p>
        <div className="detailContent">
          <img src="/assets/images/main/main02.jpg" alt="" />
        </div>
        <div className="detailPagenation">
          <div>
            <FontAwesomeIcon icon={faChevronLeft} />
            <p>이전글</p>
          </div>
          <img src="/assets/icons/sub/list.png" alt="" />
          <div>
            <p>다음글</p>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default InstallCaseDetail;
