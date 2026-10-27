import clip0 from "../../../assets/audio/ClassBook/U10/Page 90 - B/Item_001_It's_your_twist.mp3";
import clip1 from "../../../assets/audio/ClassBook/U10/Page 90 - B/Item_002_a_long_wait_to_go.mp3";
import clip2 from "../../../assets/audio/ClassBook/U10/Page 90 - B/Item_003_huh.mp3";
import clip3 from "../../../assets/audio/ClassBook/U10/Page 90 - B/Item_004_That's_a_bad_point!.mp3";
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

const Review10_Page1_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      phrase: "It’s your twist.",
      mark: "false",
      correction: "It’s your turn.",
    },
    {
      phrase: "a long wait to go",
      mark: "false",
      correction: "a long way to go",
    },
    {
      phrase: "huh?",
      mark: "true",
      correction: "",
    },
    {
      phrase: "That’s a bad point!",
      mark: "false",
      correction: "That’s a good point!",
    },
  ];

  const [marks, setMarks] = useState(["", "", "", ""]);

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const handleMark = (i, value) => {
    if (locked || result[i]?.row === true) return;
    setAnnouncement("Phrase " + (i + 1) + " marked " + value + ".");

    const updatedMarks = [...marks];
    updatedMarks[i] = value;
    setMarks(updatedMarks);

    if (value === "true") {
      const updatedAnswers = [...answers];
      updatedAnswers[i] = "";
      setAnswers(updatedAnswers);
    }

    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  const handleChange = (i, value) => {
    if (locked || result[i]?.row === true || marks[i] === "true") return;

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

    const hasEmptyMark = marks.some((m) => !m);

    const hasEmptyCorrection = marks.some(
      (m, i) => m === "false" && !answers[i].trim(),
    );

    if (hasEmptyMark || hasEmptyCorrection) {
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
      const markOk = marks[i] === q.mark;

      const correctionOk =
        q.mark === "true"
          ? true
          : marks[i] === "true"
            ? false
            : normalize(answers[i]) === normalize(q.correction);

      const rowOk = markOk && correctionOk;

      if (rowOk) correctCount++;

      return {
        mark: markOk,
        correction: correctionOk,
        row: rowOk,
      };
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
    setMarks(["false", "false", "true", "false"]);

    setAnswers([
      "It’s your turn.",
      "a long way to go",
      "",
      "That’s a good point!",
    ]);

    setResult([
      { mark: true, correction: true, row: true },
      { mark: true, correction: true, row: true },
      { mark: true, correction: true, row: true },
      { mark: true, correction: true, row: true },
    ]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setMarks(["", "", "", ""]);

    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const errorBadge = () => (
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
  );

  const markBox = (i, value, img) => (
    <button
      {...activationKeys}
      aria-pressed={marks[i] === value}
      aria-label={`Phrase ${i + 1}, mark ${value}: ${questions[i].phrase}`}
      data-choice={true}
      type="button"
      disabled={locked || result[i]?.row === true}
      onClick={() => handleMark(i, value)}
      className="flex items-center justify-center"
      style={{
        width: "34px",
        height: "34px",
        border: "2px solid #6D2980",
        borderRadius: "6px",

        cursor: locked || result[i]?.row === true ? "default" : "pointer",
        background: marks[i] === value ? "#dbeafe" : "transparent",
        borderColor:
          marks[i] === value && result[i]
            ? result[i].mark
              ? "#16a34a"
              : "#D1232A"
            : "#6D2980",
      }}
    >
      {marks[i] === value && (
        <img
          aria-hidden={true}
          src={img}
          alt={""}
          style={{
            width: "24px",
            height: "24px",
          }}
        />
      )}
    </button>
  );

  const inputField = (i, width) => (
    <span className="relative inline-block">
      <input placeholder={"Correction"}
        style={{
          ...(result[i]?.correction === true && marks[i] === "false"
            ? { borderBottomColor: "#16a34a" }
            : {}),
        }}
        aria-invalid={marks[i] === "false" && result[i]?.correction === false}
        title={`Phrase ${i + 1}: ${questions[i].phrase}; write its correction when marked false`}
        aria-label={`Phrase ${i + 1}: ${questions[i].phrase}; write its correction when marked false`}
        {...fieldKeys}
        type="text"
        value={answers[i]}
        disabled={locked || result[i]?.row === true || marks[i] === "true"}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          ${width}
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6D2980]
          font-semibold
          px-1

         ${
           marks[i] === "false" && result[i]?.correction === false
             ? "border-[#D1232A]"
             : "border-black"
         }
        `}
      />
      {marks[i] === "false" &&
        result[i]?.correction === false &&
        errorBadge()}{" "}
    </span>
  );

  return (
    <div
      data-exercise-scope={"Review10_Page1_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review10_Page1_Q2.jsx"] input:focus-visible,[data-exercise-scope="Review10_Page1_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Review10_Page1_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall "   style={{
          gap:"50px"
        }}>
        {/* TITLE */}
        <ExerciseHeader
          isReview
          sectionLetter="B"
          title={
            <>
              Write a <span className="text-[#D1232A] font-bold">✓</span> or{" "}
              <span className="text-[#D1232A] font-bold">✗</span> to show if the
              phrase is correct or not. Correct the{" "}
              <span className="text-[#D1232A] font-bold">✗</span> phrases.
            </>
          }
          subTitle={
            <>
              Task 1: Mark each phrase ✓ or ✗.
              <br /> Task 2: When you choose ✗, rewrite that phrase correctly in
              the field beside it.
            </>
          }
        />

        {/* QUESTIONS */}
        <div className="flex flex-col gap-12 text-[18px]">
          {questions.map((q, i) => (
            <div
              key={i}
              className="grid grid-cols-[120px_20px_150px_360px] items-center gap-x-6"
            >
              <div className="relative flex items-center justify-center gap-3 border-b border-black pb-2">
                {markBox(i, "true", trueImg)}
                {markBox(i, "false", flaseImg)}

                {result[i]?.mark === false && errorBadge()}
              </div>

              <span className="font-bold">{i + 1}</span>

              <span>
                <AudioText
                  audio={audio}
                  id={`phrase-${i}`}
                  src={[clip0, clip1, clip2, clip3][i]}
                  label={`Hear phrase ${i + 1}: ${q.phrase}`}
                >
                  {q.phrase}
                </AudioText>
              </span>

              {inputField(i, "w-[360px]")}
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

export default Review10_Page1_Q2;
