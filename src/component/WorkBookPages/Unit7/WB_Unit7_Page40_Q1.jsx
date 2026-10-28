import soundC10 from "../../../assets/audio/Workbook/Unit 7/Page 40 - C/Item_010_lam.mp3";
import soundC9 from "../../../assets/audio/Workbook/Unit 7/Page 40 - C/Item_009_story_in_my_notebook._(write).mp3";
import soundC8 from "../../../assets/audio/Workbook/Unit 7/Page 40 - C/Item_008_at_the_funny_cartoon._(laugh).mp3";
import soundC7 from "../../../assets/audio/Workbook/Unit 7/Page 40 - C/Item_007_Tom_is.mp3";
import soundC6 from "../../../assets/audio/Workbook/Unit 7/Page 40 - C/Item_006_We_are.mp3";
import soundC5 from "../../../assets/audio/Workbook/Unit 7/Page 40 - C/Item_005_for_the_science_test_next_week._(study).mp3";
import soundC4 from "../../../assets/audio/Workbook/Unit 7/Page 40 - C/Item_004_with_her_friends._(play).mp3";
import soundC3 from "../../../assets/audio/Workbook/Unit 7/Page 40 - C/Item_003_She_is.mp3";
import soundC2 from "../../../assets/audio/Workbook/Unit 7/Page 40 - C/Item_002_in_the_field._(run).mp3";
import soundC1 from "../../../assets/audio/Workbook/Unit 7/Page 40 - C/Item_001_They_are.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../../StudentPages/unit5/useExerciseAudio";
import {AudioText,AudioFeedback,AudioSpeaker} from "../../StudentPages/unit5/ExerciseAudioText";
import {SentenceGroup,SentencePart} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const WB_Unit7_Page40_Q1 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const answers = ["running", "playing", "studying", "laughing", "writing"];

  const questions = [
    {
      before: "They are",

      after: "in the field.",

      verb: "(run)",
    },

    {
      before: "She is",

      after: "with her friends.",

      verb: "(play)",
    },

    {
      before: "We are",

      after: "for the science test next week.",

      verb: "(study)",
    },

    {
      before: "Tom is",

      after: "at the funny cartoon.",

      verb: "(laugh)",
    },

    {
      before: "I am",

      after: "a story in my notebook.",

      verb: "(write)",
    },
  ];

  const [studentAnswers, setStudentAnswers] = useState(["", "", "", "", ""]);

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

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  return (
    <div data-exercise-scope={"WB_Unit7_Page40_Q1.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="WB_Unit7_Page40_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit7_Page40_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit7_Page40_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <ExerciseHeader isWorkbook sectionLetter="C" title={<>
          
          Read and write the correct form of the verb.
        </>} subTitle="Identify the subject and action first, then use the correct form of be plus the -ing verb where the sentence requires it." />

        {/* QUESTIONS */}

        <div className="flex flex-col gap-15">
          {questions.map((q, index) => (
            <div key={index} className="flex items-end gap-2 w-full">
              <span className="font-bold w-[18px]">{index + 1}</span>

              <span><AudioText audio={audio} id={`prefix-${index}`} src={[soundC1,soundC3,soundC6,soundC7,soundC10][index]} label={`Hear ${q.before}`}>{q.before}</AudioText></span>

              <div className="relative flex-1">
                <input style={{borderBottomColor:(result[index]===true)?"#16a34a":(result[index]===false)?"#D1232A":undefined}} aria-invalid={result[index]===false} placeholder={"-ing verb"} title={`Sentence ${index+1}: ${q.before} ___ ${q.after} ${q.verb}`} aria-label={`Sentence ${index+1}: ${q.before} ___ ${q.after} ${q.verb}`} {...fieldKeys}
                  type="text"
                  value={studentAnswers[index]}
                  disabled={locked || result[index] === true}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className={`
      w-full
      min-w-[120px]
      border-0
      border-b
      outline-none
      bg-transparent
      text-[18px]
      text-[#6D2980]
      font-semibold
      px-1

      ${result[index] === false ? "border-[#D1232A]" : "border-black"}
    `}
                />

                {result[index] === false && (
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

              <SentencePart audio={audio} id={`ending-${index}`} src={[soundC2,soundC4,soundC5,soundC8,soundC9][index]} label={`Hear ${q.after} ${q.verb}`} first={true}><span>{q.after}</span></SentencePart>

              <SentencePart audio={audio} id={`ending-${index}`} src={[soundC2,soundC4,soundC5,soundC8,soundC9][index]} label={`Hear ${q.after} ${q.verb}`} first={false}><span>{q.verb}</span></SentencePart>
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

export default WB_Unit7_Page40_Q1;
