import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U1/Page 6/Asset 7.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U1/Page 6/Asset 8.svg";
import img3 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U1/Page 6/Asset 9.svg";

const WB_Unit1_Page6_Q2 = () => {
  const questions = [
    {
      q: "How far ",
      a: "five miles",
      image: img1,
    },
    {
      q: "How much are the chips?",
      a: "It is one dollar.",
      image: img2,
    },
    {
      q: "How deep is the pool?",
      a: "It is four feet deep.",
      image: img3,
    },
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...answers];

    updated[i] = value;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = answers.some((a) => !a.trim());

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((a, i) => {
      const qIndex = Math.floor(i / 2);

      const expected = i % 2 === 0 ? questions[qIndex].q : questions[qIndex].a;

      const ok = normalize(a) === normalize(expected);

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = answers.length;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:18px;text-align:center;">
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
      "How far ",
      "five miles",

      "How much are the chips",
      "It is one dollar",

      "How deep is the pool",
      "It is four feet deep",
    ]);

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width) => (
    <div className="relative inline-block">
      <input
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          ${width}
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6D2980]
          font-semibold
          px-1

          ${result[i] === false ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            width: "20px",
            height: "20px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
          }}
        >
          ✕
        </span>
      )}
    </div>
  );
  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall ">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-8">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            J
          </span>
          Look, and then write “<span className="text-[#19B6F0]">How</span>”
          questions and answer them.Use the adjectives in the word box.
        </h5>

        {/* WORD BOXES */}
        <div
          style={{
            border: "2px solid #7D3C98",
            borderRadius: "12px",
            padding: "8px 24px",
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            width: "fit-content",
            margin: "0 auto 48px auto",
            fontSize: "18px",
          }}
        >
          <span>deep</span>

          <span>much</span>

          <span>far</span>
        </div>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-10 text-[18px] mb-15">
          {/* 1 */}
          <div className="flex gap-12 items-start">
            {/* LEFT */}
            <div className="flex items-start gap-4 w-60">
              <span className="font-bold mt-3">1</span>

              <img
                src={questions[0].image}
                alt="home"
                style={{
                  width: "180px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-6 w-[520px] mt-1">
              <span>five kilometers</span>

              <div className="flex items-center gap-2">
                <span>Q:</span>

                {inputField(0, "w-[300px]")}

                <span>is it to your home?</span>
              </div>

              <div className="flex items-center gap-2">
                <span>A:</span>

                <span>It is</span>

                {inputField(1, "w-[300px]")}

                <span>away.</span>
              </div>
            </div>
          </div>

          {/* 2 */}
          <div className="flex gap-12 items-start">
            {/* LEFT */}
            <div className="flex items-start gap-4 w-60">
              <span className="font-bold mt-3">2</span>

              <img
                src={questions[1].image}
                alt="chips"
                style={{
                  width: "140px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-6 w-[520px] mt-1">
              <span>one dollar</span>

              <div className="flex items-center gap-2">
                <span>Q:</span>

                {inputField(2, "w-[400px]")}

                <span>?</span>
              </div>

              <div className="flex items-center gap-2">
                <span>A:</span>

                {inputField(3, "w-[400px]")}
              </div>
            </div>
          </div>

          {/* 3 */}
          <div className="flex gap-12 items-start">
            {/* LEFT */}
            <div className="flex items-start gap-4 w-60">
              <span className="font-bold mt-3">3</span>

              <img
                src={questions[2].image}
                alt="pool"
                style={{
                  width: "180px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-6 w-[520px] mt-1">
              <span>three meters deep</span>

              <div className="flex items-center gap-2">
                <span>Q:</span>

                {inputField(4, "w-[400px]")}

                <span>?</span>
              </div>

              <div className="flex items-center gap-2">
                <span>A:</span>

                {inputField(5, "w-[400px]")}
              </div>
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

export default WB_Unit1_Page6_Q2;
