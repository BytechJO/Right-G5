import soundA7 from "../../../assets/audio/Workbook/Unit 5/Page 27 - A/Item_007_ind_books_ina.mp3";
import soundA3 from "../../../assets/audio/Workbook/Unit 5/Page 27 - A/Item_003_job_or_task_that_is_given_to_someone.mp3";
import soundA6 from "../../../assets/audio/Workbook/Unit 5/Page 27 - A/Item_006_facts_about_people.mp3";
import soundA5 from "../../../assets/audio/Workbook/Unit 5/Page 27 - A/Item_005_dangerous_kind.mp3";
import soundA4 from "../../../assets/audio/Workbook/Unit 5/Page 27 - A/Item_004_written_description_about_something.mp3";
import soundA2 from "../../../assets/audio/Workbook/Unit 5/Page 27 - A/Item_002_Across.mp3";
import soundA1 from "../../../assets/audio/Workbook/Unit 5/Page 27 - A/Item_001_Down.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../../StudentPages/unit5/useExerciseAudio";
import {AudioText,AudioFeedback} from "../../StudentPages/unit5/ExerciseAudioText";
import {SentenceGroup} from "../../StudentPages/unit5/SentenceAudio";
import React, { useRef, useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};



const WB_Unit5_Page27_Q1 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const inputsRef = useRef({});
  const [direction, setDirection] = useState("across");
  const words = [
    { id: 1, answer: "report", row: 0, col: 18, dir: "down" },
    { id: 2, answer: "sharks", row: 1, col: 0, dir: "down" },
    { id: 3, answer: "information", row: 2, col: 8, dir: "down" },
    { id: 4, answer: "assignment", row: 3, col: 0, dir: "across" },
    { id: 5, answer: "recipe", row: 3, col: 14, dir: "down" },
    { id: 6, answer: "entire", row: 4, col: 14, dir: "across" },
    { id: 7, answer: "librarian", row: 6, col: 3, dir: "across" },
    { id: 8, answer: "both", row: 6, col: 5, dir: "down" },
    { id: 9, answer: "barbecue", row: 8, col: 7, dir: "across" },
    { id: 10, answer: "presentation", row: 12, col: 3, dir: "across" },
  ];

  const cluesDown = [
    ["1", "a written description about something"],
    ["2", "dangerous kinds of fish"],
    ["3", "facts about people, places, things, or so on"],
    ["5", "instructions to make a food dish"],
    ["8", "referring to two things"],
  ];

  const cluesAcross = [
    ["4", "a job or task that is given to someone"],
    ["6", "all"],
    ["7", "person who works and helps to find books in a library"],
    ["9", "a meal prepared outside, using a grill"],
    [
      "10",
      "an activity performed in front of people to explain or show something",
    ],
  ];

  const rows = 13;
  const cols = 24;

  const buildCells = () => {
    const cells = {};

    words.forEach((word) => {
      word.answer.split("").forEach((letter, i) => {
        const row = word.dir === "down" ? word.row + i : word.row;
        const col = word.dir === "across" ? word.col + i : word.col;
        const key = `${row}-${col}`;

        cells[key] = {
          letter,
          number: i === 0 ? word.id : cells[key]?.number,
        };
      });
    });

    return cells;
  };

  const cells = buildCells();
