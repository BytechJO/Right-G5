import soundC8 from "../../../assets/audio/Workbook/Unit 8/Page 46 - C/Item_008_some.mp3";
import soundC7 from "../../../assets/audio/Workbook/Unit 8/Page 46 - C/Item_007_thing.mp3";
import soundC6 from "../../../assets/audio/Workbook/Unit 8/Page 46 - C/Item_006_no.mp3";
import soundC5 from "../../../assets/audio/Workbook/Unit 8/Page 46 - C/Item_005_body.mp3";
import soundC4 from "../../../assets/audio/Workbook/Unit 8/Page 46 - C/Item_004_any.mp3";
import soundC3 from "../../../assets/audio/Workbook/Unit 8/Page 46 - C/Item_003_one.mp3";
import soundC2 from "../../../assets/audio/Workbook/Unit 8/Page 46 - C/Item_002_every.mp3";
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

const WB_Unit8_Page46_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const answers = [
    "everyone",
    "everybody",
    "everything",
    "anybody",
    "anyone",
    "anything",
    "no one",
    "nobody",
    "nothing",
    "someone",
    "somebody",
    "something",
  ];

  const [studentAnswers, setStudentAnswers] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

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

    const normalizedCorrect = answers.map(normalize);

    const usedAnswers = studentAnswers.flatMap((a, i) =>
      result[i] === true ? [normalizedCorrect.indexOf(normalize(a))] : [],
    );

    const newResults = studentAnswers.map((answer, slot) => {
      const normalizedStudent = normalize(answer);

      const foundIndex = normalizedCorrect.findIndex(
        (correct, index) =>
          correct === normalizedStudent && !usedAnswers.includes(index),
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

  // ------------------------
  // SHOW ANSWERS
  // ------------------------

  const showAnswers = () => {
    audio.stop();
    setAnnouncement("Model answers shown and locked.");
    resetButtonRef.current?.focus({ preventScroll: true });
    setStudentAnswers(answers);

    setResult([
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", "", "", "", "", "", "", "", "", "", "", ""]);

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
        aria-invalid={result[i] === false}
        placeholder={"Pronoun"}
        title={`Combined indefinite pronoun ${i + 1}: use a part from each visible column`}
        aria-label={`Combined indefinite pronoun ${i + 1}: use a part from each visible column`}
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
      data-exercise-scope={"WB_Unit8_Page46_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit8_Page46_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit8_Page46_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit8_Page46_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
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
          sectionLetter="C"
          title={
            <>
              <div style={{ display: "block" }}>
                write{" "}
                <span className="text-[#00AEEF]">indefinite pronouns </span>by
                putting the words together. You can use the words more than
                once.
              </div>
            </>
          }
          subTitle="Decide whether the blank refers to a person, place, or thing and whether the sentence is positive, negative, or a question."
        />
        {/* CONTENT */}

        <div className="grid grid-cols-[300px_1fr] gap-10">
          {/* LEFT SIDE */}

          <div className="flex items-center gap-4">
            {/* COLUMN 1 */}

            <div className="flex flex-col gap-10">
              {["every", "any", "no", "some"].map((word, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center"
                  style={{
                    width: "100px",
                    height: "40px",
                    border: "2px solid #6D2980",
                    borderRadius: "12px",
                    fontSize: "18px",
                  }}
                >
                  <AudioText
                    audio={audio}
                    id={`word-${word}`}
                    src={
                      {
                        every: soundC2,
                        any: soundC4,
                        no: soundC6,
                        some: soundC8,
                        one: soundC3,
                        body: soundC5,
                        thing: soundC7,
                      }[word]
                    }
                    label={`Hear ${word}`}
                  >
                    {word}
                  </AudioText>
                </div>
              ))}
            </div>

            {/* PLUS */}

            <div
              className="font-bold"
              style={{
                fontSize: "45px",
                marginTop: "-10px",
              }}
            >
              +
            </div>

            {/* COLUMN 2 */}

            <div className="flex flex-col gap-10">
              {["one", "body", "thing"].map((word, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center"
                  style={{
                    width: "100px",
                    height: "40px",
                    border: "2px solid #6D2980",
                    borderRadius: "12px",
                    fontSize: "18px",
                  }}
                >
                  <AudioText
                    audio={audio}
                    id={`word-${word}`}
                    src={
                      {
                        every: soundC2,
                        any: soundC4,
                        no: soundC6,
                        some: soundC8,
                        one: soundC3,
                        body: soundC5,
                        thing: soundC7,
                      }[word]
                    }
                    label={`Hear ${word}`}
                  >
                    {word}
                  </AudioText>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="grid grid-cols-2 gap-x-10 gap-y-10">
            {studentAnswers.map((_, index) => (
              <div key={index}>{inputField(index)}</div>
            ))}
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

export default WB_Unit8_Page46_Q1;
