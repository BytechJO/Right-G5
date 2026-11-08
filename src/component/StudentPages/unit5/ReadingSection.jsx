import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import { useReadingHighlight } from "../../useReadingHighlight";
import ReadingBG from "../../../assets/imgs/conversation.svg";
import think from "../../../assets/imgs/pages/classbook/think.svg";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import Button from "../../Button";
import React, { useEffect, useRef, useState } from "react";
import ExerciseHeader from "../../ExerciseHeader";
const ReadingSection = ({
  mainTitle,
  title,
  image,
  paragraphs = [],
  question,
  sound,
  captions,
  stopAtSecond,
  wordTimings,
  timingAliases,
  pageId,
  onTimeUpdate,
  imageAlt,
  readingRef,
  underlineMode,
  originalHtmlRef,subTitle,headerTitle
}) => {
  const audio = useExerciseAudio();
  const stopReadingAudio = audio.stop;
  const playerRef = useRef(null),
    readingTextRef = useRef(null),
    wordRefs = useRef({}),
    clickTimer = useRef(null),
    skipSelectionClick = useRef(false);
  const underlineDrag = useRef(null);
  const [previewWords, setPreviewWords] = useState({});
  const clearUnderlineDrag = () => {
    const drag = underlineDrag.current;
    underlineDrag.current = null;
    if (drag && readingTextRef.current?.hasPointerCapture?.(drag.pointerId))
      readingTextRef.current.releasePointerCapture(drag.pointerId);
    setPreviewWords({});
  };
  const suppressPointerClick = () => {
    skipSelectionClick.current = true;
    clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      skipSelectionClick.current = false;
    }, 0);
  };
  const dragWordRange = (from, to) => {
    const start = wordKeys.indexOf(from),
      end = wordKeys.indexOf(to);
    return start < 0 || end < 0
      ? []
      : wordKeys.slice(Math.min(start, end), Math.max(start, end) + 1);
  };
  const startUnderlineDrag = (event) => {
    if (!underlineMode) return;
    event.stopPropagation();
    if (
      event.pointerType === "touch" ||
      event.button !== 0 ||
      event.isPrimary === false ||
      underlineDrag.current
    )
      return;
    const word = event.target.closest?.("[data-reading-word]");
    if (!word || !readingTextRef.current?.contains(word)) return;
    event.preventDefault();
    window.getSelection()?.removeAllRanges();
    underlineDrag.current = {
      pointerId: event.pointerId,
      from: word.dataset.readingWord,
      to: word.dataset.readingWord,
      word: word.textContent,
      x: event.clientX,
      y: event.clientY,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const moveUnderlineDrag = (event) => {
    const drag = underlineDrag.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.preventDefault();
    event.stopPropagation();
    if (
      !drag.moved &&
      Math.hypot(event.clientX - drag.x, event.clientY - drag.y) < 4
    )
      return;
    const target = document
      .elementFromPoint(event.clientX, event.clientY)
      ?.closest("[data-reading-word]");
    if (!target || !readingTextRef.current.contains(target)) return;
    drag.moved = true;
    drag.to = target.dataset.readingWord;
    setPreviewWords(
      Object.fromEntries(
        dragWordRange(drag.from, drag.to).map((id) => [id, true]),
      ),
    );
  };
  const finishUnderlineDrag = (event) => {
    const drag = underlineDrag.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.preventDefault();
    event.stopPropagation();
    if (drag.moved) {
      const ids = dragWordRange(drag.from, drag.to);
      setMarkedWords((previous) => ({
        ...previous,
        ...Object.fromEntries(ids.map((id) => [id, true])),
      }));
      setReadingAnnouncement(ids.length + " words underlined.");
      focusWord(drag.to);
    } else {
      focusWord(drag.from);
      toggleMark(drag.from, drag.word);
    }
    clearUnderlineDrag();
    suppressPointerClick();
  };
  const [markedWords, setMarkedWords] = useState({}),
    [activeWord, setActiveWord] = useState("0-0"),
    [readingAnnouncement, setReadingAnnouncement] = useState("");
  const textFor = (p) =>
    p.parts ? p.parts.map((part) => part.text).join("") : p.text || "";
  const wordKeys = paragraphs.flatMap((p, row) =>
    p.speaker
      ? (textFor(p).match(/\S+/g) || []).map((_, word) => row + "-" + word)
      : [],
  );
  const firstWord = wordKeys[0] || null;

  const focusWord = (id) => {
    setActiveWord(id);
    wordRefs.current[id]?.focus({
      preventScroll: true,
    });
  };
  const toggleMark = (id, word) => {
    setMarkedWords((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));
    setReadingAnnouncement(
      word + (markedWords[id] ? " underline removed." : " underlined."),
    );
  };
  const wordKey = (event, id, word) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      if (!event.repeat) toggleMark(id, word);
      return;
    }
    if (
      ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)
    ) {
      event.preventDefault();
      event.stopPropagation();
      const step = ["ArrowLeft", "ArrowUp"].includes(event.key) ? -1 : 1,
        index = wordKeys.indexOf(id);
      focusWord(
        wordKeys[Math.max(0, Math.min(wordKeys.length - 1, index + step))],
      );
    }
  };
  const underlineText = (text, row) => {
    let index = 0;
    return (text.match(/\S+|\s+/g) || []).map((part, token) => {
      if (/^\s+$/.test(part))
        return <React.Fragment key={token}>{part}</React.Fragment>;
      const id = row + "-" + index++;
      return (
        <span
          key={id}
          ref={(element) => {
            if (element) wordRefs.current[id] = element;
            else delete wordRefs.current[id];
          }}
          data-reading-word={id}
          data-choice
          role="button"
          tabIndex={activeWord === id ? 0 : -1}
          aria-pressed={!!markedWords[id]}
          aria-label={"Underline or remove underline: " + part}
          aria-describedby="unit5-underline-help"
          onFocus={() => setActiveWord(id)}
          onClick={(event) => {
            event.stopPropagation();
            if (skipSelectionClick.current) return;
            focusWord(id);
            toggleMark(id, part);
          }}
          onKeyDown={(event) => wordKey(event, id, part)}
          onKeyUp={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              event.stopPropagation();
            }
          }}
          style={{
            ...(markedWords[id] || previewWords[id]
              ? {
                  borderBottom: "2px solid red",
                }
              : {}),
            cursor: "pointer",
          }}
        >
          {part}
        </span>
      );
    });
  };

  const normalText = (p, index) => {
    if (index === 8 && p.text) {
      const at = p.text.indexOf("friend prefers");
      return (
        <>
          {highlight(p.text.slice(0, at))}

          {highlight(p.text.slice(at))}
        </>
      );
    }
    return highlight(
      p.parts
        ? p.parts.map((part, idx) => (
            <span
              key={idx}
              className={part.underline ? "border-b-2 border-black" : ""}
            >
              {part.text}
            </span>
          ))
        : p.text,
    );
  };
  useEffect(() => {
    if (!underlineMode) {
      setMarkedWords({});
      clearUnderlineDrag();
      setActiveWord(firstWord);
      skipSelectionClick.current = false;
      clearTimeout(clickTimer.current);
      return;
    }
    stopReadingAudio();
    playerRef.current?.pause();
    const frame = requestAnimationFrame(() =>
      wordRefs.current[firstWord]?.focus({
        preventScroll: true,
      }),
    );
    return () => cancelAnimationFrame(frame);
  }, [underlineMode, firstWord, stopReadingAudio]);
  useEffect(
    () => () => {
      clearTimeout(clickTimer.current);
      const drag = underlineDrag.current;
      underlineDrag.current = null;
      if (drag && readingTextRef.current?.hasPointerCapture?.(drag.pointerId))
        readingTextRef.current.releasePointerCapture(drag.pointerId);
    },
    [],
  );
  const { highlight, onTimeUpdate: updateReadingTime } = useReadingHighlight(
    wordTimings,
    timingAliases,
    !underlineMode,
  );
  const handleTextSelection = () => {
    if (!underlineMode || !readingTextRef.current) return;
    const selection = window.getSelection();
    if (!selection?.rangeCount || !selection.toString().trim()) return;
    const range = selection.getRangeAt(0),
      container = readingTextRef.current;
    if (
      !container.contains(range.startContainer) ||
      !container.contains(range.endContainer)
    )
      return;
    const ids = Array.from(container.querySelectorAll("[data-reading-word]"))
      .filter((element) => range.intersectsNode(element))
      .map((element) => element.dataset.readingWord);
    if (!ids.length) return;
    setMarkedWords((previous) => ({
      ...previous,
      ...Object.fromEntries(ids.map((id) => [id, true])),
    }));
    setReadingAnnouncement(ids.length + " words underlined.");
    skipSelectionClick.current = true;
    clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      skipSelectionClick.current = false;
    }, 0);
    selection.removeAllRanges();
  };
  useEffect(() => {
    if (readingRef.current && !originalHtmlRef.current) {
      originalHtmlRef.current = readingRef.current.innerHTML;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      data-reading-access={"unit5"}
      className="p-6 flex flex-col items-center "
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-reading-access="unit5"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:2px;border-radius:6px;}[data-reading-access="unit5"] #unit5-reading-text[data-underline-active="true"],[data-reading-access="unit5"] #unit5-reading-text[data-underline-active="true"] *{user-select:text;-webkit-user-select:text;}`}</style>
      <p id="unit5-underline-help" className="sr-only">
        In underline mode, use the arrow keys to move between words. Press Enter
        or Space to underline or remove an underline. You can also select a
        phrase with the mouse. Tab leaves the text.
      </p>
      <div className="sr-only" role="status" aria-live="polite">
        {readingAnnouncement || audio.error}
      </div>
      <div className="flex items-center gap-4 mb-4 w-[70%]">
        <ExerciseHeader title={headerTitle} subTitle={subTitle} />
      </div>
      <div className="flex items-center gap-4 mb-4 w-[60%]">
        <div
          className="px-4 py-1 font-bold text-black"
          style={{
            backgroundImage: `url(${ReadingBG})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          Reading
        </div>

        <h2 className="font-bold text-[18px] text-black">
          {highlight(mainTitle)}
        </h2>
      </div>
      <div className="w-[70%] mx-auto">
        <QuestionAudioPlayer
          ref={playerRef}
          src={sound}
          onTimeUpdate={(time) => {
            updateReadingTime(time);
            onTimeUpdate?.(time);
          }}
          pageId={pageId}
          captions={captions}
          stopAtSecond={stopAtSecond}
        />
      </div>
      <div className="relative w-[60%] mt-2">
        <div className="absolute -top-3 left-4 bg-[#6D2980] text-white px-5 py-1 rounded-md text-sm font-bold">
          {highlight(title)}
        </div>

        <div
          ref={readingRef}
          className="border-2 border-[#6D2980] rounded-2xl p-5 pt-7 bg-white"
        >
          {/* الصورة مع float */}
          <img
            src={image}
            alt={imageAlt}
            style={{
              width: "250px",
              height: "200px",
              objectFit: "contain",
            }}
            className="float-left mr-5 mb-2 rounded-md"
          />

          {/* كل الفقرات */}
          <div
            onPointerDown={startUnderlineDrag}
            onPointerMove={moveUnderlineDrag}
            onPointerUp={finishUnderlineDrag}
            onPointerCancel={(event) => {
              if (underlineDrag.current?.pointerId === event.pointerId)
                clearUnderlineDrag();
            }}
            onLostPointerCapture={(event) => {
              if (underlineDrag.current?.pointerId === event.pointerId)
                clearUnderlineDrag();
            }}
            data-underline-active={underlineMode}
            onTouchEnd={handleTextSelection}
            id={"unit5-reading-text"}
            ref={readingTextRef}
            className="text-[14px] leading-[1.9] text-black font-medium"
            onMouseUp={handleTextSelection}
          >
            {paragraphs.map((p, i) => {
              if (p.note)
                return (
                  <p
                    key={i}
                    className="italic  my-3"
                    // {...lineAudioProps(p, i)}
                    // style={lineAudioStyle(i)}
                  >
                    {highlight(p.note)}
                    {/* {audio.activeId === "reading-" + i && <AudioSpeaker />} */}
                  </p>
                );
              return (
                <div
                  key={i}
                  className="flex mb-2"
                  // {...lineAudioProps(p, i)}
                  // style={lineAudioStyle(i)}
                >
                  <span
                    className="w-[110px] shrink-0 font-bold"
                    style={{
                      color:
                        p.speaker === "Server"
                          ? "#1E88E5"
                          : p.speaker === "Customer"
                            ? "#E67E22"
                            : "#000",
                    }}
                  >
                    {p.speaker}:
                  </span>
                  <span>
                    {underlineMode
                      ? underlineText(textFor(p), i)
                      : normalText(p, i)}
                  </span>
                  {/* {audio.activeId === "reading-" + i && <AudioSpeaker />} */}
                </div>
              );
            })}
          </div>

          {/* تنظيف الفلوت */}
          <div className="clear-both"></div>
        </div>
      </div>

      <div className="relative w-[60%]">
        <img
          src={think}
          alt={""}
          style={{
            height: "150px",
            width: "auto",
          }}
        />

        <div className="absolute top-1/2 left-10 -translate-y-1/2 text-[15px] text-black text-left max-w-[70%]">
          {question}
        </div>
      </div>

      <div className="w-[60%] mt-3 space-y-6">
        <div className="flex items-center gap-4">
          <div
            className="px-4 py-1 font-bold text-black"
            style={{
              backgroundImage: `url(${ReadingBG})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            Comprehension
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReadingSection;
