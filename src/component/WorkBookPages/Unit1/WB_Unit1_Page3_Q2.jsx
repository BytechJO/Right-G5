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
import clip0 from "../../../assets/audio/Workbook/Unit 1/Page 3 - B/Item_001_Down.mp3";
import clip1 from "../../../assets/audio/Workbook/Unit 1/Page 3 - B/Item_002_to_calculate.mp3";
import clip2 from "../../../assets/audio/Workbook/Unit 1/Page 3 - B/Item_003_thin,_flat,_round_cakes.mp3";
import clip3 from "../../../assets/audio/Workbook/Unit 1/Page 3 - B/Item_004_Across.mp3";
import clip4 from "../../../assets/audio/Workbook/Unit 1/Page 3 - B/Item_005_the_front_part_of_the_head.mp3";
import clip5 from "../../../assets/audio/Workbook/Unit 1/Page 3 - B/Item_006_it_is_another_word_for_in_fact_or.mp3";
import clip6 from "../../../assets/audio/Workbook/Unit 1/Page 3 - B/Item_007_really.mp3";
import clip7 from "../../../assets/audio/Workbook/Unit 1/Page 3 - B/Item_008_something_used_to_write_homework_on.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
} from "../../StudentPages/unit5/ExerciseAudioText";

import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

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

