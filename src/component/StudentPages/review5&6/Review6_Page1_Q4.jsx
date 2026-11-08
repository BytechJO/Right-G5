import clip0 from "../../../assets/audio/ClassBook/U6/Page 54 - D/Item_001_used_when_something_is_possible_but_not_certain.mp3";
import clip1 from "../../../assets/audio/ClassBook/U6/Page 54 - D/Item_002_might.mp3";
import clip2 from "../../../assets/audio/ClassBook/U6/Page 54 - D/Item_003_should.mp3";
import clip3 from "../../../assets/audio/ClassBook/U6/Page 54 - D/Item_004_used_most_often_for_the_future_tense.mp3";
import clip4 from "../../../assets/audio/ClassBook/U6/Page 54 - D/Item_005_must.mp3";
import clip5 from "../../../assets/audio/ClassBook/U6/Page 54 - D/Item_006_will.mp3";
import clip6 from "../../../assets/audio/ClassBook/U6/Page 54 - D/Item_007_used_to_ask_if_it's_possible_something_will_occur.mp3";
import clip7 from "../../../assets/audio/ClassBook/U6/Page 54 - D/Item_008_can.mp3";
import clip8 from "../../../assets/audio/ClassBook/U6/Page 54 - D/Item_009_could.mp3";
import clip9 from "../../../assets/audio/ClassBook/U6/Page 54 - D/Item_010_used_to_ask_if_someone_is_willing_or_wanting_to_do_something.mp3";
import clip10 from "../../../assets/audio/ClassBook/U6/Page 54 - D/Item_011_would.mp3";
import clip11 from "../../../assets/audio/ClassBook/U6/Page 54 - D/Item_012_used_to_ask_if_something_is_able_to_occur.mp3";
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

const Review6_Page1_Q4 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      sentence: "used when something is possible but not certain:",

      left: "might",

      right: "should",

      correct: "might",
    },

    {
      sentence: "used most often for the future tense:",

      left: "must",

      right: "will",

      correct: "will",
    },

    {
      sentence: "used to ask if it’s possible something will occur:",

      left: "can",

      right: "could",

      correct: "could",
    },

    {
      sentence: "used to ask if someone is willing or wanting to do something:",

      left: "must",

      right: "would",

      correct: "would",
    },

    {
      sentence: "used to ask if something is able to occur:",

      left: "can",

      right: "will",

      correct: "can",
    },
  ];

  const [selected, setSelected] = useState(["", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const handleSelect = (i, word) => {
    if (locked || result[i] === true) return;

    const updated = [...selected];

    updated[i] = word;

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
    setSelected(["might", "will", "could", "would", "can"]);

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setSelected(["", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  return (
    <div
      data-exercise-scope={"Review6_Page1_Q4.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review6_Page1_Q4.jsx"] input:focus-visible,[data-exercise-scope="Review6_Page1_Q4.jsx"] textarea:focus-visible,[data-exercise-scope="Review6_Page1_Q4.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
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
          sectionLetter="D"
          title={<>Circle the modal verb that matches the use.</>}
          subTitle="Read all choices first, then select only the option that makes the expression or sentence correct."
        />

        {/* QUESTIONS */}
        <div className="flex flex-col gap-8">
          {questions.map((q, i) => (
            <div
              key={i}
              className="
                  grid
                  grid-cols-[30px_1fr_220px]
                  items-center
                  gap-6
                "
            >
              {/* NUMBER */}
              <span className="font-bold text-[18px]">{i + 1}</span>

              {/* SENTENCE */}
              <SentenceGroup
                label={q.sentence}
                src={[clip0, clip3, clip6, clip9, clip11][i]}
                id={`definition-${i}`}
                audio={audio}
                className="text-[18px]"
              >
                {q.sentence}
              </SentenceGroup>

              {/* OPTIONS */}
              <div
                className="
                    flex
                    items-center
                    gap-2
                    text-[18px]
                  "
              >
                {/* LEFT WORD */}
                <div
                  style={{
                    borderRadius: 6,
                    ...(selected[i] === q.left
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
                  aria-label={`Item ${i + 1}, ${q.left}`}
                  aria-disabled={locked || result[i] === true}
                  aria-pressed={selected[i] === q.left}
                  data-choice={true}
                  tabIndex={0}
                  role={"button"}
                  onClick={() => {
                    audio.play(
                      `choice-${i}-left`,
                      [clip1, clip4, clip7, clip4, clip7][i],
                    );
                    handleSelect(i, q.left);
                    setAnnouncement("Choice activated.");
                  }}
                  className="
                      relative
                      cursor-pointer
                      inline-block
                      px-1
                      py-px
                    "
                >
                  {selected[i] === q.left && (
                    <span
                      style={{
                        ...(result[i] === true
                          ? { borderColor: "#16a34a" }
                          : {}),
                      }}
                      className={`
                          absolute
                          inset-[-5px]
                          border-2
                          rounded-full
                          pointer-events-none

                          ${
                            result[i] === false
                              ? "border-[#D1232A]"
                              : "border-[#6D2980]"
                          }
                        `}
                    ></span>
                  )}

                  {/* WRONG */}
                  {result[i] === false && selected[i] === q.left && (
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
                        zIndex: 20,
                      }}
                    >
                      ✕
                    </span>
                  )}

                  <span className="relative z-10">{q.left}</span>
                  {audio.activeId === `choice-${i}-left` && <AudioSpeaker />}
                </div>

                <span>/</span>

                {/* RIGHT WORD */}
                <div
                  style={{
                    borderRadius: 6,
                    ...(selected[i] === q.right
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
                  aria-label={`Item ${i + 1}, ${q.right}`}
                  aria-disabled={locked || result[i] === true}
                  aria-pressed={selected[i] === q.right}
                  data-choice={true}
                  tabIndex={0}
                  role={"button"}
                  onClick={() => {
                    audio.play(
                      `choice-${i}-right`,
                      [clip2, clip5, clip8, clip10, clip5][i],
                    );
                    handleSelect(i, q.right);
                    setAnnouncement("Choice activated.");
                  }}
                  className="
                      relative
                      cursor-pointer
                      inline-block
                      px-1
                      py-px
                    "
                >
                  {selected[i] === q.right && (
                    <span
                      style={{
                        ...(result[i] === true
                          ? { borderColor: "#16a34a" }
                          : {}),
                      }}
                      className={`
                          absolute
                          inset-[-5px]
                          border-2
                          rounded-full
                          pointer-events-none

                          ${
                            result[i] === false
                              ? "border-[#D1232A]"
                              : "border-[#6D2980]"
                          }
                        `}
                    ></span>
                  )}

                  {/* WRONG */}
                  {result[i] === false && selected[i] === q.right && (
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
                        zIndex: 20,
                      }}
                    >
                      ✕
                    </span>
                  )}

                  <span className="relative z-10">{q.right}</span>
                  {audio.activeId === `choice-${i}-right` && <AudioSpeaker />}
                </div>
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

export default Review6_Page1_Q4;
