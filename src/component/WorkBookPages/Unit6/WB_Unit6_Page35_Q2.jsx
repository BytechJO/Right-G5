import soundG4 from "../../../assets/audio/Workbook/Unit 6/Page 35 - G/Item_004_!_Our_team_won!.mp3";
import soundG3 from "../../../assets/audio/Workbook/Unit 6/Page 35 - G/Item_003_Wow!_We.mp3";
import soundG2 from "../../../assets/audio/Workbook/Unit 6/Page 35 - G/Item_002_My_dad_bought_it_for_me.mp3";
import soundG1 from "../../../assets/audio/Workbook/Unit 6/Page 35 - G/Item_001_Look_at_my_new.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../../StudentPages/unit5/useExerciseAudio";
import {AudioText,AudioFeedback,AudioSpeaker} from "../../StudentPages/unit5/ExerciseAudioText";
import {SentenceGroup,SentencePart} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGES
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 35/Asset 11.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 35/Asset 29.svg";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const WB_Unit6_Page35_Q2 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const answers = ["action figure", "made it"];

  const questions = [
    {
      before: "Look at my new",

      after: ". My dad bought it for me.",

      image: img1,
    },

    {
      before: "Wow! We",

      after: "! Our team won!",

      image: img2,
    },
  ];

  const [studentAnswers, setStudentAnswers] = useState(["", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  // ------------------------
  // HANDLE INPUT
  // ------------------------

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...studentAnswers];

    updated[i] = value;

    setStudentAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (locked) return;audio.stop();

    const hasEmpty = studentAnswers.some((a) => !a.trim());

    if (hasEmpty) {
      (setAnnouncement(String("Please complete all answers.").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.info("Please complete all answers."));

      return;
    }

    let correctCount = 0;

    const newResults = studentAnswers.map((answer, i) => {
      const ok = normalize(answer) === normalize(answers[i]);

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = answers.length;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:18px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) {
      resetButtonRef.current?.focus({preventScroll:true});setLocked(true);

      (setAnnouncement(String(msg).replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.success(msg));
    } else if (correctCount === 0) {
      (setAnnouncement(String(msg).replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.error(msg));
    } else {
      (setAnnouncement(String(msg).replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.warning(msg));
    }
  };

  // ------------------------
  // SHOW ANSWERS
  // ------------------------

  const showAnswers = () => {audio.stop();setAnnouncement("Model answers shown and locked.");resetButtonRef.current?.focus({preventScroll:true});
    setStudentAnswers(answers);

    setResult([true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i, width) => (
    <div className="relative inline-block">
      <input placeholder={"Word or expression"} aria-invalid={result[i]===false} title={`Picture ${i+1}: ${questions[i].before} ___ ${questions[i].after}`} aria-label={`Picture ${i+1}: ${questions[i].before} ___ ${questions[i].after}`} {...fieldKeys}
        type="text"
        value={studentAnswers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          border-0
          border-b
          outline-none
          bg-transparent
          text-[20px]
          text-[#6D2980]
          font-semibold
          px-1

          ${result[i] === false ? "border-[#D1232A]" : "border-black"}
        `}
        style={{
          width,
        borderBottomColor:(result[i]===true)?"#16a34a":(result[i]===false)?"#D1232A":undefined}}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            width: "18px",
            height: "18px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
          }}
        >
          ✕
        </span>
      )}
    </div>
  );

  return (
    <div data-exercise-scope={"WB_Unit6_Page35_Q2.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="WB_Unit6_Page35_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit6_Page35_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit6_Page35_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[20px]">
        {/* TITLE */}

        <ExerciseHeader isWorkbook sectionLetter="G" title={<>
          
          Look, read, and write.
        </>} subTitle="Decide the purpose first—ability, advice, possibility, permission, or future—then choose the modal that expresses that meaning." />

        {/* QUESTION 1 */}

        <div className="flex justify-between items-center mb-20">
          {" "}
          <div className="flex items-start gap-4">
            <span className="font-bold">1</span>

            <div className="flex items-center flex-wrap gap-2">
              <span><AudioText audio={audio} id={"before-0"} src={soundG1} label={"Hear the beginning of sentence 1"}>{questions[0].before}</AudioText></span>

              {inputField(0, "170px")}

              <span><AudioText audio={audio} id={"after-0"} src={soundG2} label={"Hear the ending of sentence 1"}>{questions[0].after}</AudioText></span>
            </div>
          </div>
          {/* IMAGE */}
          <img
            src={questions[0].image}
            alt={"A small green toy soldier."}
            style={{
              width: "200px",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>

        {/* QUESTION 2 */}

        <div className="flex justify-between items-center mb-20">
          {" "}
          <div className="flex items-start gap-4">
            <span className="font-bold">2</span>

            <div className="flex items-center flex-wrap gap-2">
              <span><AudioText audio={audio} id={"before-1"} src={soundG3} label={"Hear the beginning of sentence 2"}>{questions[1].before}</AudioText></span>

              {inputField(1, "180px")}

              <span><AudioText audio={audio} id={"after-1"} src={soundG4} label={"Hear the ending of sentence 2"}>{questions[1].after}</AudioText></span>
            </div>
          </div>
          {/* IMAGE */}
          <img
            src={questions[1].image}
            alt={"A group of adults raising their arms and celebrating."}
            style={{
              width: "200px",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      {/* BUTTONS */}

      <div className="action-buttons-container">
        <button {...activationKeys} ref={resetButtonRef} aria-label={"Start Again"} type={"button"} className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>

        <button {...activationKeys} aria-label={"Show Answer"} type={"button"} className="show-answer-btn" onClick={showAnswers}>
          Show Answer
        </button>

        <button style={{cursor:locked?"not-allowed":"pointer"}} {...activationKeys} disabled={locked} aria-label={"Check Answer"} type={"button"} className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default WB_Unit6_Page35_Q2;
