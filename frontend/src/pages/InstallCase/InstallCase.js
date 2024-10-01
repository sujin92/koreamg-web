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
import axios from "axios";

const InstallCase = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [caseData, setCaseData] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    // 토큰 확인 및 관리자 여부 체크
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

    // 게시글 API 호출
    axios
      .get("http://localhost:3000/api/cases")
      .then((response) => {
        setCaseData(response.data);
        setFilteredCases(response.data);
      })
      .catch((error) => {
        console.error("게시글 데이터 로드 중 오류:", error);
      });
  }, []);

  const handleWriteClick = () => {
    navigate("/casewrite");
  };

  const handleCaseClick = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      setFilteredCases(caseData);
    } else {
      const filtered = caseData.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCases(filtered);
    }
    setCurrentPage(1);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCases = filteredCases.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredCases.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    } else {
      alert("이동할 페이지가 없습니다.");
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      alert("이동할 페이지가 없습니다.");
    }
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
          <input
            type="text"
            placeholder="검색어를 입력해 주세요."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress} // Enter 키로 검색
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="search-icon"
            onClick={handleSearchSubmit} // 검색 버튼 클릭 시 검색
          />
        </div>

        {currentCases.length > 0 ? (
          <div className="caseList">
            {currentCases.map((caseItem) => (
              <div className="caseItem" key={caseItem.id}>
                <div onClick={() => handleCaseClick(caseItem.id)}>
                  <img
                    src={`http://localhost:3000${caseItem.thumbnail}`}
                    alt="이미지"
                  />
                  <h2>{caseItem.title}</h2>
                  <p>
                    {new Date(caseItem.created_at).toLocaleDateString("ko-KR")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>게시글이 없습니다.</p>
        )}

        <div className="pagenation">
          <FontAwesomeIcon icon={faChevronLeft} onClick={handlePrevPage} />
          {Array.from(
            { length: Math.ceil(filteredCases.length / itemsPerPage) },
            (_, index) => (
              <p
                key={index}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => setCurrentPage(index + 1)}
              >
                {(index + 1).toString().padStart(2, "0")}
              </p>
            )
          )}
          <FontAwesomeIcon icon={faChevronRight} onClick={handleNextPage} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InstallCase;
