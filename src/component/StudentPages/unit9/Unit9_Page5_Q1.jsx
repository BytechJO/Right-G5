/* eslint-disable react-refresh/only-export-components */
import clip0 from "../../../assets/audio/ClassBook/U9/Page 80 - A/Item_001_one_syllable.mp3";
import clip1 from "../../../assets/audio/ClassBook/U9/Page 80 - A/Item_002_two_syllables.mp3";
import clip2 from "../../../assets/audio/ClassBook/U9/Page 80 - A/Item_003_three_syllables.mp3";
import clip3 from "../../../assets/audio/ClassBook/U9/Page 80 - A/Item_004_four_syllables.mp3";
import clip4 from "../../../assets/audio/ClassBook/U9/Page 80 - A/Item_005_five_syllables.mp3";
import clip5 from "../../../assets/audio/ClassBook/U9/Page 80 - A/Item_006_exactly.mp3";
import clip6 from "../../../assets/audio/ClassBook/U9/Page 80 - A/Item_007_stadium.mp3";
import clip7 from "../../../assets/audio/ClassBook/U9/Page 80 - A/Item_008_ring.mp3";
import clip8 from "../../../assets/audio/ClassBook/U9/Page 80 - A/Item_009_rush.mp3";
import clip9 from "../../../assets/audio/ClassBook/U9/Page 80 - A/Item_010_braces.mp3";
import clip10 from "../../../assets/audio/ClassBook/U9/Page 80 - A/Item_011_mowing.mp3";
import clip11 from "../../../assets/audio/ClassBook/U9/Page 80 - A/Item_012_club.mp3";
import clip12 from "../../../assets/audio/ClassBook/U9/Page 80 - A/Item_013_lawns.mp3";
import clip13 from "../../../assets/audio/ClassBook/U9/Page 80 - A/Item_014_congratulations.mp3";
import clip14 from "../../../assets/audio/ClassBook/U9/Page 80 - A/Item_015_appointments.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
  AudioSpeaker,
} from "../unit5/ExerciseAudioText";

import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  pointerWithin,
} from "@dnd-kit/core";
import ValidationAlert from "../../Popup/ValidationAlert";

const activationKeys = {
  onKeyDown(event) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  },
};
const wordSounds = [
  clip5,
  clip6,
  clip7,
  clip8,
  clip9,
  clip10,
  clip11,
  clip12,
  clip13,
  clip14,
];
const categorySounds = [clip0, clip1, clip2, clip3, clip4];
const emptyRows = () => Array.from({ length: 5 }, () => Array(4).fill(""));
// Overlay coordinates are viewport pixels, including the Book's scale and scroll.
const centerOnPointer = ({ transform, activatorEvent, draggingNodeRect }) => {
  if (!draggingNodeRect || activatorEvent?.clientX == null) return transform;
  return {
    ...transform,
    x:
      transform.x +
      activatorEvent.clientX -
      draggingNodeRect.left -
      draggingNodeRect.width / 2,
    y:
      transform.y +
      activatorEvent.clientY -
      draggingNodeRect.top -
      draggingNodeRect.height / 2,
  };
};

