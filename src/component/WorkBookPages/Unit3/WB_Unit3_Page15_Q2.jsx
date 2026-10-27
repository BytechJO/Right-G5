import soundB15 from "../../../assets/audio/Workbook/Unit 3/Page 15 - B/Item_015_Holly_I'll_take_bananas,_chocolate_syrup,_and_vanilla_ice_cream._Thank_y.mp3";
import soundB14 from "../../../assets/audio/Workbook/Unit 3/Page 15 - B/Item_014_Henry_We_use_what_is_usually_in_season._Do_you_like_bananas,_kiwis,_or_o.mp3";
import soundB13 from "../../../assets/audio/Workbook/Unit 3/Page 15 - B/Item_013_What_types_of_fruit_do_you_use.mp3";
import soundB12 from "../../../assets/audio/Workbook/Unit 3/Page 15 - B/Item_012_Holly.mp3";
import soundB11 from "../../../assets/audio/Workbook/Unit 3/Page 15 - B/Item_011_one_dessert.mp3";
import soundB10 from "../../../assets/audio/Workbook/Unit 3/Page 15 - B/Item_010_of_these!_They're_a_variety_of_different_flavors_of_ice_cream_with_syrup.mp3";
import soundB9 from "../../../assets/audio/Workbook/Unit 3/Page 15 - B/Item_009_You_should.mp3";
import soundB8 from "../../../assets/audio/Workbook/Unit 3/Page 15 - B/Item_008_!_You_really_don't_know_what_ice_cream_sundaes_are.mp3";
import soundB7 from "../../../assets/audio/Workbook/Unit 3/Page 15 - B/Item_007_Henry_(surprised).mp3";
import soundB6 from "../../../assets/audio/Workbook/Unit 3/Page 15 - B/Item_006_Holly_That_sounds_interesting._What's_an_ice_cream_sundae_Does_it.mp3";
import soundB5 from "../../../assets/audio/Workbook/Unit 3/Page 15 - B/Item_005_Henry_What_kind_of_ice_cream_sundae_would_you_like.mp3";
import soundB4 from "../../../assets/audio/Workbook/Unit 3/Page 15 - B/Item_004_That_sounds_good.mp3";
import soundB3 from "../../../assets/audio/Workbook/Unit 3/Page 15 - B/Item_003_taste_funny.mp3";
import soundB2 from "../../../assets/audio/Workbook/Unit 3/Page 15 - B/Item_002_try_some_I.mp3";
import soundB1 from "../../../assets/audio/Workbook/Unit 3/Page 15 - B/Item_001_I_No_way.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import { AudioText, AudioFeedback } from "../../StudentPages/unit5/ExerciseAudioText";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
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
const WB_Unit3_Page15_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");
  const answers = ["taste funny", "No way", "try some", "That sounds good"];
  const words = ["No way", "taste funny", "That sounds good", "try some"];
  const [studentAnswers, setStudentAnswers] = useState(["", "", "", ""]);
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
    setResult([true, true, true, true]);
    setLocked(true);
  };
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", "", "", ""]);
    setResult([]);
    setLocked(false);
  };
  const inputField = (i, width = "w-[180px]") => <div className="relative inline-block">
      <input aria-invalid={result[i] === false} style={{
      borderBottomColor: result[i] === true || result[i]?.overall === true ? "#16a34a" : undefined
    }} placeholder={"Your answer"} title={["Holly: Does it ___?", "Henry: ___! You really do not know what ice cream sundaes are?", "Henry: You should ___ of these!", "Holly: ___. What types of fruit do you use?"][i]} aria-label={["Holly: Does it ___?", "Henry: ___! You really do not know what ice cream sundaes are?", "Henry: You should ___ of these!", "Holly: ___. What types of fruit do you use?"][i]} {...fieldKeys} type="text" value={studentAnswers[i]} disabled={locked || result[i] === true} onChange={e => handleChange(i, e.target.value)} className={`
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
  return <div data-exercise-scope={"WB_Unit3_Page15_Q2.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio} /><style>{`[data-exercise-scope="WB_Unit3_Page15_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit3_Page15_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit3_Page15_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[18px]">
        {/* TITLE */}
        <ExerciseHeader isWorkbook sectionLetter="B" title={<>
          
          Read and write.
        </>} subTitle="Read the full sentence first, then choose the word or expression that fits both the meaning and grammar." />

        {/* WORD BOX */}
        <div className="flex justify-center mb-8">
          <div style={{
          border: "2px solid #7D3C98",
          borderRadius: "10px",
          padding: "8px 20px",
          width: "fit-content"
        }} className="flex flex-wrap justify-center gap-x-10 gap-y-2">
            {words.map((word, index) => <span key={index}><AudioText audio={audio} id={`bank-${word}`} src={{
              "No way": soundB1,
              "try some": soundB2,
              "taste funny": soundB3,
              "That sounds good": soundB4
            }[word]} label={`Hear ${word}`}>{word}</AudioText></span>)}
          </div>
        </div>

        {/* DIALOG */}
        <div className="flex flex-col gap-5">
          <div><AudioText audio={audio} id={"fragment-0"} src={soundB5} label={"Hear What kind of ice cream sundae would you like?"}>
            <span className="font-bold">Henry:</span> What kind of ice cream
            sundae would you like?
          </AudioText></div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold"><AudioText audio={audio} id={"fragment-1"} src={soundB12} label={"Hear Holly:"}>Holly:</AudioText></span>

            <span><AudioText audio={audio} id={"fragment-2"} src={soundB6} label={"Hear That sounds interesting. What’s an ice cream sundae? Does it"}>
              That sounds interesting. What’s an ice cream sundae? Does it
            </AudioText></span>

            {inputField(0)}

            <span>?</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold">Henry:</span>

            <span><AudioText audio={audio} id={"fragment-3"} src={soundB7} label={"Hear (surprised)"}>(surprised)</AudioText></span>

            {inputField(1)}

            <span><AudioText audio={audio} id={"fragment-4"} src={soundB8} label={"Hear ! You really don’t know what ice cream sundaes are?"}>! You really don’t know what ice cream sundaes are?</AudioText></span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span><AudioText audio={audio} id={"fragment-5"} src={soundB9} label={"Hear You should"}>You should</AudioText></span>

            {inputField(2)}

            <span><AudioText audio={audio} id={"fragment-6"} src={[soundB10, soundB11]} label={"Hear of these! They’re a variety of different flavors of ice cream with syrups, toppings, fruit, and whipped cream in one dessert."}>
              of these! They’re a variety of different flavors of ice cream with
              syrups, toppings, fruit, and whipped cream in one dessert.
            </AudioText></span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold"><AudioText audio={audio} id={"fragment-7"} src={soundB12} label={"Hear Holly:"}>Holly:</AudioText></span>

            {inputField(3)}

            <span><AudioText audio={audio} id={"fragment-8"} src={soundB13} label={"Hear . What types of fruit do you use?"}>. What types of fruit do you use?</AudioText></span>
          </div>

          <div><AudioText audio={audio} id={"fragment-9"} src={soundB14} label={"Hear We use what is usually in season. Do you like bananas, kiwis, or oranges?"}>
            <span className="font-bold">Henry:</span> We use what is usually in
            season. Do you like bananas, kiwis, or oranges?
          </AudioText></div>

          <div><AudioText audio={audio} id={"fragment-10"} src={soundB15} label={"Hear I’ll take bananas, chocolate syrup, and vanilla ice cream. Thank you."}>
            <span className="font-bold"><AudioText audio={audio} id={"fragment-11"} src={soundB12} label={"Hear Holly:"}>Holly:</AudioText></span> I’ll take bananas,
            chocolate syrup, and vanilla ice cream. Thank you.
          </AudioText></div>
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

        <button onPointerDown={e => {
        if (locked) e.preventDefault();
      }} style={{
        cursor: locked ? "not-allowed" : "pointer"
      }} {...activationKeys} disabled={locked} aria-label={"Check Answer"} type={"button"} className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>;
};
export default WB_Unit3_Page15_Q2;
