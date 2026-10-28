import soundE4 from "../../../assets/audio/Workbook/Unit 7/Page 41 - E/Item_004_boys_the_their_eating_are_breakfast.mp3";
import soundE3 from "../../../assets/audio/Workbook/Unit 7/Page 41 - E/Item_003_their_the_students_are_books_reading.mp3";
import soundE2 from "../../../assets/audio/Workbook/Unit 7/Page 41 - E/Item_002_garden_the_blooming_flowers_in_the_are.mp3";
import soundE1 from "../../../assets/audio/Workbook/Unit 7/Page 41 - E/Item_001_the_school_going_to_are_children.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../../StudentPages/unit5/useExerciseAudio";
import {AudioText,AudioFeedback,AudioSpeaker} from "../../StudentPages/unit5/ExerciseAudioText";
import {SentenceGroup,SentencePart} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

import trueImg from "../../../assets/imgs/true.svg";
import flaseImg from "../../../assets/imgs/false.svg";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const WB_Unit7_Page41_Q1 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const [fieldResults, setFieldResults] = useState([
    { q1: undefined, q2: undefined },
    { q1: undefined, q2: undefined },
    { q1: undefined, q2: undefined },
    { q1: undefined, q2: undefined },
  ]);
  const questions = [
    {
      scrambled: "the school going to are children",

      answer1: "Are the children going to school?",

      answer2: "Yes, they are.",

      correct: true,
    },

    {
      scrambled: "garden the blooming flowers in the are",

      answer1: "Are the flowers in the garden blooming?",

      answer2: "No, they aren’t.",

      correct: false,
    },

    {
      scrambled: "their the students are books reading",

      answer1: "Are the students reading their books?",

      answer2: "Yes, they are.",

      correct: true,
    },

    {
      scrambled: "boys the their eating are breakfast",

      answer1: "Are the boys eating their breakfast?",

      answer2: "No, they aren’t.",

      correct: false,
    },
  ];

  const [studentAnswers, setStudentAnswers] = useState([
    {
      q1: "",
      q2: "",
    },

    {
      q1: "",
      q2: "",
    },

    {
      q1: "",
      q2: "",
    },

    {
      q1: "",
      q2: "",
    },
  ]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  // ------------------------
  // HANDLE INPUT
  // ------------------------

  const handleChange = (index, field, value) => {
    if (locked || fieldResults[index]?.[field] === true) return;

    const updated = [...studentAnswers];

    updated[index] = {...updated[index], [field]:value};
 setFieldResults(prev=>prev.map((row,i)=>i===index?{...row,[field]:undefined}:row));

    setStudentAnswers(updated);

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

    const hasEmpty = studentAnswers.some((q) => !q.q1.trim() || !q.q2.trim());

    if (hasEmpty) {
      (setAnnouncement(String("Please complete all answers.").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.info("Please complete all answers."));

      return;
    }

    let correctCount = 0;

    const newResults = [];
    const newFieldResults = [];

    studentAnswers.forEach((answer, i) => {
      const ok1 = normalize(answer.q1) === normalize(questions[i].answer1);

      const ok2 = normalize(answer.q2) === normalize(questions[i].answer2);

      newFieldResults.push({
        q1: ok1,
        q2: ok2,
      });

      const final = ok1 && ok2;

      if (final) correctCount++;

      newResults.push(final);
    });

    setResult(newResults);
    setFieldResults(newFieldResults);

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

  const showAnswers = () => {setFieldResults(questions.map(()=>({q1:true,q2:true})));audio.stop();setAnnouncement("Model answers shown and locked.");resetButtonRef.current?.focus({preventScroll:true});
    setStudentAnswers([
      {
        q1: questions[0].answer1,

        q2: questions[0].answer2,
      },

      {
        q1: questions[1].answer1,

        q2: questions[1].answer2,
      },

      {
        q1: questions[2].answer1,

        q2: questions[2].answer2,
      },

      {
        q1: questions[3].answer1,

        q2: questions[3].answer2,
      },
    ]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers([
      {
        q1: "",
        q2: "",
      },

      {
        q1: "",
        q2: "",
      },

      {
        q1: "",
        q2: "",
      },

      {
        q1: "",
        q2: "",
      },
    ]);

    setResult([]);setFieldResults(questions.map(()=>({q1:undefined,q2:undefined})));

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (index, field, width) => (
    <div className="relative inline-block">
      <input aria-description={result[index]===true?"Question and short answer are correct.":undefined} aria-invalid={fieldResults[index]?.[field]===false} placeholder={field==="q1"?"Question":"Short answer"} title={`Item ${index+1}: ${field==="q1"?"unscramble the question: "+questions[index].scrambled:"write the short answer from the "+(questions[index].correct?"tick":"cross")+" cue"}`} aria-label={`Item ${index+1}: ${field==="q1"?"unscramble the question: "+questions[index].scrambled:"write the short answer from the "+(questions[index].correct?"tick":"cross")+" cue"}`} {...fieldKeys}
        type="text"
        value={studentAnswers[index][field]}
        disabled={locked || fieldResults[index]?.[field] === true}
        onChange={(e) => handleChange(index, field, e.target.value)}
        className={`
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6D2980]
          font-semibold
          px-1

          ${
            fieldResults[index]?.[field] === false
              ? "border-[#D1232A]"
              : "border-black"
          }
        `}
        style={{
          width,
        borderBottomColor:(fieldResults[index]?.[field]===true)?"#16a34a":(fieldResults[index]?.[field]===false)?"#D1232A":undefined}}
      />
      {fieldResults[index]?.[field] === false && (
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
    <div data-exercise-scope={"WB_Unit7_Page41_Q1.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="WB_Unit7_Page41_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit7_Page41_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit7_Page41_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <ExerciseHeader isWorkbook sectionLetter="E" title={<>
          
          Unscramble and write. Then answer with
          <span className="text-[#00AEEF]"> “Yes, they are.”</span> or
          <span className="text-[#00AEEF]"> “No, they aren’t.”</span>
        </>} subTitle="Put the words into a correct -ing question first, then use the ✓ or X cue to give the matching short answer." />

        {/* QUESTIONS */}

        <div className="flex flex-col gap-4">
          {questions.map((q, index) => (
            <div key={index}>
              {/* SCRAMBLED */}

              <SentenceGroup label={`Hear scrambled question ${index+1}: ${q.scrambled}`} src={[soundE1,soundE2,soundE3,soundE4][index]} id={`scramble-${index}`} audio={audio} className="flex items-center gap-3 mb-3">
                <span className="font-bold">{index + 1}</span>

                <span>{q.scrambled}</span>
              </SentenceGroup>

              {/* ANSWER AREA */}

              <div className="flex items-start gap-4 ml-4">
                {/* SVG */}

                <img
                  src={q.correct ? trueImg : flaseImg}
                  alt={q.correct?"Tick cue: write an affirmative short answer.":"Cross cue: write a negative short answer."}
                  style={{
                    width: "34px",
                    height: "34px",
                    marginTop: "32px",
                    border: "2px solid #6D2980",
                    borderRadius: "6px",
                    padding: "4px",
                  }}
                />

                {/* INPUTS */}

                <div className="flex flex-col gap-3 w-full">
                  {/* Q1 */}

                  <div className="flex items-end gap-2">
                    {inputField(index, "q1", "620px")}

                    <span>?</span>
                  </div>

                  {/* Q2 */}

                  <div>
                    {inputField(index, "q2", "620px")}

                    <span>.</span>
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

export default WB_Unit7_Page41_Q1;
