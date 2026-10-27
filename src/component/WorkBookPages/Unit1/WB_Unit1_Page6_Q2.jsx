import clip0 from "../../../assets/audio/Workbook/Unit 1/Page 6 - J/Item_001_deep.mp3";
import clip1 from "../../../assets/audio/Workbook/Unit 1/Page 6 - J/Item_002_much.mp3";
import clip2 from "../../../assets/audio/Workbook/Unit 1/Page 6 - J/Item_003_far.mp3";
import clip3 from "../../../assets/audio/Workbook/Unit 1/Page 6 - J/Item_004_five_kilometers.mp3";
import clip4 from "../../../assets/audio/Workbook/Unit 1/Page 6 - J/Item_005_is_it_to_your_home.mp3";

import clip6 from "../../../assets/audio/Workbook/Unit 1/Page 6 - J/Item_007_away.mp3";
import clip7 from "../../../assets/audio/Workbook/Unit 1/Page 6 - J/Item_008_one_dollar.mp3";
import clip8 from "../../../assets/audio/Workbook/Unit 1/Page 6 - J/Item_009_three_meters_deep.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
} from "../../StudentPages/unit5/ExerciseAudioText";

import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U1/Page 6/Asset 7.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U1/Page 6/Asset 8.svg";
import img3 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U1/Page 6/Asset 9.svg";
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

const WB_Unit1_Page6_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      q: "How far ",
      a: "five miles",
      image: img1,
    },
    {
      q: "How much are the chips?",
      a: "It is one dollar.",
      image: img2,
    },
    {
      q: "How deep is the pool?",
      a: "It is four feet deep.",
      image: img3,
    },
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

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

    const hasEmpty = answers.some((a) => !a.trim());

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
      const qIndex = Math.floor(i / 2);

      const expected = i % 2 === 0 ? questions[qIndex].q : questions[qIndex].a;

      const ok = normalize(a) === normalize(expected);

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
    setAnswers([
      "How far ",
      "five miles",

      "How much are the chips",
      "It is one dollar",

      "How deep is the pool",
      "It is four feet deep",
    ]);

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width) => (
    <div className="relative inline-block">
      <input
        placeholder={i % 2 === 0 ? "Question" : "Answer"}
        style={{
          ...(result[i] === true ? { borderBottomColor: "#16a34a" } : {}),
        }}
        aria-invalid={result[i] === false}
        title={
          i % 2 === 0
            ? `Picture ${Math.floor(i / 2) + 1}, write the How question or question opening`
            : `Picture ${Math.floor(i / 2) + 1}, write the answer using the displayed measurement or price`
        }
        aria-label={
          i % 2 === 0
            ? `Picture ${Math.floor(i / 2) + 1}, write the How question or question opening`
            : `Picture ${Math.floor(i / 2) + 1}, write the answer using the displayed measurement or price`
        }
        {...fieldKeys}
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          ${width}
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
      data-exercise-scope={"WB_Unit1_Page6_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit1_Page6_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit1_Page6_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit1_Page6_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall " style={{ gap: "30px" }}>
        {/* TITLE */}
        <ExerciseHeader
          subTitle="Use the picture as the main clue, identify the action or detail shown, then write the complete question or sentence."
          isWorkbook
          sectionLetter="J"
          title={
            <>
              Look, and then write “<span className="text-[#19B6F0]">How</span>”
              questions and answer them.Use the adjectives in the word box.
            </>
          }
        />

        {/* WORD BOXES */}
        <div
          style={{
            border: "2px solid #7D3C98",
            borderRadius: "12px",
            padding: "8px 24px",
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            width: "fit-content",
            margin: "0 auto 8px auto",
            fontSize: "18px",
          }}
        >
          <span>
            <AudioText
              audio={audio}
              id={"audio-0"}
              src={clip0}
              label={"Hear deep"}
            >
              deep
            </AudioText>
          </span>

          <span>
            <AudioText
              audio={audio}
              id={"audio-1"}
              src={clip1}
              label={"Hear much"}
            >
              much
            </AudioText>
          </span>

          <span>
            <AudioText
              audio={audio}
              id={"audio-2"}
              src={clip2}
              label={"Hear far"}
            >
              far
            </AudioText>
          </span>
        </div>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-10 text-[18px] mb-15">
          {/* 1 */}
          <div className="flex gap-12 items-start">
            {/* LEFT */}
            <div className="flex items-start gap-4 w-60">
              <span className="font-bold mt-3">1</span>

              <img
                src={questions[0].image}
                alt={
                  [
                    "A small house with an orange roof.",
                    "A packet labeled Chips.",
                    "Two children playing in a small inflatable swimming pool.",
                  ][0]
                }
                style={{
                  width: "180px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-6 w-[520px] mt-1">
              <span>
                <AudioText
                  audio={audio}
                  id={"audio-3"}
                  src={clip3}
                  label={"Hear five kilometers"}
                >
                  five kilometers
                </AudioText>
              </span>

              <div className="flex items-center gap-2">
                <span>Q:</span>

                {inputField(0, "w-[300px]")}

                <span>
                  <AudioText
                    audio={audio}
                    id={"audio-4"}
                    src={clip4}
                    label={"Hear is it to your home?"}
                  >
                    is it to your home?
                  </AudioText>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span>A:</span>

                <span>It is</span>

                {inputField(1, "w-[300px]")}

                <span>
                  <AudioText
                    audio={audio}
                    id={"audio-5"}
                    src={clip6}
                    label={"Hear away."}
                  >
                    away.
                  </AudioText>
                </span>
              </div>
            </div>
          </div>

          {/* 2 */}
          <div className="flex gap-12 items-start">
            {/* LEFT */}
            <div className="flex items-start gap-4 w-60">
              <span className="font-bold mt-3">2</span>

              <img
                src={questions[1].image}
                alt={
                  [
                    "A small house with an orange roof.",
                    "A packet labeled Chips.",
                    "Two children playing in a small inflatable swimming pool.",
                  ][1]
                }
                style={{
                  width: "140px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-6 w-[520px] mt-1">
              <span>
                <AudioText
                  audio={audio}
                  id={"audio-6"}
                  src={clip7}
                  label={"Hear one dollar"}
                >
                  one dollar
                </AudioText>
              </span>

              <div className="flex items-center gap-2">
                <span>Q:</span>

                {inputField(2, "w-[400px]")}

                <span>?</span>
              </div>

              <div className="flex items-center gap-2">
                <span>A:</span>

                {inputField(3, "w-[400px]")}
              </div>
            </div>
          </div>

          {/* 3 */}
          <div className="flex gap-12 items-start">
            {/* LEFT */}
            <div className="flex items-start gap-4 w-60">
              <span className="font-bold mt-3">3</span>

              <img
                src={questions[2].image}
                alt={
                  [
                    "A small house with an orange roof.",
                    "A packet labeled Chips.",
                    "Two children playing in a small inflatable swimming pool.",
                  ][2]
                }
                style={{
                  width: "180px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-6 w-[520px] mt-1">
              <span>
                <AudioText
                  audio={audio}
                  id={"audio-7"}
                  src={clip8}
                  label={"Hear three meters deep"}
                >
                  three meters deep
                </AudioText>
              </span>

              <div className="flex items-center gap-2">
                <span>Q:</span>

                {inputField(4, "w-[400px]")}

                <span>?</span>
              </div>

              <div className="flex items-center gap-2">
                <span>A:</span>

                {inputField(5, "w-[400px]")}
              </div>
            </div>
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

export default WB_Unit1_Page6_Q2;
