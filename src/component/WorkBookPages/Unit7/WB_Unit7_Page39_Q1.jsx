import soundA9 from "../../../assets/audio/Workbook/Unit 7/Page 39 - A/Item_009_all_the_important_notes_on_my_notebook,_so_I_can_be_prepared_for_the_exa.mp3";
import soundA11 from "../../../assets/audio/Workbook/Unit 7/Page 39 - A/Item_011_the_time_I_spend_with_my_grandparents.mp3";
import soundA10 from "../../../assets/audio/Workbook/Unit 7/Page 39 - A/Item_010_lam.mp3";
import soundA8 from "../../../assets/audio/Workbook/Unit 7/Page 39 - A/Item_008_We_went_to_visit_the_children_in_the.mp3";
import soundA7 from "../../../assets/audio/Workbook/Unit 7/Page 39 - A/Item_007_after_injuring_her_leg_in_a_bike_accident.mp3";
import soundA6 from "../../../assets/audio/Workbook/Unit 7/Page 39 - A/Item_006_She_was.mp3";
import soundA2 from "../../../assets/audio/Workbook/Unit 7/Page 39 - A/Item_002_jotting_down.mp3";
import soundA1 from "../../../assets/audio/Workbook/Unit 7/Page 39 - A/Item_001_limping.mp3";
import soundA4 from "../../../assets/audio/Workbook/Unit 7/Page 39 - A/Item_004_treasure.mp3";
import soundA3 from "../../../assets/audio/Workbook/Unit 7/Page 39 - A/Item_003_orphanage.mp3";
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

const WB_Unit7_Page39_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const wordBank = ["orphanage", "treasure", "limping", "jotting down"];

  const answers = ["limping", "orphanage", "jotting down", "treasure"];

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

  const inputField = (i, width) => (
    <div className="relative inline-block">
      <input
        aria-invalid={result[i] === false}
        placeholder={"Word or expression"}
        title={
          [
            "She was ___ after injuring her leg in a bike accident.",
            "We went to visit the children in the ___.",
            "I am ___ all the important notes on my notebook, so I can be prepared for the exam.",
            "I ___ the time I spend with my grandparents.",
          ][i]
        }
        aria-label={
          [
            "She was ___ after injuring her leg in a bike accident.",
            "We went to visit the children in the ___.",
            "I am ___ all the important notes on my notebook, so I can be prepared for the exam.",
            "I ___ the time I spend with my grandparents.",
          ][i]
        }
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
      data-exercise-scope={"WB_Unit7_Page39_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit7_Page39_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit7_Page39_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit7_Page39_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[18px]">
        {/* TITLE */}

        <ExerciseHeader
          isWorkbook
          sectionLetter="A"
          title={<>Read and write.</>}
          subTitle="Read the full sentence first, then choose the word or expression that fits both the meaning and grammar."
        />

        {/* WORD BANK */}

        <div className="flex flex-wrap gap-6 mb-10 pl-[5px]">
          {wordBank.map((word, index) => (
            <div
              key={index}
              className="
                  border
                  border-[#7D3C98]
                  rounded-lg
                  px-4
                  py-1
                  text-[18px]
                "
            >
              <AudioText
                audio={audio}
                id={`bank-${index}`}
                src={[soundA3, soundA4, soundA1, soundA2][index]}
                label={`Hear ${word}`}
              >
                {word}
              </AudioText>
            </div>
          ))}
        </div>

        {/* QUESTIONS */}

        <div className="flex flex-col gap-12 w-[110%]">
          {/* 1 */}

          <div className="flex items-start gap-4 flex-wrap">
            <span className="font-bold">1</span>

            <span>
              <AudioText
                audio={audio}
                id={"fragment-0"}
                src={soundA6}
                label={"Hear She was"}
              >
                She was
              </AudioText>
            </span>

            {inputField(0, "220px")}

            <span>
              <AudioText
                audio={audio}
                id={"fragment-1"}
                src={soundA7}
                label={"Hear after injuring her leg in a bike accident."}
              >
                after injuring her leg in a bike accident.
              </AudioText>
            </span>
          </div>

          {/* 2 */}

          <div className="flex items-start gap-4 flex-wrap">
            <span className="font-bold">2</span>

            <span>
              <AudioText
                audio={audio}
                id={"fragment-2"}
                src={soundA8}
                label={"Hear We went to visit the children in the"}
              >
                We went to visit the children in the
              </AudioText>
            </span>

            {inputField(1, "320px")}

            <span>.</span>
          </div>

          {/* 3 */}

          <div className="flex items-start gap-4 flex-wrap">
            <span className="font-bold">3</span>
            <span>
              <AudioText
                audio={audio}
                id={"fragment-3"}
                src={soundA10}
                label={"Hear I am"}
              >
                I am
              </AudioText>
            </span>
            {inputField(2, "250px")}
            <AudioText
              audio={audio}
              id="ending-2"
              src={soundA9}
              label="Hear all the important notes on my notebook, so I can be prepared for the exam."
            >
              all the important notes on my notebook, so I can be prepared for
              the exam.
            </AudioText>
            <span></span>
          </div>

          {/* 4 */}

          <div className="flex items-start gap-4 flex-wrap">
            <span className="font-bold">4</span>

            <span>I</span>

            {inputField(3, "250px")}

            <span>
              <AudioText
                audio={audio}
                id={"fragment-4"}
                src={soundA11}
                label={"Hear the time I spend with my grandparents."}
              >
                the time I spend with my grandparents.
              </AudioText>
            </span>
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

export default WB_Unit7_Page39_Q1;
