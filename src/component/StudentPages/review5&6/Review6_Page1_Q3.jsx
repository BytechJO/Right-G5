import clip0 from "../../../assets/audio/ClassBook/U6/Page 54 - C/Item_001_it.mp3";
import clip1 from "../../../assets/audio/ClassBook/U6/Page 54 - C/Item_002_was.mp3";
import clip2 from "../../../assets/audio/ClassBook/U6/Page 54 - C/Item_003_if.mp3";
import clip3 from "../../../assets/audio/ClassBook/U6/Page 54 - C/Item_004_might.mp3";
import clip4 from "../../../assets/audio/ClassBook/U6/Page 54 - C/Item_005_can.mp3";
import clip5 from "../../../assets/audio/ClassBook/U6/Page 54 - C/Item_006_run.mp3";
import clip6 from "../../../assets/audio/ClassBook/U6/Page 54 - C/Item_007_would.mp3";
import clip7 from "../../../assets/audio/ClassBook/U6/Page 54 - C/Item_008_done.mp3";
import clip8 from "../../../assets/audio/ClassBook/U6/Page 54 - C/Item_009_have.mp3";
import clip9 from "../../../assets/audio/ClassBook/U6/Page 54 - C/Item_010_must.mp3";
import clip10 from "../../../assets/audio/ClassBook/U6/Page 54 - C/Item_011_see.mp3";
import clip11 from "../../../assets/audio/ClassBook/U6/Page 54 - C/Item_012_could.mp3";
import clip12 from "../../../assets/audio/ClassBook/U6/Page 54 - C/Item_013_through.mp3";
import clip13 from "../../../assets/audio/ClassBook/U6/Page 54 - C/Item_014_over.mp3";
import clip14 from "../../../assets/audio/ClassBook/U6/Page 54 - C/Item_015_did.mp3";
import clip15 from "../../../assets/audio/ClassBook/U6/Page 54 - C/Item_016_shall.mp3";
import clip16 from "../../../assets/audio/ClassBook/U6/Page 54 - C/Item_017_should.mp3";
import clip17 from "../../../assets/audio/ClassBook/U6/Page 54 - C/Item_018_between.mp3";
import clip18 from "../../../assets/audio/ClassBook/U6/Page 54 - C/Item_019_the.mp3";
import clip19 from "../../../assets/audio/ClassBook/U6/Page 54 - C/Item_020_may.mp3";
import clip20 from "../../../assets/audio/ClassBook/U6/Page 54 - C/Item_021_were.mp3";
import clip21 from "../../../assets/audio/ClassBook/U6/Page 54 - C/Item_022_stop.mp3";
import clip22 from "../../../assets/audio/ClassBook/U6/Page 54 - C/Item_023_does.mp3";
import clip23 from "../../../assets/audio/ClassBook/U6/Page 54 - C/Item_024_will.mp3";
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

