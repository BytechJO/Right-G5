import React, { useState } from "react";

import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 73/SVG/Asset 22.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 73/SVG/Asset 24.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 73/SVG/Asset 25.svg";

import ValidationAlert from "../../Popup/ValidationAlert";

const Review8_Page2_Q1 = () => {
  const questions = [
    "Did anyone see a rainbow?",
    "Yes, someone saw a rainbow.",
    "Did anyone fly in a hot air balloon?",
    "Yes, someone flew in the hot air balloon.",
    "Did anybody wear winter clothing?",
    "No, nobody wore winter clothing.",
  ];

  const [answers, setAnswers] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

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
      "Did anyone see a rainbow?",
      "Yes, someone saw a rainbow.",
      "Did anyone fly in a hot air balloon?",
      "Yes, someone flew in the hot air balloon.",
      "Did anybody wear winter clothing?",
      "No, nobody wore winter clothing.",
    ]);

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", "", ""]);

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
        <h5 className="header-title-page8 mb-15">
          <span
            style={{
              marginRight: "10px",
            }}
          >
            D
          </span>
          Look at the picture, and then write a question and answer for each
          picture.
        </h5>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-10">
          {/* 1 */}
          <div className="flex items-start gap-6">
            <span className="font-bold text-[18px] ">1</span>

            <div className="relative">
              <img
                src={img1}
                alt=""
                style={{
                  width: "170px",
                  height: "110px",
                }}
              />
            </div>
            <div className="flex flex-col gap-8 mt-3">
              {sentenceInput(0, "w-[600px]")}

              {sentenceInput(1, "w-[600px]")}
            </div>
          </div>

          {/* 2 */}
          <div className="flex items-start gap-6">
            <span className="font-bold text-[18px] ">2</span>

            <div className="relative">
              <img
                src={img2}
                alt=""
                style={{
                  width: "170px",
                  height: "110px",
                }}
              />
            </div>

            <div className="flex flex-col gap-8 mt-3">
              {sentenceInput(2, "w-[600px]")}

              {sentenceInput(3, "w-[600px]")}
            </div>
          </div>

          {/* 3 */}
          <div className="flex items-start gap-6">
            <span className="font-bold text-[18px] ">3</span>

            <div className="relative">
              <img
                src={img3}
                alt=""
                style={{
                  width: "170px",
                  height: "110px",
                }}
              />
            </div>

            <div className="flex flex-col gap-8 mt-3">
              {sentenceInput(4, "w-[600px]")}

              {sentenceInput(5, "w-[600px]")}
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

export default Review8_Page2_Q1;