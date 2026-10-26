import {useExerciseAudio} from "../unit5/useExerciseAudio";
import {AudioFeedback} from "../unit5/ExerciseAudioText";

import React, { useState, useRef } from "react";
import { FaRedo } from "react-icons/fa";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};



const Unit8_Page4_WritingB = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const [answers, setAnswers] = useState(["","","","","","","","","",""]);
  const secondInputRef = useRef(null);
  // update
  // update
  const updateAnswer = (index,value)=>setAnswers(previous=>previous.map((old,i)=>i===index?value:old));
  // reset
  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setAnswers(["","","","","","","","","",""]);
  };

  return (
    <div data-exercise-scope={"Unit8_Page4_WritingB.jsx"}><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="Unit8_Page4_WritingB.jsx"] input:focus-visible,[data-exercise-scope="Unit8_Page4_WritingB.jsx"] textarea:focus-visible,[data-exercise-scope="Unit8_Page4_WritingB.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-10 leading-relaxed">
        <span className="ex-A-read mr-2">B</span>
        Mysteries take some careful planning to write. Use the form below to
        help plan your mystery.
      </h5>

      {/* CONTENT */}
      <div className="space-y-8 text-[18px] mt-10">
        {/* MAIN CHARACTERS */}
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <span>Main characters in the story and what they’re like:</span>

            <div className="flex-1 min-w-[250px]">
              <input title={"Main characters and what they are like, first line"} aria-label={"Main characters and what they are like, first line"} {...fieldKeys}
                type="text"
                value={answers[0]}
                onChange={(e) => updateAnswer(0, e.target.value)}
                className="border-b border-black outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent"
              />
            </div>
          </div>

          <input title={"Main characters and what they are like, continued"} aria-label={"Main characters and what they are like, continued"} {...fieldKeys}
            ref={secondInputRef}
            type="text"
            value={answers[1]}
            onChange={(e) => updateAnswer(1, e.target.value)}
            className="border-b border-black outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent"
          />
        </div>

        {/* MAIN PROBLEM */}
        <div className="flex items-center gap-2 flex-wrap">
          <span>The main problem, or mystery:</span>

          <div className="flex-1 min-w-[250px]">
            <input title={"What disappeared in the mystery"} aria-label={"What disappeared in the mystery"} {...fieldKeys}
              type="text"
              value={answers[2]}
              onChange={(e) => updateAnswer(2, e.target.value)}
              className="border-b border-black outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent"
            />
          </div>
        </div>

        {/* CLUES */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span>The clues you plan to give during the story</span>

            <span>
              (<span className="text-[#1ea7ff]">some can be</span> “
              <span className="text-[#1ea7ff]">false clues</span>”):
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-8">
            {/* left */}
            <input title={"Mystery clue 1"} aria-label={"Mystery clue 1"} {...fieldKeys}
              type="text"
              value={answers[3]}
              onChange={(e) => updateAnswer(3, e.target.value)}
              className="border-b border-black outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent"
            />
            {/* right */}
            <input title={"Mystery clue 2"} aria-label={"Mystery clue 2"} {...fieldKeys}
              type="text"
              value={answers[4]}
              onChange={(e) => updateAnswer(4, e.target.value)}
              className="border-b border-black outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent"
            />
            {/* left */}
            <input title={"Mystery clue 3"} aria-label={"Mystery clue 3"} {...fieldKeys}
              type="text"
              value={answers[5]}
              onChange={(e) => updateAnswer(5, e.target.value)}
              className="border-b border-black outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent"
            />
            {/* right */}
            <input title={"Mystery clue 4"} aria-label={"Mystery clue 4"} {...fieldKeys}
              type="text"
              value={answers[6]}
              onChange={(e) => updateAnswer(6, e.target.value)}
              className="border-b border-black outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent"
            />{" "}
            <input title={"Mystery clue 5"} aria-label={"Mystery clue 5"} {...fieldKeys}
              type="text"
              value={answers[7]}
              onChange={(e) => updateAnswer(7, e.target.value)}
              className="border-b border-black outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent"
            />
            {/* right */}
            <input title={"Mystery clue 6"} aria-label={"Mystery clue 6"} {...fieldKeys}
              type="text"
              value={answers[8]}
              onChange={(e) => updateAnswer(8, e.target.value)}
              className="border-b border-black outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent"
            />
          </div>
        </div>

        {/* HOW SOLVED */}
        <div className="flex items-center gap-2 flex-wrap pt-2">
          <span>How the mystery is solved:</span>

          <div className="flex-1 min-w-[250px]">
            <input title={"Mystery clue 7"} aria-label={"Mystery clue 7"} {...fieldKeys}
              type="text"
              value={answers[9]}
              onChange={(e) => updateAnswer(9, e.target.value)}
              className="border-b border-black outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* RESET BUTTON */}
      <div className="flex justify-center mt-12">
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

export default Unit8_Page4_WritingB;
