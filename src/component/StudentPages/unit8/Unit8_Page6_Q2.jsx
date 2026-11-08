import clip5 from "../../../assets/audio/ClassBook/U8/Page 69 - D/Item_006_Teri.mp3";
import clip4 from "../../../assets/audio/ClassBook/U8/Page 69 - D/Item_005_Sam.mp3";
import clip3 from "../../../assets/audio/ClassBook/U8/Page 69 - D/Item_004_Molly.mp3";
import clip2 from "../../../assets/audio/ClassBook/U8/Page 69 - D/Item_003_Susan.mp3";
import clip1 from "../../../assets/audio/ClassBook/U8/Page 69 - D/Item_002_Ryan.mp3";
import clip0 from "../../../assets/audio/ClassBook/U8/Page 69 - D/Item_001_James.mp3";

import clip6 from "../../../assets/audio/ClassBook/U8/Page 69 - D/Item_007_Everyone_had_a_colorful_ball.mp3";
import clip7 from "../../../assets/audio/ClassBook/U8/Page 69 - D/Item_008_Nobody_had_a_yo-yo.mp3";
import clip8 from "../../../assets/audio/ClassBook/U8/Page 69 - D/Item_009_No_one_had_cake.mp3";
import clip9 from "../../../assets/audio/ClassBook/U8/Page 69 - D/Item_010_Someone_had_cake.mp3";
import clip10 from "../../../assets/audio/ClassBook/U8/Page 69 - D/Item_011_Somebody_had_a_pencil.mp3";
import clip11 from "../../../assets/audio/ClassBook/U8/Page 69 - D/Item_012_Everybody_had_ice_cream.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import { AudioFeedback, AudioSpeaker } from "../unit5/ExerciseAudioText";
import { SentenceGroup } from "../unit5/SentenceAudio";
import React, { useState } from "react";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 69/SVG/Asset 35.svg";

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

const Unit8_Page6_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = ["T", "F", "F", "T", "T", "T"];

  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const handleSelect = (i, value) => {
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

    if (answers.some((a) => !a.trim())) {
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
    setAnswers(["T", "F", "F", "T", "T", "T"]);

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const tfInput = (i) => (
    <span className="relative inline-block">
      <input
        style={{ ...(result[i] === true ? { borderColor: "#16a34a" } : {}) }}
        aria-invalid={!!(result[i] === false)}
        title={`Statement ${i + 1}, write T or F using the party picture`}
        aria-label={`Statement ${i + 1}, write T or F using the party picture`}
        {...fieldKeys}
        type="text"
        maxLength={1}
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleSelect(i, e.target.value.toUpperCase())}
        className={`
          w-[38px]
          h-[38px]
          text-center
          rounded-xl
          outline-none
          bg-transparent
          text-[18px]
          font-semibold
          uppercase
          border-2

          ${
            result[i] === false
              ? "border-[#D1232A] text-[#1DA1F2]"
              : "border-[#6D2980] text-[#1DA1F2]"
          }
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

  return (
    <div
      data-exercise-scope={"Unit8_Page6_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit8_Page6_Q2.jsx"] input:focus-visible,[data-exercise-scope="Unit8_Page6_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Unit8_Page6_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall">
        {/* TITLE */}
        <ExerciseHeader
          sectionLetter="D"
          title={<>Use the pictures to answer the questions below.</>}
          subTitle="Check each statement against the picture clues, then select every answer that is supported."
        />

        {/* PARAGRAPH */}
        <div className="text-[18px] leading-normal mb-6 w-[900px]">
          Mindy had a party and invited some of her friends and family. She gave
          everyone who came some food and gifts. Look at each person’s place at
          the table, and then answer the statements
          <span className="text-[#1DA1F2]"> T </span>(
          <span className="text-[#1DA1F2]">true</span>) or
          <span className="text-[#1DA1F2]"> F </span>(
          <span className="text-[#1DA1F2]">false</span>).
        </div>

        {/* IMAGE */}
        <div style={{ position: "relative", width: "850px", maxWidth: "100%" }}>
          <img
            src={img}
            alt={
              "Party picture table. James: ice cream, cake, a colorful ball and a yo-yo. Ryan: ice cream and a colorful ball. Susan: ice cream, cake and a colorful ball. Molly: ice cream, cake, a colorful ball and a yo-yo. Sam: ice cream, a colorful ball, a yo-yo and a pencil. Teri: ice cream, cake, a colorful ball and a pencil."
            }
            style={{
              width: "850px",
              height: "auto",
              marginBottom: "35px",
            }}
          />
          {["James", "Ryan", "Susan", "Molly", "Sam", "Teri"].map(
            (name, index) => (
              <span
                key={name}
                role="button"
                tabIndex={0}
                data-choice
                {...activationKeys}
                aria-label={`Hear ${name}`}
                onClick={() =>
                  audio.play(
                    `name-${index}`,
                    [clip0, clip1, clip2, clip3, clip4, clip5][index],
                  )
                }
                style={{
                  position: "absolute",
                  left: `${(index * 100) / 6}%`,
                  top: 0,
                  width: `${100 / 6}%`,
                  height: "calc(100% - 35px)",
                  borderRadius: 6,
                  cursor: "pointer",
                  ...(audio.activeId === `name-${index}`
                    ? {
                        boxShadow: "inset 0 0 0 3px #2563eb",
                        backgroundColor: "rgba(219,234,254,.35)",
                      }
                    : {}),
                }}
              >
                {audio.activeId === `name-${index}` && <AudioSpeaker />}
              </span>
            ),
          )}
        </div>

        {/* QUESTIONS */}
        <div className="grid grid-cols-2 gap-y-8 gap-x-24 text-[18px] mb-15">
          <SentenceGroup
            label={"Hear statement 1"}
            src={clip6}
            id={"statement-0"}
            audio={audio}
            className="flex items-center gap-4"
          >
            <span className="font-bold">1</span>

            {tfInput(0)}

            <span>Everyone had a colorful ball.</span>
          </SentenceGroup>

          <SentenceGroup
            label={"Hear statement 2"}
            src={clip7}
            id={"statement-1"}
            audio={audio}
            className="flex items-center gap-4"
          >
            <span className="font-bold">2</span>

            {tfInput(1)}

            <span>Nobody had a yo-yo.</span>
          </SentenceGroup>

          <SentenceGroup
            label={"Hear statement 3"}
            src={clip8}
            id={"statement-2"}
            audio={audio}
            className="flex items-center gap-4"
          >
            <span className="font-bold">3</span>

            {tfInput(2)}

            <span>No one had cake.</span>
          </SentenceGroup>

          <SentenceGroup
            label={"Hear statement 4"}
            src={clip9}
            id={"statement-3"}
            audio={audio}
            className="flex items-center gap-4"
          >
            <span className="font-bold">4</span>

            {tfInput(3)}

            <span>Someone had cake.</span>
          </SentenceGroup>

          <SentenceGroup
            label={"Hear statement 5"}
            src={clip10}
            id={"statement-4"}
            audio={audio}
            className="flex items-center gap-4"
          >
            <span className="font-bold">5</span>

            {tfInput(4)}

            <span>Somebody had a pencil.</span>
          </SentenceGroup>

          <SentenceGroup
            label={"Hear statement 6"}
            src={clip11}
            id={"statement-5"}
            audio={audio}
            className="flex items-center gap-4"
          >
            <span className="font-bold">6</span>

            {tfInput(5)}

            <span>Everybody had ice cream.</span>
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

export default Unit8_Page6_Q2;
