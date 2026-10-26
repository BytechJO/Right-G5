import clip0 from "../../../assets/audio/ClassBook/U6/Page 51 - F/Item_001_gol_the_may_to_museum_art.mp3";
import clip1 from "../../../assets/audio/ClassBook/U6/Page 51 - F/Item_002_could_at_I_the_park_stay.mp3";
import clip2 from "../../../assets/audio/ClassBook/U6/Page 51 - F/Item_003_restaurant_go_we_the_to_shall.mp3";
import clip3 from "../../../assets/audio/ClassBook/U6/Page 51 - F/Item_004_we_volleyball_go_game_to_shall_the.mp3";
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

const Unit6_Page6_Q3 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      scrambled: "go I the may to museum art.",
      answers: ["I may go to the art museum."],
    },

    {
      scrambled: "could at I the park stay.",
      answers: ["I could stay at the park."],
    },

    {
      scrambled: "restaurant go we the to shall?",
      answers: ["Shall we go to the restaurant?"],
    },

    {
      scrambled: "we volleyball go game to shall the?",
      answers: ["Shall we go the volleyball game?"],
    },
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [locked, setLocked] = useState(false);

  const [result, setResult] = useState([]);

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

    const newResults = answers.map((ans, i) => {
      const ok = questions[i].answers.some(
        (correct) => normalize(correct) === normalize(ans),
      );

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = answers.length;

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
      questions[0].answers[0],
      questions[1].answers[0],
      questions[2].answers[0],
      questions[3].answers[0],
    ]);

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
      data-exercise-scope={"Unit6_Page6_Q3.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit6_Page6_Q3.jsx"] input:focus-visible,[data-exercise-scope="Unit6_Page6_Q3.jsx"] textarea:focus-visible,[data-exercise-scope="Unit6_Page6_Q3.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
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
          sectionLetter="F"
          title={<>Unscramble and write the sentences or questions.</>}
          subTitle="Say the correct expression or sentence first, then reorder the words and check capitalization and punctuation."
        />

        {/* QUESTIONS */}
        <div className="flex flex-col gap-8">
          {questions.map((item, i) => (
            <SentenceGroup
              label={`Hear prompt ${i + 1}`}
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
                    text-[20px]
                    w-6
                  "
              >
                {i + 1}
              </span>

              {/* CONTENT */}
              <div className="flex-1">
                {/* SCRAMBLED */}
                <div
                  className="
                      text-[20px]
                      mb-4
                      leading-[1.6]
                    "
                >
                  {item.scrambled}
                </div>

                {/* INPUT */}
                <div className="relative">
                  <input
                    aria-invalid={!!(result[i] === false)}
                    style={{
                      ...(result[i] === true
                        ? { borderBottomColor: "#16a34a" }
                        : {}),
                    }}
                    title={`Item ${i + 1}, reorder: ${item.scrambled}`}
                    aria-label={`Item ${i + 1}, reorder: ${item.scrambled}`}
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
                        text-[20px]
                        font-semibold
                        pb-0.5

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

                        boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                      }}
                    >
                      ✕
                    </span>
                  )}
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

export default Unit6_Page6_Q3;
