import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGES
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U5/Page 31/Asset 5.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U5/Page 31/Asset 16.svg";
import img3 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U5/Page 31/Asset 7.svg";
import img4 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U5/Page 31/Asset 8.svg";
import img5 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U5/Page 31/Asset 9.svg";
import img6 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U5/Page 31/Asset 15.svg";

const WB_Unit5_Page31_Q1 = () => {
  const answers = ["4", "6", "2", "1", "3", "5"];

  const sentences = [
    "Could you please show me where the restroom is?",

    "Would you please eat your dinner?",

    "We would like to order, please.",

    "I would prefer steak, please.",

    "Would you please close the door?",

    "Could you please help me carry the books?",
  ];

  const images = [img1, img2, img3, img4, img5, img6];

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

  const normalize = (str) => str.trim();

  // ------------------------
  // HANDLE INPUT
  // ------------------------

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    // فقط رقم واحد
    if (value && !/^[1-6]$/.test(value)) return;

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

    const hasEmpty = studentAnswers.some((a) => !a);

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

  const inputField = (i) => (
    <div className="relative">
      <input
        type="text"
        value={studentAnswers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        maxLength={1}
        className={`
          w-[26px]
          h-[26px]
          text-center
          outline-none
          text-[16px]
          text-[#6D2980]
          font-bold
        `}
        style={{
          borderRadius: "3px",
        }}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            width: "18px",
            height: "18px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
            fontWeight: "bold",
            border: "2px solid white",
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
          Read, look, and number.
        </h5>

        {/* SENTENCES */}

        <div className="grid grid-cols-2 gap-2 mb-10">
          {sentences.map((sentence, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="font-bold w-[18px]">{index + 1}</span>

              <span>{sentence}</span>
            </div>
          ))}
        </div>

        {/* IMAGES */}

        <div className="grid grid-cols-3 gap-y-5 gap-x-2 mb-10">
          {images.map((img, index) => (
            <div key={index} className="relative w-fit">
              <img
                src={img}
                alt=""
                style={{
                  width: "205px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />

              {/* NUMBER BOX */}

              <div className="absolute top-px right-px">
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

export default WB_Unit5_Page31_Q1;
