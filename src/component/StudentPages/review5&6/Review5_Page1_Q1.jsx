import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Unit6_Page2_Q1 = () => {
  const words = [
    "shark",
    "barbecue",
    "recipe",
    "Mediterranean food",
    "assignment",
  ];

  const definitions = [
    "Cooking over an open fire using charcoal",

    "A type of food found in a certain part of the world",

    "A type of fish that lives in the ocean",

    "A set of directions for cooking something",

    "A job, or work, that is given to someone",
  ];

  const correctAnswers = [
    ["barbecue"],

    ["Mediterranean food"],

    ["shark"],

    ["recipe"],

    ["assignment"],
  ];

  const [answers, setAnswers] = useState(["", "", "", "", ""]);

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
      correctAnswers[4][0],
    ]);

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", ""]);

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
        <h5 className="header-title-page8 mb-12">
          <span
            style={{
              marginRight: "10px",
            }}
          >
            A
          </span>
          Read and write the word with its definition.
        </h5>

        {/* WORD BANK */}
        <div className="flex justify-center mb-10">
          <div
            className="
              bg-[#E8DFF0]
              rounded-[18px]
              px-8
              py-4
              flex
              gap-12
              text-[18px]
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
          {definitions.map((q, i) => (
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
                  text-[18px]
                  w-7
                "
              >
                {i + 1}
              </span>

              {/* QUESTION + INPUT */}
              <div className="flex-1 relative">
                <div
                  className="
                    text-[18px]
                    leading-[1.7]
                    inline
                  "
                >
                  {q}
                </div>

                <input
                  type="text"
                  value={answers[i]}
                  disabled={locked || result[i] === true}
                  onChange={(e) => handleChange(i, e.target.value)}
                  className={`
                    ml-3
                    w-[420px]
                    border-0
                    border-b
                    outline-none
                    bg-transparent
                    text-[18px]
                    font-semibold
                    pb-1

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

export default Unit6_Page2_Q1;
