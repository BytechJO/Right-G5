import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

import bikeImg from "../../../assets/imgs/pages/classbook/Right 5 Unit 10 It Was the Best Day! Folder/Page 85/SVG/Asset 7.svg";

const Unit10_Page4_WritingB = () => {
  const correctAnswers = [
    "handlebars",
    "seat",
    "chain",
    "tires",
    "pedals",
    "spokes",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);

  const [errors, setErrors] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [correctLocked, setCorrectLocked] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [locked, setLocked] = useState(false);

  const normalize = (text) => {
    return text.trim().toLowerCase().replace(/\s+/g, " ");
  };

  const updateAnswer = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);

    const updatedErrors = [...errors];
    updatedErrors[index] = false;
    setErrors(updatedErrors);
  };

  const handleCheck = () => {
    if (locked) return;

    const isEmpty = answers.some((ans) => normalize(ans) === "");

    if (isEmpty) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let score = 0;

    const newErrors = [false, false, false, false, false, false];

    const updatedLocked = [...correctLocked];

    answers.forEach((answer, i) => {
      if (normalize(answer) === normalize(correctAnswers[i])) {
        score++;
        updatedLocked[i] = true;
      } else {
        newErrors[i] = true;
      }
    });

    setErrors(newErrors);
    setCorrectLocked(updatedLocked);

    const total = 6;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${score} / ${total}
        </span>
      </div>
    `;

    if (score === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (score === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const handleShow = () => {
    setAnswers(correctAnswers);

    setCorrectLocked([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", "", ""]);

    setErrors([false, false, false, false, false, false]);

    setCorrectLocked([false, false, false, false, false, false]);

    setLocked(false);
  };

  const renderInput = (value, error, isCorrect, onChange, style = {}) => (
    <div
      style={{
        position: "absolute",
        ...style,
      }}
    >
      <input
        type="text"
        value={value}
        disabled={locked || isCorrect}
        onChange={onChange}
        style={{
          width: "140px",
          border: "none",
          outline: "none",
          background: "transparent",
          fontSize: "20px",
          fontWeight: "600",
          color: "#7A2D91",
          padding: "2px 4px",
        }}
      />

      {error ? (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
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
      ) : null}
    </div>
  );

  return (
    <div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-10 leading-relaxed">
        <span className="ex-A-read mr-2">B</span>
        Do you know the parts of a bicycle? Put the words by the correct places
        on the <br /> bicycle. With the help of an adult, use the internet to
        find the names.
      </h5>

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "30px",
          width: "100%",
        }}
      >
        {" "}
        <div
          style={{
            position: "relative",
            width: "75%",
          }}
        >
          {/* IMAGE */}
          <img
            src={bikeImg}
            alt=""
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
            }}
          />

          {/* 1 */}
          {renderInput(
            answers[0],
            errors[0],
            correctLocked[0],
            (e) => updateAnswer(0, e.target.value),
            {
              top: "17%",
              left: "4%",
            },
          )}

          {/* 2 */}
          {renderInput(
            answers[1],
            errors[1],
            correctLocked[1],
            (e) => updateAnswer(1, e.target.value),
            {
              top: "9%",
              right: "8%",
            },
          )}

          {/* 3 */}
          {renderInput(
            answers[2],
            errors[2],
            correctLocked[2],
            (e) => updateAnswer(2, e.target.value),
            {
              top: "35%",
              left: "4%",
            },
          )}

          {/* 4 */}
          {renderInput(
            answers[3],
            errors[3],
            correctLocked[3],
            (e) => updateAnswer(3, e.target.value),
            {
              top: "26%",
              right: "8%",
            },
          )}

          {/* 5 */}
          {renderInput(
            answers[4],
            errors[4],
            correctLocked[4],
            (e) => updateAnswer(4, e.target.value),
            {
              top: "52%",
              left: "4%",
            },
          )}

          {/* 6 */}
          {renderInput(
            answers[5],
            errors[5],
            correctLocked[5],
            (e) => updateAnswer(5, e.target.value),
            {
              top: "43%",
              right: "8%",
            },
          )}
        </div>
        {/* WORD BANK */}
        <div
          style={{
            width: "180px",
            background: "#d7c7df",
            borderRadius: "18px",
            padding: "18px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            fontSize: "24px",
            flexShrink: 0,
          }}
        >
          <span>handlebars</span>
          <span>pedals</span>
          <span>spokes</span>
          <span>tires</span>
          <span>seat</span>
          <span>chain</span>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex justify-center gap-6 mt-10">
        {/* Reset */}
        <div className="relative group">
          <div
            onClick={handleReset}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaRedo size={14} />
            </div>
          </div>

          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Reset
          </span>
        </div>

        {/* Show */}
        <div className="relative group">
          <div
            onClick={handleShow}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaEye size={14} />
            </div>
          </div>

          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Show Answer
          </span>
        </div>

        {/* Check */}
        <div className="relative group">
          <div
            onClick={handleCheck}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaCheck size={14} />
            </div>
          </div>

          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Check Answer
          </span>
        </div>
      </div>
    </div>
  );
};

export default Unit10_Page4_WritingB;
