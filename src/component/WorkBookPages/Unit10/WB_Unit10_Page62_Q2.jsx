import soundM8 from "../../../assets/audio/Workbook/Unit 10/Page 62 - M/Item_008_feelings.mp3";
import soundM7 from "../../../assets/audio/Workbook/Unit 10/Page 62 - M/Item_007_full_of_energy_or_excitement.mp3";
import soundM6 from "../../../assets/audio/Workbook/Unit 10/Page 62 - M/Item_006_a_measurement_of_land.mp3";
import soundM5 from "../../../assets/audio/Workbook/Unit 10/Page 62 - M/Item_005_very_great_in_size.mp3";
import soundM4 from "../../../assets/audio/Workbook/Unit 10/Page 62 - M/Item_004_having_qualities_that_people_like.mp3";
import soundM3 from "../../../assets/audio/Workbook/Unit 10/Page 62 - M/Item_003_many_different_kinds_of_things_or_people.mp3";
import soundM2 from "../../../assets/audio/Workbook/Unit 10/Page 62 - M/Item_002_Across.mp3";
import soundM1 from "../../../assets/audio/Workbook/Unit 10/Page 62 - M/Item_001_Down.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../../StudentPages/unit5/useExerciseAudio";
import {AudioText,AudioFeedback,AudioSpeaker} from "../../StudentPages/unit5/ExerciseAudioText";
import {SentenceGroup,SentencePart} from "../../StudentPages/unit5/SentenceAudio";
import React, { useRef, useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};



