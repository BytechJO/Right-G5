import soundK30 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_030_and_black_leather.mp3";
import soundK29 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_029_He_had_bought_blue.mp3";
import soundK26 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_026_makes_the_best_food.mp3";
import soundK25 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_025_of_us.mp3";
import soundK24 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_024_place_that_sells_cooked_meat._The_one_here.mp3";
import soundK23 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_023_I'm_hungry,_too._Let's.mp3";
import soundK22 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_022_eat.mp3";
import soundK21 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_021_looking_for_some_food_to.mp3";
import soundK20 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_020_saw_my_mom_in_the.mp3";
import soundK19 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_019_said,_as.mp3";
import soundK28 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_028_My_dad_came_by_as_we_bought_pizza_and_some_fruits.mp3";
import soundK27 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_027_I_don't_want_burgers,_said_Mom._I_want_to_eat_pizza.mp3";
import soundK18 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_018_Dad_needed_clothes,_so_he_went_to_the.mp3";
import soundK17 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_017_I_needed_books_so_I_went_to_the.mp3";
import soundK15 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_015_and_each_went_to_a_different_space.mp3";
import soundK16 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_016_We.mp3";
import soundK14 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_014_We_went_to_the_mall_next_to_our_place.mp3";
import soundK13 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_013_grocery_store.mp3";
import soundK12 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_012_food_court.mp3";
import soundK11 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_011_boots.mp3";
import soundK10 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_010_split_up.mp3";
import soundK9 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_009_bookstore.mp3";
import soundK8 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_008_jeans.mp3";
import soundK7 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_007_clothes_store.mp3";
import soundK6 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_006_head.mp3";
import soundK5 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_005_check_out.mp3";
import soundK4 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_004_head_over.mp3";
import soundK3 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_003_straight_ahead.mp3";
import soundK2 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_002_electronics.mp3";
import soundK1 from "../../../assets/audio/Workbook/Unit 4/Page 26 - K/Item_001_Wait_a_minute.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../../StudentPages/unit5/useExerciseAudio";
import {AudioText,AudioFeedback,AudioSpeaker} from "../../StudentPages/unit5/ExerciseAudioText";
import {SentenceGroup,SentencePart} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGE
import familyImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U4/Page 26/Asset 12.svg";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const WB_Unit4_Page26_Q1 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const wordBank = [
    "Wait a minute",
    "electronics",
    "straight ahead",
    "head over",
    "check out",
    "head",
    "clothes store",
    "jeans",
    "bookstore",
    "split up",
    "boots",
    "food court",
    "grocery store",
  ];

  const answers = [
    "split up",
    "bookstore",
    "clothes store",
    "Wait a minute",
    "food court",
    "check out",
    "straight ahead",
    "jeans",
    "boots",
    "electronics",
    "head over",
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
    "",
    "",
    "",
  ]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = studentAnswers.map(row=>Array.isArray(row)?[...row]:row);

    updated[i] = value;

    setStudentAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;audio.stop();

    const hasEmpty = studentAnswers.some((a) => !a.trim());

    if (hasEmpty) {
      (setAnnouncement(String("Please complete all answers.").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.info("Please complete all answers."));

      return;
    }

    let correctCount = 0;

    const newResults = studentAnswers.map((answer, i) => {
      const ok = normalize(answer) === normalize(answers[i]);

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

  const showAnswers = () => {audio.stop();setAnnouncement("Model answers shown and locked.");resetButtonRef.current?.focus({preventScroll:true});
    setStudentAnswers(answers);

    setResult([
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ]);

    setLocked(true);
  };

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", "", "", "", "", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width = "180px") => (
    <span className="relative inline-block">
      <input aria-invalid={result[i]===false} placeholder={"Word or phrase"} title={`Story blank ${i+1}: use a word or expression from the bank`} aria-label={`Story blank ${i+1}: use a word or expression from the bank`} {...fieldKeys}
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
    </span>
  );

  return (
    <div data-exercise-scope={"WB_Unit4_Page26_Q1.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="WB_Unit4_Page26_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit4_Page26_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit4_Page26_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall">
        {/* TITLE */}
        <ExerciseHeader isWorkbook sectionLetter="K" title={<>
          
          Read and write.
        </>} subTitle="Read the full sentence first, then choose the word or expression that fits both the meaning and grammar." />

        {/* WORD BANK */}
        <div className="border-2 border-[#7D3C98] rounded-xl px-5 py-4 mb-6">
          <div className="grid grid-cols-5 gap-y-2 gap-x-8">
            {wordBank.map((word, index) => (
              <span key={index} className="text-[17px]"><AudioText audio={audio} id={`bank-${index}`} src={[soundK1,soundK2,soundK3,soundK4,soundK5,soundK6,soundK7,soundK8,soundK9,soundK10,soundK11,soundK12,soundK13][index]} label={`Hear ${word}`}>
                {word}
              </AudioText></span>
            ))}
          </div>
        </div>

        {/* STORY */}
        <div className="relative  text-[17px] leading-loose w-[110%] mb-10">
          {/* IMAGE */}
          <img
            src={familyImg}
            alt={"A family with shopping bags."}
            style={{
              width: "130px",
              height: "auto",
              objectFit: "contain",
              float: "right",
              marginLeft: "18px",
              marginBottom: "10px",
            }}
          />

          <p><AudioText audio={audio} id="fragment-0" src={soundK14} label="Hear We went to the mall next to our place.">We went to the mall next to our place.</AudioText></p>

          <p><AudioText audio={audio} id="fragment-1" src={soundK16} label="Hear We">We</AudioText> {inputField(0, "180px")} <AudioText audio={audio} id="fragment-2" src={soundK15} label="Hear and each went to a different space.">and each went to a different space.</AudioText></p>

          <p><AudioText audio={audio} id="fragment-3" src={soundK17} label="Hear I needed books so I went to the">I needed books so I went to the</AudioText> {inputField(1, "180px")}, </p>

          <p><AudioText audio={audio} id="fragment-4" src={soundK18} label="Hear Dad needed clothes, so he went to the">Dad needed clothes, so he went to the</AudioText> {inputField(2, "180px")}.</p>

          <p>
            “{inputField(3, "180px")},” I <AudioText audio={audio} id="fragment-5" src={soundK19} label="Hear said, as">said, as</AudioText> I <AudioText audio={audio} id="fragment-6" src={soundK20} label="Hear saw my mom in the">saw my mom in the</AudioText>{" "}
            {inputField(4, "180px")} <AudioText audio={audio} id="fragment-7" src={soundK21} label="Hear looking for some food to">looking for some food to</AudioText> <AudioText audio={audio} id="fragment-8" src={soundK22} label="Hear eat.">eat.</AudioText> </p>

          <p> “<AudioText audio={audio} id="fragment-9" src={soundK23} label="Hear I’m hungry, too. Let’s">I’m hungry, too. Let’s</AudioText> {inputField(5, "180px")} a <AudioText audio={audio} id="fragment-10" src={soundK24} label="Hear place that sells cooked meat. The one here">place that sells cooked meat. The one here</AudioText> {inputField(6, "220px")} <AudioText audio={audio} id="fragment-11" src={soundK25} label="Hear of us">of us</AudioText> <AudioText audio={audio} id="fragment-12" src={soundK26} label="Hear makes the best food.">makes the best food.</AudioText>” </p>

          <p>“<AudioText audio={audio} id="fragment-13" src={soundK27} label="Hear I don’t want burgers,” said Mom. “I want to eat pizza.">I don’t want burgers,” said Mom. “I want to eat pizza.</AudioText>”</p>

          <p><AudioText audio={audio} id="fragment-14" src={soundK28} label="Hear My dad came by as we bought pizza and some fruits.">My dad came by as we bought pizza and some fruits.</AudioText></p>

          <p> <AudioText audio={audio} id="fragment-15" src={soundK29} label="Hear He had bought blue">He had bought blue</AudioText> {inputField(7, "180px")} <AudioText audio={audio} id="fragment-16" src={soundK30} label="Hear and black leather">and black leather</AudioText>{" "}
            {inputField(8, "180px")}.
          </p>

          <p>
            Then, we went to the {inputField(9, "180px")} store to buy a new
            cell phone.
          </p>

          <p><AudioText audio={audio} id="fragment-17" src={soundK16} label="Hear We">We</AudioText> all had fun shopping.</p>

          <p>
            Then, it was time to {inputField(10, "220px")} to the parking lot,
            get in the car, and go home.
          </p>
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

export default WB_Unit4_Page26_Q1;
