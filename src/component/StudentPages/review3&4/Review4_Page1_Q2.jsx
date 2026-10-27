import clip0 from "../../../assets/audio/ClassBook/U4/Page 36 - B/Item_001_ahead.mp3";
import clip1 from "../../../assets/audio/ClassBook/U4/Page 36 - B/Item_002_Not_!.mp3";
import clip2 from "../../../assets/audio/ClassBook/U4/Page 36 - B/Item_003_head.mp3";
import clip3 from "../../../assets/audio/ClassBook/U4/Page 36 - B/Item_004_up.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import { SentenceGroup } from "./SentenceAudio";
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
    .replace(/[.,!?;:…“”"()–—-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const Review4_Page1_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);
  const correctAnswers = ["straight", "me", "over", "split"];
  const normalize = normalizeAnswer;
  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;
    setAnswers((previous) => previous.map((a, j) => (j === i ? value : a)));
    setResult((previous) => previous.map((v, j) => (j === i ? undefined : v)));
  };
  const input = (i, width = "w-[180px]") => (
    <span className="relative inline-block mx-1">
      <input placeholder={"Word"}
        style={{
          ...(result[i] === true
            ? {
                borderBottomColor: "#16a34a",
              }
            : {}),
        }}
        {...fieldKeys}
        aria-invalid={result[i] === false}
        title={`Expression ${i + 1}, missing word: ${["blank ahead", "Not blank!", "head blank", "blank up"][i]}`}
        aria-label={`Expression ${i + 1}, missing word: ${["blank ahead", "Not blank!", "head blank", "blank up"][i]}`}
        disabled={locked || result[i] === true}
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`border-b outline-none text-[#6D2980] font-semibold ${width}
        ${result[i] === false ? "border-red-500" : "border-black"}
      `}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            width: "20px",
            height: "20px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        >
          ✕
        </span>
      )}
    </span>
  );
  const checkAnswers = () => {
    if (locked) return;
    audio.stop();
    if (answers.some((a) => !a.trim())) {
      (setAnnouncement(
        String("Please complete all fields.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Please complete all fields."));
      return;
    }
    let correctCount = 0;
    const res = answers.map((a, i) => {
      const ok = normalize(a) === normalize(correctAnswers[i]);
      if (ok) correctCount++;
      return ok;
    });
    setResult(res);
    const total = correctAnswers.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;
    if (correctCount === total) {
      resetButtonRef.current?.focus({
        preventScroll: true,
      });
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
    setAnnouncement("Correct answers shown and locked.");
    setAnswers(correctAnswers);
    setResult([true, true, true, true]);
    setLocked(true);
  };
  const handleReset = () => {
    audio.stop();
    setAnnouncement("All answers and feedback cleared.");
    setAnswers(["", "", "", ""]);
    setResult([]);
    setLocked(false);
  };
  return (
    <div
      data-exercise-scope={"Review4_Page1_Q2.jsx"}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review4_Page1_Q2.jsx"] input:focus-visible,[data-exercise-scope="Review4_Page1_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall" style={{ gap: "100px" }}>
        <ExerciseHeader
          isReview
          sectionLetter="B"
          title={<>Read and write the expression.</>}
          subTitle="Use the picture, definition, chart, or grammar clue, then complete each answer before checking."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            rowGap: "90px",
            columnGap: "100px",
            fontSize: "20px",
          }}
        >
          {/* 1 */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                minWidth: "20px",
              }}
            >
              1
            </span>

            <SentenceGroup
              label={"Hear the expression clue for item 1"}
              src={clip0}
              id={"expression-0"}
              audio={audio}
              style={{
                lineHeight: "1.8",
              }}
            >
              {input(0)} ahead
            </SentenceGroup>
          </div>

          {/* 2 */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                minWidth: "20px",
              }}
            >
              2
            </span>

            <SentenceGroup
              label={"Hear the expression clue for item 2"}
              src={clip1}
              id={"expression-1"}
              audio={audio}
              style={{
                lineHeight: "1.8",
              }}
            >
              Not {input(1)}!
            </SentenceGroup>
          </div>

          {/* 3 */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                minWidth: "20px",
              }}
            >
              3
            </span>

            <SentenceGroup
              label={"Hear the expression clue for item 3"}
              src={clip2}
              id={"expression-2"}
              audio={audio}
              style={{
                lineHeight: "1.8",
              }}
            >
              head {input(2)}
            </SentenceGroup>
          </div>

          {/* 4 */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                minWidth: "20px",
              }}
            >
              4
            </span>

            <SentenceGroup
              label={"Hear the expression clue for item 4"}
              src={clip3}
              id={"expression-3"}
              audio={audio}
              style={{
                lineHeight: "1.8",
              }}
            >
              {input(3)} up
            </SentenceGroup>
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
          {...activationKeys}
          style={{
            cursor: locked ? "not-allowed" : "pointer",
          }}
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
export default Review4_Page1_Q2;
