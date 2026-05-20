import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGES
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U8/Page 45/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U8/Page 45/Asset 14.svg";
import img3 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U8/Page 45/Asset 16.svg";
import img4 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U8/Page 45/Asset 4.svg";

const WB_Unit8_Page45_Q2 = () => {
  const questions = [
    {
      image: img1,

      sentence: "I’m up so high. I feel like I’m at the",

      answer: "top of the world",
    },

    {
      image: img2,

      sentence: "Let’s play some",

      answer: "board game",
    },

    {
      image: img3,

      sentence: "The __________ crosses the street.",

      answer: "pedestrian",
    },

    {
      image: img4,

      sentence: "The __________ is so colorful.",

      answer: "rainbow",
    },
  ];

  const [studentAnswers, setStudentAnswers] = useState(["", "", "", ""]);

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
      const ok = normalize(answer) === normalize(questions[i].answer);

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

  // ------------------------
  // SHOW ANSWERS
  // ------------------------

  const showAnswers = () => {
    setStudentAnswers(questions.map((q) => q.answer));

    setResult([true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    setStudentAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i, width = "220px") => (
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
          text-[18px]
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

        <h5 className="header-title-page8 mb-10">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            B
          </span>
          Look, read, and write.
        </h5>

        {/* QUESTIONS */}

        <div className="grid grid-cols-2 gap-y-12 gap-x-16">
          {questions.map((q, index) => (
            <div key={index}>
              {/* TOP */}

              <div className="flex items-start gap-3 mb-4">
                <span className="font-bold">{index + 1}</span>

                <img
                  src={q.image}
                  alt=""
                  style={{
                    width: "220px",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* SENTENCE */}

              <div className="leading-loose pl-7">
                {q.sentence.includes("__________") ? (
                  <>
                    {q.sentence.split("__________")[0]}

                    {inputField(index)}

                    {q.sentence.split("__________")[1]}
                  </>
                ) : (
                  <>
                     {q.sentence} {inputField(index)} {index === 0 ? "!" : "."}
                  </>
                )}
              </div>
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

export default WB_Unit8_Page45_Q2;
