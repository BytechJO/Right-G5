import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
  AudioSpeaker,
} from "../../StudentPages/unit5/ExerciseAudioText";
import {
  SentenceGroup,
  SentencePart,
} from "../../StudentPages/unit5/SentenceAudio";
import React, { useRef, useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
const activationKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  },
};
const fieldKeys = {
  onKeyDown: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
};

const WB_Unit10_Page60_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const answers = [
    ["a", "c", "r", "e", "s"],
    ["s", "y", "m", "p", "h", "o", "n", "y"],
    ["m", "o", "o", "d", "s"],
    ["f", "l", "e", "x", "i", "b", "l", "e"],
    ["a", "p", "p", "e", "a", "l", "i", "n", "g"],
    ["h", "a", "r", "v", "e", "s", "t", "i", "n", "g"],
  ];

  const items = [
    ["2", "1", "17", "3", "18"],

    ["18", "6", "16", "10", "11", "14", "7", "6"],

    ["16", "14", "14", "20", "18"],

    ["12", "8", "3", "15", "4", "19", "8", "3"],

    ["2", "10", "10", "3", "2", "8", "4", "7", "5"],

    ["11", "2", "17", "13", "3", "18", "9", "4", "7", "5"],
  ];

  const codeItems = [
    [
      "1 = c",
      "2 = a",
      "3 = e",
      "4 = i",
      "5 = g",
      "6 = y",
      "7 = n",
      "8 = l",
      "9 = t",
      "10 = p",
    ],

    [
      "11 = h",
      "12 = f",
      "13 = v",
      "14 = o",
      "15 = x",
      "16 = m",
      "17 = r",
      "18 = s",
      "19 = b",
      "20 = d",
    ],
  ];

  const [studentAnswers, setStudentAnswers] = useState(
    answers.map((word) => word.map((char) => (char === " " ? " " : ""))),
  );

  const [results, setResults] = useState([]);

  const [locked, setLocked] = useState(false);

  const inputRefs = useRef([]);

  const handleChange = (qIndex, inputIndex, value) => {
    if (locked || results[qIndex] === true) return;
    const char = value.slice(-1).toLowerCase();
    if (char && !/^[a-z]$/.test(char)) return;
    setStudentAnswers((prev) =>
      prev.map((row, i) =>
        i === qIndex ? row.map((v, j) => (j === inputIndex ? char : v)) : row,
      ),
    );
    setResults((prev) => prev.map((v, i) => (i === qIndex ? undefined : v)));
    if (char) inputRefs.current[qIndex]?.[inputIndex + 1]?.focus();
  };

  const handleBackspace = (e, qIndex, inputIndex) => {
    if (e.key === "Enter" || e.key === " ") {
      e.stopPropagation();
      return;
    }
    if (!["ArrowLeft", "ArrowRight", "Backspace", "Delete"].includes(e.key))
      return;
    e.preventDefault();
    e.stopPropagation();
    if (locked || results[qIndex] === true) return;
    let next = inputIndex;
    if (e.key === "ArrowLeft") next--;
    else if (e.key === "ArrowRight") next++;
    else {
      if (e.key === "Backspace" && !studentAnswers[qIndex][inputIndex]) next--;
      handleChange(qIndex, Math.max(0, next), "");
    }
    inputRefs.current[qIndex]?.[next]?.focus();
  };

  const checkAnswers = () => {
    if (locked) return;
    audio.stop();

    const hasEmpty = studentAnswers.some((word, qIndex) =>
      word.some(
        (char, i) =>
          answers[qIndex][i] !== " " &&
          answers[qIndex][i] !== undefined &&
          !char.trim(),
      ),
    );

    if (hasEmpty) {
      (setAnnouncement(
        String("Please complete all answers.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Please complete all answers."));

      return;
    }

    let correctCount = 0;

    const newResults = studentAnswers.map((studentWord, qIndex) => {
      const correct =
        studentWord.join("").toLowerCase() ===
        answers[qIndex].join("").toLowerCase();

      if (correct) correctCount++;

      return correct;
    });

    setResults(newResults);

    const total = answers.length;

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
      resetButtonRef.current?.focus({ preventScroll: true });
      setLocked(true);

      (setAnnouncement(
        String(msg)
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.success(msg));
    } else if (correctCount === 0) {
      (setAnnouncement(
        String(msg)
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.error(msg));
    } else {
      (setAnnouncement(
        String(msg)
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.warning(msg));
    }
  };

  const showAnswers = () => {
    audio.stop();
    setAnnouncement("Model answers shown and locked.");
    resetButtonRef.current?.focus({ preventScroll: true });
    setStudentAnswers(answers);

    setResults([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(
      answers.map((word) => word.map((char) => (char === " " ? " " : ""))),
    );

    setResults([]);

    setLocked(false);
  };

  return (
    <div
      data-exercise-scope={"WB_Unit10_Page60_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit10_Page60_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit10_Page60_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit10_Page60_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[18px]" >
        {/* TITLE */}
        <ExerciseHeader
          isWorkbook
          sectionLetter="H"
          title={<>Use the code to find the words.</>}
          subTitle="Decode one symbol or number at a time with the key, then reread the full word to catch any incorrect letter."
        />

        {/* QUESTIONS */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-10 mb-15">
          {answers.map((word, qIndex) => (
            <div key={qIndex} className="flex items-start gap-3">
              <span className="font-bold">{qIndex + 1}</span>

              <div>
                {/* INPUTS */}
                <div className="flex items-center gap-0.5">
                  {word.map((char, inputIndex) => {
                    if (char === " ") {
                      return (
                        <div
                          key={inputIndex}
                          style={{
                            width: "18px",
                          }}
                        />
                      );
                    }

                    return (
                      <div
                        key={inputIndex}
                        className="relative  flex flex-col items-center"
                      >
                        <input
                          style={{
                            borderBottomColor:
                              results[qIndex] === true
                                ? "#16a34a"
                                : results[qIndex] === false
                                  ? "#D1232A"
                                  : undefined,
                          }}
                          aria-invalid={results[qIndex] === false}
                          title={`Word ${qIndex + 1}, letter ${inputIndex + 1}. Code number ${items[qIndex][inputIndex]}; use the visible key below.`}
                          aria-label={`Word ${qIndex + 1}, letter ${inputIndex + 1}. Code number ${items[qIndex][inputIndex]}; use the visible key below.`}
                          {...fieldKeys}
                          ref={(el) => {
                            if (!inputRefs.current[qIndex]) {
                              inputRefs.current[qIndex] = [];
                            }

                            inputRefs.current[qIndex][inputIndex] = el;
                          }}
                          type="text"
                          maxLength={1}
                          value={studentAnswers[qIndex][inputIndex]}
                          disabled={locked || results[qIndex] === true}
                          onFocus={(e) => e.target.select()}
                          onInput={(e) =>
                            handleChange(qIndex, inputIndex, e.target.value)
                          }
                          onKeyDown={(e) =>
                            handleBackspace(e, qIndex, inputIndex)
                          }
                          className={`
                              w-6
                              text-center
                              border-0
                              border-b
                              outline-none
                              bg-transparent
                              text-[18px]
                              text-[#6D2980]
                              font-semibold

                              ${results[qIndex] === false ? "border-[#D1232A]" : "border-black"}
                            `}
                        />

                        <span
                          style={{
                            width: "24px",
                            textAlign: "center",
                            fontSize: "14px",
                            marginTop: "4px",
                          }}
                        >
                          {items[qIndex][inputIndex]}
                        </span>
                        {results[qIndex] === false && inputIndex === 0 && (
                          <span
                            style={{
                              position: "absolute",
                              top: "-8px",
                              right: "15px",
                              width: "20px",
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
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CODE BOX */}
        <div
          style={{
            border: "2px solid #7D3C98",
            borderRadius: "12px",
            padding: "16px 24px",
          }}
        >
          <div className="flex flex-col gap-3">
            {codeItems.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-10 place-items-center gap-y-3"
              >
                {row.map((item, index) => (
                  <span key={index} className="w-full text-center">
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container">
        <button
          {...activationKeys}
          ref={resetButtonRef}
          aria-label={"Start Again"}
          type={"button"}
          className="try-again-button"
          onClick={handleReset}
        >
          Start Again ↻
        </button>

        <button
          {...activationKeys}
          aria-label={"Show Answer"}
          type={"button"}
          className="show-answer-btn"
          onClick={showAnswers}
        >
          Show Answer
        </button>

        <button
          style={{ cursor: locked ? "not-allowed" : "pointer" }}
          {...activationKeys}
          disabled={locked}
          aria-label={"Check Answer"}
          type={"button"}
          className="check-button2"
          onClick={checkAnswers}
        >
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default WB_Unit10_Page60_Q1;
