import soundF13 from "../../../assets/audio/Workbook/unit 2/Page 11 - F/Item_013_is_smart,_always_gets_an_A.mp3";
import soundF12 from "../../../assets/audio/Workbook/unit 2/Page 11 - F/Item_012_My_friend,.mp3";
import soundF11 from "../../../assets/audio/Workbook/unit 2/Page 11 - F/Item_011_was_in_my_backpack.mp3";
import soundF10 from "../../../assets/audio/Workbook/unit 2/Page 11 - F/Item_010_My_brother_took_the_pencil.mp3";
import soundF9 from "../../../assets/audio/Workbook/unit 2/Page 11 - F/Item_009_is_crossing_the_street_has_white_fur.mp3";
import soundF8 from "../../../assets/audio/Workbook/unit 2/Page 11 - F/Item_008_The_cat.mp3";
import soundF7 from "../../../assets/audio/Workbook/unit 2/Page 11 - F/Item_007_The_student.mp3";
import soundF6 from "../../../assets/audio/Workbook/unit 2/Page 11 - F/Item_006_is_the_first_to_finish_their_classwork_gets_a_sticker.mp3";
import soundF5 from "../../../assets/audio/Workbook/unit 2/Page 11 - F/Item_005_was_so_fun.mp3";
import soundF4 from "../../../assets/audio/Workbook/unit 2/Page 11 - F/Item_004_I_rode_on_the_merry-go-round,.mp3";
import soundF3 from "../../../assets/audio/Workbook/unit 2/Page 11 - F/Item_003_which.mp3";
import soundF2 from "../../../assets/audio/Workbook/unit 2/Page 11 - F/Item_002_that.mp3";
import soundF1 from "../../../assets/audio/Workbook/unit 2/Page 11 - F/Item_001_who.mp3";
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
const WB_Unit2_Page11_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");
  const questions = ["which", "who", "that", "which", "who"];
  const words = ["who", "that", "which"];
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
    const hasEmpty = answers.some((a) => !a.trim());
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
    const newResults = answers.map((a, i) => {
      const ok = normalize(a) === normalize(questions[i]);
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
      resetButtonRef.current?.focus({
        preventScroll: true,
      });
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
    resetButtonRef.current?.focus({
      preventScroll: true,
    });
    setAnswers(["which", "who", "that", "which", "who"]);
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
  const inputField = (i, width = "w-[180px]") => (
    <div className="relative inline-block">
      <input
        style={{
          borderBottomColor:
            result[i] === true || result[i]?.overall === true
              ? "#16a34a"
              : undefined,
        }}
        placeholder={"Word"}
        title={
          [
            "I rode on the merry-go-round, ___ was so fun.",
            "The student ___ is the first to finish their classwork gets a sticker.",
            "The cat ___ is crossing the street has white fur.",
            "My brother took the pencil ___ was in my backpack.",
            "My friend, ___ is smart, always gets an A.",
          ][i]
        }
        aria-label={
          [
            "I rode on the merry-go-round, ___ was so fun.",
            "The student ___ is the first to finish their classwork gets a sticker.",
            "The cat ___ is crossing the street has white fur.",
            "My brother took the pencil ___ was in my backpack.",
            "My friend, ___ is smart, always gets an A.",
          ][i]
        }
        {...fieldKeys}
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          ${width}
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
      data-exercise-scope={"WB_Unit2_Page11_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit2_Page11_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit2_Page11_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit2_Page11_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[18px]">
        {/* TITLE */}
        <ExerciseHeader
          isWorkbook
          sectionLetter="F"
          title={<>Read and write.</>}
          subTitle="Find the noun being described first, then build the relative clause with the correct who/which/that relationship."
        />

        {/* WORD BOX */}
        <div className="flex justify-center mb-2">
          <div
            style={{
              border: "2px solid #7D3C98",
              borderRadius: "14px",
              padding: "12px 30px",
            }}
            className="flex gap-12"
          >
            {words.map((word, index) => (
              <div
                key={index}
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                }}
              >
                <AudioText
                  audio={audio}
                  id={`bank-${word}`}
                  src={
                    {
                      who: soundF1,
                      that: soundF2,
                      which: soundF3,
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

        {/* QUESTIONS */}
        <div className="flex flex-col gap-10">
          {/* 1 */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-bold">1</span>

            <span>
              <AudioText
                audio={audio}
                id={"fragment-0"}
                src={soundF4}
                label={"Hear I rode on the merry-go-round,"}
              >
                I rode on the merry-go-round,
              </AudioText>
            </span>

            {inputField(0)}

            <span>
              <AudioText
                audio={audio}
                id={"fragment-1"}
                src={soundF5}
                label={"Hear was so fun."}
              >
                was so fun.
              </AudioText>
            </span>
          </div>

          {/* 2 */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-bold">2</span>

            <span>
              <AudioText
                audio={audio}
                id={"fragment-2"}
                src={soundF7}
                label={"Hear The student"}
              >
                The student
              </AudioText>
            </span>

            {inputField(1)}

            <span>
              <AudioText
                audio={audio}
                id={"fragment-3"}
                src={soundF6}
                label={
                  "Hear is the first to finish their classwork gets a sticker."
                }
              >
                is the first to finish their classwork gets a sticker.
              </AudioText>
            </span>
          </div>

          {/* 3 */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-bold">3</span>

            <span>
              <AudioText
                audio={audio}
                id={"fragment-4"}
                src={soundF8}
                label={"Hear The cat"}
              >
                The cat
              </AudioText>
            </span>

            {inputField(2)}

            <span>
              <AudioText
                audio={audio}
                id={"fragment-5"}
                src={soundF9}
                label={"Hear is crossing the street has white fur."}
              >
                is crossing the street has white fur.
              </AudioText>
            </span>
          </div>

          {/* 4 */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-bold">4</span>

            <span>
              <AudioText
                audio={audio}
                id={"fragment-6"}
                src={soundF10}
                label={"Hear My brother took the pencil"}
              >
                My brother took the pencil
              </AudioText>
            </span>

            {inputField(3)}

            <span>
              <AudioText
                audio={audio}
                id={"fragment-7"}
                src={soundF11}
                label={"Hear was in my backpack."}
              >
                was in my backpack.
              </AudioText>
            </span>
          </div>

          {/* 5 */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-bold">5</span>

            <span>
              <AudioText
                audio={audio}
                id={"fragment-8"}
                src={soundF12}
                label={"Hear My friend,"}
              >
                My friend,
              </AudioText>
            </span>

            {inputField(4)}

            <span>
              <AudioText
                audio={audio}
                id={"fragment-9"}
                src={soundF13}
                label={"Hear is smart, always gets an A."}
              >
                is smart, always gets an A.
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
          onPointerDown={(event) => {
            if (locked) event.preventDefault();
          }}
          style={{
            cursor: locked ? "not-allowed" : "pointer",
          }}
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
export default WB_Unit2_Page11_Q2;
