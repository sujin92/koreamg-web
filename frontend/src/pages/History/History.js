import React from "react";
import { Link } from "react-router-dom";
import "./History.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

function History() {
  return (
    <div>
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
      <div className="menuBar historyMenuBar">
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

      <div className="contentInner contentInnerOther">
        <div className="topText">
          <h1>
            어제보다 오늘,
            <br />
            오늘보다 내일 더 성장하는
          </h1>
          <h2>
            국가는 노인과 청소년의 복지향상을 위한 정책을 실시할 의무를 진다.
            언론 ·출판에 대한 허가나 검열과 집회·결사에 대한 허가는 인정되지
            아니한다.
          </h2>
        </div>
        <div className="historyContent">
          <div>
            <h2>2024</h2>
            <div>
              <p>
                <span>01월</span>마감 캡 디자인 등록 (제 30-1245154호)
              </p>
              <p>
                <span>03월</span>비디오물제작업 등록
              </p>
              <p>
                <span>04월</span>전기공사업 등록
              </p>
              <p>
                <span></span>산업디자인전문회사 등록
              </p>
            </div>
            <img src="/assets/images/sub/history01.jpg" alt="" />
          </div>
          <div>
            <h2>2023</h2>
            <div>
              <p>
                <span>01월</span>연구개발전담부서 설립
              </p>
              <p>
                <span>02월</span>경영혁신형 중소기업 (MAIN-BIZ) 확인서 취득
              </p>
              <p>
                <span>06월</span>벤처기업 등록
              </p>
              <p>
                <span>09월</span>브라켓 디자인 등록 (제 30-1231132호)
              </p>
              <p>
                <span>10월</span>투광등 특허 취득 (제 10-2591196호)
              </p>
              <p>
                <span></span>난간조명 특허 취득 (제 10-2594406호)
              </p>
            </div>
            <img src="/assets/images/sub/history01.jpg" alt="" />
          </div>
          <div>
            <h2>2022</h2>
            <div>
              <p>
                <span>02월</span>여성기업 확인서 취득
              </p>
              <p>
                <span>07월</span>디자인연구소 설립
              </p>
              <p>
                <span></span>투광등 디자인 등록 (제 30-1174360호)
              </p>
              <p>
                <span>11월</span>논슬립 디자인 등록 (제 30-1192951호)
              </p>
            </div>
            <img src="/assets/images/sub/history01.jpg" alt="" />
          </div>
          <div>
            <h2>2021</h2>
            <div>
              <p>
                <span>04월</span>방송통신기자재등의 적합등록 필증
              </p>
              <p>
                <span>05월</span>주식회사 한국미광 상호 변경
              </p>
              <p>
                <span></span>ISO 9001:2015/KS Q ISO 9001:2015 (AK21QM2526)
              </p>
              <p>
                <span>06월</span>고효율에너지기자재 인증서 취득(KNMG-SL150W50KA)
              </p>
              <p>
                <span></span>고효율에너지기자재 인증서 취득-(KNMG-SE50W50KA)
              </p>
              <p>
                <span>07월</span>고효율에너지기자재 인증서 취득-(KNMG-SE60W50KA)
              </p>
              <p>
                <span></span>고효율에너지기자재 인증서 취득-(KNMG-SL100W50KA)
              </p>
              <p>
                <span></span>고효율에너지기자재 인증서 취득-(KNMG-SL120W50KA)
              </p>
            </div>
            <img src="/assets/images/sub/history01.jpg" alt="" />
          </div>
          <div>
            <h2>2019</h2>
            <div>
              <p>
                <span>05월</span>경쟁입찰참가자격 등록증 취득 (LED 경관조명기구)
              </p>
              <p>
                <span>06월</span>경쟁입찰참가자격 등록증 취득
                (가로등,투광등,보안등,태양광가로등)
              </p>
            </div>
            <img src="/assets/images/sub/history01.jpg" alt="" />
          </div>
          <div>
            <h2>2018</h2>
            <div>
              <p>
                <span>10월</span>주식회사 한국미광 설립
              </p>
              <p>
                <span></span>공장 등록
              </p>
              <p>
                <span></span>중소기업 확인서 취득
              </p>
              <p>
                <span></span>직접생산확인 증명서 획득 - 옥외조명및설비
              </p>
              <p>
                <span></span>직접생산확인 증명서 획득 - 배전,조정장치및액세서리
              </p>
            </div>
            <img src="/assets/images/sub/history01.jpg" alt="" />
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default History;
