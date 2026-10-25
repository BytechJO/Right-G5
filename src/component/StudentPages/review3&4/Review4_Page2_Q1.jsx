import clip0 from "../../../assets/audio/ClassBook/U4/Page 37 - D/Item_001_often)_(he)_science_museum.mp3";
import clip1 from "../../../assets/audio/ClassBook/U4/Page 37 - D/Item_002_rarely)_(she)_zoo.mp3";
import clip2 from "../../../assets/audio/ClassBook/U4/Page 37 - D/Item_003_usually)_(I)_aquarium.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import { SentenceGroup } from "./SentenceAudio";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 37/SVG/Asset 25.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 37/SVG/Asset 44.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 37/SVG/Asset 45.svg";
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
const normalizeAnswer = text => text.normalize("NFKC").toLowerCase().replace(/[‘’']/g, "").replace(/[.,!?;:…“”"()–—-]/g, " ").replace(/\s+/g, " ").trim();
const Review4_Page2_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState(["", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);
  const correctAnswers = ["He often goes to the", "She rarely goes to the", "I usually go to the"];
  const normalize = normalizeAnswer;
  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;
    setAnswers(previous => previous.map((a, j) => j === i ? value : a));
    setResult(previous => previous.map((v, j) => j === i ? undefined : v));
  };
  const input = (i, width = "w-[520px]") => <span className="relative inline-block mx-1">
      <input style={{
      ...(result[i] === true ? {
        borderBottomColor: "#16a34a"
      } : {})
    }} {...fieldKeys} aria-invalid={result[i] === false} title={`Item ${i + 1}, complete the sentence using ${["often, he", "rarely, she", "usually, I"][i]}`} aria-label={`Item ${i + 1}, complete the sentence using ${["often, he", "rarely, she", "usually, I"][i]}`} disabled={locked || result[i] === true} value={answers[i]} onChange={e => handleChange(i, e.target.value)} className={`border-b outline-none text-[#6D2980] font-semibold ${width}
        ${result[i] === false ? "border-red-500" : "border-black"}
      `} />

      {result[i] === false && <span style={{
      position: "absolute",
      top: "-10px",
      right: "-10px",
      width: "20px",
      height: "20px",
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
      pointerEvents: "none",
      zIndex: 3
    }}>
          ✕
        </span>}
    </span>;
  const checkAnswers = () => {
    if (locked) return;
    audio.stop();
    if (answers.some(a => !a.trim())) {
      setAnnouncement(String("Please complete all fields.").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.info("Please complete all fields.");
      return;
    }
    let correctCount = 0;
    const res = answers.map((a, i) => {
      const ok = normalize(a) === normalize(correctAnswers[i]);
      if (ok) correctCount++;
      return ok;
    });
    setResult(res);
    const total = correctAnswers.length;
    const color = correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const msg = `
      <div style="font-size:20px;text-align:center;">
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
    setAnnouncement("Correct answers shown and locked.");
    setAnswers(correctAnswers);
    setResult([true, true, true]);
    setLocked(true);
  };
  const handleReset = () => {
    audio.stop();
    setAnnouncement("All answers and feedback cleared.");
    setAnswers(["", "", ""]);
    setResult([]);
    setLocked(false);
  };
  const imageStyle = {
    width: "100%",
    height: "auto",
    objectFit: "contain"
  };
  return <div data-exercise-scope={"Review4_Page2_Q1.jsx"} style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px"
  }}><AudioFeedback audio={audio} /><style>{`[data-exercise-scope="Review4_Page2_Q1.jsx"] input:focus-visible,[data-exercise-scope="Review4_Page2_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall" style={{gap:"50px"}}>
        <ExerciseHeader isReview sectionLetter="D" title={<>
          
          Look, read, and write.
        </>} subTitle="Use the picture, definition, chart, or grammar clue, then complete each answer before checking." />

        <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "50px",
        fontSize: "18px"
      }}>
          {/* 1 */}
          <SentenceGroup label={"Hear the sentence clues for item 1"} src={clip0} id={"sentence-0"} audio={audio} style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "140px 124px 0.5fr auto",
          alignItems: "center",
          gap: "20px",
          paddingLeft: "40px"
        }}>
            <span style={{
            fontWeight: "bold",
            fontSize: "22px",
            position: "absolute",
            top: "0",
            left: "0"
          }}>
              1
            </span>

            <img src={img1} alt={"Visitors watching a bear at a zoo."} style={imageStyle} />

            <div style={{
            fontSize: "18px"
          }}>
              (often) &nbsp; (he)
            </div>

            {input(0, "w-[220px]")}

            <span style={{
            fontSize: "20px",
            whiteSpace: "nowrap"
          }}>
              science museum.
            </span>
          </SentenceGroup>

          {/* 2 */}
          <SentenceGroup label={"Hear the sentence clues for item 2"} src={clip1} id={"sentence-1"} audio={audio} style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "140px 124px 0.5fr auto",
          alignItems: "center",
          gap: "20px",
          paddingLeft: "40px"
        }}>
            <span style={{
            fontWeight: "bold",
            fontSize: "22px",
            position: "absolute",
            top: "0",
            left: "0"
          }}>
              2
            </span>

            <img src={img2} alt={"Visitors looking at a large aquarium tank with fish and a whale shark."} style={imageStyle} />

            <div style={{
            fontSize: "18px"
          }}>
              (rarely) &nbsp; (she)
            </div>

            {input(1, "w-[220px]")}

            <span style={{
            fontSize: "20px"
          }}>
              zoo.
            </span>
          </SentenceGroup>

          {/* 3 */}
          <SentenceGroup label={"Hear the sentence clues for item 3"} src={clip2} id={"sentence-2"} audio={audio} style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "140px 124px 0.5fr auto",
          alignItems: "center",
          gap: "20px",
          paddingLeft: "40px"
        }}>
            <span style={{
            fontWeight: "bold",
            fontSize: "22px",
            position: "absolute",
            top: "0",
            left: "0"
          }}>
              3
            </span>

            <img src={img3} alt={"A dinosaur skeleton on display in a museum."} style={imageStyle} />

            <div style={{
            fontSize: "18px"
          }}>
              (usually) &nbsp; (I)
            </div>

            {input(2, "w-[220px]")}

            <span style={{
            fontSize: "20px"
          }}>
              aquarium.
            </span>
          </SentenceGroup>
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

        <button {...activationKeys} style={{
        cursor: locked ? "not-allowed" : "pointer"
      }} disabled={locked} aria-label={"Check Answer"} type={"button"} className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>;
};
export default Review4_Page2_Q1;
