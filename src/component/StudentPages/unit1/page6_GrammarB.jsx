/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

const GrammarB = ({ onChange, showTrigger, resetTrigger, locked, result }) => {
  const correct = ["How long", "How much", "How fast", "How high"];

  const questions = [
    "are your fingernails?",
    "does this cost?",
    "can you run?",
    "can you climb?",
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);

  useEffect(() => {
    if (showTrigger) {
      setAnswers(correct);
      onChange(correct); // 🔥 مهم
    }
  }, [showTrigger]);

  useEffect(() => {
    if (resetTrigger) {
      const empty = ["", "", "", ""];
      setAnswers(empty);
      onChange(empty); // 🔥 مهم
    }
  }, [resetTrigger]);
  const isWrong = (i) => result && result[i] === false;
  const renderInput = (i) => (
    <span className="relative inline-block mx-2">
      <input
        disabled={locked}
        value={answers[i]}
        onChange={(e) => {
          const updated = [...answers];
          updated[i] = e.target.value;

          setAnswers(updated);
          onChange(updated); // 🔥 هون الحل
        }}
        className={`border-b border-black outline-none w-[100px] text-center 
          text-[#6D2980] font-semibold`}
      />

      {locked && isWrong(i) && (
        <div
          style={{
            position: "absolute",
            top: "15px",
            left: "-10%",
            transform: "translateY(-50%)",
            width: "22px",
            height: "22px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
            pointerEvents: "none",
          }}
        >
          ✕
        </div>
      )}
    </span>
  );

  return (
    <div>
      {/* العنوان */}
      <h5 className="header-title-page8-read mb-7">
        <span className="ex-A-read" style={{ marginRight: "10px" }}>
          B
        </span>
        Read and complete the questions.
      </h5>

      <div className="grid grid-cols-2 gap-x-20 gap-y-7 text-[15px] max-w-[700px] ">
        {/* 1 */}
        <div>
          <span className="font-bold mr-1">1</span>
          {renderInput(0)} {questions[0]}
        </div>

        {/* 2 */}
        <div>
          <span className="font-bold mr-1">2</span>
          {renderInput(1)} {questions[1]}
        </div>

        {/* 3 */}
        <div>
          <span className="font-bold mr-1">3</span>
          {renderInput(2)} {questions[2]}
        </div>

        {/* 4 */}
        <div>
          <span className="font-bold mr-1">4</span>
          {renderInput(3)} {questions[3]}
        </div>
      </div>
    </div>
  );
};

export default GrammarB;
