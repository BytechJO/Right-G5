import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Unit4_Page6_Q3 = () => {
  const questions = [
    {
      question: "How often do you go to the park?",
      adverb: "weekly",
      answer: "I go to the park weekly.",
    },
    {
      question: "How often does Harley go to the library?",
      adverb: "regularly",
      answer: "Harley goes to the library regularly.",
    },
    {
      question: "How often do they visit the museum?",
      adverb: "occasionally",
      answer: "They visit the museum occasionally.",
    },
  ];

  const [answers, setAnswers] = useState(["", "", ""]);

  const [errors, setErrors] = useState([false, false, false]);

  const [correctLocked, setCorrectLocked] = useState([false, false, false]);

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
      const correct = normalize(a) === normalize(questions[i].answer);

      if (correct) score++;

      return !correct;
    });

    const updatedLocked = answers.map(
      (a, i) => normalize(a) === normalize(questions[i].answer),
    );

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
    setAnswers(questions.map((q) => q.answer));

    setErrors([false, false, false]);

    setCorrectLocked([true, true, true]);

    setLocked(true);
  };

  // reset
  const handleReset = () => {
    setAnswers(["", "", ""]);

    setErrors([false, false, false]);

    setCorrectLocked([false, false, false]);

    setLocked(false);
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
        <h5 className="header-title-page8 mb-20">
          <span className="ex-A mr-2">F</span>
          Read and answer each question by putting the adverb in the correct
          place.
        </h5>

        {/* QUESTIONS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            marginTop: "30px",
          }}
        >
          {questions.map((q, i) => (
            <div key={i}>
              {/* QUESTION */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "18px",
                }}
              >
                <span
                  style={{
                    fontWeight: 600,
                    width: "20px",
                  }}
                >
                  {i + 1}
                </span>

                <span>{q.question}</span>

                <span
                  style={{
                    color: "#31B7F5",
                  }}
                >
                  ({q.adverb})
                </span>
              </div>

              {/* ANSWER */}
              <div
                style={{
                  position: "relative",
                  marginTop: "18px",
                  marginLeft: "38px",
                }}
              >
                <input
                  type="text"
                  value={answers[i]}
                  disabled={locked || correctLocked[i]}
                  onChange={(e) => handleChange(i, e.target.value)}
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom: errors[i]
                      ? "1px solid red"
                      : "1px solid black",
                    outline: "none",
                    fontSize: "18px",
                    fontWeight: "500",
                    color: "#6D2980",
                    background: "transparent",
                    paddingBottom: "4px",
                  }}
                />

                {/* ❌ */}
                {errors[i] && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-20px",
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
              </div>
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

export default Unit4_Page6_Q3;
