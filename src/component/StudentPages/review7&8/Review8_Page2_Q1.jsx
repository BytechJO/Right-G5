import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import { AudioFeedback } from "../unit5/ExerciseAudioText";

import React, { useState } from "react";

import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 73/SVG/Asset 22.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 73/SVG/Asset 24.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 73/SVG/Asset 25.svg";

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

const Review8_Page2_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    "Did anyone see a rainbow?",
    "Yes, someone saw a rainbow.",
    "Did anyone fly in a hot air balloon?",
    "Yes, someone flew in the hot air balloon.",
    "Did anybody wear winter clothing?",
    "No, nobody wore winter clothing.",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);

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

    if (answers.some((a) => !a.trim())) {
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
      const ok = normalize(a) === normalize(questions[i]);

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
    setAnswers([
      "Did anyone see a rainbow?",
      "Yes, someone saw a rainbow.",
      "Did anyone fly in a hot air balloon?",
      "Yes, someone flew in the hot air balloon.",
      "Did anybody wear winter clothing?",
      "No, nobody wore winter clothing.",
    ]);

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const sentenceInput = (i, width) => (
    <span className="relative inline-block">
      <input
        style={{
          ...(result[i] === true ? { borderBottomColor: "#16a34a" } : {}),
        }}
        aria-invalid={!!(result[i] === false)}
        title={`Picture ${i + 1}, write a sentence using the given clue`}
        aria-label={`Picture ${i + 1}, write a sentence using the given clue`}
        {...fieldKeys}
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
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
    <div
      data-exercise-scope={"Review8_Page2_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review8_Page2_Q1.jsx"] input:focus-visible,[data-exercise-scope="Review8_Page2_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="Review8_Page2_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall" style={{ gap: "30px" }}>
        {/* TITLE */}
        <ExerciseHeader
          isReview
          sectionLetter="D"
          title={
            <>
              Look at the picture, and then write a question and answer for each
              picture.
            </>
          }
          subTitle="Use the prompt and grammar pattern to write a complete sentence, then reread it for meaning, tense, and punctuation."
        />

        {/* QUESTIONS */}
        <div className="flex flex-col gap-5">
          {/* 1 */}
          <div className="flex items-start gap-6">
            <span className="font-bold text-[18px] ">1</span>

            <div className="relative">
              <img
                src={img1}
                alt={"A rainbow in a cloudy sky above mountains."}
                style={{
                  width: "170px",
                  height: "110px",
                }}
              />
            </div>
            <div className="flex flex-col gap-8 mt-3">
              {sentenceInput(0, "w-[600px]")}

              {sentenceInput(1, "w-[600px]")}
            </div>
          </div>

          {/* 2 */}
          <div className="flex items-start gap-6">
            <span className="font-bold text-[18px] ">2</span>

            <div className="relative">
              <img
                src={img2}
                alt={"A colorful hot-air balloon in flight."}
                style={{
                  width: "170px",
                  height: "110px",
                }}
              />
            </div>

            <div className="flex flex-col gap-8 mt-3">
              {sentenceInput(2, "w-[600px]")}

              {sentenceInput(3, "w-[600px]")}
            </div>
          </div>

          {/* 3 */}
          <div className="flex items-start gap-6">
            <span className="font-bold text-[18px] ">3</span>

            <div className="relative">
              <img
                src={img3}
                alt={
                  "A smiling baby outdoors wearing a knitted hat and a scarf."
                }
                style={{
                  width: "170px",
                  height: "110px",
                }}
              />
            </div>

            <div className="flex flex-col gap-8 mt-3">
              {sentenceInput(4, "w-[600px]")}

              {sentenceInput(5, "w-[600px]")}
            </div>
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

export default Review8_Page2_Q1;
