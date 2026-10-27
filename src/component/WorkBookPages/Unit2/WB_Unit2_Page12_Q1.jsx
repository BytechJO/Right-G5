import soundG11 from "../../../assets/audio/Workbook/unit 2/Page 12 - G/Item_011_way.mp3";
import soundG10 from "../../../assets/audio/Workbook/unit 2/Page 12 - G/Item_010_,_always_dress_the_same.mp3";
import soundG9 from "../../../assets/audio/Workbook/unit 2/Page 12 - G/Item_009_Penny_and_Jenny,.mp3";
import soundG8 from "../../../assets/audio/Workbook/unit 2/Page 12 - G/Item_008_who_is_the_youngest.mp3";
import soundG7 from "../../../assets/audio/Workbook/unit 2/Page 12 - G/Item_007_,_is_two_years_old.mp3";
import soundG6 from "../../../assets/audio/Workbook/unit 2/Page 12 - G/Item_006_My_baby_brother,.mp3";
import soundG5 from "../../../assets/audio/Workbook/unit 2/Page 12 - G/Item_005_which_was_the_highest_grade.mp3";
import soundG4 from "../../../assets/audio/Workbook/unit 2/Page 12 - G/Item_004_I_got_an_A+,.mp3";
import soundG3 from "../../../assets/audio/Workbook/unit 2/Page 12 - G/Item_003_who_are_twins.mp3";
import soundG2 from "../../../assets/audio/Workbook/unit 2/Page 12 - G/Item_002_Did_the_baby_play_with_his_toy.mp3";
import soundG1 from "../../../assets/audio/Workbook/unit 2/Page 12 - G/Item_001_that_was_in_his_crib.mp3";
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
const WB_Unit2_Page12_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");
  const questions = ["a", "c", "d", "b"];
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
    setAnswers(["a", "c", "d", "b"]);
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
          borderBottomColor:
            result[i] === true || result[i]?.overall === true
              ? "#16a34a"
              : undefined,
        }}
        title={
          [
            "Did the baby play with his toy ...",
            "I got an A+, ...",
            "My baby brother, ... , is two years old.",
            "Penny and Jenny, ... , always dress the same way.",
          ][i]
        }
        aria-label={
          [
            "Did the baby play with his toy ...",
            "I got an A+, ...",
            "My baby brother, ... , is two years old.",
            "Penny and Jenny, ... , always dress the same way.",
          ][i]
        }
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
      data-exercise-scope={"WB_Unit2_Page12_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit2_Page12_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit2_Page12_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit2_Page12_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
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
          isWorkbook
          sectionLetter="G"
          title={<>Match.</>}
          subTitle="Start with one item, find the partner that matches its meaning or picture, then connect the pair before moving on."
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
                  id={"fragment-0"}
                  src={soundG2}
                  label={"Hear Did the baby play with his toy ..."}
                >
                  Did the baby play with his toy ...
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
                  id={"fragment-1"}
                  src={soundG4}
                  label={"Hear I got an A+, ..."}
                >
                  I got an A+, ...
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
                  id={"fragment-2"}
                  src={[soundG6, soundG7]}
                  label={"Hear My baby brother, ... , is two years old."}
                >
                  My baby brother, ... , is two years old.{" "}
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
                  id={"fragment-3"}
                  src={[soundG9, soundG10, soundG11]}
                  label={
                    "Hear Penny and Jenny, ... , always dress the same way."
                  }
                >
                  Penny and Jenny, ... , always dress the same way.
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
                  id={"fragment-4"}
                  src={soundG1}
                  label={"Hear that was in his crib?"}
                >
                  that was in his crib?
                </AudioText>
              </span>
            </div>

            <div className="flex gap-4">
              <span className="font-bold">b</span>

              <span>
                <AudioText
                  audio={audio}
                  id={"fragment-5"}
                  src={soundG3}
                  label={"Hear who are twins"}
                >
                  who are twins
                </AudioText>
              </span>
            </div>

            <div className="flex gap-4">
              <span className="font-bold">c</span>

              <span>
                <AudioText
                  audio={audio}
                  id={"fragment-6"}
                  src={soundG5}
                  label={"Hear which was the highest grade."}
                >
                  which was the highest grade.
                </AudioText>
              </span>
            </div>

            <div className="flex gap-4">
              <span className="font-bold">d</span>

              <span>
                <AudioText
                  audio={audio}
                  id={"fragment-7"}
                  src={soundG8}
                  label={"Hear who is the youngest"}
                >
                  who is the youngest
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
export default WB_Unit2_Page12_Q1;