function WordTile({
  word,
  id,
  disabled,
  selected,
  used,
  audio,
  onChoose,
  onCancel,
  tileRef,
  tabIndex,
  slot = false,
  feedback,
}) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data: { word },
    disabled,
  });
  const playing = audio.activeId === id;
  return (
    <span
      ref={(node) => {
        setNodeRef(node);
        tileRef?.(node);
      }}
      {...attributes}
      {...listeners}
      {...activationKeys}
      role="button"
      tabIndex={tabIndex}
      data-choice
      data-word={word}
      aria-disabled={disabled}
      aria-pressed={selected}
      aria-label={`${word}. ${feedback === true ? "Correct and locked." : feedback === false ? "Incorrect category. " : ""}${disabled ? "Activate to hear it." : slot ? "Activate to return to the word bank, or drag to another category." : "Select, then choose a category."}`}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          onCancel();
          return;
        }
        if (
          (event.key === "Delete" || event.key === "Backspace") &&
          slot &&
          feedback === false
        ) {
          event.preventDefault();
          event.stopPropagation();
          if (!event.repeat && !disabled) onChoose(false);
          return;
        }
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
          if (!event.repeat) onChoose(true);
        }
      }}
      onClick={(event) => {
        event.stopPropagation();
        onChoose(false);
      }}
      style={{
        position: "relative",
        display: slot ? "block" : "inline-block",
        cursor: disabled ? "pointer" : "grab",
        touchAction: "none",
        borderRadius: 6,
        opacity: used ? 0.4 : 1,
        background: selected || playing ? "#dbeafe" : undefined,
        boxShadow: selected || playing ? "0 0 0 3px #2563eb" : undefined,
        ...(slot
          ? {
              width: "100%",
              minHeight: 32,
              paddingBottom: 4,
              marginBottom: 4,
              borderBottom: `1px solid ${feedback === true ? "#16a34a" : "#E5D9EC"}`,
              color: feedback === false ? "#D1232A" : "#6D2980",
              fontWeight: 600,
              fontSize: 18,
              overflowWrap: "anywhere",
            }
          : {}),
      }}
    >
      {word}
      {feedback === true && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            right: -8,
            top: 0,
            color: "#16a34a",
            fontSize: 14,
          }}
        >
          ?
        </span>
      )}
      {playing && <AudioSpeaker />}
      {feedback === false && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            right: -8,
            top: 0,
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "#ef4444",
            color: "white",
            fontSize: 12,
            textAlign: "center",
            border: "2px solid white",
          }}
        >
          ✕
        </span>
      )}
    </span>
  );
}

function Category({
  index,
  title,
  children,
  locked,
  picked,
  choose,
  cancel,
  categoryRef,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `category-${index}`,
    disabled: locked,
  });
  return (
    <div
      ref={setNodeRef}
      data-category={index}
      role="group"
      aria-label={title}
      style={{
        position: "relative",
        width: "150px",
        minHeight: "195px",
        border: "2px solid #8D3DAF",
        borderRadius: "18px",
        padding: "12px",
        outline: isOver && !locked ? "3px dashed #2563eb" : undefined,
        outlineOffset: 2,
        background: isOver && !locked ? "#dbeafe" : undefined,
      }}
    >
      <button
        ref={categoryRef}
        type="button"
        data-category-choice={index}
        data-choice
        aria-label={`${title}. ${picked ? `Place ${picked} here.` : "Choose a word first."}`}
        aria-disabled={locked}
        {...activationKeys}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            cancel();
          } else activationKeys.onKeyDown(event);
        }}
        onClick={() => choose(index)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          border: 0,
          background: "transparent",
          borderRadius: "inherit",
          cursor: locked ? "not-allowed" : "pointer",
        }}
      />
      {children}
    </div>
  );
}

