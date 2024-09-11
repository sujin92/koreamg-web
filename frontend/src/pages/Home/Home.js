import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { Player } from "@lottiefiles/react-lottie-player";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import animationData from "../../lottie/scroll.json";
import Header from "../../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import Footer from "../../components/Footer";

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 9000,
    customPaging: function (i) {
      const dotInfo = [
        { number: "01", text: "대교 야간조명" },
        { number: "02", text: "야간 경관조명" },
        { number: "03", text: "미디어파사드" },
      ];

      return (
        <div>
          <div className="dot-number">{dotInfo[i].number}</div>
          <button></button>
          <div className="dot-text">{dotInfo[i].text}</div>
        </div>
      );
    },
  };

  const navigate = useNavigate();

  const handleMorePlusClick = () => {
    navigate("/about");
  };

  const handleClick = () => {
    navigate("/cases");
  };

  return (
    <div className="home">
      <Header />
      <div>
        <div className="mainTitle">
          <h2>
            Illuminate the Night,
            <br />
            Bridge the Beauty
          </h2>
          <p>
            매년 신제품 업데이트로 더욱더 발전된 모습으로 고객 만족을 실현하고
            나아가 아름다운 빛의 대한민국을 만들기 위해 항상 노력하겠습니다.
          </p>
        </div>
        <div className="lottie-animation">
          <Player
            autoplay
            loop
            src={animationData}
            style={{ width: "150px", height: "150px" }}
          />
        </div>
        <Slider {...settings}>
          <div>
            <video src="/assets/video/bg01.mp4" autoPlay loop muted></video>
          </div>
          <div>
            <video src="/assets/video/bg02.mp4" autoPlay loop muted></video>
          </div>
          <div>
            <video src="/assets/video/bg03.mp4" autoPlay loop muted></video>
          </div>
        </Slider>
      </div>
      <div className="section01">
        <img
          src="/assets/images/main/main01.jpg"
          alt="배경야경"
          className="section01Bg"
        />
        <div>
          <div className="leftSection">
            <p>COMPANY INTRODUCTION</p>
            <img src="/assets/images/main/main02.jpg" alt="조명이미지" />
          </div>
          <div className="rightSection">
            <p>
              Light
              <span>
                <em>U</em>p
              </span>
              the Night
            </p>

            <p>
              Light
              <span>
                U<em>p</em>
              </span>
              the Future
            </p>

            <h3>
              (주)한국미광은 자연과 경관에
              <span>조명의 힘을 더하고 장소의 새로운 가능성</span>을 열어갑니다.
              자연과 어우러진 <span>조명의 빛은 우리의 공간을 새롭게 정의</span>
              합니다.
            </h3>
            <img
              src="/assets/icons/main/plus.png"
              alt="더보기"
              className="morePlus"
              onClick={handleMorePlusClick}
            />
          </div>
        </div>
      </div>
      <div className="section02">
        <img src="/assets/images/main/section02Bg.jpg" alt="배경" />
        <div className="caseContents">
          <h2>설치 · 시공 사례</h2>
          <p>
            현장에 맞는 특화된 공간의 디자인 설계, 고품질 제품 생산, 철저한 사후
            서비스까지 책임집니다.
          </p>
          <div>
            <div>
              <img src="/assets/images/main/section02img.jpg" alt="" />
              <p className="hiddenText">남일대 경관조명 설치</p>
            </div>
            <div>
              <img src="/assets/images/main/section02img.jpg" alt="" />
              <p className="hiddenText">남일대 경관조명 설치</p>
            </div>
            <div>
              <img src="/assets/images/main/section02img.jpg" alt="" />
              <p className="hiddenText">남일대 경관조명 설치</p>
            </div>
            <div>
              <img src="/assets/images/main/section02img.jpg" alt="" />
              <p className="hiddenText">남일대 경관조명 설치</p>
            </div>
            <div>
              <img src="/assets/images/main/section02img.jpg" alt="" />
              <p className="hiddenText">남일대 경관조명 설치</p>
            </div>
            <div>
              <img src="/assets/images/main/section02img.jpg" alt="" />
              <p className="hiddenText">남일대 경관조명 설치</p>
            </div>
            <div>
              <img src="/assets/images/main/section02img.jpg" alt="" />
              <p className="hiddenText">남일대 경관조명 설치</p>
            </div>
            <div>
              <img src="/assets/images/main/section02img.jpg" alt="" />
              <p className="hiddenText">남일대 경관조명 설치</p>
            </div>
            <div>
              <img src="/assets/images/main/section02img.jpg" alt="" />
              <p className="hiddenText">남일대 경관조명 설치</p>
            </div>
            <div>
              <img src="/assets/images/main/section02img.jpg" alt="" />
              <p className="hiddenText">남일대 경관조명 설치</p>
            </div>
            <div>
              <img src="/assets/images/main/section02img.jpg" alt="" />
              <p className="hiddenText">남일대 경관조명 설치</p>
            </div>
            <div>
              <img src="/assets/images/main/section02img.jpg" alt="" />
              <p className="hiddenText">남일대 경관조명 설치</p>
            </div>
          </div>
          <button onClick={handleClick}>MORE</button>
        </div>
      </div>
      <div className="section03">
        <h2>고객지원</h2>
        <p>
          한국미광은 고객의 편의를 위해 다양한 소식과 상담 서비스를 제공합니다.
        </p>
        <div>
          <div
            className="whiteBox blogBox"
            onClick={() =>
              window.open("https://blog.naver.com/osy6679", "_blank")
            }
          >
            <img src="/assets/icons/main/blog.png" alt="" />
            <h3>한국미광 블로그</h3>
            <p>한국미광의 가장 빠른 소식을 알아볼 수 있습니다.</p>
          </div>
          <div className="whiteBox">
            <img src="/assets/icons/main/qna.png" alt="" />
            <h3>온라인 문의</h3>
            <p>전문적인 상담이나 자세한 견적을 문의할 수 있습니다.</p>
          </div>
          <div className="orangeBox">
            <div>
              <img src="/assets/icons/main/call.png" alt="" />
              <p>고객센터</p>
            </div>
            <h2>070-000-0000</h2>
            <div>
              <FontAwesomeIcon icon={faClock} className="watch" />
              <h3>
                평일 09:00 - 18:00
                <br />
                주말, 공휴일 휴무
              </h3>
            </div>
            <div className="qnaBox">
              <div>
                <img src="/assets/icons/main/qna2.png" alt="" />
                <p>1:1 문의</p>
              </div>
              <div>
                <img src="/assets/icons/main/qna3.png" alt="" />
                <p>제품 문의</p>
              </div>
              <div>
                <img src="/assets/icons/main/qna4.png" alt="" />
                <p>구매 문의</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Home;
