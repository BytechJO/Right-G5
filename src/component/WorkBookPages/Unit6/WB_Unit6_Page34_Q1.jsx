import soundC5 from "../../../assets/audio/Workbook/Unit 6/Page 34 - C/Item_005_restaurant_(should).mp3";
import soundC4 from "../../../assets/audio/Workbook/Unit 6/Page 34 - C/Item_004_park_(could).mp3";
import soundC3 from "../../../assets/audio/Workbook/Unit 6/Page 34 - C/Item_003_go_to_your_room._(may).mp3";
import soundC2 from "../../../assets/audio/Workbook/Unit 6/Page 34 - C/Item_002_You.mp3";
import soundC1 from "../../../assets/audio/Workbook/Unit 6/Page 34 - C/Item_001_we_go_to_the_carnival_(shall).mp3";
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

const WB_Unit6_Page34_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const answers = [
    "Shall",
    "may",
    "Could we go to the",
    "Should we try out the new",
  ];

  const questions = [
    {
      before: "",

      after: "we go to the carnival? (shall)",
    },

    {
      before: "You",

      after: "go to your room. (may)",
    },

    {
      before: "",

      after: "park? (could)",
    },

    {
      before: "",

      after: "restaurant? (should)",
    },
  ];

  const [studentAnswers, setStudentAnswers] = useState(["", "", "", ""]);

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
      const ok = normalize(answer) === normalize(answers[i]);

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = answers.length;

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
    setStudentAnswers(answers);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i, width = "260px") => (
    <div className="relative inline-block">
      <input
        placeholder={"Modal word or phrase"}
        aria-invalid={result[i] === false}
        title={`Sentence ${i + 1}: ${questions[i].before} ___ ${questions[i].after}`}
        aria-label={`Sentence ${i + 1}: ${questions[i].before} ___ ${questions[i].after}`}
        {...fieldKeys}
        type="text"
        value={studentAnswers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
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
        style={{
          width,
          borderBottomColor:
            result[i] === true
              ? "#16a34a"
              : result[i] === false
                ? "#D1232A"
                : undefined,
        }}
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
      data-exercise-scope={"WB_Unit6_Page34_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit6_Page34_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit6_Page34_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit6_Page34_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[18px] w-full" style={{gap:"60px"}}>
        {/* TITLE */}

        <ExerciseHeader
          isWorkbook
          sectionLetter="C"
          title={
            <>
              Read and write using the{" "}
              <span className="text-[#00AEEF]">modal verb</span> given.
            </>
          }
          subTitle="Decide the purpose first—ability, advice, possibility, permission, or future—then choose the modal that expresses that meaning."
        />

        {/* QUESTIONS */}

        <div className="flex flex-col gap-17">
          {questions.map((question, index) => (
            <div key={index} className="flex items-center gap-3 flex-wrap">
              {/* NUMBER */}

              <span className="font-bold w-5">{index + 1}</span>

              {/* BEFORE */}

              {question.before && (
                <span>
                  {[null, soundC2, null, null][index] ? (
                    <AudioText
                      audio={audio}
                      id={`before-${index}`}
                      src={[null, soundC2, null, null][index]}
                      label={`Hear ${question.before}`}
                    >
                      {question.before}
                    </AudioText>
                  ) : (
                    <>{question.before}</>
                  )}
                </span>
              )}

              {/* INPUT */}

              {inputField(
                index,
                index === 0 ? "240px" : index === 1 ? "360px" : "420px",
              )}

              {/* AFTER */}

              <span>
                {[soundC1, soundC3, soundC4, soundC5][index] ? (
                  <AudioText
                    audio={audio}
                    id={`after-${index}`}
                    src={[soundC1, soundC3, soundC4, soundC5][index]}
                    label={`Hear ${question.after}`}
                  >
                    {question.after}
                  </AudioText>
                ) : (
                  <>{question.after}</>
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

export default WB_Unit6_Page34_Q1;
