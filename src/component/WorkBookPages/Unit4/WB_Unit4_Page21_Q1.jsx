import React, { useRef, useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit4_Page21_Q1 = () => {
  const [showResult, setShowResult] = useState(false);
  const [validatedMatches, setValidatedMatches] = useState({});
  const leftItems = [
    "grocery store",
    "clothes store",
    "bookstore",
    "food court",
  ];

  const rightItems = [
    "to buy books.",
    "to buy food items and household items.",
    "to eat food at a mall.",
    "to buy things to wear.",
  ];

  const correctMatches = {
    0: 1,
    1: 3,
    2: 0,
    3: 2,
  };

  const [connections, setConnections] = useState([]);

  const [selectedLeft, setSelectedLeft] = useState(null);

  const [locked, setLocked] = useState(false);

  const [result, setResult] = useState([]);

  const leftRefs = useRef([]);

  const rightRefs = useRef([]);

  const svgRef = useRef(null);

  const getCenter = (el) => {
    if (!el)
      return {
        x: 0,
        y: 0,
      };

    const rect = el.getBoundingClientRect();

    const parentRect = svgRef.current.getBoundingClientRect();

    return {
      x: rect.left - parentRect.left + rect.width / 2,

      y: rect.top - parentRect.top + rect.height / 2,
    };
  };

  const handleLeftClick = (index) => {
    if (locked) return;

    const connection = connections.find((c) => c.left === index);

    const alreadyCorrect =
      showResult && connection && correctMatches[index] === connection.right;

    if (alreadyCorrect) return;

    setSelectedLeft(index);

    // 🔥 شيل الإكس مباشرة
    setValidatedMatches((prev) => {
      const updated = { ...prev };

      delete updated[index];

      return updated;
    });
  };

  const handleRightClick = (rightIndex) => {
    if (locked || selectedLeft === null) return;

    // إذا اليسار المختار أصلاً صح، لا تعدليه
    const selectedConnection = connections.find((c) => c.left === selectedLeft);

    if (
      showResult &&
      selectedConnection &&
      correctMatches[selectedLeft] === selectedConnection.right
    ) {
      setSelectedLeft(null);
      return;
    }

    // إذا جهة اليمين مستخدمة بإجابة صح، ممنوع حدا ياخدها
    const alreadyCorrectlyUsed =
      showResult &&
      connections.some(
        (c) =>
          c.right === rightIndex &&
          correctMatches[c.left] === c.right &&
          c.left !== selectedLeft,
      );

    if (alreadyCorrectlyUsed) return;

    setConnections((prev) => {
      const updated = prev.filter((c) => {
        const isCorrectLocked =
          showResult && correctMatches[c.left] === c.right;

        if (isCorrectLocked) return true;

        return c.left !== selectedLeft && c.right !== rightIndex;
      });

      updated.push({
        left: selectedLeft,
        right: rightIndex,
      });

      return updated;
    });

    setSelectedLeft(null);
  };

  const checkAnswers = () => {
    if (locked) return;

    if (connections.length !== 4) {
      ValidationAlert.info("Please complete all matches.");

      return;
    }

    let correctCount = 0;

    const results = connections.map((c) => {
      const ok = correctMatches[c.left] === c.right;

      if (ok) correctCount++;

      return ok;
    });

    setResult(results);
    const validated = {};

    connections.forEach((c) => {
      validated[c.left] = c.right;
    });

    setValidatedMatches(validated);
    setShowResult(true);
    const total = 4;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:18px;text-align:center;">
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

  const showAnswers = () => {
    const answerConnections = [
      {
        left: 0,
        right: 1,
      },

      {
        left: 1,
        right: 3,
      },

      {
        left: 2,
        right: 0,
      },

      {
        left: 3,
        right: 2,
      },
    ];

    setConnections(answerConnections);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setConnections([]);

    setSelectedLeft(null);

    setResult([]);
    setShowResult(false);

    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div
        ref={svgRef}
        className="div-forall text-[18px] relative"
      >
        {/* TITLE */}
        <h5 className="header-title-page8 mb-[10vh]">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            A
          </span>
          Read and match.
        </h5>

        <p className="mb-8">We go to the ...</p>

        {/* SVG LINES */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            zIndex: 0,
          }}
        >
          {connections.map((conn, i) => {
            const start = getCenter(leftRefs.current[conn.left]);

            const end = getCenter(rightRefs.current[conn.right]);

            return (
              <line
                key={i}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="#6D2980"
                strokeWidth="2.5"
              />
            );
          })}
        </svg>

        {/* CONTENT */}
        <div className="relative z-10 flex justify-between px-10">
          {/* LEFT */}
          <div className="flex flex-col gap-10">
            {leftItems.map((item, index) => {
              const wrongMatch =
                showResult &&
                validatedMatches[index] !== undefined &&
                correctMatches[index] !== validatedMatches[index];
              return (
                <div
                  key={index}
                  onClick={() => handleLeftClick(index)}
                  className={`
          relative
          grid
          grid-cols-[20px_170px_12px]
          items-center
          gap-4
          cursor-pointer
          rounded-lg
          px-2
          py-1
          transition

          ${selectedLeft === index ? "bg-[#F3E8FB]" : "hover:bg-[#F8F1FC]"}
        `}
                >
                  <span className="font-bold w-5">{index + 1}</span>

                  <span>{item}</span>

                  <button
                    ref={(el) => (leftRefs.current[index] = el)}
                    className={`
                          w-3
                          h-3
                          rounded-full
                          border-2
                          border-[#6D2980]

                          ${
                            selectedLeft === index
                              ? "bg-[#6D2980] ring-4 ring-[#DCC3EE]"
                              : "bg-[#6D2980]"
                          }
                        `}
                  />
                  {wrongMatch && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-28px",
                        width: "20px",
                        height: "20px",
                        background: "#ef4444",
                        color: "white",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        fontWeight: "bold",
                        border: "2px solid white",
                        boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                        zIndex: 20,
                      }}
                    >
                      ✕
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-10 ">
            {rightItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 cursor-pointer px-2 py-1"
                onClick={() => handleRightClick(index)}
              >
                <button
                  ref={(el) => (rightRefs.current[index] = el)}
                  onClick={() => handleRightClick(index)}
                  className="w-3 h-3 rounded-full border-2 border-[#6D2980] bg-[#6D2980]"
                />

                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>

        <button className="show-answer-btn" onClick={showAnswers}>
          Show Answer
        </button>

        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default WB_Unit4_Page21_Q1;
