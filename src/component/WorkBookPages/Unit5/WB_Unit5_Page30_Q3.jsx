import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit5_Page30_Q3 = () => {
  const questions = [
    {
      speaker: "Tom:",

      before: "I have to",

      options: ["information", "give a presentation"],

      correct: "give a presentation",

      after: "in front of the class.",
    },

    {
      speaker: "Librarian:",

      before: "Okay. How about you?",

      options: ["Good luck to you both", "What would you like"],

      correct: "What would you like",

      after: "to read?",
    },

    {
      speaker: "Harley:",

      before: "I'm looking for",

      options: ["recipe", "sharks"],

      correct: "recipe",

      after: "books so I can make food.",
    },

    {
      speaker: "Librarian:",

      before:
        "I have the right books for both of you! Follow me and I'll show you what I",

      options: ["have in mind", "give a presentation"],

      correct: "have in mind",

      after: ".",
    },
  ];

  const [selectedAnswers, setSelectedAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  // ------------------------
  // SELECT OPTION
  // ------------------------

  const handleSelect = (i, option) => {
    if (locked || result[i] === true) return;

    const updated = [...selectedAnswers];

    updated[i] = option;

    setSelectedAnswers(updated);

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

    const hasEmpty = selectedAnswers.some((a) => !a);

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = selectedAnswers.map((answer, i) => {
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
  // OPTION BUTTON
  // ------------------------

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* TITLE */}

        <h5 className="header-title-page8 mb-[12vh]">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            J
          </span>
          Read and circle.
        </h5>

        {/* QUESTIONS */}

        <div className="flex flex-col gap-14 w-[110%]">
          {questions.map((question, index) => (
            <div key={index} className="text-[18px] ">
              {/* LINE */}
              <div className="flex flex-wrap items-center">
                {/* NUMBER */}
                <span className="font-bold mr-3 w-5">{index + 1}</span>
                {/* SPEAKER */}
                <span className="font-bold mr-1">{question.speaker}</span>
                {/* BEFORE */}
                <span>{question.before}</span>
                {/* ANSWER LINE */}
                <span
                  style={{
                    display: "inline-block",
                    minWidth: "260px",
                    borderBottom: "2px solid black",
                    margin: "0 6px",
                    padding: "0 6px",
                    textAlign: "center",
                  }}
                >
                  {selectedAnswers[index] ? (
                    <span
                      style={{
                        color: "#6D2980",
                        fontWeight: "600",
                      }}
                    >
                      {selectedAnswers[index]}
                    </span>
                  ) : (
                    <span>&nbsp;</span>
                  )}
                </span>
                {/* OPTIONS */}(
                {question.options.map((option, optionIndex) => {
                  const selected = selectedAnswers[index] === option;

                  const wrong = result[index] === false && selected;

                  return (
                    <React.Fragment key={option}>
                      <button
                        type="button"
                        disabled={locked || result[index] === true}
                        onClick={() => handleSelect(index, option)}
                        style={{
                          position: "relative",
                          background: "transparent",
                          border: selected
                            ? "2px solid #6D2980"
                            : "2px solid transparent",
                          borderRadius: "999px",
                          padding: "0 4px",
                          margin: "0 2px",
                          cursor:
                            locked || result[index] === true
                              ? "default"
                              : "pointer",
                          color: "black",
                          fontWeight: "400",
                        }}
                      >
                        {option}

                        {wrong && (
                          <span
                            style={{
                              position: "absolute",
                              top: "-10px",
                              right: "-10px",
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

                      {optionIndex === 0 && <span>/</span>}
                    </React.Fragment>
                  );
                })}
                ){/* AFTER */}
                <span className="ml-1">{question.after}</span>
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

export default WB_Unit5_Page30_Q3;
