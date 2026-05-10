import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Unit4_Page6_Q1 = () => {
  const correctAnswers = [
    "Does he often go skiing in the winter?",
    "Does she often cook Mexican food for the family?",
    "Do you sometimes like to shop at malls?",
  ];

  const answerText = [
    "No, he rarely goes skiing in the winter.",
    "No, she usually cooks Italian food for the family.",
    "Yes, I sometimes like to shop at Riverside Mall.",
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

  // update
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

    const updatedLocked = answers.map((a, i) => {
      return normalize(a) === normalize(correctAnswers[i]);
    });

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
    <div className="flex justify-center p-[30px]">
      <div className="div-forall">
        {/* HEADER */}
        <h5 className="header-title-page8 mb-15">
          <span className="ex-A" style={{ marginRight: "10px" }}>
            D
          </span>
          Write a question for each answer.
        </h5>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-10 mt-6">
          {[0, 1, 2].map((i) => (
            <div key={i}>
              {/* TOP */}
              <div className="flex items-start gap-5">
                {/* NUMBER */}
                <span className="font-bold text-[18px] mt-2 w-5">{i + 1}</span>

                {/* INPUT */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={answers[i]}
                    disabled={locked || correctLocked[i]}
                    onChange={(e) => handleChange(i, e.target.value)}
                    className={`
                      w-full
                      bg-transparent
                      outline-none
                      border-b
                      text-[20px]
                      pb-1
                      font-semibold
                      text-[#6D2980]
                      ${errors[i] ? "border-red-500" : "border-black"}
                    `}
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

              {/* ANSWER TEXT */}
              <div className="ml-10 mt-6 text-[18px]">{answerText[i]}</div>
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

export default Unit4_Page6_Q1;
