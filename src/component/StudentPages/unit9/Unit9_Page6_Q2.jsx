import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import { AudioFeedback } from "../unit5/ExerciseAudioText";

import React, { useState, useRef } from "react";

import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 9 What If Folder/Page 81/SVG/Asset 17.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 9 What If Folder/Page 81/SVG/Asset 8.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 9 What If Folder/Page 81/SVG/Asset 18.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 9 What If Folder/Page 81/SVG/Asset 10.svg";

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

const Unit9_Page6_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    "If it snows, we’ll have a snowball fight.",
    "If she reads the book, she’ll get an A on her paper.",
    "When Helen calls her friend, they will be able to play together.",
    "If the man fixes the tire on his bike, he will be able to ride the bike.",
  ];

  const [answers, setAnswers] = useState([
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
  ]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const inputRefs = useRef([]);

  const normalize = normalizeAnswer;

  const handleChange = (qIndex, lineIndex, value) => {
    if (locked || result[qIndex] === true) return;
    setAnswers((previous) =>
      previous.map((lines, i) =>
        i === qIndex
          ? lines.map((line, j) => (j === lineIndex ? value : line))
          : lines,
      ),
    );
    setResult((previous) => {
      const next = [...previous];
      next[qIndex] = undefined;
      return next;
    });
  };

  const checkAnswers = () => {
    if (locked) return;
    audio.stop();

    const hasEmpty = answers.some((group) =>
      group.every((line) => !line.trim()),
    );

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

    const newResults = answers.map((group, i) => {
      // اعتبر الانبوتين كأنهم input واحد
      const combined = `${group[0]} ${group[1]}`;

      const ok = normalize(combined) === normalize(questions[i]);

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
    setAnswers([
      ["If it snows,", "we’ll have a snowball fight."],
      ["If she reads the book,", "she’ll get an A on her paper."],
      ["When Helen calls her friend,", "they will be able to play together."],
      [
        "If the man fixes the tire on his bike,",
        "he will be able to ride the bike.",
      ],
    ]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers([
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
    ]);

    setResult([]);

    setLocked(false);
  };

  const lineInput = (qIndex, lineIndex, width) => (
    <span className="relative inline-block">
      <input
        style={{
          ...(result[qIndex] === true ? { borderBottomColor: "#16a34a" } : {}),
        }}
        aria-invalid={!!(result[qIndex] === false)}
        title={`Picture ${qIndex + 1}, sentence line ${lineIndex + 1}; both lines form one answer`}
        aria-label={`Picture ${qIndex + 1}, sentence line ${lineIndex + 1}; both lines form one answer`}
        {...fieldKeys}
        ref={lineIndex === 1 ? (el) => (inputRefs.current[qIndex] = el) : null}
        type="text"
        value={answers[qIndex][lineIndex]}
        disabled={locked || result[qIndex] === true}
        onChange={(e) => handleChange(qIndex, lineIndex, e.target.value)}
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

          ${result[qIndex] === false ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {lineIndex === 1 && result[qIndex] === false && (
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
    </span>
  );

  return (
    <div
      data-exercise-scope={"Unit9_Page6_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit9_Page6_Q2.jsx"] input:focus-visible,[data-exercise-scope="Unit9_Page6_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Unit9_Page6_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall " style={{gap:"30px"}}>
        {/* TITLE */}
        <ExerciseHeader
          sectionLetter="E"
          title={
            <>
              Look at each pair of pictures, and then write a sentence about
              them.
            </>
          }
          subTitle="Use the prompt and grammar pattern to write a complete sentence, then reread it for meaning, tense, and punctuation."
        />

        {/* TOP ROW */}
        <div className="flex gap-20 mb-12">
          {/* IMAGE 1 */}
          <div>
            <img
              src={img1}
              alt={
                "Snow falling around a snowman, and children throwing snowballs."
              }
              style={{
                width: "300px",
                height: "auto",
              }}
            />

            <div className="mt-5 flex items-start gap-4">
              <span className="font-bold text-[18px]">1</span>

              <div className="flex flex-col gap-4">
                {lineInput(0, 0, "w-[320px]")}

                {lineInput(0, 1, "w-[320px]")}
              </div>
            </div>
          </div>

          {/* IMAGE 2 */}
          <div>
            <img
              src={img2}
              alt={
                "A girl reading a book in an armchair, and a sheet of paper marked A plus."
              }
              style={{
                width: "300px",
                height: "auto",
              }}
            />

            <div className="mt-5 flex items-start gap-4">
              <span className="font-bold text-[18px]">2</span>

              <div className="flex flex-col gap-4">
                {lineInput(1, 0, "w-[320px]")}

                {lineInput(1, 1, "w-[320px]")}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="flex gap-20 mb-10">
          {/* IMAGE 3 */}
          <div>
            <img
              src={img3}
              alt={
                "A girl speaking on a telephone, and two girls playing hopscotch."
              }
              style={{
                width: "300px",
                height: "auto",
              }}
            />

            <div className="mt-5 flex items-start gap-4">
              <span className="font-bold text-[18px]">3</span>

              <div className="flex flex-col gap-4">
                {lineInput(2, 0, "w-[320px]")}

                {lineInput(2, 1, "w-[320px]")}
              </div>
            </div>
          </div>

          {/* IMAGE 4 */}
          <div>
            <img
              src={img4}
              alt={
                "A boy riding a bicycle, and a boy repairing a bicycle wheel."
              }
              style={{
                width: "300px",
                height: "auto",
              }}
            />

            <div className="mt-5 flex items-start gap-4">
              <span className="font-bold text-[18px]">4</span>

              <div className="flex flex-col gap-4">
                {lineInput(3, 0, "w-[320px]")}

                {lineInput(3, 1, "w-[320px]")}
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

export default Unit9_Page6_Q2;
