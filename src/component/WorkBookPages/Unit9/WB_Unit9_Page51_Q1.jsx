import soundA9 from "../../../assets/audio/Workbook/Unit 9/Page 51 - A/Item_009_nt.mp3";
import soundA10 from "../../../assets/audio/Workbook/Unit 9/Page 51 - A/Item_010_m_=a_roofless_building_with_many_seats;_it_is_used_for_sports_events_and.mp3";
import soundA8 from "../../../assets/audio/Workbook/Unit 9/Page 51 - A/Item_008_t_=a_meeting_set_for_a_certain_time_and_place.mp3";
import soundA7 from "../../../assets/audio/Workbook/Unit 9/Page 51 - A/Item_007_=_to_become_part_of_something.mp3";
import soundA6 from "../../../assets/audio/Workbook/Unit 9/Page 51 - A/Item_006_=_asmall_group_that_certain_people_join.mp3";
import soundA5 from "../../../assets/audio/Workbook/Unit 9/Page 51 - A/Item_005_to_hurry.mp3";
import soundA2 from "../../../assets/audio/Workbook/Unit 9/Page 51 - A/Item_002_g_=_cutting_(the_grass)_with_a_machine.mp3";
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
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGE
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U9/Page 51/Asset 8.svg";
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

const WB_Unit9_Page51_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const inputRefs = useRef([]);
  const questions = [
    {
      prefix: "m",

      suffix: "g",

      answer: "owin",

      meaning: "= cutting (the grass) with a machine",
    },

    {
      prefix: "r",

      suffix: "",

      answer: "ush",

      meaning: "= to hurry",
    },

    {
      prefix: "c",

      suffix: "",

      answer: "lub",

      meaning: "= a small group that certain people join",
    },

    {
      prefix: "j",

      suffix: "",

      answer: "oin",

      meaning: "= to become part of something",
    },

    {
      parts: ["a", "input:ppoi", "nt", "input:men", "t"],
      answer: "ppoimen",
      meaning: "= a meeting set for a certain time and place",
    },
    {
      prefix: "s",

      suffix: "m",

      answer: "tadiu",

      meaning:
        "= a roofless building with many seats; it is used for sports events and concerts",
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

  const normalize = (text) => normalizeAnswer(text).replace(/\s+/g, "");

  // ------------------------
  // HANDLE INPUT
  // ------------------------

  const handleChange = (qIndex, value) => {
    if (locked || result[qIndex] === true) return;

    const updated = [...studentAnswers];

    updated[qIndex] = value;

    setStudentAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[qIndex] = undefined;

      return copy;
    });
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (locked) return;
    audio.stop();

    const hasEmpty = studentAnswers.some(
      (a, i) => a.replace(/\s/g, "").length !== questions[i].answer.length,
    );

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
  // LETTER INPUTS
  // ------------------------

  const renderLetterInputs = (q, qIndex) => {
    let inputCounter = 0;

    const parts =
      q.parts || [q.prefix, `input:${q.answer}`, q.suffix].filter(Boolean);

    return (
      <div className="flex items-center flex-wrap gap-1">
        {parts.map((part, partIndex) => {
          if (!part.startsWith("input:")) {
            return (
              <span key={partIndex}>
                {(part === "nt" ? soundA9 : null) ? (
                  <AudioText
                    audio={audio}
                    id={`fixed-${qIndex}-${partIndex}`}
                    src={part === "nt" ? soundA9 : null}
                    label={"Hear " + part}
                  >
                    {part}
                  </AudioText>
                ) : (
                  part
                )}
              </span>
            );
          }

          const letters = part.replace("input:", "").split("");

          return letters.map((_, i) => {
            const letterIndex = inputCounter++;

            return (
              <div key={`${partIndex}-${i}`} className="relative">
                <input
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.stopPropagation();
                      return;
                    }
                    if (
                      ![
                        "ArrowLeft",
                        "ArrowRight",
                        "Backspace",
                        "Delete",
                      ].includes(e.key)
                    )
                      return;
                    e.preventDefault();
                    e.stopPropagation();
                    if (locked || result[qIndex] === true) return;
                    let target = letterIndex;
                    if (e.key === "ArrowLeft") target--;
                    else if (e.key === "ArrowRight") target++;
                    else {
                      if (
                        e.key === "Backspace" &&
                        !studentAnswers[qIndex][letterIndex]?.trim()
                      )
                        target--;
                      const chars = Array.from(
                        { length: q.answer.length },
                        (_, idx) => studentAnswers[qIndex][idx] || " ",
                      );
                      chars[Math.max(0, target)] = " ";
                      handleChange(qIndex, chars.join(""));
                    }
                    const next = inputRefs.current[qIndex]?.[target];
                    next?.focus();
                    next?.select();
                  }}
                  style={{
                    borderBottomColor:
                      result[qIndex] === true
                        ? "#16a34a"
                        : result[qIndex] === false
                          ? "#D1232A"
                          : undefined,
                  }}
                  aria-invalid={result[qIndex] === false}
                  title={`Word ${qIndex + 1}, missing letter ${letterIndex + 1} of ${q.answer.length}. Clue: ${q.meaning}`}
                  aria-label={`Word ${qIndex + 1}, missing letter ${letterIndex + 1} of ${q.answer.length}. Clue: ${q.meaning}`}
                  onKeyUp={fieldKeys.onKeyUp}
                  ref={(el) => {
                    if (!inputRefs.current[qIndex])
                      inputRefs.current[qIndex] = [];
                    inputRefs.current[qIndex][letterIndex] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={(studentAnswers[qIndex][letterIndex] || "").trim()}
                  disabled={locked || result[qIndex] === true}
                  onChange={(e) => {
                    if (locked || result[qIndex] === true) return;
                    const value = e.target.value
                      .toLowerCase()
                      .replace(/[^a-z]/g, "")
                      .slice(-1);
                    const updated = Array.from(
                      { length: q.answer.length },
                      (_, idx) => studentAnswers[qIndex][idx] || " ",
                    );
                    updated[letterIndex] = value || " ";
                    handleChange(qIndex, updated.join(""));
                    if (value) {
                      const next = inputRefs.current[qIndex]?.[letterIndex + 1];
                      next?.focus();
                      next?.select();
                    }
                  }}
                  onFocus={(e) => e.target.select()}
                  className={`
                  w-[22px] border-0 border-b outline-none bg-transparent
                  text-center text-[18px] text-[#6D2980] font-semibold
                  ${
                    result[qIndex] === false
                      ? "border-[#D1232A]"
                      : "border-black"
                  }
                `}
                />

                {letterIndex === q.answer.length - 1 &&
                  result[qIndex] === false && (
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
          });
        })}
      </div>
    );
  };
  return (
    <div
      data-exercise-scope={"WB_Unit9_Page51_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit9_Page51_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit9_Page51_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit9_Page51_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
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
          sectionLetter="A"
          title={<>Read and write the missing letters.</>}
          subTitle="Say the whole word quietly, use the clue to identify the missing letters, then reread the completed spelling."
        />

        {/* CONTENT */}

        <div className="flex  items-start ">
          {/* LEFT */}

          <div className="flex-1 flex flex-col gap-9">
            {questions.map((q, index) => (
              <div key={index}>
                <div className="flex items-start gap-4">
                  {/* NUMBER */}

                  <span className="font-bold">{index + 1}</span>

                  {/* WORD */}

                  <div className="leading-[1.8]">
                    <div className="flex items-center gap-2 flex-wrap">
                      {renderLetterInputs(q, index)}

                      <span>
                        <AudioText
                          audio={audio}
                          id={`meaning-${index}`}
                          src={
                            [
                              soundA2,
                              soundA5,
                              soundA6,
                              soundA7,
                              soundA8,
                              soundA10,
                            ][index]
                          }
                          label={`Hear the clue for word ${index + 1}: ${q.meaning}`}
                        >
                          {q.meaning}
                        </AudioText>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* IMAGE */}
          <div className="-ml-100">
            {" "}
            <img
              src={img1}
              alt={"A lawn mower on green grass outside a building."}
              style={{
                width: "250px",
                height: "auto",
                objectFit: "contain",
              }}
            />
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

export default WB_Unit9_Page51_Q1;
