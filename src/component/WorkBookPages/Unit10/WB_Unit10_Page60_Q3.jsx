import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit10_Page60_Q3 = () => {
  const questions = [
    {
      words: ["John", "was", "laughing", "with", "his", "friends."],

      answer: ["was", "laughing"],
    },

    {
      words: [
        "They",
        "were",
        "eating",
        "their",
        "lunch",
        "during",
        "lunchtime.",
      ],

      answer: ["were", "eating"],
    },

    {
      words: ["We", "were", "standing", "in", "line."],

      answer: ["were", "standing"],
    },

    {
      words: [
        "While",
        "the",
        "baby",
        "slept,",
        "her",
        "big",
        "sister",
        "was",
        "singing",
        "a",
        "song.",
      ],

      answer: ["was", "singing"],
    },
  ];

  const [selectedWords, setSelectedWords] = useState([[], [], [], []]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  // ------------------------
  // TOGGLE WORD
  // ------------------------

  const toggleWord = (qIndex, word) => {
    if (locked || result[qIndex] === true) return;

    setSelectedWords((prev) => {
      const updated = [...prev];

      if (updated[qIndex].includes(word)) {
        updated[qIndex] = updated[qIndex].filter((w) => w !== word);
      } else {
        updated[qIndex] = [...updated[qIndex], word];
      }

      return updated;
    });

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

    const hasEmpty = selectedWords.some((arr) => arr.length === 0);

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = questions.map((q, i) => {
      const selected = [...selectedWords[i]].sort();

      const correct = [...q.answer].sort();

      const ok = JSON.stringify(selected) === JSON.stringify(correct);

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
    setSelectedWords([
      ["was", "laughing"],

      ["were", "eating"],

      ["were", "standing"],

      ["was", "singing"],
    ]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    setSelectedWords([[], [], [], []]);

    setResult([]);

    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <h5 className="header-title-page8 mb-[15vh]">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            J
          </span>
          Read and underline the{" "}
          <span className="text-[#00AEEF]">past progressive</span> phrases.
        </h5>

        {/* QUESTIONS */}

        <div className="flex flex-col gap-15">
          {questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="
                  flex
                  items-start
                  gap-4
                "
            >
              {/* NUMBER */}

              <span className="font-bold">{qIndex + 1}</span>

              {/* SENTENCE */}

              <div className="flex flex-wrap gap-1.5">
                {q.words.map((word, wIndex) => {
                  const isSelected = selectedWords[qIndex].includes(word);

                  return (
                    <span
                      key={wIndex}
                      onClick={() => toggleWord(qIndex, word)}
                      className="
                            cursor-pointer
                            transition-all
                            duration-150
                          "
                      style={{
                        fontSize: "18px",

                        borderBottom: isSelected
                          ? "3px solid #6D2980"
                          : "3px solid transparent",
                      }}
                    >
                      {word}
                    </span>
                  );
                })}

                {/* WRONG MARK */}

                {result[qIndex] === false && (
                  <span
                    style={{
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

                      marginLeft: "8px",

                      border: "2px solid white",

                      boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    ✕
                  </span>
                )}
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

export default WB_Unit10_Page60_Q3;
