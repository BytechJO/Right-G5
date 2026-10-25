import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback } from "./ExerciseAudioText";
import clip0 from "../../../assets/audio/ClassBook/U1/Page 9 - D/Item_001_How_did_Marcia_jump.mp3";
import clip1 from "../../../assets/audio/ClassBook/U1/Page 9 - D/Item_002_She_jumped.mp3";
import clip2 from "../../../assets/audio/ClassBook/U1/Page 9 - D/Item_003_How_is_Peter.mp3";
import clip3 from "../../../assets/audio/ClassBook/U1/Page 9 - D/Item_004_Peter_is_tall.mp3";
import clip4 from "../../../assets/audio/ClassBook/U1/Page 9 - D/Item_005_How_apples_are_there.mp3";
import clip5 from "../../../assets/audio/ClassBook/U1/Page 9 - D/Item_006_There_are_apples.mp3";
import clip6 from "../../../assets/audio/ClassBook/U1/Page 9 - D/Item_007_How_does_this_cost.mp3";
import clip7 from "../../../assets/audio/ClassBook/U1/Page 9 - D/Item_008_It_costs.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 9/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 9/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 9/SVG/Asset 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 9/SVG/Asset 4.svg";
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
  .replace(/[.,!?;:…“”"]/g, " ")
  .replace(/\s+/g, " ").trim();


const Page9_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState(Array(8).fill(""));
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);

  const correct = [
    "far",
    "200 centimeters",
    "tall",
    "five feet",
    "many",
    "five",
    "much",
    "ten dollars",
  ];

  const normalize = normalizeAnswer;

  const handleChange = (i, val) => {
    if (locked || result[i] === true) return;
    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);

    // يخفي X لما تعدل الغلط
    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  const input = (i, width = "w-[130px]") => (
    <span className="relative inline-block mx-1">
      <input {...fieldKeys} aria-label={`Item ${Math.floor(i / 2) + 1}, ${i % 2 === 0 ? "question adjective" : "answer"}`} title={`Item ${Math.floor(i / 2) + 1}, ${i % 2 === 0 ? "question adjective" : "answer"}`} style={{borderBottom:locked || result[i] === true ? "2px solid #16a34a" : result[i] === false ? "2px solid #ef4444" : undefined}} placeholder="Type your answer"
        disabled={locked || result[i] === true}
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`border-b outline-none text-center text-[#6D2980] font-medium ${width}
        ${result[i] === false ? "border-red-500" : "border-black"}
      `}
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
  // ====================
  // ✅ CHECK
  // ====================
  const checkAnswers = () => {
    if (locked) return;
    audio.stop();
    setAnnouncement("Checking answers. Correct answers stay locked; incorrect answers can be changed.");

    if (answers.some((a) => !a?.trim())) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;

    // ✅ احسب النتائج لكل input
    const res = answers.map((a, i) => {
      const ok = normalize(a) === normalize(correct[i]);
      if (ok) correctCount++;
      return ok;
    });

    setResult(res); // 🔥 هون الصح

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
      resetButtonRef.current?.focus({preventScroll:true});
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // ====================
  // 👀 SHOW ANSWERS
  // ====================
  const showAnswers = () => {
    audio.stop();
    setAnnouncement("Correct answers shown and locked.");
    setAnswers(correct);
    setLocked(true);
  
    setResult(correct.map(() => true));
};

  // ====================
  // 🔄 RESET
  // ====================
  const reset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(Array(8).fill(""));
    setResult([]);
    setLocked(false);
  };

  return (
    <div data-unit1-scope="Page9_Q1.jsx"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
<AudioFeedback audio={audio} />
<style>{`[data-unit1-scope="Page9_Q1.jsx"] input:focus-visible,[data-unit1-scope="Page9_Q1.jsx"] textarea:focus-visible,[data-unit1-scope="Page9_Q1.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <div className="div-forall">
        <ExerciseHeader sectionLetter="D" title={<>Write the correct adjective in each blank, and then answer the
          question.</>} subTitle="Complete the adjective first, then use the picture and clue to answer the question in a full sentence." />

        <div className="space-y-8 text-[18px] ">
          {/* 1 */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div>
              <span className="font-bold mr-3">1</span> <AudioText audio={audio} id="d-0" src={clip0} label="Hear question 1">How</AudioText> {input(0)} <AudioText audio={audio} id="d-1" src={clip0} label="Hear question 1">did
              Marcia jump?</AudioText>
            </div>
            <img src={img1} alt="A girl jumping along a ruler marked from zero to 200 centimeters." style={{ width: "120px", height: "auto" }} />
            <div><AudioText audio={audio} id="d-2" src={clip1} label="Hear answer 1">She jumped</AudioText> {input(1)}.</div>
          </div>

          {/* 2 */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6">
            <div>
              <span className="font-bold mr-3">2</span> <AudioText audio={audio} id="d-3" src={clip2} label="Hear question 2">How</AudioText> {input(2)} <AudioText audio={audio} id="d-4" src={clip2} label="Hear question 2">is Peter?</AudioText>
            </div>
            <img src={img2} alt="A boy standing beside a centimeter height scale marked up to 150 cm." style={{ width: "120px", height: "auto" }} />
            <div><AudioText audio={audio} id="d-5" src={clip3} label="Hear answer 2">Peter is</AudioText> {input(3)} <AudioText audio={audio} id="d-6" src={clip3} label="Hear answer 2">tall.</AudioText></div>
          </div>

          {/* 3 */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6">
            <div>
              <span className="font-bold mr-3">3</span> <AudioText audio={audio} id="d-7" src={clip4} label="Hear question 3">How</AudioText> {input(4)} <AudioText audio={audio} id="d-8" src={clip4} label="Hear question 3">apples
              are there?</AudioText>
            </div>
            <img src={img3} alt="Five red apples." style={{ width: "120px", height: "auto" }} />
            <div><AudioText audio={audio} id="d-9" src={clip5} label="Hear answer 3">There are</AudioText> {input(5)} <AudioText audio={audio} id="d-10" src={clip5} label="Hear answer 3">apples.</AudioText></div>
          </div>

          {/* 4 */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6">
            <div>
              <span className="font-bold mr-3">4</span> <AudioText audio={audio} id="d-11" src={clip6} label="Hear question 4">How</AudioText> {input(6)} <AudioText audio={audio} id="d-12" src={clip6} label="Hear question 4">does this
              cost?</AudioText>
            </div>
            <img src={img4} alt="A portable radio with a ten-dollar price tag." style={{ width: "120px", height: "auto" }} />
            <div><AudioText audio={audio} id="d-13" src={clip7} label="Hear answer 4">It costs</AudioText> {input(7)}.</div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="action-buttons-container">
        <button type="button" aria-label="Start Again" {...activationKeys} ref={resetButtonRef} className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>

        <button type="button" aria-label="Show Answer" {...activationKeys} onClick={showAnswers} className="show-answer-btn">
          Show Answer
        </button>

        <button type="button" aria-label="Check Answer" {...activationKeys} disabled={locked} style={{cursor:locked ? "not-allowed":"pointer"}} className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Page9_Q1;
