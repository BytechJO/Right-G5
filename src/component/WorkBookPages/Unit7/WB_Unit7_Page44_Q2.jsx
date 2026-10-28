import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../../StudentPages/unit5/useExerciseAudio";
import {AudioText,AudioFeedback,AudioSpeaker} from "../../StudentPages/unit5/ExerciseAudioText";
import {SentenceGroup,SentencePart} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

import roomImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U7/Page 44/Asset 11.svg";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const WB_Unit7_Page44_Q2 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const correctAnswers = [
    "They are playing a game.",
    "She is eating cereal.",
    "Stella is playing with a puppy.",
    "Hansel is taking a nap.",
    "Harley is wiping the window.",
    "Helen is sitting on the couch.",
  ];

  const [studentAnswers, setStudentAnswers] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  // ------------------------
  // INPUT
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

    const usedAnswers=studentAnswers.flatMap((a,index)=>result[index]===true?[correctAnswers.findIndex(v=>normalize(v)===normalize(a))]:[]);

    const newResults = studentAnswers.map((studentAnswer,slot) => {
      const normalizedStudent = normalize(studentAnswer);

      const foundIndex = correctAnswers.findIndex(
        (correct, index) =>
          !usedAnswers.includes(index) &&
          normalize(correct) === normalizedStudent,
      );

      if (result[slot]===true || foundIndex !== -1) {
        if(foundIndex!==-1)usedAnswers.push(foundIndex);

        correctCount++;

        return true;
      }

      return false;
    });

    setResult(newResults);

    const total = correctAnswers.length;

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
    setStudentAnswers(correctAnswers);

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT FIELD
  // ------------------------

  const inputField = (i) => (
    <div className="relative w-full">
      <input style={{borderBottomColor:(result[i]===true)?"#16a34a":(result[i]===false)?"#D1232A":undefined}} aria-invalid={result[i]===false} placeholder={"Sentence"} title={`Response ${i+1}: describe an activity in the picture using an -ing verb`} aria-label={`Response ${i+1}: describe an activity in the picture using an -ing verb`} {...fieldKeys}
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
          }}
        >
          ✕
        </span>
      )}
    </div>
  );

  return (
    <div data-exercise-scope={"WB_Unit7_Page44_Q2.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="WB_Unit7_Page44_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit7_Page44_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit7_Page44_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[18px]">
        {/* TITLE */}

        <ExerciseHeader isWorkbook sectionLetter="M" title={<>
          
          Look and write what everyone is doing. Use{" "}
          <span className="text-[#00AEEF]">–ing</span> verbs.
        </>} subTitle="Identify the subject and action first, then use the correct form of be plus the -ing verb where the sentence requires it." />

        {/* IMAGE */}

        <div className="flex justify-center mb-5">
          <img
            src={roomImg}
            alt={"Children in a living room: two play a board game on the floor, one eats from a bowl, one holds a white puppy, one sleeps on a sofa, one wipes a window and one sits reading."}
            style={{
              width: "55%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>

        {/* QUESTIONS */}

        <div className="flex flex-col gap-8 mb-10">
          {studentAnswers.map((_, index) => (
            <div key={index} className="flex items-center gap-4">
              <span className="font-bold">{index + 1}</span>

              <div className="flex-1">{inputField(index)}</div>
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

export default WB_Unit7_Page44_Q2;
