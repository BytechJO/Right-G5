import clip0 from "../../../assets/audio/ClassBook/U4/Page 35 - F/Item_001_coffee_the_taste_does_bitter.mp3";
import clip1 from "../../../assets/audio/ClassBook/U4/Page 35 - F/Item_002_loud_drums_do_sound_their.mp3";
import clip2 from "../../../assets/audio/ClassBook/U4/Page 35 - F/Item_003_delicious_taste_does_cake_the.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import { SentenceGroup } from "./SentenceAudio";
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
    .replace(/[.,!?;:…“”"()–—-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const Review3_Page2_Q3 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState(["", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);
  const correctAnswers = [
    "Does the coffee taste bitter?",
    "Do their drums sound loud?",
    "Does the cake taste delicious?",
  ];
  const normalize = normalizeAnswer;
  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;
    setAnswers((previous) => previous.map((a, j) => (j === i ? value : a)));
    setResult((previous) => previous.map((v, j) => (j === i ? undefined : v)));
  };
  const input = (i) => (
    <span className="relative inline-block">
      <input
        style={{
          ...(result[i] === true
            ? {
                borderBottomColor: "#16a34a",
              }
            : {}),
        }}
        {...fieldKeys}
        aria-invalid={result[i] === false}
        title={`Question ${i + 1}, reorder the words: ${["coffee the taste does bitter", "loud drums do sound their", "delicious taste does cake the"][i]}`}
        aria-label={`Question ${i + 1}, reorder the words: ${["coffee the taste does bitter", "loud drums do sound their", "delicious taste does cake the"][i]}`}
        disabled={locked || result[i] === true}
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`border-b outline-none text-[#6D2980] font-semibold w-[480px] px-2
        ${result[i] === false ? "border-red-500" : "border-black"}`}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            width: "20px",
            height: "20px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        >
          ✕
        </span>
      )}
    </span>
  );
  const checkAnswers = () => {
    if (locked) return;
    audio.stop();
    if (answers.some((a) => !a.trim())) {
      (setAnnouncement(
        String("Please complete all fields.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Please complete all fields."));
      return;
    }
    let correctCount = 0;
    const res = answers.map((a, i) => {
      const ok = normalize(a) === normalize(correctAnswers[i]);
      if (ok) correctCount++;
      return ok;
    });
    setResult(res);
    const total = correctAnswers.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;
    if (correctCount === total) {
      resetButtonRef.current?.focus({
        preventScroll: true,
      });
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
    setAnnouncement("Correct answers shown and locked.");
    setAnswers(correctAnswers);
    setResult([true, true, true]);
    setLocked(true);
  };
  const handleReset = () => {
    audio.stop();
    setAnnouncement("All answers and feedback cleared.");
    setAnswers(["", "", ""]);
    setResult([]);
    setLocked(false);
  };
  return (
    <div
      data-exercise-scope={"Review3_Page2_Q3.jsx"}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review3_Page2_Q3.jsx"] input:focus-visible,[data-exercise-scope="Review3_Page2_Q3.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall"  style={{gap:"100px"}}>
        <ExerciseHeader
          isReview
          sectionLetter="F"
          title={<>Unscramble and write the questions.</>}
          subTitle="Say the correct expression or sentence first, then reorder the words and check capitalization and punctuation."
        />

        <div className="text-[20px] flex flex-col gap-y-15">
          <SentenceGroup
            label={"Hear the given words for question 1"}
            src={clip0}
            id={"sentence-0"}
            audio={audio}
            className="grid grid-cols-[40px_300px_1fr] items-center gap-4"
          >
            <span className="font-bold">1</span>
            <span>coffee the ? taste does bitter</span>
            {input(0)}
          </SentenceGroup>

          <SentenceGroup
            label={"Hear the given words for question 2"}
            src={clip1}
            id={"sentence-1"}
            audio={audio}
            className="grid grid-cols-[40px_300px_1fr] items-center gap-4"
          >
            <span className="font-bold">2</span>
            <span>loud drums do sound ? their</span>
            {input(1)}
          </SentenceGroup>

          <SentenceGroup
            label={"Hear the given words for question 3"}
            src={clip2}
            id={"sentence-2"}
            audio={audio}
            className="grid grid-cols-[40px_300px_1fr] items-center gap-4"
          >
            <span className="font-bold">3</span>
            <span>? delicious taste does cake the</span>
            {input(2)}
          </SentenceGroup>
        </div>
      </div>

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
          {...activationKeys}
          style={{
            cursor: locked ? "not-allowed" : "pointer",
          }}
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
export default Review3_Page2_Q3;
