import soundC7 from "../../../assets/audio/Workbook/Unit 3/Page 16 - C/Item_007_teacher.mp3";
import soundC8 from "../../../assets/audio/Workbook/Unit 3/Page 16 - C/Item_008_student.mp3";
import soundC9 from "../../../assets/audio/Workbook/Unit 3/Page 16 - C/Item_009_funny.mp3";
import soundC10 from "../../../assets/audio/Workbook/Unit 3/Page 16 - C/Item_010_cheerful.mp3";
import soundC11 from "../../../assets/audio/Workbook/Unit 3/Page 16 - C/Item_011_thoughtful.mp3";
import soundC13 from "../../../assets/audio/Workbook/Unit 3/Page 16 - C/Item_013_friendly.mp3";
import soundC14 from "../../../assets/audio/Workbook/Unit 3/Page 16 - C/Item_014_kind.mp3";
import soundC6 from "../../../assets/audio/Workbook/Unit 3/Page 16 - C/Item_006_Pat.mp3";
import soundC5 from "../../../assets/audio/Workbook/Unit 3/Page 16 - C/Item_005_Evan.mp3";
import soundC4 from "../../../assets/audio/Workbook/Unit 3/Page 16 - C/Item_004_Mary.mp3";
import soundC3 from "../../../assets/audio/Workbook/Unit 3/Page 16 - C/Item_003_Robert.mp3";
import soundC2 from "../../../assets/audio/Workbook/Unit 3/Page 16 - C/Item_002_Claire.mp3";
import soundC1 from "../../../assets/audio/Workbook/Unit 3/Page 16 - C/Item_001_Richard.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "../../StudentPages/unit5/ExerciseAudioText";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img from "../../../assets/imgs/pages/workbook/Right Int WB G5 U3/Page 16/SVG/Asset 1.svg";
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
const WB_Unit3_Page16_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");
  const answers = [{
    line1: "is a teacher. She is kind and friendly. She enjoys teaching."
  }, {
    line1: "is a student. He is funny and cheerful.",
    line2: "He is very kind to his fellow students and teacher."
  }, {
    line1: "is also a student in the class. He has a cheerful and kind personality.",
    line2: "He is friendly with everyone."
  }, {
    line1: "is a hard working student. She is easy-going in class.",
    line2: "She has a thoughtful disposition. She is always kind about helping students who need it."
  }, {
    line1: "is funny and easy-going and is thoughtful in everything he does.",
    line2: "He is always friendly."
  }, {
    line1: "is a cheerful and kind kindergarten teacher. She is cheerful and easy-going person.",
    line2: "She is friendly and kind."
  }];
  const [studentAnswers, setStudentAnswers] = useState([{
    line1: ""
  }, {
    line1: "",
    line2: ""
  }, {
    line1: "",
    line2: ""
  }, {
    line1: "",
    line2: ""
  }, {
    line1: "",
    line2: ""
  }, {
    line1: "",
    line2: ""
  }]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);
  const normalize = normalizeAnswer;
  const handleChange = (i, line, value) => {
    if (locked || result[i] === true) return;
    const updated = studentAnswers.map(row => ({
      ...row
    }));
    updated[i][line] = value;
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
    const hasEmpty = studentAnswers.some(answer => Object.values(answer).some(v => !v.trim()));
    if (hasEmpty) {
      setAnnouncement(String("Please complete all answers.").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.info("Please complete all answers.");
      return;
    }
    let correctCount = 0;
    const newResults = studentAnswers.map((answer, i) => {
      const expected = answers[i];

      // السؤال الأول
      if (i === 0) {
        const ok = normalize(answer.line1) === normalize(expected.line1);
        if (ok) correctCount++;
        return ok;
      }

      // باقي الأسئلة
      const line1Ok = normalize(answer.line1) === normalize(expected.line1);
      const line2Ok = normalize(answer.line2) === normalize(expected.line2);
      const ok = line1Ok && line2Ok;
      if (ok) correctCount++;
      return ok;
    });
    setResult(newResults);
    const total = 6;
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
    setResult([true, true, true, true, true, true]);
    setLocked(true);
  };
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers([{
      line1: ""
    }, {
      line1: "",
      line2: ""
    }, {
      line1: "",
      line2: ""
    }, {
      line1: "",
      line2: ""
    }, {
      line1: "",
      line2: ""
    }, {
      line1: "",
      line2: ""
    }]);
    setResult([]);
    setLocked(false);
  };
  const inputField = (i, lines = 1) => <div className="relative w-full">
      <div className="flex flex-col gap-5">
        {/* line 1 */}
        <input aria-invalid={result[i] === false} style={{
        borderBottomColor: result[i] === true || result[i]?.overall === true ? "#16a34a" : undefined
      }} placeholder={"Sentence"} title={`Describe ${["Mary", "Richard", "Evan", "Claire", "Robert", "Pat"][i]}, line ${1}`} aria-label={`Describe ${["Mary", "Richard", "Evan", "Claire", "Robert", "Pat"][i]}, line ${1}`} {...fieldKeys} type="text" value={studentAnswers[i].line1} disabled={locked || result[i] === true} onChange={e => handleChange(i, "line1", e.target.value)} className={`
            w-full
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

        {/* line 2 */}
        {lines === 2 && <input aria-invalid={result[i] === false} style={{
        borderBottomColor: result[i] === true || result[i]?.overall === true ? "#16a34a" : undefined
      }} placeholder={"Sentence"} title={`Describe ${["Mary", "Richard", "Evan", "Claire", "Robert", "Pat"][i]}, line ${2}`} aria-label={`Describe ${["Mary", "Richard", "Evan", "Claire", "Robert", "Pat"][i]}, line ${2}`} {...fieldKeys} type="text" value={studentAnswers[i].line2} disabled={locked || result[i] === true} onChange={e => handleChange(i, "line2", e.target.value)} className={`
              w-full
              border-0
              border-b
              outline-none
              bg-transparent
              text-[18px]
              text-[#6D2980]
              font-semibold
              px-1

              ${result[i] === false ? "border-[#D1232A]" : "border-black"}
            `} />}
      </div>

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
  return <div data-exercise-scope={"WB_Unit3_Page16_Q1.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio} /><style>{`[data-exercise-scope="WB_Unit3_Page16_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit3_Page16_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit3_Page16_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[18px]">
        {/* TITLE */}
        <ExerciseHeader isWorkbook sectionLetter="C" title={<>
          
          Read the chart, then write sentences about each of the people. Use
         <span className="text-[#00AEEF]"> linking verbs</span>.
        </>} subTitle="Look at what the subject seems, looks, feels, sounds, or tastes like, then choose the linking verb that connects it to the description." />

        {/* TABLE IMAGE */}
        <div className="flex justify-center mb-10">
          <span style={{
          position: "relative",
          display: "inline-flex"
        }}>
          <img src={img} alt={"Chart of people and their attributes. Mary: teacher, friendly, kind. Richard: student, funny, cheerful, kind. Evan: student, cheerful, friendly, kind. Claire: student, thoughtful, friendly, kind. Robert: teacher, funny, thoughtful, friendly. Pat: teacher, cheerful, friendly, kind."} style={{
            width: "auto",
            height: "300px",
            objectFit: "contain"
          }} />
          {[{
            word: "teacher",
            src: soundC7
          }, {
            word: "student",
            src: soundC8
          }, {
            word: "funny",
            src: soundC9
          }, {
            word: "cheerful",
            src: soundC10
          }, {
            word: "thoughtful",
            src: soundC11
          }, {
            word: "friendly",
            src: soundC13
          }, {
            word: "kind",
            src: soundC14
          }].map((item, index) => <button key={item.word} type="button" {...activationKeys} data-choice data-chart-audio={item.word} aria-label={`Hear chart heading: ${item.word}`} onClick={() => audio.play(`chart-${item.word}`, item.src)} style={{
            position: "absolute",
            left: `${.5 / 484.42 * 100}%`,
            top: `${(26.72 + index * 26.22) / 209.66 * 100}%`,
            width: `${94.65 / 484.42 * 100}%`,
            height: `${25.12 / 209.66 * 100}%`,
            padding: 0,
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            background: audio.activeId === `chart-${item.word}` ? "rgba(219,234,254,.35)" : "transparent",
            boxShadow: audio.activeId === `chart-${item.word}` ? "0 0 0 3px #2563eb" : undefined
          }}><span className="sr-only">{item.word}</span>{audio.activeId === `chart-${item.word}` && <AudioSpeaker />}</button>)}
        </span>
        </div>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-8 mb-10">
          {/* 1 */}
          <div>
            <div className="flex items-start gap-3">
              <span className="font-bold">1</span>

              <span><AudioText audio={audio} id={"fragment-0"} src={soundC4} label={"Hear Mary"}>Mary</AudioText></span>

              <div className="flex-1">{inputField(0, 1)}</div>
            </div>
          </div>

          {/* 2 */}
          <div>
            <div className="flex items-start gap-3">
              <span className="font-bold">2</span>

              <span><AudioText audio={audio} id={"fragment-1"} src={soundC1} label={"Hear Richard"}>Richard</AudioText></span>

              <div className="flex-1">{inputField(1, 2)}</div>
            </div>
          </div>

          {/* 3 */}
          <div>
            <div className="flex items-start gap-3">
              <span className="font-bold">3</span>

              <span><AudioText audio={audio} id={"fragment-2"} src={soundC5} label={"Hear Evan"}>Evan</AudioText></span>

              <div className="flex-1">{inputField(2, 2)}</div>
            </div>
          </div>

          {/* 4 */}
          <div>
            <div className="flex items-start gap-3">
              <span className="font-bold">4</span>

              <span><AudioText audio={audio} id={"fragment-3"} src={soundC2} label={"Hear Claire"}>Claire</AudioText></span>

              <div className="flex-1">{inputField(3, 2)}</div>
            </div>
          </div>

          {/* 5 */}
          <div>
            <div className="flex items-start gap-3">
              <span className="font-bold">5</span>

              <span><AudioText audio={audio} id={"fragment-4"} src={soundC3} label={"Hear Robert"}>Robert</AudioText></span>

              <div className="flex-1">{inputField(4, 2)}</div>
            </div>
          </div>

          {/* 6 */}
          <div>
            <div className="flex items-start gap-3">
              <span className="font-bold">6</span>

              <span><AudioText audio={audio} id={"fragment-5"} src={soundC6} label={"Hear Pat"}>Pat</AudioText></span>

              <div className="flex-1">{inputField(5, 2)}</div>
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
export default WB_Unit3_Page16_Q1;