const WB_Unit1_Page3_Q2 = () => {
  const [activeCell, setActiveCell] = useState("0-7");
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
    while (r >= 0 && r < 12 && c >= 0 && c < 12) {
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
  const [announcement, setAnnouncement] = React.useState("");

  const [result, setResult] = useState({});
  const [locked, setLocked] = useState(false);
  const inputsRef = React.useRef({});
  const [direction, setDirection] = useState("across");
  const [grid, setGrid] = useState(
    Array(12)
      .fill("")
      .map(() => Array(12).fill("")),
  );

  const words = [
    { key: "d1", word: "count", row: 0, col: 7, dir: "down" },
    { key: "d2", word: "pancakes", row: 4, col: 5, dir: "down" },
    { key: "a3", word: "face", row: 5, col: 4, dir: "across" },
    { key: "a4", word: "actually", row: 7, col: 4, dir: "across" },
    { key: "a5", word: "notebook", row: 10, col: 2, dir: "across" },
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
    cancelFocus();
    if (locked) return;
    audio.stop();

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
    cancelFocus();
    audio.stop();
    setAnnouncement("Model answers shown and locked.");
    resetButtonRef.current?.focus({ preventScroll: true });
    const newGrid = grid.map((r) => [...r]);

    words.forEach((w) => {
      for (let i = 0; i < w.word.length; i++) {
        const r = w.dir === "down" ? w.row + i : w.row;
        const c = w.dir === "across" ? w.col + i : w.col;

        newGrid[r][c] = w.word[i];
      }
    });

    setGrid(newGrid);
    setLocked(true);
  };

  const reset = () => {
    setActiveCell("0-7");
    setDirection("across");
    cancelFocus();
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setGrid(
      Array(12)
        .fill("")
        .map(() => Array(12).fill("")),
    );
    setResult({});
    setLocked(false);
  };

  // ✅ numbers
  const getNumber = (row, col) => {
    if (row === 0 && col === 7) return 1;
    if (row === 4 && col === 5) return 2;
    if (row === 5 && col === 4) return 3;
    if (row === 7 && col === 4) return 4;
    if (row === 10 && col === 2) return 5;

    return null;
  };
  return (
    <div
      data-exercise-scope={"WB_Unit1_Page3_Q2.jsx"}
      className="flex flex-col items-center p-8"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit1_Page3_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit1_Page3_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit1_Page3_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall mb-10">
        <ExerciseHeader
          subTitle="Solve the clearest clues first, then use crossing letters to confirm the remaining vocabulary before checking."
          isWorkbook
          sectionLetter="B"
          title={<>Complete the puzzle.</>}
        />

        <div className="flex gap-2">
          {/* CLUES */}
          <div style={{ width: "400px", marginTop: 20 }}>
            <div className="p-4 mb-2">
              <h4 className="font-bold mb-2">
                <AudioText
                  audio={audio}
                  id={"audio-0"}
                  src={clip0}
                  label={"Hear Down"}
                >
                  Down
                </AudioText>
              </h4>
              <p className="mb-2">
                <AudioText
                  audio={audio}
                  id={"audio-1"}
                  src={clip1}
                  label={"Hear to calculate"}
                >
                  <b className="mr-3">1</b>to calculate
                </AudioText>
              </p>
              <p>
                <AudioText
                  audio={audio}
                  id={"audio-2"}
                  src={clip2}
                  label={"Hear thin, flat, round cakes"}
                >
                  <b className="mr-3">2</b>thin, flat, round cakes
                </AudioText>
              </p>
            </div>

            <div className="p-4">
              <h4 className="font-bold mb-2 ">
                <AudioText
                  audio={audio}
                  id={"audio-3"}
                  src={clip3}
                  label={"Hear Across"}
                >
                  Across
                </AudioText>
              </h4>
              <p className="mb-2">
                <AudioText
                  audio={audio}
                  id={"audio-4"}
                  src={clip4}
                  label={"Hear the front part of the head"}
                >
                  <b className="mr-3">3</b>the front part of the head
                </AudioText>
              </p>
              <p className="mb-2">
                <AudioText
                  audio={audio}
                  id={"audio-5"}
                  src={[clip5, clip6]}
                  label={"Hear it is another word for “in fact” or “really”"}
                >
                  <b className="mr-3">4</b>it is another word for “in fact” or
                  “really”
                </AudioText>
              </p>
              <p>
                <AudioText
                  audio={audio}
                  id={"audio-6"}
                  src={clip7}
                  label={"Hear something used to write homework on"}
                >
                  <b className="mr-3">5</b>something used to write homework on
                </AudioText>
              </p>
            </div>
          </div>
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
                        style={{
                          ...(cellWords(row, col).some(
                            (w) => result[w.key] === true,
                          )
                            ? { boxShadow: "inset 0 0 0 2px #16a34a" }
                            : {}),
                        }}
                        aria-invalid={
                          !cellLocked(row, col) &&
                          cellWords(row, col).some(
                            (w) => result[w.key] === false,
                          )
                        }
                        title={`Crossword row ${row + 1}, column ${col + 1}`}
                        aria-label={`Crossword row ${row + 1}, column ${col + 1}. ${cellWords(
                          row,
                          col,
                        )
                          .map((word) => word.dir + " " + word.key)
                          .join("; ")}`}
                        onKeyDown={(event) => cellKey(event, row, col)}
                        tabIndex={activeCell === `${row}-${col}` ? 0 : -1}
                        onKeyUp={fieldKeys.onKeyUp}
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
                        onChange={(e) =>
                          handleChange(row, col, e.target.value.toLowerCase())
                        }
                        className="w-full h-full text-center font-bold text-[#6D2980]"
                      />
                    )}
                  </div>
                );
              }),
            )}
          </div>
        </div>

        <div className="action-buttons-container">
          <button
            {...activationKeys}
            ref={resetButtonRef}
            type="button"
            aria-label="Start Again"
            className="try-again-button"
            onClick={reset}
          >
            Start Again ↻
          </button>
          <button
            {...activationKeys}
            type="button"
            aria-label="Show Answer"
            className="show-answer-btn swal-continue"
            onClick={showAnswers}
          >
            Show Answer
          </button>
          <button
            {...activationKeys}
            type="button"
            aria-label="Check Answer"
            disabled={locked}
            style={{ cursor: locked ? "not-allowed" : "pointer" }}
            className="check-button2"
            onClick={checkAnswers}
          >
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default WB_Unit1_Page3_Q2;
