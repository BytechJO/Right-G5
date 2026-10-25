import clip0 from "../../../assets/audio/ClassBook/U2/Page 19 - F/Item_001_Mary_is_a_good_teacher._She_works_at_the_school_in_our_neighborhood.mp3";
import clip1 from "../../../assets/audio/ClassBook/U2/Page 19 - F/Item_002_I_think_the_repairman_fixed_the_computer._The_computer_was_broken.mp3";
import clip2 from "../../../assets/audio/ClassBook/U2/Page 19 - F/Item_003_We_went_to_the_restaurant._The_restaurant_had_just_opened_yesterday.mp3";
import { useExerciseAudio } from "../unit2/useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "../unit2/ExerciseAudioText";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
const activationKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault(); event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); event.stopPropagation(); }
  },
};
const fieldKeys = {
  onKeyDown: (event) => { if (event.key === "Enter" || event.key === " ") event.stopPropagation(); },
  onKeyUp: (event) => { if (event.key === "Enter" || event.key === " ") event.stopPropagation(); },
};
const normalizeAnswer = (text) => text.normalize("NFKC").toLowerCase()
  .replace(/[‘’']/g, "")
  .replace(/[.,!?;:…“”"–—-]/g, " ")
  .replace(/\s+/g, " ").trim();


const Review2_Page2_Q3 = () => {
 const audio=useExerciseAudio();
  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState(["", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  const correct = [
    "Mary, who is a good teacher, works at the school in our neighborhood.",
    "I think the repairman fixed the computer that was broken.",
    "We went to the restaurant that had just opened yesterday.",
  ];

  const normalize = normalizeAnswer;

  const handleChange = (i, val) => {
    if (locked || result[i] === true) return;
    if (locked || result[i] === true) return;

    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  const handleCheck = () => {
    if (locked) return;
 audio.stop();
    setAnnouncement("Answers checked. Correct answers stay locked; incorrect answers can be changed.");

    if (answers.some((a) => !a.trim())) {
      setAnnouncement("Complete all answers.");
      ValidationAlert.info("Complete all answers.");
      return;
    }

    let correctCount = 0;

    const res = answers.map((a, i) => {
      const ok = normalize(a) === normalize(correct[i]);
      if (ok) correctCount++;
      return ok;
    });

    setResult(res);

    const msg = `Score: ${correctCount} / 3`;

    if (correctCount === 3) {
      setLocked(true);
      resetButtonRef.current?.focus({preventScroll:true});
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const handleShow = () => {
 audio.stop();
    setAnnouncement("Correct answers shown and locked.");
    setAnswers(correct);
    setResult((correct).map(()=>true));
    setLocked(true);
  };

  const handleReset = () => {
 audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", ""]);
    setResult([]);
    setLocked(false);
  };

  const input = (i) => (
    <span style={{position:"relative "}}>
      <input placeholder="Combine the sentences" {...fieldKeys} aria-label={["Item 1, combine the two sentences about Mary and the school using a relative clause.","Item 2, combine the two sentences about the repairman and the broken computer using a relative clause.","Item 3, combine the two sentences about the newly opened restaurant using a relative clause."][i]} title={["Item 1, combine the two sentences about Mary and the school using a relative clause.","Item 2, combine the two sentences about the repairman and the broken computer using a relative clause.","Item 3, combine the two sentences about the newly opened restaurant using a relative clause."][i]}
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        disabled={locked || result[i] === true}
        style={{
          width: "100%",
          outline: "none",
          fontSize: "18px",
          fontWeight: "bold",
          color: "#6D2980",
          background: "transparent",
        borderBottom:locked || result[i] === true ? "2px solid #16a34a" : result[i] === false ? "2px solid #ef4444" : undefined}}
      />
      {result[i] === false && answers[i] && (
        <span
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
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
    </span>
  );

  return (
    <div data-exercise-scope="Review2_Page2_Q3.jsx" className="flex flex-col items-center p-[30px]">
<AudioFeedback audio={audio} />
<style>{`[data-exercise-scope="Review2_Page2_Q3.jsx"] input:focus-visible,[data-exercise-scope="Review2_Page2_Q3.jsx"] textarea:focus-visible,[data-exercise-scope="Review2_Page2_Q3.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <div className="div-forall">
        {/* HEADER */}
        <ExerciseHeader isReview sectionLetter="F" title={<>Make one sentence into a relative clause, and then rewrite the
          sentence.</>} subTitle="Use the prompt and grammar pattern to write a complete sentence, then reread it for meaning, tense, and punctuation." />

        {/* QUESTIONS */}
        <div className="flex flex-col gap-15 text-[20px]">
          {/* 1 */}
          <div>
            <div>
              <span className="font-bold mr-3">1</span><AudioText audio={audio} id="question-0-0" src={clip0} label="Hear item 1">
              Mary is a good teacher. She works at the school in our
              neighborhood.
            </AudioText></div>

            <div className="ml-[30px] mt-10">{input(0)}</div>
          </div>

          {/* 2 */}
          <div>
            <div>
              <span className="font-bold mr-3">2</span><AudioText audio={audio} id="question-1-1" src={clip1} label="Hear item 2">I think the repairman
              fixed the computer. The computer was broken.
            </AudioText></div>

            <div className="ml-[30px] mt-2">{input(1)}</div>
          </div>

          {/* 3 */}
          <div>
            <div>
              <span className="font-bold mr-3">3</span><AudioText audio={audio} id="question-2-2" src={clip2} label="Hear item 3">
              We went to the restaurant. The restaurant had just opened
              yesterday.
            </AudioText></div>

            <div className="ml-[30px] mt-2">{input(2)}</div>
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container"><button type="button" {...activationKeys} aria-label="Start Again" ref={resetButtonRef} onClick={handleReset} className="try-again-button">Start Again ↻</button><button type="button" {...activationKeys} aria-label="Show Answer" onClick={handleShow} className="show-answer-btn swal-continue">Show Answer</button><button type="button" {...activationKeys} aria-label="Check Answer" onClick={handleCheck} className="check-button2" disabled={locked} style={{cursor:locked?"not-allowed":"pointer"}}>Check Answer ✓</button></div>
    </div>
  );
};

export default Review2_Page2_Q3;
