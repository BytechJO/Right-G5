import soundD18 from "../../../assets/audio/Workbook/Unit 6/Page 34 - D/Item_018_action_hero,_or_a_robot.mp3";
import soundD17 from "../../../assets/audio/Workbook/Unit 6/Page 34 - D/Item_017_asmall_plastic_toy_that_may_look_like_a_soldier,.mp3";
import soundD15 from "../../../assets/audio/Workbook/Unit 6/Page 34 - D/Item_015_percent_off_a_price_of_something.mp3";
import soundD13 from "../../../assets/audio/Workbook/Unit 6/Page 34 - D/Item_013_small_closed_area_where_things_are_sold.mp3";
import soundD11 from "../../../assets/audio/Workbook/Unit 6/Page 34 - D/Item_011_tides_and_places_to_see.mp3";
import soundD9 from "../../../assets/audio/Workbook/Unit 6/Page 34 - D/Item_009_did_well.mp3";
import soundD7 from "../../../assets/audio/Workbook/Unit 6/Page 34 - D/Item_007_person_who_has_a_special_skill_in_something.mp3";
import soundD5 from "../../../assets/audio/Workbook/Unit 6/Page 34 - D/Item_005_it.mp3";
import soundD3 from "../../../assets/audio/Workbook/Unit 6/Page 34 - D/Item_003_use_or_play_something_for_the_first_time_to_check.mp3";
import soundD1 from "../../../assets/audio/Workbook/Unit 6/Page 34 - D/Item_001_alot.mp3";
import soundD16 from "../../../assets/audio/Workbook/Unit 6/Page 34 - D/Item_016_bunch.mp3";
import soundD14 from "../../../assets/audio/Workbook/Unit 6/Page 34 - D/Item_014_booth.mp3";
import soundD12 from "../../../assets/audio/Workbook/Unit 6/Page 34 - D/Item_012_attractions.mp3";
import soundD10 from "../../../assets/audio/Workbook/Unit 6/Page 34 - D/Item_010_made_it.mp3";
import soundD8 from "../../../assets/audio/Workbook/Unit 6/Page 34 - D/Item_008_try_out.mp3";
import soundD6 from "../../../assets/audio/Workbook/Unit 6/Page 34 - D/Item_006_action_figure.mp3";
import soundD4 from "../../../assets/audio/Workbook/Unit 6/Page 34 - D/Item_004_expert.mp3";
import soundD2 from "../../../assets/audio/Workbook/Unit 6/Page 34 - D/Item_002_half_price.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../../StudentPages/unit5/useExerciseAudio";
import {AudioText,AudioFeedback,AudioSpeaker} from "../../StudentPages/unit5/ExerciseAudioText";
import {SentenceGroup,SentencePart} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};



const WB_Unit6_Page34_Q2 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const leftItems = [
    "half price",
    "expert",
    "action figure",
    "try out",
    "made it",
    "attractions",
    "booth",
    "a bunch",
  ];

  const rightItems = [
    {
      letter: "a",
      text: "a lot",
    },

    {
      letter: "b",
      text: "use or play something for the first time to check it",
    },

    {
      letter: "c",
      text: "a person who has a special skill in something",
    },

    {
      letter: "d",
      text: "did well",
    },

    {
      letter: "e",
      text: "rides and places to see",
    },

    {
      letter: "f",
      text: "a small closed area where things are sold",
    },

    {
      letter: "g",
      text: "50 percent off a price of something",
    },

    {
      letter: "h",
      text: "a small plastic toy that may look like a soldier, action hero, or a robot",
    },
  ];

  const answers = ["g", "c", "h", "b", "d", "e", "f", "a"];

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

  // ------------------------
  // HANDLE INPUT
  // ------------------------

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const lower = value.toLowerCase();

    // فقط a-h
    if (lower && !/^[a-h]$/.test(lower)) return;

    const updated = [...studentAnswers];

    updated[i] = lower;

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
      const ok = answer === answers[i];

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

  const inputField = (i) => (
    <div className="relative">
      <input style={{borderBottomColor:(result[i]===true)?"#16a34a":(result[i]===false)?"#D1232A":undefined}} aria-invalid={result[i]===false} title={`Match ${i+1}: ${leftItems[i]}. Enter a definition letter, a to h.`} aria-label={`Match ${i+1}: ${leftItems[i]}. Enter a definition letter, a to h.`} {...fieldKeys}
        type="text"
        value={studentAnswers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        maxLength={1}
        className={`
          w-[34px]
          border-0
          border-b
          outline-none
          bg-transparent
          text-center
          text-[18px]
          text-[#6D2980]
          font-semibold

          ${result[i] === false ? "border-[#D1232A]" : "border-black"}
        `}
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
    <div data-exercise-scope={"WB_Unit6_Page34_Q2.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="WB_Unit6_Page34_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit6_Page34_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit6_Page34_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <ExerciseHeader isWorkbook sectionLetter="D" title={<>
          
          Match.
        </>} subTitle="Start with one item, find the partner that matches its meaning or picture, then connect the pair before moving on." />

        {/* CONTENT */}

        <div className="grid grid-cols-2 gap-x-16">
          {/* LEFT SIDE */}

          <div className="flex flex-col gap-7">
            {leftItems.map((item, index) => (
              <SentenceGroup label={`Hear ${item}`} src={[soundD2,soundD4,soundD6,soundD8,soundD10,soundD12,soundD14,soundD16][index]} id={`left-${index}`} audio={audio} key={index} className="flex items-center gap-4">
                {/* INPUT */}

                {inputField(index)}

                {/* NUMBER */}

                <span className="font-bold w-[18px]">{index + 1}</span>

                {/* WORD */}

                <span>{item}</span>
              </SentenceGroup>
            ))}
          </div>

          {/* RIGHT SIDE */}

          <div className="flex flex-col gap-7">
            {rightItems.map((item, index) => (
              <SentenceGroup label={`Hear ${item.letter}. ${item.text}`} src={[soundD1,[soundD3,soundD5],soundD7,soundD9,soundD11,soundD13,soundD15,[soundD17,soundD18]][index]} id={`right-${index}`} audio={audio} key={index} className="flex items-start gap-4 leading-[1.4]">
                {/* LETTER */}

                <span className="font-bold">{item.letter}</span>

                {/* TEXT */}

                <span>{item.text}</span>
              </SentenceGroup>
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

export default WB_Unit6_Page34_Q2;
