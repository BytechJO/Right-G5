import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Review8_Page1_Q2 = () => {
  const wordBank = [
    "hot-air balloon",
    "spotted",
    "I’m shocked",
    "look like ants",
    "second home",
  ];

  const questions = [
    "hot-air balloon",
    "look like ants",
    "I’m shocked",
    "spotted",
    "second home",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...answers];

    updated[i] = value;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((a, i) => {
      const ok = normalize(a) === normalize(questions[i]);

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
    setAnswers([
      "hot-air balloon",
      "look like ants",
      "I’m shocked",
      "spotted",
      "second home",
    ]);

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width) => (
    <span className="relative inline-block">
      <input
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          ${width}
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6D2980]
          font-semibold
          leading-none
          align-middle
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

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-8">
          <span
            style={{
              marginRight: "10px",
            }}
          >
            B
          </span>
          Write the correct words in each blank.
        </h5>

        {/* WORD BOX */}
        <div
          style={{
            width: "770px",
            background: "#E9E1EC",
            borderRadius: "14px",
            padding: "16px 30px",
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            rowGap: "10px",
            margin: "0 auto 35px auto",
            fontSize: "17px",
          }}
        >
          {wordBank.map((word, i) => {
            return <span key={i}>{word}</span>;
          })}
        </div>

        {/* STORY */}
        <div className="text-[17px] leading-[2.2] mb-7">
          <div className="mb-3">
            “Look at the {inputField(0, "w-[220px]")}. It’s up so high.”
          </div>

          <div className="mb-3">
            “Yeah, we probably {inputField(1, "w-[220px]")} down here.
            {inputField(2, "w-[220px]")} they’re flying today. It looks like
            there could be a storm coming soon,” noticed Rick.
          </div>

          <div className="mb-3">
            “Oh, I see what you mean. I hope the balloon pilot has{" "}
            {inputField(3, "w-[220px]")} the clouds already.”
          </div>

          <div className="mb-3">
            Rick offered, “Maybe we don’t want to stay at the park much longer.
            Do you want to come over?”
            <br />
            Frank replied, “Thank you. Your house is getting to be my{" "}
            {inputField(4, "w-[220px]")}. Are you sure your mom won’t mind?”
          </div>

          <div>
            Rick said, “No, she loves having people over. You’re always welcome
            at our house.”
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

export default Review8_Page1_Q2;
