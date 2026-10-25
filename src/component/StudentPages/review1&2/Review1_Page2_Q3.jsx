import { SentenceGroup } from "../unit2/SentenceAudio";
import clip0 from "../../../assets/audio/ClassBook/U2/Page 17 - F/Item_001_How_long_She_talked.mp3";
import clip1 from "../../../assets/audio/ClassBook/U2/Page 17 - F/Item_002_How_far.mp3";
import clip2 from "../../../assets/audio/ClassBook/U2/Page 17 - F/Item_003_How_many_She_will_bring.mp3";
import { useExerciseAudio } from "../unit2/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
  AudioSpeaker,
} from "../unit2/ExerciseAudioText";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 17/SVG/Asset 22.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 17/SVG/Asset 23.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 17/SVG/Asset 24.svg";
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

const Review1_Page2_Q3 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState(["", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  // ✅ الإجابات الصح (غيّرها إذا بدك)
  const correct = [
    "for two hours",
    "They sailed for four miles",
    "three pajamas",
  ];

  const normalize = normalizeAnswer;

  const handleChange = (i, val) => {
    if (locked || result[i] === true) return;
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

  // ✅ CHECK
  const handleCheck = () => {
    if (locked) return;
    audio.stop();
    setAnnouncement(
      "Answers checked. Correct answers stay locked; incorrect answers can be changed.",
    );

    if (answers.some((a) => !a.trim())) {
      setAnnouncement("Complete all fields.");
      ValidationAlert.info("Complete all fields.");
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

    const msg = `Score: ${correctCount} / ${total}`;

    if (correctCount === total) {
      setLocked(true);
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // 👀 SHOW
  const handleShow = () => {
    audio.stop();
    setAnnouncement("Correct answers shown and locked.");
    setAnswers(correct);
    setResult(correct.map(() => true));
    setLocked(true);
  };

  // 🔄 RESET
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", ""]);
    setResult([]);
    setLocked(false);
  };

  // 🎯 input
  const input = (i, width = "300px") => (
    <span style={{ position: "relative", marginLeft: "6px" }}>
      <input
        {...fieldKeys}
        aria-label={
          [
            "Item 1, duration: How long did she talk? Complete She talked.",
            "Item 2, distance: How far did they sail?",
            "Item 3, quantity: How many will she bring? Complete She will bring.",
          ][i]
        }
        title={
          [
            "Item 1, duration: How long did she talk? Complete She talked.",
            "Item 2, distance: How far did they sail?",
            "Item 3, quantity: How many will she bring? Complete She will bring.",
          ][i]
        }
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        disabled={locked || result[i] === true}
        style={{
          outline: "none",
          textAlign: "center",
          width: width,
          fontSize: "18px",
          fontWeight: "bold",
          color: "#6D2980",
          background: "transparent",
          borderBottom:
            locked || result[i] === true
              ? "2px solid #16a34a"
              : result[i] === false
                ? "2px solid #ef4444"
                : "1px solid",
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

  return (
    <div
      data-exercise-scope="Review1_Page2_Q3.jsx"
      style={{ padding: "30px", display: "flex", justifyContent: "center" }}
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review1_Page2_Q3.jsx"] input:focus-visible,[data-exercise-scope="Review1_Page2_Q3.jsx"] textarea:focus-visible,[data-exercise-scope="Review1_Page2_Q3.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <div className="div-forall">
        <ExerciseHeader
          isReview
          sectionLetter="F"
          title={<>Look, read, and write a measurement.</>}
          subTitle="Use the picture, definition, chart, or grammar clue, then complete each answer before checking."
        />

        {/* المحتوى */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "18px",
          }}
        >
          {/* 1 */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  top: "30px",
                  left: "-10px",
                  fontWeight: "bold",
                }}
              >
                1
              </span>

              <img
                alt="A woman talking on a mobile phone."
                src={img1}
                style={{
                  width: "150px",
                  height: "150px",
                  marginLeft: "20px",
                  padding: "4px",
                }}
              />
            </div>

            <SentenceGroup audio={audio} id="sentence-0" src={clip0} label="Hear the sentence: How long? She talked blank ." style={{ flex: 1 }}>
              
                How long? She talked{" "}
              
              {input(0)}.
            </SentenceGroup>
          </div>

          {/* 2 */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  top: "30px",
                  left: "-10px",
                  fontWeight: "bold",
                }}
              >
                2
              </span>

              <img
                alt="Two children sailing a boat."
                src={img2}
                style={{
                  width: "150px",
                  height: "150px",
                  marginLeft: "20px",
                  padding: "4px",
                }}
              />
            </div>

            <SentenceGroup audio={audio} id="sentence-1" src={clip1} label="Hear the sentence: How far? blank ." style={{ flex: 1 }}>
              
                How far?{" "}
              
              {input(1, "350px")}.
            </SentenceGroup>
          </div>

          {/* 3 */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  top: "30px",
                  left: "-10px",
                  fontWeight: "bold",
                }}
              >
                3
              </span>

              <img
                alt="A girl packing clothing into a suitcase."
                src={img3}
                style={{
                  width: "150px",
                  height: "150px",
                  marginLeft: "20px",
                  padding: "4px",
                }}
              />
            </div>

            <SentenceGroup audio={audio} id="sentence-2" src={clip2} label="Hear the sentence: How many? She will bring blank ." style={{ flex: 1 }}>
              
                How many? She will bring{" "}
              
              {input(2, "300px")}.
            </SentenceGroup>
          </div>
        </div>

        {/* buttons */}
        <div className="action-buttons-container">
          <button
            type="button"
            aria-label="Start Again"
            {...activationKeys}
            ref={resetButtonRef}
            className="try-again-button"
            onClick={handleReset}
          >
            Start Again ↻
          </button>

          <button
            type="button"
            aria-label="Show Answer"
            {...activationKeys}
            onClick={handleShow}
            className="show-answer-btn"
          >
            Show Answer
          </button>

          <button
            type="button"
            aria-label="Check Answer"
            {...activationKeys}
            disabled={locked}
            style={{ cursor: locked ? "not-allowed" : "pointer" }}
            className="check-button2"
            onClick={handleCheck}
          >
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review1_Page2_Q3;
