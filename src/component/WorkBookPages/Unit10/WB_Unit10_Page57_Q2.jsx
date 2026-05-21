import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGES
import hayImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U10/Page 57/Asset 11.svg";
import violinImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U10/Page 57/Asset 12.svg";
import pianoImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U10/Page 57/Asset 3.svg";

const WB_Unit10_Page57_Q2 = () => {
  const questions = [
    {
      scrambled: "vanresgtih",

      sentence: (
        <>
          We are{" "}
          <span
            style={{
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            }}
          >
            vanresgtih
          </span>{" "}
          our hay.
        </>
      ),

      answer: "We are harvesting our hay.",
    },

    {
      scrambled: "spyhomyn",

      sentence: (
        <>
          He played in a{" "}
          <span
            style={{
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            }}
          >
            spyhomyn
          </span>{" "}
          with his violin.
        </>
      ),

      answer: "He played in a symphony with his violin.",
    },

    {
      scrambled: "nstrntuiem",

      sentence: (
        <>
          This is a very fun{" "}
          <span
            style={{
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            }}
          >
            nstrntuiem
          </span>
          .
        </>
      ),

      answer: "This is a very fun instrument.",
    },
  ];

  const images = [hayImg, violinImg, pianoImg];

  const [studentAnswers, setStudentAnswers] = useState(["", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[-.?!,’']/g, "")
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
      const ok = normalize(answer) === normalize(questions[i].answer);

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = questions.length;

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
    setStudentAnswers(questions.map((q) => q.answer));

    setResult([true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    setStudentAnswers(["", "", ""]);

    setResult([]);

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
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <h5 className="header-title-page8 mb-[7vh]">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            B
          </span>
          Look, unscramble, and write.
        </h5>

        {/* QUESTIONS */}

        <div className="flex flex-col gap-15">
          {questions.map((q, index) => (
            <div key={index} className="flex gap-6 items-start">
              {/* NUMBER */}

              <span className="font-bold mt-2">{index + 1}</span>

              {/* IMAGE */}

              <img
                src={images[index]}
                alt=""
                style={{
                  width: "200px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />

              {/* RIGHT */}

              <div className="flex-1 pt-3">
                {/* SCRAMBLED */}

                <div className="mb-5 leading-[1.8]">{q.sentence}</div>

                {/* INPUT */}

                {inputField(index)}
              </div>
            </div>
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

export default WB_Unit10_Page57_Q2;
