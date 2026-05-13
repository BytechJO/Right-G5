import React, { useState } from "react";

import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 72/SVG/Asset 37.svg";

import ValidationAlert from "../../Popup/ValidationAlert";

const Review8_Page1_Q1 = () => {
  const questions = ["5", "1", "2", "4", "3"];

  const [answers, setAnswers] = useState(["", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,]/g, "")
      .replace(/\s+/g, " ")
      .trim();

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

    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all answers.");

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
      setLocked(true);

      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const showAnswers = () => {
    setAnswers(["5", "1", "2", "4", "3"]);

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i) => (
    <span className="relative inline-block">
      <input
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          w-8
          border-0
          outline-none
          bg-transparent
          text-center
          text-[18px]
          text-[#6D2980]
          font-semibold
          leading-none
          align-middle
          px-1

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

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall ">
        {/* LEFT SIDE */}
        <div>
          {/* TITLE */}
          <h5 className="header-title-page8 mb-20">
            <span
              style={{
                marginRight: "10px",
              }}
            >
              A
            </span>
            Label the pictures with the given words.
          </h5>
          <div className="flex items-start gap-60">
            {/* WORDS */}
            <div className="grid grid-cols-2 gap-y-15 gap-x-30 text-[18px] ">
              <div className="flex gap-6">
                <span className="font-bold">1</span>
                <span>rainbow</span>
              </div>

              <div className="flex gap-6">
                <span className="font-bold">2</span>
                <span>pilot</span>
              </div>

              <div className="flex gap-6">
                <span className="font-bold">3</span>
                <span>crowded</span>
              </div>

              <div className="flex gap-6">
                <span className="font-bold">4</span>
                <span>lean</span>
              </div>

              <div className="flex gap-6 col-span-2">
                <span className="font-bold">5</span>
                <span>hot-air balloon</span>
              </div>
            </div>

            {/* IMAGE SIDE */}
            <div className="relative">
              <img
                src={img}
                alt=""
                style={{
                  width: "38vw",
                  maxWidth: "420px",
                  minWidth: "300px",
                  height: "auto",
                }}
              />

              {/* INPUTS */}

              <div
                style={{
                  position: "absolute",
                  top: "23%",
                  left: "15.5%",
                }}
              >
                {inputField(0, "w-[130px]")}
              </div>

              <div
                style={{
                  position: "absolute",
                  top: "9%",
                  right: "22%",
                }}
              >
                {inputField(1, "w-[110px]")}
              </div>

              <div
                style={{
                  position: "absolute",
                  top: "31%",
                  right: "26%",
                }}
              >
                {inputField(2, "w-[90px]")}
              </div>

              <div
                style={{
                  position: "absolute",
                  top: "46%",
                  left: "20%",
                }}
              >
                {inputField(3, "w-[90px]")}
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: "13%",
                  right: "3.5%",
                }}
              >
                {inputField(4, "w-[120px]")}
              </div>
            </div>
          </div>
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

export default Review8_Page1_Q1;
