import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Review6_Page1_Q2 = () => {
  const questions = [
    {
      before: "After Chloe shot the basketball into the hoop, she yelled, “I",

      after: "!”",

      answer: "made it",

      width: "170px",
    },

    {
      before: "I am an",

      after: "at skiing; on winter vacations, I go every day.",

      answer: "expert",

      width: "170px",
    },

    {
      before:
        "We watched the swimmers for a long time. We wanted to jump in, but the water was cold. Finally I asked, “",

      after: "?”",

      answer: "Shall we",

      width: "170px",
    },

    {
      before:
        "My brother only paid $4 for his soccer ball. The regular price was $8, but he got a",

      after: ".",

      answer: "half price",

      width: "170px",
    },
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,",]/g, "")
      .replace(/[’']/g, "'")
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

    const newResults = answers.map((a, i) => {
      const ok = normalize(a) === normalize(questions[i].answer);

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
    setAnswers(["made it", "expert", "Shall we", "half price"]);

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
        <h5 className="header-title-page8 mb-20">
          <span
            style={{
              marginRight: "10px",
            }}
          >
            B
          </span>
          Write the correct vocabulary word or expression on each line.
        </h5>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-15">
          {questions.map((q, i) => (
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
                    w-6
                  "
              >
                {i + 1}
              </span>

              {/* SENTENCE */}
              <div
                className="
                    flex-1
                    text-[18px]
                    leading-[1.9]
                    flex
                    flex-wrap
                    items-end
                    gap-2
                  "
              >
                <span>{q.before}</span>

                {/* INPUT */}
                <div className="relative inline-block">
                  <input
                    type="text"
                    value={answers[i]}
                    disabled={locked || result[i] === true}
                    onChange={(e) => handleChange(i, e.target.value)}
                    style={{
                      width: q.width,
                      border: "none",
                      borderBottom:
                        result[i] === false
                          ? "1px solid #D1232A"
                          : "1px solid black",
                      outline: "none",
                      background: "transparent",
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#6D2980",
                      paddingBottom: "2px",
                      padding: "0",
                      lineHeight: "1",
                    }}
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
                        boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                      }}
                    >
                      ✕
                    </span>
                  )}
                </div>

                <span>{q.after}</span>
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

export default Review6_Page1_Q2;
