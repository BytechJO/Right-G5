import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback } from "./ExerciseAudioText";
import clip0 from "../../../assets/audio/ClassBook/U1/Page 9 - E/Item_001_How_deep_is_the_pool.mp3";
import clip1 from "../../../assets/audio/ClassBook/U1/Page 9 - E/Item_002_How_far_did_Frank_swim.mp3";
import clip2 from "../../../assets/audio/ClassBook/U1/Page 9 - E/Item_003_How_much_does_it_cost_to_swim_for_a_day.mp3";
import clip3 from "../../../assets/audio/ClassBook/U1/Page 9 - E/Item_004_How_many_times_did_Frank_dive.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import grammer_u1 from "../../../assets/audio/ClassBook/U1/PG 9/cd5pg9.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const activationKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault(); event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); event.stopPropagation(); }
  },
};
const fieldKeys = {
  onKeyDown: (event) => { if (event.key === "Enter" || event.key === " ") event.stopPropagation(); },
  onKeyUp: (event) => { if (event.key === "Enter" || event.key === " ") event.stopPropagation(); },
};
const normalizeAnswer = (text) => text.normalize("NFKC").toLowerCase()
  .replace(/[‘’']/g, "")
  .replace(/[.,!?;:…“”"]/g, " ")
  .replace(/\s+/g, " ").trim();

const Page9_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);
  const handleChange = (i, val) => {
    if (locked || result[i] === true) return;
    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);

    // 🔥 امسح حالة الغلط أول ما يعدّل
    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };
  const input = (i) => (
    <span className="relative">
      <input {...fieldKeys} aria-label={["How deep is the pool?", "How far did Frank swim?", "How much does it cost to swim for a day?", "How many times did Frank dive?"][i]} title={["How deep is the pool?", "How far did Frank swim?", "How much does it cost to swim for a day?", "How many times did Frank dive?"][i]} style={{borderBottom:locked || result[i] === true ? "2px solid #16a34a" : result[i] === false ? "2px solid #ef4444" : undefined}} placeholder="Type your answer"
        disabled={locked || result[i] === true}
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`border-b outline-none w-full mt-2 text-[#6D2980] font-medium
          ${result[i] === false ? "border-red-500" : "border-black"}
        `}
      />
      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
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
  const captions = [
    {
      start: 0.419,
      end: 36.059,
      text: "Page nine. Write activities. Exercise E. Listen, read, and answer. Frank loves to swim. He practices his swimming at Reynolds Pool on Mondays and Wednesdays. He likes the pool there because it has a twelve-foot deep diving pool, and it only costs one dollar for the whole day. Frank likes to swim a kilometer for exercise, and then he practices his diving. Sometimes he does fifty dives in a day. Frank knows that strength is important for swimming, so he also lifts weights. He can lift one hundred pounds with his arms on a bench press.",
    },
  ];
  const correct = [
    [
      "the pool is 12 feet deep",
      "12 feet",
      "12 feet deep",
      "it is 12 feet deep",
    ],
    [
      "frank swam one kilometer",
      "one kilometer",
      "1 kilometer",
      "he swam one kilometer",
    ],
    [
      "it costs 1 dollar",
      "1 dollar",
      "$1",
      "one dollar",
      "it costs one dollar",
      "1 dollar for a day",
    ],
    [
      "fifty times",
      "50 times",
      "he dived fifty times",
      "frank dived fifty times",
      "fifty dives",
      "sometimes fifty times",
    ],
  ];
  const modelAnswers = [
    "The pool is 12 feet deep.",
    "Frank swam one kilometer.",
    "It costs one dollar for a day.",
    "He sometimes dives fifty times in a day.",
  ];
  const normalize = normalizeAnswer;
  const showAnswers = () => {
    audio.stop();
    setAnnouncement("Correct answers shown and locked.");
    setAnswers(modelAnswers);
    setLocked(true);
  
    setResult(correct.map(() => true));
};
  // ✅ Check (فقط يتأكد إنو الطالب كتب)
  const checkAnswers = () => {
    if (locked) return;
    audio.stop();
    setAnnouncement("Checking answers. Correct answers stay locked; incorrect answers can be changed.");

    // 🛑 VALIDATION (محسّنة)
    if (answers.some((a) => !a || !a.trim())) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;

    // ✅ احسب النتائج لكل input
    const res = answers.map((a, i) => {
      const user = normalize(a);

      // 🔥 دعم multiple answers
      const ok = [...correct[i], modelAnswers[i]].some((ans) => user === normalize(ans));

      if (ok) correctCount++;
      return ok;
    });

    setResult(res); // 🔥 مهم

    const total = correct.length;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${correctCount} / ${total}
      </span>
    </div>
  `;

    // 🔔 ALERT TYPE
    if (correctCount === total) {
      setLocked(true);
      resetButtonRef.current?.focus({preventScroll:true});
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // 🔄 Reset
  const reset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", ""]);
    setResult([]); // 🔥 مهم
    setLocked(false);
  };

  return (
    <div data-unit1-scope="Page9_Q2.jsx" className="flex flex-col items-center p-8">
<AudioFeedback audio={audio} />
<style>{`[data-unit1-scope="Page9_Q2.jsx"] input:focus-visible,[data-unit1-scope="Page9_Q2.jsx"] textarea:focus-visible,[data-unit1-scope="Page9_Q2.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <div className="div-forall" style={{gap:"20px"}}>
        {/* Title */}
        <ExerciseHeader sectionLetter="E" title={<>Listen, read, and answer.</>} subTitle="Listen once for the main idea, replay the needed part, then answer each question in a complete, concise response." />
        <QuestionAudioPlayer
          pageId="sb_unit1_page9_q2"
          src={grammer_u1}
          captions={captions}
          stopAtSecond={6.1}
        />
        <div className="space-y-6 text-[18px] mt-5  mb-10">
          {/* 1 */}
          <div>
            <div><AudioText audio={audio} id="e-0" src={clip0} label="Hear question 1">1. How deep is the pool?</AudioText></div>
            {input(0)}
          </div>

          {/* 2 */}
          <div>
            <div><AudioText audio={audio} id="e-1" src={clip1} label="Hear question 2">2. How far did Frank swim?</AudioText></div>
            {input(1)}
          </div>

          {/* 3 */}
          <div>
            <div><AudioText audio={audio} id="e-2" src={clip2} label="Hear question 3">3. How much does it cost to swim for a day?</AudioText></div>
            {input(2)}
          </div>

          {/* 4 */}
          <div>
            <div><AudioText audio={audio} id="e-3" src={clip3} label="Hear question 4">4. How many times did Frank dive?</AudioText></div>
            {input(3)}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="action-buttons-container mt-6">
        <button type="button" aria-label="Start Again" {...activationKeys} ref={resetButtonRef} className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>
        <button type="button" aria-label="Show Answer" {...activationKeys} onClick={showAnswers} className="show-answer-btn">
          Show Answer
        </button>
        <button type="button" aria-label="Check Answer" {...activationKeys} disabled={locked} style={{cursor:locked ? "not-allowed":"pointer"}} className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Page9_Q2;
