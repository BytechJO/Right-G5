import clip0 from "../../../assets/audio/Workbook/Unit 1/Page 5 - F/Item_001_are_you_I_am_10_years_old.mp3";
import clip1 from "../../../assets/audio/Workbook/Unit 1/Page 5 - F/Item_002_(old_tall_).mp3";
import clip2 from "../../../assets/audio/Workbook/Unit 1/Page 5 - F/Item_003_How.mp3";
import clip3 from "../../../assets/audio/Workbook/Unit 1/Page 5 - F/Item_004_does_this_shirt_cost_It_costs_13_dollars.mp3";
import clip4 from "../../../assets/audio/Workbook/Unit 1/Page 5 - F/Item_005_(much_many_).mp3";
import clip5 from "../../../assets/audio/Workbook/Unit 1/Page 5 - F/Item_006_is_this_pool_It_is_three_meters_deep.mp3";
import clip6 from "../../../assets/audio/Workbook/Unit 1/Page 5 - F/Item_007_(_short_deep_).mp3";
import clip7 from "../../../assets/audio/Workbook/Unit 1/Page 5 - F/Item_008_did_Dad_drive_Dad_drove_20_kilometers.mp3";
import clip8 from "../../../assets/audio/Workbook/Unit 1/Page 5 - F/Item_009_(_far_wide_).mp3";
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

