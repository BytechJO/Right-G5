import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Review3_Page1_Q2 = () => {
  const questions = [
    {
      left: "Some try!",
      right: "Try some!",
      correct: "right",
    },
    {
      left: "Way no!",
      right: "No way!",
      correct: "right",
    },
    {
      left: "tastes funny",
      right: "funny tastes",
      correct: "left",
    },
    {
      left: "Good that doesn’t sound.",
      right: "That doesn’t sound good.",
      correct: "right",
    },
    {
      left: "Help yourself.",
      right: "Yourself help.",
      correct: "left",
    },
  ];

  const [answers, setAnswers] = useState(questions.map(() => ""));

  const [errors, setErrors] = useState(questions.map(() => false));

  const [correctLocked, setCorrectLocked] = useState(
    questions.map(() => false),
  );

  const [locked, setLocked] = useState(false);

  // select
  const handleSelect = (index, side) => {
    if (locked || correctLocked[index]) return;

    const updated = [...answers];

    updated[index] = side;

    setAnswers(updated);

    const updatedErrors = [...errors];

    updatedErrors[index] = false;

    setErrors(updatedErrors);
  };

  // check
  const handleCheck = () => {
    if (locked) return;

    const isEmpty = answers.some((a) => a === "");

    if (isEmpty) {
      ValidationAlert.info("Complete all fields.");
      return;
    }

    let score = 0;

    const newErrors = answers.map((a, i) => {
      const correct = a === questions[i].correct;

      if (correct) score++;

      return !correct;
    });

    const updatedLocked = answers.map((a, i) => a === questions[i].correct);

    setErrors(newErrors);

    setCorrectLocked(updatedLocked);

    const total = questions.length;

    const msg = `Score: ${score} / ${total}`;

    if (score === total) {
      setLocked(true);

      ValidationAlert.success(msg);
    } else if (score === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // show
  const handleShow = () => {
    setAnswers(questions.map((q) => q.correct));

    setErrors(questions.map(() => false));

    setCorrectLocked(questions.map(() => true));

    setLocked(true);
  };

  // reset
  const handleReset = () => {
    setAnswers(questions.map(() => ""));

    setErrors(questions.map(() => false));

    setCorrectLocked(questions.map(() => false));

    setLocked(false);
  };

  // option
  const renderOption = (
    text,
    side,
    selected,
    oppositeSelected,
    questionIndex,
  ) => {
    return (
      <span
        onClick={() => handleSelect(questionIndex, side)}
        style={{
          position: "relative",

          cursor:
            locked || correctLocked[questionIndex] ? "default" : "pointer",

          userSelect: "none",

          padding: "2px 6px",

          border: selected ? "2px solid #6D2980" : "2px solid transparent",

          borderRadius: "999px",

          transition: "0.2s",
        }}
      >
        {text}

        {/* X */}
        {oppositeSelected && (
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#FF0000",
              fontSize: "28px",
              fontWeight: "bold",
              lineHeight: 1,
              pointerEvents: "none",
            }}
          >
            ✗
          </span>
        )}
      </span>
    );
  };

  return (
    <div
      style={{
        padding: "30px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="div-forall">
        {/* HEADER */}
        <h5 className="header-title-page8 mb-36">
          <span className="mr-2">B</span>
          Read and circle the correct expression. Cross out (<span className="text-[#FF0000]">✗</span>) the wrong one.
        </h5>

        {/* QUESTIONS */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            columnGap: "16px",
            rowGap: "40px",
            marginTop: "30px",
          }}
        >
          {questions.map((q, i) => (
            <div
              key={i}
              style={{
                background: "#ddd7df",

                borderRadius: "12px",

                padding: "14px 18px",

                minWidth: i === 3 ? "500px" : "250px",

                display: "flex",

                alignItems: "center",

                gap: "16px",

                fontSize: "18px",

                position: "relative",
              }}
            >
              {/* NUMBER */}
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                {i + 1}
              </span>

              {/* LEFT */}
              {renderOption(
                q.left,
                "left",
                answers[i] === "left",
                answers[i] === "right",
                i,
              )}

              {/* RIGHT */}
              {renderOption(
                q.right,
                "right",
                answers[i] === "right",
                answers[i] === "left",
                i,
              )}

              {/* ❌ ERROR */}
              {errors[i] && (
                <span
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
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
                  }}
                >
                  ✕
                </span>
              )}
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={handleReset}>
            Start Again ↻
          </button>

          <button className="show-answer-btn" onClick={handleShow}>
            Show Answer
          </button>

          <button className="check-button2" onClick={handleCheck}>
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review3_Page1_Q2;
