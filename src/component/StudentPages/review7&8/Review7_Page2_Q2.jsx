import React, { useState } from "react";

import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 71/SVG/Asset 18.svg";

import ValidationAlert from "../../Popup/ValidationAlert";

const Review7_Page2_Q2 = () => {
  const questions = ["1", "5", "3", "2", "6", "4"];

  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);

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
    setAnswers(["1", "5", "3", "2", "6", "4"]);

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const numberInput = (i) => (
    <span className="relative inline-block">
      <input
        type="text"
        maxLength={1}
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          w-[120px]
          border-0
          border-b
          outline-none
          bg-transparent
          text-center
          text-[18px]
          text-[#6D2980]
          font-semibold
          leading-none
          align-middle

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

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-10">
          <span
            style={{
              marginRight: "10px",
            }}
          >
            D
          </span>
          Read and number the steps.
        </h5>

        {/* SUBTITLE */}
        <div className="text-[18px] mb-2 ">John is baking a cake.</div>

        <div className="flex justify-between items-start gap-10">
          {/* QUESTIONS */}
          <div className="text-[18px] leading-[3.8] flex-1">
            <div className="flex items-center gap-3">
              {numberInput(0)}

              <span className="font-bold">a</span>

              <span>First, John is mixing the flour.</span>
            </div>

            <div className="flex items-center gap-3">
              {numberInput(1)}

              <span className="font-bold">b</span>

              <span>He is taking the cake out of the oven.</span>
            </div>

            <div className="flex items-center gap-3">
              {numberInput(2)}

              <span className="font-bold">c</span>

              <span>He is putting the cake batter into the pan.</span>
            </div>

            <div className="flex items-center gap-3">
              {numberInput(3)}

              <span className="font-bold">d</span>

              <span>Now, he is adding the eggs.</span>
            </div>

            <div className="flex items-center gap-3">
              {numberInput(4)}

              <span className="font-bold">e</span>

              <span>He and his friends are eating the cake.</span>
            </div>

            <div className="flex items-center gap-3">
              {numberInput(5)}

              <span className="font-bold">f</span>

              <span>He is baking the cake in the oven.</span>
            </div>
          </div>

          {/* IMAGE */}
          <img
            src={img}
            alt=""
            style={{
              width: "280px",
              height: "auto",
            }}
          />
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

export default Review7_Page2_Q2;
