import { createPortal } from "react-dom";
import { DndContext, DragOverlay, PointerSensor, useDraggable, useDroppable, useSensor, useSensors, pointerWithin, MeasuringStrategy } from "@dnd-kit/core";
import soundE7 from "../../../assets/audio/Workbook/Unit 3/Page 17 - E/Item_007_He_seems_happy._He_has_a_hat_on._He_is_a_builder.mp3";
import soundE6 from "../../../assets/audio/Workbook/Unit 3/Page 17 - E/Item_006_He_likes_his_work._He_looks_cheerful._He_is_a_painter.mp3";
import soundE5 from "../../../assets/audio/Workbook/Unit 3/Page 17 - E/Item_005_d_He_seems_very_hard-working._He_is_strong._He_may_be_a_trash_collector.mp3";
import soundE4 from "../../../assets/audio/Workbook/Unit 3/Page 17 - E/Item_004_c¢_They_seem_very_happy._They_are_a_mother_and_a_daughter._They_are_toge.mp3";
import soundE3 from "../../../assets/audio/Workbook/Unit 3/Page 17 - E/Item_003_The_man_is_a_worker._He_has_several_tools_for_his_work._He_is_a_plumber.mp3";
import soundE2 from "../../../assets/audio/Workbook/Unit 3/Page 17 - E/Item_002_He_is_a_guitar_player._He_looks_happy_when_he_plays_music._He_is_dark-ha.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "../../StudentPages/unit5/ExerciseAudioText";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U3/Page 17/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U3/Page 17/Asset 4.svg";
import img3 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U3/Page 17/Asset 5.svg";
import img4 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U3/Page 17/Asset 6.svg";
import img5 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U3/Page 17/Asset 14.svg";
import img6 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U3/Page 17/Asset 15.svg";
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
const centerOnPointer = ({
  transform
}, drag, pointer) => !drag || !pointer ? transform : {
  ...transform,
  x: pointer.clientX - drag.left - drag.width / 2,
  y: pointer.clientY - drag.top - drag.height / 2
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
  className
}) {
  const {
    attributes,
    listeners,
    setNodeRef
  } = useDraggable({
    id: 'bank-' + item,
    data: {
      item
    },
    disabled
  });
  const playing = audio.activeId === 'bank-' + item;
  return <span ref={node => {
    setNodeRef(node);
    tileRef(node);
  }} {...attributes} {...listeners} {...activationKeys} className={className} role="button" tabIndex={tabIndex} data-choice data-drag-item={item} aria-describedby={helpId} aria-disabled={disabled} aria-pressed={selected} aria-label={item + '. ' + (disabled ? 'Already placed or locked. ' + (src ? 'Activate to hear it.' : '') : 'Select, then activate an answer slot, or drag to a slot.')} onClick={event => {
    event.stopPropagation();
    if (!suppressClick.current) choose(item, event.detail === 0);
  }} onKeyDown={event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      cancel();
    } else activationKeys.onKeyDown(event);
  }} style={{
    position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start',
    boxSizing: 'border-box', minWidth: 36, minHeight: 36, padding: '4px 6px',
    border: '2px solid #7D3C98', borderRadius: 8, '--exercise-focus-radius': '8px',
    touchAction: 'none', userSelect: 'none',
    cursor: disabled ? (src ? 'pointer' : 'not-allowed') : 'grab', opacity: used ? .4 : 1,
    background: selected || playing ? '#dbeafe' : '#faf5ff',
    boxShadow: selected || playing ? '0 0 0 3px #2563eb' : '0 1px 2px rgba(109,41,128,.15)'
  }}>
    {item}{playing && <AudioSpeaker />}
  </span>;
}
// eslint-disable-next-line react-refresh/only-export-components -- Local exercise helper.
function DropTarget({
  id,
  disabled,
  children
}) {
  const {
    setNodeRef,
    isOver
  } = useDroppable({
    id,
    disabled
  });
  return children(setNodeRef, isOver && !disabled);
}
const activationKeys = {
  onKeyDown: event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  }
};
const normalizeAnswer = text => text.normalize("NFKC").toLowerCase().replace(/[‘’']/g, "").replace(/[.,!?;:…“”"–—-]/g, " ").replace(/\s+/g, " ").trim();
const WB_Unit3_Page17_Q2 = () => {
  const audio = useExerciseAudio();
  const sourceFor = () => undefined;
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");
  const answers = ["b", "a", "e", "c", "d", "f"];
  const questions = ["He is a guitar player. He looks happy when he plays music. He is dark-haired.", "The man is a worker. He has several tools for his work. He is a plumber.", "They seem very happy. They are a mother and a daughter. They are together.", "He seems very hard-working. He is strong. He may be a trash collector.", "He likes his work. He looks cheerful. He is a painter.", "He seems happy. He has a hat on. He is a builder."];
  const [studentAnswers, setStudentAnswers] = useState(["", "", "", "", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);
  const helpId = 'wb_unit3_page17_q2-drag-help';
  const [picked, setPicked] = useState(null),
    [drag, setDrag] = useState(null);
  const pointerRef = React.useRef(null);
  const sensorRef = React.useRef(null);
  const centerPreview = args => centerOnPointer(args, drag, pointerRef.current);
  const bankRefs = React.useRef({}),
    slotRefs = React.useRef({}),
    focusFrame = React.useRef(null),
    dragItemRef = React.useRef(null),
    suppressClick = React.useRef(false);
  const [portalHost, setPortalHost] = useState(() => document.fullscreenElement || document.body);
  const sensors = useSensors(useSensor(ExercisePointerSensor, {
    sensorRef,
    activationConstraint: {
      distance: 6
    }
  }));
  const bankItems = questions.map((_, index) => String.fromCharCode(97 + index));
  const slots = answers.map((_, index) => String(index));
  const rowOf = slot => Number(slot.split('-')[0]);
  const valueAt = (slot, state = studentAnswers) => state[rowOf(slot)];
  const setAt = (state, slot, value) => {
    state[rowOf(slot)] = value;
  };
  const slotLocked = slot => locked || result[rowOf(slot)] === true;
  const isUsed = (item, state = studentAnswers, feedback = result) => slots.some(slot => valueAt(slot, state) === item && feedback[rowOf(slot)] !== false);
  const slotLabel = slot => `Picture ${rowOf(slot) + 1}, matching description letter a to f`;
  const describeSlot = slot => slotLabel(slot) + '. ' + (valueAt(slot) ? 'Contains ' + valueAt(slot) + '. ' : 'Empty. ') + (slotLocked(slot) ? 'Correct and locked.' : result[rowOf(slot)] === false ? 'Not correct. Select another item or activate to return this one.' : 'Select an item, then activate this slot. Activate a filled editable slot to return its item.');
  const cancelFocus = () => {
    if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current);
    focusFrame.current = null;
  };
  const focusLater = callback => {
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
    document.addEventListener('fullscreenchange', fullscreen);
    const trackPointer = event => {
      if (pointerRef.current?.pointerId === event.pointerId) pointerRef.current = {
        pointerId: event.pointerId,
        clientX: event.clientX,
        clientY: event.clientY
      };
    };
    document.addEventListener('pointermove', trackPointer, true);
    return () => {
      document.removeEventListener('fullscreenchange', fullscreen);
      document.removeEventListener('pointermove', trackPointer, true);
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
    setAnnouncement('Choice cancelled.');
    if (source) bankRefs.current[source]?.focus();
  };
  const chooseItem = (item, keyboard) => {
    cancelFocus();
    if (sourceFor(item)) audio.play('bank-' + item, sourceFor(item));
    if (locked || isUsed(item)) {
      setAnnouncement(item + ' is already placed or locked.');
      return;
    }
    if (picked === item) {
      cancelPick();
      return;
    }
    setPicked(item);
    setAnnouncement(item + ' selected. Activate an answer slot to place it.');
    if (keyboard) {
      const target = slots.find(slot => !slotLocked(slot) && !valueAt(slot)) ?? slots.find(slot => !slotLocked(slot));
      if (target !== undefined) focusLater(() => slotRefs.current[target]?.focus());
    }
  };
  const place = (slot, item, keyboard = false) => {
    if (!slots.includes(slot) || !bankItems.includes(item) || slotLocked(slot) || slots.some(key => slotLocked(key) && valueAt(key) === item)) return;
    const updated = [...studentAnswers],
      nextResults = [...result];
    for (const key of slots) if (valueAt(key, updated) === item && !slotLocked(key)) {
      setAt(updated, key, '');
      nextResults[rowOf(key)] = undefined;
    }
    setAt(updated, slot, item);
    nextResults[rowOf(slot)] = undefined;
    setStudentAnswers(updated);
    setResult(nextResults);
    setPicked(null);
    setAnnouncement(item + ' placed in ' + slotLabel(slot) + '.');
    if (keyboard) {
      const next = bankItems.find(word => !isUsed(word, updated, nextResults)) ?? item;
      focusLater(() => bankRefs.current[next]?.focus());
    }
  };
  const remove = slot => {
    cancelFocus();
    if (slotLocked(slot) || !valueAt(slot)) return;
    const word = valueAt(slot),
      updated = [...studentAnswers];
    setAt(updated, slot, '');
    setStudentAnswers(updated);
    setResult(previous => {
      const next = [...previous];
      next[rowOf(slot)] = undefined;
      return next;
    });
    setPicked(null);
    setAnnouncement(word + ' returned to the bank.');
  };
  const activateSlot = (slot, keyboard) => {
    if (dragItemRef.current) return;
    cancelFocus();
    if (slotLocked(slot)) return;
    if (keyboard && picked) place(slot, picked, true);else if (valueAt(slot)) remove(slot);else if (picked) place(slot, picked, keyboard);else setAnnouncement('Select an item first.');
  };
  const slotKey = (event, slot) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      if (!event.repeat) activateSlot(slot, true);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      cancelPick();
    } else if (event.key === 'Delete' || event.key === 'Backspace') {
      event.preventDefault();
      event.stopPropagation();
      if (!event.repeat && result[rowOf(slot)] === false) remove(slot);
    }
  };
  const startDrag = event => {
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
      letterSpacing: Number.isFinite(parseFloat(style.letterSpacing)) ? parseFloat(style.letterSpacing) * scale + "px" : style.letterSpacing,
      lineHeight: Number.isFinite(parseFloat(style.lineHeight)) ? parseFloat(style.lineHeight) * scale : rect.height,
      color: style.color,
      backgroundColor: style.backgroundColor,
      borderColor: style.borderColor,
      borderWidth: parseFloat(style.borderTopWidth) * scale,
      borderRadius: parseFloat(style.borderTopLeftRadius) * scale
    });
    if (sourceFor(item)) audio.play('bank-' + item, sourceFor(item));
    setAnnouncement(item + ' picked up. Drop it in an editable answer slot.');
  };
  const finishDrag = event => {
    const item = dragItemRef.current;
    dragItemRef.current = null;
    setDrag(null);
    if (!item || item !== event.active.data.current?.item) return;
    const slot = event.over && String(event.over.id).replace(/^slot-/, '');
    if (slot && slots.includes(slot)) place(slot, item);else setAnnouncement('Drag cancelled. The item has not moved.');
  };
  const cancelDrag = () => {
    clearInteraction();
    setAnnouncement('Drag cancelled. The item has not moved.');
  };
  const normalize = normalizeAnswer;
  const checkAnswers = () => {
    if (locked) return;
    sensorRef.current?.cancel();
    clearInteraction();
    audio.stop();
    const hasEmpty = studentAnswers.some(a => !a.trim());
    if (hasEmpty) {
      setAnnouncement(String("Please complete all answers.").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.info("Please complete all answers.");
      return;
    }
    let correctCount = 0;
    const newResults = studentAnswers.map((answer, i) => {
      const ok = normalize(answer) === normalize(answers[i]);
      if (ok) correctCount++;
      return ok;
    });
    setResult(newResults);
    const total = answers.length;
    const color = correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const msg = `
      <div style="font-size:18px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;
    if (correctCount === total) {
      resetButtonRef.current?.focus({
        preventScroll: true
      });
      setLocked(true);
      setAnnouncement(String(msg).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      setAnnouncement(String(msg).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.error(msg);
    } else {
      setAnnouncement(String(msg).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.warning(msg);
    }
  };
  const showAnswers = () => {
    sensorRef.current?.cancel();
    clearInteraction();
    audio.stop();
    setAnnouncement("Model answers shown and locked.");
    resetButtonRef.current?.focus({
      preventScroll: true
    });
    setStudentAnswers(answers);
    setResult([true, true, true, true, true, true]);
    setLocked(true);
  };
  const handleReset = () => {
    sensorRef.current?.cancel();
    clearInteraction();
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", "", "", "", "", ""]);
    setResult([]);
    setLocked(false);
  };
  const inputField = i => <DropTarget id={"slot-" + String(i)} disabled={slotLocked(String(i))}>{(setNodeRef, isOver) => <div data-drop-slot={String(i)} style={{
      outline: isOver ? "3px dashed #2563eb" : undefined,
      outlineOffset: 2,
      backgroundColor: isOver ? "#dbeafe" : undefined,
      borderRadius: 6
    }} ref={setNodeRef} className="relative inline-block">
      <input ref={node => {
        slotRefs.current[String(i)] = node;
      }} onKeyUp={activationKeys.onKeyUp} onKeyDown={event => slotKey(event, String(i))} onClick={() => activateSlot(String(i), false)} aria-describedby={helpId} aria-disabled={slotLocked(String(i))} tabIndex={picked && slotLocked(String(i)) ? -1 : 0} role={"button"} readOnly={true} aria-invalid={result[i] === false} style={{
        borderBottomColor: result[i] === true || result[i]?.overall === true ? "#16a34a" : undefined
      }} title={slotLabel(String(i))} aria-label={describeSlot(String(i))} type="text" maxLength={1} value={studentAnswers[i]} disabled={slotLocked(String(i))} onChange={undefined} className={`
          w-[100px]
          border-0
          border-b
          outline-none
          bg-transparent
          text-center
          text-[18px]
          text-[#6D2980]
          font-semibold

          ${result[i] === false ? "border-[#D1232A]" : "border-black"}
        `} />

      {result[i] === false && <span style={{
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
        boxShadow: "0 1px 6px rgba(0,0,0,0.2)"
      }}>
          ✕
        </span>}
    </div>}</DropTarget>;
  return <DndContext sensors={sensors} collisionDetection={pointerWithin} measuring={{
    droppable: {
      strategy: MeasuringStrategy.Always
    }
  }} accessibility={{
    restoreFocus: false
  }} onDragStart={startDrag} onDragEnd={finishDrag} onDragCancel={cancelDrag}><div onKeyDownCapture={event => {
      if (event.key === "Enter" || event.key === " ") suppressClick.current = false;
    }} onPointerDownCapture={event => {
      if (event.isPrimary === false) return;
      suppressClick.current = false;
      if (!dragItemRef.current) pointerRef.current = {
        pointerId: event.pointerId,
        clientX: event.clientX,
        clientY: event.clientY
      };
    }} data-exercise-scope={"WB_Unit3_Page17_Q2.jsx"} className="flex flex-col items-center p-[30px]"><p id={helpId} className="sr-only">Select a bank item with Enter or Space, then activate an editable answer slot. Tab and Shift+Tab move between slots while an item is selected. Escape cancels. Activate a filled editable slot to return its item. Delete and Backspace remove only incorrect checked answers. You can also drag with a mouse, touch or pen. Correct checked answers stay locked.</p>
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit3_Page17_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit3_Page17_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit3_Page17_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>
      <div className="div-forall text-[18px] mb-10">
        {/* TITLE */}
        <ExerciseHeader isWorkbook sectionLetter="E" title={<>Look, read, and write.</>} subTitle="Start with one item, find the partner that matches its meaning or picture, then connect the pair before moving on." />

        {/* IMAGES */}
        <div className="flex flex-wrap justify-center gap-4 mb-3">
          {[img1, img2, img3, img4, img5, img6].map((img, index) => <div key={index} className="flex flex-col items-center">
              <img src={img} alt={["A worker using a wrench on pipes.", "A woman and a girl hugging.", "A worker lifting a red bin beside a recycling bin.", "A builder laying bricks with a trowel.", "A boy playing a guitar outdoors.", "A painter holding a palette and painting a tree on an easel."][index]} style={{
              width: "130px",
              height: "auto",
              objectFit: "contain"
            }} />

              <div className="mt-3 flex items-center gap-2">
                <span className="font-bold">{index + 1}</span>

                {inputField(index)}
              </div>
            </div>)}
        </div>

        {/* SENTENCES */}
        <div className="flex flex-col gap-[3vh] mt-8">
          {questions.map((q, index) => <div key={index} className="flex gap-3">
              <BankTile item={String.fromCharCode(97 + index)} disabled={locked || isUsed(String.fromCharCode(97 + index))} used={isUsed(String.fromCharCode(97 + index))} selected={picked === String.fromCharCode(97 + index)} audio={audio} src={sourceFor(String.fromCharCode(97 + index))} choose={chooseItem} cancel={cancelPick} tileRef={node => {
              bankRefs.current[String.fromCharCode(97 + index)] = node;
            }} suppressClick={suppressClick} tabIndex={picked ? -1 : 0} helpId={helpId} className="font-bold lowercase" />

              <p className="flex-1">
                <AudioText tabIndex={picked ? -1 : 0} audio={audio} id={`description-${index}`} src={[soundE2, soundE3, soundE4, soundE5, soundE6, soundE7][index]} label={`Hear description ${String.fromCharCode(97 + index)}: ${q}`}>
                  {q}
                </AudioText>
              </p>
            </div>)}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container">
        <button {...activationKeys} ref={resetButtonRef} aria-label={"Start Again"} type={"button"} className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>

        <button {...activationKeys} aria-label={"Show Answer"} type={"button"} className="show-answer-btn" onClick={showAnswers}>
          Show Answer
        </button>

        <button onPointerDown={e => {
          if (locked) e.preventDefault();
        }} style={{
          cursor: locked ? "not-allowed" : "pointer"
        }} {...activationKeys} disabled={locked} aria-label={"Check Answer"} type={"button"} className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>{createPortal(<DragOverlay adjustScale={false} dropAnimation={null} modifiers={[centerPreview]} zIndex={2147483647}>{drag && <span aria-hidden="true" data-drag-preview style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: drag.width,
        height: drag.height,
        fontSize: drag.fontSize,
        fontWeight: drag.fontWeight,
        fontFamily: drag.fontFamily,
        fontStyle: drag.fontStyle,
        letterSpacing: drag.letterSpacing,
        lineHeight: drag.lineHeight + 'px',
        color: drag.color,
        boxSizing: 'border-box',
        background: drag.backgroundColor,
        border: `${drag.borderWidth}px solid ${drag.borderColor}`,
        borderRadius: drag.borderRadius,
        boxShadow: '0 4px 10px rgba(109,41,128,.2)',
        pointerEvents: 'none'
      }}>{drag.item}</span>}</DragOverlay>, portalHost)}</DndContext>;
};
export default WB_Unit3_Page17_Q2;
