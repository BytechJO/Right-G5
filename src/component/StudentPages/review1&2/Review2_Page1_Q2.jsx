import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Review2_Page1_Q2 = () => {
  const sentences = [
    ["let’s", "sight"],
    ["not", "much", "fast"],
    ["keep", "my", "knees", "on", "the", "ground"],
  ];

  const correctWordIndex = [1, 1, 2];
  const correctAnswer = ["see", "not so fast", "keep my feet on the ground"];

  const [selected, setSelected] = useState([null, null, null]);
  const [answers, setAnswers] = useState(["", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  const normalize = (t) => t.toLowerCase().replace(/[.]/g, "").trim();

  // 🎯 اختيار الكلمة
  const handleSelect = (i, wi) => {
    if (result[i]?.word === true) return;

    const updated = [...selected];
    updated[i] = wi;
    setSelected(updated);

    setResult((prev) => {
      const copy = [...prev];
      if (copy[i]) copy[i].word = undefined;
      return copy;
    });
  };

  // ✍️ كتابة التصحيح
  const handleChange = (i, val) => {
    if (result[i]?.answer === true) return;

    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];
      if (copy[i]) copy[i].answer = undefined;
      return copy;
    });
  };

  // ✅ CHECK
  const handleCheck = () => {
    if (locked) return;

    if (answers.some((a) => !a.trim()) || selected.includes(null)) {
      ValidationAlert.info("Complete all answers.");
      return;
    }

    let correctCount = 0;

    const res = answers.map((a, i) => {
      const wordCorrect = selected[i] === correctWordIndex[i];
      const answerCorrect = normalize(a) === normalize(correctAnswer[i]);

      if (wordCorrect) correctCount++;
      if (answerCorrect) correctCount++;

      return {
        word: wordCorrect,
        answer: answerCorrect,
      };
    });

    setResult(res);

    const total = 6;
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
    setSelected(correctWordIndex);
    setAnswers(correctAnswer);
    setResult([]);
    setLocked(true);
  };

  // 🔄 RESET
  const handleReset = () => {
    setSelected([null, null, null]);
    setAnswers(["", "", ""]);
    setResult([]);
    setLocked(false);
  };

  return (
    <div style={{ padding: "30px", display: "flex", justifyContent: "center" }}>
      <div className="div-forall">
        <h5 className="header-title-page8 mb-27">
          <span className="mr-3">B</span>
          What’s wrong? Find the one word that is wrong in each expression and
          correct it.
          <br /> Rewrite the expression.
        </h5>

        {/* الجمل */}
        {sentences.map((sentence, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
              marginBottom: "50px",
              position: "relative", // 👈 مهم
              paddingLeft: "40px", // 👈 مساحة للرقم
            }}
          >
            {/* 🔢 الرقم */}
            <span
              style={{
                position: "absolute",
                left: 0,
                top: "2px", // 👈 عدّلها (0 / 2 / 4) حسب ما يزبط معك
                fontWeight: "bold",
                fontSize: "22px",
              }}
            >
              {i + 1}
            </span>

            {/* 🔥 الجملة + الانبوت */}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "baseline", // 👈 هذا الحل
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {/* الجملة */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                }}
              >
                {sentence.map((word, wi) => (
                  <span
                    key={wi}
                    onClick={() => handleSelect(i, wi)}
                    style={{
                      padding: "2px 4px",
                      cursor: "pointer",
                      fontSize: "22px",
                      border:
                        result[i]?.word === false && selected[i] === wi
                          ? "2px solid red" // ❌ غلط
                          : selected[i] === wi
                            ? "2px solid #00AEEF" // 🔵 مختار
                            : "2px solid transparent",
                      borderRadius: "20px",
                      position: "relative",
                    }}
                  >
                    {word}

                    {/* ❌ على الكلمة */}
                    {result[i]?.word === false && selected[i] === wi && (
                      <span
                        style={{
                          position: "absolute",
                          top: "-8px",
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
                  </span>
                ))}
              </div>

              {/* 🔥 الانبوت */}
              <div style={{ position: "relative", flex: 1, minWidth: "250px" }}>
                <input
                  value={answers[i]}
                  onChange={(e) => handleChange(i, e.target.value)}
                  disabled={result[i]?.answer === true}
                  style={{
                    width: "100%",
                    borderBottom:
                      result[i]?.answer === false
                        ? "1px solid red"
                        : "1px solid black",
                    outline: "none",
                    fontSize: "18px",
                    color: "#6D2980",
                    fontWeight: "bold",
                    background: "transparent",
                  }}
                />

                {/* ❌ على الانبوت */}
                {result[i]?.answer === false && (
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
              </div>
            </div>
          </div>
        ))}
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

export default Review2_Page1_Q2;
