import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGE
import taxiImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U9/Page 52/Asset 2.svg";

const WB_Unit9_Page52_Q2 = () => {
  const questions = [
    "They will take a taxi if they can’t find a bus.",

    "Jack will open the window if he wants fresh air.",

    "When my dad comes home, I will set the dinner table.",

    "If we finish our chores, we could play in the backyard.",

    "If they can’t find a bus, they will take a taxi.",
  ];

  const answers = [
    "If they can’t find a bus, they will take a taxi.",

    "If he wants fresh air, Jack will open the window.",

    "I will set the dinner table when my dad comes home.",

    "We could play in the backyard if we finish our chores.",

    "They will take a taxi if they can’t find a bus.",
  ];

  const [studentAnswers, setStudentAnswers] = useState(["", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[-.?!,’',]/g, "")
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

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    setStudentAnswers(["", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i) => (
    <div className="relative w-full">
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
            D
          </span>
          Read and write each sentence in the opposite way from what is shown.
        </h5>

        {/* CONTENT */}

        <div className="flex flex-col gap-6">
          {/* أول سؤالين مع الصورة */}

          <div className="flex gap-8 items-start">
            {/* LEFT */}

            <div className="flex-1 flex flex-col gap-6">
              {questions.slice(0, 2).map((question, index) => (
                <div key={index}>
                  {/* QUESTION */}

                  <div className="flex items-start gap-4 mb-2">
                    <span className="font-bold">{index + 1}</span>

                    <span className="leading-[1.8]">{question}</span>
                  </div>

                  {/* INPUT */}

                  <div className="pl-[35px]">{inputField(index)}</div>
                </div>
              ))}
            </div>

            {/* IMAGE */}

            <img
              src={taxiImg}
              alt=""
              style={{
                width: "230px",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>

          {/* باقي الأسئلة Full Width */}

          <div className="flex flex-col gap-6 w-full">
            {questions.slice(2).map((question, index) => {
              const realIndex = index + 2;

              return (
                <div key={realIndex}>
                  {/* QUESTION */}

                  <div className="flex items-start gap-4 mb-2">
                    <span className="font-bold">{realIndex + 1}</span>

                    <span className="leading-[1.8]">{question}</span>
                  </div>

                  {/* INPUT */}

                  <div className="pl-[35px]">{inputField(realIndex)}</div>
                </div>
              );
            })}
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

export default WB_Unit9_Page52_Q2;
