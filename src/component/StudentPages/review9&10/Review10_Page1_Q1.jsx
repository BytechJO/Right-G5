import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Review10_Page1_Q1 = () => {
  const categories = {
    music: ["symphony", "composers", "instrument", "moods"],
    adjectives: ["appealing", "enormous", "lively", "flexible"],
    farming: ["harvesting", "acres"],
    extra: ["variety"],
  };

  const allAnswers = [
    ...categories.music,
    ...categories.adjectives,
    ...categories.farming,
    ...categories.extra,
  ];

  const [answers, setAnswers] = useState(Array(16).fill(""));

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

  const isCorrectForColumn = (value, column) => {
    const normalized = normalize(value);

    return categories[column].some((word) => normalize(word) === normalized);
  };

  const checkAnswers = () => {
    if (locked) return;

    const filledAnswers = answers.filter((a) => a.trim());

    if (filledAnswers.length < 10) {
      ValidationAlert.info("Please fill in at least 10 blanks.");

      return;
    }

    const usedWords = new Set();

    let correctCount = 0;

    const columns = [
      "music",
      "music",
      "music",
      "music",

      "adjectives",
      "adjectives",
      "adjectives",
      "adjectives",

      "farming",
      "farming",
      "farming",
      "farming",

      "extra",
      "extra",
      "extra",
      "extra",
    ];

    const newResults = answers.map((answer, i) => {
      if (!answer.trim()) return undefined;

      const normalized = normalize(answer);

      const correct = isCorrectForColumn(answer, columns[i]);

      if (!correct) return false;

      if (usedWords.has(normalized)) {
        return undefined;
      }

      usedWords.add(normalized);

      correctCount++;

      return true;
    });

    setResult(newResults);

    const total = allAnswers.length;

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
      "symphony",
      "composers",
      "instrument",
      "moods",

      "appealing",
      "enormous",
      "lively",
      "flexible",

      "harvesting",
      "acres",
      "",
      "",

      "variety",
      "",
      "",
      "",
    ]);

    setResult([
      true,
      true,
      true,
      true,

      true,
      true,
      true,
      true,

      true,
      true,
      undefined,
      undefined,

      true,
      undefined,
      undefined,
      undefined,
    ]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(Array(16).fill(""));

    setResult([]);

    setLocked(false);
  };

  const inputField = (i) => (
    <span className="relative inline-block">
      <input
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          w-[170px]
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
        className="div-forall "
        style={{
          minHeight: "65vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* TITLE */}
        <h5 className="header-title-page8 mb-25">
          <span
            style={{
              marginRight: "10px",
            }}
          >
            A
          </span>
          Put the vocabulary words into the correct category.
        </h5>

        {/* CATEGORIES */}
        <div className="grid grid-cols-4 gap-x-10 text-[18px]">
          {/* MUSIC */}
          <div className="flex flex-col items-center gap-10">
            <div
              style={{
                background: "#E9E1EC",
                borderRadius: "12px",
                width: "170px",
                padding: "12px",
                textAlign: "center",
              }}
            >
              about music
            </div>

            {inputField(0)}
            {inputField(1)}
            {inputField(2)}
            {inputField(3)}
          </div>

          {/* ADJECTIVES */}
          <div className="flex flex-col items-center gap-10">
            <div
              style={{
                background: "#E9E1EC",
                borderRadius: "12px",
                width: "170px",
                padding: "12px",
                textAlign: "center",
              }}
            >
              adjectives
            </div>

            {inputField(4)}
            {inputField(5)}
            {inputField(6)}
            {inputField(7)}
          </div>

          {/* FARMING */}
          <div className="flex flex-col items-center gap-10">
            <div
              style={{
                background: "#E9E1EC",
                borderRadius: "12px",
                width: "170px",
                padding: "12px",
                textAlign: "center",
              }}
            >
              about farming
            </div>

            {inputField(8)}
            {inputField(9)}
            {inputField(10)}
            {inputField(11)}
          </div>

          {/* EXTRA */}
          <div className="flex flex-col items-center gap-10">
            <div
              style={{
                background: "#E9E1EC",
                borderRadius: "12px",
                width: "170px",
                padding: "12px",
                textAlign: "center",
              }}
            >
              extra
            </div>

            {inputField(12)}
            {inputField(13)}
            {inputField(14)}
            {inputField(15)}
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

export default Review10_Page1_Q1;
