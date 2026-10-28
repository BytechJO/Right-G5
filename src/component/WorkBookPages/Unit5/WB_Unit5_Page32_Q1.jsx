import soundL25 from "../../../assets/audio/Workbook/Unit 5/Page 32 - L/Item_025_And_then_I'll_gi.mp3";
import soundL24 from "../../../assets/audio/Workbook/Unit 5/Page 32 - L/Item_024_I'll_give_you_fir.mp3";
import soundL23 from "../../../assets/audio/Workbook/Unit 5/Page 32 - L/Item_023_For_our_special_blend_of_spice_tea.mp3";
import soundL22 from "../../../assets/audio/Workbook/Unit 5/Page 32 - L/Item_022_I_will_give_you_our_secret.mp3";
import soundL21 from "../../../assets/audio/Workbook/Unit 5/Page 32 - L/Item_021_And_a_free_cake_with_it,_too.mp3";
import soundL20 from "../../../assets/audio/Workbook/Unit 5/Page 32 - L/Item_020_I_have_just_the_right_blend_for_you.mp3";
import soundL19 from "../../../assets/audio/Workbook/Unit 5/Page 32 - L/Item_019_I_would_prefer_the_black_tea,_please.mp3";
import soundL18 from "../../../assets/audio/Workbook/Unit 5/Page 32 - L/Item_018_What_kinds_of_teas.mp3";
import soundL17 from "../../../assets/audio/Workbook/Unit 5/Page 32 - L/Item_017_We_can_give_you_tea_of_almost_any_kind.mp3";
import soundL16 from "../../../assets/audio/Workbook/Unit 5/Page 32 - L/Item_016_Which_flavor_do_you.mp3";
import soundL15 from "../../../assets/audio/Workbook/Unit 5/Page 32 - L/Item_015_We_want_you_to_try_our_selection_of_tea.mp3";
import soundL14 from "../../../assets/audio/Workbook/Unit 5/Page 32 - L/Item_014_No,_said_the_server,_The_tea_is_free.mp3";
import soundL13 from "../../../assets/audio/Workbook/Unit 5/Page 32 - L/Item_013_To_have_some_tea_along_with_my_meal.mp3";
import soundL12 from "../../../assets/audio/Workbook/Unit 5/Page 32 - L/Item_012_Why_I_asked._Is_that_the_deal.mp3";
import soundL11 from "../../../assets/audio/Workbook/Unit 5/Page 32 - L/Item_011_Would_you_please_order_some_tea.mp3";
import soundL10 from "../../../assets/audio/Workbook/Unit 5/Page 32 - L/Item_010_server_came_and_asked_me,.mp3";
import soundL9 from "../../../assets/audio/Workbook/Unit 5/Page 32 - L/Item_009_and_all_kinds_of_meat.mp3";
import soundL8 from "../../../assets/audio/Workbook/Unit 5/Page 32 - L/Item_008_One_night_as_I_went_out_to_eat.mp3";
import soundL7 from "../../../assets/audio/Workbook/Unit 5/Page 32 - L/Item_007_What_would_you_like.mp3";
import soundL6 from "../../../assets/audio/Workbook/Unit 5/Page 32 - L/Item_006_presentation.mp3";
import soundL4 from "../../../assets/audio/Workbook/Unit 5/Page 32 - L/Item_004_have_in_mind.mp3";
import soundL3 from "../../../assets/audio/Workbook/Unit 5/Page 32 - L/Item_003_recipe.mp3";
import soundL2 from "../../../assets/audio/Workbook/Unit 5/Page 32 - L/Item_002_shish_kebab.mp3";
import soundL1 from "../../../assets/audio/Workbook/Unit 5/Page 32 - L/Item_001_information.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../../StudentPages/unit5/useExerciseAudio";
import {AudioText,AudioFeedback} from "../../StudentPages/unit5/ExerciseAudioText";

