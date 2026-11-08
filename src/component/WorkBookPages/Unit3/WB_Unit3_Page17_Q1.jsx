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
  MeasuringStrategy,
} from "@dnd-kit/core";
import soundD16 from "../../../assets/audio/Workbook/Unit 3/Page 17 - D/Item_016_narrow.mp3";
import soundD15 from "../../../assets/audio/Workbook/Unit 3/Page 17 - D/Item_015_young.mp3";
import soundD14 from "../../../assets/audio/Workbook/Unit 3/Page 17 - D/Item_014_sad.mp3";
import soundD13 from "../../../assets/audio/Workbook/Unit 3/Page 17 - D/Item_013_wide.mp3";
import soundD12 from "../../../assets/audio/Workbook/Unit 3/Page 17 - D/Item_012_cheerful.mp3";
import soundD11 from "../../../assets/audio/Workbook/Unit 3/Page 17 - D/Item_011_old.mp3";
import soundD10 from "../../../assets/audio/Workbook/Unit 3/Page 17 - D/Item_010_low.mp3";
import soundD9 from "../../../assets/audio/Workbook/Unit 3/Page 17 - D/Item_009_loud.mp3";
import soundD8 from "../../../assets/audio/Workbook/Unit 3/Page 17 - D/Item_008_near.mp3";
import soundD7 from "../../../assets/audio/Workbook/Unit 3/Page 17 - D/Item_007_high.mp3";
import soundD6 from "../../../assets/audio/Workbook/Unit 3/Page 17 - D/Item_006_shallow.mp3";
import soundD5 from "../../../assets/audio/Workbook/Unit 3/Page 17 - D/Item_005_tall.mp3";
import soundD4 from "../../../assets/audio/Workbook/Unit 3/Page 17 - D/Item_004_quiet.mp3";
import soundD3 from "../../../assets/audio/Workbook/Unit 3/Page 17 - D/Item_003_deep.mp3";
import soundD2 from "../../../assets/audio/Workbook/Unit 3/Page 17 - D/Item_002_short.mp3";
import soundD1 from "../../../assets/audio/Workbook/Unit 3/Page 17 - D/Item_001_far.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import {
  AudioFeedback,
  AudioSpeaker,
} from "../../StudentPages/unit5/ExerciseAudioText";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
class ExercisePointerSensor extends PointerSensor {
  constructor(props) {
    super(props);
    this.pointerId = props.event.pointerId;
    this.sensorRef = props.options.sensorRef;
    this.sensorRef.current = this;
  }
  release() {
    if (this.sensorRef?.current === this) this.sensorRef.current = null;
  }
  handleMove(event) {
    if (event.pointerId === this.pointerId) super.handleMove(event);
  }
  handleEnd(event) {
    if (event.pointerId !== this.pointerId) return;
    this.release();
    super.handleEnd(event);
  }
  handleCancel(event) {
    if (event?.pointerId != null && event.pointerId !== this.pointerId) return;
    this.release();
    super.handleCancel(event);
  }
  cancel() {
    this.handleCancel();
  }
}
const centerOnPointer = ({ transform }, drag, pointer) =>
  !drag || !pointer
    ? transform
    : {
        ...transform,
        x: pointer.clientX - drag.left - drag.width / 2,
        y: pointer.clientY - drag.top - drag.height / 2,
      };
