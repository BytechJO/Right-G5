import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U3/Page 19/SVG/Asset 17.svg";
import { HiArrowUpCircle } from "react-icons/hi2";

const WB_Unit3_Page19_Q1 = () => {
  const linkingVerbIndexes = [2, 7, 12, 31, 59, 88, 92, 102, 105, 75, 108];

  const qaAnswers = [
    "The weather feels beautiful.",
    "They brought peanut butter and marshmallow sandwiches on rye bread. They also brought chips.",
    "The food is tasty.",
    "Everyone feels happy.",
  ];

  const storyWords = [
    "The",
    "weather",
    "feels",
    "beautiful",
    "today.",
    "The",
    "day",
    "is",
    "bright",
    "and",
    "sunny.",
    "There",
    "is",
    "a",
    "light,",
    "cool",
    "breeze.",
    "Sarah",
    "and",
    "her",
    "family",
    "go",
    "out",
    "for",
    "a",
    "picnic",
    "at",
    "the",
    "park.",
    "The",
    "park",
    "looks",
    "pretty",
    "with",
    "all",
    "the",
    "green",
    "trees",
    "and",
    "grass.",
    "There",
    "are",
    "lots",
    "of",
    "colorful",
    "flowers.",
    "Sarah’s",
    "mom",
    "made",
    "peanut",
    "butter",
    "and",
    "marshmallow",
    "sandwiches",
    "using",
    "rye",
    "bread.",
    "Rye",
    "bread",
    "is",
    "healthy.",
    "They",
    "brought",
    "some",
    "chips,",
    "too.",
    "The",
    "family",
    "sits",
    "near",
    "a",
    "nice",
    "tree.",
    "The",
    "tree",
    "looks",
    "big",
    "and",
    "green.",
    "Sarah",
    "takes",
    "a",
    "bite",
    "of",
    "her",
    "sandwich.",
    "The",
    "food",
    "is",
    "tasty.",
    "The",
    "chips",
    "taste",
    "salty",
    "and",
    "delicious.",
    "The",
    "birds",
    "are",
    "singing",
    "cheerfully.",
    "They",
    "sound",
    "happy.",
    "Everyone",
    "feels",
    "happy",
    "today.",
    "It’s",
    "a",
    "wonderful",
    "day.",
  ];

  const [selectedWords, setSelectedWords] = useState([]);

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const toggleCircle = (index) => {
    if (locked) return;

    if (!linkingVerbIndexes.includes(index)) return;

    if (selectedWords.includes(index)) {
      setSelectedWords(selectedWords.filter((i) => i !== index));
    } else {
      setSelectedWords([...selectedWords, index]);
    }
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

    if (selectedWords.length === 0) {
      ValidationAlert.info("Please circle at least one linking verb.");

      return;
    }

    const hasEmpty = answers.some((a) => !a.trim());

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    linkingVerbIndexes.forEach((index) => {
      if (selectedWords.includes(index)) {
        correctCount++;
      }
    });

    const newResults = answers.map((answer, i) => {
      const ok = normalize(answer) === normalize(qaAnswers[i]);

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = linkingVerbIndexes.length + qaAnswers.length;

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
    setSelectedWords(linkingVerbIndexes);

    setAnswers([
      "The weather feels beautiful.",
      "They brought peanut butter and marshmallow sandwiches on rye bread. They also brought chips.",
      "The food is tasty.",
      "Everyone feels happy.",
    ]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setSelectedWords([]);

    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i) => (
    <div className="relative w-full">
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
    </div>
  );

  const renderStoryWord = (word, index) => {
    const isCorrectWord = linkingVerbIndexes.includes(index);
    const isSelected = selectedWords.includes(index);

    return (
      <button
        key={index}
        type="button"
        disabled={locked || !isCorrectWord}
        onClick={() => toggleCircle(index)}
        style={{
          position: "relative",
          background: "transparent",
          border: "none",
          padding: "0 3px",
          fontSize: "18px",
          cursor: locked || !isCorrectWord ? "default" : "pointer",
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
              border: "3px solid #6D2980",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />
        )}
      </button>
    );
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
            I
          </span>
          Read and write.
        </h5>

        {/* STORY */}
        <div className="mb-10">
          {storyWords.map((word, index) => (
            <React.Fragment key={index}>
              {renderStoryWord(word, index)}{" "}
            </React.Fragment>
          ))}
        </div>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-10">
          {/* 1 */}
          <div>
            <div className="flex gap-3 mb-4">
              <span className="flex items-center gap-2">
                <span className="font-bold mr-2">1</span>
                Circle the linking verbs in the story.
                <HiArrowUpCircle
                  style={{
                    color: "#6D2980",
                    fontSize: "26px",
                    flexShrink: 0,
                  }}
                />
              </span>
            </div>
          </div>

          {/* 2 */}
          <div>
            <div className="flex gap-3 mb-4">
              <span className="font-bold">2</span>

              <span>How does the weather feel in the story?</span>
            </div>

            <div className="pl-7">{inputField(0)}</div>
          </div>

          {/* 3 */}
          <div>
            <div className="flex gap-3 mb-4">
              <span className="font-bold">3</span>

              <span>
                What did Sarah and her family bring with them to the picnic?
              </span>
            </div>

            <div className="pl-7">{inputField(1)}</div>
          </div>

          {/* 4 */}
          <div>
            <div className="flex gap-3 mb-4">
              <span className="font-bold">4</span>

              <span>How does the food taste?</span>
            </div>

            <div className="pl-7">{inputField(2)}</div>
          </div>

          {/* 5 */}
          <div>
            <div className="flex gap-3 mb-4">
              <span className="font-bold">5</span>

              <span>How does everyone feel?</span>
            </div>

            <div className="pl-7">{inputField(3)}</div>
          </div>
        </div>

        {/* IMAGE */}
        <div className="flex justify-center mt-10 mb-10">
          <img
            src={img1}
            alt=""
            style={{
              width: "820px",
              height: "auto",
              objectFit: "contain",
            }}
          />
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

export default WB_Unit3_Page19_Q1;
