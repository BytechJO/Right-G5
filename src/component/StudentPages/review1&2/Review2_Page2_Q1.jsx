import { SentenceGroup } from "../unit2/SentenceAudio";
import clip0 from "../../../assets/audio/ClassBook/U2/Page 19 - D/Item_001_who_made_his_first_soccer_goal_today.mp3";
import clip1 from "../../../assets/audio/ClassBook/U2/Page 19 - D/Item_002_which_has_very_long_legs.mp3";
import clip2 from "../../../assets/audio/ClassBook/U2/Page 19 - D/Item_003_that_is_coming_to_town_next_week.mp3";
import clip3 from "../../../assets/audio/ClassBook/U2/Page 19 - D/Item_004_who_is_a_nurse.mp3";
import clip4 from "../../../assets/audio/ClassBook/U2/Page 19 - D/Item_005_Would_you_like_to_go_to_the_carnival.mp3";
import clip5 from "../../../assets/audio/ClassBook/U2/Page 19 - D/Item_006_The_giraffe,_,_is_an_unusual_looking_animal.mp3";
import clip6 from "../../../assets/audio/ClassBook/U2/Page 19 - D/Item_007_Are_you_surprised_about_Carl.mp3";
import clip7 from "../../../assets/audio/ClassBook/U2/Page 19 - D/Item_008_My_aunt,_,_works_at_Red_Cross_Hospital.mp3";
import { useExerciseAudio } from "../unit2/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
  AudioSpeaker,
} from "../unit2/ExerciseAudioText";
import ExerciseHeader from "../../ExerciseHeader";
import BankDragItem from "../unit2/BankDragItem";
import React, { useState, useRef, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  useMouseSensor,
  useTouchSensor,
} from "@hello-pangea/dnd";
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

