import clip0 from "../../../assets/audio/ClassBook/U8/Page 71 - C/Item_001_Mr._Johnson_cleans_the_restaurant.mp3";
import clip1 from "../../../assets/audio/ClassBook/U8/Page 71 - C/Item_002_Clara_rides_her_horse_today.mp3";
import clip2 from "../../../assets/audio/ClassBook/U8/Page 71 - C/Item_003_Mike_and_David_plant_the_seeds.mp3";
import clip3 from "../../../assets/audio/ClassBook/U8/Page 71 - C/Item_004_Tilly_chases_Lolo_around_the_tree.mp3";
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

const Review7_Page2_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    "Mr. Johnson is cleaning the restaurant.",
    "Clara is riding her horse today.",
    "Mike and David are planting the seeds.",
    "Tilly is chasing Lolo around the tree.",
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);

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
      "Mr. Johnson is cleaning the restaurant.",
      "Clara is riding her horse today.",
      "Mike and David are planting the seeds.",
      "Tilly is chasing Lolo around the tree.",
    ]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const sentenceInput = (i, width) => (
    <span className="relative inline-block w-full">
      <input
        style={{
          ...(result[i] === true ? { borderBottomColor: "#16a34a" } : {}),
        }}
        aria-invalid={!!(result[i] === false)}
        title={`Sentence ${i + 1}, rewrite using the present progressive`}
        aria-label={`Sentence ${i + 1}, rewrite using the present progressive`}
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
      data-exercise-scope={"Review7_Page2_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review7_Page2_Q1.jsx"] input:focus-visible,[data-exercise-scope="Review7_Page2_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="Review7_Page2_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall mb-10" style={{gap:"30px"}} >
        {/* TITLE */}
        <ExerciseHeader
          isReview
          sectionLetter="C"
          title={
            <>Read, and then write changing the verb to present progressive.</>
          }
          subTitle="Use the prompt and grammar pattern to write a complete sentence, then reread it for meaning, tense, and punctuation."
        />

        {/* QUESTIONS */}
        <div className="text-[18px] leading-[2.5] flex flex-col gap-6">
          {/* 1 */}
          <div>
            <div className="flex items-center mb-1">
              <span className="font-bold w-10">1</span>

              <span>
                <AudioText
                  audio={audio}
                  id="clue-0"
                  src={clip0}
                  label="Mr. Johnson cleans the restaurant."
                >
                  Mr. Johnson cleans the restaurant.
                </AudioText>
              </span>
            </div>

            <div className="ml-10">{sentenceInput(0, "w-[100%]")}</div>
          </div>

          {/* 2 */}
          <div>
            <div className="flex items-center gap-4 mb-1">
              <div className="flex items-center mb-1">
                <span className="font-bold w-10">2</span>

                <span>
                  <AudioText
                    audio={audio}
                    id="clue-1"
                    src={clip1}
                    label="Clara rides her horse today."
                  >
                    Clara rides her horse today.
                  </AudioText>
                </span>
              </div>
            </div>

            <div className="ml-10">{sentenceInput(1, "w-[100%]")}</div>
          </div>

          {/* 3 */}
          <div>
            <div className="flex items-center gap-4 mb-1">
              <div className="flex items-center mb-1">
                <span className="font-bold w-10">3</span>

                <span>
                  <AudioText
                    audio={audio}
                    id="clue-2"
                    src={clip2}
                    label="Mike and David plant the seeds."
                  >
                    Mike and David plant the seeds.
                  </AudioText>
                </span>
              </div>
            </div>

            <div className="ml-10">{sentenceInput(2, "w-[100%]")}</div>
          </div>

          {/* 4 */}
          <div>
            <div className="flex items-center gap-4 mb-1">
              <div className="flex items-center mb-1">
                <span className="font-bold w-10">4</span>

                <span>
                  <AudioText
                    audio={audio}
                    id="clue-3"
                    src={clip3}
                    label="Tilly chases Lolo around the tree."
                  >
                    Tilly chases Lolo around the tree.
                  </AudioText>
                </span>
              </div>
            </div>

            <div className="ml-10">{sentenceInput(3, "w-[100%]")}</div>
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

export default Review7_Page2_Q1;
