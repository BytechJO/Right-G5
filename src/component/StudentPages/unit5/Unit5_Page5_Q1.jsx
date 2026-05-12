import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 44/Asset 16.svg";
import trueImg from "../../../assets/imgs/true.svg";
import flaseImg from "../../../assets/imgs/false.svg";
const Unit5_Page5_Q1 = () => {
  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);

  const correctAnswers = ["check", "check", "x", "check", "x"];

  const handleSelect = (i, val) => {
    if (locked || result[i] === true) return;

    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  const choiceBox = (i, val) => {
    const isWrongBox = result[i] === false && answers[i] === val;
    return (
      <button
        type="button"
        disabled={locked || result[i] === true}
        onClick={() => handleSelect(i, val)}
        style={{
          width: "45px",
          position: "relative",
          height: "45px",
          border: "2px solid #6D2980",
          borderRadius: "8px",
          color: "#6D2980",
          fontSize: "24px",
          fontWeight: "bold",
          cursor: locked || result[i] === true ? "default" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {answers[i] === val && (
          <img
            src={val === "check" ? trueImg : flaseImg}
            alt=""
            style={{
              width: "24px",
              height: "24px",
              objectFit: "contain",
            }}
          />
        )}
        {isWrongBox && (
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
      </button>
    );
  };

  const answerBoxes = (i) => (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        gap: "8px",
        marginRight: "8px",
      }}
    >
      {choiceBox(i, "check", "✓")}
      {choiceBox(i, "x", "✕")}
    </span>
  );

  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((a) => !a)) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;

    const res = answers.map((a, i) => {
      const ok = a === correctAnswers[i];
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
        <h5 className="header-title-page8 mb-22">
          <span className="ex-A" style={{ marginRight: "10px" }}>
            A
          </span>
          Read and write <span className="text-[#D1232A]">✓</span> or{" "}
          <span className="text-[#D1232A]">✗</span>. Is the underlined word used
          correctly or incorrectly?
        </h5>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 300px",
            gap: "30px",
            alignItems: "start",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              display: "flex",
              flexDirection: "column",
              gap: "35px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {answerBoxes(0)}
              <span style={{ fontWeight: "bold" }}>1</span>
              <span>
                Dad prepared a{" "}
                <span style={{ textDecoration: "underline" }}>barbecue</span>{" "}
                with a lot of meat.
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {answerBoxes(1)}
              <span style={{ fontWeight: "bold" }}>2</span>
              <span>
                <span style={{ textDecoration: "underline" }}>Sharks</span> live
                in water and eat fish.
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {answerBoxes(2)}
              <span style={{ fontWeight: "bold" }}>3</span>
              <span>
                The <span style={{ textDecoration: "underline" }}>entire</span>{" "}
                the teacher gave us was very challenging.
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {answerBoxes(3)}
              <span style={{ fontWeight: "bold" }}>4</span>
              <span>
                Tom had to give a{" "}
                <span style={{ textDecoration: "underline" }}>
                  presentation
                </span>{" "}
                in front of the class.
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {answerBoxes(4)}
              <span style={{ fontWeight: "bold" }}>5</span>
              <span>
                Henry wants the{" "}
                <span style={{ textDecoration: "underline" }}>shish kebab</span>{" "}
                for German chocolate cake.
              </span>
            </div>
          </div>

          <div>
            <img
              src={img1}
              alt=""
              style={{
                width: "300px",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </div>

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

export default Unit5_Page5_Q1;
