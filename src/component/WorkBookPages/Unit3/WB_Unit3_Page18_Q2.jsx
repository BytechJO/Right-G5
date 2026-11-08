import soundH9 from "../../../assets/audio/Workbook/Unit 3/Page 18 - H/Item_009_looks_cloudy.mp3";
import soundH7 from "../../../assets/audio/Workbook/Unit 3/Page 18 - H/Item_007_tastes_delicious.mp3";
import soundH5 from "../../../assets/audio/Workbook/Unit 3/Page 18 - H/Item_005_¢_is_happy.mp3";
import soundH3 from "../../../assets/audio/Workbook/Unit 3/Page 18 - H/Item_003_seems_interesting.mp3";
import soundH2 from "../../../assets/audio/Workbook/Unit 3/Page 18 - H/Item_002_feels_soft.mp3";
import soundH10 from "../../../assets/audio/Workbook/Unit 3/Page 18 - H/Item_010_Mom's_pie.mp3";
import soundH8 from "../../../assets/audio/Workbook/Unit 3/Page 18 - H/Item_008_The_cat's_fur.mp3";
import soundH6 from "../../../assets/audio/Workbook/Unit 3/Page 18 - H/Item_006_The_book.mp3";
import soundH4 from "../../../assets/audio/Workbook/Unit 3/Page 18 - H/Item_004_Sarah.mp3";
import soundH1 from "../../../assets/audio/Workbook/Unit 3/Page 18 - H/Item_001_The_weather.mp3";
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
const WB_Unit3_Page18_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");
  const answers = ["e", "c", "b", "a", "d"];
  const leftItems = [
    "The weather",
    "Sarah",
    "The book",
    "The cat’s fur",
    "Mom’s pie",
  ];
  const rightItems = [
    "feels soft.",
    "seems interesting.",
    "is happy.",
    "tastes delicious.",
    "looks cloudy.",
  ];
  const rightLetters = ["a", "b", "c", "d", "e"];
  const [studentAnswers, setStudentAnswers] = useState(["", "", "", "", ""]);
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
    setStudentAnswers(answers);
    setResult([true, true, true, true, true]);
    setLocked(true);
  };
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", "", "", "", ""]);
    setResult([]);
    setLocked(false);
  };
  const inputField = (i) => (
    <div className="relative inline-block">
      <input
        aria-invalid={result[i] === false}
        style={{
          borderBottomColor:
            result[i] === true || result[i]?.overall === true
              ? "#16a34a"
              : undefined,
        }}
        title={`Match ${leftItems[i]}: enter a letter a to e`}
        aria-label={`Match ${leftItems[i]}: enter a letter a to e`}
        {...fieldKeys}
        type="text"
        maxLength={1}
        value={studentAnswers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          w-[55px]
          border-0
          border-b
          outline-none
          bg-transparent
          text-center
          text-[18px]
          text-[#6D2980]
          font-semibold

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
      data-exercise-scope={"WB_Unit3_Page18_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit3_Page18_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit3_Page18_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit3_Page18_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[18px] w-full" style={{gap:"60px"}}>
        {/* TITLE */}
        <ExerciseHeader
          isWorkbook
          sectionLetter="H"
          title={<>Match.</>}
          subTitle="Start with one item, find the partner that matches its meaning or picture, then connect the pair before moving on."
        />

        {/* MATCHING */}
        <div className="grid grid-cols-2 gap-x-30">
          {/* LEFT */}
          <div className="flex flex-col gap-15">
            {leftItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                {inputField(index)}

                <span className="font-bold">{index + 1}</span>

                <span>
                  <AudioText
                    audio={audio}
                    id={`left-${index}`}
                    src={[soundH1, soundH4, soundH6, soundH8, soundH10][index]}
                    label={`Hear ${item}`}
                  >
                    {item}
                  </AudioText>
                </span>
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-15">
            {rightItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="font-bold lowercase">
                  {rightLetters[index]}
                </span>

                <span>
                  <AudioText
                    audio={audio}
                    id={`right-${index}`}
                    src={[soundH2, soundH3, soundH5, soundH7, soundH9][index]}
                    label={`Hear ${item}`}
                  >
                    {item}
                  </AudioText>
                </span>
              </div>
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
          onPointerDown={(e) => {
            if (locked) e.preventDefault();
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
export default WB_Unit3_Page18_Q2;
