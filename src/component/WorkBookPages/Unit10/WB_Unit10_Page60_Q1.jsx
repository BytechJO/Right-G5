import React, { useRef, useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit10_Page60_Q1 = () => {
  const answers = [
    ["a", "c", "r", "e", "s"],
    ["s", "y", "m", "p", "h", "o", "n", "y"],
    ["m", "o", "o", "d", "s"],
    ["f", "l", "e", "x", "i", "b", "l", "e"],
    ["a", "p", "p", "e", "a", "l", "i", "n", "g"],
    ["h", "a", "r", "v", "e", "s", "t", "i", "n", "g"],
  ];

  const items = [
    ["2", "1", "17", "3", "18"],

    ["18", "6", "16", "10", "11", "14", "7", "6"],

    ["16", "14", "14", "20", "18"],

    ["12", "8", "3", "15", "4", "19", "8", "3"],

    ["2", "10", "10", "3", "2", "8", "4", "7", "5"],

    ["11", "2", "17", "13", "3", "18", "9", "4", "7", "5"],
  ];

  const codeItems = [
    [
      "1 = c",
      "2 = a",
      "3 = e",
      "4 = i",
      "5 = g",
      "6 = y",
      "7 = n",
      "8 = l",
      "9 = t",
      "10 = p",
    ],

    [
      "11 = h",
      "12 = f",
      "13 = v",
      "14 = o",
      "15 = x",
      "16 = m",
      "17 = r",
      "18 = s",
      "19 = b",
      "20 = d",
    ],
  ];

  const [studentAnswers, setStudentAnswers] = useState(
    answers.map((word) => word.map((char) => (char === " " ? " " : ""))),
  );

  const [results, setResults] = useState([]);

  const [locked, setLocked] = useState(false);

  const inputRefs = useRef([]);

  const handleChange = (qIndex, inputIndex, value) => {
    if (locked || results[qIndex] === true) return;

    const char = value.slice(-1).toLowerCase();

    const updated = [...studentAnswers];

    updated[qIndex][inputIndex] = char;

    setStudentAnswers(updated);

    setResults((prev) => {
      const copy = [...prev];

      copy[qIndex] = undefined;

      return copy;
    });

    // move next
    if (char) {
      setTimeout(() => {
        let next = inputIndex + 1;

        while (answers[qIndex][next] === " ") {
          next++;
        }

        inputRefs.current[qIndex]?.[next]?.focus();
      }, 0);
    }
  };

  const handleBackspace = (e, qIndex, inputIndex) => {
    if (e.key === "Backspace" && !studentAnswers[qIndex][inputIndex]) {
      let prev = inputIndex - 1;

      while (answers[qIndex][prev] === " ") {
        prev--;
      }

      inputRefs.current[qIndex]?.[prev]?.focus();
    }
  };

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = studentAnswers.some((word, qIndex) =>
      word.some(
        (char, i) =>
          answers[qIndex][i] !== " " &&
          answers[qIndex][i] !== undefined &&
          !char.trim(),
      ),
    );

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = studentAnswers.map((studentWord, qIndex) => {
      const correct =
        studentWord.join("").toLowerCase() ===
        answers[qIndex].join("").toLowerCase();

      if (correct) correctCount++;

      return correct;
    });

    setResults(newResults);

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

  const showAnswers = () => {
    setStudentAnswers(answers);

    setResults([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setStudentAnswers(
      answers.map((word) => word.map((char) => (char === " " ? " " : ""))),
    );

    setResults([]);

    setLocked(false);

    setTimeout(() => {
      inputRefs.current[0]?.[0]?.focus();
    }, 0);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall text-[18px]">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-[10vh]">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            H
          </span>
          Use the code to find the words.
        </h5>

        {/* QUESTIONS */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-10 mb-15">
          {answers.map((word, qIndex) => (
            <div key={qIndex} className="flex items-start gap-3">
              <span className="font-bold">{qIndex + 1}</span>

              <div>
                {/* INPUTS */}
                <div className="flex items-center gap-0.5">
                  {word.map((char, inputIndex) => {
                    if (char === " ") {
                      return (
                        <div
                          key={inputIndex}
                          style={{
                            width: "18px",
                          }}
                        />
                      );
                    }

                    return (
                      <div
                        key={inputIndex}
                        className="relative  flex flex-col items-center"
                      >
                        <input
                          ref={(el) => {
                            if (!inputRefs.current[qIndex]) {
                              inputRefs.current[qIndex] = [];
                            }

                            inputRefs.current[qIndex][inputIndex] = el;
                          }}
                          type="text"
                          maxLength={1}
                          value={studentAnswers[qIndex][inputIndex]}
                          disabled={locked || results[qIndex] === true}
                          onFocus={(e) => e.target.select()}
                          onInput={(e) =>
                            handleChange(qIndex, inputIndex, e.target.value)
                          }
                          onKeyDown={(e) =>
                            handleBackspace(e, qIndex, inputIndex)
                          }
                          className={`
                              w-6
                              text-center
                              border-0
                              border-b
                              outline-none
                              bg-transparent
                              text-[18px]
                              text-[#6D2980]
                              font-semibold

                              ${results[qIndex] === false ? "border-[#D1232A]" : "border-black"}
                            `}
                        />

                        <span
                          style={{
                            width: "24px",
                            textAlign: "center",
                            fontSize: "14px",
                            marginTop: "4px",
                          }}
                        >
                          {items[qIndex][inputIndex]}
                        </span>
                        {results[qIndex] === false && inputIndex === 0 && (
                          <span
                            style={{
                              position: "absolute",
                              top: "-8px",
                              right: "15px",
                              width: "20px",
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
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CODE BOX */}
        <div
          style={{
            border: "2px solid #7D3C98",
            borderRadius: "12px",
            padding: "16px 24px",
          }}
        >

          <div className="flex flex-col gap-3">
            {codeItems.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-10 place-items-center gap-y-3"
              >
                {row.map((item, index) => (
                  <span key={index} className="w-full text-center">
                    {item}
                  </span>
                ))}
              </div>
            ))}
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

export default WB_Unit10_Page60_Q1;
