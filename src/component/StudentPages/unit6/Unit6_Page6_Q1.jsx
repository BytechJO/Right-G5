import clip0 from "../../../assets/audio/ClassBook/U6/Page 51 - D/Item_001_Where_does_Danny_want_to_go.mp3";
import clip1 from "../../../assets/audio/ClassBook/U6/Page 51 - D/Item_002_Why_doesn't_Danny_want_to_ride_on_the_roller_coaster.mp3";
import clip2 from "../../../assets/audio/ClassBook/U6/Page 51 - D/Item_003_What_does_Sam_like_to_do_at_the_carnival.mp3";
import clip3 from "../../../assets/audio/ClassBook/U6/Page 51 - D/Item_004_How_are_Danny_and_Sam_different.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../unit5/useExerciseAudio";
import {AudioText,AudioFeedback,AudioSpeaker} from "../unit5/ExerciseAudioText";
import {SentenceGroup,SentencePart} from "../unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import grammer_u1 from "../../../assets/audio/ClassBook/U6/PG 51/cd30pg51.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();

const Unit6_Page6_Q1 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const questions = [
    "Where does Danny want to go?",

    "Why doesn’t Danny want to ride on the roller coaster?",

    "What does Sam like to do at the carnival?",

    "How are Danny and Sam different?",
  ];

  const correctAnswers = [
    ["Danny wants to go to the movies."],

    ["Danny is afraid of heights."],

    [
      "He likes to ride on the roller coaster.",
      "Sam likes to ride on the roller coaster.",
    ],

    ["Sam likes more dangerous things than Danny."],
  ];
  const captions = [
    {
      start: 0.199,
      end: 6.719,
      text: "Page 51, write activities, exercise D. Listen to the story and then answer the questions.",
    },

    {
      start: 8.0,
      end: 10.8,
      text: "Danny and his friend Sam go out together every month.",
    },

    {
      start: 12.679,
      end: 44.719,
      text: "This month, Danny wants to go to the movies. “We can go to the cinema,” says Danny. “I’d rather go to the carnival,” says Sam. “Okay, let’s go to the carnival,” says Danny. At the carnival, Danny and Sam find lots of fun rides. Sam says, “I’d like to try out the roller coaster. Shall we try this ride together?” Danny looks at the roller coaster. Danny is afraid of heights. He says, “No way. I’d rather go on a less scary ride. This one is not my cup of tea. You go ahead. I’ll wait for you here.”",
    },

    {
      start: 45.779,
      end: 78.759,
      text: "Sam goes on the roller coaster. Danny can hear Sam shouting with joy as the roller coaster goes higher and higher. Danny watches with horror as the roller coaster comes down with great speed. He’d rather stay home than go on a roller coaster. Sam, on the other hand, is having a great time. The ride finally ends, and Sam comes running happily. “That was so fun,” he says. “Shall we go to the movies now?” “Yes, let’s take advantage of the early afternoon discount,” says Danny. Sam agrees willingly. After all, he had tried his hand at exciting rides.",
    },
  ];
  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [locked, setLocked] = useState(false);

  const [result, setResult] = useState([]);

  const normalize = normalizeAnswer;

  const handleChange = (i, val) => {
    if (locked || result[i] === true) return;

    const updated = [...answers];

    updated[i] = val;

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
      (setAnnouncement(String("Please complete all fields.").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.info("Please complete all fields."));

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((ans, i) => {
      const ok = correctAnswers[i].some(
        (correct) => normalize(correct) === normalize(ans),
      );

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = answers.length;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
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
      correctAnswers[0][0],
      correctAnswers[1][0],
      correctAnswers[2][0],
      correctAnswers[3][0],
    ]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  return (
    <div data-exercise-scope={"Unit6_Page6_Q1.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="Unit6_Page6_Q1.jsx"] input:focus-visible,[data-exercise-scope="Unit6_Page6_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="Unit6_Page6_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall">
        {/* TITLE */}
        <ExerciseHeader sectionLetter="D" title={<>
          
          Listen to the story, and then answer the questions.
        </>} subTitle="Listen once for the main idea, replay the needed part, then answer each question in a complete, concise response."/>
        <QuestionAudioPlayer pageId="sb_unit6_page6_q1"
          src={grammer_u1}
          captions={captions}
          stopAtSecond={7.2}
        />
        {/* BIG CONTAINER */}
        <div className="flex flex-col gap-4">
          {questions.map((q, i) => (
            <SentenceGroup label={`Hear sentence ${i+1}`} src={[clip0,clip1,clip2,clip3][i+0]} id={`sentence-${i}`} audio={audio}
              key={i}
              className="
                  flex
                  items-start
                  gap-4
                "
            >
              {/* NUMBER */}
              <span
                className="
                    font-bold
                    text-[18px]
                    w-6
                  "
              >
                {i + 1}
              </span>

              {/* CONTENT */}
              <div className="flex-1 relative">
                {/* QUESTION */}
                <div
                  className="
                      text-[18px]
                      mb-4
                      leading-[1.6]
                    "
                >
                  {q}
                </div>

                {/* ANSWER */}
                <input placeholder={"Your answer"} aria-invalid={!!(result[i]===false)} style={{...(result[i] === true?{borderBottomColor:"#16a34a"}:{})}} title={`Question ${i+1}: ${questions[i]}`} aria-label={`Question ${i+1}: ${questions[i]}`} {...fieldKeys}
                  type="text"
                  value={answers[i]}
                  disabled={locked || result[i] === true}
                  onChange={(e) => handleChange(i, e.target.value)}
                  className={`
                      w-full
                      border-0
                      border-b
                      outline-none
                      bg-transparent
                      text-[18px]
                      font-semibold
                      pb-0.5

                      ${
                        result[i] === false
                          ? "border-[#D1232A] text-[#6D2980]"
                          : "border-black text-[#6D2980]"
                      }
                    `}
                />

                {/* WRONG */}
                {result[i] === false && (
                  <span
                    style={{
                      position: "absolute",

                      bottom: "8px",

                      right: "-8px",

                      width: "22px",

                      height: "22px",

                      background: "#ef4444",

                      color: "white",

                      borderRadius: "50%",

                      display: "flex",

                      alignItems: "center",

                      justifyContent: "center",

                      fontSize: "12px",

                      fontWeight: "bold",

                      border: "2px solid white",

                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    ✕
                  </span>
                )}
              </div>
            </SentenceGroup>
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

export default Unit6_Page6_Q1;
