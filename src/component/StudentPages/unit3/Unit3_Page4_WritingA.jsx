import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";

const WritingA = () => {
  const [answers, setAnswers] = useState([
    ["", ""], // Mike
    ["", ""], // Gary
    ["", ""], // Joe
  ]);

  const handleChange = (row, col, value) => {
    const updated = [...answers];
    updated[row][col] = value;
    setAnswers(updated);
  };

  const reset = () => {
    setAnswers([
      ["", ""],
      ["", ""],
      ["", ""],
    ]);
  };

  const input = (row, col) => (
    <input
      value={answers[row][col]}
      onChange={(e) => handleChange(row, col, e.target.value)}
      style={{
        width: "100%",
        outline: "none",
        fontSize: "18px",
        color: "#6D2980",
        background: "transparent",
      }}
    />
  );

  return (
    <div className="space-y-4 w-full max-w-[900px] mx-auto">
      {/* العنوان */}
      <h5 className="header-title-page8-read mb-5">
        <span className="ex-A-read mr-2">A</span>
        Write down two things that you know about each person. Start with "{" "}
        <span className="text-[#00AEEF]">He is</span>."
      </h5>
      {/* TABLE */}
      <div
        style={{
          border: "2px solid #6D2980",
          borderRadius: "15px",
          overflow: "hidden",
          marginTop: 10,
          marginLeft: 45,
        }}
      >
        {/* ROW */}
        {["Mike", "Gary", "Joe"].map((name, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: "flex",
              borderBottom: rowIndex !== 2 ? "2px solid #6D2980" : "none",
            }}
          >
            {/* الاسم */}
            <div
              style={{
                width: "150px",
                padding: "15px",
                borderRight: "2px solid #6D2980",
                background: "#e9e4eb",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {name}
            </div>

            {/* الجمل */}
            <div
              style={{
                flex: 1,
                padding: "10px 15px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div> {input(rowIndex, 0)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔄 فقط Reset */}
      <div className="flex justify-center mt-4">
        <div
          onClick={reset}
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
