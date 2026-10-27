import clip0 from "../../../assets/audio/ClassBook/U10/Page 88 - B/Item_001_I'd_love_to_have_you.mp3";
import clip1 from "../../../assets/audio/ClassBook/U10/Page 88 - B/Item_002_right_over.mp3";
import clip2 from "../../../assets/audio/ClassBook/U10/Page 88 - B/Item_003_great_news.mp3";
import clip3 from "../../../assets/audio/ClassBook/U10/Page 88 - B/Item_004_join.mp3";
import clip4 from "../../../assets/audio/ClassBook/U10/Page 88 - B/Item_005_that'll_work.mp3";
import clip5 from "../../../assets/audio/ClassBook/U10/Page 88 - B/Item_006_see_how_it_goes.mp3";
import clip6 from "../../../assets/audio/ClassBook/U10/Page 88 - B/Item_007_Sandy_Hey,_I'm_going_to_a_fitness_center.mp3";
import clip7 from "../../../assets/audio/ClassBook/U10/Page 88 - B/Item_008_Nancy_That's_!_come_to_the_one_where_I_exercise,_if_that's_not_too_far_f.mp3";
import clip8 from "../../../assets/audio/ClassBook/U10/Page 88 - B/Item_009_Steve_I_just_finished_studying,_so_I_am_coming_now._Is_that_still_okay.mp3";
import clip9 from "../../../assets/audio/ClassBook/U10/Page 88 - B/Item_010_Henry_Sure,_._I'm_not_sure_about_swimming_because_my_dad_is_cleaning_the.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../unit5/useExerciseAudio";
import {AudioText,AudioFeedback} from "../unit5/ExerciseAudioText";
import {SentenceGroup} from "../unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const Review9_Page1_Q2 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const questions = [
    "join",
    "great news",
    "I’d love to have you",
    "right over",
    "that’ll work",
    "see how it goes",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...answers];

    updated[i] = value;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;audio.stop();

    const hasEmpty = answers.some((a) => !a.trim());

    if (hasEmpty) {
      (setAnnouncement(String("Please complete all answers.").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.info("Please complete all answers."));

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((a, i) => {
      const ok = normalize(a) === normalize(questions[i]);

      if (ok) correctCount++;

      return ok;
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

  const showAnswers = () => {audio.stop();setAnnouncement("Model answers shown and locked.");resetButtonRef.current?.focus({preventScroll:true});
    setAnswers([
      "join",
      "great news",
      "I’d love to have you",
      "right over",
      "that’ll work",
      "see how it goes",
    ]);

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width) => (
    <span className="relative inline-block">
      <input placeholder={"Expression"} style={{...(result[i]===true?{borderBottomColor:"#16a34a"}:{})}} aria-invalid={result[i]===false} title={`Dialogue blank ${i+1}, use an expression from the box`} aria-label={`Dialogue blank ${i+1}, use an expression from the box`} {...fieldKeys}
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
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
        `}
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
    <div data-exercise-scope={"Review9_Page1_Q2.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="Review9_Page1_Q2.jsx"] input:focus-visible,[data-exercise-scope="Review9_Page1_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Review9_Page1_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div
        className="div-forall"
        style={{
          gap:"30px"
        }}
      >
        {/* TITLE */}
        <ExerciseHeader isReview sectionLetter="B" title={<>
          
          What’s my line? Put in the correct expression to complete the
          dialogues.
        </>} subTitle="Read the whole sentence first, then choose the word that fits both the meaning and grammar before checking."/>

        {/* WORD BOX */}
        <div
          style={{
            background: "#E9E1EC",
            borderRadius: "16px",
            padding: "10px 30px",
            display: "grid",
            gridTemplateColumns: "repeat(3, auto)",
            // margin: "0 auto",
            gap: "18px 40px",
            width: "-webkit-fill-available",
            marginBottom: "30px",
            fontSize: "17px",
            justifyContent: "center",
          }}
        >
          <span><AudioText audio={audio} id={"expression-0"} src={clip0} label={"Hear I’d love to have you"}>I’d love to have you</AudioText></span>

          <span><AudioText audio={audio} id={"expression-1"} src={clip1} label={"Hear right over"}>right over</AudioText></span>

          <span><AudioText audio={audio} id={"expression-2"} src={clip2} label={"Hear great news"}>great news</AudioText></span>

          <span><AudioText audio={audio} id={"expression-3"} src={clip3} label={"Hear join"}>join</AudioText></span>

          <span><AudioText audio={audio} id={"expression-4"} src={clip4} label={"Hear that’ll work"}>that’ll work</AudioText></span>

          <span><AudioText audio={audio} id={"expression-5"} src={clip5} label={"Hear see how it goes"}>see how it goes</AudioText></span>
        </div>

        {/* DIALOGUES */}
        <div className="flex flex-col gap-5 mb-10  w-[110%]">
          {/* FIRST DIALOGUE */}
          <div className="flex flex-col gap-5">
            <SentenceGroup label={"Hear dialogue line 1"} src={clip6} id={"dialogue-0"} audio={audio} className="flex items-center flex-wrap gap-2 text-[18px]">
              <span className="text-[#12A5F4] font-medium">Sandy:</span>

              <span>Hey, I’m going to</span>

              {inputField(0, "w-[180px]")}

              <span>a fitness center.</span>
            </SentenceGroup>

            <SentenceGroup label={"Hear dialogue line 2"} src={clip7} id={"dialogue-1"} audio={audio} className="flex flex-wrap items-center gap-2 text-[18px] leading-normal">
              <span className="text-[#FF8A00] font-medium">Nancy:</span>

              <span>That’s</span>

              {inputField(1, "w-[170px]")}

              <span>!</span>

              {inputField(2, "w-[260px]")}

              <span>
                come to the one where I exercise, if that’s not too far for you.
              </span>
            </SentenceGroup>
          </div>

          {/* STARS */}
          <div
            className="text-center text-[18px] tracking-[2px]"
            style={{
              fontWeight: "600",
            }}
          >
            ********************************
          </div>

          {/* SECOND DIALOGUE */}
          <div className="flex flex-col gap-5">
            <SentenceGroup label={"Hear dialogue line 3"} src={clip8} id={"dialogue-2"} audio={audio} className="flex items-center flex-wrap gap-2 text-[18px]">
              <span className="text-[#12A5F4] font-medium">Steve:</span>

              <span>I just finished studying, so I’m coming</span>

              {inputField(3, "w-[180px]")}

              <span>now. Is that still okay?</span>
            </SentenceGroup>

            <SentenceGroup label={"Hear dialogue line 4"} src={clip9} id={"dialogue-3"} audio={audio} className="flex flex-wrap items-center gap-2 text-[18px] leading-normal">
              <span className="text-[#FF8A00] font-medium">Henry:</span>

              <span>Sure,</span>

              {inputField(4, "w-[170px]")}

              <span>
                . I’m not sure about swimming because my dad is cleaning the
                pool right now, but we’ll
              </span>

              {inputField(5, "w-[200px]")}

              <span>.</span>
            </SentenceGroup>
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

export default Review9_Page1_Q2;
