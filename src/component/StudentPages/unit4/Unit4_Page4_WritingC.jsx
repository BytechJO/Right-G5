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
const Unit4_Page4_WritingC = () => {
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [text, setText] = useState("");

  // 🔄 reset داخلي
  const handleReset = () => {
    setAnnouncement("Answers and feedback cleared.");
    setText("");
  };
  return <div data-exercise-scope="Unit4_Page4_WritingC.jsx" className="space-y-4 w-full max-w-[900px] mx-auto"><style>{`[data-exercise-scope="Unit4_Page4_WritingC.jsx"] input:focus-visible,[data-exercise-scope="Unit4_Page4_WritingC.jsx"] textarea:focus-visible,[data-exercise-scope="Unit4_Page4_WritingC.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      {/* العنوان */}
      <h5 className="header-title-page8-read pb-2.5">
        <span className="ex-A-read mr-2">C</span>
        In your notebook, write a paragraph about what you do during the day.
      </h5>

      {/* textarea */}
      <textarea {...fieldKeys} title={"Paragraph about what you do during the day"} aria-label={"Paragraph about what you do during the day"} value={text} onChange={e => setText(e.target.value)} className="w-full h-[120px] border border-gray-300 p-2 outline-none mt-10" placeholder="Write your paragraph here..." />

      {/* 🔄 Reset Button */}
      <div className="flex justify-center mt-4">
        <button {...activationKeys} ref={resetButtonRef} aria-label={"Start Again"} type={"button"} onClick={handleReset} className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm">
          <div className="bg-white p-3 rounded-full shadow">
            <FaRedo size={14} className="text-gray-700" />
          </div>
        </button>
      </div>
    </div>;
};
export default Unit4_Page4_WritingC;
