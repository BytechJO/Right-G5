import clip0 from "../../../assets/audio/ClassBook/U10/Page 87 - D/Item_001_skating.mp3";
import clip1 from "../../../assets/audio/ClassBook/U10/Page 87 - D/Item_002_hiking.mp3";
import clip2 from "../../../assets/audio/ClassBook/U10/Page 87 - D/Item_003_lifting_weights.mp3";
import clip3 from "../../../assets/audio/ClassBook/U10/Page 87 - D/Item_004_waterskiing.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import { AudioText, AudioFeedback } from "../unit5/ExerciseAudioText";

import React, { useState } from "react";

import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 10 It Was the Best Day! Folder/Page 87/SVG/Asset 8.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 10 It Was the Best Day! Folder/Page 87/SVG/Asset 9.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 10 It Was the Best Day! Folder/Page 87/SVG/Asset 10.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 10 It Was the Best Day! Folder/Page 87/SVG/Asset 11.svg";

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

const Unit10_Page6_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    "The mom and son were skating on a sunny day.",
    "They were hiking together in the woods.",
    "The man was lifting weights in the gym.",
    "She was waterskiing in summer.",
  ];

  const hints = ["skating", "hiking", "lifting weights", "waterskiing"];

  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const handleChange = (qIndex, value) => {
    if (locked || result[qIndex] === true) return;

    const updated = [...answers];

    updated[qIndex] = value;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[qIndex] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;
    audio.stop();

    const hasEmpty = answers.some((answer) => !answer.trim());

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
      const ok = normalize(group) === normalize(questions[i]);

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
      "The mom and son were skating on a sunny day.",
      "They were hiking together in the woods.",
      "The man was lifting weights in the gym.",
      "She was waterskiing in summer.",
    ]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const lineInput = (qIndex, width) => (
    <span className="relative inline-block">
      <input placeholder={"Sentence"}
        style={{
          ...(result[qIndex] === true ? { borderBottomColor: "#16a34a" } : {}),
        }}
        aria-invalid={result[qIndex] === false}
        title={`Picture ${qIndex + 1}, write a past progressive sentence using ${hints[qIndex]}`}
        aria-label={`Picture ${qIndex + 1}, write a past progressive sentence using ${hints[qIndex]}`}
        {...fieldKeys}
        type="text"
        value={answers[qIndex]}
        disabled={locked || result[qIndex] === true}
        onChange={(e) => handleChange(qIndex, e.target.value)}
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

      {result[qIndex] === false && (
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
      data-exercise-scope={"Unit10_Page6_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit10_Page6_Q1.jsx"] input:focus-visible,[data-exercise-scope="Unit10_Page6_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="Unit10_Page6_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall mb-10" style={{gap:"30px"}}>
        {/* TITLE */}
        <ExerciseHeader
          sectionLetter="D"
          title={
            <>
              Look at the picture, and then write the correct past progressive
              verb phrase.
            </>
          }
          subTitle="Use the picture, definition, chart, or grammar clue, then complete each answer before checking."
        />

        {/* MAIN BOX */}
        <div>
          {/* ROW 1 */}
          <div
            className="flex items-center"
            style={{
              padding: "10px",
            }}
          >
            <img
              src={img1}
              alt={
                "An adult and a child wearing helmets and protective pads, inline skating on a paved path."
              }
              style={{
                width: "150px",
                height: "auto",
                objectFit: "contain",
              }}
            />

            <div className="ml-10 flex-1">
              <div className="flex gap-4 items-start">
                <span className="font-bold text-[18px]">1</span>

                <div className="flex flex-col gap-5">
                  {lineInput(0, "w-[520px]")}
                </div>
              </div>

              <div
                className="text-[#1DA1F2] text-[18px] mt-4"
                style={{
                  marginLeft: "34px",
                }}
              >
                <AudioText
                  audio={audio}
                  id={"hint-0"}
                  src={clip0}
                  label={`Hear clue: ${hints[0]}`}
                >
                  ({hints[0]})
                </AudioText>
              </div>
            </div>
          </div>

          {/* ROW 2 */}
          <div
            className="flex items-center"
            style={{
              padding: "10px",
            }}
          >
            <img
              src={img2}
              alt={"Children carrying backpacks hiking along a woodland trail."}
              style={{
                width: "150px",
                height: "auto",
                objectFit: "contain",
              }}
            />

            <div className="ml-10 flex-1">
              <div className="flex gap-4 items-start">
                <span className="font-bold text-[18px]">2</span>

                <div className="flex flex-col gap-5">
                  {lineInput(1, "w-[520px]")}
                </div>
              </div>

              <div
                className="text-[#1DA1F2] text-[18px] mt-4"
                style={{
                  marginLeft: "34px",
                }}
              >
                <AudioText
                  audio={audio}
                  id={"hint-1"}
                  src={clip1}
                  label={`Hear clue: ${hints[1]}`}
                >
                  ({hints[1]})
                </AudioText>
              </div>
            </div>
          </div>

          {/* ROW 3 */}
          <div
            className="flex items-center"
            style={{
              padding: "10px",
            }}
          >
            <img
              src={img3}
              alt={"A person wearing a life jacket waterskiing."}
              style={{
                width: "150px",
                height: "auto",
                objectFit: "contain",
              }}
            />

            <div className="ml-10 flex-1">
              <div className="flex gap-4 items-start">
                <span className="font-bold text-[18px]">3</span>

                <div className="flex flex-col gap-5">
                  {lineInput(2, "w-[520px]")}
                </div>
              </div>

              <div
                className="text-[#1DA1F2] text-[18px] mt-4"
                style={{
                  marginLeft: "34px",
                }}
              >
                <AudioText
                  audio={audio}
                  id={"hint-2"}
                  src={clip2}
                  label={`Hear clue: ${hints[2]}`}
                >
                  ({hints[2]})
                </AudioText>
              </div>
            </div>
          </div>

          {/* ROW 4 */}
          <div
            className="flex items-center"
            style={{
              padding: "10px",
            }}
          >
            <img
              src={img4}
              alt={"A man lifting a barbell in a gym."}
              style={{
                width: "150px",
                height: "auto",
                objectFit: "contain",
              }}
            />

            <div className="ml-10 flex-1">
              <div className="flex gap-4 items-start">
                <span className="font-bold text-[18px]">4</span>

                <div className="flex flex-col gap-5">
                  {lineInput(3, "w-[520px]")}
                </div>
              </div>

              <div
                className="text-[#1DA1F2] text-[18px] mt-4"
                style={{
                  marginLeft: "34px",
                }}
              >
                <AudioText
                  audio={audio}
                  id={"hint-3"}
                  src={clip3}
                  label={`Hear clue: ${hints[3]}`}
                >
                  ({hints[3]})
                </AudioText>
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

export default Unit10_Page6_Q1;
