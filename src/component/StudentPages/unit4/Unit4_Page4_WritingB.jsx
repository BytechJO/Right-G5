import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";

const Unit4_Page4_WritingB = () => {
  const starters = [
    "First, I",
    "I always",
    "I also sometimes",
    "After that, I often",
    "Rarely, do I",
    "Finally, I occasionally",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);

  // reset
  const handleReset = () => {
    setAnswers(["", "", "", "", "", ""]);
  };

  // update
  const updateAnswer = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  return (
    <div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-10 ">
        <span className="ex-A-read mr-2">B</span>
        Take notes on how long you spend doing different activities during the
        day.<br/> You can use the following starters to help you.
      </h5>

      {/* SENTENCES */}
      <div className="space-y-7 text-[18px] mt-10">
        {starters.map((starter, i) => (
          <div key={i} className="flex items-center">
            {/* STARTER */}
            <span className="mr-2 whitespace-nowrap">{starter}</span>

            {/* INPUT */}
            <input
              type="text"
              value={answers[i]}
              onChange={(e) => updateAnswer(i, e.target.value)}
              className="border-b border-black outline-none flex-1 px-2 bg-transparent text-[#6D2980] font-bold"
            />

            {/* DOT */}
            <span className="ml-1">.</span>
          </div>
        ))}
      </div>

      {/* RESET BUTTON */}
      <div className="flex justify-center mt-10">
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

export default Unit4_Page4_WritingB;
