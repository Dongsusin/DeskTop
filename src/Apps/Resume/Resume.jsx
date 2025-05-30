import { useState } from "react";
import "./Resume.css";

function Resume() {
  const pages = ["Main", "PortfolioInfo", "Project", "Contact"];
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
    "Project 16",
  ];
  const [currentPage, setCurrentPage] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const handlePrev = () => {
    if (pages[currentPage] === "Project") {
      if (currentProjectIndex === 0) {
        setCurrentPage(pages.indexOf("PortfolioInfo"));
      } else {
        setCurrentProjectIndex(currentProjectIndex - 1);
      }
    } else {
      setCurrentPage((prev) => (prev === 0 ? pages.length - 1 : prev - 1));
    }
  };

  const handleNext = () => {
    if (pages[currentPage] === "Project") {
      if (currentProjectIndex === projectPages.length - 1) {
        setCurrentPage(pages.indexOf("Contact"));
      } else {
        setCurrentProjectIndex(currentProjectIndex + 1);
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
            <h2>계산기 프로젝트</h2>
            <img src="/image/이력서/계산기페이지.png" alt="" />
            <p>
              React/자바스크립트로 계산기를 구현했으며
              사칙연산,소수점,퍼센트,+/-로 다양한계산이 가능하며 계산기록을
              버튼으로 온/오프해서 볼수있으며, 모바일 환경에서는 스크린에 따라
              크기가 변화하도록 구현했습니다.
            </p>
          </section>
        );
      case "Project 2":
        return (
          <section>
            <h2>날씨 API 프로젝트</h2>
            <img src="/image/이력서/날씨페이지.png" alt="" />
            <p>
              OpenWeather Api를 이용해서 현재위치의 날씨정보를 받아와서
              현재온도,체감온도,습도,풍속등의 정보를 나타내주며, 도시이름을
              영어로 검색해서 해당도시의 날씨를 알수있으며,라이트/다크모드로
              모드에따라 배경,폰트색을 변경할수있으며,주간 날씨보기로 5일간의
              날씨를 볼수있으며,도시를 즐겨찾기해서 즐겨찾기한 도시를 빠리게
              찾을수있으며,정보안내 버튼으로 소리로 현재 날씨를 알려줄수있는
              기능도 구현했습니다.
            </p>
          </section>
        );
      case "Project 3":
        return (
          <section>
            <h2>지도 API 프로젝트</h2>
            <img src="/image/이력서/지도페이지.png" alt="" />
            <p>
              avigator.geolocation.getCurrentPosition API를 이용해서
              현재위치에따른 지도를 보여주며 커스텀마커로 현재위치에 표시했으며
              위치업데이트 버튼으로 이동후에 위치를 다시 받아올수있습니다.
            </p>
          </section>
        );
      case "Project 4":
        return (
          <section>
            <h2>메모장 프로젝트</h2>
            <img src="/image/이력서/메모장페이지.png" alt="" />
            <p>
              React/자바스크립트로 메모장을 구현했으며, 메모작성으로 메모를
              추가할수있으며,메인화면에서 추가된 메모를 확인및
              수정,삭제할수있습니다.또한 메모작성중에는 현재메모의 글자수를
              표시하도록 구현했습니다.
            </p>
          </section>
        );
      case "Project 5":
        return (
          <section>
            <h2>그림판 프로젝트</h2>
            <img src="/image/이력서/그림판페이지.png" alt="" />
            <p>
              React/자바스크립트로 메모장을 구현했으며,캔버스에 드래그로 그림을
              그릴수있으며 선의색깔,굵기,모양을 자유롭게 변경할수있고,도형으로
              그릴수도있으며,되돌리기/다시실행 버튼으로 이전으로돌라가거나 다시
              복원이 가능하고,전체지우기로 캔버스를 초기화할수있고,다운버튼으로
              현재그린 그림을 png파일로 다운받을수있도록 기능을 구현했습니다.
            </p>
          </section>
        );
      case "Project 6":
        return (
          <section>
            <h2>뮤직 플레이어 프로젝트</h2>
            <img src="/image/이력서/뮤직플레이어페이지.png" alt="" />
            <p>
              iTunes API를 이용하여 노래를 검색및 재생할수있으며, 검색창과
              재생창을 나눠놨으며,재생바를 커스텀으로 만들어 노래재생,사운드
              조절등을 보기좋게 만들었습니다.
            </p>
          </section>
        );
      case "Project 7":
        return (
          <section>
            <h2>도서 검색 프로젝트</h2>
            <img src="/image/이력서/도서페이지.png" alt="" />
            <p>
              Google Books API를 이용해 도서를 검색하여 결과를 리스트를 페이지로
              가져오며, 도서 리스트 클릭시 상세페이지로 전환되며
              상세페이지에서자세히보기로 책을 구글에서 검색할수있습니다.
            </p>
          </section>
        );
      case "Project 8":
        return (
          <section>
            <h2>금융 검색 프로젝트</h2>
            <img src="/image/이력서/금융페이지.png" alt="" />
            <p>
              각각의 금융정보를 API를 이용해서 정보를 받아오고 버튼을 페이지를
              전환해거며 금융정보를 보기좋게 디자인했습니다.
            </p>
          </section>
        );
      case "Project 9":
        return (
          <section>
            <h2>여행 API 프로젝트</h2>
            <img src="/image/이력서/여행페이지.png" alt="" />
            <p>
              항공편 검색
              <br></br>
              OpenSky API를 이용해서 실시간 항공기 정보를 가져와서 출발지 도착지
              검색후 검색 결과에 맟는 항공편에 고도,속도,항공번호등의 정보를
              보여줌.
              <br></br>
              여행지 검색
              <br></br>
              도시 이름을 검색하고 해당도시의 국가,지역,인구,위치등을 보여주고
              Google Map으로 상세 검색 가능.
            </p>
          </section>
        );
      case "Project 10":
        return (
          <section>
            <h2>테트리스 프로젝트</h2>
            <img src="/image/이력서/테트리스페이지.png" alt="" />
            <p>
              React/자바스크립트를 이용하여 테트리스 게임을 구현했으며
              1줄없애는걸로 점수가 오르며 일정점수에따라 레벨리 오르고
              레벨에따라 속도가 증가합니다. 게임 오버시 점수와 최고점수를
              로컬로저장하며 나타내줍니다.
            </p>
          </section>
        );
      case "Project 11":
        return (
          <section>
            <h2>반응속도 프로젝트</h2>
            <img src="/image/이력서/반응속도페이지.png" alt="" />
            <p>
              React/자바스크립트를 이용하여 반응속도 테스트를 구현했으며 클릭시
              배경색이 변하며 랜덤시간이 지나면 초록색으로 바뀌며 초록색으로
              변한후 화면을 클릭할때까지 시간을 측정해서 반응속도를
              나타내줍니다.
            </p>
          </section>
        );
      case "Project 12":
        return (
          <section>
            <h2>틱택토 프로젝트</h2>
            <img src="/image/이력서/반응속도페이지.png" alt="" />
            <p>
              React/자바스크립트를 이용하여 3*3틱택토 게임을 구현했습니다.
              게임시작후 요소 선택시X로 표시돼며 인공지능이 랜덤한 위치에 O를
              표시하며 1줄을 먼저 같은 표시로 바꾼 쪽이 승리합니다.
            </p>
          </section>
        );
      case "Project 13":
        return (
          <section>
            <h2>카드 뒤집기 프로젝트</h2>
            <img src="/image/이력서/카드페이지.png" alt="" />
            <p>
              React/자바스크립트를 이용하여 카드를 뒤집어서 짝을 맟추는 게임을
              구현해봤습니다. 인트로 페이지에서 카드쌍의 갯수를 선택할수있으며
              선택후 개임시작시 카드가 갯수에 맟게 정렬돼고 현재 맟춘 카드쌍의
              갯수가 표시됍니다.
            </p>
          </section>
        );
      case "Project 14":
        return (
          <section>
            <h2>턴제 카드 게임 프로젝트</h2>
            <img src="/image/이력서/턴제카드게임.png" alt="" />
            <p>React/자바스크립트를 이용하여 턴제 카드게임을 구현해봤습니다.</p>
            <h1>핵심 시스템</h1>
            <p>
              1:스테이지 구성
              <br></br>매 스테이지마다 1~3명씩 랜덤으로 적이 등장하며 3스테이지
              마다 상점 스테이지가 등장하고, 5스테이지마다 보스 스테이지가
              등장합니다. 모든적 처치시 다음스테이지로 이동할수있습니다.
              <br></br>
              2:카드 구성
              <br></br>
              매턴 마다 카드5장을 뽑으며 카드는 각각의 에너지를 소모하여 1번씩
              사용할수있고 사용하지 않은카드는 버려집니다. 카드는 종류마다
              효과가 다르며 분류로는 공격/디버프/버프로 나눠며 공격카드는 적한테
              데미지를 입히며 디버프는 중독과 기절이 있으며, 중독은 매턴 적의
              체력이 감소하며 기절은 1턴간 행동이 불가하며, 버프카드로는 힐과
              방어력, 강화카드가 있습니다. 또한 카드강화로 각 카드의 효과를
              강화할수있습니다.
              <br></br>
              3:상점 스테이지
              <br></br>
              3스테이지마다 상점이 등장하며 상점에서는 50골드로 에너지증가, 카드
              강화, 아이템 구매를 할수있습니다.
              <br></br>
              4:몬스터 구성
              <br></br>
              몬스터는 종류에 따라 공격형,수비형,치유형,랜덤형,보스로 나눠며
              종류에따라 각행동의 확률이 다르며, 체력,공격력,방어력,저항이
              매스테이지마다 일정수치 증가합니다. 또한 처치시 골드가 주어지며
              매스테이지마다 증가합니다.
              <br></br>
              5:장비 구성
              <br></br>
              장비 칸으로는 투구,갑옷,무기,신발,장갑이 있소 해당칸에 따라 기본
              능력치가 상승합니다.
              <br></br>
              6:게임 오버및 기록저장,게임 로그
              <br></br>
              플레이어의 체력이 0이돼면 게임이종료돼며 기록을 확인해서
              최고기록을 5개까지 로컬로 기록합니다. 또한 모든행동은 로그창에
              간단히 표시돼며 로그창은 끄고 킬수있습니다.
            </p>
          </section>
        );
      case "Project 15":
        return (
          <section>
            <h2>메이플 캐릭터 검색 프로젝트</h2>
            <img src="/image/이력서/메이플페이지.png" alt="" />
            <p>
              넥슨에서 지원하는 메이플 API를 이용해서 이름을 검색해서
              레벨,직업,월드등의 정보를 받아와 나타내주며 최근 검색기록을
              저장해서 클릭으로 빠르게 검색할수있게해줍니다.
            </p>
          </section>
        );
      case "Project 16":
        return (
          <section>
            <h2>포켓몬 도감 프로젝트</h2>
            <img src="/image/이력서/포켓몬페이지.png" alt="" />
            <p>포켓몬 API를 이용해서 포켓몬의 정보를 받아옵니다.</p>
            <h1>기능 구성</h1>
            <p>
              1:이름 검색및 타입 분류,즐겨찾기
              <br></br>
              포켓몬의 이름으 해당 포켓몬을 검색해서 찾을수있으며, 타입에 따라
              분류도 가능하며, 즐겨찾기를 추가해서 즐겨찾기한 포켓몬만 표시할수
              있습니다.
              <br></br>
              2:타입에 따라른 변화
              <br></br>
              포켓몬 타입에 따라 카드의 배경이 변화하며 각타입을 나타내줍니다.
              <br></br>
              3:페이지 구성
              <br></br>
              1페이지에 30마리씩 배치했으며 30마리가 넘으면 다음페이지에 이어서
              나타냈으며 각 카드클릭시 해당포켓몬의 상세페이지로 이동하며
              상세페이지내에서도 다음,이전 포켓몬으로 이동할수있습니다.
            </p>
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
            <header>
              <h1>신동수</h1>
              <p>010-2201-5617 | auroratime020715@gmail.com</p>
            </header>
            <section>
              <h2>자기소개</h2>
              <p>
                HTML, CSS, JavaScript, React, Git, GitHub, Figma등과 같은 다양한
                프로그래밍 언어와 개발 도구에 능통하며.
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
            <section>
              <h2>학력</h2>
              <p>
                서울로봇고등학교 (2018.03 - 2021.01) - 첨단로봇정보통신과 졸업
                <br></br>
                구미대학교(EMU) (2022.02 - 2022.08) - 중퇴
              </p>
            </section>
            <section>
              <h2>스킬</h2>
              <p>
                GitHub, C++, React, CSS, HTML, Figma, JavaScript,
                Git,C#,Unity,Unreal
              </p>
            </section>
          </>
        );

      case "PortfolioInfo":
        return (
          <section className="PortfolioInfo">
            <h4>포트폴리오 구성</h4>
            <h2>기본 구조</h2>
            <h1>인트로 페이지</h1>
            <div className="image-contect">
              <img src="/image/이력서/인트로페이지.png" alt="" />
              <img src="/image/이력서/로딩페이지.png" alt="" />
            </div>
            <p>
              컴퓨터의 전원을 키는 느낌으로 구상했으며 전원버튼클릭후 로딩화면이
              나오며 로딩완료시 기본 화면으로 전환
            </p>
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
              하단바:컴퓨터의 작업표시줄과같이 만들어봤으며 시작버튼으로 창닫기,
              달력버튼으로 달력을 온/오프할수있으며, 시간은 1초마다 관리해서
              현재시간을 표시
            </p>
            <h1>기본 페이지(모바일)</h1>
            <div className="image-contect">
              <img src="/image/이력서/기본-모바일페이지.png" alt="" />
              <img src="/image/이력서/기본-모바일-달력페이지.png" alt="" />
            </div>
            <p>
              상단바:모바일 전환시 상단바가 추가되며 왼쪽에 시간표시
              <br></br>
              페이지 구성: 모바일은 페이지로 구성되어있으며 슬라이드로 이동가능
              <br></br>
              1페이지:모바일 환경에맟게 아이콘및 폴더리스트를 재배치
              <br></br>
              2페이지:PC에있던 달력(TO-DO-LIST)를 2페이지에 크기를 스크린 크기에
              맟게 조절하여 배치
              <br></br>
              하단바:모바일에 맟게 만들어봤으면 이전버튼으로 폴더나 어플 닫기
              기능을 구현
            </p>
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
      case "Contact":
        return (
          <>
            <section>
              <h2>자격증</h2>
              <ul>
                <li>정보처리기능사</li>
                <li>정보기기기능사</li>
                <li>제한무선통신사</li>
                <li>컴활 2급</li>
              </ul>
            </section>
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
            }}
          >
            {page}
          </button>
        ))}
      </div>

      <div className="resume-container">{renderPage()}</div>

      <div className="page-controls">
        <button onClick={handlePrev}>← 이전</button>
        <span>
          {pages[currentPage]}
          {pages[currentPage] === "Project"
            ? ` - ${projectPages[currentProjectIndex]}`
            : ""}
        </span>
        <button onClick={handleNext}>다음 →</button>
      </div>
    </div>
  );
}

export default Resume;
