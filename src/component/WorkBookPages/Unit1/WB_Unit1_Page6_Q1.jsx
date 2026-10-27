import clip2 from "../../../assets/audio/Workbook/Unit 1/Page 6 - I/Item_003_How_tall_are_you_C)_C).mp3";
import clip3 from "../../../assets/audio/Workbook/Unit 1/Page 6 - I/Item_004_How_many_apples.mp3";
import clip4 from "../../../assets/audio/Workbook/Unit 1/Page 6 - I/Item_005_do_you_have.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
} from "../../StudentPages/unit5/ExerciseAudioText";

import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

import trueImg from "../../../assets/imgs/true.svg";
import flaseImg from "../../../assets/imgs/false.svg";
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U1/Page 6/Asset 13 (2).svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U1/Page 6/Asset 11.svg";
import img3 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U1/Page 6/Asset 12.svg";
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

const WB_Unit1_Page6_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      image: img1,
      text: "How many apples do you have?",
      answer: "false",
    },
    {
      image: img2,
      text: "How tall are you?",
      answer: "false",
    },
    {
      image: img3,
      text: "How old are you?",
      answer: "true",
    },
  ];

  const [answers, setAnswers] = useState(["", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const handleSelect = (i, value) => {
    if (locked || result[i] === true) return;
    setAnnouncement("Item " + (i + 1) + " selected: " + value + ".");

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

    const hasEmpty = answers.some((a) => !a);

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
      const ok = a === questions[i].answer;

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
    setAnswers(["false", "false", "true"]);

    setResult([true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const errorBadge = () => (
    <span
      style={{
        position: "absolute",
        top: "40px",
        right: "25px",
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
  );

  const markBox = (i, value, img) => (
    <button
      {...activationKeys}
      aria-label={`Picture ${i + 1}, mark ${value}: ${questions[i].text}`}
      aria-pressed={answers[i] === value}
      data-choice={true}
      type="button"
      disabled={locked || result[i] === true}
      onClick={() => handleSelect(i, value)}
      className="relative flex items-center justify-center"
      style={{
        width: "34px",
        height: "34px",
        border: "2px solid #6D2980",

        background: answers[i] === value ? "#dbeafe" : "transparent",
        cursor: locked || result[i] === true ? "default" : "pointer",
        borderRadius: 6,
        ...(answers[i] === value && result[i] !== undefined
          ? { boxShadow: result[i] ? "0 0 0 2px #16a34a" : "0 0 0 2px #D1232A" }
          : {}),
      }}
    >
      {answers[i] === value && (
        <img
          aria-hidden={true}
          src={img}
          alt={""}
          style={{
            width: "24px",
            height: "24px",
          }}
        />
      )}
    </button>
  );

  return (
    <div
      data-exercise-scope={"WB_Unit1_Page6_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit1_Page6_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit1_Page6_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit1_Page6_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall " style={{gap:"100px"}}>
        {/* TITLE */}
        <ExerciseHeader
          subTitle="Check the picture or text evidence carefully, then choose the two-way answer only after confirming the key detail."
          isWorkbook
          sectionLetter="I"
          title={
            <>
              Look, read, and write{" "}
              <span className="font-bold text-[#D1252B]"> ✓</span> or
              <span className="font-bold text-[#D1252B]">✕</span> .
            </>
          }
        />

        {/* QUESTIONS */}
        <div className="grid grid-cols-3 gap-10 text-[18px]">
          {questions.map((q, i) => (
            <div key={i} className="flex flex-col">
              <div className="flex items-start gap-2 mb-2">
                <span className="font-bold">{i + 1}</span>

                <img
                  src={q.image}
                  alt={
                    [
                      "A boy carrying a basket containing apples outdoors.",
                      "A boy standing on a weighing scale while another boy looks on.",
                      "Two girls facing each other outdoors.",
                    ][i]
                  }
                  style={{
                    width: "250px",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>

              <div className="flex items-center gap-6 ml-6">
                <p className="leading-[1.2] w-[150px]">
                  {i < 2 ? (
                    <AudioText
                      audio={audio}
                      id={`picture-question-${i}`}
                      src={i === 0 ? [clip3, clip4] : clip2}
                      label={`Hear ${q.text}`}
                    >
                      {q.text}
                    </AudioText>
                  ) : (
                    q.text
                  )}
                </p>

                <div className="relative flex items-center gap-2">
                  {markBox(i, "true", trueImg)}

                  {markBox(i, "false", flaseImg)}

                  {result[i] === false && errorBadge()}
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

export default WB_Unit1_Page6_Q1;
