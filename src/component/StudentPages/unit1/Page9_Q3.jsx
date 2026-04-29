import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Page9_Q3 = () => {
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);

  // ✅ الإجابات الصح
  const correct = ["b", "c", "d", "a"];

  const handleChange = (i, val) => {
    const updated = [...answers];
    updated[i] = val.toLowerCase();
    setAnswers(updated);

    // 🔥 امسح حالة الغلط أول ما يعدّل
    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  const input = (i) => (
    <span className="relative mx-2">
      <input
        disabled={locked || result[i] === true}
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        maxLength={1}
        className={`w-[40px] border-b outline-none text-center font-bold uppercase
        ${result[i] === false ? "border-red-500 text-[#6D2980]" : "border-black text-[#6D2980]"}
      `}
      />

      {/* ❌ */}
      {result[i] === false && (
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

  // ====================
  // ✅ CHECK
  // ====================
  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;

    const res = answers.map((a, i) => {
      const ok = a === correct[i];
      if (ok) correctCount++;
      return ok;
    });

    setResult(res);

    const total = correct.length;

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

  // ====================
  // 👀 SHOW ANSWERS
  // ====================
  const showAnswers = () => {
    setAnswers(correct);
    setLocked(true);
  };

  // ====================
  // 🔄 RESET
  // ====================
  const reset = () => {
    setAnswers(["", "", "", ""]);
    setLocked(false);
    setResult([]);
  };

  return (
    <div className="p-8 flex flex-col items-center">
      <div className="w-full max-w-[900px]">
        <h5 className="header-title-page8 mb-25">
          <span className="ex-A mr-2">F</span>
          Match each question to its answer.
        </h5>

        <div className="grid grid-cols-2 gap-25 text-[22px]">
          {/* LEFT */}
          <div className="space-y-15">
            <div>{input(0)} 1. How do you spell your name?</div>

            <div>{input(1)} 2. How far is it to your house?</div>

            <div>{input(2)} 3. How many hours do you study?</div>

            <div>{input(3)} 4. How tall is the elephant?</div>
          </div>

          {/* RIGHT */}
          <div className="space-y-15">
            <div>a. It’s two meters tall.</div>
            <div>b. I spell it S-T-E-V-E-N.</div>
            <div>c. It’s about two kilometers from here.</div>
            <div>d. I study about two hours every day.</div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="action-buttons-container mt-6">
        <button className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>

        <button onClick={showAnswers} className="show-answer-btn">
          Show Answer
        </button>

        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Page9_Q3;
