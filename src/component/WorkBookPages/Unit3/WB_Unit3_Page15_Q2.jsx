import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit3_Page15_Q2 = () => {
  const answers = ["taste funny", "No way", "try some", "That sounds good"];

  const words = ["No way", "taste funny", "That sounds good", "try some"];

  const [studentAnswers, setStudentAnswers] = useState(["", "", "", ""]);

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

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setStudentAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width = "w-[180px]") => (
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
        className="div-forall text-[18px]"
      >
        {/* TITLE */}
        <h5 className="header-title-page8 mb-6">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            B
          </span>
          Read and write.
        </h5>

        {/* WORD BOX */}
        <div className="flex justify-center mb-8">
          <div
            style={{
              border: "2px solid #7D3C98",

              borderRadius: "10px",

              padding: "8px 20px",

              width: "fit-content",
            }}
            className="flex flex-wrap justify-center gap-x-10 gap-y-2"
          >
            {words.map((word, index) => (
              <span key={index}>{word}</span>
            ))}
          </div>
        </div>

        {/* DIALOG */}
        <div className="flex flex-col gap-5">
          <div>
            <span className="font-bold">Henry:</span> What kind of ice cream
            sundae would you like?
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold">Holly:</span>

            <span>
              That sounds interesting. What’s an ice cream sundae? Does it
            </span>

            {inputField(0)}

            <span>?</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold">Henry:</span>

            <span>(surprised)</span>

            {inputField(1)}

            <span>! You really don’t know what ice cream sundaes are?</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span>You should</span>

            {inputField(2)}

            <span>
              of these! They’re a variety of different flavors of ice cream with
              syrups, toppings, fruit, and whipped cream in one dessert.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold">Holly:</span>

            {inputField(3)}

            <span>. What types of fruit do you use?</span>
          </div>

          <div>
            <span className="font-bold">Henry:</span> We use what is usually in
            season. Do you like bananas, kiwis, or oranges?
          </div>

          <div>
            <span className="font-bold">Holly:</span> I’ll take bananas,
            chocolate syrup, and vanilla ice cream. Thank you.
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

export default WB_Unit3_Page15_Q2;
