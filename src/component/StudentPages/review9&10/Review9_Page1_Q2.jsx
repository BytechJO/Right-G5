import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Review9_Page1_Q2 = () => {
  const questions = [
    "join",
    "great news",
    "I’d love to have you",
    "right over",
    "that’ll work",
    "see how it goes",
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
      "join",
      "great news",
      "I’d love to have you",
      "right over",
      "that’ll work",
      "see how it goes",
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
    <span className="relative inline-block">
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
    </span>
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div
        className="div-forall"
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* TITLE */}
        <h5 className="header-title-page8">
          <span
            style={{
              marginRight: "10px",
            }}
          >
            B
          </span>
          What’s my line? Put in the correct expression to complete the
          dialogues.
        </h5>

        {/* WORD BOX */}
        <div
          style={{
            background: "#E9E1EC",
            borderRadius: "16px",
            padding: "10px 30px",
            display: "grid",
            gridTemplateColumns: "repeat(3, auto)",
            margin: "0 auto",
            gap: "18px 40px",
            width: "690px",
            marginBottom: "30px",
            fontSize: "17px",
            justifyContent: "center",
          }}
        >
          <span>I’d love to have you</span>

          <span>right over</span>

          <span>great news</span>

          <span>join</span>

          <span>that’ll work</span>

          <span>see how it goes</span>
        </div>

        {/* DIALOGUES */}
        <div className="flex flex-col gap-5 mb-10  w-[110%]">
          {/* FIRST DIALOGUE */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center flex-wrap gap-2 text-[18px]">
              <span className="text-[#12A5F4] font-medium">Sandy:</span>

              <span>Hey, I’m going to</span>

              {inputField(0, "w-[180px]")}

              <span>a fitness center.</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[18px] leading-normal">
              <span className="text-[#FF8A00] font-medium">Nancy:</span>

              <span>That’s</span>

              {inputField(1, "w-[170px]")}

              <span>!</span>

              {inputField(2, "w-[260px]")}

              <span>
                come to the one where I exercise, if that’s not too far for you.
              </span>
            </div>
          </div>

          {/* STARS */}
          <div
            className="text-center text-[18px] tracking-[2px]"
            style={{
              fontWeight: "600",
            }}
          >
            ********************************
          </div>

          {/* SECOND DIALOGUE */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center flex-wrap gap-2 text-[18px]">
              <span className="text-[#12A5F4] font-medium">Steve:</span>

              <span>I just finished studying, so I’m coming</span>

              {inputField(3, "w-[180px]")}

              <span>now. Is that still okay?</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[18px] leading-normal">
              <span className="text-[#FF8A00] font-medium">Henry:</span>

              <span>Sure,</span>

              {inputField(4, "w-[170px]")}

              <span>
                . I’m not sure about swimming because my dad is cleaning the
                pool right now, but we’ll
              </span>

              {inputField(5, "w-[200px]")}

              <span>.</span>
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

export default Review9_Page1_Q2;
