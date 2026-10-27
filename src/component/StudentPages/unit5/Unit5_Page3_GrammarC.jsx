import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import { SentenceGroup } from "./SentenceAudio";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
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
const normalizeAnswer = text => text.normalize("NFKC").toLowerCase().replace(/[‘’']/g, "").replace(/[.,!?;:…“”"–—-]/g, " ").replace(/\s+/g, " ").trim();
const Unit4_Page5_GrammarC = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const correctAnswers = ["Could you please give me a glass of water?", "Would you please open the windows?", "Could you get some lettuce from the store, please?", "Could I have some milk in my tea, please?"];
  const statements = ["I’d like a glass of water.", "The windows should be open.", "I need some lettuce from the store.", "I like milk in my tea."];
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState([false, false, false, false]);
  const [correctLocked, setCorrectLocked] = useState([false, false, false, false]);
  const [locked, setLocked] = useState(false);

  // normalize
  const normalize = normalizeAnswer;

  // check
  const handleCheck = () => {
    if (locked) return;
    audio.stop();
    const isEmpty = answers.some(a => normalize(a) === "");
    if (isEmpty) {
      setAnnouncement(String("Please complete all fields.").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.info("Please complete all fields.");
      return;
    }
    let score = 0;
    const newErrors = answers.map((ans, i) => {
      // السؤال الأول مثال

      const isCorrect = normalize(ans) === normalize(correctAnswers[i]);
      if (isCorrect) score++;
      return !isCorrect;
    });
    const newLocked = answers.map((ans, i) => {
      return normalize(ans) === normalize(correctAnswers[i]);
    });
    setErrors(newErrors);
    setCorrectLocked(newLocked);
    const total = 4;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";
    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${score} / ${total}
        </span>
      </div>
    `;
    if (score === total) {
      resetButtonRef.current?.focus({
        preventScroll: true
      });
      setLocked(true);
      setAnnouncement(String(msg).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.success(msg);
    } else if (score === 0) {
      setAnnouncement(String(msg).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.error(msg);
    } else {
      setAnnouncement(String(msg).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.warning(msg);
    }
  };

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
    setAnswers(["", "", "", "", ""]);
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
  return <div data-exercise-scope={"Unit5_Page3_GrammarC.jsx"}><AudioFeedback audio={audio} /><style>{`[data-exercise-scope="Unit5_Page3_GrammarC.jsx"] input:focus-visible,[data-exercise-scope="Unit5_Page3_GrammarC.jsx"] textarea:focus-visible,[data-exercise-scope="Unit5_Page3_GrammarC.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-10">
        <span className="ex-A-read mr-2">C</span>
        Make polite requests from the statements that are given.
      </h5>

      {/* QUESTIONS */}
      <div className="space-y-8 text-[18px] mt-10">
        {statements.map((s, i) => <div key={i}>
            {/* STATEMENT */}
            <div className="flex items-center gap-4 mb-3">
              <span className="font-bold">{i + 1}</span>

              <span>{s}</span>
            </div>


            <div className="ml-7 relative">
              <input placeholder={"Question"} style={{
            ...(correctLocked[i] ? {
              borderBottomColor: "#16a34a"
            } : {})
          }} {...fieldKeys} aria-invalid={!!errors[i]} title={`Statement ${i + 1}, make a polite request: ${statements[i]}`} aria-label={`Statement ${i + 1}, make a polite request: ${statements[i]}`} type="text" value={answers[i]} disabled={locked || correctLocked[i]} onChange={e => updateAnswer(i, e.target.value)} className={`border-b outline-none w-full text-[#6D2980] font-semibold px-2 bg-transparent
                  ${errors[i] ? "border-red-500" : "border-black"}
                  `} />

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

        {/* Check */}
        <div className="relative group">
          <button {...activationKeys} style={{
          cursor: locked ? "not-allowed" : "pointer"
        }} disabled={locked} aria-label={"Check Answer"} type={"button"} onClick={handleCheck} className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm">
            <div className="bg-white p-3 rounded-full shadow">
              <FaCheck size={14} />
            </div>
          </button>

          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Check Answer
          </span>
        </div>
      </div>
    </div>;
};
export default Unit4_Page5_GrammarC;
