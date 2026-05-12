import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Review5_Page1_Q2 = () => {
  const questions = [
    {
      before: "He had lots of",
      underlined: "information",
      after: "about British Columbia.",
      tf: "true",
      correction: "",
    },

    {
      before: "The",
      underlined: "presentation",
      after: "consisted of meat and vegetables.",
      tf: "false",
      correction: "shish kebab",
    },

    {
      before: "Maybe we could",
      underlined: "assignment",
      after: "shish kebabs tonight.",
      tf: "false",
      correction: "barbecue",
    },

    {
      before: "Mark ate the",
      underlined: "both",
      after: "apple cake by himself.",
      tf: "false",
      correction: "entire",
    },

    {
      before: "I have an",
      underlined: "entire",
      after: "to do in math class tomorrow.",
      tf: "false",
      correction: "exam",
    },
  ];

  const [answers, setAnswers] = useState(
    questions.map(() => ({
      tf: "",
      correction: "",
    })),
  );

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleChange = (i, field, value) => {
    if (locked || result[i]?.tf === true) return;

    const updated = [...answers];

    updated[i][field] = value;

    // إذا كتب true فضي التصحيح
    if (field === "tf" && value.toLowerCase().trim() === "true") {
      updated[i].correction = "";
    }

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = answers.some((a) => {
      if (!a.tf.trim()) return true;

      if (normalize(a.tf) === "false" && !a.correction.trim()) return true;

      return false;
    });

    if (hasEmpty) {
      ValidationAlert.info("Please complete all fields.");

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((a, i) => {
      const tfCorrect = normalize(a.tf) === questions[i].tf;

      let correctionCorrect = true;

      if (questions[i].tf === "false") {
        correctionCorrect =
          normalize(a.correction) === normalize(questions[i].correction);
      }

      if (tfCorrect && correctionCorrect) {
        correctCount++;
      }

      return {
        tf: tfCorrect,
        correction: correctionCorrect,
      };
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
    setAnswers([
      {
        tf: "true",
        correction: "",
      },

      {
        tf: "false",
        correction: "shish kebab",
      },

      {
        tf: "false",
        correction: "barbecue",
      },

      {
        tf: "false",
        correction: "entire",
      },

      {
        tf: "false",
        correction: "exam",
      },
    ]);

    setResult(
      questions.map(() => ({
        tf: true,
        correction: true,
      })),
    );

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(
      questions.map(() => ({
        tf: "",
        correction: "",
      })),
    );

    setResult([]);

    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-20 flex">
          <span className="mr-2.5">B</span>

          <div className="flex flex-col">
            <span>
              Read and write <span className="text-[#1DA1F2]">true</span> or{" "}
              <span className="text-[#1DA1F2]">false</span>.
            </span>

            <span>
              For false, change the underlined word to make the sentence
              correct.
            </span>
          </div>
        </h5>
        {/* QUESTIONS */}
        <div className="flex flex-col gap-8">
          {questions.map((q, i) => {
            const isTrue = normalize(answers[i].tf) === "true";

            return (
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

                {/* TF INPUT */}
                <div className="relative">
                  <input
                    type="text"
                    value={answers[i].tf}
                    disabled={locked || result[i]?.tf === true}
                    onChange={(e) => handleChange(i, "tf", e.target.value)}
                    className={`
                        w-[86px]
                        h-[34px]
                        rounded-full
                        border
                        border-[#7A2D91]
                        text-center
                        outline-none
                        bg-transparent
                        text-[18px]
                        font-semibold
                        text-[#1DA1F2]
                      `}
                  />

                  {/* TF WRONG */}
                  {result[i]?.tf === false && (
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

                {/* SENTENCE */}
                <div className="flex items-end flex-wrap gap-2 text-[20px] leading-[1.7]">
                  <span>{q.before}</span>

                  <span className="underline">{q.underlined}</span>

                  <span>{q.after}</span>

                  {/* CORRECTION */}
                  <div className="relative">
                    <input
                      type="text"
                      value={answers[i].correction}
                      disabled={
                        isTrue || locked || result[i]?.correction === true
                      }
                      onChange={(e) =>
                        handleChange(i, "correction", e.target.value)
                      }
                      className={`
                        w-[190px]
                        border-0
                        border-b
                        outline-none
                        bg-transparent
                        text-[18px]
                        font-semibold
                        pb-0.5

                        ${
                          result[i]?.correction === false
                            ? "border-[#D1232A] text-[#6D2980]"
                            : "border-black text-[#6D2980]"
                        }

                        ${isTrue ? "opacity-40" : ""}
                      `}
                    />

                    {!isTrue && result[i]?.correction === false && (
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

export default Review5_Page1_Q2;
