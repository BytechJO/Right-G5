import clip0 from "../../../assets/audio/ClassBook/U8/Page 68 - B/Item_001_Did_you_see_from_the_hot-air_balloon_Yes,_I_saw.mp3";
import clip1 from "../../../assets/audio/ClassBook/U8/Page 68 - B/Item_002_Will_come_to_the_store_today_No,_will_come._We're_closed.mp3";
import clip2 from "../../../assets/audio/ClassBook/U8/Page 68 - B/Item_003_Does_have_a_pencil_I_could_use_Yes,_has_one.mp3";
import clip3 from "../../../assets/audio/ClassBook/U8/Page 68 - B/Item_004_Can_please_help_me_carry_these_boxes_Of_course,_will_help.mp3";
import clip4 from "../../../assets/audio/ClassBook/U8/Page 68 - B/Item_005_Is_there_in_the_fridge_to_eat_No,_there's_to_eat,_but_we_can_go_to_the_s.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import { AudioFeedback } from "../unit5/ExerciseAudioText";
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

const Unit8_Page5_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    "anything",
    "something",
    "anyone",
    "nobody",
    "anyone",
    "somebody",
    "someone",
    "everyone",
    "anything",
    "nothing",
  ];

  const [answers, setAnswers] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

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

    if (answers.some((a) => !a.trim())) {
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
      "anything",
      "something",
      "anyone",
      "nobody",
      "anyone",
      "somebody",
      "someone",
      "everyone",
      "anything",
      "nothing",
    ]);

    setResult([true, true, true, true, true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width) => (
    <span className="relative inline-block">
      <input placeholder={"Pronoun"}
        style={{
          ...(result[i] === true ? { borderBottomColor: "#16a34a" } : {}),
        }}
        aria-invalid={!!(result[i] === false)}
        title={`Conversation blank ${i + 1}, complete the reply using an indefinite pronoun`}
        aria-label={`Conversation blank ${i + 1}, complete the reply using an indefinite pronoun`}
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
          leading-none
          align-middle
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
      data-exercise-scope={"Unit8_Page5_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit8_Page5_Q2.jsx"] input:focus-visible,[data-exercise-scope="Unit8_Page5_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Unit8_Page5_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall mb-10" style={{gap:"30px"}}>
        {/* TITLE */}
        <ExerciseHeader
          sectionLetter="B"
          title={
            <>
              Use the correct indefinite pronouns to ask and answer the
              questions.
            </>
          }
          subTitle="Read the whole sentence first, then choose the word that fits both the meaning and grammar before checking."
        />

        {/* QUESTIONS */}
        <div className="text-[18px] leading-[3.3] flex flex-col gap-2">
          <SentenceGroup
            label={"Hear conversation 1"}
            src={clip0}
            id={"conversation-0"}
            audio={audio}
          >
            <span className="font-bold mr-4">1</span>
            Did you see {inputField(0, "w-[140px]")} from the hot-air balloon?
            Yes, I saw {inputField(1, "w-[150px]")}.
          </SentenceGroup>

          <SentenceGroup
            label={"Hear conversation 2"}
            src={clip1}
            id={"conversation-1"}
            audio={audio}
          >
            <span className="font-bold mr-4">2</span>
            Will {inputField(2, "w-[160px]")} come to the store today? No,{" "}
            {inputField(3, "w-[160px]")} will come. We’re closed.
          </SentenceGroup>

          <SentenceGroup
            label={"Hear conversation 3"}
            src={clip2}
            id={"conversation-2"}
            audio={audio}
          >
            <span className="font-bold mr-4">3</span>
            Does {inputField(4, "w-[160px]")} have a pencil I could use? Yes,{" "}
            {inputField(5, "w-[170px]")} has one.
          </SentenceGroup>

          <SentenceGroup
            label={"Hear conversation 4"}
            src={clip3}
            id={"conversation-3"}
            audio={audio}
          >
            <span className="font-bold mr-4">4</span>
            Can {inputField(6, "w-[170px]")} please help me carry these boxes?
            Of course, {inputField(7, "w-[170px]")} will help.
          </SentenceGroup>

          <SentenceGroup
            label={"Hear conversation 5"}
            src={clip4}
            id={"conversation-4"}
            audio={audio}
          >
            <span className="font-bold mr-4">5</span>
            Is there {inputField(8, "w-[170px]")} in the fridge to eat? No,
            there’s {inputField(9, "w-[170px]")} to eat, but we can go to the
            store.
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

export default Unit8_Page5_Q2;
