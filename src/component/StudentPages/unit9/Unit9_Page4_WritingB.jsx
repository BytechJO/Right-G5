import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";

const Unit9_Page4_WritingB = () => {
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

  <div className="flex flex-col">
    <div>
      An
      <span className="text-[#1ea7ff]"> “If”</span> poem can be thoughtful,
      funny, or mysterious. Decide what sort of
      <span className="text-[#1ea7ff]"> “If”</span> poem
    </div>

    <div>
      you would like to write, and then write your idea on the lines below.
    </div>
  </div>
</h5>

      {/* LINES */}
      <div className="space-y-8 text-[18px] mt-10">
        {/* line 1 */}
        <div className="flex items-center gap-3">
          <span className="min-w-[25px]">If</span>

          <input
            type="text"
            value={answers[0]}
            onChange={(e) => updateAnswer(0, e.target.value)}
            className="border-b border-black outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent"
          />
        </div>

        {/* line 2 */}
        <div className="flex items-center gap-3">
          <span className="min-w-[25px]">If</span>

          <input
            type="text"
            value={answers[1]}
            onChange={(e) => updateAnswer(1, e.target.value)}
            className="border-b border-black outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent"
          />
        </div>

        {/* line 3 */}
        <div className="flex items-center gap-3">
          <span className="min-w-[25px]">If</span>

          <input
            type="text"
            value={answers[2]}
            onChange={(e) => updateAnswer(2, e.target.value)}
            className="border-b border-black outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent"
          />
        </div>

        {/* line 4 */}
        <div className="flex items-center gap-3">
          <span className="min-w-[45px]">Then</span>

          <input
            type="text"
            value={answers[3]}
            onChange={(e) => updateAnswer(3, e.target.value)}
            className="border-b border-black outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent"
          />
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

export default Unit9_Page4_WritingB;
