import clip0 from "../../../assets/audio/ClassBook/U6/Page 54 - A/Item_001_half_price.mp3";
import clip1 from "../../../assets/audio/ClassBook/U6/Page 54 - A/Item_002_half_in.mp3";
import clip2 from "../../../assets/audio/ClassBook/U6/Page 54 - A/Item_003_half_off.mp3";
import clip3 from "../../../assets/audio/ClassBook/U6/Page 54 - A/Item_004_on_a_row.mp3";
import clip4 from "../../../assets/audio/ClassBook/U6/Page 54 - A/Item_005_in_a_row.mp3";
import clip5 from "../../../assets/audio/ClassBook/U6/Page 54 - A/Item_006_about_a_row.mp3";
import clip6 from "../../../assets/audio/ClassBook/U6/Page 54 - A/Item_007_made_them.mp3";
import clip7 from "../../../assets/audio/ClassBook/U6/Page 54 - A/Item_008_made_it.mp3";
import clip8 from "../../../assets/audio/ClassBook/U6/Page 54 - A/Item_009_main_it.mp3";
import clip9 from "../../../assets/audio/ClassBook/U6/Page 54 - A/Item_010_get_a_few_in.mp3";
import clip10 from "../../../assets/audio/ClassBook/U6/Page 54 - A/Item_011_try_one_out.mp3";
import clip11 from "../../../assets/audio/ClassBook/U6/Page 54 - A/Item_012_get_one_over.mp3";
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

const Review6_Page1_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      choices: ["half price", "half in", "half off"],

      correct: "half price",
    },

    {
      choices: ["on a row", "in a row", "about a row"],

      correct: "in a row",
    },

    {
      choices: ["made them", "made it", "main it"],

      correct: "made it",
    },

    {
      choices: ["get a few in", "try one out", "get one over"],

      correct: "try one out",
    },
  ];

  const [selected, setSelected] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const handleSelect = (i, choice) => {
    if (locked || result[i] === true) return;

    const updated = [...selected];

    updated[i] = choice;

    setSelected(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;
    audio.stop();

    if (selected.some((s) => !s)) {
      (setAnnouncement(
        String("Please answer all questions.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Please answer all questions."));

      return;
    }

    let correctCount = 0;

    const newResults = selected.map((s, i) => {
      const ok = s === questions[i].correct;

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
    setSelected(["half price", "in a row", "made it", "try one out"]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setSelected(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  return (
    <div
      data-exercise-scope={"Review6_Page1_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review6_Page1_Q1.jsx"] input:focus-visible,[data-exercise-scope="Review6_Page1_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="Review6_Page1_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall" style={{gap:"50px"}}>
        {/* TITLE */}
        <ExerciseHeader
          isReview
          sectionLetter="A"
          title={<>Read and circle the correct expression.</>}
          subTitle="Read all choices first, then select only the option that makes the expression or sentence correct."
        />

        {/* QUESTIONS */}
        <div className="flex flex-col gap-15">
          {questions.map((q, i) => (
            <div
              key={i}
              className="
                  grid
                  grid-cols-[30px_1fr_1fr_1fr]
                  gap-14
                  items-center
                "
            >
              {/* NUMBER */}
              <span className="font-bold text-[18px]">{i + 1}</span>

              {q.choices.map((choice, idx) => {
                const isSelected = selected[i] === choice;

                return (
                  <div
                    style={{
                      borderRadius: 6,
                      ...(selected[i] === choice
                        ? {
                            boxShadow:
                              "0 0 0 2px " +
                              (result[i] === true
                                ? "#16a34a"
                                : result[i] === false
                                  ? "#D1232A"
                                  : "#2563eb"),
                            backgroundColor: "#dbeafe",
                          }
                        : {}),
                      position: "relative",
                      ...(audio.activeId === `choice-${i}-${idx}`
                        ? { backgroundColor: "#dbeafe" }
                        : {}),
                    }}
                    {...activationKeys}
                    aria-label={`Item ${i + 1}, ${choice}`}
                    aria-disabled={locked || result[i] === true}
                    aria-pressed={selected[i] === choice}
                    data-choice={true}
                    tabIndex={0}
                    role={"button"}
                    key={idx}
                    onClick={() => {
                      audio.play(
                        `choice-${i}-${idx}`,
                        [
                          clip0,
                          clip1,
                          clip2,
                          clip3,
                          clip4,
                          clip5,
                          clip6,
                          clip7,
                          clip8,
                          clip9,
                          clip10,
                          clip11,
                        ][i * 3 + idx],
                      );
                      handleSelect(i, choice);
                      setAnnouncement("Choice activated.");
                    }}
                    className="
                      relative
                      cursor-pointer
                      text-[18px]
                      inline-block
                      w-fit
                      px-1.5
                      py-0.5
                    "
                  >
                    {/* CIRCLE */}
                    {isSelected && (
                      <span
                        style={{
                          ...(result[i] === true
                            ? { borderColor: "#16a34a" }
                            : {}),
                        }}
                        className={`
                            absolute
                            -inset-1.5
                            border-2
                            rounded-full
                            pointer-events-none

                            ${
                              result[i] === false && isSelected
                                ? "border-[#D1232A]"
                                : "border-[#6D2980]"
                            }
                          `}
                      ></span>
                    )}

                    {/* WRONG ON SAME CIRCLE */}
                    {result[i] === false && isSelected && (
                      <div
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
                          boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                          zIndex: 20,
                        }}
                      >
                        ✕
                      </div>
                    )}

                    <span className="relative z-10">{choice}</span>
                    {audio.activeId === `choice-${i}-${idx}` && (
                      <AudioSpeaker />
                    )}
                  </div>
                );
              })}
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

export default Review6_Page1_Q1;
