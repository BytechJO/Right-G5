import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import img from "../../../assets/imgs/pages/workbook/Right Int WB G5 U3/Page 17/Asset 1.svg";
const WB_Unit3_Page16_Q1 = () => {
  const answers = [
    {
      line1: "is a teacher. She is kind and friendly. She enjoys teaching.",
    },

    {
      line1: "is a student. He is funny and cheerful.",

      line2: "He is very kind to his fellow students and teacher.",
    },

    {
      line1:
        "is also a student in the class. He has a cheerful and kind personality.",

      line2: "He is friendly with everyone.",
    },

    {
      line1: "is a hard working student. She is easy-going in class.",

      line2:
        "She has a thoughtful disposition. She is always kind about helping students who need it.",
    },

    {
      line1: "is funny and easy-going and is thoughtful in everything he does.",

      line2: "He is always friendly.",
    },

    {
      line1:
        "is a cheerful and kind kindergarten teacher. She is cheerful and easy-going person.",

      line2: "She is friendly and kind.",
    },
  ];

  const [studentAnswers, setStudentAnswers] = useState([
    {
      line1: "",
    },

    {
      line1: "",
      line2: "",
    },

    {
      line1: "",
      line2: "",
    },

    {
      line1: "",
      line2: "",
    },

    {
      line1: "",
      line2: "",
    },

    {
      line1: "",
      line2: "",
    },
  ]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleChange = (i, line, value) => {
    if (locked || result[i] === true) return;

    const updated = [...studentAnswers];

    updated[i][line] = value;

    setStudentAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = studentAnswers
      .slice(1)
      .some((answer) => Object.values(answer).some((v) => !v.trim()));

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = studentAnswers.map((answer, i) => {
      const expected = answers[i];

      // السؤال الأول
      if (i === 0) {
        const ok = normalize(answer.line1) === normalize(expected.line1);

        if (ok) correctCount++;

        return ok;
      }

      // باقي الأسئلة
      const line1Ok = normalize(answer.line1) === normalize(expected.line1);

      const line2Ok = normalize(answer.line2) === normalize(expected.line2);

      const ok = line1Ok && line2Ok;

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = 6;

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

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setStudentAnswers([
      {
        line1: "",
      },

      {
        line1: "",
        line2: "",
      },

      {
        line1: "",
        line2: "",
      },

      {
        line1: "",
        line2: "",
      },

      {
        line1: "",
        line2: "",
      },

      {
        line1: "",
        line2: "",
      },
    ]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, lines = 1) => (
    <div className="relative w-full">
      <div className="flex flex-col gap-5">
        {/* line 1 */}
        <input
          type="text"
          value={studentAnswers[i].line1}
          disabled={locked || result[i] === true}
          onChange={(e) => handleChange(i, "line1", e.target.value)}
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

        {/* line 2 */}
        {lines === 2 && (
          <input
            type="text"
            value={studentAnswers[i].line2}
            disabled={locked || result[i] === true}
            onChange={(e) => handleChange(i, "line2", e.target.value)}
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
        )}
      </div>

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
      <div className="div-forall text-[18px]">
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
          Read the chart, then write sentences about each of the people. Use
          linking verbs.
        </h5>

        {/* TABLE IMAGE */}
        <div className="flex justify-center mb-10">
          <img
            src={img}
            alt=""
            style={{
              width: "auto",
              height: "400px",
              objectFit: "contain",
            }}
          />
        </div>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-8 mb-10">
          {/* 1 */}
          <div>
            <div className="flex items-start gap-3">
              <span className="font-bold">1</span>

              <span>Mary</span>

              <div className="flex-1">{inputField(0, 1)}</div>
            </div>
          </div>

          {/* 2 */}
          <div>
            <div className="flex items-start gap-3">
              <span className="font-bold">2</span>

              <span>Richard</span>

              <div className="flex-1">{inputField(1, 2)}</div>
            </div>
          </div>

          {/* 3 */}
          <div>
            <div className="flex items-start gap-3">
              <span className="font-bold">3</span>

              <span>Evan</span>

              <div className="flex-1">{inputField(2, 2)}</div>
            </div>
          </div>

          {/* 4 */}
          <div>
            <div className="flex items-start gap-3">
              <span className="font-bold">4</span>

              <span>Claire</span>

              <div className="flex-1">{inputField(3, 2)}</div>
            </div>
          </div>

          {/* 5 */}
          <div>
            <div className="flex items-start gap-3">
              <span className="font-bold">5</span>

              <span>Robert</span>

              <div className="flex-1">{inputField(4, 2)}</div>
            </div>
          </div>

          {/* 6 */}
          <div>
            <div className="flex items-start gap-3">
              <span className="font-bold">6</span>

              <span>Pat</span>

              <div className="flex-1">{inputField(5, 2)}</div>
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

export default WB_Unit3_Page16_Q1;
