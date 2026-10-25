import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import { SentenceGroup } from "./SentenceAudio";
import clip0 from "../../../assets/audio/ClassBook/U4/Page 33 - D/Item_001_No,_he_rarely_goes_skiing_in_the_winter.mp3";
import clip1 from "../../../assets/audio/ClassBook/U4/Page 33 - D/Item_002_No,_she_usually_cooks_Italian_food_for_the_family.mp3";
import clip2 from "../../../assets/audio/ClassBook/U4/Page 33 - D/Item_003_Yes,_I_sometimes_like_to_shop_at_Riverside_Mall.mp3";
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
const Unit4_Page6_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const correctAnswers = [
    "Does he often go skiing in the winter?",
    "Does she often cook Mexican food for the family?",
    "Do you sometimes like to shop at malls?",
  ];
  const answerText = [
    "No, he rarely goes skiing in the winter.",
    "No, she usually cooks Italian food for the family.",
    "Yes, I sometimes like to shop at Riverside Mall.",
  ];
  const [answers, setAnswers] = useState(["", "", ""]);
  const [errors, setErrors] = useState([false, false, false]);
  const [correctLocked, setCorrectLocked] = useState([false, false, false]);
  const [locked, setLocked] = useState(false);

  // normalize
  const normalize = normalizeAnswer;

  // update
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
      const correct = normalize(a) === normalize(correctAnswers[i]);
      if (correct) score++;
      return !correct;
    });
    const updatedLocked = answers.map((a, i) => {
      return normalize(a) === normalize(correctAnswers[i]);
    });
    setErrors(newErrors);
    setCorrectLocked(updatedLocked);
    const total = correctAnswers.length;
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
    setAnswers(correctAnswers);
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
      data-exercise-scope="Unit4_Page6_Q1.jsx"
      className="flex justify-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit4_Page6_Q1.jsx"] input:focus-visible,[data-exercise-scope="Unit4_Page6_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="Unit4_Page6_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
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
          sectionLetter="D"
          title={<>Write a question for each answer.</>}
          subTitle="Use the prompt and grammar pattern to write a complete sentence, then reread it for meaning, tense, and punctuation."
        />

        {/* QUESTIONS */}
        <div className="flex flex-col gap-10 mt-6">
          {[0, 1, 2].map((i) => (
            <SentenceGroup
              label={`Hear answer ${i + 1}: ${answerText[i]}`}
              src={[clip0, clip1, clip2][i]}
              id={`sentence-${i}`}
              audio={audio}
              key={i}
            >
              {/* TOP */}
              <div className="flex items-start gap-5">
                {/* NUMBER */}
                <span className="font-bold text-[18px] mt-2 w-5">{i + 1}</span>

                {/* INPUT */}
                <div className="relative flex-1">
                  <input
                    style={{
                      ...(correctLocked[i]
                        ? {
                            borderBottomColor: "#16a34a",
                          }
                        : {}),
                    }}
                    {...fieldKeys}
                    placeholder={"Question"}
                    aria-invalid={!!errors[i]}
                    title={`Item ${i + 1}, write a question for: ${answerText[i]}`}
                    aria-label={`Item ${i + 1}, write a question for: ${answerText[i]}`}
                    type="text"
                    value={answers[i]}
                    disabled={locked || correctLocked[i]}
                    onChange={(e) => handleChange(i, e.target.value)}
                    className={`
                      w-full
                      bg-transparent
                      outline-none
                      border-b
                      text-[20px]
                      pb-1
                      font-semibold
                      text-[#6D2980]
                      ${errors[i] ? "border-red-500" : "border-black"}
                    `}
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
              </div>

              {/* ANSWER TEXT */}
              <div className="ml-10 mt-6 text-[18px]">{answerText[i]}</div>
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
export default Unit4_Page6_Q1;
