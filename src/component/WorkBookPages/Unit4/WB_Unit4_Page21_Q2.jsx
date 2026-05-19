import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit4_Page21_Q2 = () => {
  const unscrambleAnswers = [
    "split up",
    "straight ahead",
    "head over",
    "wait a minute",
  ];

  const sentenceAnswers = [
    "head over",
    "wait a minute",
    "split up",
    "straight ahead",
  ];

  const scrambledWords = [
    "slpti pu",
    "rtasigth aedah",
    "ehda eovr",
    "atiw a imunte",
  ];

  const [unscrambleInputs, setUnscrambleInputs] = useState(["", "", "", ""]);

  const [sentenceInputs, setSentenceInputs] = useState(["", "", "", ""]);

  const [unscrambleResults, setUnscrambleResults] = useState([]);

  const [sentenceResults, setSentenceResults] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleUnscrambleChange = (i, value) => {
    if (locked || unscrambleResults[i] === true) return;

    const updated = [...unscrambleInputs];

    updated[i] = value;

    setUnscrambleInputs(updated);

    setUnscrambleResults((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const handleSentenceChange = (i, value) => {
    if (locked || sentenceResults[i] === true) return;

    const updated = [...sentenceInputs];

    updated[i] = value;

    setSentenceInputs(updated);

    setSentenceResults((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = [...unscrambleInputs, ...sentenceInputs].some(
      (a) => !a.trim(),
    );

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newUnscrambleResults = unscrambleInputs.map((answer, i) => {
      const ok = normalize(answer) === normalize(unscrambleAnswers[i]);

      if (ok) correctCount++;

      return ok;
    });

    const newSentenceResults = sentenceInputs.map((answer, i) => {
      const ok = normalize(answer) === normalize(sentenceAnswers[i]);

      if (ok) correctCount++;

      return ok;
    });

    setUnscrambleResults(newUnscrambleResults);

    setSentenceResults(newSentenceResults);

    const total = 8;

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
    setUnscrambleInputs(unscrambleAnswers);

    setSentenceInputs(sentenceAnswers);

    setUnscrambleResults([true, true, true, true]);

    setSentenceResults([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setUnscrambleInputs(["", "", "", ""]);

    setSentenceInputs(["", "", "", ""]);

    setUnscrambleResults([]);

    setSentenceResults([]);

    setLocked(false);
  };

  const inputField = (value, onChange, isWrong, disabled, width = "250px") => (
    <div className="relative inline-block">
      <input
        type="text"
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={`
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6D2980]
          font-semibold
          px-1

          ${isWrong ? "border-[#D1232A]" : "border-black"}
        `}
        style={{
          width,
        }}
      />

      {isWrong && (
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
    </div>
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div
        className="div-forall text-[18px]"
      >
        {/* TITLE */}
        <h5 className="header-title-page8 mb-8">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            B
          </span>
          Unscramble and write. Then use them to fill in the blanks for the
          sentences below.
        </h5>

        {/* UNSCRAMBLE */}
        <div className="flex flex-col gap-5 mb-13">
          {scrambledWords.map((word, index) => (
            <div key={index} className="flex items-center gap-4">
              <span
                style={{
                  letterSpacing: "4px",
                }}
              >
                {word}
              </span>

              {inputField(
                unscrambleInputs[index],
                (e) => handleUnscrambleChange(index, e.target.value),
                unscrambleResults[index] === false,
                locked || unscrambleResults[index] === true,
                "520px",
              )}
            </div>
          ))}
        </div>

        {/* SENTENCES */}
        <div className="flex flex-col gap-8 w-[120%]">
          {/* 1 */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold">1</span>

            <span>Let’s</span>

            {inputField(
              sentenceInputs[0],
              (e) => handleSentenceChange(0, e.target.value),
              sentenceResults[0] === false,
              locked || sentenceResults[0] === true,
              "360px",
            )}

            <span>to the mall.</span>
          </div>

          {/* 2 */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold">2</span>

            {inputField(
              sentenceInputs[1],
              (e) => handleSentenceChange(1, e.target.value),
              sentenceResults[1] === false,
              locked || sentenceResults[1] === true,
              "220px",
            )}

            <span>! I just need to tie my shoelaces before we go inside.</span>
          </div>

          {/* 3 */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold">3</span>

            <span>We</span>

            {inputField(
              sentenceInputs[2],
              (e) => handleSentenceChange(2, e.target.value),
              sentenceResults[2] === false,
              locked || sentenceResults[2] === true,
              "320px",
            )}

            <span>
              and went in different directions. Then we all met again in the
              food court.
            </span>
          </div>

          {/* 4 */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold">4</span>

            <span>The mall is</span>

            {inputField(
              sentenceInputs[3],
              (e) => handleSentenceChange(3, e.target.value),
              sentenceResults[3] === false,
              locked || sentenceResults[3] === true,
              "250px",
            )}

            <span>. You don’t need to go left or right.</span>
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

export default WB_Unit4_Page21_Q2;
