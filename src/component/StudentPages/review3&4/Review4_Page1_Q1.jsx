import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 36/SVG/Asset 41.svg";

const Review4_Page1_Q1 = () => {
  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);

  const correctAnswers = [
    "grocery",
    "Jeans",
    "book store",
    "Electronics",
    "food court",
  ];

  const normalize = (str) => str.toLowerCase().replace(/\s+/g, "").trim();

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

  const input = (i, width = "w-[210px]") => (
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
    setResult([true, true, true, true, true]);
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", ""]);
    setResult([]);
    setLocked(false);
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
        <h5 className="header-title-page8 mb-15">
          <span className="mr-2">A</span>
          Read and write. Use vocabulary words.
        </h5>
        <div
          style={{
            position: "relative",
            minHeight: "350px",
          }}
        >
          {/* LEFT SIDE */}
          <div
            className="text-[18px] flex flex-col gap-y-10"
            style={{
              width: "68%",
            }}
          >
            {/* 1 */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  minWidth: "20px",
                }}
              >
                1
              </span>

              <div style={{ lineHeight: "1.9" }}>
                The {input(0)} store is a place where you can find food for your
                fridge and cupboards.
              </div>
            </div>

            {/* 2 */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  minWidth: "20px",
                }}
              >
                2
              </span>

              <div style={{ lineHeight: "1.9" }}>
                {input(1)} are a type of pants.
              </div>
            </div>

            {/* 3 */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  minWidth: "20px",
                }}
              >
                3
              </span>

              <div style={{ lineHeight: "1.9" }}>
                A {input(2)} has many books.
              </div>
            </div>

            {/* 4 */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  minWidth: "20px",
                }}
              >
                4
              </span>

              <div style={{ lineHeight: "1.9" }}>
                {input(3)} include computers, printers, stereos, and TVs.
              </div>
            </div>

            {/* 5 */}
            <div
              style={{
                display: "flex",
                gap: "16px",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  minWidth: "20px",
                }}
              >
                5
              </span>

              <div style={{ lineHeight: "1.9" }}>
                You can find many fast food places in a {input(4)}.
              </div>
            </div>
          </div>

          {/* IMAGE */}
          <div
            style={{
              position: "absolute",
              top: "50px",
              right: "0",
            }}
          >
            <img
              src={img1}
              alt=""
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
              }}
            />
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

export default Review4_Page1_Q1;
