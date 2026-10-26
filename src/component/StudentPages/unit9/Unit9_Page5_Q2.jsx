import clip0 from "../../../assets/audio/ClassBook/U9/Page 80 - B/Item_001_!_many_people_yelled_as_the_winning_team,_in_their_bright_blue_shirts,_l.mp3";
import clip1 from "../../../assets/audio/ClassBook/U9/Page 80 - B/Item_002_There_was_a_of_people_leaving_as_some_raced_to_get_to_the_they_had_for_t.mp3";
import clip2 from "../../../assets/audio/ClassBook/U9/Page 80 - B/Item_003_The_game_had_started_at_noon,_so_some_people_still_had_to_return_to_work.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../unit5/useExerciseAudio";
import {AudioFeedback,AudioSpeaker} from "../unit5/ExerciseAudioText";

import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import grammer_u1 from "../../../assets/audio/ClassBook/U9/PG 80/cd45pg80-instruction.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();

const Unit9_Page5_Q2 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const questions = [
    "Congratulations",
    "stadium",
    "rush",
    "appointments",
    "exactly",
  ];
  const captions = [
    {
      start: 0.28,
      end: 7.5,
      text: "Page 80, right activities. Exercise B. Listen and write the missing vocabulary words in the blanks.",
    },

    {
      start: 8.68,
      end: 26.739,
      text: "Congratulations, many people yelled as the winning team in their bright blue shirts left the stadium. It had been a great game. There was a rush of people leaving as some raced to get to the appointments they had for that afternoon. The game had started exactly at noon, so some people still had to return to work.",
    },
  ];
  const [answers, setAnswers] = useState(["", "", "", "", ""]);

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

    if (answers.some((a) => !a.trim())) {
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
      "Congratulations",
      "stadium",
      "rush",
      "appointments",
      "exactly",
    ]);

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width) => (
    <span className="relative inline-block">
      <input style={{...(result[i] === true?{borderBottomColor:"#16a34a"}:{})}} aria-invalid={!!(result[i] === false)} title={`Listening paragraph, missing vocabulary word ${i+1}`} aria-label={`Listening paragraph, missing vocabulary word ${i+1}`} {...fieldKeys}
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
          leading-none
          align-middle
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
    <div data-exercise-scope={"Unit9_Page5_Q2.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="Unit9_Page5_Q2.jsx"] input:focus-visible,[data-exercise-scope="Unit9_Page5_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Unit9_Page5_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall">
        {/* TITLE */}
        <ExerciseHeader sectionLetter="B" title={<>
          
          Listen and write the missing vocabulary words in the blanks.
        </>} subTitle="Listen for one missing word at a time, replay if needed, then type exactly the word you hear."/>
        <QuestionAudioPlayer pageId="sb_unit9_page5_q2"
          src={grammer_u1}
          captions={captions}
          stopAtSecond={8.1}
        />
        {/* PARAGRAPH */}
        <div className="text-[20px] leading-[3.1]"><span role="group" aria-roledescription="sentence audio" aria-keyshortcuts="Enter Space" tabIndex={0} data-choice data-sentence-audio="listening-0" aria-label="Hear listening paragraph part 1" onKeyDown={event=>{if(event.target!==event.currentTarget||(event.key!=="Enter"&&event.key!==" "))return;event.preventDefault();event.stopPropagation();if(!event.repeat)audio.play("listening-0",clip0);}} onKeyUp={event=>{if(event.target===event.currentTarget&&(event.key==="Enter"||event.key===" ")){event.preventDefault();event.stopPropagation();}}} onClick={event=>{if(event.target.closest?.('input,textarea,select,button,[role="button"],[data-choice]')!==event.currentTarget)return;event.stopPropagation();audio.play("listening-0",clip0);}} style={{position:"relative",borderRadius:6,...(audio.activeId==="listening-0"?{boxShadow:"0 0 0 3px #2563eb",backgroundColor:"#dbeafe"}:{})}}>
          “{inputField(0, "w-[220px]")}!” many people yelled as the winning
          team, in their bright blue shirts, left the{" "}
          {inputField(1, "w-[250px]")}. It had been a great game.
          <br />
         {audio.activeId==="listening-0"&&<AudioSpeaker/>}</span><span role="group" aria-roledescription="sentence audio" aria-keyshortcuts="Enter Space" tabIndex={0} data-choice data-sentence-audio="listening-1" aria-label="Hear listening paragraph part 2" onKeyDown={event=>{if(event.target!==event.currentTarget||(event.key!=="Enter"&&event.key!==" "))return;event.preventDefault();event.stopPropagation();if(!event.repeat)audio.play("listening-1",clip1);}} onKeyUp={event=>{if(event.target===event.currentTarget&&(event.key==="Enter"||event.key===" ")){event.preventDefault();event.stopPropagation();}}} onClick={event=>{if(event.target.closest?.('input,textarea,select,button,[role="button"],[data-choice]')!==event.currentTarget)return;event.stopPropagation();audio.play("listening-1",clip1);}} style={{position:"relative",borderRadius:6,...(audio.activeId==="listening-1"?{boxShadow:"0 0 0 3px #2563eb",backgroundColor:"#dbeafe"}:{})}}> There was a {inputField(2, "w-[220px]")} of people leaving as some
          raced to get to the {inputField(3, "w-[250px]")} they had for that
          afternoon.{audio.activeId==="listening-1"&&<AudioSpeaker/>}</span><span role="group" aria-roledescription="sentence audio" aria-keyshortcuts="Enter Space" tabIndex={0} data-choice data-sentence-audio="listening-2" aria-label="Hear listening paragraph part 3" onKeyDown={event=>{if(event.target!==event.currentTarget||(event.key!=="Enter"&&event.key!==" "))return;event.preventDefault();event.stopPropagation();if(!event.repeat)audio.play("listening-2",clip2);}} onKeyUp={event=>{if(event.target===event.currentTarget&&(event.key==="Enter"||event.key===" ")){event.preventDefault();event.stopPropagation();}}} onClick={event=>{if(event.target.closest?.('input,textarea,select,button,[role="button"],[data-choice]')!==event.currentTarget)return;event.stopPropagation();audio.play("listening-2",clip2);}} style={{position:"relative",borderRadius:6,...(audio.activeId==="listening-2"?{boxShadow:"0 0 0 3px #2563eb",backgroundColor:"#dbeafe"}:{})}}> The game had started {inputField(4, "w-[240px]")} at noon,
          so some people still had to return to work.
        {audio.activeId==="listening-2"&&<AudioSpeaker/>}</span></div>
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

export default Unit9_Page5_Q2;
