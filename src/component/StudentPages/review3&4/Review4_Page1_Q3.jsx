import clip0 from "../../../assets/audio/ClassBook/U4/Page 36 - C/Item_001_60.mp3";
import clip1 from "../../../assets/audio/ClassBook/U4/Page 36 - C/Item_002_40.mp3";
import clip2 from "../../../assets/audio/ClassBook/U4/Page 36 - C/Item_003_80.mp3";
import clip3 from "../../../assets/audio/ClassBook/U4/Page 36 - C/Item_004_10.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import { SentenceGroup } from "./SentenceAudio";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 36/SVG/Asset 19.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 36/SVG/Asset 20.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 36/SVG/Asset 21.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 36/SVG/Asset 22.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 36/SVG/Asset 43.svg";
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
const Review4_Page1_Q3 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);
  const correctAnswers = [
    "The skier often skis on the mountain.",
    "The boy sometimes skates on the ice.",
    "The husband and wife usually jog on the beach.",
    "They rarely ride on the train.",
    "He never goes (Scuba) diving.",
  ];
  const normalize = normalizeAnswer;
  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;
    setAnswers((previous) => previous.map((a, j) => (j === i ? value : a)));
    setResult((previous) => previous.map((v, j) => (j === i ? undefined : v)));
  };
  const input = (i) => (
    <span className="relative inline-block">
      <input
        style={{
          ...(result[i] === true
            ? {
                borderBottomColor: "#16a34a",
              }
            : {}),
        }}
        {...fieldKeys}
        aria-invalid={result[i] === false}
        title={`Picture ${i + 1}, write the sentence about ${["skiing on a mountain (60%)", "skating on ice (40%)", "jogging on a beach (80%)", "riding a train (10%)", "diving (0%)"][i]}`}
        aria-label={`Picture ${i + 1}, write the sentence about ${["skiing on a mountain (60%)", "skating on ice (40%)", "jogging on a beach (80%)", "riding a train (10%)", "diving (0%)"][i]}`}
        disabled={locked || result[i] === true}
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`border-b outline-none text-[#6D2980] font-semibold w-[100%] px-2
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
    setResult([true, true, true, true, true]);
    setLocked(true);
  };
  const handleReset = () => {
    audio.stop();
    setAnnouncement("All answers and feedback cleared.");
    setAnswers(["", "", "", "", ""]);
    setResult([]);
    setLocked(false);
  };
  const imageStyle = {
    width: "100%",
    height: "auto",
    objectFit: "contain",
  };
  return (
    <div
      data-exercise-scope={"Review4_Page1_Q3.jsx"}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review4_Page1_Q3.jsx"] input:focus-visible,[data-exercise-scope="Review4_Page1_Q3.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall" style={{gap:"30px"}}>
        <ExerciseHeader
          isReview
          sectionLetter="C"
          title={<>Look and write.</>}
          subTitle="Use the picture, definition, chart, or grammar clue, then complete each answer before checking."
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            fontSize: "18px",
            marginBottom: 40,
          }}
        >
          {/* 1 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "40px 120px 80px 1fr",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              1
            </span>

            <img
              src={img1}
              alt={"A skier descending a snowy mountain."}
              style={imageStyle}
            />

            <span
              style={{
                fontSize: "20px",
              }}
            >
              <AudioText
                audio={audio}
                id="frequency-0"
                src={clip0}
                label="Hear 60%"
              >
                60%
              </AudioText>
            </span>
            {input(0)}
          </div>

          {/* 2 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "40px 120px 80px 1fr",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              2
            </span>

            <img
              src={img2}
              alt={"A child ice skating while wearing a helmet."}
              style={imageStyle}
            />

            <span
              style={{
                fontSize: "20px",
              }}
            >
              <AudioText
                audio={audio}
                id="frequency-1"
                src={clip1}
                label="Hear 40%"
              >
                40%
              </AudioText>
            </span>

            {input(1)}
          </div>

          {/* 3 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "40px 120px 80px 1fr",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              3
            </span>

            <img
              src={img3}
              alt={"Two adults jogging on a sandy beach."}
              style={imageStyle}
            />

            <span
              style={{
                fontSize: "20px",
              }}
            >
              <AudioText
                audio={audio}
                id="frequency-2"
                src={clip2}
                label="Hear 80%"
              >
                80%
              </AudioText>
            </span>

            {input(2)}
          </div>

          {/* 4 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "40px 120px 80px 1fr",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              4
            </span>

            <img
              src={img4}
              alt={"Passengers riding inside a train carriage."}
              style={imageStyle}
            />

            <span
              style={{
                fontSize: "20px",
              }}
            >
              <AudioText
                audio={audio}
                id="frequency-3"
                src={clip3}
                label="Hear 10%"
              >
                10%
              </AudioText>
            </span>

            {input(3)}
          </div>

          {/* 5 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "40px 120px 80px 1fr",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              5
            </span>

            <img
              src={img5}
              alt={"A scuba diver swimming beside coral."}
              style={imageStyle}
            />

            <span
              style={{
                fontSize: "20px",
              }}
            >
              0%
            </span>

            {input(4)}
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
export default Review4_Page1_Q3;
