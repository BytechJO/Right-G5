import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit3_Page18_Q2 = () => {
  const answers = ["e", "c", "b", "a", "d"];

  const leftItems = [
    "The weather",
    "Sarah",
    "The book",
    "The cat’s fur",
    "Mom’s pie",
  ];

  const rightItems = [
    "feels soft.",
    "seems interesting.",
    "is happy.",
    "tastes delicious.",
    "looks cloudy.",
  ];

  const rightLetters = ["a", "b", "c", "d", "e"];

  const [studentAnswers, setStudentAnswers] = useState(["", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) => str.toLowerCase().trim();

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...studentAnswers];

    updated[i] = value;

    setStudentAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = studentAnswers.some((a) => !a.trim());

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = studentAnswers.map((answer, i) => {
      const ok = normalize(answer) === normalize(answers[i]);

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = answers.length;

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
    setStudentAnswers(answers);

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setStudentAnswers(["", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i) => (
    <div className="relative inline-block">
      <input
        type="text"
        maxLength={1}
        value={studentAnswers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          w-[55px]
          border-0
          border-b
          outline-none
          bg-transparent
          text-center
          text-[18px]
          text-[#6D2980]
          font-semibold

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
      <div
        className="div-forall text-[18px] w-full"
      >
        {/* TITLE */}
        <h5 className="header-title-page8 mb-[10vh]">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            H
          </span>
          Match.
        </h5>

        {/* MATCHING */}
        <div className="grid grid-cols-2 gap-x-30">
          {/* LEFT */}
          <div className="flex flex-col gap-15">
            {leftItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                {inputField(index)}

                <span className="font-bold">{index + 1}</span>

                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-15">
            {rightItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="font-bold lowercase">
                  {rightLetters[index]}
                </span>

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

export default WB_Unit3_Page18_Q2;
