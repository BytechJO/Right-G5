import clip0 from "../../../assets/audio/ClassBook/U6/Page 52 - B/Item_001_He_had_lots_of_information_about_British_Columbia.mp3";
import clip1 from "../../../assets/audio/ClassBook/U6/Page 52 - B/Item_002_The_presentation_consisted_of_meat_and_vegetables.mp3";
import clip2 from "../../../assets/audio/ClassBook/U6/Page 52 - B/Item_003_Maybe_we_could_assignment_shish_kebabs_tonight.mp3";
import clip3 from "../../../assets/audio/ClassBook/U6/Page 52 - B/Item_004_Mark_ate_the_both_apple_cake_by_himself.mp3";
import clip4 from "../../../assets/audio/ClassBook/U6/Page 52 - B/Item_005_I_have_an_entire_to_do_in_math_class_tomorrow.mp3";
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

const Review5_Page1_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      before: "He had lots of",
      underlined: "information",
      after: "about British Columbia.",
      tf: "true",
      correction: "",
    },

    {
      before: "The",
      underlined: "presentation",
      after: "consisted of meat and vegetables.",
      tf: "false",
      correction: "shish kebab",
    },

    {
      before: "Maybe we could",
      underlined: "assignment",
      after: "shish kebabs tonight.",
      tf: "false",
      correction: "barbecue",
    },

    {
      before: "Mark ate the",
      underlined: "both",
      after: "apple cake by himself.",
      tf: "false",
      correction: "entire",
    },

    {
      before: "I have an",
      underlined: "entire",
      after: "to do in math class tomorrow.",
      tf: "false",
      correction: "exam",
    },
  ];

  const [answers, setAnswers] = useState(
    questions.map(() => ({
      tf: "",
      correction: "",
    })),
  );

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const handleChange = (i, field, value) => {
    if (locked || result[i]?.[field] === true) return;
    setAnswers((previous) =>
      previous.map((a, j) =>
        j === i
          ? {
              ...a,
              [field]: value,
              ...(field === "tf" &&
              normalize(value) === "true" &&
              result[i]?.correction !== true
                ? { correction: "" }
                : {}),
            }
          : a,
      ),
    );
    setResult((previous) =>
      previous.map((r, j) => (j === i ? { ...r, [field]: undefined } : r)),
    );
  };

  const checkAnswers = () => {
    if (locked) return;
    audio.stop();

    const hasEmpty = answers.some((a) => {
      if (!a.tf.trim()) return true;

      if (normalize(a.tf) === "false" && !a.correction.trim()) return true;

      return false;
    });

    if (hasEmpty) {
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
      const tfCorrect = normalize(a.tf) === questions[i].tf;

      let correctionCorrect = true;

      if (questions[i].tf === "false") {
        correctionCorrect =
          normalize(a.correction) === normalize(questions[i].correction);
      }

      if (tfCorrect && correctionCorrect) {
        correctCount++;
      }

      return {
        tf: tfCorrect,
        correction: correctionCorrect,
      };
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
    setAnswers([
      {
        tf: "true",
        correction: "",
      },

      {
        tf: "false",
        correction: "shish kebab",
      },

      {
        tf: "false",
        correction: "barbecue",
      },

      {
        tf: "false",
        correction: "entire",
      },

      {
        tf: "false",
        correction: "exam",
      },
    ]);

    setResult(
      questions.map(() => ({
        tf: true,
        correction: true,
      })),
    );

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(
      questions.map(() => ({
        tf: "",
        correction: "",
      })),
    );

    setResult([]);

    setLocked(false);
  };

  return (
    <div
      data-exercise-scope={"Review5_Page1_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review5_Page1_Q2.jsx"] input:focus-visible,[data-exercise-scope="Review5_Page1_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Review5_Page1_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall" style={{ gap: "30px" }}>
        {/* TITLE */}
        <ExerciseHeader
          isReview
          sectionLetter="B"
          title={
            <>
              <div className="flex flex-col">
                <span>
                  Read and write <span className="text-[#1DA1F2]">true</span> or{" "}
                  <span className="text-[#1DA1F2]">false</span>.
                </span>

                <span>
                  For false, change the underlined word to make the sentence
                  correct.
                </span>
              </div>
            </>
          }
          subTitle={
            <>
              Task 1: Mark each sentence true or false.
              <br /> Task 2: For every false sentence, replace the underlined
              word so the sentence becomes correct.
            </>
          }
        />
        {/* QUESTIONS */}
        <div className="flex flex-col gap-8">
          {questions.map((q, i) => {
            const isTrue = normalize(answers[i].tf) === "true";

            return (
              <SentenceGroup
                label={`Hear sentence ${i + 1}`}
                src={[clip0, clip1, clip2, clip3, clip4][i + 0]}
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

                {/* TF INPUT */}
                <div className="relative">
                  <input
                    aria-invalid={!!(result[i]?.tf === false)}
                    style={{
                      ...(result[i]?.tf === true
                        ? { borderBottomColor: "#16a34a" }
                        : {}),
                      "--exercise-focus-radius": "9999px",
                    }}
                    title={`Sentence ${i + 1}, write true or false`}
                    aria-label={`Sentence ${i + 1}, write true or false`}
                    {...fieldKeys}
                    type="text"
                    value={answers[i].tf}
                    disabled={locked || result[i]?.tf === true}
                    onChange={(e) => handleChange(i, "tf", e.target.value)}
                    className={`
                        w-[86px]
                        h-[34px]
                        rounded-full
                        border
                        border-[#7A2D91]
                        text-center
                        outline-none
                        bg-transparent
                        text-[18px]
                        font-semibold
                        text-[#1DA1F2]
                      `}
                  />

                  {/* TF WRONG */}
                  {result[i]?.tf === false && (
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
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                      }}
                    >
                      ✕
                    </span>
                  )}
                </div>

                {/* SENTENCE */}
                <div className="flex items-end flex-wrap gap-2 text-[20px] leading-[1.7]">
                  <span>{q.before}</span>

                  <span className="underline">{q.underlined}</span>

                  <span>{q.after}</span>

                  {/* CORRECTION */}
                  <div className="relative">
                    <input placeholder={"Correction"}
                      aria-invalid={!!(result[i]?.correction === false)}
                      style={{
                        ...(result[i]?.correction === true
                          ? { borderBottomColor: "#16a34a" }
                          : {}),
                      }}
                      title={`Sentence ${i + 1}, replace the underlined word if false`}
                      aria-label={`Sentence ${i + 1}, replace the underlined word if false`}
                      {...fieldKeys}
                      type="text"
                      value={answers[i].correction}
                      disabled={
                        isTrue || locked || result[i]?.correction === true
                      }
                      onChange={(e) =>
                        handleChange(i, "correction", e.target.value)
                      }
                      className={`
                        w-[190px]
                        border-0
                        border-b
                        outline-none
                        bg-transparent
                        text-[18px]
                        font-semibold
                        pb-0.5

                        ${
                          result[i]?.correction === false
                            ? "border-[#D1232A] text-[#6D2980]"
                            : "border-black text-[#6D2980]"
                        }

                        ${isTrue ? "opacity-40" : ""}
                      `}
                    />

                    {!isTrue && result[i]?.correction === false && (
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
                </div>
              </SentenceGroup>
            );
          })}
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

export default Review5_Page1_Q2;
