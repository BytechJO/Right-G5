import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import { SentenceGroup } from "./SentenceAudio";
import clip0 from "../../../assets/audio/ClassBook/U4/Page 32 - C/Item_001_Me_not!.mp3";
import clip1 from "../../../assets/audio/ClassBook/U4/Page 32 - C/Item_002_head_over.mp3";
import clip2 from "../../../assets/audio/ClassBook/U4/Page 32 - C/Item_003_Wait_a_year.mp3";
import clip3 from "../../../assets/audio/ClassBook/U4/Page 32 - C/Item_004_It's_straight_ahead.mp3";
import clip4 from "../../../assets/audio/ClassBook/U4/Page 32 - C/Item_005_split_aside.mp3";
import clip5 from "../../../assets/audio/ClassBook/U4/Page 32 - C/Item_006_true.mp3";
import clip6 from "../../../assets/audio/ClassBook/U4/Page 32 - C/Item_007_false.mp3";
import ExerciseHeader from "../../ExerciseHeader";
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
const Unit4_Page5_Q3 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const questions = [
    {
      text: "Me not!",
      answer: "false",
      correction: "Not me!",
    },
    {
      text: "head over",
      answer: "true",
      correction: "",
    },
    {
      text: "Wait a year.",
      answer: "false",
      correction: "Wait a minute.",
    },
    {
      text: "It’s straight ahead.",
      answer: "true",
      correction: "",
    },
    {
      text: "split aside",
      answer: "false",
      correction: "split up",
    },
  ];
  const [answers, setAnswers] = useState(
    questions.map(() => ({
      choice: "",
      correction: "",
    })),
  );
  const [errors, setErrors] = useState(
    questions.map(() => ({
      choice: false,
      correction: false,
    })),
  );
  const [correctLocked, setCorrectLocked] = useState(
    questions.map(() => ({
      choice: false,
      correction: false,
    })),
  );
  const [locked, setLocked] = useState(false);

  // normalize
  const normalize = normalizeAnswer;

  // update
  const updateField = (index, field, value) => {
    if (locked || correctLocked[index]?.[field]) return;
    const clearCorrection =
      field === "choice" &&
      normalize(value) === normalize("true") &&
      !correctLocked[index]?.correction;
    setAnswers((previous) =>
      previous.map((answer, j) =>
        j === index
          ? {
              ...answer,
              [field]: value,
              ...(clearCorrection
                ? {
                    correction: "",
                  }
                : {}),
            }
          : answer,
      ),
    );
    setErrors((previous) =>
      previous.map((error, j) =>
        j === index
          ? {
              ...error,
              [field]: false,
              ...(clearCorrection
                ? {
                    correction: false,
                  }
                : {}),
            }
          : error,
      ),
    );
    setAnnouncement("Item " + (index + 1) + ", " + field + " updated.");
  };

  // check
  const handleCheck = () => {
    if (locked) return;
    audio.stop();
    const isEmpty = answers.some((a) => {
      if (!a.choice) return true;
      if (normalize(a.choice) === "false" && normalize(a.correction) === "") {
        return true;
      }
      return false;
    });
    if (isEmpty) {
      (setAnnouncement(
        String("Complete all fields.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Complete all fields."));
      return;
    }
    let score = 0;
    const newErrors = answers.map((ans, i) => {
      const choiceCorrect =
        normalize(ans.choice) === normalize(questions[i].answer);
      const correctionCorrect =
        normalize(ans.correction) === normalize(questions[i].correction);
      const isTrue = questions[i].answer === "true";

      // TRUE
      if (isTrue) {
        const questionCorrect =
          choiceCorrect && normalize(ans.correction) === "";
        if (questionCorrect) score++;
        return {
          choice: !choiceCorrect,
          correction: normalize(ans.correction) !== "",
        };
      }

      // FALSE
      const questionCorrect = choiceCorrect && correctionCorrect;
      if (questionCorrect) score++;
      return {
        choice: !choiceCorrect,
        correction: !correctionCorrect,
      };
    });

    // lock correct only
    const updatedLocked = answers.map((ans, i) => {
      const choiceCorrect =
        normalize(ans.choice) === normalize(questions[i].answer);
      const correctionCorrect =
        normalize(ans.correction) === normalize(questions[i].correction);
      const isTrue = questions[i].answer === "true";
      return {
        choice: choiceCorrect,
        correction: isTrue
          ? choiceCorrect && normalize(ans.correction) === ""
          : correctionCorrect,
      };
    });
    setErrors(newErrors);
    setCorrectLocked(updatedLocked);
    const total = questions.length;
    const msg = `Score: ${score} / ${total}`;
    if (score === total) {
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
    } else if (score === 0) {
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

  // show
  const handleShow = () => {
    audio.stop();
    setAnnouncement("Correct answers shown and locked.");
    setAnswers(
      questions.map((q) => ({
        choice: q.answer,
        correction: q.correction,
      })),
    );
    setErrors(
      questions.map(() => ({
        choice: false,
        correction: false,
      })),
    );
    setCorrectLocked(
      questions.map(() => ({
        choice: true,
        correction: true,
      })),
    );
    setLocked(true);
  };

  // reset
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(
      questions.map(() => ({
        choice: "",
        correction: "",
      })),
    );
    setErrors(
      questions.map(() => ({
        choice: false,
        correction: false,
      })),
    );
    setCorrectLocked(
      questions.map(() => ({
        choice: false,
        correction: false,
      })),
    );
    setLocked(false);
  };
  return (
    <div
      data-exercise-scope="Unit4_Page5_Q3.jsx"
      style={{
        padding: "30px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit4_Page5_Q3.jsx"] input:focus-visible,[data-exercise-scope="Unit4_Page5_Q3.jsx"] textarea:focus-visible,[data-exercise-scope="Unit4_Page5_Q3.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
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
          sectionLetter="C"
          title={
            <>
              Read and circle{" "}
              <b
                style={{
                  color: "#31B7F5",
                }}
              >
                true
              </b>{" "}
              or{" "}
              <span
                style={{
                  color: "#31B7F5",
                }}
              >
                false
              </span>
              . For false, write the correct phrase or expression.
            </>
          }
          subTitle="Task 1: Decide whether each expression is true or false. Task 2: For each false item, rewrite only the phrase or expression that needs correction."
        />

        {/* QUESTIONS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
          }}
        >
          {questions.map((q, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                fontSize: "20px",
              }}
            >
              {/* NUMBER */}
              <span
                style={{
                  fontWeight: "bold",
                  width: "20px",
                }}
              >
                {i + 1}
              </span>

              {/* TEXT */}
              <div
                style={{
                  width: "200px",
                }}
              >
                <AudioText
                  audio={audio}
                  id={`sentence-${i}`}
                  src={[clip0, clip1, clip2, clip3, clip4][i]}
                  label={`Hear expression ${i + 1}: ${q.text}`}
                >
                  {q.text}
                </AudioText>
              </div>

              {/* CORRECTION */}
              <div
                style={{
                  position: "relative",
                }}
              >
                <input
                  {...fieldKeys}
                  aria-invalid={!!errors[i]?.correction}
                  title={`Item ${i + 1}, correct the underlined word or phrase if false: ${q.text}`}
                  aria-label={`Item ${i + 1}, correct the underlined word or phrase if false: ${q.text}`}
                  type="text"
                  value={answers[i].correction}
                  disabled={
                    locked ||
                    correctLocked[i]?.correction ||
                    normalize(answers[i].choice) === "true"
                  }
                  onChange={(e) => updateField(i, "correction", e.target.value)}
                  style={{
                    width: "180px",
                    border: "none",
                    borderBottom: errors[i]?.correction
                      ? "1px solid red"
                      : "1px solid black",
                    outline: "none",
                    fontSize: "20px",
                    textAlign: "center",
                    color: "#6D2980",
                    background: "transparent",
                    fontWeight: 600,
                    ...(correctLocked[i]?.correction
                      ? {
                          borderBottomColor: "#16a34a",
                        }
                      : {}),
                  }}
                />

                {/* ❌ */}
                {errors[i]?.correction && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-20px",
                      width: "22px",
                      transform: "translateY(-50%)",
                      height: "22px",
                      background: "#ef4444",
                      color: "white",
                      borderRadius: "50%",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      border: "2px solid white",
                      boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    ✕
                  </span>
                )}
              </div>

              {/* TRUE */}
              <div
                {...activationKeys}
                aria-disabled={locked || correctLocked[i]?.choice}
                aria-pressed={answers[i].choice === "true"}
                aria-label={`Item ${i + 1}, choose true: ${q.text}`}
                data-choice={true}
                tabIndex={0}
                role={"button"}
                onClick={() => {
                  audio.play(`choice-${i}-true`, clip5);
                  if (!locked && !correctLocked[i]?.choice) {
                    updateField(
                      i,
                      "choice",
                      answers[i].choice === "true" ? "" : "true",
                    );
                  }
                }}
                style={{
                  padding: "4px 12px",
                  borderRadius: "999px",
                  border:
                    answers[i].choice === "true"
                      ? "2px solid #6D2980"
                      : "2px solid transparent",
                  cursor:
                    locked || correctLocked[i]?.choice ? "default" : "pointer",
                  userSelect: "none",
                  ...(answers[i].choice === "true"
                    ? {
                        backgroundColor: "#dbeafe",
                        ...(correctLocked[i]?.choice
                          ? {
                              borderColor: "#16a34a",
                            }
                          : errors[i]?.choice
                            ? {
                                borderColor: "#ef4444",
                              }
                            : {}),
                      }
                    : {}),
                  position: "relative",
                  ...(audio.activeId === `choice-${i}-true`
                    ? {
                        boxShadow: "0 0 0 3px #2563eb",
                      }
                    : {}),
                  ...(audio.activeId === `choice-${i}-true`
                    ? { backgroundColor: "#dbeafe" }
                    : {}),
                }}
              >
                true
                {audio.activeId === `choice-${i}-true` && <AudioSpeaker />}
              </div>

              {/* FALSE */}
              <div
                {...activationKeys}
                aria-disabled={locked || correctLocked[i]?.choice}
                aria-pressed={answers[i].choice === "false"}
                aria-label={`Item ${i + 1}, choose false: ${q.text}`}
                data-choice={true}
                tabIndex={0}
                role={"button"}
                onClick={() => {
                  audio.play(`choice-${i}-false`, clip6);
                  if (!locked && !correctLocked[i]?.choice) {
                    updateField(
                      i,
                      "choice",
                      answers[i].choice === "false" ? "" : "false",
                    );
                  }
                }}
                style={{
                  padding: "4px 12px",
                  borderRadius: "999px",
                  border:
                    answers[i].choice === "false"
                      ? "2px solid #6D2980"
                      : "2px solid transparent",
                  cursor:
                    locked || correctLocked[i]?.choice ? "default" : "pointer",
                  userSelect: "none",
                  ...(answers[i].choice === "false"
                    ? {
                        backgroundColor: "#dbeafe",
                        ...(correctLocked[i]?.choice
                          ? {
                              borderColor: "#16a34a",
                            }
                          : errors[i]?.choice
                            ? {
                                borderColor: "#ef4444",
                              }
                            : {}),
                      }
                    : {}),
                  position: "relative",
                  ...(audio.activeId === `choice-${i}-false`
                    ? {
                        boxShadow: "0 0 0 3px #2563eb",
                      }
                    : {}),
                  ...(audio.activeId === `choice-${i}-false`
                    ? { backgroundColor: "#dbeafe" }
                    : {}),
                }}
              >
                false
                {audio.activeId === `choice-${i}-false` && <AudioSpeaker />}
              </div>

              {/* ❌ choice */}
              {errors[i]?.choice && (
                <span
                  style={{
                    transform: "translateY(-50%)",
                    width: "22px",
                    height: "22px",
                    background: "#ef4444",
                    color: "white",
                    borderRadius: "50%",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    border: "2px solid white",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                  }}
                >
                  ✕
                </span>
              )}
            </div>
          ))}
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
            onClick={handleShow}
          >
            Show Answer
          </button>

          <button
            {...activationKeys}
            style={{
              cursor: locked ? "not-allowed" : "pointer",
            }}
            disabled={locked}
            aria-label={"Check Answer"}
            type={"button"}
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
export default Unit4_Page5_Q3;
