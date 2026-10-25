import { SentenceGroup } from "./SentenceAudio";
import clip0 from "../../../assets/audio/ClassBook/U2/Page 15 - D/Item_001_The_clown_(unicycle_who_the_rode)_could_also_juggle.mp3";
import clip1 from "../../../assets/audio/ClassBook/U2/Page 15 - D/Item_002_We_went_down_the_giant_slide_(meters_was_30_high_that).mp3";
import clip2 from "../../../assets/audio/ClassBook/U2/Page 15 - D/Item_003_I_liked_the_clown_(chased_that_by_was_bull_the).mp3";
import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
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

const Unit2_Page6_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState(["", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  // ✅ الإجابات الصح
  const correct = [
    "The clown who rode the unicycle could also juggle",
    "We went down the giant slide that was thirty feet high",
    "I liked the clown that was chased by the bull",
  ];

  const handleChange = (i, val) => {
    if (locked || result[i] === true) return;
    if (locked || result[i] === true) return; // 🔒 لا تعدل الصح

    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);

    // 🔥 امسح الخطأ
    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  // ====================
  // ✅ CHECK
  // ====================
  const handleCheck = () => {
    if (locked) return;
    audio.stop();
    setAnnouncement(
      "Answers checked. Correct answers stay locked; incorrect answers can be changed.",
    );

    if (answers.some((a) => !a.trim())) {
      setAnnouncement("Please complete all fields.");
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;

    const res = answers.map((a, i) => {
      const normalize = normalizeAnswer;

      const ok = normalize(a) === normalize(correct[i]);

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
      setLocked(true);
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // ====================
  // 👀 SHOW
  // ====================
  const handleShow = () => {
    audio.stop();
    setAnnouncement("Correct answers shown and locked.");
    setAnswers(correct);
    setResult(correct.map(() => true));
    setLocked(true);
  };

  // ====================
  // 🔄 RESET
  // ====================
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", ""]);
    setResult([]);
    setLocked(false);
  };

  // 🎯 input
  const input = (i) => (
    <div className="relative mt-5">
      <input placeholder="Rewrite the sentence"
        style={{
          borderBottom:
            locked || result[i] === true
              ? "2px solid #16a34a"
              : result[i] === false
                ? "2px solid #ef4444"
                : undefined,
        }}
        {...fieldKeys}
        aria-label={["Item 1, rewrite the complete sentence about the clown and the unicycle, ordering the relative clause.","Item 2, rewrite the complete sentence about the giant slide, ordering the relative clause.","Item 3, rewrite the complete sentence about the clown chased by the bull, ordering the relative clause."][i]}
        title={["Item 1, rewrite the complete sentence about the clown and the unicycle, ordering the relative clause.","Item 2, rewrite the complete sentence about the giant slide, ordering the relative clause.","Item 3, rewrite the complete sentence about the clown chased by the bull, ordering the relative clause."][i]}
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        disabled={locked || result[i] === true}
        className={`w-full border-b-1 outline-none text-[#6D2980] font-bold
          ${result[i] === false ? "border-red-500" : "border-black"}
        `}
      />

      {/* ❌ */}
      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-5px",
            right: "0",
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
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        >
          ✕
        </span>
      )}
    </div>
  );

  return (
    <div
      data-exercise-scope="Unit2_Page6_Q2.jsx"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit2_Page6_Q2.jsx"] input:focus-visible,[data-exercise-scope="Unit2_Page6_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Unit2_Page6_Q2.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="D"
          title={
            <>
              Put the relative clauses in the right order. Then rewrite the
              sentences.
            </>
          }
          subTitle="Task 1: Arrange the relative-clause parts in the correct order first. Task 2: Read the completed idea, then rewrite the whole sentence carefully."
        />

        <div className="text-[20px] leading-9 flex flex-col gap-10 mt-12">
          {/* 1 */}
          <SentenceGroup audio={audio} id="sentence-0" src={clip0} label="Hear the sentence: 1 The clown (unicycle / who / the / rode) could also juggle. blank">
            <span className="font-bold mr-4">1</span>
            
              The clown
            {" "}
            <span className="text-[#12C8F9]">
              
                (unicycle / who / the / rode)
              
            </span>{" "}
            
              could also juggle.
            
            {input(0)}
          </SentenceGroup>

          {/* 2 */}
          <SentenceGroup audio={audio} id="sentence-1" src={clip1} label="Hear the sentence: 2 We went down the giant slide (meters / was / 30 / high / that) . blank">
            <span className="font-bold mr-4">2</span>
            
              We went down the giant slide
            {" "}
            <span className="text-[#12C8F9]">
              
                (meters / was / 30 / high / that)
              
            </span>
            .{input(1)}
          </SentenceGroup>

          {/* 3 */}
          <SentenceGroup audio={audio} id="sentence-2" src={clip2} label="Hear the sentence: 3 I liked the clown (chased / that / by / was / bull / the) . blank">
            <span className="font-bold mr-4">3</span>
            
              I liked the clown
            {" "}
            <span className="text-[#12C8F9]">
              
                (chased / that / by / was / bull / the)
              
            </span>
            .{input(2)}
          </SentenceGroup>
        </div>

        <div className="action-buttons-container mt-6">
          <button
            type="button"
            aria-label="Start Again"
            {...activationKeys}
            ref={resetButtonRef}
            className="try-again-button"
            onClick={handleReset}
          >
            Start Again ↻
          </button>

          <button
            type="button"
            aria-label="Show Answer"
            {...activationKeys}
            onClick={handleShow}
            className="show-answer-btn"
          >
            Show Answer
          </button>

          <button
            type="button"
            aria-label="Check Answer"
            {...activationKeys}
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

export default Unit2_Page6_Q2;
