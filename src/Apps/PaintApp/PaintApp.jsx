import React, { useRef, useState, useEffect } from "react";
import "./PaintApp.css";

const PaintApp = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(3);
  const [brushType, setBrushType] = useState("round");
  const [shape, setShape] = useState("free");

  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
  }, []);

  const getContext = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineCap = brushType === "eraser" ? "round" : brushType;
    ctx.strokeStyle = brushType === "eraser" ? "#ffffff" : color;
    ctx.lineWidth = parseInt(lineWidth);
    return ctx;
  };

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches
      ? e.touches[0].clientX
      : e.nativeEvent.offsetX + rect.left;
    const clientY = e.touches
      ? e.touches[0].clientY
      : e.nativeEvent.offsetY + rect.top;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const saveHistory = () => {
    const canvas = canvasRef.current;
    const url = canvas.toDataURL();
    setHistory((prev) => [...prev, url]);
    setRedoStack([]);
  };

  const restoreImage = (url) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = url;
    img.onload = () => ctx.drawImage(img, 0, 0);
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const pos = getPos(e);
    setStartPos(pos);

    const ctx = getContext();
    if (shape === "free") {
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }

    setIsDrawing(true);
    saveHistory();
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const pos = getPos(e);
    const ctx = getContext();

    if (shape === "free") {
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    } else {
      const prev = history[history.length - 1];
      if (prev) {
        const image = new Image();
        image.src = prev;
        image.onload = () => {
          ctx.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
          ctx.drawImage(image, 0, 0);

          ctx.beginPath();
          if (shape === "line") {
            ctx.moveTo(startPos.x, startPos.y);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
          } else if (shape === "rect") {
            const w = pos.x - startPos.x;
            const h = pos.y - startPos.y;
            ctx.strokeRect(startPos.x, startPos.y, w, h);
          } else if (shape === "circle") {
            const radius = Math.hypot(pos.x - startPos.x, pos.y - startPos.y);
            ctx.arc(startPos.x, startPos.y, radius, 0, Math.PI * 2);
            ctx.stroke();
          }
        };
      }
    }
  };

  const stopDrawing = (e) => {
    e.preventDefault();
    if (isDrawing) {
      setIsDrawing(false);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0);
    saveHistory();
  };

  const undo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 2];
    setRedoStack((prev) => [...prev, canvasRef.current.toDataURL()]);
    setHistory((prev) => prev.slice(0, prev.length - 1));
    if (last) restoreImage(last);
    else clearCanvas();
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack.pop();
    setHistory((prev) => [...prev, next]);
    setRedoStack([...redoStack]);
    restoreImage(next);
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "my_drawing.png";
    link.click();
  };

  return (
    <div className="paint-container">
      <div className="toolbar">
        <label>
          색상:
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>
        <label>
          굵기:
          <input
            type="range"
            min="1"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(e.target.value)}
          />
        </label>
        <label>
          브러시:
          <select
            value={brushType}
            onChange={(e) => setBrushType(e.target.value)}
          >
            <option value="round">둥근 붓</option>
            <option value="square">사각 붓</option>
            <option value="eraser">지우개</option>
          </select>
        </label>
        <label>
          도형:
          <select value={shape} onChange={(e) => setShape(e.target.value)}>
            <option value="free">자유 그리기</option>
            <option value="line">직선</option>
            <option value="rect">사각형</option>
            <option value="circle">원</option>
          </select>
        </label>
        <button onClick={undo}>되돌리기</button>
        <button onClick={redo}>다시 실행</button>
        <button onClick={clearCanvas}>전체 지우기</button>
        <button onClick={saveImage}>저장하기</button>
      </div>
      <canvas
        ref={canvasRef}
        className="paint-canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
    </div>
  );
};

export default PaintApp;
