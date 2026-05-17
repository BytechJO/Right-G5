import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

import trueImg from "../../../assets/imgs/true.svg";
import flaseImg from "../../../assets/imgs/false.svg";

const Review10_Page2_Q2 = () => {
  const questions = [
    {
      question: "Was Larry playing the piano?",
      answer: "Yes, he was.",
    },
    {
      question: "Was Elaine listening to the music?",
      answer: "No, she wasn’t.",
    },
    {
      question: "Was Diane beating the drums?",
      answer: "No, she wasn’t.",
    },
    {
      question: "Were Ben and Jake taking tickets?",
      answer: "Yes, they were.",
    },
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
      const qIndex = Math.floor(i / 2);

      const expected =
        i % 2 === 0 ? questions[qIndex].question : questions[qIndex].answer;

      const ok = normalize(a) === normalize(expected);

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
    setAnswers([
      "Was Larry playing the piano?",
      "Yes, he was.",

      "Was Elaine listening to the music?",
      "No, she wasn’t.",

      "Was Diane beating the drums?",
      "No, she wasn’t.",

      "Were Ben and Jake taking tickets?",
      "Yes, they were.",
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
    <span className={`relative inline-block ${width}`}>
      <input
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          w-full
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

  const answerIcon = (answer) => (
    <img
      src={answer ? trueImg : flaseImg}
      alt="icon"
      style={{
        width: "26px",
        height: "26px",
      }}
    />
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div
        className="div-forall"
        style={{
          minHeight: "59vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* TITLE */}
        <h5 className="header-title-page8 mb-30">
          <span
            style={{
              marginRight: "10px",
            }}
          >
            E
          </span>
          Use the sentences from Exercise D to ask and answer a question. (Use
          short answers.)
        </h5>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-15 text-[18px]">
          {/* 1 */}
          <div className="grid grid-cols-[30px_1fr_40px_250px] items-center gap-x-5 w-[850px]">
            <span className="font-bold">1</span>

            <div className="flex-1">{inputField(0, "w-full")}</div>

            {answerIcon(true)}

            <div className="w-[210px]">{inputField(1, "w-full")}</div>
          </div>

          {/* 2 */}
          <div className="grid grid-cols-[30px_1fr_40px_250px] items-center gap-x-5 w-[850px]">
            <span className="font-bold">2</span>

            <div className="flex items-center gap-2">
              <span>Was Elaine</span>

              <div className="flex-1">{inputField(2, "w-full")}</div>

              <span>?</span>
            </div>

            {answerIcon(false)}

            <div className="w-[210px]">{inputField(3, "w-full")}</div>
          </div>

          {/* 3 */}
          <div className="grid grid-cols-[30px_1fr_40px_250px] items-center gap-x-5 w-[850px]">
            <span className="font-bold">3</span>

            <div className="flex-1">{inputField(4, "w-full")}</div>

            {answerIcon(false)}

            <div className="w-[210px]">{inputField(5, "w-full")}</div>
          </div>

          {/* 4 */}
          <div className="grid grid-cols-[30px_1fr_40px_250px] items-center gap-x-5 w-[850px]">
            <span className="font-bold">4</span>

            <div className="flex items-center gap-2">
              <span>Were</span>

              <div className="flex-1">{inputField(6, "w-full")}</div>

              <span>?</span>
            </div>

            {answerIcon(true)}

            <div className="w-[210px]">{inputField(7, "w-full")}</div>
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

export default Review10_Page2_Q2;
