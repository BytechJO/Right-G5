import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Unit4_Page5_Q3 = () => {
  const questions = [
    {
      text: "Me not!",
      answer: "false",
      correction: "Not me!",
    },
    {
      text: "head over",
      answer: "true",
      correction: "",
    },
    {
      text: "Wait a year.",
      answer: "false",
      correction: "Wait a minute.",
    },
    {
      text: "It’s straight ahead.",
      answer: "true",
      correction: "",
    },
    {
      text: "split aside",
      answer: "false",
      correction: "split up",
    },
  ];

  const [answers, setAnswers] = useState(
    questions.map(() => ({
      choice: "",
      correction: "",
    })),
  );

  const [errors, setErrors] = useState(
    questions.map(() => ({
      choice: false,
      correction: false,
    })),
  );

  const [correctLocked, setCorrectLocked] = useState(
    questions.map(() => ({
      choice: false,
      correction: false,
    })),
  );

  const [locked, setLocked] = useState(false);

  // normalize
  const normalize = (text) => {
    return text
      .toLowerCase()
      .replace(/[.,!?]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  // update
  const updateField = (index, field, value) => {
    if (correctLocked[index][field]) return;

    const updated = [...answers];
    updated[index][field] = value;

    // إذا true فضّي التصحيح
    if (field === "choice" && value === "true") {
      updated[index].correction = "";
    }

    setAnswers(updated);

    // remove errors
    const updatedErrors = [...errors];
    updatedErrors[index][field] = false;

    if (field === "choice" && value === "true") {
      updatedErrors[index].correction = false;
    }

    setErrors(updatedErrors);
  };

  // check
  const handleCheck = () => {
    if (locked) return;

    const isEmpty = answers.some((a) => {
      if (!a.choice) return true;

      if (normalize(a.choice) === "false" && normalize(a.correction) === "") {
        return true;
      }

      return false;
    });

    if (isEmpty) {
      ValidationAlert.info("Complete all fields.");
      return;
    }

    let score = 0;

    const newErrors = answers.map((ans, i) => {
      const choiceCorrect =
        normalize(ans.choice) === normalize(questions[i].answer);

      const correctionCorrect =
        normalize(ans.correction) === normalize(questions[i].correction);

      const isTrue = questions[i].answer === "true";

      // TRUE
      if (isTrue) {
        const questionCorrect =
          choiceCorrect && normalize(ans.correction) === "";

        if (questionCorrect) score++;

        return {
          choice: !choiceCorrect,
          correction: normalize(ans.correction) !== "",
        };
      }

      // FALSE
      const questionCorrect = choiceCorrect && correctionCorrect;

      if (questionCorrect) score++;

      return {
        choice: !choiceCorrect,
        correction: !correctionCorrect,
      };
    });

    // lock correct only
    const updatedLocked = answers.map((ans, i) => {
      const choiceCorrect =
        normalize(ans.choice) === normalize(questions[i].answer);

      const correctionCorrect =
        normalize(ans.correction) === normalize(questions[i].correction);

      const isTrue = questions[i].answer === "true";

      return {
        choice: choiceCorrect,

        correction: isTrue
          ? choiceCorrect && normalize(ans.correction) === ""
          : correctionCorrect,
      };
    });

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
    setAnswers(
      questions.map((q) => ({
        choice: q.answer,
        correction: q.correction,
      })),
    );

    setErrors(
      questions.map(() => ({
        choice: false,
        correction: false,
      })),
    );

    setCorrectLocked(
      questions.map(() => ({
        choice: true,
        correction: true,
      })),
    );

    setLocked(true);
  };

  // reset
  const handleReset = () => {
    setAnswers(
      questions.map(() => ({
        choice: "",
        correction: "",
      })),
    );

    setErrors(
      questions.map(() => ({
        choice: false,
        correction: false,
      })),
    );

    setCorrectLocked(
      questions.map(() => ({
        choice: false,
        correction: false,
      })),
    );

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
        {/* TITLE */}
        <h5 className="header-title-page8 mb-25">
          <span className="ex-A" style={{ marginRight: "10px" }}>
            C
          </span>
          Read and circle <span style={{ color: "#31B7F5" }}>true</span> or{" "}
          <span style={{ color: "#31B7F5" }}>false</span>. For false, write the
          correct phrase or expression.
        </h5>

        {/* QUESTIONS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
          }}
        >
          {questions.map((q, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                fontSize: "20px",
              }}
            >
              {/* NUMBER */}
              <span style={{ fontWeight: "bold", width: "20px" }}>{i + 1}</span>

              {/* TEXT */}
              <div style={{ width: "200px" }}>{q.text}</div>

              {/* CORRECTION */}
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  value={answers[i].correction}
                  disabled={
                    locked ||
                    correctLocked[i]?.correction ||
                    normalize(answers[i].choice) === "true"
                  }
                  onChange={(e) => updateField(i, "correction", e.target.value)}
                  style={{
                    width: "180px",
                    border: "none",
                    borderBottom: errors[i]?.correction
                      ? "1px solid red"
                      : "1px solid black",
                    outline: "none",
                    fontSize: "20px",
                    textAlign: "center",
                    color: "#6D2980",
                    background: "transparent",
                    fontWeight: 600,
                  }}
                />

                {/* ❌ */}
                {errors[i]?.correction && (
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

              {/* TRUE */}
              <div
                onClick={() => {
                  if (!locked && !correctLocked[i]?.choice) {
                    updateField(
                      i,
                      "choice",
                      answers[i].choice === "true" ? "" : "true",
                    );
                  }
                }}
                style={{
                  padding: "4px 12px",
                  borderRadius: "999px",
                  border:
                    answers[i].choice === "true"
                      ? "2px solid #6D2980"
                      : "2px solid transparent",
                  cursor:
                    locked || correctLocked[i]?.choice ? "default" : "pointer",
                  userSelect: "none",
                }}
              >
                true
              </div>

              {/* FALSE */}
              <div
                onClick={() => {
                  if (!locked && !correctLocked[i]?.choice) {
                    updateField(
                      i,
                      "choice",
                      answers[i].choice === "false" ? "" : "false",
                    );
                  }
                }}
                style={{
                  padding: "4px 12px",
                  borderRadius: "999px",
                  border:
                    answers[i].choice === "false"
                      ? "2px solid #6D2980"
                      : "2px solid transparent",
                  cursor:
                    locked || correctLocked[i]?.choice ? "default" : "pointer",
                  userSelect: "none",
                }}
              >
                false
              </div>

              {/* ❌ choice */}
              {errors[i]?.choice && (
                <span
                  style={{
                    transform: "translateY(-50%)",
                    width: "22px",
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

export default Unit4_Page5_Q3;
