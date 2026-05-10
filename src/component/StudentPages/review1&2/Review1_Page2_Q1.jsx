import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 17/SVG/Asset 32.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 17/SVG/Asset 19.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 17/SVG/Asset 20.svg";

const Page_D_Questions = () => {
  const [answers, setAnswers] = useState([
    { q: "", a: "" },
    { q: "", a: "" },
    { q: "", a: "" },
  ]);

  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  // ✅ الإجابات الصح
  const correct = [
    {
      q: "How much",
      a: "one cup of milk",
    },
    {
      q: "How many",
      a: "a lot of photos",
    },
    {
      q: "How tall is the elephant",
      a: "is twenty feet tall",
    },
  ];

  const normalize = (t) => t.toLowerCase().replace(/[.?]/g, "").trim();

  const handleChange = (i, field, val) => {
    if (result[i]?.[field] === true) return;

    const updated = [...answers];
    updated[i][field] = val;
    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];
      if (copy[i]) copy[i][field] = undefined;
      return copy;
    });
  };

  // ✅ CHECK
  const handleCheck = () => {
    if (locked) return;

    if (answers.some((a) => !a.q.trim() || !a.a.trim())) {
      ValidationAlert.info("Complete all fields.");
      return;
    }

    let correctCount = 0;

    const res = answers.map((ans, i) => {
      const qOk = normalize(ans.q) === normalize(correct[i].q);
      const aOk = normalize(ans.a) === normalize(correct[i].a);

      if (qOk) correctCount++;
      if (aOk) correctCount++;

      return { q: qOk, a: aOk };
    });

    setResult(res);

    const total = correct.length * 2;

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
      { q: "", a: "" },
      { q: "", a: "" },
      { q: "", a: "" },
    ]);
    setResult([]);
    setLocked(false);
  };

  // 🎯 input
  const input = (i, field, width = "350px") => (
    <span className="relative inline-block mx-2">
      <input
        value={answers[i][field]}
        onChange={(e) => handleChange(i, field, e.target.value)}
        disabled={result[i]?.[field] === true}
        style={{
          borderBottom:
            result[i]?.[field] === false ? "1px solid red" : "1px solid black",
          outline: "none",
          textAlign: "center",
          width: width,
          fontWeight: "bold",
          color: "#6D2980",
          background: "transparent",
        }}
      />

      {result[i]?.[field] === false && (
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
    <div className="p-8 flex flex-col items-center">
      <div className="div-forall">
        <h5 className="header-title-page8 mb-15">
          <span className="mr-2">D</span>
          Look and write the questions and answers.
        </h5>
        <div className="mb-7">
          {/* 🔥 السؤال 1 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "40px",
              fontSize: "18px",
            }}
          >
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: "-10px",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                1
              </span>

              <img
                src={img1}
                style={{
                  width: "120px",
                  height: "120px",
                  marginLeft: "20px",
                  padding: "5px",
                }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <div>{input(0, "q")} milk does he drink?</div>
              <div style={{ marginTop: "10px" }}>
                He drinks {input(0, "a", "350px")}.
              </div>
            </div>
          </div>

          {/* 🔥 السؤال 2 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "40px",
              fontSize: "18px",
            }}
          >
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: "-10px",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                2
              </span>

              <img
                src={img2}
                style={{
                  width: "120px",
                  height: "120px",
                  marginLeft: "20px",
                  padding: "5px",
                }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <div>{input(1, "q")} photos does he take?</div>
              <div style={{ marginTop: "10px" }}>
                He takes {input(1, "a", "350px")}.
              </div>
            </div>
          </div>

          {/* 🔥 السؤال 3 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              fontSize: "18px",
            }}
          >
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: "-10px",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                3
              </span>

              <img
                src={img3}
                style={{
                  width: "120px",
                  height: "120px",
                  padding: "5px",
                  marginLeft: "20px",
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div>{input(2, "q", "350px")}?</div>
              <div style={{ marginTop: "10px" }}>
                The elephant is {input(2, "a", "350px")}.
              </div>
            </div>
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

export default Page_D_Questions;
