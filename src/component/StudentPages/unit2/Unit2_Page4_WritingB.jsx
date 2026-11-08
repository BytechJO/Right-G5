import React, { useState, useRef } from "react";
import { FaRedo } from "react-icons/fa";
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



const WritingC = () => {
  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [text, setText] = useState("");

  // 🔄 reset داخلي
  const handleReset = () => {
    setAnnouncement("Your writing has been cleared.");
    setText("");
  };

  return (
    <div data-exercise-scope="Unit2_Page4_WritingB.jsx" className="space-y-4 w-full max-w-[900px] mx-auto">
<style>{`[data-exercise-scope="Unit2_Page4_WritingB.jsx"] input:focus-visible,[data-exercise-scope="Unit2_Page4_WritingB.jsx"] textarea:focus-visible,[data-exercise-scope="Unit2_Page4_WritingB.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      {/* العنوان */}
      <h5 className="header-title-page8-read pb-2.5">
        <span className="ex-A-read mr-2">B</span>
        Write a paragraph in your notebook about your character. Use at least
        four relative clauses.
      </h5>

      {/* textarea */}
      <textarea {...fieldKeys} aria-label={"Paragraph about your character, using at least four relative clauses"} title={"Paragraph about your character, using at least four relative clauses"}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-[120px] border border-gray-300 p-2 outline-none mt-10"
        placeholder="Write your paragraph here..."
      />

      {/* 🔄 Reset Button */}
      <div className="flex justify-center mt-4">
        <button type="button" aria-label="Start Again" {...activationKeys} ref={resetButtonRef}
          onClick={handleReset}
          className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
        >
          <span className="bg-white p-3 rounded-full shadow">
            <FaRedo size={14} className="text-gray-700" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default WritingC;
