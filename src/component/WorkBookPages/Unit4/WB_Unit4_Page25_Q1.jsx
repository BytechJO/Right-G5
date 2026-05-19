import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGES
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U4/Page 25/Asset 4.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U4/Page 25/Asset 11.svg";
import img3 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U4/Page 25/Asset 6.svg";
import img4 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U4/Page 25/Asset 7.svg";
import img5 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U4/Page 25/Asset 8.svg";
import img6 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U4/Page 25/Asset 9.svg";

const WB_Unit4_Page25_Q1 = () => {
  const answers = [
    "watch a program on TV",
    ["Do they", "ride on the swings"],
    ["Does she", "ride a horse"],
    ["Does she", "eat a sandwich"],
    ["Does he", "take a picture with his camera"],
    ["Do they", "ride the school bus"],
  ];

  const questions = [
    {
      image: img1,
      type: "single",
      before: "Do they sometimes",
    },

    {
      image: img2,
      type: "double",
      middle: "frequently",
    },

    {
      image: img3,
      type: "double",
      middle: "rarely",
    },

    {
      image: img4,
      type: "double",
      middle: "always",
    },

    {
      image: img5,
      type: "double",
      middle: "occasionally",
    },

    {
      image: img6,
      type: "double",
      middle: "always",
    },
  ];

  const [studentAnswers, setStudentAnswers] = useState([
    [""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
  ]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleChange = (qIndex, inputIndex, value) => {
    if (locked || result[qIndex]?.[inputIndex] === true) return;

    const updated = [...studentAnswers];

    updated[qIndex][inputIndex] = value;

    setStudentAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      if (copy[qIndex]) {
        copy[qIndex][inputIndex] = undefined;
      }

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = studentAnswers.some((group) =>
      group.some((input) => !input.trim()),
    );

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = studentAnswers.map((group, qIndex) => {
      const correct = answers[qIndex];

      if (Array.isArray(correct)) {
        return group.map((input, i) => {
          const ok = normalize(input) === normalize(correct[i]);

          if (ok) correctCount++;

          return ok;
        });
      }

      const ok = normalize(group[0]) === normalize(correct);

      if (ok) correctCount++;

      return [ok];
    });

    setResult(newResults);

    const total = 11;

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
    setStudentAnswers([
      ["watch a program on TV"],
      ["Do they", "ride on the swings"],
      ["Does she", "ride a horse"],
      ["Does she", "eat a sandwich"],
      ["Does he", "take a picture with his camera"],
      ["Do they", "ride the school bus"],
    ]);

    setResult([
      [true],
      [true, true],
      [true, true],
      [true, true],
      [true, true],
      [true, true],
    ]);

    setLocked(true);
  };

  const handleReset = () => {
    setStudentAnswers([[""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""]]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (qIndex, inputIndex, width) => (
    <div className="relative inline-block">
      <input
        type="text"
        value={studentAnswers[qIndex][inputIndex]}
        disabled={locked || result[qIndex]?.[inputIndex] === true}
        onChange={(e) => handleChange(qIndex, inputIndex, e.target.value)}
        className={`
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6D2980]
          font-semibold
          px-1

          ${
            result[qIndex]?.[inputIndex] === false
              ? "border-[#D1232A]"
              : "border-black"
          }
        `}
        style={{
          width,
        }}
      />

      {result[qIndex]?.[inputIndex] === false && (
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
  const widths = {
    1: "260px",
    2: "295px",
    3: "290px",
    4: "245px",
    5: "290px",
  };
  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall text-[18px]">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-10">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            J
          </span>
          Look and write.
        </h5>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-5 mb-10">
          {questions.map((q, index) => (
            <div key={index} className="flex items-center gap-10">
              {/* IMAGE */}
              <img
                src={q.image}
                alt=""
                style={{
                  width: "135px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />

              {/* QUESTION */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-bold">{index + 1}</span>

                {q.type === "single" ? (
                  <>
                    <span>{q.before}</span>

                    {inputField(index, 0, "315px")}

                    <span>?</span>
                  </>
                ) : (
                  <>
                    {inputField(index, 0, "120px")}

                    <span>{q.middle}</span>

                    {inputField(index, 1, widths[index] || "260px")}

                    <span>?</span>
                  </>
                )}
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

export default WB_Unit4_Page25_Q1;
