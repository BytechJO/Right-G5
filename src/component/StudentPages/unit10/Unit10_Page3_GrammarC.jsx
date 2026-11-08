import {useExerciseAudio} from "../unit5/useExerciseAudio";
import {AudioFeedback} from "../unit5/ExerciseAudioText";

import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const Unit10_Page3_GrammarC = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const correctAnswers = [
    "riding bikes a lot",
    {
      first: "Were",
      second: "books a lot during the summer?",
    },
    "Were you playing the piano a lot during the summer?",
    "Was I playing soccer a lot during the summer?",
    "Were Ann and Alice shopping a lot during the summer?",
  ];

  const [answers, setAnswers] = useState([
    "",
    {
      first: "",
      second: "",
    },
    "",
    "",
    "",
  ]);

  const [errors, setErrors] = useState([
    false,
    {
      first: false,
      second: false,
    },
    false,
    false,
    false,
  ]);

  const [correctLocked, setCorrectLocked] = useState([
    false,
    {
      first: false,
      second: false,
    },
    false,
    false,
    false,
  ]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const updateAnswer = (index, value) => {if(locked||correctLocked[index])return;
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);

    const updatedErrors = [...errors];
    updatedErrors[index] = false;
    setErrors(updatedErrors);
  };

  const updateSplitAnswer = (field, value) => {if(locked||correctLocked[1][field])return;
    const updated = [...answers];

    updated[1] = {
      ...updated[1],
      [field]: value,
    };

    setAnswers(updated);

    const updatedErrors = [...errors];

    updatedErrors[1] = {
      ...updatedErrors[1],
      [field]: false,
    };

    setErrors(updatedErrors);
  };

  const handleCheck = () => {
    if (locked) return;audio.stop();

    const isEmpty =
      normalize(answers[0]) === "" ||
      normalize(answers[1].first) === "" ||
      normalize(answers[1].second) === "" ||
      normalize(answers[2]) === "" ||
      normalize(answers[3]) === "" ||
      normalize(answers[4]) === "";

    if (isEmpty) {
      (setAnnouncement(String("Please complete all fields.").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.info("Please complete all fields."));
      return;
    }

    let score = 0;

    const newErrors = [
      false,
      {
        first: false,
        second: false,
      },
      false,
      false,
      false,
    ];

    const updatedLocked = [...correctLocked];

    // 2
    if (normalize(answers[0]) === normalize(correctAnswers[0])) {
      score++;
      updatedLocked[0] = true;
    } else {
      newErrors[0] = true;
    }

    // 3
    const firstCorrect =
      normalize(answers[1].first) === normalize(correctAnswers[1].first);

    const secondCorrect =
      normalize(answers[1].second) === normalize(correctAnswers[1].second);

    if (firstCorrect && secondCorrect) {
      score++;

      updatedLocked[1] = {
        first: true,
        second: true,
      };
    } else {
      newErrors[1] = {
        first: !firstCorrect,
        second: !secondCorrect,
      };
    }

    // 4
    if (normalize(answers[2]) === normalize(correctAnswers[2])) {
      score++;
      updatedLocked[2] = true;
    } else {
      newErrors[2] = true;
    }

    // 5
    if (normalize(answers[3]) === normalize(correctAnswers[3])) {
      score++;
      updatedLocked[3] = true;
    } else {
      newErrors[3] = true;
    }

    // 6
    if (normalize(answers[4]) === normalize(correctAnswers[4])) {
      score++;
      updatedLocked[4] = true;
    } else {
      newErrors[4] = true;
    }

    setErrors(newErrors);
    setCorrectLocked(updatedLocked);

    const total = 5;

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

  const handleShow = () => {setErrors([false,{first:false,second:false},false,false,false]);audio.stop();setAnnouncement("Model answers shown and locked.");resetButtonRef.current?.focus({preventScroll:true});
    setAnswers([
      correctAnswers[0],
      {
        first: correctAnswers[1].first,
        second: correctAnswers[1].second,
      },
      correctAnswers[2],
      correctAnswers[3],
      correctAnswers[4],
    ]);

    setCorrectLocked([
      true,
      {
        first: true,
        second: true,
      },
      true,
      true,
      true,
    ]);

    setLocked(true);
  };

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setAnswers([
      "",
      {
        first: "",
        second: "",
      },
      "",
      "",
      "",
    ]);

    setErrors([
      false,
      {
        first: false,
        second: false,
      },
      false,
      false,
      false,
    ]);

    setCorrectLocked([
      false,
      {
        first: false,
        second: false,
      },
      false,
      false,
      false,
    ]);

    setLocked(false);
  };

  const renderInput = (
    value,
    error,
    isCorrect,
    onChange,
    extraClass = "flex-1", label,
  ) => (
    <div className={`${extraClass} relative`}>
      <input placeholder={label.includes("opening")?"Opening":label.includes("complete the question")?"Complete...":"Question"} style={{...(isCorrect?{borderBottomColor:"#16a34a"}:{})}} aria-invalid={!!error} title={label} aria-label={label} {...fieldKeys}
        type="text"
        value={value}
        disabled={locked || isCorrect}
        onChange={onChange}
        className={`border-b outline-none w-full text-[#7A2D91] text-[18px] font-semibold px-2 bg-transparent
        ${error ? "border-red-500" : "border-black"}
        `}
      />

      {error ? (
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
      ) : null}
    </div>
  );

  return (
    <div data-exercise-scope={"Unit10_Page3_GrammarC.jsx"}><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="Unit10_Page3_GrammarC.jsx"] input:focus-visible,[data-exercise-scope="Unit10_Page3_GrammarC.jsx"] textarea:focus-visible,[data-exercise-scope="Unit10_Page3_GrammarC.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-10">
        <span className="ex-A-read mr-2">C</span>
        Change each of the sentences in Exercise B into a question.
      </h5>

      <div className="space-y-10 text-[18px]">
        {/* 1 */}
        <div className="flex gap-4 items-start">
          <span className="font-bold">1</span>

          <div>Was she waterskiing a lot during the summer?</div>
        </div>

        {/* 2 */}
        <div className="flex gap-4 items-center">
          <span className="font-bold">2</span>

          <span>Were they</span>

          {renderInput(answers[0],errors[0],correctLocked[0],(e) =>
            updateAnswer(0, e.target.value),undefined,"Sentence 2, complete the question after Were they")}

          <span>during the summer?</span>
        </div>

        {/* 3 */}
        <div className="flex gap-4 items-center">
          <span className="font-bold">3</span>

          {renderInput(answers[1].first,errors[1].first,correctLocked[1].first,(e) => updateSplitAnswer("first", e.target.value),"w-[140px]","Sentence 3, question opening before we reading")}

          <span>we reading</span>

          {renderInput(answers[1].second,errors[1].second,correctLocked[1].second,(e) => updateSplitAnswer("second", e.target.value),undefined,"Sentence 3, complete the question after we reading")}
        </div>

        {/* 4 */}
        <div className="flex gap-4 items-start">
          <span className="font-bold">4</span>

          {renderInput(answers[2],errors[2],correctLocked[2],(e) =>
            updateAnswer(2, e.target.value),undefined,"Sentence 4, rewrite the sentence as a question")}
        </div>

        {/* 5 */}
        <div className="flex gap-4 items-start">
          <span className="font-bold">5</span>

          {renderInput(answers[3],errors[3],correctLocked[3],(e) =>
            updateAnswer(3, e.target.value),undefined,"Sentence 5, rewrite the sentence as a question")}
        </div>

        {/* 6 */}
        <div className="flex gap-4 items-start">
          <span className="font-bold">6</span>

          {renderInput(answers[4],errors[4],correctLocked[4],(e) =>
            updateAnswer(4, e.target.value),undefined,"Sentence 6, rewrite the sentence as a question")}
        </div>
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

export default Unit10_Page3_GrammarC;
