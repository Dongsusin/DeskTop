import { useState, useEffect } from "react";
import "./Resume.css";
import FadeInLine from "./components/FadeInLine";

function Resume() {
  const pages = [
    "Main",
    "PortfolioInfo",
    "Project",
    "TeamProject",
    "UnityProject",
    "Contact",
  ];
  const projectPages = [
    "Project 1",
    "Project 2",
    "Project 3",
    "Project 4",
    "Project 5",
    "Project 6",
    "Project 7",
    "Project 8",
    "Project 9",
    "Project 10",
    "Project 11",
    "Project 12",
    "Project 13",
    "Project 14",
    "Project 15",
  ];
  const teamProjectPages = ["Team Project 1", "Team Project 2"];
  const UnityProjectPages = ["Unity Project 1", "Unity Project 2"];
  const [currentPage, setCurrentPage] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentTeamProjectIndex, setCurrentTeamProjectIndex] = useState(0);
  const [currentUnityProjectIndex, setCurrentUnityProjectIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(false);
    const timeout = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timeout);
  }, [currentPage, currentProjectIndex, currentTeamProjectIndex]);

  useEffect(() => {
    setAnimate(false);
    const timeout = setTimeout(() => setAnimate(true), 50);

    const container = document.querySelector(".resume-container");
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }

    return () => clearTimeout(timeout);
  }, [
    currentPage,
    currentProjectIndex,
    currentTeamProjectIndex,
    currentUnityProjectIndex,
  ]);

  const handlePrev = () => {
    if (pages[currentPage] === "Project") {
      if (currentProjectIndex === 0) {
        setCurrentPage(pages.indexOf("PortfolioInfo"));
      } else {
        setCurrentProjectIndex(currentProjectIndex - 1);
      }
    } else if (pages[currentPage] === "TeamProject") {
      if (currentTeamProjectIndex === 0) {
        setCurrentPage(pages.indexOf("Project"));
      } else {
        setCurrentTeamProjectIndex(currentTeamProjectIndex - 1);
      }
    } else if (pages[currentPage] === "UnityProject") {
      if (currentUnityProjectIndex === 0) {
        setCurrentPage(pages.indexOf("TeamProject"));
      } else {
        setCurrentTeamProjectIndex(currentUnityProjectIndex - 1);
      }
    } else {
      setCurrentPage((prev) => (prev === 0 ? pages.length - 1 : prev - 1));
    }
  };

  const handleNext = () => {
    if (pages[currentPage] === "Project") {
      if (currentProjectIndex === projectPages.length - 1) {
        setCurrentPage(pages.indexOf("TeamProject"));
      } else {
        setCurrentProjectIndex(currentProjectIndex + 1);
      }
    } else if (pages[currentPage] === "TeamProject") {
      if (currentTeamProjectIndex === teamProjectPages.length - 1) {
        setCurrentPage(pages.indexOf("UnityProject"));
      } else {
        setCurrentTeamProjectIndex(currentTeamProjectIndex + 1);
      }
    } else if (pages[currentPage] === "UnityProject") {
      if (currentUnityProjectIndex === UnityProjectPages.length - 1) {
        setCurrentPage(pages.indexOf("Contact"));
      } else {
        setCurrentUnityProjectIndex(currentUnityProjectIndex + 1);
      }
    } else {
      setCurrentPage((prev) => (prev === pages.length - 1 ? 0 : prev + 1));
    }
  };

  const renderProjectPage = () => {
    const project = projectPages[currentProjectIndex];
    switch (project) {
      case "Project 1":
        return (
          <section>
            <FadeInLine
              delay={500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <div className="title">
                <h2>계산기 프로젝트</h2>
                <a
                  href="https://github.com/Dongsusin/my-portfolio/blob/main/src/Apps/Calculator/Calculator.jsx"
                  target=""
                  rel="noreferrer"
                >
                  <img src="/image/아이콘/github.png" alt="" className="icon" />
                </a>
              </div>
              <img src="/image/이력서/계산기페이지.png" alt="" />
            </FadeInLine>
            <FadeInLine
              delay={1000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 개요</h1>
              <p>React,css 계산기 기능 구현 프로젝트 </p>
            </FadeInLine>
            <FadeInLine
              delay={1500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 기간</h1>
              <p>1일</p>
            </FadeInLine>
            <FadeInLine
              delay={2000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>기술 스택/협업 툴</h1>
              <table className="tool-table">
                <thead>
                  <tr>
                    <th>분류</th>
                    <th>툴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>언어</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/css3.png"
                          alt="CSS"
                        />
                        CSS3
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/javascript--v1.png"
                          alt="JavaScript"
                        />
                        JavaScript
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/react-native.png"
                          alt="React"
                        />
                        React
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>개발 환경</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/visual-studio-code-2019.png"
                          alt="VSCode"
                        />
                        VS Code
                      </span>
                      <span className="badge">
                        <img
                          src="https://vitejs.dev/logo.svg"
                          alt="Vite"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Vite
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>협업</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/git.png"
                          alt="Git"
                        />
                        Git
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/ios-glyphs/30/github.png"
                          alt="GitHub"
                        />
                        GitHub
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>디자인</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/figma--v1.png"
                          alt="Figma"
                        />
                        Figma
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>배포</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://seeklogo.com/images/N/netlify-logo-758722CDF4-seeklogo.com.png"
                          alt="Netlify"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Netlify
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </FadeInLine>
            <FadeInLine
              delay={2500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>주요기능</h1>
              <p>
                <strong>숫자 및 연산자 입력</strong>
                <br></br>
                숫자(0~9),사칙연사(+,-,*,/)입력 가능
                <br></br>
                <strong>소수점 입력</strong>
                <br></br>. 입력으로 소수점 표시및 계산 가능
                <br></br>
                <strong>계산 결과 표시</strong>
                <br></br>= 입력으로 수식을 계산하여 결과 값을 표시
                <br></br>
                <strong>입력 초기화(C)</strong>
                <br></br>C 버튼으로 전체 값을 초기화
                <br></br> <strong>한 글자 삭제(←)</strong>
                <br></br>
                마지막 문자 삭제, 계산 직후에는 전체 초기화
                <br></br>
                <strong>부호 변경(+,-)</strong>
                <br></br>
                입력 값의 부호를 바꿀수있음
                <br></br>
                <strong>백분율 처리(%)</strong>
                <br></br>
                %를 /100으로 계산해서 퍼센트 백분율 계산 가능
                <br></br>
                <strong>연산 기록 보기/숨기기</strong>
                <br></br>
                연산 기록 보기 버튼으로 결과 기록을 표시
              </p>
            </FadeInLine>
          </section>
        );
      case "Project 2":
        return (
          <section>
            <FadeInLine
              delay={500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <div className="title">
                <h2>날씨 API 프로젝트</h2>
                <a
                  href="https://github.com/Dongsusin/my-portfolio/blob/main/src/Apps/Weather/Weather.jsx"
                  target=""
                  rel="noreferrer"
                >
                  <img src="/image/아이콘/github.png" alt="" className="icon" />
                </a>
              </div>
              <img src="/image/이력서/날씨페이지.png" alt="" />
            </FadeInLine>
            <FadeInLine
              delay={1000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 개요</h1>
              <p>React,css 날씨 API 구현 프로젝트 </p>
            </FadeInLine>
            <FadeInLine
              delay={1500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 기간</h1>
              <p>2일</p>
            </FadeInLine>
            <FadeInLine
              delay={2000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>기술 스택/협업 툴</h1>
              <table className="tool-table">
                <thead>
                  <tr>
                    <th>분류</th>
                    <th>툴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>언어</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/css3.png"
                          alt="CSS"
                        />
                        CSS3
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/javascript--v1.png"
                          alt="JavaScript"
                        />
                        JavaScript
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/react-native.png"
                          alt="React"
                        />
                        React
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>개발 환경</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/visual-studio-code-2019.png"
                          alt="VSCode"
                        />
                        VS Code
                      </span>
                      <span className="badge">
                        <img
                          src="https://vitejs.dev/logo.svg"
                          alt="Vite"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Vite
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>협업</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/git.png"
                          alt="Git"
                        />
                        Git
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/ios-glyphs/30/github.png"
                          alt="GitHub"
                        />
                        GitHub
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>디자인</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/figma--v1.png"
                          alt="Figma"
                        />
                        Figma
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>배포</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://seeklogo.com/images/N/netlify-logo-758722CDF4-seeklogo.com.png"
                          alt="Netlify"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Netlify
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </FadeInLine>
            <FadeInLine
              delay={2500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>주요기능</h1>
              <p>
                <strong> 현재 위치 기반 날씨 불러오기</strong>
                <br></br>
                최초 로딩시 navigator.geolocation으로 위치 추적
                <br></br>
                <strong>도시 이름으로 날씨 검색</strong>
                <br></br>
                도시명을 입력하면 API를 통해 날씨 조회
                <br></br>
                <strong>날씨 정보 표시</strong>
                <br></br>
                도시명, 현재 기온, 체감 온도, 습도, 풍속, 아이콘을 API로
                받아와서 표시
                <br></br>
                <strong>즐겨찾기 추가/삭제</strong>
                <br></br>
                도시를 즐겨찾기로 로컬에 저장및 삭제기능
                <br></br>
                <strong>음성 안내</strong>
                <br></br>
                현재 날씨 정보를 음성으로 읽어 주는 기능(speechSynthesis)
                <br></br>
                <strong>다크모드 전환</strong>
                <br></br>
                버튼 클릭시 다크/라이트 모드로 전환돼며 배경색,글자색이 변함
                <br></br>
                <strong>간단한 날씨 메세지</strong>
                <br></br>
                현재 날씨 상태에따라 간단한 메세지 표시
                <br></br>
                <strong>에러/로딩 처리</strong>
                <br></br>
                잘못된 도시 입력시 에러처리 및 로딩시 로딩 안내문자 표시
              </p>
            </FadeInLine>
          </section>
        );
      case "Project 3":
        return (
          <section>
            <FadeInLine
              delay={500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <div className="title">
                <h2>지도 API 프로젝트</h2>
                <a
                  href="https://github.com/Dongsusin/my-portfolio/blob/main/src/Apps/Map/Map.jsx"
                  target=""
                  rel="noreferrer"
                >
                  <img src="/image/아이콘/github.png" alt="" className="icon" />
                </a>
              </div>
              <img src="/image/이력서/지도페이지.png" alt="" />
            </FadeInLine>
            <FadeInLine
              delay={1000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 개요</h1>
              <p> React + Leaflet.js를 이용해 현재 위치를 지도에 표시하는 앱</p>
            </FadeInLine>
            <FadeInLine
              delay={1500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 기간</h1>
              <p>1일</p>
            </FadeInLine>
            <FadeInLine
              delay={2000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>기술 스택/협업 툴</h1>
              <table className="tool-table">
                <thead>
                  <tr>
                    <th>분류</th>
                    <th>툴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>언어</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/css3.png"
                          alt="CSS"
                        />
                        CSS3
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/javascript--v1.png"
                          alt="JavaScript"
                        />
                        JavaScript
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/react-native.png"
                          alt="React"
                        />
                        React
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>개발 환경</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/visual-studio-code-2019.png"
                          alt="VSCode"
                        />
                        VS Code
                      </span>
                      <span className="badge">
                        <img
                          src="https://vitejs.dev/logo.svg"
                          alt="Vite"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Vite
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>협업</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/git.png"
                          alt="Git"
                        />
                        Git
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/ios-glyphs/30/github.png"
                          alt="GitHub"
                        />
                        GitHub
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>디자인</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/figma--v1.png"
                          alt="Figma"
                        />
                        Figma
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>배포</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://seeklogo.com/images/N/netlify-logo-758722CDF4-seeklogo.com.png"
                          alt="Netlify"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Netlify
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </FadeInLine>
            <FadeInLine
              delay={2500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>주요기능</h1>
              <p>
                <strong>현재 위치 자동 탐지</strong>
                <br></br>
                최초 로딩시 navigator.geolocation으로 위치 추적
                <br></br>
                <strong>Leaflet 지도 표시</strong>
                <br></br>
                OpenStreetMap 기반 지도를 출력
                <br></br>
                <strong>현재 위치 마커 표시</strong>
                <br></br>
                커스텀 아이콘을 사용해 현재 위치를 마커로 표시
                <br></br>
                <strong>500m 반경 원 시각화</strong>
                <br></br>
                현재 위치를 기반으로 주변 500m를 원으로 그려 사용자의 위치 범위
                표현
                <br></br>
                <strong>위치 재탐색 버튼</strong>
                <br></br>
                위치 업데이트 버튼으로 위치를 다시 탐지 가능
                <br></br>
                <strong>에러 처리</strong>
                <br></br>
                위치 접근 실패시 오류 메세지 출력
              </p>
            </FadeInLine>
          </section>
        );
      case "Project 4":
        return (
          <section>
            <FadeInLine
              delay={500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <div className="title">
                <h2>메모장 프로젝트</h2>
                <a
                  href="https://github.com/Dongsusin/my-portfolio/blob/main/src/Apps/Memo/Memo.jsx"
                  target=""
                  rel="noreferrer"
                >
                  <img src="/image/아이콘/github.png" alt="" className="icon" />
                </a>
              </div>
              <img src="/image/이력서/메모장페이지.png" alt="" />
            </FadeInLine>
            <FadeInLine
              delay={1000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 개요</h1>
              <p> React를 이용해 만든 간단한 메모장 애플리케이션</p>
            </FadeInLine>
            <FadeInLine
              delay={1500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 기간</h1>
              <p>2일</p>
            </FadeInLine>
            <FadeInLine
              delay={2000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>기술 스택/협업 툴</h1>
              <table className="tool-table">
                <thead>
                  <tr>
                    <th>분류</th>
                    <th>툴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>언어</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/css3.png"
                          alt="CSS"
                        />
                        CSS3
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/javascript--v1.png"
                          alt="JavaScript"
                        />
                        JavaScript
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/react-native.png"
                          alt="React"
                        />
                        React
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>개발 환경</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/visual-studio-code-2019.png"
                          alt="VSCode"
                        />
                        VS Code
                      </span>
                      <span className="badge">
                        <img
                          src="https://vitejs.dev/logo.svg"
                          alt="Vite"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Vite
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>협업</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/git.png"
                          alt="Git"
                        />
                        Git
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/ios-glyphs/30/github.png"
                          alt="GitHub"
                        />
                        GitHub
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>디자인</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/figma--v1.png"
                          alt="Figma"
                        />
                        Figma
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>배포</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://seeklogo.com/images/N/netlify-logo-758722CDF4-seeklogo.com.png"
                          alt="Netlify"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Netlify
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </FadeInLine>
            <FadeInLine
              delay={2500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>주요기능</h1>
              <p>
                <strong>메모 목록 보기</strong>
                <br></br>
                저장된 메모를 리스트로 출력(최대 20자로 요약)
                <br></br>
                <strong>메모 작성</strong>
                <br></br>새 메모 추가 버튼으로 편집 화면으로 이동
                <br></br>
                <strong>메모 수정</strong>
                <br></br>
                기존 메모 클릭시 해당 메모의 내용을 불러와 편집할수있습니다.
                <br></br>
                <strong>메모 삭제</strong>
                <br></br>
                리스트에서 메오 옆X버튼트로 메모 개별삭제 기능
                <br></br>
                <strong>자동 저장</strong>
                <br></br>
                모든 메모는 로컬 스트리지에 저장되어 새로고침후에도 유지 됍니다.
                <br></br>
                <strong>텍스트 길이 표시</strong>
                <br></br>
                메모 작성중 하단에 글자수 표시
                <br></br>
                <strong>빈 메모 안내</strong>
                <br></br>
                현재 메모가 없으면 저장된 메모가 없습니다를 메세지로 표시.
              </p>
            </FadeInLine>
          </section>
        );
      case "Project 5":
        return (
          <section>
            <FadeInLine
              delay={500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <div className="title">
                <h2>그림판 프로젝트</h2>
                <a
                  href="https://github.com/Dongsusin/my-portfolio/blob/main/src/Apps/PaintApp/PaintApp.jsx"
                  target=""
                  rel="noreferrer"
                >
                  <img src="/image/아이콘/github.png" alt="" className="icon" />
                </a>
              </div>
              <img src="/image/이력서/그림판페이지.png" alt="" />
            </FadeInLine>
            <FadeInLine
              delay={1000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 개요</h1>
              <p> React를 이용해 만든 간단한 그림판 애플리케이션</p>
            </FadeInLine>
            <FadeInLine
              delay={1500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 기간</h1>
              <p>1일</p>
            </FadeInLine>
            <FadeInLine
              delay={2000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>기술 스택/협업 툴</h1>
              <table className="tool-table">
                <thead>
                  <tr>
                    <th>분류</th>
                    <th>툴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>언어</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/css3.png"
                          alt="CSS"
                        />
                        CSS3
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/javascript--v1.png"
                          alt="JavaScript"
                        />
                        JavaScript
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/react-native.png"
                          alt="React"
                        />
                        React
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>개발 환경</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/visual-studio-code-2019.png"
                          alt="VSCode"
                        />
                        VS Code
                      </span>
                      <span className="badge">
                        <img
                          src="https://vitejs.dev/logo.svg"
                          alt="Vite"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Vite
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>협업</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/git.png"
                          alt="Git"
                        />
                        Git
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/ios-glyphs/30/github.png"
                          alt="GitHub"
                        />
                        GitHub
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>디자인</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/figma--v1.png"
                          alt="Figma"
                        />
                        Figma
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>배포</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://seeklogo.com/images/N/netlify-logo-758722CDF4-seeklogo.com.png"
                          alt="Netlify"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Netlify
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </FadeInLine>
            <FadeInLine
              delay={2500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>주요기능</h1>
              <p>
                <strong>드로잉 기능</strong>
                <br></br>
                canvas요소를 이용한 드로잉기능
                <br></br>
                <strong>다양한 드로잉 설정</strong>
                <br></br>색상 선택,선 굵기 조절, 브러시 형태설정, 자유그리기,
                직선, 사각형, 원 그리기등을 지원
                <br></br>
                <strong>다양한 수정 기능</strong>
                <br></br>
                되돌리기, 다시 실행등으로 드로잉을 수정하며 지우개로 디테일
                수정가능
                <br></br>
                <strong>이미지 저장</strong>
                <br></br>
                이미지 저장 버튼으로 PNG파일로 다운로드 가능
              </p>
            </FadeInLine>
          </section>
        );
      case "Project 6":
        return (
          <section>
            <FadeInLine
              delay={500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <div className="title">
                <h2>뮤직 플레이어 프로젝트</h2>
                <a
                  href="https://github.com/Dongsusin/my-portfolio/blob/main/src/Apps/Music/Music.jsx"
                  target=""
                  rel="noreferrer"
                >
                  <img src="/image/아이콘/github.png" alt="" className="icon" />
                </a>
              </div>
              <img src="/image/이력서/뮤직플레이어페이지.png" alt="" />
            </FadeInLine>
            <FadeInLine
              delay={1000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 개요</h1>
              <p>
                {" "}
                React와 iTunes API를 이용해 만든 뮤직 플레이어 애플리케이션
              </p>
            </FadeInLine>
            <FadeInLine
              delay={1500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 기간</h1>
              <p>3일</p>
            </FadeInLine>
            <FadeInLine
              delay={2000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>기술 스택/협업 툴</h1>
              <table className="tool-table">
                <thead>
                  <tr>
                    <th>분류</th>
                    <th>툴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>언어</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/css3.png"
                          alt="CSS"
                        />
                        CSS3
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/javascript--v1.png"
                          alt="JavaScript"
                        />
                        JavaScript
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/react-native.png"
                          alt="React"
                        />
                        React
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>개발 환경</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/visual-studio-code-2019.png"
                          alt="VSCode"
                        />
                        VS Code
                      </span>
                      <span className="badge">
                        <img
                          src="https://vitejs.dev/logo.svg"
                          alt="Vite"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Vite
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>협업</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/git.png"
                          alt="Git"
                        />
                        Git
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/ios-glyphs/30/github.png"
                          alt="GitHub"
                        />
                        GitHub
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>디자인</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/figma--v1.png"
                          alt="Figma"
                        />
                        Figma
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>배포</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://seeklogo.com/images/N/netlify-logo-758722CDF4-seeklogo.com.png"
                          alt="Netlify"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Netlify
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </FadeInLine>
            <FadeInLine
              delay={2500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>주요기능</h1>
              <p>
                <strong>음악 검색 기능</strong>
                <br></br>
                음악의 제목을 검색해서 API내에서 정보를 받아와 리스트로 출력하는
                기능
                <br></br>
                <strong>오디오 재생 기능</strong>
                <br></br>
                선택한 음악을 Audio 태그로 재생및 오디오 컨트롤 지원
                <br></br>
                <strong>시크바 및 시간 표시</strong>
                <br></br>
                재생중인 트랙의 현재 진행 시간의 전체 길이를 mm:ss포멧으로 표시
                <br></br>
                <strong>볼륨 조절</strong>
                <br></br>
                슬라이더를 이용해서 0~1사이의 볼륨 설정 가능
              </p>
            </FadeInLine>
          </section>
        );
      case "Project 7":
        return (
          <section>
            <FadeInLine
              delay={500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <div className="title">
                <h2>도서 검색 프로젝트</h2>
                <a
                  href="https://github.com/Dongsusin/my-portfolio/blob/main/src/Apps/BookApp/BookApp.jsx"
                  target=""
                  rel="noreferrer"
                >
                  <img src="/image/아이콘/github.png" alt="" className="icon" />
                </a>
              </div>
              <img src="/image/이력서/도서페이지.png" alt="" />
            </FadeInLine>
            <FadeInLine
              delay={1000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 개요</h1>
              <p> React기반 도서 검색 웹 애플리케이션</p>
            </FadeInLine>
            <FadeInLine
              delay={1500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 기간</h1>
              <p>2일</p>
            </FadeInLine>
            <FadeInLine
              delay={2000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>기술 스택/협업 툴</h1>
              <table className="tool-table">
                <thead>
                  <tr>
                    <th>분류</th>
                    <th>툴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>언어</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/css3.png"
                          alt="CSS"
                        />
                        CSS3
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/javascript--v1.png"
                          alt="JavaScript"
                        />
                        JavaScript
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/react-native.png"
                          alt="React"
                        />
                        React
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>개발 환경</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/visual-studio-code-2019.png"
                          alt="VSCode"
                        />
                        VS Code
                      </span>
                      <span className="badge">
                        <img
                          src="https://vitejs.dev/logo.svg"
                          alt="Vite"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Vite
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>협업</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/git.png"
                          alt="Git"
                        />
                        Git
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/ios-glyphs/30/github.png"
                          alt="GitHub"
                        />
                        GitHub
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>디자인</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/figma--v1.png"
                          alt="Figma"
                        />
                        Figma
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>배포</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://seeklogo.com/images/N/netlify-logo-758722CDF4-seeklogo.com.png"
                          alt="Netlify"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Netlify
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </FadeInLine>
            <FadeInLine
              delay={2500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>주요기능</h1>
              <p>
                <strong>도서 검색 기능</strong>
                <br></br>
                query상태에 입력한 검색어를 기반으로 Google Books API에서 도서를
                조회해 정보를 받아와 도서 리스트로 출력하고 각 도서 클릭시
                상세페이지로 전환돼며 상세페이지에서는 해당 도서의 정보를 좀더
                자세히 나타내줍니다.
                <br></br>
                <strong>즐겨 찾기 기능</strong>
                <br></br>
                도서의 즐겨찾기 버튼을 이용해서 추가및/삭제 할수있습니다.
                <br></br>
                <strong>최근 검색기록 저장</strong>
                <br></br>
                최근 검색 기록을 5개까지 저장해서 좀더 편하게 다시
                검색할수있습니다.
                <br></br>
                <strong>정렬 기능</strong>
                <br></br>
                검색도서의 정렬기준을 관련도와 최신순으로 정렬할수있습니다.
              </p>
            </FadeInLine>
          </section>
        );
      case "Project 8":
        return (
          <section>
            <FadeInLine
              delay={500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <div className="title">
                <h2>금융 검색 프로젝트</h2>
                <a
                  href="https://github.com/Dongsusin/my-portfolio/blob/main/src/Apps/ExchangeRate/ExchangeRate.jsx"
                  target=""
                  rel="noreferrer"
                >
                  <img src="/image/아이콘/github.png" alt="" className="icon" />
                </a>
              </div>
              <img src="/image/이력서/금융페이지.png" alt="" />
            </FadeInLine>
            <FadeInLine
              delay={1000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 개요</h1>
              <p> React기반 금융 정보 대시보드 웹 애플리케이션</p>
            </FadeInLine>
            <FadeInLine
              delay={1500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 기간</h1>
              <p>3일</p>
            </FadeInLine>
            <FadeInLine
              delay={2000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>기술 스택/협업 툴</h1>
              <table className="tool-table">
                <thead>
                  <tr>
                    <th>분류</th>
                    <th>툴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>언어</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/css3.png"
                          alt="CSS"
                        />
                        CSS3
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/javascript--v1.png"
                          alt="JavaScript"
                        />
                        JavaScript
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/react-native.png"
                          alt="React"
                        />
                        React
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>개발 환경</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/visual-studio-code-2019.png"
                          alt="VSCode"
                        />
                        VS Code
                      </span>
                      <span className="badge">
                        <img
                          src="https://vitejs.dev/logo.svg"
                          alt="Vite"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Vite
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>협업</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/git.png"
                          alt="Git"
                        />
                        Git
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/ios-glyphs/30/github.png"
                          alt="GitHub"
                        />
                        GitHub
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>디자인</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/figma--v1.png"
                          alt="Figma"
                        />
                        Figma
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>배포</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://seeklogo.com/images/N/netlify-logo-758722CDF4-seeklogo.com.png"
                          alt="Netlify"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Netlify
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </FadeInLine>
            <FadeInLine
              delay={2500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>주요기능</h1>
              <p>
                <strong>코인 시세 보기</strong>
                <br></br>
                코인을 지정해두고 지정한 코인의 시세를 API로 받아와 테입ㄹ
                형식으로 나타내주며 상승/하락에따라 색상을 다르게주었습니다.
                <br></br>
                <strong>환률 정보 보기</strong>
                <br></br>
                기준 통화중에 보고싶은 통화를 선택해서 해당 통화를 기준으로 다른
                통화의 환률을 표시해줍니다. 해당API의 통화값은 영문이라 통화값에
                따라 한글통화값을 지원하도록 함수로 변경해서 지원합니다.
                <br></br>
                <strong>주식 정보 보기</strong>
                <br></br>
                주식의 심볼을 영문으로 검색해서 해당 주식의 현재가,전일대비 가격
                변동률등을 API로 받아와서 보여주며, 오류 발생시 메세지를
                보여줍니다.
                <br></br>
                <strong>탭 전환 시스템</strong>
                <br></br>
                각각의 정보 탭으로 전환할수있는 시스템입니다.
              </p>
            </FadeInLine>
          </section>
        );
      case "Project 9":
        return (
          <section>
            <FadeInLine
              delay={500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <div className="title">
                <h2>여행 API 프로젝트</h2>
                <a
                  href="https://github.com/Dongsusin/my-portfolio/blob/main/src/Apps/Travel/Travel.jsx"
                  target=""
                  rel="noreferrer"
                >
                  <img src="/image/아이콘/github.png" alt="" className="icon" />
                </a>
              </div>
              <img src="/image/이력서/여행페이지.png" alt="" />
            </FadeInLine>
            <FadeInLine
              delay={1000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 개요</h1>
              <p> React기반 여행 정보 애플리케이션</p>
            </FadeInLine>
            <FadeInLine
              delay={1500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 기간</h1>
              <p>1일</p>
            </FadeInLine>
            <FadeInLine
              delay={2000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>기술 스택/협업 툴</h1>
              <table className="tool-table">
                <thead>
                  <tr>
                    <th>분류</th>
                    <th>툴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>언어</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/css3.png"
                          alt="CSS"
                        />
                        CSS3
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/javascript--v1.png"
                          alt="JavaScript"
                        />
                        JavaScript
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/react-native.png"
                          alt="React"
                        />
                        React
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>개발 환경</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/visual-studio-code-2019.png"
                          alt="VSCode"
                        />
                        VS Code
                      </span>
                      <span className="badge">
                        <img
                          src="https://vitejs.dev/logo.svg"
                          alt="Vite"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Vite
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>협업</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/git.png"
                          alt="Git"
                        />
                        Git
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/ios-glyphs/30/github.png"
                          alt="GitHub"
                        />
                        GitHub
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>디자인</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/figma--v1.png"
                          alt="Figma"
                        />
                        Figma
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>배포</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://seeklogo.com/images/N/netlify-logo-758722CDF4-seeklogo.com.png"
                          alt="Netlify"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Netlify
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </FadeInLine>
            <FadeInLine
              delay={2500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>주요기능</h1>
              <p>
                <strong>항공편 조회 기능</strong>
                <br></br>
                출발지와 도착지의 공항 코드를 입력해서 검색하며 출발
                국가,항공사,항공편 번호,고도,속도등을 보여줍니다.
                <br></br>
                <strong>여행지 검색</strong>
                <br></br>
                도시의 이름을 입력해서 검색하고 검색한 도시를 보여주며 도시
                클릭시 해당도시의 국가,지역,위도/경도,인구등의 자세한 정보를
                보여주며 Google Maps를 통해 위치를 볼수있는 링크를 제공합니다.
              </p>
            </FadeInLine>
          </section>
        );
      case "Project 10":
        return (
          <section>
            <FadeInLine
              delay={500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <div className="title">
                <h2>포켓몬 도감 프로젝트</h2>
                <a
                  href="https://github.com/Dongsusin/my-portfolio/blob/main/src/Apps/pokedex/pokedex.jsx"
                  target=""
                  rel="noreferrer"
                >
                  <img src="/image/아이콘/github.png" alt="" className="icon" />
                </a>
              </div>
              <img src="/image/이력서/포켓몬페이지.png" alt="" />
            </FadeInLine>
            <FadeInLine
              delay={1000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 개요</h1>
              <p>React 기반의 PokemonAPI를 이용한 웹 애플리케이션</p>
            </FadeInLine>
            <FadeInLine
              delay={1500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 기간</h1>
              <p>7일</p>
            </FadeInLine>
            <FadeInLine
              delay={2000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>기술 스택/협업 툴</h1>
              <table className="tool-table">
                <thead>
                  <tr>
                    <th>분류</th>
                    <th>툴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>언어</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/css3.png"
                          alt="CSS"
                        />
                        CSS3
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/javascript--v1.png"
                          alt="JavaScript"
                        />
                        JavaScript
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/react-native.png"
                          alt="React"
                        />
                        React
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>개발 환경</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/visual-studio-code-2019.png"
                          alt="VSCode"
                        />
                        VS Code
                      </span>
                      <span className="badge">
                        <img
                          src="https://vitejs.dev/logo.svg"
                          alt="Vite"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Vite
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>협업</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/git.png"
                          alt="Git"
                        />
                        Git
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/ios-glyphs/30/github.png"
                          alt="GitHub"
                        />
                        GitHub
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>디자인</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/figma--v1.png"
                          alt="Figma"
                        />
                        Figma
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>배포</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://seeklogo.com/images/N/netlify-logo-758722CDF4-seeklogo.com.png"
                          alt="Netlify"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Netlify
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </FadeInLine>
            <FadeInLine
              delay={2500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>주요기능</h1>
              <p>
                <strong>포켓몬 검색 기능</strong>
                <br></br>
                이름을 검색해서 해당 포켓몬의 정보를 보여 줍니다
                <br></br>
                <strong>타입별 필터링</strong>
                <br></br>
                해당 포켓몬의 타입에따라 해당타입을 가진 포켓몬만으로 다시
                필터링해주는 기능
                <br></br>
                <strong>즐겨찾기</strong>
                <br></br>
                상세 페이지에서 즐겨찾기를 추가하고 필터창에서 즐겨찾기만
                필터링하는 기능이 있습니다.
                <br></br>
                <strong>타입 한글화및 타입에따른 border색상 변화</strong>
                <br></br>
                api로 받아온 타입을 한글화하고, 각 타입에따라 배경색을
                설정해주고 대표타입에따라 해당 포켓몬카드의 border색상도
                변화하는 기능
                <br></br>
                <strong>상세 페이지</strong>
                <br></br>각 포켓몬 카드 클릭시 상세 페이지로 전환돼며
                상세페이지에는 이미지가 gif으로 변경돼며 능력치를 추가로
                표시해주며 이전및 다음 포켓몬으로 도감순서에따라
                이동할수있습니다.
                <br></br>
                <strong>스탯/진화 페이지</strong>
                <br></br>스탯은 프로그래스바형태와 육각형스탯으로 분리했으며
                프로그래스바는 스탯에따라 색상이변화합니다. 진화페이지는 api로
                해당포켓몬의 진화정보를 받아와서 이미지로 표시해줍니다.
              </p>
            </FadeInLine>
          </section>
        );
      case "Project 11":
        return (
          <section>
            <FadeInLine
              delay={500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <div className="title">
                <h2>테트리스 프로젝트</h2>
                <a
                  href="https://github.com/Dongsusin/my-portfolio/blob/main/src/Apps/Tetris/Tetris.jsx"
                  target=""
                  rel="noreferrer"
                >
                  <img src="/image/아이콘/github.png" alt="" className="icon" />
                </a>
              </div>
              <img src="/image/이력서/테트리스페이지.png" alt="" />
            </FadeInLine>
            <FadeInLine
              delay={1000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 개요</h1>
              <p> React기반의 웹 테트리스 게임입니다</p>
            </FadeInLine>
            <FadeInLine
              delay={1500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 기간</h1>
              <p>5일</p>
            </FadeInLine>
            <FadeInLine
              delay={2000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>기술 스택/협업 툴</h1>
              <table className="tool-table">
                <thead>
                  <tr>
                    <th>분류</th>
                    <th>툴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>언어</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/css3.png"
                          alt="CSS"
                        />
                        CSS3
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/javascript--v1.png"
                          alt="JavaScript"
                        />
                        JavaScript
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/react-native.png"
                          alt="React"
                        />
                        React
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>개발 환경</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/visual-studio-code-2019.png"
                          alt="VSCode"
                        />
                        VS Code
                      </span>
                      <span className="badge">
                        <img
                          src="https://vitejs.dev/logo.svg"
                          alt="Vite"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Vite
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>협업</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/git.png"
                          alt="Git"
                        />
                        Git
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/ios-glyphs/30/github.png"
                          alt="GitHub"
                        />
                        GitHub
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>디자인</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/figma--v1.png"
                          alt="Figma"
                        />
                        Figma
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>배포</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://seeklogo.com/images/N/netlify-logo-758722CDF4-seeklogo.com.png"
                          alt="Netlify"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Netlify
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </FadeInLine>
            <FadeInLine
              delay={2500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>주요기능</h1>
              <p>
                <strong>도형의 이동 및 회전</strong>
                <br></br>
                양쪽 방향키를 이용해서 좌우로 이동하며,아래 방향키로 1칸 아래로
                이동,위쪽 방향키로 회전,스페이스바로 가장 밑으로 바로내리는
                하드드롭 기능을 구현했습니다.
                <br></br>
                <strong>라인 삭제 및 점수 처리</strong>
                <br></br>
                1줄이 가득차면 감지해서 1줄을 애니메이션으로 제거하며 사운드가
                재생됍니다, 한줄당 100점이 증가하며, 2줄이상 없어지면
                콤보메세지가 표시됩니다.
                <br></br>
                <strong>레벨 증가</strong>
                <br></br>
                점수가 500점 단위로 레벨이 오르며 레벨리오를때마다 낙하속도가
                증가하며,레벨업 사운드가 재생됍니다.
                <br></br>
                <strong>게임 오버</strong>
                <br></br>
                새로운 블록이 생성돼는 위치에 다른 블록이 있으면 감지해서 게임이
                오버돼고 최고점수와 비교해서 점수를 기록합니다.
                <br></br>
                <strong>고스트 블록</strong>
                <br></br>
                현재 블록이 하드드롭시 위치하는 위치를 반투명으로 미리
                보여줍니다.
              </p>
            </FadeInLine>
          </section>
        );
      case "Project 12":
        return (
          <section>
            <FadeInLine
              delay={500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <div className="title">
                <h2>반응속도 프로젝트</h2>
                <a
                  href="https://github.com/Dongsusin/my-portfolio/blob/main/src/Apps/Speed/Speed.jsx"
                  target=""
                  rel="noreferrer"
                >
                  <img src="/image/아이콘/github.png" alt="" className="icon" />
                </a>
              </div>
              <img src="/image/이력서/반응속도페이지.png" alt="" />
            </FadeInLine>
            <FadeInLine
              delay={1000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 개요</h1>
              <p> React+ChatGpt로 구현해본 반응속도 테스트 애플리케이션</p>
            </FadeInLine>
            <FadeInLine
              delay={1500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 기간</h1>
              <p>1일</p>
            </FadeInLine>
            <FadeInLine
              delay={2000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>기술 스택/협업 툴</h1>
              <table className="tool-table">
                <thead>
                  <tr>
                    <th>분류</th>
                    <th>툴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>언어</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/css3.png"
                          alt="CSS"
                        />
                        CSS3
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/javascript--v1.png"
                          alt="JavaScript"
                        />
                        JavaScript
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/react-native.png"
                          alt="React"
                        />
                        React
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>개발 환경</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/visual-studio-code-2019.png"
                          alt="VSCode"
                        />
                        VS Code
                      </span>
                      <span className="badge">
                        <img
                          src="https://vitejs.dev/logo.svg"
                          alt="Vite"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Vite
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>협업</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/git.png"
                          alt="Git"
                        />
                        Git
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/ios-glyphs/30/github.png"
                          alt="GitHub"
                        />
                        GitHub
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>디자인</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/figma--v1.png"
                          alt="Figma"
                        />
                        Figma
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>배포</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://seeklogo.com/images/N/netlify-logo-758722CDF4-seeklogo.com.png"
                          alt="Netlify"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Netlify
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </FadeInLine>
            <FadeInLine
              delay={2500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>주요기능</h1>
              <p>
                <strong>게임의 상태 구분</strong>
                <br></br>
                상태에따라 대기상태,준비상태,클릭상태,결과상태로 나눠고
                해당상태에따라 요소가 변화합니다.
                <br></br>
                <strong>반응 속도 측정</strong>
                <br></br>
                화면이 초록색이돼면 퍼센트를 사용해서 사용자의 반응속도를 소수전
                2자리까지 표시해주며,초록색이 돼기전에 클릭하면 주의 메세지를
                출력합니다.
                <br></br>
                <strong>결과 출력후 재시작</strong>
                <br></br>
                측정이 완료돼면 반응속도의 결과를 출력해주며 클릭으로 재시작
                할수있습니다.
              </p>
            </FadeInLine>
          </section>
        );
      case "Project 13":
        return (
          <section>
            <FadeInLine
              delay={500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <div className="title">
                <h2>틱택토 프로젝트</h2>
                <a
                  href="https://github.com/Dongsusin/my-portfolio/blob/main/src/Apps/TicTacToe/TicTacToe.jsx"
                  target=""
                  rel="noreferrer"
                >
                  <img src="/image/아이콘/github.png" alt="" className="icon" />
                </a>
              </div>
              <img src="/image/이력서/틱택토페이지.png" alt="" />
            </FadeInLine>
            <FadeInLine
              delay={1000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 개요</h1>
              <p> React+ChatGpt로 구현해본 틱택토게임</p>
            </FadeInLine>
            <FadeInLine
              delay={1500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 기간</h1>
              <p>1일</p>
            </FadeInLine>
            <FadeInLine
              delay={2000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>기술 스택/협업 툴</h1>
              <table className="tool-table">
                <thead>
                  <tr>
                    <th>분류</th>
                    <th>툴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>언어</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/css3.png"
                          alt="CSS"
                        />
                        CSS3
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/javascript--v1.png"
                          alt="JavaScript"
                        />
                        JavaScript
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/react-native.png"
                          alt="React"
                        />
                        React
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>개발 환경</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/visual-studio-code-2019.png"
                          alt="VSCode"
                        />
                        VS Code
                      </span>
                      <span className="badge">
                        <img
                          src="https://vitejs.dev/logo.svg"
                          alt="Vite"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Vite
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>협업</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/git.png"
                          alt="Git"
                        />
                        Git
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/ios-glyphs/30/github.png"
                          alt="GitHub"
                        />
                        GitHub
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>디자인</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/figma--v1.png"
                          alt="Figma"
                        />
                        Figma
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>배포</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://seeklogo.com/images/N/netlify-logo-758722CDF4-seeklogo.com.png"
                          alt="Netlify"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Netlify
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </FadeInLine>
            <FadeInLine
              delay={2500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>주요기능</h1>
              <p>
                <strong>게임판 구성</strong>
                <br></br>
                3*3으로 게임보드를 구성하며, 현재값에따라 null,X,O로 구분
                <br></br>
                <strong>사용자 vs AI 턴 시스템</strong>
                <br></br>
                사용자가 먼저 클릭해서 X를 표시하며, 그후 AI가 랜덤으로 O를
                표시하며 돌아가며 먼저1줄을 채우면 승리하는방식
                <br></br>
                <strong>게임 상태표시 및 재시작</strong>
                <br></br>
                게임상태에따라 누구의 턴인지 상단에 표시돼며 게임 종료시
                무승부,누구의 승리인지를 표시해주고 재시작버튼이 나타나며 재시작
                버튼으로 게임 초기화 가능
              </p>
            </FadeInLine>
          </section>
        );
      case "Project 14":
        return (
          <section>
            <FadeInLine
              delay={500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <div className="title">
                <h2>카드 뒤집기 프로젝트</h2>
                <a
                  href="https://github.com/Dongsusin/my-portfolio/blob/main/src/Apps/MemoryGame/MemoryGame.jsx"
                  target=""
                  rel="noreferrer"
                >
                  <img src="/image/아이콘/github.png" alt="" className="icon" />
                </a>
              </div>
              <img src="/image/이력서/카드페이지.png" alt="" />
            </FadeInLine>
            <FadeInLine
              delay={1000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 개요</h1>
              <p> React+ChatGpt로 구현해본 카드 뒤집기게임</p>
            </FadeInLine>
            <FadeInLine
              delay={1500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 기간</h1>
              <p>2일</p>
            </FadeInLine>
            <FadeInLine
              delay={2000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>기술 스택/협업 툴</h1>
              <table className="tool-table">
                <thead>
                  <tr>
                    <th>분류</th>
                    <th>툴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>언어</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/css3.png"
                          alt="CSS"
                        />
                        CSS3
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/javascript--v1.png"
                          alt="JavaScript"
                        />
                        JavaScript
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/react-native.png"
                          alt="React"
                        />
                        React
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>개발 환경</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/visual-studio-code-2019.png"
                          alt="VSCode"
                        />
                        VS Code
                      </span>
                      <span className="badge">
                        <img
                          src="https://vitejs.dev/logo.svg"
                          alt="Vite"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Vite
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>협업</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/git.png"
                          alt="Git"
                        />
                        Git
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/ios-glyphs/30/github.png"
                          alt="GitHub"
                        />
                        GitHub
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>디자인</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/figma--v1.png"
                          alt="Figma"
                        />
                        Figma
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>배포</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://seeklogo.com/images/N/netlify-logo-758722CDF4-seeklogo.com.png"
                          alt="Netlify"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Netlify
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </FadeInLine>
            <FadeInLine
              delay={2500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>주요기능</h1>
              <p>
                <strong>게임판의 크기 선택기능</strong>
                <br></br>
                인트로 상태에서 게임판의 크기를 최대(12쌍)까지 선택할수있습니다.
                <br></br>
                <strong>카드 생성 및 섞기</strong>
                <br></br>
                랜덤 이모지를 복제하여 각각 2개씩 선택한 쌍만큼 랜덤위치에
                생성합니다
                <br></br>
                <strong>게임 상태 및 뒤집기</strong>
                <br></br>
                카드가 생성돼면 클릭으로 카드를 뒤집어서 이모지를 확인할수있으며
                같은 이모지면 트루값으로 맟춘 개수가 증가하며, 틀린 이모지면
                false값으로 다시 뒤집어집니다.
              </p>
            </FadeInLine>
          </section>
        );
      case "Project 15":
        return (
          <section>
            <FadeInLine
              delay={500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <div className="title">
                <h2>턴제 카드 게임 프로젝트</h2>
                <a
                  href="https://github.com/Dongsusin/my-portfolio/blob/main/src/Apps/TurnBasedCardRPG/TurnBasedCardRPG.jsx"
                  target=""
                  rel="noreferrer"
                >
                  <img src="/image/아이콘/github.png" alt="" className="icon" />
                </a>
              </div>
              <img src="/image/이력서/턴제카드게임.png" alt="" />
            </FadeInLine>
            <FadeInLine
              delay={1000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 개요</h1>
              <p>
                그동안 만들어본 게임개발 경험을 기반으로 만들어본 규모가크고
                로직이 복잡한 React로 만들어본 턴제 카드RPG게임
              </p>
            </FadeInLine>
            <FadeInLine
              delay={1500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 기간</h1>
              <p>10일</p>
            </FadeInLine>
            <FadeInLine
              delay={2000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>기술 스택/협업 툴</h1>
              <table className="tool-table">
                <thead>
                  <tr>
                    <th>분류</th>
                    <th>툴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>언어</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/css3.png"
                          alt="CSS"
                        />
                        CSS3
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/javascript--v1.png"
                          alt="JavaScript"
                        />
                        JavaScript
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/react-native.png"
                          alt="React"
                        />
                        React
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>개발 환경</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/visual-studio-code-2019.png"
                          alt="VSCode"
                        />
                        VS Code
                      </span>
                      <span className="badge">
                        <img
                          src="https://vitejs.dev/logo.svg"
                          alt="Vite"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Vite
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>협업</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/git.png"
                          alt="Git"
                        />
                        Git
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/ios-glyphs/30/github.png"
                          alt="GitHub"
                        />
                        GitHub
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>디자인</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/figma--v1.png"
                          alt="Figma"
                        />
                        Figma
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>배포</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://seeklogo.com/images/N/netlify-logo-758722CDF4-seeklogo.com.png"
                          alt="Netlify"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Netlify
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </FadeInLine>
            <FadeInLine
              delay={2500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>주요기능</h1>
              <p>
                <strong>턴 기반의 전투 시스템</strong>
                <br></br>
                플레이어와 적이 번갈아가며 턴을 진행하며, 플레이어는 매턴 5장의
                카드를 뽑고 각카드에따라 공격,방어,회복등을 하며 적은 자동으로
                공격합니다.
                <br></br>
                <strong>카드 시스템</strong>
                <br></br>
                플레이어는 여러장의 카드중 매턴 5장의 카드를 랜덤으로 뽑으며
                각카드는 1번만 사용할수있으며 공격,방어,회복,버프,디버프등의
                기능을 수행
                <br></br>
                <strong>전투 로직</strong>
                <br></br>
                공격시 상대의 hp를 감소시키며 방어력이 있으시 방어력이 먼저
                감소후 체력이 감소
                <br></br>
                <strong>상태 관리</strong>
                <br></br>
                중독,기절등의 상태가 있으며 중독은 매턴 체력이 감소하며,기절은
                1턴간 행동이 불가합니다.
                <br></br>
                <strong>스테이지 구성</strong>
                <br></br>
                해당 게임은 스테이지 형식을 구성돼어있으며, 매 스테이지마다 적이
                1~3마리까지 랜덤으로 등장하며 스테이지가 오를때마다 적이
                강해지며, 스테이지 클리어시 골드가 주어지며, 해당 골드로는
                3스테이지마다 상점페이지가 나오며 상점에서는 게이지
                증가,카드강화,장비구매등을 할수있습니다. 또한 5스테이지마다 보스
                스테이지가 등장하며 보스는 다른 적이비해 강력합니다.
                <br></br>
                <strong>게이지 시스템</strong>
                <br></br>
                해당 게임은 각 카드마다 소모돼는 게이지가있고 게이지가 부족하면
                카드를 사용할수없습니다. 게이지는 상점 스테이지에서
                증가시킬수있습니다.
                <br></br>
                <strong>카드 강화 시스템</strong>
                <br></br>
                상점 스테이지에서 카드를 강화할수있으며 카드를 강화하면
                데미지,힐량,방어력 등이 증가하며 각카드마다 최대 5번까지
                강화할수있습니다.
                <br></br>
                <strong>장비 시스템</strong>
                <br></br>
                장비는 상점 스테이지에서 구매할수있으며, 장비는
                투구,무기,갑옷,신발,장갑이 있으며 종류마다
                공격력,방어력,체력등이 증가하며 항상 현재 장비보다 좋은 장비가
                등장합니다.
                <br></br>
                <strong>기록 시스템</strong>
                <br></br>
                최대로 오른 스테이지를 5개까지 로컬로 저장해서 보여줍니다.
                <br></br>
                <strong>게임 로그 시스템</strong>
                <br></br>
                게임이 진행돼면서 그동안의 과정을 메세지로 보여주며, 버튼으로
                열고 닫을수있습니다.
              </p>
            </FadeInLine>
          </section>
        );
      default:
        return null;
    }
  };

  const renderTeamProjectPage = () => {
    const project = teamProjectPages[currentTeamProjectIndex];
    switch (project) {
      case "Team Project 1":
        return (
          <section>
            <FadeInLine
              delay={500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <div className="title">
                <h2>윌리의 서재 UI/UX 프로젝트</h2>
                <a
                  href="https://github.com/FRONTENDBOOTCAMP-13th/9RoDigital"
                  target=""
                  rel="noreferrer"
                >
                  <img src="/image/아이콘/github.png" alt="" className="icon" />
                </a>
              </div>
              <img src="/image/이력서/팀프로젝트1.svg" alt="팀 프로젝트 1" />
            </FadeInLine>
            <FadeInLine
              delay={1000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>월리의 서재를 소개합니다!</h1>
              <p>
                안녕하세요! 9로디지털 팀은 국내 최대 전자책 구독 서비스 '밀리의
                서재'의 디자인을 참고하여 '윌리의 서재' 프로젝트를 진행했습니다.
                사용자 중심의 UI 디자인과 직관적인 인터페이스를 만들기 위해
                노력했습니다. 팀원 각자의 강점을 살린 효율적인 협업 과정을 통해
                아이디어를 발전시키고, 함께 문제를 해결하며 모두가 한 단계
                성장할 수 있는 소중한 경험이었습니다.
              </p>
            </FadeInLine>
            <FadeInLine
              delay={1500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 개요</h1>
              <p>윌리의 서재 UI/UX 프로젝트</p>
            </FadeInLine>
            <FadeInLine
              delay={2000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 기간</h1>
              <p>2025.03.14~2025.03.25</p>
            </FadeInLine>
            <FadeInLine
              delay={2500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>기술 스택/협업 툴</h1>
              <table className="tool-table">
                <thead>
                  <tr>
                    <th>분류</th>
                    <th>툴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>언어</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/html-5--v1.png"
                          alt="HTML"
                        />
                        HTML5
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/css3.png"
                          alt="CSS"
                        />
                        CSS3
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/tailwindcss.png"
                          alt="Tailwind"
                        />
                        TailwindCSS
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/javascript--v1.png"
                          alt="JavaScript"
                        />
                        JavaScript
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>개발 환경</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/visual-studio-code-2019.png"
                          alt="VSCode"
                        />
                        VS Code
                      </span>
                      <span className="badge">
                        <img
                          src="https://vitejs.dev/logo.svg"
                          alt="Vite"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Vite
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>협업</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/git.png"
                          alt="Git"
                        />
                        Git
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/ios-glyphs/30/github.png"
                          alt="GitHub"
                        />
                        GitHub
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/discord-logo.png"
                          alt="Discord"
                        />
                        Discord
                      </span>
                      <span className="badge">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png"
                          alt="Notion"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Notion
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>디자인</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/figma--v1.png"
                          alt="Figma"
                        />
                        Figma
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>배포</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://seeklogo.com/images/N/netlify-logo-758722CDF4-seeklogo.com.png"
                          alt="Netlify"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Netlify
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </FadeInLine>
            <FadeInLine
              delay={3000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>주요기능</h1>
              <p>
                <strong>홈 화면</strong>
                <br></br>
                추천 도서,인기 도서, 신간 도서등 다양한 카테고리별 도서 큐레이션
                <br></br>
                <strong>도서 검색</strong>
                <br></br>
                제목,저자,출판사 등 다양한 조건으로 도서 검색 기능
                <br></br>
                <strong>도서 상세 페이지</strong>
                <br></br>
                도서 정보, 리뷰, 관련 도서 추천
                <br></br>
                <strong>내 서재</strong>
                <br></br>
                사용자가 읽은 책, 읽고 있는 책, 찜한 책 관리
                <br></br>
                <strong>반응형 디자인</strong>
                <br></br>
                모바일, 태블릿, 데스크톱 환경에 최적화된 UI
                <br></br>
                <strong>모듈식 레이아웃</strong>
                <br></br>
                헤더, 푸터, 버튼, 타이틀 등 레이아웃 요소를 컴포넌트 형식으로
                제작
                <br></br>
                <strong>Tailwind 기반 디자인</strong>
                <br></br>
                일괄된 디자인 시스템으로 빠른 스타일링이 가능하며,
                커스터마이징이 용이
              </p>
            </FadeInLine>
            <FadeInLine
              delay={3500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <a href="https://9rodigital-willie.netlify.app/">
                <button>배포 사이트</button>
              </a>
            </FadeInLine>
          </section>
        );
      case "Team Project 2":
        return (
          <section>
            <FadeInLine
              delay={500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <div className="title">
                <h2>2048 JavaScript 프로젝트</h2>
                <a
                  href="https://github.com/FRONTENDBOOTCAMP-13th/JS-03-2048-in-3lines"
                  target=""
                  rel="noreferrer"
                >
                  <img src="/image/아이콘/github.png" alt="" className="icon" />
                </a>
              </div>
              <img src="/image/아이콘/js프로젝트.svg" alt="팀 프로젝트 2" />
            </FadeInLine>
            <FadeInLine
              delay={1000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>2048 in 3line을 소개합니다</h1>
              <p>
                기존의 2048 게임을 저희 팀만의 로직과 디자인으로 재해석한
                프로젝트입니다. 코드의 간결함과 유지 보수성을 높이는 데
                집중하였습니다.
              </p>
            </FadeInLine>
            <FadeInLine
              delay={1500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 개요</h1>
              <p>
                2048 게임을 Vanilla JavaScript 환경에서 직접 구현한 웹 게임
                프로젝트입니다.
              </p>
            </FadeInLine>
            <FadeInLine
              delay={2000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              {" "}
              <h1>프로젝트 기간</h1>
              <p>2025.05.09~2025.05.23</p>
            </FadeInLine>
            <FadeInLine
              delay={2500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>기술 스택/협업 툴</h1>
              <table className="tool-table">
                <thead>
                  <tr>
                    <th>분류</th>
                    <th>툴</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>언어</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/html-5--v1.png"
                          alt="HTML"
                        />
                        HTML5
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/css3.png"
                          alt="CSS"
                        />
                        CSS3
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/typescript.png"
                          alt="TypeScript"
                        />
                        TypeScript
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/javascript--v1.png"
                          alt="JavaScript"
                        />
                        JavaScript
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>개발 환경</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/visual-studio-code-2019.png"
                          alt="VSCode"
                        />
                        VS Code
                      </span>
                      <span className="badge">
                        <img
                          src="https://vitejs.dev/logo.svg"
                          alt="Vite"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Vite
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>협업</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/git.png"
                          alt="Git"
                        />
                        Git
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/ios-glyphs/30/github.png"
                          alt="GitHub"
                        />
                        GitHub
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/discord-logo.png"
                          alt="Discord"
                        />
                        Discord
                      </span>
                      <span className="badge">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png"
                          alt="Notion"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Notion
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>디자인</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/figma--v1.png"
                          alt="Figma"
                        />
                        Figma
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>배포</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://seeklogo.com/images/N/netlify-logo-758722CDF4-seeklogo.com.png"
                          alt="Netlify"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Netlify
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>패키지</td>
                    <td>
                      <span className="badge">
                        <img
                          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg"
                          alt="ESLint"
                          style={{ width: "16px", height: "16px" }}
                        />
                        ESLint
                      </span>
                      <span className="badge">
                        <img
                          src="https://img.icons8.com/color/48/nodejs.png"
                          alt="Node.js"
                        />
                        Node.js
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </FadeInLine>
            <FadeInLine
              delay={3000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>주요기능</h1>
              <p>
                <strong>타일 이동 및 병합</strong>
                <br></br>
                방향키를 이용해서 타일이 각 방향으로 이동히며 이동방향에
                같은값의 타일이 있으면 현재 값*2로 값이 변하며 타일 2개가
                병합돼도록 구현했습니다.
                <br></br>
                <strong>타일 자동 생성</strong>
                <br></br>
                게임 시작시 2개의 셀이 랜덤 위치에 생성돼며 이동마다 추가로
                비어있는 셀의 랜덤위치에 2또는 4의 값을 가진 셀이 생성돼도록
                구현했습니다.
                <br></br>
                <strong>점수 시스템</strong>
                <br></br>
                병합시 현재 셀의 값*2의 점수가 오르도록 구현했으며,최고기록과
                비교해서 현재 점수가 최고기록 보다 높으면 최고기록이 갱신돼며,
                최고기록은 1일단위로 기록및 초기화 됍니다.
                <br></br>
                <strong>사운드 효과</strong>
                <br></br>
                게임 시작시 브금이 실행돼며 데스크톱 환경에서는 사운드 스크롤
                느낌으로 사운드 조절이 가능하고 모바일 환경은 사운드 온/오프
                버튼으로 구현했습니다.
                <br></br>
                <strong>게임 종료및 승리 조건 처리</strong>
                <br></br>
                이동 및병합시마다 현재 타일중에 이동및 병합이 가능한 타일을
                조건으로 검사해서 만약 이동및 병합할수있는 타일이 없으면
                게임오버가 표시돼며, 타일을 합쳤을때 타일의값이 2048이 돼면
                게임승리가 표시됍니다.
                <br></br>
                <strong>모바일 대응(터치 슬라이드)</strong>
                <br></br>
                모바일 환경에서도 플레이할수 있도록 터치 슬라이드로도 이동및
                병합이 가능하도록 구현했습니다.
                <br></br>
                <strong>반응형 웹 디자인</strong>
                <br></br>
                다양한 환경에서 원활히 플레이할수있도록 스크린 크기에 맟게
                반응형으로 디자인 하였습니다.
                <br></br>
                <strong>보드 크기변경</strong>
                <br></br>
                게임 보드의 보드를 실시간으로(3*3,4*4,5*5)의 크기로 변경이
                가능하며 난이도 조절의 역활을 하도록 구현했습니다.
                <br></br>
                <strong>이동 애니메이션 구현</strong>
                <br></br>
                이동시 타일의 위치를 이동후 보드값을 업데이트하는 방식으로
                자연스럽게 이동 애니메이션이 작동하도록 구현했습니다.
                <br></br>
                <strong>타임어택 모드</strong>
                <br></br>
                게임 시작시 타이머가 실행돼며 타이머의 값이 상단에 표시돼며 값이
                0이됄때 까지의 최고점수를 구하는 모드입니다.
                <br></br>
                <strong>하드 모드</strong>
                <br></br>
                게임 시작시 랜덤 위치에 이동및 병합이 불가능한 -1값의 셀을
                추가로 생성하며 그값을 피해서 최고점수를 내는 모드 입니다.
                <br></br>
                <strong>AI대전 모드</strong>
                <br></br>
                게임 시작시 게임 보드가 1개더 생성돼며 추가로 생성됀 보는
                AI로직에 의해 자동으로 게임이 진행돼며 누가더 많은 점수를 내는지
                대결하는 모드입니다.
              </p>
            </FadeInLine>
            <FadeInLine
              delay={3500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <a href="https://3lines-2048.netlify.app/">
                <button>배포 사이트</button>
              </a>
            </FadeInLine>
          </section>
        );
      default:
        return null;
    }
  };

  const renderUnityProjectPage = () => {
    switch (UnityProjectPages[currentUnityProjectIndex]) {
      case "Unity Project 1":
        return (
          <section>
            <FadeInLine
              delay={500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h2>유니티 2048</h2>
              <img src="/image/아이콘/unity2048.png" alt="" />
            </FadeInLine>
            <FadeInLine
              delay={1000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 개요</h1>
              <p>Unity를 이용해서 만들어본 2048앱</p>
            </FadeInLine>
            <FadeInLine
              delay={1500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 기간</h1>
              <p>3일</p>
            </FadeInLine>
            <FadeInLine
              delay={2000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>주요기능</h1>
              <p>
                <strong>타일 이동 및 병합</strong>
                <br></br>
                드래그를 이용해서 타일이 각 방향으로 이동히며 이동방향에
                같은값의 타일이 있으면 현재 값*2로 값이 변하며 타일 2개가
                병합돼도록 구현했습니다.
                <br></br>
                <strong>타일 자동 생성</strong>
                <br></br>
                게임 시작시 2개의 셀이 랜덤 위치에 생성돼며 이동마다 추가로
                비어있는 셀의 랜덤위치에 2또는 4의 값을 가진 셀이 생성돼도록
                구현했습니다.
                <br></br>
                <strong>점수 시스템</strong>
                <br></br>
                병합시 현재 셀의 값*2의 점수가 오르도록 구현했으며,최고기록과
                비교해서 현재 점수가 최고기록 보다 높으면 최고기록이 갱신돼며,
                최고기록은 1일단위로 기록및 초기화 됍니다.
                <br></br>
                <strong>사운드 효과</strong>
                <br></br>
                게임 시작시 브금이 실행돼며 데스크톱 환경에서는 사운드 스크롤
                느낌으로 사운드 조절이 가능하고 모바일 환경은 사운드 온/오프
                버튼으로 구현했습니다.
                <br></br>
                <strong>게임 종료및 승리 조건 처리</strong>
                <br></br>
                이동 및병합시마다 현재 타일중에 이동및 병합이 가능한 타일을
                조건으로 검사해서 만약 이동및 병합할수있는 타일이 없으면
                게임오버가 표시됩니다
                <br></br>
                <strong>이동 애니메이션 구현</strong>
                <br></br>
                이동시 타일의 위치를 이동후 보드값을 업데이트하는 방식으로
                자연스럽게 이동 애니메이션이 작동하도록 구현했습니다.
                <br></br>
                <strong>하드 모드</strong>
                <br></br>
                게임 시작시 랜덤 위치에 이동및 병합이 불가능한 -1값의 셀을
                추가로 생성하며 그값을 피해서 최고점수를 내는 모드 입니다.
                <br></br>
              </p>
            </FadeInLine>
            <FadeInLine
              delay={2500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/path/2048.apk";
                  link.download = "2048.apk";
                  link.click();
                }}
              >
                앱 다운로드
              </button>
            </FadeInLine>
          </section>
        );
      case "Unity Project 2":
        return (
          <section>
            <FadeInLine
              delay={500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h2>유니티 스와이프벽돌깨기</h2>
              <img src="/image/아이콘/UnitySwipe.png" alt="" />
            </FadeInLine>
            <FadeInLine
              delay={1000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 개요</h1>
              <p>Unity를 이용해서 만들어본 스와이프벽돌깨기앱</p>
            </FadeInLine>
            <FadeInLine
              delay={1500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>프로젝트 기간</h1>
              <p>5일</p>
            </FadeInLine>
            <FadeInLine
              delay={2000}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <h1>주요기능</h1>
              <p>
                <strong>블록 생성</strong>
                <br></br>
                점수에 따라 생성 블록수가 증가하고 블록위치는 6개의 위치중
                랜덤으로 생성 됍니다. 추가로 초록공 아이템은 1개씩 생성됩니다.
                <br></br>
                <strong>블록 색상 변경</strong>
                <br></br>
                현재 점수 대비 블록수치에 따라 블록색상이 변경됩니다.
                <br></br>
                <strong>공 발사라인 미리보기</strong>
                <br></br>
                마우스 드래그로 공의 발사 라인을 미리 볼수있습니다.
                <br></br>
                <strong>충돌처리</strong>
                <br></br>
                벽에 닿으면 닿은 각도로 날아가며,바닥에 닿으면
                스테이지종료,블록에 닿으면 블록의 체력이 감소하며 0이되면
                파괴됍니다.
                <br></br>
                <strong>게임 종료처리</strong>
                <br></br>
                스테이지종료로 블록에 1칸씩내려올때 블록이 바닥에 닿으면 게임이
                종료됩니다.
                <br></br>
              </p>
            </FadeInLine>
            <FadeInLine
              delay={2500}
              trigger={`${currentPage}-${currentProjectIndex}`}
            >
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/path/SwiprBreakOut.apk";
                  link.download = "SwiprBreakOut.apk";
                  link.click();
                }}
              >
                앱 다운로드
              </button>
            </FadeInLine>
          </section>
        );

      default:
        return null;
    }
  };

  const renderPage = () => {
    switch (pages[currentPage]) {
      case "Main":
        return (
          <>
            <FadeInLine delay={500}>
              <header>
                <h1>신동수</h1>
                <p>010-2201-5617 | auroratime020715@gmail.com</p>
              </header>
            </FadeInLine>
            <FadeInLine delay={1000}>
              <section>
                <h2>자기소개</h2>
                <p>
                  HTML, CSS, JavaScript, React, Git, GitHub, Figma등과 같은
                  다양한 프로그래밍 언어와 개발 도구에 능통하며.
                  <br></br>
                  다양한 프로젝트를 통해 실무 경험을 쌓았고, 문제 해결 능력을
                  키웠습니다.
                  <br></br>
                  빠르게 변화하는 기술 트렌드에 대한 관심이 많으며, 항상
                  열정적으로 공부하고 발전하기 위해 노력했습니다.
                  <br></br>
                  팀프로젝트과정중 팀원들과의 협업을 통해 문제를 해결하고 최고의
                  결과물을 만들어내는 것을 목표로 삼았습니다.
                </p>
              </section>
            </FadeInLine>
            <FadeInLine delay={1500}>
              <section>
                <h2>스킬</h2>
                <div class="skills-container">
                  <div class="skill-badge">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                      alt="GitHub"
                    />
                    GitHub
                  </div>
                  <div class="skill-badge">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"
                      alt="C++"
                    />
                    C++
                  </div>
                  <div class="skill-badge">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                      alt="React"
                    />
                    React
                  </div>
                  <div class="skill-badge">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
                      alt="CSS"
                    />
                    CSS
                  </div>
                  <div class="skill-badge">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
                      alt="HTML"
                    />
                    HTML
                  </div>
                  <div class="skill-badge">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
                      alt="Figma"
                    />
                    Figma
                  </div>
                  <div class="skill-badge">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
                      alt="JavaScript"
                    />
                    JavaScript
                  </div>
                  <div class="skill-badge">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
                      alt="Git"
                    />
                    Git
                  </div>
                  <div class="skill-badge">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg"
                      alt="C#"
                    />
                    C#
                  </div>
                  <div class="skill-badge">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg"
                      alt="Unity"
                    />
                    Unity
                  </div>
                  <div class="skill-badge">
                    <img src="/image/아이콘/vite.png" alt="Vite" />
                    Vite
                  </div>
                  <div class="skill-badge">
                    <img src="/image/아이콘/테일윈드.png" alt="Tailwind" />
                    Tailwind
                  </div>
                  <div class="skill-badge">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
                      alt="Next.js"
                    />
                    Next.js
                  </div>
                  <div class="skill-badge">
                    <img
                      src="https://seeklogo.com/images/N/netlify-logo-758722CDF4-seeklogo.com.png"
                      alt="Netlify"
                    />
                    Netlify
                  </div>
                  <div class="skill-badge">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
                      alt="Vue.js"
                    />
                    Vue.js
                  </div>
                  <div class="skill-badge">
                    <img src="/image/아이콘/노션.png" alt="Notion" />
                    Notion
                  </div>
                </div>
              </section>
            </FadeInLine>
          </>
        );
      case "PortfolioInfo":
        return (
          <section className="PortfolioInfo">
            <FadeInLine delay={500}>
              <h4>포트폴리오 구성</h4>
              <h2>기본 구조</h2>
            </FadeInLine>
            <FadeInLine delay={1000}>
              <h1>인트로 페이지</h1>
              <div className="image-contect">
                <img src="/image/이력서/인트로페이지.png" alt="" />
                <img src="/image/이력서/로딩페이지.png" alt="" />
              </div>
              <p>
                컴퓨터의 전원을 키는 느낌으로 구상했으며 전원버튼클릭후
                로딩화면이 나오며 로딩완료시 기본 화면으로 전환
              </p>
            </FadeInLine>
            <FadeInLine delay={1500}>
              <h1>기본 페이지(PC)</h1>
              <div className="image-contect">
                <img src="/image/이력서/기본페이지.png" alt="" />
                <img src="/image/이력서/기본-달력페이지.png" alt="" />
              </div>
              <p>
                왼쪽:컴퓨터느낌으로 앱 아이콘및 폴더를 리스트로 정렬
                <br></br>
                오른쪽:달력느낌으로 TO-DO-LIST기능으로 구성 해당날짜를 클릭해서
                할일을 넣을수있으면 로컬로 데이터 관리.
                <br></br>
                하단바:컴퓨터의 작업표시줄과같이 만들어봤으며 시작버튼으로
                창닫기, 달력버튼으로 달력을 온/오프할수있으며, 시간은 1초마다
                관리해서 현재시간을 표시
              </p>
            </FadeInLine>
            <FadeInLine delay={2000}>
              <h1>기본 페이지(모바일)</h1>
              <div className="image-contect">
                <img src="/image/이력서/기본-모바일페이지.png" alt="" />
                <img src="/image/이력서/기본-모바일-달력페이지.png" alt="" />
              </div>
              <p>
                상단바:모바일 전환시 상단바가 추가되며 왼쪽에 시간표시
                <br></br>
                페이지 구성: 모바일은 페이지로 구성되어있으며 슬라이드로
                이동가능
                <br></br>
                1페이지:모바일 환경에맟게 아이콘및 폴더리스트를 재배치
                <br></br>
                2페이지:PC에있던 달력(TO-DO-LIST)를 2페이지에 크기를 스크린
                크기에 맟게 조절하여 배치
                <br></br>
                하단바:모바일에 맟게 만들어봤으면 이전버튼으로 폴더나 어플 닫기
                기능을 구현
              </p>
            </FadeInLine>
            <FadeInLine delay={2500}>
              <h1>폴더 구조(팝업)</h1>
              <div className="image-contect">
                <img
                  src="/image/이력서/기본-폴더페이지.png"
                  alt=""
                  className="full"
                />
              </div>
              <p>
                폴더 클릭시 폴더안에 아이콘 리스트가 정렬돼며 해당아이콘 클릭시
                해당어플이 실행돼며 pc에서는 상단에 닫기버튼으로 닫을수있으며
                모바일에서는 하단에 이전버튼으로 닫기 기능을 구현
              </p>
            </FadeInLine>
          </section>
        );
      case "Project":
        return (
          <>
            <div className="projects"> {renderProjectPage()}</div>
            <div className="project-nav">
              {projectPages.map((proj, idx) => (
                <button
                  key={proj}
                  className={`nav-btn ${
                    idx === currentProjectIndex ? "active" : ""
                  }`}
                  onClick={() => setCurrentProjectIndex(idx)}
                >
                  {proj}
                </button>
              ))}
            </div>
          </>
        );
      case "TeamProject":
        return (
          <>
            <div className="projects">{renderTeamProjectPage()}</div>
            <div className="project-nav">
              {teamProjectPages.map((proj, idx) => (
                <button
                  key={proj}
                  className={`nav-btn ${
                    idx === currentTeamProjectIndex ? "active" : ""
                  }`}
                  onClick={() => setCurrentTeamProjectIndex(idx)}
                >
                  {proj}
                </button>
              ))}
            </div>
          </>
        );
      case "UnityProject":
        return (
          <>
            <div className="projects">{renderUnityProjectPage()}</div>
            <div className="project-nav">
              {UnityProjectPages.map((proj, idx) => (
                <button
                  key={proj}
                  className={`nav-btn ${
                    idx === currentUnityProjectIndex ? "active" : ""
                  }`}
                  onClick={() => setCurrentUnityProjectIndex(idx)}
                >
                  {proj}
                </button>
              ))}
            </div>
          </>
        );
      case "Contact":
        return (
          <>
            <FadeInLine delay={500}>
              <section>
                <h2>자격증</h2>
                <ul>
                  <li>정보처리기능사</li>
                  <li>전자기기기능사</li>
                  <li>제한무선통신사</li>
                  <li>컴활 2급</li>
                </ul>
              </section>
            </FadeInLine>
            <FadeInLine delay={1000}>
              <section>
                <h2>링크</h2>
                <ul>
                  <li>
                    <a
                      href="https://github.com/Dongsusin"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://blog.naver.com/auroratime020715"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://jovial-alpaca-3d63f1.netlify.app/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Portfolio
                    </a>
                  </li>
                </ul>
              </section>
            </FadeInLine>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="Resume">
      <div className="navigation">
        {pages.map((page, index) => (
          <button
            key={page}
            className={`nav-btn ${index === currentPage ? "active" : ""}`}
            onClick={() => {
              setCurrentPage(index);
              if (pages[index] !== "Project") setCurrentProjectIndex(0);
              if (pages[index] !== "TeamProject") setCurrentTeamProjectIndex(0);
            }}
          >
            {page}
          </button>
        ))}
      </div>

      <div className={`resume-container ${animate ? "ripple-animate" : ""}`}>
        {renderPage()}
      </div>

      <div className="page">
        <span>
          {pages[currentPage] === "Project"
            ? ` - ${projectPages[currentProjectIndex]}`
            : pages[currentPage] === "TeamProject"
            ? ` - ${teamProjectPages[currentTeamProjectIndex]}`
            : pages[currentPage] === "UnityProject"
            ? ` - ${UnityProjectPages[currentUnityProjectIndex]}`
            : ""}
        </span>
      </div>

      <div className="page-controls">
        <button onClick={handlePrev}>← 이전</button>
        <button onClick={handleNext}>다음 →</button>
      </div>
    </div>
  );
}

export default Resume;
