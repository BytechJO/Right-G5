import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import img from "../../../assets/imgs/pages/workbook/Right Int WB G5 U2/Page 10/Asset 7.svg";
const WB_Unit2_Page10_Q1 = () => {
  const questions = [
    "carnival",
    "Let's see",
    "Not so fast",
    "trims",
    "couple",
    "few",
    "twisty",
    "merry-go-round",
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
      "carnival",
      "Let's see",
      "Not so fast",
      "trims",
      "couple",
      "few",
      "twisty",
      "merry-go-round",
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
    <div className="relative inline-block">
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
    </div>
  );

  const wordBox = (word) => (
    <div
      style={{
        border: "2px solid #7D3C98",
        borderRadius: "12px",
        padding: "8px 22px",
        fontSize: "17px",
        minWidth: "150px",
        textAlign: "center",
      }}
    >
      {word}
    </div>
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall ">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-8">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            C
          </span>
          Read and write.
        </h5>

        {/* WORD BOXES */}
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          {wordBox("merry-go-round")}
          {wordBox("carnival")}
          {wordBox("Let’s see")}
          {wordBox("few")}
          {wordBox("couple")}
          {wordBox("Not so fast")}
          {wordBox("twisty")}
          {wordBox("trims")}
        </div>

        {/* DIALOG */}
        <div className="relative text-[17px] mb-15">
          {/* JACK */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-bold">Jack:</span>

            <span>Dad, can we go to the</span>

            {inputField(0, "w-[170px]")}

            <span>? I want to play on the rides there.</span>
          </div>

          {/* DAD */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-bold">Dad:</span>

            <span>Hmmm.</span>

            {inputField(1, "w-[150px]")}

            <span>. Okay.</span>
          </div>

          {/* JACK */}
          <div className="mb-5">
            <span className="font-bold">Jack:</span> Great! Let’s go.
          </div>

          {/* DAD */}
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-bold">Dad:</span>

            {inputField(2, "w-[170px]")}

            <span>, son. I am the one who to</span>

            {inputField(3, "w-[140px]")}
          </div>

          <div className="flex flex-wrap items-center gap-2 ml-[52px] mb-5">
            <span>Don’t worry. There are only a</span>

            {inputField(4, "w-[130px]")}

            <span>of trees.</span>
          </div>

          {/* JACK */}
          <div className="mb-3">
            <span className="font-bold">Jack:</span> How long will it take you?
          </div>

          {/* DAD */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="font-bold">Dad:</span>

            <span>I’m not sure. It may be a</span>

            {inputField(5, "w-[120px]")}

            <span>minutes.</span>
          </div>

          {/* JACK */}
          <div className="mb-3">
            <span className="font-bold">Jack:</span> How many minutes will it
            take you exactly?
          </div>

          {/* DAD */}
          <div className="mb-5">
            <span className="font-bold">Dad:</span> Well, it may be 30 minutes.
          </div>

          {/* JACK */}
          <div className="mb-3">
            <span className="font-bold">Jack:</span> I don’t like to wait a long
            time. I’ll get bored.
          </div>

          {/* DAD */}
          <div className="mb-5">
            <span className="font-bold">Dad:</span> That’s not a long time!
          </div>

          {/* JACK */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-bold">Jack:</span>

            <span>I’m going to go on all the</span>

            {inputField(6, "w-[140px]")}

            <span>rides!</span>
          </div>

          {/* DAD + IMAGE */}
          <div className="flex justify-between items-end gap-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold">Dad:</span>

              <span>Not me! I will settle for the simple rides, like the</span>

              {inputField(7, "w-[220px]")}

              <span>.</span>
            </div>
          </div>
          <img
            src={img}
            alt="dad-jack"
            style={{
              position: "absolute",
              width: "300px",
              height: "auto",
              objectFit: "contain",
              top:"50%",
              right:"0%"
            }}
          />
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

export default WB_Unit2_Page10_Q1;
