import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit2_Page12_Q3 = () => {
  const questions = [
    {
      wrong: "that",
      correct: "who",
    },

    {
      wrong: "who",
      correct: "that",
    },

    {
      wrong: "who",
      correct: "which",
    },

    {
      wrong: "which",
      correct: "who",
    },
  ];

  const sentences = [
    [
      "Henry,",
      "that",
      "is",
      "my",
      "friend,",
      "always",
      "walks",
      "with",
      "me",
      "to",
      "school.",
    ],

    ["The", "car,", "who", "is", "red,", "is", "my", "dad’s", "car."],

    ["We", "saw", "a", "statue", "who", "was", "built", "100", "years", "ago."],

    [
      "I",
      "helped",
      "a",
      "poor",
      "lady,",
      "which",
      "was",
      "carrying",
      "lots",
      "of",
      "groceries.",
    ],
  ];

  const [selectedWords, setSelectedWords] = useState([null, null, null, null]);
  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleCircle = (i, word, wordIndex) => {
    if (locked || result[i] === true) return;

    const updated = [...selectedWords];

    updated[i] = {
      word,
      wordIndex,
    };
    setSelectedWords(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

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

    const hasEmpty =
      answers.some((a) => !a.trim()) || selectedWords.some((s) => !s);

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = questions.map((question, i) => {
      const wrongOk =
        normalize(selectedWords[i]?.word) === normalize(question.wrong);

      const correctOk = normalize(answers[i]) === normalize(question.correct);

      const ok = wrongOk && correctOk;

      if (ok) correctCount++;

      return {
        overall: ok,
        wrongCircle: !wrongOk,
        wrongInput: !correctOk,
      };
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
    setSelectedWords([
      {
        word: "that",
        wordIndex: 1,
      },

      {
        word: "who",
        wordIndex: 2,
      },

      {
        word: "who",
        wordIndex: 4,
      },

      {
        word: "which",
        wordIndex: 5,
      },
    ]);

    setAnswers(["who", "that", "which", "who"]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setSelectedWords(["", "", "", ""]);

    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i) => (
    <div className="relative inline-block ml-3">
      <input
        type="text"
        value={answers[i]}
        disabled={locked || result[i]?.overall === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          w-[180px]
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6D2980]
          font-semibold
          px-1

         ${result[i]?.wrongInput ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {result[i]?.wrongInput && (
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

  const renderSentence = (sentence, qIndex) => {
    return sentence.map((word, wordIndex) => {
      const cleanedWord = word.replace(/[.,?!]/g, "");

      const isSelected = selectedWords[qIndex]?.wordIndex === wordIndex;
      const wrongCircle = result[qIndex]?.wrongCircle && isSelected;
      return (
        <button
          key={wordIndex}
          type="button"
          disabled={locked || result[qIndex]?.overall === true}
          onClick={() => handleCircle(qIndex, cleanedWord, wordIndex)}
          style={{
            position: "relative",
            background: "transparent",
            border: "none",
            padding: "0 3px",
            fontSize: "18px",
            cursor: locked || result[qIndex] === true ? "default" : "pointer",
            lineHeight: "1.8",
          }}
        >
          {word}

          {isSelected && (
            <span
              style={{
                position: "absolute",
                left: "-6px",
                top: "-6px",
                width: "calc(100% + 12px)",
                height: "calc(100% + 12px)",
                border: wrongCircle ? "3px solid #D1232A" : "3px solid #6D2980",
                borderRadius: "50%",
                pointerEvents: "none",
              }}
            />
          )}
          {wrongCircle && (
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
                zIndex: 20,
              }}
            >
              ✕
            </span>
          )}
        </button>
      );
    });
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div
        className="div-forall "
        style={{
          lineHeight: "1.9",
        }}
      >
        {/* TITLE */}
        <h5 className="header-title-page8 mb-[13vh] ">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            I
          </span>
          Read, circle the wrong word, and write the correct one on the line.
        </h5>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-15 text-[18px]">
          {/* 1 */}
          <div className="flex items-center flex-wrap gap-1">
            <span className="font-bold">1</span>

            {renderSentence(sentences[0], 0)}

            {inputField(0)}
          </div>

          {/* 2 */}
          <div className="flex items-center flex-wrap gap-1">
            <span className="font-bold">2</span>

            {renderSentence(sentences[1], 1)}

            {inputField(1)}
          </div>

          {/* 3 */}
          <div className="flex items-center flex-wrap gap-1">
            <span className="font-bold">3</span>

            {renderSentence(sentences[2], 2)}

            {inputField(2)}
          </div>

          {/* 4 */}
          <div className="flex items-center flex-wrap gap-1">
            <span className="font-bold">4</span>

            {renderSentence(sentences[3], 3)}

            {inputField(3)}
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

export default WB_Unit2_Page12_Q3;
