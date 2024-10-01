import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Editor } from "@toast-ui/react-editor";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./NewsEdit.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const NewsEdit = () => {
  const { id } = useParams(); // URL 파라미터에서 ID 가져오기
  const [title, setTitle] = useState(""); // 제목 상태
  const [content, setContent] = useState(""); // 에디터 내용 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const editorRef = useRef(); // 에디터의 ref 사용
  const navigate = useNavigate();

  // 게시글 데이터 불러오기
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/news/${id}`)
      .then((response) => {
        setTitle(response.data.title); // 제목 설정
        setContent(response.data.content); // 내용 설정
        setLoading(false); // 로딩 완료
      })
      .catch((error) => {
        console.error("게시글 데이터 로드 중 오류 발생:", error);
        setLoading(false);
      });
  }, [id]);

  // 게시글 수정 요청 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = editorRef.current.getInstance().getHTML(); // 에디터 내용 가져오기

    if (!title || !content) {
      alert("제목과 내용을 입력해 주세요.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:3000/api/news-edit/${id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // 인증 헤더 추가
          },
        }
      );
      alert("게시글이 수정되었습니다.");
      navigate(`/newsDetail/${id}`); // 수정 완료 후 상세 페이지로 이동
    } catch (error) {
      console.error("게시글 수정 중 오류 발생:", error);
      alert("게시글 수정 중 오류가 발생했습니다.");
    }
  };

  // 로딩 중일 때 처리
  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="editCase">
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

      <div className="editContent">
        <h2>게시글 수정</h2>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="formGroup">
            <Editor
              initialValue={content} // 에디터의 초기값을 가져온 content로 설정
              previewStyle="vertical"
              height="400px"
              initialEditType="wysiwyg"
              hideModeSwitch={true}
              ref={editorRef} // 에디터의 ref 설정
            />
          </div>

          <button type="submit" className="editBtnOk">
            수정 완료
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default NewsEdit;
