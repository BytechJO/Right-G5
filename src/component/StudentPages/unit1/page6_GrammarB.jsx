import React, { useState, useRef } from "react";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
import ValidationAlert from "../../Popup/ValidationAlert";
const activationKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault(); event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); event.stopPropagation(); }
  },
};
const fieldKeys = {
  onKeyDown: (event) => { if (event.key === "Enter" || event.key === " ") event.stopPropagation(); },
  onKeyUp: (event) => { if (event.key === "Enter" || event.key === " ") event.stopPropagation(); },
};
const normalizeAnswer = (text) => text.normalize("NFKC").toLowerCase()
  .replace(/[‘’']/g, "")
  .replace(/[.,!?;:…“”"]/g, " ")
  .replace(/\s+/g, " ").trim();


const GrammarB = () => {
  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const correct = ["How long", "How much", "How far", "How high"];

  const questions = [
    "are your fingernails?",
    "does this cost?",
    "can you run?",
    "can you climb?",
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState([]);
  const [locked, setLocked] = useState(false);

  // 🔥 normalize
  const normalize = normalizeAnswer;

  // ✅ CHECK
  const handleCheck = () => {
    if (locked) return;
    setAnnouncement("Checking answers. Correct answers stay locked; incorrect answers can be changed.");

    const isEmpty = answers.some((a) => !a || a.trim() === "");

    if (isEmpty) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;
    const newErrors = [];

    answers.forEach((ans, i) => {
      if (normalize(ans) === normalize(correct[i])) {
        correctCount++;
        newErrors[i] = false; // ✅
      } else {
        newErrors[i] = true; // ❌
      }
    });

    setErrors(newErrors);

    const total = correct.length;
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
      resetButtonRef.current?.focus({preventScroll:true});
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // 👁️ SHOW
  const handleShow = () => {
    setAnnouncement("Correct answers shown and locked.");
    setAnswers(correct);
    setErrors([]); // 🔥 يمسح الأخطاء
    setLocked(true);
  };

  // 🔄 RESET
  const handleReset = () => {
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", ""]);
    setErrors([]);
    setLocked(false);
  };

  const renderInput = (i) => (
    <span className="relative inline-block mx-2">
      <input {...fieldKeys} aria-label={`Question ${i + 1}: ${questions[i]}`} title={`Question ${i + 1}: ${questions[i]}`} style={{borderBottom:locked || errors[i] === false ? "2px solid #16a34a" : errors[i] === true ? "2px solid #ef4444" : undefined}} placeholder="Type your answer"
        value={answers[i]}
        disabled={locked || errors[i] === false}
        onChange={(e) => { if (locked || errors[i] === false) return; setAnswers(previous => previous.map((value,index) => index === i ? e.target.value : value));setErrors(previous => {const next=[...previous];delete next[i];return next;}); }}
        className={`border-b outline-none w-[210px] text-center text-[#6D2980] font-semibold pr-6
          ${errors[i] ? "border-red-500" : "border-black"}
        `}
      />

      {/* ❌ X */}
      {errors[i] && (
        <div
          style={{
            position: "absolute",
            top: "5px",
            left: "89%",
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
            pointerEvents: "none",
          }}
        >
          ✕
        </div>
      )}
    </span>
  );

  return (
    <div data-unit1-scope="page6_GrammarB.jsx">
<style>{`[data-unit1-scope="page6_GrammarB.jsx"] input:focus-visible,[data-unit1-scope="page6_GrammarB.jsx"] textarea:focus-visible,[data-unit1-scope="page6_GrammarB.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      {/* Title */}
      <h5 className="header-title-page8-read mb-12">
        <span className="ex-A-read mr-2">B</span>
        Read and complete the questions.
      </h5>

      {/* Questions */}
      <div className="grid grid-cols-2 gap-x-20 gap-y-12 text-[15px] mt-15">
        {questions.map((q, i) => (
          <div key={i}>
            <span className="font-bold mr-1">{i + 1}</span>
            {renderInput(i)} {q}
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-8">
        {/* Reset */}
        <div className="relative group">
          <button type="button" aria-label="Start Again" {...activationKeys} ref={resetButtonRef}
            onClick={handleReset}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
          >
            <span className="bg-white p-3 rounded-full shadow">
              <FaRedo size={14} />
            </span>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Reset
          </span>
        </div>

        {/* Show */}
        <div className="relative group">
          <button type="button" aria-label="Show Answer" {...activationKeys}
            onClick={handleShow}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm"
          >
            <span className="bg-white p-3 rounded-full shadow">
              <FaEye size={14} />
            </span>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Show Answer
          </span>
        </div>

        {/* Check */}
        <div className="relative group">
          <button type="button" aria-label="Check Answer" {...activationKeys} disabled={locked} style={{cursor:locked ? "not-allowed":"pointer"}}
            onClick={handleCheck}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm"
          >
            <span className="bg-white p-3 rounded-full shadow">
              <FaCheck size={14} />
            </span>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Check Answer
          </span>
        </div>
      </div>
    </div>
  );
};

export default GrammarB;
