import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Review8_Page2_Q2 = () => {
  const pronouns = [
    "No one",
    "someone",
    "Everybody",
    "something",
    "everybody",
    "No one",
    "anything",
  ];
  const paragraphWords = [
    "No one",
    "knew",
    "how",
    "the",
    "necklace",
    "had",
    "disappeared,",
    "but",
    "someone",
    "must",
    "have",
    "taken",
    "it.",
    "It",
    "was",
    "Mom’s",
    "favorite",
    "necklace.",
    "She",
    "always",
    "kept",
    "it",
    "on",
    "a",
    "necklace",
    "holder",
    "on",
    "her",
    "dresser,",
    "but",
    "it",
    "was",
    "gone.",
    "Everybody",
    "in",
    "our",
    "family",
    "helped",
    "to",
    "look",
    "for",
    "it,",
    "including",
    "our",
    "new",
    "cat,",
    "Mew.",
    "Suddenly,",
    "I",
    "noticed",
    "she",
    "had",
    "stopped",
    "following",
    "me",
    "and",
    "was",
    "playing.",
    "I",
    "looked",
    "over",
    "to",
    "see",
    "what",
    "she",
    "was",
    "doing,",
    "and",
    "I",
    "saw",
    "something",
    "shiny",
    "on",
    "the",
    "carpet",
    "near",
    "Mew.",
    "“Hey,",
    "everybody,",
    "come",
    "here!”",
    "I",
    "yelled.",
    "Mew",
    "had",
    "my",
    "mom’s",
    "necklace",
    "on",
    "the",
    "carpet,",
    "and",
    "she",
    "was",
    "playing",
    "with",
    "it!",
    "No one",
    "had",
    "thought",
    "that",
    "the",
    "thief",
    "might",
    "be",
    "an",
    "“it”",
    "and",
    "not",
    "a",
    "person.",
    "I",
    "remembered",
    "reading",
    "that",
    "cats",
    "like",
    "anything",
    "shiny",
    "to",
    "play",
    "with,",
    "and",
    "that",
    "was",
    "certainly",
    "true",
    "for",
    "our",
    "cat!",
  ];

  const questions = [
    "a necklace",
    "Everybody in the family was helping to look for it.",
    "Mew, the cat, had taken it to play with.",
  ];

  const [answers, setAnswers] = useState(["", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const [selectedWords, setSelectedWords] = useState([]);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,]/g, "")
      .replace(/\s+/g, " ")
      .trim();

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

  const toggleWord = (word, index) => {
    if (locked) return;

    const cleanWord = word.replace(/[.,!?”“]/g, "");

    if (!pronouns.includes(cleanWord)) return;

    const key = `${word}-${index}`;

    // إذا الكلمة محددة مسبقًا لا تسمح بإزالتها
    if (selectedWords.includes(key)) return;

    setSelectedWords((prev) => [...prev, key]);
  };
  const checkAnswers = () => {
    if (locked) return;

    // CHECK EMPTY INPUTS
    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info();

      return;
    }
    if (selectedWords.length === 0) {
      ValidationAlert.info();

      return;
    }
    // CHECK TEXT ANSWERS
    let correctCount = 0;

    const newResults = answers.map((a, i) => {
      const ok = normalize(a) === normalize(questions[i]);

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    // CHECK PRONOUNS
    const correctSelections = [];

    paragraphWords.forEach((word, index) => {
      const cleanWord = word.replace(/[.,!?”“]/g, "");

      if (pronouns.includes(cleanWord)) {
        correctSelections.push(`${word}-${index}`);
      }
    });

    const correctChosen = selectedWords.filter((item) =>
      correctSelections.includes(item),
    );
    // SCORE
    const pronounsScore = correctChosen.length;

    const total = questions.length + correctSelections.length;

    const totalCorrect = correctCount + pronounsScore;

    const color =
      totalCorrect === total ? "green" : totalCorrect === 0 ? "red" : "orange";

    const msg = `
    <div style="font-size:18px;text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${totalCorrect} / ${total}
      </span>
    </div>
  `;

    // SUCCESS
    if (totalCorrect === total) {
      setLocked(true);

      ValidationAlert.success(msg);
    }
    // FAIL
    else if (totalCorrect === 0) {
      ValidationAlert.error(msg);
    }
    // PARTIAL
    else {
      ValidationAlert.warning(msg);
    }
  };

  const showAnswers = () => {
    setAnswers([
      "a necklace",
      "Everybody in the family was helping to look for it.",
      "Mew, the cat, had taken it to play with.",
    ]);

    const correctSelections = [];

    paragraphWords.forEach((word, index) => {
      const cleanWord = word.replace(/[.,!?”“]/g, "");

      if (pronouns.includes(cleanWord)) {
        correctSelections.push(`${word}-${index}`);
      }
    });

    setSelectedWords(correctSelections);
    setResult([true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", ""]);

    setResult([]);
    setSelectedWords([]);

    setLocked(false);
  };

  const sentenceInput = (i) => (
    <span className="relative flex-1">
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
          leading-none
          align-middle
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
      <div className="div-forall">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-8">
          <span
            style={{
              marginRight: "10px",
            }}
          >
            E
          </span>
          Read, and then follow the instructions or answer the questions.
        </h5>

        {/* PARAGRAPH */}
        <div
          style={{
            border: "2px solid #8D3DAF",
            borderRadius: "18px",
            padding: "18px",
            fontSize: "18px",
            lineHeight: "2.3",
            width: "900px",
            marginBottom: "30px",
          }}
        >
          {paragraphWords.map((word, index) => {
            const key = `${word}-${index}`;

            const selected = selectedWords.includes(key);

            return (
              <span
                key={index}
                onClick={() => toggleWord(word, index)}
                style={{
                  display: "inline-block",
                  marginRight: "0px",
                  marginBottom: "2px",
                  padding: "0px 2px",
                  borderRadius: "999px",
                  cursor: locked ? "default" : "pointer",
                  userSelect: "none",
                  position: "relative",
                  border: selected
                    ? "2px solid #6D2980"
                    : "2px solid transparent",

                  transition: "0.2s",
                }}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* QUESTIONS */}
        <div className="text-[18px] leading-[4] mb-7">
          <div className="flex items-center gap-4">
            <span className="font-bold">1</span>

            <span>
              Circle all the indefinite pronouns in the paragraph above.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-bold">2</span>

            <span>What was missing in the family’s house?</span>

            {sentenceInput(0, "w-[320px]")}
          </div>

          <div className="flex items-center gap-4">
            <span className="font-bold">3</span>

            <span>Who was helping to look for it?</span>

            {sentenceInput(1, "w-[430px]")}
          </div>

          <div className="flex items-center gap-4">
            <span className="font-bold">4</span>

            <span>Why had the necklace disappeared?</span>

            {sentenceInput(2, "w-[420px]")}
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

export default Review8_Page2_Q2;
