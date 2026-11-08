import { SentencePart } from "./SentenceAudio";
import clip0 from "../../../assets/audio/ClassBook/U2/Page 14 - B/Item_001_fast.mp3";
import clip1 from "../../../assets/audio/ClassBook/U2/Page 14 - B/Item_002_Not_so_fast.mp3";
import clip2 from "../../../assets/audio/ClassBook/U2/Page 14 - B/Item_003_first_thing.mp3";
import clip3 from "../../../assets/audio/ClassBook/U2/Page 14 - B/Item_004_couple.mp3";
import clip4 from "../../../assets/audio/ClassBook/U2/Page 14 - B/Item_005_crazy.mp3";
import clip5 from "../../../assets/audio/ClassBook/U2/Page 14 - B/Item_006_begs.mp3";
import clip6 from "../../../assets/audio/ClassBook/U2/Page 14 - B/Item_007_merry-go-round.mp3";
import clip7 from "../../../assets/audio/ClassBook/U2/Page 14 - B/Item_008_few.mp3";
import clip8 from "../../../assets/audio/ClassBook/U2/Page 14 - B/Item_009_keep_my_feet_on_the_ground.mp3";
import clip9 from "../../../assets/audio/ClassBook/U2/Page 14 - B/Item_010_Lynn_is_a_girl_who_likes_,_rides,_but_her_friend_Stacy_likes_the_slow_ri.mp3";
import clip10 from "../../../assets/audio/ClassBook/U2/Page 14 - B/Item_011_They_decide_to_go_to_the_carnival_that_is_in_town.mp3";
import clip11 from "../../../assets/audio/ClassBook/U2/Page 14 - B/Item_012_The_they_do_is_buy_a_tickets_for_a_of_the_rides.mp3";
import clip12 from "../../../assets/audio/ClassBook/U2/Page 14 - B/Item_013_Lynn_Stacy_to_go_on_the_Ferris_wheel_with_her,_but_Stacy_says,_!.mp3";
import clip13 from "../../../assets/audio/ClassBook/U2/Page 14 - B/Item_014_I_like_to_,_so_let's_go_on_the_first.mp3";
import clip14 from "../../../assets/audio/ClassBook/U2/Page 14 - B/Item_015_It_goes_in_circles_like_the_Ferris_wheel,_but_it's_slow.mp3";
import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import ExerciseHeader from "../../ExerciseHeader";
import BankDragItem from "./BankDragItem";
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

