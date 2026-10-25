import wordSound3 from "../../../assets/audio/ClassBook/U3/PG 22/sound8.mp3";
import wordSound2 from "../../../assets/audio/ClassBook/U3/PG 22/sound7.mp3";
import wordSound1 from "../../../assets/audio/ClassBook/U3/PG 22/sound9.mp3";
import wordSound0 from "../../../assets/audio/ClassBook/U3/PG 22/sound6.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import { SentenceGroup } from "./SentenceAudio";
import React, { useState } from "react";
import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 26/SVG/Asset 26.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 26/SVG/Asset 15.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 26/SVG/Asset 16.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 26/SVG/Asset 18.svg";
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

const Unit3_Page5_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");

  const [answers, setAnswers] = useState(Array(4).fill(""));
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);

  const correct = ["sardines", "marshmallows", "salty", "peanut butter"];

  const normalize = normalizeAnswer;

  const handleChange = (i, val) => {
    if (locked || result[i] === true) return;

    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  const input = (i, width = "w-[200px]") => (
    <span
      style={{
        borderRadius: 6,
        boxShadow:
          audio.activeId === "answer-" + i ? "0 0 0 3px #2563eb" : undefined,
        backgroundColor:
          audio.activeId === "answer-" + i ? "#dbeafe" : undefined,
      }}
      className="relative inline-block mx-2"
    >
      <input
        style={{
          borderBottomColor:
            locked || result[i] === true
              ? "#16a34a"
              : result[i] === false
                ? "#ef4444"
                : undefined,
        }}
        {...fieldKeys}
        placeholder="Vocabulary word"
        aria-invalid={result[i] === false}
        title={`Picture ${i + 1}, vocabulary word for the pictured ${["tin of fish", "soft white sweets", "seasoning shaker", "jar and nuts"][i]}`}
        aria-label={`Picture ${i + 1}, vocabulary word for the pictured ${["tin of fish", "soft white sweets", "seasoning shaker", "jar and nuts"][i]}`}
        readOnly={locked || result[i] === true}
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`border-b outline-none  text-[#6D2980] font-bold ${width}
        ${result[i] === false ? "border-red-500" : "border-black"}
      `}
        onClick={() => {
          if (locked || result[i] === true)
            audio.play(
              "answer-" + i,
              [wordSound0, wordSound1, wordSound2, wordSound3][i],
            );
        }}
        onKeyDown={(event) => {
          if (
            (locked || result[i] === true) &&
            (event.key === "Enter" || event.key === " ")
          ) {
            event.preventDefault();
            event.stopPropagation();
            if (!event.repeat)
              audio.play(
                "answer-" + i,
                [wordSound0, wordSound1, wordSound2, wordSound3][i],
              );
          } else fieldKeys.onKeyDown(event);
        }}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            transform: "translateY(-50%)",
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
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        >
          ✕
        </span>
      )}
      {audio.activeId === "answer-" + i && <AudioSpeaker />}
    </span>
  );

  const checkAnswers = () => {
    if (locked) return;

    audio.stop();

    if (locked) return;

    if (answers.some((a) => !a?.trim())) {
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
      const ok = normalize(a) === normalize(correct[i]);
      if (ok) correctCount++;
      return ok;
    });

    setResult(res);

    const total = correct.length;

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
    setAnswers([...correct]);
    setResult(correct.map(() => true));
    setLocked(true);
    setAnnouncement("Correct answers shown and locked.");
  };

  const reset = () => {
    audio.stop();
    setAnnouncement("Answers, feedback and locks cleared.");

    setAnswers(Array(4).fill(""));
    setResult([]);
    setLocked(false);
  };

  return (
    <div
      data-exercise-scope="Unit3_Page5_Q1.jsx"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit3_Page5_Q1.jsx"] input:focus-visible,[data-exercise-scope="Unit3_Page5_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="Unit3_Page5_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>

      <div className="div-forall" style={{gap:"50px"}}>
        <ExerciseHeader
          sectionLetter="A"
          title={<>Look and write the vocabulary words.</>}
          subTitle="Use the picture, definition, chart, or grammar clue, then complete each answer before checking."
        />

        <div className="space-y-10 text-[18px]">
          <div className="grid grid-cols-2 gap-25">
            {/* 1 */}
            <div className="flex items-center gap-6">
              <span className="font-bold">1</span>
              <img
                src={img1}
                alt={"An open tin containing small fish."}
                style={{ width: "90px", height: "90px" }}
              />
              {input(0)}
            </div>

            {/* 2 */}
            <div className="flex items-center gap-6">
              <span className="font-bold">2</span>
              <img
                src={img2}
                alt={"Soft white cylindrical sweets."}
                style={{ width: "90px", height: "90px" }}
              />
              {input(1)}
            </div>

            {/* 3 */}
            <div className="flex items-center gap-6">
              <span className="font-bold">3</span>
              <img
                src={img3}
                alt={"A glass shaker containing salt."}
                style={{ width: "90px", height: "90px" }}
              />
              {input(2)}
            </div>

            {/* 4 */}
            <div className="flex items-center gap-6">
              <span className="font-bold">4</span>
              <img
                src={img4}
                alt={"A jar of spread with peanuts beside it."}
                style={{ width: "90px", height: "90px" }}
              />
              {input(3)}
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="action-buttons-container">
        <button
          type="button"
          {...activationKeys}
          aria-label="Start Again"
          ref={resetButtonRef}
          className="try-again-button"
          onClick={reset}
        >
          Start Again ↻
        </button>

        <button
          type="button"
          {...activationKeys}
          aria-label="Show Answer"
          onClick={showAnswers}
          className="show-answer-btn"
        >
          Show Answer
        </button>

        <button
          type="button"
          {...activationKeys}
          aria-label="Check Answer"
          disabled={locked}
          style={{ cursor: locked ? "not-allowed" : "pointer" }}
          className="check-button2"
          onClick={checkAnswers}
        >
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Unit3_Page5_Q1;
