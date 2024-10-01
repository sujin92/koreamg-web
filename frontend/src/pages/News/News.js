import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const News = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 관리자 여부 체크
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

  // 뉴스 게시글 가져오기
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/news")
      .then((response) => {
        setNewsData(response.data);
        setFilteredNews(response.data);
      })
      .catch((error) => {
        console.error("뉴스 게시글 로드 중 오류:", error);
      });
  }, []);

  // 검색어 입력 처리
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 검색 기능 실행
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredNews(newsData);
    } else {
      const filtered = newsData.filter((newsItem) =>
        newsItem.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNews(filtered);
      setCurrentPage(1);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 페이지 이동
  const handlePageChange = (direction) => {
    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

    if (direction === "next") {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      } else {
        alert("이동할 페이지가 없습니다.");
      }
    } else if (direction === "prev") {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        alert("이동할 페이지가 없습니다.");
      }
    }
  };

  // 현재 페이지의 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstItem, indexOfLastItem);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  return (
    <div className="callCenter">
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
            <h2>한국미광 소식</h2>
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
        {isAdmin && (
          <button className="writeBtn" onClick={() => navigate("/newsWrite")}>
            게시글 작성
          </button>
        )}
        <div className="search-bar">
          <input
            type="text"
            placeholder="검색어를 입력해 주세요."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="search-icon"
            onClick={handleSearch}
          />
        </div>

        <div className="newsContent">
          <div className="newsList newsLine">
            <p className="indexNum">NO</p>
            <h2 className="newsTitle">제목</h2>
            <p className="newsDate">작성일</p>
          </div>

          {currentNews.map((newsItem, index) => (
            <div
              key={newsItem.id}
              className="newsItem newsList"
              onClick={() => navigate(`/newsDetail/${newsItem.id}`)}
            >
              <p className="indexNum">
                {newsData.length - ((currentPage - 1) * itemsPerPage + index)}
              </p>
              <h2 className="newsTitle">{newsItem.title}</h2>
              <p className="newsDate">
                {new Date(newsItem.created_at).toLocaleDateString("ko-KR")}
              </p>
            </div>
          ))}
        </div>

        <div className="pagenation">
          <FontAwesomeIcon
            icon={faChevronLeft}
            onClick={() => handlePageChange("prev")}
          />
          {[...Array(totalPages)].map((_, index) => (
            <p
              key={index}
              className={index + 1 === currentPage ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {String(index + 1).padStart(2, "0")}
            </p>
          ))}
          <FontAwesomeIcon
            icon={faChevronRight}
            onClick={() => handlePageChange("next")}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default News;
