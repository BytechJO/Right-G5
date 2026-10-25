import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText,AudioFeedback,AudioSpeaker } from "./ExerciseAudioText";
import { SentenceGroup } from "./SentenceAudio";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 24/SVG/Asset 12.svg"; // غيرها
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

const activationKeys = {
 onKeyDown: event => {if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},
 onKeyUp: event => {if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}
};
const fieldKeys = {
 onKeyDown: event => {if(event.key==="Enter"||event.key===" ")event.stopPropagation();},
 onKeyUp: event => {if(event.key==="Enter"||event.key===" ")event.stopPropagation();}
};
const normalizeAnswer = text => text.normalize("NFKC").toLowerCase().replace(/[‘’']/g, "").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();

const GrammarC = () => {
const audio=useExerciseAudio();
const resetButtonRef=React.useRef(null);
const [announcement,setAnnouncement]=useState("");

  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  const correct = ["tastes", "feel", "taste", "sounds"];

  const normalize = normalizeAnswer;

  const handleChange = (i, val) => {
if(locked||result[i]===true)return;

    if (result[i] === true) return;

    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  const input = (i, width = "180px") => (
    <span
      style={{
        position: "relative",
      }}
    >
      <input {...fieldKeys} placeholder="Verb" aria-invalid={result[i]===false} title={`Sentence ${i+1}, form of sound, feel or taste: ${["The spaghetti blank spicy.","Does the elephant blank rough?","The cherries blank sweet and delicious.","The recording blank too loud."][i]}`} aria-label={`Sentence ${i+1}, form of sound, feel or taste: ${["The spaghetti blank spicy.","Does the elephant blank rough?","The cherries blank sweet and delicious.","The recording blank too loud."][i]}`}
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        disabled={locked||result[i]===true}
        style={{
          width,
          borderBottom:
            result[i] === false ? "1px solid red" : "1px solid black",
          outline: "none",
          fontSize: "18px",
          fontWeight: "bold",
          color: "#6D2980",
          background: "transparent",
          margin: "0 6px",
        borderBottomColor:locked||result[i]===true?"#16a34a":result[i]===false?"red":"black"}}
      />
      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            transform: "translateY(-50%)",
            width: "20px",
            height: "20px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        >
          ✕
        </span>
      )}
    </span>
  );

  // ✅ CHECK
  const checkAnswers = () => {if(locked)return;

audio.stop();

    if (locked) return;

    if (answers.some((a) => !a.trim())) {
      (setAnnouncement(String("Complete all answers.").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.info("Complete all answers."));
      return;
    }

    let score = 0;

    const res = answers.map((a, i) => {
      const ok = normalize(a) === correct[i];
      if (ok) score++;
      return ok;
    });

    setResult(res);

    const msg = `Score: ${score} / 4`;

    if (score === 4) {
      resetButtonRef.current?.focus({preventScroll:true});
setLocked(true);
      (setAnnouncement(String(msg).replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.success(msg));
    } else {
      (setAnnouncement(String(msg).replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.warning(msg));
    }
  };

  // 👀 SHOW
  const showAnswers = ()=>{audio.stop();setAnswers([...correct]);setResult(correct.map(()=>true));setLocked(true);setAnnouncement("Correct answers shown and locked.");};

  // 🔄 RESET
  const reset = () => {
audio.stop();
setAnnouncement("Answers, feedback and locks cleared.");

    setAnswers(["", "", "", ""]);
    setResult([]);
    setLocked(false);
  };

  return (
    <div data-exercise-scope="Unit3_Page3_GrammarC.jsx">
<AudioFeedback audio={audio}/><style>{`[data-exercise-scope="Unit3_Page3_GrammarC.jsx"] input:focus-visible,[data-exercise-scope="Unit3_Page3_GrammarC.jsx"] textarea:focus-visible,[data-exercise-scope="Unit3_Page3_GrammarC.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style><div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>

      <h5 className="header-title-page8-read mb-5">
        <span className="ex-A-read mr-2">C</span>
        Read and write a form of <span className="text-[#00AEEF]">sound</span>,
        <span className="text-[#00AEEF]">feel</span>, or
        <span className="text-[#00AEEF]">taste</span>.
      </h5>

      <div className="flex justify-between items-start">
        {/* QUESTIONS */}
        <div className="flex flex-col gap-8 text-[18px] flex-1 mt-8">
          <div>
            <span className="font-bold mr-3">1</span>
            The spaghetti {input(0)} spicy.
          </div>

          <div>
            <span className="font-bold mr-3">2</span>
            Does the elephant {input(1)} rough?
          </div>

          <div>
            <span className="font-bold mr-3">3</span>
            The cherries {input(2)} sweet and delicious.
          </div>

          <div>
            <span className="font-bold mr-3">4</span>
            The recording {input(3)} too loud.
          </div>
        </div>

        {/* IMAGE */}
        <img alt={"A plate of spaghetti with a fork."}
          src={img1}
          style={{
            width: "240px",
            height: "140px",
            objectFit: "contain",
            marginLeft: "20px",
          }}
        />
      </div>
      <div className="flex justify-center gap-6 mt-8">
        {/* Reset */}
        <div className="relative group">
          <button type="button" {...activationKeys} aria-label="Start Again" ref={resetButtonRef}
            onClick={reset}
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
          <button type="button" {...activationKeys} aria-label="Show Answer"
            onClick={showAnswers}
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
          <button type="button" {...activationKeys} aria-label="Check Answer" disabled={locked} style={{cursor:locked?"not-allowed":"pointer"}}
            onClick={checkAnswers}
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

export default GrammarC;