const Unit9_Page5_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = useRef(null);
  const bankRefs = useRef({});
  const categoryRefs = useRef([]);
  const suppressClick = useRef(false);
  const dragWordRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [inputs, setInputs] = useState(emptyRows);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);
  const [picked, setPicked] = useState(null);
  const [drag, setDrag] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );
  const categories = [
    {
      title: "one syllable",
      answers: ["club", "lawns", "ring", "rush"],
    },
    {
      title: "two syllables",
      answers: ["mowing", "braces"],
    },
    {
      title: "three syllables",
      answers: ["exactly", "appointments", "stadium"],
    },
    {
      title: "four syllables",
      answers: [],
    },
    {
      title: "five syllables",
      answers: ["congratulations"],
    },
  ];

  const words = [
    "exactly",
    "stadium",
    "ring",
    "rush",
    "braces",
    "mowing",
    "club",
    "lawns",
    "congratulations",
    "appointments",
  ];

  const location = (word) => {
    for (let b = 0; b < inputs.length; b++) {
      const i = inputs[b].indexOf(word);
      if (i !== -1) return [b, i];
    }
    return null;
  };
  const wordLocked = (word) => {
    const at = location(word);
    return locked || (at && result[at[0]]?.[at[1]] === true);
  };
  const listen = (word, id) => audio.play(id, wordSounds[words.indexOf(word)]);
  const cancel = () => {
    const word = picked;
    setPicked(null);
    setAnnouncement("Selection cancelled.");
    if (word) bankRefs.current[word]?.focus({ preventScroll: true });
  };
  const chooseWord = (word, keyboard) => {
    if (suppressClick.current) return;
    listen(word, `bank-${word}`);
    if (wordLocked(word)) {
      setAnnouncement(`${word} is correct and locked.`);
      return;
    }
    setPicked(word);
    setAnnouncement(`${word} selected. Choose a category with Enter or Space.`);
    if (keyboard) {
      const target = inputs.findIndex((row) => row.some((value) => !value));
      categoryRefs.current[Math.max(target, 0)]?.focus({ preventScroll: true });
    }
  };
  const place = (box, word = picked, keyboard = false, exactSlot) => {
    if (!word || !words.includes(word) || wordLocked(word) || !categories[box])
      return;
    const from = location(word);
    if (from?.[0] === box && exactSlot == null) {
      setAnnouncement(`${word} is already in ${categories[box].title}.`);
      setPicked(null);
      return;
    }
    const index = exactSlot ?? inputs[box].findIndex((value) => !value);
    if (index < 0 || result[box]?.[index] === true) {
      setAnnouncement(
        `${categories[box].title} is full. Return a word to the bank first.`,
      );
      return;
    }
    const next = inputs.map((row) => [...row]);
    if (from) next[from[0]][from[1]] = "";
    next[box][index] = word;
    const feedback = result.map((row) => (row ? [...row] : row));
    if (from && feedback[from[0]]) feedback[from[0]][from[1]] = undefined;
    if (feedback[box]) feedback[box][index] = undefined;
    setInputs(next);
    setResult(feedback);
    setPicked(null);
    setAnnouncement(`${word} placed in ${categories[box].title}.`);
    if (keyboard) {
      const nextWord = words.find((w) => !next.flat().includes(w)) || word;
      bankRefs.current[nextWord]?.focus({ preventScroll: true });
    }
  };
  const returnWord = (b, i, keyboard) => {
    const word = inputs[b][i];
    if (suppressClick.current || !word) return;
    listen(word, `slot-${b}-${i}`);
    if (wordLocked(word)) {
      setAnnouncement(`${word} is correct and locked.`);
      return;
    }
    if (keyboard && picked) {
      place(b, picked, true, i);
      return;
    }
    setInputs(
      inputs.map((row, box) =>
        row.map((value, slot) => (box === b && slot === i ? "" : value)),
      ),
    );
    setResult(
      result.map((row, box) =>
        row?.map((value, slot) =>
          box === b && slot === i ? undefined : value,
        ),
      ),
    );
    setAnnouncement(`${word} returned to the word bank.`);
    if (keyboard) bankRefs.current[word]?.focus({ preventScroll: true });
  };
  const checkAnswers = () => {
    if (locked) return;
    audio.stop();
    setPicked(null);
    dragWordRef.current = null;
    setDrag(null);
    if (inputs.flat().filter(Boolean).length < words.length) {
      setAnnouncement(
        "Please sort all ten words. Unused slots may stay empty.",
      );
      ValidationAlert.info(
        "Please sort all ten words. Unused slots may stay empty.",
      );
      return;
    }
    const feedback = inputs.map((row, b) =>
      row.map((word) =>
        word ? categories[b].answers.includes(word) : undefined,
      ),
    );
    const score = feedback.flat().filter((value) => value === true).length;
    const complete = score === words.length;
    setResult(feedback);
    setLocked(complete);
    if (complete) resetButtonRef.current?.focus({ preventScroll: true });
    setAnnouncement(
      `Score ${score} out of ${words.length}. ` +
        inputs
          .flatMap((row, b) =>
            row
              .filter(Boolean)
              .map(
                (word) =>
                  `${word}: ${categories[b].title}, ${categories[b].answers.includes(word) ? "correct and locked" : "incorrect; choose another category"}.`,
              ),
          )
          .join(" "),
    );
    const color = complete ? "green" : score === 0 ? "red" : "orange";
    const message = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${score} / ${words.length}</span></div>`;
    if (complete) ValidationAlert.success(message);
    else if (!score) ValidationAlert.error(message);
    else ValidationAlert.warning(message);
  };
  const showAnswers = () => {
    audio.stop();
    setPicked(null);
    dragWordRef.current = null;
    setDrag(null);
    setInputs(
      categories.map((cat) =>
        Array.from({ length: 4 }, (_, i) => cat.answers[i] || ""),
      ),
    );
    setResult(
      categories.map((cat) =>
        Array.from({ length: 4 }, (_, i) =>
          i < cat.answers.length ? true : undefined,
        ),
      ),
    );
    setLocked(true);
    resetButtonRef.current?.focus({ preventScroll: true });
    setAnnouncement("Model answers shown and locked.");
  };
  const handleReset = () => {
    audio.stop();
    setPicked(null);
    dragWordRef.current = null;
    setDrag(null);
    setInputs(emptyRows());
    setResult([]);
    setLocked(false);
    setAnnouncement("Answers and feedback cleared.");
  };
  const finishDrag = (event) => {
    setDrag(null);
    if (dragWordRef.current !== event.active.data.current?.word) return;
    dragWordRef.current = null;
    if (event.over && event.active.data.current?.word) {
      const box = Number(String(event.over.id).replace("category-", ""));
      place(box, event.active.data.current.word);
    } else setAnnouncement("Drag cancelled. The word has not moved.");
  };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={(event) => {
        setPicked(null);
        suppressClick.current = true;
        const word = event.active.data.current.word;
        dragWordRef.current = word;
        const node = event.activatorEvent.target.closest("[data-word]");
        const rect = node.getBoundingClientRect();
        const style = getComputedStyle(node);
        const scale = rect.height / node.offsetHeight;
        setDrag({
          word,
          width: rect.width,
          height: rect.height,
          fontSize: parseFloat(style.fontSize) * scale,
          fontWeight: style.fontWeight,
          lineHeight: `${parseFloat(style.lineHeight) * scale}px`,
          color: style.color,
        });
        listen(word, event.active.id);
        setAnnouncement(`${word} picked up. Drop it in a category.`);
      }}
      onDragEnd={finishDrag}
      onDragCancel={() => {
        dragWordRef.current = null;
        setDrag(null);
        setAnnouncement("Drag cancelled. The word has not moved.");
      }}
    >
      <div
        data-exercise-scope="Unit9_Page5_Q1.jsx"
        className="flex flex-col items-center p-[30px]"
        onPointerDownCapture={() => {
          suppressClick.current = false;
        }}
        onKeyDownCapture={(event) => {
          if (event.key === "Enter" || event.key === " ")
            suppressClick.current = false;
        }}
      >
        <AudioFeedback audio={audio} />
        <style>{`[data-exercise-scope="Unit9_Page5_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;}[data-exercise-scope="Unit9_Page5_Q1.jsx"] [data-category]:has(>button:focus-visible){outline:4px solid #2563eb;outline-offset:3px;}[data-exercise-scope="Unit9_Page5_Q1.jsx"] [data-category]>button:focus-visible{outline:none!important;}`}</style>
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {announcement}
        </div>
        <p id="u9-sort-help" className="sr-only">
          Select a word, then select its category. Enter and Space select and
          place. Escape cancels. Activate an editable placed word to return it
          to the bank, or drag it to another category. Correct checked words are
          locked. Delete and Backspace remove only incorrect checked words.
        </p>
        <div className="div-forall" style={{ gap: "30px" }}>
          <ExerciseHeader
            sectionLetter="A"
            title={
              <>
                Put the vocabulary words into the right groups. One box will be
                blank.
              </>
            }
            subTitle="Sort one word at a time by meaning, and recheck each group before submitting your answer."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12 justify-items-center">
            {categories.map((cat, b) => (
              <div key={cat.title} className="flex flex-col items-center">
                <div
                  style={{
                    background: "#E9E1EC",
                    borderRadius: "10px",
                    padding: "8px 18px",
                    marginBottom: "10px",
                    fontSize: "18px",
                  }}
                >
                  <AudioText
                    audio={audio}
                    id={`category-${b}`}
                    src={categorySounds[b]}
                    label={`Hear ${cat.title}`}
                    tabIndex={picked ? -1 : 0}
                  >
                    {cat.title}
                  </AudioText>
                </div>
                <Category
                  index={b}
                  title={cat.title}
                  locked={locked}
                  picked={picked}
                  cancel={cancel}
                  categoryRef={(node) => {
                    categoryRefs.current[b] = node;
                  }}
                  choose={(box) =>
                    place(
                      box,
                      picked,
                      document.activeElement === categoryRefs.current[box],
                    )
                  }
                >
                  {inputs[b].map((word, i) =>
                    word ? (
                      <WordTile
                        key={i}
                        id={`slot-${b}-${i}`}
                        word={word}
                        slot
                        feedback={result[b]?.[i]}
                        disabled={wordLocked(word)}
                        selected={false}
                        audio={audio}
                        tabIndex={picked ? -1 : 0}
                        onCancel={cancel}
                        onChoose={(keyboard) => returnWord(b, i, keyboard)}
                      />
                    ) : (
                      <div
                        key={i}
                        aria-hidden="true"
                        style={{
                          height: 32,
                          paddingBottom: 4,
                          marginBottom: 4,
                          borderBottom: "1px solid #E5D9EC",
                          pointerEvents: "none",
                        }}
                      />
                    ),
                  )}
                </Category>
              </div>
            ))}
          </div>
          <div
            className="grid grid-cols-5 gap-y-5 gap-x-10 text-[18px]"
            style={{ width: "760px", margin: "0 auto" }}
            role="group"
            aria-label="Word bank"
            aria-describedby="u9-sort-help"
          >
            {words.map((word) => (
              <div key={word}>
                <WordTile
                  word={word}
                  id={`bank-${word}`}
                  disabled={wordLocked(word)}
                  used={!!location(word)}
                  selected={picked === word}
                  audio={audio}
                  tabIndex={picked ? -1 : 0}
                  tileRef={(node) => {
                    bankRefs.current[word] = node;
                  }}
                  onCancel={cancel}
                  onChoose={(keyboard) => chooseWord(word, keyboard)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="action-buttons-container">
          <button
            {...activationKeys}
            ref={resetButtonRef}
            aria-label="Start Again"
            type="button"
            className="try-again-button"
            onClick={handleReset}
          >
            Start Again ↻
          </button>
          <button
            {...activationKeys}
            aria-label="Show Answer"
            type="button"
            className="show-answer-btn"
            onClick={showAnswers}
          >
            Show Answer
          </button>
          <button
            {...activationKeys}
            disabled={locked}
            aria-label="Check Answer"
            type="button"
            className="check-button2"
            style={{ cursor: locked ? "not-allowed" : "pointer" }}
            onClick={checkAnswers}
          >
            Check Answer ✓
          </button>
        </div>
      </div>
      {typeof document !== "undefined" &&
        createPortal(
          <DragOverlay
            adjustScale={false}
            dropAnimation={null}
            modifiers={[centerOnPointer]}
            zIndex={100000}
          >
            {drag && (
              <span
                aria-hidden="true"
                style={{
                  display: "block",
                  width: drag.width,
                  height: drag.height,
                  fontSize: drag.fontSize,
                  fontWeight: drag.fontWeight,
                  lineHeight: drag.lineHeight,
                  color: drag.color,
                  background: "white",
                  borderRadius: 6,
                  boxShadow: "0 0 0 2px #2563eb",
                  overflowWrap: "anywhere",
                  pointerEvents: "none",
                }}
              >
                {drag.word}
              </span>
            )}
          </DragOverlay>,
          document.fullscreenElement || document.body,
        )}
    </DndContext>
  );
};
export default Unit9_Page5_Q1;
