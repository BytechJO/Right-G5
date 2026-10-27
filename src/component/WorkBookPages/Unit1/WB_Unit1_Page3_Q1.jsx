import clip0 from "../../../assets/audio/Workbook/Unit 1/Page 3 - A/Item_001_mirror.mp3";
import clip1 from "../../../assets/audio/Workbook/Unit 1/Page 3 - A/Item_002_alarm.mp3";
import clip2 from "../../../assets/audio/Workbook/Unit 1/Page 3 - A/Item_003_counting.mp3";
import clip3 from "../../../assets/audio/Workbook/Unit 1/Page 3 - A/Item_004_right_away.mp3";
import clip4 from "../../../assets/audio/Workbook/Unit 1/Page 3 - A/Item_005_Uh-oh!.mp3";
import clip5 from "../../../assets/audio/Workbook/Unit 1/Page 3 - A/Item_006_I_dropped_my_papers_on_the_floor.mp3";
import clip6 from "../../../assets/audio/Workbook/Unit 1/Page 3 - A/Item_007_I_did_not_hear_the_go_off_at_7_00_a.m.mp3";
import clip7 from "../../../assets/audio/Workbook/Unit 1/Page 3 - A/Item_008_Look_at_your_face_in_the.mp3";
import clip8 from "../../../assets/audio/Workbook/Unit 1/Page 3 - A/Item_009_I_know_you_need_it_fast,_so_I_will_do_it.mp3";
import clip9 from "../../../assets/audio/Workbook/Unit 1/Page 3 - A/Item_010_He_was_the_number_of_apples_in_the_basket.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
} from "../../StudentPages/unit5/ExerciseAudioText";
import { SentenceGroup } from "../../StudentPages/unit5/SentenceAudio";
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

const WB_Unit1_Page3_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = ["Uh-oh!", "alarm", "mirror", "right away", "counting"];

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
    setAnswers(["Uh-oh!", "alarm", "mirror", "right away", "counting"]);

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

  const inputField = (i, width) => (
    <span className="relative inline-block">
      <input
        placeholder={"Word / phrase"}
        style={{
          ...(result[i] === true ? { borderBottomColor: "#16a34a" } : {}),
        }}
        aria-invalid={result[i] === false}
        title={`Sentence ${i + 1}, vocabulary word or expression from the boxes`}
        aria-label={`Sentence ${i + 1}, vocabulary word or expression from the boxes`}
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
    </span>
  );

  const wordBox = (word) => (
    <div
      style={{
        border: "2px solid #7D3C98",
        borderRadius: "12px",
        padding: "8px 22px",
        fontSize: "18px",
        minWidth: "120px",
        textAlign: "center",
      }}
    >
      <AudioText
        audio={audio}
        id={`bank-${word}`}
        src={
          {
            mirror: clip0,
            alarm: clip1,
            counting: clip2,
            "right away": clip3,
            "Uh-oh!": clip4,
          }[word]
        }
        label={`Hear ${word}`}
      >
        {word}
      </AudioText>
    </div>
  );

  return (
    <div
      data-exercise-scope={"WB_Unit1_Page3_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit1_Page3_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit1_Page3_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit1_Page3_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
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
          subTitle="Read the full sentence first, then choose the word or expression that fits both the meaning and grammar."
          isWorkbook
          sectionLetter="A"
          title={<>Read and write.</>}
        />

        {/* WORD BOXES */}
        <div className="flex gap-5 mb-7 flex-wrap">
          {wordBox("mirror")}
          {wordBox("alarm")}
          {wordBox("counting")}
          {wordBox("right away")}
          {wordBox("Uh-oh!")}
        </div>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-10">
          {/* 1 */}
          <SentenceGroup
            label={"Hear sentence 1"}
            src={clip5}
            id={"sentence-0"}
            audio={audio}
            className="flex items-center gap-3 flex-wrap"
          >
            <span className="font-bold">1</span>

            {inputField(0, "w-[180px]")}

            <span>I dropped my papers on the floor.</span>
          </SentenceGroup>

          {/* 2 */}
          <SentenceGroup
            label={"Hear sentence 2"}
            src={clip6}
            id={"sentence-1"}
            audio={audio}
            className="flex items-center gap-3 flex-wrap"
          >
            <span className="font-bold">2</span>

            <span>I did not hear the</span>

            {inputField(1, "w-[180px]")}

            <span>go off at 7:00 a.m.</span>
          </SentenceGroup>

          {/* 3 */}
          <SentenceGroup
            label={"Hear sentence 3"}
            src={clip7}
            id={"sentence-2"}
            audio={audio}
            className="flex items-center gap-3 flex-wrap"
          >
            <span className="font-bold">3</span>

            <span>Look at your face in the</span>

            {inputField(2, "w-[170px]")}

            <span>.</span>
          </SentenceGroup>

          {/* 4 */}
          <SentenceGroup
            label={"Hear sentence 4"}
            src={clip8}
            id={"sentence-3"}
            audio={audio}
            className="flex items-center gap-3 flex-wrap"
          >
            <span className="font-bold">4</span>

            <span>I know you need it fast, so I will do it</span>

            {inputField(3, "w-[180px]")}

            <span>.</span>
          </SentenceGroup>

          {/* 5 */}
          <SentenceGroup
            label={"Hear sentence 5"}
            src={clip9}
            id={"sentence-4"}
            audio={audio}
            className="flex items-center gap-3 flex-wrap"
          >
            <span className="font-bold">5</span>

            <span>He was</span>

            {inputField(4, "w-[180px]")}

            <span>the number of apples in the basket.</span>
          </SentenceGroup>
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

export default WB_Unit1_Page3_Q1;
