import { useState, useEffect } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [input, setInput] = useState("0");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [justCalculated, setJustCalculated] = useState(false);

  const isOperator = (char) => ["+", "-", "×", "÷"].includes(char);

  const handleClick = (value) => {
    if (value === "C") {
      setInput("0");
      setResult("");
      setJustCalculated(false);
    } else if (value === "←") {
      if (justCalculated) {
        setInput("0");
        setResult("");
        setJustCalculated(false);
        return;
      }
      setInput((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    } else if (value === "=") {
      try {
        const evalResult = eval(
          input.replace(/×/g, "*").replace(/÷/g, "/").replace(/%/g, "/100")
        );
        setResult(evalResult.toString());
        setInput(evalResult.toString());
        setHistory((prev) => [
          ...prev,
          { expr: input, res: evalResult.toString() },
        ]);
        setJustCalculated(true);
      } catch {
        setResult("Error");
        setJustCalculated(false);
      }
    } else if (value === "+/-") {
      if (input === "0") return;
      if (justCalculated) {
        // 부호 변경 시 새 시작
        if (result.startsWith("-")) {
          setInput(result.slice(1));
          setResult("");
          setJustCalculated(false);
        } else {
          setInput("-" + result);
          setResult("");
          setJustCalculated(false);
        }
      } else {
        // 부호 토글
        if (input.startsWith("-")) setInput(input.slice(1));
        else setInput("-" + input);
      }
    } else if (value === "()") {
      const open = (input.match(/\(/g) || []).length;
      const close = (input.match(/\)/g) || []).length;
      setInput(input + (open > close ? ")" : "("));
      setJustCalculated(false);
    } else if (value === ".") {
      // 소수점 중복 방지 (현재 숫자 그룹 내에 '.' 있으면 입력 불가)
      const parts = input.split(/[\+\-\×\÷]/);
      const lastPart = parts[parts.length - 1];
      if (lastPart.includes(".")) return;
      if (justCalculated) {
        setInput("0.");
        setResult("");
        setJustCalculated(false);
      } else {
        setInput((prev) => (prev === "0" ? "0." : prev + "."));
      }
    } else {
      // 숫자 또는 연산자 입력 처리
      if (justCalculated) {
        if (isOperator(value)) {
          // 결과 뒤에 연산자 붙이기 가능
          setInput(result + value);
          setResult("");
          setJustCalculated(false);
        } else {
          // 숫자 입력 시 새로 시작
          setInput(value === "0" ? "0" : value);
          setResult("");
          setJustCalculated(false);
        }
      } else {
        let updatedInput = input === "0" ? "" : input;
        const lastChar = updatedInput[updatedInput.length - 1];
        // 연산자 중복 방지: 마지막이 연산자면 교체
        if (isOperator(lastChar) && isOperator(value)) {
          updatedInput = updatedInput.slice(0, -1);
        }
        setInput(updatedInput + value);
      }
    }
  };

  const buttons = [
    "C",
    "()",
    "%",
    "÷",
    "7",
    "8",
    "9",
    "×",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "+/-",
    "0",
    ".",
    "=",
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      const map = {
        "*": "×",
        "/": "÷",
        Enter: "=",
        Backspace: "←",
        Escape: "C",
        // 키보드에서 '(' , ')' 직접 처리
        "(": "(",
        ")": ")",
        // +/-는 Shift + '-' 키로 처리 불가, 별도 토글키 미지정
      };
      const key = map[e.key] || e.key;
      // 숫자, 연산자, 괄호, 기타 버튼들 입력 허용
      if (
        /^[0-9]$/.test(key) ||
        ["+", "-", "×", "÷", ".", "%", "=", "C", "←", "(", ")", "+/-"].includes(
          key
        )
      ) {
        e.preventDefault();
        if (key === "(" || key === ")") {
          // 괄호 직접 입력 시, 그냥 붙이기
          setInput((prev) => prev + key);
          setJustCalculated(false);
        } else {
          handleClick(key);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input, result, justCalculated]);

  return (
    <div className="calculator">
      <div>
        <div className="display">
          <div className="input">{input}</div>
          <div className="result">{result}</div>
        </div>

        <div className="buttons">
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => handleClick(btn)}
              className={`btn ${btn}`}
            >
              {btn}
            </button>
          ))}
        </div>

        <button
          className="toggle-history-btn"
          onClick={() => setShowHistory((show) => !show)}
        >
          {showHistory ? "숨기기" : "연산 기록 보기"}
        </button>
      </div>

      {showHistory && (
        <div className="history">
          <h3>연산 기록</h3>
          <ul>
            {history.length === 0 && <li>기록이 없습니다.</li>}
            {history.map((item, idx) => (
              <li key={idx}>
                <span>{item.expr} = </span>
                <strong>{item.res}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Calculator;
