import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U3/Page 20/SVG/Asset 8.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U3/Page 20/SVG/Asset 9.svg";
import img3 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U3/Page 20/SVG/Asset 11.svg";
import img4 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U3/Page 20/SVG/Asset 16.svg";
const WB_Unit3_Page20_Q2 = () => {
  const answers = [
    ["sounds"],
    ["are"],
    ["were in", "the park"],
    ["looks", "tired"],
  ];

  const [studentAnswers, setStudentAnswers] = useState([
    [""],
    [""],
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
    if (locked || result[qIndex] === true) return;

    const updated = [...studentAnswers];

    updated[qIndex][inputIndex] = value;

    setStudentAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[qIndex] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = studentAnswers.some((row) => row.some((a) => !a.trim()));

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = studentAnswers.map((row, i) => {
      const expected = answers[i];

      const line1Ok = normalize(row[0]) === normalize(expected[0]);

      const line2Ok = expected[1]
        ? normalize(row[1]) === normalize(expected[1])
        : true;

      const ok = line1Ok && line2Ok;

      if (ok) correctCount++;

      return {
        overall: ok,
        line1Wrong: !line1Ok,
        line2Wrong: expected[1] ? !line2Ok : false,
      };
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

  const showAnswers = () => {
    setStudentAnswers(answers);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setStudentAnswers([[""], [""], ["", ""], ["", ""]]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (qIndex, inputIndex, width = "120px") => (
    <div className="relative inline-block">
      <input
        type="text"
        value={studentAnswers[qIndex][inputIndex]}
        disabled={locked || result[qIndex]?.overall === true}
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
            (inputIndex === 0 && result[qIndex]?.line1Wrong) ||
            (inputIndex === 1 && result[qIndex]?.line2Wrong)
              ? "border-[#D1232A]"
              : "border-black"
          }
        `}
        style={{
          width,
        }}
      />

      {((inputIndex === 0 && result[qIndex]?.line1Wrong) ||
        (inputIndex === 1 && result[qIndex]?.line2Wrong)) && (
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
        <h5 className="header-title-page8 mb-8">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            K
          </span>
          Look and write. Use linking verbs.
        </h5>

        {/* TOP ROW */}
        <div className="grid grid-cols-2 gap-x-20 gap-y-14">
          {/* Q1 */}
          <div>
            <img
              src={img1}
              alt=""
              style={{
                width: "220px",
                height: "auto",
                objectFit: "contain",
                marginBottom: "20px",
              }}
            />

            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-bold">1</span>

              <span>The song</span>

              {inputField(0, 0, "130px")}

              <span>nice.</span>
            </div>
          </div>

          {/* Q2 */}
          <div>
            <img
              src={img2}
              alt=""
              style={{
                width: "220px",
                height: "auto",
                objectFit: "contain",
                marginBottom: "20px",
              }}
            />
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-bold">2</span>

              <span>The chips</span>

              {inputField(1, 0, "90px")}

              <span>salty.</span>
            </div>
          </div>

          {/* Q3 */}
          <div>
            <img
              src={img4}
              alt=""
              style={{
                width: "220px",
                height: "auto",
                objectFit: "contain",
                marginBottom: "20px",
              }}
            />

            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-bold">3</span>

              <span>They</span>

              {inputField(2, 0, "120px")}

              {inputField(2, 1, "120px")}

              <span>.</span>
            </div>
          </div>

          {/* Q4 */}
          <div>
            <img
              src={img3}
              alt=""
              style={{
                width: "220px",
                height: "auto",
                objectFit: "contain",
                marginBottom: "20px",
              }}
            />

            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-bold">4</span>

              <span>She</span>

              {inputField(3, 0, "120px")}

              {inputField(3, 1, "120px")}

              <span>.</span>
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

export default WB_Unit3_Page20_Q2;
