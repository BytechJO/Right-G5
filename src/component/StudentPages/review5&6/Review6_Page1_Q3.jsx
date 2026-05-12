import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Review6_Page1_Q3 = () => {
  const words = [
    "it",
    "was",
    "if",
    "might",
    "can",
    "run",

    "would",
    "done",
    "have",
    "must",
    "see",
    "could",

    "through",
    "over",
    "did",
    "shall",
    "should",
    "between",

    "the",
    "may",
    "were",
    "stop",
    "does",
    "will",
  ];

  const correctAnswers = [
    "might",
    "can",
    "would",
    "must",
    "could",
    "shall",
    "should",
    "may",
    "will",
  ];

  const [selected, setSelected] = useState([]);

  const [wrongSelections, setWrongSelections] = useState([]);

  const [locked, setLocked] = useState(false);

  const toggleWord = (word) => {
    if (locked) return;

    if (selected.includes(word)) {
      setSelected(selected.filter((w) => w !== word));
    } else {
      setSelected([...selected, word]);
    }
  };

  const checkAnswers = () => {
    if (locked) return;

    if (selected.length === 0) {
      ValidationAlert.info("Please select the modal verbs.");

      return;
    }

    const wrong = selected.filter((word) => !correctAnswers.includes(word));

    setWrongSelections(wrong);

    const allCorrect =
      correctAnswers.every((w) => selected.includes(w)) && wrong.length === 0;

    const correctCount = selected.filter((w) =>
      correctAnswers.includes(w),
    ).length;

    const total = correctAnswers.length;

    const color = allCorrect ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:18px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (allCorrect) {
      setLocked(true);

      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const showAnswers = () => {
    setSelected(correctAnswers);

    setWrongSelections([]);

    setLocked(true);
  };

  const handleReset = () => {
    setSelected([]);

    setWrongSelections([]);

    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-25">
          <span
            style={{
              marginRight: "10px",
            }}
          >
            C
          </span>
          Circle the words that are modal verbs.
        </h5>

        {/* WORDS */}
        <div
          className="
            grid
            grid-cols-6
            gap-y-15
            gap-x-16
            pl-8
          "
        >
          {words.map((word, i) => {
            const isSelected = selected.includes(word);

            const isWrong = wrongSelections.includes(word);

            return (
              <div
                key={i}
                onClick={() => toggleWord(word)}
                className="
                    relative
                    cursor-pointer
                    inline-block
                    w-fit
                    text-[20px]
                  "
              >
                {/* CIRCLE */}
                {isSelected && (
                  <span
                    className={`
                        absolute
                        -inset-1.5
                        border-2
                        rounded-full
                        pointer-events-none

                        ${isWrong ? "border-[#D1232A]" : "border-[#6D2980]"}
                      `}
                  ></span>
                )}

                {/* WRONG */}
                {isWrong && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-15px",
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
                      zIndex: 20,
                    }}
                  >
                    ✕
                  </span>
                )}

                <span className="relative z-10">{word}</span>
              </div>
            );
          })}
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

export default Review6_Page1_Q3;
