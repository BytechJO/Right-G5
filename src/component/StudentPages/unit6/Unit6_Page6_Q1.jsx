import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import grammer_u1 from "../../../assets/audio/ClassBook/U6/PG 48/cd29pg48-grammar.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const Unit6_Page6_Q1 = () => {
  const questions = [
    "Where does Danny want to go?",

    "Why doesn’t Danny want to ride on the roller coaster?",

    "What does Sam like to do at the carnival?",

    "How are Danny and Sam different?",
  ];

  const correctAnswers = [
    ["Danny wants to go to the movies."],

    ["Danny is afraid of heights."],

    [
      "He likes to ride on the roller coaster.",
      "Sam likes to ride on the roller coaster.",
    ],

    ["Sam likes more dangerous things than Danny."],
  ];
  const captions = [
    {
      start: 0.099,
      end: 10.68,
      text: "Page 48, grammar, modal verbs. I might go to the concert. Shall we go to the concert? James shouldn't take the backpack. Should James take the backpack?",
    },
  ];
  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [locked, setLocked] = useState(false);

  const [result, setResult] = useState([]);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleChange = (i, val) => {
    if (locked || result[i] === true) return;

    const updated = [...answers];

    updated[i] = val;

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
      ValidationAlert.info("Please complete all fields.");

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((ans, i) => {
      const ok = correctAnswers[i].some(
        (correct) => normalize(correct) === normalize(ans),
      );

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = answers.length;

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

  const showAnswers = () => {
    setAnswers([
      correctAnswers[0][0],
      correctAnswers[1][0],
      correctAnswers[2][0],
      correctAnswers[3][0],
    ]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-4">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            D
          </span>
          Listen to the story, and then answer the questions.
        </h5>
        <QuestionAudioPlayer
          src={grammer_u1}
          captions={captions}
          stopAtSecond={1.8}
        />
        {/* BIG CONTAINER */}
        <div className="flex flex-col gap-4">
          {questions.map((q, i) => (
            <div
              key={i}
              className="
                  flex
                  items-start
                  gap-4
                "
            >
              {/* NUMBER */}
              <span
                className="
                    font-bold
                    text-[18px]
                    w-6
                  "
              >
                {i + 1}
              </span>

              {/* CONTENT */}
              <div className="flex-1 relative">
                {/* QUESTION */}
                <div
                  className="
                      text-[18px]
                      mb-4
                      leading-[1.6]
                    "
                >
                  {q}
                </div>

                {/* ANSWER */}
                <input
                  type="text"
                  value={answers[i]}
                  disabled={locked || result[i] === true}
                  onChange={(e) => handleChange(i, e.target.value)}
                  className={`
                      w-full
                      border-0
                      border-b
                      outline-none
                      bg-transparent
                      text-[18px]
                      font-semibold
                      pb-0.5

                      ${
                        result[i] === false
                          ? "border-[#D1232A] text-[#6D2980]"
                          : "border-black text-[#6D2980]"
                      }
                    `}
                />

                {/* WRONG */}
                {result[i] === false && (
                  <span
                    style={{
                      position: "absolute",

                      bottom: "8px",

                      right: "-8px",

                      width: "22px",

                      height: "22px",

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
                    }}
                  >
                    ✕
                  </span>
                )}
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

export default Unit6_Page6_Q1;
