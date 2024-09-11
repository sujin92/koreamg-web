import React from "react";
import { Link } from "react-router-dom";
import "./LEDBusiness.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const LEDBusiness = () => {
  return (
    <div className="about">
      <Header />

      <div className="container">
        <img src="/assets/images/sub/sub01.jpg" alt="" className="mainImg" />
        <div className="innerTop">
          <div className="subTitle">
            <h2>LED 사업</h2>
            <h1>
              일상을 환하게,
              <br />
              공간을 특별하게
            </h1>
          </div>
          <div className="menuNav">
            <FontAwesomeIcon icon={faHouse} className="faHouse" />
            <span>/</span>
            <h2>LED 사업</h2>
            <span>/</span>
            <h2>LED 사업</h2>
          </div>
        </div>
      </div>
      <div className="menuBar">
        <Link to="/led" className="ledMenu">
          <h2>LED 사업</h2>
        </Link>
      </div>

      <div className="contentInner">
        <h1>일상을 환하게, 공간을 특별하게</h1>
        <h2 className="ledh2">
          국가는 노인과 청소년의 복지향상을 위한 정책을 실시할 의무를 진다. 언론
          ·출판에 대한 허가나 검열과 집회·결사에 대한 허가는 인정되지 아니한다.
        </h2>
        <div className="ledTitle">
          <h2>LED 사업</h2>
          <strong>LED BUSINESS</strong>
        </div>
        <div className="ledInner contentLeft">
          <img src="/assets/images/sub/led01.jpg" alt="" />
          <div>
            <h3>
              특수 건출물 경관조명
              <br />
              보수, 관리, 전문 시공업
            </h3>
            <li>고공 특수시공 공법 개발</li>
            <li>고공 특수시공 공법 개발</li>
            <li>고공 특수시공 공법 개발</li>
            <li>고공 특수시공 공법 개발</li>
          </div>
        </div>
        <div className="ledInner contentRight">
          <div>
            <h3>
              다양한 건축물의 LED경관조명
              <br />및 복합 시공 전문
            </h3>
            <li>고공 특수시공 공법 개발</li>
            <li>고공 특수시공 공법 개발</li>
            <li>고공 특수시공 공법 개발</li>
            <li>고공 특수시공 공법 개발</li>
          </div>
          <img src="/assets/images/sub/led01.jpg" alt="" />
        </div>
        <div className="ledInner contentLeft">
          <img src="/assets/images/sub/led01.jpg" alt="" />
          <div>
            <h3>
              경관조명 특수 제품 제작과
              <br />
              철저한 검증 테스트 진행
            </h3>
            <li>고공 특수시공 공법 개발</li>
            <li>고공 특수시공 공법 개발</li>
            <li>고공 특수시공 공법 개발</li>
            <li>고공 특수시공 공법 개발</li>
          </div>
        </div>
        <div className="ledInner contentRight">
          <div>
            <h3>
              전문적인 조도 시뮬레이션과
              <br />
              맞춤형 디자인, 설계 제공
            </h3>
            <li>고공 특수시공 공법 개발</li>
            <li>고공 특수시공 공법 개발</li>
            <li>고공 특수시공 공법 개발</li>
            <li>고공 특수시공 공법 개발</li>
          </div>
          <img src="/assets/images/sub/led01.jpg" alt="" />
        </div>
      </div>
      <div className="solution">
        <h2>LED 토탈솔루션 진행 절차</h2>
        <div className="solutionStep">
          <div>
            <div className="imgWrapper">
              <div className="imgWrapper">
                <img src="/assets/icons/sub/led01.png" alt="" />
              </div>
            </div>
            <div>
              <span>STEP 01</span>
              <p>견적문의</p>
            </div>
            <p>1</p>
          </div>
          <div>
            <div className="imgWrapper">
              <img src="/assets/icons/sub/led01.png" alt="" />
            </div>
            <div>
              <span>STEP 01</span>
              <p>견적문의</p>
            </div>
            <p>1</p>
          </div>
          <div>
            <div className="imgWrapper">
              <img src="/assets/icons/sub/led01.png" alt="" />
            </div>
            <div>
              <span>STEP 01</span>
              <p>견적문의</p>
            </div>
            <p>1</p>
          </div>
          <div>
            <div className="imgWrapper">
              <img src="/assets/icons/sub/led01.png" alt="" />
            </div>
            <div>
              <span>STEP 01</span>
              <p>견적문의</p>
            </div>
            <p>1</p>
          </div>
          <div>
            <div className="imgWrapper">
              <img src="/assets/icons/sub/led01.png" alt="" />
            </div>
            <div>
              <span>STEP 01</span>
              <p>견적문의</p>
            </div>
            <p>1</p>
          </div>
          <div>
            <div className="imgWrapper">
              <img src="/assets/icons/sub/led01.png" alt="" />
            </div>
            <div>
              <span>STEP 01</span>
              <p>견적문의</p>
            </div>
            <p>1</p>
          </div>
          <div>
            <div className="imgWrapper">
              <img src="/assets/icons/sub/led01.png" alt="" />
            </div>
            <div>
              <span>STEP 01</span>
              <p>견적문의</p>
            </div>
            <p>1</p>
          </div>
          <div>
            <div className="imgWrapper">
              <img src="/assets/icons/sub/led01.png" alt="" />
            </div>
            <div>
              <span>STEP 01</span>
              <p>견적문의</p>
            </div>
            <p>1</p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default LEDBusiness;
