import soundE7 from "../../../assets/audio/Workbook/Unit 10/Page 58 - E/Item_007_Were.mp3";
import soundE6 from "../../../assets/audio/Workbook/Unit 10/Page 58 - E/Item_006_while_we_slept_under_the_stars.mp3";
import soundE5 from "../../../assets/audio/Workbook/Unit 10/Page 58 - E/Item_005_Was.mp3";
import soundE4 from "../../../assets/audio/Workbook/Unit 10/Page 58 - E/Item_004_when_the_teacher_came_in.mp3";
import soundE3 from "../../../assets/audio/Workbook/Unit 10/Page 58 - E/Item_003_During_wintertime,.mp3";
import soundE2 from "../../../assets/audio/Workbook/Unit 10/Page 58 - E/Item_002_While_Tina_went_into_the_forest,.mp3";
import soundE1 from "../../../assets/audio/Workbook/Unit 10/Page 58 - E/Item_001_In_addition_to_harvesting_the_crops,.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../../StudentPages/unit5/useExerciseAudio";
import {AudioText,AudioFeedback,AudioSpeaker} from "../../StudentPages/unit5/ExerciseAudioText";
import {SentenceGroup,SentencePart} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const WB_Unit10_Page58_Q3 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const questions = [
    {
      before: "In addition to harvesting the crops,",

      after: "",

      answer: "they were cleaning the horse stalls.",
    },

    {
      before: "While Tina went into the forest,",

      after: "",

      answer: "he was watching from far away.",
    },

    {
      before: "During wintertime,",

      after: "",

      answer: "they were staying at my grandma’s house.",
    },

    {
      before: "Was",

      after: "when the teacher came in?",

      answer: "Larry talking",
    },

    {
      before: "Were",

      after: "while we slept under the stars?",

      answer: "the owls hooting",
    },
  ];

  const [studentAnswers, setStudentAnswers] = useState(["", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  // ------------------------
  // HANDLE INPUT
  // ------------------------

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...studentAnswers];

    updated[i] = value;

    setStudentAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (locked) return;audio.stop();

    const hasEmpty = studentAnswers.some((a) => !a.trim());

    if (hasEmpty) {
      (setAnnouncement(String("Please complete all answers.").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.info("Please complete all answers."));

      return;
    }

    let correctCount = 0;

    const newResults = studentAnswers.map((answer, i) => {
      const ok = normalize(answer) === normalize(questions[i].answer);

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

  // ------------------------
  // SHOW ANSWERS
  // ------------------------

  const showAnswers = () => {audio.stop();setAnnouncement("Model answers shown and locked.");resetButtonRef.current?.focus({preventScroll:true});
    setStudentAnswers(questions.map((q) => q.answer));

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i) => (
    <div className="relative flex-1 min-w-[120px]">
      <input style={{borderBottomColor:(result[i]===true)?"#16a34a":(result[i]===false)?"#D1232A":undefined}} placeholder={"Complete the sentence"} aria-invalid={result[i]===false} title={`Sentence ${i+1}: ${questions[i].before} ___ ${questions[i].after}`} aria-label={`Sentence ${i+1}: ${questions[i].before} ___ ${questions[i].after}`} {...fieldKeys}
        type="text"
        value={studentAnswers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          w-full
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
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
    </div>
  );

  return (
    <div data-exercise-scope={"WB_Unit10_Page58_Q3.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="WB_Unit10_Page58_Q3.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit10_Page58_Q3.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit10_Page58_Q3.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[18px]">
        {/* TITLE */}

        <ExerciseHeader isWorkbook sectionLetter="E" title={<>
          
          Read and write, using the{" "}
          <span className="text-[#00AEEF]">past progressive tense.</span>
        </>} subTitle="Match the subject with was or were, add the -ing verb, and check that the sentence describes an action in progress in the past." />

        {/* QUESTIONS */}

        <div className="flex flex-col gap-15">
          {questions.map((q, index) => (
            <div
              key={index}
              className="
                flex
                items-center
                gap-3
                w-full
              "
            >
              {/* NUMBER */}

              <span className="font-bold">{index + 1}</span>

              {/* BEFORE */}

              {q.before && <span className="shrink-0">{([soundE1,soundE2,soundE3,soundE5,soundE7][index])?<AudioText audio={audio} id={`before-${index}`} src={[soundE1,soundE2,soundE3,soundE5,soundE7][index]} label={"Hear "+(q.before)}>{q.before}</AudioText>:(q.before)}</span>}

              {/* INPUT */}

              {inputField(index)}

              {/* AFTER */}

              {q.after && <span className="shrink-0">{([null,null,null,soundE4,soundE6][index])?<AudioText audio={audio} id={`after-${index}`} src={[null,null,null,soundE4,soundE6][index]} label={"Hear "+(q.after)}>{q.after}</AudioText>:(q.after)}</span>}
            </div>
          ))}
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

export default WB_Unit10_Page58_Q3;
