import {useExerciseAudio} from "../unit5/useExerciseAudio";
import {AudioFeedback} from "../unit5/ExerciseAudioText";

import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};



const WritingC = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const [text, setText] = useState("");

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setText("");
  };

  return (
    <div data-exercise-scope={"Unit9_Page4_WritingC.jsx"}><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="Unit9_Page4_WritingC.jsx"] input:focus-visible,[data-exercise-scope="Unit9_Page4_WritingC.jsx"] textarea:focus-visible,[data-exercise-scope="Unit9_Page4_WritingC.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-10 leading-relaxed">
        <span className="ex-A-read mr-2">C</span>
        Write your complete <span className="text-[#1ea7ff]"> “If”</span> poem
        in your notebook.
      </h5>

      <textarea title={"Write your complete If poem using the plan above"} aria-label={"Write your complete If poem using the plan above"} {...fieldKeys}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-[120px] border border-gray-300 p-2 mt-10 outline-none resize-none"
        placeholder="Write your poem here..."
      />

      {/* Reset Icon */}
      <div className="flex justify-center mt-6">
        <div className="relative group">
          <button {...activationKeys} ref={resetButtonRef} aria-label={"Start Again"} type={"button"}
            onClick={handleReset}
            className="flex items-center justify-center w-15 h-15 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaRedo size={14} className="text-gray-700" />
            </div>
          </button>

          {/* Tooltip */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Reset
          </span>
        </div>
      </div>
    </div>
  );
};

export default WritingC;
