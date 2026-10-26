import clip0 from "../../../assets/audio/ClassBook/U5/Page 45 - C/Item_001_prefer_honey_would_they.mp3";
import clip1 from "../../../assets/audio/ClassBook/U5/Page 45 - C/Item_002_hang_the_would_clothes_you_please.mp3";
import clip2 from "../../../assets/audio/ClassBook/U5/Page 45 - C/Item_003_you_table_could_please_the_wipe.mp3";
import clip3 from "../../../assets/audio/ClassBook/U5/Page 45 - C/Item_004_like_would_please_more,_I_juice.mp3";
import clip4 from "../../../assets/audio/ClassBook/U5/Page 45 - C/Item_005_mashed_potatoes_like_Sandra_would_please,_more.mp3";
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
    .replace(/[.,!?;:…“”"–—-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const Unit5_Page6_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);
  const correctAnswers = [
    ["They would prefer honey, please."],
    ["Would you please hang the clothes?"],
    ["Could you please wipe the table?"],
    ["I would like more juice, please."],
    ["Sandra would like more mashed potatoes, please."],
  ];
  const normalize = normalizeAnswer;
  const handleChange = (i, val) => {
    if (locked || result[i] === true) return;
    setAnswers((previous) => previous.map((a, j) => (j === i ? val : a)));
    setResult((previous) => {
      const next = [...previous];
      next[i] = undefined;
      return next;
    });
  };
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
    const newResults = answers.map((ans, i) => {
      const ok = correctAnswers[i].some(
        (correct) => normalize(correct) === normalize(ans),
      );
      if (ok) correctCount++;
      return ok;
    });
    setResult(newResults);
    const total = answers.length;
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
    setAnnouncement("Model answers shown and locked.");
    setAnswers([
      correctAnswers[0][0],
      correctAnswers[1][0],
      correctAnswers[2][0],
      correctAnswers[3][0],
      correctAnswers[4][0],
    ]);
    setResult([true, true, true, true, true]);
    setLocked(true);
  };
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", ""]);
    setResult([]);
    setLocked(false);
  };
  const scrambled = [
    "prefer honey would they .",
    "hang the would ? clothes you please",
    "you table ? could please the wipe",
    "like would please more , I juice .",
    "mashed potatoes like Sandra would please , more .",
  ];
  return (
    <div
      data-exercise-scope={"Unit5_Page6_Q1.jsx"}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit5_Page6_Q1.jsx"] input:focus-visible,[data-exercise-scope="Unit5_Page6_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="Unit5_Page6_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall" style={{gap:"40px"}}>
        {/* TITLE */}
        <ExerciseHeader
          sectionLetter="C"
          title={<>Unscramble and write the polite questions and statements.</>}
          subTitle="Say the correct expression or sentence first, then reorder the words and check capitalization and punctuation."
        />

        {/* QUESTIONS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {scrambled.map((q, i) => (
            <SentenceGroup
              label={`Hear the given words for item ${i + 1}: ${q}`}
              src={[clip0, clip1, clip2, clip3, clip4][i]}
              id={`sentence-${i}`}
              audio={audio}
              key={i}
            >
              {/* SCRAMBLED */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  marginBottom: "3px",
                }}
              >
                {/* NUMBER */}
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    width: "24px",
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>

                {/* TEXT */}
                <div
                  style={{
                    fontSize: "18px",
                  }}
                >
                  {q}
                </div>
              </div>

              {/* INPUT */}
              <div
                style={{
                  marginLeft: "36px",
                  position: "relative",
                }}
              >
                <input
                  {...fieldKeys}
                  aria-invalid={!!(result[i] === false)}
                  title={`Item ${i + 1}, reorder these words into a polite question or statement: ${scrambled[i]}`}
                  aria-label={`Item ${i + 1}, reorder these words into a polite question or statement: ${scrambled[i]}`}
                  type="text"
                  value={answers[i]}
                  disabled={locked || result[i] === true}
                  onChange={(e) => handleChange(i, e.target.value)}
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom:
                      result[i] === false
                        ? "1px solid #D1232A"
                        : "1px solid black",
                    outline: "none",
                    background: "transparent",
                    fontSize: "18px",
                    paddingBottom: "6px",
                    color: "#6D2980",
                    fontWeight: "600",
                    height: "32px",
                    lineHeight: "32px",
                    padding: "0",
                    ...(result[i] === true
                      ? {
                          borderBottomColor: "#16a34a",
                        }
                      : {}),
                  }}
                />

                {/* WRONG */}
                {result[i] === false && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      width: "22px",
                      height: "22px",
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
                    }}
                  >
                    ✕
                  </span>
                )}
              </div>
            </SentenceGroup>
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
export default Unit5_Page6_Q1;
