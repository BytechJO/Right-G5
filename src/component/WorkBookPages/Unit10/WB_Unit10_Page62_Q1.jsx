import soundL16 from "../../../assets/audio/Workbook/Unit 10/Page 62 - L/Item_016_composers.mp3";
import soundL15 from "../../../assets/audio/Workbook/Unit 10/Page 62 - L/Item_015_write_with_feelings_and_set_different.mp3";
import soundL14 from "../../../assets/audio/Workbook/Unit 10/Page 62 - L/Item_014_The.mp3";
import soundL13 from "../../../assets/audio/Workbook/Unit 10/Page 62 - L/Item_013_moods.mp3";
import soundL12 from "../../../assets/audio/Workbook/Unit 10/Page 62 - L/Item_012_of_music_is_just_like_eating_different_foods.mp3";
import soundL11 from "../../../assets/audio/Workbook/Unit 10/Page 62 - L/Item_011_Hearing_a.mp3";
import soundL10 from "../../../assets/audio/Workbook/Unit 10/Page 62 - L/Item_010_symphony.mp3";
import soundL9 from "../../../assets/audio/Workbook/Unit 10/Page 62 - L/Item_009_in_the_music_show.mp3";
import soundL8 from "../../../assets/audio/Workbook/Unit 10/Page 62 - L/Item_008_And_all_the_other.mp3";
import soundL7 from "../../../assets/audio/Workbook/Unit 10/Page 62 - L/Item_007_lively.mp3";
import soundL6 from "../../../assets/audio/Workbook/Unit 10/Page 62 - L/Item_006_We_love_seeing_the_violin,_the_harp,_and_the_piano,.mp3";
import soundL5 from "../../../assets/audio/Workbook/Unit 10/Page 62 - L/Item_005_instruments.mp3";
import soundL4 from "../../../assets/audio/Workbook/Unit 10/Page 62 - L/Item_004_and_fills_our_hearts_with_glee.mp3";
import soundL3 from "../../../assets/audio/Workbook/Unit 10/Page 62 - L/Item_003_It_sounds_so.mp3";
import soundL2 from "../../../assets/audio/Workbook/Unit 10/Page 62 - L/Item_002_variety.mp3";
import soundL1 from "../../../assets/audio/Workbook/Unit 10/Page 62 - L/Item_001_We_love_hearing_the_musicians_play_a_sweet.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../../StudentPages/unit5/useExerciseAudio";
import {AudioText,AudioFeedback,AudioSpeaker} from "../../StudentPages/unit5/ExerciseAudioText";
import {SentenceGroup,SentencePart} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGES
import musicImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U10/Page 62/Asset 10.svg";
import violinImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U10/Page 62/Asset 9.svg";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const WB_Unit10_Page62_Q1 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const wordBank = [
    "variety",
    "instruments",
    "lively",
    "symphony",
    "moods",
    "composers",
  ];

  const answers = [
    "symphony",
    "lively",
    "instruments",
    "variety",
    "composers",
    "moods",
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
    <div className="relative inline-flex flex-1">
      <input style={{borderBottomColor:(result[i]===true)?"#16a34a":(result[i]===false)?"#D1232A":undefined}} placeholder={"Word"} aria-invalid={result[i]===false} title={`Poem blank ${i+1}: ${["We love hearing the musicians play a sweet ___","It sounds so ___ and fills our hearts with glee","And all the other ___ in the music show","Hearing a ___ of music is just like eating different foods","The ___ write with feelings","write with feelings and set different ___"][i]}`} aria-label={`Poem blank ${i+1}: ${["We love hearing the musicians play a sweet ___","It sounds so ___ and fills our hearts with glee","And all the other ___ in the music show","Hearing a ___ of music is just like eating different foods","The ___ write with feelings","write with feelings and set different ___"][i]}`} {...fieldKeys}
        type="text"
        value={studentAnswers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          w-full
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
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "2px",
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
    <div data-exercise-scope={"WB_Unit10_Page62_Q1.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="WB_Unit10_Page62_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit10_Page62_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit10_Page62_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <ExerciseHeader isWorkbook sectionLetter="L" title={<>
          
          Read and write.
        </>} subTitle="Read the full sentence first, then choose the word or expression that fits both the meaning and grammar." />

        {/* CONTENT */}

        <div className="flex gap-8 items-start">
          {/* LEFT */}

          <div className="flex-1 leading-[2.5]">
            {/* LINE 1 */}

            <div className="flex items-center gap-2">
              <span><AudioText audio={audio} id={"fragment-0"} src={soundL1} label={"Hear We love hearing the musicians play a sweet"}>We love hearing the musicians play a sweet</AudioText></span>

              {inputField(0)}

              <span>.</span>
            </div>

            {/* LINE 2 */}

            <div className="flex items-center gap-2">
              <span><AudioText audio={audio} id={"fragment-1"} src={soundL3} label={"Hear It sounds so"}>It sounds so</AudioText></span>

              {inputField(1)}

              <span><AudioText audio={audio} id={"fragment-2"} src={soundL4} label={"Hear and fills our hearts with glee."}>and fills our hearts with glee.</AudioText></span>
            </div>

            {/* LINE 3 */}

            <div><AudioText audio={audio} id={"fragment-3"} src={soundL6} label={"Hear We love seeing the violin, the harp, and the piano,"}>We love seeing the violin, the harp, and the piano,</AudioText></div>

            {/* LINE 4 */}

            <div className="flex items-center gap-2">
              <span><AudioText audio={audio} id={"fragment-4"} src={soundL8} label={"Hear And all the other"}>And all the other</AudioText></span>

              {inputField(2)}

              <span><AudioText audio={audio} id={"fragment-5"} src={soundL9} label={"Hear in the music show."}>in the music show.</AudioText></span>
            </div>

            {/* LINE 5 */}

            <div className="flex items-center gap-2">
              <span><AudioText audio={audio} id={"fragment-6"} src={soundL11} label={"Hear Hearing a"}>Hearing a</AudioText></span>

              {inputField(3)}

              <span><AudioText audio={audio} id={"fragment-7"} src={soundL12} label={"Hear of music is just like eating different foods."}>of music is just like eating different foods.</AudioText></span>
            </div>

            {/* LINE 6 */}

            <div className="flex items-center gap-2">
              <span><AudioText audio={audio} id={"fragment-8"} src={soundL14} label={"Hear The"}>The</AudioText></span>

              {inputField(4)}

              <span><AudioText audio={audio} id={"fragment-9"} src={soundL15} label={"Hear write with feelings and set different"}>write with feelings and set different</AudioText></span>

              {inputField(5)}

              <span>.</span>
            </div>

            {/* IMAGES */}

            <div className="flex justify-center gap-15 mt-8">
              <img
                src={musicImg}
                alt={""}
                style={{
                  width: "250px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />

              <img
                src={violinImg}
                alt={"A violin in front of piano keys."}
                style={{
                  width: "210px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>

          {/* WORD BANK */}

          <div
            style={{
              border: "2px solid #6D2980",

              borderRadius: "10px",

              padding: "18px 24px",

              minWidth: "150px",
            }}
            className="
              flex
              flex-col
              gap-5
              text-[18px]
              mt-2.5
            "
          >
            {wordBank.map((word, index) => (
              <span key={index}><AudioText audio={audio} id={`bank-${index}`} src={[soundL2,soundL5,soundL7,soundL10,soundL13,soundL16][index]} label={`Hear ${word}`}>{word}</AudioText></span>
            ))}
          </div>
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

export default WB_Unit10_Page62_Q1;
