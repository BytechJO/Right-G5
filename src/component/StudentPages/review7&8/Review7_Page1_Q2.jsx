import clip0 from "../../../assets/audio/ClassBook/U8/Page 70 - B/Item_001_He_is_keeping_busy.mp3";
import clip1 from "../../../assets/audio/ClassBook/U8/Page 70 - B/Item_002_They_are_jotting_down_some_information.mp3";
import clip2 from "../../../assets/audio/ClassBook/U8/Page 70 - B/Item_003_He_is_limping_stiffly.mp3";
import clip3 from "../../../assets/audio/ClassBook/U8/Page 70 - B/Item_004_She_is_looking_at_photo_albums.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import { AudioFeedback } from "../unit5/ExerciseAudioText";
import { SentenceGroup } from "../unit5/SentenceAudio";
import React, { useState } from "react";

import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 70/SVG/Asset 14.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 70/SVG/Asset 16.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 70/SVG/Asset 15.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 70/SVG/Asset 17.svg";

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

const Review7_Page1_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = ["true", "true", "false", "true"];

  const [answers, setAnswers] = useState(["", "", "", ""]);

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

    if (answers.some((a) => !a.trim())) {
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
      const ok = normalize(a) === normalize(questions[i]);

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
    setAnswers(["true", "true", "false", "true"]);

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

  const inputField = (i, width) => (
    <span className="relative inline-block">
      <input placeholder={"True/false"}
        style={{
          ...(result[i] === true ? { borderBottomColor: "#16a34a" } : {}),
        }}
        aria-invalid={!!(result[i] === false)}
        title={`Picture ${i + 1}, write true or false for the statement`}
        aria-label={`Picture ${i + 1}, write true or false for the statement`}
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
          text-[#1DA1F2]
          font-semibold
          leading-none
          align-middle
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
    </span>
  );

  return (
    <div
      data-exercise-scope={"Review7_Page1_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review7_Page1_Q2.jsx"] input:focus-visible,[data-exercise-scope="Review7_Page1_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Review7_Page1_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall" style={{gap:"50px"}}>
        {/* TITLE */}
        <ExerciseHeader
          isReview
          sectionLetter="B"
          title={
            <>
              Read, look, and write <span className="text-[#1DA1F2]">true</span>{" "}
              or <span className="text-[#1DA1F2]">false</span>.
            </>
          }
          subTitle="Read or listen to each item carefully, then choose true or false only after checking the key detail."
        />

        {/* QUESTIONS */}
        <div className="grid grid-cols-2 gap-y-14 gap-x-24">
          {/* 1 */}
          <div className="flex items-end gap-5">
            <span className="font-bold text-[18px] self-start">1</span>

            <img
              src={img1}
              alt={"A boy writing at a desk with books beside him."}
              style={{
                width: "140px",
                height: "auto",
              }}
            />

            <div className="text-[18px] mt-3 self-start w-[230px] h-[120px] flex flex-col justify-between">
              <SentenceGroup
                label={"He is keeping busy."}
                src={clip0}
                id={"clue-0"}
                audio={audio}
                className="leading-loose"
              >
                He is keeping busy.
              </SentenceGroup>

              <div>{inputField(0, "w-[150px]")}</div>
            </div>
          </div>

          {/* 2 */}
          <div className="flex items-end gap-5">
            <span className="font-bold text-[18px] self-start">2</span>

            <img
              src={img2}
              alt={"Two people examining information together beside a laptop."}
              style={{
                width: "140px",
                height: "auto",
              }}
            />

            <div className="text-[18px] mt-3 self-start w-[230px] h-[120px] flex flex-col justify-between">
              <SentenceGroup
                label={"They are jotting down some information."}
                src={clip1}
                id={"clue-1"}
                audio={audio}
                className="leading-loose"
              >
                They are jotting down some information.
              </SentenceGroup>

              <div>{inputField(1, "w-[150px]")}</div>
            </div>
          </div>

          {/* 3 */}
          <div className="flex items-end gap-5">
            <span className="font-bold text-[18px] self-start ">3</span>

            <img
              src={img3}
              alt={"A man running beside the sea."}
              style={{
                width: "140px",
                height: "auto",
              }}
            />

            <div className="text-[18px] mt-3 self-start w-[230px] h-[120px] flex flex-col justify-between">
              <SentenceGroup
                label={"He is limping stiffly."}
                src={clip2}
                id={"clue-2"}
                audio={audio}
                className="leading-loose"
              >
                He is limping stiffly.
              </SentenceGroup>

              <div>{inputField(2, "w-[150px]")}</div>
            </div>
          </div>

          {/* 4 */}
          <div className="flex items-end gap-5">
            <span className="font-bold text-[18px] self-start ">4</span>

            <img
              src={img4}
              alt={"A woman looking through photographs in an album."}
              style={{
                width: "140px",
                height: "auto",
              }}
            />

            <div className="text-[18px] mt-3 self-start w-[230px] h-[120px] flex flex-col justify-between">
              <SentenceGroup
                label={"She is looking at photo albums."}
                src={clip3}
                id={"clue-3"}
                audio={audio}
                className="leading-loose"
              >
                She is looking at photo albums.
              </SentenceGroup>

              <div>{inputField(3, "w-[150px]")}</div>
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

export default Review7_Page1_Q2;
