import clip0 from "../../../assets/audio/ClassBook/U2/Page 16 - C/Item_001_How_long.mp3";
import clip1 from "../../../assets/audio/ClassBook/U2/Page 16 - C/Item_002_How_many.mp3";
import clip2 from "../../../assets/audio/ClassBook/U2/Page 16 - C/Item_003_How_deep.mp3";
import clip3 from "../../../assets/audio/ClassBook/U2/Page 16 - C/Item_004_How_tall.mp3";
import clip4 from "../../../assets/audio/ClassBook/U2/Page 16 - C/Item_005_How_tiny.mp3";
import { useExerciseAudio } from "../unit2/useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "../unit2/ExerciseAudioText";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef, useEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 16/SVG/Asset 26.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 16/SVG/Asset 14.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 16/SVG/Asset 27.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 16/SVG/Asset 16.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 16/SVG/Asset 29.svg";
const activationKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault(); event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); event.stopPropagation(); }
  },
};



const Review1_Page1_Q3 = () => {
 const audio=useExerciseAudio();
const imageDescriptions=["A coiled snake.","A giraffe standing.","A small mouse.","Shirts hanging on a clothing rack.","A deep stone-lined pit."];
const images = [
    { id: 0, img: img1 },
    { id: 1, img: img2 },
    { id: 2, img: img3 },
    { id: 3, img: img4 },
    { id: 4, img: img5 },
  ];
const sentences = [
    { id: 0, text: "How long?" },
    { id: 1, text: "How many?" },
    { id: 2, text: "How deep?" },
    { id: 3, text: "How tall?" },
    { id: 4, text: "How tiny?" },
  ];
const correct = {
    0: 0,
    1: 3,
    2: 4,
    3: 1,
    4: 2,
  };
  const [matches, setMatches] = useState({});
  const [pairResults, setPairResults] = useState({});
  const [selection, setSelection] = useState(null);
  const [preview, setPreview] = useState(null);
  const [locked, setLocked] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const resetButtonRef = useRef(null),
    leftControlRefs = useRef({}),
    rightControlRefs = useRef({});
  const containerRef = useRef(null),
    imageRefs = useRef({}),
    sentenceRefs = useRef({});
  const [, setGeometry] = useState(0);
  const focusFrame = useRef(null);
  const cancelFocus = () => {
    if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current);
    focusFrame.current = null;
  };
  const queueFocus = (callback) => {
    cancelFocus();
    focusFrame.current = requestAnimationFrame(() => {
      focusFrame.current = null;
      callback();
    });
  };
  const mapping = correct;
  const leftIds = images.map(item=>item.id);
  const rightIds = sentences.map(item=>item.id);
  const leftLocked = (id) => locked || pairResults[id] === true;
  const rightLocked = (id) =>
    locked ||
    Object.entries(matches).some(
      ([key, value]) => value === id && pairResults[key] === true,
    );
  const resultDescription = (side, id) => {
    const source =
      side === "left"
        ? id
        : Object.keys(matches).find((key) => matches[key] === id);
    if (isLocked(side, id)) return ". Correct and locked.";
    if (source !== undefined && pairResults[source] === false)
      return ". Not correct. Choose another partner.";
    if (source !== undefined && Object.hasOwn(matches, source))
      return ". Connected, not checked.";
    return ". Not connected.";
  };
  const selectedImg = selection?.side === "left" ? selection.id : null;
  
  
  
  
  const clearSelection = () => {
    cancelFocus();
    setSelection(null);
    setPreview(null);
  };
  const isLocked = (side, id) =>
    side === "left" ? leftLocked(id) : rightLocked(id);
  const focusSide = (side, showPreview = false, currentMatches = matches) => {
    const available = (side === "left" ? leftIds : rightIds).filter(
      (id) => !isLocked(side, id),
    );
    const id =
      available.find((id) =>
        side === "left"
          ? !Object.hasOwn(currentMatches, id)
          : !Object.values(currentMatches).includes(id),
      ) ?? available[0];
    if (id !== undefined) {
      if (showPreview)
        setPreview({
          side,
          id,
        });
      (side === "left" ? leftControlRefs : rightControlRefs).current[id]?.focus(
        {
          preventScroll: true,
        },
      );
    }
  };
  const connect = (leftId, rightId, keyboard) => {
    if (leftLocked(leftId) || rightLocked(rightId)) return;
    const affected = [
      String(leftId),
      ...Object.keys(matches).filter(
        (key) => matches[key] === rightId && !leftLocked(key),
      ),
    ];
    const nextMatches = { ...matches };
    affected.forEach((key) => delete nextMatches[key]);
    nextMatches[leftId] = rightId;
    setMatches(nextMatches);
    setPairResults((previous) => {
      const next = {
        ...previous,
      };
      affected.forEach((key) => delete next[key]);
      return next;
    });
    clearSelection();
    setAnnouncement(
      `${leftId} connected to ${rightId}. Correct checked pairs stay locked.`,
    );
    if (keyboard) queueFocus(() => focusSide("left", false, nextMatches));
  };
  const choose = (side, id, keyboard = false) => {

 if(side==="right") audio.play("endpoint-"+id,[clip0,clip1,clip2,clip3,clip4][id]);
    if (isLocked(side, id)) {
      setAnnouncement(`${id}. This match is correct and locked.`);
      return;
    }
    cancelFocus();
    if (selection?.side === side && selection.id === id) {
      clearSelection();
      setAnnouncement("Match cancelled.");
      return;
    }
    if (selection && selection.side !== side) {
      connect(
        side === "left" ? id : selection.id,
        side === "right" ? id : selection.id,
        keyboard,
      );
      return;
    }
    setSelection({
      side,
      id,
    });
    setPreview(null);
    setAnnouncement(
      `${id} selected. Choose its matching partner, or press Escape to cancel.`,
    );
    if (keyboard)
      queueFocus(() => focusSide(side === "left" ? "right" : "left", true));
  };
  const endpointKey = (event, side, id) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      if (!event.repeat) choose(side, id, true);
    } else if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      const source = selection;
      clearSelection();
      setAnnouncement("Match cancelled.");
      if (source)
        (source.side === "left" ? leftControlRefs : rightControlRefs).current[
          source.id
        ]?.focus({
          preventScroll: true,
        });
    } else if (
      ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
    ) {
      event.preventDefault();
      event.stopPropagation();
      const ids = (side === "left" ? leftIds : rightIds).filter(
        (id) => !isLocked(side, id),
      );
      if (!ids.length) return;
      const step =
        event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
      (side === "left" ? leftControlRefs : rightControlRefs).current[
        ids[(ids.indexOf(id) + step + ids.length) % ids.length]
      ]?.focus({
        preventScroll: true,
      });
    }
  };
  const previewAt = (side, id) => {
    if (selection && selection.side !== side && !isLocked(side, id))
      setPreview({ side, id });
  };
  const selectImage = (id) => choose("left", id);
  const selectSentence = (id) => choose("right", id);
  const checkAnswers = () => {
    if (locked) return;
 audio.stop();
    clearSelection();
    if (!leftIds.every((id) => Object.hasOwn(matches, id))) {
      setAnnouncement("Please match all items.");
      ValidationAlert.info("Please match all items.");
      return;
    }
    const next = Object.fromEntries(
      leftIds.map((id) => [
        id,
        pairResults[id] === true || matches[id] === mapping[id],
      ]),
    );
    setPairResults(next);
    const score = Object.values(next).filter(Boolean).length,
      total = leftIds.length;
    const message = `Score: ${score} / ${total}`;
    setAnnouncement(
      message +
        (score === total
          ? ". All matches are correct and locked."
          : ". Incorrect pairs can be changed."),
    );
    if (score === total) {
      resetButtonRef.current?.focus({
        preventScroll: true,
      });
      setLocked(true);
      ValidationAlert.success(message);
    } else if (score === 0) ValidationAlert.error(message);
    else ValidationAlert.warning(message);
  };
  const showAnswers = () => {
 audio.stop();
    clearSelection();
    setMatches({ ...mapping });
    setPairResults(Object.fromEntries(leftIds.map((id) => [id, true])));
    setLocked(true);
    setAnnouncement("Correct matches shown and locked.");
  };
  const reset = () => {
 audio.stop();
    clearSelection();
    setMatches({});
    setPairResults({});
    setLocked(false);
    setAnnouncement("Matches and feedback cleared.");
  };
  const anchor = (side, id) => {
    const element = (side === "left" ? imageRefs : sentenceRefs).current[id],
      container = containerRef.current;
    if (!element || !container) return null;
    const r = element.getBoundingClientRect(),
      b = container.getBoundingClientRect();
    if (!b.width || !b.height) return null;
    return {
      x: (r.left + r.width / 2 - b.left) * (container.clientWidth / b.width),
      y: (r.top + r.height / 2 - b.top) * (container.clientHeight / b.height),
    };
  };
  const line = (leftId, rightId, dashed = false) => {
    const a = anchor("left", leftId),
      b = anchor("right", rightId);
    return a && b ? (
      <line
        key={String(leftId) + "-" + String(rightId)}
        x1={a.x}
        y1={a.y}
        x2={b.x}
        y2={b.y}
        stroke={
          dashed
            ? "#2563eb"
            : pairResults[leftId] === true
              ? "#16a34a"
              : pairResults[leftId] === false
                ? "#ef4444"
                : "#6D2980"
        }
        strokeWidth="2"
        strokeDasharray={dashed ? "6 3" : undefined}
        strokeLinecap="round"
      />
    ) : null;
  };
  useEffect(
    () => () => {
      if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current);
      focusFrame.current = null;
    },
    [],
  );
  useEffect(() => {
    const refresh = () => setGeometry((value) => value + 1);
    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(refresh)
        : null;
    if (containerRef.current) observer?.observe(containerRef.current);
    window.addEventListener("resize", refresh);
    window.addEventListener("scroll", refresh, true);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", refresh);
      window.removeEventListener("scroll", refresh, true);
    };
  }, []);
  
