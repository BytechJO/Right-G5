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


const WritingA = () => {
  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState({
    who: "",
    what: "",
    when: "",
    where: "",
    how: "",
    why: "",
  });

  const [locked, setLocked] = useState(false);
  const [errors, setErrors] = useState({});
  const correctAnswers = {
    who: "Ed Leedskalnin",
    what: "Built the Coral Castle by himself",
    when: "In the 1900s",
    where: "the state of Florida in the U.S",
    how: "Maybe pulleys, or magnets, but no one really knows",
    why: "To build a castle",
  };
  const normalize = normalizeAnswer;
  // ✅ CHECK
  const handleCheck = () => {
    if (locked) return;
    setAnnouncement("Checking answers. Correct answers stay locked; incorrect answers can be changed.");

    const isEmpty = Object.values(answers).some((a) => !a || a.trim() === "");

    if (isEmpty) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correct = 0;
    let total = Object.keys(correctAnswers).length;

    const newErrors = {};

    Object.keys(correctAnswers).forEach((key) => {
      if (normalize(answers[key]) === normalize(correctAnswers[key])) {
        correct++;
        newErrors[key] = false; // ✅ صح
      } else {
        newErrors[key] = true; // ❌ غلط
      }
    });

    setErrors(newErrors);

    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${correct} / ${total}
      </span>
    </div>
  `;

    if (correct === total) {
      setLocked(true);
      resetButtonRef.current?.focus({preventScroll:true});
      ValidationAlert.success(msg);
    } else if (correct === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // 👁️ SHOW
  const handleShow = () => {
    setAnnouncement("Correct answers shown and locked.");
    setAnswers(correctAnswers);
    setErrors({}); // 🔥 يمسح كل الأخطاء
    setLocked(true); // 🔒 يقفل التعديل
  };

  // 🔄 RESET
  const handleReset = () => {
    setAnnouncement("Answers and feedback cleared.");
    setAnswers({
      who: "",
      what: "",
      when: "",
      where: "",
      how: "",
      why: "",
    });
    setErrors({}); // 🔥 مهم
    setLocked(false);
  };

  const renderInput = (key) => (
    <div className="relative w-full">
      <input {...fieldKeys} aria-label={`Article answer: ${key}`} title={`Article answer: ${key}`} style={{borderBottom:locked || errors[key] === false ? "2px solid #16a34a" : errors[key] === true ? "2px solid #ef4444" : undefined}} placeholder="Type your answer"
        value={answers[key]}
        disabled={locked || errors[key] === false}
        onChange={(e) => { if (locked || errors[key] === false) return; setAnswers(previous => ({...previous,[key]:e.target.value}));setErrors(previous => {const next={...previous};delete next[key];return next;}); }}
        className={`border-b outline-none w-full text-[#6D2980] font-semibold pr-6
    ${errors[key] ? "border-red-500" : "border-black"}
  `}
      />

      {/* ❌ X icon */}
      {errors[key] && (
        <div
          style={{
            position: "absolute",
            top: "15px",
            left: "100%",
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
    </div>
  );
  return (
   <div data-unit1-scope="page7_WritingA.jsx"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
<style>{`[data-unit1-scope="page7_WritingA.jsx"] input:focus-visible,[data-unit1-scope="page7_WritingA.jsx"] textarea:focus-visible,[data-unit1-scope="page7_WritingA.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <div className="div-forall">
      <h5 className="header-title-page8-read">
        <span className="ex-A-read mr-2">A</span>
        Use the information from the article to write a short answer for each
        question.
      </h5>

      {/* Inputs */}
      <div className="space-y-4 mt-10">
        {/* Who */}
        <div className="flex items-center gap-2">
          <span className=" w-[70px]">Who?</span>
          <div className="flex-1">{renderInput("who")}</div>
        </div>

        {/* What */}
        <div className="flex items-center gap-2">
          <span className=" w-[70px]">What?</span>
          <div className="flex-1">{renderInput("what")}</div>
        </div>

        {/* When + Where */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 flex-1">
            <span className=" w-[70px]">When?</span>
            <div className="flex-1">{renderInput("when")}</div>
          </div>

          <div className="flex items-center gap-2 flex-1">
            <span className=" w-[70px]">Where?</span>
            <div className="flex-1">{renderInput("where")}</div>
          </div>
        </div>

        {/* How + Why */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 flex-1">
            <span className=" w-[70px]">How?</span>
            <div className="flex-1">{renderInput("how")}</div>
          </div>

          <div className="flex items-center gap-2 flex-1">
            <span className=" w-[70px]">Why?</span>
            <div className="flex-1">{renderInput("why")}</div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-6 mt-8">
        {/* Reset */}
        <div className="relative group">
          <button type="button" aria-label="Start Again" {...activationKeys} ref={resetButtonRef}
            onClick={handleReset}
            className="flex items-center justify-center w-15 h-15 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
          >
            <span className="bg-white p-3 rounded-full shadow">
              <FaRedo size={14} className="text-gray-700" />
            </span>
          </button>

          {/* Tooltip */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Reset
          </span>
        </div>

        {/* Show */}
        <div className="relative group">
          <button type="button" aria-label="Show Answer" {...activationKeys}
            onClick={handleShow}
            className="flex items-center justify-center w-15 h-15 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm"
          >
            <span className="bg-white p-3 rounded-full shadow">
              <FaEye size={14} className="text-gray-700" />
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
            className="flex items-center justify-center w-15 h-15 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm"
          >
            <span className="bg-white p-3 rounded-full shadow">
              <FaCheck size={14} className="text-gray-700" />
            </span>
          </button>

          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Check Answer
          </span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default WritingA;
