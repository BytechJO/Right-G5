import soundA1 from "../../../assets/audio/Workbook/Unit 4/Page 21 - A/Item_001_We_go_to_the.mp3";
import soundA9 from "../../../assets/audio/Workbook/Unit 4/Page 21 - A/Item_009_to_buy_things_to_wear.mp3";
import soundA7 from "../../../assets/audio/Workbook/Unit 4/Page 21 - A/Item_007_to_eat_food_at_a_mall.mp3";
import soundA5 from "../../../assets/audio/Workbook/Unit 4/Page 21 - A/Item_005_to_buy_food_items_and_household_items.mp3";
import soundA2 from "../../../assets/audio/Workbook/Unit 4/Page 21 - A/Item_002_to_buy_books.mp3";
import soundA8 from "../../../assets/audio/Workbook/Unit 4/Page 21 - A/Item_008_food_court.mp3";
import soundA6 from "../../../assets/audio/Workbook/Unit 4/Page 21 - A/Item_006_bookstore.mp3";
import soundA4 from "../../../assets/audio/Workbook/Unit 4/Page 21 - A/Item_004_clothes_store.mp3";
import soundA3 from "../../../assets/audio/Workbook/Unit 4/Page 21 - A/Item_003_grocery_store.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
  AudioSpeaker,
} from "../../StudentPages/unit5/ExerciseAudioText";
import {
  SentenceGroup,
  SentencePart,
} from "../../StudentPages/unit5/SentenceAudio";
import React, { useRef, useState } from "react";

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

