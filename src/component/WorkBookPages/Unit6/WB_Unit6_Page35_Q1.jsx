import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGES
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 35/Asset 8.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 35/Asset 9.svg";
import img3 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 35/Asset 10.svg";

const WB_Unit6_Page35_Q1 = () => {
  const clickableWords = [
    "might",
    "will",
    "should",
    "must",
    "can't",
    "may",
    "could",
    "shouldn't",
    "would",
  ];

  const answers = [
    "They will each submit a science project at the fair.",

    "They should be home by 6 p.m.",
  ];

  const [selectedWords, setSelectedWords] = useState([]);

  const [studentAnswers, setStudentAnswers] = useState(["", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  // ------------------------
  // TOGGLE WORD
  // ------------------------

  const toggleWord = (wordKey) => {
    if (locked) return;

    setSelectedWords((prev) => {
      if (prev.includes(wordKey)) {
        return prev.filter((w) => w !== wordKey);
      }

      return [...prev, wordKey];
    });
  };

  // ------------------------
  // HANDLE INPUT
  // ------------------------

  const handleChange = (i, value) => {
    if (locked || result[i]?.input === true) return;

    const updated = [...studentAnswers];

    updated[i] = value;

    setStudentAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      if (copy[i]) {
        copy[i].input = undefined;
      }

      return copy;
    });
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (locked) return;

    // ✅ لازم يختار دائرة وحدة على الأقل
    if (selectedWords.length === 0) {
      ValidationAlert.info("Please circle at least one modal verb.");

      return;
    }

    // ✅ لازم يحل السؤالين
    if (studentAnswers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    // ------------------------
    // MODAL VERBS
    // ------------------------

    const correctModalKeys = paragraph
      .split(" ")
      .map((word, index) => {
        const cleanWord = word.replace(/[.?!]/g, "").trim();

        if (clickableWords.includes(cleanWord)) {
          return `${cleanWord}-${index}`;
        }

        return null;
      })
      .filter(Boolean);

    let modalCorrectCount = 0;

    correctModalKeys.forEach((key) => {
      if (selectedWords.includes(key)) {
        modalCorrectCount++;
      }
    });

    // ------------------------
    // INPUTS
    // ------------------------

    let inputCorrect = 0;

    const inputResults = studentAnswers.map((answer, i) => {
      const ok = normalize(answer) === normalize(answers[i]);

      if (ok) inputCorrect++;

      return ok;
    });

    // ------------------------
    // SAVE RESULTS
    // ------------------------

    const finalResults = inputResults.map((ok) => ({
      input: ok,
      modal: true,
    }));

    setResult(finalResults);

    // ------------------------
    // TOTAL
    // ------------------------

    const totalCorrect = modalCorrectCount + inputCorrect;

    const total = correctModalKeys.length + answers.length;

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
  // ------------------------
  // SHOW ANSWERS
  // ------------------------

  const showAnswers = () => {
    const modalKeys = paragraph
      .split(" ")
      .map((word, index) => {
        const cleanWord = word.replace(/[.?!]/g, "").trim();

        if (clickableWords.includes(cleanWord)) {
          return `${cleanWord}-${index}`;
        }

        return null;
      })
      .filter(Boolean);

    setSelectedWords(modalKeys);

    setStudentAnswers(answers);

    setResult([
      {
        input: true,
        modal: true,
      },

      {
        input: true,
        modal: true,
      },
    ]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    setSelectedWords([]);

    setStudentAnswers(["", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // PARAGRAPH
  // ------------------------

  const paragraph = `
Fred and his friends might meet at the science fair tomorrow. Each one of them will bring a science project there. They should wear their name tags and get their own table. Their parents will come and watch. They must submit their science project by 10 a.m. tomorrow. They can't submit it later. There will be five winners. They may meet after the science fair is over. They could have lunch together at the restaurant nearby, or they could go to the park a few blocks away. They shouldn't stay later than 6 p.m. because they still have homework to do. Their parents would worry if they stay later than 6 p.m.
`;

  // ------------------------
  // RENDER PARAGRAPH
  // ------------------------

  const renderParagraph = () => {
    const words = paragraph.split(" ");

    return words.map((word, index) => {
      const cleanWord = word.replace(/[.?!]/g, "").trim();
      const isClickable = clickableWords.includes(cleanWord);

      if (isClickable) {
        const selected = selectedWords.includes(`${cleanWord}-${index}`);

        return (
          <button
            key={index}
            type="button"
            disabled={locked}
            onClick={() => toggleWord(`${cleanWord}-${index}`)}
            style={{
              display: "inline",
              background: "transparent",
              border: selected ? "2px solid #6D2980" : "2px solid transparent",
              borderRadius: "999px",
              padding: "0 4px",
              margin: "0 1px",
              cursor: locked ? "default" : "pointer",
              lineHeight: "inherit",
              verticalAlign: "baseline",
            }}
          >
            {word}
          </button>
        );
      }

      return <span key={index}>{word} </span>;
    });
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i) => (
    <div className="relative w-full">
      <input
        type="text"
        value={studentAnswers[i]}
        disabled={locked || result[i]?.input === true}
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

          ${result[i]?.input === false ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {result[i]?.input === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            width: "18px",
            height: "18px",
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
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <h5 className="header-title-page8 mb-8">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            F
          </span>
          Read and write.
        </h5>

        {/* PARAGRAPH */}

        <div className="leading-[1.6] mb-8 px-10 w-[110%]">
          {renderParagraph()}
        </div>

        {/* IMAGES */}

        <div className="flex justify-center gap-8 mb-10">
          {[img1, img2, img3].map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              style={{
                width: "250px",
                height: "auto",
                objectFit: "contain",
              }}
            />
          ))}
        </div>

        {/* QUESTION 1 */}

        <div className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <span className="font-bold">1</span>

            <span>Circle each modal verb in the story.</span>
          </div>
        </div>

        {/* QUESTION 2 */}

        <div className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <span className="font-bold">2</span>

            <span>What will they do in the science fair?</span>
          </div>

          <div className="pl-[35px]">{inputField(0)}</div>
        </div>

        {/* QUESTION 3 */}

        <div className="mb-10">
          <div className="flex items-start gap-4 mb-4">
            <span className="font-bold">3</span>

            <span>When should they be home? Why?</span>
          </div>

          <div className="pl-[35px]">{inputField(1)}</div>
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

export default WB_Unit6_Page35_Q1;
