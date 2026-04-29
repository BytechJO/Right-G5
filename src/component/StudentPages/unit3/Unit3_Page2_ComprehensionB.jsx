import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
import ValidationAlert from "../../Popup/ValidationAlert";

const Unit2_Page2_ComprehensionB = () => {
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

  const onDragEnd = (res) => {
    if (!res.destination || locked) return;

    const { draggableId, destination } = res;

    const word = draggableId.split("-").slice(1).join("-");
    const index = Number(destination.droppableId.replace("drop-", ""));

    // 🔒 لا تعدل الصح
    if (result[index] === true) return;

    const updated = [...answers];
    updated[index] = word;

    setAnswers(updated);

    // 🔥 امسح الخطأ لما يعدل
    setResult((prev) => {
      const copy = [...prev];
      copy[index] = undefined;
      return copy;
    });
  };
  const handleCheck = () => {
    if (locked) return;

    // 🛑 تحقق من الفراغ
    if (answers.some((a) => !a)) {
      ValidationAlert.info("Please complete all fields.");
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
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };
  const handleShow = () => {
    const correctAnswers = questions.map((q) => q.correct);
    setAnswers(correctAnswers);
    setResult([]);
    setLocked(true);
  };
  const handleReset = () => {
    setAnswers(["", "", ""]);
    setResult([]);
    setLocked(false);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
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
                const isUsed = answers.includes(word);

                return (
                  <Draggable
                    key={word}
                    draggableId={`bank-${word}`}
                    index={i}
                    isDragDisabled={locked || isUsed}
                  >
                    {(provided) => (
                      <span
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          padding: "6px 14px",
                          border: "2px solid #6D2980",
                          borderRadius: "10px",
                          background: "#fff",
                          cursor: isUsed ? "not-allowed" : "grab",
                          opacity: isUsed ? 0.5 : 1,
                          ...provided.draggableProps.style,
                        }}
                      >
                        {word}
                      </span>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
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

                <Droppable droppableId={`drop-${i}`}>
                  {(provided) => (
                    <span
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        flex: 1,

                        borderBottom:
                          result[i] === false
                            ? "2px solid #ef4444"
                            : "2px solid #000",

                        margin: "0 6px",
                        fontWeight: value ? "bold" : "normal",
                        color: value ? "#6D2980" : "#000",
                      }}
                    >
                      <span
                        style={{
                          marginLeft: "10px",
                          cursor: "pointer",
                          padding: "2px 6px",
                          borderRadius: "6px",
                        }}
                        onClick={() => {
                          if (locked || result[i] === true) return;

                          const updated = [...answers];
                          updated[i] = "";
                          setAnswers(updated);

                          setResult((prev) => {
                            const copy = [...prev];
                            copy[i] = undefined;
                            return copy;
                          });
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

                      {provided.placeholder}
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
            <div
              onClick={handleReset}
              className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
            >
              <div className="bg-white p-3 rounded-full shadow">
                <FaRedo size={14} />
              </div>
            </div>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              Reset
            </span>
          </div>

          {/* Show */}
          <div className="relative group">
            <div
              onClick={handleShow}
              className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm"
            >
              <div className="bg-white p-3 rounded-full shadow">
                <FaEye size={14} />
              </div>
            </div>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
              Show Answer
            </span>
          </div>

          {/* Check */}
          <div className="relative group">
            <div
              onClick={handleCheck}
              className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm"
            >
              <div className="bg-white p-3 rounded-full shadow">
                <FaCheck size={14} />
              </div>
            </div>
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
