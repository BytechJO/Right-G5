import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Review1_Page1_Q2 = () => {
  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  const questions = [
    { scrambled: "hh-ou!", correct: "uh-oh!" },
    { scrambled: "lelf scelep", correct: "fell asleep" },
    { scrambled: "ghtir yawa", correct: "right away" },
    { scrambled: "no neo dise", correct: "on one side" },
    { scrambled: "ohw od ouy ownk?", correct: "how do you know?" },
  ];

  const normalize = (text) =>
    text
      .toLowerCase()
      .replace(/[!?.]/g, "") // 🔥 يشيل علامات الترقيم
      .replace(/\s+/g, " ")
      .trim();
  const handleChange = (i, value) => {
    if (result[i] === true) return;

    const updated = [...answers];
    updated[i] = value;
    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  const handleCheck = () => {
    if (locked) return;

    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;

    const res = answers.map((answer, i) => {
      const ok = normalize(answer) === normalize(questions[i].correct);
      if (ok) correctCount++;
      return ok;
    });

    setResult(res);

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

  const handleShow = () => {
    setAnswers(questions.map((q) => q.correct));
    setResult([]);
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", ""]);
    setResult([]);
    setLocked(false);
  };

  const input = (i, width = "w-[260px]") => (
    <span className="relative inline-block ml-2">
      <input
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`border-b outline-none text-center text-[#6D2980] font-bold bg-transparent ${width}
          ${result[i] === false ? "border-red-500" : "border-black"}
        `}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
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
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            pointerEvents: "none",
          }}
        >
          ✕
        </span>
      )}
    </span>
  );

  return (
    <div className="p-8 flex flex-col items-center">
      <div className="div-forall">
        <h5 className="header-title-page8 mb-30">
          <span className=" mr-2">B</span>
          Unscramble and write the expression.
        </h5>

        <div className="grid grid-cols-2 gap-x-16 gap-y-20 text-[20px]">
          <div>
            <span className="font-bold mr-4">1</span>
            {questions[0].scrambled}
            {input(0)}
          </div>

          <div>
            <span className="font-bold mr-4">2</span>
            {questions[1].scrambled}
            {input(1)}
          </div>

          <div>
            <span className="font-bold mr-4">3</span>
            {questions[2].scrambled}
            {input(2)}
          </div>

          <div>
            <span className="font-bold mr-4">4</span>
            {questions[3].scrambled}
            {input(3)}
          </div>

          <div className="col-span-2">
            <span className="font-bold mr-4">5</span>
            {questions[4].scrambled}
            {input(4, "w-[470px]")}
          </div>
        </div>

        <div className="action-buttons-container mt-8">
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

export default Review1_Page1_Q2;
