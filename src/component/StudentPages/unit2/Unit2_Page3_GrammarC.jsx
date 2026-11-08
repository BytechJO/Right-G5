
import React, { useEffect, useRef, useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
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



const GrammarC = () => {
const left = ["who", "which", "that"];
const right = [
    "used to describe people and things",
    "used to describe people",
    "used to describe things",
  ];
const correctB = {
    who: "used to describe people",
    which: "used to describe things",
    that: "used to describe people and things",
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
  const wrapperRef = useRef(null),
    leftRefs = useRef({}),
    rightRefs = useRef({});
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
  const mapping = correctB;
  const leftIds = left;
  const rightIds = right;
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
  const selected = selection?.side === "left" ? selection.id : null;
  const errors = Object.fromEntries(
    Object.entries(pairResults).map(([id, correct]) => [id, !correct]),
  );
  const isMatchedLeft = (item) => Object.hasOwn(matches, item);
  const isMatchedRight = (item) => Object.values(matches).includes(item);
  const isWrong = (item) => errors[item];
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
  const handleLeft = (id) => choose("left", id);
  const handleRight = (id) => choose("right", id);
  const handleCheck = () => {
    if (locked) return;
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
  const handleShow = () => {
    clearSelection();
    setMatches({ ...mapping });
    setPairResults(Object.fromEntries(leftIds.map((id) => [id, true])));
    setLocked(true);
    setAnnouncement("Correct matches shown and locked.");
  };
  const handleReset = () => {
    clearSelection();
    setMatches({});
    setPairResults({});
    setLocked(false);
    setAnnouncement("Matches and feedback cleared.");
  };
  const anchor = (side, id) => {
    const element = (side === "left" ? leftRefs : rightRefs).current[id],
      container = wrapperRef.current;
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
    if (wrapperRef.current) observer?.observe(wrapperRef.current);
    window.addEventListener("resize", refresh);
    window.addEventListener("scroll", refresh, true);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", refresh);
      window.removeEventListener("scroll", refresh, true);
    };
  }, []);
  return (
    <div data-exercise-scope="Unit2_Page3_GrammarC.jsx">
<style>{`[data-exercise-scope="Unit2_Page3_GrammarC.jsx"] input:focus-visible,[data-exercise-scope="Unit2_Page3_GrammarC.jsx"] textarea:focus-visible,[data-exercise-scope="Unit2_Page3_GrammarC.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <div className="flex items-center gap-3 mb-7">
        <h5 className="header-title-page8-read pb-2.5">
          <span className="ex-A-read" style={{ marginRight: "10px" }}>
            C
          </span>
          Look and match.
        </h5>
      </div>

      <div
        ref={wrapperRef}
        className="relative flex justify-center items-start gap-100 w-full"
      >
        <svg aria-hidden="true" focusable="false" className="absolute inset-0 w-full h-full pointer-events-none">{Object.entries(matches).map(([id,target])=>line(id,target))}{selection&&preview&&selection.side!==preview.side?line(selection.side==="left"?selection.id:preview.id,selection.side==="right"?selection.id:preview.id,true):null}</svg>

        <div className="relative z-10 flex flex-col gap-4 w-[20%]  text-[15px] ">
          {left.map((item, i) => (
            <div ref={element=>{leftControlRefs.current[item]=element;}} role="button" tabIndex={0} data-choice aria-label={item+resultDescription("left",item)} aria-disabled={isLocked("left",item)} aria-pressed={selection?.side==="left"&&selection.id===item} onKeyDown={event=>endpointKey(event,"left",item)} onKeyUp={activationKeys.onKeyUp} onFocus={()=>previewAt("left",item)} onMouseEnter={()=>previewAt("left",item)} onMouseLeave={()=>setPreview(null)} style={{outline:isLocked("left",item)?"2px solid #16a34a":selection?.side==="left"&&selection.id===item?"3px solid #2563eb":undefined,outlineOffset:2,borderRadius:6,backgroundColor:selection?.side==="left"&&selection.id===item?"#dbeafe":undefined}}
              key={item}
              onClick={() => handleLeft(item)}
              className={`relative cursor-pointer flex items-center justify-between px-2 py-1 rounded
                ${selected === item ? "bg-[#E9D5F5]" : ""}
            `}
            >
              {isWrong(item) && (
                <div
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "100%",
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
              <span>
                {i + 1}. {item}
              </span>

              <span
                ref={(el) => (leftRefs.current[item] = el)}
                className={`w-2 h-2 rounded-full ${
                  selected === item || isMatchedLeft(item)
                    ? "bg-blue-500"
                    : "bg-blue-400"
                }`}
              />
            </div>
          ))}
        </div>

        <div className="relative z-10 flex flex-col gap-4 w-[30%]">
          {right.map((item) => (
            <div  role="button" tabIndex={0} data-choice aria-label={item+resultDescription("right",item)} aria-disabled={isLocked("right",item)} aria-pressed={selection?.side==="right"&&selection.id===item} onKeyDown={event=>endpointKey(event,"right",item)} onKeyUp={activationKeys.onKeyUp} onFocus={()=>previewAt("right",item)} onMouseEnter={()=>previewAt("right",item)} onMouseLeave={()=>setPreview(null)} style={{outline:isLocked("right",item)?"2px solid #16a34a":selection?.side==="right"&&selection.id===item?"3px solid #2563eb":undefined,outlineOffset:2,borderRadius:6,backgroundColor:selection?.side==="right"&&selection.id===item?"#dbeafe":undefined}}
              key={item}
              ref={element=>{rightControlRefs.current[item]=element;}}
              onClick={() => handleRight(item)}
              className="cursor-pointer flex items-center gap-2"
            >
              <span
                ref={element=>{rightRefs.current[item]=element;}}
                className={`w-2 h-2 rounded-full ${
                  isMatchedRight(item) ? "bg-blue-500" : "bg-blue-400"
                }`}
              />

              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-8">
        {/* Reset */}
        <div className="relative group">
          <button type="button" aria-label="Start Again" {...activationKeys} ref={resetButtonRef}
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
          <button type="button" aria-label="Show Answer" {...activationKeys}
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
          <button type="button" aria-label="Check Answer" {...activationKeys} disabled={locked} style={{cursor:locked ? "not-allowed":"pointer"}}
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
  );
};

export default GrammarC;
