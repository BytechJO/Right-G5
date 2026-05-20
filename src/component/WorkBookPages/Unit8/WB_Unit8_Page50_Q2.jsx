import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGE
import balloonImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U8/Page 50/Asset 1 (5).svg";

const WB_Unit8_Page50_Q2 = () => {
  const questions = [
    {
      before: "I love to go on the",

      after: "ride.",

      answer: "hot-air balloon",
    },

    {
      before: "You can",

      after: "the countryside.",

      answer: "fly over",
    },

    {
      before: "I can see the beautiful",

      after: ".",

      answer: "landscape",
    },

    {
      before: "I",

      after: "people crossing streets from up so high.",

      answer: "spot",
    },

    {
      before: "They",

      after: "when you’re in the sky.",

      answer: "look like ants",
    },

    {
      before: "I can’t",

      after: "the people or the land.",

      answer: "recognize",
    },

    {
      before: "They look so",

      after: "and out of hand.",

      answer: "crowded",
    },

    {
      before: "I have no",

      after: "that this is my country.",

      answer: "doubt",
    },
  ];

  const [studentAnswers, setStudentAnswers] = useState([
    "",
    "",
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

    setResult([true, true, true, true, true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    setStudentAnswers(["", "", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i, width = "180px") => (
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

        <h5 className="header-title-page8 mb-[8vh]">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            M
          </span>
          Read and write.
        </h5>

        {/* CONTENT */}

        <div className="flex gap-8 items-start">
          {/* LEFT */}

          <div className="flex-1 flex flex-col gap-6">
            {questions.map((q, index) => (
              <div key={index} className="leading-[2]">
                {q.before} {inputField(index)} {q.after}
              </div>
            ))}
          </div>


          {/* IMAGE */}

          <img
            src={balloonImg}
            alt=""
            style={{
              width: "350px",
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

export default WB_Unit8_Page50_Q2;
