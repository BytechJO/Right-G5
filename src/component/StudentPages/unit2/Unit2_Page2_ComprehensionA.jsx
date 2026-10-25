import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
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
  .replace(/[.,!?;:…“”"–—-]/g, " ")
  .replace(/\s+/g, " ").trim();


const Unit2_Page2_ComprehensionA = () => {
  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState(["", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  const correctAnswers = [
    "at the same time to the same mom",
    "mirror image twins",
    "Siamese twins",
  ];

  const questions = [
    "Twins are people who are born",
    "Twins that are exactly the same on the opposite sides of their bodies are",
    "Twins that are joined together are",
  ];

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;
    const updated = [...answers];
    updated[i] = value;
    setAnswers(updated);

    // 🔥 امسح الخطأ أول ما يعدل
    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };
  const normalize = normalizeAnswer;
  const handleCheck = () => {
    if (locked) return;
    setAnnouncement("Answers checked. Correct answers stay locked; incorrect answers can be changed.");

    if (answers.some((a) => !a || !a.trim())) {
      setAnnouncement("Please complete all fields.");
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
      setLocked(true); // 🔒 يقفل فقط إذا كله صح
      resetButtonRef.current?.focus({preventScroll:true});
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };
  const handleShow = () => {
    setAnnouncement("Correct answers shown and locked.");
    setAnswers(correctAnswers);
    setResult((correctAnswers).map(()=>true));
    setLocked(true);
  };
  const handleReset = () => {
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", ""]);
    setResult([]);
    setLocked(false);
  };
  return (
    <div data-exercise-scope="Unit2_Page2_ComprehensionA.jsx" className="mb-15 mx-auto w-full">
<style>{`[data-exercise-scope="Unit2_Page2_ComprehensionA.jsx"] input:focus-visible,[data-exercise-scope="Unit2_Page2_ComprehensionA.jsx"] textarea:focus-visible,[data-exercise-scope="Unit2_Page2_ComprehensionA.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      {/* العنوان */}
      <div className="flex items-center gap-3 mb-7">
        <h5 className="header-title-page8-read pb-2.5">
          <span className="ex-A-read mr-2">A</span>
          Finish the sentence with a fact from the story.
        </h5>
      </div>

      {/* الأسئلة */}
      <div className="space-y-6">
        {questions.map((q, i) => {
          const isCorrect =
            result && result[i] === true
              ? "border-black"
              : result && result[i] === false
                ? "border-red-500"
                : "";
          return (
            <div key={i} className="relative flex items-start gap-3">
              {/* الرقم */}
              <span className="font-bold">{i + 1}</span>

              {/* الجملة */}
              {i === 1 ? (
                // 🔥 السؤال الثاني (الخط تحت)
                <div className="flex-1 relative">
                  <span>{q}</span>

                  <input placeholder="Complete the sentence" style={{borderBottom:locked || result[i] === true ? "2px solid #16a34a" : result[i] === false ? "2px solid #ef4444" : undefined}} {...fieldKeys} aria-label={`Item ${i + 1}, complete the sentence: ${q}`} title={`Item ${i + 1}, complete the sentence: ${q}`}
                    disabled={locked || result[i] === true}
                    value={answers[i]}
                    onChange={(e) => handleChange(i, e.target.value)}
                    className={`outline-none border-b-2 ${isCorrect} w-full mt-1 text-[#6D2980] font-bold`}
                  />
                </div>
              ) : (
                // 🔥 الأول والثالث (الخط جنب)
                <div className="flex-1 flex items-center gap-2 relative">
                  <span className="whitespace-nowrap">{q}</span>

                  <input placeholder="Complete the sentence" style={{borderBottom:locked || result[i] === true ? "2px solid #16a34a" : result[i] === false ? "2px solid #ef4444" : undefined}} {...fieldKeys} aria-label={`Item ${i + 1}, complete the sentence: ${q}`} title={`Item ${i + 1}, complete the sentence: ${q}`}
                    disabled={locked || result[i] === true}
                    value={answers[i]}
                    onChange={(e) => handleChange(i, e.target.value)}
                    className={`outline-none border-b-2 ${isCorrect} w-full mt-1 text-[#6D2980] font-bold`}
                  />
                </div>
              )}

              {/* ❌ علامة الخطأ */}
              {result[i] === false && (
                <div
                  style={{
                    position: "absolute",
                    top: "0px",
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
        })}
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

export default Unit2_Page2_ComprehensionA;
