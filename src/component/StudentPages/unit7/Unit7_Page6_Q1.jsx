import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Unit7_Page6_Q1 = () => {
  const questions = [
    {
      before: "The swimmers",
      after: "in the large and spacious pool.",

      answer: "are swimming",
    },

    {
      before: "Margaret",
      after: "about cells and plants in her biology class.",

      answer: "is learning",
    },

    {
      before: "Sandra",
      after: "with her friends at a fancy restaurant.",

      answer: "is eating",
    },

    {
      before: "We",
      after: "for our math test on Tuesday.",

      answer: "are studying",
    },
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...answers];

    updated[i] = value;

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
      ValidationAlert.info("Please complete all answers.");

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
    setAnswers(["are swimming", "is learning", "is eating", "are studying"]);

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
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            C
          </span>
          Read and write. Use the appropriate
          “<span className="text-[#1ea7ff]">to be</span>” verb and add
          “<span className="text-[#1ea7ff]">-ing</span> ” to the verbs from the
          box.
        </h5>

        {/* WORD BOX */}
        <div
          style={{
            width: "440px",
            height: "56px",
            background: "#E9E1EC",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            margin: "0 auto 35px auto",
            fontSize: "18px",
          }}
        >
          <span
            style={{
              textDecoration: answers.some((a) =>
                a.toLowerCase().includes("learn"),
              )
                ? "line-through"
                : "none",
            }}
          >
            learn
          </span>

          <span
            style={{
              textDecoration: answers.some((a) =>
                a.toLowerCase().includes("eat"),
              )
                ? "line-through"
                : "none",
            }}
          >
            eat
          </span>

          <span
            style={{
              textDecoration: answers.some((a) =>
                a.toLowerCase().includes("study"),
              )
                ? "line-through"
                : "none",
            }}
          >
            study
          </span>

          <span
            style={{
              textDecoration: answers.some((a) =>
                a.toLowerCase().includes("swim"),
              )
                ? "line-through"
                : "none",
            }}
          >
            swim
          </span>
        </div>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-10">
          {questions.map((q, i) => (
            <div
              key={i}
              className="
                  flex
                  items-center
                  gap-4
                  text-[18px]
                "
            >
              {/* NUMBER */}
              <span className="font-bold w-6">{i + 1}</span>

              {/* BEFORE */}
              <span>{q.before}</span>

              {/* INPUT */}
              <div className="relative">
                <input
                  type="text"
                  value={answers[i]}
                  disabled={locked || result[i] === true}
                  onChange={(e) => handleChange(i, e.target.value)}
                  className={`
                      w-[260px]
                      border-0
                      border-b
                      outline-none
                      bg-transparent
                      text-[18px]
                      font-semibold
                      text-center
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

                      fontSize: "11px",

                      fontWeight: "bold",

                      border: "2px solid white",

                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    ✕
                  </span>
                )}
              </div>

              {/* AFTER */}
              <span>{q.after}</span>
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

export default Unit7_Page6_Q1;
