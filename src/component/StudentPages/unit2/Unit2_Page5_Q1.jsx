import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 14/Ex A 1.svg";

const Unit2_Page5_Q1 = () => {
  const [answers, setAnswers] = useState(["", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  const correct = ["trimsgeb", "crazytsiw", "coupleeffarig"];

  const normalize = (t) => t.toLowerCase().trim();

  const handleChange = (i, val) => {
    if (result[i] === true) return;

    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  const input = (i) => (
    <input
      value={answers[i]}
      onChange={(e) => handleChange(i, e.target.value)}
      disabled={result[i] === true}
      className={`border-b outline-none text-center font-bold text-[#6D2980] mx-2 ${
        result[i] === false ? "border-red-500" : "border-black"
      }`}
      style={{ width: "220px" }}
    />
  );

  // ✅ CHECK
  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info();
      return;
    }

    let correctCount = 0;

    const res = answers.map((a, i) => {
      const ok = normalize(a) === normalize(correct[i]);
      if (ok) correctCount++;
      return ok;
    });

    setResult(res);

    const msg = `Score: ${correctCount} / 3`;

    if (correctCount === 3) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // 👀 SHOW
  const showAnswers = () => {
    setAnswers(correct);
    setResult([]);
    setLocked(true);
  };

  // 🔄 RESET
  const reset = () => {
    setAnswers(["", "", ""]);
    setResult([]);
    setLocked(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div className="div-forall">
        {/* 🔥 العنوان (نفسه ما تغير) */}
        <h5 className="header-title-page8">
          <span className="ex-A" style={{ marginRight: "10px" }}>
            A
          </span>
          <span style={{ color: "#2e3192", marginRight: "10px" }}>1</span>
          Look and write.
        </h5>

        {/* 🔥 المحتوى */}
        <div className="flex justify-between items-start mt-6">
          {/* النص */}
          <div className="flex flex-col gap-8 text-[18px] flex-1">
            {/* مثال */}
            <div>
              <span className="font-bold mr-3">1</span>
              <span className="tracking-[6px] underline">
                C A R N I V A L L I T S
              </span>
              <span className="ml-4 text-gray-600">
                = carnival forward and still backward.
              </span>
            </div>

            {/* 2 */}
            <div>
              <span className="font-bold mr-3">2</span>
              {input(0)}
              <span className="ml-3">= trims and beg</span>

              {result[0] === false && (
                <span className="text-red-500 ml-2">✕</span>
              )}
            </div>

            {/* 3 */}
            <div>
              <span className="font-bold mr-3">3</span>
              {input(1)}
              <span className="ml-3">= crazy and twisty</span>

              {result[1] === false && (
                <span className="text-red-500 ml-2">✕</span>
              )}
            </div>

            {/* 4 */}
            <div>
              <span className="font-bold mr-3">4</span>
              {input(2)}
              <span className="ml-3">= couple and giraffe</span>

              {result[2] === false && (
                <span className="text-red-500 ml-2">✕</span>
              )}
            </div>
          </div>

          {/* 🔥 الصورة (inline style فقط) */}
          <img
            src={img1}
            style={{
              width: "120px",
              height: "120px",
              objectFit: "contain",
              marginLeft: "20px",
            }}
          />
        </div>
      </div>

      {/* 🔥 الأزرار (نفس نظامك) */}
      <Button
        handleShowAnswer={showAnswers}
        handleStartAgain={reset}
        checkAnswers={checkAnswers}
      />
    </div>
  );
};

export default Unit2_Page5_Q1;
