import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
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
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const navigate = useNavigate();

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

    // 전체 게시글 가져오기
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/cases");
        setAllPosts(response.data);
      } catch (error) {
        console.error("게시글 목록 조회 중 오류 발생:", error);
      }
    };

    // 현재 게시글 가져오기
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/cases/${id}`
        );
        setPost(response.data);
      } catch (error) {
        console.error("게시글 조회 중 오류 발생:", error);
      }
    };

    fetchPosts();
    fetchPost();
  }, [id]);

  if (!post) {
    return <div>로딩 중...</div>;
  }

  // 이전/다음 게시글
  const currentIndex = allPosts.findIndex((item) => item.id === parseInt(id));
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const handleEditClick = () => {
    navigate(`/caseedit/${id}`);
  };

  const handleDeleteClick = async () => {
    const confirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/case-delete/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        alert("게시글이 삭제되었습니다.");
        navigate("/cases");
      } catch (error) {
        console.error("게시글 삭제 중 오류 발생:", error);
        alert("게시글 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handlePrevClick = () => {
    if (prevPost) {
      navigate(`/detail/${prevPost.id}`);
    } else {
      alert("이동할 페이지가 없습니다.");
    }
  };

  const handleNextClick = () => {
    if (nextPost) {
      navigate(`/detail/${nextPost.id}`);
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
        <Link to="/cases" className="installCaseDetailMenu">
          <h2>설치사례</h2>
        </Link>
      </div>

      <div className="contentInner detailTitle">
        <h2>{post.title}</h2>
        <p>
          {post.created_at
            ? new Date(post.created_at).toLocaleDateString("ko-KR")
            : "날짜 없음"}
        </p>

        <div className="detailContent">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />

          {isAdmin && (
            <div className="detailBtn">
              <button onClick={handleEditClick}>수정</button>
              <button onClick={handleDeleteClick}>삭제</button>
            </div>
          )}
        </div>

        <div className="detailPagenation">
          <div onClick={handlePrevClick}>
            <FontAwesomeIcon icon={faChevronLeft} />
            <p>이전글</p>
          </div>

          <img
            src="/assets/icons/sub/list.png"
            alt="목록"
            className="listImg"
            onClick={() => navigate("/cases")}
          />

          <div onClick={handleNextClick}>
            <p>다음글</p>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default InstallCaseDetail;
