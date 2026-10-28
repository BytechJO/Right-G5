import soundG12 from "../../../assets/audio/Workbook/Unit 9/Page 54 - G/Item_012_,_his_mother_will_pack_his_lunch_in_the_morning.mp3";
import soundG11 from "../../../assets/audio/Workbook/Unit 9/Page 54 - G/Item_011_His_mother_will_give_him_money.mp3";
import soundG10 from "../../../assets/audio/Workbook/Unit 9/Page 54 - G/Item_010_If_he_wakes_up_early,.mp3";
import soundG9 from "../../../assets/audio/Workbook/Unit 9/Page 54 - G/Item_009_when_he_wakes_up_in_the_morning.mp3";
import soundG8 from "../../../assets/audio/Workbook/Unit 9/Page 54 - G/Item_008_If_Ben_studies_today_after_school,.mp3";
import soundG7 from "../../../assets/audio/Workbook/Unit 9/Page 54 - G/Item_007_can't_stop_thinking_about_it._He_will_skate_with_his_friends_if_he_gets.mp3";
import soundG6 from "../../../assets/audio/Workbook/Unit 9/Page 54 - G/Item_006_hopes_he_does_well_on_the_test._If_he_gets_an_A,_his_dad_will_buy_him_ro.mp3";
import soundG5 from "../../../assets/audio/Workbook/Unit 9/Page 54 - G/Item_005_test_when_all_of_the_students_are_in_class._He_will_get_his_test_results.mp3";
import soundG4 from "../../../assets/audio/Workbook/Unit 9/Page 54 - G/Item_004_lunch_at_school._If_he_wants_lunch_from_home,_his_mother_will_pack_his_l.mp3";
import soundG3 from "../../../assets/audio/Workbook/Unit 9/Page 54 - G/Item_003_up_early,_he_will_have_time_to_eat_all_of_his_breakfast._His_mother_will.mp3";
import soundG2 from "../../../assets/audio/Workbook/Unit 9/Page 54 - G/Item_002_he_wants_to_remember_everything._He_will_eat_a_good_breakfast_when_he_wa.mp3";
import soundG1 from "../../../assets/audio/Workbook/Unit 9/Page 54 - G/Item_001_Ben_has_a_test_tomorrow._If_he_studies_today_after_school,_he_will_do_we.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../../StudentPages/unit5/useExerciseAudio";
import {AudioText,AudioFeedback,AudioSpeaker} from "../../StudentPages/unit5/ExerciseAudioText";
import {SentenceGroup,SentencePart} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGE
import boyImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U9/Page 54/Asset 3.svg";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const WB_Unit9_Page54_Q1 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const answers = [
    "he will do well in the test",

    "He will eat a good breakfast",

    "he will have time to eat all of his breakfast",

    "if he wants to buy lunch at school",

    "If he wants lunch from home",

    "He will get his test results when he comes back next week.",

    "His dad will buy him roller skates.",
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

  const inputField = (i, width = "350px") => (
    <div className="relative w-full">
      <input placeholder={"Your answer"} aria-invalid={result[i]===false} title={["If Ben studies today after school, ___","___ when he wakes up in the morning.","If he wakes up early, ___","His mother will give him money ___","___, his mother will pack his lunch in the morning.","When will Ben get his test results?","What will happen if Ben gets an A on his test?"][i]} aria-label={["If Ben studies today after school, ___","___ when he wakes up in the morning.","If he wakes up early, ___","His mother will give him money ___","___, his mother will pack his lunch in the morning.","When will Ben get his test results?","What will happen if Ben gets an A on his test?"][i]} {...fieldKeys}
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
    <div data-exercise-scope={"WB_Unit9_Page54_Q1.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="WB_Unit9_Page54_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit9_Page54_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit9_Page54_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <ExerciseHeader isWorkbook sectionLetter="G" title={<>
          
          Read and write.
        </>} subTitle="Use the passage to complete each conditional sentence; check that the condition and result still make sense together." />

        {/* PARAGRAPH */}

        <div className="leading-[1.8] mb-10"><SentencePart first audio={audio} id="story-0" src={soundG1} label={"Hear Ben has a test tomorrow. If he studies today after school, he will do well on the test. He should sleep early if"}>{"Ben has a test tomorrow. If he studies today after school, he will do well on the test. He should sleep early if "}</SentencePart><SentencePart first audio={audio} id="story-1" src={soundG2} label={"Hear he wants to remember everything. He will eat a good breakfast when he wakes up in the morning. If he wakes"}>{"he wants to remember everything. He will eat a good breakfast when he wakes up in the morning. If he wakes "}</SentencePart><SentencePart first audio={audio} id="story-2" src={soundG3} label={"Hear up early, he will have time to eat all of his breakfast. His mother will give him some money if he wants to buy"}>{"up early, he will have time to eat all of his breakfast. His mother will give him some money if he wants to buy "}</SentencePart><SentencePart first audio={audio} id="story-3" src={soundG4} label={"Hear lunch at school. If he wants lunch from home, his mother will pack his lunch in the morning. He will take the"}>{"lunch at school. If he wants lunch from home, his mother will pack his lunch in the morning. He will take the "}</SentencePart><SentencePart first audio={audio} id="story-4" src={soundG5} label={"Hear test when all of the students are in class. He will get his test results when he comes back next week. Ben really"}>{"test when all of the students are in class. He will get his test results when he comes back next week. Ben really "}</SentencePart><SentencePart first audio={audio} id="story-5" src={soundG6} label={"Hear hopes he does well on the test. If he gets an A, his dad will buy him roller skates. Ben is so excited that he"}>{"hopes he does well on the test. If he gets an A, his dad will buy him roller skates. Ben is so excited that he "}</SentencePart><SentencePart first audio={audio} id="story-6" src={soundG7} label={"Hear can’t stop thinking about it. He will skate with his friends if he gets the roller skates."}>{"can’t stop thinking about it. He will skate with his friends if he gets the roller skates."}</SentencePart></div>

        {/* QUESTIONS */}

        <div className="flex flex-col gap-6 mb-6">
          {/* 1 */}

          {/* 1 */}

          <div className="flex items-end gap-3 w-full">
            <span className="font-bold shrink-0">1</span>

            <span className="shrink-0"><AudioText audio={audio} id={"fragment-0"} src={soundG8} label={"Hear If Ben studies today after school,"}>If Ben studies today after school,</AudioText></span>

            <div className="flex-1">{inputField(0, "100%")}</div>

            <span className="shrink-0">.</span>
          </div>

          {/* 2 */}

          <div className="flex items-end gap-3 w-full">
            <span className="font-bold shrink-0">2</span>

            <div className="flex-1">{inputField(1, "100%")}</div>

            <span className="shrink-0"><AudioText audio={audio} id={"fragment-1"} src={soundG9} label={"Hear when he wakes up in the morning."}>when he wakes up in the morning.</AudioText></span>
          </div>

          {/* 3 */}

          <div className="flex items-end gap-3 w-full">
            <span className="font-bold shrink-0">3</span>

            <span className="shrink-0"><AudioText audio={audio} id={"fragment-2"} src={soundG10} label={"Hear If he wakes up early,"}>If he wakes up early,</AudioText></span>

            <div className="flex-1">{inputField(2, "100%")}</div>

            <span className="shrink-0">.</span>
          </div>

          {/* 4 */}

          <div className="flex items-end gap-3 w-full">
            <span className="font-bold shrink-0">4</span>

            <span className="shrink-0"><AudioText audio={audio} id={"fragment-3"} src={soundG11} label={"Hear His mother will give him money"}>His mother will give him money</AudioText></span>

            <div className="flex-1">{inputField(3, "100%")}</div>

            <span className="shrink-0">.</span>
          </div>

          {/* 5 */}

          <div className="flex items-end gap-3 w-full">
            <span className="font-bold shrink-0">5</span>

            <div className="flex-1">{inputField(4, "100%")}</div>

            <span className="shrink-0"><AudioText audio={audio} id={"fragment-4"} src={soundG12} label={"Hear , his mother will pack his lunch in the morning."}>
              , his mother will pack his lunch in the morning.
            </AudioText></span>
          </div>

          {/* 6 */}

          <div className="flex items-end gap-3 w-full">
            <span className="font-bold shrink-0">6</span>

            <span className="shrink-0">
              When will Ben get his test results?
            </span>

            <div className="flex-1">{inputField(5, "100%")}</div>
          </div>

          {/* 7 */}

          <div className="flex items-end gap-3 w-full">
            <span className="font-bold shrink-0">7</span>

            <span className="shrink-0">
              What will happen if Ben gets an A on his test?
            </span>

            <div className="flex-1">{inputField(6, "100%")}</div>
          </div>
        </div>

        {/* IMAGE */}

        <img
          src={boyImg}
          alt={"A boy resting his chin on one hand and looking upward."}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
            marginBottom: 20,
          }}
        />
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

export default WB_Unit9_Page54_Q1;
