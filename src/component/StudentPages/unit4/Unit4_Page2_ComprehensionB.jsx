import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";
import familyImg from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 29/SVG/Asset 7.svg";
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
const Unit4_Page2_ComprehensionB = () => {
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState(["", ""]);

  // reset
  const handleReset = () => {
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", ""]);
  };
  const updateAnswer = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };
  return <div data-exercise-scope="Unit4_Page2_ComprehensionB.jsx"><style>{`[data-exercise-scope="Unit4_Page2_ComprehensionB.jsx"] input:focus-visible,[data-exercise-scope="Unit4_Page2_ComprehensionB.jsx"] textarea:focus-visible,[data-exercise-scope="Unit4_Page2_ComprehensionB.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">B</span>
        Answer the questions.
      </h5>

      <div className="flex justify-between items-start gap-10">
        {/* QUESTIONS */}
        <div className="flex-1 space-y-10 text-[18px] mt-10">
          {/* Q1 */}
          <div>
            <div className="mb-3">
              <span className="font-bold mr-3">1</span>
              Why do most parents work?
            </div>

            <input {...fieldKeys} title={"Why do most parents work?"} aria-label={"Why do most parents work?"} type="text" value={answers[0]} onChange={e => updateAnswer(0, e.target.value)} className="w-full border-b border-black outline-none text-[#6D2980] font-bold px-2 py-1 bg-transparent" />
          </div>

          {/* Q2 */}
          <div>
            <div className="mb-3">
              <span className="font-bold mr-3">2</span>
              Do you think being a parent is a hard job? Why?
            </div>

            <input {...fieldKeys} title={"Do you think being a parent is a hard job? Why?"} aria-label={"Do you think being a parent is a hard job? Why?"} type="text" value={answers[1]} onChange={e => updateAnswer(1, e.target.value)} className="w-full border-b border-black outline-none text-[#6D2980] font-bold px-2 py-1 bg-transparent" />
          </div>
        </div>

        {/* IMAGE */}
        <img src={familyImg} alt={"Parents carrying two children on their shoulders outdoors."} style={{
        width: "170px",
        height: "180px",
        objectFit: "contain",
        marginTop: "32px"
      }} />
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
export default Unit4_Page2_ComprehensionB;
