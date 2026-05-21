import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import { HiArrowUpCircle } from "react-icons/hi2";
// IMAGE
import turkeyImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U10/Page 61/Asset 8.svg";

const WB_Unit_Test_Q34 = () => {
  // ------------------------
  // CLICKABLE WORDS
  // ------------------------

  const clickableWords = [
    "was having",
    "was working",
    "was baking",
    "was getting",
    "was putting",
    "was setting",
    "was getting",
    "were getting",
    "was waiting",
    "was getting",
  ];

  // ------------------------
  // QUESTIONS
  // ------------------------

  const answers = [
    "They were having a special dinner because it was the narrator’s birthday",

    "Everyone was getting hungry because the narrator’s mom took the turkey out of the oven. ",

    clickableWords,
  ];

  // ------------------------
  // STATES
  // ------------------------

  const [selectedWords, setSelectedWords] = useState([]);
  const [studentAnswers, setStudentAnswers] = useState(["", ""]);

  const [result, setResult] = useState({
    q1: undefined,
    q2: undefined,
    underline: false,
  });

  const [locked, setLocked] = useState(false);

  // ------------------------
  // NORMALIZE
  // ------------------------

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’"]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  // ------------------------
  // TOGGLE WORD
  // ------------------------

  const toggleWord = (index) => {
    if (locked) return;

    setSelectedWords((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      }

      return [...prev, index];
    });

    setResult((prev) => ({
      ...prev,
      underline: false,
    }));
  };

  // ------------------------
  // RENDER STORY
  // ------------------------

  const renderStory = (text, offset = 0) => {
    const regex =
      /(was having|was working|was baking|was getting|was putting|was setting|were getting|was waiting)/g;

    const parts = text.split(regex);

    return parts.map((part, index) => {
      const isClickable = clickableWords.includes(part);

      if (isClickable) {
        const selected = selectedWords.includes(index + offset);
        return (
          <button
            key={index}
            type="button"
            disabled={locked}
            onClick={() => toggleWord(index + offset)}
            style={{
              background: "transparent",

              border: "none",

              borderBottom: selected
                ? "3px solid #6D2980"
                : "3px solid transparent",

              padding: 0,

              margin: 0,

              cursor: locked ? "default" : "pointer",

              lineHeight: "inherit",
            }}
          >
            {part}
          </button>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };

  // ------------------------
  // HANDLE INPUT
  // ------------------------

  const handleChange = (i, value) => {
    if (locked || result[`q${i + 1}`] === true) return;

    const updated = [...studentAnswers];

    updated[i] = value;

    setStudentAnswers(updated);

    setResult((prev) => ({
      ...prev,
      [`q${i + 1}`]: undefined,
    }));
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (locked) return;

    // VALIDATION

    if (selectedWords.length === 0) {
      ValidationAlert.info("Please underline the phrases.");

      return;
    }

    if (studentAnswers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    // ------------------------
    // UNDERLINE
    // ------------------------

    const underlineCorrect = selectedWords.length;

    const underlineOk = underlineCorrect === 10;

    // ------------------------
    // QUESTION 1
    // ------------------------

    const q1Ok = normalize(studentAnswers[0]) === normalize(answers[0]);

    // ------------------------
    // QUESTION 2
    // ------------------------

    const q2Ok = normalize(studentAnswers[1]) === normalize(answers[1]);

    // ------------------------
    // SCORE
    // ------------------------

    let correctCount = 0;

    correctCount += underlineCorrect;

    if (q1Ok) correctCount++;

    if (q2Ok) correctCount++;

    setResult({
      q1: q1Ok,
      q2: q2Ok,
      underline: underlineOk,
    });

    const total = 12;

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
    const regex =
      /(was having|was working|was baking|was getting|was putting|was setting|were getting|was waiting)/g;

    // الجزء الأول

    const firstPart = `
Last night my family was having a special dinner! It was special because we invited my grandparents.

It was a great evening because everyone was working together. The turkey that my mom made was baking in the oven. It was almost ready. My mom was also making soup. My big brother, George, was getting the glasses from the cupboard.
`;

    // الجزء الثاني

    const secondPart = `
My sister, Ana, was putting the plates neatly on the table. She was setting the table. My dad was getting a special cake from the bakery. It was my favorite: chocolate cake. My mom took the turkey from the oven. We were getting hungry. Everyone was waiting impatiently for my grandparents to arrive. We finally ate the turkey. It was delicious! Then, we each took a slice from that tasty chocolate cake. It was very good. After dinner, I was getting sleepy. I think I ate too much!
`;

    // indexes الجزء الأول

    const firstIndexes = firstPart
      .split(regex)
      .map((part, index) => (clickableWords.includes(part) ? index : null))
      .filter((v) => v !== null);

    // indexes الجزء الثاني مع offset

    const secondIndexes = secondPart
      .split(regex)
      .map((part, index) =>
        clickableWords.includes(part) ? index + 100 : null,
      )
      .filter((v) => v !== null);

    // دمج الكل

    const correctIndexes = [...firstIndexes, ...secondIndexes];

    setSelectedWords(correctIndexes);

    setStudentAnswers([answers[0], answers[1]]);

    setResult({
      q1: true,
      q2: true,
      underline: true,
    });

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    setSelectedWords([]);

    setStudentAnswers(["", ""]);

    setResult({
      q1: undefined,
      q2: undefined,
      underline: false,
    });

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i) => (
    <div className="relative w-full">
      <input
        type="text"
        value={studentAnswers[i]}
        disabled={locked || result[`q${i + 1}`] === true}
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

          ${result[`q${i + 1}`] === false ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {result[`q${i + 1}`] === false && (
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
      <div className="div-forall text-[18px] w-full">
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

        {/* STORY BOX */}
        <div
          style={{
            position: "relative",
            padding: "10px 10px 0px 10px",
            fontSize: "17px",
            color: "#3b2b20",
            lineHeight: "2",
          }}
        >
          {/* الجزء العلوي الكامل */}

          <div>
            {renderStory(
              `
              Last night my family was having a special dinner! It was special because we invited my grandparents.

              It was a great evening because everyone was working together. The turkey that my mom made was baking in the oven. It was almost ready. My mom was also making soup. My big brother, George, was getting the glasses 
              `,
              0,
            )}
          </div>

          {/* الجزء السفلي مع الصورة */}

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "14px",
              marginTop: "10px",
            }}
          >
            {/* النص */}

            <div style={{ flex: 1 }}>
              {renderStory(
                `
from the cupboard. My sister, Ana, was putting the plates neatly on the table. She was setting the table. My dad was getting a special cake from the bakery. It was my favorite: chocolate cake. My mom took the turkey from the oven. We were getting hungry. Everyone was waiting impatiently for my grandparents to arrive. We finally ate the turkey. It was delicious! Then, we each took a slice from that tasty chocolate cake. It was very good. After dinner, I was getting sleepy. I think I ate too much!
`,
                100,
              )}
            </div>

            {/* الصورة */}

            <img
              src={turkeyImg}
              alt=""
              style={{
                width: "235px",
                height: "auto",
                objectFit: "contain",
                flexShrink: 0,
              }}
            />
          </div>
        </div>

        {/* QUESTION 1 */}

        <div className="mt-10 mb-8">
          <div className="flex items-start gap-4 mb-5">
            <span className="font-bold">1</span>

            <span>
              Why were the narrator and his family having a special dinner last
              night?
            </span>
          </div>

          <div className="pl-[35px]">{inputField(0)}</div>
        </div>

        {/* QUESTION 2 */}

        <div className="mb-8">
          <div className="flex items-start gap-4 mb-5">
            <span className="font-bold">2</span>

            <span>Why do you think everyone was getting hungry?</span>
          </div>

          <div className="pl-[35px]">{inputField(1)}</div>
        </div>

        {/* QUESTION 3 */}

        <div className="mb-8">
          <div className="flex items-start gap-4">
            <span className="font-bold">3</span>

            <span className="flex items-center gap-2">
              Underline the past progressive phrases in the story.
              <HiArrowUpCircle
                style={{
                  color: "#6D2980",
                  fontSize: "26px",
                  flexShrink: 0,
                }}
              />
            </span>
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

export default WB_Unit_Test_Q34;
