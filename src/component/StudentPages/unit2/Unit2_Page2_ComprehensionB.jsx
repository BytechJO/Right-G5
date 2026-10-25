import BankDragItem from "./BankDragItem";
import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, useMouseSensor, useTouchSensor } from "@hello-pangea/dnd";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
import ValidationAlert from "../../Popup/ValidationAlert";
const activationKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault(); event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); event.stopPropagation(); }
  },
};






const Unit2_Page2_ComprehensionB = () => {
  const resetButtonRef=useRef(null),chipRefs=useRef({}),slotRefs=useRef({}),focusFrame=useRef(null);
  const [pickedWord,setPickedWord]=useState(null);
  const [dragging,setDragging]=useState(false);
  const [announcement,setAnnouncement]=useState("");
  const [answers, setAnswers] = useState(["", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);
  const questions = [
    {
      sentence: "a person who is shorter than the usual person ",
      options: ["dwarf", "unusual", "disability"],
      correct: "dwarf",
    },
    {
      sentence: "different or strange; not the usual ",
      options: ["dwarf", "unusual", "disability"],
      correct: "unusual",
    },
    {
      sentence:
        "a physical problem that may keep a person from doing certain things ",
      options: ["dwarf", "unusual", "disability"],
      correct: "disability",
    },
  ];

  const onDragEnd = ({destination,draggableId}) => {setDragging(false);cancelChoice();if(!destination||!/^(drop-\d+)$/.test(destination.droppableId))return;const index=Number(destination.droppableId.replace("drop-",""));if(!Number.isInteger(index)||index<0||index>=answers.length)return;const word=draggableId.replace(/^(bank-|word-)/,"");place(index,word);};
  const options=questions[0].options;
  const cancelFocus=()=>{if(focusFrame.current!==null)cancelAnimationFrame(focusFrame.current);focusFrame.current=null;};
  useEffect(()=>()=>{if(focusFrame.current!==null)cancelAnimationFrame(focusFrame.current);},[]);
  const slotLocked=i=>locked||result[i]===true;
  const wordUsed=(word,current=answers)=>current.some((value,i)=>value===word&&result[i]!==false);
  const cancelChoice=(returnFocus=false)=>{cancelFocus();const source=pickedWord;setPickedWord(null);if(returnFocus&&source)chipRefs.current[source]?.focus({preventScroll:true});};
  const place=(i,word)=>{if(slotLocked(i)||!options.includes(word)||wordUsed(word))return null;const changed=[i];const next=answers.map((value,index)=>{if(value===word&&!slotLocked(index)){changed.push(index);return "";}return value;});next[i]=word;setAnswers(next);setResult(previous=>previous.map((value,index)=>changed.includes(index)?undefined:value));setPickedWord(null);setAnnouncement(word+" placed in blank "+(i+1)+".");return next;};
  const chooseWord=word=>{if(locked||wordUsed(word))return;cancelFocus();setPickedWord(word);setAnnouncement(word+" selected. Choose a blank.");const first=answers.findIndex((value,i)=>!slotLocked(i)&&!value);const target=first===-1?answers.findIndex((_,i)=>!slotLocked(i)):first;slotRefs.current[target]?.focus({preventScroll:true});};
  const returnWord=i=>{if(slotLocked(i)||!answers[i])return;setAnswers(previous=>previous.map((value,index)=>index===i?"":value));setResult(previous=>previous.map((value,index)=>index===i?undefined:value));setAnnouncement("Word returned to the bank.");};
  const slotKey=(event,i)=>{if(event.key==="Escape"){event.preventDefault();event.stopPropagation();cancelChoice(true);return;}if(event.key==="Delete"||event.key==="Backspace"){event.preventDefault();event.stopPropagation();if(!event.repeat&&result[i]===false)returnWord(i);return;}if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(event.repeat||slotLocked(i))return;if(pickedWord){const next=place(i,pickedWord);if(next){cancelFocus();focusFrame.current=requestAnimationFrame(()=>{focusFrame.current=null;const available=options.find(word=>!next.includes(word));(chipRefs.current[available]||resetButtonRef.current)?.focus({preventScroll:true});});}}else returnWord(i);};
  const dropStyle=(i,snapshot,normal)=>({...normal,borderBottom:slotLocked(i)?"2px solid #16a34a":result[i]===false?(normal?.borderBottom||"2px solid #ef4444"):normal?.borderBottom,outline:snapshot.isDraggingOver&&!slotLocked(i)?"3px dashed #2563eb":undefined,outlineOffset:3,borderRadius:snapshot.isDraggingOver&&!slotLocked(i)?6:normal?.borderRadius,backgroundColor:snapshot.isDraggingOver&&!slotLocked(i)?"#dbeafe":normal?.backgroundColor});
  const handleCheck = () => {
    if (locked) return;
    cancelChoice();
    setAnnouncement("Answers checked. Correct answers stay locked; incorrect answers can be changed.");

    // 🛑 تحقق من الفراغ
    if (answers.some((a) => !a)) {
      setAnnouncement("Please complete all fields.");ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;

    const res = answers.map((a, i) => {
      const ok = a === questions[i].correct;
      if (ok) correctCount++;
      return ok;
    });

    setResult(res);

    const total = questions.length;

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
      setLocked(true); // 🔒 بس إذا كله صح
      resetButtonRef.current?.focus({preventScroll:true});ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };
  const handleShow = () => {
    cancelChoice();setAnnouncement("Correct answers shown and locked.");
    const correctAnswers = questions.map((q) => q.correct);
    setAnswers(correctAnswers);
    setResult(answers.map(()=>true));
    setLocked(true);
  };
  const handleReset = () => {
    cancelChoice();setDragging(false);setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", ""]);
    setResult([]);
    setLocked(false);
  };
  return (
    <DragDropContext enableDefaultSensors={false} sensors={[useMouseSensor,useTouchSensor]} onBeforeDragStart={()=>{cancelChoice();setDragging(true);}} onDragEnd={onDragEnd}>
      <div data-exercise-scope="Unit2_Page2_ComprehensionB.jsx">
<style>{`[data-exercise-scope="Unit2_Page2_ComprehensionB.jsx"] input:focus-visible,[data-exercise-scope="Unit2_Page2_ComprehensionB.jsx"] textarea:focus-visible,[data-exercise-scope="Unit2_Page2_ComprehensionB.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
        {/* العنوان */}
        <h5 className="header-title-page8-read  mb-5">
          <span className="ex-A-read" style={{ marginRight: "10px" }}>
            B
          </span>
          Write each word next to its definition.
        </h5>

        {/* 🟣 بنك الكلمات */}
        <Droppable droppableId="bank" direction="horizontal" isDropDisabled>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex gap-3 px-4 py-2 rounded mb-10 w-fit mx-auto mt-4"
            >
              {questions[0].options.map((word, i) => {
                const isUsed = wordUsed(word);

                return (
                  <Draggable
                    key={word}
                    draggableId={`bank-${word}`}
                    index={i}
                    isDragDisabled={locked || isUsed}
                  >
                    {(provided, snapshot) => (
                      <BankDragItem provided={provided} snapshot={snapshot} freeze={dragging} normalStyle={{...({
                          padding: "6px 14px",
                          border: "2px solid #6D2980",
                          borderRadius: "10px",
                          background: "#fff",
                          cursor: isUsed ? "not-allowed" : "grab",
                          opacity: isUsed ? 0.5 : 1,
                          
                        }),boxShadow:pickedWord===word?"0 0 0 3px #2563eb":undefined,backgroundColor:pickedWord===word?"#dbeafe":undefined}}><span role="button" tabIndex={pickedWord?-1:0} data-choice aria-pressed={pickedWord===word} aria-disabled={locked||wordUsed(word)} aria-label={word+". Choose a blank to place it."} onKeyDown={event=>{if(event.key==="Escape"){event.preventDefault();event.stopPropagation();cancelChoice(true);}else if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();if(!event.repeat)chooseWord(word);}}} onKeyUp={activationKeys.onKeyUp}
                        ref={element=>{provided.innerRef(element);chipRefs.current[word]=element;}}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        
                      >
                        {word}
                      </span></BankDragItem>
                    )}
                  </Draggable>
                );
              })}
              <span style={{display:dragging?"none":"contents"}} aria-hidden="true">{provided.placeholder}</span>
            </div>
          )}
        </Droppable>

        {/* 🟡 الجمل */}
        <div className="flex flex-col gap-8 text-[15px]">
          {questions.map((q, i) => {
            const value = answers[i];

            return (
              <div key={i} className="relative flex ">
                <span className="font-bold mr-2">{i + 1}</span>

                {q.sentence.split("____")[0]}

                <Droppable isDropDisabled={slotLocked(i)} droppableId={`drop-${i}`}>
                  {(provided, snapshot) => (
                    <span title={(`Blank ${i + 1}, word for the definition: ${q.sentence.trim()}. `) + (`Blank ${i+1}. ${answers[i]||"Empty"}.${slotLocked(i)?" Correct and locked.":result[i]===false?" Not correct.":""}`)}  role="button" tabIndex={pickedWord&&slotLocked(i)?-1:0} data-choice aria-disabled={slotLocked(i)} aria-label={(`Blank ${i + 1}, word for the definition: ${q.sentence.trim()}. `) + (`Blank ${i+1}. ${answers[i]||"Empty"}.${slotLocked(i)?" Correct and locked.":result[i]===false?" Not correct.":""}`)} onKeyDown={event=>slotKey(event,i)} onKeyUp={activationKeys.onKeyUp} onClick={()=>returnWord(i)}
                      ref={element=>{provided.innerRef(element);slotRefs.current[i]=element;}}
                      {...provided.droppableProps}
                      style={dropStyle(i,snapshot,{
                        flex: 1,

                        borderBottom:
                          result[i] === false
                            ? "2px solid #ef4444"
                            : "2px solid #000",

                        margin: "0 6px",
                        fontWeight: value ? "bold" : "normal",
                        color: value ? "#6D2980" : "#000",
                      })}
                    >
                      <span
                        style={{
                          marginLeft: "10px",
                          cursor: "pointer",
                          padding: "2px 6px",
                          borderRadius: "6px",
                        }}
                        
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#f3e8ff"; // 🔥 بنفسجي فاتح
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        {value}
                      </span>

                      <span style={{display:dragging?"none":"contents"}} aria-hidden="true">{provided.placeholder}</span>
                    </span>
                  )}
                </Droppable>

                {q.sentence.split("____")[1]}

                {/* ❌ */}
                {result[i] === false && (
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: "100%",
                      transform: "translateY(-50%)",
                      width: "22px",
                      height: "22px",
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
                      pointerEvents: "none",
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* Buttons */}
        <div className="flex justify-center gap-6 mt-8">
          {/* Reset */}
          <div className="relative group">
            <button type="button" aria-label="Start Again" {...activationKeys} ref={resetButtonRef}
              onClick={handleReset}
              className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
            >
              <span className="bg-white p-3 rounded-full shadow">
                <FaRedo size={14} />
              </span>
            </button>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              Reset
            </span>
          </div>

          {/* Show */}
          <div className="relative group">
            <button type="button" aria-label="Show Answer" {...activationKeys}
              onClick={handleShow}
              className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm"
            >
              <span className="bg-white p-3 rounded-full shadow">
                <FaEye size={14} />
              </span>
            </button>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
              Show Answer
            </span>
          </div>

          {/* Check */}
          <div className="relative group">
            <button type="button" aria-label="Check Answer" {...activationKeys} disabled={locked} style={{cursor:locked ? "not-allowed":"pointer"}}
              onClick={handleCheck}
              className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm"
            >
              <span className="bg-white p-3 rounded-full shadow">
                <FaCheck size={14} />
              </span>
            </button>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
              Check Answer
            </span>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Unit2_Page2_ComprehensionB;
