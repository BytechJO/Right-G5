import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Review5_Page2_Q2 = () => {
  const questions = [
    {
      left: "Could you do your homework, please?",
      right: "Do your homework.",
      correct: "left",
    },

    {
      left: "By the way, bring your jacket.",
      right: "Would you like to bring your jacket?",
      correct: "right",
    },

    {
      left: "We could walk the dog together.",
      right: "Walk the dog.",
      correct: "left",
    },

    {
      left: "I would prefer to go to the cinema, please.",
      right: "I want to go to the cinema.",
      correct: "left",
    },
  ];

  const [selected, setSelected] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const handleSelect = (i, side) => {
    if (locked || result[i] === true) return;

    const updated = [...selected];

    updated[i] = side;

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
      <div style="font-size:20px;text-align:center;">
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
    setSelected(["left", "right", "left", "left"]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setSelected(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-20">
          <span
            style={{
              marginRight: "10px",
            }}
          >
            E
          </span>
          Circle the more polite way of asking.
        </h5>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-15">
          {questions.map((q, i) => (
            <div
              key={i}
              className="
                  grid
                  grid-cols-[30px_1fr_1fr]
                  gap-10
                  items-start
                "
            >
              {/* NUMBER */}
              <span className="font-bold text-[20px]">{i + 1}</span>

              <div
                onClick={() => handleSelect(i, "left")}
                className="
                    relative
                    cursor-pointer
                    text-[20px]
                    leading-normal
                    inline-block
                    w-fit
                    px-2
                    py-1
                  "
              >
                {/* CIRCLE */}
                {selected[i] === "left" && (
                  <span
                    className="
                      absolute
                      -inset-1.5
                      border-2
                      rounded-full
                      pointer-events-none
                      flex
                      items-center
                      justify-center
                    "
                    style={{
                      borderColor:
                        result[i] === false && q.correct !== "left"
                          ? "#ef4444"
                          : "#6D2980",
                    }}
                  >
                    {result[i] === false && q.correct !== "left" && (
                      <span
                        style={{
                          transform: "translateY(-50%)",
                          width: "20px",
                          height: "20px",
                          background: "#ef4444",
                          color: "white",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: "bold",
                          border: "2px solid white",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                          pointerEvents: "none",
                          zIndex: 3,
                          position: "absolute",
                          top: "0px",
                          right: "-8px",
                        }}
                      >
                        ✕
                      </span>
                    )}
                  </span>
                )}

                <span className="relative z-10">{q.left}</span>
              </div>

              {/* RIGHT */}
              <div
                onClick={() => handleSelect(i, "right")}
                className="
                      relative
                      cursor-pointer
                      text-[20px]
                      leading-normal
                      inline-block
                      w-fit
                      px-2
                      py-1
                    "
              >
                {/* CIRCLE */}
                {selected[i] === "right" && (
                  <span
                    className="
                      absolute
                      -inset-1.5
                      border-2
                      rounded-full
                      pointer-events-none
                      flex
                      items-center
                      justify-center
                    "
                    style={{
                      borderColor:
                        result[i] === false && q.correct !== "right"
                          ? "#ef4444"
                          : "#6D2980",
                    }}
                  >
                    {result[i] === false && q.correct !== "right" && (
                      <span
                        style={{
                          transform: "translateY(-50%)",
                          width: "20px",
                          height: "20px",
                          background: "#ef4444",
                          color: "white",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: "bold",
                          border: "2px solid white",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                          pointerEvents: "none",
                          zIndex: 3,
                          position: "absolute",
                          top: "0px",
                          right: "-8px",
                        }}
                      >
                        ✕
                      </span>
                    )}
                  </span>
                )}

                <span className="relative z-10">{q.right}</span>
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

export default Review5_Page2_Q2;
