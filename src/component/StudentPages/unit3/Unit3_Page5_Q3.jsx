import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Unit3_Page5_Q3 = () => {
  const words = ["No way!", "yummy", "salty", "curry"];

  const correct = ["curry", "No way!", "yummy", "salty"];

  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  const normalize = (s) => s.toLowerCase().replace(/[.,!]/g, "").trim();

  // ✅ CHECK
  const handleCheck = () => {
    if (locked) return;

    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Complete all answers.");
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

  // 🎯 INPUT
  const input = (i, width = "w-[220px]") => (
    <span className="relative inline-block mx-2">
      <input
        value={answers[i]}
        onChange={(e) => {
          if (result[i] === true) return;

          const updated = [...answers];
          updated[i] = e.target.value;
          setAnswers(updated);

          setResult((prev) => {
            const copy = [...prev];
            copy[i] = undefined;
            return copy;
          });
        }}
        className={`border-b outline-none  text-[#6D2980] font-bold bg-transparent
        ${result[i] === false ? "border-red-500" : "border-black"}
        ${width}`}
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
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
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
    <div className="flex flex-col items-center p-8">
      <div className="div-forall">
        <h5 className="header-title-page8 mb-20">
          <span className="ex-A mr-2.5">C</span>
          Read, match, and write.
        </h5>

        <div className="flex justify-between gap-16">
          {/* LEFT */}
          <div className="space-y-20 text-[20px]">
            <div>
              <span className="font-bold mr-3">1</span>A spicy Eastern flavor{" "}
              {input(0)}
            </div>

            <div>
              <span className="font-bold mr-3">2</span>
              said when someone disagrees {input(1)}
            </div>

            <div>
              <span className="font-bold mr-3">3</span>
              said when someone likes something tasty {input(2)}
            </div>

            <div>
              <span className="font-bold mr-3">4</span>
              chips usually have this flavor {input(3)}
            </div>
          </div>

          {/* RIGHT WORD BANK */}
          <div className="bg-[#D4C7DC] rounded-xl flex flex-col justify-between text-[20px] p-4 w-40 h-56">
            {words.map((w, i) => (
              <div key={i} className="text-center">
                {w}
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="action-buttons-container mt-6">
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

export default Unit3_Page5_Q3;
