import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import { AudioFeedback } from "../unit5/ExerciseAudioText";

import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 7 Helen Is Visiting Grandma Folder/Page 63/SVG/Asset 18.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 7 Helen Is Visiting Grandma Folder/Page 63/SVG/Asset 19.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 7 Helen Is Visiting Grandma Folder/Page 63/SVG/Asset 20.svg";
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
  text.normalize("NFKC").toLowerCase()
    .replace(/[\u2018\u2019']/g, "")
    .replace(/[.,!?;:\u2026\u201c\u201d"\u2013\u2014-]/g, " ")
    .replace(/\s+/g, " ").trim();

const Unit7_Page6_Q3 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const correctAnswers = [
    "Are they playing basketball?",
    "Are they drinking coffee?",
    "Are they picking apples?",
  ];

  const [answers, setAnswers] = useState(["", "", ""]);

  const [errors, setErrors] = useState([false, false, false]);

  const [correctLocked, setCorrectLocked] = useState([false, false, false]);

  const [locked, setLocked] = useState(false);
  // update
  const updateAnswer = (index, value) => {
    if (locked || correctLocked[index]) return;
    const updated = [...answers];

    updated[index] = value;

    setAnswers(updated);

    const updatedErrors = [...errors];

    updatedErrors[index] = false;

    setErrors(updatedErrors);
  };
  const handleCheck = () => {
    if (locked) return;
    audio.stop();

    if (answers.some((answer) => !normalizeAnswer(answer))) {
      const message = "Please complete all fields.";
      setAnnouncement(message);
      ValidationAlert.info(message);
      return;
    }

    const nextLocked = answers.map((answer, index) =>
      correctLocked[index] ||
      normalizeAnswer(answer) === normalizeAnswer(correctAnswers[index]),
    );
    const score = nextLocked.filter(Boolean).length;
    const total = correctAnswers.length;
    const complete = score === total;

    if (complete) resetButtonRef.current?.focus({ preventScroll: true });
    setCorrectLocked(nextLocked);
    setErrors(nextLocked.map((correct) => !correct));
    setLocked(complete);
    setAnnouncement([
      `Score ${score} out of ${total}.`,
      ...nextLocked.map((correct, index) =>
        `Picture ${index + 1}: ${correct ? "correct and locked" : "not correct; you can change your answer"}.`,
      ),
    ].join(" "));

    const color = complete ? "green" : score === 0 ? "red" : "orange";
    const message = `<div style="font-size:20px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${score} / ${total}</span></div>`;
    if (complete) ValidationAlert.success(message);
    else if (score === 0) ValidationAlert.error(message);
    else ValidationAlert.warning(message);
  };

  const handleShow = () => {
    audio.stop();
    setAnnouncement("Model answers shown and locked.");
    resetButtonRef.current?.focus({ preventScroll: true });
    setAnswers(correctAnswers);

    setErrors([false, false, false]);

    setCorrectLocked([true, true, true]);

    setLocked(true);
  };

  // reset
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", ""]);

    setErrors([false, false, false]);

    setCorrectLocked([false, false, false]);

    setLocked(false);
  };

  return (
    <div
      data-exercise-scope={"Unit7_Page6_Q3.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit7_Page6_Q3.jsx"] input:focus-visible,[data-exercise-scope="Unit7_Page6_Q3.jsx"] textarea:focus-visible,[data-exercise-scope="Unit7_Page6_Q3.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall"  style={{gap:"50px"}}>
        <ExerciseHeader
          sectionLetter="E"
          title={<>Look and write questions</>}
          subTitle="Use the prompt and grammar pattern to write a complete sentence, then reread it for meaning, tense, and punctuation."
        />

        {/* QUESTIONS */}
        <div className="space-y-5 text-[18px]">
          {/* 1 */}
          <div className="flex gap-6 items-center">
            <span className="font-bold -mt-20">1</span>

            {/* IMAGE */}
            <img
              src={img1}
              alt={"Children playing basketball on an outdoor court."}
              style={{
                width: "120px",
                height: "auto",
                objectFit: "contain",
              }}
            />

            {/* INPUT */}
            <div className="flex-1 mt-10 relative">
              <input
                style={{
                  ...(correctLocked[0] ? { borderBottomColor: "#16a34a" } : {}),
                }}
                aria-invalid={!!errors[0]}
                title={"Picture 1, write a question about the activity"}
                aria-label={"Picture 1, write a question about the activity"}
                {...fieldKeys}
                type="text"
                value={answers[0]}
                disabled={locked || correctLocked[0]}
                onChange={(e) => updateAnswer(0, e.target.value)}
                className={`border-b outline-none w-full text-[#6D2980] font-semibold px-2 bg-transparent
              ${errors[0] ? "border-red-500" : "border-black"}
              `}
              />

              {/* ❌ */}
              {errors[0] && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "-30px",
                    transform: "translateY(-50%)",
                    width: "22px",
                    height: "22px",
                    background: "#ef4444",
                    color: "white",
                    borderRadius: "50%",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    border: "2px solid white",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                  }}
                >
                  ✕
                </div>
              )}
            </div>
          </div>

          {/* 2 */}
          <div className="flex gap-6 items-center">
            <span className="font-bold -mt-20">2</span>

            {/* IMAGE */}
            <img
              src={img2}
              alt={"A man and a woman holding cups at a table."}
              style={{
                width: "120px",
                height: "auto",
                objectFit: "contain",
              }}
            />

            {/* INPUTS */}
            <div className="flex-1 flex items-center mt-6">
              {/* first line */}
              <div className="relative w-full">
                <input
                  style={{
                    ...(correctLocked[1]
                      ? { borderBottomColor: "#16a34a" }
                      : {}),
                  }}
                  aria-invalid={!!errors[1]}
                  title={"Picture 2, write a question about the activity"}
                  aria-label={"Picture 2, write a question about the activity"}
                  {...fieldKeys}
                  type="text"
                  value={answers[1]}
                  disabled={locked || correctLocked[1]}
                  onChange={(e) => updateAnswer(1, e.target.value)}
                  className={`border-b outline-none w-full text-[#6D2980] font-semibold px-2 bg-transparent
      ${errors[1] ? "border-red-500" : "border-black"}
      `}
                />

                {/* ❌ */}
                {errors[1] && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "-30px",
                      transform: "translateY(-50%)",
                      width: "22px",
                      height: "22px",
                      background: "#ef4444",
                      color: "white",
                      borderRadius: "50%",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      border: "2px solid white",
                      boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 3 */}
          <div className="flex gap-6 items-center">
            <span className="font-bold -mt-20">3</span>

            {/* IMAGE */}
            <img
              src={img3}
              alt={"Children picking red tomatoes from plants."}
              style={{
                width: "120px",
                height: "auto",
                objectFit: "contain",
              }}
            />

            {/* INPUTS */}
            <div className="flex-1 flex items-center mt-6">
              {/* first line */}
              <div className="relative w-full">
                <input
                  style={{
                    ...(correctLocked[2]
                      ? { borderBottomColor: "#16a34a" }
                      : {}),
                  }}
                  aria-invalid={!!errors[2]}
                  title={"Picture 3, write a question about the activity"}
                  aria-label={"Picture 3, write a question about the activity"}
                  {...fieldKeys}
                  type="text"
                  value={answers[2]}
                  disabled={locked || correctLocked[2]}
                  onChange={(e) => updateAnswer(2, e.target.value)}
                  className={`border-b outline-none w-full text-[#6D2980] font-semibold px-2 bg-transparent
      ${errors[2] ? "border-red-500" : "border-black"}
      `}
                />

                {/* ❌ */}
                {errors[2] && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "-30px",
                      transform: "translateY(-50%)",
                      width: "22px",
                      height: "22px",
                      background: "#ef4444",
                      color: "white",
                      borderRadius: "50%",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      border: "2px solid white",
                      boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    ✕
                  </div>
                )}
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
            onClick={handleShow}
          >
            Show Answer
          </button>
          <button
            {...activationKeys}
            aria-label="Check Answer"
            type="button"
            className="check-button2"
            disabled={locked}
            style={{ cursor: locked ? "not-allowed" : "pointer" }}
            onClick={handleCheck}
          >
            Check Answer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unit7_Page6_Q3;
