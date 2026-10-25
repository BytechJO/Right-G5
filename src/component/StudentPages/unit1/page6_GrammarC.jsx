import { createPortal } from "react-dom";
import React, { useState, useRef, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  useMouseSensor,
  useTouchSensor,
} from "@hello-pangea/dnd";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
import ValidationAlert from "../../Popup/ValidationAlert";
const activationKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  },
};

function BankDragItem({ provided, snapshot, freeze, normalStyle, children }) {
  const appearance = useRef({});
  const originalRef = children.props.ref;
  const measure = (node) => {
    if (!node || snapshot.isDragging) return;
    const computed = window.getComputedStyle(node);
    const rect = node.getBoundingClientRect();
    // offsetWidth rounds to whole pixels, which can enlarge the portalled text
    // just enough to wrap inside the library's exact (fractional) width.
    const cssWidth = parseFloat(computed.width);
    const borderBoxWidth =
      computed.boxSizing === "border-box"
        ? cssWidth
        : cssWidth +
          [
            "paddingLeft",
            "paddingRight",
            "borderLeftWidth",
            "borderRightWidth",
          ].reduce((sum, key) => sum + (parseFloat(computed[key]) || 0), 0);
    const layoutWidth =
      Number.isFinite(borderBoxWidth) && borderBoxWidth > 0
        ? borderBoxWidth
        : node.offsetWidth;
    const scale = layoutWidth ? rect.width / layoutWidth : 1;
    const next = {
      fontFamily: computed.fontFamily,
      fontWeight: computed.fontWeight,
      color: computed.color,
    };
    for (const key of [
      "fontSize",
      "lineHeight",
      "letterSpacing",
      "paddingTop",
      "paddingRight",
      "paddingBottom",
      "paddingLeft",
      "borderTopWidth",
      "borderRightWidth",
      "borderBottomWidth",
      "borderLeftWidth",
      "borderRadius",
    ]) {
      const value = parseFloat(computed[key]);
      if (Number.isFinite(value)) next[key] = value * scale;
    }
    appearance.current = next;
  };
  const ref = (node) => {
    if (typeof originalRef === "function") originalRef(node);
    else if (originalRef) originalRef.current = node;
    measure(node);
  };
  const element = React.cloneElement(children, {
    ref,
    onPointerDownCapture: (event) => {
      children.props.onPointerDownCapture?.(event);
      measure(event.currentTarget);
    },
    style: {
      ...normalStyle,
      ...(snapshot.isDragging ? appearance.current : {}),
      ...provided.draggableProps.style,
      ...(snapshot.isDragging
        ? {
            // The bank makes this span a flex item; retain its single-line text
            // alignment when the actual draggable is moved into the portal.
            display: "flex",
            alignItems: "center",
            whiteSpace: "nowrap",
            opacity: 1,
            visibility: "visible",
            zIndex: 2147483647,
            pointerEvents: "none",
          }
        : freeze
          ? { transform: "none", transition: "none" }
          : {}),
    },
  });
  if (!snapshot.isDragging) return element;
  const space = React.createElement(
    children.type,
    {
      "aria-hidden": true,
      className: children.props.className,
      style: { ...normalStyle, visibility: "visible", pointerEvents: "none" },
    },
    children.props.children,
  );
  return (
    <>
      {space}
      {createPortal(element, document.fullscreenElement || document.body)}
    </>
  );
}

