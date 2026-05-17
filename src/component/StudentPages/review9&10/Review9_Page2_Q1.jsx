import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Review9_Page2_Q1 = () => {
  const questions = [
    "3",
    "1",
    "2",
    "4",
    "If we go to the stadium tomorrow, maybe we can sit in the front row to watch the game.",
    "If Alex calls before dinnertime, I’ll ask him to come over for dinner.",
    "If it rains tomorrow, we won’t have to water the plants.",
    "When school finishes early on Thursday, we could go bike riding in the afternoon.",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", "", "", ""]);

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
      "3",
      "1",
      "2",
      "4",
      "If we go to the stadium tomorrow, maybe we can sit in the front row to watch the game.",
      "If Alex calls before dinnertime, I’ll ask him to come over for dinner.",
      "If it rains tomorrow, we won’t have to water the plants.",
      "When school finishes early on Thursday, we could go bike riding in the afternoon.",
    ]);

    setResult([true, true, true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width) => (
    <span className="relative inline-block">
      <input
        type="text"
        value={answers[i]}
        maxLength={i < 4 ? 1 : undefined}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
  ${width}

   ${
     i < 4
       ? "border border-[#3A3A3A] rounded-md h-[34px] text-center"
       : "border-0 border-b border-black"
   }

  outline-none
  bg-transparent
  text-[18px]
  text-[#6D2980]
  font-semibold
  px-1

  ${result[i] === false ? "border-[#D1232A]" : ""}
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
            D
          </span>
          Match the two sentence parts, and then write the whole sentence below.
        </h5>

        {/* QUESTIONS */}
        <div className="text-[18px]">
          <div className="grid grid-cols-[360px_40px_360px] gap-x-10 gap-y-6 items-center mb-10">
            <div className="flex gap-4">
              <span className="font-bold">1</span>
              <span>If we go to the stadium tomorrow,</span>
            </div>

            {inputField(0, "w-[40px] text-center")}

            <span>we won’t have to water the plants.</span>

            <div className="flex gap-4">
              <span className="font-bold">2</span>
              <span>If Alex calls before dinnertime,</span>
            </div>

            {inputField(1, "w-[40px] text-center")}

            <span>maybe we can sit in the front row to watch the game.</span>

            <div className="flex gap-4">
              <span className="font-bold">3</span>
              <span>If it rains tomorrow,</span>
            </div>

            {inputField(2, "w-[40px] text-center")}

            <span>I’ll ask him to come over for dinner.</span>

            <div className="flex gap-4">
              <span className="font-bold">4</span>
              <span>When school finishes early on Thursday,</span>
            </div>

            {inputField(3, "w-[40px] text-center")}

            <span>we could go bike riding in the afternoon.</span>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-5">
              <span className="font-bold">1</span>
              {inputField(4, "w-[890px]")}
            </div>

            <div className="flex items-center gap-5">
              <span className="font-bold">2</span>
              {inputField(5, "w-[890px]")}
            </div>

            <div className="flex items-center gap-5">
              <span className="font-bold">3</span>
              {inputField(6, "w-[890px]")}
            </div>

            <div className="flex items-center gap-5">
              <span className="font-bold">4</span>
              {inputField(7, "w-[890px]")}
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

export default Review9_Page2_Q1;
