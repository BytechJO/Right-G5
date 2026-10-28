import soundB7 from "../../../assets/audio/Workbook/Unit 8/Page 45 - B/Item_007_is_so_colorful.mp3";
import soundB6 from "../../../assets/audio/Workbook/Unit 8/Page 45 - B/Item_006_crosses_the_street.mp3";
import soundB5 from "../../../assets/audio/Workbook/Unit 8/Page 45 - B/Item_005_The.mp3";
import soundB2 from "../../../assets/audio/Workbook/Unit 8/Page 45 - B/Item_002_Let's_play_some.mp3";
import soundB1 from "../../../assets/audio/Workbook/Unit 8/Page 45 - B/Item_001_I'm_up_so_high._I_feel_like_I'm_at_the.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../../StudentPages/unit5/useExerciseAudio";
import {AudioText,AudioFeedback,AudioSpeaker} from "../../StudentPages/unit5/ExerciseAudioText";
import {SentenceGroup,SentencePart} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGES
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U8/Page 45/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U8/Page 45/Asset 14.svg";
import img3 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U8/Page 45/Asset 16.svg";
import img4 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U8/Page 45/Asset 4.svg";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const WB_Unit8_Page45_Q2 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const questions = [
    {
      image: img1,

      sentence: "I’m up so high. I feel like I’m at the",

      answer: "top of the world",
    },

    {
      image: img2,

      sentence: "Let’s play some",

      answer: "board game",
    },

    {
      image: img3,

      sentence: "The __________ crosses the street.",

      answer: "pedestrian",
    },

    {
      image: img4,

      sentence: "The __________ is so colorful.",

      answer: "rainbow",
    },
  ];

  const [studentAnswers, setStudentAnswers] = useState(["", "", "", ""]);

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
      const ok = normalize(answer) === normalize(questions[i].answer);

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
    setStudentAnswers(questions.map((q) => q.answer));

    setResult([true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i, width = "220px") => (
    <div className="relative inline-block">
      <input aria-invalid={result[i]===false} placeholder={"Word / phrase"} title={`Picture ${i+1}: ${questions[i].sentence}`} aria-label={`Picture ${i+1}: ${questions[i].sentence}`} {...fieldKeys}
        type="text"
        value={studentAnswers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
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
    <div data-exercise-scope={"WB_Unit8_Page45_Q2.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="WB_Unit8_Page45_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit8_Page45_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit8_Page45_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <ExerciseHeader isWorkbook sectionLetter="B" title={<>
          
          Look, read, and write.
        </>} subTitle="Use the picture as the main clue, identify the action or detail shown, then write the complete question or sentence." />

        {/* QUESTIONS */}

        <div className="grid grid-cols-2 gap-y-12 gap-x-16">
          {questions.map((q, index) => (
            <div key={index}>
              {/* TOP */}

              <div className="flex items-start gap-3 mb-4">
                <span className="font-bold">{index + 1}</span>

                <img
                  src={q.image}
                  alt={["A colorful hot-air balloon in the sky near the sun.","Two children seated on the floor playing a board game.","A person walking across a zebra crossing in front of a vehicle.","A rainbow above white clouds."][index]}
                  style={{
                    width: "220px",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* SENTENCE */}

              {/* SENTENCE */}

              <div className="leading-loose pl-7">
                {q.sentence.includes("__________") ? (
                  <>
                    {/* السطر الأول */}

                    <div className="flex items-end gap-3 flex-wrap">
                      <span><AudioText audio={audio} id={`prefix-${index}`} src={soundB5} label={"Hear The"}>{q.sentence.split("__________")[0]}</AudioText></span>

                      {inputField(index)}
                    </div>

                    {/* السطر الثاني */}

                    <div><AudioText audio={audio} id={`ending-${index}`} src={[null,null,soundB6,soundB7][index]} label={`Hear the ending of sentence ${index+1}`}>{q.sentence.split("__________")[1]}</AudioText></div>
                  </>
                ) : (
                  <>
                    {/* الجملة */}

                    <div><AudioText audio={audio} id={`prefix-${index}`} src={[soundB1,soundB2][index]} label={`Hear sentence ${index+1}`}>{q.sentence}</AudioText></div>

                    {/* الانبوت تحت */}

                    <div>
                      {inputField(index)} {index === 0 ? "!" : "."}
                    </div>
                  </>
                )}
              </div>
            </div>
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

export default WB_Unit8_Page45_Q2;
