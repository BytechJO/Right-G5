import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit9_Page53_Q1 = () => {
  const questions = [
    {
      before: "We will get to the party on time",

      after: ".",

      answer: "if we leave right now",
    },

    {
      before: "",

      after: ", we will go next year.",

      answer: "If we can’t go to China this year",
    },

    {
      before: "John can go to the park",

      after: ".",

      answer: "when he finishes the dishes",
    },

    {
      before: "Suzie will read a book",

      after: ".",

      answer: "when the weekend comes",
    },

    {
      before: "He will buy a new bicycle",

      after: ".",

      answer: "if he is able to save up the money",
    },

    {
      before: "",

      after: ", we will watch TV together.",

      answer: "When my brother comes home",
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

  const inputField = (i, width = "320px") => (
    <div className="relative w-full">
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
          Read and write sentences with{" "}
          <span className="text-[#00AEEF]">“when”</span> or{" "}
          <span className="text-[#00AEEF]">“if”</span> clauses.
        </h5>

        {/* QUESTIONS */}

        <div className="flex flex-col gap-10">
          {questions.map((q, index) => (
            <div key={index}>
              <div className="flex items-start gap-4">
                {/* NUMBER */}

                <span className="font-bold">{index + 1}</span>

                {/* SENTENCE */}

                <div className="flex flex-wrap items-end gap-2 leading-[1.8] flex-1">
                  {q.before && <span>{q.before}</span>}

                  <div className="flex-1 min-w-[220px]">
                    {inputField(index, "100%")}
                  </div>

                  {q.after && <span>{q.after}</span>}
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

export default WB_Unit9_Page53_Q1;
