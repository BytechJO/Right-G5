import soundJ7 from "../../../assets/audio/Workbook/Unit 8/Page 49 - J/Item_007_2_Nobody_brought_cake.mp3";
import soundJ6 from "../../../assets/audio/Workbook/Unit 8/Page 49 - J/Item_006_1_No_one_brought_chips.mp3";
import soundJ1 from "../../../assets/audio/Workbook/Unit 8/Page 49 - J/Item_001_Helen_and_her_friends_went_on_a_field_trip._Everyone_packed_their_backpa.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../../StudentPages/unit5/useExerciseAudio";
import {AudioText,AudioFeedback,AudioSpeaker} from "../../StudentPages/unit5/ExerciseAudioText";
import {SentenceGroup,SentencePart} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGES
// IMAGE
import mainImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U8/Page 49/Asset 18.svg";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();

const WB_Unit8_Page49_Q1 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const questions = [
    {
      sentence: "No one brought chips.",

      correct: "false",
    },

    {
      sentence: "Nobody brought cake.",

      correct: "false",
    },

    {
      sentence: "Everyone brought water.",

      correct: "true",
    },

    {
      sentence: "Someone brought sandwiches.",

      correct: "false",
    },

    {
      sentence: "Someone brought cookies.",

      correct: "true",
    },

    {
      sentence: "Everybody brought hot dogs.",

      correct: "true",
    },
  ];

  const [studentAnswers, setStudentAnswers] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

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
      const ok = normalize(answer) === normalize(questions[i].correct);

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = questions.length;

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
    setStudentAnswers(questions.map((q) => q.correct));

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i) => (
    <div className="relative inline-block">
      <input style={{borderBottomColor:(result[i]===true)?"#16a34a":(result[i]===false)?"#D1232A":undefined,...(result[i]===true?{borderColor:"#16a34a"}:result[i]===false?{borderColor:"#D1232A"}:{})}} aria-invalid={result[i]===false}  title={`Statement ${i+1}: ${questions[i].sentence} Write true or false.`} aria-label={`Statement ${i+1}: ${questions[i].sentence} Write true or false.`} {...fieldKeys}
        type="text"
        value={studentAnswers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          w-[70px]
          border
          outline-none
          bg-transparent
          text-[18px]
          text-center
          text-[#6D2980]
          font-semibold
          rounded-lg
          px-1
          py-1

        `}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            width: "20px",
            height: "20px",
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
    <div data-exercise-scope={"WB_Unit8_Page49_Q1.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="WB_Unit8_Page49_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit8_Page49_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit8_Page49_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <ExerciseHeader isWorkbook sectionLetter="J" title={<>
          
          Look, read, and write <span className="text-[#00AEEF]">true</span>or
          <span className="text-[#00AEEF]">false</span>.
        </>} subTitle="Compare every statement with the backpack chart before choosing true or false; do not rely on memory from earlier items." />

        {/* TOP TEXT */}

        <div className=" leading-normal"><AudioText audio={audio} id={"fragment-0"} src={soundJ1} label={"Hear Helen and her friends went on a field trip. Everyone packed their backpack for the trip."}>
          Helen and her friends went on a field trip. Everyone packed their
          backpack for the trip.
        </AudioText></div>

        {/* IMAGE BOX */}
        <div
          style={{
            overflow: "hidden",
          }}
          className="mb-10"
        >
          <img
            src={mainImg}
            alt={"Food chart with columns Helen, Kelly, James and Mike. Every column shows water and a filled bun. Helen and Kelly have chips; Helen, James and Mike have cookies."}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>

        {/* QUESTIONS */}

        <div className="grid grid-cols-2 gap-y-6 gap-x-10 mb-10">
          {questions.map((q, index) => (
            <SentenceGroup label={`Hear statement ${index+1}: ${q.sentence}`} src={[soundJ6,soundJ7,null,null,null,null][index]} id={`sentence-${index}`} audio={audio} key={index} className="flex items-center gap-3">
              {inputField(index)}

              <span className="font-bold">{index + 1}</span>

              <span>{q.sentence}</span>
            </SentenceGroup>
          ))}
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

export default WB_Unit8_Page49_Q1;
