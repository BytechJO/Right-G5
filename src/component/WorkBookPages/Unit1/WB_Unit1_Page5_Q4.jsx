import clip0 from "../../../assets/audio/Workbook/Unit 1/Page 5 - H/Item_001_late.mp3";
import clip1 from "../../../assets/audio/Workbook/Unit 1/Page 5 - H/Item_002_How.mp3";
import clip2 from "../../../assets/audio/Workbook/Unit 1/Page 5 - H/Item_003_am.mp3";
import clip3 from "../../../assets/audio/Workbook/Unit 1/Page 5 - H/Item_004_deep.mp3";
import clip4 from "../../../assets/audio/Workbook/Unit 1/Page 5 - H/Item_005_is.mp3";
import clip5 from "../../../assets/audio/Workbook/Unit 1/Page 5 - H/Item_006_an.mp3";
import clip6 from "../../../assets/audio/Workbook/Unit 1/Page 5 - H/Item_007_ocean.mp3";
import clip7 from "../../../assets/audio/Workbook/Unit 1/Page 5 - H/Item_008_far.mp3";
import clip8 from "../../../assets/audio/Workbook/Unit 1/Page 5 - H/Item_009_house.mp3";
import clip9 from "../../../assets/audio/Workbook/Unit 1/Page 5 - H/Item_010_your.mp3";
import clip10 from "../../../assets/audio/Workbook/Unit 1/Page 5 - H/Item_011_long.mp3";
import clip11 from "../../../assets/audio/Workbook/Unit 1/Page 5 - H/Item_012_hair.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
} from "../../StudentPages/unit5/ExerciseAudioText";

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

const WB_Unit1_Page5_Q4 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    "How late am I?",
    "How deep is this ocean?",
    "How far is your house?",
    "How long is your hair?",
  ];

  const scrambled = [
    ["am", "late", "I", "How?"],
    ["ocean", "deep", "is", "How", "an?"],
    ["How", "your", "is", "far", "house?"],
    ["long", "is", "How", "hair", "your?"],
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

    const hasEmpty = answers.some((a) => !a.trim());

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
      "How late am I?",
      "How deep is this ocean?",
      "How far is your house?",
      "How long is your hair?",
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

  const inputField = (i) => (
    <div className="relative flex-1">
      <input
        placeholder={"Question"}
        style={{
          ...(result[i] === true ? { borderBottomColor: "#16a34a" } : {}),
        }}
        aria-invalid={result[i] === false}
        title={`Item ${i + 1}, unscramble the How question`}
        aria-label={`Item ${i + 1}, unscramble the How question`}
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
          text-[18px]
          text-[#6D2980]
          font-semibold
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
    </div>
  );

  return (
    <div
      data-exercise-scope={"WB_Unit1_Page5_Q4.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit1_Page5_Q4.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit1_Page5_Q4.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit1_Page5_Q4.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall " style={{gap:"80px"}}>
        {/* TITLE */}
        <ExerciseHeader
          subTitle="Say the correct word, expression, or sentence first, then reorder it and check spelling, capitalization, and punctuation."
          isWorkbook
          sectionLetter="H"
          title={<>Unscramble and write.</>}
        />

        {/* QUESTIONS */}
        <div className="flex flex-col gap-15 text-[18px]">
          {scrambled.map((words, i) => (
            <div key={i} className="flex items-center gap-6">
              <span className="font-bold">{i + 1}</span>

              <div className="flex items-center gap-8 min-w-[380px]">
                {words.map((word, index) => (
                  <span key={index}>
                    {word.toLowerCase().replace(/\?/g, "") !== "i" ? (
                      <AudioText
                        audio={audio}
                        id={`scrambled-${i}-${index}`}
                        src={
                          {
                            late: clip0,
                            how: clip1,
                            am: clip2,
                            deep: clip3,
                            is: clip4,
                            an: clip5,
                            ocean: clip6,
                            far: clip7,
                            house: clip8,
                            your: clip9,
                            long: clip10,
                            hair: clip11,
                          }[word.toLowerCase().replace(/\?/g, "")]
                        }
                        label={`Hear ${word}`}
                      >
                        {word}
                      </AudioText>
                    ) : (
                      word
                    )}
                  </span>
                ))}
              </div>

              {inputField(i)}
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

export default WB_Unit1_Page5_Q4;
