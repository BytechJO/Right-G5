import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 45/Asset 29.svg";
import grammer_u1 from "../../../assets/audio/ClassBook/U5/PG 45/cd25pg45.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const Unit5_Page6_Q2 = () => {
  const captions = [
    {
      start: 0.34,
      end: 8.26,
      text: "Page 45, write activities, exercise D. Listen and read the conversation, then write true or false.",
    },
    {
      start: 9,
      end: 19.859,
      text: "Jane is sitting in a restaurant. She waits patiently for the server to come and take her order. The waiter finally comes to her table. Good afternoon. What would you like to order?",
    },
    {
      start: 19.859,
      end: 24.279,
      text: "I'm sorry. I don't have the menu. Could I please see it?",
    },
    {
      start: 24.279,
      end: 26.539,
      text: "Certainly. Here you go.",
    },
    {
      start: 26.539,
      end: 30.1,
      text: "Thank you. I would like to order the chicken salad.",
    },
    {
      start: 30.1,
      end: 32.919,
      text: "Would you like anything to drink?",
    },
    {
      start: 32.919,
      end: 36.399,
      text: "Yes. Would you please bring some tea?",
    },
    {
      start: 36.399,
      end: 39.279,
      text: "Sure. Would you like anything else?",
    },
    {
      start: 39.279,
      end: 43.679,
      text: "Yes, please. I would like a burger and some fries.",
    },
    {
      start: 43.679,
      end: 47.299,
      text: "Okay. Your order will be ready in 15 minutes.",
    },
    {
      start: 47.299,
      end: 48.739,
      text: "Thank you very much.",
    },
  ];

  const [answers, setAnswers] = useState(["", "", "", "", ""]);

  const [locked, setLocked] = useState(false);

  const [result, setResult] = useState([]);

  const correctAnswers = ["False", "True", "True", "False", "False"];

  const handleSelect = (i, val) => {
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

  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((a) => !a)) {
      ValidationAlert.info("Please complete all fields.");

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((ans, i) => {
      const ok =
        ans.trim().toLowerCase() === correctAnswers[i].trim().toLowerCase();

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = answers.length;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
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
    setAnswers(correctAnswers);

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const questions = [
    "Jane ordered a steak.",

    "The server was polite to Jane.",

    "Jane wanted some tea.",

    "Jane didn’t want any fries.",

    "The order would be ready in an hour.",
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div className="div-forall mb-15">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-4">
          <span className="ex-A" style={{ marginRight: "10px" }}>
            D
          </span>
          Listen and read the conversation. Then write{" "}
          <span className="text-[#19B6F0]">true</span> or
          <span className="text-[#19B6F0]">false</span> .
        </h5>
        <QuestionAudioPlayer
          src={grammer_u1}
          captions={captions}
          stopAtSecond={8.5}
        />
        {/* TOP TEXT */}
        <div className="flex flex-col gap-1 text-[18px] leading-normal mb-6">
          <div>
            Jane is sitting in a restaurant. She waits patiently for the server
            to come and take her order.
          </div>

          <div>The waiter finally comes to her table.</div>
        </div>

        {/* DIALOG + IMAGE */}
        <div className="flex items-start gap-8 mb-10">
          {/* DIALOG */}
          <div className="flex flex-col gap-2 text-[18px] leading-[1.6] flex-1">
            <div className="flex gap-4">
              <span className="text-[#7A2D91] min-w-20">Server:</span>

              <span>Good afternoon! What would you like to order?</span>
            </div>

            <div className="flex gap-4">
              <span className="text-[#F28C28] min-w-20">Jane:</span>

              <span>
                I’m sorry. I don’t have the menu. Could I please see it?
              </span>
            </div>

            <div className="flex gap-4">
              <span className="text-[#7A2D91] min-w-20">Server:</span>

              <span>Certainly. Here you go.</span>
            </div>

            <div className="flex gap-4">
              <span className="text-[#F28C28] min-w-20">Jane:</span>

              <span>Thank you. I would like to order the chicken salad.</span>
            </div>

            <div className="flex gap-4">
              <span className="text-[#7A2D91] min-w-20">Server:</span>

              <span>Would you like anything to drink?</span>
            </div>

            <div className="flex gap-4">
              <span className="text-[#F28C28] min-w-20">Jane:</span>

              <span>Yes. Would you please bring some tea?</span>
            </div>

            <div className="flex gap-4">
              <span className="text-[#7A2D91] min-w-20">Server:</span>

              <span>Sure. Would you like anything else?</span>
            </div>

            <div className="flex gap-4">
              <span className="text-[#F28C28] min-w-20">Jane:</span>

              <span>Yes, please. I would like a burger and some fries.</span>
            </div>

            <div className="flex gap-4">
              <span className="text-[#7A2D91] min-w-20">Server:</span>

              <span>Okay. Your order will be ready in 15 minutes.</span>
            </div>

            <div className="flex gap-4">
              <span className="text-[#F28C28] min-w-20">Jane:</span>

              <span>Thank you very much.</span>
            </div>
          </div>

          {/* IMAGE */}
          <img
            src={img1}
            alt=""
            style={{
              width: "35%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-5">
          {questions.map((q, i) => (
            <div key={i} className="flex items-center gap-5">
              {/* NUMBER */}
              <span className="font-bold text-[18px] w-6">{i + 1}</span>

              {/* QUESTION */}
              <div className="text-[18px] flex-1">{q}</div>
              {/* ANSWER INPUT */}
              <div className="relative">
                <input
                  type="text"
                  value={answers[i]}
                  disabled={locked || result[i] === true}
                  onChange={(e) => handleSelect(i, e.target.value)}
                  className={`
                      w-[220px]
                      h-[50px]
                      rounded-[18px]
                      border-2
                      px-5
                      text-[22px]
                      font-semibold
                      outline-none
                      transition-all
                      text-center

                      ${
                        result[i] === false
                          ? "border-[#D1232A] text-[#19B6F0]"
                          : "border-[#7A2D91] text-[#19B6F0]"
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

                      width: "22px",

                      height: "22px",

                      background: "#ef4444",

                      color: "white",

                      borderRadius: "50%",

                      display: "flex",

                      alignItems: "center",

                      justifyContent: "center",

                      fontSize: "12px",

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

export default Unit5_Page6_Q2;
