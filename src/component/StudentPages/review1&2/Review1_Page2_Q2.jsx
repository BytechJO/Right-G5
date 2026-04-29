import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 17/SVG/Asset 21.svg";
const Review1_Page2_Q2 = () => {
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  const correct = ["many", "much", "many", "much"];

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
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;

    const res = answers.map((a, i) => {
      const ok = normalize(a) === correct[i];
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
    setAnswers(["", "", "", ""]);
    setResult([]);
    setLocked(false);
  };

  // 🎯 input
  const input = (i, width = "250px") => (
    <span style={{ position: "relative", margin: "0 6px" }}>
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
        <h5 className="header-title-page8 mb-25">
          <span className="mr-2">E</span>
          Write the correct word <span className="text-[#31B7F5]">
            much
          </span> or <span className="text-[#31B7F5]">many</span>.
        </h5>

        {/* المحتوى */}
        <div style={{ display: "flex", gap: "30px" }}>
          {/* LEFT QUESTIONS */}
          <div
            style={{
              flex: 1,
              fontSize: "18px",
              lineHeight: "2",
              display: "flex",
              flexDirection: "column",
              gap: "60px", // 👈 هذا الجاب
            }}
          >
            <div>
              <span style={{ fontWeight: "bold", marginRight: "10px" }}>1</span>
              How {input(0)} kilometers can you run?
            </div>

            <div>
              <span style={{ fontWeight: "bold", marginRight: "10px" }}>2</span>
              How {input(1)} syrup can I pour on my pancakes?
            </div>

            <div>
              <span style={{ fontWeight: "bold", marginRight: "10px" }}>3</span>
              How {input(2)} pancakes do you eat?
            </div>

            <div>
              <span style={{ fontWeight: "bold", marginRight: "10px" }}>4</span>
              How {input(3)} water shall we bring?
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div>
            <img
              src={img1}
              style={{
                width: "250px",
                height: "auto",
                objectFit: "cover",
                padding: "4px",
              }}
            />
          </div>
        </div>
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

export default Review1_Page2_Q2;
