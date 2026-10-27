import clip0 from "../../../assets/audio/ClassBook/U10/Page 90 - A/Item_001_about_music.mp3";
import clip1 from "../../../assets/audio/ClassBook/U10/Page 90 - A/Item_002_adjectives.mp3";
import clip2 from "../../../assets/audio/ClassBook/U10/Page 90 - A/Item_003_about_farming.mp3";
import clip3 from "../../../assets/audio/ClassBook/U10/Page 90 - A/Item_004_extra.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import { AudioText, AudioFeedback } from "../unit5/ExerciseAudioText";

import React, { useState } from "react";

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

const Review10_Page1_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const categories = {
    music: ["symphony", "composers", "instrument", "moods"],
    adjectives: ["appealing", "enormous", "lively", "flexible"],
    farming: ["harvesting", "acres"],
    extra: ["variety"],
  };

  const allAnswers = [
    ...categories.music,
    ...categories.adjectives,
    ...categories.farming,
    ...categories.extra,
  ];

  const [answers, setAnswers] = useState(Array(16).fill(""));

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

  const isCorrectForColumn = (value, column) => {
    const normalized = normalize(value);

    return categories[column].some((word) => normalize(word) === normalized);
  };

  const checkAnswers = () => {
    if (locked) return;
    audio.stop();

    const filledAnswers = answers.filter((a) => a.trim());

    if (filledAnswers.length < 10) {
      (setAnnouncement(
        String("Please fill in at least 10 blanks.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Please fill in at least 10 blanks."));

      return;
    }

    const usedWords = new Set(
      answers.filter((_, i) => result[i] === true).map(normalize),
    );

    let correctCount = 0;

    const columns = [
      "music",
      "music",
      "music",
      "music",

      "adjectives",
      "adjectives",
      "adjectives",
      "adjectives",

      "farming",
      "farming",
      "farming",
      "farming",

      "extra",
      "extra",
      "extra",
      "extra",
    ];

    const newResults = answers.map((answer, i) => {
      if (result[i] === true) {
        correctCount++;
        return true;
      }
      if (!answer.trim()) return undefined;

      const normalized = normalize(answer);

      const correct = isCorrectForColumn(answer, columns[i]);

      if (!correct) return false;

      if (usedWords.has(normalized)) {
        return undefined;
      }

      usedWords.add(normalized);

      correctCount++;

      return true;
    });

    setResult(newResults);

    const total = allAnswers.length;

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
      "symphony",
      "composers",
      "instrument",
      "moods",

      "appealing",
      "enormous",
      "lively",
      "flexible",

      "harvesting",
      "acres",
      "",
      "",

      "variety",
      "",
      "",
      "",
    ]);

    setResult([
      true,
      true,
      true,
      true,

      true,
      true,
      true,
      true,

      true,
      true,
      undefined,
      undefined,

      true,
      undefined,
      undefined,
      undefined,
    ]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(Array(16).fill(""));

    setResult([]);

    setLocked(false);
  };

  const inputField = (i) => (
    <span className="relative inline-block">
      <input placeholder={"Word"}
        style={{
          ...(result[i] === true ? { borderBottomColor: "#16a34a" } : {}),
        }}
        aria-invalid={result[i] === false}
        title={`Category ${["about music", "adjectives", "about farming", "extra"][Math.floor(i / 4)]}, entry ${(i % 4) + 1}; unused slots may stay empty`}
        aria-label={`Category ${["about music", "adjectives", "about farming", "extra"][Math.floor(i / 4)]}, entry ${(i % 4) + 1}; unused slots may stay empty`}
        {...fieldKeys}
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          w-[170px]
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

  return (
    <div
      data-exercise-scope={"Review10_Page1_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review10_Page1_Q1.jsx"] input:focus-visible,[data-exercise-scope="Review10_Page1_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="Review10_Page1_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div
        className="div-forall "
        style={{
          gap: "50px",
        }}
      >
        {/* TITLE */}
        <ExerciseHeader
          isReview
          sectionLetter="A"
          title={<>Put the vocabulary words into the correct category.</>}
          subTitle="Sort one word at a time by meaning, and recheck each group before submitting your answer."
        />

        {/* CATEGORIES */}
        <div className="grid grid-cols-4 gap-x-10 text-[18px]">
          {/* MUSIC */}
          <div className="flex flex-col items-center gap-10">
            <div
              style={{
                background: "#E9E1EC",
                borderRadius: "12px",
                width: "170px",
                padding: "12px",
                textAlign: "center",
              }}
            >
              <AudioText
                audio={audio}
                id={"audio-0"}
                src={clip0}
                label={"Hear about music"}
              >
                about music
              </AudioText>
            </div>

            {inputField(0)}
            {inputField(1)}
            {inputField(2)}
            {inputField(3)}
          </div>

          {/* ADJECTIVES */}
          <div className="flex flex-col items-center gap-10">
            <div
              style={{
                background: "#E9E1EC",
                borderRadius: "12px",
                width: "170px",
                padding: "12px",
                textAlign: "center",
              }}
            >
              <AudioText
                audio={audio}
                id={"audio-1"}
                src={clip1}
                label={"Hear adjectives"}
              >
                adjectives
              </AudioText>
            </div>

            {inputField(4)}
            {inputField(5)}
            {inputField(6)}
            {inputField(7)}
          </div>

          {/* FARMING */}
          <div className="flex flex-col items-center gap-10">
            <div
              style={{
                background: "#E9E1EC",
                borderRadius: "12px",
                width: "170px",
                padding: "12px",
                textAlign: "center",
              }}
            >
              <AudioText
                audio={audio}
                id={"audio-2"}
                src={clip2}
                label={"Hear about farming"}
              >
                about farming
              </AudioText>
            </div>

            {inputField(8)}
            {inputField(9)}
            {inputField(10)}
            {inputField(11)}
          </div>

          {/* EXTRA */}
          <div className="flex flex-col items-center gap-10">
            <div
              style={{
                background: "#E9E1EC",
                borderRadius: "12px",
                width: "170px",
                padding: "12px",
                textAlign: "center",
              }}
            >
              <AudioText
                audio={audio}
                id={"audio-3"}
                src={clip3}
                label={"Hear extra"}
              >
                extra
              </AudioText>
            </div>

            {inputField(12)}
            {inputField(13)}
            {inputField(14)}
            {inputField(15)}
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

export default Review10_Page1_Q1;
