import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit8_Page46_Q1 = () => {
  const answers = [
    "everyone",
    "everybody",
    "everything",
    "anybody",
    "anyone",
    "anything",
    "no one",
    "nobody",
    "nothing",
    "someone",
    "somebody",
    "something",
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

    const normalizedCorrect = answers.map(normalize);

    const usedAnswers = [];

    const newResults = studentAnswers.map((answer) => {
      const normalizedStudent = normalize(answer);

      const foundIndex = normalizedCorrect.findIndex(
        (correct, index) =>
          correct === normalizedStudent && !usedAnswers.includes(index),
      );

      const ok = foundIndex !== -1;

      if (ok) {
        usedAnswers.push(foundIndex);

        correctCount++;
      }

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

    setResult([
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    setStudentAnswers(["", "", "", "", "", "", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i) => (
    <div className="relative w-full">
      <input
        type="text"
        value={studentAnswers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          w-full
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
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <div className="header-title-page8 mb-[12vh]">
          <span className="ex-A mr-2">C</span>
          <div style={{ display: "block" }}>
            write <span className="text-[#00AEEF]">indefinite pronouns </span>by
            putting the words together. You
            <div style={{ marginTop: "4px" }}>
              can use the words more than once.
            </div>
          </div>
        </div>
        {/* CONTENT */}

        <div className="grid grid-cols-[300px_1fr] gap-10">
          {/* LEFT SIDE */}

          <div className="flex items-center gap-4">
            {/* COLUMN 1 */}

            <div className="flex flex-col gap-10">
              {["every", "any", "no", "some"].map((word, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center"
                  style={{
                    width: "100px",
                    height: "40px",
                    border: "2px solid #6D2980",
                    borderRadius: "12px",
                    fontSize: "18px",
                  }}
                >
                  {word}
                </div>
              ))}
            </div>

            {/* PLUS */}

            <div
              className="font-bold"
              style={{
                fontSize: "45px",
                marginTop: "-10px",
              }}
            >
              +
            </div>

            {/* COLUMN 2 */}

            <div className="flex flex-col gap-10">
              {["one", "body", "thing"].map((word, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center"
                  style={{
                    width: "100px",
                    height: "40px",
                    border: "2px solid #6D2980",
                    borderRadius: "12px",
                    fontSize: "18px",
                  }}
                >
                  {word}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="grid grid-cols-2 gap-x-10 gap-y-10">
            {studentAnswers.map((_, index) => (
              <div key={index}>{inputField(index)}</div>
            ))}
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

export default WB_Unit8_Page46_Q1;
