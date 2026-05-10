import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 36/SVG/Asset 19.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 36/SVG/Asset 20.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 36/SVG/Asset 21.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 36/SVG/Asset 22.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 36/SVG/Asset 43.svg";

const Review4_Page1_Q3 = () => {
  const [answers, setAnswers] = useState(["", "", "", "", ""]);

  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);

  const correctAnswers = [
    "The skier often skis on the mountain.",
    "The boy sometimes skates on the ice.",
    "The husband and wife usually jog on the beach.",
    "They rarely ride on the train.",
    "He never goes (Scuba) diving.",
  ];

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[()]/g, "")
      .replace(/[.?!,]/g, "")
      .replace(/\s+/g, "")
      .trim();
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

  const input = (i) => (
    <span className="relative inline-block">
      <input
        disabled={locked || result[i] === true}
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`border-b outline-none text-[#6D2980] font-semibold w-[600px] px-2
        ${result[i] === false ? "border-red-500" : "border-black"}
      `}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
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

  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;

    const res = answers.map((a, i) => {
      const ok = normalize(a) === normalize(correctAnswers[i]);

      if (ok) correctCount++;

      return ok;
    });

    setResult(res);

    const total = correctAnswers.length;

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
    setAnswers(correctAnswers);
    setResult([true, true, true, true, true]);
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", ""]);
    setResult([]);
    setLocked(false);
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
    objectFit: "contain",
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
        <h5 className="header-title-page8 mb-10">
          <span className="mr-2">C</span>
          Look and write.
        </h5>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            fontSize: "18px",
            marginBottom: 40,
          }}
        >
          {/* 1 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "40px 120px 80px 1fr",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              1
            </span>

            <img src={img1} alt="" style={imageStyle} />

            <span style={{ fontSize: "20px" }}>60%</span>
            {input(0)}
          </div>

          {/* 2 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "40px 120px 80px 1fr",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              2
            </span>

            <img src={img2} alt="" style={imageStyle} />

            <span style={{ fontSize: "20px" }}>40%</span>

            {input(1)}
          </div>

          {/* 3 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "40px 120px 80px 1fr",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              3
            </span>

            <img src={img3} alt="" style={imageStyle} />

            <span style={{ fontSize: "20px" }}>80%</span>

            {input(2)}
          </div>

          {/* 4 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "40px 120px 80px 1fr",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              4
            </span>

            <img src={img4} alt="" style={imageStyle} />

            <span style={{ fontSize: "20px" }}>10%</span>

            {input(3)}
          </div>

          {/* 5 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "40px 120px 80px 1fr",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              5
            </span>

            <img src={img5} alt="" style={imageStyle} />

            <span style={{ fontSize: "20px" }}>0%</span>

            {input(4)}
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

export default Review4_Page1_Q3;
