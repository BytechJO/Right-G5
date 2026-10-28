import soundB3 from "../../../assets/audio/Workbook/Unit 10/Page 57 - B/Item_003_This_is_a_very_fun_nstrntuiem.mp3";
import soundB2 from "../../../assets/audio/Workbook/Unit 10/Page 57 - B/Item_002_He_played_in_a_spyhomyn_with_his_violin.mp3";
import soundB1 from "../../../assets/audio/Workbook/Unit 10/Page 57 - B/Item_001_We_are_vanresgtih_our_hay.mp3";
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
import hayImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U10/Page 57/Asset 11.svg";
import violinImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U10/Page 57/Asset 12.svg";
import pianoImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U10/Page 57/Asset 3.svg";
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

const WB_Unit10_Page57_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      scrambled: "vanresgtih",

      sentence: (
        <>
          We are{" "}
          <span
            style={{
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            }}
          >
            vanresgtih
          </span>{" "}
          our hay.
        </>
      ),

      answer: "We are harvesting our hay.",
    },

    {
      scrambled: "spyhomyn",

      sentence: (
        <>
          He played in a{" "}
          <span
            style={{
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            }}
          >
            spyhomyn
          </span>{" "}
          with his violin.
        </>
      ),

      answer: "He played in a symphony with his violin.",
    },

    {
      scrambled: "nstrntuiem",

      sentence: (
        <>
          This is a very fun{" "}
          <span
            style={{
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            }}
          >
            nstrntuiem
          </span>
          .
        </>
      ),

      answer: "This is a very fun instrument.",
    },
  ];

  const images = [hayImg, violinImg, pianoImg];

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
    setStudentAnswers(questions.map((q) => q.answer));

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
        placeholder={"Complete sentence"}
        aria-invalid={result[i] === false}
        title={`Unscramble the underlined word in sentence ${i + 1}: ${questions[i].scrambled}. Rewrite the sentence.`}
        aria-label={`Unscramble the underlined word in sentence ${i + 1}: ${questions[i].scrambled}. Rewrite the sentence.`}
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
      data-exercise-scope={"WB_Unit10_Page57_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit10_Page57_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit10_Page57_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit10_Page57_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
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
          sectionLetter="B"
          title={<>Look, unscramble, and write.</>}
          subTitle="Say the correct word, expression, or sentence first, then reorder it and check spelling, capitalization, and punctuation."
        />

        {/* QUESTIONS */}

        <div className="flex flex-col gap-10">
          {questions.map((q, index) => (
            <div key={index} className="flex gap-6 items-start">
              {/* NUMBER */}

              <span className="font-bold mt-2">{index + 1}</span>

              {/* IMAGE */}

              <img
                src={images[index]}
                alt=""
                style={{
                  width: "200px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />

              {/* RIGHT */}

              <SentenceGroup
                label={`Hear sentence ${index + 1}`}
                src={[soundB1, soundB2, soundB3][index]}
                id={`sentence-${index}`}
                audio={audio}
                className="flex-1 pt-3"
              >
                {/* SCRAMBLED */}

                <div className="mb-5 leading-[1.8]">{q.sentence}</div>

                {/* INPUT */}

                {inputField(index)}
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

export default WB_Unit10_Page57_Q2;
