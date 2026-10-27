import soundK24 from "../../../assets/audio/Workbook/unit 2/Page 14 - K/Item_024_Whether_you_go_on_many_rides_or_only_a.mp3";
import soundK23 from "../../../assets/audio/Workbook/unit 2/Page 14 - K/Item_023_They_can_make_us_la.mp3";
import soundK22 from "../../../assets/audio/Workbook/unit 2/Page 14 - K/Item_022_Rides_are_funny_and_scary_because_they_go_up_and_down,.mp3";
import soundK21 from "../../../assets/audio/Workbook/unit 2/Page 14 - K/Item_021_of_rides_and_shows_that_make_you_laugh.mp3";
import soundK20 from "../../../assets/audio/Workbook/unit 2/Page 14 - K/Item_020_Or_do_you_like_a.mp3";
import soundK19 from "../../../assets/audio/Workbook/unit 2/Page 14 - K/Item_019_Do_you_like_riding_animals_like_the.mp3";
import soundK18 from "../../../assets/audio/Workbook/unit 2/Page 14 - K/Item_018_Like_the_ones_I_think_are_scary_but_would_give_you_a_thrill.mp3";
import soundK17 from "../../../assets/audio/Workbook/unit 2/Page 14 - K/Item_017_Would_you_like_a_ride_that_makes_you_shrill.mp3";
import soundK16 from "../../../assets/audio/Workbook/unit 2/Page 14 - K/Item_016_if_we_can_first_get_a_meal.mp3";
import soundK15 from "../../../assets/audio/Workbook/unit 2/Page 14 - K/Item_015_or_the_Ferris_wheel.mp3";
import soundK14 from "../../../assets/audio/Workbook/unit 2/Page 14 - K/Item_014_Which_do_you_prefer,_the.mp3";
import soundK13 from "../../../assets/audio/Workbook/unit 2/Page 14 - K/Item_013_asa_fly.mp3";
import soundK12 from "../../../assets/audio/Workbook/unit 2/Page 14 - K/Item_012_and.mp3";
import soundK11 from "../../../assets/audio/Workbook/unit 2/Page 14 - K/Item_011_Is_it_the_one_that_is_as.mp3";
import soundK10 from "../../../assets/audio/Workbook/unit 2/Page 14 - K/Item_010_that_is_close_by.mp3";
import soundK9 from "../../../assets/audio/Workbook/unit 2/Page 14 - K/Item_009_Which_ride_do_you_like_at_the.mp3";
import soundK8 from "../../../assets/audio/Workbook/unit 2/Page 14 - K/Item_008_Let's_see.mp3";
import soundK7 from "../../../assets/audio/Workbook/unit 2/Page 14 - K/Item_007_few.mp3";
import soundK6 from "../../../assets/audio/Workbook/unit 2/Page 14 - K/Item_006_twisty.mp3";
import soundK5 from "../../../assets/audio/Workbook/unit 2/Page 14 - K/Item_005_couple.mp3";
import soundK4 from "../../../assets/audio/Workbook/unit 2/Page 14 - K/Item_004_carnival.mp3";
import soundK3 from "../../../assets/audio/Workbook/unit 2/Page 14 - K/Item_003_giraffe.mp3";
import soundK2 from "../../../assets/audio/Workbook/unit 2/Page 14 - K/Item_002_crazy_I.mp3";
import soundK1 from "../../../assets/audio/Workbook/unit 2/Page 14 - K/Item_001_I_merry-go-round.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import { AudioText, AudioFeedback } from "../../StudentPages/unit5/ExerciseAudioText";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img from "../../../assets/imgs/pages/workbook/Right Int WB G5 U2/Page 14/Asset 9.svg";
const activationKeys = {
  onKeyDown: event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  }
};
const fieldKeys = {
  onKeyDown: event => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
  onKeyUp: event => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  }
};
const normalizeAnswer = text => text.normalize("NFKC").toLowerCase().replace(/[‘’']/g, "").replace(/[.,!?;:…“”"–—-]/g, " ").replace(/\s+/g, " ").trim();
const WB_Unit2_Page14_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");
  const answers = ["carnival", "twisty", "crazy", "merry-go-round", "Let's see", "giraffe", "couple", "few"];
  const words = ["merry-go-round", "giraffe", "carnival", "couple", "twisty", "Let's see", "few", "crazy"];
  const [studentAnswers, setStudentAnswers] = useState(["", "", "", "", "", "", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);
  const normalize = normalizeAnswer;
  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;
    const updated = [...studentAnswers];
    updated[i] = value;
    setStudentAnswers(updated);
    setResult(prev => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };
  const checkAnswers = () => {
    if (locked) return;
    audio.stop();
    const hasEmpty = studentAnswers.some(a => !a.trim());
    if (hasEmpty) {
      setAnnouncement(String("Please complete all answers.").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.info("Please complete all answers.");
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
    const color = correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const msg = `
      <div style="font-size:18px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;
    if (correctCount === total) {
      resetButtonRef.current?.focus({
        preventScroll: true
      });
      setLocked(true);
      setAnnouncement(String(msg).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      setAnnouncement(String(msg).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.error(msg);
    } else {
      setAnnouncement(String(msg).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.warning(msg);
    }
  };
  const showAnswers = () => {
    audio.stop();
    setAnnouncement("Model answers shown and locked.");
    resetButtonRef.current?.focus({
      preventScroll: true
    });
    setStudentAnswers(answers);
    setResult([true, true, true, true, true, true, true, true]);
    setLocked(true);
  };
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", "", "", "", "", "", "", ""]);
    setResult([]);
    setLocked(false);
  };
  const inputField = (i, width = "w-[170px]") => <div className="relative inline-block">
      <input style={{
      borderBottomColor: result[i] === true || result[i]?.overall === true ? "#16a34a" : undefined
    }} placeholder={"Answer"} title={["Which ride do you like at the ___ that is close by?", "Is it the one that is as ___", "and ___ as a fly?", "Which do you prefer, the ___ or the Ferris wheel?", "___ if we can first get a meal.", "Do you like riding animals like the ___?", "Or do you like a ___ of rides and shows?", "Whether you go on many rides or only a ___."][i]} aria-label={["Which ride do you like at the ___ that is close by?", "Is it the one that is as ___", "and ___ as a fly?", "Which do you prefer, the ___ or the Ferris wheel?", "___ if we can first get a meal.", "Do you like riding animals like the ___?", "Or do you like a ___ of rides and shows?", "Whether you go on many rides or only a ___."][i]} {...fieldKeys} type="text" value={studentAnswers[i]} disabled={locked || result[i] === true} onChange={e => handleChange(i, e.target.value)} className={`
          ${width}
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6D2980]
          font-semibold
          px-1

          ${result[i] === false ? "border-[#D1232A]" : "border-black"}
        `} />

      {result[i] === false && <span style={{
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
      boxShadow: "0 1px 6px rgba(0,0,0,0.2)"
    }}>
          ✕
        </span>}
    </div>;
  return <div data-exercise-scope={"WB_Unit2_Page14_Q1.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio} /><style>{`[data-exercise-scope="WB_Unit2_Page14_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit2_Page14_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit2_Page14_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[17px]">
        {/* TITLE */}
        <ExerciseHeader isWorkbook sectionLetter="K" title={<>
          
          Read and write.
        </>} subTitle="Read the full sentence first, then choose the word or expression that fits both the meaning and grammar." />

        {/* WORD BOX */}
        <div className="flex justify-center mb-10">
          <div style={{
          border: "2px solid #7D3C98",
          borderRadius: "12px",
          padding: "12px 24px"
        }} className="flex flex-row gap-10 whitespace-nowrap ">
            {words.map((word, index) => <div key={index} className="text-center"><AudioText audio={audio} id={`bank-${word}`} src={{
              "merry-go-round": soundK1,
              "crazy": soundK2,
              "giraffe": soundK3,
              "carnival": soundK4,
              "couple": soundK5,
              "twisty": soundK6,
              "few": soundK7,
              "Let's see": soundK8
            }[word]} label={`Hear ${word}`}>
                {word}
              </AudioText></div>)}
          </div>
        </div>

        {/* TEXT */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2">
            <span><AudioText audio={audio} id={"fragment-0"} src={soundK9} label={"Hear Which ride do you like at the"}>Which ride do you like at the</AudioText></span>

            {inputField(0)}

            <span><AudioText audio={audio} id={"fragment-1"} src={soundK10} label={"Hear that is close by?"}>that is close by?</AudioText></span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span><AudioText audio={audio} id={"fragment-2"} src={soundK11} label={"Hear Is it the one that is as"}>Is it the one that is as</AudioText></span>

            {inputField(1)}

            <span><AudioText audio={audio} id={"fragment-3"} src={soundK12} label={"Hear and"}>and</AudioText></span>

            {inputField(2)}

            <span><AudioText audio={audio} id={"fragment-4"} src={soundK13} label={"Hear as a fly?"}>as a fly?</AudioText></span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span><AudioText audio={audio} id={"fragment-5"} src={soundK14} label={"Hear Which do you prefer, the"}>Which do you prefer, the</AudioText></span>

            {inputField(3)}

            <span><AudioText audio={audio} id={"fragment-6"} src={soundK15} label={"Hear or the Ferris wheel?"}>or the Ferris wheel?</AudioText></span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {inputField(4)}

            <span><AudioText audio={audio} id={"fragment-7"} src={soundK16} label={"Hear if we can first get a meal."}>if we can first get a meal.</AudioText></span>
          </div>

          <div><AudioText audio={audio} id={"fragment-8"} src={soundK17} label={"Hear Would you like a ride that makes you shrill?"}>Would you like a ride that makes you shrill?</AudioText></div>

          <div><AudioText audio={audio} id={"fragment-9"} src={soundK18} label={"Hear Like the ones I think are scary but would give you a thrill?"}>
            Like the ones I think are scary but would give you a thrill?
          </AudioText></div>

          <div className="flex flex-wrap items-center gap-2">
            <span><AudioText audio={audio} id={"fragment-10"} src={soundK19} label={"Hear Do you like riding animals like the"}>Do you like riding animals like the</AudioText></span>

            {inputField(5)}

            <span>?</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span><AudioText audio={audio} id={"fragment-11"} src={soundK20} label={"Hear Or do you like a"}>Or do you like a</AudioText></span>

            {inputField(6)}

            <span><AudioText audio={audio} id={"fragment-12"} src={soundK21} label={"Hear of rides and shows that make you laugh?"}>of rides and shows that make you laugh?</AudioText></span>
          </div>

          <div><AudioText audio={audio} id={"fragment-13"} src={soundK22} label={"Hear Rides are funny and scary because they go up and down,"}>Rides are funny and scary because they go up and down,</AudioText></div>

          <div><AudioText audio={audio} id={"fragment-14"} src={soundK23} label={"Hear They can make us laugh or frown like the clown."}>They can make us laugh or frown like the clown.</AudioText></div>

          <div className="flex flex-wrap items-center gap-2">
            <span><AudioText audio={audio} id={"fragment-15"} src={soundK24} label={"Hear Whether you go on many rides or only a"}>Whether you go on many rides or only a</AudioText></span>

            {inputField(7)}

            <span>,</span>
          </div>

          <div>You’re always in for something fun to do!</div>
        </div>

        {/* IMAGE */}
        <div className="flex justify-center mt-10">
          <img src={img} alt={"An amusement park with a Ferris wheel, roller coaster and other rides."} style={{
          width: "380px",
          height: "auto",
          objectFit: "contain",
          marginBottom: "40px"
        }} />
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

        <button onPointerDown={event => {
        if (locked) event.preventDefault();
      }} style={{
        cursor: locked ? "not-allowed" : "pointer"
      }} {...activationKeys} disabled={locked} aria-label={"Check Answer"} type={"button"} className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>;
};
export default WB_Unit2_Page14_Q1;
