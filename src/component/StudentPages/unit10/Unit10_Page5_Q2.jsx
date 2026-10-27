import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import { AudioFeedback } from "../unit5/ExerciseAudioText";

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
const normalizeAnswer = (text) =>
  text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[‘’']/g, "")
    .replace(/[.,!?;:…“”"–—-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const Unit10_Page5_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = ["enormous", "lively", "variety", "flexible", "appealing"];

  const [answers, setAnswers] = useState(
    questions.map((q) => Array(q.length).fill("")),
  );

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const inputRefs = useRef([]);

  const handleChange = (questionIndex, charIndex, value) => {
    if (locked || result[questionIndex] === true) return;
    const char = value.slice(-1);
    setAnswers((previous) =>
      previous.map((word, i) =>
        i === questionIndex
          ? word.map((old, j) => (j === charIndex ? char : old))
          : word,
      ),
    );
    setResult((previous) => {
      const next = [...previous];
      next[questionIndex] = undefined;
      return next;
    });
    if (char) {
      const next = inputRefs.current[`${questionIndex}-${charIndex + 1}`];
      next?.focus();
      next?.select();
    }
  };

  const handleBackspace = (event, questionIndex, charIndex) => {
    if (event.key === "Enter" || event.key === " ") {
      event.stopPropagation();
      return;
    }
    if (event.key === "Backspace" || event.key === "Delete")
      event.stopPropagation();
    if (locked || result[questionIndex] === true) return;
    let target = charIndex,
      targetQuestion = questionIndex;
    if (event.key === "ArrowLeft") target = Math.max(0, charIndex - 1);
    else if (event.key === "ArrowRight")
      target = Math.min(questions[questionIndex].length - 1, charIndex + 1);
    else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      const delta = event.key === "ArrowDown" ? 1 : -1;
      let row = questionIndex + delta;
      while (row >= 0 && row < questions.length && result[row] === true)
        row += delta;
      if (row >= 0 && row < questions.length) {
        targetQuestion = row;
        target = Math.min(charIndex, questions[row].length - 1);
      }
    } else if (event.key === "Home") target = 0;
    else if (event.key === "End") target = questions[questionIndex].length - 1;
    else if (event.key === "Backspace" && !answers[questionIndex][charIndex])
      target = Math.max(0, charIndex - 1);
    else return;
    event.preventDefault();
    event.stopPropagation();
    const element = inputRefs.current[`${targetQuestion}-${target}`];
    element?.focus();
    element?.select();
  };

  const normalize = (arr) => normalizeAnswer(arr.join(""));

  const checkAnswers = () => {
    if (locked) return;
    audio.stop();

    const hasEmpty = answers.some((word) =>
      word.some((letter) => !letter.trim()),
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

    const newResults = questions.map((q, i) => {
      const ok = normalize(answers[i]) === q.toLowerCase();

      if (ok) correctCount++;

      return ok;
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
    setAnswers(questions.map((q) => q.split("")));

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(questions.map((q) => Array(q.length).fill("")));

    setResult([]);

    setLocked(false);
  };

  return (
    <div
      data-exercise-scope={"Unit10_Page5_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit10_Page5_Q2.jsx"] input:focus-visible,[data-exercise-scope="Unit10_Page5_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Unit10_Page5_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div
        className="div-forall"
        style={{
          minHeight: "62vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* TITLE */}
        <ExerciseHeader
          sectionLetter="B"
          title={
            <>
              Which vocabulary words have you not written yet? Write them here
              in the order they are on the list.
            </>
          }
          subTitle="Review the vocabulary words you already used in Exercise A, then enter only the remaining words in list order."
        />

        {/* QUESTIONS */}
        <div className="grid grid-cols-2 gap-y-18 gap-x-20">
          {questions.map((word, qIndex) => (
            <div key={qIndex} className="flex items-center gap-6">
              {/* NUMBER */}
              <span className="font-bold text-[22px] w-5">{qIndex + 1}</span>

              {/* LETTER INPUTS */}
              <div className="flex gap-1">
                {word.split("").map((_, charIndex) => (
                  <div key={charIndex} className="relative">
                    <input
                      style={{
                        ...(result[qIndex] === true
                          ? { borderBottomColor: "#16a34a" }
                          : {}),
                      }}
                      aria-invalid={result[qIndex] === false}
                      title={`Vocabulary word ${qIndex + 1}, letter ${charIndex + 1} of ${word.length}; remaining words in vocabulary list order`}
                      aria-label={`Vocabulary word ${qIndex + 1}, letter ${charIndex + 1} of ${word.length}; remaining words in vocabulary list order`}
                      {...fieldKeys}
                      ref={(el) =>
                        (inputRefs.current[`${qIndex}-${charIndex}`] = el)
                      }
                      type="text"
                      maxLength={1}
                      value={answers[qIndex][charIndex]}
                      disabled={locked || result[qIndex] === true}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) =>
                        handleChange(qIndex, charIndex, e.target.value)
                      }
                      onKeyDown={(e) => handleBackspace(e, qIndex, charIndex)}
                      className={`
                          w-[26px]
                          border-0
                          border-b
                          outline-none
                          bg-transparent
                          text-center
                          text-[20px]
                          text-[#6D2980]
                          font-semibold

                          ${
                            result[qIndex] === false
                              ? "border-[#D1232A]"
                              : "border-black"
                          }
                        `}
                    />
                  </div>
                ))}
              </div>

              {/* X */}
              {result[qIndex] === false && (
                <span
                  style={{
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
          ))}
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

export default Unit10_Page5_Q2;
