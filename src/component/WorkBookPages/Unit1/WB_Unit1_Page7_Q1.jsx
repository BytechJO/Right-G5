import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U1/Page 7/Asset 10.svg";

const WB_Unit1_Page7_Q1 = () => {
  const questions = [
    "He only had 10 minutes to study.",
    "John got 70% on his math exam.",
    "He should study as soon as he gets home.",
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’'%]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleChange = (i, value) => {
    if (locked || result[i] === true || (i === 3 && locked)) return;

    const updated = [...answers];

    updated[i] = value;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    // كل الحقول لازم تكون معبية
    const hasEmpty = answers.some((a) => !a.trim());

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correctCount = 0;

    const newResults = answers.map((a, i) => {
      // السؤال الرابع ما ينحسب
      if (i === 3) {
        return undefined;
      }

      const ok = normalize(a) === normalize(questions[i]);

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    // السكور فقط لأول 3
    const total = 3;

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
    setAnswers([
      "He only had 10 minutes to study.",
      "John got 70% on his math exam.",
      "He should study as soon as he gets home.",
    ]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i) => (
    <div className="relative w-full">
      <input
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
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
          placeholder:text-[#999]

          ${result[i] === false ? "border-[#D1232A]" : "border-black"}
        `}
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
      <div
        className="div-forall "
        style={{
          lineHeight: "1.5",
        }}
      >
        {/* TITLE */}
        <h5 className="header-title-page8 mb-8">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            K
          </span>
          Read and write.
        </h5>

        {/* READING */}
        <div className="flex gap-8 items-start mb-12 text-[17px]">
          <div className="flex-1">
            <p className="mb-5">
              How many hours do you spend studying for an exam? How many times
              have you fallen asleep while doing your homework or studying? Did
              you ever sleep on your books? This happens to almost every
              student. Studying takes up a lot of time. Sometimes, there just
              isn’t enough time to study!
            </p>

            <p>
              That’s what happened to John, a fifth grade student. He was
              studying for a math exam when he fell asleep at his desk. In the
              morning, his alarm went off. Uh-oh! It was already time to go to
              school! John didn’t finish studying. He didn’t know what to do.
              When he went to school, he tried to study, but there wasn’t enough
              time. He only had 10 minutes to review before the math exam. When
              it was time for the exam, John was not ready. He took the exam but
              couldn’t figure out many of the answers. Sadly, John got 70% on
              his math exam. “Next time, I will study as soon as I go home,” he
              thought.
            </p>
          </div>

          {/* IMAGE */}
          <img
            src={img1}
            alt="sleeping-boy"
            style={{
              width: "260px",
              height: "auto",
              objectFit: "contain",
              marginTop: "90px",
            }}
          />
        </div>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-12 mb-10">
          {/* 1 */}
          <div>
            <div className="flex gap-3 mb-4">
              <span className="font-bold">1</span>

              <span>How many minutes did John have to study at school?</span>
            </div>

            <div className="pl-7">{inputField(0)}</div>
          </div>

          {/* 2 */}
          <div>
            <div className="flex gap-3 mb-4">
              <span className="font-bold">2</span>

              <span>What mark did John get on his exam?</span>
            </div>

            <div className="pl-7">{inputField(1)}</div>
          </div>

          {/* 3 */}
          <div>
            <div className="flex gap-3 mb-4">
              <span className="font-bold">3</span>

              <span>What should John do next time before an exam?</span>
            </div>

            <div className="pl-7">{inputField(2)}</div>
          </div>

          {/* 4 */}
          <div>
            <div className="flex gap-3 mb-4">
              <span className="font-bold">4</span>

              <span>How long does it take you to study?</span>
            </div>

            <div className="pl-7">{inputField(3, "Answers will vary")}</div>
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

export default WB_Unit1_Page7_Q1;
