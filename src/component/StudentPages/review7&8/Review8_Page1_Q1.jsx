import clip0 from "../../../assets/audio/ClassBook/U8/Page 72 - A/Item_001_rainbow.mp3";
import clip1 from "../../../assets/audio/ClassBook/U8/Page 72 - A/Item_002_pilot.mp3";
import clip2 from "../../../assets/audio/ClassBook/U8/Page 72 - A/Item_003_crowded.mp3";
import clip3 from "../../../assets/audio/ClassBook/U8/Page 72 - A/Item_004_lean.mp3";
import clip4 from "../../../assets/audio/ClassBook/U8/Page 72 - A/Item_005_hot-air_balloon.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import { AudioText, AudioFeedback } from "../unit5/ExerciseAudioText";

import React, { useState } from "react";

import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 72/SVG/Asset 37.svg";

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

const Review8_Page1_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = ["5", "1", "2", "4", "3"];

  const [answers, setAnswers] = useState(["", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;
    const number = value.trim();
    if (
      number &&
      (!/^[1-5]$/.test(number) ||
        answers.some(
          (answer, index) => index !== i && answer.trim() === number,
        ))
    ) {
      setAnnouncement("Choose an unused number from 1 to 5.");
      return;
    }

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
    setAnswers(["5", "1", "2", "4", "3"]);

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i) => (
    <span className="relative inline-block">
      <input
        maxLength={1}
        inputMode={"numeric"}
        style={{
          ...(result[i] === true ? { boxShadow: "inset 0 -2px #16a34a" } : {}),
        }}
        aria-invalid={!!(result[i] === false)}
        title={`Vocabulary item ${i + 1}, enter its matching picture number from 1 to 5`}
        aria-label={`Vocabulary item ${i + 1}, enter its matching picture number from 1 to 5`}
        {...fieldKeys}
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          w-8
          border-0
          outline-none
          bg-transparent
          text-center
          text-[18px]
          text-[#6D2980]
          font-semibold
          leading-none
          align-middle
          px-1

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
      data-exercise-scope={"Review8_Page1_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review8_Page1_Q1.jsx"] input:focus-visible,[data-exercise-scope="Review8_Page1_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="Review8_Page1_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall" style={{ gap: "50px" }}>
        {/* LEFT SIDE */}

        {/* TITLE */}
        <ExerciseHeader
          isReview
          sectionLetter="A"
          title={<>Label the pictures with the given words.</>}
          subTitle="Use the picture, definition, chart, or grammar clue, then complete each answer before checking."
        />
        <div className="flex items-start gap-60">
          {/* WORDS */}
          <div className="grid grid-cols-2 gap-y-15 gap-x-30 text-[18px] ">
            <div className="flex gap-6">
              <span className="font-bold">1</span>
              <span>
                <AudioText
                  audio={audio}
                  id="word-rainbow"
                  src={clip0}
                  label="Hear rainbow"
                >
                  rainbow
                </AudioText>
              </span>
            </div>

            <div className="flex gap-6">
              <span className="font-bold">2</span>
              <span>
                <AudioText
                  audio={audio}
                  id="word-pilot"
                  src={clip1}
                  label="Hear pilot"
                >
                  pilot
                </AudioText>
              </span>
            </div>

            <div className="flex gap-6">
              <span className="font-bold">3</span>
              <span>
                <AudioText
                  audio={audio}
                  id="word-crowded"
                  src={clip2}
                  label="Hear crowded"
                >
                  crowded
                </AudioText>
              </span>
            </div>

            <div className="flex gap-6">
              <span className="font-bold">4</span>
              <span>
                <AudioText
                  audio={audio}
                  id="word-lean"
                  src={clip3}
                  label="Hear lean"
                >
                  lean
                </AudioText>
              </span>
            </div>

            <div className="flex gap-6 col-span-2">
              <span className="font-bold">5</span>
              <span>
                <AudioText
                  audio={audio}
                  id="word-hot-air balloon"
                  src={clip4}
                  label="Hear hot-air balloon"
                >
                  hot-air balloon
                </AudioText>
              </span>
            </div>
          </div>

          {/* IMAGE SIDE */}
          <div className="relative">
            <img
              src={img}
              alt={
                "Street scene with five empty answer circles beside a hot-air balloon, a rainbow, an airplane with a pilot, a person leaning against a doorway, and a crowd of people."
              }
              style={{
                width: "38vw",
                maxWidth: "420px",
                minWidth: "300px",
                height: "auto",
              }}
            />

            {/* INPUTS */}

            <div
              style={{
                position: "absolute",
                top: "23%",
                left: "15.5%",
              }}
            >
              {inputField(0, "w-[130px]")}
            </div>

            <div
              style={{
                position: "absolute",
                top: "9%",
                right: "22%",
              }}
            >
              {inputField(1, "w-[110px]")}
            </div>

            <div
              style={{
                position: "absolute",
                top: "31%",
                right: "26%",
              }}
            >
              {inputField(2, "w-[90px]")}
            </div>

            <div
              style={{
                position: "absolute",
                top: "46%",
                left: "20%",
              }}
            >
              {inputField(3, "w-[90px]")}
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "13%",
                right: "3.5%",
              }}
            >
              {inputField(4, "w-[120px]")}
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

export default Review8_Page1_Q1;
