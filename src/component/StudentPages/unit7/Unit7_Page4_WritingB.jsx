import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";

const Unit7_Page4_WritingB = () => {
  const [answers, setAnswers] = useState(["", "", "", ""]);

  // update
  const updateAnswer = (index, value) => {
    const updated = [...answers];

    updated[index] = value;

    setAnswers(updated);
  };

  // reset
  const handleReset = () => {
    setAnswers(["", "", "", ""]);
  };

  return (
    <div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-10 leading-relaxed">
        <span className="ex-A-read mr-2">B</span>
        On the lines below, write a conversation between Lori and Jenny.
        Remember to use quotation marks.
      </h5>

      {/* CONTENT */}
      <div className="space-y-10 text-[18px] mt-10">
        {/* 1 */}
        <div className="flex items-center gap-3">
          <span>Lori said,</span>

          <div className="flex-1">
            <input
              type="text"
              value={answers[0]}
              onChange={(e) => updateAnswer(0, e.target.value)}
              className="border-b border-black outline-none w-full text-[#6D2980] font-semibold px-2 bg-transparent"
            />
          </div>
        </div>

        {/* 2 */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={answers[1]}
              onChange={(e) => updateAnswer(1, e.target.value)}
              className="border-b border-black outline-none w-full text-[#6D2980] font-semibold px-2 bg-transparent"
            />
          </div>

          <span>Jenny answered.</span>
        </div>

        {/* 3 */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={answers[2]}
              onChange={(e) => updateAnswer(2, e.target.value)}
              className="border-b border-black outline-none w-full text-[#6D2980] font-semibold px-2 bg-transparent"
            />
          </div>

          <span>she asked.</span>
        </div>

        {/* 4 */}
        <div className="flex items-center gap-3">
          <span>Jenny remarked,</span>

          <div className="flex-1">
            <input
              type="text"
              value={answers[3]}
              onChange={(e) => updateAnswer(3, e.target.value)}
              className="border-b border-black outline-none w-full text-[#6D2980] font-semibold px-2 bg-transparent"
            />
          </div>

          <span>.</span>
        </div>
      </div>

      {/* BUTTON */}
      <div className="flex justify-center mt-12">
        {/* Reset */}
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

export default Unit7_Page4_WritingB;
