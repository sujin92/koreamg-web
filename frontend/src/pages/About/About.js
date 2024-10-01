import React from "react";
import { Link } from "react-router-dom";
import "./About.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

function About() {
  return (
    <div className="about">
      <Header />

      <div className="container">
        <img src="/assets/images/sub/sub01.jpg" alt="" className="mainImg" />
        <div className="innerTop">
          <div className="subTitle">
            <h2>회사소개</h2>
            <h1>
              일상을 환하게,
              <br />
              공간을 특별하게
            </h1>
          </div>
          <div className="menuNav">
            <FontAwesomeIcon icon={faHouse} className="faHouse" />
            <span>/</span>
            <h2>회사소개</h2>
            <span>/</span>
            <h2>회사소개</h2>
          </div>
        </div>
      </div>
      <div className="menuBar aboutMenuBar">
        <Link to="/about" className="aboutMenu">
          <h2>회사소개</h2>
        </Link>
        <Link to="/history" className="historyMenu">
          <h2>연혁</h2>
        </Link>
        <Link to="/contact" className="contactMenu">
          <h2>찾아오시는 길</h2>
        </Link>
      </div>

      <div className="contentInner">
        <h1>일상을 환하게, 공간을 특별하게</h1>
        <h2>
          국가는 노인과 청소년의 복지향상을 위한 정책을 실시할 의무를 진다. 언론
          ·출판에 대한 허가나 검열과 집회·결사에 대한 허가는 인정되지 아니한다.
        </h2>
        <img src="/assets/images/sub/about.jpg" alt="" className="companyImg" />
        <p className="aboutText">
          국가는 노인과 청소년의 복지향상을 위한 정책을 실시할 의무를 진다.
          언론·출판에 대한 허가나 검열과 집회·결사에 대한 허가는 인정되지
          아니한다. 학교교육 및 평생교육을 포함한 교육제도와 그 운영, 교육재정
          및 교원의 지위에 관한 기 본적인 사항은 법률로 정한다. 신체장애자 및
          질병·노령 기타의 사유로 생활능력이 없는 국민은 법률이 정하는 바에
          의하여 국가의 보호를 받는다. 대통령은 제3항과 제4항의 사유를 지체없이
          공포하여야 한다. 원장은 국회의 동의를 얻어 대통령이 임명하고, 그
          임기는 4년으로 하며, 1차에 한하여 중임할 수 있다. 모든 국 민은 근로의
          권리를 가진다. 국가는 사회적·경제적 방법으로 근로자의 고용의 증진과
          적정임금의 보장에
        </p>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default About;
