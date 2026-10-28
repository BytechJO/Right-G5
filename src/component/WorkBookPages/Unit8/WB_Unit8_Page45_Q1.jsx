import soundA21 from "../../../assets/audio/Workbook/Unit 8/Page 45 - A/Item_021_¢_fly_over.mp3";
import soundA20 from "../../../assets/audio/Workbook/Unit 8/Page 45 - A/Item_020_¢_volunteer.mp3";
import soundA19 from "../../../assets/audio/Workbook/Unit 8/Page 45 - A/Item_019_b=_shocked.mp3";
import soundA18 from "../../../assets/audio/Workbook/Unit 8/Page 45 - A/Item_018_top_of_the_world.mp3";
import soundA17 from "../../../assets/audio/Workbook/Unit 8/Page 45 - A/Item_017_crowded.mp3";
import soundA16 from "../../../assets/audio/Workbook/Unit 8/Page 45 - A/Item_016_looks_like_ants.mp3";
import soundA15 from "../../../assets/audio/Workbook/Unit 8/Page 45 - A/Item_015_Everyone.mp3";
import soundA14 from "../../../assets/audio/Workbook/Unit 8/Page 45 - A/Item_014_even_walk_without_bumping_into_people.mp3";
import soundA13 from "../../../assets/audio/Workbook/Unit 8/Page 45 - A/Item_013_You_can't.mp3";
import soundA12 from "../../../assets/audio/Workbook/Unit 8/Page 45 - A/Item_012_The_streets_are_so.mp3";
import soundA11 from "../../../assets/audio/Workbook/Unit 8/Page 45 - A/Item_011_Look_at_the_people_below_our_airplane.mp3";
import soundA10 from "../../../assets/audio/Workbook/Unit 8/Page 45 - A/Item_010_¢_spot.mp3";
import soundA9 from "../../../assets/audio/Workbook/Unit 8/Page 45 - A/Item_009_landscape.mp3";
import soundA8 from "../../../assets/audio/Workbook/Unit 8/Page 45 - A/Item_008_second_home.mp3";
import soundA7 from "../../../assets/audio/Workbook/Unit 8/Page 45 - A/Item_007_doubt.mp3";
import soundA6 from "../../../assets/audio/Workbook/Unit 8/Page 45 - A/Item_006_rainbow.mp3";
import soundA5 from "../../../assets/audio/Workbook/Unit 8/Page 45 - A/Item_005_lean.mp3";
import soundA4 from "../../../assets/audio/Workbook/Unit 8/Page 45 - A/Item_004_looked_beautiful.mp3";
import soundA3 from "../../../assets/audio/Workbook/Unit 8/Page 45 - A/Item_003_on_time.mp3";
import soundA2 from "../../../assets/audio/Workbook/Unit 8/Page 45 - A/Item_002_that_I'll_make_it_to_the_party.mp3";
import soundA1 from "../../../assets/audio/Workbook/Unit 8/Page 45 - A/Item_001_The_painting_of_the_green.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../../StudentPages/unit5/useExerciseAudio";
import {AudioText,AudioFeedback,AudioSpeaker} from "../../StudentPages/unit5/ExerciseAudioText";
import {SentenceGroup,SentencePart} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};




