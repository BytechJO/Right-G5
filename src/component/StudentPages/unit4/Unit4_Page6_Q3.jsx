import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import { SentenceGroup } from "./SentenceAudio";
import clip0 from "../../../assets/audio/ClassBook/U4/Page 33 - F/Item_001_How_often_do_you_go_to_the_park_(weekly).mp3";
import clip1 from "../../../assets/audio/ClassBook/U4/Page 33 - F/Item_002_How_often_does_Harley_go_to_the_library_(regularly).mp3";
import clip2 from "../../../assets/audio/ClassBook/U4/Page 33 - F/Item_003_How_often_do_they_visit_the_museum_(occasionally).mp3";
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
const Unit4_Page6_Q3 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const questions = [
    {
      question: "How often do you go to the park?",
      adverb: "weekly",
      answer: "I go to the park weekly.",
    },
    {
      question: "How often does Harley go to the library?",
      adverb: "regularly",
      answer: "Harley goes to the library regularly.",
    },
    {
      question: "How often do they visit the museum?",
      adverb: "occasionally",
      answer: "They visit the museum occasionally.",
    },
  ];
  const [answers, setAnswers] = useState(["", "", ""]);
  const [errors, setErrors] = useState([false, false, false]);
  const [correctLocked, setCorrectLocked] = useState([false, false, false]);
  const [locked, setLocked] = useState(false);

  // normalize
  const normalize = normalizeAnswer;

  // change
  const handleChange = (i, value) => {
    if (locked || correctLocked[i]) return;
    setAnswers((previous) => previous.map((a, j) => (j === i ? value : a)));
    setErrors((previous) => previous.map((e, j) => (j === i ? false : e)));
  };

  // check
  const handleCheck = () => {
    if (locked) return;
    audio.stop();
    if (answers.some((a) => normalize(a) === "")) {
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
    const newErrors = answers.map((a, i) => {
      const correct = normalize(a) === normalize(questions[i].answer);
      if (correct) score++;
      return !correct;
    });
    const updatedLocked = answers.map(
      (a, i) => normalize(a) === normalize(questions[i].answer),
    );
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
    setAnswers(questions.map((q) => q.answer));
    setErrors([false, false, false]);
    setCorrectLocked([true, true, true]);
    setLocked(true);
  };

  // reset
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", ""]);
    setErrors([false, false, false]);
    setCorrectLocked([false, false, false]);
    setLocked(false);
  };
  return (
    <div
      data-exercise-scope="Unit4_Page6_Q3.jsx"
      style={{
        padding: "30px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit4_Page6_Q3.jsx"] input:focus-visible,[data-exercise-scope="Unit4_Page6_Q3.jsx"] textarea:focus-visible,[data-exercise-scope="Unit4_Page6_Q3.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall" style={{gap:"30px"}}>
        {/* HEADER */}
        <ExerciseHeader
          sectionLetter="F"
          title={
            <>
              Read and answer each question by putting the adverb in the correct
              place.
            </>
          }
          subTitle="Use the picture, definition, chart, or grammar clue, then complete each answer before checking."
        />

        {/* QUESTIONS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            marginTop: "30px",
          }}
        >
          {questions.map((q, i) => (
            <SentenceGroup
              label={`Hear question ${i + 1}: ${q.question} (${q.adverb})`}
              src={[clip0, clip1, clip2][i]}
              id={`sentence-${i}`}
              audio={audio}
              key={i}
            >
              {/* QUESTION */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "18px",
                }}
              >
                <span
                  style={{
                    fontWeight: 600,
                    width: "20px",
                  }}
                >
                  {i + 1}
                </span>

                <span>{q.question}</span>

                <span
                  style={{
                    color: "#31B7F5",
                  }}
                >
                  ({q.adverb})
                </span>
              </div>

              {/* ANSWER */}
              <div
                style={{
                  position: "relative",
                  marginTop: "18px",
                  marginLeft: "38px",
                }}
              >
                <input
                  {...fieldKeys}
                  placeholder={"Answer"}
                  aria-invalid={!!errors[i]}
                  title={`Item ${i + 1}: ${q.question} Use ${q.adverb}.`}
                  aria-label={`Item ${i + 1}: ${q.question} Use ${q.adverb}.`}
                  type="text"
                  value={answers[i]}
                  disabled={locked || correctLocked[i]}
                  onChange={(e) => handleChange(i, e.target.value)}
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom: errors[i]
                      ? "1px solid red"
                      : "1px solid black",
                    outline: "none",
                    fontSize: "18px",
                    fontWeight: "500",
                    color: "#6D2980",
                    background: "transparent",
                    paddingBottom: "4px",
                    ...(correctLocked[i]
                      ? {
                          borderBottomColor: "#16a34a",
                        }
                      : {}),
                  }}
                />

                {/* ❌ */}
                {errors[i] && (
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
export default Unit4_Page6_Q3;
