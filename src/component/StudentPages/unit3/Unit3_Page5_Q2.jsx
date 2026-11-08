import clip0 from "../../../assets/audio/ClassBook/U3/Page 26 - B/Item_001_kitchen_closets.mp3";
import clip1 from "../../../assets/audio/ClassBook/U3/Page 26 - B/Item_002_bread_made_with_caraway_seed.mp3";
import clip2 from "../../../assets/audio/ClassBook/U3/Page 26 - B/Item_003_said_about_something_that_is_tasty.mp3";
import clip3 from "../../../assets/audio/ClassBook/U3/Page 26 - B/Item_004_a_short_way_to_say_refrigerator.mp3";
import clip4 from "../../../assets/audio/ClassBook/U3/Page 26 - B/Item_005_small_salty_fish.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import { SentenceGroup } from "./SentenceAudio";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";

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
const fieldKeys = {
  onKeyDown: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
};
const normalizeAnswer = (text) =>
  text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[‘’']/g, "")
    .replace(/[.,!?;:…“”"–—-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const Unit3_Page5_Q2 = () => {
  const [activeCell, setActiveCell] = useState("0-3");
  const focusFrame = React.useRef(null);
  const cancelFocus = () => {
    if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current);
    focusFrame.current = null;
  };
  const cellWords = (row, col) =>
    words.filter((word) =>
      Array.from(word.word).some(
        (_, i) =>
          (word.dir === "down" ? word.row + i : word.row) === row &&
          (word.dir === "across" ? word.col + i : word.col) === col,
      ),
    );
  const cellLocked = (row, col) =>
    locked || cellWords(row, col).some((word) => result[word.key] === true);
  const moveCell = (row, col, dr, dc) => {
    let r = row + dr,
      c = col + dc;
    while (r >= 0 && r < 10 && c >= 0 && c < 12) {
      if (isCellActive(r, c) && !cellLocked(r, c)) {
        const key = r + "-" + c;
        setActiveCell(key);
        cancelFocus();
        focusFrame.current = requestAnimationFrame(() => {
          focusFrame.current = null;
          inputsRef.current[key]?.focus({ preventScroll: true });
        });
        return;
      }
      r += dr;
      c += dc;
    }
  };
  const cellKey = (event, row, col) => {
    if (event.key === "Tab") return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      if (!event.repeat) {
        const next = direction === "across" ? "down" : "across";
        setDirection(next);
        setAnnouncement(
          "Writing " + next + ". Arrow keys move between available letters.",
        );
      }
      return;
    }
    const steps = {
      ArrowLeft: [0, -1],
      ArrowRight: [0, 1],
      ArrowUp: [-1, 0],
      ArrowDown: [1, 0],
    };
    if (steps[event.key]) {
      event.preventDefault();
      event.stopPropagation();
      const [dr, dc] = steps[event.key];
      setDirection(dr ? "down" : "across");
      moveCell(row, col, dr, dc);
      return;
    }
    if (event.key === "Backspace" || event.key === "Delete") {
      event.preventDefault();
      event.stopPropagation();
      if (!event.repeat && !cellLocked(row, col)) {
        handleChange(row, col, "");
        if (event.key === "Backspace")
          moveCell(
            row,
            col,
            direction === "across" ? 0 : -1,
            direction === "across" ? -1 : 0,
          );
      }
    }
  };
  React.useEffect(
    () => () => {
      if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current);
    },
    [],
  );

  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");

  const [result, setResult] = useState({});
  const [locked, setLocked] = useState(false);
  const inputsRef = React.useRef({});
  const [direction, setDirection] = useState("across");
  const [grid, setGrid] = useState(
    Array(10)
      .fill("")
      .map(() => Array(12).fill("")),
  );

  const words = [
    { key: "d1", word: "cupboards", row: 0, col: 3, dir: "down" },
    { key: "a2", word: "yummy", row: 1, col: 2, dir: "across" },
    { key: "a3", word: "fridge", row: 5, col: 5, dir: "across" },
    { key: "d4", word: "rye", row: 5, col: 6, dir: "down" },
    { key: "a5", word: "sardines", row: 7, col: 0, dir: "across" },
  ];
  const normalize = normalizeAnswer;

  // ✅ change
  const handleChange = (row, col, value) => {
    if (cellLocked(row, col)) return;
    const letter = value.slice(-1);
    if (letter && !/^[a-z]$/i.test(letter)) return;
    setGrid((previous) =>
      previous.map((line, r) =>
        r === row ? line.map((v, c) => (c === col ? letter : v)) : line,
      ),
    );
    setResult((previous) => {
      const next = { ...previous };
      for (const word of cellWords(row, col))
        if (next[word.key] !== true) delete next[word.key];
      return next;
    });
    if (letter)
      moveCell(
        row,
        col,
        direction === "across" ? 0 : 1,
        direction === "across" ? 1 : 0,
      );
  };

  // ✅ check active cell
  const isCellActive = (row, col) => {
    return words.some((w) => {
      for (let i = 0; i < w.word.length; i++) {
        const r = w.dir === "down" ? w.row + i : w.row;
        const c = w.dir === "across" ? w.col + i : w.col;
        if (r === row && c === col) return true;
      }
      return false;
    });
  };

  // ✅ check answers
  const checkAnswers = () => {
    if (locked) return;
    cancelFocus();

    audio.stop();

    if (locked) return;

    // تحقق تعبئة
    for (let w of words) {
      for (let i = 0; i < w.word.length; i++) {
        const r = w.dir === "down" ? w.row + i : w.row;
        const c = w.dir === "across" ? w.col + i : w.col;

        if (!grid[r][c]) {
          (setAnnouncement(
            String("Please complete all fields.")
              .replace(/<[^>]*>/g, " ")
              .replace(/\s+/g, " ")
              .trim(),
          ),
            ValidationAlert.info("Please complete all fields."));
          return;
        }
      }
    }

    let correctCount = 0;
    let newResult = {};

    words.forEach((w) => {
      let user = "";

      for (let i = 0; i < w.word.length; i++) {
        const r = w.dir === "down" ? w.row + i : w.row;
        const c = w.dir === "across" ? w.col + i : w.col;
        user += grid[r][c];
      }

      const ok = normalize(user) === normalize(w.word);

      if (ok) correctCount++;

      newResult[w.key] = ok;
    });

    setResult(newResult);

    const total = words.length;
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
      resetButtonRef.current?.focus({ preventScroll: true });
      setLocked(true);
      (setAnnouncement(
        String(msg)
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.success(msg));
    } else if (correctCount === 0) {
      (setAnnouncement(
        String(msg)
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.error(msg));
    } else {
      (setAnnouncement(
        String(msg)
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.warning(msg));
    }
  };

  // ✅ show answers
  const showAnswers = () => {
    audio.stop();
    cancelFocus();
    const next = grid.map((row) => [...row]);
    for (const word of words)
      for (let i = 0; i < word.word.length; i++) {
        const r = word.dir === "down" ? word.row + i : word.row,
          c = word.dir === "across" ? word.col + i : word.col;
        next[r][c] = word.word[i];
      }
    setGrid(next);
    setResult(Object.fromEntries(words.map((word) => [word.key, true])));
    setLocked(true);
    setAnnouncement("All crossword answers shown and locked.");
  };

  const reset = () => {
    cancelFocus();
    setActiveCell("0-3");
    setDirection("across");

    audio.stop();
    setAnnouncement("Answers, feedback and locks cleared.");

    setGrid(
      Array(10)
        .fill("")
        .map(() => Array(12).fill("")),
    );
    setResult({});
    setLocked(false);
  };

  // ✅ numbers
  const getNumber = (row, col) => {
    if (row === 0 && col === 3) return 1;
    if (row === 1 && col === 2) return 2;
    if (row === 5 && col === 5) return 3;
    if (row === 5 && col === 6) return 4;
    if (row === 7 && col === 0) return 5;
    return null;
  };

  const tabCell = (() => {
    if (!cellLocked(...activeCell.split("-").map(Number))) return activeCell;
    for (let row = 0; row < 10; row++)
      for (let col = 0; col < 12; col++)
        if (isCellActive(row, col) && !cellLocked(row, col))
          return row + "-" + col;
    return null;
  })();
  return (
    <div
      data-exercise-scope="Unit3_Page5_Q2.jsx"
      className="flex flex-col items-center p-8"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit3_Page5_Q2.jsx"] input:focus-visible,[data-exercise-scope="Unit3_Page5_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Unit3_Page5_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>

      <div className="div-forall" style={{gap:"50px"}}>
        <ExerciseHeader
          sectionLetter="B"
          title={<>Use the clues to complete the puzzle.</>}
          subTitle="Solve the easiest clues first, then use the crossing letters to help complete the remaining words."
        />

        <div className="flex gap-16">
          {/* GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 40px)",
              gridTemplateRows: "repeat(10, 40px)",
              gap: "1px",
            }}
          >
            {grid.map((rowArr, row) =>
              rowArr.map((_, col) => {
                const active = isCellActive(row, col);
                const number = getNumber(row, col);

                return (
                  <div
                    key={`${row}-${col}`}
                    style={{
                      width: "40px",
                      height: "40px",
                      border: active ? "2px solid #713083" : "none",
                      position: "relative",
                      borderColor: cellWords(row, col).some(
                        (word) => result[word.key] === true,
                      )
                        ? "#16a34a"
                        : active
                          ? "#713083"
                          : undefined,
                    }}
                  >
                    {number && (
                      <>
                        {(() => {
                          const wordObj = words.find(
                            (w) => w.row === row && w.col === col,
                          );

                          if (!wordObj || result[wordObj.key] !== false)
                            return null;

                          const isAcross = wordObj.dir === "across";
                          const isDown = wordObj.dir === "down";

                          return (
                            <span
                              style={{
                                position: "absolute",

                                // 📍 المكان حسب الاتجاه
                                top: isDown ? "-25px" : "50%",
                                left: isAcross ? "-25px" : "50%",

                                transform: isAcross
                                  ? "translateY(-50%)"
                                  : "translateX(-50%)",

                                width: "18px",
                                height: "18px",
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
                                zIndex: 5,
                              }}
                            >
                              ✕
                            </span>
                          );
                        })()}

                        <span
                          style={{
                            position: "absolute",
                            top: "0px",
                            left: "2px",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          {number}
                        </span>
                      </>
                    )}

                    {active && (
                      <input
                        onKeyUp={fieldKeys.onKeyUp}
                        onKeyDown={(event) => cellKey(event, row, col)}
                        tabIndex={tabCell === `${row}-${col}` ? 0 : -1}
                        aria-describedby={cellWords(row, col)
                          .map((word) => "unit3-crossword-clue-" + word.key)
                          .join(" ")}
                        title={`Row ${row + 1}, column ${col + 1}. ${direction}. Arrow keys move; Enter or Space changes direction.`}
                        aria-label={`Crossword row ${row + 1}, column ${col + 1}; ${cellWords(
                          row,
                          col,
                        )
                          .map(
                            (word) =>
                              word.key.slice(1) +
                              " " +
                              word.dir +
                              ", letter " +
                              ((word.dir === "down"
                                ? row - word.row
                                : col - word.col) +
                                1),
                          )
                          .join("; ")}`}
                        ref={(el) => (inputsRef.current[`${row}-${col}`] = el)}
                        onClick={() => {
                          if (inputsRef.current[`${row}-${col + 1}`]) {
                            setDirection("across");
                          } else {
                            setDirection("down");
                          }
                        }}
                        onFocus={(event) => {
                          setActiveCell(`${row}-${col}`);
                          event.target.select();
                        }} // 🔥 المهم
                        value={grid[row][col]}
                        maxLength={1}
                        disabled={cellLocked(row, col)}
                        onChange={(event) =>
                          handleChange(row, col, event.target.value)
                        }
                        className="w-full h-full text-center font-bold text-[#6D2980]"
                      />
                    )}
                  </div>
                );
              }),
            )}
          </div>

          {/* CLUES */}
          <div style={{ width: "300px" }}>
            <div className="p-4 bg-[#D4C7DC] rounded-xl mb-10">
              <h4 className="font-bold mb-2 text-[#713083]">Down</h4>
              <p id="unit3-crossword-clue-d1">
                <AudioText
                  audio={audio}
                  id="clue-d1"
                  src={clip0}
                  label="Hear clue 1: kitchen closets"
                >
                  <b>1</b> kitchen closets
                </AudioText>
              </p>
              <p id="unit3-crossword-clue-d4">
                <AudioText
                  audio={audio}
                  id="clue-d4"
                  src={clip1}
                  label="Hear clue 4: bread made with caraway seed"
                >
                  <b>4</b> bread made with caraway seed
                </AudioText>
              </p>
            </div>

            <div className="p-4 bg-[#D4C7DC] rounded-xl">
              <h4 className="font-bold mb-2 text-[#713083]">Across</h4>
              <p id="unit3-crossword-clue-a2">
                <AudioText
                  audio={audio}
                  id="clue-a2"
                  src={clip2}
                  label="Hear clue 2: said about something that is tasty"
                >
                  <b>2</b> said about something that is tasty
                </AudioText>
              </p>
              <p id="unit3-crossword-clue-a3">
                <AudioText
                  audio={audio}
                  id="clue-a3"
                  src={clip3}
                  label="Hear clue 3: a short way to say refrigerator"
                >
                  <b>3</b> a short way to say refrigerator
                </AudioText>
              </p>
              <p id="unit3-crossword-clue-a5">
                <AudioText
                  audio={audio}
                  id="clue-a5"
                  src={clip4}
                  label="Hear clue 5: small salty fish"
                >
                  <b>5</b> small salty fish
                </AudioText>
              </p>
            </div>
          </div>
        </div>

        <div className="action-buttons-container">
          <button
            type="button"
            {...activationKeys}
            aria-label="Start Again"
            ref={resetButtonRef}
            onClick={reset}
            className="try-again-button"
          >
            Start Again ↻
          </button>
          <button
            type="button"
            {...activationKeys}
            aria-label="Show Answer"
            onClick={showAnswers}
            className="show-answer-btn swal-continue"
          >
            Show Answer
          </button>
          <button
            type="button"
            {...activationKeys}
            aria-label="Check Answer"
            onClick={checkAnswers}
            disabled={locked}
            style={{ cursor: locked ? "not-allowed" : "pointer" }}
            className="check-button2"
          >
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unit3_Page5_Q2;
