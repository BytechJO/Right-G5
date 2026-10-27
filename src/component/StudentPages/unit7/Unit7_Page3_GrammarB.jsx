import {useExerciseAudio} from "../unit5/useExerciseAudio";
import {AudioFeedback} from "../unit5/ExerciseAudioText";

import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const Unit7_Page3_GrammarB = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const correctAnswers = [
    {
      question: "Are the players winning the game?",
      answer: "No, they aren’t.",
    },
    {
      question: "Are the chefs preparing the meal?",
      answer: "Yes, they are.",
    },
    {
      question: "Are they enjoying the new coffee?",
      answer: "Yes, they are.",
    },
    {
      question: "Are the programmers writing the program?",
      answer: "No, they aren’t.",
    },
  ];

  const words = [
    "the are game players the winning",
    "preparing chefs meal the are the",
    "they coffee are enjoying the new",
    "programmers the program are the writing",
  ];

  const icons = ["✗", "✓", "✓", "✗"];

  const [answers, setAnswers] = useState([
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
  ]);

  const [errors, setErrors] = useState([
    { question: false, answer: false },
    { question: false, answer: false },
    { question: false, answer: false },
    { question: false, answer: false },
  ]);

  const [correctLocked, setCorrectLocked] = useState([
    { question: false, answer: false },
    { question: false, answer: false },
    { question: false, answer: false },
    { question: false, answer: false },
  ]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const updateAnswer = (index, field, value) => {if(locked||correctLocked[index][field])return;
    const updated = [...answers];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setAnswers(updated);

    const updatedErrors = [...errors];

    updatedErrors[index] = {
      ...updatedErrors[index],
      [field]: false,
    };

    setErrors(updatedErrors);
  };

  const handleCheck = () => {
    if (locked) return;audio.stop();

    const isEmpty = answers.some(
      (item) =>
        normalize(item.question) === "" || normalize(item.answer) === "",
    );

    if (isEmpty) {
      (setAnnouncement(String("Please complete all fields.").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.info("Please complete all fields."));
      return;
    }

    let score = 0;

    const newErrors = answers.map((item, i) => {
      const questionCorrect =
        normalize(item.question) === normalize(correctAnswers[i].question);

      const answerCorrect =
        normalize(item.answer) === normalize(correctAnswers[i].answer);

      // كل فراغ عليه علامة لحاله
      if (questionCorrect) score++;
      if (answerCorrect) score++;

      return {
        question: !questionCorrect,
        answer: !answerCorrect,
      };
    });

    const newLocked = answers.map((item, i) => {
      return {
        question:
          normalize(item.question) === normalize(correctAnswers[i].question),

        answer: normalize(item.answer) === normalize(correctAnswers[i].answer),
      };
    });

    setErrors(newErrors);
    setCorrectLocked(newLocked);

    // صار المجموع من 8
    const total = 8;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${score} / ${total}
      </span>
    </div>
  `;

    if (score === total) {
      resetButtonRef.current?.focus({preventScroll:true});setLocked(true);
      (setAnnouncement(String(msg).replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.success(msg));
    } else if (score === 0) {
      (setAnnouncement(String(msg).replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.error(msg));
    } else {
      (setAnnouncement(String(msg).replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.warning(msg));
    }
  };
  const handleShow = () => {audio.stop();setAnnouncement("Model answers shown and locked.");resetButtonRef.current?.focus({preventScroll:true});
    setAnswers(correctAnswers);

    setErrors([
      { question: false, answer: false },
      { question: false, answer: false },
      { question: false, answer: false },
      { question: false, answer: false },
    ]);

    setCorrectLocked([
      { question: true, answer: true },
      { question: true, answer: true },
      { question: true, answer: true },
      { question: true, answer: true },
    ]);

    setLocked(true);
  };

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setAnswers([
      { question: "", answer: "" },
      { question: "", answer: "" },
      { question: "", answer: "" },
      { question: "", answer: "" },
    ]);

    setErrors([
      { question: false, answer: false },
      { question: false, answer: false },
      { question: false, answer: false },
      { question: false, answer: false },
    ]);

    setCorrectLocked([
      { question: false, answer: false },
      { question: false, answer: false },
      { question: false, answer: false },
      { question: false, answer: false },
    ]);

    setLocked(false);
  };

  return (
    <div data-exercise-scope={"Unit7_Page3_GrammarB.jsx"}><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="Unit7_Page3_GrammarB.jsx"] input:focus-visible,[data-exercise-scope="Unit7_Page3_GrammarB.jsx"] textarea:focus-visible,[data-exercise-scope="Unit7_Page3_GrammarB.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-8 leading-relaxed">
        <span className="ex-A-read mr-2">B</span>
        Unscramble and write each question. Then answer with
        <span className="text-[#1ea7ff]"> “Yes, they are.” </span>
        or
        <span className="text-[#1ea7ff]"> “No, they aren’t.”</span>
      </h5>

      {/* TABLE HEADER */}
      <div className="grid grid-cols-[40px_1fr_60px_1fr] gap-5 text-[18px] mb-5 mt-10">
        <div></div>

        <div className="text-center text-[#1ea7ff] underline">Question</div>

        <div></div>

        <div className="text-center text-[#1ea7ff] underline">Answer</div>
      </div>

      {/* QUESTIONS */}
      <div className="space-y-5 text-[18px]">
        {words.map((word, i) => (
          <div
            key={i}
            className="grid grid-cols-[40px_1fr_60px_1fr] gap-5 items-end"
          >
            {/* NUMBER */}
            <span className="font-bold self-start pt-1">{i + 1}</span>

            {/* QUESTION SIDE */}
            <div>
              <p className="mb-2">{word}</p>

              <div className="relative">
                <input placeholder={"Question"} style={{...(correctLocked[i].question?{borderBottomColor:"#16a34a"}:{})}} aria-invalid={!!(errors[i].question)} title={`Item ${i+1}, reorder into a question: ${words[i]}`} aria-label={`Item ${i+1}, reorder into a question: ${words[i]}`} {...fieldKeys}
                  type="text"
                  value={answers[i].question}
                  disabled={locked || correctLocked[i].question}
                  onChange={(e) => updateAnswer(i, "question", e.target.value)}
                  className={`border-b outline-none w-full text-[#6D2980] font-medium px-2 bg-transparent
                    ${errors[i].question ? "border-red-500" : "border-black"}
                  `}
                />

                {errors[i].question && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "-28px",
                      transform: "translateY(-50%)",
                      width: "20px",
                      height: "20px",
                      background: "#ef4444",
                      color: "white",
                      borderRadius: "50%",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      border: "2px solid white",
                      boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>
            </div>

            {/* CHECK OR X FROM BOOK */}
            <div className="text-center text-[30px] font-bold text-[#d62828] pb-1">
              {icons[i]}
            </div>

            {/* ANSWER SIDE */}
            <div className="relative">
              <input placeholder={"Short answer"} style={{...(correctLocked[i].answer?{borderBottomColor:"#16a34a"}:{})}} aria-invalid={!!(errors[i].answer)} title={`Item ${i+1}, write the short answer using the displayed tick or cross`} aria-label={`Item ${i+1}, write the short answer using the displayed tick or cross`} {...fieldKeys}
                type="text"
                value={answers[i].answer}
                disabled={locked || correctLocked[i].answer}
                onChange={(e) => updateAnswer(i, "answer", e.target.value)}
                className={`border-b outline-none w-full text-[#1ea7ff] font-medium px-2 bg-transparent
                  ${errors[i].answer ? "border-red-500" : "border-black"}
                `}
              />

              {errors[i].answer && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "-30px",
                    transform: "translateY(-50%)",
                    width: "20px",
                    height: "20px",
                    background: "#ef4444",
                    color: "white",
                    borderRadius: "50%",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    border: "2px solid white",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                  }}
                >
                  ✕
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* BUTTONS */}
      <div className="flex justify-center gap-6 mt-10">
        {/* Reset */}
        <div className="relative group">
          <button {...activationKeys} ref={resetButtonRef} aria-label={"Start Again"} type={"button"}
            onClick={handleReset}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaRedo size={14} />
            </div>
          </button>

          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Reset
          </span>
        </div>

        {/* Show */}
        <div className="relative group">
          <button {...activationKeys} aria-label={"Show Answer"} type={"button"}
            onClick={handleShow}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaEye size={14} />
            </div>
          </button>

          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Show Answer
          </span>
        </div>

        {/* Check */}
        <div className="relative group">
          <button style={{cursor:locked?"not-allowed":"pointer"}} {...activationKeys} disabled={locked} aria-label={"Check Answer"} type={"button"}
            onClick={handleCheck}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaCheck size={14} />
            </div>
          </button>

          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Check Answer
          </span>
        </div>
      </div>
    </div>
  );
};

export default Unit7_Page3_GrammarB;
