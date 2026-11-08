import soundE6 from "../../../assets/audio/Workbook/Unit 9/Page 53 - E/Item_006_,_we_will_watch_TV_together.mp3";
import soundE5 from "../../../assets/audio/Workbook/Unit 9/Page 53 - E/Item_005_He_will_buy_a_new_bicycle.mp3";
import soundE4 from "../../../assets/audio/Workbook/Unit 9/Page 53 - E/Item_004_Suzie_will_read_a_book.mp3";
import soundE3 from "../../../assets/audio/Workbook/Unit 9/Page 53 - E/Item_003_John_can_go_to_the_park.mp3";
import soundE2 from "../../../assets/audio/Workbook/Unit 9/Page 53 - E/Item_002_,_we_will_go_next_year.mp3";
import soundE1 from "../../../assets/audio/Workbook/Unit 9/Page 53 - E/Item_001_We_will_get_to_the_party_on_time.mp3";
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

const WB_Unit9_Page53_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      before: "We will get to the party on time",

      after: ".",

      answer: "if we leave right now",
    },

    {
      before: "",

      after: ", we will go next year.",

      answer: "If we can’t go to China this year",
    },

    {
      before: "John can go to the park",

      after: ".",

      answer: "when he finishes the dishes",
    },

    {
      before: "Suzie will read a book",

      after: ".",

      answer: "when the weekend comes",
    },

    {
      before: "He will buy a new bicycle",

      after: ".",

      answer: "if he is able to save up the money",
    },

    {
      before: "",

      after: ", we will watch TV together.",

      answer: "When my brother comes home",
    },
  ];

  const [studentAnswers, setStudentAnswers] = useState([
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

    const hasEmpty = studentAnswers.some((a) => !a.trim());

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
    setStudentAnswers(questions.map((q) => q.answer));

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i, width = "320px") => (
    <div className="relative w-full">
      <input
        placeholder={"when / if clause"}
        aria-invalid={result[i] === false}
        title={`Sentence ${i + 1}: ${questions[i].before} ___ ${questions[i].after}. Use when or if.`}
        aria-label={`Sentence ${i + 1}: ${questions[i].before} ___ ${questions[i].after}. Use when or if.`}
        {...fieldKeys}
        type="text"
        value={studentAnswers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
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
        style={{
          width,
          borderBottomColor:
            result[i] === true
              ? "#16a34a"
              : result[i] === false
                ? "#D1232A"
                : undefined,
        }}
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
    </div>
  );

  return (
    <div
      data-exercise-scope={"WB_Unit9_Page53_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit9_Page53_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit9_Page53_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit9_Page53_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[18px] w-full" style={{gap:"50px"}}>
        {/* TITLE */}

        <ExerciseHeader
          isWorkbook
          sectionLetter="E"
          title={
            <>
              Read and write sentences with{" "}
              <span className="text-[#00AEEF]">“when”</span> or{" "}
              <span className="text-[#00AEEF]">“if”</span> clauses.
            </>
          }
          subTitle="Identify the condition and the result, then use when or if so the two clauses form one logical sentence."
        />

        {/* QUESTIONS */}

        <div className="flex flex-col gap-10">
          {questions.map((q, index) => (
            <div key={index}>
              <div className="flex items-start gap-4">
                {/* NUMBER */}

                <span className="font-bold">{index + 1}</span>

                {/* SENTENCE */}

                <div className="flex flex-wrap items-end gap-2 leading-[1.8] flex-1">
                  {q.before && (
                    <span>
                      {[soundE1, null, soundE3, soundE4, soundE5, null][
                        index
                      ] ? (
                        <AudioText
                          audio={audio}
                          id={`before-${index}`}
                          src={
                            [soundE1, null, soundE3, soundE4, soundE5, null][
                              index
                            ]
                          }
                          label={"Hear " + q.before}
                        >
                          {q.before}
                        </AudioText>
                      ) : (
                        q.before
                      )}
                    </span>
                  )}

                  <div className="flex-1 min-w-[220px]">
                    {inputField(index, "100%")}
                  </div>

                  {q.after && (
                    <span>
                      {[null, soundE2, null, null, null, soundE6][index] ? (
                        <AudioText
                          audio={audio}
                          id={`after-${index}`}
                          src={
                            [null, soundE2, null, null, null, soundE6][index]
                          }
                          label={"Hear " + q.after}
                        >
                          {q.after}
                        </AudioText>
                      ) : (
                        q.after
                      )}
                    </span>
                  )}
                </div>
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

export default WB_Unit9_Page53_Q1;
