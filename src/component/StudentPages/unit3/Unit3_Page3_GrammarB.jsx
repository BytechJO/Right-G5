import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
import img5 from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 24/SVG/Asset 7.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 24/SVG/Asset 8.svg";
import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 24/SVG/Asset 24.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 24/SVG/Asset 10.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 24/SVG/Asset 25.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 24/SVG/Asset 11.svg";

const GrammarB = () => {
  const correct = [
    { inputs: ["tall"], select: "tall" }, // 1
    { inputs: ["is", "sad"], select: "sad" }, // 2
    { inputs: ["is", "dirty"], select: "dirty" }, // 3
    { inputs: ["are", "scary"], select: "scary" }, // 4
    { inputs: ["is"], select: "is" }, // 5
    { inputs: ["are"], select: "are" }, // 6
  ];

  const [answers, setAnswers] = useState([
    { inputs: [""], select: "" },
    { inputs: ["", ""], select: "" },
    { inputs: ["", ""], select: "" },
    { inputs: ["", ""], select: "" },
    { inputs: [""], select: "" },
    { inputs: [""], select: "" },
  ]);

  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  // ✍️ كتابة
  const handleInput = (q, i, val) => {
    if (locked) return;

    const updated = [...answers];
    updated[q].inputs[i] = val.toLowerCase();
    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];
      copy[q] = undefined;
      return copy;
    });
  };

  // 🎯 اختيار
  const handleSelect = (q, val) => {
    if (locked) return;

    const updated = [...answers];
    updated[q].select = val;
    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];
      copy[q] = undefined;
      return copy;
    });
  };

  // ✅ CHECK
  const checkAnswers = () => {
    if (locked) return;
    const hasEmpty = answers.some((q) => {
      const emptyInput = q.inputs.some((inp) => inp.trim() === "");
      const emptySelect = q.select === "";
      return emptyInput || emptySelect;
    });

    if (hasEmpty) {
      ValidationAlert.info();
      return;
    }
    let totalScore = 0;
    let total = 0;
    let res = answers.map(() => ({
      inputs: [],
      select: null,
    }));
    answers.forEach((ans, i) => {
      const correctAns = correct[i];

      // inputs
      ans.inputs.forEach((val, idx) => {
        total++;

        if (val === correctAns.inputs[idx]) {
          res[i].inputs[idx] = true;
          totalScore++;
        } else {
          res[i].inputs[idx] = false;
        }
      });

      // select
      total++;
      if (ans.select === correctAns.select) {
        res[i].select = true;
        totalScore++;
      } else {
        res[i].select = false;
      }
    });

    setResult(res);

    const msg = `
        Score: ${totalScore} / ${total}
    `;

    if (totalScore === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (totalScore === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // 👀 SHOW
  const showAnswers = () => {
    setAnswers(correct);
    setLocked(true);
  };

  // 🔄 RESET
  const reset = () => {
    setAnswers([
      { inputs: [""], select: "" },
      { inputs: ["", ""], select: "" },
      { inputs: ["", ""], select: "" },
      { inputs: ["", ""], select: "" },
      { inputs: [""], select: "" },
      { inputs: [""], select: "" },
    ]);
    setResult([]);
    setLocked(false);
  };

  // UI helpers
  const input = (q, i) => (
    <span className="relative mx-1">
      <input
        value={answers[q].inputs[i]}
        disabled={locked || result[q]?.inputs[i] === true}
        onChange={(e) => handleInput(q, i, e.target.value)}
        className={`w-20 border-b text-center font-bold text-[#6D2980]  ${
          result[i] === false
            ? "border-red-500 text-[#6D2980]"
            : "border-black text-[#6D2980]"
        }`}
      />
      {result[q]?.inputs[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            transform: "translateY(-50%)",
            width: "20px",
            height: "20px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        >
          ✕
        </span>
      )}
    </span>
  );
  const option = (q, text) => {
    const isSelected = answers[q].select === text;
    const isWrong = result[q]?.select === false && isSelected;
    return (
      <div
        onClick={() => {
          if (locked || result[q]?.select === true) return;
          handleSelect(q, text);
        }}
        className="relative cursor-pointer px-2 py-1 rounded-full text-center transition"
        style={{
          border: isWrong
            ? "2px solid red"
            : isSelected
              ? "2px solid #6D2980"
              : "2px solid transparent",
          color: "#00AEEF",
          fontWeight: isSelected ? "bold" : "normal",
          opacity: result[q] === true ? 0.6 : 1, // شكل disabled
          cursor: result[q] === true ? "not-allowed" : "pointer",
        }}
      >
        {text}

        {isWrong && (
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
            ✕
          </span>
        )}
      </div>
    );
  };
  return (
    <div>
      <h5 className="header-title-page8-read mb-5">
        <span className="ex-A-read mr-2">B</span>
        Look, read, choose, and write.
      </h5>

      <div className="grid grid-cols-2 gap-x-5 gap-y-10 text-[18px] mt-10">
        {/* 1 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>
              {" "}
              <span className="font-bold mr-1">1</span> The man is
            </span>
            {input(0, 0)}
          </div>

          <div className="flex flex-col mx-4">
            {option(0, "tall")}
            {option(0, "short")}
          </div>

          <img style={{ width: "20%", height: "auto"}} src={img1} />
        </div>

        {/* 2 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 whitespace-nowrap ml-5">
            <span>
              {" "}
              <span className="font-bold mr-1">2</span> She
            </span>
            {input(1, 0)}
            {input(1, 1)}
          </div>

          <div className="flex flex-col mx-4">
            {option(1, "sad")}
            {option(1, "happy")}
          </div>

          <img style={{ width: "20%", height: "auto"}} src={img2} />
        </div>

        {/* 3 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span>
              {" "}
              <span className="font-bold mr-1">3</span> The boy
            </span>
            {input(2, 0)}
            {input(2, 1)}
          </div>

          <div className="flex flex-col mx-4">
            {option(2, "clean")}
            {option(2, "dirty")}
          </div>

          <img style={{ width: "20%", height: "auto"}} src={img3} />
        </div>

        {/* 4 */}
        <div className="flex items-center flex-nowrap">
          <div className="flex items-center gap-2 whitespace-nowrap ml-5">
            <span>
              {" "}
              <span className="font-bold mr-1">4</span> The lions
            </span>
            {input(3, 0)}
            {input(3, 1)}
          </div>

          <div className="flex flex-col mx-4">
            {option(3, "sleepy")}
            {option(3, "scary")}
          </div>

          <img style={{ width: "20%", height: "auto"}} src={img4} />
        </div>

        {/* 5 */}
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <span>
              {" "}
              <span className="font-bold mr-1">5</span> He
            </span>
            {input(4, 0)}
            <span>an announcer</span>
          </div>

          <div className="flex flex-col mx-4">
            {option(4, "is")}
            {option(4, "are")}
          </div>

          <img style={{ width: "20%", height: "auto"}} src={img5} />
        </div>

        {/* 6 */}
        <div className="flex items-center justify-between ml-5">
          <div className="flex items-center gap-2">
            <span>
              {" "}
              <span className="font-bold mr-1">6</span> They
            </span>
            {input(5, 0)}
            <span>mechanics</span>
          </div>

          <div className="flex flex-col mx-4">
            {option(5, "is")}
            {option(5, "are")}
          </div>

          <img style={{ width: "20%", height: "auto"}} src={img6} />
        </div>
      </div>
      <div className="flex justify-center gap-6 mt-8">
        {/* Reset */}
        <div className="relative group">
          <div
            onClick={reset}
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

        {/* Show */}
        <div className="relative group">
          <div
            onClick={showAnswers}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaEye size={14} />
            </div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Show Answer
          </span>
        </div>

        {/* Check */}
        <div className="relative group">
          <div
            onClick={checkAnswers}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaCheck size={14} />
            </div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Check Answer
          </span>
        </div>
      </div>
    </div>
  );
};

export default GrammarB;
