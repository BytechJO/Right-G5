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


const GrammarB = () => {
  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [selected, setSelected] = useState([null,null,null,null]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);
  const handleChange = (i, value) => {
    const updated = [...answers];
    updated[i] = value;
    setAnswers(updated);

    // 🔥 امسح الخطأ لما يعدل
    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };
  const handleReset = () => {
    setAnswers(["", "", "", ""]);
    setSelected([null,null,null,null]);setAnnouncement("Your clauses and noun selections have been cleared.");
    setResult([]);
    setLocked(false);
  };
  return (
    <div data-exercise-scope="Unit2_Page3_GrammarB.jsx">
<style>{`[data-exercise-scope="Unit2_Page3_GrammarB.jsx"] input:focus-visible,[data-exercise-scope="Unit2_Page3_GrammarB.jsx"] textarea:focus-visible,[data-exercise-scope="Unit2_Page3_GrammarB.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      {/* العنوان */}
      <h5 className="header-title-page8-read mb-7">
        <span className="ex-A-read mr-2">B</span>
        Add a relative clause to the sentence. Circle the noun it tells about.
      </h5>

      <div className="flex flex-col gap-6 text-[15px] mt-15">
        {/* 1 */}
        <div>
          <span className="font-bold mr-4">1</span>
          Have you met my{" "}
          <span role="button" tabIndex={0} data-choice {...activationKeys} aria-label="Select cousin in sentence 1" aria-pressed={selected[0]==="cousin"}
            onClick={()=>{setSelected(previous=>previous.map((value,i)=>i===0?"cousin":value));setAnnouncement("cousin selected in sentence 1");}}
            className={`cursor-pointer px-1 rounded-full ${
              selected[0] === "cousin" ? "border-2 border-blue-400" : ""
            }`}
          >
            cousin
          </span>
          <input {...fieldKeys} aria-label={"Sentence 1, add a relative clause about my cousin."} title={"Sentence 1, add a relative clause about my cousin."}
            disabled={locked || result[0] === true}
            value={answers[0]}
            onChange={(e) => handleChange(0, e.target.value)}
            className={`border-b-2 outline-none text-[#6D2980] font-bold
                ${result[0] === false ? "border-red-500" : "border-black"}
              `}
          />
          ?
        </div>

        {/* 2 */}
        <div>
          <span className="font-bold mr-4">2</span>
          One of my{" "}
          <span role="button" tabIndex={0} data-choice {...activationKeys} aria-label="Select friends in sentence 2" aria-pressed={selected[1]==="friends"}
            onClick={()=>{setSelected(previous=>previous.map((value,i)=>i===1?"friends":value));setAnnouncement("friends selected in sentence 2");}}
            className={`cursor-pointer px-1 rounded-full ${
              selected[1] === "friends" ? "border-2 border-blue-400" : ""
            }`}
          >
            friends
          </span>
          ,
          <input {...fieldKeys} aria-label={"Sentence 2, add a relative clause about one of my friends."} title={"Sentence 2, add a relative clause about one of my friends."}
            disabled={locked || result[1] === true}
            value={answers[1]}
            onChange={(e) => handleChange(1, e.target.value)}
            className={`border-b-2 outline-none text-[#6D2980] font-bold
                ${result[1] === false ? "border-red-500" : "border-black"}
              `}
          />
          , can juggle four balls.
        </div>

        {/* 3 */}
        <div>
          <span className="font-bold mr-4">3</span>A baby{" "}
          <span role="button" tabIndex={0} data-choice {...activationKeys} aria-label="Select giraffe in sentence 3" aria-pressed={selected[2]==="giraffe"}
            onClick={()=>{setSelected(previous=>previous.map((value,i)=>i===2?"giraffe":value));setAnnouncement("giraffe selected in sentence 3");}}
            className={`cursor-pointer px-1 rounded-full ${
              selected[2] === "giraffe" ? "border-2 border-blue-400" : ""
            }`}
          >
            giraffe
          </span>
          ,
          <input {...fieldKeys} aria-label={"Sentence 3, add a relative clause about the baby giraffe."} title={"Sentence 3, add a relative clause about the baby giraffe."}
            disabled={locked || result[2] === true}
            value={answers[2]}
            onChange={(e) => handleChange(2, e.target.value)}
            className={`border-b-2 outline-none text-[#6D2980] font-bold
                ${result[2] === false ? "border-red-500" : "border-black"}
              `}
          />
          , can walk minutes after it is born.
        </div>

        {/* 4 */}
        <div className="flex items-center">
          <span className="font-bold mr-4">4</span>
          <span className="whitespace-nowrap">
            I saw the{" "}
            <span role="button" tabIndex={0} data-choice {...activationKeys} aria-label="Select Ferris wheel in sentence 4" aria-pressed={selected[3]==="wheel"}
              onClick={()=>{setSelected(previous=>previous.map((value,i)=>i===3?"wheel":value));setAnnouncement("wheel selected in sentence 4");}}
              className={`cursor-pointer px-1 rounded-full ${
                selected[3] === "wheel" ? "border-2 border-blue-400" : ""
              }`}
            >
              Ferris wheel
            </span>
          </span>

          <input {...fieldKeys} aria-label={"Sentence 4, add a relative clause about the Ferris wheel."} title={"Sentence 4, add a relative clause about the Ferris wheel."}
            disabled={locked || result[3] === true}
            value={answers[3]}
            onChange={(e) => handleChange(3, e.target.value)}
            className={`border-b-2 outline-none text-[#6D2980] font-bold
                ${result[3] === false ? "border-red-500" : "border-black"}
              `}
          />.
        </div>
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
      </div>
    </div>
  );
};

export default GrammarB;
