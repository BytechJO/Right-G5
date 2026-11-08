import soundD4 from "../../../assets/audio/Workbook/Unit 4/Page 22 - D/Item_004_I_went_to_the_jeans_store_to_shop_for_a_camera.mp3";
import soundD3 from "../../../assets/audio/Workbook/Unit 4/Page 22 - D/Item_003_We_will_straight_ahead_now_and_go_our_separate_ways,_and_we_can_meet_up.mp3";
import soundD2 from "../../../assets/audio/Workbook/Unit 4/Page 22 - D/Item_002_Let's_head_over_to_the_dining_area_of_the_food_court.mp3";
import soundD1 from "../../../assets/audio/Workbook/Unit 4/Page 22 - D/Item_001_I_went_to_the_electronics_store_to_buy_a_pair_of_jeans.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
  AudioSpeaker,
} from "../../StudentPages/unit5/ExerciseAudioText";
import {
  SentenceGroup,
  SentencePart,
} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

import trueImg from "../../../assets/imgs/true.svg";
import flaseImg from "../../../assets/imgs/false.svg";
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

const WB_Unit4_Page22_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      status: "false",
      correction: "clothes store",
    },
    {
      status: "true",
      correction: "",
    },
    {
      status: "false",
      correction: "split up",
    },
    {
      status: "false",
      correction: "electronics store",
    },
  ];

  const [marks, setMarks] = useState(["", "", "", ""]);

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const handleMark = (i, value) => {
    setAnnouncement(`Sentence ${i + 1}: ${value} selected.`);
    if (locked || result[i]?.row === true) return;

    const updatedMarks = [...marks];

    updatedMarks[i] = value;

    setMarks(updatedMarks);

    if (value === "true") {
      const updatedAnswers = [...answers];

      updatedAnswers[i] = "";

      setAnswers(updatedAnswers);
    }

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const handleChange = (i, value) => {
    if (locked || result[i]?.row === true || marks[i] === "true") return;

    const updated = answers.map((row) => (Array.isArray(row) ? [...row] : row));

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

    const hasEmptyMark = marks.some((m) => !m);

    if (hasEmptyMark) {
      (setAnnouncement(
        String("Please complete all answers.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Please complete all answers."));

      return;
    }

    const hasMissingCorrection = marks.some(
      (m, i) => m === "false" && !answers[i].trim(),
    );

    if (hasMissingCorrection) {
      (setAnnouncement(
        String("Please write the correct word for X answers.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Please write the correct word for X answers."));

      return;
    }

    let correctCount = 0;

    const newResults = marks.map((mark, i) => {
      const markOk = mark === questions[i].status;

      const correctionOk =
        mark === "true"
          ? true
          : normalize(answers[i]) === normalize(questions[i].correction);

      const rowOk = markOk && correctionOk;

      if (rowOk) correctCount++;

      return {
        mark: markOk,
        correction: correctionOk,
        row: rowOk,
      };
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
    setMarks(["false", "true", "false", "false"]);

    setAnswers(["clothes store", "", "split up", "electronics store"]);

    setResult([
      { mark: true, correction: true, row: true },
      { mark: true, correction: true, row: true },
      { mark: true, correction: true, row: true },
      { mark: true, correction: true, row: true },
    ]);
    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setMarks(["", "", "", ""]);

    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const markBox = (i, value, img) => {
    const active = marks[i] === value;

    const showError =
      result[i]?.mark === false &&
      ((value === "true" && marks[i] === "true") ||
        (value === "false" && marks[i] === "false"));

    return (
      <button
        aria-pressed={active}
        aria-label={`Sentence ${i + 1}: ${value}`}
        data-choice={true}
        {...activationKeys}
        type="button"
        disabled={locked || result[i]?.row === true}
        onClick={() => handleMark(i, value)}
        className="relative flex items-center justify-center"
        style={{
          width: "34px",
          height: "34px",
          border: "1px solid #6D2980",
          borderRadius: "6px",
          background: "transparent",
          cursor: locked || result[i]?.row === true ? "default" : "pointer",
          backgroundColor: active ? "#dbeafe" : undefined,
          borderColor:
            active && result[i]?.mark !== undefined
              ? result[i].mark
                ? "#16a34a"
                : "#D1232A"
              : "#6D2980",
        }}
      >
        {active && (
          <img
            aria-hidden={true}
            src={img}
            alt={""}
            style={{
              width: "24px",
              height: "24px",
            }}
          />
        )}

        {showError && (
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
      </button>
    );
  };

  const inputField = (i, width = "w-[190px]") => (
    <div className="relative inline-block">
      <input
        readOnly={locked || result[i]?.row === true || marks[i] !== "false"}
        aria-invalid={result[i]?.correction === false}
        style={{
          borderBottomColor:
            marks[i] === "false" && result[i]?.correction === true
              ? "#16a34a"
              : undefined,
        }}
        placeholder={"Correct word"}
        title={`Sentence ${i + 1}: write the corrected word when false`}
        aria-label={`Sentence ${i + 1}: write the corrected word when false`}
        {...fieldKeys}
        type="text"
        value={answers[i]}
        disabled={false}
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

          ${
            result[i]?.correction === false && marks[i] === "false"
              ? "border-[#D1232A]"
              : "border-black"
          }
        `}
      />

      {result[i]?.correction === false && marks[i] === "false" && (
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
      data-exercise-scope={"WB_Unit4_Page22_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit4_Page22_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit4_Page22_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit4_Page22_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[18px]" style={{gap:"50px"}}>
        <ExerciseHeader
          isWorkbook
          sectionLetter="D"
          title={<>Read and write ✓ or X. For X, write the correct word.</>}
          subTitle="Judge each sentence first; when you choose X, correct only the word that makes the sentence wrong."
        />

        <div className="flex flex-col gap-15 w-[100%]">
          <SentenceGroup
            label={"Hear sentence 1"}
            src={soundD1}
            id={"sentence-0"}
            audio={audio}
            className="flex items-center gap-4 flex-wrap"
          >
            <div className="flex items-center gap-2">
              {markBox(0, "true", trueImg)}
              {markBox(0, "false", flaseImg)}
            </div>

            <span>
              I went to the <u>electronics store</u> to buy a pair of jeans.
            </span>

            {inputField(0)}
          </SentenceGroup>

          <SentenceGroup
            label={"Hear sentence 2"}
            src={soundD2}
            id={"sentence-1"}
            audio={audio}
            className="flex items-center gap-4 flex-wrap"
          >
            <div className="flex items-center gap-2">
              {markBox(1, "true", trueImg)}
              {markBox(1, "false", flaseImg)}
            </div>

            <span>
              Let’s <u>head over</u> to the dining area of the food court.
            </span>

            {inputField(1)}
          </SentenceGroup>

          <SentenceGroup
            label={"Hear sentence 3"}
            src={soundD3}
            id={"sentence-2"}
            audio={audio}
            className="flex items-center gap-4 flex-wrap"
          >
            <div className="flex items-center gap-2">
              {markBox(2, "true", trueImg)}
              {markBox(2, "false", flaseImg)}
            </div>

            <span>
              We will <u>straight ahead</u> now and go our separate ways, and we
              can meet up later.
            </span>

            {inputField(2)}
          </SentenceGroup>

          <SentenceGroup
            label={"Hear sentence 4"}
            src={soundD4}
            id={"sentence-3"}
            audio={audio}
            className="flex items-center gap-4 flex-wrap"
          >
            <div className="flex items-center gap-2">
              {markBox(3, "true", trueImg)}
              {markBox(3, "false", flaseImg)}
            </div>

            <span>
              I went to the <u>jeans</u> store to shop for a camera.
            </span>

            {inputField(3)}
          </SentenceGroup>
        </div>
      </div>

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

export default WB_Unit4_Page22_Q2;
