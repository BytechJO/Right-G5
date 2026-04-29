import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

const GrammarB = () => {
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [selected, setSelected] = useState("");
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
    setSelected("");
    setResult([]);
    setLocked(false);
  };
  return (
    <div>
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
          <span
            onClick={() => setSelected("cousin")}
            className={`cursor-pointer px-1 rounded-full ${
              selected === "cousin" ? "border-2 border-blue-400" : ""
            }`}
          >
            cousin
          </span>
          <input
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
          <span
            onClick={() => setSelected("friends")}
            className={`cursor-pointer px-1 rounded-full ${
              selected === "friends" ? "border-2 border-blue-400" : ""
            }`}
          >
            friends
          </span>
          ,
          <input
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
          <span
            onClick={() => setSelected("giraffe")}
            className={`cursor-pointer px-1 rounded-full ${
              selected === "giraffe" ? "border-2 border-blue-400" : ""
            }`}
          >
            giraffe
          </span>
          ,
          <input
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
            <span
              onClick={() => setSelected("wheel")}
              className={`cursor-pointer px-1 rounded-full ${
                selected === "wheel" ? "border-2 border-blue-400" : ""
              }`}
            >
              Ferris wheel
            </span>
          </span>

          <input
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

export default GrammarB;
