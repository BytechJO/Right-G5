import soundJ5 from "../../../assets/audio/Workbook/Unit 9/Page 56 - J/Item_005_Ben_will_ring_his_friend_later_today.mp3";
import soundJ4 from "../../../assets/audio/Workbook/Unit 9/Page 56 - J/Item_004_Jane_went_to_the_congratulations_today._She_is_going_to_see_a_game.mp3";
import soundJ3 from "../../../assets/audio/Workbook/Unit 9/Page 56 - J/Item_003_Let's_begin_the_school_year_and_see_how_it_goes.mp3";
import soundJ2 from "../../../assets/audio/Workbook/Unit 9/Page 56 - J/Item_002_I_have_mowing_!_We_are_going_to_a_field_trip_tomorrow!.mp3";
import soundJ1 from "../../../assets/audio/Workbook/Unit 9/Page 56 - J/Item_001_I_got_new_braces_for_my_teeth.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../../StudentPages/unit5/useExerciseAudio";
import {AudioText,AudioFeedback,AudioSpeaker} from "../../StudentPages/unit5/ExerciseAudioText";
import {SentenceGroup,SentencePart} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

import trueImg from "../../../assets/imgs/true.svg";
import falseImg from "../../../assets/imgs/false.svg";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const WB_Unit9_Page56_Q1 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const questions = [
    {
      status: "true",
      correction: "",
    },

    {
      status: "false",
      correction: "great news",
    },

    {
      status: "true",
      correction: "",
    },

    {
      status: "false",
      correction: "stadium",
    },
    {
      status: "true",
      correction: "",
    },
  ];

  const sentences = [
    <>
      I got new <u>braces</u> for my teeth.
    </>,

    <>
      I have <u>mowing</u> ! We are going to a field trip tomorrow!
    </>,

    <>
      Let’s begin the school year and <u>see how it goes</u> .
    </>,

    <>
      Jane went to the <u>congratulations</u> today. She is going to see a game.
    </>,
    <>
      Ben will <u>ring</u> his friend later today.
    </>,
  ];

  const [marks, setMarks] = useState(Array(questions.length).fill(""));

  const [answers, setAnswers] = useState(Array(questions.length).fill(""));

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  // ------------------------
  // HANDLE MARK
  // ------------------------

  const handleMark = (i, value) => {
    if (locked || result[i]?.mark === true) return;

    const updatedMarks = [...marks];

    updatedMarks[i] = value;

    setMarks(updatedMarks);

    // اذا اختار صح يمسح الانبوت
    if (value === "true") {
      const updatedAnswers = [...answers];

      updatedAnswers[i] = "";

      setAnswers(updatedAnswers);
    }

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  // ------------------------
  // HANDLE INPUT
  // ------------------------

  const handleChange = (i, value) => {
    if (locked || result[i]?.row === true || marks[i] === "true") return;

    const updated = [...answers];

    updated[i] = value;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = prev[i]?.mark===true?{mark:true}:undefined;

      return copy;
    });
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (locked) return;audio.stop();

    const hasEmptyMark = marks.some((m) => !m);

    if (hasEmptyMark) {
      (setAnnouncement(String("Please complete all answers.").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.info("Please complete all answers."));

      return;
    }

    const hasMissingCorrection = marks.some(
      (m, i) => m === "false" && !answers[i].trim(),
    );

    if (hasMissingCorrection) {
      (setAnnouncement(String("Please write the correct vocabulary word for X answers.").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.info(
        "Please write the correct vocabulary word for X answers.",
      ));

      return;
    }

    let correctCount = 0;

    const newResults = marks.map((mark, i) => {
      // -------------------
      // CHECK MARK
      // -------------------

      const markOk = mark === questions[i].status;

      // -------------------
      // CHECK INPUT
      // -------------------

      const correctionOk =
        mark === "true"
          ? true
          : normalize(answers[i]) === normalize(questions[i].correction);

      // -------------------
      // FINAL
      // -------------------

      const rowOk = markOk && correctionOk;

      if (rowOk) correctCount++;

      return {
        mark: markOk,
        correction: correctionOk,
        row: rowOk,
      };
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

  // ------------------------
  // SHOW ANSWERS
  // ------------------------

  const showAnswers = () => {audio.stop();setAnnouncement("Model answers shown and locked.");resetButtonRef.current?.focus({preventScroll:true});
    setMarks(["true", "false", "true", "false", "true"]);

    setAnswers(["", "great news", "", "stadium", ""]);

    setResult(questions.map(()=>({mark:true,correction:true,row:true})));

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setMarks(Array(questions.length).fill(""));

    setAnswers(Array(questions.length).fill(""));

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // MARK BOX
  // ------------------------

  const markBox = (i, value, img) => {
    const active = marks[i] === value;

    const showError =
      result[i]?.mark === false &&
      ((value === "true" && marks[i] === "true") ||
        (value === "false" && marks[i] === "false"));

    return (
      <button {...activationKeys} aria-pressed={active} aria-label={`Sentence ${i+1}: ${value==="true"?"true":"false"}${result[i]?.mark===true?", correct and locked":""}`} data-choice={true}
        type="button"
        disabled={locked || result[i]?.mark === true}
        onClick={() => handleMark(i, value)}
        className="relative flex items-center justify-center"
        style={{
          width: "34px",
          height: "34px",
          border: "1px solid #6D2980",
          borderRadius: "6px",
          cursor: locked || result[i]?.mark === true ? "default" : "pointer",
        background:active?"#dbeafe":"transparent",borderColor:active&&result[i]?.mark===true?"#16a34a":showError?"#D1232A":"#6D2980"}}
      >
        {active && (
          <img aria-hidden={true}
            src={img}
            alt={""}
            style={{
              width: "24px",
              height: "24px",
            }}
          />
        )}

        {showError && (
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
      </button>
    );
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i) => (
    <div className="relative w-full">
      <input style={{borderBottomColor:(marks[i]==="false"&&result[i]?.correction===true)?"#16a34a":(marks[i]==="false"&&result[i]?.correction===false)?"#D1232A":undefined}} placeholder={"Correct word / phrase"} aria-invalid={marks[i]==="false"&&result[i]?.correction===false} title={`Sentence ${i+1}: correct the underlined expression if false`} aria-label={`Sentence ${i+1}: correct the underlined expression if false`} {...fieldKeys}
        type="text"
        value={answers[i]}
        disabled={locked || result[i]?.row === true || marks[i] === "true"}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          w-full          
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6D2980]
          font-semibold
          px-1

          ${
            result[i]?.correction === false && marks[i] === "false"
              ? "border-[#D1232A]"
              : "border-black"
          }
        `}
      />

      {result[i]?.correction === false && marks[i] === "false" && (
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
    <div data-exercise-scope={"WB_Unit9_Page56_Q1.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="WB_Unit9_Page56_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit9_Page56_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit9_Page56_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <ExerciseHeader isWorkbook sectionLetter="J" title={<>
          
          Read and write <span className="text-[#D1252B]">✓</span> or{" "}
          <span className="text-[#D1252B]">✕</span> For{" "}
          <span className="text-[#D1252B]">✕</span>, write the correct word or
          expression.
        </>} subTitle="Judge the underlined vocabulary or expression in context; for X, replace only the incorrect part." />

        {/* QUESTIONS */}

        <div className="flex flex-col gap-12">
          {sentences.map((sentence, index) => (
            <div key={index} className="w-full">
              {/* ROW */}

              <SentenceGroup label={`Hear sentence ${index+1}`} src={[soundJ1,soundJ2,soundJ3,soundJ4,soundJ5][index]} id={`sentence-${index}`} audio={audio} className="flex items-end gap-4 w-full">
                {/* BOXES */}

                <div className="flex items-center gap-2 shrink-0">
                  {markBox(index, "true", trueImg)}

                  {markBox(index, "false", falseImg)}
                </div>

                {/* NUMBER */}

                <span className="font-bold shrink-0">{index + 1}</span>

                {/* SENTENCE */}

                <span className="shrink-0">{sentence}</span>

                {/* INPUT */}

                <div className="flex-1">{inputField(index, "100%")}</div>
              </SentenceGroup>
            </div>
          ))}
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

export default WB_Unit9_Page56_Q1;
