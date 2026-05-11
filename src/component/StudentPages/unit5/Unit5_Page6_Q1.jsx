import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Unit5_Page6_Q1 = () => {
  const [answers, setAnswers] = useState(["", "", "", "", ""]);

  const [locked, setLocked] = useState(false);

  const [result, setResult] = useState([]);

  const correctAnswers = [
    ["They would prefer honey, please."],

    ["Would you please hang the clothes?"],

    ["Could you please wipe the table?"],

    ["I would like more juice, please."],

    ["Sandra would like more mashed potatoes, please."],
  ];

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

  const scrambled = [
    "prefer honey would they .",

    "hang the would ? clothes you please",

    "you table ? could please the wipe",

    "like would please more , I juice .",

    "mashed potatoes like Sandra would please , more .",
  ];

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
        <h5 className="header-title-page8 mb-14">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            C
          </span>
          Unscramble and write the polite questions and statements.
        </h5>

        {/* QUESTIONS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {scrambled.map((q, i) => (
            <div key={i}>
              {/* SCRAMBLED */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  marginBottom: "3px",
                }}
              >
                {/* NUMBER */}
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    width: "24px",
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>

                {/* TEXT */}
                <div
                  style={{
                    fontSize: "18px",
                  }}
                >
                  {q}
                </div>
              </div>

              {/* INPUT */}
              <div
                style={{
                  marginLeft: "36px",
                  position: "relative",
                }}
              >
                <input
                  type="text"
                  value={answers[i]}
                  disabled={locked || result[i] === true}
                  onChange={(e) => handleChange(i, e.target.value)}
                  style={{
                    width: "100%",

                    border: "none",

                    borderBottom:
                      result[i] === false
                        ? "1px solid #D1232A"
                        : "1px solid black",

                    outline: "none",

                    background: "transparent",

                    fontSize: "18px",

                    paddingBottom: "6px",

                    color: "#6D2980",

                    fontWeight: "600",
                    height: "32px",
                    lineHeight: "32px",
                    padding: "0",
                  }}
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

export default Unit5_Page6_Q1;
