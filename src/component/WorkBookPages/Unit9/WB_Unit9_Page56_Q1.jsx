import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

import trueImg from "../../../assets/imgs/true.svg";
import falseImg from "../../../assets/imgs/false.svg";

const WB_Unit9_Page56_Q1 = () => {
  const questions = [
    {
      status: "true",
      correction: "",
    },

    {
      status: "false",
      correction: "great news",
    },

    {
      status: "true",
      correction: "",
    },

    {
      status: "false",
      correction: "stadium",
    },
    {
      status: "true",
      correction: "",
    },
  ];

  const sentences = [
    <>
      I got new <u>braces</u> for my teeth.
    </>,

    <>
      I have <u>mowing</u> ! We are going to a field trip tomorrow!
    </>,

    <>
      Let’s begin the school year and <u>see how it goes</u> .
    </>,

    <>
      Jane went to the <u>congratulations</u> today. She is going to see a game.
    </>,
    <>
      Ben will <u>ring</u> his friend later today.
    </>,
  ];

  const [marks, setMarks] = useState(["", "", "", ""]);

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  // ------------------------
  // HANDLE MARK
  // ------------------------

  const handleMark = (i, value) => {
    if (locked || result[i]?.mark === true) return;

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

      copy[i] = undefined;

      return copy;
    });
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (locked) return;

    const hasEmptyMark = marks.some((m) => !m);

    if (hasEmptyMark) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    const hasMissingCorrection = marks.some(
      (m, i) => m === "false" && !answers[i].trim(),
    );

    if (hasMissingCorrection) {
      ValidationAlert.info(
        "Please write the correct vocabulary word for X answers.",
      );

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
      setLocked(true);

      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // ------------------------
  // SHOW ANSWERS
  // ------------------------

  const showAnswers = () => {
    setMarks(["true", "false", "true", "false", "true"]);

    setAnswers(["", "great news", "", "stadium", ""]);

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
        }}
      >
        {active && (
          <img
            src={img}
            alt={value}
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

  const inputField = (i) => (
    <div className="relative w-full">
      <input
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
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <div className="header-title-page8 mb-[13vh]">
          <span className="ex-A mr-2">J</span>
          Read and write <span className="text-[#D1252B]">✓</span> or{" "}
          <span className="text-[#D1252B]">✕</span> For{" "}
          <span className="text-[#D1252B]">✕</span>, write the correct word or
          expression.
        </div>

        {/* QUESTIONS */}

        <div className="flex flex-col gap-12">
          {sentences.map((sentence, index) => (
            <div key={index} className="w-full">
              {/* ROW */}

              <div className="flex items-end gap-4 w-full">
                {/* BOXES */}

                <div className="flex items-center gap-2 shrink-0">
                  {markBox(index, "true", trueImg)}

                  {markBox(index, "false", falseImg)}
                </div>

                {/* NUMBER */}

                <span className="font-bold shrink-0">{index + 1}</span>

                {/* SENTENCE */}

                <span className="shrink-0">{sentence}</span>

                {/* INPUT */}

                <div className="flex-1">{inputField(index, "100%")}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BUTTONS */}

      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>

        <button className="show-answer-btn" onClick={showAnswers}>
          Show Answer
        </button>

        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default WB_Unit9_Page56_Q1;
