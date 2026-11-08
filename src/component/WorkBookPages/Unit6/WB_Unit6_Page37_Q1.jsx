import soundK11 from "../../../assets/audio/Workbook/Unit 6/Page 37 - K/Item_011_learn_a_new_language_if_you_like.mp3";
import soundK9 from "../../../assets/audio/Workbook/Unit 6/Page 37 - K/Item_009_study_before_an_exam.mp3";
import soundK7 from "../../../assets/audio/Workbook/Unit 6/Page 37 - K/Item_007_go_to_the_park_with_my_friends.mp3";
import soundK5 from "../../../assets/audio/Workbook/Unit 6/Page 37 - K/Item_005_talk_during_class.mp3";
import soundK3 from "../../../assets/audio/Workbook/Unit 6/Page 37 - K/Item_003_rain_tomorrow.mp3";
import soundK1 from "../../../assets/audio/Workbook/Unit 6/Page 37 - K/Item_001_like_a_cup_of_tea.mp3";
import soundK12 from "../../../assets/audio/Workbook/Unit 6/Page 37 - K/Item_012_It_might.mp3";
import soundK10 from "../../../assets/audio/Workbook/Unit 6/Page 37 - K/Item_010_I_would.mp3";
import soundK8 from "../../../assets/audio/Workbook/Unit 6/Page 37 - K/Item_008_You_shouldn't.mp3";
import soundK6 from "../../../assets/audio/Workbook/Unit 6/Page 37 - K/Item_006_Iwill.mp3";
import soundK4 from "../../../assets/audio/Workbook/Unit 6/Page 37 - K/Item_004_You_could.mp3";
import soundK2 from "../../../assets/audio/Workbook/Unit 6/Page 37 - K/Item_002_You_must.mp3";
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

const WB_Unit6_Page37_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const leftItems = [
    "You must",
    "You could",
    "I will",
    "You shouldn’t",
    "I would",
    "It might",
  ];

  const rightItems = [
    {
      letter: "a",
      text: "like a cup of tea.",
    },

    {
      letter: "b",
      text: "rain tomorrow.",
    },

    {
      letter: "c",
      text: "talk during class.",
    },

    {
      letter: "d",
      text: "go to the park with my friends.",
    },

    {
      letter: "e",
      text: "study before an exam.",
    },

    {
      letter: "f",
      text: "learn a new language if you like.",
    },
  ];

  const answers = ["e", "f", "d", "c", "a", "b"];

  const [studentAnswers, setStudentAnswers] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  // ------------------------
  // HANDLE INPUT
  // ------------------------

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...studentAnswers];

    updated[i] = value.toLowerCase();

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

    const hasEmpty = studentAnswers.some((a) => !a);

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
      const ok = answer === answers[i];

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

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i) => (
    <div className="relative">
      <input
        style={{
          borderBottomColor:
            result[i] === true
              ? "#16a34a"
              : result[i] === false
                ? "#D1232A"
                : undefined,
        }}
        aria-invalid={result[i] === false}
        title={`Match ${i + 1}: ${leftItems[i]}. Enter an ending letter, a to f.`}
        aria-label={`Match ${i + 1}: ${leftItems[i]}. Enter an ending letter, a to f.`}
        {...fieldKeys}
        type="text"
        value={studentAnswers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        maxLength={1}
        className={`
          w-[34px]
          border-0
          border-b
          outline-none
          bg-transparent
          text-center
          text-[18px]
          text-[#6D2980]
          font-semibold

          ${result[i] === false ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
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
    </div>
  );

  return (
    <div
      data-exercise-scope={"WB_Unit6_Page37_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit6_Page37_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit6_Page37_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit6_Page37_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <ExerciseHeader
          isWorkbook
          sectionLetter="K"
          title={<>Match.</>}
          subTitle="Start with one item, find the partner that matches its meaning or picture, then connect the pair before moving on."
        />

        {/* CONTENT */}

        <div className="grid grid-cols-2 gap-x-16">
          {/* LEFT SIDE */}

          <div className="flex flex-col gap-10">
            {leftItems.map((item, index) => (
              <SentenceGroup
                label={`Hear ${item}`}
                src={
                  [soundK2, soundK4, soundK6, soundK8, soundK10, soundK12][
                    index
                  ]
                }
                id={`left-${index}`}
                audio={audio}
                key={index}
                className="flex items-center gap-4"
              >
                {/* INPUT */}

                {inputField(index)}

                {/* NUMBER */}

                <span className="font-bold w-[18px]">{index + 1}</span>

                {/* TEXT */}

                <span>{item}</span>
              </SentenceGroup>
            ))}
          </div>

          {/* RIGHT SIDE */}

          <div className="flex flex-col gap-10">
            {rightItems.map((item, index) => (
              <SentenceGroup
                label={`Hear ${item.letter}. ${item.text}`}
                src={
                  [soundK1, soundK3, soundK5, soundK7, soundK9, soundK11][index]
                }
                id={`right-${index}`}
                audio={audio}
                key={index}
                className="flex items-start gap-4 leading-[1.4]"
              >
                {/* LETTER */}

                <span className="font-bold">{item.letter}</span>

                {/* TEXT */}

                <span>{item.text}</span>
              </SentenceGroup>
            ))}
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

export default WB_Unit6_Page37_Q1;
