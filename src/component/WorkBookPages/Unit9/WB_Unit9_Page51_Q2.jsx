import soundB15 from "../../../assets/audio/Workbook/Unit 9/Page 51 - B/Item_015_to_the_hospital._I_have_a_terrible_stomachache.mp3";
import soundB14 from "../../../assets/audio/Workbook/Unit 9/Page 51 - B/Item_014_I_need_to.mp3";
import soundB13 from "../../../assets/audio/Workbook/Unit 9/Page 51 - B/Item_013_what_I'll_do.mp3";
import soundB12 from "../../../assets/audio/Workbook/Unit 9/Page 51 - B/Item_012_I'll_go_to_the_grocery_store_and_get_you_some_bread._That's.mp3";
import soundB11 from "../../../assets/audio/Workbook/Unit 9/Page 51 - B/Item_011_club_meeting_at_4_00_is_good._I'm_sure.mp3";
import soundB10 from "../../../assets/audio/Workbook/Unit 9/Page 51 - B/Item_010_I'm_joining_a_new_book_club._I'll_begin_tomorrow_and.mp3";
import soundB9 from "../../../assets/audio/Workbook/Unit 9/Page 51 - B/Item_009_I'm_going_to_graduate_next_week!.mp3";
import soundB8 from "../../../assets/audio/Workbook/Unit 9/Page 51 - B/Item_008_I_have.mp3";
import soundB7 from "../../../assets/audio/Workbook/Unit 9/Page 51 - B/Item_007_!_You_won_this_game.mp3";
import soundB6 from "../../../assets/audio/Workbook/Unit 9/Page 51 - B/Item_006_great_news.mp3";
import soundB5 from "../../../assets/audio/Workbook/Unit 9/Page 51 - B/Item_005_see_how_it_goes.mp3";
import soundB4 from "../../../assets/audio/Workbook/Unit 9/Page 51 - B/Item_004_that'll_work.mp3";
import soundB3 from "../../../assets/audio/Workbook/Unit 9/Page 51 - B/Item_003_exactly.mp3";
import soundB2 from "../../../assets/audio/Workbook/Unit 9/Page 51 - B/Item_002_congratulations.mp3";
import soundB1 from "../../../assets/audio/Workbook/Unit 9/Page 51 - B/Item_001_rush.mp3";
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

const WB_Unit9_Page51_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const wordBank = [
    "rush",
    "congratulations",
    "exactly",
    "that’ll work",
    "see how it goes",
    "great news",
  ];

  const questions = [
    {
      before: "",

      after: "! You won this game.",

      answer: "congratulations",
    },

    {
      before: "I have",

      after: ". I’m going to graduate next week!",

      answer: "great news",
    },

    {
      before: "I’m joining a new book club. I’ll begin tomorrow and",

      after: ".",

      answer: "see how it goes",
    },

    {
      before: "A club meeting at 4:00 is good. I’m sure",

      after: ".",

      answer: "that’ll work",
    },

    {
      before: "I’ll go to the grocery store and get you some bread. That’s",

      after: "what I’ll do.",

      answer: "exactly",
    },

    {
      before: "I need to",

      after: "to the hospital. I have a terrible stomachache.",

      answer: "rush",
    },
  ];

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

    const normalizedCorrect = questions.map((q) => normalize(q.answer));

    const usedAnswers = [];

    const newResults = studentAnswers.map((answer) => {
      const normalizedStudent = normalize(answer);

      const foundIndex = normalizedCorrect.findIndex(
        (correct, index) =>
          correct === normalizedStudent && !usedAnswers.includes(index),
      );

      const ok = foundIndex !== -1;

      if (ok) {
        usedAnswers.push(foundIndex);

        correctCount++;
      }

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

  const inputField = (i, width = "250px") => (
    <div className="relative inline-block">
      <input
        placeholder={"Word / phrase"}
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
      data-exercise-scope={"WB_Unit9_Page51_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit9_Page51_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit9_Page51_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit9_Page51_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[18px] w-full mb-10" >
        {/* TITLE */}

        <ExerciseHeader
          isWorkbook
          sectionLetter="B"
          title={<>Read and write.</>}
          subTitle="Read the full sentence first, then choose the word or expression that fits both the meaning and grammar."
        />

        {/* WORD BANK */}

        <div
          style={{
            border: "2px solid #6D2980",
            borderRadius: "12px",
            padding: "14px 26px",
          }}
          className="grid grid-cols-3 gap-x-25 gap-y-3 w-fit mx-auto"
        >
          {wordBank.map((word, index) => (
            <span key={index}>
              <AudioText
                audio={audio}
                id={`bank-${index}`}
                src={
                  [soundB1, soundB2, soundB3, soundB4, soundB5, soundB6][index]
                }
                label={`Hear ${word}`}
              >
                {word}
              </AudioText>
            </span>
          ))}
        </div>

        {/* QUESTIONS */}

        <div className="flex flex-col gap-6">
          {questions.map((q, index) => (
            <div key={index}>
              <div className="flex items-start gap-4">
                {/* NUMBER */}

                <span className="font-bold">{index + 1}</span>

                {/* SENTENCE */}

                <div className="leading-[1.8] flex-1">
                  {[null, soundB8, soundB10, soundB11, soundB12, soundB14][
                    index
                  ] ? (
                    <AudioText
                      audio={audio}
                      id={`before-${index}`}
                      src={
                        [null, soundB8, soundB10, soundB11, soundB12, soundB14][
                          index
                        ]
                      }
                      label={"Hear " + q.before}
                    >
                      {q.before}
                    </AudioText>
                  ) : (
                    q.before
                  )}{" "}
                  {inputField(
                    index,
                    index === 2 ? "420px" : index === 3 ? "230px" : "260px",
                  )}{" "}
                  {[soundB7, soundB9, null, null, soundB13, soundB15][index] ? (
                    <AudioText
                      audio={audio}
                      id={`after-${index}`}
                      src={
                        [soundB7, soundB9, null, null, soundB13, soundB15][
                          index
                        ]
                      }
                      label={"Hear " + q.after}
                    >
                      {q.after}
                    </AudioText>
                  ) : (
                    q.after
                  )}
                </div>
              </div>
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

export default WB_Unit9_Page51_Q2;
