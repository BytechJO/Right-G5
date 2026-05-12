import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

const Unit6_Page2_ComprehensionA = () => {
  // =========================
  // CORRECT ANSWERS
  // =========================
  const correctAnswers = [
    ["can go", "can", "can’t go"],
    ["would love", "would", "wouldn’t love"],
    ["shall go", "shall", "shan’t go"],
    ["could believe", "could", "couldn’t believe"],
    ["might be", "might", "mightn’t be"],
  ];

  // =========================
  // INITIAL TABLE DATA
  // fixed = ثابت
  // input = انبوت
  // =========================
  const initialData = [
    [
      { type: "fixed", value: "can go" },
      { type: "fixed", value: "can" },
      { type: "fixed", value: "can’t go" },
    ],

    [
      { type: "fixed", value: "would love" },
      { type: "input", value: "" },
      { type: "input", value: "" },
    ],

    [
      { type: "fixed", value: "shall go" },
      { type: "input", value: "" },
      { type: "input", value: "" },
    ],

    [
      { type: "input", value: "" },
      { type: "input", value: "" },
      { type: "fixed", value: "couldn’t believe" },
    ],

    [
      { type: "fixed", value: "might be" },
      { type: "input", value: "" },
      { type: "input", value: "" },
    ],
  ];

  // =========================
  // STATES
  // =========================
  const [answers, setAnswers] = useState(initialData);

  const [errors, setErrors] = useState([
    [false, false, false],
    [false, false, false],
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ]);

  const [lockedInputs, setLockedInputs] = useState([
    [true, true, true],
    [false, false, false],
    [false, false, false],
    [false, false, true],
    [false, false, false],
  ]);

  const [locked, setLocked] = useState(false);

  // =========================
  // NORMALIZE
  // =========================
  const normalize = (text) => {
    return (
      text
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ")
        .replace(/[?.]/g, "")

        // contractions
        .replace(/can’t/g, "cannot")
        .replace(/can't/g, "cannot")

        .replace(/won’t/g, "will not")
        .replace(/won't/g, "will not")

        .replace(/shan’t/g, "shall not")
        .replace(/shan't/g, "shall not")

        .replace(/n’t/g, " not")
    );
  };

  // =========================
  // UPDATE INPUT
  // =========================
  const updateAnswer = (rowIndex, cellIndex, value) => {
    const updated = [...answers];

    updated[rowIndex][cellIndex].value = value;

    setAnswers(updated);

    // remove error instantly
    const updatedErrors = [...errors];

    updatedErrors[rowIndex][cellIndex] = false;

    setErrors(updatedErrors);
  };

  // =========================
  // CHECK ANSWERS
  // =========================
  const handleCheck = () => {
    if (locked) return;

    const isEmpty = answers.some((row) =>
      row.some((cell) => cell.type === "input" && normalize(cell.value) === ""),
    );

    if (isEmpty) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let score = 0;
    let total = 0;

    const newErrors = answers.map((row, rowIndex) =>
      row.map((cell, cellIndex) => {
        if (cell.type === "fixed") return false;

        total++;

        const isCorrect =
          normalize(cell.value) ===
          normalize(correctAnswers[rowIndex][cellIndex]);

        if (isCorrect) score++;

        return !isCorrect;
      }),
    );

    const updatedLocked = lockedInputs.map((row, rowIndex) =>
      row.map((lockedCell, cellIndex) => {
        if (answers[rowIndex][cellIndex].type === "fixed") return true;

        const isCorrect =
          normalize(answers[rowIndex][cellIndex].value) ===
          normalize(correctAnswers[rowIndex][cellIndex]);

        return lockedCell || isCorrect;
      }),
    );

    setErrors(newErrors);
    setLockedInputs(updatedLocked);

    if (score === total) {
      setLocked(true);
    }

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${score} / ${total}
      </span>
    </div>
  `;

    if (score === total) {
      ValidationAlert.success(msg);
    } else if (score === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // =========================
  // SHOW ANSWERS
  // =========================
  const handleShow = () => {
    const filledAnswers = answers.map((row, rowIndex) =>
      row.map((cell, cellIndex) => ({
        ...cell,
        value: correctAnswers[rowIndex][cellIndex],
      })),
    );

    setAnswers(filledAnswers);

    setErrors([
      [false, false, false],
      [false, false, false],
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ]);

    setLocked(true);
  };

  // =========================
  // RESET
  // =========================
  const handleReset = () => {
    setAnswers(initialData);

    setErrors([
      [false, false, false],
      [false, false, false],
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ]);

    setLockedInputs([
      [true, true, true],
      [false, false, false],
      [false, false, false],
      [false, false, true],
      [false, false, false],
    ]);

    setLocked(false);
  };

  return (
    <div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-8 leading-normal">
        <span className="ex-A-read mr-2">A</span>
        Some verb phrases with modal verbs are underlined in the story above.
        <br />
        Write the verb phrase, then the modal verb, and then the negative form
        with a contraction.
      </h5>

      {/* TABLE */}
      <div className="border border-[#8b5fa8] mt-10">
        {/* HEADERS */}
        <div className="grid grid-cols-3 bg-[#f3eef7] border-b border-[#8b5fa8]">
          {["Verb Phrase", "Modal Verb", "Negative Phrase"].map((title, i) => (
            <div
              key={i}
              className={`p-3 font-bold text-[#5b3b74]
                ${i !== 2 ? "border-r border-[#8b5fa8]" : ""}
                `}
            >
              {title}
            </div>
          ))}
        </div>

        {/* ROWS */}
        {answers.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-3 border-b border-[#8b5fa8]"
          >
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className={`relative p-2 flex items-center
  ${cellIndex !== 2 ? "border-r border-[#8b5fa8]" : ""}
  `}
              >
                {/* FIXED TEXT */}
                {cell.type === "fixed" ? (
                  <div className="font-semibold text-black px-1 py-2">
                    {cell.value}
                  </div>
                ) : (
                  <>
                    {/* INPUT */}
                    <input
                      type="text"
                      value={cell.value}
                      placeholder="Write here.."
                      disabled={locked || lockedInputs[rowIndex][cellIndex]}
                      onChange={(e) =>
                        updateAnswer(rowIndex, cellIndex, e.target.value)
                      }
                      className={`w-full outline-none bg-transparent font-semibold px-1 placeholder:text-[#8b5fa8]
                      ${
                        lockedInputs[rowIndex][cellIndex]
                          ? "text-black"
                          : "text-[#5b3b74]"
                      }
                      `}
                    />

                    {/* ERROR */}
                    {errors[rowIndex][cellIndex] && (
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "10px",
                          transform: "translateY(-50%)",
                          width: "20px",
                          height: "20px",
                          background: "#ef4444",
                          color: "white",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: "bold",
                          border: "2px solid white",
                          boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                          pointerEvents: "none",
                          zIndex: 3,
                        }}
                      >
                        ✕
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* BUTTONS */}
      <div className="flex justify-center gap-6 mt-10">
        {/* RESET */}
        <div className="relative group">
          <div
            onClick={handleReset}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaRedo size={14} />
            </div>
          </div>

          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Reset
          </span>
        </div>

        {/* SHOW */}
        <div className="relative group">
          <div
            onClick={handleShow}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaEye size={14} />
            </div>
          </div>

          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Show Answer
          </span>
        </div>

        {/* CHECK */}
        <div className="relative group">
          <div
            onClick={handleCheck}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaCheck size={14} />
            </div>
          </div>

          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Check Answer
          </span>
        </div>
      </div>
    </div>
  );
};

export default Unit6_Page2_ComprehensionA;
