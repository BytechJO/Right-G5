import soundI22 from "../../../assets/audio/Workbook/Unit 6/Page 36 - I/Item_022_were.mp3";
import soundI21 from "../../../assets/audio/Workbook/Unit 6/Page 36 - I/Item_021_put.mp3";
import soundI20 from "../../../assets/audio/Workbook/Unit 6/Page 36 - I/Item_020_must.mp3";
import soundI19 from "../../../assets/audio/Workbook/Unit 6/Page 36 - I/Item_019_not.mp3";
import soundI18 from "../../../assets/audio/Workbook/Unit 6/Page 36 - I/Item_018_she.mp3";
import soundI17 from "../../../assets/audio/Workbook/Unit 6/Page 36 - I/Item_017_will.mp3";
import soundI16 from "../../../assets/audio/Workbook/Unit 6/Page 36 - I/Item_016_should.mp3";
import soundI15 from "../../../assets/audio/Workbook/Unit 6/Page 36 - I/Item_015_have.mp3";
import soundI14 from "../../../assets/audio/Workbook/Unit 6/Page 36 - I/Item_014_of.mp3";
import soundI13 from "../../../assets/audio/Workbook/Unit 6/Page 36 - I/Item_013_like.mp3";
import soundI12 from "../../../assets/audio/Workbook/Unit 6/Page 36 - I/Item_012_would.mp3";
import soundI11 from "../../../assets/audio/Workbook/Unit 6/Page 36 - I/Item_011_may.mp3";
import soundI10 from "../../../assets/audio/Workbook/Unit 6/Page 36 - I/Item_010_go.mp3";
import soundI9 from "../../../assets/audio/Workbook/Unit 6/Page 36 - I/Item_009_was.mp3";
import soundI8 from "../../../assets/audio/Workbook/Unit 6/Page 36 - I/Item_008_can.mp3";
import soundI7 from "../../../assets/audio/Workbook/Unit 6/Page 36 - I/Item_007_could.mp3";
import soundI6 from "../../../assets/audio/Workbook/Unit 6/Page 36 - I/Item_006_the.mp3";
import soundI5 from "../../../assets/audio/Workbook/Unit 6/Page 36 - I/Item_005_play.mp3";
import soundI4 from "../../../assets/audio/Workbook/Unit 6/Page 36 - I/Item_004_might.mp3";
import soundI3 from "../../../assets/audio/Workbook/Unit 6/Page 36 - I/Item_003_shall.mp3";
import soundI2 from "../../../assets/audio/Workbook/Unit 6/Page 36 - I/Item_002_if.mp3";
import soundI1 from "../../../assets/audio/Workbook/Unit 6/Page 36 - I/Item_001_they.mp3";
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

