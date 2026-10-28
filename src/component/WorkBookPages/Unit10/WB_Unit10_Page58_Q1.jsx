import soundC9 from "../../../assets/audio/Workbook/Unit 10/Page 58 - C/Item_009_snowman._(make).mp3";
import soundC8 from "../../../assets/audio/Workbook/Unit 10/Page 58 - C/Item_008_While_the_snow_fell,_she.mp3";
import soundC7 from "../../../assets/audio/Workbook/Unit 10/Page 58 - C/Item_007_their_favorite_songs._(sing).mp3";
import soundC6 from "../../../assets/audio/Workbook/Unit 10/Page 58 - C/Item_006_They.mp3";
import soundC5 from "../../../assets/audio/Workbook/Unit 10/Page 58 - C/Item_005_all_day_long._(study).mp3";
import soundC4 from "../../../assets/audio/Workbook/Unit 10/Page 58 - C/Item_004_We.mp3";
import soundC3 from "../../../assets/audio/Workbook/Unit 10/Page 58 - C/Item_003_soccer_in_the_field._(play).mp3";
import soundC2 from "../../../assets/audio/Workbook/Unit 10/Page 58 - C/Item_002_You.mp3";
import soundC1 from "../../../assets/audio/Workbook/Unit 10/Page 58 - C/Item_001_on_the_couch_last_night._(sleep).mp3";
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

const WB_Unit_Test_Q27 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      before: "You",

      after: "on the couch last night. (sleep)",

      answer: "were sleeping",
    },

    {
      before: "We",

      after: "soccer in the field. (play)",

      answer: "were playing",
    },

    {
      before: "I",

      after: "all day long. (study)",

      answer: "was studying",
    },

    {
      before: "They",

      after: "their favorite songs. (sing)",

      answer: "were singing",
    },

    {
      before: "While the snow fell, she",

      after: "a snowman. (make)",

      answer: "was making",
    },
  ];

  const [studentAnswers, setStudentAnswers] = useState(["", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  // ------------------------
  // HANDLE INPUT
  // ------------------------

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...studentAnswers];

    updated[i] = value;

    setStudentAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (locked) return;
    audio.stop();

    const hasEmpty = studentAnswers.some((a) => !a.trim());

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

    const newResults = studentAnswers.map((answer, i) => {
      const ok = normalize(answer) === normalize(questions[i].answer);

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
    setStudentAnswers(questions.map((q) => q.answer));

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i) => (
    <div className="relative flex-1 min-w-[140px]">
      <input
        style={{
          borderBottomColor:
            result[i] === true
              ? "#16a34a"
              : result[i] === false
                ? "#D1232A"
                : undefined,
        }}
        placeholder={"was / were + verb-ing"}
        aria-invalid={result[i] === false}
        title={`Sentence ${i + 1}: ${questions[i].before} ___ ${questions[i].after}. Use the past progressive.`}
        aria-label={`Sentence ${i + 1}: ${questions[i].before} ___ ${questions[i].after}. Use the past progressive.`}
        {...fieldKeys}
        type="text"
        value={studentAnswers[i]}
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
      data-exercise-scope={"WB_Unit10_Page58_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit10_Page58_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit10_Page58_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit10_Page58_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[18px] w-full" style={{gap:"50px"}}>
        {/* TITLE */}

        <ExerciseHeader
          isWorkbook
          sectionLetter="C"
          title={
            <>
              Read and write the{" "}
              <span className="text-[#00AEEF]">past progressive tense.</span>
            </>
          }
          subTitle="Match the subject with was or were, add the -ing verb, and check that the sentence describes an action in progress in the past."
        />

        {/* QUESTIONS */}

        <div className="flex flex-col gap-15">
          {questions.map((q, index) => (
            <div
              key={index}
              className="
                flex
                items-center
                gap-3
                w-full
              "
            >
              {/* NUMBER */}

              <span className="font-bold">{index + 1}</span>

              {/* BEFORE */}

              <span>
                {[soundC2, soundC4, null, soundC6, soundC8][index] ? (
                  <AudioText
                    audio={audio}
                    id={`before-${index}`}
                    src={[soundC2, soundC4, null, soundC6, soundC8][index]}
                    label={"Hear " + q.before}
                  >
                    {q.before}
                  </AudioText>
                ) : (
                  q.before
                )}
              </span>

              {/* INPUT */}

              {inputField(index)}

              {/* AFTER */}

              <span>
                {[soundC1, soundC3, soundC5, soundC7, soundC9][index] ? (
                  <AudioText
                    audio={audio}
                    id={`after-${index}`}
                    src={[soundC1, soundC3, soundC5, soundC7, soundC9][index]}
                    label={"Hear " + q.after}
                  >
                    {q.after}
                  </AudioText>
                ) : (
                  q.after
                )}
              </span>
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

export default WB_Unit_Test_Q27;
