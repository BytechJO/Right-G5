import soundE15 from "../../../assets/audio/Workbook/Unit 8/Page 46 - E/Item_015_Yes,_I_rode.mp3";
import soundE14 from "../../../assets/audio/Workbook/Unit 8/Page 46 - E/Item_014_in_the_carnival.mp3";
import soundE13 from "../../../assets/audio/Workbook/Unit 8/Page 46 - E/Item_013_Did_you_ride.mp3";
import soundE11 from "../../../assets/audio/Workbook/Unit 8/Page 46 - E/Item_011_is_coming_over.mp3";
import soundE12 from "../../../assets/audio/Workbook/Unit 8/Page 46 - E/Item_012_Yes,.mp3";
import soundE10 from "../../../assets/audio/Workbook/Unit 8/Page 46 - E/Item_010_visit_me_today.mp3";
import soundE9 from "../../../assets/audio/Workbook/Unit 8/Page 46 - E/Item_009_will.mp3";
import soundE8 from "../../../assets/audio/Workbook/Unit 8/Page 46 - E/Item_008_who_is_ready.mp3";
import soundE7 from "../../../assets/audio/Workbook/Unit 8/Page 46 - E/Item_007_No,_there's.mp3";
import soundE5 from "../../../assets/audio/Workbook/Unit 8/Page 46 - E/Item_005_ready_for_the_hot-air_balloon_ride.mp3";
import soundE6 from "../../../assets/audio/Workbook/Unit 8/Page 46 - E/Item_006_Is.mp3";
import soundE3 from "../../../assets/audio/Workbook/Unit 8/Page 46 - E/Item_003_will_help.mp3";
import soundE4 from "../../../assets/audio/Workbook/Unit 8/Page 46 - E/Item_004_Sure,.mp3";
import soundE1 from "../../../assets/audio/Workbook/Unit 8/Page 46 - E/Item_001_please_help_me_carry_these_books.mp3";
import soundE2 from "../../../assets/audio/Workbook/Unit 8/Page 46 - E/Item_002_Can.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../../StudentPages/unit5/useExerciseAudio";
import {AudioText,AudioFeedback,AudioSpeaker} from "../../StudentPages/unit5/ExerciseAudioText";
import {SentenceGroup,SentencePart} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};



