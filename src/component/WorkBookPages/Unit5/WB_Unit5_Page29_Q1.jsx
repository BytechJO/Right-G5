import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit5_Page29_Q1 = () => {
  const wordBank = ["presentation", "start off", "have in mind", "information"];

  const answers = ["information", "start off", "have in mind", "presentation"];

  const sentences = [
    {
      before: "I found the",
      after: "about sharks in the library.",
    },

    {
      before: "I",
      after: "my day with a bowl of cereal.",
    },

    {
      before: "What kind of place do you",
      after: "?",
    },

    {
      before: "I gave a",
      after: "to my class about the ways to study for an exam.",
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

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = studentAnswers.some((a) => !a.trim());

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    // ترتيب الانبوتات ما يهم
    const normalizedAnswers = answers.map((a) => normalize(a));

    const usedAnswers = [];

    const newResults = studentAnswers.map((answer) => {
      const normalized = normalize(answer);

      const foundIndex = normalizedAnswers.findIndex(
        (a, i) => a === normalized && !usedAnswers.includes(i),
      );

      const ok = foundIndex !== -1;

      if (ok) {
        usedAnswers.push(foundIndex);

        correctCount++;
      }

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

  const showAnswers = () => {
    setStudentAnswers(answers);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setStudentAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

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
        <h5 className="header-title-page8 mb-[10vh]">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            E
          </span>
          Read and write.
        </h5>

        {/* WORD BANK */}
        <div className="border-2 border-[#7D3C98] rounded-xl px-5 py-3 mb-8 w-fit">
          <div className="flex gap-10 text-[20px]">
            {wordBank.map((word, index) => (
              <span key={index}>{word}</span>
            ))}
          </div>
        </div>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-12">
          {sentences.map((sentence, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="font-bold w-5">{index + 1}</span>

              <div className="flex flex-wrap items-center gap-2 leading-[1.8]">
                <span>{sentence.before}</span>

                {inputField(index, index === 2 ? "240px" : "220px")}

                <span>{sentence.after}</span>
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

export default WB_Unit5_Page29_Q1;
