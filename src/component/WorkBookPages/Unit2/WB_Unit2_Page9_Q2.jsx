import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

import trueImg from "../../../assets/imgs/true.svg";

const WB_Unit2_Page9_Q2 = () => {
  const questions = [
    {
      correct: 0,
      sentences: [
        "He always stays behind and watches us while we play.",
        "He always trims to watch us while we play.",
      ],
    },

    {
      correct: 0,
      sentences: [
        "Her new schedule works out very fine with us.",
        "Her new schedule begs very fine with us.",
      ],
    },

    {
      correct: 0,
      sentences: [
        "I still have my old toys.",
        "I first thing have my old toys.",
      ],
    },

    {
      correct: 0,
      sentences: [
        "I have a few more things to do.",
        "I have crazy more things to do.",
      ],
    },
  ];

  const [answers, setAnswers] = useState([null, null, null, null]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const handleSelect = (questionIndex, sentenceIndex) => {
    if (locked || result[questionIndex] === true) return;

    const updated = [...answers];

    updated[questionIndex] = sentenceIndex;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[questionIndex] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = answers.some((a) => a === null);

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((answer, i) => {
      const ok = answer === questions[i].correct;

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
    setAnswers([0, 0, 0, 0]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers([null, null, null, null]);

    setResult([]);

    setLocked(false);
  };

  const trueBox = (questionIndex, sentenceIndex) => (
    <button
      type="button"
      disabled={locked || result[questionIndex] === true}
      onClick={() => handleSelect(questionIndex, sentenceIndex)}
      className="flex items-center justify-center"
      style={{
        width: "34px",
        height: "34px",
        border: "2px solid #6D2980",

        borderRadius: "6px",

        background: "transparent",

        cursor:
          locked || result[questionIndex] === true ? "default" : "pointer",
      }}
    >
      {answers[questionIndex] === sentenceIndex && (
        <img
          src={trueImg}
          alt="true"
          style={{
            width: "24px",
            height: "24px",
          }}
        />
      )}
    </button>
  );

  const errorBadge = () => (
    <span
      style={{
        position: "absolute",
        top: "26px",
        right: "-20px",
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
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall ">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-20">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            B
          </span>
          Read and write <span className="font-bold text-[#D1252B]"> ✓</span>.
        </h5>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-8 text-[18px]">
          {questions.map((question, i) => (
            <div key={i} className="flex justify-between gap-6">
              <div className="flex gap-3">
                <span className="font-bold">{i + 1}</span>

                <div>
                  <p>{question.sentences[0]}</p>

                  <p>{question.sentences[1]}</p>
                </div>
              </div>

              <div className="relative flex flex-col gap-2">
                {trueBox(i, 0)}

                {trueBox(i, 1)}

                {result[i] === false && errorBadge()}
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

export default WB_Unit2_Page9_Q2;
