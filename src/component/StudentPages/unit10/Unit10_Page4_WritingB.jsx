import {useExerciseAudio} from "../unit5/useExerciseAudio";
import {AudioFeedback} from "../unit5/ExerciseAudioText";

import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

import bikeImg from "../../../assets/imgs/pages/classbook/Right 5 Unit 10 It Was the Best Day! Folder/Page 85/SVG/Asset 7.svg";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const Unit10_Page4_WritingB = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const correctAnswers = [
    "handlebars",
    "seat",
    "chain",
    "tires",
    "pedals",
    "spokes",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);

  const [errors, setErrors] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [correctLocked, setCorrectLocked] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const updateAnswer = (index, value) => {if(locked||correctLocked[index])return;
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

    const newErrors = [false, false, false, false, false, false];

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

    const total = 6;

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

    setCorrectLocked([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", "", ""]);

    setErrors([false, false, false, false, false, false]);

    setCorrectLocked([false, false, false, false, false, false]);

    setLocked(false);
  };

  const renderInput = (value, error, isCorrect, onChange, style = {}, label) => (
    <div
      style={{
        position: "absolute",
        ...style,
      }}
    >
      <input placeholder={"Part name"} aria-invalid={!!error} title={label} aria-label={label} {...fieldKeys}
        type="text"
        value={value}
        disabled={locked || isCorrect}
        onChange={onChange}
        style={{
          width: "140px",
          border: "none",
          outline: "none",
          background: "transparent",
          fontSize: "20px",
          fontWeight: "600",
          color: "#7A2D91",
          padding: "2px 4px",
        boxShadow:isCorrect?"inset 0 -2px #16a34a":error?"inset 0 -2px #D1232A":undefined}}
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
    <div data-exercise-scope={"Unit10_Page4_WritingB.jsx"}><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="Unit10_Page4_WritingB.jsx"] input:focus-visible,[data-exercise-scope="Unit10_Page4_WritingB.jsx"] textarea:focus-visible,[data-exercise-scope="Unit10_Page4_WritingB.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-10 leading-relaxed">
        <span className="ex-A-read mr-2">B</span>
        Do you know the parts of a bicycle? Put the words by the correct places
        on the <br /> bicycle. With the help of an adult, use the internet to
        find the names.
      </h5>

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "30px",
          width: "100%",
        }}
      >
        {" "}
        <div
          style={{
            position: "relative",
            width: "75%",
          }}
        >
          {/* IMAGE */}
          <img
            src={bikeImg}
            alt={"A blue bicycle with numbered leader lines to six parts. Label 1 points to the handlebars, 2 to the seat, 3 to the chain, 4 to a tire, 5 to a pedal and 6 to the spokes."}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
            }}
          />

          {/* 1 */}
          {renderInput(answers[0],errors[0],correctLocked[0],(e) => updateAnswer(0, e.target.value),{
              top: "17%",
              left: "4%",
            },"Bicycle label 1, name the part indicated by the line")}

          {/* 2 */}
          {renderInput(answers[1],errors[1],correctLocked[1],(e) => updateAnswer(1, e.target.value),{
              top: "9%",
              right: "8%",
            },"Bicycle label 2, name the part indicated by the line")}

          {/* 3 */}
          {renderInput(answers[2],errors[2],correctLocked[2],(e) => updateAnswer(2, e.target.value),{
              top: "35%",
              left: "4%",
            },"Bicycle label 3, name the part indicated by the line")}

          {/* 4 */}
          {renderInput(answers[3],errors[3],correctLocked[3],(e) => updateAnswer(3, e.target.value),{
              top: "26%",
              right: "8%",
            },"Bicycle label 4, name the part indicated by the line")}

          {/* 5 */}
          {renderInput(answers[4],errors[4],correctLocked[4],(e) => updateAnswer(4, e.target.value),{
              top: "52%",
              left: "4%",
            },"Bicycle label 5, name the part indicated by the line")}

          {/* 6 */}
          {renderInput(answers[5],errors[5],correctLocked[5],(e) => updateAnswer(5, e.target.value),{
              top: "43%",
              right: "8%",
            },"Bicycle label 6, name the part indicated by the line")}
        </div>
        {/* WORD BANK */}
        <div
          style={{
            width: "180px",
            background: "#d7c7df",
            borderRadius: "18px",
            padding: "18px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            fontSize: "24px",
            flexShrink: 0,
          }}
        >
          <span>handlebars</span>
          <span>pedals</span>
          <span>spokes</span>
          <span>tires</span>
          <span>seat</span>
          <span>chain</span>
        </div>
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

export default Unit10_Page4_WritingB;
