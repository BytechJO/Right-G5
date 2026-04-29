import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ValidationAlert from "../../Popup/ValidationAlert";

const Review2_Page2_Q1 = () => {
  const words = [
    "who made his first soccer goal today",
    "which has very long legs",
    "that is coming to town next week",
    "who is a nurse",
  ];

  const correct = [
    "that is coming to town next week",
    "which has very long legs",
    "who made his first soccer goal today",
    "who is a nurse",
  ];

  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  // 🎯 drag
  const onDragEnd = (res) => {
    if (!res.destination) return;
    if (locked) return;

    const word = words[res.source.index];
    const dropIndex = parseInt(res.destination.droppableId);

    const updated = [...answers];
    updated[dropIndex] = word;
    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];
      copy[dropIndex] = undefined;
      return copy;
    });
  };

  // 🔥 click remove
  const removeWord = (i) => {
    if (locked) return;

    const updated = [...answers];
    updated[i] = "";
    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  // ✅ CHECK
  const handleCheck = () => {
    if (locked) return;

    if (answers.some((a) => !a)) {
      ValidationAlert.info("Fill all blanks.");
      return;
    }

    let correctCount = 0;

    const res = answers.map((a, i) => {
      const ok = a === correct[i];
      if (ok) correctCount++;
      return ok;
    });

    setResult(res);

    const msg = `Score: ${correctCount} / 4`;

   if (correctCount === 4) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // 👀 SHOW
  const handleShow = () => {
    setAnswers(correct);
    setResult([]);
    setLocked(true);
  };

  // 🔄 RESET
  const handleReset = () => {
    setAnswers(["", "", "", ""]);
    setResult([]);
    setLocked(false);
  };

  const DropBox = (i, width = "350px") => (
    <Droppable droppableId={`${i}`}>
      {(provided) => (
        <span
          ref={provided.innerRef}
          {...provided.droppableProps}
          onClick={() => removeWord(i)}
          style={{
            display: "inline-block",
            position: "relative", // 🔥 مهم
            minWidth: width,
            borderBottom:
              result[i] === false ? "1px solid red" : "1px solid black",
            margin: "0 5px",
            fontWeight: "bold",
            color: "#6D2980",
            cursor: "pointer",
          }}
        >
          {answers[i]}
          {provided.placeholder}

          {/* ❌ */}
          {result[i] === false && answers[i] && (
            <span
              style={{
                position: "absolute",
                top: "-10px",
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
          )}
        </span>
      )}
    </Droppable>
  );

  return (
    <div style={{ padding: "30px", display: "flex", justifyContent: "center" }}>
      <div className="div-forall">
        <h5 className="header-title-page8 mb-15">
          <span className="mr-3">D</span>Write the relative clause to complete
          each sentence.
        </h5>

        <DragDropContext onDragEnd={onDragEnd}>
          {/* 🔥 بنك الكلمات */}
          <Droppable droppableId="bank" direction="horizontal" isDropDisabled>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr", // 🔥 عمودين
                  gap: "10px",
                  padding: "15px",
                  borderRadius: "10px",
                  marginBottom: "30px",
                }}
              >
                {words.map((w, i) => {
                  const used = answers.includes(w);

                  return (
                    <Draggable
                      key={w}
                      draggableId={w}
                      index={i}
                      isDragDisabled={locked || used}
                    >
                      {(provided) => (
                        <span
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            padding: "6px 10px",
                            fontSize: "20px",
                            background: "white",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            cursor: "grab",
                            opacity: used ? 0.4 : 1,
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

          {/* 🔥 الجمل */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              fontSize: "20px",
            }}
          >
            <div>
              <span className="font-bold mr-4">1</span> Would you like to go to
              the carnival {DropBox(0)}?
            </div>

            <div>
              <span className="font-bold mr-4">2</span> The giraffe,{" "}
              {DropBox(1)}, is an unusual looking animal.
            </div>

            <div>
              <span className="font-bold mr-4">3</span> Are you surprised about
              Carl {DropBox(2)}?
            </div>

            <div>
              <span className="font-bold mr-4">4</span> My aunt, {DropBox(3)},
              works at Red Cross Hospital.
            </div>
          </div>
        </DragDropContext>

        {/* buttons */}
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={handleReset}>
            Start Again ↻
          </button>

          <button onClick={handleShow} className="show-answer-btn">
            Show Answer
          </button>

          <button className="check-button2" onClick={handleCheck}>
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review2_Page2_Q1;
