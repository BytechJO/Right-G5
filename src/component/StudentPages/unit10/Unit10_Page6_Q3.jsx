import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import grammer_u1 from "../../../assets/audio/ClassBook/U10/PG 87/cd50pg87-instruction.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const Unit10_Page6_Q3 = () => {
  const captions = [
    {
      start: 0.079,
      end: 8,
      text: "Page 87, right activities exercise F. Listen to the sentences and then write the verb that is in the past progressive.",
    },
    {
      start: 8.32,
      end: 29.18,
      text: "After the game, we were congratulating the team. In addition to playing the guitar, Greg was also practicing the violin. While Sam played in the concert, Joan was listening to the beautiful music. Was the audience singing while the band played? Were the students studying when school ended? Were you baking a cake before Bethany came?",
    },
  ];
  const correctAnswers = [
    "congratulating",
    "playing",
    "practicing",
    "listening",
    "singing",
    "studying",
    "baking",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleChange = (index, value) => {
    if (locked || result[index] === true) return;

    const updated = [...answers];

    updated[index] = value;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[index] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = answers.some((answer) => !answer.trim());

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const usedAnswers = [];

    const newResults = answers.map((answer) => {
      const normalizedAnswer = normalize(answer);

      const matchedIndex = correctAnswers.findIndex(
        (correct, i) =>
          normalize(correct) === normalizedAnswer && !usedAnswers.includes(i),
      );

      const ok = matchedIndex !== -1;

      if (ok) {
        correctCount++;

        usedAnswers.push(matchedIndex);
      }

      return ok;
    });

    setResult(newResults);

    const total = answers.length;

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
      "congratulating",
      "playing",
      "practicing",
      "listening",
      "singing",
      "studying",
      "baking",
    ]);

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", "", "", ""]);

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
      <div
        className="div-forall"
        style={{
          minHeight: "72vh",
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
            F
          </span>
          Listen to the sentences, and then write the verb that is in the past
          progressive.
        </h5>
        <QuestionAudioPlayer
          src={grammer_u1}
          captions={captions}
          stopAtSecond={8}
        />
        {/* QUESTIONS */}
        <div className="grid grid-cols-2 gap-y-20 gap-x-24 mt-10">
          {[1, 2, 3, 4, 5, 6].map((num, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="font-bold text-[18px]">{num}</span>

              {i === 1 ? (
                <div className="flex gap-3">
                  {inputField(1, "w-[120px]")}
                  {inputField(2, "w-[120px]")}
                </div>
              ) : (
                inputField(i > 1 ? i + 1 : i, "w-[260px]")
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

export default Unit10_Page6_Q3;
