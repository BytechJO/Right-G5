import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// LEFT IMAGES
import left1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 37/Asset 15.svg";
import left2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 37/Asset 17.svg";
import left3 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 37/Asset 19.svg";
import left4 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 37/Asset 30.svg";
import left5 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 37/Asset 23.svg";

// RIGHT IMAGES
import right1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 37/Asset 16.svg";
import right2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 37/Asset 18.svg";
import right3 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 37/Asset 20.svg";
import right4 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 37/Asset 22.svg";
import right5 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 37/Asset 24.svg";
import trueImg from "../../../assets/imgs/true.svg";
const WB_Unit_Page_Q29 = () => {
  const questions = [
    {
      sentence: "You should wear a coat when it’s cold outside.",

      correct: "left",
    },

    {
      sentence: "We will go to the museum.",

      correct: "right",
    },

    {
      sentence: "She can ride a bike.",

      correct: "left",
    },

    {
      sentence: "She couldn’t go to school today.",

      correct: "right",
    },

    {
      sentence: "We might ride the train.",

      correct: "right",
    },
  ];

  const leftImages = [left1, left2, left3, left4, left5];

  const rightImages = [right1, right2, right3, right4, right5];

  const [selected, setSelected] = useState(["", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  // ------------------------
  // SELECT
  // ------------------------

  const handleSelect = (index, side) => {
    if (locked || result[index] === true) return;

    const updated = [...selected];

    updated[index] = side;

    setSelected(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[index] = undefined;

      return copy;
    });
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = selected.some((s) => !s);

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = selected.map((answer, i) => {
      const ok = answer === questions[i].correct;

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
    setSelected(["left", "right", "left", "right", "right"]);

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    setSelected(["", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // CHECKBOX
  // ------------------------

  const checkbox = (index, side) => {
    const isSelected = selected[index] === side;

    const isCorrect = questions[index].correct === side;

    const showWrong = result[index] === false && isSelected && !isCorrect;


    return (
      <button
        type="button"
        onClick={() => handleSelect(index, side)}
        disabled={locked || result[index] === true}
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          width: "32px",
          height: "32px",
          background: "white",
          border: "1.5px solid #7D3C98",
          borderRadius: "0 6px 0 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: locked ? "default" : "pointer",
        }}
      >
        {isSelected && (
          <img
            src={trueImg}
            alt=""
            style={{
              width: "18px",
              height: "18px",
              objectFit: "contain",
            }}
          />
        )}

        {showWrong && (
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
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <h5 className="header-title-page8 mb-10">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            L
          </span>
          Read and write <span className="text-[#D1232A]">✓</span>.
        </h5>

        {/* QUESTIONS */}

        <div className="flex flex-col gap-6 mb-10">
          {questions.map((item, index) => (
            <div
              key={index}
              className="relative  grid grid-cols-[140px_1fr_140px] items-center gap-10"
            >
              {/* NUMBER */}

              <div className="absolute ml-[-25px] mt-[-5px] font-bold">
                {index + 1}
              </div>

              {/* LEFT IMAGE */}

              <div
                style={{
                  position: "relative",
                  width: "140px",
                  height: "auto",
                }}
              >
                <img
                  src={leftImages[index]}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />

                {checkbox(index, "left")}
              </div>

              {/* SENTENCE */}

              <div className="text-center leading-[1.4]">{item.sentence}</div>

              {/* RIGHT IMAGE */}

              <div
                style={{
                  position: "relative",
                  width: "140px",
                  height: "auto",
                }}
              >
                <img
                  src={rightImages[index]}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />

                {checkbox(index, "right")}
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

export default WB_Unit_Page_Q29;
