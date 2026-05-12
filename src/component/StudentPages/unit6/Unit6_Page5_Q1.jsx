import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Unit6_Page5_Q1 = () => {
  const words = ["attractions", "shoot", "bunch", "trade"];

  const sentences = [
    {
      before: "There are many",
      after: "at a carnival, such as rides, games, and shows.",
    },

    {
      before: "We could",
      after: "cars. I’ll give you this red one for your blue one.",
    },

    {
      before: "How many baskets can you",
      after: "in one game?",
    },

    {
      before: "I bought a",
      after: "of tickets so I can go on lots of rides.",
    },
  ];

  const correctAnswers = [["attractions"], ["trade"], ["shoot"], ["bunch"]];

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
      const ok = correctAnswers[i].some(
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
      correctAnswers[0][0],
      correctAnswers[1][0],
      correctAnswers[2][0],
      correctAnswers[3][0],
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div className="div-forall">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-15">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            A
          </span>
          Read and write the correct word.
        </h5>

        {/* WORD BANK */}
        <div className="flex justify-center mb-10">
          <div
            className="
              bg-[#E8DFF0]
              rounded-2xl
              px-10
              py-4
              flex
              gap-24
              text-[22px]
              font-medium
            "
          >
            {words.map((word, i) => (
              <span key={i}>{word}</span>
            ))}
          </div>
        </div>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-8">
          {sentences.map((item, i) => (
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
                    text-[22px]
                    w-6
                  "
              >
                {i + 1}
              </span>

              {/* SENTENCE */}
              <div
                className="
                    flex
                    items-end
                    flex-wrap
                    text-[22px]
                    leading-[1.8]
                    flex-1
                  "
              >
                <span>{item.before}</span>

                {/* INPUT */}
                <div className="relative mx-2">
                  <input
                    type="text"
                    value={answers[i]}
                    disabled={locked || result[i] === true}
                    onChange={(e) => handleChange(i, e.target.value)}
                    className={`
                        w-[170px]
                        border-0
                        border-b
                        outline-none
                        bg-transparent
                        text-[22px]
                        font-semibold
                        pb-0.5
                        ml-2
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

                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                      }}
                    >
                      ✕
                    </span>
                  )}
                </div>

                <span>{item.after}</span>
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

export default Unit6_Page5_Q1;
