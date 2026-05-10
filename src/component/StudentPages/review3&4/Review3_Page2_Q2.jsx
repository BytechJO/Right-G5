import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Review3_Page2_Q2 = () => {
  // ✅ IDs للكلمات الصح
  const correctAnswers = [
    "1-2", // short
    "2-2", // sad
    "3-3", // shiny
    "4-2", // unhappy
    "5-3", // helpful
    "6-2", // slim
    "6-4", // tall
    "7-3", // large
    "8-3", // dark
    "9-2", // angry
  ];

  const [selectedWords, setSelectedWords] = useState([]);
  const [wrongWords, setWrongWords] = useState([]);
  const [correctWordsLocked, setCorrectWordsLocked] = useState([]);
  const [locked, setLocked] = useState(false);

  // =========================
  // TOGGLE
  // =========================
  const toggleWord = (id) => {
    if (locked) return;

    // يمنع تعديل الصح
    if (correctWordsLocked.includes(id)) return;

    if (selectedWords.includes(id)) {
      setSelectedWords(selectedWords.filter((w) => w !== id));
    } else {
      setSelectedWords([...selectedWords, id]);
    }

    // يخفي X
    setWrongWords(wrongWords.filter((w) => w !== id));
  };

  // =========================
  // CHECK
  // =========================
  const handleCheck = () => {
     if (locked) return;
    if (selectedWords.length === 0) {
      ValidationAlert.info("Please select the adjectives.");
      return;
    }

    const wrong = [];

    // ✅ الصح الجديد فقط
    const newCorrect = [];

    selectedWords.forEach((id) => {
      const correct = correctAnswers.includes(id);

      if (correct) {
        newCorrect.push(id);
      } else {
        wrong.push(id);
      }
    });

    setWrongWords(wrong);

    // ✅ جمع الصح القديم + الجديد
    const updatedCorrect = [...new Set([...correctWordsLocked, ...newCorrect])];

    setCorrectWordsLocked(updatedCorrect);

    const total = correctAnswers.length;

    const allCorrect = updatedCorrect.length === total && wrong.length === 0;

    const color = allCorrect
      ? "green"
      : updatedCorrect.length === 0
        ? "red"
        : "orange";

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${updatedCorrect.length} / ${total}
      </span>
    </div>
  `;

    if (allCorrect) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (updatedCorrect.length === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // =========================
  // SHOW
  // =========================
  const handleShow = () => {
    setSelectedWords(correctAnswers);
    setCorrectWordsLocked(correctAnswers);
    setWrongWords([]);
    setLocked(true);
  };

  // =========================
  // RESET
  // =========================
  const handleReset = () => {
    setSelectedWords([]);
    setWrongWords([]);
    setCorrectWordsLocked([]);
    setLocked(false);
  };

  // =========================
  // RENDER WORD
  // =========================
  const renderWord = (word, id) => {
    const selected = selectedWords.includes(id);

    const wrong = wrongWords.includes(id);

    return (
      <span
        key={id}
        onClick={() => toggleWord(id)}
        style={{
          position: "relative",
          display: "inline-block",
          margin: "0 0.5px",
        }}
      >
        <span
          style={{
            cursor: locked ? "default" : "pointer",

            border: selected
              ? wrong
                ? "2px solid red"
                : "2px solid #6D2980"
              : "2px solid transparent",

            borderRadius: "999px",

            padding: "2px 2px",

            transition: "0.2s",

            userSelect: "none",

            display: "inline-block",
          }}
        >
          {word}
        </span>

        {/* ❌ */}
        {wrong && (
          <span
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              width: "18px",
              height: "18px",
              background: "#ef4444",
              color: "white",
              borderRadius: "50%",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              border: "2px solid white",
              boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
            }}
          >
            ✕
          </span>
        )}
      </span>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div className="div-forall">
        <h5 className="header-title-page8 mb-35">
          <span className="mr-2">E</span>
          Read and circle the adjectives in the chart.
        </h5>

        <table className="w-full border-collapse text-[20px]">
          <tbody>
            {/* ROW 1 */}
            <tr>
              <td className="border border-[#7A2D91] p-4 align-top whitespace-nowrap">
                <span className="font-bold mr-3">1</span>

                {["Is", "Wayne", "short", "?"].map((word, index) => (
                  <React.Fragment key={index}>
                    {word === "?" || word === "." ? (
                      <span className="mx-[1px]">{word}</span>
                    ) : (
                      renderWord(word, `1-${index}`)
                    )}
                  </React.Fragment>
                ))}
              </td>

              <td className="border border-[#7A2D91] p-4 align-top whitespace-nowrap">
                <span className="font-bold mr-3">2</span>

                {[
                  "They",
                  "are",
                  "sad",
                  "after",
                  "losing",
                  "the",
                  "game",
                  ".",
                ].map((word, index) => (
                  <React.Fragment key={index}>
                    {word === "?" || word === "." ? (
                      <span className="mx-[1px]">{word}</span>
                    ) : (
                      renderWord(word, `2-${index}`)
                    )}
                  </React.Fragment>
                ))}
              </td>

              <td className="border border-[#7A2D91] p-4 align-top whitespace-nowrap">
                <span className="font-bold mr-3">3</span>

                {["The", "car", "is", "shiny", "."].map((word, index) => (
                  <React.Fragment key={index}>
                    {word === "?" || word === "." ? (
                      <span className="mx-px">{word}</span>
                    ) : (
                      renderWord(word, `3-${index}`)
                    )}
                  </React.Fragment>
                ))}
              </td>
            </tr>

            {/* ROW 2 */}
            <tr>
              <td className="border border-[#7A2D91] p-4 align-top whitespace-nowrap">
                <span className="font-bold mr-3">4</span>

                {["Is", "he", "unhappy", "?"].map((word, index) => (
                  <React.Fragment key={index}>
                    {word === "?" || word === "." ? (
                      <span className="mx-px">{word}</span>
                    ) : (
                      renderWord(word, `4-${index}`)
                    )}
                  </React.Fragment>
                ))}
              </td>

              <td className="border border-[#7A2D91] p-4 align-top whitespace-nowrap">
                <span className="font-bold mr-3">5</span>

                {["The", "students", "are", "helpful", "."].map(
                  (word, index) => (
                    <React.Fragment key={index}>
                      {word === "?" || word === "." ? (
                        <span className="mx-px">{word}</span>
                      ) : (
                        renderWord(word, `5-${index}`)
                      )}
                    </React.Fragment>
                  ),
                )}
              </td>

              <td className="border border-[#7A2D91] p-4 align-top whitespace-nowrap">
                <span className="font-bold mr-3">6</span>

                {["Tina", "is", "slim", "and", "tall", "."].map(
                  (word, index) => (
                    <React.Fragment key={index}>
                      {word === "?" || word === "." ? (
                        <span className="mx-px">{word}</span>
                      ) : (
                        renderWord(word, `6-${index}`)
                      )}
                    </React.Fragment>
                  ),
                )}
              </td>
            </tr>

            {/* ROW 3 */}
            <tr>
              <td className="border border-[#7A2D91] p-4 align-top whitespace-nowrap">
                <span className="font-bold mr-3">7</span>

                {["We", "are", "a", "large", "family", "."].map(
                  (word, index) => (
                    <React.Fragment key={index}>
                      {word === "?" || word === "." ? (
                        <span className="mx-px">{word}</span>
                      ) : (
                        renderWord(word, `7-${index}`)
                      )}
                    </React.Fragment>
                  ),
                )}
              </td>

              <td className="border border-[#7A2D91] p-4 align-top whitespace-nowrap">
                <span className="font-bold mr-3">8</span>

                {["The", "room", "is", "dark", "."].map((word, index) => (
                  <React.Fragment key={index}>
                    {word === "?" || word === "." ? (
                      <span className="mx-px">{word}</span>
                    ) : (
                      renderWord(word, `8-${index}`)
                    )}
                  </React.Fragment>
                ))}
              </td>

              <td className="border border-[#7A2D91] p-4 align-top whitespace-nowrap">
                <span className="font-bold mr-3">9</span>

                {["Are", "you", "angry", "?"].map((word, index) => (
                  <React.Fragment key={index}>
                    {word === "?" || word === "." ? (
                      <span className="mx-px">{word}</span>
                    ) : (
                      renderWord(word, `9-${index}`)
                    )}
                  </React.Fragment>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>

        <button className="show-answer-btn" onClick={handleShow}>
          Show Answer
        </button>

        <button className="check-button2" onClick={handleCheck}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Review3_Page2_Q2;
