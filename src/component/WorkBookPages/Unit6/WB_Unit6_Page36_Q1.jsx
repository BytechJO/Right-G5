import soundH23 from "../../../assets/audio/Workbook/Unit 6/Page 36 - H/Item_023_friends._That_way,_the_fun_never_ends!.mp3";
import soundH22 from "../../../assets/audio/Workbook/Unit 6/Page 36 - H/Item_022_of.mp3";
import soundH21 from "../../../assets/audio/Workbook/Unit 6/Page 36 - H/Item_021_We_go_with.mp3";
import soundH19 from "../../../assets/audio/Workbook/Unit 6/Page 36 - H/Item_019_our_winning_tickets_for_lots_of_toys.mp3";
import soundH20 from "../../../assets/audio/Workbook/Unit 6/Page 36 - H/Item_020_We_can.mp3";
import soundH18 from "../../../assets/audio/Workbook/Unit 6/Page 36 - H/Item_018_and_sales.mp3";
import soundH17 from "../../../assets/audio/Workbook/Unit 6/Page 36 - H/Item_017_the.mp3";
import soundH16 from "../../../assets/audio/Workbook/Unit 6/Page 36 - H/Item_016_We_love_to.mp3";
import soundH15 from "../../../assets/audio/Workbook/Unit 6/Page 36 - H/Item_015_We_can_go_to_the_water_show_to_see_the_dolphins_and_whales.mp3";
import soundH12 from "../../../assets/audio/Workbook/Unit 6/Page 36 - H/Item_012_basketball.mp3";
import soundH14 from "../../../assets/audio/Workbook/Unit 6/Page 36 - H/Item_014_or.mp3";
import soundH13 from "../../../assets/audio/Workbook/Unit 6/Page 36 - H/Item_013_We_can_go.mp3";
import soundH11 from "../../../assets/audio/Workbook/Unit 6/Page 36 - H/Item_011_at_the_carnival.mp3";
import soundH10 from "../../../assets/audio/Workbook/Unit 6/Page 36 - H/Item_010_My_friend_and_I_love_to_see_the_new.mp3";
import soundH9 from "../../../assets/audio/Workbook/Unit 6/Page 36 - H/Item_009_discounts.mp3";
import soundH8 from "../../../assets/audio/Workbook/Unit 6/Page 36 - H/Item_008_shoot.mp3";
import soundH7 from "../../../assets/audio/Workbook/Unit 6/Page 36 - H/Item_007_attractions.mp3";
import soundH6 from "../../../assets/audio/Workbook/Unit 6/Page 36 - H/Item_006_trade.mp3";
import soundH5 from "../../../assets/audio/Workbook/Unit 6/Page 36 - H/Item_005_bowling.mp3";
import soundH2 from "../../../assets/audio/Workbook/Unit 6/Page 36 - H/Item_002_a_bunch.mp3";
import soundH1 from "../../../assets/audio/Workbook/Unit 6/Page 36 - H/Item_001_take_advantage_of.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../../StudentPages/unit5/useExerciseAudio";
import {AudioText,AudioFeedback,AudioSpeaker} from "../../StudentPages/unit5/ExerciseAudioText";
import {SentenceGroup,SentencePart} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGES
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 36/Asset 13.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 36/Asset 14.svg";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const WB_Unit6_Page36_Q1 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const wordBank = [
    "take advantage of",
    "a bunch",
    "bowling",
    "trade",
    "attractions",
    "shoot",
    "discounts",
  ];

  const answers = [
    "attractions",
    "bowling",
    "shoot",
    "take advantage of",
    "discounts",
    "trade",
    "a bunch",
  ];

  const [studentAnswers, setStudentAnswers] = useState([
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

  // ------------------------
  // SHOW ANSWERS
  // ------------------------

  const showAnswers = () => {audio.stop();setAnnouncement("Model answers shown and locked.");resetButtonRef.current?.focus({preventScroll:true});
    setStudentAnswers(answers);

    setResult([true, true, true, true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i, width) => (
    <div className="relative inline-block">
      <input placeholder={"Word or phrase"} aria-invalid={result[i]===false} title={`Story blank ${i+1}: use a word or expression from the visible bank`} aria-label={`Story blank ${i+1}: use a word or expression from the visible bank`} {...fieldKeys}
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
        borderBottomColor:(result[i]===true)?"#16a34a":(result[i]===false)?"#D1232A":undefined}}
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
    <div data-exercise-scope={"WB_Unit6_Page36_Q1.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="WB_Unit6_Page36_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit6_Page36_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit6_Page36_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <ExerciseHeader isWorkbook sectionLetter="H" title={<>
          
          Read and write.
        </>} subTitle="Read the full sentence first, then choose the word or expression that fits both the meaning and grammar." />

        {/* WORD BANK */}

        <div className="flex flex-wrap gap-2 mb-8">
          {wordBank.map((word, index) => (
            <div
              key={index}
              className="border border-[#7D3C98] rounded-lg px-3 py-0.5 text-[17px]"
            ><AudioText audio={audio} id={`bank-${index}`} src={[soundH1,soundH2,soundH5,soundH6,soundH7,soundH8,soundH9][index]} label={`Hear ${word}`}>
              {word}
            </AudioText></div>
          ))}
        </div>

        {/* CONTENT */}

        <div className="px-[30px] leading-[1.7] relative">
          {/* FIRST PART */}

          <div className="flex justify-between items-start gap-2">
            {/* TEXT */}
            <div className="flex-1">
              <div>
                <AudioText audio={audio} id="fragment-10" src={soundH10} label="Hear My friend and I love to see the new">My friend and I love to see the new</AudioText> {inputField(0, "140px")} <AudioText audio={audio} id="fragment-11" src={soundH11} label="Hear at the carnival.">at the carnival.</AudioText>
              </div>

              <div className="mt-3">
                <AudioText audio={audio} id="fragment-13" src={soundH13} label="Hear We can go">We can go</AudioText> {inputField(1, "120px")} <AudioText audio={audio} id="fragment-14" src={soundH14} label="Hear or">or</AudioText> {inputField(2, "110px")} <AudioText audio={audio} id="fragment-12" src={soundH12} label="Hear a basketball.">a basketball.</AudioText>
              </div>

              <div>
                <AudioText audio={audio} id="fragment-15" src={soundH15} label="Hear We can go to the water show to see the dolphins and whales.">We can go to the water show to see the dolphins and whales.</AudioText>
              </div>

              <div className="mt-5">
                <AudioText audio={audio} id="fragment-16" src={soundH16} label="Hear We love to">We love to</AudioText> {inputField(3, "260px")} <AudioText audio={audio} id="fragment-17" src={soundH17} label="Hear the">the</AudioText>
              </div>

              <div>{inputField(4, "180px")} <AudioText audio={audio} id="fragment-18" src={soundH18} label="Hear and sales.">and sales.</AudioText></div>
            </div>

            {/* IMAGE */}
            <img
              src={img1}
              alt={"A red bowling ball rolling toward pins on a lane."}
              style={{
                width: "250px",
                height: "200px",
                objectFit: "contain",
                flexShrink: 0,
              }}
            />
          </div>

          {/* SECOND PART */}
          <div className="flex items-start gap-6 mt-8">
            {/* WHALE IMAGE */}

            <img
              src={img2}
              alt={"A cartoon whale spouting water."}
              style={{
                width: "270px",
                height: "auto",
                objectFit: "contain",
              }}
            />

            {/* TEXT */}

            <div className="leading-[1.8] pt-2">
              <div>
                <AudioText audio={audio} id="fragment-20" src={soundH20} label="Hear We can">We can</AudioText> {inputField(5, "120px")} <AudioText audio={audio} id="fragment-19" src={soundH19} label="Hear our winning tickets for lots of toys.">our winning tickets for lots of toys.</AudioText>
              </div>

              <div className="mt-2"><AudioText audio={audio} id="fragment-21" src={soundH21} label="Hear We go with">We go with</AudioText> {inputField(6, "220px")} <AudioText audio={audio} id="fragment-22" src={soundH22} label="Hear of">of</AudioText></div>

              <div><AudioText audio={audio} id="fragment-23" src={soundH23} label="Hear friends. That way, the fun never ends!">friends. That way, the fun never ends!</AudioText></div>
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

        <button style={{cursor:locked?"not-allowed":"pointer"}} {...activationKeys} disabled={locked} aria-label={"Check Answer"} type={"button"} className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default WB_Unit6_Page36_Q1;
