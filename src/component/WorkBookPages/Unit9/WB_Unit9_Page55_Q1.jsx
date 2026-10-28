import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../../StudentPages/unit5/useExerciseAudio";
import {AudioText,AudioFeedback,AudioSpeaker} from "../../StudentPages/unit5/ExerciseAudioText";
import {SentenceGroup,SentencePart} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState, useRef } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGES
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U9/Page 55/SVG/Asset 4.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U9/Page 55/SVG/Asset 11.svg";
import img3 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U9/Page 55/SVG/Asset 9.svg";
import img4 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U9/Page 55/SVG/Asset 7.svg";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const WB_Unit9_Page55_Q1 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const answers = [
    ["If they follow the recipe, they will", "make delicious cupcakes."],

    ["If they leave in the morning, they will be", "able to ride their bikes."],

    ["If the team wins first prize, they will", "go out to celebrate."],

    ["When she wakes up in the morning, she", "will eat a good breakfast."],
  ];

  const [studentAnswers, setStudentAnswers] = useState([
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
  ]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  // REFS
  const inputRefs = useRef([]);

  const normalize = normalizeAnswer;

  // ------------------------
  // HANDLE CHANGE
  // ------------------------

  const handleChange = (qIndex, lineIndex, value) => {
    if (locked || result[qIndex] === true) return;

    const updated = [...studentAnswers];

    updated[qIndex] = [...updated[qIndex]];
    updated[qIndex][lineIndex] = value;

    setStudentAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[qIndex] = undefined;

      return copy;
    });

    // AUTO NEXT LINE
    if (value.length >= 25 && lineIndex === 0) {
      inputRefs.current[qIndex][1]?.focus();
    }
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (locked) return;audio.stop();

    const hasEmpty = studentAnswers.some((q) => !q[0].trim() && !q[1].trim());
    if (hasEmpty) {
      (setAnnouncement(String("Please complete all answers.").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.info("Please complete all answers."));

      return;
    }

    let correctCount = 0;

    const newResults = studentAnswers.map((questionAnswer, i) => {
      const combinedStudent = normalize(questionAnswer.join(" "));

      const combinedCorrect = normalize(answers[i].join(" "));

      const ok = combinedStudent === combinedCorrect;

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

    setResult([true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers([
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
    ]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUTS
  // ------------------------

  const renderInputs = (qIndex) => (
    <div className="flex flex-col gap-3 w-full">
      {[0, 1].map((lineIndex) => (
        <div key={lineIndex} className="relative w-full">
          <input style={{borderBottomColor:(result[qIndex]===true)?"#16a34a":(result[qIndex]===false)?"#D1232A":undefined}} placeholder={lineIndex===0?"Begin sentence":"Continue sentence"} aria-invalid={result[qIndex]===false} title={`Picture pair ${qIndex+1}, sentence line ${lineIndex+1} of 2. Connect the events using when or if.`} aria-label={`Picture pair ${qIndex+1}, sentence line ${lineIndex+1} of 2. Connect the events using when or if.`} {...fieldKeys}
            ref={(el) => {
              if (!inputRefs.current[qIndex]) {
                inputRefs.current[qIndex] = [];
              }

              inputRefs.current[qIndex][lineIndex] = el;
            }}
            type="text"
            value={studentAnswers[qIndex][lineIndex]}
            disabled={locked || result[qIndex] === true}
            onChange={(e) => handleChange(qIndex, lineIndex, e.target.value)}
            className={`
              w-[260px]
              border-0
              border-b
              outline-none
              bg-transparent
              text-[16px]
              text-[#6D2980]
              font-semibold
              px-1

              ${result[qIndex] === false ? "border-[#D1232A]" : "border-black"}
            `}
          />

          {result[qIndex] === false && lineIndex === 1 && (
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
      ))}
    </div>
  );

  const images = [img1, img2, img3, img4];

  return (
    <div data-exercise-scope={"WB_Unit9_Page55_Q1.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="WB_Unit9_Page55_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit9_Page55_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit9_Page55_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[18px] w-full mb-10">
        {/* TITLE */}

        <ExerciseHeader isWorkbook sectionLetter="H" title={<>
          
          Look at each pair of pictures and write
          <span className="text-[#00AEEF]"> “when”</span> and
          <span className="text-[#00AEEF]"> “if”</span> sentences about them.
        </>} subTitle="Identify what each picture shows first, then write one clear when/if relationship that connects the two events." />

        {/* QUESTIONS */}

        <div className="grid grid-cols-2 gap-x-20 gap-y-10">
          {images.map((img, index) => (
            <div key={index}>
              {/* TOP */}

              <div className="flex items-start gap-4 mb-2">
                <span className="font-bold">{index + 1}</span>

                <img
                  src={img}
                  alt={["A woman and boy mixing ingredients in a bowl; a decorated cake beside them.","Trees and grass under a cloudy sky; children riding bicycles beside it.","A first-prize trophy; a group of children cheering beside it.","A girl waking in bed; the same girl eating pancakes at a table."][index]}
                  style={{
                    width: "270px",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* INPUTS */}

              <div className="pl-[35px] ">{renderInputs(index)}</div>
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

export default WB_Unit9_Page55_Q1;
