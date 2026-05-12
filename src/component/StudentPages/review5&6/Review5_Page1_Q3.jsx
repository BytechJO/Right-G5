import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Review5_Page1_Q3 = () => {
  const questions = [
    {
      words: [
        "You",
        "would",
        "like",
        "a",
        "new",
        "phone?",
        "What",
        "did",
        "you",
        "have",
        "in",
        "head?",
      ],

      mistake: "head?",

      answer: "mind",
    },

    {
      words: ["Server:", "What", "did", "you", "like", "to", "order?"],

      mistake: "did",

      answer: "would",
    },

    {
      words: [
        "Sarah",
        "is",
        "going",
        "to",
        "ride",
        "a",
        "presentation",
        "for",
        "her",
        "science",
        "class.",
      ],

      mistake: "ride",

      answer: "give",
    },
  ];

  const [selectedWords, setSelectedWords] = useState(["", "", ""]);

  const [answers, setAnswers] = useState(["", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleSelectWord = (i, word) => {
    if (locked || result[i]?.mistake === true) return;

    const updated = [...selectedWords];

    updated[i] = word;

    setSelectedWords(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const handleChange = (i, val) => {
    if (locked || result[i]?.answer === true) return;

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

    const hasEmpty =
      selectedWords.some((s) => !s) || answers.some((a) => !a.trim());

    if (hasEmpty) {
      ValidationAlert.info("Please complete all fields.");

      return;
    }

    let correctCount = 0;

    const newResults = questions.map((q, i) => {
      const mistakeCorrect =
        normalize(selectedWords[i]) === normalize(q.mistake);

      const answerCorrect = normalize(answers[i]) === normalize(q.answer);

      if (mistakeCorrect && answerCorrect) {
        correctCount++;
      }

      return {
        mistake: mistakeCorrect,
        answer: answerCorrect,
      };
    });

    setResult(newResults);

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

  const showAnswers = () => {
    setSelectedWords(["head?", "did", "ride"]);

    setAnswers(["mind", "would", "give"]);

    setResult([
      {
        mistake: true,
        answer: true,
      },

      {
        mistake: true,
        answer: true,
      },

      {
        mistake: true,
        answer: true,
      },
    ]);

    setLocked(true);
  };

  const handleReset = () => {
    setSelectedWords(["", "", ""]);

    setAnswers(["", "", ""]);

    setResult([]);

    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-22">
          <span
            style={{
              marginRight: "10px",
            }}
          >
            C
          </span>
          Read and circle the mistakes. Rewrite the sentences using expressions
          learned.
        </h5>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-10">
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
              <div className="flex-1">
                {/* WORDS */}
                <div
                  className="
                      text-[18px]
                      mb-5
                      leading-[1.8]
                      flex
                      flex-wrap
                      gap-1
                    "
                >
                  {q.words.map((word, idx) => {
                    const selected = selectedWords[i] === word;

                    return (
                      <span
                        key={idx}
                        onClick={() => handleSelectWord(i, word)}
                        className="
                            cursor-pointer
                            relative
                            inline-block
                            px-0.5
                          "
                      >
                        {/* CIRCLE */}
                        {selected && (
                          <span
                            className="
                              absolute
                              -inset-1
                              border-2
                              border-[#6D2980]
                              rounded-full
                              pointer-events-none
                            "
                          ></span>
                        )}

                        <span className="relative z-10">{word}</span>
                        {result[i]?.mistake === false &&
                          selectedWords[i] === word && (
                            <span
                              style={{
                                position: "absolute",
                                top: "-34px",
                                right: "-8px",
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
                              }}
                            >
                              ✕
                            </span>
                          )}
                      </span>
                    );
                  })}
                </div>

                {/* INPUT */}
                <div className="relative">
                  <input
                    type="text"
                    value={answers[i]}
                    disabled={locked || result[i]?.answer === true}
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
                          result[i]?.answer === false
                            ? "border-[#D1232A] text-[#6D2980]"
                            : "border-black text-[#6D2980]"
                        }
                      `}
                  />

                  {/* WRONG */}
                  {result[i]?.answer === false && (
                    <span
                      style={{
                        position: "absolute",

                        top: "-8px",

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

                  {/* WRONG SELECT */}
                </div>
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

export default Review5_Page1_Q3;