const Review6_Page1_Q3 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const words = [
    "it",
    "was",
    "if",
    "might",
    "can",
    "run",

    "would",
    "done",
    "have",
    "must",
    "see",
    "could",

    "through",
    "over",
    "did",
    "shall",
    "should",
    "between",

    "the",
    "may",
    "were",
    "stop",
    "does",
    "will",
  ];

  const correctAnswers = [
    "might",
    "can",
    "would",
    "must",
    "could",
    "shall",
    "should",
    "may",
    "will",
  ];

  const [correctWords, setCorrectWords] = useState([]);
  const [selected, setSelected] = useState([]);

  const [wrongSelections, setWrongSelections] = useState([]);

  const [locked, setLocked] = useState(false);

  const toggleWord = (word) => {
    if (locked || correctWords.includes(word)) return;
    setSelected((previous) =>
      previous.includes(word)
        ? previous.filter((w) => w !== word)
        : [...previous, word],
    );
    setWrongSelections((previous) => previous.filter((w) => w !== word));
    setAnnouncement(
      word + (selected.includes(word) ? " deselected." : " selected."),
    );
  };

  const checkAnswers = () => {
    if (locked) return;
    audio.stop();

    if (selected.length === 0) {
      (setAnnouncement(
        String("Please select the modal verbs.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Please select the modal verbs."));

      return;
    }

    const wrong = selected.filter((word) => !correctAnswers.includes(word));

    setWrongSelections(wrong);
    setCorrectWords((previous) => [
      ...new Set([
        ...previous,
        ...selected.filter((word) => correctAnswers.includes(word)),
      ]),
    ]);

    const allCorrect =
      correctAnswers.every((w) => selected.includes(w)) && wrong.length === 0;

    const correctCount = selected.filter((w) =>
      correctAnswers.includes(w),
    ).length;

    const total = correctAnswers.length;

    const color = allCorrect ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:18px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (allCorrect) {
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
    setSelected(correctAnswers);
    setCorrectWords([...correctAnswers]);

    setWrongSelections([]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setSelected([]);
    setCorrectWords([]);

    setWrongSelections([]);

    setLocked(false);
  };

  return (
    <div
      data-exercise-scope={"Review6_Page1_Q3.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review6_Page1_Q3.jsx"] input:focus-visible,[data-exercise-scope="Review6_Page1_Q3.jsx"] textarea:focus-visible,[data-exercise-scope="Review6_Page1_Q3.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall" style={{gap:"70px"}}>
        {/* TITLE */}
        <ExerciseHeader
          isReview
          sectionLetter="C"
          title={<>Circle the words that are modal verbs.</>}
          subTitle="Read the text carefully and select only the target words; review your selections before checking."
        />

        {/* WORDS */}
        <div
          className="
            grid
            grid-cols-6
            gap-y-15
            gap-x-16
            pl-8
          "
        >
          {words.map((word, i) => {
            const isSelected = selected.includes(word);

            const isWrong = wrongSelections.includes(word);

            return (
              <div
                style={{
                  borderRadius: 6,
                  ...(selected.includes(word)
                    ? {
                        boxShadow:
                          "0 0 0 2px " +
                          (correctWords.includes(word)
                            ? "#16a34a"
                            : wrongSelections.includes(word)
                              ? "#D1232A"
                              : "#2563eb"),
                        backgroundColor: "#dbeafe",
                      }
                    : {}),
                  position: "relative",
                  ...(audio.activeId === `word-${i}`
                    ? { backgroundColor: "#dbeafe" }
                    : {}),
                }}
                {...activationKeys}
                aria-label={`Select modal verb: ${word}`}
                aria-disabled={locked || correctWords.includes(word)}
                aria-pressed={selected.includes(word)}
                data-choice={true}
                tabIndex={0}
                role={"button"}
                key={i}
                onClick={() => {
                  audio.play(
                    `word-${i}`,
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
                      clip12,
                      clip13,
                      clip14,
                      clip15,
                      clip16,
                      clip17,
                      clip18,
                      clip19,
                      clip20,
                      clip21,
                      clip22,
                      clip23,
                    ][i],
                  );
                  toggleWord(word);
                  setAnnouncement("Choice activated.");
                }}
                className="
                    relative
                    cursor-pointer
                    inline-block
                    w-fit
                    text-[20px]
                  "
              >
                {/* CIRCLE */}
                {isSelected && (
                  <span
                    style={{
                      ...(correctWords.includes(word)
                        ? { borderColor: "#16a34a" }
                        : {}),
                    }}
                    className={`
                        absolute
                        -inset-1.5
                        border-2
                        rounded-full
                        pointer-events-none

                        ${isWrong ? "border-[#D1232A]" : "border-[#6D2980]"}
                      `}
                  ></span>
                )}

                {/* WRONG */}
                {isWrong && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-15px",
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

                <span className="relative z-10">{word}</span>
                {audio.activeId === `word-${i}` && <AudioSpeaker />}
              </div>
            );
          })}
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

export default Review6_Page1_Q3;
