import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";
const activationKeys = {
  onKeyDown: event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  }
};
const fieldKeys = {
  onKeyDown: event => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
  onKeyUp: event => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  }
};
const Unit4_Page4_WritingB = () => {
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const starters = ["First, I", "I always", "I also sometimes", "After that, I often", "Rarely, do I", "Finally, I occasionally"];
  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);

  // reset
  const handleReset = () => {
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", "", ""]);
  };

  // update
  const updateAnswer = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };
  return <div data-exercise-scope="Unit4_Page4_WritingB.jsx"><style>{`[data-exercise-scope="Unit4_Page4_WritingB.jsx"] input:focus-visible,[data-exercise-scope="Unit4_Page4_WritingB.jsx"] textarea:focus-visible,[data-exercise-scope="Unit4_Page4_WritingB.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-10 ">
        <span className="ex-A-read mr-2">B</span>
        Take notes on how long you spend doing different activities during the
        day.<br /> You can use the following starters to help you.
      </h5>

      {/* SENTENCES */}
      <div className="space-y-7 text-[18px] mt-10">
        {starters.map((starter, i) => <div key={i} className="flex items-center">
            {/* STARTER */}
            <span className="mr-2 whitespace-nowrap">{starter}</span>

            {/* INPUT */}
            <input placeholder={"Sentence"} {...fieldKeys} title={`Activity ${i + 1}, complete: ${starter}`} aria-label={`Activity ${i + 1}, complete: ${starter}`} type="text" value={answers[i]} onChange={e => updateAnswer(i, e.target.value)} className="border-b border-black outline-none flex-1 px-2 bg-transparent text-[#6D2980] font-bold" />

            {/* DOT */}
            <span className="ml-1">.</span>
          </div>)}
      </div>

      {/* RESET BUTTON */}
      <div className="flex justify-center mt-10">
        <div className="relative group">
          <button {...activationKeys} ref={resetButtonRef} aria-label={"Start Again"} type={"button"} onClick={handleReset} className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm">
            <div className="bg-white p-3 rounded-full shadow">
              <FaRedo size={14} />
            </div>
          </button>

          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Reset
          </span>
        </div>
      </div>
    </div>;
};
export default Unit4_Page4_WritingB;
