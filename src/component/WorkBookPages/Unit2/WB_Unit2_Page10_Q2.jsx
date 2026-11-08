import soundD6 from "../../../assets/audio/Workbook/unit 2/Page 10 - D/Item_006_My_cat,.mp3";
import soundD5 from "../../../assets/audio/Workbook/unit 2/Page 10 - D/Item_005_,_is_so_playful.mp3";
import soundD4 from "../../../assets/audio/Workbook/unit 2/Page 10 - D/Item_004_Let's_play_the_game.mp3";
import soundD3 from "../../../assets/audio/Workbook/unit 2/Page 10 - D/Item_003_This_is_my_new_book.mp3";
import soundD2 from "../../../assets/audio/Workbook/unit 2/Page 10 - D/Item_002_Have_you_seen_my_brother.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import {
  AudioSpeaker,
  AudioFeedback,
} from "../../StudentPages/unit5/ExerciseAudioText";
import React, { useState } from "react";
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
const normalizeAnswer = (text) =>
  text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[‘’']/g, "")
    .replace(/[.,!?;:…“”"–—-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const WB_Unit2_Page10_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");
  const questions = [
    "who is wearing a white sweater",
    "which has just been published",
    "that we played yesterday",
    "which has a short tail",
  ];
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [result, setResult] = useState([]);
  const [selectedWords, setSelectedWords] = useState([null, null, null, null]);
  const [clauseResults, setClauseResults] = useState([]);
  const [circleResults, setCircleResults] = useState([]);
  const nouns = ["brother", "book", "game", "cat"];
  const [locked, setLocked] = useState(false);
  const normalize = normalizeAnswer;
  const handleChange = (i, value) => {
    if (locked || result[i] === true || clauseResults[i] === true) return;
    const updated = [...answers];
    updated[i] = value;
    setAnswers(updated);
    setClauseResults((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };
  const checkAnswers = () => {
    if (locked) return;
    audio.stop();
    const hasEmpty =
      answers.some((a) => !a.trim()) || selectedWords.some((word) => !word);
    if (hasEmpty) {
      (setAnnouncement(
        String(
          "Please complete each relative clause and circle the noun it describes.",
        )
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info(
          "Please complete each relative clause and circle the noun it describes.",
        ));
      return;
    }
    let correctCount = 0;
    const nextClauses = answers.map(
      (a, i) =>
        clauseResults[i] === true || normalize(a) === normalize(questions[i]),
    );
    const nextCircles = selectedWords.map(
      (word, i) =>
        circleResults[i] === true || normalize(word?.word || "") === nouns[i],
    );
    setClauseResults(nextClauses);
    setCircleResults(nextCircles);
    const newResults = answers.map((_, i) => {
      const ok = nextClauses[i] && nextCircles[i];
      if (ok) correctCount++;
      return ok;
    });
    setResult(newResults);
    const total = questions.length;
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
      resetButtonRef.current?.focus({
        preventScroll: true,
      });
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
    resetButtonRef.current?.focus({
      preventScroll: true,
    });
    setAnswers([
      "who is wearing a white sweater",
      "which has just been published",
      "that we played yesterday",
      "which has a short tail",
    ]);
    setSelectedWords(
      nouns.map((word, i) => ({
        word,
        id: `fragment-${i}-${[4, 4, 3, 1][i]}`,
      })),
    );
    setClauseResults([true, true, true, true]);
    setCircleResults([true, true, true, true]);
    setResult([true, true, true, true]);
    setLocked(true);
  };
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", ""]);
    setSelectedWords([null, null, null, null]);
    setClauseResults([]);
    setCircleResults([]);
    setResult([]);
    setLocked(false);
  };
  const chooseWord = (i, word, id) => {
    if (locked || result[i] === true || circleResults[i] === true) return;
    const next =
      selectedWords[i]?.id === id
        ? null
        : {
            word,
            id,
          };
    setSelectedWords((previous) =>
      previous.map((value, index) => (index === i ? next : value)),
    );
    setCircleResults((previous) => {
      const nextResults = [...previous];
      nextResults[i] = undefined;
      return nextResults;
    });
    setResult((previous) => {
      const nextResults = [...previous];
      nextResults[i] = undefined;
      return nextResults;
    });
    setAnnouncement(
      next
        ? "Sentence " + (i + 1) + ": " + word + " circled."
        : "Circle removed from sentence " + (i + 1) + ".",
    );
  };
  
  const renderSentence = (i, text, id, src) => {
    const includesNumber = id === `fragment-${i}`;
    const playing = audio.activeId === id;
    const source = includesNumber && i === 3 ? [soundD6, soundD5] : src;
    const hear = (event) => {
      if (
        event.target !== event.currentTarget ||
        (event.key !== "Enter" && event.key !== " ")
      )
        return;
      event.preventDefault();
      event.stopPropagation();
      if (event.type === "keydown" && !event.repeat) audio.play(id, source);
    };
    return (
      <span
        role="group"
        aria-roledescription="sentence audio"
        aria-label={"Hear " + (includesNumber ? `sentence ${i + 1}: ` : "") + text}
        tabIndex={0}
        data-choice
        data-sentence-audio={id}
        onKeyDown={hear}
        onKeyUp={hear}
        onClick={(event) => {
          if (event.target.closest("button")) return;
          event.stopPropagation();
          audio.play(id, source);
        }}
        style={{
          position: "relative",
          borderRadius: 6,
          boxShadow: playing ? "0 0 0 3px #2563eb" : undefined,
          backgroundColor: playing ? "#dbeafe" : undefined,
        }}
      >
        {includesNumber && <span aria-hidden="true" className="font-bold" style={{ marginRight: 8 }}>{i + 1}</span>}
        {text.split(/(\s+)/).map((word, index) => {
          if (/^\s+$/.test(word) || !/[a-z]/i.test(word)) return word;
          const wordId = id + "-" + Math.floor(index / 2);
          const selected = selectedWords[i]?.id === wordId;
          const feedback = circleResults[i];
          return (
            <button
              key={wordId}
              type="button"
              {...activationKeys}
              data-choice
              aria-label={
                "Sentence " +
                (i + 1) +
                ": circle " +
                word +
                (selected && feedback === true
                  ? ". Correct and locked."
                  : selected && feedback === false
                    ? ". Not correct. Choose another word."
                    : "")
              }
              aria-pressed={selected}
              disabled={locked || feedback === true}
              onClick={(event) => {
                event.stopPropagation();
                chooseWord(i, word, wordId);
              }}
              style={{
                position: "relative",
                display: "inline",
                padding: 0,
                margin: 0,
                border: "none",
                background: selected ? "#dbeafe" : "transparent",
                font: "inherit",
                color: "inherit",
                lineHeight: "inherit",
                cursor: locked || feedback === true ? "default" : "pointer",
                borderRadius: "50%",
                "--exercise-focus-radius": "50%",
              }}
            >
              {word}
              {selected && (
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: "-4px -5px",
                    border:
                      "3px solid " +
                      (feedback === true
                        ? "#16a34a"
                        : feedback === false
                          ? "#D1232A"
                          : "#6D2980"),
                    borderRadius: "50%",
                    pointerEvents: "none",
                  }}
                />
              )}
            </button>
          );
        })}
        {playing && <AudioSpeaker />}
      </span>
    );
  };
  const inputField = (i, width = "w-full") => (
    <div className="relative inline-block flex-1">
      <input
        style={{
          borderBottomColor: clauseResults[i] === true ? "#16a34a" : undefined,
        }}
        aria-invalid={clauseResults[i] === false}
        placeholder={"Relative clause"}
        title={
          [
            "Have you seen my brother ___?",
            "This is my new book ___.",
            "Let us play the game ___.",
            "My cat, ___, is so playful.",
          ][i]
        }
        aria-label={
          [
            "Have you seen my brother ___?",
            "This is my new book ___.",
            "Let us play the game ___.",
            "My cat, ___, is so playful.",
          ][i]
        }
        {...fieldKeys}
        type="text"
        value={answers[i]}
        disabled={locked || clauseResults[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          ${width}
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6D2980]
          font-semibold
          px-1

          ${clauseResults[i] === false ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {clauseResults[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            width: "20px",
            height: "20px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
          }}
        >
          ✕
        </span>
      )}
    </div>
  );
  return (
    <div
      data-exercise-scope={"WB_Unit2_Page10_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit2_Page10_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit2_Page10_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit2_Page10_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall">
        {/* TITLE */}
        <ExerciseHeader
          isWorkbook
          sectionLetter="D"
          title={
            <>
              Read and complete the sentences. Add a relative clause to each
              sentence then circle the noun it tells about.
            </>
          }
          subTitle="Build the relative clause so it clearly describes the correct noun, then circle that noun before checking."
        />

        {/* QUESTIONS */}

        <div className="flex flex-col gap-10  text-[18px] mt-[10vh]">
          {/* 1 */}
          <div className="flex items-center gap-4">
            <span>
              {renderSentence(
                0,
                "Have you seen my brother",
                "fragment-0",
                soundD2,
              )}
            </span>

            {inputField(0)}

            <span>?</span>
          </div>

          {/* 2 */}
          <div className="flex items-center gap-4">
            <span>
              {renderSentence(1, "This is my new book", "fragment-1", soundD3)}
            </span>

            {inputField(1)}

            <span>.</span>
          </div>

          {/* 3 */}
          <div className="flex items-center gap-4">
            <span>
              {renderSentence(2, "Let’s play the game", "fragment-2", soundD4)}
            </span>

            {inputField(2)}

            <span>.</span>
          </div>

          {/* 4 */}
          <div className="flex items-center gap-4">
            <span>{renderSentence(3, "My cat,", "fragment-3", soundD6)}</span>

            {inputField(3)}

            <span>
              {renderSentence(3, ", is so playful.", "fragment-4", soundD5)}
            </span>
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
          className="check-button2"
          onClick={checkAnswers}
        >
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};
export default WB_Unit2_Page10_Q2;
