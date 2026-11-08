import clip0 from "../../../assets/audio/ClassBook/U4/Page 34 - A/Item_001_sardines.mp3";
import clip1 from "../../../assets/audio/ClassBook/U4/Page 34 - A/Item_002_yummy.mp3";
import clip2 from "../../../assets/audio/ClassBook/U4/Page 34 - A/Item_003_salty.mp3";
import clip3 from "../../../assets/audio/ClassBook/U4/Page 34 - A/Item_004_cupboard.mp3";
import clip4 from "../../../assets/audio/ClassBook/U4/Page 34 - A/Item_005_I_love_strawberries!.mp3";
import clip5 from "../../../assets/audio/ClassBook/U4/Page 34 - A/Item_006_Get_those_away_from_me!_They_are_so_smelly.mp3";
import clip6 from "../../../assets/audio/ClassBook/U4/Page 34 - A/Item_007_Can_you_get_me_the_peanut_butter_from_the.mp3";
import clip7 from "../../../assets/audio/ClassBook/U4/Page 34 - A/Item_008_The_chips_taste_very.mp3";
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
const Review3_Page1_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const wordBank = ["sardines", "yummy", "salty", "cupboard"];
  const correctAnswers = ["yummy", "sardines", "cupboard", "salty"];
  const sentences = [
    {
      before: "",
      after: "! I love strawberries!",
      width: "340px",
    },
    {
      before: "Get those",
      after: "away from me! They are so smelly.",
      width: "280px",
    },
    {
      before: "Can you get me the peanut butter from the",
      after: "?",
      width: "300px",
    },
    {
      before: "The chips taste very",
      after: ".",
      width: "260px",
    },
  ];
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState([false, false, false, false]);
  const [correctLocked, setCorrectLocked] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [locked, setLocked] = useState(false);

  // normalize
  const normalize = normalizeAnswer;

  // change
  const handleChange = (i, value) => {
    if (locked || correctLocked[i]) return;
    setAnswers((previous) => previous.map((a, j) => (j === i ? value : a)));
    setErrors((previous) => previous.map((v, j) => (j === i ? false : v)));
  };

  // check
  const handleCheck = () => {
    if (locked) return;
    audio.stop();
    if (answers.some((a) => normalize(a) === "")) {
      (setAnnouncement(
        String("Complete all fields.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Complete all fields."));
      return;
    }
    let score = 0;
    const newErrors = answers.map((a, i) => {
      const correct = normalize(a) === normalize(correctAnswers[i]);
      if (correct) score++;
      return !correct;
    });
    const updatedLocked = answers.map(
      (a, i) => normalize(a) === normalize(correctAnswers[i]),
    );
    setErrors(newErrors);
    setCorrectLocked(updatedLocked);
    const total = correctAnswers.length;
    const msg = `Score: ${score} / ${total}`;
    if (score === total) {
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
    } else if (score === 0) {
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

  // show
  const handleShow = () => {
    audio.stop();
    setAnnouncement("Correct answers shown and locked.");
    setAnswers(correctAnswers);
    setErrors([false, false, false, false]);
    setCorrectLocked([true, true, true, true]);
    setLocked(true);
  };

  // reset
  const handleReset = () => {
    audio.stop();
    setAnnouncement("All answers and feedback cleared.");
    setAnswers(["", "", "", ""]);
    setErrors([false, false, false, false]);
    setCorrectLocked([false, false, false, false]);
    setLocked(false);
  };

  // input
  const renderInput = (i, width) => (
    <span
      style={{
        position: "relative",
      }}
    >
      <input placeholder={"Word"}
        {...fieldKeys}
        aria-invalid={errors[i]}
        title={`Sentence ${i + 1}, word from the bank: ${sentences[i].before} blank ${sentences[i].after}`}
        aria-label={`Sentence ${i + 1}, word from the bank: ${sentences[i].before} blank ${sentences[i].after}`}
        type="text"
        value={answers[i]}
        disabled={locked || correctLocked[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        style={{
          width: width,
          border: "none",
          borderBottom: errors[i] ? "1px solid red" : "1px solid black",
          outline: "none",
          background: "transparent",
          fontSize: "20px",
          color: "#6D2980",
          fontWeight: "600",
          paddingBottom: "10px",
          ...(correctLocked[i]
            ? {
                borderBottomColor: "#16a34a",
              }
            : {}),
        }}
      />

      {/* ❌ */}
      {errors[i] && (
        <span
          style={{
            position: "absolute",
            top: "-10px",
            right: "0px",
            width: "22px",
            transform: "translateY(-50%)",
            height: "22px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
      data-exercise-scope={"Review3_Page1_Q1.jsx"}
      style={{
        padding: "30px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review3_Page1_Q1.jsx"] input:focus-visible,[data-exercise-scope="Review3_Page1_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall" style={{gap:"50px"}}>
        {/* HEADER */}
        <ExerciseHeader
          isReview
          sectionLetter="A"
          title={<>Read and write the correct word.</>}
          subTitle="Read the whole sentence first, then choose the word that fits both the meaning and grammar before checking."
        />

        {/* WORD BANK */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "4px",
          }}
        >
          <div
            style={{
              background: "#d9d2dc",
              borderRadius: "12px",
              padding: "14px 40px",
              display: "flex",
              gap: "50px",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            {wordBank.map((word, i) => (
              <span key={i}>
                <AudioText
                  audio={audio}
                  id={`bank-${i}`}
                  src={[clip0, clip1, clip2, clip3][i]}
                  label={`Hear ${word}`}
                >
                  {word}
                </AudioText>
              </span>
            ))}
          </div>
        </div>

        {/* QUESTIONS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "34px",
            fontSize: "18px",
          }}
        >
          {sentences.map((s, i) => (
            <SentenceGroup
              label={`Hear sentence ${i + 1}: ${sentences[i].before} blank ${sentences[i].after}`}
              src={[clip4, clip5, clip6, clip7][i]}
              id={`sentence-${i}`}
              audio={audio}
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              {/* NUMBER */}
              <span
                style={{
                  fontWeight: "bold",
                  width: "20px",
                }}
              >
                {i + 1}
              </span>

              {/* BEFORE */}
              <span>{s.before}</span>

              {/* INPUT */}
              {renderInput(i, s.width)}

              {/* AFTER */}
              <span>{s.after}</span>
            </SentenceGroup>
          ))}
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
            onClick={handleShow}
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
            onClick={handleCheck}
          >
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};
export default Review3_Page1_Q1;
