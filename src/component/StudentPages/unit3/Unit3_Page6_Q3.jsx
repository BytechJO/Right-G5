import React, { useEffect, useRef, useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Unit3_Page6_Q3 = () => {
  const containerRef = useRef();
  const [lines, setLines] = useState([]);
  const wordRefs = useRef([]);
  const data = [
    {
      words: ["bell", "sounds", "beautiful"],
      answer: "The bell sounds beautiful",
    },
    {
      words: ["job", "becomes", "tiring"],
      answer: "The job becomes tiring",
    },
    {
      words: ["pie", "tastes", "delicious"],
      answer: "The pie tastes delicious",
    },
    {
      words: ["books", "seem", "interesting"],
      answer: "The book seems interesting",
    },
    {
      words: ["students", "look", "bored"],
      answer: "The students look bored",
    },
  ];

  const [answers, setAnswers] = useState(Array(5).fill(""));
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  // 🔥 التوصيل
  const [selected, setSelected] = useState(null);
  const [connections, setConnections] = useState(Array(5).fill(null));

  const normalize = (s) => s.toLowerCase().replace(/[.,]/g, "").trim();
  useEffect(() => {
    const parent = containerRef.current?.getBoundingClientRect();

    const newLines = connections.map((conn, i) => {
      if (!conn || !parent) return null;

      const [a, b] = conn;

      const el1 = wordRefs.current[i]?.[a];
      const el2 = wordRefs.current[i]?.[b];

      if (!el1 || !el2) return null;

      const r1 = el1.getBoundingClientRect();
      const r2 = el2.getBoundingClientRect();

      return {
        x1: r1.left - parent.left + r1.width / 2,
        y1: r1.top - parent.top - 10, // 👈 من فوق الكلمة
        x2: r2.left - parent.left + r2.width / 2,
        y2: r2.top - parent.top - 10,
      };
    });

    setLines(newLines);
  }, [connections]);
  // 🎯 اختيار الكلمات
  const handleWordClick = (row, index) => {
    if (locked) return;
    if (result[row]?.connection === true) return;
    if (!selected) {
      setSelected({ row, index });
      return;
    }

    if (selected.row !== row) {
      setSelected({ row, index });
      return;
    }

    const updated = [...connections];
    updated[row] = [selected.index, index];
    setConnections(updated);

    setSelected(null);
  };

  // ✅ CHECK
  const handleCheck = () => {
    if (locked) return;

    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Complete all answers.");
      return;
    }
    if (connections.some((c) => !c)) {
      ValidationAlert.info("Complete all connections.");
      return;
    }
    let correctCount = 0;
    let total = data.length * 2; // 10
    const res = answers.map((a, i) => {
      const sentenceOk = normalize(a) === normalize(data[i].answer);

      const conn = connections[i];
      const connectionOk =
        conn &&
        ((conn[0] === 0 && conn[1] === 2) || (conn[0] === 2 && conn[1] === 0));

      if (sentenceOk) correctCount++;
      if (connectionOk) correctCount++;

      return {
        sentence: sentenceOk,
        connection: connectionOk,
      };
    });
    setResult(res);

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // 👀 SHOW
  const handleShow = () => {
    setAnswers(data.map((d) => d.answer));
    setConnections(data.map(() => [2, 0]));
    setResult([]);
    setLocked(true);
  };

  // 🔄 RESET
  const handleReset = () => {
    setAnswers(Array(5).fill(""));
    setConnections(Array(5).fill(null));
    setResult([]);
    setLocked(false);
    setSelected(null);
  };

  // 🎯 input
  const input = (i) => (
    <span className="relative inline-block w-full">
      <input
        value={answers[i]}
        disabled={locked}
        onFocus={(e) => e.target.select()}
        onChange={(e) => {
          if (result[i]?.sentence === true) return;
          const updated = [...answers];
          updated[i] = e.target.value;
          setAnswers(updated);

          setResult((prev) => {
            const copy = [...prev];
            copy[i] = undefined;
            return copy;
          });
        }}
        className={`border-b outline-none w-full text-[#6D2980] font-bold bg-transparent
       ${result[i]?.sentence === false ? "border-red-500" : "border-black"}`}
      />

      {result[i]?.sentence === false && (
        <span
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            transform: "translateY(-50%)",
            width: "20px",
            height: "20px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        >
          ✕
        </span>
      )}
    </span>
  );

  return (
    <div
      ref={containerRef}
      className=" flex flex-col items-center p-8 relative"
    >
      <div className="div-forall">
        <h5 className="header-title-page8 mb-15">
          <span className="ex-A mr-2.5">F</span>
          Write sentences that use the words given.
          <br /> Draw an arrow from the adjective to the noun it describes.
        </h5>

        {/* QUESTIONS */}
        <div className="space-y-15 text-[18px]">
          {data.map((item, i) => (
            <div key={i}>
              <div className="flex items-center gap-4 mb-2 relative ">
                <div className=" relative w-[250px]">
                  <span className="font-bold mr-3">{i + 1}</span>

                  {/* الكلمات */}
                  {item.words.map((word, wIndex) => (
                    <span key={wIndex} className=" relative ">
                      <span
                        ref={(el) => {
                          if (!wordRefs.current[i]) wordRefs.current[i] = [];
                          wordRefs.current[i][wIndex] = el;
                        }}
                        onClick={() => handleWordClick(i, wIndex)}
                        className={`relative cursor-pointer px-2 rounded
          ${
            selected?.row === i && selected?.index === wIndex
              ? "bg-purple-200"
              : ""
          }
        `}
                      >
                        {word}
                      </span>

                      {wIndex < item.words.length - 1 && (
                        <span className=" relative mx-1 text-gray-500">/</span>
                      )}
                    </span>
                  ))}

                  {/* ❌ إذا التوصيل غلط */}
                  {result[i]?.connection === false && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-10px",
                        right: "95%",
                        transform: "translateY(-50%)",
                        width: "20px",
                        height: "20px",
                        background: "#ef4444",
                        color: "white",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: "bold",
                        border: "2px solid white",
                        boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                        pointerEvents: "none",
                        zIndex: 3,
                      }}
                    >
                      ✕
                    </span>
                  )}
                </div>

                {/* 🔥 input جنبهم */}
                <div className="ml-6 w-full">{input(i)}</div>
              </div>
            </div>
          ))}
        </div>
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {lines.map(
            (l, i) =>
              l && (
                <path
                  key={i}
                  d={`M ${l.x1} ${l.y1}
              Q ${(l.x1 + l.x2) / 2} ${l.y1 - 30}
              ${l.x2} ${l.y2}`}
                  stroke="#6D2980"
                  strokeWidth="2"
                  fill="transparent"
                  markerEnd="url(#arrow)"
                />
              ),
          )}

          <defs>
            <marker
              id="arrow"
              markerWidth="10"
              markerHeight="10"
              refX="5"
              refY="5"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 Z" fill="#6D2980" />
            </marker>
          </defs>
        </svg>
        {/* BUTTONS */}
        <div className="action-buttons-container mt-6">
          <button className="try-again-button" onClick={handleReset}>
            Start Again ↻
          </button>

          <button onClick={handleShow} className="show-answer-btn">
            Show Answer
          </button>

          <button className="check-button2" onClick={handleCheck}>
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unit3_Page6_Q3;
