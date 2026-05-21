import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import { HiArrowUpCircle } from "react-icons/hi2";

// IMAGES
import grillImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U5/Page 28/Asset 12.svg";
import foodImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U5/Page 28/Asset 13.svg";

const WB_Unit5_Page28_Q1 = () => {
  const vocabAnswers = [
    "sharks",
    "Mediterranean food",
    "shish kebabs",
    "barbecue",
    "both",
    "entire",
    "recipe",
    "information",
  ];

  const questionAnswer =
    "Can I please have a second plate of the shish kebab dish?";

  const [studentAnswers, setStudentAnswers] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const storyWords = [
    "In",
    "the",
    "summer,",
    "my",
    "family",
    "and",
    "I",
    "went",
    "to",
    "the",
    "Middle",
    "East.",
    "We",
    "started",
    "off",
    "our",
    "vacation",
    "on",
    "the",
    "beach,",
    "and",
    "we",
    "sat",
    "next",
    "to",
    "the",
    "sea.",
    "There",
    "were",
    "some",
    "fish",
    "in",
    "the",
    "water.",
    "Luckily,",
    "there",
    "weren’t",
    "any",
    "sharks!",
    "We",
    "ate",
    "Mediterranean",
    "food.",
    "The",
    "shish",
    "kebabs",
    "were",
    "part",
    "of",
    "a",
    "big",
    "barbecue.",
    "My",
    "sister",
    "and",
    "I",
    "both",
    "shared",
    "a",
    "plate",
    "of",
    "shish",
    "kebabs.",
    "We",
    "ate",
    "the",
    "entire",
    "dish.",
    "It",
    "was",
    "so",
    "delicious",
    "that",
    "my",
    "mom",
    "asked",
    "for",
    "the",
    "recipe.",
    "We",
    "didn’t",
    "know",
    "the",
    "language,",
    "but",
    "we",
    "didn’t",
    "need",
    "to",
    "ask",
    "around",
    "for",
    "help",
    "because",
    "everything",
    "was",
    "written",
    "in",
    "an",
    "information",
    "booklet",
    "in",
    "English.",
    "We",
    "had",
    "lots",
    "of",
    "fun",
    "there.",
  ];

  const clickablePhrases = [
    "sharks!",
    "Mediterranean food.",
    "shish kebabs",
    "barbecue.",
    "both",
    "entire",
    "recipe.",
    "information",
  ];
  const [selectedWords, setSelectedWords] = useState([]);

  const toggleUnderline = (phrase) => {
    if (locked) return;

    if (selectedWords.includes(phrase)) {
      setSelectedWords((prev) => prev.filter((p) => p !== phrase));
    } else {
      setSelectedWords((prev) => [...prev, phrase]);
    }
  };
  const [questionInput, setQuestionInput] = useState("");

  const [result, setResult] = useState([]);

  const [questionResult, setQuestionResult] = useState(undefined);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...studentAnswers];

    updated[i] = value;

    setStudentAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const handleQuestionChange = (value) => {
    if (locked || questionResult === true) return;

    setQuestionInput(value);

    setQuestionResult(undefined);
  };

  const checkAnswers = () => {
    if (locked) return;

    // لازم يعمل underline لكل الكلمات
    const missingUnderlines = clickablePhrases.filter(
      (phrase) => !selectedWords.includes(phrase),
    );

    if (missingUnderlines.length > 0) {
      ValidationAlert.info("Please underline all vocabulary words first.");

      return;
    }

    // لازم يعبي كل الانبوتات
    const hasEmptyInputs = studentAnswers.some((a) => !a.trim());

    if (hasEmptyInputs || !questionInput.trim()) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    // --------------------------------
    // CHECK INPUTS
    // --------------------------------

    const normalizedAnswers = vocabAnswers.map((a) => normalize(a));

    const usedAnswers = [];

    const newResults = studentAnswers.map((answer) => {
      const normalized = normalize(answer);

      const foundIndex = normalizedAnswers.findIndex(
        (a, i) => a === normalized && !usedAnswers.includes(i),
      );

      const ok = foundIndex !== -1;

      if (ok) {
        usedAnswers.push(foundIndex);

        correctCount++;
      }

      return ok;
    });

    // --------------------------------
    // CHECK QUESTION
    // --------------------------------

    const questionOk = normalize(questionInput) === normalize(questionAnswer);

    if (questionOk) {
      correctCount++;
    }

    setResult(newResults);

    setQuestionResult(questionOk);

    // --------------------------------
    // SCORE
    // --------------------------------

    const total = 9;

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
    setStudentAnswers(vocabAnswers);

    setQuestionInput(questionAnswer);

    setSelectedWords(clickablePhrases);

    setResult([true, true, true, true, true, true, true, true]);

    setQuestionResult(true);

    setLocked(true);
  };

  const handleReset = () => {
    setStudentAnswers(["", "", "", "", "", "", "", ""]);

    setQuestionInput("");

    setSelectedWords([]);

    setResult([]);

    setQuestionResult(undefined);

    setLocked(false);
  };
  const inputField = (value, onChange, isWrong, width = "240px") => (
    <div className="relative inline-block">
      <input
        type="text"
        value={value}
        disabled={locked || isWrong === true}
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

          ${isWrong === false ? "border-[#D1232A]" : "border-black"}
        `}
        style={{
          width,
        }}
      />

      {isWrong === false && (
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
      <div className="div-forall text-[18px]">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-6">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            C
          </span>
          Read and write.
        </h5>

        {/* READING BOX */}
        <div className="border-2 border-[#7D3C98] rounded-xl p-5 mb-8">
          <div className="flex gap-5 items-start">
            <div className="leading-normal flex-1">
              <div className="leading-normal flex-1">
                {(() => {
                  let skipCount = 0;

                  return storyWords.map((word, index) => {
                    if (skipCount > 0) {
                      skipCount--;

                      return null;
                    }

                    const matchedPhrase = clickablePhrases.find((phrase) => {
                      const phraseWords = phrase.split(" ");

                      return phraseWords.every(
                        (w, i) => storyWords[index + i] === w,
                      );
                    });

                    if (matchedPhrase) {
                      const phraseWords = matchedPhrase.split(" ");

                      skipCount = phraseWords.length - 1;

                      const selected = selectedWords.includes(matchedPhrase);

                      return (
                        <React.Fragment key={index}>
                          <button
                            type="button"
                            disabled={locked}
                            onClick={() => toggleUnderline(matchedPhrase)}
                            style={{
                              background: "transparent",
                              border: "none",
                              cursor: locked ? "default" : "pointer",
                              borderBottom: selected
                                ? "3px solid #6D2980"
                                : "3px solid transparent",
                              padding: "0 2px",
                              fontSize: "18px",
                            }}
                          >
                            {matchedPhrase}
                          </button>{" "}
                        </React.Fragment>
                      );
                    }

                    return (
                      <React.Fragment key={index}>
                        <span>{word}</span>{" "}
                      </React.Fragment>
                    );
                  });
                })()}
              </div>
            </div>

            <img
              src={grillImg}
              alt=""
              style={{
                width: "250px",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        {/* Q1 */}
        <div className="mb-10">
          <div className="mb-5">
            <span className="flex items-center gap-2">
              <span className="font-bold mr-2">1</span>
              Underline all the vocabulary words and write them down below.
              <HiArrowUpCircle
                style={{
                  color: "#6D2980",
                  fontSize: "26px",
                  flexShrink: 0,
                }}
              />
            </span>
          </div>

          <div className="grid grid-cols-2 gap-y-5 gap-x-14">
            {studentAnswers.map((answer, index) => (
              <div key={index}>
                {inputField(
                  answer,
                  (e) => handleChange(index, e.target.value),
                  result[index],
                  "260px",
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Q2 */}
        <div>
          <div className="flex items-start justify-between gap-8 mb-10">
            <div className="flex-1">
              <div className="mb-5">
                <span className="font-bold mr-2">2</span>
                How would you politely ask the server for a second plate of
                shish kebabs?
              </div>

              {inputField(
                questionInput,
                (e) => handleQuestionChange(e.target.value),
                questionResult,
                "600px",
              )}
            </div>

            <img
              src={foodImg}
              alt=""
              style={{
                width: "170px",
                height: "auto",
                objectFit: "contain",
              }}
            />
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

export default WB_Unit5_Page28_Q1;
