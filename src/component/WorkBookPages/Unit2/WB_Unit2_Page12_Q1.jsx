import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit2_Page12_Q1 = () => {
  const questions = ["a", "c", "d", "b"];

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const handleSelect = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...answers];

    updated[i] = value.slice(-1);
    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = answers.some((a) => !a);

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((a, i) => {
      const ok = a.toLowerCase() === questions[i].toLowerCase();

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
    setAnswers(["a", "c", "d", "b"]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const selectLetter = (i) => (
    <div className="relative inline-block">
      <input
        type="text"
        maxLength={1}
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleSelect(i, e.target.value.toLowerCase())}
        className={`
        border-0
        border-b
        bg-transparent
        outline-none
        text-[18px]
        text-[#6d2980]
        font-semibold
        w-[55px]
        text-center

        ${result[i] === false ? "border-[#D1232A]" : "border-black"}
      `}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-10px",
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
      <div className="div-forall ">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-[17vh]">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            G
          </span>
          Match.
        </h5>

        <div className="flex justify-between gap-24 text-[18px]">
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-15">
            {/* 1 */}
            <div className="flex items-center gap-4">
              {selectLetter(0)}

              <span className="font-bold">1</span>

              <span>Did the baby play with his toy ...</span>
            </div>

            {/* 2 */}
            <div className="flex items-center gap-4">
              {selectLetter(1)}

              <span className="font-bold">2</span>

              <span>I got an A+, ...</span>
            </div>

            {/* 3 */}
            <div className="flex items-center gap-4">
              {selectLetter(2)}

              <span className="font-bold">3</span>

              <span>My baby brother, ... , is two years old. </span>
            </div>

            {/* 4 */}
            <div className="flex items-center gap-4">
              {selectLetter(3)}

              <span className="font-bold">4</span>

              <span>Penny and Jenny, ... , always dress the same way.</span>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-15 min-w-[320px]">
            <div className="flex gap-4">
              <span className="font-bold">a</span>

              <span>that was in his crib?</span>
            </div>

            <div className="flex gap-4">
              <span className="font-bold">b</span>

              <span>who are twins</span>
            </div>

            <div className="flex gap-4">
              <span className="font-bold">c</span>

              <span>which was the highest grade.</span>
            </div>

            <div className="flex gap-4">
              <span className="font-bold">d</span>

              <span>who is the youngest</span>
            </div>
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

export default WB_Unit2_Page12_Q1;
