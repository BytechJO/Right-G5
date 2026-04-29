import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import grammer_u1 from "../../../assets/audio/ClassBook/U1/PG 9/cd5pg9.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const Page9_Q2 = () => {
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);
  const handleChange = (i, val) => {
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
      <input
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
  const normalize = (str) => str.toLowerCase().replace(/\s+/g, " ").trim();
  const showAnswers = () => {
    setAnswers(modelAnswers);
    setLocked(true);
  };
  // ✅ Check (فقط يتأكد إنو الطالب كتب)
  const checkAnswers = () => {
    if (locked) return;

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
      const ok = correct[i].some((ans) => user.includes(normalize(ans)));

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
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // 🔄 Reset
  const reset = () => {
    setAnswers(["", "", "", ""]);
    setResult([]); // 🔥 مهم
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center p-8">
      <div className="w-full max-w-[900px]">
        {/* Title */}
        <h5 className="header-title-page8 mb-15">
          <span className="ex-A mr-2">E</span>
          Listen, read, and answer.
        </h5>
        <QuestionAudioPlayer
          src={grammer_u1}
          captions={captions}
          stopAtSecond={6.1}
        />
        <div className="space-y-6 text-[18px] mt-15  mb-15">
          {/* 1 */}
          <div>
            <div>1. How deep is the pool?</div>
            {input(0)}
          </div>

          {/* 2 */}
          <div>
            <div>2. How far did Frank swim?</div>
            {input(1)}
          </div>

          {/* 3 */}
          <div>
            <div>3. How much does it cost to swim for a day?</div>
            {input(2)}
          </div>

          {/* 4 */}
          <div>
            <div>4. How many times did Frank dive?</div>
            {input(3)}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="action-buttons-container mt-6">
        <button className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>
        <button onClick={showAnswers} className="show-answer-btn">
          Show Answer
        </button>
        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Page9_Q2;
