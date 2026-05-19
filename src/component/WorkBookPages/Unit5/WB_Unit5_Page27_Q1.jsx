import React, { useRef, useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit5_Page27_Q1 = () => {
  const inputsRef = useRef({});
  const [direction, setDirection] = useState("across");
  const words = [
    { id: 1, answer: "report", row: 0, col: 18, dir: "down" },
    { id: 2, answer: "sharks", row: 1, col: 0, dir: "down" },
    { id: 3, answer: "information", row: 2, col: 8, dir: "down" },
    { id: 4, answer: "assignment", row: 3, col: 0, dir: "across" },
    { id: 5, answer: "recipe", row: 3, col: 14, dir: "down" },
    { id: 6, answer: "entire", row: 4, col: 14, dir: "across" },
    { id: 7, answer: "librarian", row: 6, col: 3, dir: "across" },
    { id: 8, answer: "both", row: 6, col: 5, dir: "down" },
    { id: 9, answer: "barbecue", row: 8, col: 7, dir: "across" },
    { id: 10, answer: "presentation", row: 12, col: 3, dir: "across" },
  ];

  const cluesDown = [
    ["1", "a written description about something"],
    ["2", "dangerous kinds of fish"],
    ["3", "facts about people, places, things, or so on"],
    ["5", "instructions to make a food dish"],
    ["8", "referring to two things"],
  ];

  const cluesAcross = [
    ["4", "a job or task that is given to someone"],
    ["6", "all"],
    ["7", "person who works and helps to find books in a library"],
    ["9", "a meal prepared outside, using a grill"],
    [
      "10",
      "an activity performed in front of people to explain or show something",
    ],
  ];

  const rows = 13;
  const cols = 24;

  const buildCells = () => {
    const cells = {};

    words.forEach((word) => {
      word.answer.split("").forEach((letter, i) => {
        const row = word.dir === "down" ? word.row + i : word.row;
        const col = word.dir === "across" ? word.col + i : word.col;
        const key = `${row}-${col}`;

        cells[key] = {
          letter,
          number: i === 0 ? word.id : cells[key]?.number,
        };
      });
    });

    return cells;
  };

  const cells = buildCells();

  const [studentAnswers, setStudentAnswers] = useState(
    Object.keys(cells).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {}),
  );

  const [result, setResult] = useState({});

  const [locked, setLocked] = useState(false);

  const handleChange = (key, value) => {
    if (locked || result[key] === true) return;

    const char = value.slice(-1);

    setStudentAnswers((prev) => ({
      ...prev,
      [key]: char,
    }));

    setResult((prev) => ({
      ...prev,
      [key]: undefined,
    }));

    if (char) {
      const [row, col] = key.split("-").map(Number);

      let nextKey;

      if (direction === "across") {
        nextKey = `${row}-${col + 1}`;
      } else {
        nextKey = `${row + 1}-${col}`;
      }

      const nextInput = inputsRef.current[nextKey];

      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = Object.keys(cells).some(
      (key) => !studentAnswers[key].trim(),
    );

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correctCount = 0;

    const newResults = {};

    words.forEach((word) => {
      let isCorrect = true;

      word.answer.split("").forEach((letter, i) => {
        const row = word.dir === "down" ? word.row + i : word.row;

        const col = word.dir === "across" ? word.col + i : word.col;

        const key = `${row}-${col}`;

        const studentLetter = studentAnswers[key]?.toLowerCase();

        if (studentLetter !== letter.toLowerCase()) {
          isCorrect = false;
        }
      });

      if (isCorrect) correctCount++;

      // ✅ save result by word id
      newResults[word.id] = isCorrect;
    });

    setResult(newResults);

    const total = words.length;

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
    const filled = {};

    Object.keys(cells).forEach((key) => {
      filled[key] = cells[key].letter;
    });

    setStudentAnswers(filled);

    setResult(
      Object.keys(cells).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {}),
    );

    setLocked(true);
  };

  const handleReset = () => {
    setStudentAnswers(
      Object.keys(cells).reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {}),
    );

    setResult({});

    setLocked(false);
  };

  const errorBadge = (dir) => (
    <span
      style={{
        position: "absolute",

        // ✅ position حسب الاتجاه
        top: dir === "down" ? "-10px" : "20%",
        left: dir === "across" ? "-10px" : "20%",

        transform: dir === "across" ? "translateX(-50%)" : "translateY(-50%)",

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
        zIndex: 5,
      }}
    >
      ✕
    </span>
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall text-[17px]">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-8">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            A
          </span>
          Complete the puzzle.
        </h5>

        {/* PUZZLE */}
        <div className="flex justify-center mb-10">
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${cols}, 32px)`,
              gridTemplateRows: `repeat(${rows}, 32px)`,
            }}
          >
            {Array.from({ length: rows }).map((_, row) =>
              Array.from({ length: cols }).map((_, col) => {
                const key = `${row}-${col}`;
                const cell = cells[key];

                if (!cell) {
                  return <div key={key} />;
                }

                return (
                  <div
                    key={key}
                    className="relative"
                    style={{
                      width: "30px",
                      height: "30px",
                      border: "1.5px solid #7D3C98",
                    }}
                  >
                    {cell.number && (
                      <span
                        style={{
                          position: "absolute",
                          top: "0px",
                          left: "2px",
                          fontSize: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        {cell.number}
                      </span>
                    )}
                    <input
                      type="text"
                      ref={(el) => (inputsRef.current[key] = el)}
                      data-crossword
                      maxLength={1}
                      value={studentAnswers[key]}
                      disabled={
                        locked ||
                        words.some((word) => {
                          if (result[word.id] !== true) return false;

                          return word.answer.split("").some((_, i) => {
                            const row =
                              word.dir === "down" ? word.row + i : word.row;

                            const col =
                              word.dir === "across" ? word.col + i : word.col;

                            return `${row}-${col}` === key;
                          });
                        })
                      }
                      onChange={(e) => handleChange(key, e.target.value, e)}
                      onClick={() => {
                        const [row, col] = key.split("-").map(Number);

                        if (cells[`${row}-${col + 1}`]) {
                          setDirection("across");
                        } else {
                          setDirection("down");
                        }
                      }}
                      onFocus={(e) => e.target.select()}
                      className={`
                        w-full
                        h-full
                        border-0
                        outline-none
                        bg-transparent
                        text-center
                        text-[16px]
                        text-[#6D2980]
                        font-semibold
                        
                      `}
                    />
                    {cell.number &&
                      result[cell.number] === false &&
                      errorBadge(
                        words.find((w) => w.id === cell.number)?.dir,
                      )}{" "}
                  </div>
                );
              }),
            )}
          </div>
        </div>

        {/* CLUES */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="border-2 border-[#7D3C98] rounded-xl p-4">
            <h3 className="text-center font-bold mb-3">Down</h3>

            {cluesDown.map((clue) => (
              <div key={clue[0]} className="flex gap-3 leading-[1.2] mb-1">
                <span className="font-bold">{clue[0]}</span>
                <span>{clue[1]}</span>
              </div>
            ))}
          </div>

          <div className="border-2 border-[#7D3C98] rounded-xl p-4">
            <h3 className="text-center font-bold mb-3">Across</h3>

            {cluesAcross.map((clue) => (
              <div key={clue[0]} className="flex gap-3 leading-[1.2] mb-1">
                <span className="font-bold">{clue[0]}</span>
                <span>{clue[1]}</span>
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

export default WB_Unit5_Page27_Q1;
