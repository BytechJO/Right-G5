import soundM14 from "../../../assets/audio/Workbook/Unit 6/Page 38 - M/Item_014_(shall_will_).mp3";
import soundM13 from "../../../assets/audio/Workbook/Unit 6/Page 38 - M/Item_013_Let's_ride_on_the_Ferris_wheel,.mp3";
import soundM12 from "../../../assets/audio/Workbook/Unit 6/Page 38 - M/Item_012_(_could_would_).mp3";
import soundM11 from "../../../assets/audio/Workbook/Unit 6/Page 38 - M/Item_011_like_another_plate_of_food.mp3";
import soundM10 from "../../../assets/audio/Workbook/Unit 6/Page 38 - M/Item_010_(_could_should_).mp3";
import soundM9 from "../../../assets/audio/Workbook/Unit 6/Page 38 - M/Item_009_go_to_the_park.mp3";
import soundM8 from "../../../assets/audio/Workbook/Unit 6/Page 38 - M/Item_008_(_will_must_).mp3";
import soundM7 from "../../../assets/audio/Workbook/Unit 6/Page 38 - M/Item_007_You.mp3";
import soundM6 from "../../../assets/audio/Workbook/Unit 6/Page 38 - M/Item_006_not_throw_garbage_on_the_floor.mp3";
import soundM5 from "../../../assets/audio/Workbook/Unit 6/Page 38 - M/Item_005_(_May_Would_).mp3";
import soundM4 from "../../../assets/audio/Workbook/Unit 6/Page 38 - M/Item_004_you_help_me_pass_out_the_papers.mp3";
import soundM3 from "../../../assets/audio/Workbook/Unit 6/Page 38 - M/Item_003_(_might_must_).mp3";
import soundM2 from "../../../assets/audio/Workbook/Unit 6/Page 38 - M/Item_002_We.mp3";
import soundM1 from "../../../assets/audio/Workbook/Unit 6/Page 38 - M/Item_001_have_snow_this_afternoon_if_the_weather_forecast_is_correct.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../../StudentPages/unit5/useExerciseAudio";
import {AudioText,AudioFeedback,AudioSpeaker} from "../../StudentPages/unit5/ExerciseAudioText";
import {SentenceGroup,SentencePart} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};




