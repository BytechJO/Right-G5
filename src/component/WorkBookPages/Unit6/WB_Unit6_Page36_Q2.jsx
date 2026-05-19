import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit6_Page36_Q2 = () => {
  const words = [
    "they",
    "if",
    "shall",
    "can",
    "was",
    "might",
    "go",
    "play",
    "the",
    "may",
    "could",

    "were",
    "would",
    "not",
    "like",
    "must",
    "put",
    "of",
    "have",
    "should",
    "will",
    "she",
  ];

  const correctWords = [
    "shall",
    "might",
    "may",
    "could",
    "would",
    "must",
    "should",
    "will",
  ];

  const [selectedWords, setSelectedWords] = useState([]);

  const [wrongWords, setWrongWords] = useState([]);

  const [locked, setLocked] = useState(false);
  const [correctWordsState, setCorrectWordsState] = useState([]);
  // ------------------------
  // TOGGLE WORD
  // ------------------------

  const toggleWord = (word) => {
    if (locked) return;

    // ✅ لا تعدل الصح
    if (correctWordsState.includes(word)) return;

    // ✅ شيل X عن الكلمة المعدلة فقط
    setWrongWords((prev) => prev.filter((w) => w !== word));

    setSelectedWords((prev) => {
      if (prev.includes(word)) {
        return prev.filter((w) => w !== word);
      }

      return [...prev, word];
    });
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (locked) return;

    const wrong = selectedWords.filter((word) => !correctWords.includes(word));

    const missed = correctWords.filter((word) => !selectedWords.includes(word));

    setWrongWords(wrong);
    const correctSelected = selectedWords.filter((word) =>
      correctWords.includes(word),
    );

    setCorrectWordsState(correctSelected);
    const correctCount = correctWords.length - missed.length;

    const total = correctWords.length;

    const score = Math.max(0, correctCount - wrong.length);

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:18px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${score} / ${total}
        </span>
      </div>
    `;

    if (wrong.length === 0 && missed.length === 0) {
      setLocked(true);

      ValidationAlert.success(msg);
    } else if (score === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // ------------------------
  // SHOW ANSWERS
  // ------------------------

  const showAnswers = () => {
    setSelectedWords(correctWords);

    setWrongWords([]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    setSelectedWords([]);

    setWrongWords([]);

    setCorrectWordsState([]);

    setLocked(false);
  };

  // ------------------------
  // WORD BUTTON
  // ------------------------

  const wordButton = (word, index) => {
    const selected = selectedWords.includes(word);

    const wrong = wrongWords.includes(word);
    const correct = correctWordsState.includes(word);
    return (
      <button
        key={index}
        type="button"
        disabled={locked || correct}
        onClick={() => toggleWord(word)}
        className="relative"
        style={{
          background: "transparent",
          border: wrong
            ? "2px solid #D1232A"
            : selected
              ? "2px solid #6D2980"
              : "2px solid transparent",
          borderRadius: "999px",
          padding: "0 6px",
          color: "black",

          cursor: locked ? "default" : "pointer",
        }}
      >
        {word}

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

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall text-[20px] w-full">
        {/* TITLE */}

        <h5 className="header-title-page8 mb-[25vh]">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            I
          </span>
          Circle the <span className="text-[#00AEEF]">modal verbs</span>.
        </h5>

        {/* WORDS */}

        <div className="flex flex-col gap-20 pl-10">
          {/* ROW 1 */}

          <div className="flex flex-wrap gap-x-6 gap-y-3 items-center">
            {words.slice(0, 11).map((word, index) => wordButton(word, index))}
          </div>

          {/* ROW 2 */}

          <div className="flex flex-wrap gap-x-6 gap-y-3 items-center">
            {words.slice(11).map((word, index) => wordButton(word, index + 11))}
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

export default WB_Unit6_Page36_Q2;
