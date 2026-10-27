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



const WritingA = () => {
  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState({
    name: "",
    think: "",
    look: "",
    other: "",
  });

  const handleChange = (field, value) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  // 🔄 Reset فقط
  const handleReset = () => {
    setAnnouncement("Your writing has been cleared.");
    setAnswers({
      name: "",
      think: "",
      look: "",
      other: "",
    });
  };

  return (
    <div data-exercise-scope="Unit2_Page4_WritingA.jsx" className="space-y-8 w-full max-w-[900px] mx-auto">
<style>{`[data-exercise-scope="Unit2_Page4_WritingA.jsx"] input:focus-visible,[data-exercise-scope="Unit2_Page4_WritingA.jsx"] textarea:focus-visible,[data-exercise-scope="Unit2_Page4_WritingA.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      {/* العنوان */}
      <h5 className="header-title-page8-read leading-7">
        <span className="ex-A-read mr-2">A</span>
        Choose a character to write about. Give the character a name. Tell about
        what the <br /> character thinks about, what the character does, what
        they look like, etc.
      </h5>

      {/* 1 */}
      <div className="flex items-center gap-3 mt-15">
        <span className="font-bold">1</span>
        <span className="whitespace-nowrap">Character’s name:</span>
        <input placeholder={"Name"} {...fieldKeys} aria-label={"Character’s name"} title={"Character’s name"}
          value={answers.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="flex-1 border-b border-black outline-none bg-transparent text-[#6D2980] font-bold"
        />
      </div>

      {/* 2 */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="font-bold">2</span>
          <span>What does the character think about?</span>
        </div>

        <input placeholder={"Thoughts"} {...fieldKeys} aria-label={"What does the character think about?"} title={"What does the character think about?"}
          value={answers.think}
          onChange={(e) => handleChange("think", e.target.value)}
          className="w-full border-b border-black outline-none bg-transparent text-[#6D2980] font-bold"
        />
      </div>

      {/* 3 */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="font-bold">3</span>
          <span>What do they look like?</span>
        </div>

        <input placeholder={"Appearance"} {...fieldKeys} aria-label={"What does the character look like?"} title={"What does the character look like?"}
          value={answers.look}
          onChange={(e) => handleChange("look", e.target.value)}
          className="w-full border-b border-black outline-none bg-transparent text-[#6D2980] font-bold"
        />
      </div>

      {/* 4 */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="font-bold">4</span>
          <span>Other information about your character:</span>
        </div>

        <input placeholder={"Other details"} {...fieldKeys} aria-label={"Other information about the character"} title={"Other information about the character"}
          value={answers.other}
          onChange={(e) => handleChange("other", e.target.value)}
          className="w-full border-b border-black outline-none bg-transparent text-[#6D2980] font-bold"
        />
      </div>

      {/* 🔄 Reset Button */}
      <div className="flex justify-center mt-6">
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

export default WritingA;
