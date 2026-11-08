import soundG11 from "../../../assets/audio/Workbook/Unit 7/Page 42 - G/Item_011_some_cookies.mp3";
import soundG10 from "../../../assets/audio/Workbook/Unit 7/Page 42 - G/Item_010_Sarah.mp3";
import soundG9 from "../../../assets/audio/Workbook/Unit 7/Page 42 - G/Item_009_He.mp3";
import soundG8 from "../../../assets/audio/Workbook/Unit 7/Page 42 - G/Item_008_to_the_news_on_the_radio.mp3";
import soundG7 from "../../../assets/audio/Workbook/Unit 7/Page 42 - G/Item_007_in_the_chair.mp3";
import soundG6 from "../../../assets/audio/Workbook/Unit 7/Page 42 - G/Item_006_They.mp3";
import soundG5 from "../../../assets/audio/Workbook/Unit 7/Page 42 - G/Item_005_very_enjoyable_book.mp3";
import soundG4 from "../../../assets/audio/Workbook/Unit 7/Page 42 - G/Item_004_sit.mp3";
import soundG3 from "../../../assets/audio/Workbook/Unit 7/Page 42 - G/Item_003_read.mp3";
import soundG2 from "../../../assets/audio/Workbook/Unit 7/Page 42 - G/Item_002_listen.mp3";
import soundG1 from "../../../assets/audio/Workbook/Unit 7/Page 42 - G/Item_001_bake.mp3";
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

const WB_Unit7_Page42_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const wordBank = ["bake", "listen", "read", "sit"];

  const answers = ["am reading", "are sitting", "is listening", "is baking"];

  const [studentAnswers, setStudentAnswers] = useState(["", "", "", ""]);

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

    setResult([true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i, width) => (
    <div className="relative w-full">
      {" "}
      <input
        aria-invalid={result[i] === false}
        placeholder={"be + -ing verb"}
        title={`Sentence ${i + 1}: ${["I ___ a very enjoyable book.", "They ___ in the chair.", "He ___ to the news on the radio.", "Sarah ___ some cookies."][i]}`}
        aria-label={`Sentence ${i + 1}: ${["I ___ a very enjoyable book.", "They ___ in the chair.", "He ___ to the news on the radio.", "Sarah ___ some cookies."][i]}`}
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
          borderBottomColor:
            result[i] === true
              ? "#16a34a"
              : result[i] === false
                ? "#D1232A"
                : undefined,
        }}
      />
      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "1px",
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
      data-exercise-scope={"WB_Unit7_Page42_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit7_Page42_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit7_Page42_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit7_Page42_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[18px] w-full" style={{ gap: "50px" }}>
        {/* TITLE */}

        <ExerciseHeader
          isWorkbook
          sectionLetter="G"
          title={
            <>
              Read and write. Use <span className="text-[#00AEEF]">–ing</span>{" "}
              verbs.
            </>
          }
          subTitle="Identify the subject and action first, then use the correct form of be plus the -ing verb where the sentence requires it."
        />

        {/* WORD BANK */}

        <div className="flex justify-center">
          <div
            className="
      flex
      gap-15
      border
      border-[#7D3C98]
      rounded-lg
      px-6
      py-[5px]
    "
          >
            {wordBank.map((word, index) => (
              <div key={index} className="text-[18px]">
                <AudioText
                  audio={audio}
                  id={`bank-${index}`}
                  src={[soundG1, soundG2, soundG3, soundG4][index]}
                  label={`Hear ${word}`}
                >
                  {word}
                </AudioText>
              </div>
            ))}
          </div>
        </div>
        {/* QUESTIONS */}

        <div className="flex flex-col gap-15">
          {/* 1 */}

          <div className="flex items-end gap-3 w-full">
            <span className="font-bold w-5">1</span>

            <span>I</span>

            <div className="relative flex-1">{inputField(0, "100%")}</div>

            <span>
              <AudioText
                audio={audio}
                id={"fragment-0"}
                src={soundG5}
                label={"Hear a very enjoyable book."}
              >
                a very enjoyable book.
              </AudioText>
            </span>
          </div>

          {/* 2 */}

          <div className="flex items-end gap-3 w-full">
            <span className="font-bold w-5">2</span>

            <span>
              <AudioText
                audio={audio}
                id={"fragment-1"}
                src={soundG6}
                label={"Hear They"}
              >
                They
              </AudioText>
            </span>

            <div className="relative flex-1">{inputField(1, "100%")}</div>

            <span>
              <AudioText
                audio={audio}
                id={"fragment-2"}
                src={soundG7}
                label={"Hear in the chair."}
              >
                in the chair.
              </AudioText>
            </span>
          </div>

          {/* 3 */}

          <div className="flex items-end gap-3 w-full">
            <span className="font-bold w-5">3</span>

            <span>
              <AudioText
                audio={audio}
                id={"fragment-3"}
                src={soundG9}
                label={"Hear He"}
              >
                He
              </AudioText>
            </span>

            <div className="relative flex-1">{inputField(2, "100%")}</div>

            <span>
              <AudioText
                audio={audio}
                id={"fragment-4"}
                src={soundG8}
                label={"Hear to the news on the radio."}
              >
                to the news on the radio.
              </AudioText>
            </span>
          </div>

          {/* 4 */}

          <div className="flex items-end gap-3 w-full">
            <span className="font-bold w-5">4</span>

            <span>
              <AudioText
                audio={audio}
                id={"fragment-5"}
                src={soundG10}
                label={"Hear Sarah"}
              >
                Sarah
              </AudioText>
            </span>

            <div className="relative flex-1">{inputField(3, "100%")}</div>

            <span>
              <AudioText
                audio={audio}
                id={"fragment-6"}
                src={soundG11}
                label={"Hear some cookies."}
              >
                some cookies.
              </AudioText>
            </span>
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

export default WB_Unit7_Page42_Q1;