import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGE
import teaImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U5/Page 32/Asset 17.svg";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const WB_Unit5_Page32_Q1 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const wordBank = [
    "information",
    "shish kebab",
    "recipe",
    "have in mind",
    "presentation",
    "What would you like",
  ];

  const answers = [
    "shish kebab",
    "have in mind",
    "What would you like",
    "recipe",
    "information",
    "presentation",
  ];

  const [studentAnswers, setStudentAnswers] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  // ------------------------
  // HANDLE INPUT
  // ------------------------

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...studentAnswers];

    updated[i] = value;

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

    const hasEmpty = studentAnswers.some((a) => !a.trim());

    if (hasEmpty) {
      (setAnnouncement(String("Please complete all answers.").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.info("Please complete all answers."));

      return;
    }

    let correctCount = 0;

    // ترتيب الانبوتات مش مهم
    const normalizedAnswers = answers.map((a) => normalize(a));

    const usedAnswers = studentAnswers.flatMap((answer,index)=>result[index]===true?[normalizedAnswers.indexOf(normalize(answer))]:[]);

    const newResults = studentAnswers.map((answer, slot) => {
      const normalized = normalize(answer);

      const foundIndex = normalizedAnswers.findIndex(
        (a, i) => a === normalized && !usedAnswers.includes(i),
      );

      const ok = result[slot]===true || foundIndex !== -1;

      if (ok) {
        if(foundIndex!==-1)usedAnswers.push(foundIndex);

        correctCount++;
      }

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

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i, width = "260px") => (
    <div className="relative inline-block">
      <input aria-invalid={result[i]===false} placeholder={"Word or phrase"} title={`Poem blank ${i+1}: use a word or expression from the bank`} aria-label={`Poem blank ${i+1}: use a word or expression from the bank`} {...fieldKeys}
        type="text"
        value={studentAnswers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
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
        style={{
          width,
        borderBottomColor:(result[i]===true)?"#16a34a":undefined}}
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
    </div>
  );

  return (
    <div data-exercise-scope={"WB_Unit5_Page32_Q1.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="WB_Unit5_Page32_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit5_Page32_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit5_Page32_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[17px] w-full">
        {/* TITLE */}

        <ExerciseHeader isWorkbook sectionLetter="L" title={<>
          
          Read and write.
        </>} subTitle="Read the full sentence first, then choose the word or expression that fits both the meaning and grammar." />

        {/* WORD BANK */}

        <div className="flex flex-wrap gap-2 mb-8">
          {wordBank.map((word, index) => (
            <div
              key={index}
              className="border border-[#7D3C98] rounded-lg px-3 py-0.5 text-[17px]"
            ><AudioText audio={audio} id={`bank-${index}`} src={[soundL1,soundL2,soundL3,soundL4,soundL6,soundL7][index]} label={`Hear ${word}`}>
              {word}
            </AudioText></div>
          ))}
        </div>

        {/* STORY */}

        <div className="leading-7 pl-[45px] relative mb-10">
          <div><AudioText audio={audio} id="poem-fragment-0" src={soundL8} label="Hear One night as I went out to eat">One night as I went out to eat</AudioText></div>

          <div>{inputField(0, "260px")} <AudioText audio={audio} id="poem-fragment-1" src={soundL9} label="Hear and all kinds of meat.">and all kinds of meat.</AudioText></div>

          <div><AudioText audio={audio} id="poem-fragment-2" src={soundL10} label="Hear A server came and asked me,">A server came and asked me,</AudioText></div>

          <div><AudioText audio={audio} id="poem-fragment-3" src={soundL11} label="Hear “Would you please order some tea?”">“Would you please order some tea?”</AudioText></div>

          <div><AudioText audio={audio} id="poem-fragment-4" src={soundL12} label="Hear “Why?” I asked. “Is that the deal">“Why?” I asked. “Is that the deal</AudioText></div>

          <div><AudioText audio={audio} id="poem-fragment-5" src={soundL13} label="Hear To have some tea along with my meal?”">To have some tea along with my meal?”</AudioText></div>

          <div><AudioText audio={audio} id="poem-fragment-6" src={soundL14} label="Hear “No,” said the server, “The tea is free.">“No,” said the server, “The tea is free.</AudioText></div>

          <div><AudioText audio={audio} id="poem-fragment-7" src={soundL15} label="Hear We want you to try our selection of tea.">We want you to try our selection of tea.</AudioText></div>

          <div><AudioText audio={audio} id="poem-fragment-8" src={soundL16} label="Hear Which flavor do you">Which flavor do you</AudioText> {inputField(1, "250px")} ?</div>

          <div><AudioText audio={audio} id="poem-fragment-9" src={soundL17} label="Hear We can give you tea of almost any kind.">We can give you tea of almost any kind.</AudioText></div>

          <div>{inputField(2, "260px")} <AudioText audio={audio} id="poem-fragment-10" src={soundL18} label="Hear ? What kinds of teas?”">? What kinds of teas?”</AudioText></div>

          <div><AudioText audio={audio} id="poem-fragment-11" src={soundL19} label="Hear “I would prefer the black tea, please.”">“I would prefer the black tea, please.”</AudioText></div>

          <div><AudioText audio={audio} id="poem-fragment-12" src={soundL20} label="Hear “I have just the right blend for you">“I have just the right blend for you</AudioText></div>

          <div><AudioText audio={audio} id="poem-fragment-13" src={soundL21} label="Hear And a free cake with it, too.">And a free cake with it, too.</AudioText></div>

          <div><AudioText audio={audio} id="poem-fragment-14" src={soundL22} label="Hear I will give you our secret">I will give you our secret</AudioText> {inputField(3, "240px")}</div>

          <div><AudioText audio={audio} id="poem-fragment-15" src={soundL23} label="Hear For our special blend of spice tea.">For our special blend of spice tea.</AudioText></div>

          <div><AudioText audio={audio} id="poem-fragment-16" src={soundL24} label="Hear I’ll give you first some tea">I’ll give you first some tea</AudioText> {inputField(4, "250px")}</div>

          <div><AudioText audio={audio} id="poem-fragment-17" src={soundL25} label="Hear And then I’ll give you a quick">And then I’ll give you a quick</AudioText> {inputField(5, "260px")}</div>

          <div>Of why our teas do taste so great.</div>

          <div>Don’t worry, I’ll be quick; you won’t be late.”</div>

          {/* IMAGE */}

          <img
            src={teaImg}
            alt={"Tea in a decorated cup on a matching saucer."}
            style={{
              width: "200px",
              height: "auto",
              objectFit: "contain",
              position: "absolute",
              right: "0",
              bottom: "0",
            }}
          />
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

export default WB_Unit5_Page32_Q1;
