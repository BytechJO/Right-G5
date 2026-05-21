import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit10_Page60_Q2 = () => {
  const questions = [
    {
      left: "huh?",

      answer: "c",
    },

    {
      left: "That’s a good point!",

      answer: "d",
    },

    {
      left: "It’s your turn.",

      answer: "b",
    },

    {
      left: "a long way to go",

      answer: "a",
    },
  ];

  const meanings = [
    {
      letter: "a",

      text: "if something is far off, it will take ________",
    },

    {
      letter: "b",

      text: "what someone says when it’s time for the next person to go",
    },

    {
      letter: "c",

      text: "what someone says when they don’t understand something or didn’t hear",
    },

    {
      letter: "d",

      text: "telling someone that what they said is smart/correct",
    },
  ];

  const [studentAnswers, setStudentAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) => str.toLowerCase().trim();

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

    if (studentAnswers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = studentAnswers.map((answer, i) => {
      const ok = normalize(answer) === normalize(questions[i].answer);

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

  // ------------------------
  // SHOW ANSWERS
  // ------------------------

  const showAnswers = () => {
    setStudentAnswers(["c", "d", "b", "a"]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    setStudentAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const matchInput = (i) => (
    <div className="relative inline-block">
      <input
        type="text"
        maxLength={1}
        value={studentAnswers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          w-[45px]
          border-0
          border-b
          outline-none
          bg-transparent
          text-center
          text-[20px]
          text-[#6D2980]
          font-semibold

          ${result[i] === false ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-10px",
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

        <h5 className="header-title-page8 mb-[14vh]">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            I
          </span>
          Match.
        </h5>

        {/* CONTENT */}

        {/* CONTENT */}

        <div className="grid grid-cols-2 gap-x-16 gap-y-10">
          {questions.map((q, index) => (
            <React.Fragment key={index}>
              {/* LEFT */}

              <div
                className="
          flex
          items-start
          gap-5
        "
              >
                {/* INPUT */}

                {matchInput(index)}

                {/* NUMBER */}

                <span className="font-bold">{index + 1}</span>

                {/* TEXT */}

                <span className="leading-[1.7]">{q.left}</span>
              </div>

              {/* RIGHT */}

              <div
                className="
          flex
          items-start
          gap-4
        "
              >
                {/* LETTER */}

                <span className="font-bold">{meanings[index].letter}</span>

                {/* TEXT */}

                <span className="leading-[1.7]">{meanings[index].text}</span>
              </div>
            </React.Fragment>
          ))}
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

export default WB_Unit10_Page60_Q2;
