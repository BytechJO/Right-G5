import clip0 from "../../../assets/audio/ClassBook/U8/Page 72 - C/Item_001_one.mp3";
import clip1 from "../../../assets/audio/ClassBook/U8/Page 72 - C/Item_002_body.mp3";
import clip2 from "../../../assets/audio/ClassBook/U8/Page 72 - C/Item_003_thing.mp3";
import clip3 from "../../../assets/audio/ClassBook/U8/Page 72 - C/Item_004_any.mp3";
import clip4 from "../../../assets/audio/ClassBook/U8/Page 72 - C/Item_005_anyone.mp3";
import clip5 from "../../../assets/audio/ClassBook/U8/Page 72 - C/Item_006_anything.mp3";
import clip6 from "../../../assets/audio/ClassBook/U8/Page 72 - C/Item_007_no.mp3";
import clip7 from "../../../assets/audio/ClassBook/U8/Page 72 - C/Item_008_nobody.mp3";
import clip8 from "../../../assets/audio/ClassBook/U8/Page 72 - C/Item_009_some.mp3";
import clip9 from "../../../assets/audio/ClassBook/U8/Page 72 - C/Item_010_something.mp3";
import clip10 from "../../../assets/audio/ClassBook/U8/Page 72 - C/Item_011_every.mp3";
import clip11 from "../../../assets/audio/ClassBook/U8/Page 72 - C/Item_012_everyone.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import { AudioText, AudioFeedback } from "../unit5/ExerciseAudioText";

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

const Review8_Page1_Q3 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    "anybody",
    "no one",
    "nothing",
    "someone",
    "somebody",
    "everybody",
    "everything",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", "", ""]);

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
    setAnswers([
      "anybody",
      "no one",
      "nothing",
      "someone",
      "somebody",
      "everybody",
      "everything",
    ]);

    setResult([true, true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width) => (
    <span className="relative inline-block">
      <input
        style={{
          ...(result[i] === true ? { boxShadow: "inset 0 -2px #16a34a" } : {}),
        }}
        aria-invalid={!!(result[i] === false)}
        title={`Table blank ${i + 1}, combine ${["any + body", "no + one", "no + thing", "some + one", "some + body", "every + body", "every + thing"][i]}`}
        aria-label={`Table blank ${i + 1}, combine ${["any + body", "no + one", "no + thing", "some + one", "some + body", "every + body", "every + thing"][i]}`}
        {...fieldKeys}
        type="text"
        value={answers[i]}
        placeholder="type here..."
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          ${width}
          border-0
          outline-none
          bg-transparent
          text-center
          text-[18px]
          text-[#6D2980]
          font-semibold
          px-1
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
      data-exercise-scope={"Review8_Page1_Q3.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review8_Page1_Q3.jsx"] input:focus-visible,[data-exercise-scope="Review8_Page1_Q3.jsx"] textarea:focus-visible,[data-exercise-scope="Review8_Page1_Q3.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall" style={{ gap: "50px" }}>
        {/* TITLE */}
        <ExerciseHeader
          isReview
          sectionLetter="C"
          title={<>Finish the chart.</>}
          subTitle="Use the picture, definition, chart, or grammar clue, then complete each answer before checking."
        />

        {/* TABLE */}
        <table
          className="border-collapse text-[18px]"
          
        >
          <tbody>
            {/* HEADER */}
            <tr>
              <td className="border-2 border-[#6d2980] h-[70px] w-40 bg-[#E6E0EA]"></td>

              <td className="border-2 border-[#6d2980] text-center  bg-[#E6E0EA]">
                <AudioText
                  audio={audio}
                  id="table-one"
                  src={clip0}
                  label="Hear one"
                >
                  one
                </AudioText>
              </td>

              <td className="border-2 border-[#6d2980] text-center  bg-[#E6E0EA]">
                <AudioText
                  audio={audio}
                  id="table-body"
                  src={clip1}
                  label="Hear body"
                >
                  body
                </AudioText>
              </td>

              <td className="border-2 border-[#6d2980] text-center  bg-[#E6E0EA]">
                <AudioText
                  audio={audio}
                  id="table-thing"
                  src={clip2}
                  label="Hear thing"
                >
                  thing
                </AudioText>
              </td>
            </tr>

            {/* ANY */}
            <tr>
              <td className="border-2 border-[#6d2980] text-center h-[70px] bg-[#E6E0EA]">
                <AudioText
                  audio={audio}
                  id="table-any"
                  src={clip3}
                  label="Hear any"
                >
                  any
                </AudioText>
              </td>

              <td className="border-2 border-[#6d2980] text-center">
                <AudioText
                  audio={audio}
                  id="table-anyone"
                  src={clip4}
                  label="Hear anyone"
                >
                  anyone
                </AudioText>
              </td>

              <td className="border-2 border-[#6d2980] text-center">
                {inputField(0, "w-[120px] h-[38px]")}
              </td>

              <td className="border-2 border-[#6d2980] text-center">
                <AudioText
                  audio={audio}
                  id="table-anything"
                  src={clip5}
                  label="Hear anything"
                >
                  anything
                </AudioText>
              </td>
            </tr>

            {/* NO */}
            <tr>
              <td className="border-2 border-[#6d2980] text-center h-[70px] bg-[#E6E0EA]">
                <AudioText
                  audio={audio}
                  id="table-no"
                  src={clip6}
                  label="Hear no"
                >
                  no
                </AudioText>
              </td>

              <td className="border-2 border-[#6d2980] text-center">
                {inputField(1, "w-[120px] h-[38px]")}
              </td>

              <td className="border-2 border-[#6d2980] text-center">
                <AudioText
                  audio={audio}
                  id="table-nobody"
                  src={clip7}
                  label="Hear nobody"
                >
                  nobody
                </AudioText>
              </td>

              <td className="border-2 border-[#6d2980] text-center">
                {inputField(2, "w-[120px] h-[38px]")}
              </td>
            </tr>

            {/* SOME */}
            <tr>
              <td className="border-2 border-[#6d2980] text-center h-[70px] bg-[#E6E0EA]">
                <AudioText
                  audio={audio}
                  id="table-some"
                  src={clip8}
                  label="Hear some"
                >
                  some
                </AudioText>
              </td>

              <td className="border-2 border-[#6d2980] text-center">
                {inputField(3, "w-[120px] h-[38px]")}
              </td>

              <td className="border-2 border-[#6d2980] text-center">
                {inputField(4, "w-[120px] h-[38px]")}
              </td>

              <td className="border-2 border-[#6d2980] text-center">
                <AudioText
                  audio={audio}
                  id="table-something"
                  src={clip9}
                  label="Hear something"
                >
                  something
                </AudioText>
              </td>
            </tr>

            {/* EVERY */}
            <tr>
              <td className="border-2 border-[#6d2980] text-center h-[70px] bg-[#E6E0EA]">
                <AudioText
                  audio={audio}
                  id="table-every"
                  src={clip10}
                  label="Hear every"
                >
                  every
                </AudioText>
              </td>

              <td className="border-2 border-[#6d2980] text-center">
                <AudioText
                  audio={audio}
                  id="table-everyone"
                  src={clip11}
                  label="Hear everyone"
                >
                  everyone
                </AudioText>
              </td>

              <td className="border-2 border-[#6d2980] text-center">
                {inputField(5, "w-[120px] h-[38px]")}
              </td>

              <td className="border-2 border-[#6d2980] text-center">
                {inputField(6, "w-[120px] h-[38px]")}
              </td>
            </tr>
          </tbody>
        </table>
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

export default Review8_Page1_Q3;
