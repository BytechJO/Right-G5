import clip0 from "../../../assets/audio/Workbook/Unit 1/Page 4 - D/Item_001_pancakes.mp3";
import clip1 from "../../../assets/audio/Workbook/Unit 1/Page 4 - D/Item_002_notebook.mp3";
import clip2 from "../../../assets/audio/Workbook/Unit 1/Page 4 - D/Item_003_mirror.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import {
  AudioFeedback,
  AudioSpeaker,
} from "../../StudentPages/unit5/ExerciseAudioText";

import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U1/Page 4/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U1/Page 4/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U1/Page 4/SVG/Asset 3.svg";
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

const WB_Unit1_Page4_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const images = [
    { id: 0, img: img1 },
    { id: 1, img: img2 },
    { id: 2, img: img3 },
  ];
  const sentences = [
    { id: 0, text: "mirror" },
    { id: 1, text: "pancakes" },
    { id: 2, text: "notebook" },
  ];
  const correct = {
    0: 2,
    1: 0,
    2: 1,
  };
  const imageDescriptions = [
    "A closed brown notebook.",
    "An oval mirror above two drawers.",
    "A stack of pancakes with chocolate topping and red fruit.",
  ];
  const [matches, setMatches] = useState({}),
    [pairResults, setPairResults] = useState({}),
    [selection, setSelection] = useState(null),
    [preview, setPreview] = useState(null),
    [locked, setLocked] = useState(false);
  const leftControlRefs = useRef({}),
    rightControlRefs = useRef({}),
    imageRefs = useRef([]),
    sentenceRefs = useRef([]),
    containerRef = useRef(null),
    focusFrame = useRef(null);
  const [, setGeometry] = useState(0);
  const mapping = correct,
    leftIds = images.map((item) => item.id),
    rightIds = sentences.map((item) => item.id);
  const clearSelection = () => {
    cancelFocus();
    setSelection(null);
    setPreview(null);
  };
  const selectedImg = selection?.side === "left" ? selection.id : null;
  const showResult = locked || Object.keys(pairResults).length > 0;
  const validatedMatches = Object.fromEntries(
    Object.keys(pairResults).map((id) => [id, matches[id]]),
  );
  const describe = (side, id) =>
    side === "left" ? imageDescriptions[id] : sentences[id].text;
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
      `${describe("left", leftId)} connected to ${describe("right", rightId)}. Correct checked pairs stay locked.`,
    );
    if (keyboard) queueFocus(() => focusSide("right", false, nextMatches));
  };
  const choose = (side, id, keyboard = false) => {
    if (side === "right")
      audio.play(`match-word-${id}`, [clip2, clip0, clip1][id]);
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
      `${describe(side, id)} selected. Choose its matching partner, or press Escape to cancel.`,
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
        key={
          (dashed ? "preview-" : "line-") +
          String(leftId) +
          "-" +
          String(rightId)
        }
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
        strokeWidth="2.5"
        strokeDasharray={dashed ? "6 3" : undefined}
        strokeLinecap="round"
      />
    ) : null;
  };
  React.useEffect(
    () => () => {
      if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current);
      focusFrame.current = null;
    },
    [],
  );
  React.useEffect(() => {
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
  return (
    <div
      data-exercise-scope={"WB_Unit1_Page4_Q2.jsx"}
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
      <style>{`[data-exercise-scope="WB_Unit1_Page4_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit1_Page4_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit1_Page4_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        <ExerciseHeader
          subTitle="Start with one item, find the partner that matches its meaning or picture, then connect the pair before moving on."
          isWorkbook
          sectionLetter="D"
          title={<>Look, read, and match. </>}
        />

        <div className="w-full flex flex-col items-center gap-50">
          {/* 🔥 الصور فوق */}
          <div className="grid grid-cols-3 w-full">
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => choose("left", i)}
                className="relative  flex flex-col items-center gap-2 cursor-pointer transition"
              >
                <img
                  onLoad={() => setGeometry((v) => v + 1)}
                  onMouseLeave={() => setPreview(null)}
                  onMouseEnter={() => previewAt("left", i)}
                  onFocus={() => previewAt("left", i)}
                  onKeyUp={activationKeys.onKeyUp}
                  onKeyDown={(event) => endpointKey(event, "left", i)}
                  aria-pressed={
                    selection?.side === "left" && selection.id === i
                  }
                  aria-disabled={leftLocked(i)}
                  aria-label={
                    imageDescriptions[i] + resultDescription("left", i)
                  }
                  data-choice={true}
                  tabIndex={0}
                  role={"button"}
                  ref={(node) => {
                    leftControlRefs.current[i] = node;
                  }}
                  alt={imageDescriptions[i]}
                  src={img.img}
                  style={{
                    width: "200px",
                    height: "100px",
                    objectFit: "contain",
                    border:
                      selectedImg === i
                        ? "3px solid #6d2980"
                        : "3px solid transparent",
                    borderRadius: "12px",
                    padding: "4px",
                    backgroundColor:
                      selectedImg === i ? "#6d2980" : "transparent",
                    ...(leftLocked(i)
                      ? { outline: "2px solid #16a34a", outlineOffset: 2 }
                      : {}),
                    "--exercise-focus-radius": "12px",
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
                        boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                        zIndex: 5,
                      }}
                    >
                      ✕
                    </span>
                  )}
                <div
                  ref={(el) => (imageRefs.current[i] = el)} // 🔥 الريف هون على الدوت
                  className="w-3 h-3 rounded-full mt-2 transition"
                  style={{
                    backgroundColor: selectedImg === i ? "#6d2980" : "#6d2980",
                    transform: selectedImg === i ? "scale(1.4)" : "scale(1)",
                  }}
                ></div>
              </div>
            ))}
          </div>

          {/* 🔥 الجمل تحت */}
          <div className="grid grid-cols-3 w-full">
            {sentences.map((sent, i) => (
              <div
                key={i}
                onClick={() => choose("right", i)}
                className="relative flex flex-col items-center cursor-pointer "
              >
                {/* 🔥 الدوت */}
                <div
                  ref={(el) => (sentenceRefs.current[i] = el)} // 🔥 هون كمان
                  className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full z-10 transition"
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#6d2980",
                  }}
                ></div>

                {/* 🔥 البوكس */}
                <div
                  style={{
                    outline: rightLocked(i)
                      ? "2px solid #16a34a"
                      : selection?.side === "right" && selection.id === i
                        ? "3px solid #2563eb"
                        : undefined,
                    outlineOffset: 2,
                    backgroundColor:
                      selection?.side === "right" && selection.id === i
                        ? "#dbeafe"
                        : undefined,
                    ...(audio.activeId === `match-word-${i}`
                      ? {
                          boxShadow: "0 0 0 3px #2563eb",
                          backgroundColor: "#dbeafe",
                        }
                      : {}),
                    "--exercise-focus-radius": "16px",
                  }}
                  onMouseLeave={() => setPreview(null)}
                  onMouseEnter={() => previewAt("right", i)}
                  onFocus={() => previewAt("right", i)}
                  onKeyUp={activationKeys.onKeyUp}
                  onKeyDown={(event) => endpointKey(event, "right", i)}
                  aria-pressed={
                    selection?.side === "right" && selection.id === i
                  }
                  aria-disabled={rightLocked(i)}
                  aria-label={sent.text + resultDescription("right", i)}
                  data-choice={true}
                  tabIndex={0}
                  role={"button"}
                  ref={(node) => {
                    rightControlRefs.current[i] = node;
                  }}
                  className="relative px-4 py-2 rounded-2xl text-sm text-center transition text-[20px]"
                >
                  <span className="font-bold mr-3">{i + 1}</span>
                  {sent.text}
                  {audio.activeId === `match-word-${i}` && <AudioSpeaker />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <svg
        focusable={"false"}
        aria-hidden={true}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      >
        {Object.entries(matches).map(([id, target]) => line(id, target))}
        {selection && preview && selection.side !== preview.side
          ? line(
              selection.side === "left" ? selection.id : preview.id,
              selection.side === "right" ? selection.id : preview.id,
              true,
            )
          : null}
      </svg>

      <div className="action-buttons-container">
        <button
          {...activationKeys}
          ref={resetButtonRef}
          aria-label={"Start Again"}
          type={"button"}
          className="try-again-button"
          onClick={reset}
        >
          Start Again ↻
        </button>

        <button
          {...activationKeys}
          aria-label={"Show Answer"}
          type={"button"}
          onClick={showAnswers}
          className="show-answer-btn"
        >
          Show Answer
        </button>

        <button
          style={{ cursor: locked ? "not-allowed" : "pointer" }}
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
  );
};

export default WB_Unit1_Page4_Q2;
