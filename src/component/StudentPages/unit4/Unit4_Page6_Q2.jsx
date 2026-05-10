import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Unit4_Page6_Q2 = () => {
  const [correctWordsLocked, setCorrectWordsLocked] = useState([]);
  const paragraph = [
    "Max likes to do different activities on the weekends.",
    "Max usually skateboards at the skate park near his house.",
    "His friend Nick sometimes skateboards with him.",
    "Max’s neighbor occasionally plays a chess game with him.",
    "They rarely sit outside when they play chess.",
    "Instead, they often play chess in each other’s houses.",
    "Every once in a while, Max likes to watch a movie at the theater.",
    "However, he often rents movies to watch at home.",
    "During the summer, Max always reads a lot of books.",
    "Sometimes, it is just too hot to do anything outside.",
    "Max is never bored on his weekends because he regularly finds things to do.",
  ];

  const correctWords = [
    "usually",
    "sometimes",
    "occasionally",
    "rarely",
    "often",
    "often",
    "always",
    "Sometimes",
    "never",
    "regularly",
  ];

  const [selectedWords, setSelectedWords] = useState([]);
  const [wrongWords, setWrongWords] = useState([]);
  const [locked, setLocked] = useState(false);

  // toggle
  const toggleWord = (id) => {
    if (locked) return;

    // ✅ لا تعدل الصح المثبت
    if (correctWordsLocked.includes(id)) return;

    if (selectedWords.includes(id)) {
      setSelectedWords(selectedWords.filter((w) => w !== id));
    } else {
      setSelectedWords([...selectedWords, id]);
    }

    setWrongWords(wrongWords.filter((w) => w !== id));
  };

  // check
  const handleCheck = () => {
    if (locked) return;

    if (selectedWords.length === 0) {
      ValidationAlert.info("Select the adverbs.");
      return;
    }

    let score = 0;

    const wrong = [];
    const correctLockedNow = [];

    selectedWords.forEach((id) => {
      const [lineIndex, wordIndex] = id.split("-");

      const word = paragraph[lineIndex]
        .split(" ")
        // eslint-disable-next-line no-unexpected-multiline
        [wordIndex].replace(/[.,]/g, "");

      const correct = correctWords.some(
        (w) => w.toLowerCase() === word.toLowerCase(),
      );

      if (correct) {
        score++;
        correctLockedNow.push(id);
      } else {
        wrong.push(id);
      }
    });

    setWrongWords(wrong);

    // ✅ ثبت الصح فقط
    setCorrectWordsLocked((prev) => [
      ...new Set([...prev, ...correctLockedNow]),
    ]);

    const total = correctWords.length;

    const allCorrect = correctLockedNow.length === total;

    const msg = `Score: ${score} / ${total}`;

    if (allCorrect) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (score === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // show
  const handleShow = () => {
    const allCorrectIds = [];

    paragraph.forEach((line, lineIndex) => {
      line.split(" ").forEach((word, wordIndex) => {
        const cleanWord = word.replace(/[.,]/g, "");

        const correct = correctWords.some(
          (w) => w.toLowerCase() === cleanWord.toLowerCase(),
        );

        if (correct) {
          allCorrectIds.push(`${lineIndex}-${wordIndex}`);
        }
      });
    });

    setSelectedWords(allCorrectIds);
    setWrongWords([]);
    setCorrectWordsLocked(allCorrectIds);
    setLocked(true);
  };

  // reset
  const handleReset = () => {
    setSelectedWords([]);
    setWrongWords([]);
    setLocked(false);
    setCorrectWordsLocked([]);
  };

  // render word
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
          margin: "0 2px",
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

            padding: "2px 6px",

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
        padding: "30px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="div-forall">
        {/* HEADER */}
        <h5 className="header-title-page8 mb-5">
          <span className="ex-A mr-2">E</span>
          Read and circle the adverbs of frequency.
        </h5>

        {/* PARAGRAPH */}
        <div
          style={{
            marginTop: "35px",
            padding: "0 20px",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              lineHeight: "2.15",
              color: "#111",
              textAlign: "left",
              maxWidth: "980px",
              margin: "0 auto",
              wordSpacing: "1px",
            }}
          >
            {paragraph.map((line, i) => (
              <React.Fragment key={i}>
                {line
                  .split(" ")
                  .map((word, index) => renderWord(word, `${i}-${index}`))}{" "}
              </React.Fragment>
            ))}
          </p>
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
    </div>
  );
};

export default Unit4_Page6_Q2;
