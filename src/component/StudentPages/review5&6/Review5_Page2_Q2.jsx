import clip0 from "../../../assets/audio/ClassBook/U6/Page 53 - E/Item_001_Could_you_do_your_homework,_please.mp3";
import clip1 from "../../../assets/audio/ClassBook/U6/Page 53 - E/Item_002_Do_your_homework.mp3";
import clip2 from "../../../assets/audio/ClassBook/U6/Page 53 - E/Item_003_By_the_way,_bring_your_jacket.mp3";
import clip3 from "../../../assets/audio/ClassBook/U6/Page 53 - E/Item_004_Would_you_like_to_bring_your_jacket.mp3";
import clip4 from "../../../assets/audio/ClassBook/U6/Page 53 - E/Item_005_We_could_walk_the_dog_together.mp3";
import clip5 from "../../../assets/audio/ClassBook/U6/Page 53 - E/Item_006_Walk_the_dog.mp3";
import clip6 from "../../../assets/audio/ClassBook/U6/Page 53 - E/Item_007_I_would_prefer_to_go_to_the_cinema,_please.mp3";
import clip7 from "../../../assets/audio/ClassBook/U6/Page 53 - E/Item_008_I_want_to_go_to_the_cinema.mp3";
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

const Review5_Page2_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      left: "Could you do your homework, please?",
      right: "Do your homework.",
      correct: "left",
    },

    {
      left: "By the way, bring your jacket.",
      right: "Would you like to bring your jacket?",
      correct: "right",
    },

    {
      left: "We could walk the dog together.",
      right: "Walk the dog.",
      correct: "left",
    },

    {
      left: "I would prefer to go to the cinema, please.",
      right: "I want to go to the cinema.",
      correct: "left",
    },
  ];

  const [selected, setSelected] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const handleSelect = (i, side) => {
    if (locked || result[i] === true) return;

    const updated = [...selected];

    updated[i] = side;

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
    setSelected(["left", "right", "left", "left"]);

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
      data-exercise-scope={"Review5_Page2_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review5_Page2_Q2.jsx"] input:focus-visible,[data-exercise-scope="Review5_Page2_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Review5_Page2_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
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
          sectionLetter="E"
          title={<>Circle the more polite way of asking.</>}
          subTitle="Read all choices first, then select only the option that makes the expression or sentence correct."
        />

        {/* QUESTIONS */}
        <div className="flex flex-col gap-10">
          {questions.map((q, i) => (
            <div
              key={i}
              className="
                  grid
                  grid-cols-[30px_1fr_1fr]
                  gap-10
                  items-start
                "
            >
              {/* NUMBER */}
              <span className="font-bold text-[20px]">{i + 1}</span>

              <div
                style={{
                  borderRadius: 6,
                  ...(selected[i] === "left"
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
                  ...(audio.activeId === `choice-${i}-left`
                    ? { backgroundColor: "#dbeafe" }
                    : {}),
                }}
                {...activationKeys}
                aria-label={`Item ${i + 1}: ${q.left}`}
                aria-disabled={locked || result[i] === true}
                aria-pressed={selected[i] === "left"}
                data-choice={true}
                tabIndex={0}
                role={"button"}
                onClick={() => {
                  audio.play(
                    `choice-${i}-left`,
                    [clip0, clip1, clip2, clip3, clip4, clip5, clip6, clip7][
                      i * 2 + 0
                    ],
                  );
                  handleSelect(i, "left");
                  setAnnouncement("Choice activated.");
                }}
                className="
                    relative
                    cursor-pointer
                    text-[20px]
                    leading-normal
                    inline-block
                    w-fit
                    px-2
                    py-1
                  "
              >
                {/* CIRCLE */}
                {selected[i] === "left" && (
                  <span
                    className="
                      absolute
                      -inset-1.5
                      border-2
                      rounded-full
                      pointer-events-none
                      flex
                      items-center
                      justify-center
                    "
                    style={{
                      borderColor:
                        result[i] === false && q.correct !== "left"
                          ? "#ef4444"
                          : "#6D2980",
                      ...(result[i] === true ? { borderColor: "#16a34a" } : {}),
                    }}
                  >
                    {result[i] === false && q.correct !== "left" && (
                      <span
                        style={{
                          transform: "translateY(-50%)",
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
                          position: "absolute",
                          top: "0px",
                          right: "-8px",
                        }}
                      >
                        ✕
                      </span>
                    )}
                  </span>
                )}

                <span className="relative z-10">{q.left}</span>
                {audio.activeId === `choice-${i}-left` && <AudioSpeaker />}
              </div>

              {/* RIGHT */}
              <div
                style={{
                  borderRadius: 6,
                  ...(selected[i] === "right"
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
                  ...(audio.activeId === `choice-${i}-right`
                    ? { backgroundColor: "#dbeafe" }
                    : {}),
                }}
                {...activationKeys}
                aria-label={`Item ${i + 1}: ${q.right}`}
                aria-disabled={locked || result[i] === true}
                aria-pressed={selected[i] === "right"}
                data-choice={true}
                tabIndex={0}
                role={"button"}
                onClick={() => {
                  audio.play(
                    `choice-${i}-right`,
                    [clip0, clip1, clip2, clip3, clip4, clip5, clip6, clip7][
                      i * 2 + 1
                    ],
                  );
                  handleSelect(i, "right");
                  setAnnouncement("Choice activated.");
                }}
                className="
                      relative
                      cursor-pointer
                      text-[20px]
                      leading-normal
                      inline-block
                      w-fit
                      px-2
                      py-1
                    "
              >
                {/* CIRCLE */}
                {selected[i] === "right" && (
                  <span
                    className="
                      absolute
                      -inset-1.5
                      border-2
                      rounded-full
                      pointer-events-none
                      flex
                      items-center
                      justify-center
                    "
                    style={{
                      borderColor:
                        result[i] === false && q.correct !== "right"
                          ? "#ef4444"
                          : "#6D2980",
                      ...(result[i] === true ? { borderColor: "#16a34a" } : {}),
                    }}
                  >
                    {result[i] === false && q.correct !== "right" && (
                      <span
                        style={{
                          transform: "translateY(-50%)",
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
                          position: "absolute",
                          top: "0px",
                          right: "-8px",
                        }}
                      >
                        ✕
                      </span>
                    )}
                  </span>
                )}

                <span className="relative z-10">{q.right}</span>
                {audio.activeId === `choice-${i}-right` && <AudioSpeaker />}
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

export default Review5_Page2_Q2;