const showResult=locked||Object.keys(pairResults).length>0;
const validatedMatches=Object.fromEntries(Object.keys(pairResults).map(id=>[id,matches[id]]));
return (
    <div data-exercise-scope="Review1_Page1_Q3.jsx"
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
        position: "relative",
      }}
    >
<AudioFeedback audio={audio} />
<style>{`[data-exercise-scope="Review1_Page1_Q3.jsx"] input:focus-visible,[data-exercise-scope="Review1_Page1_Q3.jsx"] textarea:focus-visible,[data-exercise-scope="Review1_Page1_Q3.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <div className="div-forall">
        <ExerciseHeader isReview sectionLetter="C" title={<>Read, look, and match.{" "}</>} subTitle="Start with one item, find the matching partner, then connect the pair before moving to the next one." />

        <div className="w-full flex flex-col items-center gap-50">
          {/* 🔥 الصور فوق */}
          <div className="grid grid-cols-5 w-full">
            {images.map((img, i) => (
              <div ref={element=>{leftControlRefs.current[i]=element;}} role="button" tabIndex={0} data-choice aria-label={imageDescriptions[i]+resultDescription("left",i)} aria-disabled={isLocked("left",i)} aria-pressed={selection?.side==="left"&&selection.id===i} onKeyDown={event=>endpointKey(event,"left",i)} onKeyUp={activationKeys.onKeyUp} onFocus={()=>previewAt("left",i)} onMouseEnter={()=>previewAt("left",i)} onMouseLeave={()=>setPreview(null)} style={{outline:isLocked("left",i)?"2px solid #16a34a":selection?.side==="left"&&selection.id===i?"3px solid #2563eb":undefined,outlineOffset:2,borderRadius:6,backgroundColor:selection?.side==="left"&&selection.id===i?"#dbeafe":undefined}}
                key={i}
                onClick={() => selectImage(i)}
                className="relative flex flex-col items-center cursor-pointer transition"
              >
                <img
                  src={img.img} alt={imageDescriptions[i]}
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "contain",
                    border:
                      selectedImg === i
                        ? "3px solid #6d2980"
                        : "3px solid transparent",
                    borderRadius: "12px",
                    padding: "4px",
                    backgroundColor:
                      selectedImg === i ? "#6d2980" : "transparent",
                  }}
                />
                {showResult &&
                  validatedMatches[i] !== undefined &&
                  correct[i] !== validatedMatches[i] && (
                    <span
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        width: "20px",
                        height: "20px",
                        background: "#ef4444",
                        color: "white",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        fontWeight: "bold",
                        border: "2px solid white",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        zIndex: 5,
                      }}
                    >
                      ✕
                    </span>
                  )}
                <div
                  ref={(el) => (imageRefs.current[i] = el)}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition z-10"
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#00AEEF",
                    transform:
                      selectedImg === i
                        ? "translate(-50%, -50%) scale(1.4)"
                        : "translate(-50%, -50%)",
                  }}
                ></div>
              </div>
            ))}
          </div>

          {/* 🔥 الجمل تحت */}
          <div className="grid grid-cols-5 w-full mb-15">
            {sentences.map((sent, i) => (
              <div ref={element=>{rightControlRefs.current[i]=element;}} role="button" tabIndex={0} data-choice aria-label={sent.text+resultDescription("right",i)} aria-disabled={isLocked("right",i)} aria-pressed={selection?.side==="right"&&selection.id===i} onKeyDown={event=>endpointKey(event,"right",i)} onKeyUp={activationKeys.onKeyUp} onFocus={()=>previewAt("right",i)} onMouseEnter={()=>previewAt("right",i)} onMouseLeave={()=>setPreview(null)} style={{outline:isLocked("right",i)?"2px solid #16a34a":selection?.side==="right"&&selection.id===i?"3px solid #2563eb":undefined,outlineOffset:2,borderRadius:6,boxShadow:audio.activeId==="endpoint-"+i?"0 0 0 3px #2563eb":undefined,backgroundColor:audio.activeId==="endpoint-"+i||(selection?.side==="right"&&selection.id===i)?"#dbeafe":undefined}}
                key={i}
                onClick={() => selectSentence(i)}
                className="relative flex flex-col items-center cursor-pointer "
              >
                {/* 🔥 الدوت */}
                <div
                  ref={(el) => (sentenceRefs.current[i] = el)} // 🔥 هون كمان
                  className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full z-10 transition"
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#00AEEF",
                  }}
                ></div>

                {/* 🔥 البوكس */}
                <div className="relative px-4 py-2 rounded-2xl text-sm text-center transition text-[20px]">
                  <span className="font-bold mr-3">{i + 1}</span>
                  {sent.text}{audio.activeId==="endpoint-"+i&&<AudioSpeaker/>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <svg aria-hidden="true" focusable="false" className="absolute top-0 left-0 w-full h-full pointer-events-none">{Object.entries(matches).map(([id,target])=>line(id,target))}{selection&&preview&&selection.side!==preview.side?line(selection.side==="left"?selection.id:preview.id,selection.side==="right"?selection.id:preview.id,true):null}</svg>

      <div className="action-buttons-container">
        <button type="button" aria-label="Start Again" {...activationKeys} ref={resetButtonRef} className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>

        <button type="button" aria-label="Show Answer" {...activationKeys} onClick={showAnswers} className="show-answer-btn">
          Show Answer
        </button>

        <button type="button" aria-label="Check Answer" {...activationKeys} disabled={locked} style={{cursor:locked ? "not-allowed":"pointer"}} className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Review1_Page1_Q3;
