import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit1_Page4_Q1 = () => {
  const questions = [
    "pillow",
    "fell asleep",
    "on one side",
    "face",
    "reviewing",
    "figure",
    "mirror",
    "Uh-oh",
    "actually",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", "", "", "", ""]);

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
      "pillow",
      "fell asleep",
      "on one side",
      "face",
      "reviewing",
      "figure",
      "mirror",
      "Uh-oh",
      "actually",
    ]);

    setResult([true, true, true, true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", "", "", "", "", ""]);

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
          text-[17px]
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

  const wordBox = (word) => (
    <div
      style={{
        border: "2px solid #7D3C98",
        borderRadius: "12px",
        padding: "8px 20px",
        fontSize: "17px",
        minWidth: "120px",
        textAlign: "center",
      }}
    >
      {word}
    </div>
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-8">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            C
          </span>
          Read and write.
        </h5>

        {/* WORD BOXES */}
        <div className="flex flex-wrap justify-center gap-4 mb-7">
          {wordBox("face")}
          {wordBox("actually")}
          {wordBox("on one side")}
          {wordBox("mirror")}
          {wordBox("reviewing")}
          {wordBox("uh-oh")}
          {wordBox("fell asleep")}
          {wordBox("pillow")}
          {wordBox("figure")}
        </div>

        {/* STORY */}
        <div className=" text-[17px] leading-[2.2] mb-7">
          <div className="flex flex-wrap items-center gap-2 ">
            <span>I rested my head on my fluffy</span>

            {inputField(0, "w-[170px]")}

            <span>and</span>

            {inputField(1, "w-[170px]")}

            <span>,</span>
          </div>

          <div>Only to wake up to a voice so deep,</div>

          <div className="flex flex-wrap items-center gap-2">
            <span>It was a man with a scar</span>

            {inputField(2, "w-[170px]")}

            <span>of his</span>

            {inputField(3, "w-[140px]")}

            <span>,</span>
          </div>

          <div>The other side was covered with lace.</div>

          <div>“Who are you?” I asked with fear.</div>

          <div>He replied, “I came to help you here.</div>

          <div className="flex flex-wrap items-center gap-2">
            <span>I saw you</span>

            {inputField(4, "w-[170px]")}

            <span>your textbook in school.</span>
          </div>

          <div>I came to give you the right tool,</div>

          <div className="flex flex-wrap items-center gap-2">
            <span>To</span>

            {inputField(5, "w-[150px]")}

            <span>the answers to the questions,</span>
          </div>

          <div>That might be on your examinations.”</div>

          <div className="flex flex-wrap items-center gap-2">
            <span>I said, “But look at your face in the</span>

            {inputField(6, "w-[170px]")}

            <span>.</span>
          </div>

          <div>That’s not a face of a teacher.”</div>

          <div className="flex flex-wrap items-center gap-2">
            <span>He said, “</span>

            {inputField(7, "w-[140px]")}

            <span>! I was at a monster party last night.</span>
          </div>

          <div>I’m sorry if I had given you a fright.</div>

          <div className="flex flex-wrap items-center gap-2">
            <span>I</span>

            {inputField(8, "w-[170px]")}

            <span>thought I was prepared,</span>
          </div>

          <div>I did not mean to make you scared!”</div>
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

export default WB_Unit1_Page4_Q1;
