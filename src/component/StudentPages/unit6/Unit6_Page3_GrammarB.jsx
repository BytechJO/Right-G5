import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

const Unit6_Page3_GrammarB = () => {
  const correctAnswers = [
    {
      full: "Can we go to the park?",
    },

    {
      part1: "Shall",
      part2: "to the",
    },

    {
      part1: "could go to the",
    },

    {
      part1: "might",
    },

    {
      part1: "I may go to the",
    },
  ];

  const [answers, setAnswers] = useState([
    {
      full: "",
    },

    {
      part1: "",
      part2: "",
    },

    {
      part1: "",
    },

    {
      part1: "",
    },

    {
      part1: "",
    },
  ]);

  const [errors, setErrors] = useState([false, false, false, false, false]);

  const [correctLocked, setCorrectLocked] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [locked, setLocked] = useState(false);

  // normalize
  const normalize = (text) => {
    return text.trim().toLowerCase().replace(/\s+/g, " ").replace(/[?.]/g, "");
  };

  // update
  const updateAnswer = (index, value) => {
    const updated = [...answers];

    updated[index] = value;

    setAnswers(updated);

    const updatedErrors = [...errors];

    updatedErrors[index] = false;

    setErrors(updatedErrors);
  };

  // check
  const handleCheck = () => {
    if (locked) return;

    const isEmpty =
      normalize(answers[0].full) === "" ||
      normalize(answers[1].part1) === "" ||
      normalize(answers[1].part2) === "" ||
      normalize(answers[2].part1) === "" ||
      normalize(answers[3].part1) === "" ||
      normalize(answers[4].part1) === "";

    if (isEmpty) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let score = 0;

    const newErrors = [
      normalize(answers[0].full) !== normalize(correctAnswers[0].full),

      !(
        normalize(answers[1].part1) === normalize(correctAnswers[1].part1) &&
        normalize(answers[1].part2) === normalize(correctAnswers[1].part2)
      ),

      normalize(answers[2].part1) !== normalize(correctAnswers[2].part1),

      normalize(answers[3].part1) !== normalize(correctAnswers[3].part1),

      normalize(answers[4].part1) !== normalize(correctAnswers[4].part1),
    ];

    newErrors.forEach((e) => {
      if (!e) score++;
    });

    const newLocked = newErrors.map((e) => !e);

    setErrors(newErrors);

    setCorrectLocked(newLocked);

    const total = 5;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${score} / ${total}
        </span>
      </div>
    `;

    if (score === total) {
      setLocked(true);

      ValidationAlert.success(msg);
    } else if (score === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // show
  const handleShow = () => {
    setAnswers(correctAnswers);

    setErrors([false, false, false, false, false]);

    setCorrectLocked([true, true, true, true, true]);

    setLocked(true);
  };

  // reset
  const handleReset = () => {
    setAnswers([
      {
        full: "",
      },

      {
        part1: "",
        part2: "",
      },

      {
        part1: "",
      },

      {
        part1: "",
      },

      {
        part1: "",
      },
    ]);

    setErrors([false, false, false, false, false]);

    setCorrectLocked([false, false, false, false, false]);

    setLocked(false);
  };

  return (
    <div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-10">
        <span className="ex-A-read mr-2">B</span>
        Read and write, using the modal verb shown.
      </h5>

      {/* QUESTIONS */}
      <div className="space-y-8 text-[18px] mt-10">
        {/* 1 */}
        <div className="flex items-center gap-4">
          <span className="font-bold">1</span>

          <div className="relative flex-1">
            <input
              type="text"
              value={answers[0].full}
              disabled={locked || correctLocked[0]}
              onChange={(e) =>
                updateAnswer(0, {
                  full: e.target.value,
                })
              }
              className={`border-b outline-none w-full text-[#6D2980] font-semibold px-2 bg-transparent
              ${errors[0] ? "border-red-500" : "border-black"}
              `}
            />

            {/* ❌ */}
            {errors[0] && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "0px",
                  transform: "translateY(-50%)",
                  width: "22px",
                  height: "22px",
                  background: "#ef4444",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  border: "2px solid white",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                }}
              >
                ✕
              </div>
            )}
          </div>

          <span className="text-[#1ea7ff]">(can)</span>
        </div>

        {/* 2 */}
        <div className="flex items-center gap-3">
          <span className="font-bold">2</span>

          <div className="flex items-center flex-1 gap-2 relative">
            {/* first blank */}
            <input
              type="text"
              value={answers[1].part1}
              disabled={locked || correctLocked[1]}
              onChange={(e) =>
                updateAnswer(1, {
                  ...answers[1],
                  part1: e.target.value,
                })
              }
              className={`border-b outline-none w-[180px] text-[#6D2980] font-semibold px-2 bg-transparent
              ${errors[1] ? "border-red-500" : "border-black"}
              `}
            />

            <span>we go</span>

            {/* second blank */}
            <input
              type="text"
              value={answers[1].part2}
              disabled={locked || correctLocked[1]}
              onChange={(e) =>
                updateAnswer(1, {
                  ...answers[1],
                  part2: e.target.value,
                })
              }
              className={`border-b outline-none flex-1 text-[#6D2980] font-semibold px-2 bg-transparent
              ${errors[1] ? "border-red-500" : "border-black"}
              `}
            />

            <span>bakery?</span>

            {/* ❌ */}
            {errors[1] && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "70px",
                  transform: "translateY(-50%)",
                  width: "22px",
                  height: "22px",
                  background: "#ef4444",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  border: "2px solid white",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                }}
              >
                ✕
              </div>
            )}
          </div>

          <span className="text-[#1ea7ff]">(shall)</span>
        </div>

        {/* 3 */}
        <div className="flex items-center gap-3">
          <span className="font-bold">3</span>

          <span>I</span>

          <div className="relative flex-1">
            <input
              type="text"
              value={answers[2].part1}
              disabled={locked || correctLocked[2]}
              onChange={(e) =>
                updateAnswer(2, {
                  part1: e.target.value,
                })
              }
              className={`border-b outline-none w-full text-[#6D2980] font-semibold px-2 bg-transparent
              ${errors[2] ? "border-red-500" : "border-black"}
              `}
            />

            {/* ❌ */}
            {errors[2] && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "0px",
                  transform: "translateY(-50%)",
                  width: "22px",
                  height: "22px",
                  background: "#ef4444",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  border: "2px solid white",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                }}
              >
                ✕
              </div>
            )}
          </div>

          <span>soccer match.</span>

          <span className="text-[#1ea7ff]">(could)</span>
        </div>

        {/* 4 */}
        <div className="flex items-center gap-3">
          <span className="font-bold">4</span>

          <span>I</span>

          <div className="relative flex-1">
            <input
              type="text"
              value={answers[3].part1}
              disabled={locked || correctLocked[3]}
              onChange={(e) =>
                updateAnswer(3, {
                  part1: e.target.value,
                })
              }
              className={`border-b outline-none w-full text-[#6D2980] font-semibold px-2 bg-transparent
              ${errors[3] ? "border-red-500" : "border-black"}
              `}
            />

            {/* ❌ */}
            {errors[3] && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "0px",
                  transform: "translateY(-50%)",
                  width: "22px",
                  height: "22px",
                  background: "#ef4444",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  border: "2px solid white",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                }}
              >
                ✕
              </div>
            )}
          </div>

          <span>go to the library today.</span>

          <span className="text-[#1ea7ff]">(might)</span>
        </div>

        {/* 5 */}
        <div className="flex items-center gap-3">
          <span className="font-bold">5</span>

          <div className="relative flex-1">
            <input
              type="text"
              value={answers[4].part1}
              disabled={locked || correctLocked[4]}
              onChange={(e) =>
                updateAnswer(4, {
                  part1: e.target.value,
                })
              }
              className={`border-b outline-none w-full text-[#6D2980] font-semibold px-2 bg-transparent
              ${errors[4] ? "border-red-500" : "border-black"}
              `}
            />

            {/* ❌ */}
            {errors[4] && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "0px",
                  transform: "translateY(-50%)",
                  width: "22px",
                  height: "22px",
                  background: "#ef4444",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  border: "2px solid white",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                }}
              >
                ✕
              </div>
            )}
          </div>

          <span>carnival.</span>

          <span className="text-[#1ea7ff]">(may)</span>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex justify-center gap-6 mt-10">
        {/* Reset */}
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

        {/* Show */}
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

        {/* Check */}
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

export default Unit6_Page3_GrammarB;
