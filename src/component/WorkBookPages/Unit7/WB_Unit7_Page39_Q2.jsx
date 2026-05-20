import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGES
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U7/Page 39/Asset 13.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U7/Page 39/Asset 14.svg";
import img3 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U7/Page 39/Asset 15.svg";

const WB_Unit7_Page39_Q2 = () => {
  const answers = [
    "miss",
    "treasuring",

    "deal with it",
    "keeping busy",

    "orphanage",
    "jotting it down",
    "at the top of my list",
  ];

  const [studentAnswers, setStudentAnswers] = useState([
    "",
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

    const newResults = studentAnswers.map((answer, i) => {
      const ok = normalize(answer) === normalize(answers[i]);

      if (ok) correctCount++;

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

    setResult([true, true, true, true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    setStudentAnswers(["", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i, width) => (
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
            top: "2px",
            right: "-6px",
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

  // ------------------------
  // WORD CLOUD
  // ------------------------

  const wordCloud = (image, number) => (
    <div className="relative w-60">
      <span className="absolute top-0 left-0 font-bold text-[18px]">
        {number}
      </span>

      <img
        src={image}
        alt=""
        style={{
          width: "220px",
          height: "auto",
          objectFit: "contain",
          marginLeft: "25px",
        }}
      />
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
            B
          </span>
          Read and write.
        </h5>

        {/* SECTION 1 */}

        <div className="grid grid-cols-[260px_1fr] gap-8 mb-8">
          {/* LEFT */}

          <div>{wordCloud(img1, 1)}</div>

          {/* RIGHT */}

          <div className="leading-[1.8] pt-6">
            <div>
              <span className="font-bold">Helen:</span> Do you ever{" "}
              {inputField(0, "160px")} being young, Grandma?
            </div>

            <div className="mt-3">
              <span className="font-bold">Grandma:</span> Yes, but I’m{" "}
              {inputField(1, "220px")} my life now very much, also.
            </div>
          </div>
        </div>

        {/* SECTION 2 */}

        <div className="grid grid-cols-[260px_1fr] gap-8 mb-8">
          {/* LEFT */}

          <div>{wordCloud(img2, 2)}</div>

          {/* RIGHT */}

          <div className="leading-[1.8] pt-2">
            <div>
              <span className="font-bold">Helen:</span> That’s a good way to{" "}
              {inputField(2, "200px")}.
            </div>

            <div>What are you doing on weekends?</div>

            <div className="mt-3">
              <span className="font-bold">Grandma:</span> I’m{" "}
              {inputField(3, "220px")}, that’s for sure!
            </div>
          </div>
        </div>

        {/* SECTION 3 */}

        <div className="grid grid-cols-[260px_1fr] gap-8">
          {/* LEFT */}

          <div>{wordCloud(img3, 3)}</div>

          {/* RIGHT */}

          <div className="leading-[1.8] pt-2">
            <div>
              <span className="font-bold">Grandma:</span> The children at the{" "}
              {inputField(4, "180px")} would love to see you if you can come
              next weekend.
            </div>

            <div className="mt-3">
              <span className="font-bold">Helen:</span> I’m{" "}
              {inputField(5, "230px")} right now, Grandma. You’re{" "}
              {inputField(6, "320px")} for next weekend.
            </div>
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

export default WB_Unit7_Page39_Q2;
