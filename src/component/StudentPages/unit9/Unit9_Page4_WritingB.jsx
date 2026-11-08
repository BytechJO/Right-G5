import {useExerciseAudio} from "../unit5/useExerciseAudio";
import {AudioFeedback} from "../unit5/ExerciseAudioText";

import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};



const Unit9_Page4_WritingB = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

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
    <div data-exercise-scope={"Unit9_Page4_WritingB.jsx"}><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="Unit9_Page4_WritingB.jsx"] input:focus-visible,[data-exercise-scope="Unit9_Page4_WritingB.jsx"] textarea:focus-visible,[data-exercise-scope="Unit9_Page4_WritingB.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-10 leading-relaxed">
  <span className="ex-A-read mr-2">B</span>

  <div className="flex flex-col">
    <div>
      An
      <span className="text-[#1ea7ff]"> “If”</span> poem can be thoughtful,
      funny, or mysterious. Decide what sort of
      <span className="text-[#1ea7ff]"> “If”</span> poem
    </div>

    <div>
      you would like to write, and then write your idea on the lines below.
    </div>
  </div>
</h5>

      {/* LINES */}
      <div className="space-y-8 text-[18px] mt-10">
        {/* line 1 */}
        <div className="flex items-center gap-3">
          <span className="min-w-[25px]">If</span>

          <input placeholder={"Your condition"} title={"If poem, condition line 1"} aria-label={"If poem, condition line 1"} {...fieldKeys}
            type="text"
            value={answers[0]}
            onChange={(e) => updateAnswer(0, e.target.value)}
            className="border-b border-black outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent"
          />
        </div>

        {/* line 2 */}
        <div className="flex items-center gap-3">
          <span className="min-w-[25px]">If</span>

          <input placeholder={"Your condition"} title={"If poem, condition line 2"} aria-label={"If poem, condition line 2"} {...fieldKeys}
            type="text"
            value={answers[1]}
            onChange={(e) => updateAnswer(1, e.target.value)}
            className="border-b border-black outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent"
          />
        </div>

        {/* line 3 */}
        <div className="flex items-center gap-3">
          <span className="min-w-[25px]">If</span>

          <input placeholder={"Your condition"} title={"If poem, condition line 3"} aria-label={"If poem, condition line 3"} {...fieldKeys}
            type="text"
            value={answers[2]}
            onChange={(e) => updateAnswer(2, e.target.value)}
            className="border-b border-black outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent"
          />
        </div>

        {/* line 4 */}
        <div className="flex items-center gap-3">
          <span className="min-w-[45px]">Then</span>

          <input placeholder={"Your result"} title={"If poem, Then result line"} aria-label={"If poem, Then result line"} {...fieldKeys}
            type="text"
            value={answers[3]}
            onChange={(e) => updateAnswer(3, e.target.value)}
            className="border-b border-black outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent"
          />
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

export default Unit9_Page4_WritingB;
