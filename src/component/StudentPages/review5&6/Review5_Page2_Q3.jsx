import clip0 from "../../../assets/audio/ClassBook/U6/Page 53 - F/Item_001_could.mp3";
import clip1 from "../../../assets/audio/ClassBook/U6/Page 53 - F/Item_002_would.mp3";
import clip2 from "../../../assets/audio/ClassBook/U6/Page 53 - F/Item_003_I'd_prefer_to.mp3";
import clip3 from "../../../assets/audio/ClassBook/U6/Page 53 - F/Item_004_you_like_to_go_to_the_zoo_Yes,_I_._Yes,_I.mp3";
import clip4 from "../../../assets/audio/ClassBook/U6/Page 53 - F/Item_005_go_to_the_concert._Let's_go,_you_and_I.mp3";
import clip5 from "../../../assets/audio/ClassBook/U6/Page 53 - F/Item_006_we_sing_a_song_Yes,_we_._Yes,_we_could.mp3";
import clip6 from "../../../assets/audio/ClassBook/U6/Page 53 - F/Item_007_we_bake_a_cake_Yes,_we_._Yes,_we_could.mp3";

import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
  AudioSpeaker,
} from "../unit5/ExerciseAudioText";
import { SentenceGroup, SentencePart } from "../unit5/SentenceAudio";
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

const Review5_Page2_Q3 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const answersKey = [
    "would",
    "would",
    "would",
    "I'd prefer to",
    "Could",
    "could",
    "Could",
    "could",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const handleChange = (i, val) => {
    if (locked || result[i] === true) return;

    const updated = [...answers];

    updated[i] = val;

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

    if (answers.some((a) => !a.trim())) {
      (setAnnouncement(
        String("Please complete all blanks.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Please complete all blanks."));

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((a, i) => {
      const ok = normalize(a) === normalize(answersKey[i]);

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = answers.length;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
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
    setAnswers(answersKey);

    setResult([true, true, true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const renderInput = (index) => (
    <span className="relative inline-block">
      <input placeholder={"Word"}
        aria-invalid={!!(result[index] === false)}
        title={`Poem blank ${index + 1}, use words from the box`}
        aria-label={`Poem blank ${index + 1}, use words from the box`}
        {...fieldKeys}
        type="text"
        value={answers[index]}
        disabled={locked || result[index] === true}
        onChange={(e) => handleChange(index, e.target.value)}
        style={{
          width: "140px",
          border: "none",
          borderBottom:
            result[index] === false ? "1px solid #D1232A" : "1px solid black",
          outline: "none",
          background: "transparent",
          fontSize: "18px",
          fontWeight: "600",
          color: "#6D2980",
          padding: "0",
          lineHeight: "1",
          ...(result[index] === true ? { borderBottomColor: "#16a34a" } : {}),
        }}
      />

      {result[index] === false && (
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
            fontSize: "12px",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        >
          ✕
        </span>
      )}
    </span>
  );

  return (
    <div
      data-exercise-scope={"Review5_Page2_Q3.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review5_Page2_Q3.jsx"] input:focus-visible,[data-exercise-scope="Review5_Page2_Q3.jsx"] textarea:focus-visible,[data-exercise-scope="Review5_Page2_Q3.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall" style={{gap:"30px"}}>
        {/* TITLE */}
        <ExerciseHeader
          isReview
          sectionLetter="F"
          title={
            <>
              Complete the poem. Use the words from the box. Some words can be
              used more than once.
            </>
          }
          subTitle="Read the whole sentence first, then choose the word that fits both the meaning and grammar before checking."
        />

        {/* WORD BOX */}
        <div
          style={{
            width: "420px",
            height: "52px",
            background: "#E9E1EC",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            margin: "0 auto 0px auto",
            fontSize: "22px",
            fontWeight: "500",
          }}
        >
          <AudioText
            label={"Hear could"}
            src={clip0}
            id={"bank-0"}
            audio={audio}
          >
            could
          </AudioText>

          <AudioText
            label={"Hear would"}
            src={clip1}
            id={"bank-1"}
            audio={audio}
          >
            would
          </AudioText>

          <AudioText
            label={"Hear I’d prefer to"}
            src={clip2}
            id={"bank-2"}
            audio={audio}
          >
            I’d prefer to
          </AudioText>
        </div>

        {/* POEM */}
        <div
          className="
            text-[20px]
            leading-[2.8]
          "
        >
          <SentenceGroup
            label={"Hear poem line 1"}
            src={clip3}
            id={"poem-line-0"}
            audio={audio}
            className="flex flex-wrap items-center gap-2"
          >
            {renderInput(0)}

            <span>you like to go to the zoo? Yes, I</span>

            {renderInput(1)}

            <span>. Yes, I</span>

            {renderInput(2)}

            <span>.</span>
          </SentenceGroup>

          <SentenceGroup
            label={"Hear poem line 2"}
            src={clip4}
            id={"poem-line-1"}
            audio={audio}
            className="flex flex-wrap items-center gap-2"
          >
            {renderInput(3, "180px")}

            <span>go to the concert. Let’s go, you and I.</span>
          </SentenceGroup>

          <SentenceGroup
            label={"Hear poem line 3"}
            src={clip5}
            id={"poem-line-2"}
            audio={audio}
            className="flex flex-wrap items-center gap-2"
          >
            {renderInput(4)}

            <span>we sing a song? Yes, we</span>

            {renderInput(5)}

            <span>. Yes, we could.</span>
          </SentenceGroup>

          <SentenceGroup
            label={"Hear poem line 4"}
            src={clip6}
            id={"poem-line-3"}
            audio={audio}
            className="flex flex-wrap items-center gap-2"
          >
            {renderInput(6)}
            <span>we bake a cake? Yes, we</span>
            {renderInput(7)}.Yes, we could.
            <span> Come on! Let’s go, you and I!</span>
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

export default Review5_Page2_Q3;
