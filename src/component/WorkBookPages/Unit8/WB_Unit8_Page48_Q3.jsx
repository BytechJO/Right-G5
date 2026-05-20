import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit8_Page48_Q3 = () => {
  const questions = [
    {
      sentence: "Someone lost (their / his) backpack.",

      options: ["their", "his"],

      correct: "his",
    },

    {
      sentence: "Can anyone give me (their / his) textbook?",

      options: ["their", "his"],

      correct: "his",
    },

    {
      sentence: "Did everyone do (their / his) homework?",

      options: ["their", "his"],

      correct: "his",
    },

    {
      sentence: "No one brought (their / his) gym clothes.",

      options: ["their", "his"],

      correct: "his",
    },
  ];

  const [selectedAnswers, setSelectedAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  // ------------------------
  // SELECT
  // ------------------------

  const handleSelect = (qIndex, option) => {
    if (locked || result[qIndex] === true) return;

    const updated = [...selectedAnswers];

    updated[qIndex] = option;

    setSelectedAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[qIndex] = undefined;

      return copy;
    });
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = selectedAnswers.some((a) => !a);

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = selectedAnswers.map((answer, i) => {
      const ok = answer === questions[i].correct;

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
    setSelectedAnswers(questions.map((q) => q.correct));

    setResult([true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    setSelectedAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // SENTENCE
  // ------------------------

  const renderSentence = (q, qIndex) => {
    const parts = q.sentence.split("(");

    const after = parts[1].split(")")[1];

    return (
      <div className="leading-[1.8]">
        {parts[0]}(
        {q.options.map((option, index) => {
          const selected = selectedAnswers[qIndex] === option;

          return (
            <React.Fragment key={index}>
              <button
                type="button"
                disabled={locked || result[qIndex] === true}
                onClick={() => handleSelect(qIndex, option)}
                style={{
                  position:"relative",
                  background: "transparent",

                  border:
                    selected && result[qIndex] === false
                      ? "2px solid #D1232A"
                      : selected
                        ? "2px solid #6D2980"
                        : "2px solid transparent",

                  borderRadius: "999px",

                  padding: "0 6px",

                  lineHeight: "1.2",

                  cursor:
                    locked || result[qIndex] === true ? "default" : "pointer",
                }}
              >
                {option}
                {selected &&result[qIndex] === false && (
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
              </button>

              {index !== q.options.length - 1 && " / "}
            </React.Fragment>
          );
        })}
        ){after}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall text-[20px] w-full">
        {/* TITLE */}

        <h5 className="header-title-page8 mb-[14vh]">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            I
          </span>
          Read and circle.
        </h5>

        {/* QUESTIONS */}

        <div className="flex flex-col gap-12">
          {questions.map((q, index) => (
            <div key={index} className="flex items-start gap-4">
              <span className="font-bold">{index + 1}</span>

              {renderSentence(q, index)}
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

export default WB_Unit8_Page48_Q3;
