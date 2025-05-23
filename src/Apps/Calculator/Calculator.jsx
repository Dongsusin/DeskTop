import { useState, useEffect } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [input, setInput] = useState("0");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    if (value === "C") {
      setInput("0");
      setResult("");
    } else if (value === "←") {
      setInput((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    } else if (value === "=") {
      try {
        const evalResult = eval(
          input.replace(/×/g, "*").replace(/÷/g, "/").replace(/%/g, "/100")
        );
        setResult(evalResult.toString());
        setInput(evalResult.toString());
      } catch {
        setResult("Error");
      }
    } else if (value === "+/-") {
      if (input.startsWith("-")) setInput(input.slice(1));
      else if (input !== "0") setInput("-" + input);
    } else if (value === "()") {
      const open = (input.match(/\(/g) || []).length;
      const close = (input.match(/\)/g) || []).length;
      setInput(input + (open > close ? ")" : "("));
    } else {
      let updatedInput = input === "0" ? "" : input;
      const lastChar = updatedInput[updatedInput.length - 1];
      if (
        ["+", "-", "×", "÷"].includes(lastChar) &&
        ["+", "-", "×", "÷"].includes(value)
      ) {
        updatedInput = updatedInput.slice(0, -1);
      }
      setInput(updatedInput + value);
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
      };
      const key = map[e.key] || e.key;
      if (
        /^[0-9]$/.test(key) ||
        ["+", "-", "×", "÷", ".", "%", "=", "C", "()", "←", "+/-"].includes(key)
      ) {
        handleClick(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input]);

  return (
    <div className="calculator">
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
    </div>
  );
};

export default Calculator;
