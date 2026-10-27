import clip0 from "../../../assets/audio/Workbook/Unit 1/Page 4 - C/Item_001_face.mp3";
import clip1 from "../../../assets/audio/Workbook/Unit 1/Page 4 - C/Item_002_actually.mp3";
import clip2 from "../../../assets/audio/Workbook/Unit 1/Page 4 - C/Item_003_on_one_side.mp3";
import clip3 from "../../../assets/audio/Workbook/Unit 1/Page 4 - C/Item_004_mirror.mp3";
import clip4 from "../../../assets/audio/Workbook/Unit 1/Page 4 - C/Item_005_reviewing.mp3";
import clip5 from "../../../assets/audio/Workbook/Unit 1/Page 4 - C/Item_006_uh-oh.mp3";
import clip6 from "../../../assets/audio/Workbook/Unit 1/Page 4 - C/Item_007_fell_asleep.mp3";
import clip7 from "../../../assets/audio/Workbook/Unit 1/Page 4 - C/Item_008_pillow.mp3";
import clip8 from "../../../assets/audio/Workbook/Unit 1/Page 4 - C/Item_009_figure.mp3";
import clip9 from "../../../assets/audio/Workbook/Unit 1/Page 4 - C/Item_010_I_rested_my_head_on_my_fluffy_and.mp3";
import clip10 from "../../../assets/audio/Workbook/Unit 1/Page 4 - C/Item_011_Only_to_wake_up_to_a_voice_so_deep,.mp3";
import clip11 from "../../../assets/audio/Workbook/Unit 1/Page 4 - C/Item_012_It_was_a_man_with_a_scar_of_his.mp3";
import clip12 from "../../../assets/audio/Workbook/Unit 1/Page 4 - C/Item_013_The_other_side_was_covered_with_lace.mp3";
import clip13 from "../../../assets/audio/Workbook/Unit 1/Page 4 - C/Item_014_Who_are_you_I_asked_with_fear.mp3";
import clip14 from "../../../assets/audio/Workbook/Unit 1/Page 4 - C/Item_015_He_replied,_I_came_to_help_you_here.mp3";
import clip15 from "../../../assets/audio/Workbook/Unit 1/Page 4 - C/Item_016_I_saw_you_your_textbook_in_school.mp3";
import clip16 from "../../../assets/audio/Workbook/Unit 1/Page 4 - C/Item_017_I_came_to_give_you_the_right_tool,.mp3";
import clip17 from "../../../assets/audio/Workbook/Unit 1/Page 4 - C/Item_018_To_the_answers_to_the_questions,.mp3";
import clip18 from "../../../assets/audio/Workbook/Unit 1/Page 4 - C/Item_019_That_might_be_on_your_examinations.mp3";
import clip19 from "../../../assets/audio/Workbook/Unit 1/Page 4 - C/Item_020_I_said,_But_look_at_your.mp3";
import clip20 from "../../../assets/audio/Workbook/Unit 1/Page 4 - C/Item_021_That's_not_a_face_of_a.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../../StudentPages/unit5/useExerciseAudio";
import {AudioText,AudioFeedback} from "../../StudentPages/unit5/ExerciseAudioText";
import {SentenceGroup} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const WB_Unit1_Page4_Q1 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const questions = [
    "pillow",
    "fell asleep",
    "on one side",
    "face",
    "reviewing",
    "figure",
    "mirror",
    "Uh-oh",
    "actually",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", "", "", "", ""]);

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
      "pillow",
      "fell asleep",
      "on one side",
      "face",
      "reviewing",
      "figure",
      "mirror",
      "Uh-oh",
      "actually",
    ]);

    setResult([true, true, true, true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width) => (
    <span className="relative inline-block">
      <input placeholder={"Word / phrase"} style={{...(result[i]===true?{borderBottomColor:"#16a34a"}:{})}} aria-invalid={result[i]===false} title={`Poem blank ${i+1}, use a word or expression from the boxes`} aria-label={`Poem blank ${i+1}, use a word or expression from the boxes`} {...fieldKeys}
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
          text-[17px]
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

  const wordBox = (word) => (
    <div
      style={{
        border: "2px solid #7D3C98",
        borderRadius: "12px",
        padding: "8px 20px",
        fontSize: "17px",
        minWidth: "120px",
        textAlign: "center",
      }}
    ><AudioText audio={audio} id={`bank-${word}`} src={({face:clip0,actually:clip1,"on one side":clip2,mirror:clip3,reviewing:clip4,"uh-oh":clip5,"fell asleep":clip6,pillow:clip7,figure:clip8})[word]} label={`Hear ${word}`}>
      {word}
    </AudioText></div>
  );

  return (
    <div data-exercise-scope={"WB_Unit1_Page4_Q1.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="WB_Unit1_Page4_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit1_Page4_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit1_Page4_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall">
        {/* TITLE */}
        <ExerciseHeader subTitle="Read the full sentence first, then choose the word or expression that fits both the meaning and grammar." isWorkbook sectionLetter="C" title={<>
          
          Read and write.
        </>}/>

        {/* WORD BOXES */}
        <div className="flex flex-wrap justify-center gap-4 mb-7">
          {wordBox("face")}
          {wordBox("actually")}
          {wordBox("on one side")}
          {wordBox("mirror")}
          {wordBox("reviewing")}
          {wordBox("uh-oh")}
          {wordBox("fell asleep")}
          {wordBox("pillow")}
          {wordBox("figure")}
        </div>

        {/* STORY */}
        <div className=" text-[17px] leading-[2.2] mb-7">
          <SentenceGroup label={"Hear poem line 1"} src={clip9} id={"poem-line-0"} audio={audio} className="flex flex-wrap items-center gap-2 ">
            <span>I rested my head on my fluffy</span>

            {inputField(0, "w-[170px]")}

            <span>and</span>

            {inputField(1, "w-[170px]")}

            <span>,</span>
          </SentenceGroup>

          <SentenceGroup label={"Hear poem line 2"} src={clip10} id={"poem-line-1"} audio={audio}>Only to wake up to a voice so deep,</SentenceGroup>

          <SentenceGroup label={"Hear poem line 3"} src={clip11} id={"poem-line-2"} audio={audio} className="flex flex-wrap items-center gap-2">
            <span>It was a man with a scar</span>

            {inputField(2, "w-[170px]")}

            <span>of his</span>

            {inputField(3, "w-[140px]")}

            <span>,</span>
          </SentenceGroup>

          <SentenceGroup label={"Hear poem line 4"} src={clip12} id={"poem-line-3"} audio={audio}>The other side was covered with lace.</SentenceGroup>

          <SentenceGroup label={"Hear poem line 5"} src={clip13} id={"poem-line-4"} audio={audio}>“Who are you?” I asked with fear.</SentenceGroup>

          <SentenceGroup label={"Hear poem line 6"} src={clip14} id={"poem-line-5"} audio={audio}>He replied, “I came to help you here.</SentenceGroup>

          <SentenceGroup label={"Hear poem line 7"} src={clip15} id={"poem-line-6"} audio={audio} className="flex flex-wrap items-center gap-2">
            <span>I saw you</span>

            {inputField(4, "w-[170px]")}

            <span>your textbook in school.</span>
          </SentenceGroup>

          <SentenceGroup label={"Hear poem line 8"} src={clip16} id={"poem-line-7"} audio={audio}>I came to give you the right tool,</SentenceGroup>

          <SentenceGroup label={"Hear poem line 9"} src={clip17} id={"poem-line-8"} audio={audio} className="flex flex-wrap items-center gap-2">
            <span>To</span>

            {inputField(5, "w-[150px]")}

            <span>the answers to the questions,</span>
          </SentenceGroup>

          <SentenceGroup label={"Hear poem line 10"} src={clip18} id={"poem-line-9"} audio={audio}>That might be on your examinations.”</SentenceGroup>

          <SentenceGroup label={"Hear poem line 11"} src={clip19} id={"poem-line-10"} audio={audio} className="flex flex-wrap items-center gap-2">
            <span>I said, “But look at your face in the</span>

            {inputField(6, "w-[170px]")}

            <span>.</span>
          </SentenceGroup>

          <SentenceGroup label={"Hear poem line 12"} src={clip20} id={"poem-line-11"} audio={audio}>That’s not a face of a teacher.”</SentenceGroup>

          <div className="flex flex-wrap items-center gap-2">
            <span>He said, “</span>

            {inputField(7, "w-[140px]")}

            <span>! I was at a monster party last night.</span>
          </div>

          <div>I’m sorry if I had given you a fright.</div>

          <div className="flex flex-wrap items-center gap-2">
            <span>I</span>

            {inputField(8, "w-[170px]")}

            <span>thought I was prepared,</span>
          </div>

          <div>I did not mean to make you scared!”</div>
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

export default WB_Unit1_Page4_Q1;
