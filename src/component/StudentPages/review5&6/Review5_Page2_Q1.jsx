import clip0 from "../../../assets/audio/ClassBook/U6/Page 53 - D/Item_001_Milton.mp3";
import clip1 from "../../../assets/audio/ClassBook/U6/Page 53 - D/Item_002_Kelly.mp3";
import clip2 from "../../../assets/audio/ClassBook/U6/Page 53 - D/Item_003_Andrew.mp3";
import clip3 from "../../../assets/audio/ClassBook/U6/Page 53 - D/Item_004_Jared.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
  AudioSpeaker,
} from "../unit5/ExerciseAudioText";
import { SentenceGroup, SentencePart } from "../unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// LEFT TABLE IMAGES
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 6 Shall We Should We Folder/Untitled-12.png";
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

// RIGHT TABLE IMAGES

const Review5_Page2_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      answer:
        "Milton doesn’t like to go to the museum. He would prefer to go to the zoo.",
    },
    {
      answer:
        "Kelly doesn’t want to eat inside a restaurant. She would prefer to eat outside in a restaurant.",
    },

    {
      answer:
        "Andrew doesn’t want to go to the playground. He would rather go to the park.",
    },

    {
      answer:
        "Jared doesn’t want to go to the carnival. He would prefer to go to the circus.",
    },
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const handleChange = (i, val) => {
    if (locked || result[i] === true) return;

    const updated = [...answers];

    updated[i] = val;

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
        String("Please complete all fields.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Please complete all fields."));

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((ans, i) => {
      const ok = normalize(ans) === normalize(questions[i].answer);

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = questions.length;

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
      questions[0].answer,
      questions[1].answer,
      questions[2].answer,
      questions[3].answer,
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

  return (
    <div
      data-exercise-scope={"Review5_Page2_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review5_Page2_Q1.jsx"] input:focus-visible,[data-exercise-scope="Review5_Page2_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="Review5_Page2_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall">
        {/* TITLE */}
        <ExerciseHeader
          isReview
          sectionLetter="D"
          title={
            <>
              Read the chart and write sentences using{" "}
              <span className="text-[#1DA1F2]">prefer</span> and{" "}
              <span className="text-[#1DA1F2]">like</span>.
            </>
          }
          subTitle="Use the picture, definition, chart, or grammar clue, then complete each answer before checking."
        />

        <div className="flex justify-center mb-10">
          {/* RIGHT BIG IMAGE */}
          <img
            src={img2}
            alt={
              "Preference chart. Milton: cross above a music performance, tick above an amusement park. Kelly: cross above an indoor restaurant, tick above outdoor tables. Andrew: cross above a playground, tick above a garden path. Jared: cross above a carousel, tick above a circus ring."
            }
            style={{
              width: "500px",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>

        {/* SENTENCES */}
        <div className="flex flex-col gap-8 mb-12">
          {questions.map((q, i) => (
            <div
              label={`Hear ${["Milton", "Kelly", "Andrew", "Jared"][i]}`}
              src={[clip0, clip1, clip2, clip3][i]}
              id={`name-${i}`}
              audio={audio}
              key={i}
              className="
                  flex
                  gap-4
                "
            >
              <span className="font-bold text-[20px] w-6">{i + 1}</span>

              <div className="relative flex-1">
                <input
                  aria-invalid={!!(result[i] === false)}
                  style={{
                    ...(result[i] === true
                      ? { borderBottomColor: "#16a34a" }
                      : {}),
                  }}
                  title={`Chart item ${i + 1}, write sentences using prefer and like`}
                  aria-label={`Chart item ${i + 1}, write sentences using prefer and like`}
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
                      text-[20px]
                      font-semibold
                      pb-1

                      ${
                        result[i] === false
                          ? "border-[#D1232A] text-[#6D2980]"
                          : "border-black text-[#6D2980]"
                      }
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
                      fontSize: "12px",
                      fontWeight: "bold",
                      border: "2px solid white",
                      boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    ✕
                  </span>
                )}
              </div>
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

export default Review5_Page2_Q1;