const [activeCell,setActiveCell]=useState("0-18");const focusFrame=useRef(null);const cancelFocus=()=>{if(focusFrame.current!==null)cancelAnimationFrame(focusFrame.current);focusFrame.current=null;};React.useEffect(()=>()=>{if(focusFrame.current!==null)cancelAnimationFrame(focusFrame.current);},[]);const wordCells=word=>Array.from(word.answer,(_,i)=>`${word.dir==="down"?word.row+i:word.row}-${word.dir==="across"?word.col+i:word.col}`);const cellWords=key=>words.filter(word=>wordCells(word).includes(key));const cellLocked=key=>locked||cellWords(key).some(word=>result[word.id]===true);const moveCell=(key,dr,dc)=>{const [row,col]=key.split("-").map(Number);let r=row+dr,c=col+dc;while(r>=0&&r<rows&&c>=0&&c<cols){const next=`${r}-${c}`;if(cells[next]&&!cellLocked(next)){cancelFocus();setActiveCell(next);focusFrame.current=requestAnimationFrame(()=>{focusFrame.current=null;inputsRef.current[next]?.focus({preventScroll:true});});return;}r+=dr;c+=dc;}};const cellKey=(event,key)=>{if(event.key==="Tab")return;if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();if(!event.repeat){const next=direction==="across"?"down":"across";setDirection(next);setAnnouncement(`Writing ${next}. Arrow keys move between available letters.`);}return;}const steps={ArrowLeft:[0,-1],ArrowRight:[0,1],ArrowUp:[-1,0],ArrowDown:[1,0]};if(steps[event.key]){event.preventDefault();event.stopPropagation();const[dr,dc]=steps[event.key];setDirection(dr?"down":"across");moveCell(key,dr,dc);}else if(event.key==="Backspace"||event.key==="Delete"){event.preventDefault();event.stopPropagation();if(!event.repeat&&!cellLocked(key)){handleChange(key,"");if(event.key==="Backspace")moveCell(key,direction==="across"?0:-1,direction==="across"?-1:0);}}};

  const [studentAnswers, setStudentAnswers] = useState(
    Object.keys(cells).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {}),
  );

  const [result, setResult] = useState({});

  const [locked, setLocked] = useState(false);

  const handleChange = (key,value)=>{if(cellLocked(key))return;const char=value.slice(-1);if(char&&!/^[a-z]$/i.test(char))return;setStudentAnswers(previous=>({...previous,[key]:char}));setResult(previous=>{const next={...previous};cellWords(key).forEach(word=>{if(next[word.id]!==true)delete next[word.id]});return next});if(char)moveCell(key,direction==="across"?0:1,direction==="across"?1:0);};

  const checkAnswers = () => {
    if (locked) return;cancelFocus();audio.stop();

    const hasEmpty = Object.keys(cells).some(
      (key) => !studentAnswers[key].trim(),
    );

    if (hasEmpty) {
      (setAnnouncement(String("Please complete all answers.").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.info("Please complete all answers."));
      return;
    }

    let correctCount = 0;

    const newResults = {};

    words.forEach((word) => {
      let isCorrect = true;

      word.answer.split("").forEach((letter, i) => {
        const row = word.dir === "down" ? word.row + i : word.row;

        const col = word.dir === "across" ? word.col + i : word.col;

        const key = `${row}-${col}`;

        const studentLetter = studentAnswers[key]?.toLowerCase();

        if (studentLetter !== letter.toLowerCase()) {
          isCorrect = false;
        }
      });

      if (isCorrect) correctCount++;

      // ✅ save result by word id
      newResults[word.id] = isCorrect;
    });

    setResult(newResults);

    const total = words.length;

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

  const showAnswers = () => {cancelFocus();audio.stop();setAnnouncement("Model answers shown and locked.");resetButtonRef.current?.focus({preventScroll:true});
    const filled = {};

    Object.keys(cells).forEach((key) => {
      filled[key] = cells[key].letter;
    });

    setStudentAnswers(filled);

    setResult(Object.fromEntries(words.map(word=>[word.id,true])));

    setLocked(true);
  };

  const handleReset = () => {cancelFocus();setActiveCell("0-18");setDirection("across");audio.stop();setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(
      Object.keys(cells).reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {}),
    );

    setResult({});

    setLocked(false);
  };

  const errorBadge = (dir) => (
    <span
      style={{
        position: "absolute",

        // ✅ position حسب الاتجاه
        top: dir === "down" ? "-10px" : "20%",
        left: dir === "across" ? "-10px" : "20%",

        transform: dir === "across" ? "translateX(-50%)" : "translateY(-50%)",

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
        zIndex: 5,
      }}
    >
      ✕
    </span>
  );

const tabCell=!cellLocked(activeCell)?activeCell:Object.keys(cells).sort((a,b)=>{const[ar,ac]=a.split("-").map(Number),[br,bc]=b.split("-").map(Number);return ar-br||ac-bc;}).find(key=>!cellLocked(key));
  return (
    <div data-exercise-scope={"WB_Unit5_Page27_Q1.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="WB_Unit5_Page27_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit5_Page27_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit5_Page27_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[17px]">
        {/* TITLE */}
        <ExerciseHeader isWorkbook sectionLetter="A" title={<>
          
          Complete the puzzle.
        </>} subTitle="Solve the clearest clues first, then use crossing letters to confirm the remaining vocabulary before checking." />

        {/* PUZZLE */}
        <div className="flex justify-center mb-10">
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${cols}, 32px)`,
              gridTemplateRows: `repeat(${rows}, 32px)`,
            }}
          >
            {Array.from({ length: rows }).map((_, row) =>
              Array.from({ length: cols }).map((_, col) => {
                const key = `${row}-${col}`;
                const cell = cells[key];

                if (!cell) {
                  return <div key={key} />;
                }

                return (
                  <div
                    key={key}
                    className="relative"
                    style={{
                      width: "30px",
                      height: "30px",
                      border: "1.5px solid #7D3C98",
                    borderColor:cellLocked(key)?"#16a34a":cellWords(key).some(word=>result[word.id]===false)?"#D1232A":"#7D3C98"}}
                  >
                    {cell.number && (
                      <span
                        style={{
                          position: "absolute",
                          top: "0px",
                          left: "2px",
                          fontSize: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        {cell.number}
                      </span>
                    )}
                    <input onKeyUp={fieldKeys.onKeyUp} onKeyDown={event=>cellKey(event,key)} data-cell-key={key} tabIndex={key===tabCell?0:-1} style={{borderBottomColor:(cellLocked(key))?"#16a34a":undefined}} aria-invalid={cellWords(key).some(w=>result[w.id]===false)&&!cellLocked(key)} title={`Crossword row ${row+1}, column ${col+1}. Clue ${cellWords(key).map(w=>w.id+" "+w.dir).join(" and ")}`} aria-label={`Crossword row ${row+1}, column ${col+1}. Clue ${cellWords(key).map(w=>w.id+" "+w.dir).join(" and ")}`} 
                      type="text"
                      ref={(el) => (inputsRef.current[key] = el)}
                      data-crossword
                      maxLength={1}
                      value={studentAnswers[key]}
                      disabled={cellLocked(key)}
                      onChange={(e) => handleChange(key, e.target.value, e)}
                      onClick={()=>{const owners=cellWords(key);if(owners.length===1)setDirection(owners[0].dir);}}
                      onFocus={event=>{event.target.select();setActiveCell(key);const owners=cellWords(key);if(owners.every(word=>word.dir===owners[0]?.dir))setDirection(owners[0].dir);}}
                      className={`
                        w-full
                        h-full
                        border-0
                        outline-none
                        bg-transparent
                        text-center
                        text-[16px]
                        text-[#6D2980]
                        font-semibold
                        
                      `}
                    />
                    {cell.number &&
                      result[cell.number] === false &&
                      errorBadge(
                        words.find((w) => w.id === cell.number)?.dir,
                      )}{" "}
                  </div>
                );
              }),
            )}
          </div>
        </div>

        {/* CLUES */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="border-2 border-[#7D3C98] rounded-xl p-4">
            <h3 className="text-center font-bold mb-3"><AudioText audio={audio} id={"fragment-0"} src={soundA1} label={"Hear Down"}>Down</AudioText></h3>

            {cluesDown.map((clue) => (
              <div key={clue[0]} className="flex gap-3 leading-[1.2] mb-1">{({"1":soundA4,"2":soundA5,"3":soundA6,"4":soundA3,"7":soundA7})[clue[0]]?<SentenceGroup audio={audio} id={`clue-${clue[0]}`} src={({"1":soundA4,"2":soundA5,"3":soundA6,"4":soundA3,"7":soundA7})[clue[0]]} label={`Hear clue ${clue[0]}: ${clue[1]}`} className="flex gap-3 leading-[1.2]">
                <span className="font-bold">{clue[0]}</span>
                <span>{clue[1]}</span>
              </SentenceGroup>:<>
                <span className="font-bold">{clue[0]}</span>
                <span>{clue[1]}</span>
              </>}</div>
            ))}
          </div>

          <div className="border-2 border-[#7D3C98] rounded-xl p-4">
            <h3 className="text-center font-bold mb-3"><AudioText audio={audio} id={"fragment-1"} src={soundA2} label={"Hear Across"}>Across</AudioText></h3>

            {cluesAcross.map((clue) => (
              <div key={clue[0]} className="flex gap-3 leading-[1.2] mb-1">{({"1":soundA4,"2":soundA5,"3":soundA6,"4":soundA3,"7":soundA7})[clue[0]]?<SentenceGroup audio={audio} id={`clue-${clue[0]}`} src={({"1":soundA4,"2":soundA5,"3":soundA6,"4":soundA3,"7":soundA7})[clue[0]]} label={`Hear clue ${clue[0]}: ${clue[1]}`} className="flex gap-3 leading-[1.2]">
                <span className="font-bold">{clue[0]}</span>
                <span>{clue[1]}</span>
              </SentenceGroup>:<>
                <span className="font-bold">{clue[0]}</span>
                <span>{clue[1]}</span>
              </>}</div>
            ))}
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

export default WB_Unit5_Page27_Q1;
