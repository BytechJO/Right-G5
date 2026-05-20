import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

import trueImg from "../../../assets/imgs/true.svg";
import flaseImg from "../../../assets/imgs/false.svg";

const WB_Unit7_Page41_Q1 = () => {
  const [fieldResults, setFieldResults] = useState([
    { q1: undefined, q2: undefined },
    { q1: undefined, q2: undefined },
    { q1: undefined, q2: undefined },
    { q1: undefined, q2: undefined },
  ]);
  const questions = [
    {
      scrambled: "the school going to are children",

      answer1: "Are the children going to school?",

      answer2: "Yes, they are.",

      correct: true,
    },

    {
      scrambled: "garden the blooming flowers in the are",

      answer1: "Are the flowers in the garden blooming?",

      answer2: "No, they aren’t.",

      correct: false,
    },

    {
      scrambled: "their the students are books reading",

      answer1: "Are the students reading their books?",

      answer2: "Yes, they are.",

      correct: true,
    },

    {
      scrambled: "boys the their eating are breakfast",

      answer1: "Are the boys eating their breakfast?",

      answer2: "No, they aren’t.",

      correct: false,
    },
  ];

  const [studentAnswers, setStudentAnswers] = useState([
    {
      q1: "",
      q2: "",
    },

    {
      q1: "",
      q2: "",
    },

    {
      q1: "",
      q2: "",
    },

    {
      q1: "",
      q2: "",
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

  // ------------------------
  // HANDLE INPUT
  // ------------------------

  const handleChange = (index, field, value) => {
    if (locked || result[index] === true) return;

    const updated = [...studentAnswers];

    updated[index][field] = value;

    setStudentAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[index] = undefined;

      return copy;
    });
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = studentAnswers.some((q) => !q.q1.trim() || !q.q2.trim());

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = [];
    const newFieldResults = [];

    studentAnswers.forEach((answer, i) => {
      const ok1 = normalize(answer.q1) === normalize(questions[i].answer1);

      const ok2 = normalize(answer.q2) === normalize(questions[i].answer2);

      newFieldResults.push({
        q1: ok1,
        q2: ok2,
      });

      const final = ok1 && ok2;

      if (final) correctCount++;

      newResults.push(final);
    });

    setResult(newResults);
    setFieldResults(newFieldResults);

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
    setStudentAnswers([
      {
        q1: questions[0].answer1,

        q2: questions[0].answer2,
      },

      {
        q1: questions[1].answer1,

        q2: questions[1].answer2,
      },

      {
        q1: questions[2].answer1,

        q2: questions[2].answer2,
      },

      {
        q1: questions[3].answer1,

        q2: questions[3].answer2,
      },
    ]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    setStudentAnswers([
      {
        q1: "",
        q2: "",
      },

      {
        q1: "",
        q2: "",
      },

      {
        q1: "",
        q2: "",
      },

      {
        q1: "",
        q2: "",
      },
    ]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (index, field, width) => (
    <div className="relative inline-block">
      <input
        type="text"
        value={studentAnswers[index][field]}
        disabled={locked || result[index] === true}
        onChange={(e) => handleChange(index, field, e.target.value)}
        className={`
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6D2980]
          font-semibold
          px-1

          ${
            fieldResults[index]?.[field] === false
              ? "border-[#D1232A]"
              : "border-black"
          }
        `}
        style={{
          width,
        }}
      />
      {fieldResults[index]?.[field] === false && (
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
            E
          </span>
          Unscramble and write. Then answer with
          <span className="text-[#00AEEF]"> “Yes, they are.”</span> or
          <span className="text-[#00AEEF]"> “No, they aren’t.”</span>
        </h5>

        {/* QUESTIONS */}

        <div className="flex flex-col gap-4">
          {questions.map((q, index) => (
            <div key={index}>
              {/* SCRAMBLED */}

              <div className="flex items-center gap-3 mb-3">
                <span className="font-bold">{index + 1}</span>

                <span>{q.scrambled}</span>
              </div>

              {/* ANSWER AREA */}

              <div className="flex items-start gap-4 ml-4">
                {/* SVG */}

                <img
                  src={q.correct ? trueImg : flaseImg}
                  alt=""
                  style={{
                    width: "34px",
                    height: "34px",
                    marginTop: "32px",
                    border: "2px solid #6D2980",
                    borderRadius: "6px",
                    padding: "4px",
                  }}
                />

                {/* INPUTS */}

                <div className="flex flex-col gap-3 w-full">
                  {/* Q1 */}

                  <div className="flex items-end gap-2">
                    {inputField(index, "q1", "620px")}

                    <span>?</span>
                  </div>

                  {/* Q2 */}

                  <div>
                    {inputField(index, "q2", "620px")}

                    <span>.</span>
                  </div>
                </div>
              </div>
            </div>
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

export default WB_Unit7_Page41_Q1;
