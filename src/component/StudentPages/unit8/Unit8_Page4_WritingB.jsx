import React, { useState, useRef } from "react";
import { FaRedo } from "react-icons/fa";

const Unit8_Page4_WritingB = () => {
  const [answers, setAnswers] = useState(["", "", "", "", "", "", "", "", ""]);
  const secondInputRef = useRef(null);
  // update
  // update
  const updateAnswer = (index, value) => {
    const updated = [...answers];

    updated[index] = value;

    setAnswers(updated);

    // إذا الفراغ الأول صار طويل ينقل عالثاني
    if (index === 0 && value.length >= 45) {
      secondInputRef.current?.focus();
    }
  };
  // reset
  const handleReset = () => {
    setAnswers(["", "", "", "", "", "", "", "", "", "", ""]);
  };

  return (
    <div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-10 leading-relaxed">
        <span className="ex-A-read mr-2">B</span>
        Mysteries take some careful planning to write. Use the form below to
        help plan your mystery.
      </h5>

      {/* CONTENT */}
      <div className="space-y-8 text-[18px] mt-10">
        {/* MAIN CHARACTERS */}
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <span>Main characters in the story and what they’re like:</span>

            <div className="flex-1 min-w-[250px]">
              <input
                type="text"
                value={answers[0]}
                onChange={(e) => updateAnswer(0, e.target.value)}
                className="border-b border-black outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent"
              />
            </div>
          </div>

          <input
            ref={secondInputRef}
            type="text"
            value={answers[1]}
            onChange={(e) => updateAnswer(1, e.target.value)}
            className="border-b border-black outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent"
          />
        </div>

        {/* MAIN PROBLEM */}
        <div className="flex items-center gap-2 flex-wrap">
          <span>The main problem, or mystery:</span>

          <div className="flex-1 min-w-[250px]">
            <input
              type="text"
              value={answers[2]}
              onChange={(e) => updateAnswer(2, e.target.value)}
              className="border-b border-black outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent"
            />
          </div>
        </div>

        {/* CLUES */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span>The clues you plan to give during the story</span>

            <span>
              (<span className="text-[#1ea7ff]">some can be</span> “
              <span className="text-[#1ea7ff]">false clues</span>”):
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-8">
            {/* left */}
            <input
              type="text"
              value={answers[3]}
              onChange={(e) => updateAnswer(3, e.target.value)}
              className="border-b border-black outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent"
            />
            {/* right */}
            <input
              type="text"
              value={answers[4]}
              onChange={(e) => updateAnswer(4, e.target.value)}
              className="border-b border-black outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent"
            />
            {/* left */}
            <input
              type="text"
              value={answers[5]}
              onChange={(e) => updateAnswer(5, e.target.value)}
              className="border-b border-black outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent"
            />
            {/* right */}
            <input
              type="text"
              value={answers[6]}
              onChange={(e) => updateAnswer(6, e.target.value)}
              className="border-b border-black outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent"
            />{" "}
            <input
              type="text"
              value={answers[7]}
              onChange={(e) => updateAnswer(7, e.target.value)}
              className="border-b border-black outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent"
            />
            {/* right */}
            <input
              type="text"
              value={answers[8]}
              onChange={(e) => updateAnswer(8, e.target.value)}
              className="border-b border-black outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent"
            />
          </div>
        </div>

        {/* HOW SOLVED */}
        <div className="flex items-center gap-2 flex-wrap pt-2">
          <span>How the mystery is solved:</span>

          <div className="flex-1 min-w-[250px]">
            <input
              type="text"
              value={answers[9]}
              onChange={(e) => updateAnswer(9, e.target.value)}
              className="border-b border-black outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* RESET BUTTON */}
      <div className="flex justify-center mt-12">
        <div className="relative group">
          <div
            onClick={handleReset}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaRedo size={14} />
            </div>
          </div>

          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Reset
          </span>
        </div>
      </div>
    </div>
  );
};

export default Unit8_Page4_WritingB;
