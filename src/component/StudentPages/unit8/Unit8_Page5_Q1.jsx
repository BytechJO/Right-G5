import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Unit8_Page5_Q1 = () => {
  const wordBank = [
    "spotted",
    "board game",
    "look like ants",
    "be shocked",
    "Top of the World",
    "second home",
  ];

  const questions = [
    "board game",
    "spotted",
    "second home",
    "be shocked",
    "Top of the World",
    "look like ants",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);

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
      "board game",
      "spotted",
      "second home",
      "be shocked",
      "Top of the World",
      "look like ants",
    ]);

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", "", ""]);

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
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            A
          </span>
          Read and write.
        </h5>

        {/* WORD BOX */}
        <div
          style={{
            width: "760px",
            background: "#E9E1EC",
            borderRadius: "14px",
            padding: "16px 30px",
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            rowGap: "10px",
            margin: "0 auto 35px auto",
            fontSize: "18px",
          }}
        >
          {wordBank.map((word, i) => {
            return <span key={i}>{word}</span>;
          })}
        </div>

        {/* PARAGRAPH */}
        {/* PARAGRAPH */}
        <div className="text-[18px] leading-[3.3]">
          There’s a great new {inputField(0, "w-[180px]")} you can play with
          your friends. I {inputField(1, "w-[130px]")} it at the toy store the
          other day. That toy store is sometimes my {inputField(2, "w-[180px]")}
          . I like to go there a lot to look at the games and play on the
          computer. Anyway, you might {inputField(3, "w-[170px]")} at how fun
          and inexpensive this game is. It’s all about climbing a mountain, so
          it’s called On {inputField(4, "w-[210px]")}. The board in the game has
          a bunch of people on it that {inputField(5, "w-[190px]")} because
          that’s how you will see them when you get to the top of the mountain.
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

export default Unit8_Page5_Q1;
