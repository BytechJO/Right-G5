import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGES
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U5/Page 30/Asset 4.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U5/Page 30/Asset 14.svg";

const WB_Unit5_Page30_Q15 = () => {
  const answers = [
    "I'd like the spaghetti and meatballs, please.",

    "Can I have a cup of tea, please?",
  ];

  const [studentAnswers, setStudentAnswers] = useState(["", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  // ------------------------
  // HANDLE INPUT
  // ------------------------

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...studentAnswers];

    updated[i] = value;

    setStudentAnswers(updated);

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

    const hasEmpty = studentAnswers.some((a) => !a.trim());

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = studentAnswers.map((answer, i) => {
      const ok = normalize(answer) === normalize(answers[i]);

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = answers.length;

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
    setStudentAnswers(answers);

    setResult([true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    setStudentAnswers(["", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i, width = "100%") => (
    <div className="relative w-full">
      <input
        type="text"
        value={studentAnswers[i]}
        disabled={locked || result[i] === true}
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

          ${result[i] === false ? "border-[#D1232A]" : "border-black"}
        `}
        style={{
          width,
        }}
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
    </div>
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall text-[18px]">
        {/* TITLE */}

        <h5 className="header-title-page8 mb-[20vh]">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            H
          </span>
          Write a <span className="text-[#00AEEF]">polite request</span>  or
          <span className="text-[#00AEEF]">statement</span> for each picture.
        </h5>

        {/* QUESTIONS */}

        <div className="grid grid-cols-2 gap-16">
          {/* QUESTION 1 */}

          <div className="flex flex-col items-center">
            <div className="relative flex items-start mb-5">
              {" "}
              <span
                className="font-bold"
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "-36%",
                }}
              >
                1
              </span>
              <img
                src={img1}
                alt=""
                style={{
                  width: "200px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>

            <div className="w-full flex flex-col mt-5">
              {inputField(0, "100%")}
            </div>
          </div>

          {/* QUESTION 2 */}

          <div className="flex flex-col items-center">
            <div className="relative flex items-start mb-5">
              {" "}
              <span
                className="font-bold"
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "-36%",
                }}
              >
                2
              </span>
              <img
                src={img2}
                alt=""
                style={{
                  width: "200px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>

            <div className="w-full flex flex-col mt-5">
              {inputField(1, "100%")}
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

export default WB_Unit5_Page30_Q15;
