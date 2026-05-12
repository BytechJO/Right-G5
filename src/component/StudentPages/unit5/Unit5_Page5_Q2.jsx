import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

import leftImage from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 44/Asset 33.svg";

import Jonas from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 44/SVG/Asset 34.svg";

import Natalie from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 44/SVG/Asset 35.svg";

import Pete from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 44/SVG/Asset 36.svg";

import Sophia from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 44/SVG/Asset 37.svg";

import Felicity from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 44/SVG/Asset 38.svg";

import cloud from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 44/SVG/Asset 39.svg";

const Unit5_Page5_Q2 = () => {
  const [answers, setAnswers] = useState(["", "", "", "", ""]);

  const [locked, setLocked] = useState(false);

  const [result, setResult] = useState([]);

  const correctAnswers = [
    ["I would prefer a burger, please."],

    ["I would like lemonade, please."],

    ["Could I please have a bagel?", "Could I please have bagels?"],

    ["I would like some milk, please."],

    ["Could you please give me some waffles?"],
  ];


  const handleChange = (i, val) => {
    if (locked || result[i] === true) return;

    const updated = [...answers];

    updated[i] = val;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };
  const showAnswers = () => {
    setAnswers([
      correctAnswers[0][0],
      correctAnswers[1][0],
      correctAnswers[2][0],
      correctAnswers[3][0],
      correctAnswers[4][0],
    ]);

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  const reset = () => {
    setAnswers(["", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const rightCharacters = [Jonas, Natalie, Pete, Sophia, Felicity];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div className="div-forall">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-10">
          <span className="ex-A" style={{ marginRight: "10px" }}>
            B
          </span>
          Read the chart and complete.
        </h5>

        {/* MAIN CONTENT */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "55px",
            marginBottom: "40px",
          }}
        >
          {/* LEFT IMAGE */}
          <img
            src={leftImage}
            alt=""
            style={{
              width: "450px",
              objectFit: "contain",
            }}
          />

          {/* RIGHT SIDE */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              marginTop: "6px",
            }}
          >
            {rightCharacters.map((char, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {/* CHARACTER */}
                <img
                  src={char}
                  alt=""
                  style={{
                    width: "95px",
                    height: "95px",
                    objectFit: "contain",
                  }}
                />

                {/* NUMBER */}
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  {i + 1}
                </span>

                {/* CLOUD */}
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <img
                    src={cloud}
                    alt=""
                    style={{
                      width: "250px",
                      height: "90px",
                    }}
                  />

                  {/* INPUT */}
                  <textarea
                    rows={2}
                    value={answers[i]}
                    disabled={locked || result[i] === true}
                    placeholder="Write here..."
                    onChange={(e) => handleChange(i, e.target.value)}
                    style={{
                      position: "absolute",
                      top: "16px",
                      left: "40px",

                      width: "200px",
                      height: "60px",

                      outline: "none",
                      background: "transparent",

                      fontSize: "18px",

                      color:  "#6D2980",

                      fontWeight: "600",

                      resize: "none",

                      overflow: "hidden",

                      lineHeight: "1.4",

                      whiteSpace: "pre-wrap",
                      border: "1.5px dashed #c084d2",
                      borderRadius: "10px",
                      padding: "6px 10px",
                    }}
                  />
          
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>

        <button className="show-answer-btn" onClick={showAnswers}>
          Show Answer
        </button>
      </div>
    </div>
  );
};

export default Unit5_Page5_Q2;
