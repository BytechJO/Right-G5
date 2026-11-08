import clip0 from "../../../assets/audio/ClassBook/U10/Page 90 - C/Item_001_music_that_is_fast_and_happy-sounding_is.mp3";
import clip1 from "../../../assets/audio/ClassBook/U10/Page 90 - C/Item_002_something_that_is_huge.mp3";
import clip2 from "../../../assets/audio/ClassBook/U10/Page 90 - C/Item_003_bendable,_able_to_change_or_move_easily.mp3";
import clip3 from "../../../assets/audio/ClassBook/U10/Page 90 - C/Item_004_attractive_to_others,_something_many_like.mp3";
import clip4 from "../../../assets/audio/ClassBook/U10/Page 90 - C/Item_005_flexible.mp3";
import clip5 from "../../../assets/audio/ClassBook/U10/Page 90 - C/Item_006_enormous.mp3";
import clip6 from "../../../assets/audio/ClassBook/U10/Page 90 - C/Item_007_appealing.mp3";
import clip7 from "../../../assets/audio/ClassBook/U10/Page 90 - C/Item_008_lively.mp3";
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

const Review10_Page1_Q3 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = ["lively", "enormous", "flexible", "appealing"];

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
    setAnswers(["lively", "enormous", "flexible", "appealing"]);

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
    <span className={`relative inline-block ${width}`}>
      <input placeholder={"Adjective"}
        style={{
          ...(result[i] === true ? { borderBottomColor: "#16a34a" } : {}),
        }}
        aria-invalid={result[i] === false}
        title={`Description ${i + 1}, write the matching adjective from the box`}
        aria-label={`Description ${i + 1}, write the matching adjective from the box`}
        {...fieldKeys}
        type="text"
        value={answers[i]}
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
    </span>
  );

  return (
    <div
      data-exercise-scope={"Review10_Page1_Q3.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review10_Page1_Q3.jsx"] input:focus-visible,[data-exercise-scope="Review10_Page1_Q3.jsx"] textarea:focus-visible,[data-exercise-scope="Review10_Page1_Q3.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div
        className="div-forall text-[18px]"
        style={{
          gap: "50px",
        }}
      >
        {/* TITLE */}
        <ExerciseHeader
          isReview
          sectionLetter="C"
          title={<>Write the correct adjective to match the description.</>}
          subTitle="Read the whole sentence first, then choose the word that fits both the meaning and grammar before checking."
        />

        <div className="flex justify-between items-start">
          {/* QUESTIONS */}
          <div className="flex flex-col gap-15 w-[70%]">
            {/* 1 */}
            <div className="flex items-center">
              <span className="font-bold mr-4">1</span>

              <span>
                <AudioText
                  audio={audio}
                  id={"audio-0"}
                  src={clip0}
                  label={"Hear music that is fast and happy-sounding is"}
                >
                  music that is fast and happy-sounding is{" "}
                </AudioText>
              </span>

              {inputField(0, "flex-1 min-w-[180px] mx-2")}

              <span>.</span>
            </div>

            {/* 2 */}
            <div className="flex items-center">
              <span className="font-bold mr-4">2</span>

              <span>
                <AudioText
                  audio={audio}
                  id={"audio-1"}
                  src={clip1}
                  label={"Hear something that is huge"}
                >
                  something that is huge{" "}
                </AudioText>
              </span>

              {inputField(1, "flex-1 min-w-[180px] mx-2")}

              <span>.</span>
            </div>

            {/* 3 */}
            <div className="flex items-center">
              <span className="font-bold mr-4">3</span>

              <span>
                <AudioText
                  audio={audio}
                  id={"audio-2"}
                  src={clip2}
                  label={"Hear bendable, able to change or move easily"}
                >
                  bendable, able to change or move easily{" "}
                </AudioText>
              </span>

              {inputField(2, "flex-1 min-w-[180px] mx-2")}

              <span>.</span>
            </div>

            {/* 4 */}
            <div className="flex items-center">
              <span className="font-bold mr-4">4</span>

              <span>
                <AudioText
                  audio={audio}
                  id={"audio-3"}
                  src={clip3}
                  label={"Hear attractive to others, something many like"}
                >
                  attractive to others, something many like{" "}
                </AudioText>
              </span>

              {inputField(3, "flex-1 min-w-[180px] mx-2")}

              <span>.</span>
            </div>
          </div>

          {/* WORD BOX */}
          <div
            style={{
              background: "#E8E1EC",
              borderRadius: "16px",
              width: "140px",
              padding: "30px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "40px",
              alignItems: "center",
              marginLeft: "30px",
            }}
          >
            <span>
              <AudioText
                audio={audio}
                id={"audio-4"}
                src={clip4}
                label={"Hear flexible"}
              >
                flexible
              </AudioText>
            </span>

            <span>
              <AudioText
                audio={audio}
                id={"audio-5"}
                src={clip5}
                label={"Hear enormous"}
              >
                enormous
              </AudioText>
            </span>

            <span>
              <AudioText
                audio={audio}
                id={"audio-6"}
                src={clip6}
                label={"Hear appealing"}
              >
                appealing
              </AudioText>
            </span>

            <span>
              <AudioText
                audio={audio}
                id={"audio-7"}
                src={clip7}
                label={"Hear lively"}
              >
                lively
              </AudioText>
            </span>
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

export default Review10_Page1_Q3;
