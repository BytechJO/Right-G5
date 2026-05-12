import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import boxArrowRight from "../../../assets/imgs/pages/classbook/Right 5 Unit 6 Shall We Should We Folder/Page 50/Asset 2.svg";
import boxArrowleft from "../../../assets/imgs/pages/classbook/Right 5 Unit 6 Shall We Should We Folder/Page 50/Asset 3.svg";

const Unit6_Page5_Q2 = () => {
  const words = [
    "take advantage of",
    "half price",
    "in a row",
    "made it",
    "try it out",
  ];

  const correctAnswers = [
    ["take advantage of"],
    ["half price"],
    ["made it", "made it!"],
    ["in a row"],
    ["try it out"],
  ];
  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleChange = (i, val) => {
    if (locked || result[i] === true) return;

    const updated = [...answers];
    updated[i] = val;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;

    const newResults = answers.map((ans, i) => {
      const ok = correctAnswers[i].some(
        (correct) => normalize(correct) === normalize(ans),
      );

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = answers.length;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const showAnswers = () => {
    setAnswers([
      correctAnswers[0][0],
      correctAnswers[1][0],
      correctAnswers[2][0],
      correctAnswers[3][0],
      correctAnswers[4][0],
    ]);

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", ""]);
    setResult([]);
    setLocked(false);
  };
  const input = (i, width = "w-[220px]") => (
    <span className="relative inline-block  mb-2.5">
      <input
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        disabled={locked || result[i] === true}
        className={`border-b outline-none text-[#6D2980] font-bold bg-transparent
      ${result[i] === false ? "border-red-500" : "border-black"}
      ${width}`}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
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
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        >
          ✕
        </span>
      )}
    </span>
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-8">
          <span className="ex-A mr-2.5">B</span>
          Read and complete the conversations.
        </h5>

        {/* WORD BANK */}
        <div className="flex justify-center mb-10">
          <div
            className="
              bg-[#E8DFF0]
              rounded-2xl
              px-8
              py-4
              flex
              gap-16
              text-[18px]
            "
          >
            {words.map((word, i) => (
              <span key={i}>{word}</span>
            ))}
          </div>
        </div>

        {/* CONVERSATIONS */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-8">
          {/* BOX 1 */}
          <div className="relative w-[420px] min-h-[170px]">
            <img
              src={boxArrowRight}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "fill",
              }}
            />

            <div className="relative z-10 p-6">
              <span className="absolute -left-8 top-3 font-bold text-[18px]">
                1
              </span>

              {/* BOX 1 */}
              <p className="text-[18px]">We should</p>

              {input(0, "w-[220px]")}

              <p className="text-[18px]">the discount. Let’s buy five.</p>
            </div>
          </div>

          {/* BOX 2 */}
          <div className="relative w-[420px] min-h-[170px]">
            <img
              src={boxArrowleft}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "fill",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 10,
                paddingTop: "20px",
                paddingLeft: "50px",
              }}
            >
              <span className="absolute -left-5 top-3 font-bold text-[18px]">
                2
              </span>

              <p className="text-[18px]">Yes, at</p>

              {input(1, "w-[220px]")}

              <p className="text-[18px]">
                , they would only be fifty cents each.
              </p>
            </div>
          </div>

          {/* BOX 3 */}
          {/* BOX 3 */}
          <div className="relative w-[420px] min-h-[170px]">
            <img
              src={boxArrowRight}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "fill",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 10,
                paddingTop: "10px",
                paddingLeft: "10px",
              }}
            >
              <span className="absolute -left-8 top-3 font-bold text-[18px]">
                3
              </span>

              <p className="text-[18px]">Hooray! I</p>

              {input(2, "w-[240px]")}

              <div style={{ fontSize: "18px" }}>
                {/* السطر الأول */}
                <div>
                  <span>! I got three baskets</span>
                </div>

                {/* السطر الثاني */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    marginTop: "5px",
                  }}
                >
                  {input(3, "w-[210px]")}

                  <span>.</span>
                </div>
              </div>
            </div>
          </div>
          {/* BOX 4 */}
          <div className="relative w-[420px] min-h-[170px]">
            <img
              src={boxArrowleft}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "fill",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 10,
                paddingTop: "25px",
                paddingLeft: "50px",
              }}
            >
              <span className="absolute -left-5 top-3 font-bold text-[18px]">
                4
              </span>

              <p className="text-[18px]">Good job! Now can I</p>

              {input(4, "w-[220px]")}

              <p className="text-[18px]">? I want to see if I can win.</p>
            </div>
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>

        <button className="show-answer-btn" onClick={showAnswers}>
          Show Answer
        </button>

        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Unit6_Page5_Q2;