const Review2_Page2_Q1 = () => {
  const audio = useExerciseAudio();
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

  const resetButtonRef = useRef(null),
    chipRefs = useRef({}),
    slotRefs = useRef({}),
    focusFrame = useRef(null);
  const [pickedWord, setPickedWord] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  // 🎯 drag
  const onDragEnd = ({ destination, draggableId }) => {
    setDragging(false);
    cancelChoice();
    if (!destination || !/^(\d+)$/.test(destination.droppableId)) return;
    const index = Number(destination.droppableId.replace("drop-", ""));
    if (!Number.isInteger(index) || index < 0 || index >= answers.length)
      return;
    const word = draggableId.replace(/^(bank-|word-)/, "");
    place(index, word);
  };

  // 🔥 click remove

  // ✅ CHECK
  const options = words;
  const listenWord = (word) =>
    audio.play(
      "bank-" + word,
      [clip0, clip1, clip2, clip3][words.indexOf(word)],
    );
  const cancelFocus = () => {
    if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current);
    focusFrame.current = null;
  };
  useEffect(
    () => () => {
      if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current);
    },
    [],
  );
  const slotLocked = (i) => locked || result[i] === true;
  const wordUsed = (word, current = answers) =>
    current.some((value, i) => value === word && result[i] !== false);
  const cancelChoice = (returnFocus = false) => {
    cancelFocus();
    const source = pickedWord;
    setPickedWord(null);
    if (returnFocus && source)
      chipRefs.current[source]?.focus({ preventScroll: true });
  };
  const place = (i, word) => {
    if (slotLocked(i) || !options.includes(word) || wordUsed(word)) return null;
    const changed = [i];
    const next = answers.map((value, index) => {
      if (value === word && !slotLocked(index)) {
        changed.push(index);
        return "";
      }
      return value;
    });
    next[i] = word;
    setAnswers(next);
    setResult((previous) =>
      previous.map((value, index) =>
        changed.includes(index) ? undefined : value,
      ),
    );
    setPickedWord(null);
    setAnnouncement(word + " placed in blank " + (i + 1) + ".");
    return next;
  };
  const chooseWord = (word) => {
    listenWord(word);
    if (locked || wordUsed(word)) return;
    cancelFocus();
    setPickedWord(word);
    setAnnouncement(word + " selected. Choose a blank.");
    const first = answers.findIndex((value, i) => !slotLocked(i) && !value);
    const target =
      first === -1 ? answers.findIndex((_, i) => !slotLocked(i)) : first;
    slotRefs.current[target]?.focus({ preventScroll: true });
  };
  const returnWord = (i) => {
    if (slotLocked(i) && answers[i]) listenWord(answers[i]);
    if (slotLocked(i) || !answers[i]) return;
    setAnswers((previous) =>
      previous.map((value, index) => (index === i ? "" : value)),
    );
    setResult((previous) =>
      previous.map((value, index) => (index === i ? undefined : value)),
    );
    setAnnouncement("Word returned to the bank.");
  };
  const slotKey = (event, i) => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      cancelChoice(true);
      return;
    }
    if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault();
      event.stopPropagation();
      if (!event.repeat && result[i] === false) returnWord(i);
      return;
    }
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (event.repeat || slotLocked(i)) return;
    if (pickedWord) {
      const next = place(i, pickedWord);
      if (next) {
        cancelFocus();
        focusFrame.current = requestAnimationFrame(() => {
          focusFrame.current = null;
          const available = options.find((word) => !next.includes(word));
          (chipRefs.current[available] || resetButtonRef.current)?.focus({
            preventScroll: true,
          });
        });
      }
    } else returnWord(i);
  };
  const dropStyle = (i, snapshot, normal) => ({
    ...normal,
    borderBottom: slotLocked(i)
      ? "2px solid #16a34a"
      : result[i] === false
        ? normal?.borderBottom || "2px solid #ef4444"
        : normal?.borderBottom,
    outline:
      snapshot.isDraggingOver && !slotLocked(i)
        ? "3px dashed #2563eb"
        : undefined,
    outlineOffset: 3,
    borderRadius:
      snapshot.isDraggingOver && !slotLocked(i) ? 6 : normal?.borderRadius,
    backgroundColor:
      snapshot.isDraggingOver && !slotLocked(i)
        ? "#dbeafe"
        : normal?.backgroundColor,
  });
  const handleCheck = () => {
    if (locked) return;
    audio.stop();
    cancelChoice();
    setAnnouncement(
      "Answers checked. Correct answers stay locked; incorrect answers can be changed.",
    );

    if (answers.some((a) => !a)) {
      setAnnouncement("Fill all blanks.");
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
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // 👀 SHOW
  const handleShow = () => {
    audio.stop();
    cancelChoice();
    setAnnouncement("Correct answers shown and locked.");
    setAnswers(correct);
    setResult(answers.map(() => true));
    setLocked(true);
  };

  // 🔄 RESET
  const handleReset = () => {
    audio.stop();
    cancelChoice();
    setDragging(false);
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", ""]);
    setResult([]);
    setLocked(false);
  };

  const DropBox = (i, width = "350px") => (
    <Droppable isDropDisabled={slotLocked(i)} droppableId={`${i}`}>
      {(provided, snapshot) => (
        <span
          title={
            [
              "Sentence 1, relative clause about the carnival. ",
              "Sentence 2, relative clause about the giraffe. ",
              "Sentence 3, relative clause about Carl. ",
              "Sentence 4, relative clause about the aunt. ",
            ][i] +
            `Blank ${i + 1}. ${answers[i] || "Empty"}.${slotLocked(i) ? " Correct and locked." : result[i] === false ? " Not correct." : ""}`
          }
          role="button"
          tabIndex={pickedWord && slotLocked(i) ? -1 : 0}
          data-choice
          aria-disabled={slotLocked(i)}
          aria-label={
            [
              "Sentence 1, relative clause about the carnival. ",
              "Sentence 2, relative clause about the giraffe. ",
              "Sentence 3, relative clause about Carl. ",
              "Sentence 4, relative clause about the aunt. ",
            ][i] +
            `Blank ${i + 1}. ${answers[i] || "Empty"}.${slotLocked(i) ? " Correct and locked." : result[i] === false ? " Not correct." : ""}`
          }
          onKeyDown={(event) => slotKey(event, i)}
          onKeyUp={activationKeys.onKeyUp}
          onClick={() => returnWord(i)}
          ref={(element) => {
            provided.innerRef(element);
            slotRefs.current[i] = element;
          }}
          {...provided.droppableProps}
          style={dropStyle(i, snapshot, {
            display: "inline-block",
            position: "relative", // 🔥 مهم
            minWidth: width,
            height: "30px",
            borderBottom:
              result[i] === false ? "1px solid red" : "1px solid black",
            margin: "0 5px",
            fontWeight: "bold",
            color: "#6D2980",
            cursor: "pointer",
          })}
        >
          {answers[i]}
          <span
            style={{ display: dragging ? "none" : "contents" }}
            aria-hidden="true"
          >
            {provided.placeholder}
          </span>

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
    <div
      data-exercise-scope="Review2_Page2_Q1.jsx"
      style={{ padding: "30px", display: "flex", justifyContent: "center" }}
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review2_Page2_Q1.jsx"] input:focus-visible,[data-exercise-scope="Review2_Page2_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="Review2_Page2_Q1.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <div className="div-forall">
        <ExerciseHeader
          isReview
          sectionLetter="D"
          title={<>Write the relative clause to complete each sentence.</>}
          subTitle="Read the whole sentence first, then choose the word that fits both the meaning and grammar before checking."
        />

        <DragDropContext
          enableDefaultSensors={false}
          sensors={[useMouseSensor, useTouchSensor]}
          onBeforeDragStart={() => {
            cancelChoice();
            setDragging(true);
          }}
          onDragEnd={onDragEnd}
        >
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
                  const used = wordUsed(w);

                  return (
                    <Draggable
                      key={w}
                      draggableId={w}
                      index={i}
                      isDragDisabled={locked || used}
                    >
                      {(provided, snapshot) => (
                        <BankDragItem
                          provided={provided}
                          snapshot={snapshot}
                          freeze={dragging}
                          normalStyle={{
                            ...{
                              padding: "6px 10px",
                              fontSize: "20px",
                              background: "white",
                              borderRadius: "8px",
                              border: "1px solid #ccc",
                              cursor: "grab",
                              opacity: used ? 0.4 : 1,
                            },
                            boxShadow:
                              pickedWord === w || audio.activeId === "bank-" + w
                                ? "0 0 0 3px #2563eb"
                                : undefined,
                            backgroundColor:
                              pickedWord === w || audio.activeId === "bank-" + w
                                ? "#dbeafe"
                                : undefined,
                          }}
                        >
                          <span
                            onClick={() => listenWord(w)}
                            role="button"
                            tabIndex={pickedWord ? -1 : 0}
                            data-choice
                            aria-pressed={pickedWord === w}
                            aria-disabled={locked || wordUsed(w)}
                            aria-label={w + ". Choose a blank to place it."}
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
                                if (!event.repeat) chooseWord(w);
                              }
                            }}
                            onKeyUp={activationKeys.onKeyUp}
                            ref={(element) => {
                              provided.innerRef(element);
                              chipRefs.current[w] = element;
                            }}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {w}
                            {audio.activeId === "bank-" + w && <AudioSpeaker />}
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

          {/* 🔥 الجمل */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              fontSize: "20px",
            }}
          >
            <SentenceGroup audio={audio} id="sentence-0" src={clip4} label="Hear the sentence: 1 Would you like to go to the carnival blank ?" tabIndex={pickedWord ? -1 : 0}>
              <span className="font-bold mr-4">1</span>
              
                {" "}
                Would you like to go to the carnival{" "}
              
              {DropBox(0)}?
            </SentenceGroup>

            <SentenceGroup audio={audio} id="sentence-1" src={clip5} label="Hear the sentence: 2 The giraffe, blank , is an unusual looking animal." tabIndex={pickedWord ? -1 : 0}>
              {" "}
              
                <span className="font-bold mr-4">2</span> The giraffe,
                {DropBox(1)}, is an unusual looking animal.
              
            </SentenceGroup>

            <SentenceGroup audio={audio} id="sentence-2" src={clip6} label="Hear the sentence: 3 Are you surprised about Carl blank ?" tabIndex={pickedWord ? -1 : 0}>
              <span className="font-bold mr-4">3</span>
              
                {" "}
                Are you surprised about Carl{" "}
              
              {DropBox(2)}?
            </SentenceGroup>

            <SentenceGroup audio={audio} id="sentence-3" src={clip7} label="Hear the sentence: 4 My aunt, blank , works at Red Cross Hospital." tabIndex={pickedWord ? -1 : 0}>
              
                <span className="font-bold mr-4">4</span> My aunt, {DropBox(3)},
                works at Red Cross Hospital.
              
            </SentenceGroup>
          </div>
        </DragDropContext>

        {/* buttons */}
        <div className="action-buttons-container">
          <button
            type="button"
            aria-label="Start Again"
            {...activationKeys}
            ref={resetButtonRef}
            className="try-again-button"
            onClick={handleReset}
          >
            Start Again ↻
          </button>

          <button
            type="button"
            aria-label="Show Answer"
            {...activationKeys}
            onClick={handleShow}
            className="show-answer-btn"
          >
            Show Answer
          </button>

          <button
            type="button"
            aria-label="Check Answer"
            {...activationKeys}
            disabled={locked}
            style={{ cursor: locked ? "not-allowed" : "pointer" }}
            className="check-button2"
            onClick={handleCheck}
          >
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review2_Page2_Q1;
