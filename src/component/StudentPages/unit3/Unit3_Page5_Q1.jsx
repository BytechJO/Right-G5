import React, { useState } from "react";
import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 26/SVG/Asset 26.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 26/SVG/Asset 15.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 26/SVG/Asset 16.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 26/SVG/Asset 18.svg";
import ValidationAlert from "../../Popup/ValidationAlert";

const Unit3_Page5_Q1 = () => {
  const [answers, setAnswers] = useState(Array(4).fill(""));
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);

  const correct = ["sardines", "marshmallows", "salty", "peanut butter"];

  const normalize = (str) => str.toLowerCase().replace(/\s+/g, "").trim();

  const handleChange = (i, val) => {
    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  const input = (i, width = "w-[200px]") => (
    <span className="relative inline-block mx-2">
      <input
        disabled={locked || result[i] === true}
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`border-b outline-none  text-[#6D2980] font-bold ${width}
        ${result[i] === false ? "border-red-500" : "border-black"}
      `}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            transform: "translateY(-50%)",
            width: "20px",
            height: "20px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        >
          ✕
        </span>
      )}
    </span>
  );

  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((a) => !a?.trim())) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;

    const res = answers.map((a, i) => {
      const ok = normalize(a) === normalize(correct[i]);
      if (ok) correctCount++;
      return ok;
    });

    setResult(res);

    const total = correct.length;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
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
    setAnswers(correct);
    setLocked(true);
  };

  const reset = () => {
    setAnswers(Array(4).fill(""));
    setResult([]);
    setLocked(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div className="div-forall">
        <h5 className="header-title-page8 mb-30">
          <span className="ex-A mr-2.5">A</span>
          Look and write the vocabulary words.
        </h5>

        <div className="space-y-10 text-[18px]">
          <div className="grid grid-cols-2 gap-25">
            {/* 1 */}
            <div className="flex items-center gap-6">
              <span className="font-bold">1</span>
              <img
                src={img1}
                alt=""
                style={{ width: "90px", height: "90px" }}
              />
              {input(0)}
            </div>

            {/* 2 */}
            <div className="flex items-center gap-6">
              <span className="font-bold">2</span>
              <img
                src={img2}
                alt=""
                style={{ width: "90px", height: "90px" }}
              />
              {input(1)}
            </div>

            {/* 3 */}
            <div className="flex items-center gap-6">
              <span className="font-bold">3</span>
              <img
                src={img3}
                alt=""
                style={{ width: "90px", height: "90px" }}
              />
              {input(2)}
            </div>

            {/* 4 */}
            <div className="flex items-center gap-6">
              <span className="font-bold">4</span>
              <img
                src={img4}
                alt=""
                style={{ width: "90px", height: "90px" }}
              />
              {input(3)}
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>

        <button onClick={showAnswers} className="show-answer-btn">
          Show Answer
        </button>

        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Unit3_Page5_Q1;
