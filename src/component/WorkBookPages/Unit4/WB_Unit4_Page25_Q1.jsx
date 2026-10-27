import soundC1 from "../../../assets/audio/Workbook/Unit 4/Page 22 - C/Item_001_occasionally.mp3";
import soundJ4 from "../../../assets/audio/Workbook/Unit 4/Page 25 - J/Item_004_always.mp3";
import soundJ3 from "../../../assets/audio/Workbook/Unit 4/Page 25 - J/Item_003_rarely.mp3";
import soundJ2 from "../../../assets/audio/Workbook/Unit 4/Page 25 - J/Item_002_frequently.mp3";
import soundJ1 from "../../../assets/audio/Workbook/Unit 4/Page 25 - J/Item_001_Do_they_sometimes.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../../StudentPages/unit5/useExerciseAudio";
import {AudioText,AudioFeedback,AudioSpeaker} from "../../StudentPages/unit5/ExerciseAudioText";
import {SentenceGroup,SentencePart} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGES
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U4/Page 25/Asset 4.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U4/Page 25/Asset 11.svg";
import img3 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U4/Page 25/Asset 6.svg";
import img4 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U4/Page 25/Asset 7.svg";
import img5 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U4/Page 25/Asset 8.svg";
import img6 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U4/Page 25/Asset 9.svg";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const WB_Unit4_Page25_Q1 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const answers = [
    "watch a program on TV",
    ["Do they", "ride on the swings"],
    ["Does she", "ride a horse"],
    ["Does she", "eat a sandwich"],
    ["Does he", "take a picture with his camera"],
    ["Do they", "ride the school bus"],
  ];

  const questions = [
    {
      image: img1,
      type: "single",
      before: "Do they sometimes",
    },

    {
      image: img2,
      type: "double",
      middle: "frequently",
    },

    {
      image: img3,
      type: "double",
      middle: "rarely",
    },

    {
      image: img4,
      type: "double",
      middle: "always",
    },

    {
      image: img5,
      type: "double",
      middle: "occasionally",
    },

    {
      image: img6,
      type: "double",
      middle: "always",
    },
  ];

  const [studentAnswers, setStudentAnswers] = useState([
    [""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
  ]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const handleChange = (qIndex, inputIndex, value) => {
    if (locked || result[qIndex]?.[inputIndex] === true) return;

    const updated = studentAnswers.map(row=>Array.isArray(row)?[...row]:row);

    updated[qIndex][inputIndex] = value;

    setStudentAnswers(updated);

    setResult((prev) => {
      const copy = prev.map(row=>row?[...row]:row);

      if (copy[qIndex]) {
        copy[qIndex][inputIndex] = undefined;
      }

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;audio.stop();

    const hasEmpty = studentAnswers.some((group) =>
      group.some((input) => !input.trim()),
    );

    if (hasEmpty) {
      (setAnnouncement(String("Please complete all answers.").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.info("Please complete all answers."));

      return;
    }

    let correctCount = 0;

    const newResults = studentAnswers.map((group, qIndex) => {
      const correct = answers[qIndex];

      if (Array.isArray(correct)) {
        return group.map((input, i) => {
          const ok = normalize(input) === normalize(correct[i]);

          if (ok) correctCount++;

          return ok;
        });
      }

      const ok = normalize(group[0]) === normalize(correct);

      if (ok) correctCount++;

      return [ok];
    });

    setResult(newResults);

    const total = 11;

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
    setStudentAnswers([
      ["watch a program on TV"],
      ["Do they", "ride on the swings"],
      ["Does she", "ride a horse"],
      ["Does she", "eat a sandwich"],
      ["Does he", "take a picture with his camera"],
      ["Do they", "ride the school bus"],
    ]);

    setResult([
      [true],
      [true, true],
      [true, true],
      [true, true],
      [true, true],
      [true, true],
    ]);

    setLocked(true);
  };

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers([[""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""]]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (qIndex, inputIndex, width) => (
    <div className="relative inline-block">
      <input aria-invalid={result[qIndex]?.[inputIndex]===false} placeholder={"Word or phrase"} title={`Question ${qIndex+1}, ${inputIndex===0&&qIndex>0?"question opening":"action"} blank`} aria-label={`Question ${qIndex+1}, ${inputIndex===0&&qIndex>0?"question opening":"action"} blank`} {...fieldKeys}
        type="text"
        value={studentAnswers[qIndex][inputIndex]}
        disabled={locked || result[qIndex]?.[inputIndex] === true}
        onChange={(e) => handleChange(qIndex, inputIndex, e.target.value)}
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
            result[qIndex]?.[inputIndex] === false
              ? "border-[#D1232A]"
              : "border-black"
          }
        `}
        style={{
          width,
        borderBottomColor:(result[qIndex]?.[inputIndex]===true)?"#16a34a":undefined}}
      />

      {result[qIndex]?.[inputIndex] === false && (
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
  const widths = {
    1: "260px",
    2: "295px",
    3: "290px",
    4: "245px",
    5: "290px",
  };
  return (
    <div data-exercise-scope={"WB_Unit4_Page25_Q1.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="WB_Unit4_Page25_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit4_Page25_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit4_Page25_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[18px]">
        {/* TITLE */}
        <ExerciseHeader isWorkbook sectionLetter="J" title={<>
          
          Look and write.
        </>} subTitle="Use the percentage, picture, or context clue to choose the adverb, then place it in the natural position in the sentence." />

        {/* QUESTIONS */}
        <div className="flex flex-col gap-5 mb-10">
          {questions.map((q, index) => (
            <div key={index} className="flex items-center gap-10">
              {/* IMAGE */}
              <img
                src={q.image}
                alt={["Two children watching television on a sofa.","Two children riding swings.","A girl wearing a riding helmet on a horse.","A girl eating a sandwich.","A boy taking a photograph with a camera.","Children riding a yellow school bus."][index]}
                style={{
                  width: "135px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />

              {/* QUESTION */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-bold">{index + 1}</span>

                {q.type === "single" ? (
                  <>
                    <span><AudioText audio={audio} id={`question-before-${index}`} src={soundJ1} label={`Hear ${q.before}`}>{q.before}</AudioText></span>

                    {inputField(index, 0, "315px")}

                    <span>?</span>
                  </>
                ) : (
                  <>
                    {inputField(index, 0, "120px")}

                    <span><AudioText audio={audio} id={`question-middle-${index}`} src={({frequently:soundJ2,rarely:soundJ3,always:soundJ4,occasionally:soundC1})[q.middle]} label={`Hear ${q.middle}`}>{q.middle}</AudioText></span>

                    {inputField(index, 1, widths[index] || "260px")}

                    <span>?</span>
                  </>
                )}
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

export default WB_Unit4_Page25_Q1;
