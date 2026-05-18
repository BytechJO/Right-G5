import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";

const WritingC = () => {
  const [text, setText] = useState("");

  // 🔄 reset داخلي
  const handleReset = () => {
    setText("");
  };

  return (
    <div className="space-y-4 w-full max-w-[900px] mx-auto">
      {/* العنوان */}
      <div className="header-title-page8-read pb-2.5">
        <span className="ex-A-read mr-2">C</span>
        <div style={{ display: "block" }}>
          In your notebook, write a conversation between you and one of your
          parents about one of your friends.
          <div style={{ marginTop: "4px" }}>
            Use <span className="text-[#00AEEF]">he is</span> and{" "}
            <span className="text-[#00AEEF]">she is</span> for your description
            of your friend. Your conversation should be at least 10 lines long.
          </div>
        </div>
      </div>

      {/* textarea */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-[120px] border border-gray-300 p-2 outline-none mt-4 ml-12"
        placeholder="Write your paragraph here..."
      />

      {/* 🔄 Reset Button */}
      <div className="flex justify-center mt-4">
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

export default WritingC;
