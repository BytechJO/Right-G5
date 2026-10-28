import soundF5 from "../../../assets/audio/Workbook/Unit 10/Page 59 - F/Item_005_(eat_his_soup).mp3";
import soundF4 from "../../../assets/audio/Workbook/Unit 10/Page 59 - F/Item_004_(read_a_book).mp3";
import soundF3 from "../../../assets/audio/Workbook/Unit 10/Page 59 - F/Item_003_(ride_their_bikes).mp3";
import soundF1 from "../../../assets/audio/Workbook/Unit 10/Page 59 - F/Item_001_(play_the_drums).mp3";
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

// IMAGES
import drumsImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U10/Page 59/Asset 4.svg";
import bikesImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U10/Page 59/Asset 5.svg";
import readingImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U10/Page 59/Asset 6.svg";
import soupImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U10/Page 59/Asset 7.svg";
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

const WB_Unit_Test_Q30 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      clue: "(play the drums)",

      answer: "He was playing the drums.",
    },

    {
      clue: "(ride their bikes)",

      answer: "They were riding their bikes.",
    },

    {
      clue: "(read a book)",

      answer: "She was reading a book.",
    },

    {
      clue: "(eat his soup)",

      answer: "He was eating his soup.",
    },
  ];

  const images = [drumsImg, bikesImg, readingImg, soupImg];

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

  const inputField = (i) => (
    <div className="relative w-full">
      <input
        style={{
          borderBottomColor:
            result[i] === true
              ? "#16a34a"
              : result[i] === false
                ? "#D1232A"
                : undefined,
        }}
        placeholder={"Past progressive sentence"}
        aria-invalid={result[i] === false}
        title={`Picture ${i + 1}: ${questions[i].clue}. Write a past progressive sentence.`}
        aria-label={`Picture ${i + 1}: ${questions[i].clue}. Write a past progressive sentence.`}
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
      data-exercise-scope={"WB_Unit10_Page59_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit10_Page59_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit10_Page59_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit10_Page59_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[18px] w-full mb-10">
        {/* TITLE */}

        <ExerciseHeader
          isWorkbook
          sectionLetter="F"
          title={
            <>
              Look and write a sentence using the{" "}
              <span className="text-[#00AEEF]">
                past progressive tense (was/were + verb + ing).
              </span>
            </>
          }
          subTitle="Match the subject with was or were, add the -ing verb, and check that the sentence describes an action in progress in the past."
        />

        {/* QUESTIONS */}

        <div className="flex flex-col gap-5">
          {questions.map((q, index) => (
            <div key={index} className="flex gap-6 items-start">
              {/* NUMBER */}

              <span className="font-bold mt-2">{index + 1}</span>

              {/* IMAGE */}

              <img
                src={images[index]}
                alt=""
                style={{
                  width: "170px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />

              {/* RIGHT */}

              <SentenceGroup
                label={`Hear clue ${index + 1}: ${q.clue}`}
                src={[soundF1, soundF3, soundF4, soundF5][index]}
                id={`clue-${index}`}
                audio={audio}
                className="flex-1 flex flex-col gap-8 pt-2"
              >
                {/* LINE 1 */}

                {inputField(index)}
                {/* CLUE */}
                <span className="text-[18px]">{q.clue}</span>
              </SentenceGroup>
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

export default WB_Unit_Test_Q30;
