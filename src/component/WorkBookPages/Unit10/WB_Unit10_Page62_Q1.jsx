import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGES
import musicImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U10/Page 62/Asset 10.svg";
import violinImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U10/Page 62/Asset 9.svg";

const WB_Unit10_Page62_Q1 = () => {
  const wordBank = [
    "variety",
    "instruments",
    "lively",
    "symphony",
    "moods",
    "composers",
  ];

  const answers = [
    "symphony",
    "lively",
    "instruments",
    "variety",
    "composers",
    "moods",
  ];

  const [studentAnswers, setStudentAnswers] = useState([
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
      .replace(/[-.?!,’']/g, "")
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

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    setStudentAnswers(["", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i) => (
    <div className="relative inline-flex flex-1">
      <input
        type="text"
        value={studentAnswers[i]}
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
            top: "2px",
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

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <h5 className="header-title-page8 mb-[5vh]">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            L
          </span>
          Read and write.
        </h5>

        {/* CONTENT */}

        <div className="flex gap-8 items-start">
          {/* LEFT */}

          <div className="flex-1 leading-[2.5]">
            {/* LINE 1 */}

            <div className="flex items-center gap-2">
              <span>We love hearing the musicians play a sweet</span>

              {inputField(0)}

              <span>.</span>
            </div>

            {/* LINE 2 */}

            <div className="flex items-center gap-2">
              <span>It sounds so</span>

              {inputField(1)}

              <span>and fills our hearts with glee.</span>
            </div>

            {/* LINE 3 */}

            <div>We love seeing the violin, the harp, and the piano,</div>

            {/* LINE 4 */}

            <div className="flex items-center gap-2">
              <span>And all the other</span>

              {inputField(2)}

              <span>in the music show.</span>
            </div>

            {/* LINE 5 */}

            <div className="flex items-center gap-2">
              <span>Hearing a</span>

              {inputField(3)}

              <span>of music is just like eating different foods.</span>
            </div>

            {/* LINE 6 */}

            <div className="flex items-center gap-2">
              <span>The</span>

              {inputField(4)}

              <span>write with feelings and set different</span>

              {inputField(5)}

              <span>.</span>
            </div>

            {/* IMAGES */}

            <div className="flex justify-center gap-15 mt-8">
              <img
                src={musicImg}
                alt=""
                style={{
                  width: "250px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />

              <img
                src={violinImg}
                alt=""
                style={{
                  width: "210px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>

          {/* WORD BANK */}

          <div
            style={{
              border: "2px solid #6D2980",

              borderRadius: "10px",

              padding: "18px 24px",

              minWidth: "150px",
            }}
            className="
              flex
              flex-col
              gap-5
              text-[18px]
              mt-2.5
            "
          >
            {wordBank.map((word, index) => (
              <span key={index}>{word}</span>
            ))}
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

export default WB_Unit10_Page62_Q1;
