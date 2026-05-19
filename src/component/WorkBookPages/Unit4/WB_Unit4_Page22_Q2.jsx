import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

import trueImg from "../../../assets/imgs/true.svg";
import flaseImg from "../../../assets/imgs/false.svg";

const WB_Unit4_Page22_Q2 = () => {
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

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleMark = (i, value) => {
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

    const hasEmptyMark = marks.some((m) => !m);

    if (hasEmptyMark) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    const hasMissingCorrection = marks.some(
      (m, i) => m === "false" && !answers[i].trim(),
    );

    if (hasMissingCorrection) {
      ValidationAlert.info("Please write the correct word for X answers.");

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
      setLocked(true);

      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const showAnswers = () => {
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
        type="button"
        disabled={locked || result[i]?.row === true}
        onClick={() => handleMark(i, value)}
        className="relative flex items-center justify-center"
        style={{
          width: "34px",
          height: "34px",
          border:  "1px solid #6D2980",
          borderRadius: "6px",
          background: "transparent",
          cursor: locked || result[i]?.row === true ? "default" : "pointer",
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

  const inputField = (i, width = "w-[190px]") => (
    <div className="relative inline-block">
      <input
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
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall text-[18px]">
        <h5 className="header-title-page8 mb-[15vh]">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            D
          </span>
          Read and write ✓ or X. For X, write the correct word.
        </h5>

        <div className="flex flex-col gap-15 w-[110%]">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              {markBox(0, "true", trueImg)}
              {markBox(0, "false", flaseImg)}
            </div>

            <span>
              I went to the <u>electronics store</u> to buy a pair of jeans.
            </span>

            {inputField(0)}
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              {markBox(1, "true", trueImg)}
              {markBox(1, "false", flaseImg)}
            </div>

            <span>
              Let’s <u>head over</u> to the dining area of the food court.
            </span>

            {inputField(1)}
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              {markBox(2, "true", trueImg)}
              {markBox(2, "false", flaseImg)}
            </div>

            <span>
              We will <u>straight ahead</u> now and go our separate ways, and we
              can meet up later.
            </span>

            {inputField(2)}
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              {markBox(3, "true", trueImg)}
              {markBox(3, "false", flaseImg)}
            </div>

            <span>
              I went to the <u>jeans</u> store to shop for a camera.
            </span>

            {inputField(3)}
          </div>
        </div>
      </div>

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

export default WB_Unit4_Page22_Q2;
