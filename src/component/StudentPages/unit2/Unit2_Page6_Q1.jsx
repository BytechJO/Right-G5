import clip0 from "../../../assets/audio/ClassBook/U2/Page 15 - C/Item_001_Who_goes_to_the_carnival_and_probably_wins_a_trophy_on_Friday.mp3";
import clip1 from "../../../assets/audio/ClassBook/U2/Page 15 - C/Item_002_Who_is_helping_his_dad_with_the_car_engine.mp3";
import clip2 from "../../../assets/audio/ClassBook/U2/Page 15 - C/Item_003_Who_gets_a_trophy_on_Tuesday.mp3";
import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 15/SVG/Asset 8.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 15/SVG/Asset 9.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 15/SVG/Asset 10.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 15/SVG/Asset 11.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 15/SVG/Asset 12.svg";
import grammer_u1 from "../../../assets/audio/ClassBook/U2/PG 15/sound_P15.mp3";
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
  .replace(/[.,!?;:…“”"–—-]/g, " ")
  .replace(/\s+/g, " ").trim();

const Page9_Q3 = () => {
 const audio=useExerciseAudio();
  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);

  // ✅ الإجابات الصح
  const correct = ["d", "c", "b", "e", "a"];
  const captions = [
    {
      start: 0.319,
      end: 44.899,
      text: "Page 15, Write Activities, Exercise C. Listen, read, and match. The carnival comes to town this week, and the children are very excited. Tom is helping his dad with the car engine on Monday, so he is going to the carnival on Tuesday. Hansel goes to the carnival and hopes to get a trophy on Friday. Sarah is going to the carnival and riding the Ferris wheel on Monday. Sarah's dad takes care of his responsibilities on Wednesday, so he can go with her on Monday. Harley gets a trophy with his soccer team on Tuesday at the carnival, and Hansel eats apple pie on that day because it's his birthday. Helen's mom is sending her to get oil for the fridge motor next Monday. So after that, Helen is going to the carnival.",
    },
  ];
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
    <span className="relative mx-2">
      <input style={{borderBottom:locked || result[i] === true ? "2px solid #16a34a" : result[i] === false ? "2px solid #ef4444" : undefined}} {...fieldKeys} aria-label={["Question 1, matching picture letter: Who goes to the carnival and probably wins a trophy on Friday?","Question 2, matching picture letter: Who is helping his dad with the car engine?","Question 3, matching picture letter: Who gets a trophy on Tuesday?","Question 4, matching picture letter: Who gets a trophy on Tuesday?","Question 5, matching picture letter: Who eats apple pie on his birthday?"][i]} title={["Question 1, matching picture letter: Who goes to the carnival and probably wins a trophy on Friday?","Question 2, matching picture letter: Who is helping his dad with the car engine?","Question 3, matching picture letter: Who gets a trophy on Tuesday?","Question 4, matching picture letter: Who gets a trophy on Tuesday?","Question 5, matching picture letter: Who eats apple pie on his birthday?"][i]}
        disabled={locked || result[i] === true}
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        maxLength={1}
        className={`w-[40px] border-b outline-none text-center font-bold uppercase
        ${result[i] === false ? "border-red-500 text-[#6D2980]" : "border-black text-[#6D2980]"}
      `}
      />

      {/* ❌ */}
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

  // ====================
  // ✅ CHECK
  // ====================
  const checkAnswers = () => {
    if (locked) return;
 audio.stop();
    setAnnouncement("Answers checked. Correct answers stay locked; incorrect answers can be changed.");

    if (answers.some((a) => !a.trim())) {
      setAnnouncement("Please complete all fields.");
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;

    const res = answers.map((a, i) => {
      const ok = normalizeAnswer(a) === normalizeAnswer(correct[i]);
      if (ok) correctCount++;
      return ok;
    });

    setResult(res);

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

  // ====================
  // 👀 SHOW ANSWERS
  // ====================
  const showAnswers = () => {
 audio.stop();
    setAnnouncement("Correct answers shown and locked.");
    setAnswers(correct);
    setLocked(true);
    setResult([true, true, true, true, true]);
  };

  // ====================
  // 🔄 RESET
  // ====================
  const reset = () => {
 audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", ""]);
    setLocked(false);
    setResult([]);
  };

  return (
    <div data-exercise-scope="Unit2_Page6_Q1.jsx" className="p-8 flex flex-col items-center">
<AudioFeedback audio={audio} />
<style>{`[data-exercise-scope="Unit2_Page6_Q1.jsx"] input:focus-visible,[data-exercise-scope="Unit2_Page6_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="Unit2_Page6_Q1.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
        <div className="div-forall">
        <ExerciseHeader sectionLetter="C" title={<>Listen, read, and match</>} subTitle="Start with one item, find the matching partner, then connect the pair before moving to the next one." />
        <QuestionAudioPlayer pageId="sb_unit2_page6_q1"
          src={grammer_u1}
          captions={captions}
          stopAtSecond={6.6}
        />
        <div className="flex justify-between w-full text-[18px] mb-10">
          {" "}
          {/* LEFT */}
          <div className="space-y-25">
            <div>
              {input(0)} <span className="font-bold mr-2">1</span><AudioText audio={audio} id="fragment-0-0" src={clip0} label="Hear item 1"> Who goes to
              the carnival and probably wins a trophy on Friday?
            </AudioText></div>

            <div>
              {input(1)} <span className="font-bold mr-2 ">2</span><AudioText audio={audio} id="fragment-1-1" src={clip1} label="Hear item 2"> Who is
              helping his dad with the car engine?
            </AudioText></div>

            <div>
              {input(2)} <span className="font-bold mr-2">3</span><AudioText audio={audio} id="fragment-2-2" src={clip2} label="Hear item 3"> Who gets a
              trophy on Tuesday?
            </AudioText></div>

            <div>
              {input(3)} <span className="font-bold mr-2">4</span><AudioText audio={audio} id="fragment-3-3" src={clip2} label="Hear item 4"> Who gets a
              trophy on Tuesday?
            </AudioText></div>

            <div>
              {input(4)} <span className="font-bold mr-2">5</span> Who eats
              apple pie on his birthday?
            </div>
          </div>
          {/* RIGHT */}
          <div className="space-y-10 flex flex-col items-end">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={img1}
                alt="A smiling boy with brown hair wearing a plaid shirt."
                style={{ height: "80px", objectFit: "contain" }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={img2}
                alt="A girl with a ponytail and a red headband."
                style={{ height: "80px", objectFit: "contain" }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={img3}
                alt="A smiling boy with short brown hair."
                style={{ height: "80px", objectFit: "contain" }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={img4}
                alt="A smiling man with dark hair wearing a blue sweater."
                style={{ height: "80px", objectFit: "contain" }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={img5}
                alt="A girl with dark curly hair and a purple headband."
                style={{ height: "80px", objectFit: "contain" }}
              />
            </div>
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

export default Page9_Q3;
