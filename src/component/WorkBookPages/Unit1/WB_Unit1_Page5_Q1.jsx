import clip0 from "../../../assets/audio/Workbook/Unit 1/Page 5 - E/Item_001_ac_u_ly.mp3";
import clip1 from "../../../assets/audio/Workbook/Unit 1/Page 5 - E/Item_002_ot_b_k.mp3";
import clip2 from "../../../assets/audio/Workbook/Unit 1/Page 5 - E/Item_003_ta_vi_g.mp3";
import clip3 from "../../../assets/audio/Workbook/Unit 1/Page 5 - E/Item_004_p_l_w.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import { AudioFeedback } from "../../StudentPages/unit5/ExerciseAudioText";
import { SentenceGroup } from "../../StudentPages/unit5/SentenceAudio";
import React, { useRef, useState } from "react";

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

const WB_Unit1_Page5_Q1 = () => {
  const letterKey = (event, row, col) => {
    if (event.key === "Tab") return;
    const move = (r, c) => {
      const node = inputsRef.current[`${r}-${c}`];
      if (node && !node.disabled) {
        node.focus({ preventScroll: true });
        node.select();
      }
    };
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      if (!event.repeat) move(row, col + 1);
      return;
    }
    if (
      ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)
    ) {
      event.preventDefault();
      event.stopPropagation();
      if (event.key === "ArrowLeft") move(row, col - 1);
      if (event.key === "ArrowRight") move(row, col + 1);
      if (event.key === "ArrowUp" && row > 0)
        move(row - 1, Math.min(col, questions[row - 1].length - 1));
      if (event.key === "ArrowDown" && row + 1 < questions.length)
        move(row + 1, Math.min(col, questions[row + 1].length - 1));
    }
    if (event.key === "Backspace" && !answers[row][col]) {
      event.preventDefault();
      event.stopPropagation();
      move(row, col - 1);
    }
    if (event.key === "Delete" || event.key === "Backspace")
      event.stopPropagation();
  };
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const inputsRef = useRef({});
  const questions = [
    ["t", "a", "l"],
    ["n", "e", "o", "o"],
    ["s", "r", "n"],
    ["i", "l", "o"],
  ];

  const [answers, setAnswers] = useState([
    ["", "", ""],
    ["", "", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const handleChange = (wordIndex, letterIndex, value) => {
    if (locked || result[`${wordIndex}-${letterIndex}`] === true) return;
    const char = value.slice(-1);
    if (char && !/^[a-z]$/i.test(char)) return;
    setAnswers((previous) =>
      previous.map((row, r) =>
        r === wordIndex
          ? row.map((v, c) => (c === letterIndex ? char : v))
          : row,
      ),
    );
    setResult((previous) => ({
      ...previous,
      [`${wordIndex}-${letterIndex}`]: undefined,
    }));
    if (char) {
      const next = inputsRef.current[`${wordIndex}-${letterIndex + 1}`];
      if (next && !next.disabled) {
        next.focus();
        next.select();
      }
    }
  };

  const checkAnswers = () => {
    if (locked) return;
    audio.stop();

    const hasEmpty = answers.some((group) =>
      group.some((letter) => !letter.trim()),
    );

    if (hasEmpty) {
      (setAnnouncement(
        String("Please complete all answers.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Please complete all answers."));

      return;
    }

    let correctCount = 0;

    const newResults = {};

    answers.forEach((group, wordIndex) => {
      group.forEach((letter, letterIndex) => {
        const ok =
          letter.toLowerCase() ===
          questions[wordIndex][letterIndex].toLowerCase();

        newResults[`${wordIndex}-${letterIndex}`] = ok;

        if (ok) correctCount++;
      });
    });

    setResult(newResults);

    const total = questions.flat().length;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:18px;text-align:center;">
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

  const showAnswers = () => {
    audio.stop();
    setAnnouncement("Model answers shown and locked.");
    resetButtonRef.current?.focus({ preventScroll: true });
    setAnswers([
      ["t", "a", "l"],
      ["n", "e", "o", "o"],
      ["s", "r", "n"],
      ["i", "l", "o"],
    ]);

    const solved = {};

    questions.forEach((group, wordIndex) => {
      group.forEach((_, letterIndex) => {
        solved[`${wordIndex}-${letterIndex}`] = true;
      });
    });

    setResult(solved);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers([
      ["", "", ""],
      ["", "", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);

    setResult([]);

    setLocked(false);
  };

  const letterBox = (wordIndex, letterIndex) => (
    <span className="relative inline-block">
      <input
        style={{
          ...(result[`${wordIndex}-${letterIndex}`] === true
            ? { borderBottomColor: "#16a34a" }
            : {}),
        }}
        aria-invalid={result[`${wordIndex}-${letterIndex}`] === false}
        title={`Word ${wordIndex + 1}, missing letter ${letterIndex + 1} of ${questions[wordIndex].length}`}
        aria-label={`Word ${wordIndex + 1}, missing letter ${letterIndex + 1} of ${questions[wordIndex].length}`}
        {...fieldKeys}
        type="text"
        ref={(el) => (inputsRef.current[`${wordIndex}-${letterIndex}`] = el)}
        maxLength={1}
        onFocus={(e) => e.target.select()}
        value={answers[wordIndex][letterIndex]}
        disabled={locked || result[`${wordIndex}-${letterIndex}`] === true}
        onChange={(e) => handleChange(wordIndex, letterIndex, e.target.value)}
        className={`
          w-6
          border-0
          border-b
          outline-none
          bg-transparent
          text-center
          text-[20px]
          text-[#6d2980]
          font-semibold

          ${
            result[`${wordIndex}-${letterIndex}`] === false
              ? "border-[#D1232A]"
              : "border-black"
          }
        `}
        onKeyDown={(event) => letterKey(event, wordIndex, letterIndex)}
      />

      {result[`${wordIndex}-${letterIndex}`] === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
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
      )}
    </span>
  );

  return (
    <div
      data-exercise-scope={"WB_Unit1_Page5_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit1_Page5_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit1_Page5_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit1_Page5_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall " style={{gap:"50px"}}>
        {/* TITLE */}
        <ExerciseHeader
          subTitle="Say the whole word quietly, use the clue to identify the missing letters, then reread the completed spelling."
          isWorkbook
          sectionLetter="E"
          title={<>Write the missing letters.</>}
        />

        {/* QUESTIONS */}
        <div className="flex flex-col gap-15 text-[20px]">
          {/* 1 */}
          <SentenceGroup
            label={"Hear incomplete word 1"}
            src={clip0}
            id={"spelling-0"}
            audio={audio}
            className="flex items-center gap-2 flex-wrap"
          >
            <span className="font-bold mr-3">1</span>

            <span>a c</span>

            {letterBox(0, 0)}

            <span>u</span>

            {letterBox(0, 1)}

            {letterBox(0, 2)}

            <span>l y</span>
          </SentenceGroup>

          {/* 2 */}
          <SentenceGroup
            label={"Hear incomplete word 2"}
            src={clip1}
            id={"spelling-1"}
            audio={audio}
            className="flex items-center gap-2 flex-wrap"
          >
            <span className="font-bold mr-3">2</span>

            {letterBox(1, 0)}

            <span>o t</span>

            {letterBox(1, 1)}

            <span>b</span>

            {letterBox(1, 2)}
            {letterBox(1, 3)}
            <span>k</span>
          </SentenceGroup>

          {/* 3 */}
          <SentenceGroup
            label={"Hear incomplete word 3"}
            src={clip2}
            id={"spelling-2"}
            audio={audio}
            className="flex items-center gap-2 flex-wrap"
          >
            <span className="font-bold mr-3">3</span>

            {letterBox(2, 0)}

            <span>t a</span>

            {letterBox(2, 1)}

            <span>v i</span>

            {letterBox(2, 2)}

            <span>g</span>
          </SentenceGroup>

          {/* 4 */}
          <SentenceGroup
            label={"Hear incomplete word 4"}
            src={clip3}
            id={"spelling-3"}
            audio={audio}
            className="flex items-center gap-2 flex-wrap"
          >
            <span className="font-bold mr-3">4</span>

            <span>p</span>

            {letterBox(3, 0)}

            {letterBox(3, 1)}
            <span>l</span>

            {letterBox(3, 2)}
            <span>w</span>
          </SentenceGroup>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container">
        <button
          {...activationKeys}
          ref={resetButtonRef}
          aria-label={"Start Again"}
          type={"button"}
          className="try-again-button"
          onClick={handleReset}
        >
          Start Again ↻
        </button>

        <button
          {...activationKeys}
          aria-label={"Show Answer"}
          type={"button"}
          className="show-answer-btn"
          onClick={showAnswers}
        >
          Show Answer
        </button>

        <button
          style={{ cursor: locked ? "not-allowed" : "pointer" }}
          {...activationKeys}
          disabled={locked}
          aria-label={"Check Answer"}
          type={"button"}
          className="check-button2"
          onClick={checkAnswers}
        >
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default WB_Unit1_Page5_Q1;
