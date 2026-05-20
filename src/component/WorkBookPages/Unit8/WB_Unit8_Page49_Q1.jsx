import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGES
// IMAGE
import mainImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U8/Page 49/Asset 18.svg";
const WB_Unit8_Page49_Q1 = () => {
  const questions = [
    {
      sentence: "No one brought chips.",

      correct: "false",
    },

    {
      sentence: "Nobody brought cake.",

      correct: "false",
    },

    {
      sentence: "Everyone brought water.",

      correct: "true",
    },

    {
      sentence: "Someone brought sandwiches.",

      correct: "false",
    },

    {
      sentence: "Someone brought cookies.",

      correct: "true",
    },

    {
      sentence: "Everybody brought hot dogs.",

      correct: "true",
    },
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
      const ok = normalize(answer) === normalize(questions[i].correct);

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
    setStudentAnswers(questions.map((q) => q.correct));

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
    <div className="relative inline-block">
      <input
        type="text"
        value={studentAnswers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          w-[70px]
          border
          outline-none
          bg-transparent
          text-[18px]
          text-center
          text-[#6D2980]
          font-semibold
          rounded-lg
          px-1
          py-1

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

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <h5 className="header-title-page8 mb-6 leading-[1.4]">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            J
          </span>
          Look, read, and write <span className="text-[#00AEEF]">true</span>or
          <span className="text-[#00AEEF]">false</span>.
        </h5>

        {/* TOP TEXT */}

        <div className=" leading-normal">
          Helen and her friends went on a field trip. Everyone packed their
          backpack for the trip.
        </div>

        {/* IMAGE BOX */}
        <div
          style={{
            overflow: "hidden",
          }}
          className="mb-10"
        >
          <img
            src={mainImg}
            alt=""
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>

        {/* QUESTIONS */}

        <div className="grid grid-cols-2 gap-y-6 gap-x-10 mb-10">
          {questions.map((q, index) => (
            <div key={index} className="flex items-center gap-3">
              {inputField(index)}

              <span className="font-bold">{index + 1}</span>

              <span>{q.sentence}</span>
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

export default WB_Unit8_Page49_Q1;
