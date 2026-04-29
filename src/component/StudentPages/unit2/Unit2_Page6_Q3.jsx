import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Unit2_Page6_Q3 = () => {
  const sentences = [
    [
      "Mary",
      "and",
      "Paula,",
      "which",
      "are",
      "swimming",
      "next",
      "week,",
      "will",
      "practice",
      "every",
      "day",
      "this",
      "week.",
    ],
    [
      "William",
      "is",
      "fixing",
      "the",
      "car",
      "who",
      "is",
      "broken",
      "and",
      "needs",
      "more",
      "oil.",
    ],
    [
      "Sandy",
      "gave",
      "her",
      "friend",
      "a",
      "gift",
      "who",
      "she",
      "bought",
      "in",
      "France.",
    ],
    [
      "Mark",
      "and",
      "I,",
      "which",
      "will",
      "go",
      "to",
      "the",
      "carnival",
      "tomorrow,",
      "want",
      "to",
      "see",
      "the",
      "animal",
      "show.",
    ],
  ];

  const correctWordIndex = [3, 5, 6, 3];
  const correctAnswer = ["who", "which", "which", "who"];

  const [selected, setSelected] = useState([null, null, null, null]);
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  // 🔵 اختيار الكلمة
  const handleSelect = (i, wi) => {
    if (locked || result[i]?.word === true) return;

    const updated = [...selected];
    updated[i] = wi;
    setSelected(updated);

    // 🔥 أهم سطر
    setResult((prev) => {
      const copy = [...prev];
      if (copy[i]) copy[i].word = undefined; // يمسح ❌
      return copy;
    });
  };
  // ✍️ كتابة الجواب
  const handleChange = (i, val) => {
    if (result[i]?.answer === true) return;

    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];
      if (copy[i]) copy[i].answer = undefined;
      return copy;
    });
  };

  // 👀 SHOW
  const handleShow = () => {
    setSelected(correctWordIndex);
    setAnswers(correctAnswer);
    setResult([]);
    setLocked(true);
  };

  // ✅ CHECK
  const handleCheck = () => {
    if (locked) return;

    if (answers.some((a) => !a.trim()) || selected.includes(null)) {
      ValidationAlert.info("Select and complete all.");
      return;
    }

    const normalize = (s) => s.toLowerCase().replace(/[.,]/g, "").trim();

    let correctCount = 0;

    const res = answers.map((a, i) => {
      const wordCorrect = selected[i] === correctWordIndex[i];
      const answerCorrect = normalize(a) === normalize(correctAnswer[i]);

      if (wordCorrect) correctCount++;
      if (answerCorrect) correctCount++;

      return {
        word: wordCorrect,
        answer: answerCorrect,
      };
    });

    setResult(res);

    const total = correctAnswer.length * 2;

    if (correctCount === total) {
      setLocked(true);
      ValidationAlert.success(`Score: ${correctCount} / ${total}`);
    } else {
      ValidationAlert.warning(`Score: ${correctCount} / ${total}`);
    }
  };

  // 🔄 RESET
  const handleReset = () => {
    setSelected([null, null, null, null]);
    setAnswers(["", "", "", ""]);
    setResult([]);
    setLocked(false);
  };

  return (
    <div className="p-8 flex flex-col items-center">
      <div className="w-full max-w-[900px]">
        <h5 className="header-title-page8 mb-7">
          <span className="ex-A mr-2">E</span>
          Circle the wrong word and write the correct one
        </h5>

        {sentences.map((sentence, i) => (
          <div key={i} className="space-y-3 text-[18px] leading-9 mt-10">
            {/* الجملة */}
            <div className="flex flex-wrap ">
              <span className="font-bold mr-2">{i + 1}</span>

              {sentence.map((word, wi) => (
                <span
                  key={wi}
                  onClick={() => handleSelect(i, wi)}
                  className={`px-1 rounded-full relative
                    ${result[i]?.word === true ? "cursor-default" : "cursor-pointer"}
                    ${selected[i] === wi ? "border-2 border-blue-500" : ""}
                  `}
                >
                  {word}

                  {/* ❌ على الكلمة */}
                  {result[i]?.word === false && selected[i] === wi && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
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
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        pointerEvents: "none",
                        zIndex: 3,
                      }}
                    >
                      ✕
                    </span>
                  )}
                </span>
              ))}
            </div>

            {/* input */}
            <div className="relative">
              <input
                value={answers[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                disabled={result[i]?.answer === true}
                className={`border-b-1 w-[150px] outline-none text-[#6D2980] font-bold
                  ${result[i]?.answer === false ? "border-red-500" : "border-black"}
                `}
              />

              {/* ❌ على الانبوت */}
              {result[i]?.answer === false && (
                <span
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "-10px",
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
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
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

        {/* buttons */}
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

export default Unit2_Page6_Q3;
