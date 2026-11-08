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
const Unit5_Page2_ComprehensionA = () => {
  const lineSvgRef = React.useRef(null);
  const [, refreshLines] = useState(0);
  React.useEffect(() => {
    const redraw = () => refreshLines(n => n + 1);
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(redraw) : null;
    if (lineSvgRef.current?.parentElement) observer?.observe(lineSvgRef.current.parentElement);
    window.addEventListener("resize", redraw);
    window.addEventListener("scroll", redraw, true);
    redraw();
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", redraw);
      window.removeEventListener("scroll", redraw, true);
    };
  }, []);
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);
  const rightRefs = React.useRef([]);
  const textRefs = React.useRef([]); // 🔥 جديد

  const correct = ["d", "c", "a", "b"];
  const rightItems = ["a", "b", "c", "d"];
  const handleChange = (i, val) => {
    if (locked || result[i] === true) return;
    setAnswers(previous => previous.map((a, j) => j === i ? val : a));
    setResult(previous => {
      const next = [...previous];
      next[i] = undefined;
      return next;
    });
  };
  const input = i => <span className="relative mx-2">
      <input style={{
      ...(result[i] === true ? {
        borderBottomColor: "#16a34a"
      } : {})
    }} {...fieldKeys} aria-invalid={!!(result[i] === false)} title={`Item ${i + 1}, matching meaning letter a to d for ${["A table for a number of people", "May I take your order now?", "I will take care of it right away", "As soon as possible"][i]}`} aria-label={`Item ${i + 1}, matching meaning letter a to d for ${["A table for a number of people", "May I take your order now?", "I will take care of it right away", "As soon as possible"][i]}`} disabled={locked || result[i] === true} value={answers[i]} onChange={e => handleChange(i, e.target.value)} maxLength={1} className={`w-10 border-b outline-none text-center font-bold uppercase
        ${result[i] === false ? "border-red-500 text-[#6D2980]" : "border-black text-[#6D2980]"}`} />

      {result[i] === false && <span style={{
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
      zIndex: 3
    }}>
          ✕
        </span>}
    </span>;

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
      if (!textEl || !rightEl || !lineSvgRef.current) return null;
      const textRect = textEl.getBoundingClientRect();
      const rightRect = rightEl.getBoundingClientRect();
      const parentRect = lineSvgRef.current.getBoundingClientRect();

      // 🔥 من بداية الكلمة
      if(!parentRect.width||!parentRect.height)return null;
const sx = lineSvgRef.current.clientWidth / parentRect.width;
      const sy = lineSvgRef.current.clientHeight / parentRect.height;
      const x1 = (textRect.right - parentRect.left) * sx;
      const y1 = (textRect.top + textRect.height / 2 - parentRect.top) * sy;
      const x2 = (rightRect.left - parentRect.left) * sx;
      const y2 = (rightRect.top + rightRect.height / 2 - parentRect.top) * sy;
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={result[i] === true ? "#16a34a" : result[i] === false ? "#ef4444" : "#6d2980"} strokeWidth="3" strokeLinecap="round" />;
    });
  };

  // ====================
  // CHECK
  // ====================
  const checkAnswers = () => {
    if (locked) return;
    audio.stop();
    if (answers.some(a => !a.trim())) {
      setAnnouncement(String("Please complete all fields.").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.info("Please complete all fields.");
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
      resetButtonRef.current?.focus({
        preventScroll: true
      });
      setLocked(true);
      setAnnouncement(String(msg).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      setAnnouncement(String(msg).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.error(msg);
    } else {
      setAnnouncement(String(msg).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.warning(msg);
    }
  };
  const showAnswers = () => {
    audio.stop();
    setAnnouncement("Model answers shown and locked.");
    setAnswers([...correct]);
    setResult(correct.map(() => true));
    setLocked(true);
  };
  const reset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", ""]);
    setLocked(false);
    setResult([]);
  };
  return <div data-exercise-scope={"Unit5_Page2_ComprehensionA.jsx"}><AudioFeedback audio={audio} /><style>{`[data-exercise-scope="Unit5_Page2_ComprehensionA.jsx"] input:focus-visible,[data-exercise-scope="Unit5_Page2_ComprehensionA.jsx"] textarea:focus-visible,[data-exercise-scope="Unit5_Page2_ComprehensionA.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <h5 className="header-title-page8-read mb-5">
        <span className="ex-A-read mr-2">A</span>
        Look at the underlined words in the reading. See if you can tell what
        they mean <br /> by how they are used in the sentences. Then match them
        with the meanings on the right.
      </h5>

      <div className="relative grid grid-cols-2 gap-25 text-[18px] mt-10 min-h-[280px]">
        <svg focusable={"false"} aria-hidden={true} ref={lineSvgRef} className="absolute inset-0 w-full h-full pointer-events-none">
          {renderLines()}
        </svg>

        {/* LEFT */}
        <div className="space-y-10">
          <div>
            {input(0)}
            <span className="font-bold mr-4">1</span>
            <span ref={el => textRefs.current[0] = el}>
              A table for (number)?
            </span>
          </div>

          <div>
            {input(1)}
            <span className="font-bold mr-4">2</span>
            <span ref={el => textRefs.current[1] = el}>
              May I take your order now?
            </span>
          </div>

          <div>
            {input(2)}
            <span className="font-bold mr-4">3</span>
            <span ref={el => textRefs.current[2] = el}>
              I’ll take care of it right away.
            </span>
          </div>

          <div>
            {input(3)}
            <span className="font-bold mr-4">4</span>
            <span ref={el => textRefs.current[3] = el}>
              As soon as possible
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-10">
          <div ref={el => rightRefs.current[0] = el}>
            <span className="font-bold mr-4">a</span>saying that you will solve
            the problem quickly
          </div>

          <div ref={el => rightRefs.current[1] = el}>
            <span className="font-bold mr-4">b</span>to do it as quickly as one
            can
          </div>

          <div ref={el => rightRefs.current[2] = el}>
            <span className="font-bold mr-4">c</span>The server is asking if the
            customer is ready to tell them what they’d like to eat.
          </div>

          <div ref={el => rightRefs.current[3] = el}>
            <span className="font-bold mr-4">d</span>offering to seat customers
            at a table for a certain number of people
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-6 mt-2">
        {/* Reset */}
        <div className="relative group">
          <button {...activationKeys} ref={resetButtonRef} aria-label={"Start Again"} type={"button"} onClick={reset} className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm">
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
          <button {...activationKeys} aria-label={"Show Answer"} type={"button"} onClick={showAnswers} className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm">
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
        }} disabled={locked} aria-label={"Check Answer"} type={"button"} onClick={checkAnswers} className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm">
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
export default Unit5_Page2_ComprehensionA;