const WB_Unit8_Page45_Q1 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const questions = [
    {
      question: "I ______________ that I’ll make it to the party on time.",
      options: ["lean", "doubt", "spot"],
      correct: "doubt",
    },

    {
      question: "The painting of the green ______________ looked beautiful.",
      options: ["rainbow", "second home", "landscape"],
      correct: "landscape",
    },

    {
      question:
        "Look at the people below our airplane. Everyone ______________.",
      options: ["looks like ants", "top of the world", "volunteer"],
      correct: "looks like ants",
    },

    {
      question:
        "The streets are so ______________ . You can’t even walk without bumping into people.",
      options: ["crowded", "shocked", "fly over"],
      correct: "crowded",
    },
  ];

  const [selectedAnswers, setSelectedAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  // ------------------------
  // SELECT ANSWER
  // ------------------------

  const handleSelect = (qIndex, option) => {audio.play(`option-${qIndex}-${option}`,({"lean":soundA5,"doubt":soundA7,"spot":soundA10,"rainbow":soundA6,"second home":soundA8,"landscape":soundA9,"looks like ants":soundA16,"top of the world":soundA18,"volunteer":soundA20,"crowded":soundA17,"shocked":soundA19,"fly over":soundA21})[option]);
    if (locked || result[qIndex] === true) return;

    const updated = [...selectedAnswers];

    updated[qIndex] = option;

    setSelectedAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[qIndex] = undefined;

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

    setResult([true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setSelectedAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // SENTENCE WITH BLANK
  // ------------------------

  const sentenceWithBlank = (text, value, qIndex) => {
    const parts = text.split("______________");

    return (
      <div className="leading-[1.8]">
        {([null,soundA1,[soundA11,soundA15],soundA12][qIndex])?<AudioText audio={audio} id={`prefix-${qIndex}`} src={[null,soundA1,[soundA11,soundA15],soundA12][qIndex]} label={`Hear the beginning of sentence ${qIndex+1}`}>{parts[0]}</AudioText>:parts[0]}

        <span style={{borderBottomColor:value&&questions.some((q,i)=>result[i]===true&&selectedAnswers[i]===value)?"#16a34a":undefined}} aria-label={`Chosen answer: ${value||"empty"}`} role={"status"}
          className="
            inline-block
            min-w-[120px]
            border-b
            border-black
            text-center
            text-[#6D2980]
            font-semibold
            mx-1
          "
        >
          {value}
        </span>

        {([[soundA2,soundA3],soundA4,null,[soundA13,soundA14]][qIndex])?<AudioText audio={audio} id={`ending-${qIndex}`} src={[[soundA2,soundA3],soundA4,null,[soundA13,soundA14]][qIndex]} label={`Hear the ending of sentence ${qIndex+1}`}>{parts[1]}</AudioText>:parts[1]}
      </div>
    );
  };

  // ------------------------
  // OPTION BUTTON
  // ------------------------

  const optionButton = (qIndex, option, letter) => {
    const selected = selectedAnswers[qIndex] === option;

    const showError =
      result[qIndex] === false &&
      selected &&
      option !== questions[qIndex].correct;

    return (
      <button aria-label={`Sentence ${qIndex+1}: ${option}${result[qIndex]===true?". Answer locked.":""}`} aria-pressed={selected} data-choice={true} {...activationKeys}
        type="button"
        aria-disabled={locked||result[qIndex]===true}
        onClick={() => handleSelect(qIndex, option)}
        className="relative flex items-center gap-2"
        style={{
          background: "transparent",
          border: "none",
          cursor: locked || result[qIndex] === true ? "default" : "pointer",
        borderRadius:999,"--exercise-focus-radius":"999px",position:"relative",boxShadow:audio.activeId===`option-${qIndex}-${option}`?"0 0 0 3px #2563eb":undefined}}
      >
        {/* LETTER */}

        <span className="font-bold text-[18px]">{letter}</span>

        {/* OPTION */}

        <span
          style={{
            border:
              selected && result[qIndex] === false
                ? "2px solid #D1232A"
                : selected
                  ? "2px solid #6D2980"
                  : "2px solid transparent",
            borderRadius: "999px",

            padding: "0 8px",

            lineHeight: "1.2",
          background:selected?"#dbeafe":"transparent",borderColor:selected&&result[qIndex]===true?"#16a34a":selected&&result[qIndex]===false?"#D1232A":selected?"#6D2980":"transparent"}}
          className="text-[18px]"
        >
          {option}
        </span>

        {/* ERROR */}

        {showError && (
          <span
            style={{
              position: "absolute",
              top: "-8px",
              right: "-22px",
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
      {audio.activeId===`option-${qIndex}-${option}`&&<AudioSpeaker/>}</button>
    );
  };

  return (
    <div data-exercise-scope={"WB_Unit8_Page45_Q1.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="WB_Unit8_Page45_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit8_Page45_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit8_Page45_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[18px]">
        {/* TITLE */}

        <ExerciseHeader isWorkbook sectionLetter="A" title={<>
          
          Read and circle.
        </>} subTitle="Read all choices before selecting; choose only the option that makes the full sentence or expression correct." />

        {/* QUESTIONS */}

        <div className="grid grid-cols-2 gap-y-10 gap-x-20">
          {questions.map((q, index) => (
            <div key={index}>
              {/* QUESTION */}

              <div className="flex items-start gap-3 mb-5">
                <span className="font-bold">{index + 1}</span>

                {sentenceWithBlank(q.question, selectedAnswers[index], index)}
              </div>

              {/* OPTIONS */}

              <div className="flex flex-col gap-2 pl-7">
                {q.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    {optionButton(index, option, ["a", "b", "c"][optionIndex])}
                  </div>
                ))}
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

export default WB_Unit8_Page45_Q1;
