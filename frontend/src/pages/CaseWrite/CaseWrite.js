import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CaseWrite.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import ReactQuill from "react-quill"; // Quill 에디터 임포트
import "react-quill/dist/quill.snow.css"; // Quill 에디터 기본 스타일 임포트

const CaseWrite = () => {
  const [content, setContent] = useState(""); // Quill 에디터의 내용을 저장할 상태

  // Quill 에디터의 내용이 변경될 때 호출되는 함수
  const handleEditorChange = (value) => {
    setContent(value);
  };

  const handleSubmit = () => {
    // 게시글 저장 로직
    console.log("게시글 내용:", content);
    // 서버에 게시글 내용을 저장하는 API 호출 등의 로직을 추가할 수 있습니다.
  };

  return (
    <div className="write">
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
            <h2>게시글 작성</h2>
          </div>
        </div>
      </div>

      <div className="menuBar">
        <Link to="/cases" className="installCaseDetailMenu">
          <h2>설치사례</h2>
        </Link>
      </div>

      <div className="writeContent">
        <h2>게시글 작성</h2>
        <input type="text" placeholder="제목을 입력해 주세요" />
        <ReactQuill
          value={content}
          onChange={handleEditorChange}
          theme="snow"
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ size: [] }],

              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image", "video"],
              ["clean"],
            ],
          }}
          className="quill-editor"
        />

        <button className="submitBtn" onClick={handleSubmit}>
          저장
        </button>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default CaseWrite;
