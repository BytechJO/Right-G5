import {useExerciseAudio} from "../unit5/useExerciseAudio";
import {AudioFeedback} from "../unit5/ExerciseAudioText";

import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};



const Unit7_Page4_WritingB = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const [answers, setAnswers] = useState(["", "", "", ""]);

  // update
  const updateAnswer = (index, value) => {
    const updated = [...answers];

    updated[index] = value;

    setAnswers(updated);
  };

  // reset
  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", ""]);
  };

  return (
    <div data-exercise-scope={"Unit7_Page4_WritingB.jsx"}><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="Unit7_Page4_WritingB.jsx"] input:focus-visible,[data-exercise-scope="Unit7_Page4_WritingB.jsx"] textarea:focus-visible,[data-exercise-scope="Unit7_Page4_WritingB.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-10 leading-relaxed">
        <span className="ex-A-read mr-2">B</span>
        On the lines below, write a conversation between Lori and Jenny.
        Remember to use quotation marks.
      </h5>

      {/* CONTENT */}
      <div className="space-y-10 text-[18px] mt-10">
        {/* 1 */}
        <div className="flex items-center gap-3">
          <span>Lori said,</span>

          <div className="flex-1">
            <input placeholder={"Reply with quotes"} title={"Conversation line 1, what Lori said; include quotation marks"} aria-label={"Conversation line 1, what Lori said; include quotation marks"} {...fieldKeys}
              type="text"
              value={answers[0]}
              onChange={(e) => updateAnswer(0, e.target.value)}
              className="border-b border-black outline-none w-full text-[#6D2980] font-semibold px-2 bg-transparent"
            />
          </div>
        </div>

        {/* 2 */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <input placeholder={"Reply with quotes"} title={"Conversation line 2, what Jenny answered; include quotation marks"} aria-label={"Conversation line 2, what Jenny answered; include quotation marks"} {...fieldKeys}
              type="text"
              value={answers[1]}
              onChange={(e) => updateAnswer(1, e.target.value)}
              className="border-b border-black outline-none w-full text-[#6D2980] font-semibold px-2 bg-transparent"
            />
          </div>

          <span>Jenny answered.</span>
        </div>

        {/* 3 */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <input placeholder={"Reply with quotes"} title={"Conversation line 3, what she asked; include quotation marks"} aria-label={"Conversation line 3, what she asked; include quotation marks"} {...fieldKeys}
              type="text"
              value={answers[2]}
              onChange={(e) => updateAnswer(2, e.target.value)}
              className="border-b border-black outline-none w-full text-[#6D2980] font-semibold px-2 bg-transparent"
            />
          </div>

          <span>she asked.</span>
        </div>

        {/* 4 */}
        <div className="flex items-center gap-3">
          <span>Jenny remarked,</span>

          <div className="flex-1">
            <input placeholder={"Reply with quotes"} title={"Conversation line 4, what Jenny remarked; include quotation marks"} aria-label={"Conversation line 4, what Jenny remarked; include quotation marks"} {...fieldKeys}
              type="text"
              value={answers[3]}
              onChange={(e) => updateAnswer(3, e.target.value)}
              className="border-b border-black outline-none w-full text-[#6D2980] font-semibold px-2 bg-transparent"
            />
          </div>

          <span>.</span>
        </div>
      </div>

      {/* BUTTON */}
      <div className="flex justify-center mt-12">
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
      </div>
    </div>
  );
};

export default Unit7_Page4_WritingB;
