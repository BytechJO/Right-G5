import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import img from "../../../assets/imgs/pages/workbook/Right Int WB G5 U2/Page 13/Asset 8.svg";

const WB_Unit2_Page13_Q1 = () => {
  const vocabAnswers = [
    "begs",
    "carnival",
    "merry-go-round",
    "crazy",
    "twisty",
    "couple",
  ];

  const qaAnswers = [
    "They go to the carnival near their school.",
    " They go to the carnival a couple of times a month",
    "The narrator likes rides that are crazy and twisty.",
  ];

  const storyWords = [
    "Wendy,",
    "who",
    "is",
    "my",
    "sister,",
    "always",
    "begs",
    "me",
    "to",
    "play",
    "with",
    "her.",
    "She",
    "loves",
    "to",
    "play",
    "with",
    "my",
    "kite.",
    "She",
    "loves",
    "the",
    "carnival",
    "that",
    "is",
    "near",
    "our",
    "school.",
    "She",
    "wants",
    "me",
    "to",
    "take",
    "her",
    "there",
    "first",
    "thing",
    "after",
    "school.",
    "Whenever",
    "we",
    "go",
    "there,",
    "she",
    "wants",
    "to",
    "ride",
    "the",
    "merry-go-round.",
    "I",
    "like",
    "rides",
    "that",
    "are",
    "crazy",
    "and",
    "twisty.",
    "We",
    "go",
    "to",
    "the",
    "carnival",
    "a",
    "couple",
    "of",
    "times",
    "a",
    "month.",
    "I",
    "love",
    "my",
    "sister",
    "who",
    "is",
    "so",
    "cute.",
  ];

  const [selectedWords, setSelectedWords] = useState([]);

  const [vocabAnswersState, setVocabAnswersState] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [qaAnswersState, setQaAnswersState] = useState(["", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.,?!’']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const toggleUnderline = (startIndex, clause) => {
    if (locked) return;

    let indexes = [];

    const words = clause.split(" ");

    for (let i = 0; i < words.length; i++) {
      indexes.push(startIndex + i);
    }

    const alreadySelected = indexes.every((i) => selectedWords.includes(i));

    if (alreadySelected) {
      setSelectedWords((prev) => prev.filter((i) => !indexes.includes(i)));
    } else {
      setSelectedWords((prev) => [...new Set([...prev, ...indexes])]);
    }
  };

  const handleVocabChange = (i, value) => {
    if (locked || result[i + 3] === true) return;

    const updated = [...vocabAnswersState];

    updated[i] = value;

    setVocabAnswersState(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i + 3] = undefined;

      return copy;
    });
  };

  const handleQaChange = (i, value) => {
    if (locked || result[i + 9] === true) return;

    const updated = [...qaAnswersState];

    updated[i] = value;

    setQaAnswersState(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i + 9] = undefined;

      return copy;
    });
  };
  const checkAnswers = () => {
    if (locked) return;

    const clauses = [
      {
        start: 1,
        text: "who is my sister",
      },

      {
        start: 23,
        text: "that is near our school",
      },

      {
        start: 72,
        text: "who is so cute",
      },
    ];

    const hasEmptyVocab = vocabAnswersState.some((a) => !a.trim());

    const hasEmptyQa = !qaAnswersState[0].trim() || !qaAnswersState[1].trim();

    if (selectedWords.length === 0) {
      ValidationAlert.info("Underline at least one clause.");

      return;
    }

    if (hasEmptyVocab) {
      ValidationAlert.info("Please complete all vocabulary answers.");

      return;
    }

    if (hasEmptyQa) {
      ValidationAlert.info("Please answer all questions.");

      return;
    }

    let correctCount = 0;

    const newResults = [];

    // UNDERLINE RESULTS
    const underlineResults = clauses.map((clause) => {
      const words = clause.text.split(" ");

      let indexes = [];

      for (let i = 0; i < words.length; i++) {
        indexes.push(clause.start + i);
      }

      const ok = indexes.every((idx) => selectedWords.includes(idx));

      if (ok) correctCount++;

      return ok;
    });

    newResults.push(...underlineResults);

    // VOCAB RESULTS
    const usedAnswers = [];

    vocabAnswersState.forEach((userAnswer) => {
      const normalizedUser = normalize(userAnswer);

      const matchedIndex = vocabAnswers.findIndex(
        (correctAnswer, idx) =>
          normalize(correctAnswer) === normalizedUser &&
          !usedAnswers.includes(idx),
      );

      const ok = matchedIndex !== -1;

      newResults.push(ok);

      if (ok) {
        correctCount++;

        usedAnswers.push(matchedIndex);
      }
    });

    // Q5 ONLY
    const q5ok = normalize(qaAnswersState[2]) === normalize(qaAnswers[2]);

    newResults.push(q5ok);

    if (q5ok) correctCount++;

    setResult(newResults);

    const total = 10;

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
    setSelectedWords([1, 2, 3, 4, 23, 24, 25, 26, 27, 72, 73, 74, 75]);

    setVocabAnswersState(vocabAnswers);
    setResult([]);

    setQaAnswersState(qaAnswers);

    setLocked(true);
  };

  const handleReset = () => {
    setSelectedWords([]);

    setVocabAnswersState(["", "", "", "", "", ""]);

    setQaAnswersState(["", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (value, onChange, isWrong) => (
    <div className="relative inline-block w-full">
      <input
        type="text"
        value={value}
        disabled={locked}
        onChange={onChange}
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

          ${isWrong ? "border-[#D1232A]" : "border-black"}
        `}
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
            J
          </span>
          Read and write.
        </h5>

        {/* STORY */}
        <div className="flex gap-8 items-start mb-12">
          <div className="flex-1 leading-[1.9]">
            {storyWords.map((word, index) => {
              const clauses = [
                {
                  start: 1,
                  text: "who is my sister",
                },

                {
                  start: 23,
                  text: "that is near our school",
                },

                {
                  start: 72,
                  text: "who is so cute",
                },
              ];

              const clause = clauses.find((c) => c.start === index);

              const isUnderlined = selectedWords.includes(index);

              return (
                <React.Fragment key={index}>
                  {clause ? (
                    <button
                      type="button"
                      disabled={locked}
                      onClick={() => toggleUnderline(clause.start, clause.text)}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: locked ? "default" : "pointer",
                        borderBottom: isUnderlined
                          ? "3px solid #6D2980"
                          : "3px solid transparent",
                        padding: "0 2px",
                        fontSize: "18px",
                        position: "relative",
                      }}
                    >
                      {word}
                    </button>
                  ) : (
                    <span>{word}</span>
                  )}{" "}
                </React.Fragment>
              );
            })}
          </div>

          <img
            src={img}
            alt=""
            style={{
              width: "260px",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Q1 */}
        <div className="mb-10">
          <div className="mb-4">
            <span className="font-bold mr-2">1</span> Underline the relative
            clauses in the story.
          </div>
        </div>

        {/* Q2 */}
        <div className="mb-10">
          <div className="mb-6">
            <span className="font-bold mr-2">2</span> Write all the vocabulary
            words and expressions used in the story.
          </div>

          <div className="grid grid-cols-3 gap-8">
            {vocabAnswersState.map((answer, i) => (
              <div key={i}>
                {inputField(
                  answer,
                  (e) => handleVocabChange(i, e.target.value),
                  result[i + 3] === false,
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Q3 */}
        <div className="mb-10">
          <div className="mb-4">
            <span className="font-bold mr-2">3</span> Where is the carnival that
            the narrator and her sister go to?
          </div>

          {inputField(
            qaAnswersState[0],
            (e) => handleQaChange(0, e.target.value),
            false,
          )}
        </div>

        {/* Q4 */}
        <div className="mb-10">
          <div className="mb-4">
            <span className="font-bold mr-2">4</span> How often do they go to
            this carnival?
          </div>

          {inputField(
            qaAnswersState[1],
            (e) => handleQaChange(1, e.target.value),
            false,
          )}
        </div>

        {/* Q5 */}
        <div className="mb-10">
          <div className="mb-4">
            <span className="font-bold mr-2">5</span> What kinds of rides does
            the narrator like?
          </div>

          {inputField(
            qaAnswersState[2],
            (e) => handleQaChange(2, e.target.value),
            result[9] === false,
          )}
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

export default WB_Unit2_Page13_Q1;
