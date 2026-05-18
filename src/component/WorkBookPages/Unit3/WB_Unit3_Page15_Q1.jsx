import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit3_Page15_Q1 = () => {
  const [usedAnswers, setUsedAnswers] = useState(["", "", ""]);

  const [unusedAnswers, setUnusedAnswers] = useState(["", "", ""]);

  const [directionsAnswer, setDirectionsAnswer] = useState("");

  const handleUsedChange = (i, value) => {
    const updated = [...usedAnswers];

    updated[i] = value;

    setUsedAnswers(updated);
  };

  const handleUnusedChange = (i, value) => {
    const updated = [...unusedAnswers];

    updated[i] = value;

    setUnusedAnswers(updated);
  };

  const handleReset = () => {
    setUsedAnswers(["", "", ""]);

    setUnusedAnswers(["", "", ""]);

    setDirectionsAnswer("");
  };

  const boxInput = (value, onChange) => (
    <input
      type="text"
      value={value}
      onChange={onChange}
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
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div
        className="div-forall text-[17px]"
        
      >
        {/* TITLE */}
        <h5 className="header-title-page8 mb-6">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            A
          </span>
          Read and write. If you had the foods below, what would you <br/> make? Use
          the words below and describe what you would use <br/>and what you would not
          use. You can add some of your own ideas, too.
        </h5>

        {/* WORD BOX */}
        <div className="flex justify-center mb-8">
          <div
            style={{
              border: "2px solid #7D3C98",

              borderRadius: "10px",

              padding: "12px 20px",

              width: "100%",
              maxWidth: "900px",
            }}
          >
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-2 text-[18px]">
              <span>curry</span>

              <span>rye bread</span>

              <span>sardines</span>

              <span>peanut butter</span>

              <span>marshmallows</span>
            </div>

            <div className="text-center mt-2">
              other foods found in the fridge or the cupboards
            </div>
          </div>
        </div>

        {/* USED / UNUSED */}
        <div className="grid grid-cols-2 gap-10 mb-5">
          {/* USED */}
          <div>
            <div className="flex justify-center mb-4">
              <div
                style={{
                  border: "2px solid #7D3C98",

                  borderRadius: "10px",

                  padding: "4px 24px",

                  color: "#5F2A84",

                  fontWeight: "600",
                }}
              >
                Used
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    border: "2px solid #7D3C98",

                    borderRadius: "10px",

                    padding: "12px 16px",
                  }}
                >
                  {boxInput(usedAnswers[i], (e) =>
                    handleUsedChange(i, e.target.value),
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* UNUSED */}
          <div>
            <div className="flex justify-center mb-4">
              <div
                style={{
                  border: "2px solid #7D3C98",

                  borderRadius: "10px",

                  padding: "4px 24px",

                  color: "#5F2A84",

                  fontWeight: "600",
                }}
              >
                Unused
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    border: "2px solid #7D3C98",

                    borderRadius: "10px",

                    padding: "12px 16px",
                  }}
                >
                  {boxInput(unusedAnswers[i], (e) =>
                    handleUnusedChange(i, e.target.value),
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DIRECTIONS */}
        <div className="mt-2 mb-10">
          <div className="font-bold mb-1">Directions:</div>

          <div className="flex flex-col gap-5">
            <input
              type="text"
              value={directionsAnswer}
              onChange={(e) => setDirectionsAnswer(e.target.value)}
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

            <div className="border-b border-black h-2.5" />
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>
      </div>
    </div>
  );
};

export default WB_Unit3_Page15_Q1;
