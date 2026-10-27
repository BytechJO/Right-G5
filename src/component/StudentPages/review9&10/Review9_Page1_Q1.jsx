import clip0 from "../../../assets/audio/ClassBook/U10/Page 88 - A/Item_001_exactly.mp3";
import clip1 from "../../../assets/audio/ClassBook/U10/Page 88 - A/Item_002_ring.mp3";
import clip2 from "../../../assets/audio/ClassBook/U10/Page 88 - A/Item_003_braces.mp3";
import clip3 from "../../../assets/audio/ClassBook/U10/Page 88 - A/Item_004_club.mp3";
import clip4 from "../../../assets/audio/ClassBook/U10/Page 88 - A/Item_005_congratulations.mp3";
import clip5 from "../../../assets/audio/ClassBook/U10/Page 88 - A/Item_006_stadium.mp3";
import clip6 from "../../../assets/audio/ClassBook/U10/Page 88 - A/Item_007_rush.mp3";
import clip7 from "../../../assets/audio/ClassBook/U10/Page 88 - A/Item_008_mowing.mp3";
import clip8 from "../../../assets/audio/ClassBook/U10/Page 88 - A/Item_009_lawns.mp3";
import clip9 from "../../../assets/audio/ClassBook/U10/Page 88 - A/Item_010_appointments.mp3";
import clip10 from "../../../assets/audio/ClassBook/U10/Page 88 - A/Item_011_cat_tax_lay_ace.mp3";
import clip11 from "../../../assets/audio/ClassBook/U10/Page 88 - A/Item_012_now_wing_go.mp3";
import clip12 from "../../../assets/audio/ClassBook/U10/Page 88 - A/Item_013_point_poem_ointment.mp3";
import clip13 from "../../../assets/audio/ClassBook/U10/Page 88 - A/Item_014_bear_race_car.mp3";
import clip14 from "../../../assets/audio/ClassBook/U10/Page 88 - A/Item_015_mist_mud_datum_must.mp3";
import clip15 from "../../../assets/audio/ClassBook/U10/Page 88 - A/Item_016_saw_was_allowance.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import { AudioText, AudioFeedback } from "../unit5/ExerciseAudioText";
import { SentenceGroup } from "../unit5/SentenceAudio";
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

