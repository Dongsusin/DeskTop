import "./Resume.css";

function Resume() {
  return (
    <div className="Resume">
      <div className="resume-container">
        <header>
          <h1>신동수</h1>
          <p>010-2201-5617 | auroratime020715@gmail.com</p>
        </header>

        <section>
          <h2>자기소개</h2>
          <p>
            HTML, CSS, JavaScript, React, Git, GitHub, Figma등과 같은 다양한
            프로그래밍 언어와 개발 도구에 능통합니다. 다양한 프로젝트를 통해실무
            경험을 쌓았고, 문제 해결 능력을 키워왔습니다다. 빠르게 변화하는 기술
            트렌드에 대한 관심과 학습 능력이 뛰어납니다. 항상 열정적으로
            공부하고 발전하기 위해 노력했으며, 현장에서 필요한 실무 역량을
            갖추기 위해 노력했습니다. 열정적으로 일 하는 것을 가장 중요시하며,
            항상 새로운 기술을 배우고 발전하기 위해 노력합니다. 팀원들과의
            협업을 통해 문제를 해결하고 최고의 결과물을 만들어내는 것을 목표로
            삼고 있습니다.
          </p>
        </section>

        <section>
          <h2>학력</h2>
          <p>서울로봇고등학교 (2018.03 - 2021.01) - 첨단로봇정보통신과 졸업</p>
        </section>

        <section>
          <h2>스킬</h2>
          <p>GitHub, C++, React, CSS, HTML5, Figma, JavaScript, Git</p>
        </section>

        <section>
          <h2>자격증</h2>
          <ul>
            <li>정보처리기능사 (2019.03)</li>
            <li>정보기기기능사 (2020.09)</li>
            <li>제한무선통신사 (2020.10)</li>
            <li>컴퓨터활용능력 2급 (2020.06)</li>
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
      </div>
    </div>
  );
}

export default Resume;