const WB_Unit10_Page62_Q2 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const inputsRef = useRef({});
  const [direction, setDirection] = useState("across");
  const words = [
    { id: 1, answer: "variety", row: 0, col: 3, dir: "down" },

    { id: 2, answer: "appealing", row: 1, col: 3, dir: "across" },

    { id: 3, answer: "enormous", row: 1, col: 6, dir: "down" },
    { id: 4, answer: "lively", row: 1, col: 8, dir: "down" },

    { id: 5, answer: "acres", row: 4, col: 0, dir: "across" },

    { id: 6, answer: "moods", row: 8, col: 2, dir: "across" },
  ];

  const cluesDown = [
    ["1", "many different kinds of things or people"],

    ["3", "very great in size"],

    ["4", "full of energy or excitement"],
  ];

  const cluesAcross = [
    ["2", "having qualities that people like"],

    ["5", "a measurement of land"],

    ["6", "feelings"],
  ];
  const rows = 12;
  const cols = 12;

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

  const [studentAnswers, setStudentAnswers] = useState(
    Object.keys(cells).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {}),
  );

  const [result, setResult] = useState({});

  const [locked, setLocked] = useState(false);

  const [activeCell,setActiveCell]=useState("0-3");
  const cellWords=key=>words.filter(w=>Array.from(w.answer).some((_,i)=>(w.dir==="down"?w.row+i:w.row)+"-"+(w.dir==="across"?w.col+i:w.col)===key));
  const cellLocked=key=>locked||cellWords(key).some(w=>result[w.id]===true);
  const moveCell=(key,dr,dc)=>{let [r,c]=key.split("-").map(Number);r+=dr;c+=dc;while(r>=0&&r<rows&&c>=0&&c<cols){const next=r+"-"+c;if(cells[next]&&!cellLocked(next)){setActiveCell(next);inputsRef.current[next]?.focus();return;}r+=dr;c+=dc;}};
  const cellKey=(event,key)=>{if(event.key==="Tab")return;if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();if(!event.repeat){const next=direction==="across"?"down":"across";setDirection(next);setAnnouncement("Writing "+next+". Use the arrow keys to move between letters.");}return;}const steps={ArrowLeft:[0,-1],ArrowRight:[0,1],ArrowUp:[-1,0],ArrowDown:[1,0]};if(steps[event.key]){event.preventDefault();event.stopPropagation();const [dr,dc]=steps[event.key];setDirection(dr?"down":"across");moveCell(key,dr,dc);return;}if(event.key==="Backspace"||event.key==="Delete"){event.preventDefault();event.stopPropagation();if(!cellLocked(key)&&!event.repeat){handleChange(key,"");if(event.key==="Backspace")moveCell(key,direction==="down"?-1:0,direction==="across"?-1:0);}}};
  const handleChange = (key,value)=>{if(cellLocked(key))return;const char=value.slice(-1);if(char&&!/^[a-z]$/i.test(char))return;setStudentAnswers(prev=>({...prev,[key]:char}));setResult(prev=>{const next={...prev};cellWords(key).forEach(w=>{if(next[w.id]!==true)delete next[w.id];});return next;});if(char)moveCell(key,direction==="down"?1:0,direction==="across"?1:0);};

  const checkAnswers = () => {
    if (locked) return;audio.stop();

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

  const showAnswers = () => {audio.stop();setAnnouncement("Model answers shown and locked.");resetButtonRef.current?.focus({preventScroll:true});
    const filled = {};

    Object.keys(cells).forEach((key) => {
      filled[key] = cells[key].letter;
    });

    setStudentAnswers(filled);

    setResult(Object.fromEntries(words.map(w=>[w.id,true])));

    setLocked(true);
  };

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
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

  return (
    <div data-exercise-scope={"WB_Unit10_Page62_Q2.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="WB_Unit10_Page62_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit10_Page62_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit10_Page62_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[17px]">
        {/* TITLE */}
        <ExerciseHeader isWorkbook sectionLetter="M" title={<>
          
          Complete the puzzle.
        </>} subTitle="Solve the clearest clues first, then use crossing letters to confirm the remaining vocabulary before checking." />

        {/* PUZZLE */}
        <div className="flex justify-center ">
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
                    borderColor:cellLocked(key)?"#16a34a":cellWords(key).some(w=>result[w.id]===false)?"#D1232A":"#7D3C98"}}
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
                    <input onKeyUp={fieldKeys.onKeyUp} onKeyDown={event=>cellKey(event,key)} tabIndex={((cells[activeCell]&&!cellLocked(activeCell))?activeCell:Object.keys(cells).sort((a,b)=>{const [ar,ac]=a.split("-").map(Number),[br,bc]=b.split("-").map(Number);return ar-br||ac-bc;}).find(k=>!cellLocked(k)))===key?0:-1} aria-invalid={!cellLocked(key)&&cellWords(key).some(w=>result[w.id]===false)} title={`Crossword row ${row+1}, column ${col+1}. ${cellWords(key).map(w=>w.id+" "+w.dir+": "+(w.dir==="down"?cluesDown:cluesAcross).find(c=>Number(c[0])===w.id)?.[1]).join("; ")}`} aria-label={`Crossword row ${row+1}, column ${col+1}. ${cellWords(key).map(w=>w.id+" "+w.dir+": "+(w.dir==="down"?cluesDown:cluesAcross).find(c=>Number(c[0])===w.id)?.[1]).join("; ")}`} 
                      type="text"
                      ref={(el) => (inputsRef.current[key] = el)}
                      data-crossword
                      maxLength={1}
                      value={studentAnswers[key]}
                      disabled={cellLocked(key)}
                      onChange={(e) => handleChange(key, e.target.value, e)}
                      onClick={() => {
                        const [row, col] = key.split("-").map(Number);

                        if (cells[`${row}-${col + 1}`]) {
                          setDirection("across");
                        } else {
                          setDirection("down");
                        }
                      }}
                      onFocus={event=>{setActiveCell(key);event.target.select();}}
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
        <div className="grid grid-cols-2 gap-4 mb-10 -mt-15">
          <div className="border-2 border-[#7D3C98] rounded-xl p-4">
            <h3 className="text-center font-bold mb-3"><AudioText audio={audio} id={"fragment-0"} src={soundM1} label={"Hear Down"}>Down</AudioText></h3>

            {cluesDown.map((clue) => (
              <SentenceGroup label={`Hear clue ${clue[0]}: ${clue[1]}`} src={({1:soundM3,2:soundM4,3:soundM5,5:soundM6,4:soundM7,6:soundM8})[Number(clue[0])]} id={`clue-${clue[0]}`} audio={audio} key={clue[0]} className="flex gap-3 leading-[1.2] mb-1">
                <span className="font-bold">{clue[0]}</span>
                <span>{clue[1]}</span>
              </SentenceGroup>
            ))}
          </div>

          <div className="border-2 border-[#7D3C98] rounded-xl p-4">
            <h3 className="text-center font-bold mb-3"><AudioText audio={audio} id={"fragment-1"} src={soundM2} label={"Hear Across"}>Across</AudioText></h3>

            {cluesAcross.map((clue) => (
              <SentenceGroup label={`Hear clue ${clue[0]}: ${clue[1]}`} src={({1:soundM3,2:soundM4,3:soundM5,5:soundM6,4:soundM7,6:soundM8})[Number(clue[0])]} id={`clue-${clue[0]}`} audio={audio} key={clue[0]} className="flex gap-3 leading-[1.2] mb-1">
                <span className="font-bold">{clue[0]}</span>
                <span>{clue[1]}</span>
              </SentenceGroup>
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

export default WB_Unit10_Page62_Q2;
