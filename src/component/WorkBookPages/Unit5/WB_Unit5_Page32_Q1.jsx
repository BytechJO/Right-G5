import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGE
import teaImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U5/Page 32/Asset 17.svg";

const WB_Unit5_Page32_Q1 = () => {
  const wordBank = [
    "information",
    "shish kebab",
    "recipe",
    "have in mind",
    "presentation",
    "What would you like",
  ];

  const answers = [
    "shish kebab",
    "have in mind",
    "What would you like",
    "recipe",
    "information",
    "presentation",
  ];

  const [studentAnswers, setStudentAnswers] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  // ------------------------
  // HANDLE INPUT
  // ------------------------

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...studentAnswers];

    updated[i] = value;

    setStudentAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = studentAnswers.some((a) => !a.trim());

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    // ترتيب الانبوتات مش مهم
    const normalizedAnswers = answers.map((a) => normalize(a));

    const usedAnswers = [];

    const newResults = studentAnswers.map((answer) => {
      const normalized = normalize(answer);

      const foundIndex = normalizedAnswers.findIndex(
        (a, i) => a === normalized && !usedAnswers.includes(i),
      );

      const ok = foundIndex !== -1;

      if (ok) {
        usedAnswers.push(foundIndex);

        correctCount++;
      }

      return ok;
    });

    setResult(newResults);

    const total = answers.length;

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

  // ------------------------
  // SHOW ANSWERS
  // ------------------------

  const showAnswers = () => {
    setStudentAnswers(answers);

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    setStudentAnswers(["", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i, width = "260px") => (
    <div className="relative inline-block">
      <input
        type="text"
        value={studentAnswers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6D2980]
          font-semibold
          px-1

          ${result[i] === false ? "border-[#D1232A]" : "border-black"}
        `}
        style={{
          width,
        }}
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
      <div className="div-forall text-[17px] w-full">
        {/* TITLE */}

        <h5 className="header-title-page8 mb-8">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            L
          </span>
          Read and write.
        </h5>

        {/* WORD BANK */}

        <div className="flex flex-wrap gap-2 mb-8">
          {wordBank.map((word, index) => (
            <div
              key={index}
              className="border border-[#7D3C98] rounded-lg px-3 py-0.5 text-[17px]"
            >
              {word}
            </div>
          ))}
        </div>

        {/* STORY */}

        <div className="leading-7 pl-[45px] relative mb-10">
          <div>One night as I went out to eat</div>

          <div>{inputField(0, "260px")} and all kinds of meat.</div>

          <div>A server came and asked me,</div>

          <div>“Would you please order some tea?”</div>

          <div>“Why?” I asked. “Is that the deal</div>

          <div>To have some tea along with my meal?”</div>

          <div>“No,” said the server, “The tea is free.</div>

          <div>We want you to try our selection of tea.</div>

          <div>Which flavor do you {inputField(1, "250px")} ?</div>

          <div>We can give you tea of almost any kind.</div>

          <div>{inputField(2, "260px")} ? What kinds of teas?”</div>

          <div>“I would prefer the black tea, please.”</div>

          <div>“I have just the right blend for you</div>

          <div>And a free cake with it, too.</div>

          <div>I will give you our secret {inputField(3, "240px")}</div>

          <div>For our special blend of spice tea.</div>

          <div>I’ll give you first some tea {inputField(4, "250px")}</div>

          <div>And then I’ll give you a quick {inputField(5, "260px")}</div>

          <div>Of why our teas do taste so great.</div>

          <div>Don’t worry, I’ll be quick; you won’t be late.”</div>

          {/* IMAGE */}

          <img
            src={teaImg}
            alt=""
            style={{
              width: "200px",
              height: "auto",
              objectFit: "contain",
              position: "absolute",
              right: "0",
              bottom: "0",
            }}
          />
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

export default WB_Unit5_Page32_Q1;
