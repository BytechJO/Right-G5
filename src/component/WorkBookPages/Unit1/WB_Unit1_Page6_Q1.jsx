import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

import trueImg from "../../../assets/imgs/true.svg";
import flaseImg from "../../../assets/imgs/false.svg";
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U1/Page 6/Asset 13 (2).svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U1/Page 6/Asset 11.svg";
import img3 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U1/Page 6/Asset 12.svg";

const WB_Unit1_Page6_Q1 = () => {
  const questions = [
    {
      image: img1,
      text: "How many apples do you have?",
      answer: "false",
    },
    {
      image: img2,
      text: "How tall are you?",
      answer: "false",
    },
    {
      image: img3,
      text: "How old are you?",
      answer: "true",
    },
  ];

  const [answers, setAnswers] = useState(["", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const handleSelect = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...answers];

    updated[i] = value;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = answers.some((a) => !a);

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((a, i) => {
      const ok = a === questions[i].answer;

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = questions.length;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:18px;text-align:center;">
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
    setAnswers(["false", "false", "true"]);

    setResult([true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const errorBadge = () => (
    <span
      style={{
        position: "absolute",
        top: "40px",
        right: "25px",
        width: "20px",
        height: "20px",
        background: "#ef4444",
        color: "white",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "11px",
        fontWeight: "bold",
        border: "2px solid white",
        boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
      }}
    >
      ✕
    </span>
  );

  const markBox = (i, value, img) => (
    <button
      type="button"
      disabled={locked || result[i] === true}
      onClick={() => handleSelect(i, value)}
      className="relative flex items-center justify-center"
      style={{
        width: "34px",
        height: "34px",
        border: "2px solid #6D2980",
        borderRadius: "6px",
        background: "transparent",
        cursor: locked || result[i] === true ? "default" : "pointer",
      }}
    >
      {answers[i] === value && (
        <img
          src={img}
          alt={value}
          style={{
            width: "24px",
            height: "24px",
          }}
        />
      )}
    </button>
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall ">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-39">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            I
          </span>
          Look, read, and write{" "}
          <span className="font-bold text-[#D1252B]"> ✓</span> or
          <span className="font-bold text-[#D1252B]">✕</span> .
        </h5>

        {/* QUESTIONS */}
        <div className="grid grid-cols-3 gap-10 text-[18px]">
          {questions.map((q, i) => (
            <div key={i} className="flex flex-col">
              <div className="flex items-start gap-2 mb-2">
                <span className="font-bold">{i + 1}</span>

                <img
                  src={q.image}
                  alt={`question-${i + 1}`}
                  style={{
                    width: "250px",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>

              <div className="flex items-center gap-6 ml-6">
                <p className="leading-[1.2] w-[150px]">{q.text}</p>

                <div className="relative flex items-center gap-2">
                  {markBox(i, "true", trueImg)}

                  {markBox(i, "false", flaseImg)}

                  {result[i] === false && errorBadge()}
                </div>
              </div>
            </div>
          ))}
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

export default WB_Unit1_Page6_Q1;
