import soundH9 from "../../../assets/audio/Workbook/unit 2/Page 12 - H/Item_009_(was_which_gift_mom_my_a_from).mp3";
import soundH8 from "../../../assets/audio/Workbook/unit 2/Page 12 - H/Item_008_I_wore_my_favorite_dress.mp3";
import soundH7 from "../../../assets/audio/Workbook/unit 2/Page 12 - H/Item_007_(was_very_that_clean).mp3";
import soundH6 from "../../../assets/audio/Workbook/unit 2/Page 12 - H/Item_006_I_sat_in_a_taxi.mp3";
import soundH5 from "../../../assets/audio/Workbook/unit 2/Page 12 - H/Item_005_(very_was_long_which).mp3";
import soundH4 from "../../../assets/audio/Workbook/unit 2/Page 12 - H/Item_004_I_won_the_race,.mp3";
import soundH3 from "../../../assets/audio/Workbook/unit 2/Page 12 - H/Item_003_(my_is_who_friend).mp3";
import soundH2 from "../../../assets/audio/Workbook/unit 2/Page 12 - H/Item_002_Sarah,.mp3";
import soundH1 from "../../../assets/audio/Workbook/unit 2/Page 12 - H/Item_001_,_gave_me_a_birthday_present.mp3";
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
const WB_Unit2_Page12_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");
  const questions = [
    "who is my friend",
    "which was very long",
    "that was very clean",
    "which was a gift from my mom",
  ];
  const [answers, setAnswers] = useState(["", "", "", ""]);
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
    setAnswers([
      "who is my friend",
      "which was very long",
      "that was very clean",
      "which was a gift from my mom",
    ]);
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
  const inputField = (i, width = "w-full") => (
    <div className="relative inline-block flex-1">
      <input
        style={{
          borderBottomColor:
            result[i] === true || result[i]?.overall === true
              ? "#16a34a"
              : undefined,
        }}
        placeholder={"Relative clause"}
        title={
          [
            "Sarah, ___, gave me a birthday present.",
            "I won the race, ___.",
            "I sat in a taxi ___.",
            "I wore my favorite dress ___.",
          ][i]
        }
        aria-label={
          [
            "Sarah, ___, gave me a birthday present.",
            "I won the race, ___.",
            "I sat in a taxi ___.",
            "I wore my favorite dress ___.",
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
      data-exercise-scope={"WB_Unit2_Page12_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit2_Page12_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit2_Page12_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit2_Page12_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall" style={{gap:"50px"}}>
        {/* TITLE */}
        <ExerciseHeader
          isWorkbook
          sectionLetter="H"
          title={
            <>
              Read, and write the{" "}
              <span className="text-[#19B6F0]">relative clause </span>in the
              right order.
            </>
          }
          subTitle="Find the noun being described first, then build the relative clause with the correct who/which/that relationship."
        />

        {/* QUESTIONS */}
        <div className="flex flex-col justify-between min-h-[54vh]  text-[18px]">
          {/* 1 */}
          <div>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="font-bold">1</span>

              <span>
                <AudioText
                  audio={audio}
                  id={"fragment-0"}
                  src={soundH2}
                  label={"Hear Sarah,"}
                >
                  Sarah,
                </AudioText>
              </span>

              {inputField(0)}

              <span>
                <AudioText
                  audio={audio}
                  id={"fragment-1"}
                  src={soundH1}
                  label={"Hear , gave me a birthday present."}
                >
                  , gave me a birthday present.
                </AudioText>
              </span>
            </div>

            <div className="ml-[25px] mt-3">
              <AudioText
                audio={audio}
                id={"fragment-2"}
                src={soundH3}
                label={"Hear (my/is/who/friend)"}
              >
                (my/is/who/friend)
              </AudioText>
            </div>
          </div>

          {/* 2 */}
          <div>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="font-bold">2</span>

              <span>
                <AudioText
                  audio={audio}
                  id={"fragment-3"}
                  src={soundH4}
                  label={"Hear I won the race,"}
                >
                  I won the race,
                </AudioText>
              </span>

              {inputField(1)}

              <span>.</span>
            </div>

            <div className="ml-[25px] mt-3">
              <AudioText
                audio={audio}
                id={"fragment-4"}
                src={soundH5}
                label={"Hear (very/was/long/which)"}
              >
                (very/was/long/which)
              </AudioText>
            </div>
          </div>

          {/* 3 */}
          <div>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="font-bold">3</span>

              <span>
                <AudioText
                  audio={audio}
                  id={"fragment-5"}
                  src={soundH6}
                  label={"Hear I sat in a taxi"}
                >
                  I sat in a taxi
                </AudioText>
              </span>

              {inputField(2)}

              <span>.</span>
            </div>

            <div className="ml-[25px] mt-3">
              <AudioText
                audio={audio}
                id={"fragment-6"}
                src={soundH7}
                label={"Hear (was/very/that/clean)"}
              >
                (was/very/that/clean)
              </AudioText>
            </div>
          </div>

          {/* 4 */}
          <div>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="font-bold">4</span>

              <span>
                <AudioText
                  audio={audio}
                  id={"fragment-7"}
                  src={soundH8}
                  label={"Hear I wore my favorite dress"}
                >
                  I wore my favorite dress
                </AudioText>
              </span>

              {inputField(3)}

              <span>.</span>
            </div>

            <div className="ml-[25px] mt-3">
              <AudioText
                audio={audio}
                id={"fragment-8"}
                src={soundH9}
                label={"Hear (was/which/gift/mom/my/a/from)"}
              >
                (was/which/gift/mom/my/a/from)
              </AudioText>
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
export default WB_Unit2_Page12_Q2;
