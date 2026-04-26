/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import WrongMark from "../../WrongMark";

const GrammarC = ({ onChange, showTrigger, resetTrigger, locked, result }) => {
  const questions = [
    {
      sentence: "How many ____ would you like?",
      options: ["sugar", "water", "lions", "eggs"],
      correct: "eggs",
    },
    {
      sentence: "How much ____ is in a big swimming pool?",
      options: ["sugar", "water", "lions", "eggs"],
      correct: "water",
    },
    {
      sentence: "There are many ____ in Africa.",
      options: ["sugar", "water", "lions", "eggs"],
      correct: "lions",
    },
    {
      sentence: "There is too much ____ in the cake.",
      options: ["sugar", "water", "lions", "eggs"],
      correct: "sugar",
    },
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);

  useEffect(() => {
    if (showTrigger) {
      const correctAnswers = questions.map((q) => q.correct);
      setAnswers(correctAnswers);
      onChange(correctAnswers); // 🔥 مهم
    }
  }, [showTrigger]);
  useEffect(() => {
    if (resetTrigger) {
      const empty = ["", "", "", ""];
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
            C
          </span>
          Choose a noun that would go with each adjective (
          <span className="text-[#31B7F5]">many</span> or{" "}
          <span className="text-[#31B7F5]">much</span>).
        </h5>

        {/* 🟣 بنك الكلمات */}
        <Droppable droppableId="bank" direction="horizontal" isDropDisabled>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex gap-3 bg-gray-200 px-4 py-2 rounded mb-10 w-fit mx-auto"
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
              <div key={i} className="relative">
                <span className="font-bold mr-2">{i + 1}</span>

                {q.sentence.split("____")[0]}

                <Droppable droppableId={`drop-${i}`}>
                  {(provided) => (
                    <span
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        display: "inline-flex",
                        justifyContent: "center",
                        minWidth: "100px",
                        borderBottom: locked
                          ? isWrong
                            ? "2px solid #ef4444" // 🔴 غلط
                            : "2px solid #000" // ⚫ صح
                          : "2px solid #000",
                        margin: "0 6px",
                        fontWeight: value ? "bold" : "normal",
                        color: value ? "#6D2980" : "#000",
                      }}
                    >
                      {value}
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
                      top: "15px",
                      right: "50%",
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

export default GrammarC;
