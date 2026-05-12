import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Review6_Page1_Q4 = () => {
  const questions = [
    {
      sentence: "used when something is possible but not certain:",

      left: "might",

      right: "should",

      correct: "might",
    },

    {
      sentence: "used most often for the future tense:",

      left: "must",

      right: "will",

      correct: "will",
    },

    {
      sentence: "used to ask if it’s possible something will occur:",

      left: "can",

      right: "could",

      correct: "could",
    },

    {
      sentence: "used to ask if someone is willing or wanting to do something:",

      left: "must",

      right: "would",

      correct: "would",
    },

    {
      sentence: "used to ask if something is able to occur:",

      left: "can",

      right: "will",

      correct: "can",
    },
  ];

  const [selected, setSelected] = useState(["", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const handleSelect = (i, word) => {
    if (locked || result[i] === true) return;

    const updated = [...selected];

    updated[i] = word;

    setSelected(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    if (selected.some((s) => !s)) {
      ValidationAlert.info("Please answer all questions.");

      return;
    }

    let correctCount = 0;

    const newResults = selected.map((s, i) => {
      const ok = s === questions[i].correct;

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

  const showAnswers = () => {
    setSelected(["might", "will", "could", "would", "can"]);

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setSelected(["", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-17">
          <span
            style={{
              marginRight: "10px",
            }}
          >
            D
          </span>
          Circle the modal verb that matches the use.
        </h5>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-14">
          {questions.map((q, i) => (
            <div
              key={i}
              className="
                  grid
                  grid-cols-[30px_1fr_220px]
                  items-center
                  gap-6
                "
            >
              {/* NUMBER */}
              <span className="font-bold text-[18px]">{i + 1}</span>

              {/* SENTENCE */}
              <div className="text-[18px]">{q.sentence}</div>

              {/* OPTIONS */}
              <div
                className="
                    flex
                    items-center
                    gap-2
                    text-[18px]
                  "
              >
                {/* LEFT WORD */}
                <div
                  onClick={() => handleSelect(i, q.left)}
                  className="
                      relative
                      cursor-pointer
                      inline-block
                      px-1
                      py-px
                    "
                >
                  {selected[i] === q.left && (
                    <span
                      className={`
                          absolute
                          inset-[-5px]
                          border-2
                          rounded-full
                          pointer-events-none

                          ${
                            result[i] === false
                              ? "border-[#D1232A]"
                              : "border-[#6D2980]"
                          }
                        `}
                    ></span>
                  )}

                  {/* WRONG */}
                  {result[i] === false && selected[i] === q.left && (
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
                        zIndex: 20,
                      }}
                    >
                      ✕
                    </span>
                  )}

                  <span className="relative z-10">{q.left}</span>
                </div>

                <span>/</span>

                {/* RIGHT WORD */}
                <div
                  onClick={() => handleSelect(i, q.right)}
                  className="
                      relative
                      cursor-pointer
                      inline-block
                      px-1
                      py-px
                    "
                >
                  {selected[i] === q.right && (
                    <span
                      className={`
                          absolute
                          inset-[-5px]
                          border-2
                          rounded-full
                          pointer-events-none

                          ${
                            result[i] === false
                              ? "border-[#D1232A]"
                              : "border-[#6D2980]"
                          }
                        `}
                    ></span>
                  )}

                  {/* WRONG */}
                  {result[i] === false && selected[i] === q.right && (
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
                        zIndex: 20,
                      }}
                    >
                      ✕
                    </span>
                  )}

                  <span className="relative z-10">{q.right}</span>
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

export default Review6_Page1_Q4;
