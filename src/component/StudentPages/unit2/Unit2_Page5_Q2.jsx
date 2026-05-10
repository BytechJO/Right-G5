import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";

const Unit2_Page5_Q2 = () => {
  const words = [
    "fast",
    "Not so fast",
    "first thing",
    "couple",
    "crazy",
    "begs",
    "merry-go-round",
    "few",
    "keep my feet on the ground",
  ];

  const correct = [
    "crazy",
    "fast",
    "first thing",
    "few",
    "couple",
    "begs",
    "Not so fast",
    "keep my feet on the ground",
    "merry-go-round",
  ];

  const [answers, setAnswers] = useState(Array(9).fill(""));
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  // 🎯 DRAG
  const onDragEnd = (res) => {
    if (!res.destination) return;

    const word = res.draggableId.replace("word-", "");
    const index = Number(res.destination.droppableId);

    // 🔒 لا تعدل الصح
    if (result[index] === true) return;

    setAnswers((prev) => {
      const updated = [...prev];

      // 🔥 إذا الكلمة موجودة بمكان ثاني → احذفها
      const existingIndex = updated.findIndex((a) => a === word);
      if (existingIndex !== -1) {
        updated[existingIndex] = "";
      }

      // 🔥 حط الكلمة بالمكان الجديد
      updated[index] = word;

      return updated;
    });

    // 🔥 امسح الخطأ
    setResult((prev) => {
      const copy = [...prev];
      copy[index] = undefined;
      return copy;
    });
  };

  // ✅ CHECK
  const handleCheck = () => {
    if (locked) return;

    if (answers.some((a) => !a)) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;

    const res = answers.map((a, i) => {
      const ok = a === correct[i];
      if (ok) correctCount++;
      return ok;
    });

    setResult(res);

    const total = correct.length;

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
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // 👁️ SHOW
  const handleShow = () => {
    setAnswers(correct);
    setResult([]);
    setLocked(true);
  };

  // 🔄 RESET
  const handleReset = () => {
    setAnswers(Array(correct.length).fill(""));
    setResult([]);
    setLocked(false);
  };
  const getDropClass = (i) =>
    `relative inline-block min-w-[90px] mx-1 text-center text-[#6D2980]
   border-b-1
   ${result[i] === false ? "border-red-500" : "border-black"}
   ${answers[i] ? "cursor-pointer hover:bg-purple-100" : ""}
  `;
  const renderX = (i) =>
    result[i] === false && (
      <span
        style={{
          position: "absolute",
          top: "-8px",
          right: "-10px",
          transform: "translateY(-50%)",
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
          zIndex: 3,
        }}
      >
        ✕
      </span>
    );
  const handleRemove = (i) => {
    if (result[i] === true) return;

    setAnswers((prev) => {
      const updated = [...prev];
      updated[i] = "";
      return updated;
    });

    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div className="div-forall">
          <h5 className="header-title-page8 mb-15">
            <span className="ex-A mr-2">B</span>
            Using the words and phrases in the box, finish the story.
          </h5>

          {/* 🟣 WORD BANK */}
          <Droppable droppableId="bank" direction="horizontal" isDropDisabled>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-nowrap gap-3  rounded-xl items-center justify-start min-w-[1400px]"
              >
                {words.map((w, i) => {
                  const used = answers.includes(w);

                  return (
                    <Draggable
                      key={w}
                      draggableId={`word-${w}`}
                      index={i}
                      isDragDisabled={locked || used}
                    >
                      {(provided) => (
                        <span
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="px-3 py-1 bg-white rounded-lg border cursor-pointer whitespace-nowrap"
                          style={{
                            opacity: used ? 0.5 : 1,
                            ...provided.draggableProps.style,
                          }}
                        >
                          {w}
                        </span>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* 📝 STORY */}
          <div className="text-[18px] leading-9 flex flex-col gap-6 mt-10 mb-7">
            {/* LINE 1 */}
            <div>
              Lynn is a girl who likes{" "}
              <Droppable droppableId="0">
                {(p) => (
                  <span
                    ref={p.innerRef}
                    {...p.droppableProps}
                    className={getDropClass(0)}
                    onClick={() => handleRemove(0)}
                  >
                    {answers[0]}
                    {p.placeholder}
                    {renderX(0)}
                  </span>
                )}
              </Droppable>
              ,{" "}
              <Droppable droppableId="1">
                {(p) => (
                  <span
                    ref={p.innerRef}
                    {...p.droppableProps}
                    className={getDropClass(1)}
                    onClick={() => handleRemove(1)}
                  >
                    {answers[1]}
                    {p.placeholder}
                    {renderX(1)}
                  </span>
                )}
              </Droppable>{" "}
              rides, but her friend Stacy likes the
            </div>

            {/* LINE 2 */}
            <div>
              slow rides. They decide to go to the carnival that is in town. The{" "}
              <Droppable droppableId="2">
                {(p) => (
                  <span
                    ref={p.innerRef}
                    {...p.droppableProps}
                    className={getDropClass(2)}
                    onClick={() => handleRemove(2)}
                  >
                    {answers[2]}
                    {p.placeholder}
                    {renderX(2)}
                  </span>
                )}
              </Droppable>{" "}
              they
            </div>

            {/* LINE 3 */}
            <div>
              do is buy a{" "}
              <Droppable droppableId="3">
                {(p) => (
                  <span
                    ref={p.innerRef}
                    {...p.droppableProps}
                    className={getDropClass(3)}
                    onClick={() => handleRemove(3)}
                  >
                    {answers[3]}
                    {p.placeholder}
                    {renderX(3)}
                  </span>
                )}
              </Droppable>{" "}
              tickets for a{" "}
              <Droppable droppableId="4">
                {(p) => (
                  <span
                    ref={p.innerRef}
                    {...p.droppableProps}
                    className={getDropClass(4)}
                    onClick={() => handleRemove(4)}
                  >
                    {answers[4]}
                    {p.placeholder}
                    {renderX(4)}
                  </span>
                )}
              </Droppable>{" "}
              of the rides. Lynn{" "}
              <Droppable droppableId="5">
                {(p) => (
                  <span
                    ref={p.innerRef}
                    {...p.droppableProps}
                    className={getDropClass(5)}
                    onClick={() => handleRemove(5)}
                  >
                    {answers[5]}
                    {p.placeholder}
                    {renderX(5)}
                  </span>
                )}
              </Droppable>{" "}
              Stacy to
            </div>

            {/* LINE 4 */}
            <div>
              go on the Ferris wheel with her, but Stacy says,“{" "}
              <Droppable droppableId="6">
                {(p) => (
                  <span
                    ref={p.innerRef}
                    {...p.droppableProps}
                    className={getDropClass(6)}
                    onClick={() => handleRemove(6)}
                  >
                    {answers[6]}
                    {p.placeholder}
                    {renderX(6)}
                  </span>
                )}
              </Droppable>{" "}
              !”
            </div>

            {/* LINE 5 */}
            <div>
              I like to{" "}
              <Droppable droppableId="7">
                {(p) => (
                  <span
                    ref={p.innerRef}
                    {...p.droppableProps}
                    className={getDropClass(7)}
                    onClick={() => handleRemove(7)}
                  >
                    {answers[7]}
                    {p.placeholder}
                    {renderX(7)}
                  </span>
                )}
              </Droppable>
              , so let’s go on the{" "}
              <Droppable droppableId="8">
                {(p) => (
                  <span
                    ref={p.innerRef}
                    {...p.droppableProps}
                    className={getDropClass(8)}
                    onClick={() => handleRemove(8)}
                  >
                    {answers[8]}
                    {p.placeholder}
                    {renderX(8)}
                  </span>
                )}
              </Droppable>{" "}
            </div>
            <div>
              first. It goes in circles like the Ferris wheel, but it’s slow.”
            </div>
          </div>
          {/* Buttons */}
          <Button
            handleShowAnswer={handleShow}
            handleStartAgain={handleReset}
            checkAnswers={handleCheck}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default Unit2_Page5_Q2;
