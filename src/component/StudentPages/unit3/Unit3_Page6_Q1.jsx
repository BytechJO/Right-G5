import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Unit3_Page6_Q1 = () => {
  // ✅ الأزواج الصحيحة
  const correctPairs = [
    ["no", "way"],
    ["tastes", "funny"],
    ["try", "some"],
    ["help", "yourself"],
    ["top", "off"],
  ];

  const [answers, setAnswers] = useState(
    Array(5)
      .fill(0)
      .map(() => ["", ""]),
  );
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  const normalize = (s) => s.toLowerCase().trim();

  // ✅ CHECK
  const handleCheck = () => {
    if (locked) return;

    if (answers.some((pair) => !pair[0] || !pair[1])) {
      ValidationAlert.info("Complete all answers.");
      return;
    }

    let correctCount = 0;

    const userPairs = answers.map((pair) => pair.map(normalize).join(" "));

    const correctFormatted = correctPairs.map((pair) =>
      pair.map(normalize).join(" "),
    );

    const res = userPairs.map((pair) => {
      const ok = correctFormatted.includes(pair);
      if (ok) correctCount++;
      return ok;
    });

    setResult(res);

    const total = correctPairs.length;

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
    setAnswers(correctPairs);
    setResult([]);
    setLocked(true);
  };

  // 🔄 RESET
  const handleReset = () => {
    setAnswers(
      Array(5)
        .fill(0)
        .map(() => ["", ""]),
    );
    setResult([]);
    setLocked(false);
  };

  // 🎯 input
  const input = (row, col) => (
    <span className="relative inline-block mx-2">
      <input
        value={answers[row][col]}
        disabled={locked}
        onFocus={(e) => e.target.select()}
        onChange={(e) => {
          if (result[row] === true) return;

          const updated = [...answers];
          updated[row][col] = e.target.value;
          setAnswers(updated);

          setResult((prev) => {
            const copy = [...prev];
            copy[row] = undefined;
            return copy;
          });
        }}
        className={`border-b outline-none text-center text-[#6D2980] font-bold bg-transparent w-[120px]
        ${result[row] === false ? "border-red-500" : "border-black"}`}
      />

      {result[row] === false && (
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
        <h5 className="header-title-page8 mb-10">
          <span className="ex-A mr-2.5">D</span>
          Put the words together to make expressions or sentences.
        </h5>

        {/* WORD BANK */}
        <div className="bg-[#D4C7DC] rounded-xl flex justify-between text-[18px] p-6 mb-15 w-[500px] mx-auto">
          {/* العمود الأول */}
          <div className="flex flex-col gap-6">
            <div>no</div>
            <div>try</div>
          </div>

          {/* العمود الثاني */}
          <div className="flex flex-col gap-6">
            <div>way</div>
            <div>yourself</div>
          </div>

          {/* العمود الثالث */}
          <div className="flex flex-col gap-6">
            <div>tastes</div>
            <div>help</div>
          </div>

          {/* العمود الرابع */}
          <div className="flex flex-col gap-6">
            <div>some</div>
            <div>top</div>
          </div>

          {/* العمود الخامس */}
          <div className="flex flex-col gap-6">
            <div>funny</div>
            <div>off</div>
          </div>
        </div>

        {/* QUESTIONS */}
        <div className="space-y-15 text-[18px]">
          {/* الصف الأول */}
          <div className="flex justify-between">
            <div>
              <span className="font-bold mr-3">1</span>
              {input(0, 0)} {input(0, 1)}
            </div>

            <div>
              <span className="font-bold mr-3">2</span>
              {input(1, 0)} {input(1, 1)}
            </div>
          </div>

          {/* الصف الثاني */}
          <div className="flex justify-between">
            <div>
              <span className="font-bold mr-3">3</span>
              {input(2, 0)} {input(2, 1)}
            </div>

            <div>
              <span className="font-bold mr-3">4</span>
              {input(3, 0)} {input(3, 1)}
            </div>
          </div>

          {/* الصف الثالث */}
          <div>
            <span className="font-bold mr-3">5</span>
            {input(4, 0)} {input(4, 1)}
          </div>
        </div>
        {/* BUTTONS */}
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

export default Unit3_Page6_Q1;
