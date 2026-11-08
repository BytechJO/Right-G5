import { SentenceGroup } from "./SentenceAudio";
import clip0 from "../../../assets/audio/ClassBook/U2/Page 15 - E/Item_001_Mary_and_Paula,_which_are_swimming_next_week,_will_practice_every_day_th.mp3";
import clip1 from "../../../assets/audio/ClassBook/U2/Page 15 - E/Item_002_William_is_fixing_the_car_who_is_broken_and_needs_more_oil.mp3";
import clip2 from "../../../assets/audio/ClassBook/U2/Page 15 - E/Item_003_Sandy_gave_her_friend_a_gift_who_she_bought_in_France.mp3";
import clip3 from "../../../assets/audio/ClassBook/U2/Page 15 - E/Item_004_Mark_and_I,_which_will_go_to_the_carnival_tomorrow,_want_to_see_the_anim.mp3";
import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import ExerciseHeader from "../../ExerciseHeader";
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
const normalizeAnswer = (text) =>
  text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[‘’']/g, "")
    .replace(/[.,!?;:…“”"–—-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const Unit2_Page6_Q3 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const sentences = [
    [
      "Mary",
      "and",
      "Paula,",
      "which",
      "are",
      "swimming",
      "next",
      "week,",
      "will",
      "practice",
      "every",
      "day",
      "this",
      "week.",
    ],
    [
      "William",
      "is",
      "fixing",
      "the",
      "car",
      "who",
      "is",
      "broken",
      "and",
      "needs",
      "more",
      "oil.",
    ],
    [
      "Sandy",
      "gave",
      "her",
      "friend",
      "a",
      "gift",
      "who",
      "she",
      "bought",
      "in",
      "France.",
    ],
    [
      "Mark",
      "and",
      "I,",
      "which",
      "will",
      "go",
      "to",
      "the",
      "carnival",
      "tomorrow,",
      "want",
      "to",
      "see",
      "the",
      "animal",
      "show.",
    ],
  ];

  const correctWordIndex = [3, 5, 6, 3];
  const correctAnswer = ["who", "which", "which", "who"];

  const [selected, setSelected] = useState([null, null, null, null]);
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  // 🔵 اختيار الكلمة
  const handleSelect = (i, wi) => {
    
    if (locked) return;
    if (locked || result[i]?.word === true) return;

    setAnnouncement(`Question ${i + 1}: ${sentences[i][wi]} selected.`);
    const updated = [...selected];
    updated[i] = wi;
    setSelected(updated);

    // 🔥 أهم سطر
    setResult((prev) => {
      const copy = [...prev];
      if (copy[i]) copy[i] = { ...copy[i], word: undefined }; // يمسح ❌
      return copy;
    });
  };
  // ✍️ كتابة الجواب
  const handleChange = (i, val) => {
    if (locked) return;
    if (result[i]?.answer === true) return;

    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];
      if (copy[i]) copy[i] = { ...copy[i], answer: undefined };
      return copy;
    });
  };

  // 👀 SHOW
  const handleShow = () => {
    audio.stop();
    setAnnouncement("Correct answers shown and locked.");
    setSelected(correctWordIndex);
    setAnswers(correctAnswer);
    setResult(correctAnswer.map(() => ({ word: true, answer: true })));
    setLocked(true);
  };

  // ✅ CHECK
  const handleCheck = () => {
    if (locked) return;
    audio.stop();
    setAnnouncement(
      "Answers checked. Correct selections and responses stay locked; incorrect parts can be changed.",
    );

    if (answers.some((a) => !a.trim()) || selected.includes(null)) {
      setAnnouncement("Select and complete all.");
      ValidationAlert.info("Select and complete all.");
      return;
    }

    const normalize = normalizeAnswer;

    let correctCount = 0;

    const res = answers.map((a, i) => {
      const wordCorrect = selected[i] === correctWordIndex[i];
      const answerCorrect = normalize(a) === normalize(correctAnswer[i]);

      if (wordCorrect) correctCount++;
      if (answerCorrect) correctCount++;

      return {
        word: wordCorrect,
        answer: answerCorrect,
      };
    });

    setResult(res);

    const total = correctAnswer.length * 2;

    if (correctCount === total) {
      setLocked(true);
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(`Score: ${correctCount} / ${total}`);
    } else {
      ValidationAlert.warning(`Score: ${correctCount} / ${total}`);
    }
  };

  // 🔄 RESET
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Selections, answers and feedback cleared.");
    setSelected([null, null, null, null]);
    setAnswers(["", "", "", ""]);
    setResult([]);
    setLocked(false);
  };

  return (
    <div
      data-exercise-scope="Unit2_Page6_Q3.jsx"
      className="p-8 flex flex-col items-center"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit2_Page6_Q3.jsx"] input:focus-visible,[data-exercise-scope="Unit2_Page6_Q3.jsx"] textarea:focus-visible,[data-exercise-scope="Unit2_Page6_Q3.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="E"
          title={<>Circle the wrong word and write the correct one</>}
          subTitle="Find the relative-pronoun word that does not fit, select it, then write the correct replacement."
        />

        {sentences.map((sentence, i) => (
          <div key={i} className="space-y-1 text-[18px] leading-9 mt-7">
            {/* الجملة */}
            <SentenceGroup audio={audio} id={`sentence-${i}`} src={[clip0,clip1,clip2,clip3][i]} label={`Hear the sentence: ${sentence.join(" ")}`} className="flex flex-wrap ">
              <span className="font-bold mr-2">{i + 1}</span>

              {sentence.map((word, wi) => (
                <span
                  style={{
                    borderRadius: 20,
                    boxShadow:
                      selected[i] === wi
                        ? result[i]?.word === true || locked
                          ? "0 0 0 2px #16a34a"
                          : result[i]?.word === false
                            ? "0 0 0 2px #ef4444"
                            : "0 0 0 2px #2563eb"
                        : undefined,
                    backgroundColor: selected[i] === wi ? "#dbeafe" : undefined,
                    outline:
                      audio.activeId === `word-${i}-${wi}`
                        ? "3px solid #2563eb"
                        : undefined,
                    outlineOffset: 2,
                    borderColor:
                      selected[i] === wi && (locked || result[i]?.word === true)
                        ? "#16a34a"
                        : selected[i] === wi && result[i]?.word === false
                          ? "#ef4444"
                          : undefined,
                  }}
                  role="button"
                  tabIndex={0}
                  data-choice
                  {...activationKeys}
                  aria-label={`Question ${i + 1}, ${word}`}
                  aria-pressed={selected[i] === wi}
                  aria-disabled={locked || result[i]?.word === true}
                  key={wi}
                  onClick={() => handleSelect(i, wi)}
                  className={`px-1 rounded-full relative
                    ${result[i]?.word === true ? "cursor-default" : "cursor-pointer"}
                    ${selected[i] === wi ? "border-2 border-blue-500" : ""}
                  `}
                >
                  {word}
                  

                  {/* ❌ على الكلمة */}
                  {result[i]?.word === false && selected[i] === wi && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-8px",
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
                </span>
              ))}
            </SentenceGroup>

            {/* input */}
            <div className="relative">
              <input placeholder="New word"
                style={{
                  borderBottom:
                    locked || result[i]?.answer === true
                      ? "2px solid #16a34a"
                      : result[i]?.answer === false
                        ? "2px solid #ef4444"
                        : undefined,
                }}
                {...fieldKeys}
                aria-label={`Question ${i + 1}, replacement for the incorrect relative pronoun in: ${sentences[i].join(" ")}`}
                title={`Question ${i + 1}, replacement for the incorrect relative pronoun in: ${sentences[i].join(" ")}`}
                value={answers[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                disabled={locked || result[i]?.answer === true}
                className={`border-b-1 w-[150px] outline-none text-[#6D2980] font-bold
                  ${result[i]?.answer === false ? "border-red-500" : "border-black"}
                `}
              />

              {/* ❌ على الانبوت */}
              {result[i]?.answer === false && (
                <span
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "-10px",
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
          </div>
        ))}

        {/* buttons */}
        <div className="action-buttons-container mt-6">
          <button
            type="button"
            aria-label="Start Again"
            {...activationKeys}
            ref={resetButtonRef}
            className="try-again-button"
            onClick={handleReset}
          >
            Start Again ↻
          </button>

          <button
            type="button"
            aria-label="Show Answer"
            {...activationKeys}
            onClick={handleShow}
            className="show-answer-btn"
          >
            Show Answer
          </button>

          <button
            type="button"
            aria-label="Check Answer"
            {...activationKeys}
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

export default Unit2_Page6_Q3;
