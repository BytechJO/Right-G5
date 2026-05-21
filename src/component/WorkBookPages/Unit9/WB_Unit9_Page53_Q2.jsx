import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit9_Page53_Q2 = () => {
  const leftSide = [
    "If this summer gets too hot,",

    "When Gary learns how to ride a bike,",

    "Karen can bring the desserts",

    "We could make a snowman",

    "When the rain stops,",

    "If we go to the beach,",
  ];

  const rightSide = [
    {
      letter: "a",

      text: "if it snows tomorrow.",
    },

    {
      letter: "b",

      text: "he will join us in a bike race.",
    },

    {
      letter: "c",

      text: "we can collect seashells.",
    },

    {
      letter: "d",

      text: "we might travel to a cooler country.",
    },

    {
      letter: "e",

      text: "we can go out and play.",
    },

    {
      letter: "f",

      text: "when we go on a picnic.",
    },
  ];

  const correctMatches = ["d", "b", "f", "a", "e", "c"];

  const sentenceAnswers = [
    "If this summer gets too hot, we might travel to a cooler country.",

    "When Gary learns how to ride a bike, he will join us in a bike race.",

    "Karen can bring the desserts when we go on a picnic.",

    "We could make a snowman if it snows tomorrow.",

    "When the rain stops, we can go out and play.",

    "If we go to the beach, we can collect seashells.",
  ];

  const [matches, setMatches] = useState(["", "", "", "", "", ""]);

  const [studentAnswers, setStudentAnswers] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [matchResult, setMatchResult] = useState([]);

  const [sentenceResult, setSentenceResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[-.?!,’',]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  // ------------------------
  // MATCH INPUT
  // ------------------------

  const handleMatchChange = (i, value) => {
    if (locked || matchResult[i] === true) return;

    const updated = [...matches];

    updated[i] = value.toLowerCase().slice(0, 1);

    setMatches(updated);

    setMatchResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  // ------------------------
  // SENTENCE INPUT
  // ------------------------

  const handleSentenceChange = (i, value) => {
    if (locked || sentenceResult[i] === true) return;

    const updated = [...studentAnswers];

    updated[i] = value;

    setStudentAnswers(updated);

    setSentenceResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (locked) return;

    const hasEmptyMatch = matches.some((a) => !a.trim());

    const hasEmptySentence = studentAnswers.some((a) => !a.trim());

    if (hasEmptyMatch || hasEmptySentence) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    // MATCHES

    const newMatchResults = matches.map((answer, i) => {
      const ok = normalize(answer) === normalize(correctMatches[i]);

      if (ok) correctCount++;

      return ok;
    });

    // SENTENCES

    const normalizedCorrectAnswers = sentenceAnswers.map((s) => normalize(s));

    const usedAnswers = [];

    const newSentenceResults = studentAnswers.map((answer) => {
      const normalizedAnswer = normalize(answer);

      const matchedIndex = normalizedCorrectAnswers.findIndex(
        (correct, i) =>
          !usedAnswers.includes(i) && normalizedAnswer === correct,
      );

      const ok = matchedIndex !== -1;

      if (ok) {
        usedAnswers.push(matchedIndex);
        correctCount++;
      }

      return ok;
    });
    setMatchResult(newMatchResults);

    setSentenceResult(newSentenceResults);

    const total = correctMatches.length + sentenceAnswers.length;

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

  // ------------------------
  // SHOW ANSWERS
  // ------------------------

  const showAnswers = () => {
    setMatches(correctMatches);

    setStudentAnswers(sentenceAnswers);

    setMatchResult([true, true, true, true, true, true]);

    setSentenceResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    setMatches(["", "", "", "", "", ""]);

    setStudentAnswers(["", "", "", "", "", ""]);

    setMatchResult([]);

    setSentenceResult([]);

    setLocked(false);
  };

  // ------------------------
  // SMALL INPUT
  // ------------------------

  const matchInput = (i) => (
    <div className="relative inline-block">
      <input
        type="text"
        maxLength={1}
        value={matches[i]}
        disabled={locked || matchResult[i] === true}
        onChange={(e) => handleMatchChange(i, e.target.value)}
        className={`
  w-7
  h-7
  border-0
  border-b
  outline-none
  bg-transparent
  text-center
  text-[18px]
  text-[#6D2980]
  font-semibold

  ${matchResult[i] === false ? "border-[#D1232A]" : "border-black"}
`}
      />
    </div>
  );

  // ------------------------
  // BIG INPUT
  // ------------------------

  const sentenceInput = (i) => (
    <div className="relative w-full">
      <input
        type="text"
        value={studentAnswers[i]}
        disabled={locked || sentenceResult[i] === true}
        onChange={(e) => handleSentenceChange(i, e.target.value)}
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

          ${sentenceResult[i] === false ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {sentenceResult[i] === false && (
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
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <h5 className="header-title-page8 mb-10">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            F
          </span>
          Read, match, and write.
        </h5>

        {/* MATCHING */}

        <div className="grid grid-cols-2 gap-x-14 mb-10">
          {/* LEFT */}

          <div className="flex flex-col gap-5">
            {leftSide.map((sentence, index) => (
              <div key={index} className="flex items-start gap-3">
                {matchInput(index)}

                <span className="font-bold">{index + 1}</span>

                <span>{sentence}</span>
              </div>
            ))}
          </div>

          {/* RIGHT */}

          <div className="flex flex-col gap-5">
            {rightSide.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="font-bold">{item.letter}</span>

                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* WRITING */}

        <div className="flex flex-col gap-6 mb-10">
          {sentenceAnswers.map((_, index) => (
            <div key={index} className="flex items-start gap-4">
              <span className="font-bold">{index + 1}</span>

              <div className="flex-1">{sentenceInput(index)}</div>
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

export default WB_Unit9_Page53_Q2;
