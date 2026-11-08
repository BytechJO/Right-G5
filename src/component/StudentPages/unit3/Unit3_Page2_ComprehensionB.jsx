import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText,AudioFeedback,AudioSpeaker } from "./ExerciseAudioText";
import { SentenceGroup } from "./SentenceAudio";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
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

const Unit3_Page2_ComprehensionB = () => {
const audio=useExerciseAudio();
const resetButtonRef=React.useRef(null);
const [announcement,setAnnouncement]=useState("");

  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);

  const containerRef=React.useRef(null);
  const [,refreshGeometry]=useState(0);
  React.useEffect(()=>{let frame=null;const update=()=>{if(frame!==null)cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{frame=null;refreshGeometry(value=>value+1);});};const observer=new ResizeObserver(update);if(containerRef.current)observer.observe(containerRef.current);window.addEventListener("resize",update);window.addEventListener("scroll",update,true);return()=>{observer.disconnect();window.removeEventListener("resize",update);window.removeEventListener("scroll",update,true);if(frame!==null)cancelAnimationFrame(frame);};},[]);
  const rightRefs = React.useRef([]);
  const textRefs = React.useRef([]); // 🔥 جديد

  const correct = ["d", "c", "b", "a"];
  const rightItems = ["a", "b", "c", "d"];

  const handleChange = (i, val) => {
if(locked||result[i]===true)return;

    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  const input = (i) => (
    <span className="relative mx-2">
      <input style={{borderBottomColor:locked||result[i]===true?"#16a34a":result[i]===false?"#ef4444":undefined}} {...fieldKeys} aria-invalid={result[i]===false} title={`Person ${i+1}, matching job letter for ${["professor","author","speaker","news analyst"][i]}`} aria-label={`Person ${i+1}, matching job letter for ${["professor","author","speaker","news analyst"][i]}`}
        disabled={locked||result[i]===true}
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        maxLength={1}
        className={`w-10 border-b outline-none text-center font-bold uppercase
        ${
          result[i] === false
            ? "border-red-500 text-[#6D2980]"
            : "border-black text-[#6D2980]"
        }`}
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

  // ====================
  // SVG LINES
  // ====================
  const renderLines = () => {
    return answers.map((ans, i) => {
      if (!ans) return null;

      const rightIndex = rightItems.indexOf(normalizeAnswer(ans));
      if (rightIndex === -1) return null;

      const textEl = textRefs.current[i];
      const rightEl = rightRefs.current[rightIndex];

      if (!textEl || !rightEl) return null;

      const textRect = textEl.getBoundingClientRect();
      const rightRect = rightEl.getBoundingClientRect();
      const parentRect =
        containerRef.current.getBoundingClientRect();

      // 🔥 من بداية الكلمة
      const scaleX=parentRect.width/(containerRef.current.clientWidth||parentRect.width),scaleY=parentRect.height/(containerRef.current.clientHeight||parentRect.height);
      const x1 = (textRect.right - parentRect.left)/scaleX;
      const y1 = (textRect.top + textRect.height / 2 - parentRect.top)/scaleY;

      const x2 = (rightRect.left - parentRect.left)/scaleX;
      const y2 = (rightRect.top + rightRect.height / 2 - parentRect.top)/scaleY;

      return (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={result[i]===true?"#16a34a":result[i]===false?"#ef4444":"#6d2980"}
          strokeWidth="3"
          strokeLinecap="round"
        />
      );
    });
  };

  // ====================
  // CHECK
  // ====================
  const checkAnswers = () => {if(locked)return;

audio.stop();

    if (locked) return;

    if (answers.some((a) => !a.trim())) {
      (setAnnouncement(String("Please complete all fields.").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.info("Please complete all fields."));
      return;
    }

    let correctCount = 0;

    const res = answers.map((a, i) => {
      const ok = normalizeAnswer(a) === normalizeAnswer(correct[i]);
      if (ok) correctCount++;
      return ok;
    });

    setResult(res);
    const msg = `Score: ${correctCount} / ${correct.length}`;

    if (correctCount === correct.length) {
      resetButtonRef.current?.focus({preventScroll:true});
setLocked(true);
      (setAnnouncement(String(msg).replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.success(msg));
    } else if (correctCount === 0) {
      (setAnnouncement(String(msg).replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.error(msg));
    } else {
      (setAnnouncement(String(msg).replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.warning(msg));
    }
  };

  const showAnswers = ()=>{audio.stop();setAnswers([...correct]);setResult(correct.map(()=>true));setLocked(true);setAnnouncement("Correct answers shown and locked.");};

  const reset = () => {
audio.stop();
setAnnouncement("Answers, feedback and locks cleared.");

    setAnswers(["", "", "", ""]);
    setLocked(false);
    setResult([]);
  };

  return (
    <div data-exercise-scope="Unit3_Page2_ComprehensionB.jsx">
<AudioFeedback audio={audio}/><style>{`[data-exercise-scope="Unit3_Page2_ComprehensionB.jsx"] input:focus-visible,[data-exercise-scope="Unit3_Page2_ComprehensionB.jsx"] textarea:focus-visible,[data-exercise-scope="Unit3_Page2_ComprehensionB.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style><div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>

      <h5 className="header-title-page8-read mb-5">
        <span className="ex-A-read mr-2">B</span>
        What do these people do? Match each person to their job.
      </h5>

      <div ref={containerRef} className="relative grid grid-cols-2 gap-25 text-[18px] mt-10 min-h-[280px]">
        <svg aria-hidden="true" focusable="false" className="absolute inset-0 w-full h-full pointer-events-none">
          {renderLines()}
        </svg>

        {/* LEFT */}
        <div className="space-y-10">
          <div>
            {input(0)}
            <span className="font-bold mr-4">1</span>
            <span ref={(el) => (textRefs.current[0] = el)}>professor</span>
          </div>

          <div>
            {input(1)}
            <span className="font-bold mr-4">2</span>
            <span ref={(el) => (textRefs.current[1] = el)}>author</span>
          </div>

          <div>
            {input(2)}
            <span className="font-bold mr-4">3</span>
            <span ref={(el) => (textRefs.current[2] = el)}>speaker</span>
          </div>

          <div>
            {input(3)}
            <span className="font-bold mr-4">4</span>
            <span ref={(el) => (textRefs.current[3] = el)}>news analyst</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-10">
          <div ref={(el) => (rightRefs.current[0] = el)}>
            <span className="font-bold mr-4">a</span> tells about how the news
            might affect the world
          </div>

          <div ref={(el) => (rightRefs.current[1] = el)}>
            <span className="font-bold mr-4">b</span> gives speeches
          </div>

          <div ref={(el) => (rightRefs.current[2] = el)}>
            <span className="font-bold mr-4">c</span> writes books
          </div>

          <div ref={(el) => (rightRefs.current[3] = el)}>
            <span className="font-bold mr-4">d</span> teaches at a university
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-6 mt-2">
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

export default Unit3_Page2_ComprehensionB;
