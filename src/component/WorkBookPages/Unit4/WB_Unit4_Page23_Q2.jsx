import React, { useRef, useState } from "react";
import img from "../../../assets/imgs/pages/workbook/Right Int WB G5 U4/Page 23/Asset 1.svg";

const WB_Unit4_Page23_Q2 = () => {
  const questions = [
    {
      text: "How often do you eat breakfast?",
      word: "daily",
    },

    {
      text: "How often do you go to the grocery store?",
      word: "weekly",
    },

    {
      text: "How often does Sarah play in her backyard?",
      word: "occasionally",
    },

    {
      text: "How often do you go to school?",
      word: "regularly",
    },

    {
      text: "Do you go to the mall?",
      word: "frequently",
    },
  ];

  const [answers, setAnswers] = useState([
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
  ]);

  const inputRefs = useRef([]);

  const MAX_CHARS = 50;

  const handleChange = (qIndex, inputIndex, value) => {
    // فقط الانبوت الأول عليه حد 50 حرف
    if (inputIndex === 0 && value.length > MAX_CHARS) {
      return;
    }

    const updated = [...answers];

    updated[qIndex][inputIndex] = value;

    setAnswers(updated);

    // فقط الانبوت الأول ينزل تلقائي
    if (inputIndex === 0 && value.length >= MAX_CHARS) {
      inputRefs.current[qIndex]?.[1]?.focus();
    }
  };
  const handleReset = () => {
    setAnswers([
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
    ]);

    setTimeout(() => {
      inputRefs.current[0]?.[0]?.focus();
    }, 0);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall text-[18px] w-full ">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-10">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            G
          </span>
          Read and write.
        </h5>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-8 mb-10">
          {questions.map((question, qIndex) => (
            <div key={qIndex}>
              {/* السطر الأول */}
              <div className="flex items-center flex-wrap gap-2 mb-4">
                <span className="font-bold">{qIndex + 1}</span>

                <span>
                  {question.text} ({question.word})
                </span>

                <input
                  ref={(el) => {
                    if (!inputRefs.current[qIndex]) {
                      inputRefs.current[qIndex] = [];
                    }

                    inputRefs.current[qIndex][0] = el;
                  }}
                  type="text"
                  value={answers[qIndex][0]}
                  onChange={(e) => handleChange(qIndex, 0, e.target.value)}
                  maxLength={MAX_CHARS}
                  className="
                    flex-1
                    min-w-[250px]
                    border-0
                    border-b
                    border-black
                    outline-none
                    bg-transparent
                    text-[18px]
                    text-[#6D2980]
                    font-semibold
                    px-1
                  "
                />
              </div>

              {/* السطر الثاني */}
              <div className="pl-7">
                <input
                  ref={(el) => {
                    if (!inputRefs.current[qIndex]) {
                      inputRefs.current[qIndex] = [];
                    }

                    inputRefs.current[qIndex][1] = el;
                  }}
                  type="text"
                  value={answers[qIndex][1]}
                  onChange={(e) => handleChange(qIndex, 1, e.target.value)}
                  className="
    w-full
    border-0
    border-b
    border-black
    outline-none
    bg-transparent
    text-[18px]
    text-[#6D2980]
    font-semibold
    px-1
  "
                />
              </div>
            </div>
          ))}
        </div>

        {/* IMAGE */}
        <div className="flex justify-center">
          <img
            src={img}
            alt="question"
            style={{
              width: "800px",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      {/* RESET BUTTON */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>
      </div>
    </div>
  );
};

export default WB_Unit4_Page23_Q2;