const Review9_Page2_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    "exactly",
    "mowing",
    "appointments",
    "braces",
    "stadium",
    "lawns",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);

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
      "exactly",
      "mowing",
      "appointments",
      "braces",
      "stadium",
      "lawns",
    ]);

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width) => (
    <span className="relative inline-block">
      <input placeholder={"Word"}
        style={{
          ...(result[i] === true ? { borderBottomColor: "#16a34a" } : {}),
        }}
        aria-invalid={result[i] === false}
        title={`Clue ${i + 1}, write the vocabulary word containing the scrambled smaller words`}
        aria-label={`Clue ${i + 1}, write the vocabulary word containing the scrambled smaller words`}
        {...fieldKeys}
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
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
      data-exercise-scope={"Review9_Page1_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review9_Page1_Q1.jsx"] input:focus-visible,[data-exercise-scope="Review9_Page1_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="Review9_Page1_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall mb-10" style={{ gap: "30px" }}>
        {/* TITLE */}
        <ExerciseHeader
          isReview
          sectionLetter="A"
          title={
            <>
              Find the vocabulary words that have these smaller words scrambled
              inside of them.
            </>
          }
          subTitle="Unscramble each small group, compare it with the vocabulary list, then write the full matching word."
        />

        {/* WORD BOX */}
        <div
          style={{
            background: "#E9E1EC",
            borderRadius: "16px",
            padding: "14px 28px",
            display: "grid",
            gridTemplateColumns: "repeat(5, auto)",
            gap: "18px 34px",
            // margin: "0 auto",
            width: "-webkit-fill-available ",
            marginBottom: "40px",
            fontSize: "18px",
          }}
        >
          <span>
            <AudioText
              audio={audio}
              id={"word-0"}
              src={clip0}
              label={"Hear exactly"}
            >
              exactly
            </AudioText>
          </span>
          <span>
            <AudioText
              audio={audio}
              id={"word-1"}
              src={clip1}
              label={"Hear ring"}
            >
              ring
            </AudioText>
          </span>
          <span>
            <AudioText
              audio={audio}
              id={"word-2"}
              src={clip2}
              label={"Hear braces"}
            >
              braces
            </AudioText>
          </span>
          <span>
            <AudioText
              audio={audio}
              id={"word-3"}
              src={clip3}
              label={"Hear club"}
            >
              club
            </AudioText>
          </span>
          <span>
            <AudioText
              audio={audio}
              id={"word-4"}
              src={clip4}
              label={"Hear congratulations"}
            >
              congratulations
            </AudioText>
          </span>

          <span>
            <AudioText
              audio={audio}
              id={"word-5"}
              src={clip5}
              label={"Hear stadium"}
            >
              stadium
            </AudioText>
          </span>
          <span>
            <AudioText
              audio={audio}
              id={"word-6"}
              src={clip6}
              label={"Hear rush"}
            >
              rush
            </AudioText>
          </span>
          <span>
            <AudioText
              audio={audio}
              id={"word-7"}
              src={clip7}
              label={"Hear mowing"}
            >
              mowing
            </AudioText>
          </span>
          <span>
            <AudioText
              audio={audio}
              id={"word-8"}
              src={clip8}
              label={"Hear lawns"}
            >
              lawns
            </AudioText>
          </span>
          <span>
            <AudioText
              audio={audio}
              id={"word-9"}
              src={clip9}
              label={"Hear appointments"}
            >
              appointments
            </AudioText>
          </span>
        </div>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-8">
          {/* 1 */}
          <SentenceGroup
            label={"Hear scrambled clue 1"}
            src={clip10}
            id={"clue-0"}
            audio={audio}
            className="flex items-center gap-4 text-[18px]"
          >
            <span className="font-bold">1</span>

            <span>cat</span>

            <span>tax</span>

            <span>lay</span>

            <span>ace</span>

            {inputField(0, "w-[220px]")}
          </SentenceGroup>

          {/* 2 */}
          <SentenceGroup
            label={"Hear scrambled clue 2"}
            src={clip11}
            id={"clue-1"}
            audio={audio}
            className="flex items-center gap-4 text-[18px]"
          >
            <span className="font-bold">2</span>

            <span>now</span>

            <span>wing</span>

            <span>go</span>

            {inputField(1, "w-[240px]")}
          </SentenceGroup>

          {/* 3 */}
          <SentenceGroup
            label={"Hear scrambled clue 3"}
            src={clip12}
            id={"clue-2"}
            audio={audio}
            className="flex items-center gap-4 text-[18px]"
          >
            <span className="font-bold">3</span>

            <span>point</span>

            <span>poem</span>

            <span>ointment</span>

            {inputField(2, "w-[280px]")}
          </SentenceGroup>

          {/* 4 */}
          <SentenceGroup
            label={"Hear scrambled clue 4"}
            src={clip13}
            id={"clue-3"}
            audio={audio}
            className="flex items-center gap-4 text-[18px]"
          >
            <span className="font-bold">4</span>

            <span>bear</span>

            <span>race</span>

            <span>car</span>

            {inputField(3, "w-[240px]")}
          </SentenceGroup>

          {/* 5 */}
          <SentenceGroup
            label={"Hear scrambled clue 5"}
            src={clip14}
            id={"clue-4"}
            audio={audio}
            className="flex items-center gap-4 text-[18px]"
          >
            <span className="font-bold">5</span>

            <span>mist</span>

            <span>mud</span>

            <span>datum</span>

            <span>must</span>

            {inputField(4, "w-[260px]")}
          </SentenceGroup>

          {/* 6 */}
          <SentenceGroup
            label={"Hear scrambled clue 6"}
            src={clip15}
            id={"clue-5"}
            audio={audio}
            className="flex items-center gap-4 text-[18px]"
          >
            <span className="font-bold">6</span>

            <span>saw</span>

            <span>was</span>

            <span>allowance</span>

            {inputField(5, "w-[230px]")}
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

export default Review9_Page2_Q1;
