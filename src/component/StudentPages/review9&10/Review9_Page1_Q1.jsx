import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Review9_Page2_Q1 = () => {
  const questions = [
    "exactly",
    "mowing",
    "appointments",
    "braces",
    "stadium",
    "lawns",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);

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
      "exactly",
      "mowing",
      "appointments",
      "braces",
      "stadium",
      "lawns",
    ]);

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", "", ""]);

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
      <div className="div-forall">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-10">
          <span
            style={{
              marginRight: "10px",
            }}
          >
            A
          </span>
          Find the vocabulary words that have these smaller words scrambled
          inside of them.
        </h5>

        {/* WORD BOX */}
        <div
          style={{
            background: "#E9E1EC",
            borderRadius: "16px",
            padding: "14px 28px",
            display: "grid",
            gridTemplateColumns: "repeat(5, auto)",
            gap: "18px 34px",
            margin: "0 auto", 
            width: "760px",
            marginBottom: "40px",
            fontSize: "18px",
          }}
        >
          <span>exactly</span>
          <span>ring</span>
          <span>braces</span>
          <span>club</span>
          <span>congratulations</span>

          <span>stadium</span>
          <span>rush</span>
          <span>mowing</span>
          <span>lawns</span>
          <span>appointments</span>
        </div>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-8">
          {/* 1 */}
          <div className="flex items-center gap-4 text-[18px]">
            <span className="font-bold">1</span>

            <span>cat</span>

            <span>tax</span>

            <span>lay</span>

            <span>ace</span>

            {inputField(0, "w-[220px]")}
          </div>

          {/* 2 */}
          <div className="flex items-center gap-4 text-[18px]">
            <span className="font-bold">2</span>

            <span>now</span>

            <span>wing</span>

            <span>go</span>

            {inputField(1, "w-[240px]")}
          </div>

          {/* 3 */}
          <div className="flex items-center gap-4 text-[18px]">
            <span className="font-bold">3</span>

            <span>point</span>

            <span>poem</span>

            <span>ointment</span>

            {inputField(2, "w-[280px]")}
          </div>

          {/* 4 */}
          <div className="flex items-center gap-4 text-[18px]">
            <span className="font-bold">4</span>

            <span>bear</span>

            <span>race</span>

            <span>car</span>

            {inputField(3, "w-[240px]")}
          </div>

          {/* 5 */}
          <div className="flex items-center gap-4 text-[18px]">
            <span className="font-bold">5</span>

            <span>mist</span>

            <span>mud</span>

            <span>datum</span>

            <span>must</span>

            {inputField(4, "w-[260px]")}
          </div>

          {/* 6 */}
          <div className="flex items-center gap-4 text-[18px]">
            <span className="font-bold">6</span>

            <span>saw</span>

            <span>was</span>

            <span>allowance</span>

            {inputField(5, "w-[230px]")}
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

export default Review9_Page2_Q1;
