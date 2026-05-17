import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Review10_Page1_Q3 = () => {
  const questions = ["lively", "enormous", "flexible", "appealing"];

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...answers];

    updated[i] = value;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = answers.some((a) => !a.trim());

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((a, i) => {
      const ok = normalize(a) === normalize(questions[i]);

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = questions.length;

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
    setAnswers(["lively", "enormous", "flexible", "appealing"]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width) => (
    <span className={`relative inline-block ${width}`}>
      <input
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          w-full
  border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6D2980]
          font-semibold
          px-1

          ${result[i] === false ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
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
          }}
        >
          ✕
        </span>
      )}
    </span>
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div
        className="div-forall text-[18px]"
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* TITLE */}
        <h5 className="header-title-page8 mb-27">
          <span
            style={{
              marginRight: "10px",
            }}
          >
            C
          </span>
          Write the correct adjective to match the description.
        </h5>

        <div className="flex justify-between items-start">
          {/* QUESTIONS */}
          <div className="flex flex-col gap-15 w-[70%]">
            {/* 1 */}
            <div className="flex items-center">
              <span className="font-bold mr-4">1</span>

              <span>music that is fast and happy-sounding is </span>

              {inputField(0, "flex-1 min-w-[180px] mx-2")}

              <span>.</span>
            </div>

            {/* 2 */}
            <div className="flex items-center">
              <span className="font-bold mr-4">2</span>

              <span>something that is huge </span>

              {inputField(1, "flex-1 min-w-[180px] mx-2")}

              <span>.</span>
            </div>

            {/* 3 */}
            <div className="flex items-center">
              <span className="font-bold mr-4">3</span>

              <span>bendable, able to change or move easily </span>

              {inputField(2, "flex-1 min-w-[180px] mx-2")}

              <span>.</span>
            </div>

            {/* 4 */}
            <div className="flex items-center">
              <span className="font-bold mr-4">4</span>

              <span>attractive to others, something many like </span>

              {inputField(3, "flex-1 min-w-[180px] mx-2")}

              <span>.</span>
            </div>
          </div>

          {/* WORD BOX */}
          <div
            style={{
              background: "#E8E1EC",
              borderRadius: "16px",
              width: "140px",
              padding: "30px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "40px",
              alignItems: "center",
              marginLeft: "30px",
            }}
          >
            <span>flexible</span>

            <span>enormous</span>

            <span>appealing</span>

            <span>lively</span>
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

export default Review10_Page1_Q3;
