import { useState } from "react";
import "./Resume.css";

function Resume() {
  const pages = ["Main", "PortfolioInfo", "Project", "TeamProject", "Contact"];
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
  const teamProjectPages = ["Team Project 1", "Team Project 2"];
  const [currentPage, setCurrentPage] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentTeamProjectIndex, setCurrentTeamProjectIndex] = useState(0);

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
        setCurrentPage(pages.indexOf("Contact"));
      } else {
        setCurrentTeamProjectIndex(currentTeamProjectIndex + 1);
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
            <h1>계산기 프로젝트를 소개합니다!</h1>
            <p>
              React,css를 이용해서 계산기기능을 구현해봤으며 개발 과정에서
              그동안 몰랐던 계산기의 구동로직을 자세히 알수있는 유익한
              시간이였습니다.
            </p>
            <h1>프로젝트 개요</h1>
            <p>React,css 계산기 기능 구현 프로젝트 </p>
            <h1>프로젝트 기간</h1>
            <p>1일</p>
            <h1>기술 스택/협업 툴</h1>
            <p>
              언어:React, Css, JavaScript
              <br></br>
              개발환경:Visual Studio Code,Vite,React
              <br></br>
              협업:Git, GitHub
              <br></br>
              배포:netlify
            </p>
            <h1>주요기능</h1>
            <p>
              숫자 및 연산자 입력
              <br></br>
              숫자(0~9),사칙연사(+,-,*,/)입력 가능
              <br></br>
              소수점 입력
              <br></br>. 입력으로 소수점 표시및 계산 가능
              <br></br>
              계산 결과 표시
              <br></br>= 입력으로 수식을 계산하여 결과 값을 표시
              <br></br>
              입력 초기화(C)
              <br></br>C 버튼으로 전체 값을 초기화
              <br></br>한 글자 삭제(←)
              <br></br>
              마지막 문자 삭제, 계산 직후에는 전체 초기화
              <br></br>
              부호 변경(+,-)
              <br></br>
              입력 값의 부호를 바꿀수있음
              <br></br>
              백분율 처리(%)
              <br></br>
              %를 /100으로 계산해서 퍼센트 백분율 계산 가능
              <br></br>
              연산 기록 보기/숨기기
              <br></br>
              연산 기록 보기 버튼으로 결과 기록을 표시
            </p>
          </section>
        );
      case "Project 2":
        return (
          <section>
            <h2>날씨 API 프로젝트</h2>
            <img src="/image/이력서/날씨페이지.png" alt="" />
            <h1>날씨 API 프로젝트를 소개합니다!</h1>
            <p>
              React,css를 이용해서 OpenWeatherAPi를 이용해서 현재 위치에대한
              날씨정보를 받아와서 현재 날씨를 알려줍니다. API를 이용해서
              현재위치값을 받아올수있는 방법을 알수있었습니다.
            </p>
            <h1>프로젝트 개요</h1>
            <p>React,css 날씨 API 구현 프로젝트 </p>
            <h1>프로젝트 기간</h1>
            <p>2일</p>
            <h1>기술 스택/협업 툴</h1>
            <p>
              사용API:OpenWeatherApi
              <br></br>
              언어:React, Css, JavaScript
              <br></br>
              개발환경:Visual Studio Code,Vite,React
              <br></br>
              협업:Git, GitHub
              <br></br>
              배포:netlify
            </p>
            <h1>주요기능</h1>
            <p>
              현재 위치 기반 날씨 불러오기
              <br></br>
              최초 로딩시 navigator.geolocation으로 위치 추적
              <br></br>
              도시 이름으로 날씨 검색
              <br></br>
              도시명을 입력하면 API를 통해 날씨 조회
              <br></br>
              날씨 정보 표시
              <br></br>
              도시명, 현재 기온, 체감 온도, 습도, 풍속, 아이콘을 API로 받아와서
              표시
              <br></br>
              즐겨찾기 추가/삭제
              <br></br>
              도시를 즐겨찾기로 로컬에 저장및 삭제기능
              <br></br>
              음성 안내
              <br></br>
              현재 날씨 정보를 음성으로 읽어 주는 기능(speechSynthesis)
              <br></br>
              다크모드 전환
              <br></br>
              버튼 클릭시 다크/라이트 모드로 전환돼며 배경색,글자색이 변함
              <br></br>
              간단한 날씨 메세지
              <br></br>
              현재 날씨 상태에따라 간단한 메세지 표시
              <br></br>
              에러/로딩 처리
              <br></br>
              잘못된 도시 입력시 에러처리 및 로딩시 로딩 안내문자 표시
            </p>
          </section>
        );
      case "Project 3":
        return (
          <section>
            <h2>지도 API 프로젝트</h2>
            <img src="/image/이력서/지도페이지.png" alt="" />
            <h1>지도 API 프로젝트를 소개합니다!</h1>
            <p>
              React + Leaflet.js를 이용해 현재 위치를 지도에 표시하는
              앱.Leaflet.js는 처음 써봤는데 새로운 기능을 체험해볼수있었습니다.
            </p>
            <h1>프로젝트 개요</h1>
            <p> React + Leaflet.js를 이용해 현재 위치를 지도에 표시하는 앱</p>
            <h1>프로젝트 기간</h1>
            <p>1일</p>
            <h1>기술 스택/협업 툴</h1>
            <p>
              언어:React, Css, JavaScript,Leaflet.js
              <br></br>
              개발환경:Visual Studio Code,Vite,React
              <br></br>
              협업:Git, GitHub
              <br></br>
              배포:netlify
            </p>
            <h1>주요기능</h1>
            <p>
              현재 위치 자동 탐지
              <br></br>
              최초 로딩시 navigator.geolocation으로 위치 추적
              <br></br>
              Leaflet 지도 표시
              <br></br>
              OpenStreetMap 기반 지도를 출력
              <br></br>
              현재 위치 마커 표시
              <br></br>
              커스텀 아이콘을 사용해 현재 위치를 마커로 표시
              <br></br>
              500m 반경 원 시각화
              <br></br>
              현재 위치를 기반으로 주변 500m를 원으로 그려 사용자의 위치 범위
              표현
              <br></br>
              위치 재탐색 버튼
              <br></br>
              위치 업데이트 버튼으로 위치를 다시 탐지 가능
              <br></br>
              에러 처리
              <br></br>
              위치 접근 실패시 오류 메세지 출력
            </p>
          </section>
        );
      case "Project 4":
        return (
          <section>
            <h2>메모장 프로젝트</h2>
            <img src="/image/이력서/메모장페이지.png" alt="" />
            <h1>메모장 프로젝트를 소개합니다!</h1>
            <p>
              React를 이용해 만든 간단한 메모장 애플리케이션으로, 브라우저의
              localStorage를 이용해 메모 작성/편집/삭제 기능을 제공합니다.
            </p>
            <h1>프로젝트 개요</h1>
            <p> React를 이용해 만든 간단한 메모장 애플리케이션</p>
            <h1>프로젝트 기간</h1>
            <p>2일</p>
            <h1>기술 스택/협업 툴</h1>
            <p>
              언어:React, Css, JavaScript
              <br></br>
              개발환경:Visual Studio Code,Vite,React
              <br></br>
              협업:Git, GitHub
              <br></br>
              배포:netlify
            </p>
            <h1>주요기능</h1>
            <p>
              메모 목록 보기
              <br></br>
              저장된 메모를 리스트로 출력(최대 20자로 요약)
              <br></br>
              메모 작성
              <br></br>새 메모 추가 버튼으로 편집 화면으로 이동
              <br></br>
              메모 수정
              <br></br>
              기존 메모 클릭시 해당 메모의 내용을 불러와 편집할수있습니다.
              <br></br>
              메모 삭제
              <br></br>
              리스트에서 메오 옆X버튼트로 메모 개별삭제 기능
              <br></br>
              자동 저장
              <br></br>
              모든 메모는 로컬 스트리지에 저장되어 새로고침후에도 유지 됍니다.
              <br></br>
              텍스트 길이 표시
              <br></br>
              메모 작성중 하단에 글자수 표시
              <br></br>빈 메모 안내
              <br></br>
              현재 메모가 없으면 저장된 메모가 없습니다를 메세지로 표시.
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
            <img src="/image/이력서/틱택토페이지.png" alt="" />
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

  const renderTeamProjectPage = () => {
    const project = teamProjectPages[currentTeamProjectIndex];
    switch (project) {
      case "Team Project 1":
        return (
          <section>
            <h2>윌리의 서재 UI/UX 프로젝트</h2>
            <img src="/image/이력서/팀프로젝트1.svg" alt="팀 프로젝트 1" />
            <h1>월리의 서재를 소개합니다!</h1>
            <p>
              안녕하세요! 9로디지털 팀은 국내 최대 전자책 구독 서비스 '밀리의
              서재'의 디자인을 참고하여 '윌리의 서재' 프로젝트를 진행했습니다.
              사용자 중심의 UI 디자인과 직관적인 인터페이스를 만들기 위해
              노력했습니다. 팀원 각자의 강점을 살린 효율적인 협업 과정을 통해
              아이디어를 발전시키고, 함께 문제를 해결하며 모두가 한 단계 성장할
              수 있는 소중한 경험이었습니다.
            </p>
            <h1>프로젝트 개요</h1>
            <p>윌리의 서재 UI/UX 프로젝트</p>
            <h1>프로젝트 기간</h1>
            <p>2025.03.14~2025.03.25</p>
            <h1>기술 스택/협업 툴</h1>
            <p>
              언어:Html5, Css3, TallWindCss, Javascript
              <br></br>
              개발환경:Visual Studio Code,Vite
              <br></br>
              협업:Git, GitHub, Discord, Notion
              <br></br>
              디자인:Figma
              <br></br>
              배포:netlify
            </p>
            <h1>주요기능</h1>
            <p>
              홈 화면
              <br></br>
              추천 도서,인기 도서, 신간 도서등 다양한 카테고리별 도서 큐레이션
              <br></br>
              도서 검색
              <br></br>
              제목,저자,출판사 등 다양한 조건으로 도서 검색 기능
              <br></br>
              도서 상세 페이지
              <br></br>
              도서 정보, 리뷰, 관련 도서 추천
              <br></br>내 서재
              <br></br>
              사용자가 읽은 책, 읽고 있는 책, 찜한 책 관리
              <br></br>
              반응형 디자인
              <br></br>
              모바일, 태블릿, 데스크톱 환경에 최적화된 UI
              <br></br>
              모듈식 레이아웃
              <br></br>
              헤더, 푸터, 버튼, 타이틀 등 레이아웃 요소를 컴포넌트 형식으로 제작
              <br></br>
              Tailwind 기반 디자인
              <br></br>
              일괄된 디자인 시스템으로 빠른 스타일링이 가능하며, 커스터마이징이
              용이
            </p>
          </section>
        );
      case "Team Project 2":
        return (
          <section>
            <h2>2048 JavaScript 프로젝트</h2>
            <img src="/image/아이콘/js프로젝트.svg" alt="팀 프로젝트 2" />
            <h1>2048 in 3line을 소개합니다</h1>
            <p>
              기존의 2048 게임을 저희 팀만의 로직과 디자인으로 재해석한
              프로젝트입니다. 코드의 간결함과 유지 보수성을 높이는 데
              집중하였습니다.
            </p>
            <h1>프로젝트 개요</h1>
            <p>
              2048 게임을 Vanilla JavaScript 환경에서 직접 구현한 웹 게임
              프로젝트입니다.
            </p>
            <h1>프로젝트 기간</h1>
            <p>2025.05.09~2025.05.23</p>
            <h1>기술 스택/협업 툴</h1>
            <p>
              언어:Html5, Css3, Typrscript, Javascript
              <br></br>
              개발환경:Visual Studio Code,Vite
              <br></br>
              협업:Git, GitHub, Discord, Notion
              <br></br>
              디자인:Figma
              <br></br>
              배포:netlify
              <br></br>
              패키지:Prrttier, Eslilt, TS-Node, Node.js
            </p>
            <h1>주요기능</h1>
            <p>
              타일 이동 및 병합
              <br></br>
              방향키를 이용해서 타일이 각 방향으로 이동히며 이동방향에 같은값의
              타일이 있으면 현재 값*2로 값이 변하며 타일 2개가 병합돼도록
              구현했습니다.
              <br></br>
              타일 자동 생성
              <br></br>
              게임 시작시 2개의 셀이 랜덤 위치에 생성돼며 이동마다 추가로
              비어있는 셀의 랜덤위치에 2또는 4의 값을 가진 셀이 생성돼도록
              구현했습니다.
              <br></br>
              점수 시스템
              <br></br>
              병합시 현재 셀의 값*2의 점수가 오르도록 구현했으며,최고기록과
              비교해서 현재 점수가 최고기록 보다 높으면 최고기록이 갱신돼며,
              최고기록은 1일단위로 기록및 초기화 됍니다.
              <br></br>
              사운드 효과
              <br></br>
              게임 시작시 브금이 실행돼며 데스크톱 환경에서는 사운드 스크롤
              느낌으로 사운드 조절이 가능하고 모바일 환경은 사운드 온/오프
              버튼으로 구현했습니다.
              <br></br>
              게임 종료및 승리 조건 처리
              <br></br>
              이동 및병합시마다 현재 타일중에 이동및 병합이 가능한 타일을
              조건으로 검사해서 만약 이동및 병합할수있는 타일이 없으면
              게임오버가 표시돼며, 타일을 합쳤을때 타일의값이 2048이 돼면
              게임승리가 표시됍니다.
              <br></br>
              모바일 대응(터치 슬라이드)
              <br></br>
              모바일 환경에서도 플레이할수 있도록 터치 슬라이드로도 이동및
              병합이 가능하도록 구현했습니다.
              <br></br>
              반응형 웹 디자인
              <br></br>
              다양한 환경에서 원활히 플레이할수있도록 스크린 크기에 맟게
              반응형으로 디자인 하였습니다.
              <br></br>
              보드 크기변경
              <br></br>
              게임 보드의 보드를 실시간으로(3*3,4*4,5*5)의 크기로 변경이
              가능하며 난이도 조절의 역활을 하도록 구현했습니다.
              <br></br>
              이동 애니메이션 구현
              <br></br>
              이동시 타일의 위치를 이동후 보드값을 업데이트하는 방식으로
              자연스럽게 이동 애니메이션이 작동하도록 구현했습니다.
              <br></br>
              타임어택 모드
              <br></br>
              게임 시작시 타이머가 실행돼며 타이머의 값이 상단에 표시돼며 값이
              0이됄때 까지의 최고점수를 구하는 모드입니다.
              <br></br>
              하드 모드
              <br></br>
              게임 시작시 랜덤 위치에 이동및 병합이 불가능한 -1값의 셀을 추가로
              생성하며 그값을 피해서 최고점수를 내는 모드 입니다.
              <br></br>
              AI대전 모드
              <br></br>
              게임 시작시 게임 보드가 1개더 생성돼며 추가로 생성됀 보는 AI로직에
              의해 자동으로 게임이 진행돼며 누가더 많은 점수를 내는지 대결하는
              모드입니다.
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
      case "Contact":
        return (
          <>
            <section>
              <h2>자격증</h2>
              <ul>
                <li>정보처리기능사</li>
                <li>전자기기기능사</li>
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
              if (pages[index] !== "TeamProject") setCurrentTeamProjectIndex(0);
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
            : pages[currentPage] === "TeamProject"
            ? ` - ${teamProjectPages[currentTeamProjectIndex]}`
            : ""}
        </span>
        <button onClick={handleNext}>다음 →</button>
      </div>
    </div>
  );
}

export default Resume;
