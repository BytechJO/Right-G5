import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGE
import boyImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U9/Page 54/Asset 3.svg";

const WB_Unit9_Page54_Q1 = () => {
  const answers = [
    "he will do well in the test",

    "He will eat a good breakfast",

    "he will have time to eat all of his breakfast",

    "if he wants to buy lunch at school",

    "If he wants lunch from home",

    "He will get his test results when he comes back next week.",

    "His dad will buy him roller skates.",
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
      .replace(/[-.?!,’',]/g, "")
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

  const inputField = (i, width = "350px") => (
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
            G
          </span>
          Read and write.
        </h5>

        {/* PARAGRAPH */}

        <div className="leading-[1.8] mb-10">
          Ben has a test tomorrow. If he studies today after school, he will do
          well on the test. He should sleep early if he wants to remember
          everything. He will eat a good breakfast when he wakes up in the
          morning. If he wakes up early, he will have time to eat all of his
          breakfast. His mother will give him some money if he wants to buy
          lunch at school. If he wants lunch from home, his mother will pack his
          lunch in the morning. He will take the test when all of the students
          are in class. He will get his test results when he comes back next
          week. Ben really hopes he does well on the test. If he gets an A, his
          dad will buy him roller skates. Ben is so excited that he can’t stop
          thinking about it. He will skate with his friends if he gets the
          roller skates.
        </div>

        {/* QUESTIONS */}

        <div className="flex flex-col gap-6 mb-6">
          {/* 1 */}

          {/* 1 */}

          <div className="flex items-end gap-3 w-full">
            <span className="font-bold shrink-0">1</span>

            <span className="shrink-0">If Ben studies today after school,</span>

            <div className="flex-1">{inputField(0, "100%")}</div>

            <span className="shrink-0">.</span>
          </div>

          {/* 2 */}

          <div className="flex items-end gap-3 w-full">
            <span className="font-bold shrink-0">2</span>

            <div className="flex-1">{inputField(1, "100%")}</div>

            <span className="shrink-0">when he wakes up in the morning.</span>
          </div>

          {/* 3 */}

          <div className="flex items-end gap-3 w-full">
            <span className="font-bold shrink-0">3</span>

            <span className="shrink-0">If he wakes up early,</span>

            <div className="flex-1">{inputField(2, "100%")}</div>

            <span className="shrink-0">.</span>
          </div>

          {/* 4 */}

          <div className="flex items-end gap-3 w-full">
            <span className="font-bold shrink-0">4</span>

            <span className="shrink-0">His mother will give him money</span>

            <div className="flex-1">{inputField(3, "100%")}</div>

            <span className="shrink-0">.</span>
          </div>

          {/* 5 */}

          <div className="flex items-end gap-3 w-full">
            <span className="font-bold shrink-0">5</span>

            <div className="flex-1">{inputField(4, "100%")}</div>

            <span className="shrink-0">
              , his mother will pack his lunch in the morning.
            </span>
          </div>

          {/* 6 */}

          <div className="flex items-end gap-3 w-full">
            <span className="font-bold shrink-0">6</span>

            <span className="shrink-0">
              When will Ben get his test results?
            </span>

            <div className="flex-1">{inputField(5, "100%")}</div>
          </div>

          {/* 7 */}

          <div className="flex items-end gap-3 w-full">
            <span className="font-bold shrink-0">7</span>

            <span className="shrink-0">
              What will happen if Ben gets an A on his test?
            </span>

            <div className="flex-1">{inputField(6, "100%")}</div>
          </div>
        </div>

        {/* IMAGE */}

        <img
          src={boyImg}
          alt=""
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
            marginBottom: 20,
          }}
        />
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

export default WB_Unit9_Page54_Q1;
