import clip0 from "../../../assets/audio/ClassBook/U7/Page 62 - B/Item_001_store_she_is_leaving_the.mp3";

import clip2 from "../../../assets/audio/ClassBook/U7/Page 62 - B/Item_003_playing_children_hide-and-seek_the_are.mp3";
import clip3 from "../../../assets/audio/ClassBook/U7/Page 62 - B/Item_004_her_teacher_the_talking_to_is_students.mp3";
import clip4 from "../../../assets/audio/ClassBook/U7/Page 62 - B/Item_005_Sarah_jumping_her_with_rope_friends_is.mp3";
import clip5 from "../../../assets/audio/ClassBook/U7/Page 62 - B/Item_006_are_a_listening_we_symphony_to.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import { AudioFeedback } from "../unit5/ExerciseAudioText";
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

const Unit7_Page5_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      scrambled: "store she is leaving the",
      answer: "She is leaving the store.",
    },
    {
      scrambled: "are a listening we symphony to",
      answer: "We are listening to a symphony.",
    },
    {
      scrambled: "playing children hide-and-seek the are",
      answer: "The children are playing hide-and-seek.",
    },
    {
      scrambled: "her teacher the talking to is students",
      answer: "The teacher is talking to her students.",
    },
    {
      scrambled: "Sarah jumping her with rope friends is",
      answer: "Sarah is jumping rope with her friends.",
    },
  ];

  const [answers, setAnswers] = useState(["", "", "", "", ""]);
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
    setAnswers(questions.map((q) => q.answer));
    setResult([true, true, true, true, true]);
    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", ""]);
    setResult([]);
    setLocked(false);
  };

  return (
    <div
      data-exercise-scope={"Unit7_Page5_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit7_Page5_Q2.jsx"] input:focus-visible,[data-exercise-scope="Unit7_Page5_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Unit7_Page5_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
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
          sectionLetter="B"
          title={<>Unscramble and write the sentences.</>}
          subTitle="Say the correct expression or sentence first, then reorder the words and check capitalization and punctuation."
        />

        <div className="flex flex-col gap-3">
          {questions.map((q, i) => (
            <div key={i} className="flex items-start gap-5">
              <span className="font-bold text-[18px] w-6">{i + 1}</span>

              <div className="flex-1">
                <SentenceGroup
                  label={`Hear scrambled prompt ${i + 1}: ${q.scrambled}`}
                  src={[clip0, clip5, clip2, clip3, clip4][i]}
                  id={`prompt-${i}`}
                  audio={audio}
                  className="text-[18px] mb-3"
                >
                  {q.scrambled}
                </SentenceGroup>

                <div className="relative">
                  <input placeholder={"Sentence"}
                    style={{
                      ...(result[i] === true
                        ? { borderBottomColor: "#16a34a" }
                        : {}),
                    }}
                    aria-invalid={!!(result[i] === false)}
                    title={`Sentence ${i + 1}, reorder: ${q.scrambled}`}
                    aria-label={`Sentence ${i + 1}, reorder: ${q.scrambled}`}
                    {...fieldKeys}
                    type="text"
                    value={answers[i]}
                    disabled={locked || result[i] === true}
                    onChange={(e) => handleChange(i, e.target.value)}
                    className={`
                      w-full
                      border-0
                      border-b
                      outline-none
                      bg-transparent
                      text-[18px]
                      font-semibold
                      pb-1

                      ${
                        result[i] === false
                          ? "border-[#D1232A] text-[#6D2980]"
                          : "border-black text-[#6D2980]"
                      }
                    `}
                  />

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
              </div>
            </div>
          ))}
        </div>
      </div>

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

export default Unit7_Page5_Q2;
