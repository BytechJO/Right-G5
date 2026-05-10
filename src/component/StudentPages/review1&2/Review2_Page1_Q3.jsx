import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Review2_Page1_Q3 = () => {
  const questions = [
    {
      text: ["The notebook (", "who", "/", "which", ") I brought is green."],
      correct: "which",
    },
    {
      text: [
        "I rode on the Ferris wheel (",
        "that",
        "/",
        "who",
        ") was new to the carnival this year.",
      ],
      correct: "that",
    },
    {
      text: [
        "Larry, (",
        "who",
        "/",
        "which",
        ") likes crazy, twisty rides, tried the huge roller coaster.",
      ],
      correct: "who",
    },
    {
      text: [
        "Can you see the horse (",
        "who",
        "/",
        "that",
        ") ran away today?",
      ],
      correct: "that",
    },
  ];

  const [selected, setSelected] = useState([null, null, null, null]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  // 🎯 اختيار
  const handleSelect = (i, word) => {
    if (result[i] === true) return;

    const updated = [...selected];
    updated[i] = word;
    setSelected(updated);

    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  // ✅ CHECK
  const handleCheck = () => {
    if (locked) return;

    if (selected.includes(null)) {
      ValidationAlert.info("Select all answers.");
      return;
    }

    let correctCount = 0;

    const res = selected.map((val, i) => {
      const ok = val === questions[i].correct;
      if (ok) correctCount++;
      return ok;
    });

    setResult(res);

    const total = questions.length;
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
    setSelected(questions.map((q) => q.correct));
    setResult([]);
    setLocked(true);
  };

  // 🔄 RESET
  const handleReset = () => {
    setSelected([null, null, null, null]);
    setResult([]);
    setLocked(false);
  };

  return (
    <div style={{ padding: "30px", display: "flex", justifyContent: "center" }}>
      <div className="div-forall">
        <h5 className="header-title-page8 mb-22">
          <span className="mr-3">C</span>
          Read and circle the correct answer.
        </h5>

        {/* الأسئلة */}
        {questions.map((q, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              marginBottom: "65px",
            }}
          >
            {/* الرقم */}
            <span
              style={{ fontWeight: "bold", width: "25px", fontSize: "20px" }}
            >
              {i + 1}
            </span>

            {/* الجملة */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "2px",
                fontSize: "20px",
              }}
            >
              {q.text.map((part, idx) => {
                if (part === "who" || part === "which" || part === "that") {
                  return (
                    <span
                      key={idx}
                      onClick={() => handleSelect(i, part)}
                      style={{
                        cursor: "pointer",
                        padding: "2px 4px",
                        borderRadius: "20px",
                        border:
                          result[i] === false && selected[i] === part
                            ? "2px solid red" // ❌ إذا غلط
                            : selected[i] === part
                              ? "2px solid #00AEEF" // 🔵 إذا مختار
                              : "2px solid transparent",
                        position: "relative",
                        color: "#00AEEF",

                        display: "inline-flex", // 🔥 مهم
                        verticalAlign: "middle", // 🔥 حل إضافي display: "inline-flex",
                        alignItems: "baseline",
                      }}
                    >
                      {part}

                      {/* ❌ */}
                      {result[i] === false && selected[i] === part && (
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
                  );
                }

                return <span key={idx}>{part}</span>;
              })}
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

export default Review2_Page1_Q3;
