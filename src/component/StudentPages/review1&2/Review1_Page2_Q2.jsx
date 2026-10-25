import clip0 from "../../../assets/audio/ClassBook/U2/Page 17 - E/Item_001_How_kilometers_can_you_run.mp3";
import clip1 from "../../../assets/audio/ClassBook/U2/Page 17 - E/Item_002_How_syrup_can_I_pour_on_my_pancakes.mp3";
import clip2 from "../../../assets/audio/ClassBook/U2/Page 17 - E/Item_003_How_pancakes_do_you_eat.mp3";
import clip3 from "../../../assets/audio/ClassBook/U2/Page 17 - E/Item_004_How_water_shall_we_bring.mp3";
import { useExerciseAudio } from "../unit2/useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "../unit2/ExerciseAudioText";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 17/SVG/Asset 21.svg";
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

const Review1_Page2_Q2 = () => {
 const audio=useExerciseAudio();
  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  const correct = ["many", "much", "many", "much"];

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

  // ✅ CHECK
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

    const res = answers.map((a, i) => {
      const ok = normalize(a) === correct[i];
      if (ok) correctCount++;
      return ok;
    });

    setResult(res);

    const total = correct.length;

    const msg = `Score: ${correctCount} / ${total}`;

    
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

  // 👀 SHOW
  const handleShow = () => {
 audio.stop();
    setAnnouncement("Correct answers shown and locked.");
    setAnswers(correct);
    setResult((correct).map(()=>true));
    setLocked(true);
  };

  // 🔄 RESET
  const handleReset = () => {
 audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", ""]);
    setResult([]);
    setLocked(false);
  };

  // 🎯 input
  const input = (i, width = "250px") => (
    <span style={{ position: "relative", margin: "0 6px" }}>
      <input placeholder="much / many" {...fieldKeys} aria-label={["Item 1, much or many: How blank kilometers can you run?","Item 2, much or many: How blank syrup can I pour on my pancakes?","Item 3, much or many: How blank pancakes do you eat?","Item 4, much or many: How blank water shall we bring?"][i]} title={["Item 1, much or many: How blank kilometers can you run?","Item 2, much or many: How blank syrup can I pour on my pancakes?","Item 3, much or many: How blank pancakes do you eat?","Item 4, much or many: How blank water shall we bring?"][i]}
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        disabled={locked || result[i] === true}
        style={{
          outline: "none",
          textAlign: "center",
          width: width,
          fontSize: "18px",
          fontWeight: "bold",
          color: "#6D2980",
          background: "transparent",
        borderBottom:locked || result[i] === true ? "2px solid #16a34a" : result[i] === false ? "2px solid #ef4444" : undefined}}
      />

      {result[i] === false && (
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
    <div data-exercise-scope="Review1_Page2_Q2.jsx" style={{ padding: "30px", display: "flex", justifyContent: "center" }}>
<AudioFeedback audio={audio} />
<style>{`[data-exercise-scope="Review1_Page2_Q2.jsx"] input:focus-visible,[data-exercise-scope="Review1_Page2_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Review1_Page2_Q2.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <div className="div-forall">
        <ExerciseHeader isReview sectionLetter="E" title={<>Write the correct word <span className="text-[#31B7F5]">
            much
          </span> or <span className="text-[#31B7F5]">many</span>.</>} subTitle="Use the picture, definition, chart, or grammar clue, then complete each answer before checking." />

        {/* المحتوى */}
        <div style={{ display: "flex", gap: "30px" }}>
          {/* LEFT QUESTIONS */}
          <div
            style={{
              flex: 1,
              fontSize: "18px",
              lineHeight: "2",
              display: "flex",
              flexDirection: "column",
              gap: "60px", // 👈 هذا الجاب
            }}
          >
            <div>
              <span style={{ fontWeight: "bold", marginRight: "10px" }}>1</span><AudioText audio={audio} id="fragment-0-0" src={clip0} label="Hear item 1">
              How </AudioText>{input(0)}<AudioText audio={audio} id="fragment-0-1" src={clip0} label="Hear item 1"> kilometers can you run?
            </AudioText></div>

            <div>
              <span style={{ fontWeight: "bold", marginRight: "10px" }}>2</span><AudioText audio={audio} id="fragment-1-2" src={clip1} label="Hear item 2">
              How </AudioText>{input(1)}<AudioText audio={audio} id="fragment-1-3" src={clip1} label="Hear item 2"> syrup can I pour on my pancakes?
            </AudioText></div>

            <div>
              <span style={{ fontWeight: "bold", marginRight: "10px" }}>3</span><AudioText audio={audio} id="fragment-2-4" src={clip2} label="Hear item 3">
              How </AudioText>{input(2)}<AudioText audio={audio} id="fragment-2-5" src={clip2} label="Hear item 3"> pancakes do you eat?
            </AudioText></div>

            <div>
              <span style={{ fontWeight: "bold", marginRight: "10px" }}>4</span><AudioText audio={audio} id="fragment-3-6" src={clip3} label="Hear item 4">
              How </AudioText>{input(3)}<AudioText audio={audio} id="fragment-3-7" src={clip3} label="Hear item 4"> water shall we bring?
            </AudioText></div>
          </div>

          {/* RIGHT IMAGE */}
          <div>
            <img alt="Children running in a race."
              src={img1}
              style={{
                width: "250px",
                height: "auto",
                objectFit: "cover",
                padding: "4px",
              }}
            />
          </div>
        </div>
        <div className="action-buttons-container">
          <button type="button" aria-label="Start Again" {...activationKeys} ref={resetButtonRef} className="try-again-button" onClick={handleReset}>
            Start Again ↻
          </button>

          <button type="button" aria-label="Show Answer" {...activationKeys} onClick={handleShow} className="show-answer-btn">
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

export default Review1_Page2_Q2;
