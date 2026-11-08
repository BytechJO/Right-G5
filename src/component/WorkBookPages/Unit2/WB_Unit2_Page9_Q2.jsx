import soundB8 from "../../../assets/audio/Workbook/unit 2/Page 9 - B/Item_008_I_have_crazy_more_things_to_do.mp3";
import soundB7 from "../../../assets/audio/Workbook/unit 2/Page 9 - B/Item_007_I_have_a_few_more_things_to_do.mp3";
import soundB6 from "../../../assets/audio/Workbook/unit 2/Page 9 - B/Item_006_I_first_thing_have_my_old_toys.mp3";
import soundB5 from "../../../assets/audio/Workbook/unit 2/Page 9 - B/Item_005_I_still_have_my_old_toys.mp3";
import soundB4 from "../../../assets/audio/Workbook/unit 2/Page 9 - B/Item_004_Her_new_schedule_begs_very_fine_with_us.mp3";
import soundB3 from "../../../assets/audio/Workbook/unit 2/Page 9 - B/Item_003_Her_new_schedule_works_out_very_fine_with_us.mp3";
import soundB2 from "../../../assets/audio/Workbook/unit 2/Page 9 - B/Item_002_He_always_trims_to_watch_us_while_we_play.mp3";
import soundB1 from "../../../assets/audio/Workbook/unit 2/Page 9 - B/Item_001_He_always_stays_behind_and_watches_us_while_we_play.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
} from "../../StudentPages/unit5/ExerciseAudioText";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import trueImg from "../../../assets/imgs/true.svg";
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
const WB_Unit2_Page9_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");
  const questions = [
    {
      correct: 0,
      sentences: [
        "He always stays behind and watches us while we play.",
        "He always trims to watch us while we play.",
      ],
    },
    {
      correct: 0,
      sentences: [
        "Her new schedule works out very fine with us.",
        "Her new schedule begs very fine with us.",
      ],
    },
    {
      correct: 0,
      sentences: [
        "I still have my old toys.",
        "I first thing have my old toys.",
      ],
    },
    {
      correct: 0,
      sentences: [
        "I have a few more things to do.",
        "I have crazy more things to do.",
      ],
    },
  ];
  const [answers, setAnswers] = useState([null, null, null, null]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);
  const handleSelect = (questionIndex, sentenceIndex) => {
    if (locked || result[questionIndex] === true) return;
    setAnnouncement(
      `Item ${questionIndex + 1}: ${questions[questionIndex].sentences[sentenceIndex]} selected.`,
    );
    const updated = [...answers];
    updated[questionIndex] = sentenceIndex;
    setAnswers(updated);
    setResult((prev) => {
      const copy = [...prev];
      copy[questionIndex] = undefined;
      return copy;
    });
  };
  const checkAnswers = () => {
    if (locked) return;
    audio.stop();
    const hasEmpty = answers.some((a) => a === null);
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
    const newResults = answers.map((answer, i) => {
      const ok = answer === questions[i].correct;
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
    setAnswers([0, 0, 0, 0]);
    setResult([true, true, true, true]);
    setLocked(true);
  };
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers([null, null, null, null]);
    setResult([]);
    setLocked(false);
  };
  const trueBox = (questionIndex, sentenceIndex) => (
    <button
      aria-pressed={answers[questionIndex] === sentenceIndex}
      aria-label={`Item ${questionIndex + 1}: ${questions[questionIndex].sentences[sentenceIndex]}`}
      data-choice={true}
      {...activationKeys}
      type="button"
      disabled={locked || result[questionIndex] === true}
      onClick={() => handleSelect(questionIndex, sentenceIndex)}
      className="flex items-center justify-center"
      style={{
        width: "34px",
        height: "34px",
        border: "2px solid #6D2980",
        borderRadius: "6px",
        background: "transparent",
        cursor:
          locked || result[questionIndex] === true ? "default" : "pointer",
        backgroundColor:
          answers[questionIndex] === sentenceIndex ? "#dbeafe" : undefined,
        borderColor:
          answers[questionIndex] === sentenceIndex &&
          result[questionIndex] !== undefined
            ? result[questionIndex]
              ? "#16a34a"
              : "#D1232A"
            : undefined,
      }}
    >
      {answers[questionIndex] === sentenceIndex && (
        <img
          aria-hidden={true}
          src={trueImg}
          alt={""}
          style={{
            width: "24px",
            height: "24px",
          }}
        />
      )}
    </button>
  );
  const errorBadge = () => (
    <span
      style={{
        position: "absolute",
        top: "26px",
        right: "-20px",
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
  );
  return (
    <div
      data-exercise-scope={"WB_Unit2_Page9_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit2_Page9_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit2_Page9_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit2_Page9_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
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
          isWorkbook
          sectionLetter="B"
          title={
            <>
              Read and write{" "}
              <span className="font-bold text-[#D1252B]"> ✓</span>.
            </>
          }
          subTitle="Check the picture or text evidence carefully, then choose the two-way answer only after confirming the key detail."
        />

        {/* QUESTIONS */}
        <div className="flex flex-col gap-8 text-[18px]">
          {questions.map((question, i) => (
            <div key={i} className="flex justify-between gap-6">
              <div className="flex gap-3">
                <span className="font-bold">{i + 1}</span>

                <div>
                  <p>
                    <AudioText
                      audio={audio}
                      id={`sentence-${i}-0`}
                      src={
                        [
                          soundB1,
                          soundB2,
                          soundB3,
                          soundB4,
                          soundB5,
                          soundB6,
                          soundB7,
                          soundB8,
                        ][i * 2 + 0]
                      }
                      label={`Hear ${question.sentences[0]}`}
                    >
                      {question.sentences[0]}
                    </AudioText>
                  </p>

                  <p>
                    <AudioText
                      audio={audio}
                      id={`sentence-${i}-1`}
                      src={
                        [
                          soundB1,
                          soundB2,
                          soundB3,
                          soundB4,
                          soundB5,
                          soundB6,
                          soundB7,
                          soundB8,
                        ][i * 2 + 1]
                      }
                      label={`Hear ${question.sentences[1]}`}
                    >
                      {question.sentences[1]}
                    </AudioText>
                  </p>
                </div>
              </div>

              <div className="relative flex flex-col gap-2">
                {trueBox(i, 0)}

                {trueBox(i, 1)}

                {result[i] === false && errorBadge()}
              </div>
            </div>
          ))}
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
export default WB_Unit2_Page9_Q2;
