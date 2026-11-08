import soundE12 from "../../../assets/audio/Workbook/unit 2/Page 11 - E/Item_012_works_out.mp3";
import soundE11 from "../../../assets/audio/Workbook/unit 2/Page 11 - E/Item_011_let's_see.mp3";
import soundE10 from "../../../assets/audio/Workbook/unit 2/Page 11 - E/Item_010_giraffe.mp3";
import soundE9 from "../../../assets/audio/Workbook/unit 2/Page 11 - E/Item_009_trims.mp3";
import soundE8 from "../../../assets/audio/Workbook/unit 2/Page 11 - E/Item_008_still.mp3";
import soundE7 from "../../../assets/audio/Workbook/unit 2/Page 11 - E/Item_007_not_so_fast.mp3";
import soundE6 from "../../../assets/audio/Workbook/unit 2/Page 11 - E/Item_006_crazy.mp3";
import soundE5 from "../../../assets/audio/Workbook/unit 2/Page 11 - E/Item_005_carnival.mp3";
import soundE4 from "../../../assets/audio/Workbook/unit 2/Page 11 - E/Item_004_twisty.mp3";
import soundE3 from "../../../assets/audio/Workbook/unit 2/Page 11 - E/Item_003_couple.mp3";
import soundE2 from "../../../assets/audio/Workbook/unit 2/Page 11 - E/Item_002_beg.mp3";
import soundE1 from "../../../assets/audio/Workbook/unit 2/Page 11 - E/Item_001_few.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
} from "../../StudentPages/unit5/ExerciseAudioText";
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
const WB_Unit2_Page11_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");
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
  const targetPaths = [
    {
      word: "twisty",
      cells: [
        {
          row: 0,
          col: 1,
        },
        {
          row: 0,
          col: 2,
        },
        {
          row: 0,
          col: 3,
        },
        {
          row: 0,
          col: 4,
        },
        {
          row: 0,
          col: 5,
        },
        {
          row: 0,
          col: 6,
        },
      ],
    },
    {
      word: "giraffe",
      cells: [
        {
          row: 1,
          col: 2,
        },
        {
          row: 1,
          col: 3,
        },
        {
          row: 1,
          col: 4,
        },
        {
          row: 1,
          col: 5,
        },
        {
          row: 1,
          col: 6,
        },
        {
          row: 1,
          col: 7,
        },
        {
          row: 1,
          col: 8,
        },
      ],
    },
    {
      word: "crazy",
      cells: [
        {
          row: 2,
          col: 1,
        },
        {
          row: 2,
          col: 2,
        },
        {
          row: 2,
          col: 3,
        },
        {
          row: 2,
          col: 4,
        },
        {
          row: 2,
          col: 5,
        },
      ],
    },
    {
      word: "beg",
      cells: [
        {
          row: 2,
          col: 6,
        },
        {
          row: 2,
          col: 7,
        },
        {
          row: 2,
          col: 8,
        },
      ],
    },
    {
      word: "trims",
      cells: [
        {
          row: 3,
          col: 4,
        },
        {
          row: 3,
          col: 5,
        },
        {
          row: 3,
          col: 6,
        },
        {
          row: 3,
          col: 7,
        },
        {
          row: 3,
          col: 8,
        },
      ],
    },
    {
      word: "still",
      cells: [
        {
          row: 4,
          col: 2,
        },
        {
          row: 4,
          col: 3,
        },
        {
          row: 4,
          col: 4,
        },
        {
          row: 4,
          col: 5,
        },
        {
          row: 4,
          col: 6,
        },
      ],
    },
    {
      word: "few",
      cells: [
        {
          row: 5,
          col: 6,
        },
        {
          row: 5,
          col: 7,
        },
        {
          row: 5,
          col: 8,
        },
      ],
    },
    {
      word: "not so fast",
      cells: [
        {
          row: 6,
          col: 0,
        },
        {
          row: 6,
          col: 1,
        },
        {
          row: 6,
          col: 2,
        },
        {
          row: 6,
          col: 3,
        },
        {
          row: 6,
          col: 4,
        },
        {
          row: 6,
          col: 5,
        },
        {
          row: 6,
          col: 6,
        },
        {
          row: 6,
          col: 7,
        },
        {
          row: 6,
          col: 8,
        },
      ],
    },
    {
      word: "let’s see",
      cells: [
        {
          row: 7,
          col: 0,
        },
        {
          row: 7,
          col: 1,
        },
        {
          row: 7,
          col: 2,
        },
        {
          row: 7,
          col: 3,
        },
        {
          row: 7,
          col: 4,
        },
        {
          row: 7,
          col: 5,
        },
        {
          row: 7,
          col: 6,
        },
      ],
    },
    {
      word: "works out",
      cells: [
        {
          row: 8,
          col: 0,
        },
        {
          row: 8,
          col: 1,
        },
        {
          row: 8,
          col: 2,
        },
        {
          row: 8,
          col: 3,
        },
        {
          row: 8,
          col: 4,
        },
        {
          row: 8,
          col: 5,
        },
        {
          row: 8,
          col: 6,
        },
        {
          row: 8,
          col: 7,
        },
      ],
    },
    {
      word: "couple",
      cells: [
        {
          row: 0,
          col: 0,
        },
        {
          row: 1,
          col: 0,
        },
        {
          row: 2,
          col: 0,
        },
        {
          row: 3,
          col: 0,
        },
        {
          row: 4,
          col: 0,
        },
        {
          row: 5,
          col: 0,
        },
      ],
    },
    {
      word: "carnival",
      cells: [
        {
          row: 0,
          col: 0,
        },
        {
          row: 1,
          col: 1,
        },
        {
          row: 2,
          col: 2,
        },
        {
          row: 3,
          col: 3,
        },
        {
          row: 4,
          col: 4,
        },
        {
          row: 5,
          col: 5,
        },
        {
          row: 6,
          col: 6,
        },
        {
          row: 7,
          col: 7,
        },
      ],
    },
  ];
  const gridRef = useRef(null);
  const [showedAnswer, setShowedAnswer] = useState(false);
  const [selectedCells, setSelectedCells] = useState([]);
  const [startCell, setStartCell] = useState(null);
  const [foundWords, setFoundWords] = useState([]);
  const [foundSelections, setFoundSelections] = useState([]);
  const [locked, setLocked] = useState(false);
  const [activeCell, setActiveCell] = useState({
    row: 0,
    col: 0,
  });
  const pointerRef = useRef(null);
  const cancelPointer = () => {
    const p = pointerRef.current;
    pointerRef.current = null;
    if (p && gridRef.current?.hasPointerCapture?.(p.id))
      gridRef.current.releasePointerCapture(p.id);
  };
  React.useEffect(
    () => () => {
      const p = pointerRef.current;
      pointerRef.current = null;
      if (p && gridRef.current?.hasPointerCapture?.(p.id))
        gridRef.current.releasePointerCapture(p.id);
    },
    [],
  );
  const sameCell = (a, b) => a?.row === b?.row && a?.col === b?.col;
  const pathBetween = (a, b) => {
    const dr = b.row - a.row,
      dc = b.col - a.col;
    if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return [];
    const path = Array.from(
      {
        length: Math.max(Math.abs(dr), Math.abs(dc)) + 1,
      },
      (_, i) => ({
        row: a.row + i * Math.sign(dr),
        col: a.col + i * Math.sign(dc),
      }),
    );
    return path.every((c) => grid[c.row]?.[c.col] !== undefined) ? path : [];
  };
  const finishPath = (path) => {
    const same = (a, b) =>
      a.length === b.length && a.every((c, i) => sameCell(c, b[i]));
    const target = targetPaths.find(
      (t) => same(path, t.cells) || same(path, [...t.cells].reverse()),
    );
    const word =
      target &&
      words.find(
        (w) =>
          w.replace(/[^a-z]/gi, "") === target.word.replace(/[^a-z]/gi, ""),
      );
    if (word && !foundWords.includes(word)) {
      setFoundWords((p) => [...p, word]);
      setFoundSelections((p) => [...p, target]);
      setAnnouncement(word + " found.");
    } else
      setAnnouncement(
        word
          ? "This word is already found."
          : "That is not a target word path.",
      );
    setStartCell(null);
    setSelectedCells([]);
  };
  const activateCell = (cell) => {
    if (locked || showedAnswer) return;
    if (startCell) finishPath(pathBetween(startCell, cell));
    else {
      setStartCell(cell);
      setSelectedCells([cell]);
      setAnnouncement("First letter selected. Choose the final letter.");
    }
  };
  const undo = () => {
    if (locked || showedAnswer) return;
    if (startCell) {
      setStartCell(null);
      setSelectedCells([]);
      setAnnouncement("Selection cancelled.");
      return;
    }
    setFoundWords((p) => p.slice(0, -1));
    setFoundSelections((p) => p.slice(0, -1));
    setAnnouncement("Last discovery removed.");
  };
  const hitCell = (e) => {
    const el = document
      .elementFromPoint(e.clientX, e.clientY)
      ?.closest?.("[data-row][data-col]");
    return el && gridRef.current?.contains(el)
      ? {
          row: Number(el.dataset.row),
          col: Number(el.dataset.col),
        }
      : null;
  };
  const gridPointerDown = (e) => {
    if (
      locked ||
      showedAnswer ||
      pointerRef.current ||
      (e.pointerType === "mouse" && e.button !== 0)
    )
      return;
    const cell = hitCell(e);
    if (!cell) return;
    e.preventDefault();
    pointerRef.current = {
      id: e.pointerId,
      start: cell,
    };
    setActiveCell(cell);
    gridRef.current.setPointerCapture?.(e.pointerId);
  };
  const gridPointerMove = (e) => {
    const p = pointerRef.current;
    if (p && p.id !== e.pointerId) return;
    const cell = hitCell(e);
    if (!cell) return;
    if (p) setSelectedCells(pathBetween(p.start, cell));
    else if (startCell) setSelectedCells(pathBetween(startCell, cell));
  };
  const gridPointerUp = (e) => {
    const p = pointerRef.current;
    if (!p || p.id !== e.pointerId) return;
    e.preventDefault();
    const cell = hitCell(e);
    cancelPointer();
    if (!cell) {
      setSelectedCells(startCell ? [startCell] : []);
      return;
    }
    if (sameCell(p.start, cell)) activateCell(cell);
    else finishPath(pathBetween(p.start, cell));
  };
  const gridCancel = (e) => {
    if (pointerRef.current?.id !== e.pointerId) return;
    cancelPointer();
    setStartCell(null);
    setSelectedCells([]);
  };
  const gridKey = (e, row, col) => {
    if (e.key === "Tab") return;
    const arrows = {
      ArrowRight: [0, 1],
      ArrowLeft: [0, -1],
      ArrowUp: [-1, 0],
      ArrowDown: [1, 0],
    };
    if (
      !arrows[e.key] &&
      !["Enter", " ", "Escape", "Backspace"].includes(e.key)
    )
      return;
    e.preventDefault();
    e.stopPropagation();
    if (locked || showedAnswer) return;
    if (arrows[e.key]) {
      const [dRow, dCol] = arrows[e.key],
        next = {
          row: Math.max(0, Math.min(grid.length - 1, row + dRow)),
          col: Math.max(0, Math.min(grid[0].length - 1, col + dCol)),
        };
      setActiveCell(next);
      if (startCell) setSelectedCells(pathBetween(startCell, next));
      gridRef.current
        ?.querySelector(
          '[data-row="' + next.row + '"][data-col="' + next.col + '"]',
        )
        .focus({
          preventScroll: true,
        });
    } else if (!e.repeat) {
      if (e.key === "Escape") {
        cancelPointer();
        setStartCell(null);
        setSelectedCells([]);
        setAnnouncement("Selection cancelled.");
      } else if (e.key === "Backspace") undo();
      else
        activateCell({
          row,
          col,
        });
    }
  };
  const resetAll = () => {
    audio.stop();
    cancelPointer();
    setFoundWords([]);
    setFoundSelections([]);
    setSelectedCells([]);
    setStartCell(null);
    setLocked(false);
    setShowedAnswer(false);
    setAnnouncement("All discoveries and feedback cleared.");
  };
  const showAnswers = () => {
    audio.stop();
    cancelPointer();
    setStartCell(null);
    setSelectedCells([]);
    setFoundWords(words);
    setFoundSelections(targetPaths);
    setLocked(true);
    setShowedAnswer(true);
    setAnnouncement("All word paths shown and locked.");
    resetButtonRef.current?.focus({
      preventScroll: true,
    });
  };
  const checkAnswers = () => {
    if (locked || showedAnswer) return;
    audio.stop();
    cancelPointer();
    setStartCell(null);
    setSelectedCells([]);
    if (!foundWords.length) {
      setAnnouncement("Find at least one word first.");
      ValidationAlert.info("Please find at least one word first.");
      return;
    }
    const score = foundWords.length,
      total = words.length;
    setAnnouncement(
      `Score ${score} out of ${total}. ${score === total ? "All words found." : "Keep finding the missing words."}`,
    );
    const color = score === total ? "green" : "orange",
      msg = `<div style="font-size:20px;text-align:center;"><span style="color:${color};font-weight:bold">Score: ${score} / ${total}</span></div>`;
    if (score === total) {
      resetButtonRef.current?.focus({
        preventScroll: true,
      });
      setLocked(true);
      ValidationAlert.success(msg);
    } else ValidationAlert.warning(msg);
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
        stroke={locked ? "#16a34a" : "#6D2980"}
        strokeWidth="20"
        strokeLinecap="round"
        opacity={opacity}
      />
    );
  };
  return (
    <div
      data-exercise-scope={"WB_Unit2_Page11_Q1.jsx"}
      className="main-container-component"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit2_Page11_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit2_Page11_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit2_Page11_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div
        className="div-forall mb-10"
        style={{
          gap: "10px",
        }}
      >
        {/* TITLE */}
        <ExerciseHeader
          isWorkbook
          sectionLetter="E"
          title={<>Find and circle the words.</>}
          subTitle="Scan one line or row at a time and select only the complete target words or phrases, then review every mark before checking."
        />

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
                className={`text-center ${foundWords.includes(word) ? "text-[#D1232A] line-through font-bold" : ""}`}
              >
                <AudioText
                  audio={audio}
                  id={`word-${index}`}
                  src={
                    {
                      few: soundE1,
                      beg: soundE2,
                      couple: soundE3,
                      twisty: soundE4,
                      carnival: soundE5,
                      crazy: soundE6,
                      "not so fast": soundE7,
                      still: soundE8,
                      trims: soundE9,
                      giraffe: soundE10,
                      "lets see": soundE11,
                      "works out": soundE12,
                    }[word]
                  }
                  label={`Hear ${word}`}
                >
                  {word}
                </AudioText>
              </div>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div className="flex justify-center">
          <div
            style={{
              touchAction: "none",
            }}
            aria-label={
              "Word search: arrows move; Enter or Space choose endpoints; Backspace undoes; Escape cancels."
            }
            role={"group"}
            onDragStart={(e) => e.preventDefault()}
            onLostPointerCapture={gridCancel}
            onPointerCancel={gridCancel}
            onPointerUp={gridPointerUp}
            onPointerMove={gridPointerMove}
            onPointerDown={gridPointerDown}
            ref={gridRef}
            className="relative select-none"
          >
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {row.map((letter, colIndex) => (
                  <span
                    aria-pressed={selectedCells.some(
                      (c) => c.row === rowIndex && c.col === colIndex,
                    )}
                    aria-label={`Row ${rowIndex + 1}, column ${colIndex + 1}: ${letter}${foundSelections.some((t) => t.cells.some((c) => c.row === rowIndex && c.col === colIndex)) ? ", found" : ""}`}
                    onFocus={() =>
                      setActiveCell({
                        row: rowIndex,
                        col: colIndex,
                      })
                    }
                    onKeyUp={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
                    onKeyDown={(e) => gridKey(e, rowIndex, colIndex)}
                    tabIndex={
                      !locked &&
                      !showedAnswer &&
                      activeCell.row === rowIndex &&
                      activeCell.col === colIndex
                        ? 0
                        : -1
                    }
                    data-choice={true}
                    role={"button"}
                    key={colIndex}
                    data-row={rowIndex}
                    data-col={colIndex}
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
                    style={{
                      touchAction: "none",
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            ))}

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
          onPointerDown={(event) => {
            if (locked) event.preventDefault();
          }}
          style={{
            cursor: locked ? "not-allowed" : "pointer",
          }}
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
export default WB_Unit2_Page11_Q1;
