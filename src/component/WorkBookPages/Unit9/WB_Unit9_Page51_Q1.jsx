import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGE
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U9/Page 51/Asset 8.svg";

const WB_Unit9_Page51_Q1 = () => {
  const inputRefs = useRef([]);
  const questions = [
    {
      prefix: "m",

      suffix: "g",

      answer: "owin",

      meaning: "= cutting (the grass) with a machine",
    },

    {
      prefix: "r",

      suffix: "",

      answer: "ush",

      meaning: "= to hurry",
    },

    {
      prefix: "c",

      suffix: "",

      answer: "lub",

      meaning: "= a small group that certain people join",
    },

    {
      prefix: "j",

      suffix: "",

      answer: "oin",

      meaning: "= to become part of something",
    },

    {
      parts: ["a", "input:ppoi", "nt", "input:men", "t"],
      answer: "ppoimen",
      meaning: "= a meeting set for a certain time and place",
    },
    {
      prefix: "s",

      suffix: "m",

      answer: "tadiu",

      meaning:
        "= a roofless building with many seats; it is used for sports events and concerts",
    },
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
      .replace(/\s+/g, "")
      .trim();

  // ------------------------
  // HANDLE INPUT
  // ------------------------

  const handleChange = (qIndex, value) => {
    if (locked || result[qIndex] === true) return;

    const updated = [...studentAnswers];

    updated[qIndex] = value;

    setStudentAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[qIndex] = undefined;

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
    setStudentAnswers(questions.map((q) => q.answer));

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
  // LETTER INPUTS
  // ------------------------

  const renderLetterInputs = (q, qIndex) => {
    let inputCounter = 0;

    const parts =
      q.parts || [q.prefix, `input:${q.answer}`, q.suffix].filter(Boolean);

    return (
      <div className="flex items-center flex-wrap gap-1">
        {parts.map((part, partIndex) => {
          if (!part.startsWith("input:")) {
            return <span key={partIndex}>{part}</span>;
          }

          const letters = part.replace("input:", "").split("");

          return letters.map((_, i) => {
            const letterIndex = inputCounter++;

            return (
              <div key={`${partIndex}-${i}`} className="relative">
                <input
                  ref={(el) => {
                    if (!inputRefs.current[qIndex])
                      inputRefs.current[qIndex] = [];
                    inputRefs.current[qIndex][letterIndex] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={studentAnswers[qIndex][letterIndex] || ""}
                  disabled={locked || result[qIndex] === true}
                  onChange={(e) => {
                    const value = e.target.value.toLowerCase();
                    if (!value) return;

                    const updated = [...q.answer].map(
                      (_, idx) => studentAnswers[qIndex][idx] || "",
                    );

                    updated[letterIndex] = value;
                    handleChange(qIndex, updated.join(""));

                    const nextInput =
                      inputRefs.current[qIndex]?.[letterIndex + 1];

                    if (nextInput) {
                      nextInput.focus();
                      nextInput.select();
                    }
                  }}
                  onFocus={(e) => e.target.select()}
                  className={`
                  w-[22px] border-0 border-b outline-none bg-transparent
                  text-center text-[18px] text-[#6D2980] font-semibold
                  ${
                    result[qIndex] === false
                      ? "border-[#D1232A]"
                      : "border-black"
                  }
                `}
                />

                {letterIndex === q.answer.length - 1 &&
                  result[qIndex] === false && (
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
          });
        })}
      </div>
    );
  };
  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <h5 className="header-title-page8 mb-[8vh]">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            A
          </span>
          Read and write the missing letters.
        </h5>

        {/* CONTENT */}

        <div className="flex  items-start ">
          {/* LEFT */}

          <div className="flex-1 flex flex-col gap-12">
            {questions.map((q, index) => (
              <div key={index}>
                <div className="flex items-start gap-4">
                  {/* NUMBER */}

                  <span className="font-bold">{index + 1}</span>

                  {/* WORD */}

                  <div className="leading-[1.8]">
                    <div className="flex items-center gap-2 flex-wrap">
                      {renderLetterInputs(q, index)}

                      <span>{q.meaning}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* IMAGE */}
          <div className="-ml-100">
            {" "}
            <img
              src={img1}
              alt=""
              style={{
                width: "250px",
                height: "auto",
                objectFit: "contain",
              }}
            />
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

export default WB_Unit9_Page51_Q1;
