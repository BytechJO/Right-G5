import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

const Unit3_Page2_ComprehensionA = () => {
  const options = [
    "a wife and mother",
    "a chef",
    "married",
    "a well-known writer",
    "busy",
    "lazy",
    "a dolphin trainer",
    "a famous news commentator and analyst",
  ];

  const correct = [
    "a wife and mother",
    "married",
    "a well-known writer",
    "busy",
    "a famous news commentator and analyst",
  ];

  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState({});
  const [locked, setLocked] = useState(false);

  // 🎯 select
  const toggle = (opt) => {
    if (locked) return;

    setSelected((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt],
    );

    setResult({});
  };

  // ✅ check
  const handleCheck = () => {
    if (locked) return;

    if (selected.length === 0) {
      ValidationAlert.info("Select at least one answer.");
      return;
    }

    let score = 0;
    let res = {};

    options.forEach((opt) => {
      const isCorrect = correct.includes(opt);
      const isSelected = selected.includes(opt);

      if (isCorrect && isSelected) {
        score++;
        res[opt] = true;
      } else if (!isCorrect && isSelected) {
        res[opt] = false;
      }
    });

    setResult(res);

    const msg = `Score: ${score} / ${correct.length}`;

    if (score === correct.length) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (score === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // 👀 show
  const handleShow = () => {
    setSelected(correct);
    setResult({});
    setLocked(true);
  };

  // 🔄 reset
  const handleReset = () => {
    setSelected([]);
    setResult({});
    setLocked(false);
  };

  return (
    <div>
      {/* HEADER */}
      <h5 className="header-title-page8-read  mb-5">
        <span className="ex-A-read" style={{ marginRight: "10px" }}>
          A
        </span>
        Circle the phrases that are true.
      </h5>

      <p className="mb-4 text-[18px] mt-10">Linda Robinson is ...</p>

      {/* BOX */}
      <div className="bg-[#D4C7DC] p-6 rounded-2xl grid grid-cols-3 gap-4 text-[18px] ">
        {options.map((opt, i) => {
          const isSelected = selected.includes(opt);

          return (
            <div
              key={i}
              onClick={() => toggle(opt)}
              className="cursor-pointer relative"
              style={{
                padding: "6px 10px",
                borderRadius: "20px",
                border:
                  result[opt] === false
                    ? "2px solid red" // ❌ إذا غلط
                    : isSelected
                      ? "2px solid #00AEEF" // 🔵 إذا مختار
                      : "2px solid transparent", // ⚪ غير مختار
              }}
            >
              {opt}

              {/* ❌ */}
              {result[opt] === false && (
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
            </div>
          );
        })}
      </div>
      <div className="flex justify-center gap-6 mt-8">
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

export default Unit3_Page2_ComprehensionA;
