import soundA11 from "../../../assets/audio/Workbook/Unit 10/Page 57 - A/Item_011_You_have_an_a_long_way_to_go_house._It's_huge!.mp3";
import soundA10 from "../../../assets/audio/Workbook/Unit 10/Page 57 - A/Item_010_You_must_be_so_tired_after_studying_for_so_long,_acres.mp3";
import soundA9 from "../../../assets/audio/Workbook/Unit 10/Page 57 - A/Item_009_That_was_a_very_enormous_performance!.mp3";
import soundA8 from "../../../assets/audio/Workbook/Unit 10/Page 57 - A/Item_008_I_like_to_eat_a_symphony_of_fruit.mp3";
import soundA7 from "../../../assets/audio/Workbook/Unit 10/Page 57 - A/Item_007_huh.mp3";
import soundA3 from "../../../assets/audio/Workbook/Unit 10/Page 57 - A/Item_003_variety.mp3";
import soundA2 from "../../../assets/audio/Workbook/Unit 10/Page 57 - A/Item_002_enormous.mp3";
import soundA1 from "../../../assets/audio/Workbook/Unit 10/Page 57 - A/Item_001_lively.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../../StudentPages/unit5/useExerciseAudio";
import {AudioText,AudioFeedback,AudioSpeaker} from "../../StudentPages/unit5/ExerciseAudioText";
import {SentenceGroup,SentencePart} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const WB_Unit10_Page57_Q1 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const wordBank = ["lively", "enormous", "variety", "huh"];

  const questions = [
    {
      sentence: (
        <>
          I like to eat a{" "}
          <span
            style={{
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            }}
          >
            symphony
          </span>{" "}
          of fruit.
        </>
      ),

      answer: "I like to eat a variety of fruit.",
    },

    {
      sentence: (
        <>
          That was a very{" "}
          <span
            style={{
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            }}
          >
            enormous
          </span>{" "}
          performance!
        </>
      ),

      answer: "That was a very lively performance!",
    },

    {
      sentence: (
        <>
          You must be so tired after studying for so long,{" "}
          <span
            style={{
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            }}
          >
            acres
          </span>
          ?
        </>
      ),

      answer: "You must be so tired after studying for so long, huh?",
    },

    {
      sentence: (
        <>
          You have an{" "}
          <span
            style={{
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            }}
          >
            a long way to go
          </span>{" "}
          house. It’s huge!
        </>
      ),

      answer: "You have an enormous house. It’s huge!",
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

  const inputField = (i) => (
    <div className="relative w-full">
      <input style={{borderBottomColor:(result[i]===true)?"#16a34a":(result[i]===false)?"#D1232A":undefined}} placeholder={"Corrected sentence"} aria-invalid={result[i]===false} title={`Rewrite sentence ${i+1}, replacing its underlined expression. Use the word bank above.`} aria-label={`Rewrite sentence ${i+1}, replacing its underlined expression. Use the word bank above.`} {...fieldKeys}
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
    <div data-exercise-scope={"WB_Unit10_Page57_Q1.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="WB_Unit10_Page57_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit10_Page57_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit10_Page57_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <ExerciseHeader isWorkbook sectionLetter="A" title={<>
          
          Read, change, and write.
        </>} subTitle="Locate the incorrect word or phrase first, then rewrite only what is needed and reread the whole sentence." />

        {/* WORD BANK */}

        <div
          className="
            flex
            justify-center
            gap-14"
        >
          {wordBank.map((word, index) => (
            <div
              key={index}
              style={{
                border: "2px solid #6D2980",
                borderRadius: "8px",
                minWidth: "110px",
                height: "42px",
              }}
              className="
                flex
                items-center
                justify-center
                text-[18px]
              "
            ><AudioText audio={audio} id={`bank-${index}`} src={[soundA1,soundA2,soundA3,soundA7][index]} label={`Hear ${word}`}>
              {word}
            </AudioText></div>
          ))}
        </div>

        {/* QUESTIONS */}

        <div className="flex flex-col gap-6">
          {questions.map((q, index) => (
            <div key={index}>
              {/* QUESTION */}

              <SentenceGroup label={`Hear sentence ${index+1}`} src={[soundA8,soundA9,soundA10,soundA11][index]} id={`sentence-${index}`} audio={audio} className="flex gap-4 mb-3">
                <span className="font-bold">{index + 1}</span>

                <div className="leading-[1.8]">{q.sentence}</div>
              </SentenceGroup>

              {/* INPUT */}

              <div className="pl-[35px]">{inputField(index)}</div>
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

export default WB_Unit10_Page57_Q1;
