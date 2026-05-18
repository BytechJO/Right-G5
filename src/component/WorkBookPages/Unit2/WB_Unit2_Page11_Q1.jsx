import React, { useState, useRef } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit2_Page11_Q1 = () => {
  const words = [
    "few",
    "beg",
    "couple",
    "twisty",
    "crazy",
    "carnival",
    "not so fast",
    "still",
    "trims",
    "giraffe",
    "lets see",
    "works out",
  ];

  const grid = [
    ["c", "t", "w", "i", "s", "t", "y", "f", "i"],

    ["o", "a", "g", "i", "r", "a", "f", "f", "e"],

    ["u", "c", "r", "a", "z", "y", "b", "e", "g"],

    ["p", "a", "e", "n", "t", "r", "i", "m", "s"],

    ["l", "m", "s", "t", "i", "l", "l", "w", "t"],

    ["e", "t", "a", "y", "a", "v", "f", "e", "w"],

    ["n", "o", "t", "s", "o", "f", "a", "s", "t"],

    ["l", "e", "t", "s", "s", "e", "e", "l", "l"],

    ["w", "o", "r", "k", "s", "o", "u", "t", "t"],
  ];

  const gridRef = useRef(null);

  const [showedAnswer, setShowedAnswer] = useState(false);

  const [selectedCells, setSelectedCells] = useState([]);

  const [startCell, setStartCell] = useState(null);

  const [isSelecting, setIsSelecting] = useState(false);

  const [foundWords, setFoundWords] = useState([]);

  const [foundSelections, setFoundSelections] = useState([]);

  const [locked, setLocked] = useState(false);

  const startSelection = (row, col) => {
    if (locked || showedAnswer) return;

    setStartCell({ row, col });

    setSelectedCells([{ row, col }]);

    setIsSelecting(true);
  };

  const addCell = (row, col) => {
    if (!isSelecting || !startCell) return;

    const dr = row - startCell.row;

    const dc = col - startCell.col;

    const stepRow = Math.sign(dr);

    const stepCol = Math.sign(dc);

    if (!(dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc))) return;

    const length = Math.max(Math.abs(dr), Math.abs(dc));

    const cells = [];

    for (let i = 0; i <= length; i++) {
      cells.push({
        row: startCell.row + i * stepRow,

        col: startCell.col + i * stepCol,
      });
    }

    setSelectedCells(cells);
  };

  const getWordFromCells = (cells) => {
    let word = "";

    cells.forEach((cell) => {
      word += grid[cell.row][cell.col];
    });

    return word.toLowerCase();
  };

  const endSelection = () => {
    setIsSelecting(false);

    if (selectedCells.length === 0) return;

    const word = getWordFromCells(selectedCells);

    const reversed = word.split("").reverse().join("");

    const normalizedWords = words.map((w) =>
      w.toLowerCase().replace(/\s/g, "").replace("’", "'"),
    );

    const normalizedWord = word.replace(/\s/g, "").replace("’", "'");

    const normalizedReversed = reversed.replace(/\s/g, "").replace("’", "'");

    const foundIndex = normalizedWords.indexOf(normalizedWord);

    const reversedIndex = normalizedWords.indexOf(normalizedReversed);

    if (foundIndex !== -1 || reversedIndex !== -1) {
      const correctWord =
        foundIndex !== -1 ? words[foundIndex] : words[reversedIndex];

      const cellsToSave =
        foundIndex !== -1 ? [...selectedCells] : [...selectedCells].reverse();

      if (!foundWords.includes(correctWord)) {
        setFoundWords((prev) => [...prev, correctWord]);

        setFoundSelections((prev) => [
          ...prev,
          {
            word: correctWord,
            cells: cellsToSave,
          },
        ]);
      }
    }

    setSelectedCells([]);

    setStartCell(null);
  };

  const resetAll = () => {
    setFoundWords([]);
    setFoundSelections([]);
    setSelectedCells([]);
    setStartCell(null);
    setIsSelecting(false);
    setLocked(false);
    setShowedAnswer(false);
  };

  const showAnswers = () => {
    const answers = [
      {
        word: "twisty",
        cells: [
          { row: 0, col: 1 },
          { row: 0, col: 2 },
          { row: 0, col: 3 },
          { row: 0, col: 4 },
          { row: 0, col: 5 },
          { row: 0, col: 6 },
        ],
      },

      {
        word: "giraffe",
        cells: [
          { row: 1, col: 2 },
          { row: 1, col: 3 },
          { row: 1, col: 4 },
          { row: 1, col: 5 },
          { row: 1, col: 6 },
          { row: 1, col: 7 },
          { row: 1, col: 8 },
        ],
      },

      {
        word: "crazy",
        cells: [
          { row: 2, col: 1 },
          { row: 2, col: 2 },
          { row: 2, col: 3 },
          { row: 2, col: 4 },
          { row: 2, col: 5 },
        ],
      },

      {
        word: "beg",
        cells: [
          { row: 2, col: 6 },
          { row: 2, col: 7 },
          { row: 2, col: 8 },
        ],
      },

      {
        word: "trims",
        cells: [
          { row: 3, col: 4 },
          { row: 3, col: 5 },
          { row: 3, col: 6 },
          { row: 3, col: 7 },
          { row: 3, col: 8 },
        ],
      },

      {
        word: "still",
        cells: [
          { row: 4, col: 2 },
          { row: 4, col: 3 },
          { row: 4, col: 4 },
          { row: 4, col: 5 },
          { row: 4, col: 6 },
        ],
      },

      {
        word: "few",
        cells: [
          { row: 5, col: 6 },
          { row: 5, col: 7 },
          { row: 5, col: 8 },
        ],
      },

      {
        word: "not so fast",
        cells: [
          { row: 6, col: 0 },
          { row: 6, col: 1 },
          { row: 6, col: 2 },
          { row: 6, col: 3 },
          { row: 6, col: 4 },
          { row: 6, col: 5 },
          { row: 6, col: 6 },
          { row: 6, col: 7 },
          { row: 6, col: 8 },
        ],
      },

      {
        word: "let’s see",
        cells: [
          { row: 7, col: 0 },
          { row: 7, col: 1 },
          { row: 7, col: 2 },
          { row: 7, col: 3 },
          { row: 7, col: 4 },
          { row: 7, col: 5 },
          { row: 7, col: 6 },
        ],
      },

      {
        word: "works out",
        cells: [
          { row: 8, col: 0 },
          { row: 8, col: 1 },
          { row: 8, col: 2 },
          { row: 8, col: 3 },
          { row: 8, col: 4 },
          { row: 8, col: 5 },
          { row: 8, col: 6 },
          { row: 8, col: 7 },
        ],
      },

      {
        word: "couple",
        cells: [
          { row: 0, col: 0 },
          { row: 1, col: 0 },
          { row: 2, col: 0 },
          { row: 3, col: 0 },
          { row: 4, col: 0 },
          { row: 5, col: 0 },
        ],
      },
      {
        word: "carnival",
        cells: [
          { row: 0, col: 0 },
          { row: 1, col: 1 },
          { row: 2, col: 2 },
          { row: 3, col: 3 },
          { row: 4, col: 4 },
          { row: 5, col: 5 },
          { row: 6, col: 6 },
          { row: 7, col: 7 },
        ],
      },
    ];

    setFoundWords(words);

    setFoundSelections(answers);

    setLocked(true);

    setShowedAnswer(true);
  };

  const checkAnswers = () => {
    if (showedAnswer || locked) return;
    if (foundWords.length < words.length) {
      ValidationAlert.info("Please find all the words first.");
      return;
    }
    const score = foundWords.length;

    const total = words.length;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
        <div style="font-size:20px;text-align:center;">
          <span style="color:${color};font-weight:bold">
            Score: ${score} / ${total}
          </span>
        </div>
      `;

    if (score === total) {
      ValidationAlert.success(msg);
      setLocked(true);
    } else if (score === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const renderLine = (cells, key, opacity = 0.6) => {
    if (!cells || cells.length < 2) return null;

    const start = cells[0];

    const end = cells[cells.length - 1];

    const cellSize = 40;

    const x1 = start.col * cellSize + cellSize / 2;

    const y1 = start.row * cellSize + cellSize / 2;

    const x2 = end.col * cellSize + cellSize / 2;

    const y2 = end.row * cellSize + cellSize / 2;

    return (
      <line
        key={key}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#6D2980"
        strokeWidth="20"
        strokeLinecap="round"
        opacity={opacity}
      />
    );
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "10px",
        }}
      >
        {/* TITLE */}
        <h5 className="header-title-page8 mb-5">
          <span
            className="ex-A"
            style={{
              marginRight: "20px",
            }}
          >
            E
          </span>
          Find and circle the words.
        </h5>

        {/* WORD BOX */}
        <div
          style={{
            border: "2px solid #7D3C98",
            borderRadius: "14px",
            padding: "16px 24px",
            marginBottom: "25px",
          }}
        >
          <div className="grid grid-cols-6 gap-x-10 gap-y-2 text-[17px]">
            {words.map((word, index) => (
              <div
                key={index}
                className={`text-center ${
                  foundWords.includes(word)
                    ? "text-[#D1232A] line-through font-bold"
                    : ""
                }`}
              >
                {word}
              </div>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div className="flex justify-center">
          <div
            ref={gridRef}
            className="relative select-none"
            onMouseLeave={endSelection}
          >
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {row.map((letter, colIndex) => (
                  <span
                    key={colIndex}
                    className="
                          w-10
                          h-10
                          border
                          border-[#7D3C98]
                          flex
                          items-center
                          justify-center
                          text-[22px]
                          font-medium
                          cursor-pointer
                          relative
                          z-10
                        "
                    onMouseDown={() => startSelection(rowIndex, colIndex)}
                    onMouseEnter={() => addCell(rowIndex, colIndex)}
                    onMouseUp={endSelection}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            ))}

            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {foundSelections.map((item, index) =>
                renderLine(item.cells, `found-${index}`, 0.7),
              )}

              {renderLine(selectedCells, "current", 0.45)}
            </svg>
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container">
        <button onClick={resetAll} className="try-again-button">
          Start Again ↻
        </button>

        <button onClick={showAnswers} className="show-answer-btn">
          Show Answer
        </button>

        <button onClick={checkAnswers} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default WB_Unit2_Page11_Q1;
