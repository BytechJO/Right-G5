import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

const Unit10_Page2_ComprehensionA = () => {
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
    { key: "d1", word: "barn", row: 0, col: 3, dir: "down" },
    { key: "a2", word: "braid", row: 0, col: 3, dir: "across" },
    { key: "a3", word: "curtains", row: 2, col: 1, dir: "across" },
    { key: "d4", word: "cheery", row: 2, col: 1, dir: "down" },
    { key: "a5", word: "neighed", row: 5, col: 0, dir: "across" },
  ];
  const normalize = (str) => str.toLowerCase().trim();

  // ✅ change
  const handleChange = (row, col, value) => {
    if (locked) return;

    const newGrid = grid.map((r) => [...r]);
    newGrid[row][col] = value;
    setGrid(newGrid);

    if (value) {
      let next = null;

      if (direction === "across") {
        next = inputsRef.current[`${row}-${col + 1}`];
      }

      if (direction === "down") {
        next = inputsRef.current[`${row + 1}-${col}`];
      }

      if (next) next.focus();
    }
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

    // تحقق تعبئة
    for (let w of words) {
      for (let i = 0; i < w.word.length; i++) {
        const r = w.dir === "down" ? w.row + i : w.row;
        const c = w.dir === "across" ? w.col + i : w.col;

        if (!grid[r][c]) {
          ValidationAlert.info("Please complete all fields.");
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
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // ✅ show answers
  const showAnswers = () => {
    const newGrid = grid.map((r) => [...r]);

    words.forEach((w) => {
      for (let i = 0; i < w.word.length; i++) {
        const r = w.dir === "down" ? w.row + i : w.row;
        const c = w.dir === "across" ? w.col + i : w.col;

        newGrid[r][c] = w.word[i];
      }
    });

    setResult({});
    setGrid(newGrid);
    setLocked(true);
  };

  const reset = () => {
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
    if (row === 2 && col === 1) return 2;
    if (row === 5 && col === 0) return 3;

    return null;
  };

  return (
    <div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-10">
        <span className="ex-A-read mr-2">A</span>
        Use the clues to complete the puzzle. The words are from the story
        above.
      </h5>
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
                      ref={(el) => (inputsRef.current[`${row}-${col}`] = el)}
                      onClick={() => {
                        if (inputsRef.current[`${row}-${col + 1}`]) {
                          setDirection("across");
                        } else {
                          setDirection("down");
                        }
                      }}
                      onFocus={(e) => e.target.select()} // 🔥 المهم
                      value={grid[row][col]}
                      maxLength={1}
                      disabled={
                        locked ||
                        words.some((w) => {
                          if (result[w.key] !== true) return false;

                          for (let i = 0; i < w.word.length; i++) {
                            const r = w.dir === "down" ? w.row + i : w.row;
                            const c = w.dir === "across" ? w.col + i : w.col;

                            if (r === row && c === col) return true;
                          }

                          return false;
                        })
                      }
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

        {/* CLUES */}
        <div style={{ width: "300px" }}>
          <div className="p-4 bg-[#D4C7DC] rounded-xl mb-10">
            <h4 className="font-bold mb-2 text-[#713083]">Across</h4>
            <p>
              <b>1</b> used for people’s hair
            </p>
            <p>
              <b>2</b> window coverings
            </p>{" "}
            <p>
              <b>3</b> a noise the horse made
            </p>
          </div>

          <div className="p-4 bg-[#D4C7DC] rounded-xl">
            <h4 className="font-bold mb-2 text-[#713083]">Down</h4>
            <p>
              <b>2</b> a place to keep animals
            </p>
            <p>
              <b>3</b> happy, glad
            </p>
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex justify-center gap-6 mt-10">
        {/* Reset */}
        <div className="relative group">
          <div
            onClick={reset}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaRedo size={14} />
            </div>
          </div>

          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Reset
          </span>
        </div>

        {/* Show */}
        <div className="relative group">
          <div
            onClick={showAnswers}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaEye size={14} />
            </div>
          </div>

          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Show Answer
          </span>
        </div>

        {/* Check */}
        <div className="relative group">
          <div
            onClick={checkAnswers}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaCheck size={14} />
            </div>
          </div>

          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Check Answer
          </span>
        </div>
      </div>
    </div>
  );
};

export default Unit10_Page2_ComprehensionA;
