import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 17/SVG/Asset 22.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 17/SVG/Asset 23.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 17/SVG/Asset 24.svg";

const Review1_Page2_Q3 = () => {
  const [answers, setAnswers] = useState(["", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  // ✅ الإجابات الصح (غيّرها إذا بدك)
  const correct = [
    "for two hours",
    "They sailed for four miles",
    "three pajamas",
  ];

  const normalize = (t) => t.toLowerCase().replace(/[.?]/g, "").trim();

  const handleChange = (i, val) => {
    if (result[i] === true) return;

    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  // ✅ CHECK
  const handleCheck = () => {
    if (locked) return;

    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Complete all fields.");
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

    const msg = `Score: ${correctCount} / ${total}`;

    if (correctCount === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // 👀 SHOW
  const handleShow = () => {
    setAnswers(correct);
    setResult([]);
    setLocked(true);
  };

  // 🔄 RESET
  const handleReset = () => {
    setAnswers(["", "", ""]);
    setResult([]);
    setLocked(false);
  };

  // 🎯 input
  const input = (i, width = "300px") => (
    <span style={{ position: "relative", marginLeft: "6px" }}>
      <input
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        disabled={result[i] === true}
        style={{
          borderBottom:
            result[i] === false ? "1px solid red" : "1px solid black",
          outline: "none",
          textAlign: "center",
          width: width,
          fontSize: "18px",
          fontWeight: "bold",
          color: "#6D2980",
          background: "transparent",
        }}
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

  return (
    <div style={{ padding: "30px", display: "flex", justifyContent: "center" }}>
      <div className="div-forall">
        <h5 className="header-title-page8 mb-15">
          <span className="mr-2">F</span>
          Look, read, and write a measurement.
        </h5>

        {/* المحتوى */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "18px",
          }}
        >
          {/* 1 */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  top: "30px",
                  left: "-10px",
                  fontWeight: "bold",
                }}
              >
                1
              </span>

              <img
                src={img1}
                style={{
                  width: "150px",
                  height: "150px",
                  marginLeft: "20px",
                  padding: "4px",
                }}
              />
            </div>

            <div style={{ flex: 1 }}>How long? She talked {input(0)}.</div>
          </div>

          {/* 2 */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  top: "30px",
                  left: "-10px",
                  fontWeight: "bold",
                }}
              >
                2
              </span>

              <img
                src={img2}
                style={{
                  width: "150px",
                  height: "150px",
                  marginLeft: "20px",
                  padding: "4px",
                }}
              />
            </div>

            <div style={{ flex: 1 }}>How far? {input(1, "350px")}.</div>
          </div>

          {/* 3 */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  top: "30px",
                  left: "-10px",
                  fontWeight: "bold",
                }}
              >
                3
              </span>

              <img
                src={img3}
                style={{
                  width: "150px",
                  height: "150px",
                  marginLeft: "20px",
                  padding: "4px",
                }}
              />
            </div>

            <div style={{ flex: 1 }}>
              How many? She will bring {input(2, "300px")}.
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={handleReset}>
            Start Again ↻
          </button>

          <button onClick={handleShow} className="show-answer-btn">
            Show Answer
          </button>

          <button className="check-button2" onClick={handleCheck}>
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review1_Page2_Q3;
