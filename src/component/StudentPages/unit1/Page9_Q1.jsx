import React, { useState } from "react";
import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 9/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 9/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 9/SVG/Asset 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 9/SVG/Asset 4.svg";
import ValidationAlert from "../../Popup/ValidationAlert";

const Page9_Q1 = () => {
  const [answers, setAnswers] = useState(Array(8).fill(""));
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);

  const correct = [
    "far",
    "200 centimeters",
    "tall",
    "five feet",
    "many",
    "five",
    "much",
    "ten dollars",
  ];

  const normalize = (str) => str.toLowerCase().replace(/\s+/g, "").trim();

  const handleChange = (i, val) => {
    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);

    // يخفي X لما تعدل الغلط
    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  const input = (i, width = "w-[130px]") => (
    <span className="relative inline-block mx-1">
      <input
        disabled={locked || result[i] === true}
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`border-b outline-none text-center text-[#6D2980] font-medium ${width}
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
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        >
          ✕
        </span>
      )}
    </span>
  );
  // ====================
  // ✅ CHECK
  // ====================
  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((a) => !a?.trim())) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;

    // ✅ احسب النتائج لكل input
    const res = answers.map((a, i) => {
      const ok = normalize(a) === normalize(correct[i]);
      if (ok) correctCount++;
      return ok;
    });

    setResult(res); // 🔥 هون الصح

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

  // ====================
  // 👀 SHOW ANSWERS
  // ====================
  const showAnswers = () => {
    setAnswers(correct);
    setLocked(true);
  };

  // ====================
  // 🔄 RESET
  // ====================
  const reset = () => {
    setAnswers(Array(8).fill(""));
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
        <h5 className="header-title-page8 mb-18">
          <span className="ex-A mr-2.5">D</span>
          Write the correct adjective in each blank, and then answer the
          question.
        </h5>

        <div className="space-y-8 text-[18px] ">
          {/* 1 */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div>
              <span className="font-bold mr-3">1</span> How {input(0)} did
              Marcia jump?
            </div>
            <img src={img1} alt="" style={{ width: "120px", height: "auto" }} />
            <div>She jumped {input(1)}.</div>
          </div>

          {/* 2 */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6">
            <div>
              <span className="font-bold mr-3">2</span> How {input(2)} is Peter?
            </div>
            <img src={img2} alt="" style={{ width: "120px", height: "auto" }} />
            <div>Peter is {input(3)} tall.</div>
          </div>

          {/* 3 */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6">
            <div>
              <span className="font-bold mr-3">3</span> How {input(4)} apples
              are there?
            </div>
            <img src={img3} alt="" style={{ width: "120px", height: "auto" }} />
            <div>There are {input(5)} apples.</div>
          </div>

          {/* 4 */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6">
            <div>
              <span className="font-bold mr-3">4</span> How {input(6)} does this
              cost?
            </div>
            <img src={img4} alt="" style={{ width: "120px", height: "auto" }} />
            <div>It costs {input(7)}.</div>
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

export default Page9_Q1;
