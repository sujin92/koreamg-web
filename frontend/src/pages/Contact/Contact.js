import React from "react";
import { Link } from "react-router-dom";
import "./Contact.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faLocationDot,
  faPhoneVolume,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import KakaoMap from "../../components/Map";

function Contact() {
  return (
    <div className="contact">
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
            <select name="menu" id="menu">
              <option value="about">회사소개</option>
              <option value="history">연혁</option>
              <option value="location">찾아오시는 길</option>
            </select>
          </div>
        </div>
      </div>
      <div className="menuBar contacMenuBar">
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
        <h1>찾아오시는 길</h1>
        <KakaoMap />
        <div className="mapContent">
          <div>
            <FontAwesomeIcon icon={faLocationDot} />
            <p>경남 진주시 범골로5 4번길 5 6층 603호</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faPhoneVolume} />
            <p>070-7784-6679</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faEnvelope} />
            <p>osy6679@hanmail.net</p>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default Contact;
