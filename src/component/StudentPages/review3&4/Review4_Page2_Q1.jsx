import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 37/SVG/Asset 25.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 37/SVG/Asset 44.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 37/SVG/Asset 45.svg";

const Review4_Page2_Q1 = () => {
  const [answers, setAnswers] = useState(["", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);

  const correctAnswers = [
    "He often goes to the",
    "She rarely goes to the",
    "I usually go to the",
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

  const input = (i, width = "w-[520px]") => (
    <span className="relative inline-block mx-1">
      <input
        disabled={locked || result[i] === true}
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`border-b outline-none text-[#6D2980] font-semibold ${width}
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
    setResult([true, true, true]);
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", ""]);
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
        <h5 className="header-title-page8 mb-17">
          <span className="mr-2">D</span>
          Look, read, and write.
        </h5>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "50px",
            fontSize: "18px",
          }}
        >
          {/* 1 */}
          <div
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "140px 180px 1fr auto",
              alignItems: "center",
              gap: "20px",
              paddingLeft: "40px",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                fontSize: "22px",
                position: "absolute",
                top: "0",
                left: "0",
              }}
            >
              1
            </span>

            <img src={img1} alt="" style={imageStyle} />

            <div
              style={{
                fontSize: "18px",
              }}
            >
              (often) &nbsp; (he)
            </div>

            {input(0, "w-[500px]")}

            <span
              style={{
                fontSize: "20px",
                whiteSpace: "nowrap",
              }}
            >
              science museum.
            </span>
          </div>

          {/* 2 */}
          <div
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "140px 180px 1fr auto",
              alignItems: "center",
              gap: "20px",
              paddingLeft: "40px",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                fontSize: "22px",
                position: "absolute",
                top: "0",
                left: "0",
              }}
            >
              2
            </span>

            <img src={img2} alt="" style={imageStyle} />

            <div
              style={{
                fontSize: "18px",
              }}
            >
              (rarely) &nbsp; (she)
            </div>

            {input(1, "w-[500px]")}

            <span
              style={{
                fontSize: "20px",
              }}
            >
              zoo.
            </span>
          </div>

          {/* 3 */}
          <div
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "140px 180px 1fr auto",
              alignItems: "center",
              gap: "20px",
              paddingLeft: "40px",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                fontSize: "22px",
                position: "absolute",
                top: "0",
                left: "0",
              }}
            >
              3
            </span>

            <img src={img3} alt="" style={imageStyle} />

            <div
              style={{
                fontSize: "18px",
              }}
            >
              (usually) &nbsp; (I)
            </div>

            {input(2, "w-[500px]")}

            <span
              style={{
                fontSize: "20px",
              }}
            >
              aquarium.
            </span>
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

export default Review4_Page2_Q1;