const WB_Unit4_Page21_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const leftItems = [
    "grocery store",
    "clothes store",
    "bookstore",
    "food court",
  ];
  const rightItems = [
    "to buy books.",
    "to buy food items and household items.",
    "to eat food at a mall.",
    "to buy things to wear.",
  ];
  const correctMatches = {
    0: 1,
    1: 3,
    2: 0,
    3: 2,
  };
  const [matches, setMatches] = useState({}),
    [pairResults, setPairResults] = useState({}),
    [selection, setSelection] = useState(null),
    [preview, setPreview] = useState(null),
    [locked, setLocked] = useState(false);
  const leftControlRefs = useRef({}),
    rightControlRefs = useRef({}),
    leftRefs = useRef([]),
    rightRefs = useRef([]),
    wrapperRef = useRef(null),
    focusFrame = useRef(null);
  const [, setGeometry] = useState(0);
  const leftSounds = [soundA3, soundA4, soundA6, soundA8],
    rightSounds = [soundA2, soundA5, soundA7, soundA9];
  const mapping = Object.fromEntries(
      Object.entries(correctMatches).map(([a, b]) => [a, String(b)]),
    ),
    leftIds = leftItems.map((_, i) => String(i)),
    rightIds = rightItems.map((_, i) => String(i));
  const selectedLeft = selection?.side === "left" ? Number(selection.id) : null;
  const describe = (side, id) => (side === "left" ? leftItems : rightItems)[id];
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
      `${describe("left", leftId)} connected to ${describe("right", rightId)}.`,
    );
    if (keyboard) queueFocus(() => focusSide("left", false, nextMatches));
  };
  const choose = (side, id, keyboard = false) => {
    if (isLocked(side, id)) {
      setAnnouncement(
        `${describe(side, id)}. This match is correct and locked.`,
      );
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
    audio.stop();
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
  const showAnswers = () => {
    audio.stop();
    resetButtonRef.current?.focus({ preventScroll: true });
    clearSelection();
    setMatches({ ...mapping });
    setPairResults(Object.fromEntries(leftIds.map((id) => [id, true])));
    setLocked(true);
    setAnnouncement("Correct matches shown and locked.");
  };
  const handleReset = () => {
    audio.stop();
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
    <div
      data-exercise-scope={"WB_Unit4_Page21_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit4_Page21_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit4_Page21_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit4_Page21_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div ref={wrapperRef} className="div-forall text-[18px] relative">
        {/* TITLE */}
        <ExerciseHeader
          isWorkbook
          sectionLetter="A"
          title={<>Read and match.</>}
          subTitle="Start with one item, find the partner that matches its meaning or picture, then connect the pair before moving on."
        />

        <p className="mb-8">
          <AudioText
            audio={audio}
            id={"fragment-0"}
            src={soundA1}
            label={"Hear We go to the ..."}
          >
            We go to the ...
          </AudioText>
        </p>

        {/* SVG LINES */}
        <svg
          focusable={"false"}
          aria-hidden={true}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            zIndex: 0,
          }}
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

        {/* CONTENT */}
        <div className="relative z-10 flex justify-between">
          {/* LEFT */}
          <div className="flex flex-col gap-10">
            {leftItems.map((item, index) => {
              const wrongMatch = pairResults[index] === false;
              return (
                <div
                  style={{
                    position: "relative",
                    borderRadius: 6,
                    outline: isLocked("left", String(index))
                      ? "2px solid #16a34a"
                      : selection?.side === "left" &&
                          selection.id === String(index)
                        ? "3px solid #2563eb"
                        : undefined,
                    outlineOffset: 2,
                    backgroundColor:
                      (selection?.side === "left" &&
                        selection.id === String(index)) ||
                      audio.activeId === `left-${index}`
                        ? "#dbeafe"
                        : undefined,
                    boxShadow:
                      audio.activeId === `left-${index}`
                        ? "0 0 0 3px #2563eb"
                        : undefined,
                  }}
                  onMouseLeave={() => setPreview(null)}
                  onMouseEnter={() => previewAt("left", String(index))}
                  onFocus={() => previewAt("left", String(index))}
                  onKeyUp={activationKeys.onKeyUp}
                  onKeyDown={(event) => {
                    if (
                      (event.key === "Enter" || event.key === " ") &&
                      !event.repeat
                    )
                      audio.play(`left-${index}`, leftSounds[index]);
                    endpointKey(event, "left", String(index));
                  }}
                  aria-pressed={
                    selection?.side === "left" && selection.id === String(index)
                  }
                  aria-disabled={isLocked("left", String(index))}
                  aria-label={item + resultDescription("left", String(index))}
                  data-index={index}
                  data-endpoint={"left"}
                  data-choice={true}
                  tabIndex={0}
                  role={"button"}
                  ref={(node) => {
                    leftControlRefs.current[index] = node;
                  }}
                  key={index}
                  onClick={() => {
                    audio.play(`left-${index}`, leftSounds[index]);
                    choose("left", String(index));
                  }}
                  className={`
          relative
          grid
          grid-cols-[20px_110px_12px]
          items-center
          gap-4
          cursor-pointer
          rounded-lg
          px-2
          py-1
          transition

          ${selectedLeft === index ? "bg-[#F3E8FB]" : "hover:bg-[#F8F1FC]"}
        `}
                >
                  <span className="font-bold w-5">{index + 1}</span>

                  <span>{item}</span>

                  <button
                    type={"button"}
                    aria-hidden={true}
                    tabIndex={-1}
                    ref={(el) => (leftRefs.current[index] = el)}
                    className={`
                          w-3
                          h-3
                          rounded-full
                          border-2
                          border-[#6D2980]

                          ${
                            selectedLeft === index
                              ? "bg-[#6D2980] ring-4 ring-[#DCC3EE]"
                              : "bg-[#6D2980]"
                          }
                        `}
                  />
                  {wrongMatch && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-28px",
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
                        zIndex: 20,
                      }}
                    >
                      ✕
                    </span>
                  )}
                  {audio.activeId === `left-${index}` && <AudioSpeaker />}
                </div>
              );
            })}
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-10 ">
            {rightItems.map((item, index) => (
              <div
                style={{
                  position: "relative",
                  borderRadius: 6,
                  outline: isLocked("right", String(index))
                    ? "2px solid #16a34a"
                    : selection?.side === "right" &&
                        selection.id === String(index)
                      ? "3px solid #2563eb"
                      : undefined,
                  outlineOffset: 2,
                  backgroundColor:
                    (selection?.side === "right" &&
                      selection.id === String(index)) ||
                    audio.activeId === `right-${index}`
                      ? "#dbeafe"
                      : undefined,
                  boxShadow:
                    audio.activeId === `right-${index}`
                      ? "0 0 0 3px #2563eb"
                      : undefined,
                }}
                onMouseLeave={() => setPreview(null)}
                onMouseEnter={() => previewAt("right", String(index))}
                onFocus={() => previewAt("right", String(index))}
                onKeyUp={activationKeys.onKeyUp}
                onKeyDown={(event) => {
                  if (
                    (event.key === "Enter" || event.key === " ") &&
                    !event.repeat
                  )
                    audio.play(`right-${index}`, rightSounds[index]);
                  endpointKey(event, "right", String(index));
                }}
                aria-pressed={
                  selection?.side === "right" && selection.id === String(index)
                }
                aria-disabled={isLocked("right", String(index))}
                aria-label={item + resultDescription("right", String(index))}
                data-index={index}
                data-endpoint={"right"}
                data-choice={true}
                tabIndex={0}
                role={"button"}
                ref={(node) => {
                  rightControlRefs.current[index] = node;
                }}
                key={index}
                className="flex items-center gap-4 cursor-pointer px-2 py-1"
                onClick={() => {
                  audio.play(`right-${index}`, rightSounds[index]);
                  choose("right", String(index));
                }}
              >
                <button
                  type={"button"}
                  aria-hidden={true}
                  tabIndex={-1}
                  ref={(el) => (rightRefs.current[index] = el)}
                  className="w-3 h-3 rounded-full border-2 border-[#6D2980] bg-[#6D2980]"
                />

                <span>{item}</span>
                {audio.activeId === `right-${index}` && <AudioSpeaker />}
              </div>
            ))}
          </div>
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

export default WB_Unit4_Page21_Q1;
