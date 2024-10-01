import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Editor } from "@toast-ui/react-editor";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./InstallCaseEdit.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const InstallCaseEdit = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [thumbnail, setThumbnail] = useState(null); // 썸네일 상태 추가
  const [currentThumbnail, setCurrentThumbnail] = useState(""); // 현재 썸네일 경로
  const navigate = useNavigate();
  const editorRef = useRef();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/cases/${id}`
        );
        setPost(response.data);
        setCurrentThumbnail(response.data.thumbnail); // 현재 썸네일 경로 설정
      } catch (error) {
        console.error("게시글 조회 중 오류 발생:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const content = editorRef.current.getInstance().getHTML();
    const file = e.target.thumbnail.files[0]; // 새로운 썸네일 이미지 파일

    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (file) {
      formData.append("thumbnail", file); // 새로운 썸네일이 있는 경우에만 추가
    }

    try {
      await axios.put(`http://localhost:3000/api/case-edit/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data", // 썸네일을 업로드할 때 Content-Type 설정
        },
      });
      alert("게시글이 성공적으로 수정되었습니다.");
      navigate(`/detail/${id}`);
    } catch (error) {
      console.error("게시글 수정 중 오류 발생:", error);
      alert("게시글 수정 중 오류가 발생했습니다.");
    }
  };

  if (!post) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="editCase">
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
            <h2>게시글 수정</h2>
          </div>
        </div>
      </div>

      <div className="menuBar">
        <Link to="/cases" className="installCaseDetailMenu">
          <h2>설치사례</h2>
        </Link>
      </div>

      <div className="editContent">
        <h2>게시글 수정</h2>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={post.title}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="thumbnail">썸네일 이미지</label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="content">내용</label>
            <Editor
              initialValue={post.content}
              previewStyle="vertical"
              height="400px"
              initialEditType="wysiwyg"
              hideModeSwitch={true}
              ref={editorRef}
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

export default InstallCaseEdit;
