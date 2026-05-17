import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// LEFT TABLE IMAGES
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 6 Shall We Should We Folder/Untitled-12.png";

// RIGHT TABLE IMAGES

const Review5_Page2_Q1 = () => {
  const questions = [
    {
      answer:
        "Milton doesn’t like to go to the museum. He would prefer to go to the zoo.",
    },
    {
      answer:
        "Kelly doesn’t want to eat inside a restaurant. She would prefer to eat outside in a restaurant.",
    },

    {
      answer:
        "Andrew doesn’t want to go to the playground. He would rather go to the park.",
    },

    {
      answer:
        "Jared doesn’t want to go to the carnival. He would prefer to go to the circus.",
    },
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,]/g, "")
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

    const newResults = answers.map((ans, i) => {
      const ok = normalize(ans) === normalize(questions[i].answer);

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
    setAnswers([
      questions[0].answer,
      questions[1].answer,
      questions[2].answer,
      questions[3].answer,
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
        <h5 className="header-title-page8 mb-8">
          <span
            style={{
              marginRight: "10px",
            }}
          >
            D
          </span>
          Read the chart and write sentences using{" "}
          <span className="text-[#1DA1F2]">prefer</span> and{" "}
          <span className="text-[#1DA1F2]">like</span>.
        </h5>

        <div className="flex justify-center mb-10">
          {/* RIGHT BIG IMAGE */}
          <img
            src={img2}
            alt=""
            style={{
              width: "500px",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>

        {/* SENTENCES */}
        <div className="flex flex-col gap-8 mb-12">
          {questions.map((q, i) => (
            <div
              key={i}
              className="
                  flex
                  gap-4
                "
            >
              <span className="font-bold text-[20px] w-6">{i + 1}</span>

              <div className="relative flex-1">
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
                      pb-1

                      ${
                        result[i] === false
                          ? "border-[#D1232A] text-[#6D2980]"
                          : "border-black text-[#6D2980]"
                      }
                    `}
                />

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

export default Review5_Page2_Q1;
