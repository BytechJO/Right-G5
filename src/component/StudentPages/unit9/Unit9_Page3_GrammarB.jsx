import {useExerciseAudio} from "../unit5/useExerciseAudio";
import {AudioFeedback} from "../unit5/ExerciseAudioText";

import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import {
  FaCheck,
  FaRedo,
  FaEye,
} from "react-icons/fa";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const Unit8_Page3_GrammarB = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const scrambled = [
    "get if early I up time school on for I be will",

    "rains if tomorrow play we it baseball still will",
  ];

  const correctAnswers = [
    "If I get up early I will be on time for school.",

    "If it rains tomorrow, we will still play baseball.",
  ];

  const [answers, setAnswers] =
    useState(["", ""]);

  const [errors, setErrors] =
    useState([false, false]);

  const [correctLocked, setCorrectLocked] =
    useState([false, false]);

  const [locked, setLocked] =
    useState(false);

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

    const isEmpty = answers.some(
      (a) => normalize(a) === ""
    );

    if (isEmpty) {
      (setAnnouncement(String("Please complete all fields.").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.info(
        "Please complete all fields."
      ));
      return;
    }

    let score = 0;

    const newErrors = answers.map(
      (ans, i) => {
        const isCorrect =
          normalize(ans) ===
          normalize(correctAnswers[i]);

        if (isCorrect) score++;

        return !isCorrect;
      }
    );

    const newLocked = answers.map(
      (ans, i) =>
        normalize(ans) ===
        normalize(correctAnswers[i])
    );

    setErrors(newErrors);
    setCorrectLocked(newLocked);

    const total = 2;

    const color =
      score === total
        ? "green"
        : score === 0
        ? "red"
        : "orange";

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

  const handleShow = () => {audio.stop();setAnnouncement("Model answers shown and locked.");resetButtonRef.current?.focus({preventScroll:true});
    setAnswers(correctAnswers);

    setErrors([false, false]);

    setCorrectLocked([true, true]);

    setLocked(true);
  };

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", ""]);

    setErrors([false, false]);

    setCorrectLocked([false, false]);

    setLocked(false);
  };

  return (
    <div data-exercise-scope={"Unit9_Page3_GrammarB.jsx"}><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="Unit9_Page3_GrammarB.jsx"] input:focus-visible,[data-exercise-scope="Unit9_Page3_GrammarB.jsx"] textarea:focus-visible,[data-exercise-scope="Unit9_Page3_GrammarB.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-10">
        <span className="ex-A-read mr-2">
          B
        </span>
        Unscramble and write the
        sentences.
      </h5>

      {/* QUESTIONS */}
      <div className="space-y-10 text-[18px] mt-10">
        {scrambled.map((item, i) => (
          <div
            key={i}
            className="flex gap-4 items-start"
          >
            <span className="font-bold mt-1">
              {i + 1}
            </span>

            <div className="flex-1">
              <p className="mb-4">
                {item}
              </p>

              <div className="relative">
                <input style={{...(correctLocked[i]?{borderBottomColor:"#16a34a"}:{})}} aria-invalid={!!(errors[i])} title={`Sentence ${i+1}, reorder these words: ${scrambled[i]}`} aria-label={`Sentence ${i+1}, reorder these words: ${scrambled[i]}`} {...fieldKeys}
                  type="text"
                  value={answers[i]}
                  disabled={
                    locked ||
                    correctLocked[i]
                  }
                  onChange={(e) =>
                    updateAnswer(
                      i,
                      e.target.value
                    )
                  }
                  className={`border-b outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent
                  ${
                    errors[i]
                      ? "border-red-500"
                      : "border-black"
                  }
                  `}
                />

                {errors[i] && (
                  <div
                    style={{
                      position:
                        "absolute",
                      top: "50%",
                      right:
                        "-30px",
                      transform:
                        "translateY(-50%)",
                      width:
                        "22px",
                      height:
                        "22px",
                      background:
                        "#ef4444",
                      color:
                        "white",
                      borderRadius:
                        "50%",
                      fontSize:
                        "12px",
                      display:
                        "flex",
                      alignItems:
                        "center",
                      justifyContent:
                        "center",
                      fontWeight:
                        "bold",
                      border:
                        "2px solid white",
                      boxShadow:
                        "0 1px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>
            </div>
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

export default Unit8_Page3_GrammarB;