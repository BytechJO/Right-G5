import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Review4_Page2_Q2 = () => {
  const [answers, setAnswers] = useState(["", "", ""]);

  const [locked, setLocked] = useState(false);

  const [result, setResult] = useState([]);

  const [selectedWords, setSelectedWords] = useState([[], [], []]);

  const [circleResult, setCircleResult] = useState([]);

  const correctAnswers = [
    "Some people claim that eating frequently is better for losing weight.",
    "Some people believe that eating less regularly is a healthier way to lose weight.",
    "Your body is always digesting food.",
  ];

  const adverbs = ["frequently", "regularly", "always"];

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[()]/g, "")
      .replace(/[.?!,]/g, "")
      .replace(/\s+/g, "")
      .trim();

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

  const toggleWord = (questionIndex, word) => {
    if (locked) return;

    setSelectedWords((prev) => {
      const copy = [...prev];

      if (copy[questionIndex].includes(word)) {
        copy[questionIndex] = copy[questionIndex].filter((w) => w !== word);
      } else {
        copy[questionIndex] = [word];
      }

      return copy;
    });
  };

  const renderSentence = (sentence, qIndex) => {
    return sentence.split(" ").map((word, index) => {
      const cleanWord = word.replace(/[.?!,]/g, "");

      const selected = selectedWords[qIndex].includes(cleanWord);
      
      const wrong = circleResult[qIndex] === false && selected;

      return (
        <React.Fragment key={index}>
          <span
            onClick={() => toggleWord(qIndex, cleanWord)}
            style={{
              border: selected
                ? wrong
                  ? "2px solid red"
                  : "2px solid #7A2D91"
                : "2px solid transparent",

              borderRadius: "999px",

              padding: "0px 6px",

              margin: "0 2px",

              cursor: "pointer",

              display: "inline-block",
            }}
          >
            {word}
          </span>{" "}
        </React.Fragment>
      );
    });
  };

  const input = (i) => (
    <span className="relative inline-block">
      <input
        disabled={locked || result[i] === true}
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`border-b outline-none text-[#6D2980] font-semibold w-[700px] px-2
        ${result[i] === false ? "border-red-500" : "border-black"}
      `}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
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

    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }
    const missingCircle = selectedWords.some((arr) => arr.length === 0);

    if (missingCircle) {
      ValidationAlert.info("Please circle the adverbs.");

      return;
    }
    let correctCount = 0;

    const sentenceResults = [];

    const circleResults = [];

    answers.forEach((a, i) => {
      const sentenceOk = normalize(a) === normalize(correctAnswers[i]);

      const selected = selectedWords[i][0]?.toLowerCase();

      const circleOk = selected === adverbs[i].toLowerCase();

      sentenceResults[i] = sentenceOk;

      circleResults[i] = circleOk;

      if (sentenceOk && circleOk) {
        correctCount++;
      }
    });

    setResult(sentenceResults);

    setCircleResult(circleResults);

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

    setSelectedWords([["frequently"], ["regularly"], ["always"]]);

    setResult([true, true, true]);

    setCircleResult([true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", ""]);

    setResult([]);

    setCircleResult([]);

    setSelectedWords([[], [], []]);

    setLocked(false);
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
      <div className="div-forall mb-20">
        <h5 className="header-title-page8 mb-10">
          <span className="mr-2">E</span>
          Read and answer the questions with adverbs of frequency. Then circle
          the adverbs in your answer.
        </h5>

        {/* READING BOX */}
        <div
          style={{
            border: "2px solid #7A2D91",
            borderRadius: "14px",
            padding: "20px",
            fontSize: "18px",
            lineHeight: "2",
            marginBottom: "35px",
          }}
        >
          There are many different plans on how to lose weight. Some claim that
          eating frequently is better for your body to lose weight. Others
          believe that eating less regularly is a healthier way to lose weight.
          Generally, your body needs about three hours to digest a meal. Eating
          meals every two or three hours means your body is always in the
          process of digesting food. Waiting longer between meals means the body
          begins to use the stored energy in your body. People who want to lose
          weight should eat foods high in fiber and protein, like vegetables,
          whole grains, and nuts.
        </div>

        {/* QUESTIONS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "34px",
            fontSize: "18px",
          }}
        >
          {/* 1 */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                1
              </span>

              <div>What do some people believe is better?</div>
            </div>

            <div
              style={{
                marginLeft: "30px",
              }}
            >
              {input(0)}

              {answers[0] && (
                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "20px",
                  }}
                >
                  {renderSentence(answers[0], 0)}
                </div>
              )}
            </div>
          </div>

          {/* 2 */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                2
              </span>

              <div>
                {" "}
                What do some people believe is a healthier way to losing weight?
              </div>
            </div>

            <div
              style={{
                marginLeft: "30px",
              }}
            >
              {input(1)}

              {answers[1] && (
                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "20px",
                  }}
                >
                  {renderSentence(answers[1], 1)}
                </div>
              )}
            </div>
          </div>

          {/* 3 */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                3
              </span>

              <div>What happens if you eat meals every two to three hours?</div>
            </div>

            <div
              style={{
                marginLeft: "30px",
              }}
            >
              {input(2)}

              {answers[2] && (
                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "20px",
                  }}
                >
                  {renderSentence(answers[2], 2)}
                </div>
              )}
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

export default Review4_Page2_Q2;
