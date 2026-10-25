import clip0 from "../../../assets/audio/ClassBook/U4/Page 34 - C/Item_001_way.mp3";
import clip1 from "../../../assets/audio/ClassBook/U4/Page 34 - C/Item_002_tastes.mp3";
import clip2 from "../../../assets/audio/ClassBook/U4/Page 34 - C/Item_003_off.mp3";
import clip3 from "../../../assets/audio/ClassBook/U4/Page 34 - C/Item_004_try.mp3";
import clip4 from "../../../assets/audio/ClassBook/U4/Page 34 - C/Item_005_yourself.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import { SentenceGroup } from "./SentenceAudio";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ladderImg from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 34/SVG/Asset 17.svg";
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
const Review3_Page1_Q3 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const initialData = [{
    number: "1",
    leftWord: "",
    rightWord: "way",
    answer: "",
    correctAnswer: "No way!",
    missingLeft: true,
    missingRight: false,
    correctLeft: "No",
    // POSITIONS
    numberPos: {
      top: "11%",
      left: "-2%"
    },
    leftPos: {
      top: "10%",
      left: "5%"
    },
    rightPos: {
      top: "10%",
      left: "23%"
    },
    answerPos: {
      top: "9%",
      right: "10%"
    }
  }, {
    number: "2",
    leftWord: "tastes",
    rightWord: "",
    answer: "",
    correctAnswer: "tastes good",
    missingLeft: false,
    missingRight: true,
    correctRight: "good",
    numberPos: {
      top: "24%",
      left: "-2%"
    },
    leftPos: {
      top: "23%",
      left: "6%"
    },
    rightPos: {
      top: "22.5%",
      left: "20%"
    },
    answerPos: {
      top: "22%",
      right: "10%"
    }
  }, {
    number: "3",
    leftWord: "",
    rightWord: "off",
    answer: "",
    correctAnswer: "top off",
    missingLeft: true,
    missingRight: false,
    correctLeft: "top",
    numberPos: {
      top: "38%",
      left: "-2%"
    },
    leftPos: {
      top: "35.5%",
      left: "5%"
    },
    rightPos: {
      top: "36%",
      left: "23%"
    },
    answerPos: {
      top: "35%",
      right: "10%"
    }
  }, {
    number: "4",
    leftWord: "try",
    rightWord: "",
    answer: "",
    correctAnswer: "try some",
    missingLeft: false,
    missingRight: true,
    correctRight: "some",
    numberPos: {
      top: "52%",
      left: "-2%"
    },
    leftPos: {
      top: "49%",
      left: "7%"
    },
    rightPos: {
      top: "48.5%",
      left: "20%"
    },
    answerPos: {
      top: "48%",
      right: "10%"
    }
  }, {
    number: "5",
    leftWord: "",
    rightWord: "yourself",
    answer: "",
    correctAnswer: "help yourself",
    missingLeft: true,
    missingRight: false,
    correctLeft: "help",
    numberPos: {
      top: "66%",
      left: "-2%"
    },
    leftPos: {
      top: "62%",
      left: "5%"
    },
    rightPos: {
      top: "62.5%",
      left: "20%"
    },
    answerPos: {
      top: "61%",
      right: "10%"
    }
  }];
  const [rows, setRows] = useState(() => initialData.map(item => ({
    ...item
  })));
  const [leftErrors, setLeftErrors] = useState(Array(initialData.length).fill(false));
  const [rightErrors, setRightErrors] = useState(Array(initialData.length).fill(false));
  const [answerErrors, setAnswerErrors] = useState(Array(initialData.length).fill(false));
  const [leftLocked, setLeftLocked] = useState(Array(initialData.length).fill(false));
  const [rightLocked, setRightLocked] = useState(Array(initialData.length).fill(false));
  const [answerLocked, setAnswerLocked] = useState(Array(initialData.length).fill(false));
  const [locked, setLocked] = useState(false);

  // normalize
  const normalize = normalizeAnswer;

  // typing
  const handleChange = (index, side, value) => {
    const locks = side === "left" ? leftLocked : side === "right" ? rightLocked : answerLocked;
    if (locked || locks[index]) return;
    const field = side === "left" ? "leftWord" : side === "right" ? "rightWord" : "answer";
    setRows(previous => previous.map((row, i) => i === index ? {
      ...row,
      [field]: value
    } : row));
    const setError = side === "left" ? setLeftErrors : side === "right" ? setRightErrors : setAnswerErrors;
    setError(previous => previous.map((v, i) => i === index ? false : v));
  };

  // check
  const handleCheck = () => {
    if (locked) return;
    audio.stop();
    const hasEmpty = rows.some(item => {
      const leftEmpty = item.missingLeft && normalize(item.leftWord) === "";
      const rightEmpty = item.missingRight && normalize(item.rightWord) === "";
      const answerEmpty = normalize(item.answer) === "";
      return leftEmpty || rightEmpty || answerEmpty;
    });
    if (hasEmpty) {
      setAnnouncement(String("Please complete all fields.").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.info();
      return;
    }
    let score = 0;
    const newLeftErrors = [...leftErrors];
    const newRightErrors = [...rightErrors];
    const newAnswerErrors = [...answerErrors];
    const newLeftLocked = [...leftLocked];
    const newRightLocked = [...rightLocked];
    const newAnswerLocked = [...answerLocked];
    rows.forEach((item, index) => {
      // LEFT
      if (item.missingLeft) {
        const correct = normalize(item.leftWord) === normalize(item.correctLeft);
        newLeftErrors[index] = !correct;
        newLeftLocked[index] = correct;
        if (correct) score++;
      }

      // RIGHT
      if (item.missingRight) {
        const correct = normalize(item.rightWord) === normalize(item.correctRight);
        newRightErrors[index] = !correct;
        newRightLocked[index] = correct;
        if (correct) score++;
      }

      // ANSWER
      const answerCorrect = normalize(item.answer) === normalize(item.correctAnswer);
      newAnswerErrors[index] = !answerCorrect;
      newAnswerLocked[index] = answerCorrect;
      if (answerCorrect) score++;
    });
    setLeftErrors(newLeftErrors);
    setRightErrors(newRightErrors);
    setAnswerErrors(newAnswerErrors);
    setLeftLocked(newLeftLocked);
    setRightLocked(newRightLocked);
    setAnswerLocked(newAnswerLocked);
    const total = rows.length + rows.filter(r => r.missingLeft).length + rows.filter(r => r.missingRight).length;
    const msg = `Score: ${score} / ${total}`;
    if (score === total) {
      resetButtonRef.current?.focus({
        preventScroll: true
      });
      setLocked(true);
      setAnnouncement(String(msg).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.success(msg);
    } else if (score === 0) {
      setAnnouncement(String(msg).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.error(msg);
    } else {
      setAnnouncement(String(msg).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.warning(msg);
    }
  };

  // show
  const handleShow = () => {
    audio.stop();
    setAnnouncement("Correct answers shown and locked.");
    const updated = rows.map(item => ({
      ...item,
      leftWord: item.correctLeft || item.leftWord,
      rightWord: item.correctRight || item.rightWord,
      answer: item.correctAnswer
    }));
    setRows(updated);
    setLeftErrors(Array(initialData.length).fill(false));
    setRightErrors(Array(initialData.length).fill(false));
    setAnswerErrors(Array(initialData.length).fill(false));
    setLeftLocked(Array(initialData.length).fill(true));
    setRightLocked(Array(initialData.length).fill(true));
    setAnswerLocked(Array(initialData.length).fill(true));
    setLocked(true);
  };

  // reset
  const handleReset = () => {
    audio.stop();
    setAnnouncement("All answers and feedback cleared.");
    setRows(initialData.map(item => ({
      ...item
    })));
    setLeftErrors(Array(initialData.length).fill(false));
    setRightErrors(Array(initialData.length).fill(false));
    setAnswerErrors(Array(initialData.length).fill(false));
    setLeftLocked(Array(initialData.length).fill(false));
    setRightLocked(Array(initialData.length).fill(false));
    setAnswerLocked(Array(initialData.length).fill(false));
    setLocked(false);
  };
  const renderX = () => <span style={{
    position: "absolute",
    top: "-10px",
    right: "0px",
    width: "20px",
    transform: "translateY(-50%)",
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
    boxShadow: "0 1px 6px rgba(0,0,0,0.2)"
  }}>
      ✕
    </span>;
  return <div data-exercise-scope={"Review3_Page1_Q3.jsx"} style={{
    padding: "30px",
    display: "flex",
    justifyContent: "center"
  }}><AudioFeedback audio={audio} /><style>{`[data-exercise-scope="Review3_Page1_Q3.jsx"] input:focus-visible,[data-exercise-scope="Review3_Page1_Q3.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall">
        {/* HEADER */}
        <ExerciseHeader isReview sectionLetter="C" title={<>
          
          The painters can’t climb the ladder. Help them by finishing each step
          with the missing words.
        </>} subTitle="Complete one ladder rung at a time by finding the missing word that makes the correct expression." />

        {/* MAIN */}
        <div className="relative w-full">
          {/* IMAGE */}
          <img src={ladderImg} alt={"Two wooden ladder sections used to arrange the expression clues."} style={{
          width: "100%",
          height: "auto",
          objectFit: "contain"
        }} />

          {/* ITEMS */}
          {rows.map((item, index) => <React.Fragment key={index}>
              {/* NUMBER */}
              <div className="absolute text-[20px] font-bold" style={{
            top: item.numberPos.top,
            left: item.numberPos.left
          }}>
                {item.number}
              </div>

              {/* LEFT WORD */}
              <div className="absolute" style={{
            top: item.leftPos.top,
            left: item.leftPos.left
          }}>
                {item.missingLeft ? <span style={{
              position: "relative"
            }}>
                    <input style={{
                ...(leftLocked[index] ? {
                  borderBottomColor: "#16a34a"
                } : {})
              }} {...fieldKeys} aria-invalid={leftErrors[index]} title={`Ladder rung ${index + 1}, left missing word: ${item.missingLeft ? "blank" : item.leftWord} ${item.missingRight ? "blank" : item.rightWord}`} aria-label={`Ladder rung ${index + 1}, left missing word: ${item.missingLeft ? "blank" : item.leftWord} ${item.missingRight ? "blank" : item.rightWord}`} type="text" disabled={locked || leftLocked[index]} value={item.leftWord} placeholder="write here" onChange={e => handleChange(index, "left", e.target.value)} className={`w-[5vw] border-b bg-transparent text-center text-[18px] font-semibold outline-none placeholder:text-[1vw]

                      ${leftErrors[index] ? "border-red-500 text-[#6D2980]" : "border-black text-[#6D2980]"}
                    `} />

                    {leftErrors[index] && renderX()}
                  </span> : <span className="text-[20px] font-semibold">
                    <AudioText audio={audio} id={`rung-${index}`} src={[clip0, clip1, clip2, clip3, clip4][index]} label={`Hear the given word on rung ${index + 1}: ${item.leftWord}`}>{item.leftWord}</AudioText>
                  </span>}
              </div>

              {/* RIGHT WORD */}
              <div className="absolute" style={{
            top: item.rightPos.top,
            left: item.rightPos.left
          }}>
                {item.missingRight ? <span style={{
              position: "relative"
            }}>
                    <input style={{
                ...(rightLocked[index] ? {
                  borderBottomColor: "#16a34a"
                } : {})
              }} {...fieldKeys} aria-invalid={rightErrors[index]} title={`Ladder rung ${index + 1}, right missing word: ${item.missingLeft ? "blank" : item.leftWord} ${item.missingRight ? "blank" : item.rightWord}`} aria-label={`Ladder rung ${index + 1}, right missing word: ${item.missingLeft ? "blank" : item.leftWord} ${item.missingRight ? "blank" : item.rightWord}`} type="text" disabled={locked || rightLocked[index]} value={item.rightWord} placeholder="write here" onChange={e => handleChange(index, "right", e.target.value)} className={`w-[5vw] border-b bg-transparent text-center text-[18px] font-semibold outline-none placeholder:text-[1vw]

                      ${rightErrors[index] ? "border-red-500 text-[#6D2980]" : "border-black text-[#6D2980]"}
                    `} />

                    {rightErrors[index] && renderX()}
                  </span> : <span className="text-[20px] font-semibold">
                    <AudioText audio={audio} id={`rung-${index}`} src={[clip0, clip1, clip2, clip3, clip4][index]} label={`Hear the given word on rung ${index + 1}: ${item.rightWord}`}>{item.rightWord}</AudioText>
                  </span>}
              </div>

              {/* ANSWER */}
              <div className="absolute" style={{
            top: item.answerPos.top,
            right: item.answerPos.right
          }}>
                <span style={{
              position: "relative"
            }}>
                  <input style={{
                ...(answerLocked[index] ? {
                  borderBottomColor: "#16a34a"
                } : {})
              }} {...fieldKeys} aria-invalid={answerErrors[index]} title={`Ladder rung ${index + 1}, write the complete expression: ${item.missingLeft ? "blank" : item.leftWord} ${item.missingRight ? "blank" : item.rightWord}`} aria-label={`Ladder rung ${index + 1}, write the complete expression: ${item.missingLeft ? "blank" : item.leftWord} ${item.missingRight ? "blank" : item.rightWord}`} type="text" disabled={locked || answerLocked[index]} value={item.answer} placeholder="write here" onChange={e => handleChange(index, "answer", e.target.value)} className={`w-[10vw] border-b bg-transparent text-center text-[20px] font-semibold outline-none placeholder:text-[1vw]

                    ${answerErrors[index] ? "border-red-500 text-[#6D2980]" : "border-black text-[#6D2980]"}
                  `} />

                  {answerErrors[index] && renderX()}
                </span>
              </div>
            </React.Fragment>)}
        </div>

        {/* BUTTONS */}
        <div className="action-buttons-container">
          <button {...activationKeys} ref={resetButtonRef} aria-label={"Start Again"} type={"button"} className="try-again-button" onClick={handleReset}>
            Start Again ↻
          </button>

          <button {...activationKeys} aria-label={"Show Answer"} type={"button"} className="show-answer-btn" onClick={handleShow}>
            Show Answer
          </button>

          <button {...activationKeys} style={{
          cursor: locked ? "not-allowed" : "pointer"
        }} disabled={locked} aria-label={"Check Answer"} type={"button"} className="check-button2" onClick={handleCheck}>
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>;
};
export default Review3_Page1_Q3;
