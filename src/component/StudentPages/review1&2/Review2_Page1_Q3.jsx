import { SentenceGroup } from "../unit2/SentenceAudio";
import clip0 from "../../../assets/audio/ClassBook/U2/Page 18 - C/Item_001_The_notebook_(who_which)_I_brought_is_green.mp3";
import clip1 from "../../../assets/audio/ClassBook/U2/Page 18 - C/Item_002_I_rode_on_the_Ferris_wheel_(that_who)_was_new_to_the_carnival_this_year.mp3";
import clip2 from "../../../assets/audio/ClassBook/U2/Page 18 - C/Item_003_Larry,_(who_which)_likes_crazy,_twisty_rides,_tried_the_huge_roller_coas.mp3";
import clip3 from "../../../assets/audio/ClassBook/U2/Page 18 - C/Item_004_Can_you_see_the_horse_(who_that)_ran_away_today.mp3";
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

const Review2_Page1_Q3 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const questions = [
    {
      text: ["The notebook (", "who", "/", "which", ") I brought is green."],
      correct: "which",
    },
    {
      text: [
        "I rode on the Ferris wheel (",
        "that",
        "/",
        "who",
        ") was new to the carnival this year.",
      ],
      correct: "that",
    },
    {
      text: [
        "Larry, (",
        "who",
        "/",
        "which",
        ") likes crazy, twisty rides, tried the huge roller coaster.",
      ],
      correct: "who",
    },
    {
      text: [
        "Can you see the horse (",
        "who",
        "/",
        "that",
        ") ran away today?",
      ],
      correct: "that",
    },
  ];

  const [selected, setSelected] = useState([null, null, null, null]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  // 🎯 اختيار
  const handleSelect = (i, word) => {
    
    if (locked) return;
    if (result[i] === true) return;

    setAnnouncement(`Question ${i + 1}: ${word} selected.`);
    const updated = [...selected];
    updated[i] = word;
    setSelected(updated);

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
      "Answers checked. Correct selections and responses stay locked; incorrect parts can be changed.",
    );

    if (selected.includes(null)) {
      setAnnouncement("Select all answers.");
      ValidationAlert.info("Select all answers.");
      return;
    }

    let correctCount = 0;

    const res = selected.map((val, i) => {
      const ok = val === questions[i].correct;
      if (ok) correctCount++;
      return ok;
    });

    setResult(res);

    const total = questions.length;
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
    setSelected(questions.map((q) => q.correct));
    setResult(questions.map(() => true));
    setLocked(true);
  };

  // 🔄 RESET
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Selections, answers and feedback cleared.");
    setSelected([null, null, null, null]);
    setResult([]);
    setLocked(false);
  };

  return (
    <div
      data-exercise-scope="Review2_Page1_Q3.jsx"
      style={{ padding: "30px", display: "flex", justifyContent: "center" }}
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review2_Page1_Q3.jsx"] input:focus-visible,[data-exercise-scope="Review2_Page1_Q3.jsx"] textarea:focus-visible,[data-exercise-scope="Review2_Page1_Q3.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <div className="div-forall" style={{ gap: "50px" }}>
        <ExerciseHeader
          isReview
          sectionLetter="C"
          title={<>Read and circle the correct answer.</>}
          subTitle="Read all choices first, then select only the option that makes the expression or sentence correct."
        />

        {/* الأسئلة */}
        {questions.map((q, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              // marginBottom: "30px",
            }}
          >
            {/* الرقم */}
            <span
              style={{ fontWeight: "bold", width: "25px", fontSize: "20px" }}
            >
              {i + 1}
            </span>

            {/* الجملة */}
            <SentenceGroup audio={audio} id={`sentence-${i}`} src={[clip0,clip1,clip2,clip3][i]} label={`Hear the sentence: ${q.text.join(" ")}`}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "2px",
                fontSize: "20px",
              }}
            >
              {q.text.map((part, idx) => {
                if (part === "who" || part === "which" || part === "that") {
                  return (
                    <span
                      role="button"
                      tabIndex={0}
                      data-choice
                      {...activationKeys}
                      aria-label={`Question ${i + 1}, ${part}`}
                      aria-pressed={selected[i] === part}
                      aria-disabled={locked || result[i] === true}
                      key={idx}
                      onClick={() => handleSelect(i, part)}
                      style={{
                        cursor: "pointer",
                        padding: "2px 4px",
                        borderRadius: "20px",
                        border:
                          result[i] === false && selected[i] === part
                            ? "2px solid red" // ❌ إذا غلط
                            : selected[i] === part
                              ? "2px solid #00AEEF" // 🔵 إذا مختار
                              : "2px solid transparent",
                        position: "relative",
                        color: "#00AEEF",

                        display: "inline-flex", // 🔥 مهم
                        verticalAlign: "middle", // 🔥 حل إضافي display: "inline-flex",
                        alignItems: "baseline",
                        boxShadow:
                          selected[i] === part
                            ? result[i] === true || locked
                              ? "0 0 0 2px #16a34a"
                              : result[i] === false
                                ? "0 0 0 2px #ef4444"
                                : "0 0 0 2px #2563eb"
                            : undefined,
                        backgroundColor:
                          selected[i] === part ? "#dbeafe" : undefined,
                        outline:
                          audio.activeId === `word-${i}-${part}`
                            ? "3px solid #2563eb"
                            : undefined,
                        outlineOffset: 2,
                        borderColor:
                          selected[i] === part && (locked || result[i] === true)
                            ? "#16a34a"
                            : selected[i] === part && result[i] === false
                              ? "#ef4444"
                              : undefined,
                      }}
                    >
                      {part}
                      

                      {/* ❌ */}
                      {result[i] === false && selected[i] === part && (
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
                  );
                }

                return <span key={idx}>{part}</span>;
              })}
            </SentenceGroup>
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

export default Review2_Page1_Q3;
