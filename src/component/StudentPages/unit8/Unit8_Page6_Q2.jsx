import React, { useState } from "react";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 69/SVG/Asset 35.svg";

import ValidationAlert from "../../Popup/ValidationAlert";

const Unit8_Page6_Q2 = () => {
  const questions = ["T", "F", "F", "T", "T", "T"];

  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) => str.toLowerCase().replace(/\s+/g, " ").trim();

  const handleSelect = (i, value) => {
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
    setAnswers(["T", "F", "F", "T", "T", "T"]);

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const tfInput = (i) => (
    <span className="relative inline-block">
      <input
        type="text"
        maxLength={1}
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleSelect(i, e.target.value.toUpperCase())}
        className={`
          w-[38px]
          h-[38px]
          text-center
          rounded-xl
          outline-none
          bg-transparent
          text-[18px]
          font-semibold
          uppercase
          border-2

          ${
            result[i] === false
              ? "border-[#D1232A] text-[#1DA1F2]"
              : "border-[#6D2980] text-[#1DA1F2]"
          }
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
        <h5 className="header-title-page8 mb-5">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            D
          </span>
          Use the pictures to answer the questions below.
        </h5>

        {/* PARAGRAPH */}
        <div className="text-[18px] leading-normal mb-6 w-[900px]">
          Mindy had a party and invited some of her friends and family. She gave
          everyone who came some food and gifts. Look at each person’s place at
          the table, and then answer the statements
          <span className="text-[#1DA1F2]"> T </span>(
          <span className="text-[#1DA1F2]">true</span>) or
          <span className="text-[#1DA1F2]"> F </span>(
          <span className="text-[#1DA1F2]">false</span>).
        </div>

        {/* IMAGE */}
        <img
          src={img}
          alt=""
          style={{
            width: "850px",
            height: "auto",
            marginBottom: "35px",
          }}
        />

        {/* QUESTIONS */}
        <div className="grid grid-cols-2 gap-y-8 gap-x-24 text-[18px] mb-15">
          <div className="flex items-center gap-4">
            <span className="font-bold">1</span>

            {tfInput(0)}

            <span>Everyone had a colorful ball.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-bold">2</span>

            {tfInput(1)}

            <span>Nobody had a yo-yo.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-bold">3</span>

            {tfInput(2)}

            <span>No one had cake.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-bold">4</span>

            {tfInput(3)}

            <span>Someone had cake.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-bold">5</span>

            {tfInput(4)}

            <span>Somebody had a pencil.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-bold">6</span>

            {tfInput(5)}

            <span>Everybody had ice cream.</span>
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

export default Unit8_Page6_Q2;
