import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../unit5/useExerciseAudio";
import {AudioFeedback} from "../unit5/ExerciseAudioText";

import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import grammer_u1 from "../../../assets/audio/ClassBook/U10/PG 87/cd50pg87-instruction.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();

const Unit10_Page6_Q3 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const captions = [
    {
      start: 0.079,
      end: 8,
      text: "Page 87, right activities exercise F. Listen to the sentences and then write the verb that is in the past progressive.",
    },
    {
      start: 8.32,
      end: 29.18,
      text: "After the game, we were congratulating the team. In addition to playing the guitar, Greg was also practicing the violin. While Sam played in the concert, Joan was listening to the beautiful music. Was the audience singing while the band played? Were the students studying when school ended? Were you baking a cake before Bethany came?",
    },
  ];
  const correctAnswers = [
    "congratulating",
    "playing",
    "practicing",
    "listening",
    "singing",
    "studying",
    "baking",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const handleChange = (index, value) => {
    if (locked || result[index] === true) return;

    const updated = [...answers];

    updated[index] = value;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[index] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;audio.stop();

    const hasEmpty = answers.some((answer) => !answer.trim());

    if (hasEmpty) {
      (setAnnouncement(String("Please complete all answers.").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.info("Please complete all answers."));

      return;
    }

    let correctCount = 0;

    const usedAnswers = correctAnswers.flatMap((correct,i)=>answers.some((answer,j)=>result[j]===true&&normalize(answer)===normalize(correct))?[i]:[]);

    const newResults = answers.map((answer,index) => {
      if(result[index]===true){correctCount++;return true;}
      const normalizedAnswer = normalize(answer);

      const matchedIndex = correctAnswers.findIndex(
        (correct, i) =>
          normalize(correct) === normalizedAnswer && !usedAnswers.includes(i),
      );

      const ok = matchedIndex !== -1;

      if (ok) {
        correctCount++;

        usedAnswers.push(matchedIndex);
      }

      return ok;
    });

    setResult(newResults);

    const total = answers.length;

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
      "congratulating",
      "playing",
      "practicing",
      "listening",
      "singing",
      "studying",
      "baking",
    ]);

    setResult(correctAnswers.map(()=>true));

    setLocked(true);
  };

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width) => (
    <span className="relative inline-block">
      <input placeholder={"Verb"} style={{...(result[i]===true?{borderBottomColor:"#16a34a"}:{})}} aria-invalid={result[i]===false} title={`Listening response ${i+1}, write a past progressive verb`} aria-label={`Listening response ${i+1}, write a past progressive verb`} {...fieldKeys}
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
    </span>
  );

  return (
    <div data-exercise-scope={"Unit10_Page6_Q3.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="Unit10_Page6_Q3.jsx"] input:focus-visible,[data-exercise-scope="Unit10_Page6_Q3.jsx"] textarea:focus-visible,[data-exercise-scope="Unit10_Page6_Q3.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div
        className="div-forall"
        style={{
          minHeight: "72vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* TITLE */}
        <ExerciseHeader sectionLetter="F" title={<>
          
          Listen to the sentences, and then write the verb that is in the past
          progressive.
        </>} subTitle="Listen for one missing word at a time, replay if needed, then type exactly the word you hear."/>
        <QuestionAudioPlayer pageId="sb_unit10_page6_q3"
          src={grammer_u1}
          captions={captions}
          stopAtSecond={8}
        />
        {/* QUESTIONS */}
        <div className="grid grid-cols-2 gap-y-20 gap-x-24 mt-10">
          {[1, 2, 3, 4, 5, 6].map((num, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="font-bold text-[18px]">{num}</span>

              {i === 1 ? (
                <div className="flex gap-3">
                  {inputField(1, "w-[120px]")}
                  {inputField(2, "w-[120px]")}
                </div>
              ) : (
                inputField(i > 1 ? i + 1 : i, "w-[260px]")
              )}
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

export default Unit10_Page6_Q3;
