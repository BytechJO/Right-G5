import clip0 from "../../../assets/audio/ClassBook/U7/Page 63 - C/Item_001_learn.mp3";
import clip1 from "../../../assets/audio/ClassBook/U7/Page 63 - C/Item_002_eat.mp3";
import clip2 from "../../../assets/audio/ClassBook/U7/Page 63 - C/Item_003_study.mp3";
import clip3 from "../../../assets/audio/ClassBook/U7/Page 63 - C/Item_004_swim.mp3";
import clip4 from "../../../assets/audio/ClassBook/U7/Page 63 - C/Item_005_The_swimmers_in_the_large_and_spacious_pool.mp3";
import clip5 from "../../../assets/audio/ClassBook/U7/Page 63 - C/Item_006_Margaret_about_cells_and_plants_in_her_biology_class.mp3";
import clip6 from "../../../assets/audio/ClassBook/U7/Page 63 - C/Item_007_Sandra_with_her_friends_at_a_fancy_restaurant.mp3";
import clip7 from "../../../assets/audio/ClassBook/U7/Page 63 - C/Item_008_We_for_our_math_test_on_Tuesday.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import { AudioText, AudioFeedback } from "../unit5/ExerciseAudioText";
import { SentenceGroup } from "../unit5/SentenceAudio";
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

const Unit7_Page6_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      before: "The swimmers",
      after: "in the large and spacious pool.",

      answer: "are swimming",
    },

    {
      before: "Margaret",
      after: "about cells and plants in her biology class.",

      answer: "is learning",
    },

    {
      before: "Sandra",
      after: "with her friends at a fancy restaurant.",

      answer: "is eating",
    },

    {
      before: "We",
      after: "for our math test on Tuesday.",

      answer: "are studying",
    },
  ];

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

    if (answers.some((a) => !a.trim())) {
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
      const ok = normalize(a) === normalize(questions[i].answer);

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
    setAnswers(["are swimming", "is learning", "is eating", "are studying"]);

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
      data-exercise-scope={"Unit7_Page6_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit7_Page6_Q1.jsx"] input:focus-visible,[data-exercise-scope="Unit7_Page6_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="Unit7_Page6_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall" style={{gap:"30px"}}>
        {/* TITLE */}
        <ExerciseHeader
          sectionLetter="C"
          title={
            <>
              Read and write. Use the appropriate “
              <span className="text-[#1ea7ff]">to be</span>” verb and add “
              <span className="text-[#1ea7ff]">-ing</span> ” to the verbs from
              the box.
            </>
          }
          subTitle="Read the whole sentence first, then choose the word that fits both the meaning and grammar before checking."
        />

        {/* WORD BOX */}
        <div
          style={{
            width: "440px",
            height: "56px",
            background: "#E9E1EC",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            margin: "0 auto 10px auto",
            fontSize: "18px",
          }}
        >
          <span
            style={{
              textDecoration: answers.some((a) =>
                a.toLowerCase().includes("learn"),
              )
                ? "line-through"
                : "none",
            }}
          >
            <AudioText
              audio={audio}
              id="bank-learn"
              src={clip0}
              label="Hear learn"
            >
              learn
            </AudioText>
          </span>

          <span
            style={{
              textDecoration: answers.some((a) =>
                a.toLowerCase().includes("eat"),
              )
                ? "line-through"
                : "none",
            }}
          >
            <AudioText audio={audio} id="bank-eat" src={clip1} label="Hear eat">
              eat
            </AudioText>
          </span>

          <span
            style={{
              textDecoration: answers.some((a) =>
                a.toLowerCase().includes("study"),
              )
                ? "line-through"
                : "none",
            }}
          >
            <AudioText
              audio={audio}
              id="bank-study"
              src={clip2}
              label="Hear study"
            >
              study
            </AudioText>
          </span>

          <span
            style={{
              textDecoration: answers.some((a) =>
                a.toLowerCase().includes("swim"),
              )
                ? "line-through"
                : "none",
            }}
          >
            <AudioText
              audio={audio}
              id="bank-swim"
              src={clip3}
              label="Hear swim"
            >
              swim
            </AudioText>
          </span>
        </div>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-10">
          {questions.map((q, i) => (
            <SentenceGroup
              label={`Hear sentence ${i + 1}: ${q.before} … ${q.after}`}
              src={[clip4, clip5, clip6, clip7][i]}
              id={`sentence-${i}`}
              audio={audio}
              key={i}
              className="
                  flex
                  items-center
                  gap-4
                  text-[18px]
                "
            >
              {/* NUMBER */}
              <span className="font-bold w-6">{i + 1}</span>

              {/* BEFORE */}
              <span>{q.before}</span>

              {/* INPUT */}
              <div className="relative">
                <input
                  style={{
                    ...(result[i] === true
                      ? { borderBottomColor: "#16a34a" }
                      : {}),
                  }}
                  aria-invalid={!!(result[i] === false)}
                  title={`Sentence ${i + 1}, missing verb phrase: ${q.before} … ${q.after}`}
                  aria-label={`Sentence ${i + 1}, missing verb phrase: ${q.before} … ${q.after}`}
                  {...fieldKeys}
                  type="text"
                  value={answers[i]}
                  disabled={locked || result[i] === true}
                  onChange={(e) => handleChange(i, e.target.value)}
                  className={`
                      w-[260px]
                      border-0
                      border-b
                      outline-none
                      bg-transparent
                      text-[18px]
                      font-semibold
                      text-center
                      pb-1

                      ${
                        result[i] === false
                          ? "border-[#D1232A] text-[#6D2980]"
                          : "border-black text-[#6D2980]"
                      }
                    `}
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

                      fontSize: "11px",

                      fontWeight: "bold",

                      border: "2px solid white",

                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    ✕
                  </span>
                )}
              </div>

              {/* AFTER */}
              <span>{q.after}</span>
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

export default Unit7_Page6_Q1;
