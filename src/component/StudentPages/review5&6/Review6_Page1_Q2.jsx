import clip0 from "../../../assets/audio/ClassBook/U6/Page 54 - B/Item_001_After_Chloe_shot_the_basketball_into_the_hoop,_she_yelled,_!.mp3";
import clip1 from "../../../assets/audio/ClassBook/U6/Page 54 - B/Item_002_I_am_at_skiing;_on_winter_vacations,_I_go_every_day.mp3";
import clip2 from "../../../assets/audio/ClassBook/U6/Page 54 - B/Item_003_We_watched_the_swimmers_for_a_long_time._We_wanted_to_jump_in,_but_the_w.mp3";
import clip3 from "../../../assets/audio/ClassBook/U6/Page 54 - B/Item_004_My_brother_only_paid_$4_for_his_soccer_ball._The_regular_price_was_$8,_b.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
  AudioSpeaker,
} from "../unit5/ExerciseAudioText";
import { SentenceGroup, SentencePart } from "../unit5/SentenceAudio";
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

const Review6_Page1_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      before: "After Chloe shot the basketball into the hoop, she yelled, “I",

      after: "!”",

      answer: "made it",

      width: "170px",
    },

    {
      before: "I am an",

      after: "at skiing; on winter vacations, I go every day.",

      answer: "expert",

      width: "170px",
    },

    {
      before:
        "We watched the swimmers for a long time. We wanted to jump in, but the water was cold. Finally I asked, “",

      after: "?”",

      answer: "Shall we",

      width: "170px",
    },

    {
      before:
        "My brother only paid $4 for his soccer ball. The regular price was $8, but he got a",

      after: ".",

      answer: "half price",

      width: "170px",
    },
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

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

    const newResults = answers.map((a, i) => {
      const ok = normalize(a) === normalize(questions[i].answer);

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = questions.length;

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
    setAnnouncement("Model answers shown and locked.");
    resetButtonRef.current?.focus({ preventScroll: true });
    setAnswers(["made it", "expert", "Shall we", "half price"]);

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

  return (
    <div
      data-exercise-scope={"Review6_Page1_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review6_Page1_Q2.jsx"] input:focus-visible,[data-exercise-scope="Review6_Page1_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Review6_Page1_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall" style={{gap:"50px"}}>
        {/* TITLE */}
        <ExerciseHeader
          isReview
          sectionLetter="B"
          title={
            <>Write the correct vocabulary word or expression on each line.</>
          }
          subTitle="Use the picture, definition, chart, or grammar clue, then complete each answer before checking."
        />

        {/* QUESTIONS */}
        <div className="flex flex-col gap-7">
          {questions.map((q, i) => (
            <SentenceGroup
              label={`Hear sentence ${i + 1}`}
              src={[clip0, clip1, clip2, clip3][i + 0]}
              id={`sentence-${i}`}
              audio={audio}
              key={i}
              className="
                  flex
                  items-start
                  gap-4
                "
            >
              {/* NUMBER */}
              <span
                className="
                    font-bold
                    text-[18px]
                    w-6
                  "
              >
                {i + 1}
              </span>

              {/* SENTENCE */}
              <div
                className="
                    flex-1
                    text-[18px]
                    leading-[1.9]
                    flex
                    flex-wrap
                    items-end
                    gap-2
                  "
              >
                <span>{q.before}</span>

                {/* INPUT */}
                <div className="relative inline-block">
                  <input
                    aria-invalid={!!(result[i] === false)}
                    title={`Sentence ${i + 1}, vocabulary word or expression`}
                    aria-label={`Sentence ${i + 1}, vocabulary word or expression`}
                    {...fieldKeys}
                    type="text"
                    value={answers[i]}
                    disabled={locked || result[i] === true}
                    onChange={(e) => handleChange(i, e.target.value)}
                    style={{
                      width: q.width,
                      border: "none",
                      borderBottom:
                        result[i] === false
                          ? "1px solid #D1232A"
                          : "1px solid black",
                      outline: "none",
                      background: "transparent",
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#6D2980",
                      paddingBottom: "2px",
                      padding: "0",
                      lineHeight: "1",
                      ...(result[i] === true
                        ? { borderBottomColor: "#16a34a" }
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
                      }}
                    >
                      ✕
                    </span>
                  )}
                </div>

                <span>{q.after}</span>
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

export default Review6_Page1_Q2;
