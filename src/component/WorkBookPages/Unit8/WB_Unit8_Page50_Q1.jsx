import soundL14 from "../../../assets/audio/Workbook/Unit 8/Page 50 - L/Item_014_hot-air_balloon.mp3";
import soundL13 from "../../../assets/audio/Workbook/Unit 8/Page 50 - L/Item_013_recognize.mp3";
import soundL12 from "../../../assets/audio/Workbook/Unit 8/Page 50 - L/Item_012_landscape.mp3";
import soundL11 from "../../../assets/audio/Workbook/Unit 8/Page 50 - L/Item_011_second_home.mp3";
import soundL10 from "../../../assets/audio/Workbook/Unit 8/Page 50 - L/Item_010_fly_over.mp3";
import soundL9 from "../../../assets/audio/Workbook/Unit 8/Page 50 - L/Item_009_shocked.mp3";
import soundL8 from "../../../assets/audio/Workbook/Unit 8/Page 50 - L/Item_008_board_games.mp3";
import soundL7 from "../../../assets/audio/Workbook/Unit 8/Page 50 - L/Item_007_crowded.mp3";
import soundL6 from "../../../assets/audio/Workbook/Unit 8/Page 50 - L/Item_006_doubt.mp3";
import soundL5 from "../../../assets/audio/Workbook/Unit 8/Page 50 - L/Item_005_rainbow.mp3";
import soundL4 from "../../../assets/audio/Workbook/Unit 8/Page 50 - L/Item_004_volunteer.mp3";
import soundL3 from "../../../assets/audio/Workbook/Unit 8/Page 50 - L/Item_003_lean.mp3";
import soundL2 from "../../../assets/audio/Workbook/Unit 8/Page 50 - L/Item_002_pilot.mp3";
import soundL1 from "../../../assets/audio/Workbook/Unit 8/Page 50 - L/Item_001_spot.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
  AudioSpeaker,
} from "../../StudentPages/unit5/ExerciseAudioText";
import {
  SentenceGroup,
  SentencePart,
} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState, useRef } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
const activationKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  },
};

