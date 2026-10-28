import soundI11 from "../../../assets/audio/Workbook/Unit 10/Page 60 - I/Item_011_smart_correct.mp3";
import soundI10 from "../../../assets/audio/Workbook/Unit 10/Page 60 - I/Item_010_telling_someone_that_what_they_said_is.mp3";
import soundI9 from "../../../assets/audio/Workbook/Unit 10/Page 60 - I/Item_009_long_way_to_go.mp3";
import soundI8 from "../../../assets/audio/Workbook/Unit 10/Page 60 - I/Item_008_something_or_didn't_hear.mp3";
import soundI7 from "../../../assets/audio/Workbook/Unit 10/Page 60 - I/Item_007_It's_your_turn.mp3";
import soundI6 from "../../../assets/audio/Workbook/Unit 10/Page 60 - I/Item_006_what_someone_says_when_they_don't_understand.mp3";
import soundI5 from "../../../assets/audio/Workbook/Unit 10/Page 60 - I/Item_005_person_to_go.mp3";
import soundI4 from "../../../assets/audio/Workbook/Unit 10/Page 60 - I/Item_004_what_someone_says_when_it's_time_for_the_next.mp3";
import soundI3 from "../../../assets/audio/Workbook/Unit 10/Page 60 - I/Item_003_That's_a_good_point!.mp3";
import soundI2 from "../../../assets/audio/Workbook/Unit 10/Page 60 - I/Item_002_if_something_is_far_off,_it_will_take.mp3";
import soundI1 from "../../../assets/audio/Workbook/Unit 10/Page 60 - I/Item_001_huh.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
  AudioSpeaker,
} from "../../StudentPages/unit5/ExerciseAudioText";
import {
  SentenceGroup,
  SentencePart,
} from "../../StudentPages/unit5/SentenceAudio";
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

const WB_Unit10_Page60_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      left: "huh?",

      answer: "c",
    },

    {
      left: "That’s a good point!",

      answer: "d",
    },

    {
      left: "It’s your turn.",

      answer: "b",
    },

    {
      left: "a long way to go",

      answer: "a",
    },
  ];

  const meanings = [
    {
      letter: "a",

      text: "if something is far off, it will take ________",
    },

    {
      letter: "b",

      text: "what someone says when it’s time for the next person to go",
    },

    {
      letter: "c",

      text: "what someone says when they don’t understand something or didn’t hear",
    },

    {
      letter: "d",

      text: "telling someone that what they said is smart/correct",
    },
  ];

  const [studentAnswers, setStudentAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  // ------------------------
  // HANDLE INPUT
  // ------------------------

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...studentAnswers];

    updated[i] = value;

    setStudentAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (locked) return;
    audio.stop();

    if (studentAnswers.some((a) => !a.trim())) {
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

    const newResults = studentAnswers.map((answer, i) => {
      const ok = normalize(answer) === normalize(questions[i].answer);

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

  // ------------------------
  // SHOW ANSWERS
  // ------------------------

  const showAnswers = () => {
    audio.stop();
    setAnnouncement("Model answers shown and locked.");
    resetButtonRef.current?.focus({ preventScroll: true });
    setStudentAnswers(["c", "d", "b", "a"]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const matchInput = (i) => (
    <div className="relative inline-block">
      <input
        style={{
          borderBottomColor:
            result[i] === true
              ? "#16a34a"
              : result[i] === false
                ? "#D1232A"
                : undefined,
        }}
        aria-invalid={result[i] === false}
        title={`Match ${i + 1}: ${questions[i].left}. Enter its meaning letter a to d.`}
        aria-label={`Match ${i + 1}: ${questions[i].left}. Enter its meaning letter a to d.`}
        {...fieldKeys}
        type="text"
        maxLength={1}
        value={studentAnswers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          w-[45px]
          border-0
          border-b
          outline-none
          bg-transparent
          text-center
          text-[20px]
          text-[#6D2980]
          font-semibold

          ${result[i] === false ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-10px",
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
      data-exercise-scope={"WB_Unit10_Page60_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit10_Page60_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit10_Page60_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit10_Page60_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[18px] w-full"  style={{gap:"50px"}}>
        {/* TITLE */}

        <ExerciseHeader
          isWorkbook
          sectionLetter="I"
          title={<>Match.</>}
          subTitle="Start with one item, find the partner that matches its meaning or picture, then connect the pair before moving on."
        />

        {/* CONTENT */}

        {/* CONTENT */}

        <div className="grid grid-cols-2 gap-x-16 gap-y-10">
          {questions.map((q, index) => (
            <React.Fragment key={index}>
              {/* LEFT */}

              <SentenceGroup
                label={`Hear expression ${index + 1}: ${q.left}`}
                src={[soundI1, soundI3, soundI7, soundI9][index]}
                id={`left-${index}`}
                audio={audio}
                className="
          flex
          items-start
          gap-5
        "
              >
                {/* INPUT */}

                {matchInput(index)}

                {/* NUMBER */}

                <span className="font-bold">{index + 1}</span>

                {/* TEXT */}

                <span className="leading-[1.7]">{q.left}</span>
              </SentenceGroup>

              {/* RIGHT */}

              <SentenceGroup
                label={`Hear meaning ${meanings[index].letter}: ${meanings[index].text}`}
                src={
                  [
                    soundI2,
                    [soundI4, soundI5],
                    [soundI6, soundI8],
                    [soundI10, soundI11],
                  ][index]
                }
                id={`right-${index}`}
                audio={audio}
                className="
          flex
          items-start
          gap-4
        "
              >
                {/* LETTER */}

                <span className="font-bold">{meanings[index].letter}</span>

                {/* TEXT */}

                <span className="leading-[1.7]">{meanings[index].text}</span>
              </SentenceGroup>
            </React.Fragment>
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

export default WB_Unit10_Page60_Q2;
