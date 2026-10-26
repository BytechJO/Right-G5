import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import { SentenceGroup } from "./SentenceAudio";
import React, { useState } from "react";
import { FaRedo, FaEye } from "react-icons/fa";
import saladImg from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 41/SVG/Asset 163.svg";
import soupImg from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 41/SVG/Asset 8.svg";
import appleImg from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 41/SVG/Asset 9.svg";
import orangeImg from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 41/SVG/Asset 10.svg";
import milkImg from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 41/SVG/Asset 11.svg";
import juiceImg from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 41/SVG/Asset 12.svg";
import soccerImg from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 41/SVG/Asset 13.svg";
import tennisImg from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 41/SVG/Asset 14.svg";
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
const Unit4_Page5_GrammarB = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const correctAnswers = ["I would prefer salad, please", "I would prefer an apple", "I would like some juice, please", "I would prefer to play soccer, please"];
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState([false, false, false, false]);
  const [correctLocked, setCorrectLocked] = useState([false, false, false, false]);
  const [locked, setLocked] = useState(false);
  const imagePairs = [[saladImg, soupImg], [appleImg, orangeImg], [milkImg, juiceImg], [soccerImg, tennisImg]];

  // show
  const handleShow = () => {
    audio.stop();
    setAnnouncement("Model answers shown and locked.");
    setAnswers(correctAnswers);
    setErrors([false, false, false, false]);
    setCorrectLocked([true, true, true, true]);
    setLocked(true);
  };

  // reset
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", ""]);
    setErrors([false, false, false, false]);
    setCorrectLocked([false, false, false, false]);
    setLocked(false);
  };

  // update
  const updateAnswer = (index, value) => {
    if (locked || correctLocked[index]) return;
    setAnswers(previous => previous.map((a, j) => j === index ? value : a));
    setErrors(previous => previous.map((error, j) => j === index ? false : error));
  };
  return <div data-exercise-scope={"Unit5_Page3_GrammarB.jsx"}><AudioFeedback audio={audio} /><style>{`[data-exercise-scope="Unit5_Page3_GrammarB.jsx"] input:focus-visible,[data-exercise-scope="Unit5_Page3_GrammarB.jsx"] textarea:focus-visible,[data-exercise-scope="Unit5_Page3_GrammarB.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <h5 className="header-title-page8-read">
          <span className="ex-A-read mr-2">B</span>
          Choose and write a polite statement. Use{" "}
          <span className="text-[#00AEEF]">like</span> or{" "}
          <span className="text-[#00AEEF]">prefer</span>.
        </h5>
      </div>

      {/* QUESTIONS */}
      <div className="space-y-8 text-[18px]">
        {[0, 1, 2, 3].map(i => <div key={i} className="flex items-center gap-5">
            {/* NUMBER */}
            <span className="font-bold">{i + 1}</span>

            {/* INPUT + TEXT */}
            <div className="relative flex-1 flex items-center">
              <input style={{
            ...(correctLocked[i] ? {
              borderBottomColor: "#16a34a"
            } : {})
          }} {...fieldKeys} aria-invalid={!!errors[i]} title={`Picture pair ${i + 1}, polite statement using like or prefer`} aria-label={`Picture pair ${i + 1}, polite statement using like or prefer`} type="text" value={answers[i]} disabled={locked || correctLocked[i]} onChange={e => updateAnswer(i, e.target.value)} className={`border-b outline-none flex-1 text-[#6D2980] font-semibold px-2 bg-transparent`} />

              {/* PLEASE */}
              {i === 1 && <span className="ml-2">, please.</span>}

              {/* DOT */}
              {i !== 1 && <span className="ml-1">.</span>}

              {/* ❌ */}
              {errors[i] && <div style={{
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
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)"
          }}>
                  ✕
                </div>}
            </div>

            {/* IMAGES */}
            <div className="flex items-center gap-4">
              <img src={imagePairs[i][0]} alt={["An ear of corn on a plate.", "A red apple.", "A carton of milk.", "A football."][i]} style={{
            width: "65px",
            height: "65px",
            objectFit: "contain"
          }} />

              <img src={imagePairs[i][1]} alt={["A bowl of soup with a spoon.", "An orange.", "A carton of apple juice.", "A white ball marked with curved seams."][i]} style={{
            width: "65px",
            height: "65px",
            objectFit: "contain"
          }} />
            </div>
          </div>)}
      </div>

      {/* BUTTONS */}
      <div className="flex justify-center gap-6 mt-10">
        {/* Reset */}
        <div className="relative group">
          <button {...activationKeys} ref={resetButtonRef} aria-label={"Start Again"} type={"button"} onClick={handleReset} className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm">
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
          <button {...activationKeys} aria-label={"Show Answer"} type={"button"} onClick={handleShow} className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm">
            <div className="bg-white p-3 rounded-full shadow">
              <FaEye size={14} />
            </div>
          </button>

          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Show Answer
          </span>
        </div>
      </div>
    </div>;
};
export default Unit4_Page5_GrammarB;
