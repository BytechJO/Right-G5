import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback } from "./ExerciseAudioText";
import clip0 from "../../../assets/audio/ClassBook/U1/Page 9 - F/Item_001_How_do_you_spell_your_name.mp3";
import clip1 from "../../../assets/audio/ClassBook/U1/Page 9 - F/Item_002_How_far_is_it_to_your_house.mp3";
import clip2 from "../../../assets/audio/ClassBook/U1/Page 9 - F/Item_003_How_many_hours_do_you_study.mp3";
import clip3 from "../../../assets/audio/ClassBook/U1/Page 9 - F/Item_004_How_tall_is_the_elephant.mp3";
import clip4 from "../../../assets/audio/ClassBook/U1/Page 9 - F/Item_005_It's_two_meters_tall.mp3";
import clip5 from "../../../assets/audio/ClassBook/U1/Page 9 - F/Item_006_I_spell_it_S-T-E-V-E-N.mp3";
import clip6 from "../../../assets/audio/ClassBook/U1/Page 9 - F/Item_007_It's_about_two_kilometers_from_here.mp3";
import clip7 from "../../../assets/audio/ClassBook/U1/Page 9 - F/Item_008_I_study_about_two_hours_every_day.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
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
    .replace(/[.,!?;:…“”"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const Page9_Q3 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);

  // ✅ الإجابات الصح
  const correct = ["b", "c", "d", "a"];

  const handleChange = (i, val) => {
    if (locked || result[i] === true) return;
    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);

    // 🔥 امسح حالة الغلط أول ما يعدّل
    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  const input = (i) => (
    <span className="relative mx-2">
      <input
        {...fieldKeys}
        aria-label={`Question ${i + 1}, matching answer letter`}
        title={`Question ${i + 1}, matching answer letter`}
        style={{
          borderBottom:
            locked || result[i] === true
              ? "2px solid #16a34a"
              : result[i] === false
                ? "2px solid #ef4444"
                : undefined,
        }}
        placeholder="A"
        disabled={locked || result[i] === true}
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        maxLength={1}
        className={`w-10 border-b outline-none text-center font-bold uppercase
        ${result[i] === false ? "border-red-500 text-[#6D2980]" : "border-black text-[#6D2980]"}
      `}
      />

      {/* ❌ */}
      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            transform: "translateY(-50%)",
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
            pointerEvents: "none",
            zIndex: 3,
          }}
        >
          ✕
        </span>
      )}
    </span>
  );

  // ====================
  // ✅ CHECK
  // ====================
  const checkAnswers = () => {
    if (locked) return;
    audio.stop();
    setAnnouncement(
      "Checking answers. Correct answers stay locked; incorrect answers can be changed.",
    );

    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;

    const res = answers.map((a, i) => {
      const ok = normalizeAnswer(a) === normalizeAnswer(correct[i]);
      if (ok) correctCount++;
      return ok;
    });

    setResult(res);

    const total = correct.length;

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
      setLocked(true);
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // ====================
  // 👀 SHOW ANSWERS
  // ====================
  const showAnswers = () => {
    audio.stop();
    setAnnouncement("Correct answers shown and locked.");
    setAnswers(correct);
    setLocked(true);

    setResult(correct.map(() => true));
  };

  // ====================
  // 🔄 RESET
  // ====================
  const reset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", ""]);
    setLocked(false);
    setResult([]);
  };

  return (
    <div
      data-unit1-scope="Page9_Q3.jsx"
      className="p-8 flex flex-col items-center"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-unit1-scope="Page9_Q3.jsx"] input:focus-visible,[data-unit1-scope="Page9_Q3.jsx"] textarea:focus-visible,[data-unit1-scope="Page9_Q3.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <div className="div-forall" style={{gap:"50px"}}>
        <ExerciseHeader
          sectionLetter="F"
          title={<>Match each question to its answer.</>}
          subTitle="Start with one item, find the matching partner, then connect the pair before moving to the next one."
        />

        <div className="grid grid-cols-2 gap-15 text-[20px]">
          {/* LEFT */}
          <div className="space-y-15">
            <div>
              {input(0)}{" "}
              <AudioText
                audio={audio}
                id="f-0"
                src={clip0}
                label="Hear question 1"
              >
                1. How do you spell your name?
              </AudioText>
            </div>

            <div>
              {input(1)}{" "}
              <AudioText
                audio={audio}
                id="f-1"
                src={clip1}
                label="Hear question 2"
              >
                2. How far is it to your house?
              </AudioText>
            </div>

            <div>
              {input(2)}{" "}
              <AudioText
                audio={audio}
                id="f-2"
                src={clip2}
                label="Hear question 3"
              >
                3. How many hours do you study?
              </AudioText>
            </div>

            <div>
              {input(3)}{" "}
              <AudioText
                audio={audio}
                id="f-3"
                src={clip3}
                label="Hear question 4"
              >
                4. How tall is the elephant?
              </AudioText>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-15">
            <div>
              <AudioText
                audio={audio}
                id="f-4"
                src={clip4}
                label="Hear answer a"
              >
                a. It’s two meters tall.
              </AudioText>
            </div>
            <div>
              <AudioText
                audio={audio}
                id="f-5"
                src={clip5}
                label="Hear answer b"
              >
                b. I spell it S-T-E-V-E-N.
              </AudioText>
            </div>
            <div>
              <AudioText
                audio={audio}
                id="f-6"
                src={clip6}
                label="Hear answer c"
              >
                c. It’s about two kilometers from here.
              </AudioText>
            </div>
            <div>
              <AudioText
                audio={audio}
                id="f-7"
                src={clip7}
                label="Hear answer d"
              >
                d. I study about two hours every day.
              </AudioText>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="action-buttons-container mt-6">
        <button
          type="button"
          aria-label="Start Again"
          {...activationKeys}
          ref={resetButtonRef}
          className="try-again-button"
          onClick={reset}
        >
          Start Again ↻
        </button>

        <button
          type="button"
          aria-label="Show Answer"
          {...activationKeys}
          onClick={showAnswers}
          className="show-answer-btn"
        >
          Show Answer
        </button>

        <button
          type="button"
          aria-label="Check Answer"
          {...activationKeys}
          disabled={locked}
          style={{ cursor: locked ? "not-allowed" : "pointer" }}
          className="check-button2"
          onClick={checkAnswers}
        >
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Page9_Q3;
