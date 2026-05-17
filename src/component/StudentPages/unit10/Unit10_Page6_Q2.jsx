import React, { useState } from "react";

const Unit10_Page6_Q2 = () => {
  const [answers, setAnswers] = useState(["", "", "", ""]);

  const handleChange = (i, value) => {
    const updated = [...answers];

    updated[i] = value;

    setAnswers(updated);
  };

  const handleReset = () => {
    setAnswers(["", "", "", ""]);
  };

  const inputField = (i, width) => (
    <input
      type="text"
      value={answers[i]}
      onChange={(e) => handleChange(i, e.target.value)}
      className={`
        ${width}
        border-0
        border-b
        border-black
        outline-none
        bg-transparent
        text-[18px]
        text-[#6D2980]
        font-semibold
        px-1
      `}
    />
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div
        className="div-forall"
        style={{
          minHeight: "65vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* TITLE */}
        <h5 className="header-title-page8 mb-20">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            E
          </span>
          Finish the sentences, using the past progressive tense.
        </h5>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-20">
          {/* 1 */}
          <div className="flex items-center gap-4">
            <span className="font-bold text-[18px]">1</span>

            <span className="text-[18px]">After the game,</span>

            {inputField(0, "w-[620px]")}
          </div>

          {/* 2 */}
          <div className="flex items-center gap-4">
            <span className="font-bold text-[18px]">2</span>

            <span className="text-[18px]">
              In addition to playing the guitar,
            </span>

            {inputField(1, "w-[520px]")}
          </div>

          {/* 3 */}
          <div className="flex items-center gap-4">
            <span className="font-bold text-[18px]">3</span>

            <span className="text-[18px]">Was</span>

            {inputField(2, "w-[500px]")}

            <span className="text-[18px]">while the band played?</span>
          </div>

          {/* 4 */}
          <div className="flex items-center gap-4">
            <span className="font-bold text-[18px]">4</span>

            <span className="text-[18px]">Were</span>

            {inputField(3, "w-[500px]")}

            <span className="text-[18px]">when school ended?</span>
          </div>
        </div>
      </div>

      {/* BUTTON */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>
      </div>
    </div>
  );
};

export default Unit10_Page6_Q2;
