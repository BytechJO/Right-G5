import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Review5_Page2_Q3 = () => {
  const answersKey = [
    "would",
    "would",
    "would",
    "I'd prefer to",
    "Could",
    "could",
    "Could",
    "could",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,]/g, "")
      .replace(/[’']/g, "'")
      .replace(/\s+/g, " ")
      .trim();

  const handleChange = (i, val) => {
    if (locked || result[i] === true) return;

    const updated = [...answers];

    updated[i] = val;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all blanks.");

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((a, i) => {
      const ok = normalize(a) === normalize(answersKey[i]);

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = answers.length;

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
    setAnswers(answersKey);

    setResult([true, true, true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const renderInput = (index) => (
    <span className="relative inline-block">
      <input
        type="text"
        value={answers[index]}
        disabled={locked || result[index] === true}
        onChange={(e) => handleChange(index, e.target.value)}
        style={{
          width: "140px",
          border: "none",
          borderBottom:
            result[index] === false ? "1px solid #D1232A" : "1px solid black",
          outline: "none",
          background: "transparent",
          fontSize: "18px",
          fontWeight: "600",
          color: "#6D2980",
          padding: "0",
          lineHeight: "1",
        }}
      />

      {result[index] === false && (
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
            fontSize: "12px",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
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
        <h5 className="header-title-page8 mb-17">
          <span
            style={{
              marginRight: "10px",
            }}
          >
            F
          </span>
          Complete the poem. Use the words from the box. Some words can be used
          more than once.
        </h5>

        {/* WORD BOX */}
        <div
          style={{
            width: "420px",
            height: "52px",
            background: "#E9E1EC",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            margin: "0 auto 35px auto",
            fontSize: "22px",
            fontWeight: "500",
          }}
        >
          <span>could</span>

          <span>would</span>

          <span>I’d prefer to</span>
        </div>

        {/* POEM */}
        <div
          className="
            text-[20px]
            leading-[2.8]
          "
        >
          <div className="flex flex-wrap items-center gap-2">
            {renderInput(0)}

            <span>you like to go to the zoo? Yes, I</span>

            {renderInput(1)}

            <span>. Yes, I</span>

            {renderInput(2)}

            <span>.</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {renderInput(3, "180px")}

            <span>go to the concert. Let’s go, you and I.</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {renderInput(4)}

            <span>we sing a song? Yes, we</span>

            {renderInput(5)}

            <span>. Yes, we could.</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {renderInput(6)}

            <span>we bake a cake? Yes, we</span>

            {renderInput(7)}.Yes, we could.

            <span> Come on! Let’s go, you and I!</span>
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

export default Review5_Page2_Q3;
