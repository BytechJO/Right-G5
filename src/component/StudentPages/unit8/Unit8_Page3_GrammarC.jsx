import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

const Unit8_Page3_GrammarC = () => {
  const correctAnswers = [
    "She saw someone at the cafe.",
    "Everyone was on the plane.",
    "Was anyone at the house?",
    "Is someone at the cafe?",
  ];

  const hints = [
    "(someone, cafe)",
    "(everyone, plane)",
    "(anyone, house?)",
    "(someone, at the cafe?)",
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [errors, setErrors] = useState([false, false, false, false]);

  const [correctLocked, setCorrectLocked] = useState([
    false,
    false,
    false,
    false,
  ]);

  const [locked, setLocked] = useState(false);

  // normalize
  const normalize = (text) => {
    return text
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/[?.]/g, "")
      .replace(/[’']/g, "");
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

    const total = 4;

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

    setErrors([false, false, false, false]);

    setCorrectLocked([true, true, true, true]);

    setLocked(true);
  };

  // reset
  const handleReset = () => {
    setAnswers(["", "", "", ""]);

    setErrors([false, false, false, false]);

    setCorrectLocked([false, false, false, false]);

    setLocked(false);
  };

  return (
    <div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-10">
        <span className="ex-A-read mr-2">C</span>
        Read and write sentences or questions.
      </h5>

      {/* QUESTIONS */}
      <div className="space-y-10 text-[18px] mt-10">
        {answers.map((answer, i) => (
          <div key={i} className="flex relative items-center gap-6">
            {/* number */}
            <span className="font-bold">{i + 1}</span>
            {/* input */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={answer}
                disabled={locked || correctLocked[i]}
                onChange={(e) => updateAnswer(i, e.target.value)}
                className={`border-b outline-none w-full text-[#7A2D91] font-semibold px-2 bg-transparent
                  ${errors[i] ? "border-red-500" : "border-black"}
                  `}
              />
            </div>
            {/* hint */}
            <span className="text-[#1ea7ff] whitespace-nowrap">
              {hints[i]}
            </span>{" "}
            {/* ❌ */}
            {errors[i] && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "-30px",
                  transform: "translateY(-50%)",
                  width: "20px",
                  height: "20px",
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
        ))}
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

export default Unit8_Page3_GrammarC;
