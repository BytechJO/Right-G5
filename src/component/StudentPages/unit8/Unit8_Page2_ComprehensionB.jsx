import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaRedo, FaEye } from "react-icons/fa";

const Unit8_Page2_ComprehensionB = () => {
  const words = ["any", "every", "some", "no", "one", "thing", "body"];

  const correctAnswers = [
    "anyone",
    "everyone",
    "someone",
    "something",
    "everybody",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", ""]);

  const [errors, setErrors] = useState([false, false, false, false, false]);

  const [correctLocked, setCorrectLocked] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [locked, setLocked] = useState(false);
  // update
  const updateAnswer = (index, value) => {
    const updated = [...answers];

    updated[index] = value;

    setAnswers(updated);

    const updatedErrors = [...errors];

    updatedErrors[index] = false;

    setErrors(updatedErrors);
  };

  // show
  const handleShow = () => {
    setAnswers(correctAnswers);

    setErrors([false, false, false, false, false]);

    setCorrectLocked([true, true, true, true, true]);

    setLocked(true);
  };

  // reset
  const handleReset = () => {
    setAnswers(["", "", "", "", ""]);

    setErrors([false, false, false, false, false]);

    setCorrectLocked([false, false, false, false, false]);

    setLocked(false);
  };

  return (
    <div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">B</span>
        With the words, make four more indefinite pronouns.
      </h5>

      {/* WORDS */}
      <div className="flex justify-between text-[18px] mb-10 px-2 mt-10">
        {words.map((word, i) => (
          <span key={i}>{word}</span>
        ))}
      </div>

      {/* INPUTS */}
      <div className="grid grid-cols-5 gap-6">
        {answers.map((answer, i) => (
          <div key={i} className="relative">
            <input
              type="text"
              value={answer}
              disabled={locked || correctLocked[i]}
              onChange={(e) => updateAnswer(i, e.target.value)}
              className={`border-b outline-none w-full text-center text-[#7A2D91] font-semibold bg-transparent
              ${errors[i] ? "border-red-500" : "border-black"}
              `}
            />

            {/* ❌ */}
            {errors[i] && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "-25px",
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
      </div>
    </div>
  );
};

export default Unit8_Page2_ComprehensionB;
