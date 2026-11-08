import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import { SentenceGroup } from "./SentenceAudio";
import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";
const activationKeys = {
  onKeyDown: event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  }
};
const fieldKeys = {
  onKeyDown: event => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
  onKeyUp: event => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  }
};
const Unit4_Page4_WritingB = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [text, setText] = useState("");

  // 🔄 reset داخلي
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setText("");
  };
  return <div data-exercise-scope={"Unit5_Page4_WritingB.jsx"} className="space-y-4 w-full max-w-[900px] mx-auto"><AudioFeedback audio={audio} /><style>{`[data-exercise-scope="Unit5_Page4_WritingB.jsx"] input:focus-visible,[data-exercise-scope="Unit5_Page4_WritingB.jsx"] textarea:focus-visible,[data-exercise-scope="Unit5_Page4_WritingB.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      {/* العنوان */}
      <h5 className="header-title-page8-read pb-2.5">
        <span className="ex-A-read mr-2">B</span>
        Choose a situation where you might have to say something difficult to a
        server <br /> or a clerk in a polite way. In your notebook, write a
        conversation that you might have.
      </h5>

      {/* textarea */}
      <textarea {...fieldKeys} title={"Write a polite conversation with a server or clerk in a difficult situation"} aria-label={"Write a polite conversation with a server or clerk in a difficult situation"} value={text} onChange={e => setText(e.target.value)} className="w-full h-[120px] border border-gray-300 p-2 outline-none mt-10" placeholder={"Write your conversation here..."} />

      {/* 🔄 Reset Button */}
      <div className="flex justify-center mt-4">
        <button {...activationKeys} ref={resetButtonRef} aria-label={"Start Again"} type={"button"} onClick={handleReset} className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm">
          <div className="bg-white p-3 rounded-full shadow">
            <FaRedo size={14} className="text-gray-700" />
          </div>
        </button>
      </div>
    </div>;
};
export default Unit4_Page4_WritingB;
