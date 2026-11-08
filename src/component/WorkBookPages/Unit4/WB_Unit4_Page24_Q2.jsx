import soundI1 from "../../../assets/audio/Workbook/Unit 4/Page 24 - I/Item_001_rides_his_bike.mp3";
import soundI3 from "../../../assets/audio/Workbook/Unit 4/Page 24 - I/Item_003_They.mp3";
import soundI2 from "../../../assets/audio/Workbook/Unit 4/Page 24 - I/Item_002_He.mp3";
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
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U4/Page 24/Asset 2.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U4/Page 24/Asset 3.svg";
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

const WB_Unit4_Page24_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const answers = ["always", "often read a book together"];

  const questions = [
    {
      image: img1,
      before: "He",
      after: "rides his bike.",
    },

    {
      image: img2,
      before: "They",
      after: "",
    },
  ];

  const [studentAnswers, setStudentAnswers] = useState(["", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = studentAnswers.map((row) =>
      Array.isArray(row) ? [...row] : row,
    );

    updated[i] = value;

    setStudentAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

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

  const showAnswers = () => {
    audio.stop();
    setAnnouncement("Model answers shown and locked.");
    resetButtonRef.current?.focus({ preventScroll: true });
    setStudentAnswers(answers);

    setResult([true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width = "320px") => (
    <div className="relative inline-block">
      <input
        aria-invalid={result[i] === false}
        placeholder={"Word or phrase"}
        title={`Picture ${i + 1}: ${questions[i].before} ___ ${questions[i].after}`}
        aria-label={`Picture ${i + 1}: ${questions[i].before} ___ ${questions[i].after}`}
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
          borderBottomColor: result[i] === true ? "#16a34a" : undefined,
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
      data-exercise-scope={"WB_Unit4_Page24_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit4_Page24_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit4_Page24_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit4_Page24_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[18px]" style={{gap:"80px"}}>
        {/* TITLE */}
        <ExerciseHeader
          isWorkbook
          sectionLetter="I"
          title={
            <>
              Look and write. Use an{" "}
              <span className="text-[#00AEEF]">adverb of frequency.</span>
            </>
          }
          subTitle="Use the percentage, picture, or context clue to choose the adverb, then place it in the natural position in the sentence."
        />

        {/* QUESTIONS */}
        <div className="flex flex-col gap-14">
          {questions.map((q, index) => (
            <div key={index} className="flex items-center gap-12">
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={q.image}
                  alt={
                    [
                      "A child riding a bicycle, with a 100% frequency clue.",
                      "A man reading a book with two children, with a 60% frequency clue.",
                    ][index]
                  }
                  style={{
                    width: "180px",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* QUESTION */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-bold">{index + 1}</span>

                <span>
                  <AudioText
                    audio={audio}
                    id={`before-${index}`}
                    src={[soundI2, soundI3][index]}
                    label={`Hear ${q.before}`}
                  >
                    {q.before}
                  </AudioText>
                </span>

                {inputField(index)}

                {q.after && (
                  <span>
                    <AudioText
                      audio={audio}
                      id={`after-${index}`}
                      src={soundI1}
                      label={`Hear ${q.after}`}
                    >
                      {q.after}
                    </AudioText>
                  </span>
                )}
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

export default WB_Unit4_Page24_Q2;
