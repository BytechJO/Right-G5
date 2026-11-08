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


const WritingB = () => {
  const resetButtonRef = useRef(null);
  const [answers, setAnswers] = useState({
    topic: "",
    who: "",
    what: "",
    when: "",
    where: "",
    how: "",
    why: "",
  });

  const handleChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setAnswers({
      topic: "",
      who: "",
      what: "",
      when: "",
      where: "",
      how: "",
      why: "",
    });
  };

  const inputStyle =
    "border-b border-black outline-none w-full  text-[#6D2980] font-semibold disabled:bg-gray-100";

  return (
    <div data-unit1-scope="page7_WritingB.jsx"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
<style>{`[data-unit1-scope="page7_WritingB.jsx"] input:focus-visible,[data-unit1-scope="page7_WritingB.jsx"] textarea:focus-visible,[data-unit1-scope="page7_WritingB.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      <div className="div-forall">
        <h5 className="header-title-page8-read ">
          <span className="ex-A-read mr-2">B</span>
          Choose a topic that interests you. Answer the questions below about
          your topic.
        </h5>

        <div className="space-y-4 text-sm mt-10">
          {/* Topic */}
          <div className="flex items-center gap-2">
            <span>Topic:</span>
            <input placeholder={"Your topic"} {...fieldKeys} aria-label={"Your topic: topic"} title={"Your topic: topic"}
              value={answers.topic}
              onChange={(e) => handleChange("topic", e.target.value)}
              className={inputStyle}
            />
          </div>

          {/* Who */}
          <div className="flex items-center gap-2">
            <span>Who?</span>
            <input placeholder={"People"} {...fieldKeys} aria-label={"Your topic: who"} title={"Your topic: who"}
              value={answers.who}
              onChange={(e) => handleChange("who", e.target.value)}
              className={inputStyle}
            />
          </div>

          {/* What */}
          <div className="flex items-center gap-2">
            <span>What?</span>
            <input placeholder={"Event"} {...fieldKeys} aria-label={"Your topic: what"} title={"Your topic: what"}
              value={answers.what}
              onChange={(e) => handleChange("what", e.target.value)}
              className={inputStyle}
            />
          </div>

          {/* When + Where */}
          <div className="flex gap-6">
            <div className="flex items-center gap-2 flex-1">
              <span>When?</span>
              <input placeholder={"Time"} {...fieldKeys} aria-label={"Your topic: when"} title={"Your topic: when"}
                value={answers.when}
                onChange={(e) => handleChange("when", e.target.value)}
                className={inputStyle}
              />
            </div>

            <div className="flex items-center gap-2 flex-1">
              <span>Where?</span>
              <input placeholder={"Place"} {...fieldKeys} aria-label={"Your topic: where"} title={"Your topic: where"}
                value={answers.where}
                onChange={(e) => handleChange("where", e.target.value)}
                className={inputStyle}
              />
            </div>
          </div>

          {/* How + Why */}
          <div className="flex gap-6">
            <div className="flex items-center gap-2 flex-1">
              <span>How?</span>
              <input placeholder={"How it happened"} {...fieldKeys} aria-label={"Your topic: how"} title={"Your topic: how"}
                value={answers.how}
                onChange={(e) => handleChange("how", e.target.value)}
                className={inputStyle}
              />
            </div>

            <div className="flex items-center gap-2 flex-1">
              <span>Why?</span>
              <input placeholder={"Reason"} {...fieldKeys} aria-label={"Your topic: why"} title={"Your topic: why"}
                value={answers.why}
                onChange={(e) => handleChange("why", e.target.value)}
                className={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Reset Icon */}
        <div className="flex justify-center mt-8">
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
        </div>
      </div>
    </div>
  );
};

export default WritingB;
