import { SentenceGroup } from "../unit2/SentenceAudio";
import clip0 from "../../../assets/audio/ClassBook/U2/Page 18 - B/Item_001_let's_sight.mp3";
import clip1 from "../../../assets/audio/ClassBook/U2/Page 18 - B/Item_002_not_much_fast.mp3";
import clip2 from "../../../assets/audio/ClassBook/U2/Page 18 - B/Item_003_keep_my_knees_on_the_ground.mp3";
import { useExerciseAudio } from "../unit2/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
  AudioSpeaker,
} from "../unit2/ExerciseAudioText";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
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

const Review2_Page1_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const sentences = [
    ["let’s", "sight"],
    ["not", "much", "fast"],
    ["keep", "my", "knees", "on", "the", "ground"],
  ];

  const correctWordIndex = [1, 1, 2];
  const correctAnswer = ["see", "not so fast", "keep my feet on the ground"];

  const [selected, setSelected] = useState([null, null, null]);
  const [answers, setAnswers] = useState(["", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  // 🎯 اختيار الكلمة
  const handleSelect = (i, wi) => {
    
    if (locked) return;
    if (result[i]?.word === true) return;

    setAnnouncement(`Question ${i + 1}: ${sentences[i][wi]} selected.`);
    const updated = [...selected];
    updated[i] = wi;
    setSelected(updated);

    setResult((prev) => {
      const copy = [...prev];
      if (copy[i]) copy[i] = { ...copy[i], word: undefined };
      return copy;
    });
  };

  // ✍️ كتابة التصحيح
  const handleChange = (i, val) => {
    if (locked) return;
    if (result[i]?.answer === true) return;

    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];
      if (copy[i]) copy[i] = { ...copy[i], answer: undefined };
      return copy;
    });
  };

  // ✅ CHECK
  const handleCheck = () => {
    if (locked) return;
    audio.stop();
    setAnnouncement(
      "Answers checked. Correct selections and responses stay locked; incorrect parts can be changed.",
    );

    if (answers.some((a) => !a.trim()) || selected.includes(null)) {
      setAnnouncement("Complete all answers.");
      ValidationAlert.info("Complete all answers.");
      return;
    }

    let correctCount = 0;

    const res = answers.map((a, i) => {
      const wordCorrect = selected[i] === correctWordIndex[i];
      const answerCorrect = normalize(a) === normalize(correctAnswer[i]);

      if (wordCorrect) correctCount++;
      if (answerCorrect) correctCount++;

      return {
        word: wordCorrect,
        answer: answerCorrect,
      };
    });

    setResult(res);

    const total = 6;
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
    setSelected(correctWordIndex);
    setAnswers(correctAnswer);
    setResult(correctAnswer.map(() => ({ word: true, answer: true })));
    setLocked(true);
  };

  // 🔄 RESET
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Selections, answers and feedback cleared.");
    setSelected([null, null, null]);
    setAnswers(["", "", ""]);
    setResult([]);
    setLocked(false);
  };

  return (
    <div
      data-exercise-scope="Review2_Page1_Q2.jsx"
      style={{ padding: "30px", display: "flex", justifyContent: "center" }}
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review2_Page1_Q2.jsx"] input:focus-visible,[data-exercise-scope="Review2_Page1_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Review2_Page1_Q2.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <div className="div-forall" style={{gap:"30px"}}>
        <ExerciseHeader
          isReview
          sectionLetter="B"
          title={
            <>
              What’s wrong? Find the one word that is wrong in each expression
              and correct it.
              <br /> Rewrite the expression.
            </>
          }
          subTitle="Task 1: Find the one incorrect word in each expression first. Task 2: Rewrite the complete corrected expression, not only the replacement word."
        />

        {/* الجمل */}
        {sentences.map((sentence, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
              marginBottom: "50px",
              position: "relative", // 👈 مهم
              paddingLeft: "40px", // 👈 مساحة للرقم
            }}
          >
            {/* 🔢 الرقم */}
            <span
              style={{
                position: "absolute",
                left: 0,
                top: "2px", // 👈 عدّلها (0 / 2 / 4) حسب ما يزبط معك
                fontWeight: "bold",
                fontSize: "22px",
              }}
            >
              {i + 1}
            </span>

            {/* 🔥 الجملة + الانبوت */}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "baseline", // 👈 هذا الحل
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {/* الجملة */}
              <SentenceGroup audio={audio} id={`sentence-${i}`} src={[clip0,clip1,clip2][i]} label={`Hear the sentence: ${sentence.join(" ")}`}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                }}
              >
                {sentence.map((word, wi) => (
                  <span
                    role="button"
                    tabIndex={0}
                    data-choice
                    {...activationKeys}
                    aria-label={`Question ${i + 1}, ${word}`}
                    aria-pressed={selected[i] === wi}
                    aria-disabled={locked || result[i]?.word === true}
                    key={wi}
                    onClick={() => handleSelect(i, wi)}
                    style={{
                      padding: "2px 4px",
                      cursor: "pointer",
                      fontSize: "22px",
                      border:
                        result[i]?.word === false && selected[i] === wi
                          ? "2px solid red" // ❌ غلط
                          : selected[i] === wi
                            ? "2px solid #00AEEF" // 🔵 مختار
                            : "2px solid transparent",
                      borderRadius: "20px",
                      position: "relative",
                      boxShadow:
                        selected[i] === wi
                          ? result[i]?.word === true || locked
                            ? "0 0 0 2px #16a34a"
                            : result[i]?.word === false
                              ? "0 0 0 2px #ef4444"
                              : "0 0 0 2px #2563eb"
                          : undefined,
                      backgroundColor:
                        selected[i] === wi ? "#dbeafe" : undefined,
                      outline:
                        audio.activeId === `word-${i}-${wi}`
                          ? "3px solid #2563eb"
                          : undefined,
                      outlineOffset: 2,
                      borderColor:
                        selected[i] === wi &&
                        (locked || result[i]?.word === true)
                          ? "#16a34a"
                          : selected[i] === wi && result[i]?.word === false
                            ? "#ef4444"
                            : "1px solid",
                    }}
                  >
                    {word}
                    

                    {/* ❌ على الكلمة */}
                    {result[i]?.word === false && selected[i] === wi && (
                      <span
                        style={{
                          position: "absolute",
                          top: "-8px",
                          right: "-8px",
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
                ))}
              </SentenceGroup>

              {/* 🔥 الانبوت */}
              <div style={{ position: "relative", flex: 1, minWidth: "250px" }}>
                <input
                  placeholder="Correction"
                  {...fieldKeys}
                  aria-label={`Expression ${i + 1}, write the correction for: ${sentences[i].join(" ")}`}
                  title={`Expression ${i + 1}, write the correction for: ${sentences[i].join(" ")}`}
                  value={answers[i]}
                  onChange={(e) => handleChange(i, e.target.value)}
                  disabled={locked || result[i]?.answer === true}
                  style={{
                    width: "100%",
                    outline: "none",
                    fontSize: "18px",
                    color: "#6D2980",
                    fontWeight: "bold",
                    background: "transparent",
                    borderBottom:
                      locked || result[i]?.answer === true
                        ? "2px solid #16a34a"
                        : result[i]?.answer === false
                          ? "2px solid #ef4444"
                          : "1px solid",
                  }}
                />

                {/* ❌ على الانبوت */}
                {result[i]?.answer === false && (
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
              </div>
            </div>
          </div>
        ))}
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

export default Review2_Page1_Q2;
