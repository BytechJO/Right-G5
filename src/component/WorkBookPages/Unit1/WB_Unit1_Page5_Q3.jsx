import clip0 from "../../../assets/audio/Workbook/Unit 1/Page 5 - G/Item_001_It_is_two_meters_long.mp3";
import clip1 from "../../../assets/audio/Workbook/Unit 1/Page 5 - G/Item_002_How_many_friends_do_you_have.mp3";
import clip2 from "../../../assets/audio/Workbook/Unit 1/Page 5 - G/Item_003_I_have_seven_friends.mp3";
import clip3 from "../../../assets/audio/Workbook/Unit 1/Page 5 - G/Item_004_How_long_is_the_table.mp3";
import clip4 from "../../../assets/audio/Workbook/Unit 1/Page 5 - G/Item_005_It_is_60_centimeters_wide.mp3";
import clip5 from "../../../assets/audio/Workbook/Unit 1/Page 5 - G/Item_006_How_wide_is_that_TV.mp3";
import clip6 from "../../../assets/audio/Workbook/Unit 1/Page 5 - G/Item_007_It_is_30_minutes_from_here.mp3";
import clip7 from "../../../assets/audio/Workbook/Unit 1/Page 5 - G/Item_008_How_far_is_it_to_your_school.mp3";
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

const WB_Unit1_Page5_Q3 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = ["b", "a", "c", "d"];

  const [answers, setAnswers] = useState(["", "", "", ""]);

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
    setAnswers(["b", "a", "c", "d"]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", ""]);

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
        title={`Question ${i + 1}, matching answer letter a to d`}
        aria-label={`Question ${i + 1}, matching answer letter a to d`}
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
      data-exercise-scope={"WB_Unit1_Page5_Q3.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit1_Page5_Q3.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit1_Page5_Q3.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit1_Page5_Q3.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall " style={{gap:"50px"}}>
        {/* TITLE */}
        <ExerciseHeader
          subTitle="Start with one item, find the partner that matches its meaning or picture, then connect the pair before moving on."
          isWorkbook
          sectionLetter="G"
          title={<>Match.</>}
        />

        <div className="flex justify-between gap-24 text-[18px]">
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-15">
            {/* 1 */}
            <div className="flex items-center gap-4">
              {selectLetter(0)}

              <span className="font-bold">1</span>

              <span>
                <AudioText
                  audio={audio}
                  id={"audio-0"}
                  src={clip1}
                  label={"Hear How many friends do you have?"}
                >
                  How many friends do you have?
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
                  src={clip3}
                  label={"Hear How long is the table?"}
                >
                  How long is the table?
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
                  label={"Hear How wide is that TV?"}
                >
                  How wide is that TV?
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
                  src={clip7}
                  label={"Hear How far is it to your school?"}
                >
                  How far is it to your school?
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
                  id={"audio-4"}
                  src={clip0}
                  label={"Hear It is two meters long."}
                >
                  It is two meters long.
                </AudioText>
              </span>
            </div>

            <div className="flex gap-4">
              <span className="font-bold">b</span>

              <span>
                <AudioText
                  audio={audio}
                  id={"audio-5"}
                  src={clip2}
                  label={"Hear I have seven friends."}
                >
                  I have seven friends.
                </AudioText>
              </span>
            </div>

            <div className="flex gap-4">
              <span className="font-bold">c</span>

              <span>
                <AudioText
                  audio={audio}
                  id={"audio-6"}
                  src={clip4}
                  label={"Hear It is 60 centimeters wide."}
                >
                  It is 60 centimeters wide.
                </AudioText>
              </span>
            </div>

            <div className="flex gap-4">
              <span className="font-bold">d</span>

              <span>
                <AudioText
                  audio={audio}
                  id={"audio-7"}
                  src={clip6}
                  label={"Hear It is 30 minutes from here."}
                >
                  It is 30 minutes from here.
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

export default WB_Unit1_Page5_Q3;
