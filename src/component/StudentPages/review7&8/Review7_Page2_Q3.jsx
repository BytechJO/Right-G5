import React, { useState } from "react";

import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 71/SVG/Asset 19.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 71/SVG/Asset 20.svg";

import ValidationAlert from "../../Popup/ValidationAlert";

const Review7_Page2_Q3 = () => {
  const questions = [
    "Is she jogging in the park?",
    "Yes, she is jogging in the park.",
    "Is he playing baseball?",
    "Yes, he is playing baseball.",
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,?]/g, "")
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
      "Is she jogging in the park?",
      "Yes, she is jogging in the park.",
      "Is he playing baseball?",
      "Yes, he is playing baseball.",
    ]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const sentenceInput = (i, width) => (
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
        <h5 className="header-title-page8 mb-20">
          <span
            style={{
              marginRight: "10px",
            }}
          >
            E
          </span>
          Look and write a question and answer that matches each picture.
        </h5>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-20">
          {/* 1 */}
          <div className="flex items-center gap-6">
            <span className="font-bold text-[18px] self-start">1</span>

            <img
              src={img1}
              alt=""
              style={{
                width: "200px",
                height: "auto",
              }}
            />

            <div className="flex flex-col gap-7 mt-2">
              {sentenceInput(0, "w-[620px]")}

              {sentenceInput(1, "w-[620px]")}
            </div>
          </div>

          {/* 2 */}
          <div className="flex items-center gap-6">
            <span className="font-bold text-[18px] self-start">2</span>

            <img
              src={img2}
              alt=""
              style={{
                width: "200px",
                height: "auto",
              }}
            />

            <div className="flex flex-col gap-7 mt-2">
              {sentenceInput(2, "w-[620px]")}

              {sentenceInput(3, "w-[620px]")}
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

export default Review7_Page2_Q3;
