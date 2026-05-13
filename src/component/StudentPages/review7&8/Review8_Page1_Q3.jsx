import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Review8_Page1_Q3 = () => {
  const questions = [
    "anybody",
    "no one",
    "nothing",
    "someone",
    "somebody",
    "everybody",
    "everything",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,]/g, "")
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

    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((a, i) => {
      const ok = normalize(a) === normalize(questions[i]);

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = questions.length;

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
      "anybody",
      "no one",
      "nothing",
      "someone",
      "somebody",
      "everybody",
      "everything",
    ]);

    setResult([true, true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width) => (
    <span className="relative inline-block">
      <input
        type="text"
        value={answers[i]}
        placeholder="type here..."
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          ${width}
          border-0
          outline-none
          bg-transparent
          text-center
          text-[18px]
          text-[#6D2980]
          font-semibold
          px-1
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
    </span>
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-20">
          <span
            style={{
              marginRight: "10px",
            }}
          >
            C
          </span>
          Finish the chart.
        </h5>

        {/* TABLE */}
        <table
          className="border-collapse text-[18px]"
          style={{
            width: "920px",
          }}
        >
          <tbody>
            {/* HEADER */}
            <tr>
              <td className="border-2 border-[#6d2980] h-[70px] w-40 bg-[#E6E0EA]"></td>

              <td className="border-2 border-[#6d2980] text-center  bg-[#E6E0EA]">
                one
              </td>

              <td className="border-2 border-[#6d2980] text-center  bg-[#E6E0EA]">
                body
              </td>

              <td className="border-2 border-[#6d2980] text-center  bg-[#E6E0EA]">
                thing
              </td>
            </tr>

            {/* ANY */}
            <tr>
              <td className="border-2 border-[#6d2980] text-center h-[70px] bg-[#E6E0EA]">
                any
              </td>

              <td className="border-2 border-[#6d2980] text-center">anyone</td>

              <td className="border-2 border-[#6d2980] text-center">
                {inputField(0, "w-[120px] h-[38px]")}
              </td>

              <td className="border-2 border-[#6d2980] text-center">
                anything
              </td>
            </tr>

            {/* NO */}
            <tr>
              <td className="border-2 border-[#6d2980] text-center h-[70px] bg-[#E6E0EA]">
                no
              </td>

              <td className="border-2 border-[#6d2980] text-center">
                {inputField(1, "w-[120px] h-[38px]")}
              </td>

              <td className="border-2 border-[#6d2980] text-center">nobody</td>

              <td className="border-2 border-[#6d2980] text-center">
                {inputField(2, "w-[120px] h-[38px]")}
              </td>
            </tr>

            {/* SOME */}
            <tr>
              <td className="border-2 border-[#6d2980] text-center h-[70px] bg-[#E6E0EA]">
                some
              </td>

              <td className="border-2 border-[#6d2980] text-center">
                {inputField(3, "w-[120px] h-[38px]")}
              </td>

              <td className="border-2 border-[#6d2980] text-center">
                {inputField(4, "w-[120px] h-[38px]")}
              </td>

              <td className="border-2 border-[#6d2980] text-center">
                something
              </td>
            </tr>

            {/* EVERY */}
            <tr>
              <td className="border-2 border-[#6d2980] text-center h-[70px] bg-[#E6E0EA]">
                every
              </td>

              <td className="border-2 border-[#6d2980] text-center">
                everyone
              </td>

              <td className="border-2 border-[#6d2980] text-center">
                {inputField(5, "w-[120px] h-[38px]")}
              </td>

              <td className="border-2 border-[#6d2980] text-center">
                {inputField(6, "w-[120px] h-[38px]")}
              </td>
            </tr>
          </tbody>
        </table>
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

export default Review8_Page1_Q3;
