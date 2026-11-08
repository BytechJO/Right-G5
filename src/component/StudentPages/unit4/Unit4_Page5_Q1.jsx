import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import { SentenceGroup } from "./SentenceAudio";
import clip0 from "../../../assets/audio/ClassBook/U4/Page 32 - A/Item_001_We'll_check_out_the_boots,_but_we_don't_really_need_to_buy_them.mp3";
import clip1 from "../../../assets/audio/ClassBook/U4/Page 32 - A/Item_002_Joan_can_play_at_the_jeans_all_day.mp3";
import clip2 from "../../../assets/audio/ClassBook/U4/Page 32 - A/Item_003_The_clothes_store_has_many_books_to_choose_from.mp3";
import clip3 from "../../../assets/audio/ClassBook/U4/Page 32 - A/Item_004_They_are_going_to_the_electronics_store_to_find_a_radio.mp3";
import clip4 from "../../../assets/audio/ClassBook/U4/Page 32 - A/Item_005_Let's_head_over_to_the_restaurant_for_dinner.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import grammer_u1 from "../../../assets/audio/ClassBook/U4/PG 32/cd20pg32.mp3";
import trueImg from "../../../assets/imgs/true.svg";
import flaseImg from "../../../assets/imgs/false.svg";
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
const Unit4_Page5_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const captions = [
    {
      start: 0.219,
      end: 20.06,
      text: "Page 32, write activities exercise A. Listen and write check or X. For X, write the correct word. We'll check out the boots, but we don't really need to buy them. Joan can play at the jeans all day. The clothes store has many books to choose from. Let's head over to the restaurant for dinner.",
    },
  ];
  const questions = [
    {
      text: "We’ll check out the boots, but we don’t really need to buy them.",
      answer: "✓",
      correction: "",
    },
    {
      text: "Joan can play at the jeans all day.",
      answer: "✕",
      correction: "arcade",
    },
    {
      text: "The clothes store has many books to choose from.",
      answer: "✕",
      correction: "bookstore",
    },
    {
      text: "They are going to the electronics store to find a radio.",
      answer: "✓",
      correction: "",
    },
    {
      text: "Let’s head over to the restaurant for dinner.",
      answer: "✓",
      correction: "",
    },
  ];
  const [answers, setAnswers] = useState(
    questions.map(() => ({
      symbol: "",
      correction: "",
    })),
  );
  const [errors, setErrors] = useState(
    questions.map(() => ({
      symbol: false,
      correction: false,
    })),
  );
  const [correctLocked, setCorrectLocked] = useState(
    questions.map(() => ({
      symbol: false,
      correction: false,
    })),
  );
  const [locked, setLocked] = useState(false);

  // normalize
  const normalize = normalizeAnswer;

  // update field
  const updateField = (index, field, value) => {
    if (locked || correctLocked[index]?.[field]) return;
    const clearCorrection =
      field === "symbol" &&
      normalize(value) === normalize("✓") &&
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
      // لازم يختار ✓ أو ✕
      if (!a.symbol) return true;

      // فقط إذا الجواب ✕ لازم يكتب التصحيح
      if (normalize(a.symbol) === "✕" && normalize(a.correction) === "") {
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
      const symbolCorrect =
        normalize(ans.symbol) === normalize(questions[i].answer);
      const correctionCorrect =
        normalize(ans.correction) === normalize(questions[i].correction);
      const isCheck = questions[i].answer === "✓";

      // ✅ سؤال صح
      if (isCheck) {
        const questionCorrect =
          symbolCorrect && normalize(ans.correction) === "";
        if (questionCorrect) score++;
        return {
          symbol: !symbolCorrect,
          correction: normalize(ans.correction) !== "",
        };
      }

      // ❌ سؤال غلط
      const questionCorrect = symbolCorrect && correctionCorrect;
      if (questionCorrect) score++;
      return {
        symbol: !symbolCorrect,
        correction: !correctionCorrect,
      };
    });

    // lock الصح فقط
    const updatedLocked = answers.map((ans, i) => {
      const symbolCorrect =
        normalize(ans.symbol) === normalize(questions[i].answer);
      const correctionCorrect =
        normalize(ans.correction) === normalize(questions[i].correction);
      const isCheck = questions[i].answer === "✓";
      return {
        symbol: symbolCorrect,
        correction: isCheck
          ? symbolCorrect && normalize(ans.correction) === ""
          : correctionCorrect,
      };
    });
    setErrors(newErrors);
    setCorrectLocked(updatedLocked);
    const total = questions.length;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";
    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${score} / ${total}
        </span>
      </div>
    `;
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

  // show answers
  const handleShow = () => {
    audio.stop();
    setAnnouncement("Correct answers shown and locked.");
    setAnswers(
      questions.map((q) => ({
        symbol: q.answer,
        correction: q.correction,
      })),
    );
    setErrors(
      questions.map(() => ({
        symbol: false,
        correction: false,
      })),
    );
    setCorrectLocked(
      questions.map(() => ({
        symbol: true,
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
        symbol: "",
        correction: "",
      })),
    );
    setErrors(
      questions.map(() => ({
        symbol: false,
        correction: false,
      })),
    );
    setCorrectLocked(
      questions.map(() => ({
        symbol: false,
        correction: false,
      })),
    );
    setLocked(false);
  };
  return (
    <div
      data-exercise-scope="Unit4_Page5_Q1.jsx"
      style={{
        padding: "30px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit4_Page5_Q1.jsx"] input:focus-visible,[data-exercise-scope="Unit4_Page5_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="Unit4_Page5_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall">
        {/* TITLE */}
        <ExerciseHeader
          sectionLetter="A"
          title={
            <>
              Listen and write <span className="text-[#D1232A]">✓</span> or{" "}
              <span className="text-[#D1232A]">✗</span>. For{" "}
              <span className="text-[#D1232A]">✗</span>, write the correct word.
            </>
          }
          subTitle={
            <>
              Task 1: Listen to each sentence and decide ✓ or ✗. <br />
              Task 2: If it is ✗, replace only the incorrect word with the
              correct one.{" "}
            </>
          }
        />
        <QuestionAudioPlayer
          pageId={"sb_unit4_page5_q1"}
          src={grammer_u1}
          captions={captions}
          stopAtSecond={8.88}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            marginBottom: "70px",
          }}
        >
          {questions.map((q, i) => (
            <SentenceGroup
              label={`Hear sentence ${i + 1}: ${q.text}`}
              src={[clip0, clip1, clip2, clip3, clip4][i]}
              id={`sentence-${i}`}
              audio={audio}
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                fontSize: "18px",
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
                  flex: 1,
                }}
              >
                {i === 0 && (
                  <>
                    We’ll{" "}
                    <span
                      style={{
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                      }}
                    >
                      check out
                    </span>{" "}
                    the boots, but we don’t really need to buy them.
                  </>
                )}

                {i === 1 && (
                  <>
                    Joan can play at the{" "}
                    <span
                      style={{
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                      }}
                    >
                      jeans
                    </span>{" "}
                    all day.
                  </>
                )}

                {i === 2 && (
                  <>
                    The{" "}
                    <span
                      style={{
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                      }}
                    >
                      clothes store
                    </span>{" "}
                    has many books to choose from.
                  </>
                )}

                {i === 3 && (
                  <>
                    They are going to the{" "}
                    <span
                      style={{
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                      }}
                    >
                      electronics
                    </span>{" "}
                    store to find a radio.
                  </>
                )}

                {i === 4 && (
                  <>
                    Let’s{" "}
                    <span
                      style={{
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                      }}
                    >
                      head over
                    </span>{" "}
                    to the restaurant for dinner.
                  </>
                )}
              </div>
              {/* SYMBOL CHOICES */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  position: "relative",
                }}
              >
                {/* ✓ BUTTON */}
                <div
                  {...activationKeys}
                  aria-disabled={locked || correctLocked[i]?.symbol}
                  aria-pressed={answers[i].symbol === "✓"}
                  aria-label={`Item ${i + 1}, choose true: ${q.text}`}
                  data-choice={true}
                  tabIndex={0}
                  role={"button"}
                  onClick={() => {
                    if (!locked && !correctLocked[i]?.symbol) {
                      updateField(
                        i,
                        "symbol",
                        answers[i].symbol === "✓" ? "" : "✓",
                      );
                    }
                  }}
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    border: "2px solid #7b1fa2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor:
                      locked || correctLocked[i]?.symbol
                        ? "default"
                        : "pointer",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#6D2980",
                    userSelect: "none",
                    ...(answers[i].symbol === "✓"
                      ? {
                          backgroundColor: "#dbeafe",
                          ...(correctLocked[i]?.symbol
                            ? {
                                borderColor: "#16a34a",
                              }
                            : errors[i]?.symbol
                              ? {
                                  borderColor: "#ef4444",
                                }
                              : {}),
                        }
                      : {}),
                  }}
                >
                  {answers[i].symbol === "✓" && (
                    <img
                      aria-hidden={true}
                      src={trueImg}
                      alt={""}
                      style={{
                        width: "24px",
                        height: "24px",
                        objectFit: "contain",
                      }}
                    />
                  )}
                </div>

                {/* ✕ BUTTON */}
                <div
                  {...activationKeys}
                  aria-disabled={locked || correctLocked[i]?.symbol}
                  aria-pressed={answers[i].symbol === "✕"}
                  aria-label={`Item ${i + 1}, choose false: ${q.text}`}
                  data-choice={true}
                  tabIndex={0}
                  role={"button"}
                  onClick={() => {
                    if (!locked && !correctLocked[i]?.symbol) {
                      updateField(
                        i,
                        "symbol",
                        answers[i].symbol === "✕" ? "" : "✕",
                      );
                    }
                  }}
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    border: "2px solid #7b1fa2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor:
                      locked || correctLocked[i]?.symbol
                        ? "default"
                        : "pointer",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#6D2980",
                    userSelect: "none",
                    ...(answers[i].symbol === "✕"
                      ? {
                          backgroundColor: "#dbeafe",
                          ...(correctLocked[i]?.symbol
                            ? {
                                borderColor: "#16a34a",
                              }
                            : errors[i]?.symbol
                              ? {
                                  borderColor: "#ef4444",
                                }
                              : {}),
                        }
                      : {}),
                  }}
                >
                  {answers[i].symbol === "✕" && (
                    <img
                      aria-hidden={true}
                      src={flaseImg}
                      alt={""}
                      style={{
                        width: "24px",
                        height: "24px",
                        objectFit: "contain",
                      }}
                    />
                  )}
                </div>

                {/* ERROR */}
                {errors[i]?.symbol && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
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
              {/* CORRECTION */}
              <div
                style={{
                  position: "relative",
                }}
              >
                <input placeholder={"Correction"}
                  {...fieldKeys}
                  aria-invalid={!!errors[i]?.correction}
                  title={`Item ${i + 1}, correct the underlined word or phrase if false: ${q.text}`}
                  aria-label={`Item ${i + 1}, correct the underlined word or phrase if false: ${q.text}`}
                  type="text"
                  value={answers[i].correction}
                  disabled={
                    locked ||
                    correctLocked[i]?.correction ||
                    normalize(answers[i].symbol) === "✓"
                  }
                  onChange={(e) => updateField(i, "correction", e.target.value)}
                  style={{
                    width: "240px",
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
            </SentenceGroup>
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
export default Unit4_Page5_Q1;
