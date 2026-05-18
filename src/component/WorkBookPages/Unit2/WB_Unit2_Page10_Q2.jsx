import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit2_Page10_Q2 = () => {
  const questions = [
    "who is wearing a white sweater",
    "which has just been published",
    "that we played yesterday",
    "which has a short tail",
  ];

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
    setAnswers([
      "who is wearing a white sweater",
      "which has just been published",
      "that we played yesterday",
      "which has a short tail",
    ]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width = "w-full") => (
    <div className="relative inline-block flex-1">
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
    </div>
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* TITLE */}
        <h5 className="header-title-page8">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            D
          </span>
          Read and complete the sentences. Add a relative clause to <br /> each
          sentence then circle the noun it tells about.
        </h5>

        {/* QUESTIONS */}
        
        <div className="flex flex-col gap-10  text-[18px] mt-[18vh]">
          {/* 1 */}
          <div className="flex items-center gap-4">
            <span className="font-bold">1</span>

            <span>Have you seen my brother</span>

            {inputField(0)}

            <span>?</span>
          </div>

          {/* 2 */}
          <div className="flex items-center gap-4">
            <span className="font-bold">2</span>

            <span>This is my new book</span>

            {inputField(1)}

            <span>.</span>
          </div>

          {/* 3 */}
          <div className="flex items-center gap-4">
            <span className="font-bold">3</span>

            <span>Let’s play the game</span>

            {inputField(2)}

            <span>.</span>
          </div>

          {/* 4 */}
          <div className="flex items-center gap-4">
            <span className="font-bold">4</span>

            <span>My cat,</span>

            {inputField(3)}

            <span>, is so playful.</span>
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

export default WB_Unit2_Page10_Q2;
