import React, { useState } from "react";

const Page8_Q1 = () => {
  const [answers, setAnswers] = useState(["", "", "", "", ""]);

  const handleChange = (i, val) => {
    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);
  };
  const handleReset = () => {
    setAnswers(["", "", "", "", ""]);
  };
  const input = (i, width = "w-[120px]") => (
    <input
      value={answers[i]}
      onChange={(e) => handleChange(i, e.target.value)}
      className={`border-b border-black outline-none text-center text-[#6D2980] font-semibold mx-1 ${width}`}
    />
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        className="div-forall"
        style={{
          width: "clamp(850px, 72%, 1200px)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <h5 className="header-title-page8">
            <span
              className="ex-A"
              style={{ marginRight: "10px", marginBottom: 75 }}
            >
              A
            </span>
            Use vocabulary words to make a summary of the conversation.
          </h5>
          <div className="text-[22px] gap-y-9 flex flex-col">
            <div>
              Hansel’s {input(0, "w-[220px]")} didn’t ring, so he slept too
              long. Hansel’s mom
            </div>

            {/* line 2 */}
            <div>
              woke him up instead. The night before he was{" "}
              {input(1, "w-[260px]")} for a math
            </div>

            {/* line 3 */}
            <div>
              test, so he used his {input(2, "w-[200px]")} as a{" "}
              {input(3, "w-[200px]")}
            </div>

            {/* line 4 */}
            <div>
              that night. Hansel’s mom told him he should wash his{" "}
              {input(4, "w-[260px]")}
            </div>

            {/* line 5 */}
            <div>because it was blue!</div>
          </div>
        </div>
      </div>

      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>
      </div>
    </div>
  );
};

export default Page8_Q1;
