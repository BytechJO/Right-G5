import clip0 from "../../../assets/audio/ClassBook/U10/Page 91 - D/Item_001_Larry_play_piano.mp3";
import clip1 from "../../../assets/audio/ClassBook/U10/Page 91 - D/Item_002_Elaine_beat_drums.mp3";
import clip2 from "../../../assets/audio/ClassBook/U10/Page 91 - D/Item_003_Diane_listen_to_the_music.mp3";
import clip3 from "../../../assets/audio/ClassBook/U10/Page 91 - D/Item_004_Ben_and_Jake_take_tickets.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import { AudioText, AudioFeedback } from "../unit5/ExerciseAudioText";

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

const Review10_Page2_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    "Larry was playing the piano.",
    "Elaine was beating the drums.",
    "Diane was listening to the music.",
    "Ben and Jake were taking tickets.",
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

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

    const hasEmpty = answers.some((a) => !a.trim());

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

    const newResults = answers.map((a, i) => {
      const ok = normalize(a) === normalize(questions[i]);

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
      "Larry was playing the piano.",
      "Elaine was beating the drums.",
      "Diane was listening to the music.",
      "Ben and Jake were taking tickets.",
    ]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width) => (
    <span className={`relative inline-block ${width}`}>
      <input placeholder={"Sentence"}
        style={{
          ...(result[i] === true ? { borderBottomColor: "#16a34a" } : {}),
        }}
        aria-invalid={result[i] === false}
        title={`Concert item ${i + 1}, write a sentence using the given words`}
        aria-label={`Concert item ${i + 1}, write a sentence using the given words`}
        {...fieldKeys}
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
        w-full
        border-0
        border-b
        outline-none
        bg-transparent
        text-[18px]
        text-[#6D2980]
        font-semibold
        px-1

        ${result[i] === false ? "border-[#D1232A]" : "border-black"}
      `}
      />

      {result[i] === false && (
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
    </span>
  );

  return (
    <div
      data-exercise-scope={"Review10_Page2_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review10_Page2_Q1.jsx"] input:focus-visible,[data-exercise-scope="Review10_Page2_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="Review10_Page2_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div
        className="div-forall "
        style={{
       gap:"30px"
        }}
      >
        {/* TITLE */}
        <ExerciseHeader
          isReview
          sectionLetter="D"
          title={
            <>
              What was happening during the concert? Write the sentences using
              the words given to find out. Use the past progressive
              tense.
            </>
          }
          subTitle="Use the prompt and grammar pattern to write a complete sentence, then reread it for meaning, tense, and punctuation."
        />

        {/* QUESTIONS */}
        <div className="flex flex-col gap-15 text-[18px]">
          {/* 1 */}
          <div className="flex items-center w-[700px] gap-2">
            <span className="font-bold mr-2">1</span>

            <span>
              <AudioText
                audio={audio}
                id={"audio-0"}
                src={clip0}
                label={"Hear Larry/play/piano"}
              >
                Larry/play/piano
              </AudioText>
            </span>

            <div className="flex-1">{inputField(0, "w-full")}</div>
          </div>

          {/* 2 */}
          <div className="flex items-center w-[700px] gap-2">
            <span className="font-bold mr-2">2</span>

            <span>
              <AudioText
                audio={audio}
                id={"audio-1"}
                src={clip1}
                label={"Hear Elaine/beat/drums"}
              >
                Elaine/beat/drums
              </AudioText>
            </span>

            <div className="flex-1">{inputField(1, "w-full")}</div>
          </div>

          {/* 3 */}
          <div className="flex items-center w-[700px] gap-2">
            <span className="font-bold mr-2">3</span>

            <span>
              <AudioText
                audio={audio}
                id={"audio-2"}
                src={clip2}
                label={"Hear Diane/listen/to the music"}
              >
                Diane/listen/to the music
              </AudioText>
            </span>

            <div className="flex-1">{inputField(2, "w-full")}</div>
          </div>

          {/* 4 */}
          <div className="flex items-center w-[700px] gap-2">
            <span className="font-bold mr-2">4</span>

            <span>
              <AudioText
                audio={audio}
                id={"audio-3"}
                src={clip3}
                label={"Hear Ben and Jake /take/tickets"}
              >
                Ben and Jake /take/tickets
              </AudioText>
            </span>

            <div className="flex-1">{inputField(3, "w-full")}</div>
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

export default Review10_Page2_Q1;
