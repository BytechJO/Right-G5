import React, { useState, useRef, useEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 14/SVG/Asset 7.svg";
const Unit2_Page5_Q1 = () => {
  const questions = [
    {
      combined: "CARNIVALLITS",
      word1: "carnival",
      word2: "still",
      clue1: "a fun place with rides, shows and games",
      clue2: "continuing to be",
    },
    {
      combined: "TRIMSGEB",
      word1: "trims",
      word2: "beg",
      clue1: "cut",
      clue2: "ask",
    },
    {
      combined: "CRAZYYTSIW",
      word1: "crazy",
      word2: "twisty",
      clue1: "wild, amazing, or without control",
      clue2: "having lots of turns",
    },
    {
      combined: "COUPLEFFARIG",
      word1: "couple",
      word2: "giraffe",
      clue1: "about two",
      clue2: "a tall, thin animal",
    },
  ];

  const wordBankWords = [
    "carnival",
    "crazy",
    "trims",
    "giraffe",
    "beg",
    "twisty",
    "couple",
    "still",
  ];

  const [letterValues, setLetterValues] = useState(() =>
    questions.map((q) => Array(q.combined.length).fill("")),
  );
  const [word1Values, setWord1Values] = useState(["", "", "", ""]);
  const [word2Values, setWord2Values] = useState(["", "", "", ""]);
  const [result, setResult] = useState([null, null, null, null]);
  const [locked, setLocked] = useState(false);
  const letterRefs = useRef(
    questions.map((q) => Array(q.combined.length).fill(null)),
  );
  const [lockedParts, setLockedParts] = useState(
    questions.map(() => ({
      letters: false,
      w1: false,
      w2: false,
    })),
  );
  const normalize = (t) => t.toLowerCase().trim();

  /* ── Letter Box Handlers ── */

  const onLetterInput = (qIdx, i, e) => {
    if (locked || result[qIdx] === true) return;

    const val = e.target.value
      .replace(/[^a-zA-Z]/g, "")
      .toUpperCase()
      .slice(0, 1);

    setLetterValues((prev) => {
      const copy = prev.map((arr) => [...arr]);
      copy[qIdx][i] = val;
      return copy;
    });

    clearQuestionStyling(qIdx);

    if (val) {
      const next = letterRefs.current[qIdx][i + 1];
      if (next) next.focus();
    }
  };

  const onLetterKeydown = (qIdx, i, e) => {
    if (e.key === "Backspace" && !letterValues[qIdx][i]) {
      const prev = letterRefs.current[qIdx][i - 1];
      if (prev) {
        prev.focus();
        setLetterValues((prev) => {
          const copy = prev.map((arr) => [...arr]);
          copy[qIdx][i - 1] = "";
          return copy;
        });
      }
      clearQuestionStyling(qIdx);
    }
    if (e.key === "ArrowLeft" && i > 0) {
      letterRefs.current[qIdx][i - 1].focus();
    }
    if (e.key === "ArrowRight") {
      const next = letterRefs.current[qIdx][i + 1];
      if (next) next.focus();
    }
  };

  const onLetterPaste = (qIdx, i, e) => {
    e.preventDefault();
    if (locked || result[qIdx] === true) return;

    const text = (e.clipboardData || window.clipboardData)
      .getData("text")
      .replace(/[^a-zA-Z]/g, "")
      .toUpperCase();

    setLetterValues((prev) => {
      const copy = prev.map((arr) => [...arr]);
      for (let j = i; j < copy[qIdx].length && j - i < text.length; j++) {
        copy[qIdx][j] = text[j - i];
      }
      return copy;
    });

    clearQuestionStyling(qIdx);

    const focusIdx = Math.min(
      i + text.length,
      questions[qIdx].combined.length - 1,
    );
    letterRefs.current[qIdx][focusIdx]?.focus();
  };

  /* ── Word Input Handlers ── */

  const onWordChange = (qIdx, field, val) => {
    if (locked || result[qIdx] === true) return;
    clearQuestionStyling(qIdx);

    if (field === 1) {
      setWord1Values((prev) => {
        const copy = [...prev];
        copy[qIdx] = val;
        return copy;
      });
    } else {
      setWord2Values((prev) => {
        const copy = [...prev];
        copy[qIdx] = val;
        return copy;
      });
    }
  };

  /* ── Helpers ── */

  const getCombinedValue = (qIdx) => letterValues[qIdx].join("").toLowerCase();

  const clearQuestionStyling = (qIdx) => {
    setResult((prev) => {
      const copy = [...prev];
      copy[qIdx] = null;
      return copy;
    });
  };

  const getLetterStatus = (qIdx, i) => {
    const r = result[qIdx];
    if (r === true) return "correct";
    if (r === false) {
      return letterValues[qIdx][i] === questions[qIdx].combined[i]
        ? "correct"
        : "wrong";
    }
    return "";
  };

  const getWordStatus = (qIdx, field) => {
    const r = result[qIdx];
    if (r === true) return "correct";
    if (r === false) {
      const val = field === 1 ? word1Values[qIdx] : word2Values[qIdx];
      const correct =
        field === 1 ? questions[qIdx].word1 : questions[qIdx].word2;
      return normalize(val) === normalize(correct) ? "correct" : "wrong";
    }
    return "";
  };

  const isQuestionDisabled = (qIdx) => locked || result[qIdx] === true;

  const usedWords = () => {
    const set = new Set();

    // الكلمات المكتوبة حالياً
    word1Values.forEach((w) => {
      if (w) set.add(w.toLowerCase().trim());
    });

    word2Values.forEach((w) => {
      if (w) set.add(w.toLowerCase().trim());
    });

    return set;
  };
  /* ── Check ── */

  const checkAnswers = () => {
    if (locked) return;

    let allFilled = true;
    let fullyCorrect = 0;

    const newResult = [...result];

    const newLockedParts = [...lockedParts];

    questions.forEach((q, idx) => {
      const combined = getCombinedValue(idx);
      const w1 = normalize(word1Values[idx]);
      const w2 = normalize(word2Values[idx]);

      if (!combined || !w1 || !w2) {
        allFilled = false;
        return;
      }

      const cOk = combined === q.combined.toLowerCase();
      const w1Ok = w1 === q.word1.toLowerCase();
      const w2Ok = w2 === q.word2.toLowerCase();

      let questionScore = 0;

      if (cOk) {
        questionScore++;
        newLockedParts[idx].letters = true;
      }

      if (w1Ok) {
        questionScore++;
        newLockedParts[idx].w1 = true;
      }

      if (w2Ok) {
        questionScore++;
        newLockedParts[idx].w2 = true;
      }

      fullyCorrect += questionScore;

      // 🔥 هذا المهم
      const allOk = cOk && w1Ok && w2Ok;
      newResult[idx] = allOk ? true : false;
    });

    setLockedParts(newLockedParts);

    if (!allFilled) {
      ValidationAlert.info();
      return;
    }

    setResult(newResult);

    const msg = `Score: ${fullyCorrect} / 12`;

    if (fullyCorrect === 12) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (fullyCorrect === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  /* ── Show Answers ── */

  const showAnswers = () => {
    setLocked(true);

    setLetterValues(questions.map((q) => q.combined.split("")));
    setWord1Values(questions.map((q) => q.word1));
    setWord2Values(questions.map((q) => q.word2));
    setResult([true, true, true, true]);
  };

  /* ── Reset ── */

  const reset = () => {
    setLetterValues(questions.map((q) => Array(q.combined.length).fill("")));
    setWord1Values(["", "", "", ""]);
    setWord2Values(["", "", "", ""]);
    setResult([null, null, null, null]);
    setLocked(false);
  };

  /* ── Styles ── */

  const letterBoxStyle = {
    width: "25px",
    height: "34px",
    border: "none",
    borderBottom: "1px solid #444",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: 700,
    color: "#6D2980",
    outline: "none",
    textTransform: "uppercase",
    background: "transparent",
    padding: 0,
    caretColor: "#6D2980",
    transition: "border-color 0.2s",
  };

  const wordInputStyle = {
    border: "none",
    borderBottom: "1px solid #444",
    outline: "none",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: 700,
    color: "#6D2980",
    background: "transparent",
    padding: "6px 10px",
    width: "100px",
    caretColor: "#6D2980",
    transition: "border-color 0.2s",
  };

  const getStatusBorder = (status) => {
    if (status === "correct") return "#black";
    if (status === "wrong") return "#ef4444";
    return "#444";
  };
  const uw = usedWords();
  const spacing = ["32px", "80px", "70px", "70px"];
  return (
    <div className="flex flex-col items-center p-[30px]">
      <div
        style={{
          width: "60%",
          margin: "0 auto",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginBottom: "6px",
            position: "relative",
          }}
        >
          <span className="ex-A mr-5">A</span>
          <div className="div-forall">
            <h5 className="header-title-page8">
              Make words for the pushmi-pullyu to read by adding the
              <br />
              letters of one word backwards to another word.
            </h5>
            <span
              style={{
                fontSize: "20px",
                color: "#743486",
              }}
            >
              {" "}
              A pushmi-pullyu is a make-believe animal that has a head at both
              ends of its body.
            </span>
          </div>
          <img
            src={img}
            alt="pushmi"
            style={{
              position: "absolute", // لازم مع zIndex
              right: "0",
              top: "0",
              width: "120px",
              height: "auto",
              zIndex: 10, // 🔥 هذا اللي بدك إياه
            }}
          />
        </div>

        {/* WORD BANK */}
        <div
          style={{
            background: "#ede8f1",
            borderRadius: "14px",
            padding: "14px 20px",
            display: "flex",
            flexWrap: "wrap",
            gap: "6px 16px",
            fontSize: "14px",
            marginBottom: "24px",
            marginTop: "12px",
          }}
        >
          <span style={{ fontWeight: 700, color: "#6D2980" }}>Word Bank:</span>
          {wordBankWords.map((w) => (
            <span
              key={w}
              style={{
                color: uw.has(w.toLowerCase()) ? "#aaa" : "#444",
                fontWeight: 500,
                textDecoration: uw.has(w.toLowerCase())
                  ? "line-through"
                  : "none",
              }}
            >
              {w}
            </span>
          ))}
        </div>

        {/* QUESTIONS */}
        <div>
          {questions.map((q, idx) => {
            const disabled = isQuestionDisabled(idx);

            return (
              <div key={idx} style={{ marginBottom: spacing[idx] }}>
                <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
                  {/* LEFT SIDE */}
                  <div style={{ width: "420px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      {/* Number */}
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: "16px",
                          color: "#333",
                          width: "28px",
                        }}
                      >
                        {idx + 1}
                      </span>

                      {/* Letter Boxes */}
                      <div style={{ display: "flex", gap: "3px" }}>
                        {q.combined.split("").map((_, i) => {
                          const status = getLetterStatus(idx, i);
                          return (
                            <input
                              key={i}
                              ref={(el) => (letterRefs.current[idx][i] = el)}
                              type="text"
                              maxLength={1}
                              value={letterValues[idx][i]}
                              onChange={(e) => onLetterInput(idx, i, e)}
                              onKeyDown={(e) => onLetterKeydown(idx, i, e)}
                              onPaste={(e) => onLetterPaste(idx, i, e)}
                              onFocus={(e) => e.target.select()}
                              disabled={disabled || lockedParts[idx].letters}
                              style={{
                                ...letterBoxStyle,
                                borderBottomColor: getStatusBorder(status),
                                color: "#6D2980",
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div
                    style={{
                      width: "200px", // 🔥 ثبّت العرض
                      position: "relative",
                    }}
                  >
                    {/* ROW: inputs */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "20px",
                      }}
                    >
                      {/* = */}
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: "16px",
                          color: "#333",
                          marginTop: "8px",
                        }}
                      >
                        =
                      </span>

                      {/* COLUMN 1 */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          position: "relative",
                        }}
                      >
                        <input
                          type="text"
                          value={word1Values[idx]}
                          onChange={(e) => onWordChange(idx, 1, e.target.value)}
                          disabled={disabled || lockedParts[idx].w1}
                          style={{
                            ...wordInputStyle,
                            borderBottomColor: getStatusBorder(
                              getWordStatus(idx, 1),
                            ),
                            color: "#6D2980",
                          }}
                        />
                        {getWordStatus(idx, 1) === "wrong" && (
                          <span
                            style={{
                              position: "absolute",
                              top: "-8px",
                              right: "-10px",
                              transform: "translateY(-50%)",
                              width: "20px",
                              height: "20px",
                              background: "#ef4444",
                              color: "white",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "12px",
                              fontWeight: "bold",
                              border: "2px solid white",
                              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                              pointerEvents: "none",
                              zIndex: 3,
                            }}
                          >
                            ✕
                          </span>
                        )}
                        <span
                          style={{
                            color: "#00AEEF",
                            fontSize: "12.5px",
                            marginTop: "6px",
                          }}
                        >
                          {q.clue1}
                        </span>
                      </div>

                      {/* middle text */}
                      <span
                        style={{
                          marginTop: "8px",
                          color: "black",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {idx === 0 ? "forward and" : "and"}
                      </span>

                      {/* COLUMN 2 */}
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <input
                          type="text"
                          value={word2Values[idx]}
                          onChange={(e) => onWordChange(idx, 2, e.target.value)}
                          disabled={disabled || lockedParts[idx].w2}
                          style={{
                            ...wordInputStyle,
                            borderBottomColor: getStatusBorder(
                              getWordStatus(idx, 2),
                            ),
                            color: "#6D2980",
                          }}
                        />
                        {getWordStatus(idx, 2) === "wrong" && (
                          <span
                            style={{
                              position: "absolute",
                              top: "-8px",
                              right: "-350px",
                              transform: "translateY(-50%)",
                              width: "20px",
                              height: "20px",
                              background: "#ef4444",
                              color: "white",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "12px",
                              fontWeight: "bold",
                              border: "2px solid white",
                              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                              pointerEvents: "none",
                              zIndex: 3,
                            }}
                          >
                            ✕
                          </span>
                        )}
                        <span
                          style={{
                            color: "#00AEEF",
                            fontSize: "12.5px",
                            marginTop: "6px",
                          }}
                        >
                          {q.clue2}
                        </span>
                      </div>

                      {/* backward لأول سؤال */}
                      {idx === 0 && (
                        <span style={{ marginTop: "8px", color: "black" }}>
                          backward
                        </span>
                      )}
                    </div>

                    {/* clues label لأول سؤال فقط */}
                    {idx === 0 && (
                      <div
                        style={{
                          position: "absolute",
                          left: "-29px", // 👉 حرّكها يمين/يسار
                          top: "44px", // 👉 حرّكها فوق/تحت
                          fontWeight: 700,
                          fontSize: "12px",
                          color: "#00AEEF",
                        }}
                      >
                        Clues:
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BUTTONS */}
      <Button
        handleShowAnswer={showAnswers}
        handleStartAgain={reset}
        checkAnswers={checkAnswers}
      />
    </div>
  );
};

export default Unit2_Page5_Q1;
