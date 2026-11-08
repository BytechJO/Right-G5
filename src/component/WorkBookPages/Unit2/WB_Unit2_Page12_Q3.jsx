import soundI4 from "../../../assets/audio/Workbook/unit 2/Page 12 - I/Item_004_helped_a_poor_lady,_which_was_carrying_lots_of_groceries.mp3";
import soundI3 from "../../../assets/audio/Workbook/unit 2/Page 12 - I/Item_003_We_saw_a_statue_who_was_built_100_years_ago.mp3";
import soundI2 from "../../../assets/audio/Workbook/unit 2/Page 12 - I/Item_002_The_car,_who_is_red,_is_my_dad's_car.mp3";
import soundI1 from "../../../assets/audio/Workbook/unit 2/Page 12 - I/Item_001_Henry,_that_is_my_friend,_always_walks_with_me_to_school.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import { AudioFeedback } from "../../StudentPages/unit5/ExerciseAudioText";
import { SentenceGroup } from "../../StudentPages/unit5/SentenceAudio";
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
const WB_Unit2_Page12_Q3 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");
  const questions = [
    {
      wrong: "that",
      correct: "who",
    },
    {
      wrong: "who",
      correct: "that",
    },
    {
      wrong: "who",
      correct: "which",
    },
    {
      wrong: "which",
      correct: "who",
    },
  ];
  const sentences = [
    [
      "Henry,",
      "that",
      "is",
      "my",
      "friend,",
      "always",
      "walks",
      "with",
      "me",
      "to",
      "school.",
    ],
    ["The", "car,", "who", "is", "red,", "is", "my", "dad’s", "car."],
    ["We", "saw", "a", "statue", "who", "was", "built", "100", "years", "ago."],
    [
      "I",
      "helped",
      "a",
      "poor",
      "lady,",
      "which",
      "was",
      "carrying",
      "lots",
      "of",
      "groceries.",
    ],
  ];
  const [selectedWords, setSelectedWords] = useState([null, null, null, null]);
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);
  const normalize = normalizeAnswer;
  const handleCircle = (i, word, wordIndex) => {
    if (locked || result[i]?.overall === true) return;
    setAnnouncement(`Sentence ${i + 1}: ${word} marked.`);
    const updated = [...selectedWords];
    updated[i] = {
      word,
      wordIndex,
    };
    setSelectedWords(updated);
    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };
  const handleChange = (i, value) => {
    if (locked || result[i]?.overall === true) return;
    const updated = [...answers];
    updated[i] = value;
    setAnswers(updated);
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
      answers.some((a) => !a.trim()) || selectedWords.some((s) => !s);
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
    const newResults = questions.map((question, i) => {
      const wrongOk =
        normalize(selectedWords[i]?.word) === normalize(question.wrong);
      const correctOk = normalize(answers[i]) === normalize(question.correct);
      const ok = wrongOk && correctOk;
      if (ok) correctCount++;
      return {
        overall: ok,
        wrongCircle: !wrongOk,
        wrongInput: !correctOk,
      };
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
    setSelectedWords([
      {
        word: "that",
        wordIndex: 1,
      },
      {
        word: "who",
        wordIndex: 2,
      },
      {
        word: "who",
        wordIndex: 4,
      },
      {
        word: "which",
        wordIndex: 5,
      },
    ]);
    setAnswers(["who", "that", "which", "who"]);
    setResult(
      questions.map(() => ({
        overall: true,
        wrongCircle: false,
        wrongInput: false,
      })),
    );
    setLocked(true);
  };
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setSelectedWords(["", "", "", ""]);
    setAnswers(["", "", "", ""]);
    setResult([]);
    setLocked(false);
  };
  const inputField = (i) => (
    <div className="relative inline-block ml-3">
      <input
        style={{
          borderBottomColor:
            result[i] === true || result[i]?.overall === true
              ? "#16a34a"
              : undefined,
        }}
        placeholder={"Correct word"}
        title={
          [
            "Henry: write the replacement word.",
            "The car: write the replacement word.",
            "The statue: write the replacement word.",
            "The lady: write the replacement word.",
          ][i]
        }
        aria-label={
          [
            "Henry: write the replacement word.",
            "The car: write the replacement word.",
            "The statue: write the replacement word.",
            "The lady: write the replacement word.",
          ][i]
        }
        {...fieldKeys}
        type="text"
        value={answers[i]}
        disabled={locked || result[i]?.overall === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          w-[180px]
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6D2980]
          font-semibold
          px-1

         ${result[i]?.wrongInput ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {result[i]?.wrongInput && (
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
  const renderSentence = (sentence, qIndex) => {
    return sentence.map((word, wordIndex) => {
      const cleanedWord = word.replace(/[.,?!]/g, "");
      const isSelected = selectedWords[qIndex]?.wordIndex === wordIndex;
      const wrongCircle = result[qIndex]?.wrongCircle && isSelected;
      return (
        <button
          aria-pressed={isSelected}
          aria-label={`Sentence ${qIndex + 1}: mark ${word}`}
          data-choice={true}
          {...activationKeys}
          key={wordIndex}
          type="button"
          disabled={locked || result[qIndex]?.overall === true}
          onClick={() => handleCircle(qIndex, cleanedWord, wordIndex)}
          style={{
            position: "relative",
            background: "transparent",
            border: "none",
            padding: "0 3px",
            fontSize: "18px",
            cursor: locked || result[qIndex] === true ? "default" : "pointer",
            lineHeight: "1.8",
            // backgroundColor: isSelected ? "#dbeafe" : undefined,
            "--exercise-focus-radius": "50%",
          }}
        >
          {word}

          {isSelected && (
            <span
              style={{
                position: "absolute",
                left: "-6px",
                top: "-6px",
                width: "calc(100% + 12px)",
                height: "calc(100% + 12px)",
                border: result[qIndex]?.overall
                  ? "3px solid #16a34a"
                  : wrongCircle
                    ? "3px solid #D1232A"
                    : "3px solid #6D2980",
                borderRadius: "50%",
                pointerEvents: "none",
              }}
            />
          )}
          {wrongCircle && (
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
                zIndex: 20,
              }}
            >
              ✕
            </span>
          )}
        </button>
      );
    });
  };
  return (
    <div
      data-exercise-scope={"WB_Unit2_Page12_Q3.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit2_Page12_Q3.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit2_Page12_Q3.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit2_Page12_Q3.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall ">
        {/* TITLE */}
        <ExerciseHeader
          isWorkbook
          sectionLetter="I"
          title={
            <>
              Read, circle the wrong word, and write the correct one on the
              line.
            </>
          }
          subTitle="Locate the incorrect word or phrase first, then rewrite only what is needed and reread the whole sentence."
        />

        {/* QUESTIONS */}
        <div className="flex flex-col gap-15 text-[18px]">
          {/* 1 */}
          <SentenceGroup
            label={sentences[0].join(" ")}
            src={soundI1}
            id={"sentence-0"}
            audio={audio}
            className="flex items-center flex-wrap gap-1"
          >
            <span className="font-bold">1</span>

            {renderSentence(sentences[0], 0)}

            {inputField(0)}
          </SentenceGroup>

          {/* 2 */}
          <SentenceGroup
            label={sentences[1].join(" ")}
            src={soundI2}
            id={"sentence-1"}
            audio={audio}
            className="flex items-center flex-wrap gap-1"
          >
            <span className="font-bold">2</span>

            {renderSentence(sentences[1], 1)}

            {inputField(1)}
          </SentenceGroup>

          {/* 3 */}
          <SentenceGroup
            label={sentences[2].join(" ")}
            src={soundI3}
            id={"sentence-2"}
            audio={audio}
            className="flex items-center flex-wrap gap-1"
          >
            <span className="font-bold">3</span>

            {renderSentence(sentences[2], 2)}

            {inputField(2)}
          </SentenceGroup>

          {/* 4 */}
          <SentenceGroup
            label={sentences[3].join(" ")}
            src={soundI4}
            id={"sentence-3"}
            audio={audio}
            className="flex items-center flex-wrap gap-1"
          >
            <span className="font-bold">4</span>

            {renderSentence(sentences[3], 3)}

            {inputField(3)}
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
export default WB_Unit2_Page12_Q3;
