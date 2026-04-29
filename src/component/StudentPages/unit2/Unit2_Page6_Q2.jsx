import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Unit2_Page6_Q2 = () => {
  const [answers, setAnswers] = useState(["", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  // ✅ الإجابات الصح
  const correct = [
    "The clown who rode the unicycle could also juggle",
    "We went down the giant slide that was thirty feet high",
    "I liked the clown that was chased by the bull",
  ];

  const handleChange = (i, val) => {
    if (result[i] === true) return; // 🔒 لا تعدل الصح

    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);

    // 🔥 امسح الخطأ
    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  // ====================
  // ✅ CHECK
  // ====================
  const handleCheck = () => {
    if (locked) return;

    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;

    const res = answers.map((a, i) => {
      const normalize = (str) => str.toLowerCase().replace(/[.,]/g, "").trim();

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

  // ====================
  // 👀 SHOW
  // ====================
  const handleShow = () => {
    setAnswers(correct);
    setResult([]);
    setLocked(true);
  };

  // ====================
  // 🔄 RESET
  // ====================
  const handleReset = () => {
    setAnswers(["", "", ""]);
    setResult([]);
    setLocked(false);
  };

  // 🎯 input
  const input = (i) => (
    <div className="relative mt-5">
      <input
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        disabled={result[i] === true}
        className={`w-full border-b-1 outline-none text-[#6D2980] font-bold
          ${result[i] === false ? "border-red-500" : "border-black"}
        `}
      />

      {/* ❌ */}
      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-5px",
            right: "0",
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
    </div>
  );

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
        <h5 className="header-title-page8 mb-7">
          <span className="ex-A mr-2">D</span>
          Put the relative clauses in the right order. Then rewrite the
          sentences.
        </h5>

        <div className="text-[20px] leading-9 flex flex-col gap-10 mt-12">
          {/* 1 */}
          <div>
            <span className="font-bold mr-4">1</span>
            The clown{" "}
            <span className="text-[#12C8F9]">
              (unicycle / who / the / rode)
            </span>{" "}
            could also juggle.
            {input(0)}
          </div>

          {/* 2 */}
          <div>
            <span className="font-bold mr-4">2</span>
            We went down the giant slide{" "}
            <span className="text-[#12C8F9]">
              (meters / was / 30 / high / that)
            </span>
            .{input(1)}
          </div>

          {/* 3 */}
          <div>
            <span className="font-bold mr-4">3</span>I liked the clown{" "}
            <span className="text-[#12C8F9]">
              (chased / that / by / was / bull / the)
            </span>
            .{input(2)}
          </div>
        </div>

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

export default Unit2_Page6_Q2;
