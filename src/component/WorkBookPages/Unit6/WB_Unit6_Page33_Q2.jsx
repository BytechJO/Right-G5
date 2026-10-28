import soundB3 from "../../../assets/audio/Workbook/Unit 6/Page 33 - B/Item_003_My_expert_friend_always_gets_me_the_best_gifts.mp3";
import soundB2 from "../../../assets/audio/Workbook/Unit 6/Page 33 - B/Item_002_I_have_in_a_row_of_apples_in_my_tree.mp3";
import soundB1 from "../../../assets/audio/Workbook/Unit 6/Page 33 - B/Item_001_Why_don't_you_trade_the_discount_on_all_new_toys.mp3";
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

const WB_Unit6_Page33_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      sentence: "Why don’t you trade the discount on all new toys?",

      underlined: "trade",

      answer: "Why don’t you take advantage of the discount on all new toys?",
    },

    {
      sentence: "I have in a row of apples in my tree.",

      underlined: "in a row",

      answer: "I have a bunch of apples in my tree.",
    },

    {
      sentence: "My expert friend always gets me the best gifts.",

      underlined: "expert",

      answer: "My generous friend always gets me the best gifts.",
    },
  ];

  const [studentAnswers, setStudentAnswers] = useState(["", "", ""]);

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
    setStudentAnswers([
      "Why don’t you take advantage of the discount on all new toys?",

      "I have a bunch of apples in my tree.",

      "My generous friend always gets me the best gifts.",
    ]);

    setResult([true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", "", ""]);

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
        placeholder={"Corrected sentence"}
        aria-invalid={result[i] === false}
        title={`Rewrite sentence ${i + 1}, replacing the underlined expression: ${questions[i].sentence}`}
        aria-label={`Rewrite sentence ${i + 1}, replacing the underlined expression: ${questions[i].sentence}`}
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
          text-[20px]
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

  // ------------------------
  // UNDERLINE WORD
  // ------------------------

  const renderSentence = (sentence, underlined) => {
    const parts = sentence.split(underlined);

    return (
      <>
        {parts[0]}

        <span
          style={{
            textDecoration: "underline",
          }}
        >
          {underlined}
        </span>

        {parts[1]}
      </>
    );
  };

  return (
    <div
      data-exercise-scope={"WB_Unit6_Page33_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit6_Page33_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit6_Page33_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit6_Page33_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[20px] " style={{gap:"50px"}}>
        {/* TITLE */}

        <ExerciseHeader
          isWorkbook
          sectionLetter="B"
          title={<>Read, change, and write.</>}
          subTitle="Locate the incorrect word or phrase first, then rewrite only what is needed and reread the whole sentence."
        />

        {/* QUESTIONS */}

        <div className="flex flex-col gap-12">
          {questions.map((question, index) => (
            <div key={index} className="w-full">
              {/* SENTENCE */}

              <SentenceGroup
                label={`Hear sentence ${index + 1}: ${question.sentence}`}
                src={[soundB1, soundB2, soundB3][index]}
                id={`sentence-${index}`}
                audio={audio}
                className="flex items-start gap-4 mb-4"
              >
                <span className="font-bold">{index + 1}</span>

                <div className="leading-[1.6]">
                  {renderSentence(question.sentence, question.underlined)}
                </div>
              </SentenceGroup>

              {/* INPUT */}

              <div className="pl-[35px]">{inputField(index)}</div>
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

export default WB_Unit6_Page33_Q2;
