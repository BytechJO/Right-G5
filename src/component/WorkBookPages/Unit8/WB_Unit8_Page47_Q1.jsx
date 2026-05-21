import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import { HiArrowUpCircle } from "react-icons/hi2";

// IMAGES
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U8/Page 47/Asset 5.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U8/Page 47/Asset 17.svg";

const WB_Unit8_Page47_Q1 = () => {
  const clickableWords = [
    "Everyone",
    "no one",
    "nobody",
    "someone",
    "everything",
    "everyone",
  ];

  const answer = "Because the pilot was his 3rd grade science teacher.";

  const firstPart = `
Everyone was talking about the hot-air balloon ride that opened in town.
People were crowded in line and were waiting for their turn to ride in the
rainbow hot-air balloon. I was shocked to see so many people. no one knew
how many people were allowed to be in one ride. There was a small airplane
ride nearby. I went over to it and was shocked when I spotted the pilot. I
recognized him from third grade. “Mr. Myers?” I asked, looking confused.
“Hello, John. How are you? Are you still getting good grades in science
class?” he shouted back. Mr. Myers was my third grade science teacher.
nobody told me that he became a pilot!
`;

  const secondPart = `
He told me he was volunteering to fly the plane since the original pilot
was busy. someone walked towards us. He was another pilot. He leaned
towards Mr. Myers. “Get ready. The flight will take off in five minutes,”
he told him. “See you later, Mr. Myers,” I said as I started going towards
the hot-air balloon ride. “Wait,” said Mr. Myers. “Come on in and let’s
fly over the town.” I happily accepted. It was so fun feeling on top of
the world. everything looked so small from above. everyone waiting in line
looked like ants. It was a ride I’ll never forget.
`;

  const [selectedWords, setSelectedWords] = useState([]);

  const [studentAnswer, setStudentAnswer] = useState("");

  const [result, setResult] = useState({
    paragraph: false,
    input: undefined,
  });

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’"]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  // ------------------------
  // TOGGLE WORD
  // ------------------------

  const toggleWord = (word) => {
    if (locked) return;

    setSelectedWords((prev) => {
      if (prev.includes(word)) {
        return prev.filter((w) => w !== word);
      }

      return [...prev, word];
    });
  };
  const renderParagraph = (text) => {
    const regex = /\b(no one|Everyone|nobody|someone|everything|everyone)\b/g;

    const parts = text.split(regex);

    return parts.map((part, index) => {
      const matchedWord = clickableWords.find((word) => word === part);

      if (matchedWord) {
        const selected = selectedWords.includes(matchedWord);

        return (
          <button
            key={index}
            type="button"
            disabled={locked}
            onClick={() => toggleWord(matchedWord)}
            style={{
              background: "transparent",
              border: "none",
              borderBottom: selected
                ? "2px solid #6D2980"
                : "2px solid transparent",
              paddingBottom: "1px",
              color: "inherit",
              cursor: locked ? "default" : "pointer",
              padding: 0,
              margin: 0,
              lineHeight: "inherit",
            }}
          >
            {matchedWord}
          </button>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };
  // ------------------------
  // HANDLE INPUT
  // ------------------------

  const handleChange = (value) => {
    if (locked || result.input === true) return;

    setStudentAnswer(value);

    setResult((prev) => ({
      ...prev,
      input: undefined,
    }));
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (locked) return;

    // ------------------------
    // VALIDATION
    // ------------------------

    if (selectedWords.length === 0) {
      ValidationAlert.info("Please underline at least one word.");

      return;
    }

    if (!studentAnswer.trim()) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    // ------------------------
    // PARAGRAPH SCORE
    // ------------------------

    const paragraphCorrect = selectedWords.length;

    const paragraphOk = paragraphCorrect === 6;

    // ------------------------
    // INPUT
    // ------------------------

    const inputOk = normalize(studentAnswer) === normalize(answer);

    // ------------------------
    // SCORE
    // ------------------------

    let correctCount = 0;

    // 6 marks for paragraph
    correctCount += paragraphCorrect;

    // 1 mark for writing answer
    if (inputOk) correctCount++;

    setResult({
      paragraph: paragraphOk,
      input: inputOk,
    });

    const total = 7;

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
    setSelectedWords(clickableWords);

    setStudentAnswer(answer);

    setResult({
      paragraph: true,
      input: true,
    });

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    setSelectedWords([]);

    setStudentAnswer("");

    setResult({
      paragraph: false,
      input: undefined,
    });

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = () => (
    <div className="relative w-full">
      <input
        type="text"
        value={studentAnswer}
        disabled={locked || result.input === true}
        onChange={(e) => handleChange(e.target.value)}
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

          ${result.input === false ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {result.input === false && (
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
            F
          </span>
          Read and write.
        </h5>

        {/* PARAGRAPH BOX */}

        <div
          style={{
            border: "2px solid #6D2980",
            borderRadius: "12px",
            padding: "14px",
            overflow: "hidden",
            fontSize: "17px",
            color: "#3b2b20",
            background: "#fff",
          }}
        >
          {/* TOP IMAGE */}
          <img
            src={img1}
            alt=""
            style={{
              float: "right",
              width: "170px",
              height: "auto",
              objectFit: "contain",
              marginLeft: "12px",
              marginBottom: "8px",
              borderRadius: "6px",
            }}
          />
          {renderParagraph(firstPart)}

          {/* BOTTOM IMAGE */}
          <img
            src={img2}
            alt=""
            style={{
              float: "left",
              width: "120px",
              height: "auto",
              objectFit: "contain",
              marginRight: "12px",
              marginTop: "10px",
              clear: "both",
            }}
          />
          {renderParagraph(secondPart)}
        </div>

        {/* QUESTION 1 */}

        <div className="mt-10 mb-8">
          <div className="flex items-start gap-4">
            <span className="flex items-center gap-2">
              <span className="font-bold mr-2">1</span>
              Underline all the indefinite pronouns in the story.
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

        {/* QUESTION 2 */}

        <div className="mb-12">
          <div className="flex items-start gap-4 mb-5">
            <span className="font-bold">2</span>

            <span>
              Why was John shocked to see the pilot of the small airplane?
            </span>
          </div>

          <div className="pl-[35px]">{inputField()}</div>
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

export default WB_Unit8_Page47_Q1;
