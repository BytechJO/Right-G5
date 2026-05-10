import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
const Review3_Page2_Q1 = () => {
  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);
  const correctAnswers = [
    "popular",
    "wonderful",
    "strange enough",
    "Nowadays",
    "tin cans",
  ];
  const normalize = (str) => str.toLowerCase().replace(/\s+/g, "").trim();
  const handleChange = (i, val) => {
    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };
  const handleReset = () => {
    setAnswers(["", "", "", "", ""]);
    setResult([]);
    setLocked(false);
  };
  const input = (i, width = "w-[180px]") => (
    <span className="relative inline-block mx-1">
      <input
        disabled={locked || result[i] === true}
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`border-b outline-none  font-semibold text-[#6D2980] ${width}
      ${result[i] === false ? "border-red-500" : "border-black"}
    `}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            transform: "translateY(-50%)",
            width: "20px",
            height: "20px",
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
            pointerEvents: "none",
            zIndex: 3,
          }}
        >
          ✕
        </span>
      )}
    </span>
  );
  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((a) => !a?.trim())) {
      ValidationAlert.info();
      return;
    }

    let correctCount = 0;

    const res = answers.map((a, i) => {
      const ok = normalize(a) === normalize(correctAnswers[i]);

      if (ok) correctCount++;

      return ok;
    });

    setResult(res);

    const total = correctAnswers.length;

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
    setLocked(true);
  };
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <h5 className="header-title-page8">
            <span className="mr-2">D</span>
            Read and complete the sentences.
          </h5>

          {/* Reading Box */}
          <div
            className="text-[18px] leading-[2.2] p-8 rounded-[20px] mb-5"
            style={{
              border: "2px solid #7A2D91",
            }}
          >
            Have you ever eaten something really strange? Haggis, a traditional
            dish of Scotland, is made from the liver, heart, and lungs of a
            sheep. The organs of the sheep are minced and then mixed with onion,
            oatmeal, spices, and salt. If that doesn’t sound strange enough, the
            mixture is then stuffed into the stomach of the sheep and boiled for
            a couple of hours. Nowadays, haggis can be purchased at supermarkets
            in tin cans. A popular encyclopedia on food gives haggis wonderful
            reviews, claiming it to have an excellent nutty taste, as well as
            delicious and tasty. Perhaps, you’ll be brave enough to try it
            someday!
          </div>

          {/* Questions */}
          <div className="text-[18px] flex flex-col gap-y-15">
            <div className="flex items-start">
              <span className="font-bold mr-4 shrink-0">1</span>

              <div>
                If that doesn’t sound {input(2, "w-[300px]")}, the mixture is
                then stuffed into the stomach of the sheep and boiled for a
                couple of hours.
              </div>
            </div>

            <div>
              <span className="font-bold mr-4">2</span>
              {input(3, "w-[180px]")}, haggis can be purchased at supermarkets
              in {input(4, "w-[180px]")}.
            </div>
            <div>
              <span className="font-bold mr-4">3</span>A {input(0, "w-[180px]")}{" "}
              encyclopedia on food gives haggis {input(1, "w-[180px]")} reviews.
            </div>
          </div>
        </div>
      </div>

      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>

        <button onClick={showAnswers} className="show-answer-btn">
          Show Answer
        </button>

        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Review3_Page2_Q1;
