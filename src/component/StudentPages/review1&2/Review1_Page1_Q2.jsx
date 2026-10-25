import clip0 from "../../../assets/audio/ClassBook/U2/Page 16 - B/Item_001_hh-ou!.mp3";
import clip1 from "../../../assets/audio/ClassBook/U2/Page 16 - B/Item_002_lelf_scelep.mp3";
import clip2 from "../../../assets/audio/ClassBook/U2/Page 16 - B/Item_003_ghtir_yawa.mp3";
import clip3 from "../../../assets/audio/ClassBook/U2/Page 16 - B/Item_004_no_neo_dise.mp3";
import clip4 from "../../../assets/audio/ClassBook/U2/Page 16 - B/Item_005_ohw_od_ouy_ownk.mp3";
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


const Review1_Page1_Q2 = () => {
 const audio=useExerciseAudio();
  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  const questions = [
    { scrambled: "hh-ou!", correct: "uh-oh!" },
    { scrambled: "lelf scelep", correct: "fell asleep" },
    { scrambled: "ghtir yawa", correct: "right away" },
    { scrambled: "no neo dise", correct: "on one side" },
    { scrambled: "ohw od ouy ownk?", correct: "how do you know?" },
  ];

  const normalize = normalizeAnswer;
  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;
    if (locked || result[i] === true) return;

    const updated = [...answers];
    updated[i] = value;
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
      setAnnouncement("Please complete all fields.");
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;

    const res = answers.map((answer, i) => {
      const ok = normalize(answer) === normalize(questions[i].correct);
      if (ok) correctCount++;
      return ok;
    });

    setResult(res);

    const total = questions.length;
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
    setAnswers(questions.map((q) => q.correct));
    setResult((questions.map(q=>q.correct)).map(()=>true));
    setLocked(true);
  };

  const handleReset = () => {
 audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", ""]);
    setResult([]);
    setLocked(false);
  };

  const input = (i, width = "w-[260px]") => (
    <span className="relative inline-block ml-2">
      <input placeholder="Correct expression" style={{borderBottom:locked || result[i] === true ? "2px solid #16a34a" : result[i] === false ? "2px solid #ef4444" : undefined}} {...fieldKeys} aria-label={`Expression ${i + 1}, unscramble: ${questions[i].scrambled}`} title={`Expression ${i + 1}, unscramble: ${questions[i].scrambled}`}
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`border-b outline-none text-center text-[#6D2980] font-bold bg-transparent ${width}
          ${result[i] === false ? "border-red-500" : "border-black"}
        `}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
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
          }}
        >
          ✕
        </span>
      )}
    </span>
  );

  return (
    <div data-exercise-scope="Review1_Page1_Q2.jsx" className="p-8 flex flex-col items-center">
<AudioFeedback audio={audio} />
<style>{`[data-exercise-scope="Review1_Page1_Q2.jsx"] input:focus-visible,[data-exercise-scope="Review1_Page1_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Review1_Page1_Q2.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <div className="div-forall">
        <ExerciseHeader isReview sectionLetter="B" title={<>Unscramble and write the expression.</>} subTitle="Say the correct expression or sentence first, then reorder the words and check capitalization and punctuation." />

        <div className="grid grid-cols-2 gap-x-16 gap-y-20 text-[20px]">
          <div>
            <span className="font-bold mr-4">1</span>
            <AudioText audio={audio} id="expression-0" src={clip0} label="Hear expression 1">{questions[0].scrambled}</AudioText>
            {input(0)}
          </div>

          <div>
            <span className="font-bold mr-4">2</span>
            <AudioText audio={audio} id="expression-1" src={clip1} label="Hear expression 2">{questions[1].scrambled}</AudioText>
            {input(1)}
          </div>

          <div>
            <span className="font-bold mr-4">3</span>
            <AudioText audio={audio} id="expression-2" src={clip2} label="Hear expression 3">{questions[2].scrambled}</AudioText>
            {input(2)}
          </div>

          <div>
            <span className="font-bold mr-4">4</span>
            <AudioText audio={audio} id="expression-3" src={clip3} label="Hear expression 4">{questions[3].scrambled}</AudioText>
            {input(3)}
          </div>

          <div className="col-span-2">
            <span className="font-bold mr-4">5</span>
            <AudioText audio={audio} id="expression-4" src={clip4} label="Hear expression 5">{questions[4].scrambled}</AudioText>
            {input(4, "w-[470px]")}
          </div>
        </div>

        <div className="action-buttons-container mt-8">
          <button type="button" aria-label="Start Again" {...activationKeys} ref={resetButtonRef} className="try-again-button" onClick={handleReset}>
            Start Again ↻
          </button>

          <button type="button" aria-label="Show Answer" {...activationKeys} className="show-answer-btn" onClick={handleShow}>
            Show Answer
          </button>

          <button type="button" aria-label="Check Answer" {...activationKeys} disabled={locked} style={{cursor:locked ? "not-allowed":"pointer"}} className="check-button2" onClick={handleCheck}>
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review1_Page1_Q2;
