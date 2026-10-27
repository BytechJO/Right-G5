import clip0 from "../../../assets/audio/ClassBook/U6/Page 52 - A/Item_001_shark.mp3";
import clip1 from "../../../assets/audio/ClassBook/U6/Page 52 - A/Item_002_barbecue.mp3";
import clip2 from "../../../assets/audio/ClassBook/U6/Page 52 - A/Item_003_recipe.mp3";
import clip3 from "../../../assets/audio/ClassBook/U6/Page 52 - A/Item_004_Mediterranean_food.mp3";
import clip4 from "../../../assets/audio/ClassBook/U6/Page 52 - A/Item_005_assignment.mp3";
import clip5 from "../../../assets/audio/ClassBook/U6/Page 52 - A/Item_006_Cooking_over_an_open_fire_using_charcoal.mp3";
import clip6 from "../../../assets/audio/ClassBook/U6/Page 52 - A/Item_007_A_type_of_food_found_in_a_certain_part_of_the_world.mp3";
import clip7 from "../../../assets/audio/ClassBook/U6/Page 52 - A/Item_008_A_type_of_fish_that_lives_in_the_ocean.mp3";
import clip8 from "../../../assets/audio/ClassBook/U6/Page 52 - A/Item_009_A_set_of_directions_for_cooking_something.mp3";
import clip9 from "../../../assets/audio/ClassBook/U6/Page 52 - A/Item_010_A_job,_or_work,_that_is_given_to_someone.mp3";
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

const Unit6_Page2_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const words = [
    "shark",
    "barbecue",
    "recipe",
    "Mediterranean food",
    "assignment",
  ];

  const definitions = [
    "Cooking over an open fire using charcoal",

    "A type of food found in a certain part of the world",

    "A type of fish that lives in the ocean",

    "A set of directions for cooking something",

    "A job, or work, that is given to someone",
  ];

  const correctAnswers = [
    ["barbecue"],

    ["Mediterranean food"],

    ["shark"],

    ["recipe"],

    ["assignment"],
  ];

  const [answers, setAnswers] = useState(["", "", "", "", ""]);

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
      const ok = correctAnswers[i].some(
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
      correctAnswers[0][0],
      correctAnswers[1][0],
      correctAnswers[2][0],
      correctAnswers[3][0],
      correctAnswers[4][0],
    ]);

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
      data-exercise-scope={"Review5_Page1_Q1.jsx"}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review5_Page1_Q1.jsx"] input:focus-visible,[data-exercise-scope="Review5_Page1_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="Review5_Page1_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall mb-10" style={{gap:"30px"}}>
        {/* TITLE */}
        <ExerciseHeader
          isReview
          sectionLetter="A"
          title={<>Read and write the word with its definition.</>}
          subTitle="Read the whole sentence first, then choose the word that fits both the meaning and grammar before checking."
        />

        {/* WORD BANK */}
        <div className="flex justify-center">
          <div
            className="
              bg-[#E8DFF0]
              rounded-[18px]
              px-8
              py-4
              flex
              gap-12
              text-[18px]
              font-medium
            "
          >
            {words.map((word, i) => (
              <AudioText
                label={`Hear ${word}`}
                src={
                  [
                    clip0,
                    clip1,
                    clip2,
                    clip3,
                    clip4,
                    clip5,
                    clip6,
                    clip7,
                    clip8,
                    clip9,
                  ][i]
                }
                id={`bank-${i}`}
                audio={audio}
                key={i}
              >
                {word}
              </AudioText>
            ))}
          </div>
        </div>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-8">
          {definitions.map((q, i) => (
            <SentenceGroup
              label={`Hear sentence ${i + 1}`}
              src={
                [
                  clip0,
                  clip1,
                  clip2,
                  clip3,
                  clip4,
                  clip5,
                  clip6,
                  clip7,
                  clip8,
                  clip9,
                ][i + 5]
              }
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
                  w-7
                "
              >
                {i + 1}
              </span>

              {/* QUESTION + INPUT */}
              <div className="flex-1 relative">
                <div
                  className="
                    text-[18px]
                    leading-[1.7]
                    inline
                  "
                >
                  {q}
                </div>

                <input placeholder={"Word"}
                  aria-invalid={!!(result[i] === false)}
                  style={{
                    ...(result[i] === true
                      ? { borderBottomColor: "#16a34a" }
                      : {}),
                  }}
                  title={`Definition ${i + 1}, matching vocabulary word`}
                  aria-label={`Definition ${i + 1}, matching vocabulary word`}
                  {...fieldKeys}
                  type="text"
                  value={answers[i]}
                  disabled={locked || result[i] === true}
                  onChange={(e) => handleChange(i, e.target.value)}
                  className={`
                    ml-3
                    w-[420px]
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
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    ✕
                  </span>
                )}
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

export default Unit6_Page2_Q1;
