import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Review7_Page1_Q1 = () => {
  const wordBank = [
    "limping",
    "stiff",
    "oddly",
    "albums",
    "super",
    "treasure",
    "miss",
    "orphanage",
    "jotting down",
  ];

  const questions = [
    "albums",
    "orphanage",
    "oddly",
    "treasure",
    "miss",
    "jotting down",
    "super",
    "limping",
    "stiff",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,]/g, "")
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

    if (answers.some((a) => !a.trim())) {
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
      "albums",
      "orphanage",
      "oddly",
      "treasure",
      "miss",
      "jotting down",
      "super",
      "limping",
      "stiff",
    ]);

    setResult([true, true, true, true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", "", "", "", "", ""]);

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
          leading-none
          align-middle
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
        <h5 className="header-title-page8 mb-8">
          <span
            style={{
              marginRight: "10px",
            }}
          >
            A
          </span>
          Using the words in the box, finish the story.
        </h5>

        {/* WORD BOX */}
        <div
          style={{
            width: "760px",
            background: "#E9E1EC",
            borderRadius: "14px",
            padding: "16px 30px",
            display: "grid",
            gridTemplateColumns: "repeat(5,1fr)",
            rowGap: "10px",
            margin: "0 auto 35px auto",
            fontSize: "17px",
          }}
        >
          {wordBank.map((word, i) => {
            return <span key={i}>{word}</span>;
          })}
        </div>

        {/* STORY */}
        <div className="text-[17px] leading-[2.5] mb-10">
          {/* Paragraph 1 */}
          <p className="mb-5">
            Today, as my sister and I were looking through some photo{" "}
            {inputField(0, "w-[180px]")}, a worker from the local{" "}
            {inputField(1, "w-[190px]")} came to our door. He looked at us{" "}
            {inputField(2, "w-[170px]")} because he wasn’t sure how to begin,
            and then he told us why he had come by.
          </p>

          {/* Paragraph 2 */}
          <p className="mb-5">
            He wanted to know if we knew of anyone who was missing a small{" "}
            {inputField(3, "w-[180px]")} box full of gold coins. Some workers at
            the orphanage had found one sitting outside the back door last week,
            and they brought it into the house. They thought someone might{" "}
            {inputField(4, "w-[180px]")} it and then come looking for it, so
            they put it in a safe place, {inputField(5, "w-[220px]")} the amount
            that was found inside it. It had been more than a week, though, and
            there was no sign of anyone, except for an ice cream man selling
            some {inputField(6, "w-[170px]")} ice cream because it was the best
            they had ever tasted.
          </p>

          {/* Paragraph 3 */}
          <p>
            Anyway, now the workers are starting to wonder if maybe this was a
            donation. As the older man walked away, {inputField(7, "w-[180px]")}{" "}
            and {inputField(8, "w-[160px]")}, I thought to myself that I hoped
            the treasure box really was a donation and that the orphanage could
            keep the money.
          </p>
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

export default Review7_Page1_Q1;
