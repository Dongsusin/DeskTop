import React, { useRef, useState, useEffect, useCallback } from "react";
import "./PaintApp.css";

const MAX_HISTORY = 50;

const PaintApp = () => {
  const canvasRef = useRef(null);
  const historyRef = useRef([]);
  const redoStackRef = useRef([]);
  const lastImageRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(3);
  const [brushType, setBrushType] = useState("round");
  const [shape, setShape] = useState("free");

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    saveHistory();
  }, []);

  const getContext = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineCap = brushType === "eraser" ? "round" : brushType;
    ctx.strokeStyle = brushType === "eraser" ? "#ffffff" : color;
    ctx.lineWidth = parseInt(lineWidth, 10);
    return ctx;
  };

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const saveHistory = useCallback(() => {
    const canvas = canvasRef.current;
    const url = canvas.toDataURL();

    historyRef.current = [...historyRef.current, url].slice(-MAX_HISTORY);
    redoStackRef.current = [];
  }, []);

  const restoreImage = useCallback((url) => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = url;
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        resolve();
      };
    });
  }, []);

  const startDrawing = useCallback(
    (e) => {
      e.preventDefault();
      const pos = getPos(e);
      setStartPos(pos);

      const ctx = getContext();

      if (shape === "free") {
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
      } else if (historyRef.current.length > 0) {
        const lastUrl = historyRef.current[historyRef.current.length - 1];
        const img = new Image();
        img.src = lastUrl;
        lastImageRef.current = img;
      }

      setIsDrawing(true);
      saveHistory();
    },
    [shape, saveHistory, color, lineWidth, brushType]
  );

  const draw = useCallback(
    (e) => {
      if (!isDrawing) return;
      e.preventDefault();
      const pos = getPos(e);
      const ctx = getContext();

      if (shape === "free") {
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      } else {
        if (!lastImageRef.current) return;

        const canvas = canvasRef.current;

        requestAnimationFrame(() => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(lastImageRef.current, 0, 0);

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
        });
      }
    },
    [isDrawing, shape, startPos, color, lineWidth, brushType]
  );

  const stopDrawing = useCallback(
    (e) => {
      e.preventDefault();
      if (!isDrawing) return;
      setIsDrawing(false);
      saveHistory();
      lastImageRef.current = null;
    },
    [isDrawing, saveHistory]
  );

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveHistory();
  }, [saveHistory]);

  const undo = useCallback(() => {
    if (historyRef.current.length <= 1) return;

    const last = historyRef.current[historyRef.current.length - 2];

    redoStackRef.current = [
      ...redoStackRef.current,
      historyRef.current[historyRef.current.length - 1],
    ];

    historyRef.current = historyRef.current.slice(0, -1);

    restoreImage(last);
  }, [restoreImage]);

  const redo = useCallback(() => {
    if (redoStackRef.current.length === 0) return;

    const next = redoStackRef.current.pop();
    historyRef.current = [...historyRef.current, next];

    restoreImage(next);
  }, [restoreImage]);

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
