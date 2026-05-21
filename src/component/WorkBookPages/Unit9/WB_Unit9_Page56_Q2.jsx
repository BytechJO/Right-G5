import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit9_Page56_Q2 = () => {
  const wordBank = [
    "that’ll work",
    "rush",
    "appointment",
    "club",
    "join",
    "great news",
  ];

  const answers = [
    "join",
    "club",
    "appointment",
    "rush",
    "great news",
    "that’ll work",
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
      .replace(/[-.?!,’']/g, "")
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

  const inputField = (i, width = "140px") => (
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

        <h5 className="header-title-page8 mb-8">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            K
          </span>
          Read and write the correct words in the blanks.
        </h5>

        {/* CONTENT */}

        <div className="flex gap-10 items-start">
          {/* LEFT */}

          <div className="flex-1 leading-[1.7] flex flex-col gap-1">
            {/* LINE 1 */}

            <div className="flex items-end gap-3 w-full">
              <span className="shrink-0">When I</span>

              <div >{inputField(0, "100%")}</div>

              <span className="shrink-0">a</span>

              <div >{inputField(1, "100%")}</div>

              <span className="shrink-0">that is fun,</span>
            </div>

            <div> I must follow every rule.</div>

            <div>And be nice to everyone</div>

            <div>Just like I am in school.</div>

            <div className="h-3" />

            {/* LINE 2 */}

            <div className="flex items-end gap-3 w-full">
              <span className="shrink-0">When I have a club</span>

              <div className="flex-1">{inputField(2, "100%")}</div>

              <span className="shrink-0">,</span>
            </div>

            <div>I must come right on time.</div>

            <div>There will be disappointment,</div>

            <div>It’ll almost feel like a crime,</div>

            <div className="flex items-end gap-3 w-full">
              <span className="shrink-0">If I</span>

              <div className="flex-1">{inputField(3, "100%")}</div>

              <span className="shrink-0">in late for the meeting.</span>
            </div>

            <div>The other members would not be happy,</div>

            <div>And they might not give a welcome greeting.</div>

            <div className="h-3" />

            {/* LINE 3 */}

            <div className="flex items-end gap-3 w-full">
              <span className="shrink-0">The</span>

              <div className="w-[170px]">{inputField(4, "100%")}</div>

              <span className="shrink-0">is that I can find a time</span>

              <div className="w-[170px]">{inputField(5, "100%")}</div>
            </div>

            <div>For you and for me!</div>
          </div>

          {/* RIGHT */}

          <div
            style={{
              border: "2px solid #6D2980",
              borderRadius: "10px",
              padding: "18px 28px",
              minWidth: "180px",
            }}
            className="
              flex
              flex-col
              gap-5
              text-[18px]
              mt-5
            "
          >
            {wordBank.map((word, index) => (
              <span key={index}>{word}</span>
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

export default WB_Unit9_Page56_Q2;
