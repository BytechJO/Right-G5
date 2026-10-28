import soundG3 from "../../../assets/audio/Workbook/Unit 5/Page 29 - G/Item_003_Help_me_solve_this_math_question.mp3";
import soundG2 from "../../../assets/audio/Workbook/Unit 5/Page 29 - G/Item_002_Where_is_the_bathroom.mp3";
import soundG1 from "../../../assets/audio/Workbook/Unit 5/Page 29 - G/Item_001_I_would_like_a_cup_of_milk,_please.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import { AudioFeedback } from "../../StudentPages/unit5/ExerciseAudioText";
import { SentenceGroup } from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

import trueImg from "../../../assets/imgs/true.svg";
import falseImg from "../../../assets/imgs/false.svg";
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

const WB_Unit5_Page29_Q3 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      status: "true",
      correction: "",
    },

    {
      status: "false",
      correction: "Can you help me to find the bathroom, please?",
    },

    {
      status: "false",
      correction: "Would you please help me to solve this math question?",
    },
  ];

  const sentences = [
    "I would like a cup of milk, please.",

    "Where is the bathroom?",

    "Help me solve this math question.",
  ];

  const [marks, setMarks] = useState(["", "", ""]);

  const [answers, setAnswers] = useState(["", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  // ------------------------
  // HANDLE MARK
  // ------------------------

  const handleMark = (i, value) => {
    if (locked || result[i]?.mark === true) return;

    setAnnouncement(`Sentence ${i + 1}: ${value} selected.`);
    const updatedMarks = [...marks];

    updatedMarks[i] = value;

    setMarks(updatedMarks);

    // اذا اختار صح يمسح الانبوت
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

  // ------------------------
  // HANDLE INPUT
  // ------------------------

  const handleChange = (i, value) => {
    if (locked || result[i]?.row === true || marks[i] === "true") return;

    const updated = [...answers];

    updated[i] = value;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] =
        prev[i]?.mark === true
          ? { mark: true, correction: undefined, row: undefined }
          : undefined;

      return copy;
    });
  };

  // ------------------------
  // CHECK ANSWERS
  // ------------------------

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

    // اذا اختار X لازم يكتب
    const hasMissingCorrection = marks.some(
      (m, i) => m === "false" && !answers[i].trim(),
    );

    if (hasMissingCorrection) {
      (setAnnouncement(
        String("Please write the correct sentence for X answers.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info(
          "Please write the correct sentence for X answers.",
        ));

      return;
    }

    let correctCount = 0;

    const newResults = marks.map((mark, i) => {
      // -------------------
      // CHECK MARK
      // -------------------

      const markOk = mark === questions[i].status;

      // -------------------
      // CHECK INPUT
      // -------------------

      const correctionOk =
        mark === "true"
          ? true
          : normalize(answers[i]) === normalize(questions[i].correction);

      // -------------------
      // FINAL ROW
      // -------------------

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

  // ------------------------
  // SHOW ANSWERS
  // ------------------------

  const showAnswers = () => {
    audio.stop();
    setAnnouncement("Model answers shown and locked.");
    resetButtonRef.current?.focus({ preventScroll: true });
    setMarks(["true", "false", "false"]);

    setAnswers([
      "",
      "Can you help me to find the bathroom, please?",
      "Would you please help me to solve this math question?",
    ]);

    setResult([
      {
        mark: true,
        correction: true,
        row: true,
      },

      {
        mark: true,
        correction: true,
        row: true,
      },

      {
        mark: true,
        correction: true,
        row: true,
      },
    ]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setMarks(["", "", ""]);

    setAnswers(["", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // MARK BOX
  // ------------------------

  const markBox = (i, value, img) => {
    const active = marks[i] === value;

    const showError =
      result[i]?.mark === false &&
      ((value === "true" && marks[i] === "true") ||
        (value === "false" && marks[i] === "false"));

    return (
      <button
        aria-label={`Sentence ${i + 1}: ${value}`}
        aria-pressed={active}
        data-choice={true}
        {...activationKeys}
        type="button"
        disabled={locked || result[i]?.mark === true}
        onClick={() => handleMark(i, value)}
        className="relative flex items-center justify-center"
        style={{
          width: "34px",
          height: "34px",
          border: "1px solid #6D2980",
          borderRadius: "6px",
          background: "transparent",
          cursor: locked || result[i]?.mark === true ? "default" : "pointer",
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

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i, width = "100%") => (
    <div className="relative w-full">
      <input
        aria-invalid={marks[i] === "false" && result[i]?.correction === false}
        placeholder={"Polite request"}
        title={`Sentence ${i + 1}: write the correction when false`}
        aria-label={`Sentence ${i + 1}: write the correction when false`}
        {...fieldKeys}
        type="text"
        value={answers[i]}
        disabled={locked || result[i]?.row === true || marks[i] === "true"}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          w-full
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
        style={{
          width,
          borderBottomColor:
            marks[i] === "false" && result[i]?.correction === true
              ? "#16a34a"
              : undefined,
        }}
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
      data-exercise-scope={"WB_Unit5_Page29_Q3.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit5_Page29_Q3.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit5_Page29_Q3.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit5_Page29_Q3.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[18px] w-full" style={{gap:"50px"}}>
        {/* TITLE */}

        <ExerciseHeader
          isWorkbook
          sectionLetter="G"
          title={
            <>
              Write <span className="text-[#D1252B]">✓</span> or{" "}
              <span className="text-[#D1252B]">✕</span>. For
              <span className="text-[#D1252B]">✕</span> , rewrite the sentence
              as a <span className="text-[#00AEEF]">polite request</span>.
            </>
          }
          subTitle="Decide whether each request is polite first; for every X, rewrite it using a polite form such as could, would, or please."
        />

        {/* QUESTIONS */}

        <div className="flex flex-col gap-[7vh]">
          {sentences.map((sentence, index) => (
            <div key={index} className="w-full">
              {/* ROW */}

              <SentenceGroup
                label={`Hear sentence ${index + 1}: ${sentence}`}
                src={[soundG1, soundG2, soundG3][index]}
                id={`sentence-${index}`}
                audio={audio}
                className="flex items-center gap-4 mb-4 flex-wrap"
              >
                {/* BOXES */}

                <div className="flex items-center gap-2">
                  {markBox(index, "true", trueImg)}

                  {markBox(index, "false", falseImg)}
                </div>

                {/* NUMBER */}

                <span className="font-bold w-5">{index + 1}</span>

                {/* SENTENCE */}

                <span>{sentence}</span>
              </SentenceGroup>

              {/* INPUT */}

              <div className="pl-[90px]">{inputField(index, "100%")}</div>
            </div>
          ))}
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

export default WB_Unit5_Page29_Q3;
