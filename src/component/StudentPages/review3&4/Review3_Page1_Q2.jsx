import clip0 from "../../../assets/audio/ClassBook/U4/Page 34 - B/Item_001_Some_try!.mp3";
import clip1 from "../../../assets/audio/ClassBook/U4/Page 34 - B/Item_002_Try_some!.mp3";
import clip2 from "../../../assets/audio/ClassBook/U4/Page 34 - B/Item_003_Way_no!.mp3";
import clip3 from "../../../assets/audio/ClassBook/U4/Page 34 - B/Item_004_No_way!.mp3";
import clip4 from "../../../assets/audio/ClassBook/U4/Page 34 - B/Item_005_tastes_funny.mp3";
import clip5 from "../../../assets/audio/ClassBook/U4/Page 34 - B/Item_006_funny_tastes.mp3";
import clip6 from "../../../assets/audio/ClassBook/U4/Page 34 - B/Item_007_Good_that_doesn't_sound.mp3";
import clip7 from "../../../assets/audio/ClassBook/U4/Page 34 - B/Item_008_That_doesn't_sound_good.mp3";
import clip8 from "../../../assets/audio/ClassBook/U4/Page 34 - B/Item_009_Help_yourself.mp3";
import clip9 from "../../../assets/audio/ClassBook/U4/Page 34 - B/Item_010_Yourself_help.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import { SentenceGroup } from "./SentenceAudio";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
const activationKeys = {
  onKeyDown: event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  }
};
const Review3_Page1_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const questions = [{
    left: "Some try!",
    right: "Try some!",
    correct: "right"
  }, {
    left: "Way no!",
    right: "No way!",
    correct: "right"
  }, {
    left: "tastes funny",
    right: "funny tastes",
    correct: "left"
  }, {
    left: "Good that doesn’t sound.",
    right: "That doesn’t sound good.",
    correct: "right"
  }, {
    left: "Help yourself.",
    right: "Yourself help.",
    correct: "left"
  }];
  const [answers, setAnswers] = useState(questions.map(() => ""));
  const [errors, setErrors] = useState(questions.map(() => false));
  const [correctLocked, setCorrectLocked] = useState(questions.map(() => false));
  const [locked, setLocked] = useState(false);

  // select
  const handleSelect = (index, side) => {
    if (locked || correctLocked[index]) return;
    const updated = [...answers];
    updated[index] = side;
    setAnswers(updated);
    const updatedErrors = [...errors];
    updatedErrors[index] = false;
    setErrors(updatedErrors);
  };

  // check
  const handleCheck = () => {
    if (locked) return;
    audio.stop();
    const isEmpty = answers.some(a => a === "");
    if (isEmpty) {
      setAnnouncement(String("Complete all fields.").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.info("Complete all fields.");
      return;
    }
    let score = 0;
    const newErrors = answers.map((a, i) => {
      const correct = a === questions[i].correct;
      if (correct) score++;
      return !correct;
    });
    const updatedLocked = answers.map((a, i) => a === questions[i].correct);
    setErrors(newErrors);
    setCorrectLocked(updatedLocked);
    const total = questions.length;
    const msg = `Score: ${score} / ${total}`;
    if (score === total) {
      resetButtonRef.current?.focus({
        preventScroll: true
      });
      setLocked(true);
      setAnnouncement(String(msg).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.success(msg);
    } else if (score === 0) {
      setAnnouncement(String(msg).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.error(msg);
    } else {
      setAnnouncement(String(msg).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.warning(msg);
    }
  };

  // show
  const handleShow = () => {
    audio.stop();
    setAnnouncement("Correct answers shown and locked.");
    setAnswers(questions.map(q => q.correct));
    setErrors(questions.map(() => false));
    setCorrectLocked(questions.map(() => true));
    setLocked(true);
  };

  // reset
  const handleReset = () => {
    audio.stop();
    setAnnouncement("All answers and feedback cleared.");
    setAnswers(questions.map(() => ""));
    setErrors(questions.map(() => false));
    setCorrectLocked(questions.map(() => false));
    setLocked(false);
  };

  // option
  const renderOption = (text, side, selected, oppositeSelected, questionIndex) => {
    return <span {...activationKeys} aria-disabled={locked || correctLocked[questionIndex]} aria-pressed={selected} aria-label={`Item ${questionIndex + 1}, choose ${text}. ${correctLocked[questionIndex] ? "Correct and locked." : ""}`} data-choice={true} tabIndex={0} role={"button"} onClick={() => {
      audio.play(`option-${questionIndex}-${side}`, [clip0, clip1, clip2, clip3, clip4, clip5, clip6, clip7, clip8, clip9][questionIndex * 2 + (side === "right" ? 1 : 0)]);
      handleSelect(questionIndex, side);
    }} style={{
      position: "relative",
      cursor: locked || correctLocked[questionIndex] ? "default" : "pointer",
      userSelect: "none",
      padding: "2px 6px",
      border: selected ? "2px solid #6D2980" : "2px solid transparent",
      borderRadius: "999px",
      transition: "0.2s",
      ...(selected ? {
        backgroundColor: "#dbeafe",
        ...(correctLocked[questionIndex] ? {
          borderColor: "#16a34a"
        } : errors[questionIndex] ? {
          borderColor: "#ef4444"
        } : {})
      } : {}),
      ...(audio.activeId === `option-${questionIndex}-${side}` ? {
        boxShadow: "0 0 0 3px #2563eb",
        backgroundColor: "#dbeafe"
      } : {})
    }}>
        {text}

        {/* X */}
        {oppositeSelected && <span style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "#FF0000",
        fontSize: "28px",
        fontWeight: "bold",
        lineHeight: 1,
        pointerEvents: "none"
      }}>
            ✗
          </span>}
      {audio.activeId === `option-${questionIndex}-${side}` && <AudioSpeaker />}</span>;
  };
  return <div data-exercise-scope={"Review3_Page1_Q2.jsx"} style={{
    padding: "30px",
    display: "flex",
    justifyContent: "center"
  }}><AudioFeedback audio={audio} /><style>{`[data-exercise-scope="Review3_Page1_Q2.jsx"] input:focus-visible,[data-exercise-scope="Review3_Page1_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall">
        {/* HEADER */}
        <ExerciseHeader isReview sectionLetter="B" title={<>
          
          Read and circle the correct expression. Cross out (<span className="text-[#FF0000]">✗</span>) the wrong one.
        </>} subTitle="Read all choices first, then select only the option that makes the expression or sentence correct." />

        {/* QUESTIONS */}
        <div style={{
        display: "flex",
        flexWrap: "wrap",
        columnGap: "16px",
        rowGap: "40px",
        marginTop: "30px"
      }}>
          {questions.map((q, i) => <div key={i} style={{
          background: "#ddd7df",
          borderRadius: "12px",
          padding: "14px 18px",
          minWidth: i === 3 ? "500px" : "250px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          fontSize: "18px",
          position: "relative"
        }}>
              {/* NUMBER */}
              <span style={{
            fontWeight: "bold"
          }}>
                {i + 1}
              </span>

              {/* LEFT */}
              {renderOption(q.left, "left", answers[i] === "left", answers[i] === "right", i)}

              {/* RIGHT */}
              {renderOption(q.right, "right", answers[i] === "right", answers[i] === "left", i)}

              {/* ❌ ERROR */}
              {errors[i] && <span style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            width: "22px",
            height: "22px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "bold",
            border: "2px solid white"
          }}>
                  ✕
                </span>}
            </div>)}
        </div>

        {/* BUTTONS */}
        <div className="action-buttons-container">
          <button {...activationKeys} ref={resetButtonRef} aria-label={"Start Again"} type={"button"} className="try-again-button" onClick={handleReset}>
            Start Again ↻
          </button>

          <button {...activationKeys} aria-label={"Show Answer"} type={"button"} className="show-answer-btn" onClick={handleShow}>
            Show Answer
          </button>

          <button {...activationKeys} style={{
          cursor: locked ? "not-allowed" : "pointer"
        }} disabled={locked} aria-label={"Check Answer"} type={"button"} className="check-button2" onClick={handleCheck}>
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>;
};
export default Review3_Page1_Q2;
