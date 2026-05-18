import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit3_Page17_Q1 = () => {
  const pairs = [
    ["short", "tall"],

    ["deep", "shallow"],

    ["far", "near"],

    ["quiet", "loud"],

    ["cheerful", "sad"],

    ["old", "young"],

    ["high", "low"],

    ["wide", "narrow"],
  ];

  const words = [
    "far",
    "short",
    "deep",
    "near",
    "quiet",
    "tall",
    "shallow",
    "high",
    "loud",
    "low",
    "old",
    "cheerful",
    "wide",
    "young",
    "narrow",
    "sad",
  ];

  const [studentAnswers, setStudentAnswers] = useState([
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
  ]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleChange = (qIndex, inputIndex, value) => {
    if (locked || result[qIndex] === true) return;

    const updated = [...studentAnswers];

    updated[qIndex][inputIndex] = value;

    setStudentAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[qIndex] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = studentAnswers.some((pair) => pair.some((a) => !a.trim()));

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const usedPairs = [];

    const newResults = studentAnswers.map((answerPair) => {
      const first = normalize(answerPair[0]);

      const second = normalize(answerPair[1]);

      const matchedIndex = pairs.findIndex((pair, idx) => {
        if (usedPairs.includes(idx)) return false;

        const p1 = normalize(pair[0]);

        const p2 = normalize(pair[1]);

        return (
          (first === p1 && second === p2) || (first === p2 && second === p1)
        );
      });

      const ok = matchedIndex !== -1;

      if (ok) {
        correctCount++;

        usedPairs.push(matchedIndex);
      }

      return ok;
    });
    setResult(newResults);

    const total = pairs.length;

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
    setStudentAnswers(pairs);

    setResult([true, true, true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setStudentAnswers([
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
    ]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (qIndex, inputIndex) => (
    <div className="relative inline-block">
      <input
        type="text"
        value={studentAnswers[qIndex][inputIndex]}
        disabled={locked || result[qIndex] === true}
        onChange={(e) => handleChange(qIndex, inputIndex, e.target.value)}
        className={`
          w-40
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6D2980]
          font-semibold
          px-1

          ${result[qIndex] === false ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {result[qIndex] === false && inputIndex === 1 && (
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
        className="div-forall text-[18px]"
      >
        {/* TITLE */}
        <h5 className="header-title-page8 mb-10">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            D
          </span>
          Write the adjectives together in pairs of opposites.
        </h5>

        {/* WORDS */}
        <div
          className="
          grid
          grid-cols-8
          gap-y-3
          mb-15
          px-6
          text-center
        "
        >
          {words.map((word, index) => (
            <span key={index}>{word}</span>
          ))}
        </div>

        {/* QUESTIONS */}
        <div
          className="
              relative
              grid
              grid-cols-2
              gap-x-20
              gap-y-15
              px-4
            "
        >
          <div
            className="
              absolute
              left-1/2
              top-0
              -translate-x-1/2
              w-0.5
              h-full
              bg-black
            "
          />
          {pairs.map((pair, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="font-bold w-5">{i + 1}</span>

              {inputField(i, 0)}

              {inputField(i, 1)}
            </div>
          ))}
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

export default WB_Unit3_Page17_Q1;
