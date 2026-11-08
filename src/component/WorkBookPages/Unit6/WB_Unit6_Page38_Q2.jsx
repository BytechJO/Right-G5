import soundN8 from "../../../assets/audio/Workbook/Unit 6/Page 38 - N/Item_008_rain.mp3";
import soundN7 from "../../../assets/audio/Workbook/Unit 6/Page 38 - N/Item_007_Yes,_we_should_bring_our_umbrellas._It.mp3";
import soundN6 from "../../../assets/audio/Workbook/Unit 6/Page 38 - N/Item_006_That_would_be_great.mp3";
import soundN5 from "../../../assets/audio/Workbook/Unit 6/Page 38 - N/Item_005_Okay._I_could_bring_some_snacks._What_will_you_bring.mp3";
import soundN4 from "../../../assets/audio/Workbook/Unit 6/Page 38 - N/Item_004_Yes,_it_would_be_a_good_time.mp3";
import soundN3 from "../../../assets/audio/Workbook/Unit 6/Page 38 - N/Item_003_Sam.mp3";
import soundN2 from "../../../assets/audio/Workbook/Unit 6/Page 38 - N/Item_002_Yeah,_sure._I'd_love_to._What_time.mp3";
import soundN1 from "../../../assets/audio/Workbook/Unit 6/Page 38 - N/Item_001_Jeff.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../../StudentPages/unit5/useExerciseAudio";
import {AudioText,AudioFeedback,AudioSpeaker} from "../../StudentPages/unit5/ExerciseAudioText";
import {SentenceGroup,SentencePart} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const WB_Unit6_Page38_Q2 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const answers = [
    "Would you like to go to the park?",

    "Would one o’clock be fine?",

    "Could you bring something light to eat at the picnic?",

    "I could bring some sandwiches and fruit.",

    "Should we bring our umbrellas just in case?",

    "might",
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

  const inputField = (i, width) => (
    <div className="relative w-full">
      <input placeholder={"Your answer"} aria-invalid={result[i]===false} title={["Jeff: invite Sam to the park","Jeff: suggest a time","Jeff: ask Sam to bring something to eat","Jeff: say what food you could bring","Sam: ask about umbrellas","Sam: complete the possibility of rain"][i]} aria-label={["Jeff: invite Sam to the park","Jeff: suggest a time","Jeff: ask Sam to bring something to eat","Jeff: say what food you could bring","Sam: ask about umbrellas","Sam: complete the possibility of rain"][i]} {...fieldKeys}
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
    <div data-exercise-scope={"WB_Unit6_Page38_Q2.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="WB_Unit6_Page38_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit6_Page38_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit6_Page38_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <ExerciseHeader isWorkbook sectionLetter="N" title={<>
          
          Read and write. Use modal verbs.
        </>} subTitle="Decide the purpose first—ability, advice, possibility, permission, or future—then choose the modal that expresses that meaning." />

        {/* DIALOG */}

        <div className="flex flex-col gap-6 leading-normal">
          {/* 1 */}

          <div className="flex items-start gap-3">
            <span className="font-bold min-w-[55px]"><AudioText audio={audio} id={"fragment-0"} src={soundN1} label={"Hear Jeff:"}>Jeff:</AudioText></span>

            <div className="flex items-center gap-2 flex-1">
              {inputField(0, "100%")}

              <span>?</span>
            </div>
          </div>

          {/* 2 */}

          <div className="flex items-start gap-3">
            <span className="font-bold min-w-[55px]"><AudioText audio={audio} id={"fragment-1"} src={soundN3} label={"Hear Sam:"}>Sam:</AudioText></span>

            <span><AudioText audio={audio} id={"fragment-2"} src={soundN2} label={"Hear Yeah, sure. I’d love to. What time?"}>Yeah, sure. I’d love to. What time?</AudioText></span>
          </div>

          {/* 3 */}

          <div className="flex items-start gap-3">
            <span className="font-bold min-w-[55px]"><AudioText audio={audio} id={"fragment-3"} src={soundN1} label={"Hear Jeff:"}>Jeff:</AudioText></span>

            <div className="flex items-center gap-2 flex-1">
              {inputField(1, "100%")}

              <span>?</span>
            </div>
          </div>

          {/* 4 */}

          <div className="flex items-start gap-3">
            <span className="font-bold min-w-[55px]"><AudioText audio={audio} id={"fragment-4"} src={soundN3} label={"Hear Sam:"}>Sam:</AudioText></span>

            <span><AudioText audio={audio} id={"fragment-5"} src={soundN4} label={"Hear Yes, it would be a good time."}>Yes, it would be a good time.</AudioText></span>
          </div>

          {/* 5 */}

          <div className="flex items-start gap-3">
            <span className="font-bold min-w-[55px]"><AudioText audio={audio} id={"fragment-6"} src={soundN1} label={"Hear Jeff:"}>Jeff:</AudioText></span>

            <div className="flex items-center gap-2 flex-1">
              {inputField(2, "100%")}

              <span>?</span>
            </div>
          </div>

          {/* 6 */}

          <div className="flex items-start gap-3">
            <span className="font-bold min-w-[55px]"><AudioText audio={audio} id={"fragment-7"} src={soundN3} label={"Hear Sam:"}>Sam:</AudioText></span>

            <span><AudioText audio={audio} id={"fragment-8"} src={soundN5} label={"Hear Okay. I could bring some snacks. What will you bring?"}>Okay. I could bring some snacks. What will you bring?</AudioText></span>
          </div>

          {/* 7 */}

          <div className="flex items-start gap-3">
            <span className="font-bold min-w-[55px]"><AudioText audio={audio} id={"fragment-9"} src={soundN1} label={"Hear Jeff:"}>Jeff:</AudioText></span>

            <div className="flex items-center gap-2 flex-1">
              {inputField(3, "100%")}

              <span>.</span>
            </div>
          </div>

          {/* 8 */}

          <div className="flex items-start gap-3">
            <span className="font-bold min-w-[55px]"><AudioText audio={audio} id={"fragment-10"} src={soundN3} label={"Hear Sam:"}>Sam:</AudioText></span>

            <div className="flex flex-col items-start flex-1">
              <span><AudioText audio={audio} id={"fragment-11"} src={soundN6} label={"Hear That would be great."}>That would be great.</AudioText></span>

              <div className="flex items-center gap-2 w-full mt-1">
                {inputField(4, "100%")}

                <span>?</span>
              </div>
            </div>
          </div>

          {/* 9 */}

          <div className="flex items-start gap-3">
            <span className="font-bold min-w-[55px]"><AudioText audio={audio} id={"fragment-12"} src={soundN3} label={"Hear Sam:"}>Sam:</AudioText></span>

            <span><AudioText audio={audio} id={"fragment-13"} src={soundN7} label={"Hear Yes, we should bring our umbrellas. It"}>Yes, we should bring our umbrellas. It</AudioText></span>
            <div className="flex items-center gap-2 flex-1">
              {inputField(5, "100%")}<AudioText audio={audio} id="rain" src={soundN8} label="Hear rain">rain.</AudioText>

              <span>?</span>
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

export default WB_Unit6_Page38_Q2;
