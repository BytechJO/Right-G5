import soundJ4 from "../../../assets/audio/Workbook/Unit 10/Page 60 - J/Item_004_While_the_baby_slept,_her_big_sister_was_singing_a_song.mp3";
import soundJ3 from "../../../assets/audio/Workbook/Unit 10/Page 60 - J/Item_003_We_were_standing_in_line.mp3";
import soundJ2 from "../../../assets/audio/Workbook/Unit 10/Page 60 - J/Item_002_They_were_eating_their_lunch_during_lunchtime.mp3";
import soundJ1 from "../../../assets/audio/Workbook/Unit 10/Page 60 - J/Item_001_John_was_laughing_with_his_friends.mp3";
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

const WB_Unit10_Page60_Q3 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      words: ["John", "was", "laughing", "with", "his", "friends."],

      answer: ["was", "laughing"],
    },

    {
      words: [
        "They",
        "were",
        "eating",
        "their",
        "lunch",
        "during",
        "lunchtime.",
      ],

      answer: ["were", "eating"],
    },

    {
      words: ["We", "were", "standing", "in", "line."],

      answer: ["were", "standing"],
    },

    {
      words: [
        "While",
        "the",
        "baby",
        "slept,",
        "her",
        "big",
        "sister",
        "was",
        "singing",
        "a",
        "song.",
      ],

      answer: ["was", "singing"],
    },
  ];

  const [selectedWords, setSelectedWords] = useState([[], [], [], []]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  // ------------------------
  // TOGGLE WORD
  // ------------------------

  const toggleWord = (qIndex, word) => {
    if (locked || result[qIndex] === true) return;

    setSelectedWords((prev) => {
      const updated = [...prev];

      if (updated[qIndex].includes(word)) {
        updated[qIndex] = updated[qIndex].filter((w) => w !== word);
      } else {
        updated[qIndex] = [...updated[qIndex], word];
      }

      return updated;
    });

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

    const hasEmpty = selectedWords.some((arr) => arr.length === 0);

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

    const newResults = questions.map((q, i) => {
      const selected = [...selectedWords[i]].sort();

      const correct = [...q.answer].sort();

      const ok = JSON.stringify(selected) === JSON.stringify(correct);

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
    setSelectedWords([
      ["was", "laughing"],

      ["were", "eating"],

      ["were", "standing"],

      ["was", "singing"],
    ]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setSelectedWords([[], [], [], []]);

    setResult([]);

    setLocked(false);
  };

  return (
    <div
      data-exercise-scope={"WB_Unit10_Page60_Q3.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit10_Page60_Q3.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit10_Page60_Q3.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit10_Page60_Q3.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[18px] w-full" style={{gap:"70px"}}>
        {/* TITLE */}

        <ExerciseHeader
          isWorkbook
          sectionLetter="J"
          title={
            <>
              Read and underline the{" "}
              <span className="text-[#00AEEF]">past progressive</span> phrases.
            </>
          }
          subTitle="Underline the full past-progressive phrase, including was/were and the -ing verb, not just the verb ending."
        />

        {/* QUESTIONS */}

        <div className="flex flex-col gap-15">
          {questions.map((q, qIndex) => (
            <SentenceGroup
              label={`Hear sentence ${qIndex + 1}: ${q.words.join(" ")}`}
              src={[soundJ1, soundJ2, soundJ3, soundJ4][qIndex]}
              id={`sentence-${qIndex}`}
              audio={audio}
              key={qIndex}
              className="
                  flex
                  items-start
                  gap-4
                "
            >
              {/* NUMBER */}

              <span className="font-bold">{qIndex + 1}</span>

              {/* SENTENCE */}

              <div className="flex flex-wrap gap-1.5">
                {q.words.map((word, wIndex) => {
                  const isSelected = selectedWords[qIndex].includes(word);

                  return (
                    <span
                      {...activationKeys}
                      aria-disabled={locked || result[qIndex] === true}
                      aria-pressed={isSelected}
                      aria-label={`Sentence ${qIndex + 1}: ${word}${result[qIndex] === true ? ", correct and locked" : ""}`}
                      data-choice={true}
                      tabIndex={0}
                      role={"button"}
                      key={wIndex}
                      onClick={() => toggleWord(qIndex, word)}
                      className="
                            cursor-pointer
                            transition-all
                            duration-150
                          "
                      style={{
                        fontSize: "18px",

                        borderBottom: isSelected
                          ? `3px solid ${result[qIndex] === true ? "#16a34a" : result[qIndex] === false ? "#D1232A" : "#6D2980"}`
                          : "3px solid transparent",
                      }}
                    >
                      {word}
                    </span>
                  );
                })}

                {/* WRONG MARK */}

                {result[qIndex] === false && (
                  <span
                    style={{
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

                      marginLeft: "8px",

                      border: "2px solid white",

                      boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    ✕
                  </span>
                )}
              </div>
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

export default WB_Unit10_Page60_Q3;
