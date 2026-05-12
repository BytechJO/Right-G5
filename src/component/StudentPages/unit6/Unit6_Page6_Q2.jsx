import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Unit6_Page6_Q2 = () => {
  const leftTable = [
    {
      long: "cannot",
      contraction: "",
      answer: "can't",
      side: "contraction",
    },

    {
      long: "",
      contraction: "she’ll",
      answer: "she will",
      side: "long",
    },

    {
      long: "will not",
      contraction: "",
      answer: "won't",
      side: "contraction",
    },

    {
      long: "",
      contraction: "mustn’t",
      answer: "must not",
      side: "long",
    },
  ];

  const rightTable = [
    {
      long: "",
      contraction: "you’d",
      answer: "you would",
      side: "long",
    },

    {
      long: "they would",
      contraction: "",
      answer: "they’d",
      side: "contraction",
    },

    {
      long: "",
      contraction: "I’d",
      answer: "I would",
      side: "long",
    },

    {
      long: "should not",
      contraction: "",
      answer: "shouldn’t",
      side: "contraction",
    },
  ];

  const allQuestions = [...leftTable, ...rightTable];

  const [answers, setAnswers] = useState(["", "", "", "", "", "", "", ""]);

  const [locked, setLocked] = useState(false);

  const [result, setResult] = useState([]);

  const normalize = (str) =>
    str.toLowerCase().replace(/[’.']/g, "'").replace(/\s+/g, " ").trim();

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

  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all fields.");

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((ans, i) => {
      const ok = normalize(ans) === normalize(allQuestions[i].answer);

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
    setAnswers(allQuestions.map((q) => q.answer));

    setResult([true, true, true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const renderTable = (data, startIndex) => (
    <table
      className="
        border-2
        border-[#7A2D91]
        rounded-[18px]
        overflow-hidden
        border-separate
        border-spacing-0
        text-[20px]
      "
    >
      <thead>
        <tr>
          <th
            className="
              border-b
              border-r
              border-[#7A2D91]
              px-8
              py-3
              text-[#7A2D91]
              font-bold
              bg-[#F8F3FB]
            "
          >
            long form
          </th>

          <th
            className="
              border-b
              border-[#7A2D91]
              px-8
              py-3
              text-[#7A2D91]
              font-bold
              bg-[#F8F3FB]
            "
          >
            contraction
          </th>
        </tr>
      </thead>

      <tbody>
        {data.map((item, i) => {
          const idx = startIndex + i;

          return (
            <tr key={i}>
              {/* LONG */}
              <td
                className="
                    border-r
                    border-b
                    border-[#7A2D91]
                    px-6
                    py-4
                    min-w-[190px]
                    text-center
                    relative
                  "
              >
                {item.side === "long" ? (
                  <>
                    <input
                      type="text"
                      value={answers[idx]}
                      disabled={locked || result[idx] === true}
                      onChange={(e) => handleChange(idx, e.target.value)}
                      className={`
                          w-full
                          text-center
                          outline-none
                          bg-transparent
                          text-[20px]
                          font-semibold

                          ${
                            result[idx] === false
                              ? "text-[#6D2980]"
                              : "text-[#6D2980]"
                          }
                        `}
                    />

                    {result[idx] === false && (
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "8px",
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
                          boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                        }}
                      >
                        ✕
                      </span>
                    )}
                  </>
                ) : (
                  item.long
                )}
              </td>

              {/* CONTRACTION */}
              <td
                className="
                    border-b
                    border-[#7A2D91]
                    px-6
                    py-4
                    min-w-[190px]
                    text-center
                    relative
                  "
              >
                {item.side === "contraction" ? (
                  <>
                    <input
                      type="text"
                      value={answers[idx]}
                      disabled={locked || result[idx] === true}
                      onChange={(e) => handleChange(idx, e.target.value)}
                      className={`
                          w-full
                          text-center
                          outline-none
                          bg-transparent
                          text-[20px]
                          font-semibold

                          ${
                            result[idx] === false
                              ? "text-[#6D2980]"
                              : "text-[#6D2980]"
                          }
                        `}
                    />

                    {result[idx] === false && (
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "8px",
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
                  </>
                ) : (
                  item.contraction
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-25">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            E
          </span>
          Write either the long form or the contraction for each item.
        </h5>

        {/* TABLES */}
        <div className="flex justify-center gap-12">
          {renderTable(leftTable, 0)}

          {renderTable(rightTable, 4)}
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

export default Unit6_Page6_Q2;
