import clip0 from "../../../assets/audio/ClassBook/U10/Page 86 - A/Item_001_This_music_you_will_love_to_hear,.mp3";
import clip1 from "../../../assets/audio/ClassBook/U10/Page 86 - A/Item_002_The_many_instruments_make_it_sound_so_dear.mp3";
import clip2 from "../../../assets/audio/ClassBook/U10/Page 86 - A/Item_003_Picking_pumpkins,_squash,_and_potatoes,.mp3";
import clip3 from "../../../assets/audio/ClassBook/U10/Page 86 - A/Item_004_But_my_favorite_to_pick_is_the_tomatoes.mp3";
import clip4 from "../../../assets/audio/ClassBook/U10/Page 86 - A/Item_005_This_much_land_takes_lots_of_space,.mp3";
import clip5 from "../../../assets/audio/ClassBook/U10/Page 86 - A/Item_006_A_house_and_a_garden_fit_here_in_any_case.mp3";
import clip6 from "../../../assets/audio/ClassBook/U10/Page 86 - A/Item_007_These_people_write_music_with_such_perfect_sound,.mp3";
import clip7 from "../../../assets/audio/ClassBook/U10/Page 86 - A/Item_008_To_hear_it,_thousands_will_gather_around.mp3";
import clip8 from "../../../assets/audio/ClassBook/U10/Page 86 - A/Item_009_Happy,_sad,_lively,_or_mad,.mp3";
import clip9 from "../../../assets/audio/ClassBook/U10/Page 86 - A/Item_010_These_can_be_good_or_sometimes_bad.mp3";
import clip10 from "../../../assets/audio/ClassBook/U10/Page 86 - A/Item_011_A_piano_is_one,_and_so_is_a_violin,.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../unit5/useExerciseAudio";
import {AudioText,AudioFeedback} from "../unit5/ExerciseAudioText";

import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const Unit10_Page5_Q1 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const questions = [
    "symphony",
    "harvesting",
    "acres",
    "composers",
    "moods",
    "instrument",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);

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
    setAnswers([
      "symphony",
      "harvesting",
      "acres",
      "composers",
      "moods",
      "instrument",
    ]);

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width) => (
    <span className="relative inline-block">
      <input placeholder={"Word"} style={{...(result[i]===true?{borderBottomColor:"#16a34a"}:{})}} aria-invalid={result[i]===false} title={`Riddle ${i+1}, write its vocabulary word`} aria-label={`Riddle ${i+1}, write its vocabulary word`} {...fieldKeys}
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
    <div data-exercise-scope={"Unit10_Page5_Q1.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="Unit10_Page5_Q1.jsx"] input:focus-visible,[data-exercise-scope="Unit10_Page5_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="Unit10_Page5_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall" style={{gap:"30px"}}>
        {/* TITLE */}
        <ExerciseHeader sectionLetter="A" title={<>
          
          Read the riddles and write the correct vocabulary word.
        </>} subTitle="Use the picture, definition, chart, or grammar clue, then complete each answer before checking."/>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-5 mb-10">
          {[
            {
              line1: "This music you will love to hear,",
              line2: "The many instruments make it sound so dear.",
            },
            {
              line1: "Picking pumpkins, squash, and potatoes,",
              line2: "But my favorite to pick is the tomatoes.",
            },
            {
              line1: "This much land takes lots of space,",
              line2: "A house and a garden fit here in any case.",
            },
            {
              line1: "These people write music with such perfect",
              line2: "sound, To hear it, thousands will gather around.",
            },
            {
              line1: "Happy, sad, lively, or mad,",
              line2: "These can be good or sometimes bad.",
            },
            {
              line1: "A piano is one, and so is a violin,",
              line2: "Almost any will make me grin.",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              {/* NUMBER */}
              <span className="font-bold text-[18px] w-5">{i + 1}</span>

              {/* TEXT + INPUT */}
              <div
                style={{
                  width: "100%",
                  maxWidth: "760px",
                }}
              >
                <div className="text-[18px]"><AudioText audio={audio} id={`riddle-${i}-line1`} src={[clip0,clip2,clip4,clip6,clip8,clip10][i]} label={`Hear riddle ${i+1}, first line: ${item.line1}`}>{item.line1}</AudioText></div>

                <div
                  className="flex items-center justify-between mt-1"
                  style={{
                    minHeight: "40px",
                  }}
                >
                  <span className="text-[18px]">{i<5?<AudioText audio={audio} id={`riddle-${i}-line2`} src={[clip1,clip3,clip5,clip7,clip9][i]} label={`Hear riddle ${i+1}, second line: ${item.line2}`}>{item.line2}</AudioText>:item.line2}</span>

                  <div
                    style={{
                      width: "260px",
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    {inputField(i, "w-[240px]")}
                  </div>
                </div>
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

export default Unit10_Page5_Q1;
