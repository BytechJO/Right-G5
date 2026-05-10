import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Review4_Page1_Q2 = () => {
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);

  const correctAnswers = ["straight", "me", "over", "split"];

  const normalize = (str) => str.toLowerCase().replace(/\s+/g, "").trim();

  const handleChange = (i, val) => {
    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  const input = (i, width = "w-[180px]") => (
    <span className="relative inline-block mx-1">
      <input
        disabled={locked || result[i] === true}
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`border-b outline-none text-[#6D2980] font-semibold ${width}
        ${result[i] === false ? "border-red-500" : "border-black"}
      `}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
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
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        >
          ✕
        </span>
      )}
    </span>
  );

  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;

    const res = answers.map((a, i) => {
      const ok = normalize(a) === normalize(correctAnswers[i]);

      if (ok) correctCount++;

      return ok;
    });

    setResult(res);

    const total = correctAnswers.length;

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

  const showAnswers = () => {
    setAnswers(correctAnswers);
    setResult([true, true, true, true]);
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", ""]);
    setResult([]);
    setLocked(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div className="div-forall">
        <h5 className="header-title-page8 mb-40">
          <span className="mr-2">B</span>
          Read and write the expression.
        </h5>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            rowGap: "90px",
            columnGap: "100px",
            fontSize: "20px",
          }}
        >
          {/* 1 */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                minWidth: "20px",
              }}
            >
              1
            </span>

            <div style={{ lineHeight: "1.8" }}>{input(0)} ahead</div>
          </div>

          {/* 2 */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                minWidth: "20px",
              }}
            >
              2
            </span>

            <div style={{ lineHeight: "1.8" }}>Not {input(1)}!</div>
          </div>

          {/* 3 */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                minWidth: "20px",
              }}
            >
              3
            </span>

            <div style={{ lineHeight: "1.8" }}>head {input(2)}</div>
          </div>

          {/* 4 */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                minWidth: "20px",
              }}
            >
              4
            </span>

            <div style={{ lineHeight: "1.8" }}>{input(3)} up</div>
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

export default Review4_Page1_Q2;
