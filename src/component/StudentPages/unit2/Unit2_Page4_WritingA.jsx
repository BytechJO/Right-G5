import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";

const WritingA = () => {
  const [answers, setAnswers] = useState({
    name: "",
    think: "",
    look: "",
    other: "",
  });

  const handleChange = (field, value) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  // 🔄 Reset فقط
  const handleReset = () => {
    setAnswers({
      name: "",
      think: "",
      look: "",
      other: "",
    });
  };

  return (
    <div className="space-y-8 w-full max-w-[900px] mx-auto">
      {/* العنوان */}
      <h5 className="header-title-page8-read leading-7">
        <span className="ex-A-read mr-2">A</span>
        Choose a character to write about. Give the character a name. Tell about
        what the <br /> character thinks about, what the character does, what
        they look like, etc.
      </h5>

      {/* 1 */}
      <div className="flex items-center gap-3 mt-15">
        <span className="font-bold">1</span>
        <span className="whitespace-nowrap">Character’s name:</span>
        <input
          value={answers.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="flex-1 border-b border-black outline-none bg-transparent text-[#6D2980] font-bold"
        />
      </div>

      {/* 2 */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="font-bold">2</span>
          <span>What does the character think about?</span>
        </div>

        <input
          value={answers.think}
          onChange={(e) => handleChange("think", e.target.value)}
          className="w-full border-b border-black outline-none bg-transparent text-[#6D2980] font-bold"
        />
      </div>

      {/* 3 */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="font-bold">3</span>
          <span>What do they look like?</span>
        </div>

        <input
          value={answers.look}
          onChange={(e) => handleChange("look", e.target.value)}
          className="w-full border-b border-black outline-none bg-transparent text-[#6D2980] font-bold"
        />
      </div>

      {/* 4 */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="font-bold">4</span>
          <span>Other information about your character:</span>
        </div>

        <input
          value={answers.other}
          onChange={(e) => handleChange("other", e.target.value)}
          className="w-full border-b border-black outline-none bg-transparent text-[#6D2980] font-bold"
        />
      </div>

      {/* 🔄 Reset Button */}
      <div className="flex justify-center mt-6">
        <div
          onClick={handleReset}
          className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
        >
          <div className="bg-white p-3 rounded-full shadow">
            <FaRedo size={14} className="text-gray-700" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingA;
