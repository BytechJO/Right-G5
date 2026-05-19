import React, { useRef, useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit4_Page23_Q1 = () => {
  const answers = [
    ["n", "o", "t", " ", "m", "e"],
    ["j", "e", "a", "n", "s"],
    ["a", "r", "c", "a", "d", "e"],
    ["s", "p", "l", "i", "t", " ", "u", "p"],
    ["b", "o", "o", "t", "s"],
    ["f", "o", "o", "d", " ", "c", "o", "u", "r", "t"],
  ];

  const items = [
    ["1", "6", "16", "", "17", "2"],

    ["18", "2", "3", "1", "8"],

    ["3", "4", "11", "3", "15", "2"],

    ["8", "14", "10", "5", "16", "", "9", "14"],

    ["13", "6", "6", "16", "8"],

    ["7", "6", "6", "15", "", "11", "6", "9", "4", "16"],
  ];

  const codeItems = [
    [
      "1 = n",
      "2 = e",
      "3 = a",
      "4 = r",
      "5 = i",
      "6 = o",
      "7 = f",
      "8 = s",
      "9 = u",
    ],

    [
      "10 = l",
      "11 = c",
      "12 = v",
      "13 = b",
      "14 = p",
      "15 = d",
      "16 = t",
      "17 = m",
      "18 = j",
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
      word.some((char, i) => answers[qIndex][i] !== " " && !char),
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
        <h5 className="header-title-page8 mb-[13vh]">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            F
          </span>
          Use the code to find the words.
        </h5>

        {/* QUESTIONS */}
        <div className="grid grid-cols-3 gap-x-10 gap-y-10 mb-15">
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
          <div className="text-center font-bold mb-2">Code:</div>

          <div className="flex flex-col gap-3">
            {codeItems.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="grid grid-cols-9 place-items-center gap-y-3"
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

export default WB_Unit4_Page23_Q1;