const WB_Unit6_Page38_Q1 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const questions = [
    {
      before: "We",

      after: "have snow this afternoon if the weather forecast is correct.",

      options: ["might", "must"],

      correct: "might",
    },

    {
      before: "",

      after: "you help me pass out the papers?",

      options: ["May", "Would"],

      correct: "Would",
    },

    {
      before: "You",

      after: "not throw garbage on the floor.",

      options: ["will", "must"],

      correct: "must",
    },

    {
      before: "We",

      after: "go to the park.",

      options: ["could", "should"],

      correct: "should",
    },

    {
      before: "I",

      after: "like another plate of food.",

      options: ["could", "would"],

      correct: "would",
    },

    {
      before: "Let’s ride on the Ferris wheel,",

      after: "we?",

      options: ["shall", "will"],

      correct: "shall",
    },
  ];

  const [selectedAnswers, setSelectedAnswers] = useState([
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
  // SELECT OPTION
  // ------------------------

  const handleSelect = (index, option) => {
    if (locked || result[index] === true) return;setAnnouncement(`Sentence ${index+1}: ${option} selected.`);

    const updated = [...selectedAnswers];

    updated[index] = option;

    setSelectedAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[index] = undefined;

      return copy;
    });
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (locked) return;audio.stop();

    const hasEmpty = selectedAnswers.some((a) => !a);

    if (hasEmpty) {
      (setAnnouncement(String("Please complete all answers.").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.info("Please complete all answers."));

      return;
    }

    let correctCount = 0;

    const newResults = selectedAnswers.map((answer, i) => {
      const ok = answer === questions[i].correct;

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
    setSelectedAnswers(questions.map((q) => q.correct));

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setSelectedAnswers(["", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // OPTION BUTTON
  // ------------------------

  const narration = [{lead:soundM2, choices:soundM3, ending:soundM1},{choices:soundM5,ending:soundM4},{lead:soundM7,choices:soundM8,ending:soundM6},{lead:soundM2,choices:soundM10,ending:soundM9},{choices:soundM12,ending:soundM11},{lead:soundM13,choices:soundM14}];
const optionButton = (questionIndex, option) => {
    const selected = selectedAnswers[questionIndex] === option;

    const wrong =
      result[questionIndex] === false &&
      selected &&
      option !== questions[questionIndex].correct;

    return (
      <button {...activationKeys} aria-label={`Sentence ${questionIndex+1}: ${option}${result[questionIndex]===true?". Answer locked.":""}`} aria-pressed={selected} data-choice={true}
        type="button"
        disabled={locked || result[questionIndex] === true}
        onClick={() => handleSelect(questionIndex, option)}
        className="relative"
        style={{
          border: selected ? "2px solid #6D2980" : "2px solid transparent",
          borderRadius: "999px",
          padding: "0 5px",
          fontSize: "18px",
          cursor: locked ? "default" : "pointer",
        background:selected?"#dbeafe":"transparent",borderColor:selected&&result[questionIndex]===true?"#16a34a":wrong?"#D1232A":selected?"#6D2980":"transparent"}}
      >
        {option}

        {wrong && (
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
              fontSize: "11px",
              fontWeight: "bold",
              border: "2px solid white",
              boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
            }}
          >
            ✕
          </span>
        )}
      </button>
    );
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (index, width) => (
<span style={{position:"relative",display:"inline-flex"}}>
    <input onKeyUp={activationKeys.onKeyUp} onKeyDown={event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)audio.play(`choices-${index}`,narration[index].choices);}} onClick={()=>audio.play(`choices-${index}`,narration[index].choices)} data-choice={true} tabIndex={0} aria-invalid={result[index]===false} title={`Sentence ${index+1}: ${questions[index].before} ___ ${questions[index].after}. Chosen modal verb.`} aria-label={`Sentence ${index+1}: hear both options, ${questions[index].options.join(" or ")}. Chosen answer: ${selectedAnswers[index]||"none"}.`} 
      type="text"
      readOnly
      value={selectedAnswers[index]}
      className="
        border-0
        border-b
        border-black
        outline-none
        bg-transparent
        text-[18px]
        text-[#6D2980]
        font-semibold
        px-1
      "
      style={{
        width,
      borderBottomColor:(result[index]===true)?"#16a34a":(result[index]===false)?"#D1232A":undefined,backgroundColor:audio.activeId===`choices-${index}`?"#dbeafe":undefined,boxShadow:audio.activeId===`choices-${index}`?"0 0 0 3px #2563eb":undefined}}
    />{audio.activeId===`choices-${index}`&&<AudioSpeaker/>}</span>);

  return (
    <div data-exercise-scope={"WB_Unit6_Page38_Q1.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="WB_Unit6_Page38_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit6_Page38_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit6_Page38_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <ExerciseHeader isWorkbook sectionLetter="M" title={<>
          
          Read and circle.
        </>} subTitle="Read all choices before selecting; choose only the option that makes the full sentence or expression correct." />

        {/* QUESTIONS */}

        <div className="flex flex-col gap-5 pl-2.5">
          {questions.map((q, index) => (
            <div key={index}>
              <div className="flex items-start gap-3 flex-wrap">
                {/* NUMBER */}

                <span className="font-bold w-[18px]">{index + 1}</span>

                {/* BEFORE */}

                {q.before && <span>{(narration[index].lead)?<AudioText audio={audio} id={`before-${index}`} src={narration[index].lead} label={`Hear ${q.before}`}>{q.before}</AudioText>:<>{q.before}</>}</span>}

                {/* INPUT + OPTIONS */}

                <div className="flex flex-col items-start">
                  {inputField(index, index === 5 ? "150px" : "160px")}

                  <div className="flex items-center gap-2 mt-1">
                    <span>(</span>

                    {optionButton(index, q.options[0])}

                    <span>/</span>

                    {optionButton(index, q.options[1])}

                    <span>)</span>
                  </div>
                </div>

                {/* AFTER */}

                <span>{(narration[index].ending)?<AudioText audio={audio} id={`after-${index}`} src={narration[index].ending} label={`Hear ${q.after}`}>{q.after}</AudioText>:<>{q.after}</>}</span>
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

export default WB_Unit6_Page38_Q1;
