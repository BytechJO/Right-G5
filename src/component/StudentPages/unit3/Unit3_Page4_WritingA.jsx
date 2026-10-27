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


const WritingA = () => {
const audio=useExerciseAudio();
const resetButtonRef=React.useRef(null);
const [announcement,setAnnouncement]=useState("");

  const [answers, setAnswers] = useState([
    ["", ""], // Mike
    ["", ""], // Gary
    ["", ""], // Joe
  ]);

  const handleChange = (row, col, value) => {
    const updated = [...answers];
    updated[row][col] = value;
    setAnswers(updated);
  };

  const reset = () => {
audio.stop();
setAnnouncement("Answers, feedback and locks cleared.");

    setAnswers([
      ["", ""],
      ["", ""],
      ["", ""],
    ]);
  };

  const input = (row, col) => (
    <input placeholder={"Detail"} {...fieldKeys} title={`${["Mike","Gary","Joe"][row]}, write two things you know about him, starting with He is`} aria-label={`${["Mike","Gary","Joe"][row]}, write two things you know about him, starting with He is`}
      value={answers[row][col]}
      onChange={(e) => handleChange(row, col, e.target.value)}
      style={{
        width: "100%",
        outline: "none",
        fontSize: "18px",
        color: "#6D2980",
        background: "transparent",
      }}
    />
  );

  return (
    <div data-exercise-scope="Unit3_Page4_WritingA.jsx" className="space-y-4 w-full max-w-[900px] mx-auto">
<AudioFeedback audio={audio}/><style>{`[data-exercise-scope="Unit3_Page4_WritingA.jsx"] input:focus-visible,[data-exercise-scope="Unit3_Page4_WritingA.jsx"] textarea:focus-visible,[data-exercise-scope="Unit3_Page4_WritingA.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style><div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>

      {/* العنوان */}
      <h5 className="header-title-page8-read mb-5">
        <span className="ex-A-read mr-2">A</span>
        Write down two things that you know about each person. Start with "{" "}
        <span className="text-[#00AEEF]">He is</span>."
      </h5>
      {/* TABLE */}
      <div
        style={{
          border: "2px solid #6D2980",
          borderRadius: "15px",
          overflow: "hidden",
          marginTop: 10,
          marginLeft: 45,
        }}
      >
        {/* ROW */}
        {["Mike", "Gary", "Joe"].map((name, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: "flex",
              borderBottom: rowIndex !== 2 ? "2px solid #6D2980" : "none",
            }}
          >
            {/* الاسم */}
            <div
              style={{
                width: "150px",
                padding: "15px",
                borderRight: "2px solid #6D2980",
                background: "#e9e4eb",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {name}
            </div>

            {/* الجمل */}
            <div
              style={{
                flex: 1,
                padding: "10px 15px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div> {input(rowIndex, 0)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔄 فقط Reset */}
      <div className="flex justify-center mt-4">
        <button type="button" {...activationKeys} aria-label="Start Again" ref={resetButtonRef}
          onClick={reset}
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

export default WritingA;
