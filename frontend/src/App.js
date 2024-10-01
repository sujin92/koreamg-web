import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import History from "./pages/History/History";
import Contact from "./pages/Contact/Contact";
import LEDBusiness from "./pages/LEDBusiness/LEDBusiness";
import InstallCase from "./pages/InstallCase/InstallCase";
import InstallCaseDetail from "./pages/InstallCaseDetail/InstallCaseDetail";
import News from "./pages/News/News";
import NewsDetail from "./pages/NewsDetail/NewsDetail";
import Qna from "./pages/Qna/Qna";
import CompanyDownload from "./pages/Download/CompanyDownload";
import Login from "./pages/Login/Login";
import CaseWrite from "./pages/CaseWrite/CaseWrite";
import InstallCaseEdit from "./pages/InstallCaseEdit/InstallCaseEdit";
import NewsWrite from "./pages/NewsWrite/NewsWrite";
import NewsEdit from "./pages/NewsEdit/NewsEdit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/history" element={<History />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/led" element={<LEDBusiness />} />
        <Route path="/cases" element={<InstallCase />} />
        <Route path="/detail/:id" element={<InstallCaseDetail />} />
        <Route path="/news" element={<News />} />
        <Route path="/newsDetail/:id" element={<NewsDetail />} />
        <Route path="/newsWrite" element={<NewsWrite />} />
        <Route path="/newsEdit/:id" element={<NewsEdit />} />
        <Route path="/qna" element={<Qna />} />
        <Route path="/company" element={<CompanyDownload />} />
        <Route path="/login" element={<Login />} />
        <Route path="/casewrite" element={<CaseWrite />} />
        <Route path="/caseedit/:id" element={<InstallCaseEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
