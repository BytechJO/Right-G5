import clip0 from "../../../assets/audio/ClassBook/U3/Page 27 - F/Item_001_bell_sounds_beautiful.mp3";
import clip1 from "../../../assets/audio/ClassBook/U3/Page 27 - F/Item_002_job_becomes_tiring.mp3";
import clip2 from "../../../assets/audio/ClassBook/U3/Page 27 - F/Item_003_pie_tastes_delicious.mp3";
import clip3 from "../../../assets/audio/ClassBook/U3/Page 27 - F/Item_004_books_seem_interesting.mp3";
import clip4 from "../../../assets/audio/ClassBook/U3/Page 27 - F/Item_005_students_look_bored.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import { SentenceGroup } from "./SentenceAudio";
import React, { useEffect, useRef, useState } from "react";
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
const fieldKeys = {
  onKeyDown: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
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

const Unit3_Page6_Q3 = () => {
  const focusFrame = useRef(null);
  const [preview, setPreview] = useState(null);
  const [previewLine, setPreviewLine] = useState(null);
  const cancelFocus = () => {
    if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current);
    focusFrame.current = null;
  };
  const cancelSelection = () => {
    cancelFocus();
    setSelected(null);
    setPreview(null);
  };
  const wordKey = (event, row, index) => {
    if (event.key === "Tab") return;
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      const source = selected;
      cancelSelection();
      source &&
        wordRefs.current[source.row]?.[source.index]?.focus({
          preventScroll: true,
        });
      return;
    }
    if (
      ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)
    ) {
      event.preventDefault();
      event.stopPropagation();
      const step =
        event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
      const targets = [0, 1, 2].filter(
        (i) => !selected || i !== selected.index,
      );
      const pos = targets.indexOf(index);
      const target = targets[(pos + step + targets.length) % targets.length];
      wordRefs.current[row]?.[target]?.focus({ preventScroll: true });
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      if (!event.repeat) handleWordClick(row, index, true);
    }
  };
  useEffect(
    () => () => {
      if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current);
    },
    [],
  );

  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");

  const containerRef = useRef();
  const [lines, setLines] = useState([]);
  const wordRefs = useRef([]);
  const data = [
    {
      words: ["bell", "sounds", "beautiful"],
      answer: "The bell sounds beautiful",
    },
    {
      words: ["job", "becomes", "tiring"],
      answer: "The job becomes tiring",
    },
    {
      words: ["pie", "tastes", "delicious"],
      answer: "The pie tastes delicious",
    },
    {
      words: ["books", "seem", "interesting"],
      answer: "The book seems interesting",
    },
    {
      words: ["students", "look", "bored"],
      answer: "The students look bored",
    },
  ];

  const [answers, setAnswers] = useState(Array(5).fill(""));
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  // 🔥 التوصيل
  const [selected, setSelected] = useState(null);
  const [connections, setConnections] = useState(Array(5).fill(null));

  const normalize = normalizeAnswer;
  useEffect(() => {
    const root = containerRef.current;
    const coordinates = (row, a, b) => {
      const box = root?.getBoundingClientRect();
      const first = wordRefs.current[row]?.[a]?.getBoundingClientRect();
      const last = wordRefs.current[row]?.[b]?.getBoundingClientRect();
      if (!box || !first || !last) return null;
      const sx = box.width / (root.clientWidth || box.width),
        sy = box.height / (root.clientHeight || box.height);
      return {
        x1: (first.left - box.left + first.width / 2) / sx,
        y1: (first.top - box.top) / sy - 10,
        x2: (last.left - box.left + last.width / 2) / sx,
        y2: (last.top - box.top) / sy - 10,
      };
    };
    const update = () => {
      setLines(
        connections.map((pair, row) =>
          pair ? coordinates(row, ...pair) : null,
        ),
      );
      setPreviewLine(
        selected &&
          preview &&
          selected.row === preview.row &&
          selected.index !== preview.index
          ? coordinates(selected.row, selected.index, preview.index)
          : null,
      );
    };
    update();
    const observer = new ResizeObserver(update);
    if (root) observer.observe(root);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [connections, selected, preview]);
  // 🎯 اختيار الكلمات
  const handleWordClick = (row, index, keyboard = false) => {
    if (locked || result[row]?.connection === true) return;
    cancelFocus();
    if (selected?.row === row && selected.index === index) {
      setSelected(null);
      setPreview(null);
      setAnnouncement("Connection cancelled.");
      return;
    }
    if (!selected || selected.row !== row) {
      setSelected({ row, index });
      setPreview(null);
      setAnnouncement(
        "Item " +
          (row + 1) +
          ", " +
          data[row].words[index] +
          " selected. Choose its partner.",
      );
      if (keyboard) {
        const target = [0, 1, 2].find((i) => i !== index);
        focusFrame.current = requestAnimationFrame(() => {
          focusFrame.current = null;
          wordRefs.current[row]?.[target]?.focus({ preventScroll: true });
        });
      }
      return;
    }
    setConnections((previous) =>
      previous.map((connection, i) =>
        i === row ? [selected.index, index] : connection,
      ),
    );
    setResult((previous) => {
      const next = [...previous];
      next[row] = { ...next[row], connection: undefined };
      return next;
    });
    setSelected(null);
    setPreview(null);
    setAnnouncement("Item " + (row + 1) + " connected.");
    if (keyboard)
      focusFrame.current = requestAnimationFrame(() => {
        focusFrame.current = null;
        const next = data.findIndex(
          (_, i) => i > row && result[i]?.connection !== true,
        );
        (
          wordRefs.current[next < 0 ? row : next]?.[0] || resetButtonRef.current
        )?.focus({ preventScroll: true });
      });
  };

  // ✅ CHECK
  const handleCheck = () => {
    if (locked) return;
    cancelSelection();

    audio.stop();

    if (locked) return;

    if (answers.some((a) => !a.trim())) {
      (setAnnouncement(
        String("Complete all answers.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Complete all answers."));
      return;
    }
    if (connections.some((c) => !c)) {
      (setAnnouncement(
        String("Complete all connections.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Complete all connections."));
      return;
    }
    let correctCount = 0;
    let total = data.length * 2; // 10
    const res = answers.map((a, i) => {
      const sentenceOk = normalize(a) === normalize(data[i].answer);

      const conn = connections[i];
      const connectionOk =
        conn &&
        ((conn[0] === 0 && conn[1] === 2) || (conn[0] === 2 && conn[1] === 0));

      if (sentenceOk) correctCount++;
      if (connectionOk) correctCount++;

      return {
        sentence: sentenceOk,
        connection: connectionOk,
      };
    });
    setResult(res);

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
      resetButtonRef.current?.focus({ preventScroll: true });
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

  // 👀 SHOW
  const handleShow = () => {
    audio.stop();
    cancelSelection();
    setAnswers(data.map((item) => item.answer));
    setConnections(data.map(() => [2, 0]));
    setResult(data.map(() => ({ sentence: true, connection: true })));
    setLocked(true);
    setAnnouncement("Correct sentences and connections shown and locked.");
  };

  // 🔄 RESET
  const handleReset = () => {
    cancelSelection();

    audio.stop();
    setAnnouncement("Answers, feedback and locks cleared.");

    setAnswers(Array(5).fill(""));
    setConnections(Array(5).fill(null));
    setResult([]);
    setLocked(false);
    setSelected(null);
  };

  // 🎯 input
  const input = (i) => (
    <span className="relative inline-block w-full">
      <input
        style={{
          borderBottomColor:
            locked || result[i]?.sentence === true
              ? "#16a34a"
              : result[i]?.sentence === false
                ? "#ef4444"
                : undefined,
        }}
        {...fieldKeys}
        placeholder="Write the sentence"
        aria-invalid={result[i]?.sentence === false}
        tabIndex={selected ? -1 : 0}
        title={`Item ${i + 1}, complete sentence using ${data[i].words.join(", ")}`}
        aria-label={`Item ${i + 1}, write a complete sentence using ${data[i].words.join(", ")}`}
        value={answers[i]}
        disabled={locked || result[i]?.sentence === true}
        onFocus={(e) => e.target.select()}
        onChange={(e) => {
          if (locked || result[i]?.sentence === true) return;
          const updated = [...answers];
          updated[i] = e.target.value;
          setAnswers(updated);

          setResult((prev) => {
            const copy = [...prev];
            copy[i] = { ...copy[i], sentence: undefined };
            return copy;
          });
        }}
        className={`border-b outline-none w-full text-[#6D2980] font-bold bg-transparent
       ${result[i]?.sentence === false ? "border-red-500" : "border-black"}`}
      />

      {result[i]?.sentence === false && (
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
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        >
          ✕
        </span>
      )}
    </span>
  );

  return (
    <div
      data-exercise-scope="Unit3_Page6_Q3.jsx"
      ref={containerRef}
      className=" flex flex-col items-center p-8 relative"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit3_Page6_Q3.jsx"] input:focus-visible,[data-exercise-scope="Unit3_Page6_Q3.jsx"] textarea:focus-visible,[data-exercise-scope="Unit3_Page6_Q3.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>

      <div className="div-forall mb-10" style={{ gap: "50px" }}>
        <ExerciseHeader
          sectionLetter="F"
          title={
            <>
              Write sentences that use the words given.
              Draw an arrow from the adjective to the noun it describes.
            </>
          }
          subTitle="Task 1: Write a complete sentence with the given words. Task 2: Then connect the adjective to the noun it describes using the arrow/line tool."
        />

        {/* QUESTIONS */}
        <div className="space-y-15 text-[18px] mb-2">
          {data.map((item, i) => (
            <div key={i}>
              <div className="flex items-center gap-4 mb-2 relative ">
                <SentenceGroup
                  tabIndex={selected ? -1 : 0}
                  label={`Hear the given words for item ${i + 1}: ${item.words.join(" ")}`}
                  src={[clip0, clip1, clip2, clip3, clip4][i]}
                  id={`sentence-${i}`}
                  audio={audio}
                  className=" relative w-[250px]"
                >
                  <span className="font-bold mr-3">{i + 1}</span>

                  {/* الكلمات */}
                  {item.words.map((word, wIndex) => (
                    <span key={wIndex} className=" relative ">
                      <span
                        style={{
                          boxShadow:
                            result[i]?.connection === true &&
                            [0, 2].includes(wIndex)
                              ? "0 0 0 2px #16a34a"
                              : undefined,
                        }}
                        onMouseLeave={() => setPreview(null)}
                        onMouseEnter={() => {
                          if (selected) setPreview({ row: i, index: wIndex });
                        }}
                        onFocus={() => {
                          if (selected) setPreview({ row: i, index: wIndex });
                        }}
                        onKeyUp={activationKeys.onKeyUp}
                        onKeyDown={(event) => wordKey(event, i, wIndex)}
                        aria-disabled={locked || result[i]?.connection === true}
                        aria-pressed={
                          selected?.row === i && selected.index === wIndex
                        }
                        aria-label={`Item ${i + 1}, ${word}${result[i]?.connection === true ? ". Correct connection and locked." : ""}`}
                        data-choice={true}
                        tabIndex={
                          selected
                            ? selected.row === i &&
                              selected.index !== wIndex &&
                              result[i]?.connection !== true
                              ? 0
                              : -1
                            : 0
                        }
                        role={"button"}
                        ref={(el) => {
                          if (!wordRefs.current[i]) wordRefs.current[i] = [];
                          wordRefs.current[i][wIndex] = el;
                        }}
                        onClick={() => handleWordClick(i, wIndex)}
                        className={`relative cursor-pointer px-2 rounded
          ${
            selected?.row === i && selected?.index === wIndex
              ? "bg-purple-200"
              : ""
          }
        `}
                      >
                        {word}
                      </span>

                      {wIndex < item.words.length - 1 && (
                        <span className=" relative mx-1 text-gray-500">/</span>
                      )}
                    </span>
                  ))}

                  {/* ❌ إذا التوصيل غلط */}
                  {result[i]?.connection === false && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-10px",
                        right: "95%",
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
                        boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                        pointerEvents: "none",
                        zIndex: 3,
                      }}
                    >
                      ✕
                    </span>
                  )}
                </SentenceGroup>

                {/* 🔥 input جنبهم */}
                <div className="ml-6 w-full">{input(i)}</div>
              </div>
            </div>
          ))}
        </div>
        <svg
          aria-hidden="true"
          focusable="false"
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        >
          {lines.map(
            (l, i) =>
              l && (
                <path
                  key={i}
                  d={`M ${l.x1} ${l.y1}
              Q ${(l.x1 + l.x2) / 2} ${l.y1 - 30}
              ${l.x2} ${l.y2}`}
                  stroke={
                    result[i]?.connection === true
                      ? "#16a34a"
                      : result[i]?.connection === false
                        ? "#ef4444"
                        : "#6D2980"
                  }
                  strokeWidth="2"
                  fill="transparent"
                  markerEnd={
                    result[i]?.connection === true
                      ? "url(#unit3-page6-q3-arrow-correct)"
                      : result[i]?.connection === false
                        ? "url(#unit3-page6-q3-arrow-wrong)"
                        : "url(#unit3-page6-q3-arrow)"
                  }
                />
              ),
          )}

          {selected && preview && previewLine && (
            <path
              d={`M ${previewLine.x1} ${previewLine.y1} Q ${(previewLine.x1 + previewLine.x2) / 2} ${previewLine.y1 - 30} ${previewLine.x2} ${previewLine.y2}`}
              stroke="#2563eb"
              strokeWidth="2"
              strokeDasharray="6 5"
              fill="transparent"
            />
          )}
          <defs>
            <marker
              id="unit3-page6-q3-arrow-correct"
              markerWidth="10"
              markerHeight="10"
              refX="5"
              refY="5"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 Z" fill="#16a34a" />
            </marker>
            <marker
              id="unit3-page6-q3-arrow-wrong"
              markerWidth="10"
              markerHeight="10"
              refX="5"
              refY="5"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 Z" fill="#ef4444" />
            </marker>
            <marker
              id="unit3-page6-q3-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="5"
              refY="5"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 Z" fill="#6D2980" />
            </marker>
          </defs>
        </svg>
        {/* BUTTONS */}
        <div className="action-buttons-container mt-6">
          <button
            type="button"
            {...activationKeys}
            aria-label="Start Again"
            ref={resetButtonRef}
            className="try-again-button"
            onClick={handleReset}
          >
            Start Again ↻
          </button>

          <button
            type="button"
            {...activationKeys}
            aria-label="Show Answer"
            onClick={handleShow}
            className="show-answer-btn"
          >
            Show Answer
          </button>

          <button
            type="button"
            {...activationKeys}
            aria-label="Check Answer"
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

export default Unit3_Page6_Q3;
