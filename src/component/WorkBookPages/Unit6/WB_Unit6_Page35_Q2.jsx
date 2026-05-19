import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGES
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 35/Asset 11.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 35/Asset 29.svg";

const WB_Unit6_Page35_Q2 = () => {
  const answers = ["action figure", "made it"];

  const questions = [
    {
      before: "Look at my new",

      after: ". My dad bought it for me.",

      image: img1,
    },

    {
      before: "Wow! We",

      after: "! Our team won!",

      image: img2,
    },
  ];

  const [studentAnswers, setStudentAnswers] = useState(["", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  // ------------------------
  // HANDLE INPUT
  // ------------------------

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...studentAnswers];

    updated[i] = value;

    setStudentAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = studentAnswers.some((a) => !a.trim());

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = studentAnswers.map((answer, i) => {
      const ok = normalize(answer) === normalize(answers[i]);

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

  // ------------------------
  // SHOW ANSWERS
  // ------------------------

  const showAnswers = () => {
    setStudentAnswers(answers);

    setResult([true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    setStudentAnswers(["", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i, width) => (
    <div className="relative inline-block">
      <input
        type="text"
        value={studentAnswers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          border-0
          border-b
          outline-none
          bg-transparent
          text-[20px]
          text-[#6D2980]
          font-semibold
          px-1

          ${result[i] === false ? "border-[#D1232A]" : "border-black"}
        `}
        style={{
          width,
        }}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            width: "18px",
            height: "18px",
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
      <div className="div-forall text-[20px]">
        {/* TITLE */}

        <h5 className="header-title-page8 mb-[12vh]">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            G
          </span>
          Look, read, and write.
        </h5>

        {/* QUESTION 1 */}

        <div className="flex justify-between items-center mb-20">
          {" "}
          <div className="flex items-start gap-4">
            <span className="font-bold">1</span>

            <div className="flex items-center flex-wrap gap-2">
              <span>{questions[0].before}</span>

              {inputField(0, "170px")}

              <span>{questions[0].after}</span>
            </div>
          </div>
          {/* IMAGE */}
          <img
            src={questions[0].image}
            alt=""
            style={{
              width: "200px",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>

        {/* QUESTION 2 */}

        <div className="flex justify-between items-center mb-20">
          {" "}
          <div className="flex items-start gap-4">
            <span className="font-bold">2</span>

            <div className="flex items-center flex-wrap gap-2">
              <span>{questions[1].before}</span>

              {inputField(1, "180px")}

              <span>{questions[1].after}</span>
            </div>
          </div>
          {/* IMAGE */}
          <img
            src={questions[1].image}
            alt=""
            style={{
              width: "200px",
              height: "auto",
              objectFit: "contain",
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

export default WB_Unit6_Page35_Q2;
