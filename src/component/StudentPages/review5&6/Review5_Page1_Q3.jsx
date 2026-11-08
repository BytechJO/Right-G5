import clip0 from "../../../assets/audio/ClassBook/U6/Page 52 - C/Item_001_You_would_like_a_new_phone_What_did_you_have_in_head.mp3";
import clip1 from "../../../assets/audio/ClassBook/U6/Page 52 - C/Item_002_Server_What_did_you_like_to_order.mp3";
import clip2 from "../../../assets/audio/ClassBook/U6/Page 52 - C/Item_003_Sarah_is_going_to_ride_a_presentation_for_her_science_class.mp3";
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

const Review5_Page1_Q3 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      words: [
        "You",
        "would",
        "like",
        "a",
        "new",
        "phone?",
        "What",
        "did",
        "you",
        "have",
        "in",
        "head?",
      ],

      mistake: "head?",

      answer: "mind",
    },

    {
      words: ["Server:", "What", "did", "you", "like", "to", "order?"],

      mistake: "did",

      answer: "would",
    },

    {
      words: [
        "Sarah",
        "is",
        "going",
        "to",
        "ride",
        "a",
        "presentation",
        "for",
        "her",
        "science",
        "class.",
      ],

      mistake: "ride",

      answer: "give",
    },
  ];

  const [selectedWords, setSelectedWords] = useState(["", "", ""]);

  const [answers, setAnswers] = useState(["", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const handleSelectWord = (i, word) => {
    if (locked || result[i]?.mistake === true) return;
    setSelectedWords((previous) =>
      previous.map((a, j) => (j === i ? word : a)),
    );
    setResult((previous) => {
      const next = [...previous];
      next[i] = { ...next[i], mistake: undefined };
      return next;
    });
  };

  const handleChange = (i, val) => {
    if (locked || result[i]?.answer === true) return;
    setAnswers((previous) => previous.map((a, j) => (j === i ? val : a)));
    setResult((previous) => {
      const next = [...previous];
      next[i] = { ...next[i], answer: undefined };
      return next;
    });
  };

  const checkAnswers = () => {
    if (locked) return;
    audio.stop();

    const hasEmpty =
      selectedWords.some((s) => !s) || answers.some((a) => !a.trim());

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

    const newResults = questions.map((q, i) => {
      const mistakeCorrect =
        normalize(selectedWords[i]) === normalize(q.mistake);

      const answerCorrect = normalize(answers[i]) === normalize(q.answer);

      if (mistakeCorrect && answerCorrect) {
        correctCount++;
      }

      return {
        mistake: mistakeCorrect,
        answer: answerCorrect,
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
    setSelectedWords(["head?", "did", "ride"]);

    setAnswers(["mind", "would", "give"]);

    setResult([
      {
        mistake: true,
        answer: true,
      },

      {
        mistake: true,
        answer: true,
      },

      {
        mistake: true,
        answer: true,
      },
    ]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setSelectedWords(["", "", ""]);

    setAnswers(["", "", ""]);

    setResult([]);

    setLocked(false);
  };

  return (
    <div
      data-exercise-scope={"Review5_Page1_Q3.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review5_Page1_Q3.jsx"] input:focus-visible,[data-exercise-scope="Review5_Page1_Q3.jsx"] textarea:focus-visible,[data-exercise-scope="Review5_Page1_Q3.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
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
          sectionLetter="C"
          title={
            <>
              Read and circle the mistakes. Rewrite the sentences using
              expressions learned.
            </>
          }
          subTitle={
            <>
              Task 1: Select the mistake in each sentence first.
              <br /> Task 2: Then rewrite the complete sentence using the
              correct expression.
            </>
          }
        />

        {/* QUESTIONS */}
        <div className="flex flex-col gap-10">
          {questions.map((q, i) => (
            <SentenceGroup
              label={`Hear sentence ${i + 1}`}
              src={[clip0, clip1, clip2][i + 0]}
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

              {/* CONTENT */}
              <div className="flex-1">
                {/* WORDS */}
                <div
                  className="
                      text-[18px]
                      mb-5
                      leading-[1.8]
                      flex
                      flex-wrap
                      gap-1
                    "
                >
                  {q.words.map((word, idx) => {
                    const selected = selectedWords[i] === word;

                    return (
                      <span
                        style={{
                          borderRadius: 6,
                          ...(selectedWords[i] === word
                            ? {
                                boxShadow:
                                  "0 0 0 2px " +
                                  (result[i]?.mistake === true
                                    ? "#16a34a"
                                    : result[i]?.mistake === false
                                      ? "#D1232A"
                                      : "#2563eb"),
                                backgroundColor: "#dbeafe",
                              }
                            : {}),
                        }}
                        {...activationKeys}
                        aria-label={`Sentence ${i + 1}, circle ${word}`}
                        aria-disabled={locked || result[i]?.mistake === true}
                        aria-pressed={selectedWords[i] === word}
                        data-choice={true}
                        tabIndex={0}
                        role={"button"}
                        key={idx}
                        onClick={() => handleSelectWord(i, word)}
                        className="
                            cursor-pointer
                            relative
                            inline-block
                            px-0.5
                          "
                      >
                        {/* CIRCLE */}
                        {selected && (
                          <span
                            style={{
                              ...(result[i]?.mistake === true
                                ? { borderColor: "#16a34a" }
                                : result[i]?.mistake === false
                                  ? { borderColor: "#D1232A" }
                                  : {}),
                            }}
                            className="
                              absolute
                              -inset-1
                              border-2
                              border-[#6D2980]
                              rounded-full
                              pointer-events-none
                            "
                          ></span>
                        )}

                        <span className="relative z-10">{word}</span>
                        {result[i]?.mistake === false &&
                          selectedWords[i] === word && (
                            <span
                              style={{
                                position: "absolute",
                                top: "-34px",
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
                      </span>
                    );
                  })}
                </div>

                {/* INPUT */}
                <div className="relative">
                  <input placeholder={"Correction"}
                    aria-invalid={!!(result[i]?.answer === false)}
                    style={{
                      ...(result[i]?.answer === true
                        ? { borderBottomColor: "#16a34a" }
                        : {}),
                    }}
                    title={`Sentence ${i + 1}, correction for the circled mistake`}
                    aria-label={`Sentence ${i + 1}, correction for the circled mistake`}
                    {...fieldKeys}
                    type="text"
                    value={answers[i]}
                    disabled={locked || result[i]?.answer === true}
                    onChange={(e) => handleChange(i, e.target.value)}
                    className={`
                        w-full
                        border-0
                        border-b
                        outline-none
                        bg-transparent
                        text-[18px]
                        font-semibold
                        pb-0.5

                        ${
                          result[i]?.answer === false
                            ? "border-[#D1232A] text-[#6D2980]"
                            : "border-black text-[#6D2980]"
                        }
                      `}
                  />

                  {/* WRONG */}
                  {result[i]?.answer === false && (
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

                  {/* WRONG SELECT */}
                </div>
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

export default Review5_Page1_Q3;
