import React, { useState, useRef } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit8_Page50_Q1 = () => {
  const words = [
    "spot",
    "pilot",
    "lean",
    "volunteer",
    "rainbow",
    "doubt",
    "crowded",
    "board games",
    "shocked",
    "fly over",
    "second home",
    "landscape",
    "recognize",
    "hot-air balloon",
  ];

  const grid = [
    [
      "p",
      "w",
      "n",
      "v",
      "t",
      "t",
      "t",
      "e",
      "d",
      "r",
      "a",
      "i",
      "n",
      "b",
      "o",
      "w",
    ],

    [
      "a",
      "e",
      "f",
      "o",
      "v",
      "o",
      "l",
      "u",
      "n",
      "t",
      "e",
      "e",
      "r",
      "i",
      "a",
      "x",
    ],

    [
      "t",
      "v",
      "d",
      "k",
      "h",
      "s",
      "t",
      "e",
      "c",
      "x",
      "v",
      "g",
      "w",
      "f",
      "a",
      "c",
    ],

    [
      "o",
      "b",
      "e",
      "e",
      "z",
      "k",
      "f",
      "r",
      "u",
      "w",
      "i",
      "s",
      "t",
      "l",
      "h",
      "t",
    ],

    [
      "j",
      "o",
      "l",
      "k",
      "r",
      "c",
      "r",
      "o",
      "w",
      "d",
      "e",
      "d",
      "q",
      "y",
      "k",
      "s",
    ],

    [
      "e",
      "a",
      "y",
      "h",
      "f",
      "e",
      "s",
      "r",
      "z",
      "g",
      "i",
      "y",
      "a",
      "o",
      "z",
      "h",
    ],

    [
      "u",
      "r",
      "e",
      "b",
      "p",
      "k",
      "c",
      "h",
      "s",
      "p",
      "o",
      "t",
      "i",
      "v",
      "h",
      "o",
    ],

    [
      "a",
      "d",
      "s",
      "g",
      "e",
      "u",
      "m",
      "o",
      "l",
      "j",
      "k",
      "v",
      "x",
      "e",
      "u",
      "c",
    ],

    [
      "s",
      "g",
      "d",
      "m",
      "r",
      "w",
      "z",
      "v",
      "g",
      "p",
      "i",
      "b",
      "e",
      "r",
      "r",
      "k",
    ],

    [
      "x",
      "a",
      "p",
      "o",
      "e",
      "c",
      "a",
      "l",
      "a",
      "n",
      "d",
      "s",
      "c",
      "a",
      "p",
      "e",
    ],

    [
      "v",
      "m",
      "o",
      "l",
      "u",
      "h",
      "x",
      "l",
      "f",
      "t",
      "i",
      "v",
      "f",
      "t",
      "m",
      "d",
    ],

    [
      "a",
      "e",
      "s",
      "g",
      "q",
      "b",
      "u",
      "o",
      "e",
      "c",
      "h",
      "z",
      "p",
      "t",
      "w",
      "a",
    ],

    [
      "d",
      "s",
      "b",
      "o",
      "t",
      "w",
      "t",
      "v",
      "m",
      "a",
      "i",
      "z",
      "e",
      "c",
      "b",
      "y",
    ],

    [
      "p",
      "i",
      "l",
      "o",
      "t",
      "o",
      "s",
      "e",
      "c",
      "o",
      "n",
      "d",
      "h",
      "o",
      "m",
      "e",
    ],

    [
      "d",
      "f",
      "u",
      "k",
      "e",
      "k",
      "y",
      "r",
      "f",
      "g",
      "v",
      "t",
      "l",
      "u",
      "k",
      "j",
    ],

    [
      "h",
      "o",
      "t",
      "a",
      "i",
      "r",
      "b",
      "a",
      "l",
      "l",
      "o",
      "o",
      "n",
      "b",
      "e",
      "b",
    ],
  ];

  const answers = [
    {
      word: "rainbow",

      cells: [
        { row: 0, col: 9 },
        { row: 0, col: 10 },
        { row: 0, col: 11 },
        { row: 0, col: 12 },
        { row: 0, col: 13 },
        { row: 0, col: 14 },
        { row: 0, col: 15 },
      ],
    },

    {
      word: "volunteer",

      cells: [
        { row: 1, col: 4 },
        { row: 1, col: 5 },
        { row: 1, col: 6 },
        { row: 1, col: 7 },
        { row: 1, col: 8 },
        { row: 1, col: 9 },
        { row: 1, col: 10 },
        { row: 1, col: 11 },
        { row: 1, col: 12 },
      ],
    },

    {
      word: "fly over",

      cells: [
        { row: 2, col: 13 },
        { row: 3, col: 13 },
        { row: 4, col: 13 },
        { row: 5, col: 13 },
        { row: 6, col: 13 },
        { row: 7, col: 13 },
        { row: 8, col: 13 },
      ],
    },

    {
      word: "crowded",

      cells: [
        { row: 4, col: 5 },
        { row: 4, col: 6 },
        { row: 4, col: 7 },
        { row: 4, col: 8 },
        { row: 4, col: 9 },
        { row: 4, col: 10 },
        { row: 4, col: 11 },
      ],
    },

    {
      word: "spot",

      cells: [
        { row: 6, col: 8 },
        { row: 6, col: 9 },
        { row: 6, col: 10 },
        { row: 6, col: 11 },
      ],
    },

    {
      word: "landscape",

      cells: [
        { row: 9, col: 7 },
        { row: 9, col: 8 },
        { row: 9, col: 9 },
        { row: 9, col: 10 },
        { row: 9, col: 11 },
        { row: 9, col: 12 },
        { row: 9, col: 13 },
        { row: 9, col: 14 },
        { row: 9, col: 15 },
      ],
    },

    {
      word: "pilot",

      cells: [
        { row: 13, col: 0 },
        { row: 13, col: 1 },
        { row: 13, col: 2 },
        { row: 13, col: 3 },
        { row: 13, col: 4 },
      ],
    },

    {
      word: "second home",

      cells: [
        { row: 13, col: 6 },
        { row: 13, col: 7 },
        { row: 13, col: 8 },
        { row: 13, col: 9 },
        { row: 13, col: 10 },
        { row: 13, col: 11 },
        { row: 13, col: 12 },
        { row: 13, col: 13 },
        { row: 13, col: 14 },
        { row: 13, col: 15 },
      ],
    },

    {
      word: "hot-air balloon",

      cells: [
        { row: 15, col: 0 },
        { row: 15, col: 1 },
        { row: 15, col: 2 },
        { row: 15, col: 3 },
        { row: 15, col: 4 },
        { row: 15, col: 5 },
        { row: 15, col: 6 },
        { row: 15, col: 7 },
        { row: 15, col: 8 },
        { row: 15, col: 9 },
        { row: 15, col: 10 },
        { row: 15, col: 11 },
        { row: 15, col: 12 },
      ],
    },
    {
      word: "board games",

      cells: [
        { row: 3, col: 1 },
        { row: 4, col: 1 },
        { row: 5, col: 1 },
        { row: 6, col: 1 },
        { row: 7, col: 1 },
        { row: 8, col: 1 },
        { row: 9, col: 1 },
        { row: 10, col: 1 },
        { row: 11, col: 1 },
        { row: 12, col: 1 },
      ],
    },

    {
      word: "recognize",

      cells: [
        { row: 4, col: 4 },
        { row: 5, col: 5 },
        { row: 6, col: 6 },
        { row: 7, col: 7 },
        { row: 8, col: 8 },
        { row: 9, col: 9 },
        { row: 10, col: 10 },
        { row: 11, col: 11 },
        { row: 12, col: 12 },
      ],
    },

    {
      word: "doubt",

      cells: [
        { row: 8, col: 2 },
        { row: 9, col: 3 },
        { row: 10, col: 4 },
        { row: 11, col: 5 },
        { row: 12, col: 6 },
      ],
    },

    {
      word: "lean",

      cells: [
        { row: 10, col: 7 },
        { row: 11, col: 8 },
        { row: 12, col: 9 },
        { row: 13, col: 10 },
      ],
    },

    {
      word: "shocked",

      cells: [
        { row: 4, col: 15 },
        { row: 5, col: 15 },
        { row: 6, col: 15 },
        { row: 7, col: 15 },
        { row: 8, col: 15 },
        { row: 9, col: 15 },
        { row: 10, col: 15 },
      ],
    },
  ];

  const gridRef = useRef(null);

  const [selectedCells, setSelectedCells] = useState([]);

  const [startCell, setStartCell] = useState(null);

  const [isSelecting, setIsSelecting] = useState(false);

  const [foundWords, setFoundWords] = useState([]);

  const [foundSelections, setFoundSelections] = useState([]);

  const [locked, setLocked] = useState(false);

  const [showedAnswer, setShowedAnswer] = useState(false);

  // ------------------------
  // START
  // ------------------------

  const startSelection = (row, col) => {
    if (locked || showedAnswer) return;

    setStartCell({ row, col });

    setSelectedCells([{ row, col }]);

    setIsSelecting(true);
  };

  // ------------------------
  // MOVE
  // ------------------------

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

  // ------------------------
  // WORD
  // ------------------------

  const getWordFromCells = (cells) => {
    let word = "";

    cells.forEach((cell) => {
      word += grid[cell.row][cell.col];
    });

    return word.toLowerCase();
  };

  // ------------------------
  // END
  // ------------------------

  const endSelection = () => {
    setIsSelecting(false);

    if (selectedCells.length === 0) return;

    const word = getWordFromCells(selectedCells);

    const reversed = word.split("").reverse().join("");

    const normalizedWords = words.map((w) =>
      w.toLowerCase().replace(/\s/g, "").replace(/-/g, ""),
    );

    const normalizedWord = word.replace(/\s/g, "").replace(/-/g, "");

    const normalizedReversed = reversed.replace(/\s/g, "").replace(/-/g, "");

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

  // ------------------------
  // RESET
  // ------------------------

  const resetAll = () => {
    setFoundWords([]);

    setFoundSelections([]);

    setSelectedCells([]);

    setStartCell(null);

    setIsSelecting(false);

    setLocked(false);

    setShowedAnswer(false);
  };

  // ------------------------
  // SHOW ANSWERS
  // ------------------------

  const showAnswers = () => {
    setFoundWords(words);

    setFoundSelections(answers);

    setLocked(true);

    setShowedAnswer(true);
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (showedAnswer || locked) return;

    if (foundWords.length < answers.length) {
      ValidationAlert.info("Please find all the words first.");

      return;
    }

    const score = foundWords.length;

    const total = answers.length;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold">
          Score: ${score} / ${total}
        </span>
      </div>
    `;

    ValidationAlert.success(msg);

    setLocked(true);
  };

  // ------------------------
  // LINE
  // ------------------------

  const renderLine = (cells, key, opacity = 0.65) => {
    if (!cells || cells.length < 2) return null;

    const start = cells[0];

    const end = cells[cells.length - 1];

    const cellSize = 30;

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
        stroke="#7D3C98"
        strokeWidth="18"
        strokeLinecap="round"
        opacity={opacity}
      />
    );
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall w-full">
        {/* TITLE */}

        <h5 className="header-title-page8 mb-5">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            L
          </span>
          Find and circle the words.
        </h5>

        {/* CONTENT */}

        <div className="flex gap-8 items-start">
          {/* GRID */}

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
                    data-row={rowIndex}
                    data-col={colIndex}
                    className="
                      w-[30px]
                      h-[30px]
                      border
                      border-[#7D3C98]
                      flex
                      items-center
                      justify-center
                      text-[20px]
                      relative
                      z-10
                      cursor-pointer
                    "
                    style={{
                      color: "#3A2352",
                      touchAction: "none",
                    }}
                    onMouseDown={() => startSelection(rowIndex, colIndex)}
                    onMouseEnter={() => addCell(rowIndex, colIndex)}
                    onMouseUp={endSelection}
                    onTouchStart={() => startSelection(rowIndex, colIndex)}
                    onTouchMove={(e) => {
                      e.preventDefault();

                      const touch = e.touches[0];

                      const element = document.elementFromPoint(
                        touch.clientX,
                        touch.clientY,
                      );

                      if (!element) return;

                      const row = element.getAttribute("data-row");

                      const col = element.getAttribute("data-col");

                      if (row !== null && col !== null) {
                        addCell(Number(row), Number(col));
                      }
                    }}
                    onTouchEnd={endSelection}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            ))}

            {/* LINES */}

            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {foundSelections.map((item, index) =>
                renderLine(item.cells, `found-${index}`, 0.7),
              )}

              {renderLine(selectedCells, "current", 0.45)}
            </svg>
          </div>

          {/* WORDS */}

          <div
            style={{
              border: "2px solid #6D2980",
              borderRadius: "12px",
              padding: "3px 20px",
              minWidth: "180px",
            }}
            className="flex flex-col gap-2 text-[18px]"
          >
            {words.map((word, index) => (
              <div
                key={index}
                className={`
                  text-center
                  ${
                    foundWords.includes(word)
                      ? "text-[#D1232A] line-through font-semibold"
                      : ""
                  }
                `}
              >
                {word}
              </div>
            ))}
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

export default WB_Unit8_Page50_Q1;
