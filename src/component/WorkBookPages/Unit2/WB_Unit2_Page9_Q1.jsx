import soundA15 from "../../../assets/audio/Workbook/unit 2/Page 9 - A/Item_015_this_summer!.mp3";
import soundA14 from "../../../assets/audio/Workbook/unit 2/Page 9 - A/Item_014_to_fun_places_on_the_weekend.mp3";
import soundA13 from "../../../assets/audio/Workbook/unit 2/Page 9 - A/Item_013_We_are_going_to_Europe.mp3";
import soundA12 from "../../../assets/audio/Workbook/unit 2/Page 9 - A/Item_012_my_dad_to_take_us.mp3";
import soundA4 from "../../../assets/audio/Workbook/unit 2/Page 9 - A/Item_004_our_trees.mp3";
import soundA3 from "../../../assets/audio/Workbook/unit 2/Page 9 - A/Item_003_The_gardener_always.mp3";
import soundA2 from "../../../assets/audio/Workbook/unit 2/Page 9 - A/Item_002_had_fun_rides!.mp3";
import soundA1 from "../../../assets/audio/Workbook/unit 2/Page 9 - A/Item_001_The.mp3";
import soundC6 from "../../../assets/audio/Workbook/unit 2/Page 10 - C/Item_006_Not_so_fast.mp3";
import soundE10 from "../../../assets/audio/Workbook/unit 2/Page 11 - E/Item_010_giraffe.mp3";
import soundA21 from "../../../assets/audio/Workbook/unit 2/Page 9 - A/Item_021_ground.mp3";
import soundA19 from "../../../assets/audio/Workbook/unit 2/Page 9 - A/Item_019_¢_keep_my_feet_on_the.mp3";
import soundA20 from "../../../assets/audio/Workbook/unit 2/Page 9 - A/Item_020_few.mp3";
import soundA18 from "../../../assets/audio/Workbook/unit 2/Page 9 - A/Item_018_beg.mp3";
import soundA17 from "../../../assets/audio/Workbook/unit 2/Page 9 - A/Item_017_twisty.mp3";
import soundA16 from "../../../assets/audio/Workbook/unit 2/Page 9 - A/Item_016_still.mp3";
import soundA11 from "../../../assets/audio/Workbook/unit 2/Page 9 - A/Item_011_¢_trims.mp3";
import soundA10 from "../../../assets/audio/Workbook/unit 2/Page 9 - A/Item_010_¢_carnival.mp3";
import soundA8 from "../../../assets/audio/Workbook/unit 2/Page 9 - A/Item_008_crazy.mp3";
import soundA7 from "../../../assets/audio/Workbook/unit 2/Page 9 - A/Item_007_merry-go-round.mp3";
import soundA6 from "../../../assets/audio/Workbook/unit 2/Page 9 - A/Item_006_first_thing.mp3";
import soundA5 from "../../../assets/audio/Workbook/unit 2/Page 9 - A/Item_005_couple.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "../../StudentPages/unit5/ExerciseAudioText";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U2/Page 9/SVG/Asset 11.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U2/Page 9/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U2/Page 9/SVG/Asset 3.svg";
import img4 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U2/Page 9/SVG/Asset 4.svg";
import img5 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U2/Page 9/SVG/Asset 5.svg";
import img6 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U2/Page 9/SVG/Asset 11.svg";
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
const WB_Unit2_Page9_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");
  const questions = [{
    answer: "carnival",
    options: ["couple", "merry-go-round", "carnival"],
    image: img1
  }, {
    answer: "trims",
    options: ["first thing", "crazy", "trims"],
    image: img2
  }, {
    answer: "beg",
    options: ["still", "beg", "keep my feet on the ground"],
    image: img3
  }, {
    answer: "first thing",
    options: ["twisty", "first thing", "few"],
    image: img4
  }, {
    answer: "merry-go-round",
    options: ["merry-go-round", "giraffe", "carnival"],
    image: img5
  }, {
    answer: "twisty",
    options: ["still", "not so fast", "twisty"],
    image: img6
  }];
  const [selected, setSelected] = useState(["", "", "", "", "", ""]);
  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);
  const handleSelect = (i, option) => {
    if (locked || result[i] === true) return;
    setAnnouncement(`Sentence ${i + 1}: ${option} selected.`);
    const updatedSelected = [...selected];
    updatedSelected[i] = option;
    setSelected(updatedSelected);
    const updatedAnswers = [...answers];
    updatedAnswers[i] = option;
    setAnswers(updatedAnswers);
    setResult(prev => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };
  const checkAnswers = () => {
    if (locked) return;
    audio.stop();
    const hasEmpty = selected.some(s => !s);
    if (hasEmpty) {
      setAnnouncement(String("Please complete all answers.").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.info("Please complete all answers.");
      return;
    }
    let correctCount = 0;
    const newResults = selected.map((s, i) => {
      const ok = s.toLowerCase() === questions[i].answer.toLowerCase();
      if (ok) correctCount++;
      return ok;
    });
    setResult(newResults);
    const total = questions.length;
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
    const solved = questions.map(q => q.answer);
    setSelected(solved);
    setAnswers(solved);
    setResult([true, true, true, true, true, true]);
    setLocked(true);
  };
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setSelected(["", "", "", "", "", ""]);
    setAnswers(["", "", "", "", "", ""]);
    setResult([]);
    setLocked(false);
  };
  const inputField = (i, width) => <div className="relative inline-block">
      <input style={{
      borderBottomColor: result[i] === true || result[i]?.overall === true ? "#16a34a" : undefined
    }} title={["The ___ had fun rides!", "The gardener always ___ our trees.", "I ___ my dad to take us to fun places on the weekend.", "We are going to Europe ___ this summer!", "The ___ is one of my favorite rides.", "I am scared of ___ rides."][i]} aria-label={["The ___ had fun rides!", "The gardener always ___ our trees.", "I ___ my dad to take us to fun places on the weekend.", "We are going to Europe ___ this summer!", "The ___ is one of my favorite rides.", "I am scared of ___ rides."][i]} {...fieldKeys} type="text" value={answers[i]} readOnly className={`
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
  const optionCircle = (i, option) => {
    const active = selected[i] === option;
    return <button aria-pressed={active} aria-label={`Sentence ${i + 1}: choose ${option}`} data-choice={true} {...activationKeys} type="button" disabled={locked || result[i] === true} onClick={() => {
      audio.play(`option-${i}-${option}`, {
        "couple": soundA5,
        "first thing": soundA6,
        "merry-go-round": soundA7,
        "crazy": soundA8,
        "carnival": soundA10,
        "trims": soundA11,
        "still": soundA16,
        "twisty": soundA17,
        "beg": soundA18,
        "few": soundA20,
        "keep my feet on the ground": [soundA19, soundA21],
        "giraffe": soundE10,
        "not so fast": soundC6
      }[option]);
      handleSelect(i, option);
    }} style={{
      position: "relative",
      background: "transparent",
      border: "none",
      fontSize: "18px",
      cursor: locked || result[i] === true ? "default" : "pointer",
      color: "black",
      textAlign: "left",
      width: "fit-content",
      // backgroundColor: active ? "#dbeafe" : undefined,
      "--exercise-focus-radius": "50%",
      boxShadow: audio.activeId === `option-${i}-${option}` ? "0 0 0 3px #2563eb" : undefined
    }}>
        {option}

        {active && <span style={{
        position: "absolute",
        top: "-6px",
        left: "-10px",
        width: "calc(100% + 20px)",
        height: "calc(100% + 12px)",
        border: result[i] === true ? "3px solid #16a34a" : result[i] === false ? "3px solid #D1232A" : "3px solid #6D2980",
        borderRadius: "50%",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center"
      }} />}
      {audio.activeId === `option-${i}-${option}` && <AudioSpeaker />}</button>;
  };
  return <div data-exercise-scope={"WB_Unit2_Page9_Q1.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio} /><style>{`[data-exercise-scope="WB_Unit2_Page9_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit2_Page9_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit2_Page9_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[18px]">
        {/* TITLE */}
        <ExerciseHeader isWorkbook sectionLetter="A" title={<>
          
          Read, look, and circle.
        </>} subTitle="Read all choices before selecting; choose only the option that makes the full sentence or expression correct." />

        {/* QUESTIONS */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-10 whitespace-nowrap w-[110%] mb-15">
          {/* 1 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-bold">1</span>

              <span><AudioText audio={audio} id={"fragment-0"} src={soundA1} label={"Hear The"}>The</AudioText></span>

              {inputField(0, "w-[180px]")}

              <span><AudioText audio={audio} id={"fragment-1"} src={soundA2} label={"Hear had fun rides!"}>had fun rides!</AudioText></span>
            </div>

            <div className="flex gap-4">
              <img src={questions[0].image} alt={"A large Ferris wheel at a crowded fair."} style={{
              width: "165px",
              height: "auto",
              objectFit: "contain"
            }} />

              <div style={{
              border: "2px solid #7D3C98",
              borderRadius: "10px",
              padding: "12px 18px",
              width: "230px"
            }}>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <span className="font-bold">a</span>

                    {optionCircle(0, "couple")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">b</span>

                    {optionCircle(0, "merry-go-round")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">c</span>

                    {optionCircle(0, "carnival")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-bold">2</span>

              <span><AudioText audio={audio} id={"fragment-2"} src={soundA3} label={"Hear The gardener always"}>The gardener always</AudioText></span>

              {inputField(1, "w-[150px]")}
              <span><AudioText audio={audio} id={"fragment-3"} src={soundA4} label={"Hear our trees."}>our trees.</AudioText></span>
            </div>

            <div className="flex gap-4">
              <img src={questions[1].image} alt={"Hands using long-handled shears to trim tree branches."} style={{
              width: "165px",
              height: "auto",
              objectFit: "contain"
            }} />

              <div style={{
              border: "2px solid #7D3C98",
              borderRadius: "10px",
              padding: "12px 18px",
              width: "220px"
            }}>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <span className="font-bold">a</span>

                    {optionCircle(1, "first thing")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">b</span>

                    {optionCircle(1, "crazy")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">c</span>

                    {optionCircle(1, "trims")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-bold">3</span>

              <span>I</span>

              {inputField(2, "w-[160px]")}

              <span><AudioText audio={audio} id={"fragment-4"} src={soundA12} label={"Hear my dad to take us"}>my dad to take us</AudioText></span>
            </div>

            <div className="ml-7 mb-4"><AudioText audio={audio} id={"fragment-5"} src={soundA14} label={"Hear to fun places on the weekend."}>to fun places on the weekend.</AudioText></div>

            <div className="flex gap-4">
              <img src={questions[2].image} alt={"A father looking down at a boy who is holding him."} style={{
              width: "180px",
              height: "auto",
              objectFit: "contain"
            }} />

              <div style={{
              border: "2px solid #7D3C98",
              borderRadius: "10px",
              padding: "12px 18px",
              width: "220px",
              height: "150px"
            }}>
                <div className="flex flex-col gap-3 whitespace-normal">
                  <div className="flex gap-3">
                    <span className="font-bold">a</span>

                    {optionCircle(2, "still")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">b</span>

                    {optionCircle(2, "beg")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">c</span>

                    {optionCircle(2, "keep my feet on the ground")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-bold">4</span>

              <span><AudioText audio={audio} id={"fragment-6"} src={soundA13} label={"Hear We are going to Europe"}>We are going to Europe</AudioText></span>

              {inputField(3, "w-[150px]")}
            </div>

            <div className="ml-7 mb-4"><AudioText audio={audio} id={"fragment-7"} src={soundA15} label={"Hear this summer!"}>this summer!</AudioText></div>

            <div className="flex gap-4">
              <img src={questions[3].image} alt={"A montage of European landmarks, including the Eiffel Tower and Big Ben."} style={{
              width: "180px",
              height: "auto",
              objectFit: "contain"
            }} />

              <div style={{
              border: "2px solid #7D3C98",
              borderRadius: "10px",
              padding: "12px 18px",
              width: "210px",
              height: "150px"
            }}>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <span className="font-bold">a</span>

                    {optionCircle(3, "twisty")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">b</span>

                    {optionCircle(3, "first thing")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">c</span>

                    {optionCircle(3, "few")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-bold">5</span>

              <span><AudioText audio={audio} id={"fragment-8"} src={soundA1} label={"Hear The"}>The</AudioText></span>

              {inputField(4, "w-[220px]")}
            </div>

            <div className="ml-7 mb-4">is one of my favorite rides.</div>

            <div className="flex gap-4">
              <img src={questions[4].image} alt={"A colorful carousel with a striped roof."} style={{
              width: "165px",
              height: "auto",
              objectFit: "contain"
            }} />

              <div style={{
              border: "2px solid #7D3C98",
              borderRadius: "10px",
              padding: "12px 18px",
              width: "240px"
            }}>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <span className="font-bold">a</span>

                    {optionCircle(4, "merry-go-round")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">b</span>

                    {optionCircle(4, "giraffe")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">c</span>

                    {optionCircle(4, "carnival")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 6 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-bold">6</span>

              <span>I’m scared of</span>

              {inputField(5, "w-[150px]")}
            </div>

            <div className="ml-7 mb-4">rides.</div>

            <div className="flex gap-4">
              <img src={questions[5].image} alt={"A large Ferris wheel at a crowded fair."} style={{
              width: "165px",
              height: "auto",
              objectFit: "contain"
            }} />

              <div style={{
              border: "2px solid #7D3C98",
              borderRadius: "10px",
              padding: "12px 18px",
              width: "220px"
            }}>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <span className="font-bold">a</span>

                    {optionCircle(5, "still")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">b</span>

                    {optionCircle(5, "not so fast")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">c</span>

                    {optionCircle(5, "twisty")}
                  </div>
                </div>
              </div>
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
export default WB_Unit2_Page9_Q1;
