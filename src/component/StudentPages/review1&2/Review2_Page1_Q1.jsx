import clip0 from "../../../assets/audio/ClassBook/U2/Page 18 - A/Item_001_Having_to_do_with_a_carnival.mp3";
import clip1 from "../../../assets/audio/ClassBook/U2/Page 18 - A/Item_002_About_numbers_or_amounts.mp3";
import clip2 from "../../../assets/audio/ClassBook/U2/Page 18 - A/Item_003_Everything_else.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit2/useExerciseAudio";
import { AudioText, AudioFeedback } from "../unit2/ExerciseAudioText";
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
const fieldKeys = {
  onKeyDown: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
};

const Review2_Page1_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const groupLabels = [
    "Having to do with a carnival",
    "About numbers or amounts",
    "Everything else",
  ];

  const [answers, setAnswers] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  // ✅ الإجابات الصح
  const correct = [
    ["carnival", "twisty", "merry-go-round", "crazy", ""],
    ["couple", "(a) few", "", "", ""],
    ["trims", "still", "beg", "giraffe", ""],
  ];

  const normalize = (text) =>
    text
      .normalize("NFKC")
      .toLowerCase()
      .replace(/\(a\)/g, "a")
      .replace(/[()]/g, "")
      .replace(/[‘’']/g, "")
      .replace(/[.,!?;:…“”"–—-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  const handleChange = (col, row, val) => {
    if (locked || result[col]?.[row] === true) return;
    setAnswers((previous) =>
      previous.map((column, ci) =>
        ci === col
          ? column.map((value, ri) => (ri === row ? val : value))
          : column,
      ),
    );
    setResult((previous) =>
      previous.map((column, ci) =>
        ci === col
          ? column.map((value, ri) => (ri === row ? undefined : value))
          : column,
      ),
    );
  };

  const handleCheck = () => {
    if (locked) return;
    audio.stop();
    if (answers.some((column) => column.every((cell) => !cell.trim()))) {
      const message = "Write at least one word in each group.";
      setAnnouncement(message);
      ValidationAlert.info(message);
      return;
    }
    let correctCount = 0;
    const res = answers.map((column, ci) => {
      const allowed = correct[ci].filter(Boolean).map(normalize);
      const used = new Set(
        column.filter((_, ri) => result[ci]?.[ri] === true).map(normalize),
      );
      return column.map((value, ri) => {
        if (result[ci]?.[ri] === true) {
          correctCount++;
          return true;
        }
        const word = normalize(value);
        if (!word) return undefined;
        const ok = allowed.includes(word) && !used.has(word);
        if (ok) {
          used.add(word);
          correctCount++;
        }
        return ok;
      });
    });
    setResult(res);
    const total = 10;
    const complete =
      correctCount === total && !res.some((column) => column.includes(false));
    const message = "Score: " + correctCount + " / " + total;
    setAnnouncement(
      message +
        (complete
          ? ". All groups are correct and locked."
          : ". Correct words are locked. You can correct the other entries; use each word once."),
    );
    if (complete) {
      resetButtonRef.current?.focus({ preventScroll: true });
      setLocked(true);
      ValidationAlert.success(message);
    } else if (correctCount === 0) ValidationAlert.error(message);
    else ValidationAlert.warning(message);
  };
  // 👀 SHOW
  const handleShow = () => {
    if (locked) return;
    audio.stop();
    setAnswers(correct.map((column) => [...column]));
    setResult(
      correct.map((column) => column.map((word) => (word ? true : undefined))),
    );
    setLocked(true);
    setAnnouncement(
      "Correct groups shown and locked. Empty extra lines do not require an answer.",
    );
  };

  // 🔄 RESET
  const handleReset = () => {
    audio.stop();
    setAnswers(Array.from({ length: 3 }, () => Array(5).fill("")));
    setResult([]);
    setLocked(false);
    setAnnouncement("All words, results and locks cleared.");
  };

  // 🎯 input line
  const input = (col, row) => (
    <div style={{ position: "relative", marginBottom: "20px" }}>
      <input
        {...fieldKeys}
        aria-label={`${groupLabels[col]}, entry ${row + 1}`}
        title={`${groupLabels[col]}, entry ${row + 1}. Write a vocabulary word for this group; extra lines may remain empty.`}
        placeholder="Vocabulary word"
        aria-describedby={`review2-page1-q1-group-${col}`}
        aria-invalid={result[col]?.[row] === false}
        value={answers[col][row]}
        onChange={(e) => handleChange(col, row, e.target.value)}
        disabled={locked || result[col]?.[row] === true}
        style={{
          width: "100%",
          borderBottom:
            result[col]?.[row] === true
              ? "1px solid #16a34a"
              : result[col]?.[row] === false
                ? "1px solid red"
                : "1px solid black",
          outline: "none",
          fontSize: "18px",
          color: "#6D2980",
          fontWeight: "bold",
          background: "transparent",
        }}
      />

      {result[col]?.[row] === false && (
        <span
          style={{
            position: "absolute",
            top: "2px",
            right: "-8px",
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
    </div>
  );

  return (
    <div
      data-exercise-scope="Review2_Page1_Q1.jsx"
      style={{ padding: "30px", display: "flex", justifyContent: "center" }}
    >
      <AudioFeedback audio={audio} />
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <style>{`[data-exercise-scope="Review2_Page1_Q1.jsx"] input:focus-visible,[data-exercise-scope="Review2_Page1_Q1.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>

      <div className="div-forall" style={{gap:"50px"}}>
        <ExerciseHeader
          isReview
          sectionLetter="A"
          title="Put the vocabulary words in the correct group."
          subTitle="Sort one word at a time by meaning, and recheck each group before submitting your answer."
        />

        {/* الأعمدة */}
        <div style={{ display: "flex", gap: "20px" }}>
          {/* column 1 */}
          <div style={boxStyle}>
            <div id="review2-page1-q1-group-0" style={titleStyle}>
              <AudioText
                audio={audio}
                id="category-0"
                src={[clip0, clip1, clip2][0]}
                label={"Hear category: " + groupLabels[0]}
              >
                {groupLabels[0]}
              </AudioText>
            </div>
            {answers[0].map((_, i) => input(0, i))}
          </div>

          {/* column 2 */}
          <div style={boxStyle}>
            <div id="review2-page1-q1-group-1" style={titleStyle}>
              <AudioText
                audio={audio}
                id="category-1"
                src={[clip0, clip1, clip2][1]}
                label={"Hear category: " + groupLabels[1]}
              >
                {groupLabels[1]}
              </AudioText>
            </div>
            {answers[1].map((_, i) => input(1, i))}
          </div>

          {/* column 3 */}
          <div style={boxStyle}>
            <div id="review2-page1-q1-group-2" style={titleStyle}>
              <AudioText
                audio={audio}
                id="category-2"
                src={[clip0, clip1, clip2][2]}
                label={"Hear category: " + groupLabels[2]}
              >
                {groupLabels[2]}
              </AudioText>
            </div>
            {answers[2].map((_, i) => input(2, i))}
          </div>
        </div>

        {/* buttons */}
        <div className="action-buttons-container">
          <button
            type="button"
            {...activationKeys}
            aria-label="Start Again"
            ref={resetButtonRef}
            className="try-again-button"
            onClick={handleReset}
          >
            Start Again ↻
          </button>

          <button
            type="button"
            {...activationKeys}
            aria-label="Show Answer"
            onClick={handleShow}
            className="show-answer-btn"
          >
            Show Answer
          </button>

          <button
            type="button"
            {...activationKeys}
            aria-label="Check Answer"
            disabled={locked}
            style={{ cursor: locked ? "not-allowed" : "pointer" }}
            className="check-button2"
            onClick={handleCheck}
          >
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

// 🎨 styles
const boxStyle = {
  flex: 1,
  border: "2px solid #6d2980",
  borderRadius: "12px",
  padding: "15px",
  minHeight: "250px",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "20px",
  fontSize: "18px",
};

export default Review2_Page1_Q1;
