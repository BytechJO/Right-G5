import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
// IMAGE
import springImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U7/Page 43/Asset 19.svg";

const WB_Unit7_Page43_Q1 = () => {
  const questions = [
    {
      sentence: "The wind is blowing lightly.",

      correct: true,
    },

    {
      sentence: "Helen and her friends are catching grasshoppers.",

      correct: false,
    },

    {
      sentence: "Everyone is getting bored.",

      correct: false,
    },

    {
      sentence: "Stella is smelling the flowers.",

      correct: false,
    },

    {
      sentence: "Harley is eating a sandwich.",

      correct: true,
    },

    {
      sentence: "Tom is watching the football game.",

      correct: false,
    },
  ];

  const [selected, setSelected] = useState(Array(questions.length).fill(""));

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  // ------------------------
  // SELECT
  // ------------------------

  const handleSelect = (index, value) => {
    if (locked || result[index] === true) return;

    const updated = [...selected];

    updated[index] = value;

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

    const newResults = questions.map((q, i) => {
      const correctSymbol = q.correct ? "true" : "false";

      const ok = selected[i] === correctSymbol;

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
    setSelected(questions.map((q) => (q.correct ? "true" : "false")));

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    setSelected(Array(questions.length).fill(""));

    setResult([]);

    setLocked(false);
  };

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
            J
          </span>
          Read and circle <span className="text-[#00AEEF]">true</span> or{" "}
          <span className="text-[#00AEEF]">false</span>.
        </h5>
        {/* STORY */}

        <div
          style={{
            border: "2px solid #8C3FAF",
            borderRadius: "10px",
            padding: "14px 16px",
            display: "flex",
            alignItems: "flex-start",
            gap: "14px",
            background: "#fff",
          }}
        >
          {/* TEXT */}

          <div
            style={{
              flex: 1,
              fontSize: "17px",
              lineHeight: "2",
              color: "#3d2b1f",
              textAlign: "left",
            }}
          >
            It is springtime. Helen and her friends are playing in her backyard.
            They are enjoying the wonderful breeze and the super colors of
            spring. They are catching butterflies and putting them in glass jars
            that have openings for air. The wind is blowing lightly. The birds
            are chirping. They were waiting for spring all winter long. Finally,
            it has arrived. There are many fun outdoor games and activities to
            do. Everyone is keeping busy with something. Hansel is playing tag
            with Sarah. Stella is counting the flowers that are blooming. Harley
            is eating his sandwich. Tom is watching the grasshoppers hop.
          </div>

          {/* IMAGE */}

          <div
            style={{
              flexShrink: 0,
              alignSelf: "flex-end",
            }}
          >
            <img
              src={springImg}
              alt=""
              style={{
                width: "220px",
                height: "170px",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
        </div>
        {/* QUESTIONS */}

        <div className="flex flex-col gap-7 mt-8 mb-10">
          {questions.map((q, index) => (
            <div
              key={index}
              className="
          flex
          items-center
          justify-between
          gap-6
        "
            >
              {/* SENTENCE */}

              <div className="flex items-center gap-3 flex-1">
                <span className="font-bold">{index + 1}</span>

                <span>{q.sentence}</span>
              </div>

              {/* OPTIONS */}

              <div className="flex items-center gap-10">
                {/* TRUE */}

                <button
                  type="button"
                  disabled={locked || result[index] === true}
                  onClick={() => handleSelect(index, "true")}
                  className="relative"
                  style={{
                    borderRadius: "50%",
                    padding: "2px 8px",
                  }}
                >
                  <span
                    style={{
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    true
                  </span>

                  {selected[index] === "true" && (
                    <div
                      style={{
                        position: "absolute",
                        inset: "-6px",
                        border: "2px solid #6D2980",
                        borderRadius: "50%",
                      }}
                    />
                  )}

                  {result[index] === false &&
                    selected[index] === "true" &&
                    !questions[index].correct && (
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
                </button>

                {/* FALSE */}

                <button
                  type="button"
                  disabled={locked || result[index] === true}
                  onClick={() => handleSelect(index, "false")}
                  className="relative"
                  style={{
                    borderRadius: "50%",
                    padding: "2px 8px",
                  }}
                >
                  <span
                    style={{
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    false
                  </span>

                  {selected[index] === "false" && (
                    <div
                      style={{
                        position: "absolute",
                        inset: "-6px",
                        border: "2px solid #6D2980",
                        borderRadius: "50%",
                      }}
                    />
                  )}

                  {result[index] === false &&
                    selected[index] === "false" &&
                    questions[index].correct && (
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
                </button>
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

export default WB_Unit7_Page43_Q1;
