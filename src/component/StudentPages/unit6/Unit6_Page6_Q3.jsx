import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Unit6_Page6_Q3 = () => {
  const questions = [
    {
      scrambled: "go I the may to museum art.",
      answers: ["I may go to the art museum."],
    },

    {
      scrambled: "could at I the park stay.",
      answers: ["I could stay at the park."],
    },

    {
      scrambled: "restaurant go we the to shall?",
      answers: ["Shall we go to the restaurant?"],
    },

    {
      scrambled: "we volleyball go game to shall the?",
      answers: ["Shall we go the volleyball game?"],
    },
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [locked, setLocked] = useState(false);

  const [result, setResult] = useState([]);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleChange = (i, val) => {
    if (locked || result[i] === true) return;

    const updated = [...answers];

    updated[i] = val;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all fields.");

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((ans, i) => {
      const ok = questions[i].answers.some(
        (correct) => normalize(correct) === normalize(ans),
      );

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = answers.length;

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
    setAnswers([
      questions[0].answers[0],
      questions[1].answers[0],
      questions[2].answers[0],
      questions[3].answers[0],
    ]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-12">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            F
          </span>
          Unscramble and write the sentences or questions.
        </h5>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-8">
          {questions.map((item, i) => (
            <div
              key={i}
              className="
                  flex
                  items-start
                  gap-4
                "
            >
              {/* NUMBER */}
              <span
                className="
                    font-bold
                    text-[20px]
                    w-6
                  "
              >
                {i + 1}
              </span>

              {/* CONTENT */}
              <div className="flex-1">
                {/* SCRAMBLED */}
                <div
                  className="
                      text-[20px]
                      mb-4
                      leading-[1.6]
                    "
                >
                  {item.scrambled}
                </div>

                {/* INPUT */}
                <div className="relative">
                  <input
                    type="text"
                    value={answers[i]}
                    disabled={locked || result[i] === true}
                    onChange={(e) => handleChange(i, e.target.value)}
                    className={`
                        w-full
                        border-0
                        border-b
                        outline-none
                        bg-transparent
                        text-[20px]
                        font-semibold
                        pb-0.5

                        ${
                          result[i] === false
                            ? "border-[#D1232A] text-[#6D2980]"
                            : "border-black text-[#6D2980]"
                        }
                      `}
                  />

                  {/* WRONG */}
                  {result[i] === false && (
                    <span
                      style={{
                        position: "absolute",

                        top: "-8px",

                        right: "-8px",

                        width: "22px",

                        height: "22px",

                        background: "#ef4444",

                        color: "white",

                        borderRadius: "50%",

                        display: "flex",

                        alignItems: "center",

                        justifyContent: "center",

                        fontSize: "12px",

                        fontWeight: "bold",

                        border: "2px solid white",

                        boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                      }}
                    >
                      ✕
                    </span>
                  )}
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

export default Unit6_Page6_Q3;