const WB_Unit6_Page36_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const wordSoundFor = (word) =>
    ({
      they: soundI1,
      if: soundI2,
      shall: soundI3,
      might: soundI4,
      play: soundI5,
      the: soundI6,
      could: soundI7,
      can: soundI8,
      was: soundI9,
      go: soundI10,
      may: soundI11,
      would: soundI12,
      like: soundI13,
      of: soundI14,
      have: soundI15,
      should: soundI16,
      will: soundI17,
      she: soundI18,
      not: soundI19,
      must: soundI20,
      put: soundI21,
      were: soundI22,
    })[word];
  const [announcement, setAnnouncement] = React.useState("");

  const words = [
    "they",
    "if",
    "shall",
    "can",
    "was",
    "might",
    "go",
    "play",
    "the",
    "may",
    "could",

    "were",
    "would",
    "not",
    "like",
    "must",
    "put",
    "of",
    "have",
    "should",
    "will",
    "she",
  ];

  const correctWords = [
    "shall",
    "might",
    "may",
    "could",
    "would",
    "must",
    "should",
    "will",
  ];

  const [selectedWords, setSelectedWords] = useState([]);

  const [wrongWords, setWrongWords] = useState([]);

  const [locked, setLocked] = useState(false);
  const [correctWordsState, setCorrectWordsState] = useState([]);
  // ------------------------
  // TOGGLE WORD
  // ------------------------

  const toggleWord = (word) => {
    if (wordSoundFor(word)) audio.play(`word-${word}`, wordSoundFor(word));
    if (locked) return;
    setAnnouncement(
      `${word} ${selectedWords.includes(word) ? "unselected" : "selected"}.`,
    );

    // ✅ لا تعدل الصح
    if (correctWordsState.includes(word)) return;

    // ✅ شيل X عن الكلمة المعدلة فقط
    setWrongWords((prev) => prev.filter((w) => w !== word));

    setSelectedWords((prev) => {
      if (prev.includes(word)) {
        return prev.filter((w) => w !== word);
      }

      return [...prev, word];
    });
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (locked) return;
    audio.stop();

    const wrong = selectedWords.filter((word) => !correctWords.includes(word));

    const missed = correctWords.filter((word) => !selectedWords.includes(word));

    setWrongWords(wrong);
    const correctSelected = selectedWords.filter((word) =>
      correctWords.includes(word),
    );

    setCorrectWordsState(correctSelected);
    const correctCount = correctWords.length - missed.length;

    const total = correctWords.length;

    const score = Math.max(0, correctCount - wrong.length);

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:18px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${score} / ${total}
        </span>
      </div>
    `;

    if (wrong.length === 0 && missed.length === 0) {
      resetButtonRef.current?.focus({ preventScroll: true });
      setLocked(true);

      (setAnnouncement(
        String(msg)
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.success(msg));
    } else if (score === 0) {
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
    setSelectedWords(correctWords);
    setCorrectWordsState(correctWords);

    setWrongWords([]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setSelectedWords([]);

    setWrongWords([]);

    setCorrectWordsState([]);

    setLocked(false);
  };

  // ------------------------
  // WORD BUTTON
  // ------------------------

  const wordButton = (word, index) => {
    const selected = selectedWords.includes(word);

    const wrong = wrongWords.includes(word);
    const correct = correctWordsState.includes(word);
    return (
      <button
        {...activationKeys}
        aria-label={`${word}${correct ? ". Correct and locked." : wrong ? ". Incorrect selection." : ""}`}
        aria-pressed={selected}
        data-choice={true}
        key={index}
        type="button"
        aria-disabled={locked || correct}
        onClick={() => toggleWord(word)}
        className="relative"
        style={{
          background: "transparent",
          border: wrong
            ? "2px solid #D1232A"
            : selected
              ? "2px solid #6D2980"
              : "2px solid transparent",
          padding: "0 6px",
          color: "black",

          cursor: locked ? "default" : "pointer",
          borderRadius: 999,
          backgroundColor:
            audio.activeId === `word-${word}` || selected
              ? "#dbeafe"
              : undefined,
          boxShadow:
            audio.activeId === `word-${word}` ? "0 0 0 3px #2563eb" : undefined,
          borderColor: correct
            ? "#16a34a"
            : wrong
              ? "#D1232A"
              : selected
                ? "#6D2980"
                : "transparent",
        }}
      >
        {word}

        {wrong && (
          <span
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              width: "18px",
              height: "18px",
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
        {audio.activeId === `word-${word}` && <AudioSpeaker />}
      </button>
    );
  };

  return (
    <div
      data-exercise-scope={"WB_Unit6_Page36_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit6_Page36_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit6_Page36_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit6_Page36_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[20px] w-full" style={{gap:"100px"}}>
        {/* TITLE */}

        <ExerciseHeader
          isWorkbook
          sectionLetter="I"
          title={
            <>
              Circle the <span className="text-[#00AEEF]">modal verbs</span>.
            </>
          }
          subTitle="Scan one line or row at a time and select only the complete target words or phrases, then review every mark before checking."
        />

        {/* WORDS */}

        <div className="flex flex-col gap-20 pl-10">
          {/* ROW 1 */}

          <div className="flex flex-wrap gap-x-6 gap-y-3 items-center">
            {words.slice(0, 11).map((word, index) => wordButton(word, index))}
          </div>

          {/* ROW 2 */}

          <div className="flex flex-wrap gap-x-6 gap-y-3 items-center">
            {words.slice(11).map((word, index) => wordButton(word, index + 11))}
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

export default WB_Unit6_Page36_Q2;
