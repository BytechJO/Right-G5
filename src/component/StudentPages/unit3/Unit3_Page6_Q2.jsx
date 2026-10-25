import clip0 from "../../../assets/audio/ClassBook/U3/Page 27 - E/Item_001_Sally_is_graduating_from_high_school_tomorrow._Every_graduate_is_going_t.mp3";
import clip1 from "../../../assets/audio/ClassBook/U3/Page 27 - E/Item_002_Sally_doesn't_have_a_nice_dress_to_wear._She_decides_to_go_shopping_at_t.mp3";
import clip2 from "../../../assets/audio/ClassBook/U3/Page 27 - E/Item_003_There_are_many_stores_to_choose_from._Sally_is_confused._She_goes_into_a.mp3";
import clip3 from "../../../assets/audio/ClassBook/U3/Page 27 - E/Item_004_She_finds_a_beautiful_pink_and_white_shirt_and_skirt._Sally_is_happy_wit.mp3";
import clip4 from "../../../assets/audio/ClassBook/U3/Page 27 - E/Item_005_Now,_she_is_ready_for_her_graduation_ceremony.mp3";
import clip5 from "../../../assets/audio/ClassBook/U3/Page 27 - E/Item_006_Some_graduates_are_going_to_the_ceremony.mp3";
import clip6 from "../../../assets/audio/ClassBook/U3/Page 27 - E/Item_007_Sally_has_a_nice_dress_to_wear.mp3";
import clip7 from "../../../assets/audio/ClassBook/U3/Page 27 - E/Item_008_true.mp3";
import clip8 from "../../../assets/audio/ClassBook/U3/Page 27 - E/Item_009_false.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import { SentenceGroup } from "./SentenceAudio";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 27/Asset 19.svg";
import graduationArtwork from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 27/Asset 19.svg?raw";
const graduationPhoto =
  graduationArtwork.match(/data:image\/(?:png|jpe?g);base64,[^"'\s]+/)?.[0] ||
  img; // حط صورتك
import grammer_u1 from "../../../assets/audio/ClassBook/U3/PG 27/pg27.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
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

const Unit3_Page6_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");

  const questions = [
    "Some graduates are going to the ceremony.",
    "Sally has a nice dress to wear.",
    "Sally goes shopping at the mall.",
    "Sally is confused by the many stores.",
    "She goes into a big shop at the corner.",
  ];

  const correct = ["false", "false", "true", "true", "false"];
  const captions = [
    {
      start: 0.159,
      end: 34.48,
      text: "Page 27, write activities. Exercise E. Read, listen, and circle true or false. Sally is graduating from high school tomorrow. Every graduate is going to the graduation ceremony. Sally doesn't have a nice dress to wear. She decides to go shopping at the mall near her house. There are many stores to choose from. Sally is confused. She goes into a small shop at the corner. She finds a beautiful pink and white shirt and skirt. Sally is happy with her new outfit. Now she is ready for her graduation ceremony.",
    },
  ];
  const [answers, setAnswers] = useState(Array(5).fill(""));
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  // ✅ CHECK
  const handleCheck = () => {
    if (locked) return;

    audio.stop();

    if (locked) return;

    if (answers.some((a) => !a)) {
      (setAnnouncement(
        String("Please select all answers.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Please select all answers."));
      return;
    }

    let correctCount = 0;

    const res = answers.map((a, i) => {
      const ok = a === correct[i];
      if (ok) correctCount++;
      return ok;
    });

    setResult(res);

    const total = correct.length;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
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

  // 👀 SHOW
  const handleShow = () => {
    audio.stop();
    setAnswers([...correct]);
    setResult(correct.map(() => true));
    setLocked(true);
    setAnnouncement("Correct answers shown and locked.");
  };

  // 🔄 RESET
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers, feedback and locks cleared.");

    setAnswers(Array(5).fill(""));
    setResult([]);
    setLocked(false);
  };

  return (
    <div
      data-exercise-scope="Unit3_Page6_Q2.jsx"
      className="flex flex-col items-center p-8"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit3_Page6_Q2.jsx"] input:focus-visible,[data-exercise-scope="Unit3_Page6_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Unit3_Page6_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}

.u3q6-content { width:100%; min-width:0; }
.u3q6-passage-card { display:grid; grid-template-columns:minmax(0,1fr) 34%; align-items:center; gap:14px; margin:12px 20px 16px 32px; padding:14px 8px 8px; border:1px solid #713083; border-radius:12px; background:#d4c6da; color:#000; box-sizing:border-box; }
.u3q6-passage-text { min-width:0; font-family:Arial,Helvetica,sans-serif; font-size:clamp(12px,2.25cqi,18px); font-weight:400; line-height:1.5; text-indent:12px; }
.u3q6-photo { display:block; width:100%; height:auto; min-width:0; aspect-ratio:1.1; object-fit:cover; border-radius:11px; }
.u3q6-questions { margin:0 20px 0 32px; padding-right:12px; box-sizing:border-box; font-family:Arial,Helvetica,sans-serif; font-size:clamp(12px,2.25cqi,18px); line-height:1.5; color:#000; }
.u3q6-row { position:relative; margin-bottom:10px; display:grid; grid-template-columns:minmax(0,1fr) clamp(56px,15cqi,104px) clamp(56px,15cqi,104px); align-items:center; min-width:0; column-gap:0; min-height:22px; }
.u3q6-question-text { display:grid; grid-template-columns:14px minmax(0,1fr); column-gap:6px; align-items:baseline; min-width:0; }
.u3q6-question-text > .font-bold { margin-right:0; }
.u3q6-choices { display:contents; }
.u3q6-choices > [role="button"] { position:relative; justify-self:center; box-sizing:border-box; min-width:46px; max-width:100%; padding:0 5px; line-height:1.3; text-align:center; }
.u3q6-wrong { pointer-events:none; }
.u3q6-actions { position:static; left:auto; right:auto; bottom:auto; transform:none; width:auto; display:flex; flex-wrap:wrap; justify-content:center; gap:12px; margin-top:24px; max-width:100%; }
.u3q6-actions > button { max-width:100%; }
@container unit3-reading-true-false (max-width:480px) {
 .u3q6-passage-card { grid-template-columns:minmax(0,1fr); margin:12px 0 16px; padding:12px; gap:12px; }
 .u3q6-passage-text { font-size:14px; line-height:1.55; }
 .u3q6-photo { width:min(100%,220px); justify-self:center; }
 .u3q6-questions { margin:0; padding-right:12px; font-size:14px; }
 .u3q6-row { grid-template-columns:minmax(0,1fr) 54px 54px; row-gap:4px; padding-block:4px; }
 .u3q6-choices > [role="button"] { min-height:30px; display:inline-flex; align-items:center; justify-content:center; }
}
@container unit3-reading-true-false (max-width:280px) {
 .u3q6-row { grid-template-columns:repeat(2,minmax(0,1fr)); padding-block:6px; }
 .u3q6-question-text { grid-column:1 / -1; }
 .u3q6-choices > [role="button"] { min-height:34px; }
 .u3q6-actions > button { white-space:normal; }
}



`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>

      <div className="div-forall mb-10" style={{ gap: "30px" }}>
        <ExerciseHeader
          sectionLetter="E"
          title={
            <>
              Read, listen, and circle{" "}
              <span className="text-blue-500">true</span> or{" "}
              <span className="text-blue-500">false</span>.
            </>
          }
          subTitle="Read or listen to each item carefully, then choose true or false only after checking the key detail."
        />
        <QuestionAudioPlayer
          pageId="sb_unit3_page6_q2"
          src={grammer_u1}
          captions={captions}
          stopAtSecond={7.4}
        />
        {/* BOX */}
        <div className="u3q6-passage-card">
          <SentenceGroup
            label={
              "Hear the complete passage about Sally and her graduation ceremony"
            }
            src={[clip0, clip1, clip2, clip3, clip4]}
            id={"passage"}
            audio={audio}
            className="u3q6-passage-text"
          >
            Sally is graduating from high school tomorrow. Every graduate is
            going to the graduation ceremony. Sally doesn’t have a nice dress to
            wear. She decides to go shopping at the mall near her house. There
            are many stores to choose from. Sally is confused. She goes into a
            small shop at the corner. She finds a beautiful pink and white shirt
            and skirt. Sally is happy with her new outfit. Now, she is ready for
            her graduation ceremony.
          </SentenceGroup>
          <img
            className="u3q6-photo"
            src={graduationPhoto}
            alt="Four graduates wearing caps and gowns."
          />
        </div>

        {/* QUESTIONS */}
        <div className="u3q6-questions">
          {questions.map((q, i) => (
            <div key={i} className="u3q6-row">
              <SentenceGroup
                className="u3q6-question-text"
                label={`Hear question ${i + 1}: ${q}`}
                src={[clip5, clip6][i]}
                id={`sentence-${i}`}
                audio={audio}
              >
                <span className="font-bold mr-3">{i + 1}</span>
                {q}
              </SentenceGroup>

              <div className="u3q6-choices">
                {/* TRUE */}
                <span
                  style={{
                    backgroundColor:
                      answers[i] === "true" ? "#dbeafe" : undefined,
                    borderColor:
                      answers[i] === "true" && (locked || result[i] === true)
                        ? "#16a34a"
                        : undefined,
                  }}
                  {...activationKeys}
                  aria-disabled={locked || result[i] === true}
                  aria-pressed={answers[i] === "true"}
                  aria-label={`Question ${i + 1}, true: ${q}`}
                  data-choice={true}
                  tabIndex={0}
                  role={"button"}
                  onClick={() => {
                    audio.play(`choice-${i}-true`, clip7);

                    if (locked || result[i] === true) return;

                    const updated = [...answers];
                    updated[i] = "true";
                    setAnswers(updated);

                    setResult((prev) => {
                      const copy = [...prev];
                      copy[i] = undefined;
                      return copy;
                    });
                  }}
                  className={`cursor-pointer px-2 rounded-full border-2
                      ${
                        result[i] === false && answers[i] === "true"
                          ? "border-red-500"
                          : answers[i] === "true"
                            ? "border-[#6D2980]"
                            : "border-transparent"
                      }`}
                >
                  true
                  {audio.activeId === `choice-${i}-true` && <AudioSpeaker />}
                </span>

                {/* FALSE */}
                <span
                  style={{
                    backgroundColor:
                      answers[i] === "false" ? "#dbeafe" : undefined,
                    borderColor:
                      answers[i] === "false" && (locked || result[i] === true)
                        ? "#16a34a"
                        : undefined,
                  }}
                  {...activationKeys}
                  aria-disabled={locked || result[i] === true}
                  aria-pressed={answers[i] === "false"}
                  aria-label={`Question ${i + 1}, false: ${q}`}
                  data-choice={true}
                  tabIndex={0}
                  role={"button"}
                  onClick={() => {
                    audio.play(`choice-${i}-false`, clip8);

                    if (locked || result[i] === true) return;

                    const updated = [...answers];
                    updated[i] = "false";
                    setAnswers(updated);

                    setResult((prev) => {
                      const copy = [...prev];
                      copy[i] = undefined;
                      return copy;
                    });
                  }}
                  className={`cursor-pointer px-2 rounded-full border-2
                    ${
                      result[i] === false && answers[i] === "false"
                        ? "border-red-500 "
                        : answers[i] === "false"
                          ? "border-[#6D2980]"
                          : "border-transparent"
                    }`}
                >
                  false
                  {audio.activeId === `choice-${i}-false` && <AudioSpeaker />}
                </span>

                {/* ❌ */}
                {result[i] === false && (
                  <span
                    className="u3q6-wrong"
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "-8px",
                      transform: "translateY(-50%)",
                      width: "20px",
                      height: "20px",
                      background: "#ef4444",
                      color: "white",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: "bold",
                      border: "2px solid white",
                      boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                      pointerEvents: "none",
                      zIndex: 3,
                    }}
                  >
                    ✕
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="action-buttons-container mt-6">
          <button
            type="button"
            {...activationKeys}
            aria-label="Start Again"
            ref={resetButtonRef}
            className="try-again-button"
            onClick={handleReset}
          >
            Start Again ↻
          </button>

          <button
            type="button"
            {...activationKeys}
            aria-label="Show Answer"
            onClick={handleShow}
            className="show-answer-btn"
          >
            Show Answer
          </button>

          <button
            type="button"
            {...activationKeys}
            aria-label="Check Answer"
            disabled={locked}
            style={{ cursor: locked ? "not-allowed" : "pointer" }}
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

export default Unit3_Page6_Q2;
