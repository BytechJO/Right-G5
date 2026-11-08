import clip0 from "../../../assets/audio/ClassBook/U10/Page 91 - E/Item_001_Was_Elaine.mp3";
import clip1 from "../../../assets/audio/ClassBook/U10/Page 91 - E/Item_002_Were.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import { AudioText, AudioFeedback } from "../unit5/ExerciseAudioText";

import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

import trueImg from "../../../assets/imgs/true.svg";
import flaseImg from "../../../assets/imgs/false.svg";
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

const Review10_Page2_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      question: "Was Larry playing the piano?",
      answer: "Yes, he was.",
    },
    {
      question: "Was Elaine listening to the music?",
      answer: "No, she wasn’t.",
    },
    {
      question: "Was Diane beating the drums?",
      answer: "No, she wasn’t.",
    },
    {
      question: "Were Ben and Jake taking tickets?",
      answer: "Yes, they were.",
    },
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

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
    audio.stop();

    const hasEmpty = answers.some((a) => !a.trim());

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

    const newResults = answers.map((a, i) => {
      const qIndex = Math.floor(i / 2);

      const expected =
        i % 2 === 0 ? questions[qIndex].question : questions[qIndex].answer;

      const ok = normalize(a) === normalize(expected);

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

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
    setAnswers([
      "Was Larry playing the piano?",
      "Yes, he was.",

      "Was Elaine listening to the music?",
      "No, she wasn’t.",

      "Was Diane beating the drums?",
      "No, she wasn’t.",

      "Were Ben and Jake taking tickets?",
      "Yes, they were.",
    ]);

    setResult([true, true, true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width) => (
    <span className={`relative inline-block ${width}`}>
      <input placeholder={i%2===0?"Question":"Short answer"}
        style={{
          ...(result[i] === true ? { borderBottomColor: "#16a34a" } : {}),
        }}
        aria-invalid={result[i] === false}
        title={
          i % 2 === 0
            ? `Item ${Math.floor(i / 2) + 1}, write the complete past progressive question`
            : `Item ${Math.floor(i / 2) + 1}, write the short ${Math.floor(i / 2) === 0 || Math.floor(i / 2) === 3 ? "yes" : "no"} answer`
        }
        aria-label={
          i % 2 === 0
            ? `Item ${Math.floor(i / 2) + 1}, write the complete past progressive question`
            : `Item ${Math.floor(i / 2) + 1}, write the short ${Math.floor(i / 2) === 0 || Math.floor(i / 2) === 3 ? "yes" : "no"} answer`
        }
        {...fieldKeys}
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
    </span>
  );

  const answerIcon = (answer) => (
    <img
      src={answer ? trueImg : flaseImg}
      alt={answer ? "Yes cue" : "No cue"}
      style={{
        width: "26px",
        height: "26px",
      }}
    />
  );

  return (
    <div
      data-exercise-scope={"Review10_Page2_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review10_Page2_Q2.jsx"] input:focus-visible,[data-exercise-scope="Review10_Page2_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Review10_Page2_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
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
       gap:"30px"
        }}
      >
        {/* TITLE */}
        <ExerciseHeader
          isReview
          sectionLetter="E"
          title={
            <>
              Use the sentences from Exercise D to ask and answer a question.
              (Use short answers.)
            </>
          }
          subTitle={
            <>
              Task 1: Use each sentence from Exercise D to form the matching
              past-progressive question.
              <br /> Task 2: Give the correct short answer based on the ✓ or ✗
              cue.
            </>
          }
        />

        {/* QUESTIONS */}
        <div className="flex flex-col gap-15 text-[18px]">
          {/* 1 */}
          <div className="grid grid-cols-[30px_1fr_40px_250px] items-center gap-x-5 w-[850px]">
            <span className="font-bold">1</span>

            <div className="flex-1">{inputField(0, "w-full")}</div>

            {answerIcon(true)}

            <div className="w-[210px]">{inputField(1, "w-full")}</div>
          </div>

          {/* 2 */}
          <div className="grid grid-cols-[30px_1fr_40px_250px] items-center gap-x-5 w-[850px]">
            <span className="font-bold">2</span>

            <div className="flex items-center gap-2">
              <span>
                <AudioText
                  audio={audio}
                  id={"question-opening-Was Elaine"}
                  src={clip0}
                  label={"Hear question opening: Was Elaine"}
                >
                  Was Elaine
                </AudioText>
              </span>

              <div className="flex-1">{inputField(2, "w-full")}</div>

              <span>?</span>
            </div>

            {answerIcon(false)}

            <div className="w-[210px]">{inputField(3, "w-full")}</div>
          </div>

          {/* 3 */}
          <div className="grid grid-cols-[30px_1fr_40px_250px] items-center gap-x-5 w-[850px]">
            <span className="font-bold">3</span>

            <div className="flex-1">{inputField(4, "w-full")}</div>

            {answerIcon(false)}

            <div className="w-[210px]">{inputField(5, "w-full")}</div>
          </div>

          {/* 4 */}
          <div className="grid grid-cols-[30px_1fr_40px_250px] items-center gap-x-5 w-[850px]">
            <span className="font-bold">4</span>

            <div className="flex items-center gap-2">
              <span>
                <AudioText
                  audio={audio}
                  id={"question-opening-Were"}
                  src={clip1}
                  label={"Hear question opening: Were"}
                >
                  Were
                </AudioText>
              </span>

              <div className="flex-1">{inputField(6, "w-full")}</div>

              <span>?</span>
            </div>

            {answerIcon(true)}

            <div className="w-[210px]">{inputField(7, "w-full")}</div>
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

export default Review10_Page2_Q2;
