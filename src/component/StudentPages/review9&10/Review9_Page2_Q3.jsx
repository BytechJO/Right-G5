import clip0 from "../../../assets/audio/ClassBook/U10/Page 89 - F/Item_001_If_the_store_has_discounts_on_shoes,.mp3";
import clip1 from "../../../assets/audio/ClassBook/U10/Page 89 - F/Item_002_when_we_bake_cookies.mp3";
import clip2 from "../../../assets/audio/ClassBook/U10/Page 89 - F/Item_003_If_Mom_makes_a_special_dinner,.mp3";
import clip3 from "../../../assets/audio/ClassBook/U10/Page 89 - F/Item_004_When_we_go_to_the_park,.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../unit5/useExerciseAudio";
import {AudioText,AudioFeedback} from "../unit5/ExerciseAudioText";

import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const Review9_Page2_Q3 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const questions = [
    "we will buy three pairs of sneakers",
    "Janet will come over to my house",
    "everyone will be sure to come",
    "make sure to pack everything that you need",
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const handleChange = (i, value) => {
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

  const checkAnswers = () => {
    if (locked) return;audio.stop();

    const hasEmpty = answers.some((a) => !a.trim());

    if (hasEmpty) {
      (setAnnouncement(String("Please complete all answers.").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.info("Please complete all answers."));

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((a, i) => {
      const ok = normalize(a) === normalize(questions[i]);

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = questions.length;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:18px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) {
      resetButtonRef.current?.focus({preventScroll:true});setLocked(true);

      (setAnnouncement(String(msg).replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.success(msg));
    } else if (correctCount === 0) {
      (setAnnouncement(String(msg).replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.error(msg));
    } else {
      (setAnnouncement(String(msg).replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.warning(msg));
    }
  };

  const showAnswers = () => {audio.stop();setAnnouncement("Model answers shown and locked.");resetButtonRef.current?.focus({preventScroll:true});
    setAnswers([
      "we will buy three pairs of sneakers",
      "Janet will come over to my house",
      "everyone will be sure to come",
      "make sure to pack everything that you need",
    ]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width) => (
    <span className="relative inline-block">
      <input placeholder={"Complete the clause"} style={{...(result[i]===true?{borderBottomColor:"#16a34a"}:{})}} aria-invalid={result[i]===false} title={`Sentence ${i+1}, finish the given if or when clause`} aria-label={`Sentence ${i+1}, finish the given if or when clause`} {...fieldKeys}
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          ${width}
          border-0
          border-b
          outline-none
          bg-transparent
          text-[20px]
          text-[#6D2980]
          font-semibold
          px-1

          ${result[i] === false ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            width: "20px",
            height: "20px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
          }}
        >
          ✕
        </span>
      )}
    </span>
  );

  return (
    <div data-exercise-scope={"Review9_Page2_Q3.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="Review9_Page2_Q3.jsx"] input:focus-visible,[data-exercise-scope="Review9_Page2_Q3.jsx"] textarea:focus-visible,[data-exercise-scope="Review9_Page2_Q3.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div
        className="div-forall "
        style={{
        gap:"40px"
        }}
      >
        {/* TITLE */}
        <ExerciseHeader isReview sectionLetter="F" title={<>
          
          Given the <span className="text-[#1ea7ff]">if</span> or{" "}
          <span className="text-[#1ea7ff]">when</span> clause, write the rest of
          the sentence.
        </>} subTitle="Use the prompt and grammar pattern to write a complete sentence, then reread it for meaning, tense, and punctuation."/>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-15 text-[20px]">
          {/* 1 */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-bold">1</span>

            <span><AudioText audio={audio} id={"audio-0"} src={clip0} label={"Hear If the store has discounts on shoes,"}>If the store has discounts on shoes,</AudioText></span>

            {inputField(0, "w-[360px]")}
          </div>

          {/* 2 */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-bold">2</span>

            {inputField(1, "w-[460px]")}

            <span><AudioText audio={audio} id={"audio-1"} src={clip1} label={"Hear when we bake cookies."}>when we bake cookies.</AudioText></span>
          </div>

          {/* 3 */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-bold">3</span>

            <span><AudioText audio={audio} id={"audio-2"} src={clip2} label={"Hear If Mom makes a special dinner,"}>If Mom makes a special dinner,</AudioText></span>

            {inputField(2, "w-[350px]")}
          </div>

          {/* 4 */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-bold">4</span>

            <span><AudioText audio={audio} id={"audio-3"} src={clip3} label={"Hear When we go to the park,"}>When we go to the park,</AudioText></span>

            {inputField(3, "w-[430px]")}
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container">
        <button {...activationKeys} ref={resetButtonRef} aria-label={"Start Again"} type={"button"} className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>

        <button {...activationKeys} aria-label={"Show Answer"} type={"button"} className="show-answer-btn" onClick={showAnswers}>
          Show Answer
        </button>

        <button style={{cursor:locked?"not-allowed":"pointer"}} {...activationKeys} disabled={locked} aria-label={"Check Answer"} type={"button"} className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Review9_Page2_Q3;
