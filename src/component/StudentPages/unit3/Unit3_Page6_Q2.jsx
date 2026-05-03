import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 27/Asset 19.svg"; // حط صورتك
import grammer_u1 from "../../../assets/audio/ClassBook/U3/PG 27/pg27.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const Unit3_Page6_Q2 = () => {
  const questions = [
    "Some graduates are going to the ceremony.",
    "Sally has a nice dress to wear.",
    "Sally goes shopping at the mall.",
    "Sally is confused by the many stores.",
    "She goes into a big shop at the corner.",
  ];

  const correct = ["false", "false", "true", "true", "false"];
  const captions = [
    {
      start: 0.159,
      end: 34.48,
      text: "Page 27, write activities. Exercise E. Read, listen, and circle true or false. Sally is graduating from high school tomorrow. Every graduate is going to the graduation ceremony. Sally doesn't have a nice dress to wear. She decides to go shopping at the mall near her house. There are many stores to choose from. Sally is confused. She goes into a small shop at the corner. She finds a beautiful pink and white shirt and skirt. Sally is happy with her new outfit. Now she is ready for her graduation ceremony.",
    },
  ];
  const [answers, setAnswers] = useState(Array(5).fill(""));
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  // ✅ CHECK
  const handleCheck = () => {
    if (locked) return;

    if (answers.some((a) => !a)) {
      ValidationAlert.info("Please select all answers.");
      return;
    }

    let correctCount = 0;

    const res = answers.map((a, i) => {
      const ok = a === correct[i];
      if (ok) correctCount++;
      return ok;
    });

    setResult(res);

    const total = correct.length;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
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

  // 👀 SHOW
  const handleShow = () => {
    setAnswers(correct);
    setResult([]);
    setLocked(true);
  };

  // 🔄 RESET
  const handleReset = () => {
    setAnswers(Array(5).fill(""));
    setResult([]);
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-8">
      <div className="div-forall">
        <h5 className="header-title-page8 mb-10">
          <span className="ex-A mr-2.5">E</span>
          Read, listen, and circle <span className="text-blue-500">
            true
          </span>{" "}
          or <span className="text-blue-500">false</span>.
        </h5>
        <QuestionAudioPlayer
          src={grammer_u1}
          captions={captions}
          stopAtSecond={7.4}
        />
        {/* BOX */}
        <div
          className="rounded-2xl p-6 mb-10 text-[18px] leading-10 text-black"
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "contain",
            backgroundPosition: "right",
            backgroundRepeat: "no-repeat",
            minHeight: "300px",
          }}
        >
          <div className="max-w-[500px]">
            Sally is graduating from high school tomorrow. Every graduate is
            going to the graduation ceremony. Sally doesn’t have a nice dress to
            wear. She decides to go shopping at the mall near her house. There
            are many stores to choose from. Sally is confused. She goes into a
            small shop at the corner. She finds a beautiful pink and white shirt
            and skirt. Sally is happy with her new outfit. Now, she is ready for
            her graduation ceremony.
          </div>
        </div>

        {/* QUESTIONS */}
        <div className="space-y-6 text-[18px] mb-20">
          {questions.map((q, i) => (
            <div key={i} className="flex justify-between items-center">
              <div>
                <span className="font-bold mr-3">{i + 1}</span>
                {q}
              </div>

              <div className="relative flex gap-6 items-center">
                {/* TRUE */}
                <span
                  onClick={() => {
                    if (locked || result[i] === true) return;

                    const updated = [...answers];
                    updated[i] = "true";
                    setAnswers(updated);

                    setResult((prev) => {
                      const copy = [...prev];
                      copy[i] = undefined;
                      return copy;
                    });
                  }}
                  className={`cursor-pointer px-2 rounded-full border-2
                      ${
                        result[i] === false && answers[i] === "true"
                          ? "border-red-500"
                          : answers[i] === "true"
                            ? "border-[#6D2980]"
                            : "border-transparent"
                      }`}
                >
                  true
                </span>

                {/* FALSE */}
                <span
                  onClick={() => {
                    if (locked || result[i] === true) return;

                    const updated = [...answers];
                    updated[i] = "false";
                    setAnswers(updated);

                    setResult((prev) => {
                      const copy = [...prev];
                      copy[i] = undefined;
                      return copy;
                    });
                  }}
                  className={`cursor-pointer px-2 rounded-full border-2
                    ${
                      result[i] === false && answers[i] === "false"
                        ? "border-red-500 "
                        : answers[i] === "false"
                          ? "border-[#6D2980]"
                          : "border-transparent"
                    }`}
                >
                  false
                </span>

                {/* ❌ */}
                {result[i] === false && (
                  <span
                    style={{
                      position: "absolute",
                      top: "15px",
                      right: "-50px",
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
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="action-buttons-container mt-6">
          <button className="try-again-button" onClick={handleReset}>
            Start Again ↻
          </button>

          <button onClick={handleShow} className="show-answer-btn">
            Show Answer
          </button>

          <button className="check-button2" onClick={handleCheck}>
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unit3_Page6_Q2;
