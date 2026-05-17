import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit1_Page5_Q2 = () => {
  const questions = [
    {
      answer: "old",
      options: ["old", "tall"],
    },
    {
      answer: "much",
      options: ["much", "many"],
    },
    {
      answer: "deep",
      options: ["short", "deep"],
    },
    {
      answer: "far",
      options: ["far", "wide"],
    },
  ];

  const [selected, setSelected] = useState(["", "", "", ""]);

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const handleSelect = (i, option) => {
    if (locked || result[i] === true) return;

    const updatedSelected = [...selected];

    updatedSelected[i] = option;

    setSelected(updatedSelected);

    const updatedAnswers = [...answers];

    updatedAnswers[i] = option;

    setAnswers(updatedAnswers);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = selected.some((s) => !s);

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = selected.map((s, i) => {
      const ok = s.toLowerCase() === questions[i].answer.toLowerCase();

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
    setSelected(["old", "much", "deep", "far"]);

    setAnswers(["old", "much", "deep", "far"]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setSelected(["", "", "", ""]);

    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width) => (
    <span className="relative inline-block">
      <input
        type="text"
        value={answers[i]}
        readOnly
        className={`
          ${width}
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6d2980]
          font-semibold
          px-1

          ${result[i] === false ? "border-[#D1232A]" : "border-black"}
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
            fontSize: "11px",
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

  const optionCircle = (i, option) => {
    const active = selected[i] === option;

    return (
      <button
        type="button"
        disabled={locked || result[i] === true}
        onClick={() => handleSelect(i, option)}
        style={{
          position: "relative",
          background: "transparent",
          border: "none",
          fontSize: "18px",
          cursor: locked || result[i] === true ? "default" : "pointer",
          color: "black",
        }}
      >
        {option}

        {active && (
          <span
            style={{
              position: "absolute",
              top: "-7px",
              left: "-10px",
              width: "calc(100% + 20px)",
              height: "38px",
              border: "3px solid #6d2980",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />
        )}
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall ">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-25">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            F
          </span>
          Read and circle.
        </h5>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-15 text-[18px]">
          {/* 1 */}
          <div className="flex items-center justify-between gap-5">
            <div className="flex items-center gap-5 flex-wrap">
              <span className="font-bold">1</span>

              <span>How</span>

              {inputField(0, "w-[120px]")}

              <span>are you? I am 10 years old.</span>
            </div>

            <div className="flex items-center gap-2">
              <span>(</span>

              {optionCircle(0, "old")}

              <span>/</span>

              {optionCircle(0, "tall")}

              <span>)</span>
            </div>
          </div>

          {/* 2 */}
          <div className="flex items-center justify-between gap-5">
            <div className="flex items-center gap-5 flex-wrap">
              <span className="font-bold">2</span>

              <span>How</span>

              {inputField(1, "w-[120px]")}

              <span>does this shirt cost? It costs 13 dollars.</span>
            </div>

            <div className="flex items-center gap-2">
              <span>(</span>

              {optionCircle(1, "much")}

              <span>/</span>

              {optionCircle(1, "many")}

              <span>)</span>
            </div>
          </div>

          {/* 3 */}
          <div className="flex items-center justify-between gap-5">
            <div className="flex items-center gap-5 flex-wrap">
              <span className="font-bold">3</span>

              <span>How</span>

              {inputField(2, "w-[120px]")}

              <span>is this pool? It is three meters deep.</span>
            </div>

            <div className="flex items-center gap-2">
              <span>(</span>

              {optionCircle(2, "short")}

              <span>/</span>

              {optionCircle(2, "deep")}

              <span>)</span>
            </div>
          </div>

          {/* 4 */}
          <div className="flex items-center justify-between gap-5">
            <div className="flex items-center gap-5 flex-wrap">
              <span className="font-bold">4</span>

              <span>How</span>

              {inputField(3, "w-[120px]")}

              <span>did Dad drive? Dad drove 20 kilometers.</span>
            </div>

            <div className="flex items-center gap-2">
              <span>(</span>

              {optionCircle(3, "far")}

              <span>/</span>

              {optionCircle(3, "wide")}

              <span>)</span>
            </div>
          </div>
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

export default WB_Unit1_Page5_Q2;
