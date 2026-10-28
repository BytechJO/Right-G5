import soundE10 from "../../../assets/audio/Workbook/Unit 5/Page 29 - E/Item_010_to_my_class_about_the_ways_to_study_for_an_exam.mp3";
import soundE8 from "../../../assets/audio/Workbook/Unit 5/Page 29 - E/Item_008_my_day_with_a_bowl_of_cereal.mp3";
import soundE7 from "../../../assets/audio/Workbook/Unit 5/Page 29 - E/Item_007_about_sharks_in_the_library.mp3";
import soundE11 from "../../../assets/audio/Workbook/Unit 5/Page 29 - E/Item_011_I_gave_a.mp3";
import soundE9 from "../../../assets/audio/Workbook/Unit 5/Page 29 - E/Item_009_What_kind_of_place_do_you.mp3";
import soundE6 from "../../../assets/audio/Workbook/Unit 5/Page 29 - E/Item_006_I_found_the.mp3";
import soundE5 from "../../../assets/audio/Workbook/Unit 5/Page 29 - E/Item_005_information.mp3";
import soundE4 from "../../../assets/audio/Workbook/Unit 5/Page 29 - E/Item_004_have_in_mind.mp3";
import soundE2 from "../../../assets/audio/Workbook/Unit 5/Page 29 - E/Item_002_start_off.mp3";
import soundE1 from "../../../assets/audio/Workbook/Unit 5/Page 29 - E/Item_001_presentation.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
} from "../../StudentPages/unit5/ExerciseAudioText";

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

const WB_Unit5_Page29_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const wordBank = ["presentation", "start off", "have in mind", "information"];

  const answers = ["information", "start off", "have in mind", "presentation"];

  const sentences = [
    {
      before: "I found the",
      after: "about sharks in the library.",
    },

    {
      before: "I",
      after: "my day with a bowl of cereal.",
    },

    {
      before: "What kind of place do you",
      after: "?",
    },

    {
      before: "I gave a",
      after: "to my class about the ways to study for an exam.",
    },
  ];

  const [studentAnswers, setStudentAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...studentAnswers];

    updated[i] = value;

    setStudentAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;
    audio.stop();

    const hasEmpty = studentAnswers.some((a) => !a.trim());

    if (hasEmpty) {
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

    // ترتيب الانبوتات ما يهم
    const normalizedAnswers = answers.map((a) => normalize(a));

    const usedAnswers = studentAnswers.flatMap((answer, index) =>
      result[index] === true
        ? [normalizedAnswers.indexOf(normalize(answer))]
        : [],
    );

    const newResults = studentAnswers.map((answer, slot) => {
      const normalized = normalize(answer);

      const foundIndex = normalizedAnswers.findIndex(
        (a, i) => a === normalized && !usedAnswers.includes(i),
      );

      const ok = result[slot] === true || foundIndex !== -1;

      if (ok) {
        if (foundIndex !== -1) usedAnswers.push(foundIndex);

        correctCount++;
      }

      return ok;
    });

    setResult(newResults);

    const total = answers.length;

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
    setStudentAnswers(answers);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width = "250px") => (
    <div className="relative inline-block">
      <input
        aria-invalid={result[i] === false}
        placeholder={"Word or phrase"}
        title={`Sentence ${i + 1}: ${sentences[i].before} ___ ${sentences[i].after}`}
        aria-label={`Sentence ${i + 1}: ${sentences[i].before} ___ ${sentences[i].after}`}
        {...fieldKeys}
        type="text"
        value={studentAnswers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6D2980]
          font-semibold
          px-1

          ${result[i] === false ? "border-[#D1232A]" : "border-black"}
        `}
        style={{
          width,
          borderBottomColor: result[i] === true ? "#16a34a" : undefined,
        }}
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
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
          }}
        >
          ✕
        </span>
      )}
    </div>
  );

  return (
    <div
      data-exercise-scope={"WB_Unit5_Page29_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit5_Page29_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit5_Page29_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit5_Page29_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}
        <ExerciseHeader
          isWorkbook
          sectionLetter="E"
          title={<>Read and write.</>}
          subTitle="Read the full sentence first, then choose the word or expression that fits both the meaning and grammar."
        />

        {/* WORD BANK */}
        <div className="flex justify-center">
        <div className="border-2 border-[#7D3C98] rounded-xl px-5 py-3 mb-8 w-fit">
          <div className="flex gap-10 text-[20px]">
            {wordBank.map((word, index) => (
              <span key={index}>
                <AudioText
                  audio={audio}
                  id={`bank-${index}`}
                  src={[soundE1, soundE2, soundE4, soundE5][index]}
                  label={`Hear ${word}`}
                >
                  {word}
                </AudioText>
              </span>
            ))}
          </div>
        </div>
</div>
        {/* QUESTIONS */}
        <div className="flex flex-col gap-12">
          {sentences.map((sentence, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="font-bold w-5">{index + 1}</span>

              <div className="flex flex-wrap items-center gap-2 leading-[1.8]">
                <span>
                  {[soundE6, null, soundE9, soundE11][index] ? (
                    <AudioText
                      audio={audio}
                      id={`before-${index}`}
                      src={[soundE6, null, soundE9, soundE11][index]}
                      label={`Hear ${sentence.before}`}
                    >
                      {sentence.before}
                    </AudioText>
                  ) : (
                    sentence.before
                  )}
                </span>

                {inputField(index, index === 2 ? "240px" : "220px")}

                <span>
                  {[soundE7, soundE8, null, soundE10][index] ? (
                    <AudioText
                      audio={audio}
                      id={`after-${index}`}
                      src={[soundE7, soundE8, null, soundE10][index]}
                      label={`Hear ${sentence.after}`}
                    >
                      {sentence.after}
                    </AudioText>
                  ) : (
                    sentence.after
                  )}
                </span>
              </div>
            </div>
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

export default WB_Unit5_Page29_Q1;
