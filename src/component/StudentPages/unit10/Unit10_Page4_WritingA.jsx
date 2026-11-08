import {useExerciseAudio} from "../unit5/useExerciseAudio";
import {AudioFeedback} from "../unit5/ExerciseAudioText";

import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const Unit10_Page4_WritingA = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const correctAnswers = ["4", "1", "2", "3"];

  const questions = [
    "The boy’s father was calling him to come into the office.",
    "The boy and his father were writing orders and putting them in envelopes.",
    "The boy was taking the envelopes to the mailbox.",
    "The father was going to town.",
  ];

  const letters = ["a", "b", "c", "d"];

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [errors, setErrors] = useState([false, false, false, false]);

  const [correctLocked, setCorrectLocked] = useState([
    false,
    false,
    false,
    false,
  ]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const updateAnswer = (index, value) => {if(locked||correctLocked[index])return;{const number=value.trim();if(number&&(!/^[1-4]$/.test(number)||answers.some((answer,other)=>other<4&&other!==index&&answer.trim()===number))){setAnnouncement("Choose an unused number from 1 to 4.");return;}}
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);

    const updatedErrors = [...errors];
    updatedErrors[index] = false;
    setErrors(updatedErrors);
  };

  const handleCheck = () => {
    if (locked) return;audio.stop();

    const isEmpty = answers.some((ans) => normalize(ans) === "");

    if (isEmpty) {
      (setAnnouncement(String("Please complete all fields.").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.info("Please complete all fields."));
      return;
    }

    let score = 0;

    const newErrors = [false, false, false, false];

    const updatedLocked = [...correctLocked];

    answers.forEach((answer, i) => {
      if (normalize(answer) === normalize(correctAnswers[i])) {
        score++;
        updatedLocked[i] = true;
      } else {
        newErrors[i] = true;
      }
    });

    setErrors(newErrors);
    setCorrectLocked(updatedLocked);

    const total = 4;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${score} / ${total}
        </span>
      </div>
    `;

    if (score === total) {
      resetButtonRef.current?.focus({preventScroll:true});setLocked(true);
      (setAnnouncement(String(msg).replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.success(msg));
    } else if (score === 0) {
      (setAnnouncement(String(msg).replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.error(msg));
    } else {
      (setAnnouncement(String(msg).replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.warning(msg));
    }
  };

  const handleShow = () => {setErrors(correctAnswers.map(()=>false));audio.stop();setAnnouncement("Model answers shown and locked.");resetButtonRef.current?.focus({preventScroll:true});
    setAnswers(correctAnswers);

    setCorrectLocked([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", ""]);

    setErrors([false, false, false, false]);

    setCorrectLocked([false, false, false, false]);

    setLocked(false);
  };

  const renderInput = (value, error, isCorrect, onChange, label) => (
    <div className="relative w-[70px]">
      <input inputMode={"numeric"} maxLength={1} style={{...(isCorrect?{borderBottomColor:"#16a34a"}:{})}} aria-invalid={!!error} title={label} aria-label={label} {...fieldKeys}
        type="text"
        value={value}
        disabled={locked || isCorrect}
        onChange={onChange}
        className={`border-b-2 outline-none w-full text-center text-[#7A2D91] text-[18px] font-semibold bg-transparent
        ${error ? "border-red-500" : "border-black"}
        `}
      />

      {error ? (
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
      ) : null}
    </div>
  );

  return (
    <div data-exercise-scope={"Unit10_Page4_WritingA.jsx"}><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="Unit10_Page4_WritingA.jsx"] input:focus-visible,[data-exercise-scope="Unit10_Page4_WritingA.jsx"] textarea:focus-visible,[data-exercise-scope="Unit10_Page4_WritingA.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-10">
        <span className="ex-A-read mr-2">A</span>
        Number the parts of the story to show the correct order.
      </h5>

      <div className="space-y-8 text-[18px] mt-10">
        {questions.map((question, i) => (
          <div key={i} className="flex items-center gap-5">
            {renderInput(answers[i],errors[i],correctLocked[i],(e) =>
              updateAnswer(i, e.target.value),`Story part ${i+1}: ${questions[i]}; enter an unused order number from 1 to 4`)}

            <span className="font-bold">{letters[i]}</span>

            <p>{question}</p>
          </div>
        ))}
      </div>

      {/* BUTTONS */}
      <div className="flex justify-center gap-6 mt-10">
        {/* Reset */}
        <div className="relative group">
          <button {...activationKeys} ref={resetButtonRef} aria-label={"Start Again"} type={"button"}
            onClick={handleReset}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaRedo size={14} />
            </div>
          </button>

          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Reset
          </span>
        </div>

        {/* Show */}
        <div className="relative group">
          <button {...activationKeys} aria-label={"Show Answer"} type={"button"}
            onClick={handleShow}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaEye size={14} />
            </div>
          </button>

          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Show Answer
          </span>
        </div>

        {/* Check */}
        <div className="relative group">
          <button style={{cursor:locked?"not-allowed":"pointer"}} {...activationKeys} disabled={locked} aria-label={"Check Answer"} type={"button"}
            onClick={handleCheck}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaCheck size={14} />
            </div>
          </button>

          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Check Answer
          </span>
        </div>
      </div>
    </div>
  );
};

export default Unit10_Page4_WritingA;
