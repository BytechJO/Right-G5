import soundM22 from "../../../assets/audio/Workbook/Unit 8/Page 50 - M/Item_022_that_this_is_my_country.mp3";
import soundM21 from "../../../assets/audio/Workbook/Unit 8/Page 50 - M/Item_021_I_have_no.mp3";
import soundM20 from "../../../assets/audio/Workbook/Unit 8/Page 50 - M/Item_020_and_out_of_hand.mp3";
import soundM19 from "../../../assets/audio/Workbook/Unit 8/Page 50 - M/Item_019_They_look_so.mp3";
import soundM18 from "../../../assets/audio/Workbook/Unit 8/Page 50 - M/Item_018_I_can't.mp3";
import soundM17 from "../../../assets/audio/Workbook/Unit 8/Page 50 - M/Item_017_the_people_or_the_land.mp3";
import soundM16 from "../../../assets/audio/Workbook/Unit 8/Page 50 - M/Item_016_when_you're_in_the_sky.mp3";
import soundM15 from "../../../assets/audio/Workbook/Unit 8/Page 50 - M/Item_015_They.mp3";
import soundM14 from "../../../assets/audio/Workbook/Unit 8/Page 50 - M/Item_014_high.mp3";
import soundM13 from "../../../assets/audio/Workbook/Unit 8/Page 50 - M/Item_013_spot.mp3";
import soundM12 from "../../../assets/audio/Workbook/Unit 8/Page 50 - M/Item_012_crowded.mp3";
import soundM11 from "../../../assets/audio/Workbook/Unit 8/Page 50 - M/Item_011_people_crossing_streets_from_up_so.mp3";
import soundM10 from "../../../assets/audio/Workbook/Unit 8/Page 50 - M/Item_010_hot-air_balloon.mp3";
import soundM9 from "../../../assets/audio/Workbook/Unit 8/Page 50 - M/Item_009_doubt.mp3";
import soundM8 from "../../../assets/audio/Workbook/Unit 8/Page 50 - M/Item_008_recognize.mp3";
import soundM7 from "../../../assets/audio/Workbook/Unit 8/Page 50 - M/Item_007_fly_over.mp3";
import soundM6 from "../../../assets/audio/Workbook/Unit 8/Page 50 - M/Item_006_I_can_see_the_beautiful.mp3";
import soundM4 from "../../../assets/audio/Workbook/Unit 8/Page 50 - M/Item_004_You_can.mp3";
import soundM3 from "../../../assets/audio/Workbook/Unit 8/Page 50 - M/Item_003_the_countryside.mp3";
import soundM2 from "../../../assets/audio/Workbook/Unit 8/Page 50 - M/Item_002_ride.mp3";
import soundM1 from "../../../assets/audio/Workbook/Unit 8/Page 50 - M/Item_001_I_love_to_go_on_the.mp3";





















import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../../StudentPages/unit5/useExerciseAudio";
import {AudioText,AudioFeedback,AudioSpeaker} from "../../StudentPages/unit5/ExerciseAudioText";
import {SentenceGroup,SentencePart} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGE
import balloonImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U8/Page 50/Asset 1 (5).svg";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const WB_Unit8_Page50_Q2 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const questions = [
    {
      before: "I love to go on the",

      after: "ride.",

      answer: "hot-air balloon",
    },

    {
      before: "You can",

      after: "the countryside.",

      answer: "fly over",
    },

    {
      before: "I can see the beautiful",

      after: ".",

      answer: "landscape",
    },

    {
      before: "I",

      after: "people crossing streets from up so high.",

      answer: "spot",
    },

    {
      before: "They",

      after: "when you’re in the sky.",

      answer: "look like ants",
    },

    {
      before: "I can’t",

      after: "the people or the land.",

      answer: "recognize",
    },

    {
      before: "They look so",

      after: "and out of hand.",

      answer: "crowded",
    },

    {
      before: "I have no",

      after: "that this is my country.",

      answer: "doubt",
    },
  ];

  const [studentAnswers, setStudentAnswers] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize=text=>normalizeAnswer(text).replace(/hot\s*air/g,"hotair");

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

    setResult([true, true, true, true, true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", "", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i, width = "180px") => (
    <div className="relative inline-block">
      <input onKeyUp={fieldKeys.onKeyUp} onKeyDown={event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.stopPropagation();if((locked||result[i]===true)&&[soundM10,soundM7,null,soundM13,null,soundM8,soundM12,soundM9][i]){event.preventDefault();if(!event.repeat)audio.play(`answer-${i}`,[soundM10,soundM7,null,soundM13,null,soundM8,soundM12,soundM9][i]);}}} onClick={()=>{if((locked||result[i]===true)&&[soundM10,soundM7,null,soundM13,null,soundM8,soundM12,soundM9][i])audio.play(`answer-${i}`,[soundM10,soundM7,null,soundM13,null,soundM8,soundM12,soundM9][i]);}} data-answer-audio={true} aria-disabled={locked||result[i]===true} aria-invalid={result[i]===false} placeholder={"Word / phrase"} title={`Sentence ${i+1}: ${questions[i].before} ___ ${questions[i].after}`} aria-label={`Sentence ${i+1}: ${questions[i].before} ___ ${questions[i].after}`} 
        type="text"
        value={studentAnswers[i]}
        readOnly={locked || result[i]===true}
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
        borderBottomColor:(result[i]===true)?"#16a34a":(result[i]===false)?"#D1232A":undefined,backgroundColor:audio.activeId===`answer-${i}`?"#dbeafe":undefined,boxShadow:audio.activeId===`answer-${i}`?"0 0 0 3px #2563eb":undefined}}
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
    {audio.activeId===`answer-${i}`&&<AudioSpeaker/>}</div>
  );

  return (
    <div data-exercise-scope={"WB_Unit8_Page50_Q2.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="WB_Unit8_Page50_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit8_Page50_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit8_Page50_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <ExerciseHeader isWorkbook sectionLetter="M" title={<>
          
          Read and write.
        </>} subTitle="Read the full sentence first, then choose the word or expression that fits both the meaning and grammar." />

        {/* CONTENT */}

        <div className="flex gap-8 items-start">
          {/* LEFT */}

          <div className="flex-1 flex flex-col gap-4">
            {questions.map((q, index) => (
              <div key={index} className="leading-loose">
                {([soundM1,soundM4,soundM6,null,soundM15,soundM18,soundM19,soundM21][index])?<AudioText audio={audio} id={`prefix-${index}`} src={[soundM1,soundM4,soundM6,null,soundM15,soundM18,soundM19,soundM21][index]} label={`Hear ${q.before}`}>{q.before}</AudioText>:q.before} {inputField(index)} {([soundM2,soundM3,null,[soundM11,soundM14],soundM16,soundM17,soundM20,soundM22][index])?<AudioText audio={audio} id={`ending-${index}`} src={[soundM2,soundM3,null,[soundM11,soundM14],soundM16,soundM17,soundM20,soundM22][index]} label={`Hear ${q.after}`}>{q.after}</AudioText>:q.after}
              </div>
            ))}
          </div>

          {/* IMAGE */}

          <img
            src={balloonImg}
            alt={"A hot-air balloon outline containing the clues: landscape, look like ants, fly over, recognize, doubt, hot-air balloon, spot and crowded."}
            style={{
              width: "350px",
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

export default WB_Unit8_Page50_Q2;
