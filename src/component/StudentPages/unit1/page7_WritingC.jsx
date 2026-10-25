import React, { useState, useRef } from "react";
import { FaRedo } from "react-icons/fa";
const activationKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  },
};
const fieldKeys = {
  onKeyDown: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
};

const WritingC = () => {
  const resetButtonRef = useRef(null);
  const [text, setText] = useState("");

  const handleReset = () => {
    setText("");
  };

  return (
    <div
      data-unit1-scope="page7_WritingC.jsx"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <style>{`[data-unit1-scope="page7_WritingC.jsx"] input:focus-visible,[data-unit1-scope="page7_WritingC.jsx"] textarea:focus-visible,[data-unit1-scope="page7_WritingC.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      <div className="div-forall">
        <h5 className="header-title-page8-read pb-2.5">
          <span className="ex-A-read mr-2">C</span>
          In your notebook, write a paragraph about your topic, including all
          the information from the
          <b className=" text-[#31B7F5]"> WH- question words</b>.
        </h5>

        <textarea
          {...fieldKeys}
          aria-label={"Your paragraph using the WH-question information"}
          title={"Your paragraph using the WH-question information"}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-[120px] border border-gray-300 p-2 mt-3 outline-none resize-none"
          placeholder="Write your paragraph here..."
        />

        {/* Reset Icon */}
        <div className="flex justify-center mt-6">
          <div className="relative group">
            <button
              type="button"
              aria-label="Start Again"
              {...activationKeys}
              ref={resetButtonRef}
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

export default WritingC;