// eslint-disable-next-line react-refresh/only-export-components -- Local exercise helper.
function BankTile({
  item,
  disabled,
  used,
  selected,
  audio,
  src,
  choose,
  cancel,
  tileRef,
  suppressClick,
  tabIndex,
  helpId,
  className,
}) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: "bank-" + item,
    data: {
      item,
    },
    disabled,
  });
  const playing = audio.activeId === "bank-" + item;
  return (
    <span
      ref={(node) => {
        setNodeRef(node);
        tileRef(node);
      }}
      {...attributes}
      {...listeners}
      {...activationKeys}
      className={className}
      role="button"
      tabIndex={tabIndex}
      data-choice
      data-drag-item={item}
      aria-describedby={helpId}
      aria-disabled={disabled}
      aria-pressed={selected}
      aria-label={
        item +
        ". " +
        (disabled
          ? "Already placed or locked. " + (src ? "Activate to hear it." : "")
          : "Select, then activate an answer slot, or drag to a slot.")
      }
      onClick={(event) => {
        event.stopPropagation();
        if (!suppressClick.current) choose(item, event.detail === 0);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          cancel();
        } else activationKeys.onKeyDown(event);
      }}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-start",
        boxSizing: "border-box",
        minWidth: 36,
        minHeight: 36,
        padding: "4px 6px",
        border: "2px solid #7D3C98",
        borderRadius: 8,
        "--exercise-focus-radius": "8px",
        touchAction: "none",
        userSelect: "none",
        cursor: disabled ? (src ? "pointer" : "not-allowed") : "grab",
        opacity: used ? 0.4 : 1,
        background: selected || playing ? "#dbeafe" : "#faf5ff",
        boxShadow:
          selected || playing
            ? "0 0 0 3px #2563eb"
            : "0 1px 2px rgba(109,41,128,.15)",
      }}
    >
      {item}
      {playing && <AudioSpeaker />}
    </span>
  );
}
// eslint-disable-next-line react-refresh/only-export-components -- Local exercise helper.
function DropTarget({ id, disabled, children }) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    disabled,
  });
  return children(setNodeRef, isOver && !disabled);
}
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
const normalizeAnswer = (text) =>
  text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[‘’']/g, "")
    .replace(/[.,!?;:…“”"–—-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const WB_Unit3_Page17_Q1 = () => {
  const audio = useExerciseAudio();
  const wordSounds = {
    far: soundD1,
    short: soundD2,
    deep: soundD3,
    quiet: soundD4,
    tall: soundD5,
    shallow: soundD6,
    high: soundD7,
    near: soundD8,
    loud: soundD9,
    low: soundD10,
    old: soundD11,
    cheerful: soundD12,
    wide: soundD13,
    sad: soundD14,
    young: soundD15,
    narrow: soundD16,
  };
  const sourceFor = (item) => wordSounds[item];
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");
  const pairs = [
    ["short", "tall"],
    ["deep", "shallow"],
    ["far", "near"],
    ["quiet", "loud"],
    ["cheerful", "sad"],
    ["old", "young"],
    ["high", "low"],
    ["wide", "narrow"],
  ];
  const words = [
    "far",
    "short",
    "deep",
    "near",
    "quiet",
    "tall",
    "shallow",
    "high",
    "loud",
    "low",
    "old",
    "cheerful",
    "wide",
    "young",
    "narrow",
    "sad",
  ];
  const [studentAnswers, setStudentAnswers] = useState([
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
  ]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);
  const helpId = "wb_unit3_page17_q1-drag-help";
  const [picked, setPicked] = useState(null),
    [drag, setDrag] = useState(null);
  const pointerRef = React.useRef(null);
  const sensorRef = React.useRef(null);
  const centerPreview = (args) =>
    centerOnPointer(args, drag, pointerRef.current);
  const bankRefs = React.useRef({}),
    slotRefs = React.useRef({}),
    focusFrame = React.useRef(null),
    dragItemRef = React.useRef(null),
    suppressClick = React.useRef(false);
  const [portalHost, setPortalHost] = useState(
    () => document.fullscreenElement || document.body,
  );
  const sensors = useSensors(
    useSensor(ExercisePointerSensor, {
      sensorRef,
      activationConstraint: {
        distance: 6,
      },
    }),
  );
  const bankItems = words;
  const slots = pairs.flatMap((_, index) => [`${index}-0`, `${index}-1`]);
  const rowOf = (slot) => Number(slot.split("-")[0]);
  const valueAt = (slot, state = studentAnswers) =>
    state[rowOf(slot)][Number(slot.split("-")[1])];
  const setAt = (state, slot, value) => {
    state[rowOf(slot)][Number(slot.split("-")[1])] = value;
  };
  const slotLocked = (slot) => locked || result[rowOf(slot)] === true;
  const isUsed = (item, state = studentAnswers, feedback = result) =>
    slots.some(
      (slot) =>
        valueAt(slot, state) === item && feedback[rowOf(slot)] !== false,
    );
  const slotLabel = (slot) =>
    `Opposite pair ${rowOf(slot) + 1}, adjective ${Number(slot.split("-")[1]) + 1}`;
  const describeSlot = (slot) =>
    slotLabel(slot) +
    ". " +
    (valueAt(slot) ? "Contains " + valueAt(slot) + ". " : "Empty. ") +
    (slotLocked(slot)
      ? "Correct and locked."
      : result[rowOf(slot)] === false
        ? "Not correct. Select another item or activate to return this one."
        : "Select an item, then activate this slot. Activate a filled editable slot to return its item.");
  const cancelFocus = () => {
    if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current);
    focusFrame.current = null;
  };
  const focusLater = (callback) => {
    cancelFocus();
    focusFrame.current = requestAnimationFrame(() => {
      focusFrame.current = null;
      callback();
    });
  };
  React.useEffect(() => {
    const sensorOwner = sensorRef;
    const fullscreen = () => {
      sensorRef.current?.cancel();
      setPortalHost(document.fullscreenElement || document.body);
    };
    document.addEventListener("fullscreenchange", fullscreen);
    const trackPointer = (event) => {
      if (pointerRef.current?.pointerId === event.pointerId)
        pointerRef.current = {
          pointerId: event.pointerId,
          clientX: event.clientX,
          clientY: event.clientY,
        };
    };
    document.addEventListener("pointermove", trackPointer, true);
    return () => {
      document.removeEventListener("fullscreenchange", fullscreen);
      document.removeEventListener("pointermove", trackPointer, true);
      if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current);
      sensorOwner.current?.cancel();
      dragItemRef.current = null;
    };
  }, []);
  const clearInteraction = () => {
    cancelFocus();
    setPicked(null);
    setDrag(null);
    dragItemRef.current = null;
  };
  const cancelPick = () => {
    const source = picked ?? dragItemRef.current;
    sensorRef.current?.cancel();
    cancelFocus();
    setPicked(null);
    setAnnouncement("Choice cancelled.");
    if (source) bankRefs.current[source]?.focus();
  };
  const chooseItem = (item, keyboard) => {
    cancelFocus();
    if (sourceFor(item)) audio.play("bank-" + item, sourceFor(item));
    if (locked || isUsed(item)) {
      setAnnouncement(item + " is already placed or locked.");
      return;
    }
    if (picked === item) {
      cancelPick();
      return;
    }
    setPicked(item);
    setAnnouncement(item + " selected. Activate an answer slot to place it.");
    if (keyboard) {
      const target =
        slots.find((slot) => !slotLocked(slot) && !valueAt(slot)) ??
        slots.find((slot) => !slotLocked(slot));
      if (target !== undefined)
        focusLater(() => slotRefs.current[target]?.focus());
    }
  };
  const place = (slot, item, keyboard = false) => {
    if (
      !slots.includes(slot) ||
      !bankItems.includes(item) ||
      slotLocked(slot) ||
      slots.some((key) => slotLocked(key) && valueAt(key) === item)
    )
      return;
    const updated = studentAnswers.map((row) => [...row]),
      nextResults = [...result];
    for (const key of slots)
      if (valueAt(key, updated) === item && !slotLocked(key)) {
        setAt(updated, key, "");
        nextResults[rowOf(key)] = undefined;
      }
    setAt(updated, slot, item);
    nextResults[rowOf(slot)] = undefined;
    setStudentAnswers(updated);
    setResult(nextResults);
    setPicked(null);
    setAnnouncement(item + " placed in " + slotLabel(slot) + ".");
    if (keyboard) {
      const next =
        bankItems.find((word) => !isUsed(word, updated, nextResults)) ?? item;
      focusLater(() => bankRefs.current[next]?.focus());
    }
  };
  const remove = (slot) => {
    cancelFocus();
    if (slotLocked(slot) || !valueAt(slot)) return;
    const word = valueAt(slot),
      updated = studentAnswers.map((row) => [...row]);
    setAt(updated, slot, "");
    setStudentAnswers(updated);
    setResult((previous) => {
      const next = [...previous];
      next[rowOf(slot)] = undefined;
      return next;
    });
    setPicked(null);
    setAnnouncement(word + " returned to the bank.");
  };
  const activateSlot = (slot, keyboard) => {
    if (dragItemRef.current) return;
    cancelFocus();
    if (slotLocked(slot)) return;
    if (keyboard && picked) place(slot, picked, true);
    else if (valueAt(slot)) remove(slot);
    else if (picked) place(slot, picked, keyboard);
    else setAnnouncement("Select an item first.");
  };
  const slotKey = (event, slot) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      if (!event.repeat) activateSlot(slot, true);
    } else if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      cancelPick();
    } else if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault();
      event.stopPropagation();
      if (!event.repeat && result[rowOf(slot)] === false) remove(slot);
    }
  };
  const startDrag = (event) => {
    clearInteraction();
    suppressClick.current = true;
    const item = event.active.data.current?.item;
    if (!item || isUsed(item) || locked) return;
    const node = bankRefs.current[item],
      rect = node.getBoundingClientRect(),
      style = getComputedStyle(node),
      scale = rect.height / node.offsetHeight;
    dragItemRef.current = item;
    setDrag({
      item,
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      fontSize: parseFloat(style.fontSize) * scale,
      fontWeight: style.fontWeight,
      fontFamily: style.fontFamily,
      fontStyle: style.fontStyle,
      letterSpacing: Number.isFinite(parseFloat(style.letterSpacing))
        ? parseFloat(style.letterSpacing) * scale + "px"
        : style.letterSpacing,
      lineHeight: Number.isFinite(parseFloat(style.lineHeight))
        ? parseFloat(style.lineHeight) * scale
        : rect.height,
      color: style.color,
      backgroundColor: style.backgroundColor,
      borderColor: style.borderColor,
      borderWidth: parseFloat(style.borderTopWidth) * scale,
      borderRadius: parseFloat(style.borderTopLeftRadius) * scale,
    });
    if (sourceFor(item)) audio.play("bank-" + item, sourceFor(item));
    setAnnouncement(item + " picked up. Drop it in an editable answer slot.");
  };
  const finishDrag = (event) => {
    const item = dragItemRef.current;
    dragItemRef.current = null;
    setDrag(null);
    if (!item || item !== event.active.data.current?.item) return;
    const slot = event.over && String(event.over.id).replace(/^slot-/, "");
    if (slot && slots.includes(slot)) place(slot, item);
    else setAnnouncement("Drag cancelled. The item has not moved.");
  };
  const cancelDrag = () => {
    clearInteraction();
    setAnnouncement("Drag cancelled. The item has not moved.");
  };
  const normalize = normalizeAnswer;
  const checkAnswers = () => {
    if (locked) return;
    sensorRef.current?.cancel();
    clearInteraction();
    audio.stop();
    const hasEmpty = studentAnswers.some((pair) => pair.some((a) => !a.trim()));
    if (hasEmpty) {
      (setAnnouncement(
        String("Please complete all answers.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Please complete all answers."));
      return;
    }
    let correctCount = 0;
    const usedPairs = studentAnswers.flatMap((row, i) =>
      result[i] === true
        ? [
            pairs.findIndex(
              (pair) =>
                (normalize(row[0]) === normalize(pair[0]) &&
                  normalize(row[1]) === normalize(pair[1])) ||
                (normalize(row[0]) === normalize(pair[1]) &&
                  normalize(row[1]) === normalize(pair[0])),
            ),
          ]
        : [],
    );
    const newResults = studentAnswers.map((answerPair, slot) => {
      const first = normalize(answerPair[0]);
      const second = normalize(answerPair[1]);
      const matchedIndex = pairs.findIndex((pair, idx) => {
        if (usedPairs.includes(idx)) return false;
        const p1 = normalize(pair[0]);
        const p2 = normalize(pair[1]);
        return (
          (first === p1 && second === p2) || (first === p2 && second === p1)
        );
      });
      const ok = result[slot] === true || matchedIndex !== -1;
      if (ok) {
        correctCount++;
        if (matchedIndex !== -1) usedPairs.push(matchedIndex);
      }
      return ok;
    });
    setResult(newResults);
    const total = pairs.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const msg = `
      <div style="font-size:18px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;
    if (correctCount === total) {
      resetButtonRef.current?.focus({
        preventScroll: true,
      });
      setLocked(true);
      (setAnnouncement(
        String(msg)
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.success(msg));
    } else if (correctCount === 0) {
      (setAnnouncement(
        String(msg)
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.error(msg));
    } else {
      (setAnnouncement(
        String(msg)
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.warning(msg));
    }
  };
  const showAnswers = () => {
    sensorRef.current?.cancel();
    clearInteraction();
    audio.stop();
    setAnnouncement("Model answers shown and locked.");
    resetButtonRef.current?.focus({
      preventScroll: true,
    });
    setStudentAnswers(pairs);
    setResult([true, true, true, true, true, true, true, true]);
    setLocked(true);
  };
  const handleReset = () => {
    sensorRef.current?.cancel();
    clearInteraction();
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers([
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
    ]);
    setResult([]);
    setLocked(false);
  };
  const inputField = (qIndex, inputIndex) => (
    <DropTarget
      id={"slot-" + `${qIndex}-${inputIndex}`}
      disabled={slotLocked(`${qIndex}-${inputIndex}`)}
    >
      {(setNodeRef, isOver) => (
        <div
          data-drop-slot={`${qIndex}-${inputIndex}`}
          style={{
            outline: isOver ? "3px dashed #2563eb" : undefined,
            outlineOffset: 2,
            backgroundColor: isOver ? "#dbeafe" : undefined,
            borderRadius: 6,
          }}
          ref={setNodeRef}
          className="relative inline-block"
        >
          <input
            ref={(node) => {
              slotRefs.current[`${qIndex}-${inputIndex}`] = node;
            }}
            onKeyUp={activationKeys.onKeyUp}
            onKeyDown={(event) => slotKey(event, `${qIndex}-${inputIndex}`)}
            onClick={() => activateSlot(`${qIndex}-${inputIndex}`, false)}
            aria-describedby={helpId}
            aria-disabled={slotLocked(`${qIndex}-${inputIndex}`)}
            tabIndex={picked && slotLocked(`${qIndex}-${inputIndex}`) ? -1 : 0}
            role={"button"}
            readOnly={true}
            aria-invalid={result[qIndex] === false}
            style={{
              borderBottomColor:
                result[qIndex] === true || result[qIndex]?.overall === true
                  ? "#16a34a"
                  : undefined,
            }}
            placeholder={"Adjective"}
            title={slotLabel(`${qIndex}-${inputIndex}`)}
            aria-label={describeSlot(`${qIndex}-${inputIndex}`)}
            type="text"
            value={studentAnswers[qIndex][inputIndex]}
            disabled={slotLocked(`${qIndex}-${inputIndex}`)}
            onChange={undefined}
            className={`
          w-40
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6D2980]
          font-semibold
          px-1

          ${result[qIndex] === false ? "border-[#D1232A]" : "border-black"}
        `}
          />

          {result[qIndex] === false && inputIndex === 1 && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                width: "20px",
                height: "20px",
                background: "#ef4444",
                color: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: "bold",
                border: "2px solid white",
                boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
              }}
            >
              ✕
            </span>
          )}
        </div>
      )}
    </DropTarget>
  );
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      accessibility={{
        restoreFocus: false,
      }}
      onDragStart={startDrag}
      onDragEnd={finishDrag}
      onDragCancel={cancelDrag}
    >
      <div
        onKeyDownCapture={(event) => {
          if (event.key === "Enter" || event.key === " ")
            suppressClick.current = false;
        }}
        onPointerDownCapture={(event) => {
          if (event.isPrimary === false) return;
          suppressClick.current = false;
          if (!dragItemRef.current)
            pointerRef.current = {
              pointerId: event.pointerId,
              clientX: event.clientX,
              clientY: event.clientY,
            };
        }}
        data-exercise-scope={"WB_Unit3_Page17_Q1.jsx"}
        className="flex flex-col items-center p-[30px]"
      >
        <p id={helpId} className="sr-only">
          Select a bank item with Enter or Space, then activate an editable
          answer slot. Tab and Shift+Tab move between slots while an item is
          selected. Escape cancels. Activate a filled editable slot to return
          its item. Delete and Backspace remove only incorrect checked answers.
          You can also drag with a mouse, touch or pen. Correct checked answers
          stay locked.
        </p>
        <AudioFeedback audio={audio} />
        <style>{`[data-exercise-scope="WB_Unit3_Page17_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit3_Page17_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit3_Page17_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}@media(max-width:1279px){[data-exercise-scope="WB_Unit3_Page17_Q1.jsx"] [data-drag-bank]{grid-template-columns:repeat(4,minmax(0,1fr));}}@media(max-width:639px){[data-exercise-scope="WB_Unit3_Page17_Q1.jsx"] [data-drag-bank]{grid-template-columns:repeat(2,minmax(0,1fr));}}`}</style>
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {announcement}
        </div>
        <div className="div-forall text-[18px]">
          {/* TITLE */}
          <ExerciseHeader
            isWorkbook
            sectionLetter="D"
            title={<>Write the adjectives together in pairs of opposites.</>}
            subTitle="Pair each adjective with its true opposite and use every word only once before checking the full set."
          />

          {/* WORDS */}
          <div
            data-drag-bank
            className="
          flex flex-wrap gap-3 justify-center
          mb-2
          px-6
          text-center
        "
          >
            {words.map((word, index) => (
              <span key={index}>
                <BankTile
                  item={word}
                  disabled={locked || isUsed(word)}
                  used={isUsed(word)}
                  selected={picked === word}
                  audio={audio}
                  src={sourceFor(word)}
                  choose={chooseItem}
                  cancel={cancelPick}
                  tileRef={(node) => {
                    bankRefs.current[word] = node;
                  }}
                  suppressClick={suppressClick}
                  tabIndex={picked ? -1 : 0}
                  helpId={helpId}
                />
              </span>
            ))}
          </div>

          {/* QUESTIONS */}
          <div
            className="
              relative
              grid
              grid-cols-2
              gap-x-20
              gap-y-15
              px-4
            "
          >
            <div
              className="
              absolute
              left-1/2
              top-0
              -translate-x-1/2
              w-0.5
              h-full
              bg-black
            "
            />
            {pairs.map((pair, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="font-bold w-5">{i + 1}</span>

                {inputField(i, 0)}

                {inputField(i, 1)}
              </div>
            ))}
          </div>
        </div>

        {/* BUTTONS */}
        <div className="action-buttons-container">
          <button
            {...activationKeys}
            ref={resetButtonRef}
            aria-label={"Start Again"}
            type={"button"}
            className="try-again-button"
            onClick={handleReset}
          >
            Start Again ↻
          </button>

          <button
            {...activationKeys}
            aria-label={"Show Answer"}
            type={"button"}
            className="show-answer-btn"
            onClick={showAnswers}
          >
            Show Answer
          </button>

          <button
            onPointerDown={(e) => {
              if (locked) e.preventDefault();
            }}
            style={{
              cursor: locked ? "not-allowed" : "pointer",
            }}
            {...activationKeys}
            disabled={locked}
            aria-label={"Check Answer"}
            type={"button"}
            className="check-button2"
            onClick={checkAnswers}
          >
            Check Answer ✓
          </button>
        </div>
      </div>
      {createPortal(
        <DragOverlay
          adjustScale={false}
          dropAnimation={null}
          modifiers={[centerPreview]}
          zIndex={2147483647}
        >
          {drag && (
            <span
              aria-hidden="true"
              data-drag-preview
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: drag.width,
                height: drag.height,
                fontSize: drag.fontSize,
                fontWeight: drag.fontWeight,
                fontFamily: drag.fontFamily,
                fontStyle: drag.fontStyle,
                letterSpacing: drag.letterSpacing,
                lineHeight: drag.lineHeight + "px",
                color: drag.color,
                boxSizing: "border-box",
                background: drag.backgroundColor,
                border: `${drag.borderWidth}px solid ${drag.borderColor}`,
                borderRadius: drag.borderRadius,
                boxShadow: "0 4px 10px rgba(109,41,128,.2)",
                pointerEvents: "none",
              }}
            >
              {drag.item}
            </span>
          )}
        </DragOverlay>,
        portalHost,
      )}
    </DndContext>
  );
};
export default WB_Unit3_Page17_Q1;
