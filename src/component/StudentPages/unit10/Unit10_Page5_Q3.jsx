import clip0 from "../../../assets/audio/ClassBook/U10/Page 86 - C/Item_001_It's_your_turn.mp3";
import clip1 from "../../../assets/audio/ClassBook/U10/Page 86 - C/Item_002_huh.mp3";
import clip2 from "../../../assets/audio/ClassBook/U10/Page 86 - C/Item_003_a_long_way_to_go.mp3";
import clip3 from "../../../assets/audio/ClassBook/U10/Page 86 - C/Item_004_what_someone_says_when_it's_time_for_the_next_person_to_go.mp3";
import clip4 from "../../../assets/audio/ClassBook/U10/Page 86 - C/Item_005_to_travel_or_go_a_long_distance.mp3";
import clip5 from "../../../assets/audio/ClassBook/U10/Page 86 - C/Item_006_what_someone_says_when_they_don't_understand_something_or_didn't_hear.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../unit5/useExerciseAudio";
import {AudioText,AudioFeedback} from "../unit5/ExerciseAudioText";

import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const Unit10_Page5_Q3 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const questions = ["It’s your turn.", "a long way to go", "huh?"];

  const [answers, setAnswers] = useState(["", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...answers];

    updated[i] = value;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;audio.stop();

    const hasEmpty = answers.some((a) => !a.trim());

    if (hasEmpty) {
      (setAnnouncement(String("Please complete all answers.").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.info("Please complete all answers."));

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((a, i) => {
      const ok = normalize(a) === normalize(questions[i]);

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

  const showAnswers = () => {audio.stop();setAnnouncement("Model answers shown and locked.");resetButtonRef.current?.focus({preventScroll:true});
    setAnswers(["It’s your turn.", "a long way to go", "huh?"]);

    setResult([true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width) => (
    <span className="relative inline-block">
      <input placeholder={"Expression"} style={{...(result[i]===true?{borderBottomColor:"#16a34a"}:{})}} aria-invalid={result[i]===false} title={`Definition ${i+1}, choose the expression from the box`} aria-label={`Definition ${i+1}, choose the expression from the box`} {...fieldKeys}
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          ${width}
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
    </span>
  );

  return (
    <div data-exercise-scope={"Unit10_Page5_Q3.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="Unit10_Page5_Q3.jsx"] input:focus-visible,[data-exercise-scope="Unit10_Page5_Q3.jsx"] textarea:focus-visible,[data-exercise-scope="Unit10_Page5_Q3.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div
        className="div-forall"
        style={{
          minHeight: "67vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* TITLE */}
        <ExerciseHeader sectionLetter="C" title={<>
          
          Write each expression next to its definition.
        </>} subTitle="Use the picture, definition, chart, or grammar clue, then complete each answer before checking."/>

        {/* WORD BOX */}
        <div
          style={{
            background: "#E9E1EC",
            borderRadius: "16px",
            padding: "14px 28px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "760px",
            marginBottom: "10px",
            fontSize: "18px",
          }}
        >
          <span><AudioText audio={audio} id={"audio-0"} src={clip0} label={"Hear It’s your turn."}>It’s your turn.</AudioText></span>

          <span><AudioText audio={audio} id={"audio-1"} src={clip1} label={"Hear huh?"}>huh?</AudioText></span>

          <span><AudioText audio={audio} id={"audio-2"} src={clip2} label={"Hear a long way to go"}>a long way to go</AudioText></span>
        </div>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-15">
          {/* 1 */}
          <div className="flex items-center gap-4">
            <span className="font-bold text-[18px]">1</span>

            <span className="text-[18px]"><AudioText audio={audio} id={"audio-3"} src={clip3} label={"Hear what someone says when it’s time for the next person to go"}>
              what someone says when it’s time for the next person to go
            </AudioText></span>

            {inputField(0, "w-[260px]")}
          </div>

          {/* 2 */}
          <div className="flex items-center gap-4">
            <span className="font-bold text-[18px]">2</span>

            <span className="text-[18px]"><AudioText audio={audio} id={"audio-4"} src={clip4} label={"Hear to travel or go a long distance"}>to travel or go a long distance</AudioText></span>

            {inputField(1, "w-[240px]")}
          </div>

          {/* 3 */}
          <div className="flex items-center gap-4">
            <span className="font-bold text-[18px]">3</span>

            <span className="text-[18px]"><AudioText audio={audio} id={"audio-5"} src={clip5} label={"Hear what someone says when they don’t understand something or didn’t hear"}>
              what someone says when they don’t understand something or didn’t
              hear
            </AudioText></span>

            {inputField(2, "w-[200px]")}
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

export default Unit10_Page5_Q3;
