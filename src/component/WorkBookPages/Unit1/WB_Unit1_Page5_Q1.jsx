import React, { useRef, useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit1_Page5_Q1 = () => {
  const inputsRef = useRef({});
  const questions = [
    ["t", "a", "l"],
    ["n", "e", "o", "o"],
    ["s", "r", "n"],
    ["i", "l", "o"],
  ];

  const [answers, setAnswers] = useState([
    ["", "", ""],
    ["", "", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const handleChange = (wordIndex, letterIndex, value) => {
    if (locked || result[`${wordIndex}-${letterIndex}`] === true) return;

    const updated = [...answers];

    updated[wordIndex][letterIndex] = value.slice(-1);

    setAnswers(updated);

    setResult((prev) => ({
      ...prev,
      [`${wordIndex}-${letterIndex}`]: undefined,
    }));

    // auto move
    if (value) {
      const next = inputsRef.current[`${wordIndex}-${letterIndex + 1}`];

      if (next) {
        next.focus();
        next.select();
      }
    }
  };

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = answers.some((group) =>
      group.some((letter) => !letter.trim()),
    );

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = {};

    answers.forEach((group, wordIndex) => {
      group.forEach((letter, letterIndex) => {
        const ok =
          letter.toLowerCase() ===
          questions[wordIndex][letterIndex].toLowerCase();

        newResults[`${wordIndex}-${letterIndex}`] = ok;

        if (ok) correctCount++;
      });
    });

    setResult(newResults);

    const total = questions.flat().length;

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
      ["t", "a", "l"],
      ["n", "e", "o", "o"],
      ["s", "r", "n"],
      ["i", "l", "o"],
    ]);

    const solved = {};

    questions.forEach((group, wordIndex) => {
      group.forEach((_, letterIndex) => {
        solved[`${wordIndex}-${letterIndex}`] = true;
      });
    });

    setResult(solved);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers([
      ["", "", ""],
      ["", "", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);

    setResult([]);

    setLocked(false);
  };

  const letterBox = (wordIndex, letterIndex) => (
    <span className="relative inline-block">
      <input
        type="text"
        ref={(el) => (inputsRef.current[`${wordIndex}-${letterIndex}`] = el)}
        maxLength={1}
        onFocus={(e) => e.target.select()}
        maxLength={1}
        value={answers[wordIndex][letterIndex]}
        disabled={locked || result[`${wordIndex}-${letterIndex}`] === true}
        onChange={(e) => handleChange(wordIndex, letterIndex, e.target.value)}
        className={`
          w-6
          border-0
          border-b
          outline-none
          bg-transparent
          text-center
          text-[20px]
          text-[#6d2980]
          font-semibold

          ${
            result[`${wordIndex}-${letterIndex}`] === false
              ? "border-[#D1232A]"
              : "border-black"
          }
        `}
      />

      {result[`${wordIndex}-${letterIndex}`] === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            width: "18px",
            height: "18px",
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
            zIndex: 5,
          }}
        >
          ✕
        </span>
      )}
    </span>
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall ">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-22">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            E
          </span>
          Write the missing letters.
        </h5>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-15 text-[20px]">
          {/* 1 */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold mr-3">1</span>

            <span>a c</span>

            {letterBox(0, 0)}

            <span>u</span>

            {letterBox(0, 1)}


            {letterBox(0, 2)}

            <span>l y</span>
          </div>

          {/* 2 */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold mr-3">2</span>

            {letterBox(1, 0)}

            <span>o t</span>

            {letterBox(1, 1)}

            <span>b</span>

            {letterBox(1, 2)}
            {letterBox(1, 3)}
            <span>k</span>
          </div>

          {/* 3 */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold mr-3">3</span>

            {letterBox(2, 0)}

            <span>t a</span>

            {letterBox(2, 1)}

            <span>v i</span>

            {letterBox(2, 2)}

            <span>g</span>
          </div>

          {/* 4 */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold mr-3">4</span>

            <span>p</span>

            {letterBox(3, 0)}

            {letterBox(3, 1)}
            <span>l</span>

            {letterBox(3, 2)}
            <span>w</span>

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

export default WB_Unit1_Page5_Q1;
