import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Unit9_Page5_Q1 = () => {
  const categories = [
    {
      title: "one syllable",
      answers: ["club", "lawns", "ring", "rush"],
    },
    {
      title: "two syllables",
      answers: ["mowing", "braces"],
    },
    {
      title: "three syllables",
      answers: ["exactly", "appointments", "stadium"],
    },
    {
      title: "four syllables",
      answers: [],
    },
    {
      title: "five syllables",
      answers: ["congratulations"],
    },
  ];

  const words = [
    "exactly",
    "stadium",
    "ring",
    "rush",
    "braces",
    "mowing",
    "club",
    "lawns",
    "congratulations",
    "appointments",
  ];

  const [inputs, setInputs] = useState([
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
  ]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) => str.toLowerCase().replace(/\s+/g, " ").trim();

  const handleChange = (boxIndex, inputIndex, value) => {
    if (locked) return;

    const updated = [...inputs];

    updated[boxIndex][inputIndex] = value;

    setInputs(updated);

    // reset result for edited input
    setResult((prev) => {
      const copy = [...prev];

      if (copy[boxIndex]) {
        copy[boxIndex][inputIndex] = undefined;
      }

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;
    const filledCount = inputs
      .flat()
      .filter((item) => item.trim() !== "").length;

    if (filledCount < 10) {
      ValidationAlert.info();
      return;
    }

    let totalCorrect = 0;

    const newResults = inputs.map((box, boxIndex) => {
      // كلمات البوكس الصح
      const correctWords = categories[boxIndex].answers.map((w) =>
        normalize(w),
      );

      const usedWords = [];

      return box.map((value) => {
        const v = normalize(value);

        // الفراغ → بدون إكس
        if (!v) return undefined;

        // الكلمة موجودة بالبكس ولسه ما انستخدمت
        const isCorrect = correctWords.includes(v) && !usedWords.includes(v);

        if (isCorrect) {
          totalCorrect++;
          usedWords.push(v);

          return true;
        }

        // 🔥 إذا مكررة لا تعتبر غلط ولا صح
        if (correctWords.includes(v) && usedWords.includes(v)) {
          return undefined;
        }

        // كلمة غلط
        return false;
      });
    });

    setResult(newResults);

    const total = words.length;

    const color =
      totalCorrect === total ? "green" : totalCorrect === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:18px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${totalCorrect} / ${total}
        </span>
      </div>
    `;

    if (totalCorrect === total) {
      setLocked(true);

      ValidationAlert.success(msg);
    } else if (totalCorrect === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const showAnswers = () => {
    setInputs([
      ["club", "lawns", "ring", "rush"],
      ["mowing", "braces", "", ""],
      ["exactly", "appointments", "stadium", ""],
      ["", "", "", ""],
      ["congratulations", "", "", ""],
    ]);

    setLocked(true);
  };

  const handleReset = () => {
    setInputs([
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
    ]);

    setResult([]);

    setLocked(false);
  };

  const getResult = (boxIndex, inputIndex) => {
    return result[boxIndex]?.[inputIndex];
  };

  const renderInput = (boxIndex, inputIndex) => {
    const currentResult = getResult(boxIndex, inputIndex);

    return (
      <div key={inputIndex} className="relative mb-1">
        <input
          type="text"
          value={inputs[boxIndex][inputIndex]}
          disabled={locked || currentResult === true}
          onChange={(e) => handleChange(boxIndex, inputIndex, e.target.value)}
          className={`
          w-full
          bg-transparent
          border-0
          border-b
          border-[#E5D9EC]
          outline-none
          text-[18px]
          font-semibold
          pb-1

          ${currentResult === false ? "text-[#D1232A]" : "text-[#6D2980]"}
        `}
        />

        {currentResult === false && (
          <span
            style={{
              position: "absolute",
              top: "10px",
              right: "-8px",
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
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-20">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            A
          </span>
          Put the vocabulary words into the right groups. One box will be blank.
        </h5>

        {/* BOXES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12 justify-items-center">
          {" "}
          {categories.map((cat, boxIndex) => (
            <div key={boxIndex} className="flex flex-col items-center">
              {/* LABEL */}
              <div
                style={{
                  background: "#E9E1EC",
                  borderRadius: "10px",
                  padding: "8px 18px",
                  marginBottom: "10px",
                  fontSize: "18px",
                }}
              >
                {cat.title}
              </div>

              {/* BOX */}
              <div
                style={{
                  width: "150px",
                  minHeight: "195px",
                  border: "2px solid #8D3DAF",
                  borderRadius: "18px",
                  padding: "12px",
                }}
              >
                {Array.from({ length: 4 }).map((_, inputIndex) =>
                  renderInput(boxIndex, inputIndex),
                )}
              </div>
            </div>
          ))}
        </div>

        {/* WORD BANK */}
        <div
          className="grid grid-cols-5 gap-y-5 gap-x-10 text-[18px]"
          style={{
            width: "760px",
            margin: "0 auto",
          }}
        >
          {words.map((word, index) => (
            <div key={index}>{word}</div>
          ))}
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

export default Unit9_Page5_Q1;
