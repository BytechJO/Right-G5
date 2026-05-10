import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Review3_Page1_Q1 = () => {
  const wordBank = ["sardines", "yummy", "salty", "cupboard"];

  const correctAnswers = ["yummy", "sardines", "cupboard", "salty"];

  const sentences = [
    {
      before: "",
      after: "! I love strawberries!",
      width: "340px",
    },
    {
      before: "Get those",
      after: "away from me! They are so smelly.",
      width: "280px",
    },
    {
      before: "Can you get me the peanut butter from the",
      after: "?",
      width: "300px",
    },
    {
      before: "The chips taste very",
      after: ".",
      width: "260px",
    },
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [errors, setErrors] = useState([false, false, false, false]);

  const [correctLocked, setCorrectLocked] = useState([
    false,
    false,
    false,
    false,
  ]);

  const [locked, setLocked] = useState(false);

  // normalize
  const normalize = (text) => {
    return text
      .toLowerCase()
      .replace(/[.,!?]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  // change
  const handleChange = (i, value) => {
    if (correctLocked[i]) return;

    const updated = [...answers];
    updated[i] = value;

    setAnswers(updated);

    const updatedErrors = [...errors];
    updatedErrors[i] = false;

    setErrors(updatedErrors);
  };

  // check
  const handleCheck = () => {
    if (locked) return;

    if (answers.some((a) => normalize(a) === "")) {
      ValidationAlert.info("Complete all fields.");
      return;
    }

    let score = 0;

    const newErrors = answers.map((a, i) => {
      const correct = normalize(a) === normalize(correctAnswers[i]);

      if (correct) score++;

      return !correct;
    });

    const updatedLocked = answers.map(
      (a, i) => normalize(a) === normalize(correctAnswers[i]),
    );

    setErrors(newErrors);

    setCorrectLocked(updatedLocked);

    const total = correctAnswers.length;

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
    setAnswers(correctAnswers);

    setErrors([false, false, false, false]);

    setCorrectLocked([true, true, true, true]);

    setLocked(true);
  };

  // reset
  const handleReset = () => {
    setAnswers(["", "", "", ""]);

    setErrors([false, false, false, false]);

    setCorrectLocked([false, false, false, false]);

    setLocked(false);
  };

  // input
  const renderInput = (i, width) => (
    <span
      style={{
        position: "relative",
      }}
    >
      <input
        type="text"
        value={answers[i]}
        disabled={locked || correctLocked[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        style={{
          width: width,
          border: "none",
          borderBottom: errors[i] ? "1px solid red" : "1px solid black",
          outline: "none",
          background: "transparent",
          fontSize: "20px",
          color: "#6D2980",
          fontWeight: "600",
          paddingBottom: "10px",
        }}
      />

      {/* ❌ */}
      {errors[i] && (
        <span
          style={{
            position: "absolute",
            top: "-10px",
            right: "0px",
            width: "22px",
            transform: "translateY(-50%)",
            height: "22px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
          }}
        >
          ✕
        </span>
      )}
    </span>
  );

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
        <h5 className="header-title-page8 mb-20">
          <span className="mr-2">A</span>
          Read and write the correct word.
        </h5>

        {/* WORD BANK */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              background: "#d9d2dc",
              borderRadius: "12px",
              padding: "14px 40px",
              display: "flex",
              gap: "50px",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            {wordBank.map((word, i) => (
              <span key={i}>{word}</span>
            ))}
          </div>
        </div>

        {/* QUESTIONS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "34px",
            fontSize: "18px",
          }}
        >
          {sentences.map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              {/* NUMBER */}
              <span
                style={{
                  fontWeight: "bold",
                  width: "20px",
                }}
              >
                {i + 1}
              </span>

              {/* BEFORE */}
              <span>{s.before}</span>

              {/* INPUT */}
              {renderInput(i, s.width)}

              {/* AFTER */}
              <span>{s.after}</span>
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

export default Review3_Page1_Q1;