const WB_Unit8_Page50_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

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

  const gridRef = useRef(null),
    pointerRef = useRef(null),
    pendingRef = useRef(null);
  const [selectedCells, setSelectedCells] = useState([]),
    [startCell, setStartCell] = useState(null),
    [foundWords, setFoundWords] = useState([]),
    [foundSelections, setFoundSelections] = useState([]),
    [locked, setLocked] = useState(false),
    [showedAnswer, setShowedAnswer] = useState(false),
    [activeCell, setActiveCell] = useState({ row: 0, col: 0 }),
    [checked, setChecked] = useState(false);
  const same = (a, b) => a?.row === b?.row && a?.col === b?.col;
  const path = (a, b) => {
    if (!a || !b) return [];
    const dr = b.row - a.row,
      dc = b.col - a.col;
    if (dr && dc && Math.abs(dr) !== Math.abs(dc)) return [];
    const cells = Array.from(
      { length: Math.max(Math.abs(dr), Math.abs(dc)) + 1 },
      (_, i) => ({
        row: a.row + i * Math.sign(dr),
        col: a.col + i * Math.sign(dc),
      }),
    );
    return cells.every((c) => grid[c.row]?.[c.col] !== undefined) ? cells : [];
  };
  const releasePointer = () => {
    const p = pointerRef.current;
    pointerRef.current = null;
    if (p)
      try {
        p.element.releasePointerCapture(p.id);
      } catch {
        /* capture already released */
      }
  };
  const clearSelection = () => {
    pendingRef.current = null;
    setStartCell(null);
    setSelectedCells([]);
  };
  const focusCell = (cell) => {
    setActiveCell(cell);
    gridRef.current
      ?.querySelector(`[data-row="${cell.row}"][data-col="${cell.col}"]`)
      ?.focus({ preventScroll: true });
  };
  const begin = (cell) => {
    if (locked) return;
    pendingRef.current = cell;
    setStartCell(cell);
    setSelectedCells([cell]);
    setAnnouncement(
      `Start row ${cell.row + 1}, column ${cell.col + 1}. Choose the last letter.`,
    );
  };
  const complete = (end, start = pendingRef.current) => {
    if (locked) return;
    if (!start) {
      begin(end);
      return;
    }
    if (same(start, end)) {
      clearSelection();
      setAnnouncement("Selection cancelled.");
      return;
    }
    const cells = path(start, end);
    const match = answers.find(
      (a) =>
        a.cells.length === cells.length &&
        (a.cells.every((c, i) => same(c, cells[i])) ||
          [...a.cells].reverse().every((c, i) => same(c, cells[i]))),
    );
    if (!match) setAnnouncement("That is not a target word path.");
    else if (foundWords.includes(match.word))
      setAnnouncement(match.word + " was already found.");
    else {
      setFoundWords((prev) =>
        prev.includes(match.word) ? prev : [...prev, match.word],
      );
      setFoundSelections((prev) =>
        prev.some((a) => a.word === match.word) ? prev : [...prev, match],
      );
      setAnnouncement(match.word + " found.");
    }
    clearSelection();
  };
  const activate = (cell) =>
    pendingRef.current ? complete(cell) : begin(cell);
  const undo = () => {
    if (locked) return;
    if (pendingRef.current || pointerRef.current) {
      releasePointer();
      clearSelection();
      setAnnouncement("Selection cancelled.");
      return;
    }
    setFoundWords((prev) => prev.slice(0, -1));
    setFoundSelections((prev) => prev.slice(0, -1));
    setAnnouncement("Last discovery removed.");
  };
  const cellAt = (x, y) => {
    const el = document.elementFromPoint(x, y)?.closest("[data-search-cell]");
    if (!el || !gridRef.current?.contains(el)) return null;
    const cell = { row: Number(el.dataset.row), col: Number(el.dataset.col) };
    return grid[cell.row]?.[cell.col] === undefined ? null : cell;
  };
  const pointerDown = (e) => {
    if (
      locked ||
      pointerRef.current ||
      e.isPrimary === false ||
      (e.pointerType === "mouse" && e.button !== 0)
    )
      return;
    const cell = cellAt(e.clientX, e.clientY);
    if (!cell) return;
    e.preventDefault();
    e.stopPropagation();
    pointerRef.current = {
      id: e.pointerId,
      start: cell,
      current: cell,
      element: e.currentTarget,
    };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* unavailable capture */
    }
    setActiveCell(cell);
    if (!pendingRef.current) setSelectedCells([cell]);
  };
  const pointerMove = (e) => {
    if (locked) return;
    const p = pointerRef.current;
    if (p && p.id !== e.pointerId) return;
    const cell = cellAt(e.clientX, e.clientY);
    if (!cell) return;
    if (p) {
      p.current = cell;
      setSelectedCells(path(p.start, cell));
    } else if (pendingRef.current && e.pointerType === "mouse")
      setSelectedCells(path(pendingRef.current, cell));
  };
  const pointerUp = (e) => {
    const p = pointerRef.current;
    if (!p || p.id !== e.pointerId) return;
    e.preventDefault();
    e.stopPropagation();
    const end = cellAt(e.clientX, e.clientY);
    releasePointer();
    if (!end) {
      clearSelection();
      return;
    }
    if (!same(p.start, end)) complete(end, p.start);
    else activate(end);
  };
  const pointerCancel = (e) => {
    if (pointerRef.current?.id !== e.pointerId) return;
    releasePointer();
    clearSelection();
    setAnnouncement("Selection cancelled.");
  };
  const cellKeys = (e, row, col) => {
    const arrows = {
      ArrowRight: [0, 1],
      ArrowLeft: [0, -1],
      ArrowDown: [1, 0],
      ArrowUp: [-1, 0],
    };
    if (
      !arrows[e.key] &&
      !["Enter", " ", "Escape", "Backspace"].includes(e.key)
    )
      return;
    e.preventDefault();
    e.stopPropagation();
    if (locked) return;
    if (arrows[e.key]) {
      const [dr, dc] = arrows[e.key],
        r = (row + dr + grid.length) % grid.length,
        c = (col + dc + grid[r].length) % grid[r].length,
        next = { row: r, col: c };
      focusCell(next);
      if (pendingRef.current) setSelectedCells(path(pendingRef.current, next));
    } else if (!e.repeat) {
      if (e.key === "Enter" || e.key === " ") activate({ row, col });
      else if (e.key === "Backspace") undo();
      else {
        releasePointer();
        clearSelection();
        setAnnouncement("Selection cancelled.");
      }
    }
  };
  React.useEffect(
    () => () => {
      const p = pointerRef.current;
      pointerRef.current = null;
      if (p)
        try {
          p.element.releasePointerCapture(p.id);
        } catch {
          /* removed grid */
        }
    },
    [],
  );
  const resetAll = () => {
    audio.stop();
    releasePointer();
    clearSelection();
    setFoundWords([]);
    setFoundSelections([]);
    setLocked(false);
    setShowedAnswer(false);
    setChecked(false);
    setAnnouncement("Discoveries and feedback cleared.");
  };
  const showAnswers = () => {
    audio.stop();
    releasePointer();
    clearSelection();
    resetButtonRef.current?.focus({ preventScroll: true });
    setFoundWords(words);
    setFoundSelections(answers);
    setLocked(true);
    setShowedAnswer(true);
    setChecked(false);
    setAnnouncement("All word paths shown and locked.");
  };
  const checkAnswers = () => {
    if (locked || showedAnswer) return;
    audio.stop();
    releasePointer();
    clearSelection();
    if (!foundWords.length) {
      setAnnouncement("Please find at least one word before checking.");
      ValidationAlert.info("Please find at least one word before checking.");
      return;
    }
    setChecked(true);
    const score = foundWords.length,
      total = answers.length,
      msg = `<div style="font-size:20px;text-align:center;color:${score === total ? "green" : "orange"}">Score: ${score} / ${total}</div>`;
    setAnnouncement(`Score ${score} out of ${total}.`);
    if (score === total) {
      resetButtonRef.current?.focus({ preventScroll: true });
      setLocked(true);
      ValidationAlert.success(msg);
    } else ValidationAlert.warning(msg);
  };
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
        stroke={locked ? "#16a34a" : "#7D3C98"}
        strokeWidth="18"
        strokeLinecap="round"
        opacity={opacity}
      />
    );
  };

  return (
    <div
      data-exercise-scope={"WB_Unit8_Page50_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit8_Page50_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit8_Page50_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit8_Page50_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall w-full mb-10">
        {/* TITLE */}

        <ExerciseHeader
          isWorkbook
          sectionLetter="L"
          title={<>Find and circle the words.</>}
          subTitle="Scan one line or row at a time and select only the complete target words or phrases, then review every mark before checking."
        />

        {/* CONTENT */}

        <div className="flex gap-8 items-start">
          {/* GRID */}

          <div
            aria-description={
              startCell
                ? "Choose the final letter of the pending selection."
                : "Choose the first and last letters of a word."
            }
            style={{ touchAction: "none" }}
            aria-label={
              "Word search. Use arrows to move, Enter or Space to choose endpoints, Escape to cancel and Backspace to undo."
            }
            role={"group"}
            onLostPointerCapture={pointerCancel}
            onPointerCancel={pointerCancel}
            onPointerUp={pointerUp}
            onPointerMove={pointerMove}
            onPointerDown={pointerDown}
            ref={gridRef}
            className="relative select-none"
          >
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {row.map((letter, colIndex) => (
                  <span
                    onKeyUp={activationKeys.onKeyUp}
                    onKeyDown={(e) => cellKeys(e, rowIndex, colIndex)}
                    aria-disabled={locked}
                    aria-label={`Row ${rowIndex + 1}, column ${colIndex + 1}: ${letter}${foundSelections.some((a) => a.cells.some((c) => c.row === rowIndex && c.col === colIndex)) ? ". Found word." : ""}`}
                    tabIndex={
                      same(activeCell, { row: rowIndex, col: colIndex })
                        ? 0
                        : -1
                    }
                    role={"button"}
                    data-choice={true}
                    data-search-cell={true}
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
                  >
                    {letter}
                  </span>
                ))}
              </div>
            ))}

            {/* LINES */}

            <svg
              aria-hidden={true}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
            >
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
                style={{
                  outline:
                    checked && !foundWords.includes(word)
                      ? "2px solid #D1232A"
                      : undefined,
                  borderRadius: 6,
                }}
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
                <AudioText
                  audio={audio}
                  id={`word-${index}`}
                  src={
                    [
                      soundL1,
                      soundL2,
                      soundL3,
                      soundL4,
                      soundL5,
                      soundL6,
                      soundL7,
                      soundL8,
                      soundL9,
                      soundL10,
                      soundL11,
                      soundL12,
                      soundL13,
                      soundL14,
                    ][index]
                  }
                  label={`Hear ${word}`}
                >
                  {word}
                </AudioText>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BUTTONS */}

      <div className="action-buttons-container">
        <button
          {...activationKeys}
          ref={resetButtonRef}
          aria-label={"Start Again"}
          type={"button"}
          onClick={resetAll}
          className="try-again-button"
        >
          Start Again ↻
        </button>

        <button
          {...activationKeys}
          aria-label={"Show Answer"}
          type={"button"}
          onClick={showAnswers}
          className="show-answer-btn"
        >
          Show Answer
        </button>

        <button
          style={{ cursor: locked ? "not-allowed" : "pointer" }}
          {...activationKeys}
          disabled={locked}
          aria-label={"Check Answer"}
          type={"button"}
          onClick={checkAnswers}
          className="check-button2"
        >
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default WB_Unit8_Page50_Q1;
