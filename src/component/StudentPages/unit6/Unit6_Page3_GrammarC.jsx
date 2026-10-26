import {useExerciseAudio} from "../unit5/useExerciseAudio";
import {AudioText,AudioFeedback,AudioSpeaker} from "../unit5/ExerciseAudioText";
import {SentenceGroup,SentencePart} from "../unit5/SentenceAudio";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 6 Shall We Should We Folder/Page 48/SVG/Asset 7.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 6 Shall We Should We Folder/Page 48/SVG/Asset 8.svg";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const Unit6_Page3_GrammarC = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const correctAnswers = [
    "Shall we go to the museum?",
    "Shall we go to the mountains?",
  ];

  const [answers, setAnswers] = useState(["", ""]);

  const [errors, setErrors] = useState([false, false]);

  const [correctLocked, setCorrectLocked] = useState([false, false]);

  const [locked, setLocked] = useState(false);

  // normalize
  const normalize = normalizeAnswer;

  // update
  const updateAnswer = (index, value) => {if(locked||correctLocked[index])return;
    const updated = [...answers];

    updated[index] = value;

    setAnswers(updated);

    const updatedErrors = [...errors];

    updatedErrors[index] = false;

    setErrors(updatedErrors);
  };

  // check
  const handleCheck = () => {
    if (locked) return;audio.stop();

    const isEmpty = answers.some((a) => normalize(a) === "");

    if (isEmpty) {
      (setAnnouncement(String("Please complete all fields.").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.info("Please complete all fields."));

      return;
    }

    let score = 0;

    const newErrors = answers.map((ans, i) => {
      const isCorrect = normalize(ans) === normalize(correctAnswers[i]);

      if (isCorrect) score++;

      return !isCorrect;
    });

    const newLocked = answers.map((ans, i) => {
      return normalize(ans) === normalize(correctAnswers[i]);
    });

    setErrors(newErrors);

    setCorrectLocked(newLocked);

    const total = 2;

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

  // show
  const handleShow = () => {audio.stop();setAnnouncement("Model answers shown and locked.");resetButtonRef.current?.focus({preventScroll:true});
    setAnswers(correctAnswers);

    setErrors([false, false]);

    setCorrectLocked([true, true]);

    setLocked(true);
  };

  // reset
  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", ""]);

    setErrors([false, false]);

    setCorrectLocked([false, false]);

    setLocked(false);
  };

  return (
    <div data-exercise-scope={"Unit6_Page3_GrammarC.jsx"}><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="Unit6_Page3_GrammarC.jsx"] input:focus-visible,[data-exercise-scope="Unit6_Page3_GrammarC.jsx"] textarea:focus-visible,[data-exercise-scope="Unit6_Page3_GrammarC.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-10">
        <span className="ex-A-read mr-2">C</span>
        Look and write sentences with a modal verb.
      </h5>

      {/* QUESTIONS */}
      <div className="space-y-10 text-[18px] mt-10">
        {/* 1 */}
        <div className="flex gap-6 items-center">
          <span className="font-bold -mt-25">1</span>

          {/* IMAGE */}
          <img
            src={img1}
            alt={"A museum building with columns and a sign reading Museum."}
            style={{
              width: "150px",
              height: "150px",
              objectFit: "contain",
            }}
          />

          {/* INPUT */}
          <div className="flex-1 mt-10 relative">
            <input aria-invalid={!!(errors[0])} style={{...(correctLocked[0]?{borderBottomColor:"#16a34a"}:{})}} title={"Picture 1, write the question"} aria-label={"Picture 1, write the question"} {...fieldKeys}
              type="text"
              value={answers[0]}
              disabled={locked || correctLocked[0]}
              onChange={(e) => updateAnswer(0, e.target.value)}
              className={`border-b outline-none w-full text-[#6D2980] font-semibold px-2 bg-transparent
              ${errors[0] ? "border-red-500" : "border-black"}
              `}
            />

            {/* ❌ */}
            {errors[0] && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "-30px",
                  transform: "translateY(-50%)",
                  width: "22px",
                  height: "22px",
                  background: "#ef4444",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  border: "2px solid white",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                }}
              >
                ✕
              </div>
            )}
          </div>
        </div>

        {/* 2 */}
        <div className="flex gap-6 items-center">
          <span className="font-bold -mt-25">2</span>

          {/* IMAGE */}
          <img
            src={img2}
            alt={"Snow-topped mountains and evergreen trees."}
            style={{
              width: "150px",
              height: "150px",
              objectFit: "contain",
            }}
          />

          {/* INPUTS */}
          <div className="flex-1 flex items-center mt-6">
            {/* first line */}
            <div className="relative w-full">
              <input aria-invalid={!!(errors[1])} style={{...(correctLocked[1]?{borderBottomColor:"#16a34a"}:{})}} title={"Picture 2, write the question"} aria-label={"Picture 2, write the question"} {...fieldKeys}
                type="text"
                value={answers[1]}
                disabled={locked || correctLocked[1]}
                onChange={(e) => updateAnswer(1, e.target.value)}
                className={`border-b outline-none w-full text-[#6D2980] font-semibold px-2 bg-transparent
      ${errors[1] ? "border-red-500" : "border-black"}
      `}
              />

              {/* ❌ */}
              {errors[1] && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "-30px",
                    transform: "translateY(-50%)",
                    width: "22px",
                    height: "22px",
                    background: "#ef4444",
                    color: "white",
                    borderRadius: "50%",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    border: "2px solid white",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                  }}
                >
                  ✕
                </div>
              )}
            </div>
          </div>
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

export default Unit6_Page3_GrammarC;
