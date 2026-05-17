import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Unit10_Page5_Q3 = () => {
  const questions = ["It’s your turn.", "a long way to go", "huh?"];

  const [answers, setAnswers] = useState(["", "", ""]);

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
    setAnswers(["It’s your turn.", "a long way to go", "huh?"]);

    setResult([true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width) => (
    <span className="relative inline-block">
      <input
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          ${width}
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
        className="div-forall"
        style={{
          minHeight: "67vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* TITLE */}
        <h5 className="header-title-page8 ">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            C
          </span>
          Write each expression next to its definition.
        </h5>

        {/* WORD BOX */}
        <div
          style={{
            background: "#E9E1EC",
            borderRadius: "16px",
            padding: "14px 28px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "760px",
            marginBottom: "10px",
            fontSize: "18px",
          }}
        >
          <span>It’s your turn.</span>

          <span>huh?</span>

          <span>a long way to go</span>
        </div>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-15">
          {/* 1 */}
          <div className="flex items-center gap-4">
            <span className="font-bold text-[18px]">1</span>

            <span className="text-[18px]">
              what someone says when it’s time for the next person to go
            </span>

            {inputField(0, "w-[260px]")}
          </div>

          {/* 2 */}
          <div className="flex items-center gap-4">
            <span className="font-bold text-[18px]">2</span>

            <span className="text-[18px]">to travel or go a long distance</span>

            {inputField(1, "w-[240px]")}
          </div>

          {/* 3 */}
          <div className="flex items-center gap-4">
            <span className="font-bold text-[18px]">3</span>

            <span className="text-[18px]">
              what someone says when they don’t understand something or didn’t
              hear
            </span>

            {inputField(2, "w-[200px]")}
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

export default Unit10_Page5_Q3;