const WB_Unit1_Page5_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      answer: "old",
      options: ["old", "tall"],
    },
    {
      answer: "much",
      options: ["much", "many"],
    },
    {
      answer: "deep",
      options: ["short", "deep"],
    },
    {
      answer: "far",
      options: ["far", "wide"],
    },
  ];

  const [selected, setSelected] = useState(["", "", "", ""]);

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const handleSelect = (i, option) => {
    if (locked || result[i] === true) return;
    setAnnouncement("Item " + (i + 1) + " selected: " + option + ".");

    const updatedSelected = [...selected];

    updatedSelected[i] = option;

    setSelected(updatedSelected);

    const updatedAnswers = [...answers];

    updatedAnswers[i] = option;

    setAnswers(updatedAnswers);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;
    audio.stop();

    const hasEmpty = selected.some((s) => !s);

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

    const newResults = selected.map((s, i) => {
      const ok = s.toLowerCase() === questions[i].answer.toLowerCase();

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
    setSelected(["old", "much", "deep", "far"]);

    setAnswers(["old", "much", "deep", "far"]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setSelected(["", "", "", ""]);

    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width) => (
    <span className="relative inline-block">
      <input
        tabIndex={-1}
        style={{
          ...(result[i] === true ? { borderBottomColor: "#16a34a" } : {}),
        }}
        aria-invalid={result[i] === false}
        title={`Sentence ${i + 1}, selected word; use the two options beside the sentence`}
        aria-label={`Sentence ${i + 1}, selected word; use the two options beside the sentence`}
        {...fieldKeys}
        type="text"
        value={answers[i]}
        readOnly
        className={`
          ${width}
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6d2980]
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

  const optionCircle = (i, option) => {
    const active = selected[i] === option;

    return (
      <button
        {...activationKeys}
        aria-label={`Sentence ${i + 1}, choose ${option}`}
        aria-pressed={selected[i] === option}
        data-choice={true}
        type="button"
        disabled={locked || result[i] === true}
        onClick={() => handleSelect(i, option)}
        style={{
          position: "relative",
          // background: selected[i] === option ? "#dbeafe" : "transparent",
          border: "none",
          fontSize: "18px",
          cursor: locked || result[i] === true ? "default" : "pointer",
          color: "black",
          borderRadius: "50%",
         
          "--exercise-focus-radius": "9999px",
        }}
      >
        {option}

        {active && (
          <span
            style={{
              position: "absolute",
              top: "-7px",
              left: "-10px",
              width: "calc(100% + 20px)",
              height: "38px",
              border: "3px solid #6d2980",
              
              borderRadius: "50%",
              pointerEvents: "none",
              borderColor:
                result[i] === true
                  ? "#16a34a"
                  : result[i] === false
                    ? "#D1232A"
                    : "#6d2980",
            }}
          />
        )}
      </button>
    );
  };

  return (
    <div
      data-exercise-scope={"WB_Unit1_Page5_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit1_Page5_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit1_Page5_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit1_Page5_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
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
          subTitle="Read all choices before selecting; choose only the option that makes the full sentence or expression correct."
          isWorkbook
          sectionLetter="F"
          title={<>Read and circle.</>}
        />

        {/* QUESTIONS */}
        <div className="flex flex-col gap-15 text-[18px]">
          {/* 1 */}
          <div className="flex items-center justify-between gap-5">
            <div className="flex items-center gap-5 flex-wrap">
              <span className="font-bold">1</span>

              <span>
                <AudioText
                  audio={audio}
                  id="how-0"
                  src={clip2}
                  label="Hear How"
                >
                  How
                </AudioText>
              </span>

              {inputField(0, "w-[120px]")}

              <span>
                <AudioText
                  audio={audio}
                  id="fragment-0"
                  src={clip0}
                  label="Hear are you? I am 10 years old."
                >
                  are you? I am 10 years old.
                </AudioText>
              </span>
            </div>

            <SentenceGroup
              label={"Hear the two choices for item 1"}
              src={clip1}
              id={"options-0"}
              audio={audio}
              className="flex items-center gap-2"
            >
              <span>(</span>

              {optionCircle(0, "old")}

              <span>/</span>

              {optionCircle(0, "tall")}

              <span>)</span>
            </SentenceGroup>
          </div>

          {/* 2 */}
          <div className="flex items-center justify-between gap-5">
            <div className="flex items-center gap-5 flex-wrap">
              <span className="font-bold">2</span>

              <span>
                <AudioText
                  audio={audio}
                  id="how-1"
                  src={clip2}
                  label="Hear How"
                >
                  How
                </AudioText>
              </span>

              {inputField(1, "w-[120px]")}

              <span>
                <AudioText
                  audio={audio}
                  id="fragment-1"
                  src={clip3}
                  label="Hear does this shirt cost? It costs 13 dollars."
                >
                  does this shirt cost? It costs 13 dollars.
                </AudioText>
              </span>
            </div>

            <SentenceGroup
              label={"Hear the two choices for item 2"}
              src={clip4}
              id={"options-1"}
              audio={audio}
              className="flex items-center gap-2"
            >
              <span>(</span>

              {optionCircle(1, "much")}

              <span>/</span>

              {optionCircle(1, "many")}

              <span>)</span>
            </SentenceGroup>
          </div>

          {/* 3 */}
          <div className="flex items-center justify-between gap-5">
            <div className="flex items-center gap-5 flex-wrap">
              <span className="font-bold">3</span>

              <span>
                <AudioText
                  audio={audio}
                  id="how-2"
                  src={clip2}
                  label="Hear How"
                >
                  How
                </AudioText>
              </span>

              {inputField(2, "w-[120px]")}

              <span>
                <AudioText
                  audio={audio}
                  id="fragment-2"
                  src={clip5}
                  label="Hear is this pool? It is three meters deep."
                >
                  is this pool? It is three meters deep.
                </AudioText>
              </span>
            </div>

            <SentenceGroup
              label={"Hear the two choices for item 3"}
              src={clip6}
              id={"options-2"}
              audio={audio}
              className="flex items-center gap-2"
            >
              <span>(</span>

              {optionCircle(2, "short")}

              <span>/</span>

              {optionCircle(2, "deep")}

              <span>)</span>
            </SentenceGroup>
          </div>

          {/* 4 */}
          <div className="flex items-center justify-between gap-5">
            <div className="flex items-center gap-5 flex-wrap">
              <span className="font-bold">4</span>

              <span>
                <AudioText
                  audio={audio}
                  id="how-3"
                  src={clip2}
                  label="Hear How"
                >
                  How
                </AudioText>
              </span>

              {inputField(3, "w-[120px]")}

              <span>
                <AudioText
                  audio={audio}
                  id="fragment-3"
                  src={clip7}
                  label="Hear did Dad drive? Dad drove 20 kilometers."
                >
                  did Dad drive? Dad drove 20 kilometers.
                </AudioText>
              </span>
            </div>

            <SentenceGroup
              label={"Hear the two choices for item 4"}
              src={clip8}
              id={"options-3"}
              audio={audio}
              className="flex items-center gap-2"
            >
              <span>(</span>

              {optionCircle(3, "far")}

              <span>/</span>

              {optionCircle(3, "wide")}

              <span>)</span>
            </SentenceGroup>
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

export default WB_Unit1_Page5_Q2;
