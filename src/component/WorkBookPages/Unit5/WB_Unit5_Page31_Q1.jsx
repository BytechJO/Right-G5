import soundK6 from "../../../assets/audio/Workbook/Unit 5/Page 31 - K/Item_006_Could_you_please_help_me_carry_the_books.mp3";
import soundK5 from "../../../assets/audio/Workbook/Unit 5/Page 31 - K/Item_005_Would_you_please_close_the_door.mp3";
import soundK4 from "../../../assets/audio/Workbook/Unit 5/Page 31 - K/Item_004_I_would_prefer_steak,_please.mp3";
import soundK3 from "../../../assets/audio/Workbook/Unit 5/Page 31 - K/Item_003_We_would_like_to_order,_please.mp3";
import soundK2 from "../../../assets/audio/Workbook/Unit 5/Page 31 - K/Item_002_Would_you_please_eat_your_dinner.mp3";
import soundK1 from "../../../assets/audio/Workbook/Unit 5/Page 31 - K/Item_001_Could_you_please_show_me_where_the_restroom_is.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../../StudentPages/unit5/useExerciseAudio";
import {AudioFeedback} from "../../StudentPages/unit5/ExerciseAudioText";
import {SentenceGroup} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGES
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U5/Page 31/Asset 5.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U5/Page 31/Asset 16.svg";
import img3 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U5/Page 31/Asset 7.svg";
import img4 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U5/Page 31/Asset 8.svg";
import img5 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U5/Page 31/Asset 9.svg";
import img6 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U5/Page 31/Asset 15.svg";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const WB_Unit5_Page31_Q1 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const answers = ["4", "6", "2", "1", "3", "5"];

  const sentences = [
    "Could you please show me where the restroom is?",

    "Would you please eat your dinner?",

    "We would like to order, please.",

    "I would prefer steak, please.",

    "Would you please close the door?",

    "Could you please help me carry the books?",
  ];

  const images = [img1, img2, img3, img4, img5, img6];

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

    // فقط رقم واحد
    if (value && !/^[1-6]$/.test(value)) return;

    if(value&&studentAnswers.some((answer,index)=>index!==i&&answer===value)){setAnnouncement(`Number ${value} is already used. Choose another number.`);return;}setAnnouncement(value?`Picture ${i+1}: sentence ${value} selected.`:`Picture ${i+1}: answer cleared.`);const updated = [...studentAnswers];

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

    const hasEmpty = studentAnswers.some((a) => !a);

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
    <div className="relative">
      <input onKeyUp={fieldKeys.onKeyUp} onKeyDown={event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();if(event.key==="ArrowUp"||event.key==="ArrowDown"){event.preventDefault();event.stopPropagation();if(locked||result[i]===true)return;const step=event.key==="ArrowUp"?1:-1;let next=Number(studentAnswers[i])||(step===1?0:1);for(let n=0;n<6;n++){next=(next+step+5)%6+1;if(!studentAnswers.some((value,index)=>index!==i&&value===String(next))){handleChange(i,String(next));return;}}}}} inputMode={"numeric"} aria-invalid={result[i]===false} title={`Picture ${i+1}: enter its sentence number, 1 to 6`} aria-label={`Picture ${i+1}: enter its sentence number, 1 to 6`} 
        type="text"
        value={studentAnswers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        maxLength={1}
        className={`
          w-[26px]
          h-[26px]
          text-center
          outline-none
          text-[16px]
          text-[#6D2980]
          font-bold
        `}
        style={{
          borderRadius: "3px",
        borderBottomStyle:result[i]!==undefined?"solid":undefined,borderBottomWidth:result[i]!==undefined?2:undefined,borderBottomColor:result[i]===true?"#16a34a":result[i]===false?"#D1232A":undefined}}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            width: "18px",
            height: "18px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
            fontWeight: "bold",
            border: "2px solid white",
          }}
        >
          ✕
        </span>
      )}
    </div>
  );

  return (
    <div data-exercise-scope={"WB_Unit5_Page31_Q1.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="WB_Unit5_Page31_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit5_Page31_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit5_Page31_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <ExerciseHeader isWorkbook sectionLetter="K" title={<>
          
          Read, look, and number.
        </>} subTitle="Read all choices once, then assign one number at a time so every item matches the intended order or picture." />

        {/* SENTENCES */}

        <div className="grid grid-cols-2 gap-2 mb-10">
          {sentences.map((sentence, index) => (
            <SentenceGroup label={`Hear sentence ${index+1}: ${sentence}`} src={[soundK1,soundK2,soundK3,soundK4,soundK5,soundK6][index]} id={`sentence-${index}`} audio={audio} key={index} className="flex items-center gap-3">
              <span className="font-bold w-[18px]">{index + 1}</span>

              <span>{sentence}</span>
            </SentenceGroup>
          ))}
        </div>

        {/* IMAGES */}

        <div className="grid grid-cols-3 gap-y-5 gap-x-2 mb-10">
          {images.map((img, index) => (
            <div key={index} className="relative w-fit">
              <img
                src={img}
                alt={["A waiter holding a plate of chicken beside a man thinking about steak.","A man carrying a stack of books beside a boy reaching toward them.","A family seated around a dinner table, with food on their plates.","A boy talking to a waiter, with a door in his thought bubble.","A waiter taking an order from two diners holding menus.","A girl beside a woman pointing toward an open door."][index]}
                style={{
                  width: "205px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />

              {/* NUMBER BOX */}

              <div className="absolute top-px right-px">
                {inputField(index)}
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

export default WB_Unit5_Page31_Q1;
