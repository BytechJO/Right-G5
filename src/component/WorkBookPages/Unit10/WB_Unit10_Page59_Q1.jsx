import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGES
import drumsImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U10/Page 59/Asset 4.svg";
import bikesImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U10/Page 59/Asset 5.svg";
import readingImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U10/Page 59/Asset 6.svg";
import soupImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U10/Page 59/Asset 7.svg";

const WB_Unit_Test_Q30 = () => {
  const questions = [
    {
      clue: "(play the drums)",

      answer: "He was playing the drums.",
    },

    {
      clue: "(ride their bikes)",

      answer: "They were riding their bikes.",
    },

    {
      clue: "(read a book)",

      answer: "She was reading a book.",
    },

    {
      clue: "(eat his soup)",

      answer: "He was eating his soup.",
    },
  ];

  const images = [drumsImg, bikesImg, readingImg, soupImg];

  const [studentAnswers, setStudentAnswers] = useState(["", "", "", ""]);

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

        <h5 className="header-title-page8 mb-10 leading-[1.4]">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            F
          </span>
          Look and write a sentence using the{" "}
          <span className="text-[#00AEEF]">
            past progressive tense
            (was/were + verb + ing).
          </span>
        </h5>

        {/* QUESTIONS */}

        <div className="flex flex-col gap-5">
          {questions.map((q, index) => (
            <div key={index} className="flex gap-6 items-start">
              {/* NUMBER */}

              <span className="font-bold mt-2">{index + 1}</span>

              {/* IMAGE */}

              <img
                src={images[index]}
                alt=""
                style={{
                  width: "170px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />

              {/* RIGHT */}

              <div className="flex-1 flex flex-col gap-8 pt-2">
                {/* LINE 1 */}

                {inputField(index)}
                {/* CLUE */}
                <span className="text-[18px]">{q.clue}</span>
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

export default WB_Unit_Test_Q30;
