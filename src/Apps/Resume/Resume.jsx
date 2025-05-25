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
            HTML, CSS, JavaScript, React, Git, GitHub, Figma 등 다양한 개발
            도구에 능숙합니다. 빠르게 변화하는 기술에 민감하고 팀 협업을
            중요하게 생각합니다.
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