const WB_Unit8_Page46_Q3 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const answers = [
    "somebody",
    "someone",

    "everyone",
    "no one",

    "somebody",
    "someone",

    "everything",
    "everything",
  ];

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

  const [locked, setLocked] = useState(false);

  // ------------------------
  // HANDLE INPUT
  // ------------------------

  const handleChange = (i, value) => {
    if (locked) return;

    const updated = [...studentAnswers];

    updated[i] = value;

    setStudentAnswers(updated);
  };

  // ------------------------
  // SHOW ANSWERS
  // ------------------------

  const showAnswers = () => {audio.stop();setAnnouncement("Model answers shown and locked.");resetButtonRef.current?.focus({preventScroll:true});
    setStudentAnswers(answers);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", "", "", "", "", "", "", ""]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i) => (
    <div className="relative inline-flex flex-1">
      <input style={{borderBottomColor:locked?"#16a34a":undefined}} aria-invalid={false} placeholder={"Pronoun"} title={`Dialogue blank ${i+1}: ${["Can ___ please help me carry these books?","Sure, ___ will help.","Is ___ ready for the hot-air balloon ride?","No, there is ___ who is ready.","Will ___ visit me today?","Yes, ___ is coming over.","Did you ride ___ in the carnival?","Yes, I rode ___."][i]}`} aria-label={`Dialogue blank ${i+1}: ${["Can ___ please help me carry these books?","Sure, ___ will help.","Is ___ ready for the hot-air balloon ride?","No, there is ___ who is ready.","Will ___ visit me today?","Yes, ___ is coming over.","Did you ride ___ in the carnival?","Yes, I rode ___."][i]}`} {...fieldKeys}
        type="text"
        value={studentAnswers[i]}
        disabled={locked}
        onChange={(e) => handleChange(i, e.target.value)}
        className="
        w-full
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
      />
    </div>
  );

  return (
    <div data-exercise-scope={"WB_Unit8_Page46_Q3.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="WB_Unit8_Page46_Q3.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit8_Page46_Q3.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit8_Page46_Q3.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <ExerciseHeader isWorkbook sectionLetter="E" title={<>
          
          Read and write the correct{" "}
          <span className="text-[#00AEEF]">indefinite pronouns</span> to
          complete each sentence.
        </>} subTitle="Decide whether the blank refers to a person, place, or thing and whether the sentence is positive, negative, or a question." />

        {/* QUESTIONS */}
        <div className="flex flex-col gap-8 leading-loose">
          {/* QUESTION 1 */}

          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="font-bold mr-1">1</span>

              <span><AudioText audio={audio} id={"fragment-0"} src={soundE2} label={"Hear Can"}>Can</AudioText></span>

              {inputField(0)}

              <span><AudioText audio={audio} id={"fragment-1"} src={soundE1} label={"Hear please help me carry these books?"}>please help me carry these books?</AudioText></span>
            </div>

            <div className="pl-[25px] flex items-center gap-2">
              <span><AudioText audio={audio} id={"fragment-2"} src={soundE4} label={"Hear Sure,"}>Sure,</AudioText></span>

              {inputField(1)}

              <span><AudioText audio={audio} id={"fragment-3"} src={soundE3} label={"Hear will help."}>will help.</AudioText></span>
            </div>
          </div>

          {/* QUESTION 2 */}

          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="font-bold mr-1">2</span>

              <span><AudioText audio={audio} id={"fragment-4"} src={soundE6} label={"Hear Is"}>Is</AudioText></span>

              {inputField(2)}

              <span><AudioText audio={audio} id={"fragment-5"} src={soundE5} label={"Hear ready for the hot-air balloon ride?"}>ready for the hot-air balloon ride?</AudioText></span>
            </div>

            <div className="pl-[25px] flex items-center gap-2">
              <span><AudioText audio={audio} id={"fragment-6"} src={soundE7} label={"Hear No, there’s"}>No, there’s</AudioText></span>

              {inputField(3)}

              <span><AudioText audio={audio} id={"fragment-7"} src={soundE8} label={"Hear who is ready."}>who is ready.</AudioText></span>
            </div>
          </div>

          {/* QUESTION 3 */}

          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="font-bold mr-1">3</span>

              <span><AudioText audio={audio} id={"fragment-8"} src={soundE9} label={"Hear Will"}>Will</AudioText></span>

              {inputField(4)}

              <span><AudioText audio={audio} id={"fragment-9"} src={soundE10} label={"Hear visit me today?"}>visit me today?</AudioText></span>
            </div>

            <div className="pl-[25px] flex items-center gap-2">
              <span><AudioText audio={audio} id={"fragment-10"} src={soundE12} label={"Hear Yes,"}>Yes,</AudioText></span>

              {inputField(5)}

              <span><AudioText audio={audio} id={"fragment-11"} src={soundE11} label={"Hear is coming over."}>is coming over.</AudioText></span>
            </div>
          </div>

          {/* QUESTION 4 */}

          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="font-bold mr-1">4</span>

              <span><AudioText audio={audio} id={"fragment-12"} src={soundE13} label={"Hear Did you ride"}>Did you ride</AudioText></span>

              {inputField(6)}

              <span><AudioText audio={audio} id={"fragment-13"} src={soundE14} label={"Hear in the carnival?"}>in the carnival?</AudioText></span>
            </div>

            <div className="pl-[25px] flex items-center gap-2">
              <span><AudioText audio={audio} id={"fragment-14"} src={soundE15} label={"Hear Yes, I rode"}>Yes, I rode</AudioText></span>

              {inputField(7)}

              <span>.</span>
            </div>
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
      </div>
    </div>
  );
};

export default WB_Unit8_Page46_Q3;
