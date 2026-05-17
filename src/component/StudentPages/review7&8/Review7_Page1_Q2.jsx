import React, { useState } from "react";

import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 70/SVG/Asset 14.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 70/SVG/Asset 16.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 70/SVG/Asset 15.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 70/SVG/Asset 17.svg";

import ValidationAlert from "../../Popup/ValidationAlert";

const Review7_Page1_Q2 = () => {
  const questions = ["true", "true", "false", "true"];

  const [answers, setAnswers] = useState(["", "", "", ""]);

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
    setAnswers(["true", "true", "false", "true"]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width) => (
    <span className="relative inline-block">
      <input
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
          text-[#1DA1F2]
          font-semibold
          leading-none
          align-middle
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

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-20">
          <span
            style={{
              marginRight: "10px",
            }}
          >
            B
          </span>
          Read, look, and write <span className="text-[#1DA1F2]">true</span> or{" "}
          <span className="text-[#1DA1F2]">false</span>.
        </h5>

        {/* QUESTIONS */}
        <div className="grid grid-cols-2 gap-y-14 gap-x-24">
          {/* 1 */}
          <div className="flex items-end gap-5">
            <span className="font-bold text-[18px] self-start">1</span>

            <img
              src={img1}
              alt=""
              style={{
                width: "140px",
                height: "auto",
              }}
            />

            <div className="text-[18px] mt-3 self-start w-[230px] h-[120px] flex flex-col justify-between">
              <div className="leading-[2]">He is keeping busy.</div>

              <div>{inputField(0, "w-[150px]")}</div>
            </div>
          </div>

          {/* 2 */}
          <div className="flex items-end gap-5">
            <span className="font-bold text-[18px] self-start">2</span>

            <img
              src={img2}
              alt=""
              style={{
                width: "140px",
                height: "auto",
              }}
            />

            <div className="text-[18px] mt-3 self-start w-[230px] h-[120px] flex flex-col justify-between">
              <div className="leading-[2]">
                They are jotting down some information.
              </div>

              <div>{inputField(1, "w-[150px]")}</div>
            </div>
          </div>

          {/* 3 */}
          <div className="flex items-end gap-5">
            <span className="font-bold text-[18px] self-start ">3</span>

            <img
              src={img3}
              alt=""
              style={{
                width: "140px",
                height: "auto",
              }}
            />

            <div className="text-[18px] mt-3 self-start w-[230px] h-[120px] flex flex-col justify-between">
              <div className="leading-[2]">He is limping stiffly.</div>

              <div>{inputField(2, "w-[150px]")}</div>
            </div>
          </div>

          {/* 4 */}
          <div className="flex items-end gap-5">
            <span className="font-bold text-[18px] self-start ">4</span>

            <img
              src={img4}
              alt=""
              style={{
                width: "140px",
                height: "auto",
              }}
            />

            <div className="text-[18px] mt-3 self-start w-[230px] h-[120px] flex flex-col justify-between">
              <div className="leading-[2]">She is looking at photo albums.</div>

              <div>{inputField(3, "w-[150px]")}</div>
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

export default Review7_Page1_Q2;
