import React, { useState, useRef } from "react";

import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 9 What If Folder/Page 81/SVG/Asset 17.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 9 What If Folder/Page 81/SVG/Asset 8.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 9 What If Folder/Page 81/SVG/Asset 18.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 9 What If Folder/Page 81/SVG/Asset 10.svg";

import ValidationAlert from "../../Popup/ValidationAlert";

const Unit9_Page6_Q2 = () => {
  const questions = [
    "If it snows, we’ll have a snowball fight.",
    "If she reads the book, she’ll get an A on her paper.",
    "When Helen calls her friend, they will be able to play together.",
    "If the man fixes the tire on his bike, he will be able to ride the bike.",
  ];

  const [answers, setAnswers] = useState([
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
  ]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const inputRefs = useRef([]);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleChange = (qIndex, lineIndex, value) => {
    if (locked || result[qIndex] === true) return;

    const updated = [...answers];

    updated[qIndex][lineIndex] = value;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[qIndex] = undefined;

      return copy;
    });

    // ينزل تلقائي للسطر الثاني
    if (lineIndex === 0 && value.length >= 35) {
      inputRefs.current[qIndex]?.focus();
    }
  };

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = answers.some((group) =>
      group.every((line) => !line.trim()),
    );

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((group, i) => {
      // اعتبر الانبوتين كأنهم input واحد
      const combined = `${group[0]} ${group[1]}`;

      const ok = normalize(combined) === normalize(questions[i]);

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
      ["If it snows,", "we’ll have a snowball fight."],
      ["If she reads the book,", "she’ll get an A on her paper."],
      ["When Helen calls her friend,", "they will be able to play together."],
      [
        "If the man fixes the tire on his bike,",
        "he will be able to ride the bike.",
      ],
    ]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers([
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
    ]);

    setResult([]);

    setLocked(false);
  };

  const lineInput = (qIndex, lineIndex, width) => (
    <span className="relative inline-block">
      <input
        ref={lineIndex === 1 ? (el) => (inputRefs.current[qIndex] = el) : null}
        type="text"
        value={answers[qIndex][lineIndex]}
        disabled={locked || result[qIndex] === true}
        onChange={(e) => handleChange(qIndex, lineIndex, e.target.value)}
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

          ${result[qIndex] === false ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {lineIndex === 1 && result[qIndex] === false && (
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
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            E
          </span>
          Look at each pair of pictures, and then write a sentence about them.
        </h5>

        {/* TOP ROW */}
        <div className="flex gap-20 mb-12">
          {/* IMAGE 1 */}
          <div>
            <img
              src={img1}
              alt=""
              style={{
                width: "300px",
                height: "auto",
              }}
            />

            <div className="mt-5 flex items-start gap-4">
              <span className="font-bold text-[18px]">1</span>

              <div className="flex flex-col gap-4">
                {lineInput(0, 0, "w-[320px]")}

                {lineInput(0, 1, "w-[320px]")}
              </div>
            </div>
          </div>

          {/* IMAGE 2 */}
          <div>
            <img
              src={img2}
              alt=""
              style={{
                width: "300px",
                height: "auto",
              }}
            />

            <div className="mt-5 flex items-start gap-4">
              <span className="font-bold text-[18px]">2</span>

              <div className="flex flex-col gap-4">
                {lineInput(1, 0, "w-[320px]")}

                {lineInput(1, 1, "w-[320px]")}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="flex gap-20 mb-10">
          {/* IMAGE 3 */}
          <div>
            <img
              src={img3}
              alt=""
              style={{
                width: "300px",
                height: "auto",
              }}
            />

            <div className="mt-5 flex items-start gap-4">
              <span className="font-bold text-[18px]">3</span>

              <div className="flex flex-col gap-4">
                {lineInput(2, 0, "w-[320px]")}

                {lineInput(2, 1, "w-[320px]")}
              </div>
            </div>
          </div>

          {/* IMAGE 4 */}
          <div>
            <img
              src={img4}
              alt=""
              style={{
                width: "300px",
                height: "auto",
              }}
            />

            <div className="mt-5 flex items-start gap-4">
              <span className="font-bold text-[18px]">4</span>

              <div className="flex flex-col gap-4">
                {lineInput(3, 0, "w-[320px]")}

                {lineInput(3, 1, "w-[320px]")}
              </div>
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

export default Unit9_Page6_Q2;
