import soundD8 from "../../../assets/audio/Workbook/Unit 9/Page 52 - D/Item_008_If_they_can't_find_a_bus,_they_will_take_a_taxi.mp3";
import soundD7 from "../../../assets/audio/Workbook/Unit 9/Page 52 - D/Item_007_If_we_finish_our_chores,_we_could_play_in_the_backyard.mp3";
import soundD6 from "../../../assets/audio/Workbook/Unit 9/Page 52 - D/Item_006_When_my_dad_comes_home,_I_will_set_the_dinner_table.mp3";
import soundD5 from "../../../assets/audio/Workbook/Unit 9/Page 52 - D/Item_005_Jack_will_open_the_window_if_he_wants_fresh_air.mp3";
import soundD1 from "../../../assets/audio/Workbook/Unit 9/Page 52 - D/Item_001_They_will_take_a_taxi_if_they_can't_find_a_bus.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
  AudioSpeaker,
} from "../../StudentPages/unit5/ExerciseAudioText";
import {
  SentenceGroup,
  SentencePart,
} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGE
import taxiImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U9/Page 52/Asset 2.svg";
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

const WB_Unit9_Page52_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    "They will take a taxi if they can’t find a bus.",

    "Jack will open the window if he wants fresh air.",

    "When my dad comes home, I will set the dinner table.",

    "If we finish our chores, we could play in the backyard.",

    "If they can’t find a bus, they will take a taxi.",
  ];

  const answers = [
    "If they can’t find a bus, they will take a taxi.",

    "If he wants fresh air, Jack will open the window.",

    "I will set the dinner table when my dad comes home.",

    "We could play in the backyard if we finish our chores.",

    "They will take a taxi if they can’t find a bus.",
  ];

  const [studentAnswers, setStudentAnswers] = useState(["", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  // ------------------------
  // HANDLE INPUT
  // ------------------------

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

  // ------------------------
  // CHECK
  // ------------------------

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

    const newResults = studentAnswers.map((answer, i) => {
      const ok = normalize(answer) === normalize(answers[i]);

      if (ok) correctCount++;

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

  // ------------------------
  // SHOW ANSWERS
  // ------------------------

  const showAnswers = () => {
    audio.stop();
    setAnnouncement("Model answers shown and locked.");
    resetButtonRef.current?.focus({ preventScroll: true });
    setStudentAnswers(answers);

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i) => (
    <div className="relative w-full">
      <input
        style={{
          borderBottomColor:
            result[i] === true
              ? "#16a34a"
              : result[i] === false
                ? "#D1232A"
                : undefined,
        }}
        placeholder={"Reordered sentence"}
        aria-invalid={result[i] === false}
        title={`Rewrite sentence ${i + 1} in the opposite clause order: ${questions[i]}`}
        aria-label={`Rewrite sentence ${i + 1} in the opposite clause order: ${questions[i]}`}
        {...fieldKeys}
        type="text"
        value={studentAnswers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          w-full
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
      data-exercise-scope={"WB_Unit9_Page52_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit9_Page52_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit9_Page52_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit9_Page52_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[18px] w-full mb-12">
        {/* TITLE */}

        <ExerciseHeader
          isWorkbook
          sectionLetter="D"
          title={
            <>
              Read and write each sentence in the opposite way from what is
              shown.
            </>
          }
          subTitle="Keep the same idea but change it to the required opposite form, checking negatives and meaning carefully."
        />

        {/* CONTENT */}

        <div className="flex flex-col gap-6">
          {/* أول سؤالين مع الصورة */}

          <div className="flex gap-8 items-start">
            {/* LEFT */}

            <div className="flex-1 flex flex-col gap-6">
              {questions.slice(0, 2).map((question, index) => (
                <div key={index}>
                  {/* QUESTION */}

                  <SentenceGroup
                    label={`Hear sentence ${index + 1}: ${question}`}
                    src={[soundD1, soundD5, soundD6, soundD7, soundD8][index]}
                    id={`prompt-${index}`}
                    audio={audio}
                    className="flex items-start gap-4 mb-2"
                  >
                    <span className="font-bold">{index + 1}</span>

                    <span className="leading-[1.8]">{question}</span>
                  </SentenceGroup>

                  {/* INPUT */}

                  <div className="pl-[35px]">{inputField(index)}</div>
                </div>
              ))}
            </div>

            {/* IMAGE */}

            <img
              src={taxiImg}
              alt={"A yellow taxi with a driver and a TAXI sign on its roof."}
              style={{
                width: "230px",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>

          {/* باقي الأسئلة Full Width */}

          <div className="flex flex-col gap-6 w-full">
            {questions.slice(2).map((question, index) => {
              const realIndex = index + 2;

              return (
                <div key={realIndex}>
                  {/* QUESTION */}

                  <SentenceGroup
                    label={`Hear sentence ${realIndex + 1}: ${question}`}
                    src={
                      [soundD1, soundD5, soundD6, soundD7, soundD8][realIndex]
                    }
                    id={`prompt-${realIndex}`}
                    audio={audio}
                    className="flex items-start gap-4 mb-2"
                  >
                    <span className="font-bold">{realIndex + 1}</span>

                    <span className="leading-[1.8]">{question}</span>
                  </SentenceGroup>

                  {/* INPUT */}

                  <div className="pl-[35px]">{inputField(realIndex)}</div>
                </div>
              );
            })}
          </div>
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

export default WB_Unit9_Page52_Q2;
