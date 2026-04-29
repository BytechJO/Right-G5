import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import { useRef } from "react";

const Page8_Q2 = () => {
  const inputsRef = useRef([]);
  const [answers, setAnswers] = useState(Array(32).fill(""));
  const [locked, setLocked] = useState(false);
  const correct = [
    "u",
    "h", // 1 → u h-o n
    "n",
    "n",
    "e",
    "i",
    "d",
    "e", // 2 → one one side
    "f",
    "l",
    "a",
    "l",
    "e",
    "e", // 3
    "o",
    "w",
    "d",
    "i",
    "d",
    "y",
    "o",
    "u",
    "n",
    "o",
    "w", // 4
    "i",
    "g",
    "h",
    "t",
    "w",
    "a",
    "y", // 5
  ];
  const showAnswers = () => {
    setAnswers(correct);
    setLocked(true);
  };
  const reset = () => {
    setAnswers(Array(32).fill(""));
    setResult([]);
    setLocked(false);
  };
  const [result, setResult] = useState([]);
  const handleChange = (i, value) => {
    const updated = [...answers];

    // ✨ خذ آخر حرف فقط (overwrite كامل)
    const lastChar = value.slice(-1);

    updated[i] = lastChar;
    setAnswers(updated);

    // ➡️ روح للي بعده
    if (lastChar && i < answers.length - 1) {
      inputsRef.current[i + 1]?.focus();
    }
  };
  const checkAnswers = () => {
    if (locked) return;

    // 🛑 validation
    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all fields");
      return;
    }

    let correctCount = 0;

    answers.forEach((a, i) => {
      if (a === correct[i]) correctCount++;
    });

    const total = correct.length;

    // 🎨 اللون
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    // 💬 الرسالة
    const msg = `
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${correctCount} / ${total}
      </span>
    </div>
  `;

    // 🔔 Alert
    if (correctCount === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }

    // 🧠 حفظ النتيجة لكل حرف (عشان ❌ و ✔)
    const res = answers.map((a, i) => a === correct[i]);
    setResult(res);
  };

  const input = (i) => (
    <span className="relative mx-1">
      <input
        ref={(el) => (inputsRef.current[i] = el)}
        disabled={result[i] === true}
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        maxLength={1}
        className={`relative w-[35px] border-b outline-none text-center font-medium
    ${result[i] === false ? "border-red-500 text-[#6D2980]" : "border-black text-[#6D2980]"}
  `}
      />

      {result[i] === false && (
        <div
          style={{
            position: "absolute",
            top: "-2px",
            left: "50%",
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
            pointerEvents: "none",
          }}
        >
          ✕
        </div>
      )}
    </span>
  );
  return (
    <div className="p-[30px] flex flex-col items-center">
      <div className="div-forall">
        <h5 className="header-title-page8 mb-27">
          <span className="ex-A mr-2.5">B</span>
          Write the missing letters to complete the expression.
        </h5>

        <div className="space-y-10 text-[22px]">
          {/* 1 */}
          <div className="flex">
            <b className="w-10">1</b>

            <div className="flex ">
              {input(0)}
              <span>h-o</span>
              {input(1)}!
            </div>
          </div>

          {/* 2 */}
          <div className="flex">
            <b className="w-10">2</b>

            <div className="flex gap-8">
              <span>o{input(2)}</span>
              <span>
                o{input(3)}
                {input(4)}
              </span>
              <span>
                s{input(5)}
                {input(6)}
                {input(7)}
              </span>
            </div>
          </div>

          {/* 3 */}
          <div className="flex">
            <b className="w-10">3</b>

            <div className="flex gap-8">
              <span>
                {input(8)}el{input(9)}
              </span>
              <span>
                {input(10)}s{input(11)}
                {input(12)}
                {input(13)}p
              </span>
            </div>
          </div>

          {/* 4 */}
          <div className="flex">
            <b className="w-10">4</b>

            <div className="flex gap-8">
              <span>
                H{input(14)}
                {input(15)}
              </span>
              <span>
                {input(16)}
                {input(17)}
                {input(18)}
              </span>
              <span>
                {input(19)}
                {input(20)}
                {input(21)}
              </span>
              <span>
                k{input(22)}
                {input(23)}
                {input(24)}?
              </span>
            </div>
          </div>

          {/* 5 */}
          <div className="flex">
            <b className="w-10">5</b>

            <div className="flex gap-8">
              <span>
                r{input(25)}
                {input(26)}
                {input(27)}
                {input(28)}
              </span>
              <span>
                a{input(29)}
                {input(30)}
                {input(31)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Button
        handleShowAnswer={showAnswers}
        handleStartAgain={reset}
        checkAnswers={checkAnswers}
      />
    </div>
  );
};

export default Page8_Q2;
