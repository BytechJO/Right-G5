import soundI4 from "../../../assets/audio/Workbook/Unit 8/Page 48 - I/Item_004_Noone_brought_(_their_his_)_gym_clothes.mp3";
import soundI3 from "../../../assets/audio/Workbook/Unit 8/Page 48 - I/Item_003_Did_everyone_do_(_their_his_)_homework.mp3";
import soundI2 from "../../../assets/audio/Workbook/Unit 8/Page 48 - I/Item_002_Can_anyone_give_me_(_their_his_)_textbook.mp3";
import soundI1 from "../../../assets/audio/Workbook/Unit 8/Page 48 - I/Item_001_Someone_lost_(_their_his_)_backpack.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
  AudioSpeaker,
} from "../../StudentPages/unit5/ExerciseAudioText";
import {
  SentenceGroup,
  SentencePart,
} from "../../StudentPages/unit5/SentenceAudio";
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

const WB_Unit8_Page48_Q3 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      sentence: "Someone lost (their / his) backpack.",

      options: ["their", "his"],

      correct: "his",
    },

    {
      sentence: "Can anyone give me (their / his) textbook?",

      options: ["their", "his"],

      correct: "his",
    },

    {
      sentence: "Did everyone do (their / his) homework?",

      options: ["their", "his"],

      correct: "his",
    },

    {
      sentence: "No one brought (their / his) gym clothes.",

      options: ["their", "his"],

      correct: "his",
    },
  ];

  const [selectedAnswers, setSelectedAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  // ------------------------
  // SELECT
  // ------------------------

  const handleSelect = (qIndex, option) => {
    if (locked || result[qIndex] === true) return;

    const updated = [...selectedAnswers];

    updated[qIndex] = option;

    setSelectedAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[qIndex] = undefined;

      return copy;
    });
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (locked) return;
    audio.stop();

    const hasEmpty = selectedAnswers.some((a) => !a);

    if (hasEmpty) {
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

    const newResults = selectedAnswers.map((answer, i) => {
      const ok = answer === questions[i].correct;

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

  // ------------------------
  // SHOW ANSWERS
  // ------------------------

  const showAnswers = () => {
    audio.stop();
    setAnnouncement("Model answers shown and locked.");
    resetButtonRef.current?.focus({ preventScroll: true });
    setSelectedAnswers(questions.map((q) => q.correct));

    setResult([true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setSelectedAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // SENTENCE
  // ------------------------

  const renderSentence = (q, qIndex) => {
    const parts = q.sentence.split("(");

    const after = parts[1].split(")")[1];

    return (
      <div className="leading-[1.8]">
        {parts[0]}(
        {q.options.map((option, index) => {
          const selected = selectedAnswers[qIndex] === option;

          return (
            <React.Fragment key={index}>
              <button
                aria-label={`Sentence ${qIndex + 1}: ${option}${result[qIndex] === true ? ". Answer locked." : ""}`}
                aria-pressed={selected}
                data-choice={true}
                {...activationKeys}
                type="button"
                disabled={locked || result[qIndex] === true}
                onClick={() => handleSelect(qIndex, option)}
                style={{
                  position: "relative",
                  border:
                    selected && result[qIndex] === false
                      ? "2px solid #D1232A"
                      : selected
                        ? "2px solid #6D2980"
                        : "2px solid transparent",

                  padding: "0 6px",

                  lineHeight: "1.2",

                  cursor:
                    locked || result[qIndex] === true ? "default" : "pointer",
                  borderRadius: 999,
                  "--exercise-focus-radius": "999px",
                  background: selected ? "#dbeafe" : "transparent",
                  borderColor:
                    selected && result[qIndex] === true
                      ? "#16a34a"
                      : selected && result[qIndex] === false
                        ? "#D1232A"
                        : selected
                          ? "#6D2980"
                          : "transparent",
                }}
              >
                {option}
                {selected && result[qIndex] === false && (
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
              </button>

              {index !== q.options.length - 1 && " / "}
            </React.Fragment>
          );
        })}
        ){after}
      </div>
    );
  };

  return (
    <div
      data-exercise-scope={"WB_Unit8_Page48_Q3.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit8_Page48_Q3.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit8_Page48_Q3.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit8_Page48_Q3.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[20px] w-full" style={{gap:"80px"}}>
        {/* TITLE */}

        <ExerciseHeader
          isWorkbook
          sectionLetter="I"
          title={<>Read and circle.</>}
          subTitle="Read all choices before selecting; choose only the option that makes the full sentence or expression correct."
        />

        {/* QUESTIONS */}

        <div className="flex flex-col gap-12">
          {questions.map((q, index) => (
            <SentenceGroup
              label={`Hear sentence ${index + 1}: ${q.sentence}`}
              src={[soundI1, soundI2, soundI3, soundI4][index]}
              id={`sentence-${index}`}
              audio={audio}
              key={index}
              className="flex items-start gap-4"
            >
              <span className="font-bold">{index + 1}</span>

              {renderSentence(q, index)}
            </SentenceGroup>
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

export default WB_Unit8_Page48_Q3;