const Unit2_Page5_Q2 = () => {
  const audio = useExerciseAudio();
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

  const resetButtonRef = useRef(null),
    chipRefs = useRef({}),
    slotRefs = useRef({}),
    focusFrame = useRef(null);
  const [pickedWord, setPickedWord] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState(Array(9).fill(""));
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  // 🎯 DRAG
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

  // ✅ CHECK
  const options = words;
  const listenWord = (word) =>
    audio.play(
      "bank-" + word,
      [clip0, clip1, clip2, clip3, clip4, clip5, clip6, clip7, clip8][
        words.indexOf(word)
      ],
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
      setAnnouncement("Please complete all fields.");
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
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // 👁️ SHOW
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
    setAnswers(Array(correct.length).fill(""));
    setResult([]);
    setLocked(false);
  };
  const getDropClass = (i) =>
    `relative inline-block min-w-[90px] mx-1 text-center text-[#6D2980] h-[30px]
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

  return (
    <DragDropContext
      enableDefaultSensors={false}
      sensors={[useMouseSensor, useTouchSensor]}
      onBeforeDragStart={() => {
        cancelChoice();
        setDragging(true);
      }}
      onDragEnd={onDragEnd}
    >
      <div
        data-exercise-scope="Unit2_Page5_Q2.jsx"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <AudioFeedback audio={audio} />
        <style>{`[data-exercise-scope="Unit2_Page5_Q2.jsx"] input:focus-visible,[data-exercise-scope="Unit2_Page5_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Unit2_Page5_Q2.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
        <div
          className="sr-only"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {announcement}
        </div>
        <div className="div-forall" style={{gap:"25px"}}>
          <ExerciseHeader
            sectionLetter="B"
            title={
              <>Using the words and phrases in the box, finish the story.</>
            }
            subTitle="Read the whole sentence first, then choose the word that fits both the meaning and grammar before checking."
          />

          {/* 🟣 WORD BANK */}
          <Droppable droppableId="bank" direction="horizontal" isDropDisabled>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-wrap gap-3  rounded-xl items-center justify-center"
              >
                {words.map((w, i) => {
                  const used = wordUsed(w);

                  return (
                    <Draggable
                      key={w}
                      draggableId={`word-${w}`}
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
                              opacity: used ? 0.5 : 1,
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
                            className="px-3 py-1 bg-white rounded-lg border cursor-pointer whitespace-nowrap"
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

          {/* 📝 STORY */}
          <div className="text-[18px] leading-9 flex flex-col gap-6 mt-1 mb-7">
            {/* LINE 1 */}
            <div>
              <SentencePart first={true}
                tabIndex={pickedWord ? -1 : 0}
                audio={audio}
                id="sentence-clip9"
                src={clip9}
                label="Hear the sentence: Lynn is a girl who likes blank, blank rides, but her friend Stacy likes the slow rides."
              >
                Lynn is a girl who likes
              </SentencePart>{" "}
              <Droppable isDropDisabled={slotLocked(0)} droppableId="0">
                {(p, snapshot) => (
                  <span title={("Story blank 1, after Lynn likes. ") + (`Blank ${0 + 1}. ${answers[0] || "Empty"}.${slotLocked(0) ? " Correct and locked." : result[0] === false ? " Not correct." : ""}`)}
                    style={dropStyle(0, snapshot, {})}
                    role="button"
                    tabIndex={pickedWord && slotLocked(0) ? -1 : 0}
                    data-choice
                    aria-disabled={slotLocked(0)}
                    aria-label={("Story blank 1, after Lynn likes. ") + (`Blank ${0 + 1}. ${answers[0] || "Empty"}.${slotLocked(0) ? " Correct and locked." : result[0] === false ? " Not correct." : ""}`)}
                    onKeyDown={(event) => slotKey(event, 0)}
                    onKeyUp={activationKeys.onKeyUp}
                    onClick={() => returnWord(0)}
                    ref={(element) => {
                      p.innerRef(element);
                      slotRefs.current[0] = element;
                    }}
                    {...p.droppableProps}
                    className={getDropClass(0)}
                  >
                    {answers[0]}
                    <span style={{ display: "none" }} aria-hidden="true">
                      {p.placeholder}
                    </span>
                    {renderX(0)}
                  </span>
                )}
              </Droppable>
              ,{" "}
              <Droppable isDropDisabled={slotLocked(1)} droppableId="1">
                {(p, snapshot) => (
                  <span title={("Story blank 2, before rides. ") + (`Blank ${1 + 1}. ${answers[1] || "Empty"}.${slotLocked(1) ? " Correct and locked." : result[1] === false ? " Not correct." : ""}`)}
                    style={dropStyle(1, snapshot, {})}
                    role="button"
                    tabIndex={pickedWord && slotLocked(1) ? -1 : 0}
                    data-choice
                    aria-disabled={slotLocked(1)}
                    aria-label={("Story blank 2, before rides. ") + (`Blank ${1 + 1}. ${answers[1] || "Empty"}.${slotLocked(1) ? " Correct and locked." : result[1] === false ? " Not correct." : ""}`)}
                    onKeyDown={(event) => slotKey(event, 1)}
                    onKeyUp={activationKeys.onKeyUp}
                    onClick={() => returnWord(1)}
                    ref={(element) => {
                      p.innerRef(element);
                      slotRefs.current[1] = element;
                    }}
                    {...p.droppableProps}
                    className={getDropClass(1)}
                  >
                    {answers[1]}
                    <span style={{ display: "none" }} aria-hidden="true">
                      {p.placeholder}
                    </span>
                    {renderX(1)}
                  </span>
                )}
              </Droppable>{" "}
              <SentencePart first={false}
                tabIndex={pickedWord ? -1 : 0}
                audio={audio}
                id="sentence-clip9"
                src={clip9}
                label="Hear the sentence: Lynn is a girl who likes blank, blank rides, but her friend Stacy likes the slow rides."
              >
                rides, but her friend Stacy likes the
              </SentencePart>
            </div>

            {/* LINE 2 */}
            <div>
              <SentencePart first={false}
                tabIndex={pickedWord ? -1 : 0}
                audio={audio}
                id="sentence-clip9"
                src={clip9}
                label="Hear the sentence: Lynn is a girl who likes blank, blank rides, but her friend Stacy likes the slow rides."
              >
                slow rides.
              </SentencePart>{" "}
              <SentencePart first={true}
                tabIndex={pickedWord ? -1 : 0}
                audio={audio}
                id="sentence-clip10"
                src={clip10}
                label="Hear the sentence: They decide to go to the carnival that is in town."
              >
                They decide to go to the carnival that is in town.
              </SentencePart>{" "}
              <SentencePart first={true}
                tabIndex={pickedWord ? -1 : 0}
                audio={audio}
                id="sentence-clip11"
                src={clip11}
                label="Hear the sentence: The blank they do is buy a blank tickets for a blank of the rides."
              >
                The
              </SentencePart>{" "}
              <Droppable isDropDisabled={slotLocked(2)} droppableId="2">
                {(p, snapshot) => (
                  <span title={("Story blank 3, before they do is buy. ") + (`Blank ${2 + 1}. ${answers[2] || "Empty"}.${slotLocked(2) ? " Correct and locked." : result[2] === false ? " Not correct." : ""}`)}
                    style={dropStyle(2, snapshot, {})}
                    role="button"
                    tabIndex={pickedWord && slotLocked(2) ? -1 : 0}
                    data-choice
                    aria-disabled={slotLocked(2)}
                    aria-label={("Story blank 3, before they do is buy. ") + (`Blank ${2 + 1}. ${answers[2] || "Empty"}.${slotLocked(2) ? " Correct and locked." : result[2] === false ? " Not correct." : ""}`)}
                    onKeyDown={(event) => slotKey(event, 2)}
                    onKeyUp={activationKeys.onKeyUp}
                    onClick={() => returnWord(2)}
                    ref={(element) => {
                      p.innerRef(element);
                      slotRefs.current[2] = element;
                    }}
                    {...p.droppableProps}
                    className={getDropClass(2)}
                  >
                    {answers[2]}
                    <span style={{ display: "none" }} aria-hidden="true">
                      {p.placeholder}
                    </span>
                    {renderX(2)}
                  </span>
                )}
              </Droppable>{" "}
              <SentencePart first={false}
                tabIndex={pickedWord ? -1 : 0}
                audio={audio}
                id="sentence-clip11"
                src={clip11}
                label="Hear the sentence: The blank they do is buy a blank tickets for a blank of the rides."
              >
                they
              </SentencePart>
            </div>

            {/* LINE 3 */}
            <div>
              <SentencePart first={false}
                tabIndex={pickedWord ? -1 : 0}
                audio={audio}
                id="sentence-clip11"
                src={clip11}
                label="Hear the sentence: The blank they do is buy a blank tickets for a blank of the rides."
              >
                do is buy a
              </SentencePart>{" "}
              <Droppable isDropDisabled={slotLocked(3)} droppableId="3">
                {(p, snapshot) => (
                  <span title={("Story blank 4, before tickets. ") + (`Blank ${3 + 1}. ${answers[3] || "Empty"}.${slotLocked(3) ? " Correct and locked." : result[3] === false ? " Not correct." : ""}`)}
                    style={dropStyle(3, snapshot, {})}
                    role="button"
                    tabIndex={pickedWord && slotLocked(3) ? -1 : 0}
                    data-choice
                    aria-disabled={slotLocked(3)}
                    aria-label={("Story blank 4, before tickets. ") + (`Blank ${3 + 1}. ${answers[3] || "Empty"}.${slotLocked(3) ? " Correct and locked." : result[3] === false ? " Not correct." : ""}`)}
                    onKeyDown={(event) => slotKey(event, 3)}
                    onKeyUp={activationKeys.onKeyUp}
                    onClick={() => returnWord(3)}
                    ref={(element) => {
                      p.innerRef(element);
                      slotRefs.current[3] = element;
                    }}
                    {...p.droppableProps}
                    className={getDropClass(3)}
                  >
                    {answers[3]}
                    <span style={{ display: "none" }} aria-hidden="true">
                      {p.placeholder}
                    </span>
                    {renderX(3)}
                  </span>
                )}
              </Droppable>{" "}
              <SentencePart first={false}
                tabIndex={pickedWord ? -1 : 0}
                audio={audio}
                id="sentence-clip11"
                src={clip11}
                label="Hear the sentence: The blank they do is buy a blank tickets for a blank of the rides."
              >
                tickets for a
              </SentencePart>{" "}
              <Droppable isDropDisabled={slotLocked(4)} droppableId="4">
                {(p, snapshot) => (
                  <span title={("Story blank 5, before of the rides. ") + (`Blank ${4 + 1}. ${answers[4] || "Empty"}.${slotLocked(4) ? " Correct and locked." : result[4] === false ? " Not correct." : ""}`)}
                    style={dropStyle(4, snapshot, {})}
                    role="button"
                    tabIndex={pickedWord && slotLocked(4) ? -1 : 0}
                    data-choice
                    aria-disabled={slotLocked(4)}
                    aria-label={("Story blank 5, before of the rides. ") + (`Blank ${4 + 1}. ${answers[4] || "Empty"}.${slotLocked(4) ? " Correct and locked." : result[4] === false ? " Not correct." : ""}`)}
                    onKeyDown={(event) => slotKey(event, 4)}
                    onKeyUp={activationKeys.onKeyUp}
                    onClick={() => returnWord(4)}
                    ref={(element) => {
                      p.innerRef(element);
                      slotRefs.current[4] = element;
                    }}
                    {...p.droppableProps}
                    className={getDropClass(4)}
                  >
                    {answers[4]}
                    <span style={{ display: "none" }} aria-hidden="true">
                      {p.placeholder}
                    </span>
                    {renderX(4)}
                  </span>
                )}
              </Droppable>{" "}
              <SentencePart first={false}
                tabIndex={pickedWord ? -1 : 0}
                audio={audio}
                id="sentence-clip11"
                src={clip11}
                label="Hear the sentence: The blank they do is buy a blank tickets for a blank of the rides."
              >
                of the rides.
              </SentencePart>{" "}
              <SentencePart first={true}
                tabIndex={pickedWord ? -1 : 0}
                audio={audio}
                id="sentence-clip12"
                src={clip12}
                label="Hear the sentence: Lynn blank Stacy to go on the Ferris wheel with her, but Stacy says, blank!"
              >
                Lynn
              </SentencePart>{" "}
              <Droppable isDropDisabled={slotLocked(5)} droppableId="5">
                {(p, snapshot) => (
                  <span title={("Story blank 6, before Stacy to go on the Ferris wheel. ") + (`Blank ${5 + 1}. ${answers[5] || "Empty"}.${slotLocked(5) ? " Correct and locked." : result[5] === false ? " Not correct." : ""}`)}
                    style={dropStyle(5, snapshot, {})}
                    role="button"
                    tabIndex={pickedWord && slotLocked(5) ? -1 : 0}
                    data-choice
                    aria-disabled={slotLocked(5)}
                    aria-label={("Story blank 6, before Stacy to go on the Ferris wheel. ") + (`Blank ${5 + 1}. ${answers[5] || "Empty"}.${slotLocked(5) ? " Correct and locked." : result[5] === false ? " Not correct." : ""}`)}
                    onKeyDown={(event) => slotKey(event, 5)}
                    onKeyUp={activationKeys.onKeyUp}
                    onClick={() => returnWord(5)}
                    ref={(element) => {
                      p.innerRef(element);
                      slotRefs.current[5] = element;
                    }}
                    {...p.droppableProps}
                    className={getDropClass(5)}
                  >
                    {answers[5]}
                    <span style={{ display: "none" }} aria-hidden="true">
                      {p.placeholder}
                    </span>
                    {renderX(5)}
                  </span>
                )}
              </Droppable>{" "}
              <SentencePart first={false}
                tabIndex={pickedWord ? -1 : 0}
                audio={audio}
                id="sentence-clip12"
                src={clip12}
                label="Hear the sentence: Lynn blank Stacy to go on the Ferris wheel with her, but Stacy says, blank!"
              >
                Stacy to
              </SentencePart>
            </div>

            {/* LINE 4 */}
            <div>
              <SentencePart first={false}
                tabIndex={pickedWord ? -1 : 0}
                audio={audio}
                id="sentence-clip12"
                src={clip12}
                label="Hear the sentence: Lynn blank Stacy to go on the Ferris wheel with her, but Stacy says, blank!"
              >
                go on the Ferris wheel with her, but Stacy says,“
              </SentencePart>{" "}
              <Droppable isDropDisabled={slotLocked(6)} droppableId="6">
                {(p, snapshot) => (
                  <span title={("Story blank 7, before the exclamation mark in Stacy's reply. ") + (`Blank ${6 + 1}. ${answers[6] || "Empty"}.${slotLocked(6) ? " Correct and locked." : result[6] === false ? " Not correct." : ""}`)}
                    style={dropStyle(6, snapshot, {})}
                    role="button"
                    tabIndex={pickedWord && slotLocked(6) ? -1 : 0}
                    data-choice
                    aria-disabled={slotLocked(6)}
                    aria-label={("Story blank 7, before the exclamation mark in Stacy's reply. ") + (`Blank ${6 + 1}. ${answers[6] || "Empty"}.${slotLocked(6) ? " Correct and locked." : result[6] === false ? " Not correct." : ""}`)}
                    onKeyDown={(event) => slotKey(event, 6)}
                    onKeyUp={activationKeys.onKeyUp}
                    onClick={() => returnWord(6)}
                    ref={(element) => {
                      p.innerRef(element);
                      slotRefs.current[6] = element;
                    }}
                    {...p.droppableProps}
                    className={getDropClass(6)}
                  >
                    {answers[6]}
                    <span style={{ display: "none" }} aria-hidden="true">
                      {p.placeholder}
                    </span>
                    {renderX(6)}
                  </span>
                )}
              </Droppable>{" "}
              !”
            </div>

            {/* LINE 5 */}
            <div>
              <SentencePart first={true}
                tabIndex={pickedWord ? -1 : 0}
                audio={audio}
                id="sentence-clip13"
                src={clip13}
                label="Hear the sentence: I like to blank, so let’s go on the blank first."
              >
                I like to
              </SentencePart>{" "}
              <Droppable isDropDisabled={slotLocked(7)} droppableId="7">
                {(p, snapshot) => (
                  <span title={("Story blank 8, after I like to. ") + (`Blank ${7 + 1}. ${answers[7] || "Empty"}.${slotLocked(7) ? " Correct and locked." : result[7] === false ? " Not correct." : ""}`)}
                    style={dropStyle(7, snapshot, {})}
                    role="button"
                    tabIndex={pickedWord && slotLocked(7) ? -1 : 0}
                    data-choice
                    aria-disabled={slotLocked(7)}
                    aria-label={("Story blank 8, after I like to. ") + (`Blank ${7 + 1}. ${answers[7] || "Empty"}.${slotLocked(7) ? " Correct and locked." : result[7] === false ? " Not correct." : ""}`)}
                    onKeyDown={(event) => slotKey(event, 7)}
                    onKeyUp={activationKeys.onKeyUp}
                    onClick={() => returnWord(7)}
                    ref={(element) => {
                      p.innerRef(element);
                      slotRefs.current[7] = element;
                    }}
                    {...p.droppableProps}
                    className={getDropClass(7)}
                  >
                    {answers[7]}
                    <span style={{ display: "none" }} aria-hidden="true">
                      {p.placeholder}
                    </span>
                    {renderX(7)}
                  </span>
                )}
              </Droppable>
              ,{" "}
              <SentencePart first={false}
                tabIndex={pickedWord ? -1 : 0}
                audio={audio}
                id="sentence-clip13"
                src={clip13}
                label="Hear the sentence: I like to blank, so let’s go on the blank first."
              >
                so let’s go on the
              </SentencePart>{" "}
              <Droppable isDropDisabled={slotLocked(8)} droppableId="8">
                {(p, snapshot) => (
                  <span title={("Story blank 9, after let's go on the. ") + (`Blank ${8 + 1}. ${answers[8] || "Empty"}.${slotLocked(8) ? " Correct and locked." : result[8] === false ? " Not correct." : ""}`)}
                    style={dropStyle(8, snapshot, {})}
                    role="button"
                    tabIndex={pickedWord && slotLocked(8) ? -1 : 0}
                    data-choice
                    aria-disabled={slotLocked(8)}
                    aria-label={("Story blank 9, after let's go on the. ") + (`Blank ${8 + 1}. ${answers[8] || "Empty"}.${slotLocked(8) ? " Correct and locked." : result[8] === false ? " Not correct." : ""}`)}
                    onKeyDown={(event) => slotKey(event, 8)}
                    onKeyUp={activationKeys.onKeyUp}
                    onClick={() => returnWord(8)}
                    ref={(element) => {
                      p.innerRef(element);
                      slotRefs.current[8] = element;
                    }}
                    {...p.droppableProps}
                    className={getDropClass(8)}
                  >
                    {answers[8]}
                    <span style={{ display: "none" }} aria-hidden="true">
                      {p.placeholder}
                    </span>
                    {renderX(8)}
                  </span>
                )}
              </Droppable>{" "}
            </div>
            <div>
              <SentencePart first={false}
                tabIndex={pickedWord ? -1 : 0}
                audio={audio}
                id="sentence-clip13"
                src={clip13}
                label="Hear the sentence: I like to blank, so let’s go on the blank first."
              >
                first.
              </SentencePart>{" "}
              <SentencePart first={true}
                tabIndex={pickedWord ? -1 : 0}
                audio={audio}
                id="sentence-clip14"
                src={clip14}
                label="Hear the sentence: It goes in circles like the Ferris wheel, but it’s slow."
              >
                It goes in circles like the Ferris wheel, but it’s slow.”
              </SentencePart>
            </div>
          </div>
          {/* Buttons */}
          <div className="action-buttons-container">
            <button
              type="button"
              aria-label="Start Again"
              {...activationKeys}
              ref={resetButtonRef}
              onClick={handleReset}
              className="try-again-button"
            >
              Start Again ↻
            </button>
            <button
              type="button"
              aria-label="Show Answer"
              {...activationKeys}
              onClick={handleShow}
              className="show-answer-btn swal-continue"
            >
              Show Answer
            </button>
            <button
              type="button"
              aria-label="Check Answer"
              {...activationKeys}
              onClick={handleCheck}
              disabled={locked}
              style={{ cursor: locked ? "not-allowed" : "pointer" }}
              className="check-button2"
            >
              Check Answer ✓
            </button>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Unit2_Page5_Q2;
