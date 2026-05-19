import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit6_Page38_Q1 = () => {
  const questions = [
    {
      before: "We",

      after: "have snow this afternoon if the weather forecast is correct.",

      options: ["might", "must"],

      correct: "might",
    },

    {
      before: "",

      after: "you help me pass out the papers?",

      options: ["May", "Would"],

      correct: "Would",
    },

    {
      before: "You",

      after: "not throw garbage on the floor.",

      options: ["will", "must"],

      correct: "must",
    },

    {
      before: "We",

      after: "go to the park.",

      options: ["could", "should"],

      correct: "should",
    },

    {
      before: "I",

      after: "like another plate of food.",

      options: ["could", "would"],

      correct: "would",
    },

    {
      before: "Let’s ride on the Ferris wheel,",

      after: "we?",

      options: ["shall", "will"],

      correct: "shall",
    },
  ];

  const [selectedAnswers, setSelectedAnswers] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  // ------------------------
  // SELECT OPTION
  // ------------------------

  const handleSelect = (index, option) => {
    if (locked || result[index] === true) return;

    const updated = [...selectedAnswers];

    updated[index] = option;

    setSelectedAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[index] = undefined;

      return copy;
    });
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = selectedAnswers.some((a) => !a);

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = selectedAnswers.map((answer, i) => {
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

  // ------------------------
  // SHOW ANSWERS
  // ------------------------

  const showAnswers = () => {
    setSelectedAnswers(questions.map((q) => q.correct));

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    setSelectedAnswers(["", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // OPTION BUTTON
  // ------------------------

  const optionButton = (questionIndex, option) => {
    const selected = selectedAnswers[questionIndex] === option;

    const wrong =
      result[questionIndex] === false &&
      selected &&
      option !== questions[questionIndex].correct;

    return (
      <button
        type="button"
        disabled={locked || result[questionIndex] === true}
        onClick={() => handleSelect(questionIndex, option)}
        className="relative"
        style={{
          background: "transparent",
          border: selected ? "2px solid #6D2980" : "2px solid transparent",
          borderRadius: "999px",
          padding: "0 5px",
          fontSize: "18px",
          cursor: locked ? "default" : "pointer",
        }}
      >
        {option}

        {wrong && (
          <span
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              width: "18px",
              height: "18px",
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
      </button>
    );
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (index, width) => (
    <input
      type="text"
      readOnly
      value={selectedAnswers[index]}
      className="
        border-0
        border-b
        border-black
        outline-none
        bg-transparent
        text-[18px]
        text-[#6D2980]
        font-semibold
        px-1
      "
      style={{
        width,
      }}
    />
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <h5 className="header-title-page8 mb-10">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            M
          </span>
          Read and circle.
        </h5>

        {/* QUESTIONS */}

        <div className="flex flex-col gap-5 pl-2.5">
          {questions.map((q, index) => (
            <div key={index}>
              <div className="flex items-start gap-3 flex-wrap">
                {/* NUMBER */}

                <span className="font-bold w-[18px]">{index + 1}</span>

                {/* BEFORE */}

                {q.before && <span>{q.before}</span>}

                {/* INPUT + OPTIONS */}

                <div className="flex flex-col items-start">
                  {inputField(index, index === 5 ? "150px" : "160px")}

                  <div className="flex items-center gap-2 mt-1">
                    <span>(</span>

                    {optionButton(index, q.options[0])}

                    <span>/</span>

                    {optionButton(index, q.options[1])}

                    <span>)</span>
                  </div>
                </div>

                {/* AFTER */}

                <span>{q.after}</span>
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

export default WB_Unit6_Page38_Q1;
