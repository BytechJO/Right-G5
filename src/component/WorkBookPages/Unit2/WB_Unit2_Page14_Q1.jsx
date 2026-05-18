import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import img from "../../../assets/imgs/pages/workbook/Right Int WB G5 U2/Page 14/Asset 9.svg";

const WB_Unit2_Page14_Q1 = () => {
  const answers = [
    "carnival",
    "twisty",
    "crazy",
    "merry-go-round",
    "Let's see",
    "giraffe",
    "couple",
    "few",
  ];

  const words = [
    "merry-go-round",
    "giraffe",
    "carnival",
    "couple",
    "twisty",
    "Let's see",
    "few",
    "crazy",
  ];

  const [studentAnswers, setStudentAnswers] = useState([
    "",
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

  const showAnswers = () => {
    setStudentAnswers(answers);

    setResult([true, true, true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setStudentAnswers(["", "", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width = "w-[170px]") => (
    <div className="relative inline-block">
      <input
        type="text"
        value={studentAnswers[i]}
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
      <div
        className="div-forall text-[17px]"
      >
        {/* TITLE */}
        <h5 className="header-title-page8 mb-8">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            K
          </span>
          Read and write.
        </h5>

        {/* WORD BOX */}
        <div className="flex justify-center mb-10">
          <div
            style={{
              border: "2px solid #7D3C98",

              borderRadius: "12px",

              padding: "12px 24px",
            }}
            className="grid grid-cols-4 gap-x-10 gap-y-2"
          >
            {words.map((word, index) => (
              <div key={index} className="text-center">
                {word}
              </div>
            ))}
          </div>
        </div>

        {/* TEXT */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2">
            <span>Which ride do you like at the</span>

            {inputField(0)}

            <span>that is close by?</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span>Is it the one that is as</span>

            {inputField(1)}

            <span>and</span>

            {inputField(2)}

            <span>as a fly?</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span>Which do you prefer, the</span>

            {inputField(3)}

            <span>or the Ferris wheel?</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {inputField(4)}

            <span>if we can first get a meal.</span>
          </div>

          <div>Would you like a ride that makes you shrill?</div>

          <div>
            Like the ones I think are scary but would give you a thrill?
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span>Do you like riding animals like the</span>

            {inputField(5)}

            <span>?</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span>Or do you like a</span>

            {inputField(6)}

            <span>of rides and shows that make you laugh?</span>
          </div>

          <div>Rides are funny and scary because they go up and down,</div>

          <div>They can make us laugh or frown like the clown.</div>

          <div className="flex flex-wrap items-center gap-2">
            <span>Whether you go on many rides or only a</span>

            {inputField(7)}

            <span>,</span>
          </div>

          <div>You’re always in for something fun to do!</div>
        </div>

        {/* IMAGE */}
        <div className="flex justify-center mt-10">
          <img
            src={img}
            alt=""
            style={{
              width: "380px",
              height: "auto",
              objectFit: "contain",
              marginBottom:"40px"
            }}
          />
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

export default WB_Unit2_Page14_Q1;
