import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import grammer_u1 from "../../../assets/audio/ClassBook/U9/PG 80/cd45pg80-instruction.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const Unit9_Page5_Q2 = () => {
  const questions = [
    "Congratulations",
    "stadium",
    "rush",
    "appointments",
    "exactly",
  ];
  const captions = [
    {
      start: 0.28,
      end: 7.5,
      text: "Page 80, right activities. Exercise B. Listen and write the missing vocabulary words in the blanks.",
    },

    {
      start: 8.68,
      end: 26.739,
      text: "Congratulations, many people yelled as the winning team in their bright blue shirts left the stadium. It had been a great game. There was a rush of people leaving as some raced to get to the appointments they had for that afternoon. The game had started exactly at noon, so some people still had to return to work.",
    },
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
      "Congratulations",
      "stadium",
      "rush",
      "appointments",
      "exactly",
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
        <h5 className="header-title-page8 mb-10">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            B
          </span>
          Listen and write the missing vocabulary words in the blanks.
        </h5>
        <QuestionAudioPlayer
          src={grammer_u1}
          captions={captions}
          stopAtSecond={8.1}
        />
        {/* PARAGRAPH */}
        <div className="text-[20px] leading-[3.1]">
          “{inputField(0, "w-[220px]")}!” many people yelled as the winning
          team, in their bright blue shirts, left the{" "}
          {inputField(1, "w-[250px]")}. It had been a great game.
          <br />
          There was a {inputField(2, "w-[220px]")} of people leaving as some
          raced to get to the {inputField(3, "w-[250px]")} they had for that
          afternoon. The game had started {inputField(4, "w-[240px]")} at noon,
          so some people still had to return to work.
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

export default Unit9_Page5_Q2;
