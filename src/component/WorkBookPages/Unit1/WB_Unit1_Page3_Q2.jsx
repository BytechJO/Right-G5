import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";

const WB_Unit1_Page3_Q2 = () => {
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

    setGrid(newGrid);
    setLocked(true);
  };

  const reset = () => {
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
    <div className="flex flex-col items-center p-8">
      <div className="div-forall">
        <h5 className="header-title-page8 mb-7">
          <span className="ex-A mr-2.5">B</span>
          Complete the puzzle.
        </h5>

        <div className="flex gap-16">
          {/* CLUES */}
          <div style={{ width: "400px", marginTop: 50 }}>
            <div className="p-4 mb-10">
              <h4 className="font-bold mb-2">Down</h4>
              <p className="mb-2">
                <b className="mr-3">1</b>to calculate
              </p>
              <p>
                <b className="mr-3">2</b>thin, flat, round cakes
              </p>
            </div>

            <div className="p-4">
              <h4 className="font-bold mb-2 ">Across</h4>
              <p className="mb-2">
                <b className="mr-3">3</b>the front part of the head
              </p>
              <p className="mb-2">
                <b className="mr-3">4</b>it is another word for “in fact” or
                “really”
              </p>
              <p>
                <b className="mr-3">5</b>something used to write homework on
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
        </div>

        <Button
          handleShowAnswer={showAnswers}
          handleStartAgain={reset}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
};

export default WB_Unit1_Page3_Q2;
