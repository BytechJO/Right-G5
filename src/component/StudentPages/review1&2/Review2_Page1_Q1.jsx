import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Review2_Page1_Q1 = () => {
  const [answers, setAnswers] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  // ✅ الإجابات الصح
  const correct = [
    ["carnival", "twisty", "merry-go-round", "crazy", ""],
    ["couple", "(a) few", "", "", ""],
    ["trims", "still", "beg", "giraffe", ""],
  ];

  const normalize = (t) =>
    t
      .toLowerCase()
      .replace(/\(a\)/g, "a") // 🔥 يحول (a) → a
      .replace(/[()]/g, "") // يشيل باقي الأقواس
      .replace(/\s+/g, " ") // يوحّد المسافات
      .trim();
  const handleChange = (col, row, val) => {
    if (result[col]?.[row] === true) return;

    const updated = [...answers];
    updated[col][row] = val;
    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];
      if (copy[col]) copy[col][row] = undefined;
      return copy;
    });
  };

  const handleCheck = () => {
    if (locked) return;

    // 🔥 لازم كل عمود فيه كلمة
    const hasEmptyColumn = answers.some((col) =>
      col.every((cell) => !cell.trim()),
    );

    if (hasEmptyColumn) {
      ValidationAlert.info("Write at least one word in each group.");
      return;
    }

    let correctCount = 0;

    const res = answers.map((col, ci) => {
      // 🔥 كلمات العمود الحالي فقط
      const columnCorrect = correct[ci]
        .filter(Boolean)
        .map((w) => normalize(w));

      return col.map((val) => {
        const v = normalize(val);

        // 🔥 إذا فاضي → لا نحط ❌
        if (!v) return undefined;

        // 🔥 صح إذا موجود ضمن نفس العمود
        const ok = columnCorrect.includes(v);

        if (ok) correctCount++;

        return ok;
      });
    });

    setResult(res);

    // 🔥 العلامة ثابتة من 10
    const total = 10;

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
    setAnswers([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]);
    setResult([]);
    setLocked(false);
  };

  // 🎯 input line
  const input = (col, row) => (
    <div style={{ position: "relative", marginBottom: "20px" }}>
      <input
        value={answers[col][row]}
        onChange={(e) => handleChange(col, row, e.target.value)}
        disabled={result[col]?.[row] === true}
        style={{
          width: "100%",
          borderBottom:
            result[col]?.[row] === false ? "1px solid red" : "1px solid black",
          outline: "none",
          fontSize: "18px",
          color: "#6D2980",
          fontWeight: "bold",
          background: "transparent",
        }}
      />

      {result[col]?.[row] === false && (
        <span
          style={{
            position: "absolute",
            top: "2px",
            right: "-8px",
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
    <div style={{ padding: "30px", display: "flex", justifyContent: "center" }}>
      <div className="div-forall">
        <h5 className="header-title-page8 mb-27">
          <span className="mr-3">A</span>
          Put the vocabulary words in the correct group.
        </h5>

        {/* الأعمدة */}
        <div style={{ display: "flex", gap: "20px" }}>
          {/* column 1 */}
          <div style={boxStyle}>
            <div style={titleStyle}>Having to do with a carnival</div>
            {answers[0].map((_, i) => input(0, i))}
          </div>

          {/* column 2 */}
          <div style={boxStyle}>
            <div style={titleStyle}>About numbers or amounts</div>
            {answers[1].map((_, i) => input(1, i))}
          </div>

          {/* column 3 */}
          <div style={boxStyle}>
            <div style={titleStyle}>Everything else</div>
            {answers[2].map((_, i) => input(2, i))}
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

// 🎨 styles
const boxStyle = {
  flex: 1,
  border: "2px solid #6d2980",
  borderRadius: "12px",
  padding: "15px",
  minHeight: "250px",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "20px",
  fontSize: "18px",
};

export default Review2_Page1_Q1;
