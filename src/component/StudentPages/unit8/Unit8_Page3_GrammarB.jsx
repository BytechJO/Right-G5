import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

// left images
import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 66/SVG/Asset 6.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 66/SVG/Asset 7.svg";

// character + icon images
import boyCheck from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 66/SVG/Asset 23.svg";
import girlX from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 66/SVG/Asset 22.svg";

const Unit8_Page3_GrammarB = () => {
  const correctAnswers = [
    {
      question: "Did Harley see anyone at the lake?",
      answer: "Yes, he did see someone at the lake.",
    },

    {
      question: "Did Stella see someone rowing a boat?",
      answer: "No, she didn’t see anyone rowing a boat.",
    },
  ];

  const [answers, setAnswers] = useState([
    {
      question: "",
      answer: "",
    },

    {
      question: "",
      answer: "",
    },
  ]);

  const [errors, setErrors] = useState([
    {
      question: false,
      answer: false,
    },

    {
      question: false,
      answer: false,
    },
  ]);

  const [correctLocked, setCorrectLocked] = useState([
    {
      question: false,
      answer: false,
    },

    {
      question: false,
      answer: false,
    },
  ]);

  const [locked, setLocked] = useState(false);

  // normalize
  const normalize = (text) => {
    return text
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/[?.]/g, "")
      .replace(/[’']/g, "");
  };

  // update
  const updateAnswer = (index, field, value) => {
    const updated = [...answers];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setAnswers(updated);

    const updatedErrors = [...errors];

    updatedErrors[index] = {
      ...updatedErrors[index],
      [field]: false,
    };

    setErrors(updatedErrors);
  };

  // check
  // check
  const handleCheck = () => {
    if (locked) return;

    const isEmpty = answers.some(
      (item) =>
        normalize(item.question) === "" || normalize(item.answer) === "",
    );

    if (isEmpty) {
      ValidationAlert.info("Please complete all fields.");

      return;
    }

    let score = 0;

    const newErrors = answers.map((item, i) => {
      const questionCorrect =
        normalize(item.question) === normalize(correctAnswers[i].question);

      const answerCorrect =
        normalize(item.answer) === normalize(correctAnswers[i].answer);

      // كل فراغ عليه علامة
      if (questionCorrect) score++;
      if (answerCorrect) score++;

      return {
        question: !questionCorrect,
        answer: !answerCorrect,
      };
    });

    const newLocked = answers.map((item, i) => {
      return {
        question:
          normalize(item.question) === normalize(correctAnswers[i].question),

        answer: normalize(item.answer) === normalize(correctAnswers[i].answer),
      };
    });

    setErrors(newErrors);

    setCorrectLocked(newLocked);

    // صار المجموع من 4
    const total = 4;

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

    setErrors([
      {
        question: false,
        answer: false,
      },

      {
        question: false,
        answer: false,
      },
    ]);

    setCorrectLocked([
      {
        question: true,
        answer: true,
      },

      {
        question: true,
        answer: true,
      },
    ]);

    setLocked(true);
  };

  // reset
  const handleReset = () => {
    setAnswers([
      {
        question: "",
        answer: "",
      },

      {
        question: "",
        answer: "",
      },
    ]);

    setErrors([
      {
        question: false,
        answer: false,
      },

      {
        question: false,
        answer: false,
      },
    ]);

    setCorrectLocked([
      {
        question: false,
        answer: false,
      },

      {
        question: false,
        answer: false,
      },
    ]);

    setLocked(false);
  };

  return (
    <div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-10">
        <span className="ex-A-read mr-2">B</span>
        Look and complete the question and answer.
      </h5>

      {/* QUESTIONS */}
      <div className="space-y-10 text-[18px] mt-10">
        {/* QUESTION 1 */}
        <div className="flex gap-5 items-start">
          {/* number */}
          <span className="font-bold mt-2">1</span>

          {/* left image */}
          <img
            src={img1}
            alt=""
            style={{
              width: "130px",
              height: "auto",
              objectFit: "contain",
            }}
          />

          <div className="flex-1">
            {/* character image */}
            <img
              src={boyCheck}
              alt=""
              style={{
                width: "65px",
                height: "auto",
                marginBottom: "8px",
              }}
            />

            {/* question */}
            <div className="relative mb-5">
              <input
                type="text"
                value={answers[0].question}
                disabled={locked || correctLocked[0].question}
                onChange={(e) => updateAnswer(0, "question", e.target.value)}
                className={`border-b outline-none w-full text-[#7A2D91] font-semibold px-2 bg-transparent
                ${errors[0].question ? "border-red-500" : "border-black"}
                `}
              />

              {errors[0].question && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "-30px",
                    transform: "translateY(-50%)",
                    width: "20px",
                    height: "20px",
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

            {/* answer */}
            <div className="relative">
              <input
                type="text"
                value={answers[0].answer}
                disabled={locked || correctLocked[0].answer}
                onChange={(e) => updateAnswer(0, "answer", e.target.value)}
                className={`border-b outline-none w-full text-[#7A2D91] font-semibold px-2 bg-transparent
                ${errors[0].answer ? "border-red-500" : "border-black"}
                `}
              />

              {errors[0].answer && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "-30px",
                    transform: "translateY(-50%)",
                    width: "20px",
                    height: "20px",
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
          </div>
        </div>

        {/* QUESTION 2 */}
        <div className="flex gap-5 items-start">
          {/* number */}
          <span className="font-bold mt-2">2</span>

          {/* left image */}
          <img
            src={img2}
            alt=""
            style={{
              width: "130px",
              height: "auto",
              objectFit: "contain",
            }}
          />

          <div className="flex-1">
            {/* character image */}
            <img
              src={girlX}
              alt=""
              style={{
                height: "auto",
                width: "65px",
                marginBottom: "8px",
              }}
            />

            {/* question */}
            <div className="relative mb-5">
              <input
                type="text"
                value={answers[1].question}
                disabled={locked || correctLocked[1].question}
                onChange={(e) => updateAnswer(1, "question", e.target.value)}
                className={`border-b outline-none w-full text-[#7A2D91] font-semibold px-2 bg-transparent
                ${errors[1].question ? "border-red-500" : "border-black"}
                `}
              />

              {errors[1].question && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "-30px",
                    transform: "translateY(-50%)",
                    width: "20px",
                    height: "20px",
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

            {/* answer */}
            <div className="relative">
              <input
                type="text"
                value={answers[1].answer}
                disabled={locked || correctLocked[1].answer}
                onChange={(e) => updateAnswer(1, "answer", e.target.value)}
                className={`border-b outline-none w-full text-[#7A2D91] font-semibold px-2 bg-transparent
                ${errors[1].answer ? "border-red-500" : "border-black"}
                `}
              />

              {errors[1].answer && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "-30px",
                    transform: "translateY(-50%)",
                    width: "20px",
                    height: "20px",
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
          </div>
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

export default Unit8_Page3_GrammarB;
