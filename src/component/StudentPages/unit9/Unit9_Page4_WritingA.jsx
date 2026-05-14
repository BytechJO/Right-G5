import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";

const Unit9_Page4_WritingA = () => {
  const questions = [
    "If you are sad, what should you do?",

    "If you are happy, what should you do?",
  ];

  const [answers, setAnswers] = useState(["", ""]);

  // update
  const updateAnswer = (index, value) => {
    const updated = [...answers];

    updated[index] = value;

    setAnswers(updated);
  };

  // reset
  const handleReset = () => {
    setAnswers(["", ""]);
  };

  return (
    <div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-10">
        <span className="ex-A-read mr-2">A</span>
        Answer the questions.
      </h5>

      {/* QUESTIONS */}
      <div className="space-y-10 text-[18px] mt-10">
        {questions.map((question, i) => (
          <div key={i} className="flex gap-4 items-start">
            {/* number */}
            <span className="font-bold mt-1">{i + 1}</span>

            <div className="flex-1">
              {/* question */}
              <p className="mb-5 leading-relaxed">{question}</p>

              {/* answer */}
              <input
                type="text"
                value={answers[i]}
                onChange={(e) => updateAnswer(i, e.target.value)}
                className="border-b border-black outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent"
              />
            </div>
          </div>
        ))}
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

export default Unit9_Page4_WritingA;