const GrammarC = () => {
  const resetButtonRef = useRef(null),
    chipRefs = useRef({}),
    slotRefs = useRef({}),
    focusFrame = useRef(null);
  const [pickedWord, setPickedWord] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState([]);
  const [locked, setLocked] = useState(false);
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

  const cancelFocus = () => {
    if (focusFrame.current !== null) {
      cancelAnimationFrame(focusFrame.current);
      focusFrame.current = null;
    }
  };
  useEffect(
    () => () => {
      if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current);
    },
    [],
  );
  const slotLocked = (index) => locked || errors[index] === false;
  const wordUsed = (word, current = answers, currentErrors = errors) =>
    current.some(
      (value, index) => value === word && currentErrors[index] !== true,
    );
  const cancelChoice = (returnFocus = false) => {
    cancelFocus();
    const source = pickedWord;
    setPickedWord(null);
    if (returnFocus && source)
      chipRefs.current[source]?.focus({ preventScroll: true });
  };
  const place = (index, word) => {
    if (
      slotLocked(index) ||
      !questions[0].options.includes(word) ||
      wordUsed(word)
    )
      return null;
    const changed = [];
    const next = answers.map((value, i) => {
      if (value === word && !slotLocked(i)) {
        changed.push(i);
        return "";
      }
      return value;
    });
    next[index] = word;
    setAnswers(next);
    setErrors((previous) => {
      const clean = [...previous];
      [index, ...changed].forEach((i) => delete clean[i]);
      return clean;
    });
    setPickedWord(null);
    setAnnouncement(word + " placed in blank " + (index + 1) + ".");
    return next;
  };
  const chooseWord = (word) => {
    if (locked || wordUsed(word)) return;
    cancelFocus();
    setPickedWord(word);
    setAnnouncement(word + " selected. Choose a blank.");
    const index = answers.findIndex((value, i) => !slotLocked(i) && !value);
    const target =
      index === -1 ? answers.findIndex((_, i) => !slotLocked(i)) : index;
    slotRefs.current[target]?.focus({
      preventScroll: true,
    });
  };
  const returnWord = (index) => {
    if (slotLocked(index) || !answers[index]) return;
    setAnswers((previous) =>
      previous.map((word, i) => (i === index ? "" : word)),
    );
    setErrors((previous) => {
      const clean = [...previous];
      delete clean[index];
      return clean;
    });
    setAnnouncement("Word returned to the bank.");
  };
  const slotKey = (event, index) => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      cancelChoice(true);
      return;
    }
    if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault();
      event.stopPropagation();
      if (!event.repeat && errors[index] === true) returnWord(index);
      return;
    }
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (event.repeat || slotLocked(index)) return;
    if (pickedWord) {
      const word = pickedWord,
        next = place(index, word);
      if (next) {
        cancelFocus();
        focusFrame.current = requestAnimationFrame(() => {
          focusFrame.current = null;
          const available = questions[0].options.find(
            (option) => !next.includes(option),
          );
          (chipRefs.current[available] || resetButtonRef.current)?.focus({
            preventScroll: true,
          });
        });
      }
    } else returnWord(index);
  };
  const handleCheck = () => {
    if (locked) return;
    cancelChoice();

    const isEmpty = answers.some((a) => !a || a.trim() === "");

    if (isEmpty) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;
    const newErrors = [];

    questions.forEach((q, i) => {
      if (answers[i] === q.correct) {
        correctCount++;
        newErrors[i] = false; // ✅
      } else {
        newErrors[i] = true; // ❌
      }
    });

    setErrors(newErrors);
    setAnnouncement(
      "Answers checked. Correct answers are locked; incorrect answers can be changed.",
    );

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
      setLocked(true); // 🔒 يقفل إذا كله صح
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const handleShow = () => {
    cancelChoice();
    setAnnouncement("Correct answers shown and locked.");
    const correctAnswers = questions.map((q) => q.correct);
    setAnswers(correctAnswers);
    setErrors(questions.map(() => false)); // يمسح الأخطاء
    setLocked(true);
  };
  const handleReset = () => {
    cancelChoice();
    setDragging(false);
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", ""]);
    setErrors([]);
    setLocked(false);
  };
  const onDragEnd = (result) => {
    setDragging(false);
    cancelChoice();
    const { destination, draggableId } = result;
    if (
      !destination ||
      destination.droppableId === "bank" ||
      !/^drop-\d+$/.test(destination.droppableId)
    )
      return;
    const index = Number(destination.droppableId.slice(5));
    if (index < 0 || index >= questions.length) return;
    place(index, draggableId.replace(/^bank-/, ""));
  };

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      enableDefaultSensors={false}
      sensors={[useMouseSensor, useTouchSensor]}
      onBeforeDragStart={() => {
        cancelChoice();
        setDragging(true);
      }}
    >
      <div data-unit1-scope="grammar-c">
        <style>{`[data-unit1-scope="grammar-c"] input:focus-visible,[data-unit1-scope="grammar-c"] textarea:focus-visible,[data-unit1-scope="grammar-c"] [data-choice]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
        <div
          className="sr-only"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {announcement}
        </div>
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
              className="flex gap-3 px-4 py-2 rounded mb-10 w-fit mx-auto mt-10"
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
                      <BankDragItem
                        provided={provided}
                        snapshot={snapshot}
                        freeze={dragging}
                        normalStyle={{
                          padding: "6px 14px",
                          border: "2px solid #6D2980",
                          borderRadius: "10px",
                          background: pickedWord === word ? "#dbeafe" : "#fff",
                          cursor: isUsed ? "not-allowed" : "grab",
                          opacity: isUsed ? 0.5 : 1,
                          outline:
                            pickedWord === word
                              ? "3px solid #2563eb"
                              : undefined,
                          outlineOffset: 2,
                        }}
                      >
                        <span
                          ref={(element) => {
                            provided.innerRef(element);
                            chipRefs.current[word] = element;
                          }}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          role="button"
                          tabIndex={pickedWord ? -1 : 0}
                          data-choice
                          aria-pressed={pickedWord === word}
                          aria-disabled={locked || isUsed}
                          aria-label={`${word}. Choose a blank to place it.`}
                          onKeyDown={(event) => {
                            if (event.key === "Escape") {
                              event.preventDefault();
                              event.stopPropagation();
                              cancelChoice(true);
                            } else if (
                              event.key === "Enter" ||
                              event.key === " "
                            ) {
                              event.preventDefault();
                              event.stopPropagation();
                              if (!event.repeat) chooseWord(word);
                            }
                          }}
                          onKeyUp={activationKeys.onKeyUp}
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
                      </BankDragItem>
                    )}
                  </Draggable>
                );
              })}
              <span
                style={{ display: dragging ? "none" : "contents" }}
                aria-hidden="true"
              >
                {provided.placeholder}
              </span>
            </div>
          )}
        </Droppable>

        {/* 🟡 الجمل */}
        <div className="flex flex-col gap-8 text-[15px]">
          {questions.map((q, i) => {
            const value = answers[i];

            return (
              <div key={i} className="relative">
                <span className="font-bold mr-2">{i + 1}</span>

                {q.sentence.split("____")[0]}

                <Droppable
                  droppableId={`drop-${i}`}
                  isDropDisabled={slotLocked(i)}
                >
                  {(provided, snapshot) => (
                    <span
                      ref={(element) => {
                        provided.innerRef(element);
                        slotRefs.current[i] = element;
                      }}
                      {...provided.droppableProps}
                      role="button"
                      tabIndex={pickedWord && slotLocked(i) ? -1 : 0}
                      data-choice
                      aria-disabled={slotLocked(i)}
                      aria-label={`Blank ${i + 1}. ${value || "Empty"}.${slotLocked(i) ? " Correct and locked." : errors[i] ? " Not correct." : ""}`}
                      onKeyDown={(event) => slotKey(event, i)}
                      onKeyUp={activationKeys.onKeyUp}
                      onClick={() => returnWord(i)}
                      style={{
                        display: "inline-flex",
                        justifyContent: "center",
                        minWidth: "100px",
                        height: "20px",
                        outline:
                          snapshot.isDraggingOver && !slotLocked(i)
                            ? "3px dashed #2563eb"
                            : undefined,
                        outlineOffset: 3,
                        borderRadius: snapshot.isDraggingOver ? 6 : undefined,
                        backgroundColor:
                          snapshot.isDraggingOver && !slotLocked(i)
                            ? "#dbeafe"
                            : undefined,
                        borderBottom: slotLocked(i)
                          ? "2px solid #16a34a"
                          : errors[i]
                            ? "2px solid #ef4444"
                            : "2px solid #000",
                        margin: "0 6px",
                        fontWeight: value ? "bold" : "normal",
                        color: value ? "#6D2980" : "#000",
                      }}
                    >
                      <span
                        style={{
                          padding: "2px 6px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          transition: "0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#E9D5FF"; // بنفسجي فاتح
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        {value}
                      </span>
                      <span style={{ display: "none" }} aria-hidden="true">
                        {provided.placeholder}
                      </span>
                    </span>
                  )}
                </Droppable>

                {q.sentence.split("____")[1]}

                {/* ❌ */}
                {errors[i] && (
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
        <div className="flex justify-center gap-6 mt-8">
          {/* Reset */}
          <div className="relative group">
            <button
              type="button"
              aria-label="Start Again"
              {...activationKeys}
              ref={resetButtonRef}
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
            <button
              type="button"
              aria-label="Show Answer"
              {...activationKeys}
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
            <button
              type="button"
              aria-label="Check Answer"
              {...activationKeys}
              disabled={locked}
              style={{ cursor: locked ? "not-allowed" : "pointer" }}
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

export default GrammarC;
