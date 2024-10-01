import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "./NewsWrite.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const NewsWrite = () => {
  const editorRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const content = editorRef.current.getInstance().getHTML();

    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const postData = {
      title,
      content,
    };

    try {
      await axios.post("http://localhost:3000/api/news-write", postData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      navigate("/news");
    } catch (error) {
      console.error("게시글 저장 중 오류 발생:", error);
      alert("게시글 저장 중 오류가 발생했습니다.");
    }
  };

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
            <h2>게시글 작성</h2>
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

      <div className="writeNewse">
        <h2>게시글 작성</h2>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <input
              type="text"
              id="title"
              name="title"
              required
              placeholder="제목을 입력해 주세요"
            />
          </div>
          <div className="formGroup">
            <Editor
              initialValue=" "
              previewStyle="vertical"
              height="400px"
              initialEditType="wysiwyg"
              hideModeSwitch={true}
              ref={editorRef}
              hooks={{
                addImageBlobHook: async (blob, callback) => {
                  const formData = new FormData();
                  formData.append("file", blob);

                  try {
                    const response = await axios.post(
                      "http://localhost:3000/api/upload-image",
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                      }
                    );
                    const imageUrl = `http://localhost:3000${response.data.url}`;
                    callback(imageUrl, "alt text");
                  } catch (error) {
                    console.error("Image upload failed:", error);
                  }
                },
              }}
            />
          </div>

          <button className="submitBtn" type="submit">
            저장
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default NewsWrite;
