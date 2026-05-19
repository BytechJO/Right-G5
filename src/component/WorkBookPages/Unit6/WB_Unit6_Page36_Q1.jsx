import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGES
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 36/Asset 13.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 36/Asset 14.svg";

const WB_Unit6_Page36_Q1 = () => {
  const wordBank = [
    "take advantage of",
    "a bunch",
    "bowling",
    "trade",
    "attractions",
    "shoot",
    "discounts",
  ];

  const answers = [
    "attractions",
    "bowling",
    "shoot",
    "take advantage of",
    "discounts",
    "trade",
    "a bunch",
  ];

  const [studentAnswers, setStudentAnswers] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  // ------------------------
  // HANDLE INPUT
  // ------------------------

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...studentAnswers];

    updated[i] = value;

    setStudentAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = studentAnswers.some((a) => !a.trim());

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = studentAnswers.map((answer, i) => {
      const ok = normalize(answer) === normalize(answers[i]);

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

  // ------------------------
  // SHOW ANSWERS
  // ------------------------

  const showAnswers = () => {
    setStudentAnswers(answers);

    setResult([true, true, true, true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    setStudentAnswers(["", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i, width) => (
    <div className="relative inline-block">
      <input
        type="text"
        value={studentAnswers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
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
        style={{
          width,
        }}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            width: "18px",
            height: "18px",
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
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <h5 className="header-title-page8 mb-8">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            H
          </span>
          Read and write.
        </h5>

        {/* WORD BANK */}

        <div className="flex flex-wrap gap-2 mb-8">
          {wordBank.map((word, index) => (
            <div
              key={index}
              className="border border-[#7D3C98] rounded-lg px-3 py-0.5 text-[17px]"
            >
              {word}
            </div>
          ))}
        </div>

        {/* CONTENT */}

        <div className="px-[30px] leading-[1.7] relative">
          {/* FIRST PART */}

          <div className="flex justify-between items-start gap-2">
            {/* TEXT */}
            <div className="flex-1">
              <div>
                My friend and I love to see the new {inputField(0, "140px")} at
                the carnival.
              </div>

              <div className="mt-3">
                We can go {inputField(1, "120px")} or {inputField(2, "110px")} a
                basketball.
              </div>

              <div>
                We can go to the water show to see the dolphins and whales.
              </div>

              <div className="mt-5">
                We love to {inputField(3, "260px")} the
              </div>

              <div>{inputField(4, "180px")} and sales.</div>
            </div>

            {/* IMAGE */}
            <img
              src={img1}
              alt=""
              style={{
                width: "250px",
                height: "200px",
                objectFit: "contain",
                flexShrink: 0,
              }}
            />
          </div>

          {/* SECOND PART */}
          <div className="flex items-start gap-6 mt-8">
            {/* WHALE IMAGE */}

            <img
              src={img2}
              alt=""
              style={{
                width: "270px",
                height: "auto",
                objectFit: "contain",
              }}
            />

            {/* TEXT */}

            <div className="leading-[1.8] pt-2">
              <div>
                We can {inputField(5, "120px")} our winning tickets for lots of
                toys.
              </div>

              <div className="mt-2">We go with {inputField(6, "220px")} of</div>

              <div>friends. That way, the fun never ends!</div>
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

export default WB_Unit6_Page36_Q1;
