import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit6_Page38_Q2 = () => {
  const answers = [
    "Would you like to go to the park?",

    "Would one o’clock be fine?",

    "Could you bring something light to eat at the picnic?",

    "I could bring some sandwiches and fruit.",

    "Should we bring our umbrellas just in case?",

    "might",
  ];

  const [studentAnswers, setStudentAnswers] = useState([
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

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    setStudentAnswers(["", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i, width) => (
    <div className="relative w-full">
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
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <h5 className="header-title-page8 mb-10">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            N
          </span>
          Read and write. Use modal verbs.
        </h5>

        {/* DIALOG */}

        <div className="flex flex-col gap-6 leading-normal">
          {/* 1 */}

          <div className="flex items-start gap-3">
            <span className="font-bold min-w-[55px]">Jeff:</span>

            <div className="flex items-center gap-2 flex-1">
              {inputField(0, "100%")}

              <span>?</span>
            </div>
          </div>

          {/* 2 */}

          <div className="flex items-start gap-3">
            <span className="font-bold min-w-[55px]">Sam:</span>

            <span>Yeah, sure. I’d love to. What time?</span>
          </div>

          {/* 3 */}

          <div className="flex items-start gap-3">
            <span className="font-bold min-w-[55px]">Jeff:</span>

            <div className="flex items-center gap-2 flex-1">
              {inputField(1, "100%")}

              <span>?</span>
            </div>
          </div>

          {/* 4 */}

          <div className="flex items-start gap-3">
            <span className="font-bold min-w-[55px]">Sam:</span>

            <span>Yes, it would be a good time.</span>
          </div>

          {/* 5 */}

          <div className="flex items-start gap-3">
            <span className="font-bold min-w-[55px]">Jeff:</span>

            <div className="flex items-center gap-2 flex-1">
              {inputField(2, "100%")}

              <span>?</span>
            </div>
          </div>

          {/* 6 */}

          <div className="flex items-start gap-3">
            <span className="font-bold min-w-[55px]">Sam:</span>

            <span>Okay. I could bring some snacks. What will you bring?</span>
          </div>

          {/* 7 */}

          <div className="flex items-start gap-3">
            <span className="font-bold min-w-[55px]">Jeff:</span>

            <div className="flex items-center gap-2 flex-1">
              {inputField(3, "100%")}

              <span>.</span>
            </div>
          </div>

          {/* 8 */}

          <div className="flex items-start gap-3">
            <span className="font-bold min-w-[55px]">Sam:</span>

            <div className="flex flex-col items-start flex-1">
              <span>That would be great.</span>

              <div className="flex items-center gap-2 w-full mt-1">
                {inputField(4, "100%")}

                <span>?</span>
              </div>
            </div>
          </div>

          {/* 9 */}

          <div className="flex items-start gap-3">
            <span className="font-bold min-w-[55px]">Sam:</span>

            <span>Yes, we should bring our umbrellas. It</span>
            <div className="flex items-center gap-2 flex-1">
              {inputField(5, "100%")}rain.

              <span>?</span>
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

export default WB_Unit6_Page38_Q2;
