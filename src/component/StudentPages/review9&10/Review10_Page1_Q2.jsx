import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

import trueImg from "../../../assets/imgs/true.svg";
import flaseImg from "../../../assets/imgs/false.svg";

const Review10_Page1_Q2 = () => {
  const questions = [
    {
      phrase: "It’s your twist.",
      mark: "false",
      correction: "It’s your turn.",
    },
    {
      phrase: "a long wait to go",
      mark: "false",
      correction: "a long way to go",
    },
    {
      phrase: "huh?",
      mark: "true",
      correction: "",
    },
    {
      phrase: "That’s a bad point!",
      mark: "false",
      correction: "That’s a good point!",
    },
  ];

  const [marks, setMarks] = useState(["", "", "", ""]);

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleMark = (i, value) => {
    if (locked || result[i]?.row === true) return;

    const updatedMarks = [...marks];
    updatedMarks[i] = value;
    setMarks(updatedMarks);

    if (value === "true") {
      const updatedAnswers = [...answers];
      updatedAnswers[i] = "";
      setAnswers(updatedAnswers);
    }

    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  const handleChange = (i, value) => {
    if (locked || result[i]?.row === true || marks[i] === "true") return;

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

    const hasEmptyMark = marks.some((m) => !m);

    const hasEmptyCorrection = marks.some(
      (m, i) => m === "false" && !answers[i].trim(),
    );

    if (hasEmptyMark || hasEmptyCorrection) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = questions.map((q, i) => {
      const markOk = marks[i] === q.mark;

      const correctionOk =
        q.mark === "true"
          ? true
          : marks[i] === "true"
            ? false
            : normalize(answers[i]) === normalize(q.correction);

      const rowOk = markOk && correctionOk;

      if (rowOk) correctCount++;

      return {
        mark: markOk,
        correction: correctionOk,
        row: rowOk,
      };
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
    setMarks(["false", "false", "true", "false"]);

    setAnswers([
      "It’s your turn.",
      "a long way to go",
      "",
      "That’s a good point!",
    ]);

    setResult([
      { mark: true, correction: true, row: true },
      { mark: true, correction: true, row: true },
      { mark: true, correction: true, row: true },
      { mark: true, correction: true, row: true },
    ]);

    setLocked(true);
  };

  const handleReset = () => {
    setMarks(["", "", "", ""]);

    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const errorBadge = () => (
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
  );

  const markBox = (i, value, img) => (
    <button
      type="button"
      disabled={locked || result[i]?.row === true}
      onClick={() => handleMark(i, value)}
      className="flex items-center justify-center"
      style={{
        width: "34px",
        height: "34px",
        border: "2px solid #6D2980",
        borderRadius: "6px",
        background: "transparent",
        cursor: locked || result[i]?.row === true ? "default" : "pointer",
      }}
    >
      {marks[i] === value && (
        <img
          src={img}
          alt={value}
          style={{
            width: "24px",
            height: "24px",
          }}
        />
      )}
    </button>
  );

  const inputField = (i, width) => (
    <span className="relative inline-block">
      <input
        type="text"
        value={answers[i]}
        disabled={locked || result[i]?.row === true || marks[i] === "true"}
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

         ${
           marks[i] === "false" && result[i]?.correction === false
             ? "border-[#D1232A]"
             : "border-black"
         }
        `}
      />
      {marks[i] === "false" &&
        result[i]?.correction === false &&
        errorBadge()}{" "}
    </span>
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall ">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-25">
          <span
            style={{
              marginRight: "10px",
            }}
          >
            B
          </span>
          Write a <span className="text-[#D1232A] font-bold">✓</span> or{" "}
          <span className="text-[#D1232A] font-bold">✗</span> to show if the
          phrase is correct or not. Correct the{" "}
          <span className="text-[#D1232A] font-bold">✗</span> phrases.
        </h5>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-15 text-[18px]">
          {questions.map((q, i) => (
            <div
              key={i}
              className="grid grid-cols-[120px_30px_210px_360px] items-center gap-x-6"
            >
              <div className="relative flex items-center justify-center gap-3 border-b border-black pb-2">
                {markBox(i, "true", trueImg)}
                {markBox(i, "false", flaseImg)}

                {result[i]?.mark === false && errorBadge()}
              </div>

              <span className="font-bold">{i + 1}</span>

              <span>{q.phrase}</span>

              {inputField(i, "w-[360px]")}
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

export default Review10_Page1_Q2;
