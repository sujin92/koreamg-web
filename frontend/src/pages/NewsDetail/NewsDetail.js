import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./NewsDetail.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsDetail, setNewsDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // 관리자 여부 확인
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.username === "admin") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("JWT 해석 오류:", error);
      }
    }
  }, []);

  // 뉴스 상세 정보 가져오기
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/news/${id}`)
      .then((response) => {
        setNewsDetail(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("뉴스 상세 조회 중 오류 발생:", error);
        setLoading(false);
      });
  }, [id]);

  // 뉴스 삭제 처리
  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .delete(`http://localhost:3000/api/news-delete/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          alert("삭제되었습니다.");
          navigate("/news");
        })
        .catch((error) => {
          console.error("뉴스 삭제 중 오류 발생:", error);
          alert("삭제 중 오류가 발생했습니다.");
        });
    }
  };

  // 로딩 상태 처리
  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!newsDetail) {
    return <div>뉴스 데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="newsDetail">
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

      <div className="contentInner detailTitle">
        <h2>{newsDetail.title}</h2>
        <p>{new Date(newsDetail.created_at).toLocaleDateString("ko-KR")}</p>
        <div className="detailContent">
          <div dangerouslySetInnerHTML={{ __html: newsDetail.content }}></div>
          {isAdmin && (
            <div className="detailBtn">
              <button onClick={() => navigate(`/newsEdit/${id}`)}>수정</button>
              <button onClick={handleDelete}>삭제</button>
            </div>
          )}
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

      <Footer />
    </div>
  );
};

export default NewsDetail;
