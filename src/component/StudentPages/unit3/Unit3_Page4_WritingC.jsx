import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText,AudioFeedback,AudioSpeaker } from "./ExerciseAudioText";
import { SentenceGroup } from "./SentenceAudio";
import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";

const activationKeys = {
 onKeyDown: event => {if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},
 onKeyUp: event => {if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}
};
const fieldKeys = {
 onKeyDown: event => {if(event.key==="Enter"||event.key===" ")event.stopPropagation();},
 onKeyUp: event => {if(event.key==="Enter"||event.key===" ")event.stopPropagation();}
};


const WritingC = () => {
const audio=useExerciseAudio();
const resetButtonRef=React.useRef(null);
const [announcement,setAnnouncement]=useState("");

  const [text, setText] = useState("");

  // 🔄 reset داخلي
  const handleReset = () => {
audio.stop();
setAnnouncement("Answers, feedback and locks cleared.");

    setText("");
  };

  return (
    <div data-exercise-scope="Unit3_Page4_WritingC.jsx" className="space-y-4 w-full max-w-[900px] mx-auto">
<AudioFeedback audio={audio}/><style>{`[data-exercise-scope="Unit3_Page4_WritingC.jsx"] input:focus-visible,[data-exercise-scope="Unit3_Page4_WritingC.jsx"] textarea:focus-visible,[data-exercise-scope="Unit3_Page4_WritingC.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style><div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>

      {/* العنوان */}
      <div className="header-title-page8-read pb-2.5">
        <span className="ex-A-read mr-2">C</span>
        <div style={{ display: "block" }}>
          In your notebook, write a conversation between you and one of your
          parents about one of your friends.
          <div style={{ marginTop: "4px" }}>
            Use <span className="text-[#00AEEF]">he is</span> and{" "}
            <span className="text-[#00AEEF]">she is</span> for your description
            of your friend. Your conversation should be at least 10 lines long.
          </div>
        </div>
      </div>

      {/* textarea */}
      <textarea {...fieldKeys} title={"Conversation of at least ten lines with a parent about a friend, using he is and she is"} aria-label={"Conversation of at least ten lines with a parent about a friend, using he is and she is"}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-[120px] border border-gray-300 p-2 outline-none mt-4 ml-12"
        placeholder={"Write your conversation here..."}
      />

      {/* 🔄 Reset Button */}
      <div className="flex justify-center mt-4">
        <button type="button" {...activationKeys} aria-label="Start Again" ref={resetButtonRef}
          onClick={handleReset}
          className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
        >
          <div className="bg-white p-3 rounded-full shadow">
            <FaRedo size={14} className="text-gray-700" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default WritingC;
