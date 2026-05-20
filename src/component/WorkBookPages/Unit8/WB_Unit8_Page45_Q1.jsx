import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit8_Page45_Q1 = () => {
  const questions = [
    {
      question: "I ______________ that I’ll make it to the party on time.",
      options: ["lean", "doubt", "spot"],
      correct: "doubt",
    },

    {
      question: "The painting of the green ______________ looked beautiful.",
      options: ["rainbow", "second home", "landscape"],
      correct: "landscape",
    },

    {
      question:
        "Look at the people below our airplane. Everyone ______________.",
      options: ["looks like ants", "top of the world", "volunteer"],
      correct: "looks like ants",
    },

    {
      question:
        "The streets are so ______________ . You can’t even walk without bumping into people.",
      options: ["crowded", "shocked", "fly over"],
      correct: "crowded",
    },
  ];

  const [selectedAnswers, setSelectedAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  // ------------------------
  // SELECT ANSWER
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
  // SENTENCE WITH BLANK
  // ------------------------

  const sentenceWithBlank = (text, value) => {
    const parts = text.split("______________");

    return (
      <div className="leading-[1.8]">
        {parts[0]}

        <span
          className="
            inline-block
            min-w-[120px]
            border-b
            border-black
            text-center
            text-[#6D2980]
            font-semibold
            mx-1
          "
        >
          {value}
        </span>

        {parts[1]}
      </div>
    );
  };

  // ------------------------
  // OPTION BUTTON
  // ------------------------

  const optionButton = (qIndex, option, letter) => {
    const selected = selectedAnswers[qIndex] === option;

    const showError =
      result[qIndex] === false &&
      selected &&
      option !== questions[qIndex].correct;

    return (
      <button
        type="button"
        disabled={locked || result[qIndex] === true}
        onClick={() => handleSelect(qIndex, option)}
        className="relative flex items-center gap-2"
        style={{
          background: "transparent",
          border: "none",
          cursor: locked || result[qIndex] === true ? "default" : "pointer",
        }}
      >
        {/* LETTER */}

        <span className="font-bold text-[18px]">{letter}</span>

        {/* OPTION */}

        <span
          style={{
            border:
              selected && result[qIndex] === false
                ? "2px solid #D1232A"
                : selected
                  ? "2px solid #6D2980"
                  : "2px solid transparent",
            borderRadius: "999px",

            padding: "0 8px",

            lineHeight: "1.2",
          }}
          className="text-[18px]"
        >
          {option}
        </span>

        {/* ERROR */}

        {showError && (
          <span
            style={{
              position: "absolute",
              top: "-8px",
              right: "-22px",
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
    );
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall text-[18px]">
        {/* TITLE */}

        <h5 className="header-title-page8 mb-[10vh]">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            A
          </span>
          Read and circle.
        </h5>

        {/* QUESTIONS */}

        <div className="grid grid-cols-2 gap-y-10 gap-x-20">
          {questions.map((q, index) => (
            <div key={index}>
              {/* QUESTION */}

              <div className="flex items-start gap-3 mb-5">
                <span className="font-bold">{index + 1}</span>

                {sentenceWithBlank(q.question, selectedAnswers[index])}
              </div>

              {/* OPTIONS */}

              <div className="flex flex-col gap-2 pl-7">
                {q.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    {optionButton(index, option, ["a", "b", "c"][optionIndex])}
                  </div>
                ))}
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

export default WB_Unit8_Page45_Q1;
