import { useState, useEffect } from "react";
import Display from "./components/Display";
import Keypad from "./components/Keypad";
import History from "./components/History";
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
        if (result.startsWith("-")) {
          setInput(result.slice(1));
        } else {
          setInput("-" + result);
        }
        setResult("");
        setJustCalculated(false);
      } else {
        setInput(input.startsWith("-") ? input.slice(1) : "-" + input);
      }
    } else if (value === "()") {
      const open = (input.match(/\(/g) || []).length;
      const close = (input.match(/\)/g) || []).length;
      setInput(input + (open > close ? ")" : "("));
      setJustCalculated(false);
    } else if (value === ".") {
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
      if (justCalculated) {
        if (isOperator(value)) {
          setInput(result + value);
        } else {
          setInput(value === "0" ? "0" : value);
        }
        setResult("");
        setJustCalculated(false);
      } else {
        let updatedInput = input === "0" ? "" : input;
        const lastChar = updatedInput[updatedInput.length - 1];
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
        "(": "(",
        ")": ")",
      };
      const key = map[e.key] || e.key;
      if (
        /^[0-9]$/.test(key) ||
        ["+", "-", "×", "÷", ".", "%", "=", "C", "←", "(", ")", "+/-"].includes(
          key
        )
      ) {
        e.preventDefault();
        if (key === "(" || key === ")") {
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
        <Display input={input} result={result} />
        <Keypad buttons={buttons} onClick={handleClick} />
        <button
          className="toggle-history-btn"
          onClick={() => setShowHistory((show) => !show)}
        >
          {showHistory ? "숨기기" : "연산 기록 보기"}
        </button>
      </div>
      {showHistory && <History history={history} />}
    </div>
  );
};

export default Calculator;
