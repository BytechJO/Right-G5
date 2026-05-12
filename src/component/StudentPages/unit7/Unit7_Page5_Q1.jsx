import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGES
import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 7 Helen Is Visiting Grandma Folder/Page 62/SVG/Asset 12.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 7 Helen Is Visiting Grandma Folder/Page 62/SVG/Asset 13.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 7 Helen Is Visiting Grandma Folder/Page 62/SVG/Asset 14.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 7 Helen Is Visiting Grandma Folder/Page 62/SVG/Asset 15.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 5 Unit 7 Helen Is Visiting Grandma Folder/Page 62/SVG/Asset 16.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 5 Unit 7 Helen Is Visiting Grandma Folder/Page 62/SVG/Asset 17.svg";

const Unit7_Page5_Q1 = () => {
  const questions = [
    {
      image: img1,
      answer: "super",
    },

    {
      image: img2,
      answer: "album",
    },

    {
      image: img3,
      answer: "jotting down",
    },

    {
      image: img4,
      answer: "treasure",
    },

    {
      image: img5,
      answer: "orphanage",
    },

    {
      image: img6,
      answer: "miss",
    },
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) => str.toLowerCase().trim();

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...answers];

    updated[i] = value;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((a, i) => {
      const ok = normalize(a) === normalize(questions[i].answer);

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

  const showAnswers = () => {
    setAnswers([
      "super",
      "album",
      "jotting down",
      "treasure",
      "orphanage",
      "miss",
    ]);

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-13">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            A
          </span>
          Look and match.
        </h5>

        {/* WORD BOX */}
        <div
          style={{
            width: "760px",
            height: "52px",
            background: "#E9E1EC",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            margin: "0 auto 35px auto",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          <span>
            {" "}
            <span className="font-bold mr-2">a</span> album
          </span>

          <span>
            <span className="font-bold mr-2">b</span> orphanage
          </span>

          <span>
            <span className="font-bold mr-2">c</span> treasure
          </span>

          <span>
            <span className="font-bold mr-2">d </span>miss
          </span>

          <span>
            <span className="font-bold mr-2">e </span>jotting down
          </span>

          <span>
            <span className="font-bold mr-2">f </span>super
          </span>
        </div>

        {/* QUESTIONS */}
        <div
          className="
            grid
            grid-cols-3
            gap-y-14
            gap-x-20
          "
        >
          {questions.map((q, i) => (
            <div
              key={i}
              className="
                  flex
                  items-start
                  gap-4
                "
            >
              {/* NUMBER */}
              <span className="font-bold text-[18px]">{i + 1}</span>

              {/* IMAGE + INPUT */}
              <div
                className="
    flex
    items-end
    gap-3
  "
              >
                <img
                  src={q.image}
                  alt=""
                  style={{
                    width: "130px",
                    height: "130px",
                    objectFit: "cover",
                  }}
                />

                <div className="relative">
                  <input
                    type="text"
                    value={answers[i]}
                    disabled={locked || result[i] === true}
                    onChange={(e) => handleChange(i, e.target.value)}
                    className={`
        w-[145px]
        border-0
        border-b
        outline-none
        bg-transparent
        text-[18px]
        font-bold
        pb-1

        ${
          result[i] === false
            ? "border-[#D1232A] text-[#6D2980]"
            : "border-black text-[#6D2980]"
        }
      `}
                  />

                  {/* WRONG */}
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
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                      }}
                    >
                      ✕
                    </span>
                  )}
                </div>
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

export default Unit7_Page5_Q1;
