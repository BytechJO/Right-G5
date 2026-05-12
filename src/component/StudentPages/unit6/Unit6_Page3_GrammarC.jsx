import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 6 Shall We Should We Folder/Page 48/SVG/Asset 7.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 6 Shall We Should We Folder/Page 48/SVG/Asset 8.svg";

const Unit6_Page3_GrammarC = () => {
  const correctAnswers = [
    "Shall we go to the museum?",
    "Shall we go to the mountains?",
  ];

  const [answers, setAnswers] = useState(["", ""]);

  const [errors, setErrors] = useState([false, false]);

  const [correctLocked, setCorrectLocked] = useState([false, false]);

  const [locked, setLocked] = useState(false);

  // normalize
  const normalize = (text) => {
    return text.trim().toLowerCase().replace(/\s+/g, " ").replace(/[?.]/g, "");
  };

  // update
  const updateAnswer = (index, value) => {
    const updated = [...answers];

    updated[index] = value;

    setAnswers(updated);

    const updatedErrors = [...errors];

    updatedErrors[index] = false;

    setErrors(updatedErrors);
  };

  // check
  const handleCheck = () => {
    if (locked) return;

    const isEmpty = answers.some((a) => normalize(a) === "");

    if (isEmpty) {
      ValidationAlert.info("Please complete all fields.");

      return;
    }

    let score = 0;

    const newErrors = answers.map((ans, i) => {
      const isCorrect = normalize(ans) === normalize(correctAnswers[i]);

      if (isCorrect) score++;

      return !isCorrect;
    });

    const newLocked = answers.map((ans, i) => {
      return normalize(ans) === normalize(correctAnswers[i]);
    });

    setErrors(newErrors);

    setCorrectLocked(newLocked);

    const total = 2;

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

  // show
  const handleShow = () => {
    setAnswers(correctAnswers);

    setErrors([false, false]);

    setCorrectLocked([true, true]);

    setLocked(true);
  };

  // reset
  const handleReset = () => {
    setAnswers(["", ""]);

    setErrors([false, false]);

    setCorrectLocked([false, false]);

    setLocked(false);
  };

  return (
    <div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-10">
        <span className="ex-A-read mr-2">C</span>
        Look and write sentences with a modal verb.
      </h5>

      {/* QUESTIONS */}
      <div className="space-y-10 text-[18px] mt-10">
        {/* 1 */}
        <div className="flex gap-6 items-center">
          <span className="font-bold -mt-25">1</span>

          {/* IMAGE */}
          <img
            src={img1}
            alt="museum"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "contain",
            }}
          />

          {/* INPUT */}
          <div className="flex-1 mt-10 relative">
            <input
              type="text"
              value={answers[0]}
              disabled={locked || correctLocked[0]}
              onChange={(e) => updateAnswer(0, e.target.value)}
              className={`border-b outline-none w-full text-[#6D2980] font-semibold px-2 bg-transparent
              ${errors[0] ? "border-red-500" : "border-black"}
              `}
            />

            {/* ❌ */}
            {errors[0] && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "-30px",
                  transform: "translateY(-50%)",
                  width: "22px",
                  height: "22px",
                  background: "#ef4444",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  border: "2px solid white",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                }}
              >
                ✕
              </div>
            )}
          </div>
        </div>

        {/* 2 */}
        <div className="flex gap-6 items-center">
          <span className="font-bold -mt-25">2</span>

          {/* IMAGE */}
          <img
            src={img2}
            alt="mountains"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "contain",
            }}
          />

          {/* INPUTS */}
          <div className="flex-1 flex items-center mt-6">
            {/* first line */}
            <div className="relative w-full">
              <input
                type="text"
                value={answers[1]}
                disabled={locked || correctLocked[1]}
                onChange={(e) => updateAnswer(1, e.target.value)}
                className={`border-b outline-none w-full text-[#6D2980] font-semibold px-2 bg-transparent
      ${errors[1] ? "border-red-500" : "border-black"}
      `}
              />

              {/* ❌ */}
              {errors[1] && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "-30px",
                    transform: "translateY(-50%)",
                    width: "22px",
                    height: "22px",
                    background: "#ef4444",
                    color: "white",
                    borderRadius: "50%",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    border: "2px solid white",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                  }}
                >
                  ✕
                </div>
              )}
            </div>
          </div>
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

export default Unit6_Page3_GrammarC;
