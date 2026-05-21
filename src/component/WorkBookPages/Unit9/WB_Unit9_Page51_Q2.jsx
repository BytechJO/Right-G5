import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit9_Page51_Q2 = () => {
  const wordBank = [
    "rush",
    "congratulations",
    "exactly",
    "that’ll work",
    "see how it goes",
    "great news",
  ];

  const questions = [
    {
      before: "",

      after: "! You won this game.",

      answer: "congratulations",
    },

    {
      before: "I have",

      after: ". I’m going to graduate next week!",

      answer: "great news",
    },

    {
      before: "I’m joining a new book club. I’ll begin tomorrow and",

      after: ".",

      answer: "see how it goes",
    },

    {
      before: "A club meeting at 4:00 is good. I’m sure",

      after: ".",

      answer: "that’ll work",
    },

    {
      before: "I’ll go to the grocery store and get you some bread. That’s",

      after: "what I’ll do.",

      answer: "exactly",
    },

    {
      before: "I need to",

      after: "to the hospital. I have a terrible stomachache.",

      answer: "rush",
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

    const normalizedCorrect = questions.map((q) => normalize(q.answer));

    const usedAnswers = [];

    const newResults = studentAnswers.map((answer) => {
      const normalizedStudent = normalize(answer);

      const foundIndex = normalizedCorrect.findIndex(
        (correct, index) =>
          correct === normalizedStudent && !usedAnswers.includes(index),
      );

      const ok = foundIndex !== -1;

      if (ok) {
        usedAnswers.push(foundIndex);

        correctCount++;
      }

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

  const inputField = (i, width = "250px") => (
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

        <h5 className="header-title-page8 mb-8">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            B
          </span>
          Read and write.
        </h5>

        {/* WORD BANK */}

        <div
          style={{
            border: "2px solid #6D2980",
            borderRadius: "12px",
            padding: "14px 26px",
          }}
          className="
    grid
    grid-cols-3
    gap-x-25
    gap-y-3
    mb-10
    w-fit
    mx-auto
  "
        >
          {wordBank.map((word, index) => (
            <span key={index}>{word}</span>
          ))}
        </div>

        {/* QUESTIONS */}

        <div className="flex flex-col gap-6">
          {questions.map((q, index) => (
            <div key={index}>
              <div className="flex items-start gap-4">
                {/* NUMBER */}

                <span className="font-bold">{index + 1}</span>

                {/* SENTENCE */}

                <div className="leading-[1.8] flex-1">
                  {q.before}{" "}
                  {inputField(
                    index,
                    index === 2 ? "420px" : index === 3 ? "230px" : "260px",
                  )}{" "}
                  {q.after}
                </div>
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

export default WB_Unit9_Page51_Q2;
