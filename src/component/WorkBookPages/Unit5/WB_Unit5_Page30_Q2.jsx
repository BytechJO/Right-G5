import soundI4 from "../../../assets/audio/Workbook/Unit 5/Page 30 - I/Item_004_We_ordered_some_shish_kebab_for_dinner.mp3";
import soundI3 from "../../../assets/audio/Workbook/Unit 5/Page 30 - I/Item_003_The_both_class_went_to_the_field_trip.mp3";
import soundI2 from "../../../assets/audio/Workbook/Unit 5/Page 30 - I/Item_002_The_teacher_gave_us_a_new_class_assignment.mp3";
import soundI1 from "../../../assets/audio/Workbook/Unit 5/Page 30 - I/Item_001_The_information_in_the_library_gave_me_all_the_books_I_requested.mp3";
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

const WB_Unit5_Page30_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      status: "false",
      correction: "librarian",
    },

    {
      status: "true",
      correction: "",
    },

    {
      status: "false",
      correction: "entire",
    },

    {
      status: "true",
      correction: "",
    },
  ];

  const sentences = [
    <>
      The <u>information</u> in the library gave me all the books I requested.
    </>,

    <>
      The teacher gave us a new class <u>assignment</u>.
    </>,

    <>
      The <u>both</u> class went to the field trip.
    </>,

    <>
      We ordered some <u>shish kebab</u> for dinner.
    </>,
  ];

  const [marks, setMarks] = useState(["", "", "", ""]);

  const [answers, setAnswers] = useState(["", "", "", ""]);

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
  // CHECK
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

    const hasMissingCorrection = marks.some(
      (m, i) => m === "false" && !answers[i].trim(),
    );

    if (hasMissingCorrection) {
      (setAnnouncement(
        String("Please write the correct vocabulary word for X answers.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info(
          "Please write the correct vocabulary word for X answers.",
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
      // FINAL
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
    setMarks(["false", "true", "false", "true"]);

    setAnswers(["librarian", "", "entire", ""]);

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
    setMarks(["", "", "", ""]);

    setAnswers(["", "", "", ""]);

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

  const inputField = (i, width = "240px") => (
    <div className="relative inline-block">
      <input
        style={{
          borderBottomColor:
            marks[i] === "false" && result[i]?.correction === true
              ? "#16a34a"
              : undefined,
        }}
        aria-invalid={marks[i] === "false" && result[i]?.correction === false}
        placeholder={"Correct word"}
        title={`Sentence ${i + 1}: write the correction when false`}
        aria-label={`Sentence ${i + 1}: write the correction when false`}
        {...fieldKeys}
        type="text"
        value={answers[i]}
        disabled={locked || result[i]?.row === true || marks[i] === "true"}
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
      data-exercise-scope={"WB_Unit5_Page30_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit5_Page30_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit5_Page30_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit5_Page30_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[18px] w-full"> 
        {/* TITLE */}

        <ExerciseHeader
          isWorkbook
          sectionLetter="I"
          title={
            <>
              <div style={{ display: "block" }}>
                Read and write <span className="text-[#D1252B]">✓</span> or{" "}
                <span className="text-[#D1252B]">✕</span> to show if the
                underlined word is used for your correctly.
                <div style={{ marginTop: "4px" }}>
                  Write the correct vocabulary word if the underlined word is
                  incorrect.
                </div>
              </div>
            </>
          }
          subTitle="Check the underlined vocabulary in context; if it is wrong, replace only that word with the correct vocabulary item."
        />

        {/* QUESTIONS */}

        <div className="flex flex-col gap-15">
          {sentences.map((sentence, index) => (
            <div key={index} className="w-full">
              {/* ROW */}

              <SentenceGroup
                label={`Hear sentence ${index + 1}`}
                src={[soundI1, soundI2, soundI3, soundI4][index]}
                id={`sentence-${index}`}
                audio={audio}
                className="flex items-center gap-6 w-full whitespace-nowrap"
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

                {/* INPUT */}
                <div className="flex-1">{inputField(index)}</div>
              </SentenceGroup>
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

export default WB_Unit5_Page30_Q2;
