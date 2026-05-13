import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 7 Helen Is Visiting Grandma Folder/Page 63/SVG/Asset 18.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 7 Helen Is Visiting Grandma Folder/Page 63/SVG/Asset 19.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 7 Helen Is Visiting Grandma Folder/Page 63/SVG/Asset 20.svg";

const Unit7_Page6_Q3 = () => {
  const correctAnswers = [
    "Are they playing basketball?",
    "Are they drinking coffee?",
    "Are they picking apples?",
  ];

  const [answers, setAnswers] = useState(["", "", ""]);

  const [errors, setErrors] = useState([false, false, false]);

  const [correctLocked, setCorrectLocked] = useState([false, false, false]);

  const [locked, setLocked] = useState(false);
  // update
  const updateAnswer = (index, value) => {
    const updated = [...answers];

    updated[index] = value;

    setAnswers(updated);

    const updatedErrors = [...errors];

    updatedErrors[index] = false;

    setErrors(updatedErrors);
  };
  const handleShow = () => {
    setAnswers(correctAnswers);

    setErrors([false, false, false]);

    setCorrectLocked([true, true, true]);

    setLocked(true);
  };

  // reset
  const handleReset = () => {
    setAnswers(["", "", ""]);

    setErrors([false, false, false]);

    setCorrectLocked([false, false, false]);

    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        <h5 className="header-title-page8 mb-22">
          <span className="ex-A" style={{ marginRight: "10px" }}>
           E
          </span>
          Look and write questions
        </h5>

        {/* QUESTIONS */}
        <div className="space-y-5 text-[18px]">
          {/* 1 */}
          <div className="flex gap-6 items-center">
            <span className="font-bold -mt-20">1</span>

            {/* IMAGE */}
            <img
              src={img1}
              alt="museum"
              style={{
                width: "120px",
                height: "auto",
                objectFit: "contain",
              }}
            />

            {/* INPUT */}
            <div className="flex-1 mt-10 relative">
              <input
                type="text"
                value={answers[0]}
                disabled={locked || correctLocked[0]}
                onChange={(e) => updateAnswer(0, e.target.value)}
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
                    right: "-30px",
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
          </div>

          {/* 2 */}
          <div className="flex gap-6 items-center">
            <span className="font-bold -mt-20">2</span>

            {/* IMAGE */}
            <img
              src={img2}
              alt="mountains"
              style={{
                width: "120px",
                height: "auto",
                objectFit: "contain",
              }}
            />

            {/* INPUTS */}
            <div className="flex-1 flex items-center mt-6">
              {/* first line */}
              <div className="relative w-full">
                <input
                  type="text"
                  value={answers[1]}
                  disabled={locked || correctLocked[1]}
                  onChange={(e) => updateAnswer(1, e.target.value)}
                  className={`border-b outline-none w-full text-[#6D2980] font-semibold px-2 bg-transparent
      ${errors[1] ? "border-red-500" : "border-black"}
      `}
                />

                {/* ❌ */}
                {errors[1] && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "-30px",
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
            </div>
          </div>

          {/* 3 */}
          <div className="flex gap-6 items-center">
            <span className="font-bold -mt-20">3</span>

            {/* IMAGE */}
            <img
              src={img3}
              alt="mountains"
              style={{
                width: "120px",
                height: "auto",
                objectFit: "contain",
              }}
            />

            {/* INPUTS */}
            <div className="flex-1 flex items-center mt-6">
              {/* first line */}
              <div className="relative w-full">
                <input
                  type="text"
                  value={answers[2]}
                  disabled={locked || correctLocked[2]}
                  onChange={(e) => updateAnswer(2, e.target.value)}
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
                      right: "-30px",
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
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={handleReset}>
            Start Again ↻
          </button>

          <button className="show-answer-btn" onClick={handleShow}>
            Show Answer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unit7_Page6_Q3;
