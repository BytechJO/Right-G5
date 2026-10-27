import clip0 from "../../../assets/audio/Workbook/Unit 1/Page 8 - L/Item_001_How_much_does_a_loaf_of_bread_cost.mp3";
import clip1 from "../../../assets/audio/Workbook/Unit 1/Page 8 - L/Item_002_It_is_two_kilometers_from_the_school.mp3";
import clip2 from "../../../assets/audio/Workbook/Unit 1/Page 8 - L/Item_003_How_does_a_bird_fly.mp3";
import clip3 from "../../../assets/audio/Workbook/Unit 1/Page 8 - L/Item_004_It's_about_$1.00.mp3";
import clip4 from "../../../assets/audio/Workbook/Unit 1/Page 8 - L/Item_005_Usually_I_can_eat_three.mp3";
import clip5 from "../../../assets/audio/Workbook/Unit 1/Page 8 - L/Item_006_How_many_pancakes_would_you_like.mp3";
import clip6 from "../../../assets/audio/Workbook/Unit 1/Page 8 - L/Item_007_It_has_hollow_bones_and_strong_chest.mp3";
import clip7 from "../../../assets/audio/Workbook/Unit 1/Page 8 - L/Item_008_How_do_you_learn_how_to_draw.mp3";
import clip8 from "../../../assets/audio/Workbook/Unit 1/Page 8 - L/Item_009_muscles.mp3";
import clip9 from "../../../assets/audio/Workbook/Unit 1/Page 8 - L/Item_010_better.mp3";
import clip10 from "../../../assets/audio/Workbook/Unit 1/Page 8 - L/Item_011_I_took_an_art_class.mp3";
import clip11 from "../../../assets/audio/Workbook/Unit 1/Page 8 - L/Item_012_How_far_away_is_your_house.mp3";
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

const WB_Unit1_Page8_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = ["b", "d", "c", "e", "a"];

  const [answers, setAnswers] = useState(["", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const handleSelect = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...answers];

    updated[i] = value.slice(-1);
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

    const hasEmpty = answers.some((a) => !a);

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
      const ok = a.toLowerCase() === questions[i].toLowerCase();

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
    setAnswers(["b", "d", "c", "e", "a"]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const selectLetter = (i) => (
    <div className="relative inline-block">
      <input
        style={{
          ...(result[i] === true ? { borderBottomColor: "#16a34a" } : {}),
        }}
        aria-invalid={result[i] === false}
        title={`Question ${i + 1}, matching answer letter a to e`}
        aria-label={`Question ${i + 1}, matching answer letter a to e`}
        {...fieldKeys}
        type="text"
        maxLength={1}
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleSelect(i, e.target.value.toLowerCase())}
        className={`
        border-0
        border-b
        bg-transparent
        outline-none
        text-[18px]
        text-[#6d2980]
        font-semibold
        w-[55px]
        text-center

        ${result[i] === false ? "border-[#D1232A]" : "border-black"}
      `}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-10px",
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
      data-exercise-scope={"WB_Unit1_Page8_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit1_Page8_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit1_Page8_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit1_Page8_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall ">
        {/* TITLE */}
        <ExerciseHeader
          subTitle="Start with one item, find the partner that matches its meaning or picture, then connect the pair before moving on."
          isWorkbook
          sectionLetter="L"
          title={<>Match.</>}
        />

        <div className="flex justify-between gap-24 text-[18px]">
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-12">
            {/* 1 */}
            <div className="flex items-center gap-4">
              {selectLetter(0)}

              <span className="font-bold">1</span>

              <span>
                <AudioText
                  audio={audio}
                  id={"audio-0"}
                  src={clip0}
                  label={"Hear How much does a loaf of bread cost?"}
                >
                  How much does a loaf of bread cost?
                </AudioText>
              </span>
            </div>
            {/* 2 */}
            <div className="flex items-center gap-4">
              {selectLetter(1)}

              <span className="font-bold">2</span>

              <span>
                <AudioText
                  audio={audio}
                  id={"audio-1"}
                  src={clip2}
                  label={"Hear How does a bird fly?"}
                >
                  How does a bird fly?
                </AudioText>
              </span>
            </div>
            {/* 3 */}
            <div className="flex items-center gap-4">
              {selectLetter(2)}

              <span className="font-bold">3</span>

              <span>
                <AudioText
                  audio={audio}
                  id={"audio-2"}
                  src={clip5}
                  label={"Hear How many pancakes would you like?"}
                >
                  How many pancakes would you like?
                </AudioText>
              </span>
            </div>
            {/* 4 */}
            <div className="flex items-center gap-4">
              {selectLetter(3)}

              <span className="font-bold">4</span>

              <span>
                <AudioText
                  audio={audio}
                  id={"audio-3"}
                  src={[clip7, clip9]}
                  label={"Hear How do you learn how to draw better?"}
                >
                  {" "}
                  How do you learn how to draw better?
                </AudioText>
              </span>
            </div>{" "}
            <div className="flex items-center gap-4">
              {selectLetter(4)}

              <span className="font-bold">5</span>

              <span>
                <AudioText
                  audio={audio}
                  id={"audio-4"}
                  src={clip11}
                  label={"Hear How far away is your house?"}
                >
                  How far away is your house?{" "}
                </AudioText>
              </span>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-15 min-w-[320px]">
            <div className="flex gap-4">
              <span className="font-bold">a</span>

              <span>
                <AudioText
                  audio={audio}
                  id={"audio-5"}
                  src={clip1}
                  label={"Hear It is two kilometers from the school."}
                >
                  It is two kilometers from the school.
                </AudioText>
              </span>
            </div>

            <div className="flex gap-4">
              <span className="font-bold">b</span>

              <span>
                <AudioText
                  audio={audio}
                  id={"audio-6"}
                  src={clip3}
                  label={"Hear It’s about $1.00."}
                >
                  It’s about $1.00.
                </AudioText>
              </span>
            </div>

            <div className="flex gap-4">
              <span className="font-bold">c</span>

              <span>
                <AudioText
                  audio={audio}
                  id={"audio-7"}
                  src={clip4}
                  label={"Hear Usually I can eat three."}
                >
                  Usually I can eat three.
                </AudioText>
              </span>
            </div>

            <div className="flex gap-4">
              <span className="font-bold">d</span>

              <span>
                <AudioText
                  audio={audio}
                  id={"audio-8"}
                  src={[clip6, clip8]}
                  label={"Hear It has hollow bones and strong chest muscles."}
                >
                  It has hollow bones and strong chest muscles.
                </AudioText>
              </span>
            </div>
            <div className="flex gap-4">
              <span className="font-bold">e</span>

              <span>
                <AudioText
                  audio={audio}
                  id={"audio-9"}
                  src={clip10}
                  label={"Hear I took an art class."}
                >
                  I took an art class.
                </AudioText>
              </span>
            </div>
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

export default WB_Unit1_Page8_Q1;
