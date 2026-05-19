import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit4_Page24_Q1 = () => {
  const correctWords = [
    "usually",
    "daily",
    "regularly",
    "sometimes",
    "always",
    "occasionally",
    "usually",
    "often",
    "rarely",
    "frequently",
    "always",
    "always",
    "seldom",
    "sometimes",
  ];

  const storyWords = [
    "Fred",
    "usually",
    "has",
    "a",
    "busy",
    "week.",
    "He",
    "brushes",
    "his",
    "teeth",
    "daily.",
    "He",
    "goes",
    "to",
    "school",
    "regularly.",
    "He",
    "sometimes",
    "goes",
    "to",
    "school",
    "with",
    "his",
    "friend",
    "Albert.",
    "He",
    "always",
    "walks",
    "to",
    "school.",
    "He",
    "never",
    "goes",
    "to",
    "school",
    "by",
    "car.",
    "He",
    "occasionally",
    "brings",
    "along",
    "his",
    "little",
    "sister",
    "who",
    "is",
    "in",
    "kindergarten.",
    "However,",
    "she",
    "usually",
    "goes",
    "later",
    "than",
    "he",
    "does.",
    "He",
    "often",
    "brings",
    "his",
    "own",
    "lunch,",
    "which",
    "his",
    "mom",
    "prepares.",
    "He",
    "rarely",
    "buys",
    "lunch",
    "from",
    "the",
    "school",
    "cafeteria.",
    "After",
    "school,",
    "he",
    "and",
    "Albert",
    "frequently",
    "head",
    "over",
    "to",
    "the",
    "grocery",
    "store",
    "to",
    "buy",
    "some",
    "snacks.",
    "He",
    "always",
    "comes",
    "home",
    "before",
    "four",
    "o’clock.",
    "He",
    "always",
    "does",
    "his",
    "homework",
    "after",
    "dinner.",
    "He",
    "seldom",
    "watches",
    "TV",
    "on",
    "weekdays.",
    "He",
    "sometimes",
    "goes",
    "out",
    "with",
    "his",
    "family",
    "on",
    "weekends.",
  ];

  const questionAnswers = [
    "He never goes to school by car.",
    "Fred and his friend frequently head to the grocery store to buy snacks.",
  ];

  const [circledWords, setCircledWords] = useState([]);

  const [studentAnswers, setStudentAnswers] = useState(["", ""]);

  const [results, setResults] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const toggleCircle = (word, index) => {
    if (locked) return;

    const cleanWord = normalize(word);

    if (!correctWords.includes(cleanWord)) return;

    const exists = circledWords.find((item) => item.index === index);

    if (exists) {
      setCircledWords(circledWords.filter((item) => item.index !== index));
    } else {
      setCircledWords([
        ...circledWords,
        {
          word: cleanWord,
          index,
        },
      ]);
    }
  };

  const handleInputChange = (i, value) => {
    if (locked || results[i] === true) return;

    const updated = [...studentAnswers];

    updated[i] = value;

    setStudentAnswers(updated);

    setResults((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    if (circledWords.length === 0) {
      ValidationAlert.info("Please circle at least one adverb.");

      return;
    }

    // فقط نتأكد إنهم مش فاضيين
    if (studentAnswers.some((a) => !a.trim())) {
      ValidationAlert.info("Please answer all questions.");

      return;
    }

    let correctCount = 0;

    // circles
    const correctCircledCount = circledWords.filter((item) =>
      correctWords.includes(item.word),
    ).length;

    correctCount += correctCircledCount;

    // ما في تصحيح للأسئلة الأخيرة
    setResults([true, true]);

    const total = correctWords.length;

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
    const autoCircled = [];

    storyWords.forEach((word, index) => {
      if (correctWords.includes(normalize(word))) {
        autoCircled.push({
          word: normalize(word),
          index,
        });
      }
    });

    setCircledWords(autoCircled);

    setStudentAnswers(questionAnswers);

    setResults([true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setCircledWords([]);

    setStudentAnswers(["", ""]);

    setResults([]);

    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall text-[18px]">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-8">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            H
          </span>
          Read and write.
        </h5>

        {/* STORY */}
        <div
          className="mb-10 leading-loose"
          style={{
            maxWidth: "1000px",
          }}
        >
          {storyWords.map((word, index) => {
            const cleanWord = normalize(word);

            const isCorrect = correctWords.includes(cleanWord);

            const isCircled = circledWords.some((item) => item.index === index);

            return (
              <span
                key={index}
                onClick={() => toggleCircle(word, index)}
                style={{
                  marginRight: "6px",
                  cursor: isCorrect ? "pointer" : "default",
                  border: isCircled
                    ? "2px solid #6D2980"
                    : "2px solid transparent",
                  borderRadius: "999px",
                  padding: "1px 6px",
                  display: "inline-block",
                  transition: "0.2s",
                }}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* QUESTION 1 */}
        <div className="mb-10">
          <div className="flex items-start gap-3 mb-5">
            <span className="font-bold">1</span>

            <span>Circle all the adverbs of frequency in the story.</span>
          </div>
        </div>

        {/* QUESTION 2 */}
        <div className="mb-10">
          <div className="flex items-start gap-3 flex-wrap">
            <span className="font-bold">2</span>

            <span>How often does Fred go to school by car?</span>

            <div className="relative inline-block">
              <input
                type="text"
                value={studentAnswers[0]}
                disabled={locked || results[0] === true}
                onChange={(e) => handleInputChange(0, e.target.value)}
                className={`
                  w-[420px]
                  border-0
                  border-b
                  outline-none
                  bg-transparent
                  text-[18px]
                  text-[#6D2980]
                  font-semibold
                  px-1

                  ${results[0] === false ? "border-[#D1232A]" : "border-black"}
                `}
              />

              {results[0] === false && (
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
                  }}
                >
                  ✕
                </span>
              )}
            </div>
          </div>
        </div>

        {/* QUESTION 3 */}
        <div className="mb-10">
          <div className="flex items-start gap-3 flex-wrap">
            <span className="font-bold">3</span>

            <span>
              How often do Fred and his friend go to the grocery store?
            </span>

            <div className="relative inline-block">
              <input
                type="text"
                value={studentAnswers[1]}
                disabled={locked || results[1] === true}
                onChange={(e) => handleInputChange(1, e.target.value)}
                className={`
                  w-[520px]
                  border-0
                  border-b
                  outline-none
                  bg-transparent
                  text-[18px]
                  text-[#6D2980]
                  font-semibold
                  px-1

                  ${results[1] === false ? "border-[#D1232A]" : "border-black"}
                `}
              />

              {results[1] === false && (
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
                  }}
                >
                  ✕
                </span>
              )}
            </div>
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

export default WB_Unit4_Page24_Q1;
