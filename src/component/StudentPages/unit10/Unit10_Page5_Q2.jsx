import React, { useRef, useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Unit10_Page5_Q2 = () => {
  const questions = ["enormous", "lively", "variety", "flexible", "appealing"];

  const [answers, setAnswers] = useState(
    questions.map((q) => Array(q.length).fill("")),
  );

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const inputRefs = useRef([]);

  const handleChange = (questionIndex, charIndex, value) => {
    if (locked) return;

    const char = value.slice(-1);

    const updated = [...answers];

    updated[questionIndex][charIndex] = char;

    setAnswers(updated);

    setResult([]);

    if (char) {
      const nextRef = inputRefs.current[`${questionIndex}-${charIndex + 1}`];

      if (nextRef) {
        nextRef.focus();

        nextRef.select();
      }
    }
  };

  const handleBackspace = (e, questionIndex, charIndex) => {
    if (e.key === "Backspace" && !answers[questionIndex][charIndex]) {
      if (inputRefs.current[`${questionIndex}-${charIndex - 1}`]) {
        inputRefs.current[`${questionIndex}-${charIndex - 1}`].focus();
      }
    }
  };

  const normalize = (arr) => arr.join("").toLowerCase().trim();

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = answers.some((word) =>
      word.some((letter) => !letter.trim()),
    );

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = questions.map((q, i) => {
      const ok = normalize(answers[i]) === q.toLowerCase();

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
    setAnswers(questions.map((q) => q.split("")));

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(questions.map((q) => Array(q.length).fill("")));

    setResult([]);

    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div
        className="div-forall"
        style={{
          minHeight: "62vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* TITLE */}
        <h5 className="header-title-page8 ">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            B
          </span>
          Which vocabulary words have you not written yet? Write them here in
          the order <br /> they are on the list.
        </h5>

        {/* QUESTIONS */}
        <div className="grid grid-cols-2 gap-y-18 gap-x-20">
          {questions.map((word, qIndex) => (
            <div key={qIndex} className="flex items-center gap-6">
              {/* NUMBER */}
              <span className="font-bold text-[22px] w-5">{qIndex + 1}</span>

              {/* LETTER INPUTS */}
              <div className="flex gap-1">
                {word.split("").map((_, charIndex) => (
                  <div key={charIndex} className="relative">
                    <input
                      ref={(el) =>
                        (inputRefs.current[`${qIndex}-${charIndex}`] = el)
                      }
                      type="text"
                      maxLength={1}
                      value={answers[qIndex][charIndex]}
                      disabled={locked || result[qIndex] === true}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) =>
                        handleChange(qIndex, charIndex, e.target.value)
                      }
                      onKeyDown={(e) => handleBackspace(e, qIndex, charIndex)}
                      className={`
                          w-[26px]
                          border-0
                          border-b
                          outline-none
                          bg-transparent
                          text-center
                          text-[20px]
                          text-[#6D2980]
                          font-semibold

                          ${
                            result[qIndex] === false
                              ? "border-[#D1232A]"
                              : "border-black"
                          }
                        `}
                    />
                  </div>
                ))}
              </div>

              {/* X */}
              {result[qIndex] === false && (
                <span
                  style={{
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
                    boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                  }}
                >
                  ✕
                </span>
              )}
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

export default Unit10_Page5_Q2;
