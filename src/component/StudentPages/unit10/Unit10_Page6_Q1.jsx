import React, { useState } from "react";

import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 10 It Was the Best Day! Folder/Page 87/SVG/Asset 8.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 10 It Was the Best Day! Folder/Page 87/SVG/Asset 9.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 10 It Was the Best Day! Folder/Page 87/SVG/Asset 10.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 10 It Was the Best Day! Folder/Page 87/SVG/Asset 11.svg";

import ValidationAlert from "../../Popup/ValidationAlert";

const Unit10_Page6_Q1 = () => {
  const questions = [
    "The mom and son were skating on a sunny day.",
    "They were hiking together in the woods.",
    "The man was lifting weights in the gym.",
    "She was waterskiing in summer.",
  ];

  const hints = ["skating", "hiking", "lifting weights", "waterskiing"];

  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleChange = (qIndex, value) => {
    if (locked || result[qIndex] === true) return;

    const updated = [...answers];

    updated[qIndex] = value;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[qIndex] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = answers.some((answer) => !answer.trim());

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((group, i) => {
      const ok = normalize(group) === normalize(questions[i]);

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
    setAnswers([
      "The mom and son were skating on a sunny day.",
      "They were hiking together in the woods.",
      "The man was lifting weights in the gym.",
      "She was waterskiing in summer.",
    ]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const lineInput = (qIndex, width) => (
    <span className="relative inline-block">
      <input
        type="text"
        value={answers[qIndex]}
        disabled={locked || result[qIndex] === true}
        onChange={(e) => handleChange(qIndex, e.target.value)}
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

        ${result[qIndex] === false ? "border-[#D1232A]" : "border-black"}
      `}
      />

      {result[qIndex] === false && (
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
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            D
          </span>
          Look at the picture, and then write the correct past progressive verb
          phrase.
        </h5>

        {/* MAIN BOX */}
        <div>
          {/* ROW 1 */}
          <div
            className="flex items-center"
            style={{
              padding: "10px",
            }}
          >
            <img
              src={img1}
              alt=""
              style={{
                width: "150px",
                height: "auto",
                objectFit: "contain",
              }}
            />

            <div className="ml-10 flex-1">
              <div className="flex gap-4 items-start">
                <span className="font-bold text-[18px]">1</span>

                <div className="flex flex-col gap-5">
                  {lineInput(0, "w-[520px]")}
                </div>
              </div>

              <div
                className="text-[#1DA1F2] text-[18px] mt-4"
                style={{
                  marginLeft: "34px",
                }}
              >
                ({hints[0]})
              </div>
            </div>
          </div>

          {/* ROW 2 */}
          <div
            className="flex items-center"
            style={{
              padding: "10px",
            }}
          >
            <img
              src={img2}
              alt=""
              style={{
                width: "150px",
                height: "auto",
                objectFit: "contain",
              }}
            />

            <div className="ml-10 flex-1">
              <div className="flex gap-4 items-start">
                <span className="font-bold text-[18px]">2</span>

                <div className="flex flex-col gap-5">
                  {lineInput(1, "w-[520px]")}
                </div>
              </div>

              <div
                className="text-[#1DA1F2] text-[18px] mt-4"
                style={{
                  marginLeft: "34px",
                }}
              >
                ({hints[1]})
              </div>
            </div>
          </div>

          {/* ROW 3 */}
          <div
            className="flex items-center"
            style={{
              padding: "10px",
            }}
          >
            <img
              src={img3}
              alt=""
              style={{
                width: "150px",
                height: "auto",
                objectFit: "contain",
              }}
            />

            <div className="ml-10 flex-1">
              <div className="flex gap-4 items-start">
                <span className="font-bold text-[18px]">3</span>

                <div className="flex flex-col gap-5">
                  {lineInput(2, "w-[520px]")}
                </div>
              </div>

              <div
                className="text-[#1DA1F2] text-[18px] mt-4"
                style={{
                  marginLeft: "34px",
                }}
              >
                ({hints[2]})
              </div>
            </div>
          </div>

          {/* ROW 4 */}
          <div
            className="flex items-center"
            style={{
              padding: "10px",
            }}
          >
            <img
              src={img4}
              alt=""
              style={{
                width: "150px",
                height: "auto",
                objectFit: "contain",
              }}
            />

            <div className="ml-10 flex-1">
              <div className="flex gap-4 items-start">
                <span className="font-bold text-[18px]">4</span>

                <div className="flex flex-col gap-5">
                  {lineInput(3, "w-[520px]")}
                </div>
              </div>

              <div
                className="text-[#1DA1F2] text-[18px] mt-4"
                style={{
                  marginLeft: "34px",
                }}
              >
                ({hints[3]})
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

export default Unit10_Page6_Q1;
