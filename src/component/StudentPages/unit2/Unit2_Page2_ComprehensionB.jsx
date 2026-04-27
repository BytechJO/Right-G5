/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Unit2_Page2_ComprehensionB = ({
  onChange,
  showTrigger,
  resetTrigger,
  locked,
  result,
}) => {
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

  const [answers, setAnswers] = useState(["", "", ""]);

  useEffect(() => {
    if (showTrigger) {
      const correctAnswers = questions.map((q) => q.correct);
      setAnswers(correctAnswers);
      onChange(correctAnswers); // 🔥 مهم
    }
  }, [showTrigger]);
  useEffect(() => {
    if (resetTrigger) {
      const empty = ["", "", ""];
      setAnswers(empty);
      onChange(empty); // 🔥 مهم
    }
  }, [resetTrigger]);

  const onDragEnd = (res) => {
    if (!res.destination || locked) return;

    const { draggableId, destination } = res;

    if (destination.droppableId.startsWith("bank")) return;

    const word = draggableId.split("-").slice(1).join("-");
    const index = Number(destination.droppableId.replace("drop-", ""));

    const updated = [...answers];
    updated[index] = word;

    setAnswers(updated);
    onChange(updated); // 🔥 هذا أهم سطر
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
              className="flex gap-3 px-4 py-2 rounded mb-10 w-fit mx-auto"
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
            const isWrong = result && result[i] === false;
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

                        borderBottom: locked
                          ? isWrong
                            ? "2px solid #ef4444"
                            : "2px solid #000"
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
                          if (locked) return;

                          const updated = [...answers];
                          updated[i] = "";
                          setAnswers(updated);
                          onChange(updated);
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
                {locked && isWrong && (
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
      </div>
    </DragDropContext>
  );
};

export default Unit2_Page2_ComprehensionB;
