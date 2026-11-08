import clip9 from "../../../assets/audio/ClassBook/U6/Page 51 - E/Item_010_should_not.mp3";
import clip8 from "../../../assets/audio/ClassBook/U6/Page 51 - E/Item_009_mustn't.mp3";
import clip7 from "../../../assets/audio/ClassBook/U6/Page 51 - E/Item_008_I'd.mp3";
import clip6 from "../../../assets/audio/ClassBook/U6/Page 51 - E/Item_007_will_not.mp3";
import clip5 from "../../../assets/audio/ClassBook/U6/Page 51 - E/Item_006_they_would.mp3";
import clip4 from "../../../assets/audio/ClassBook/U6/Page 51 - E/Item_005_she'll.mp3";
import clip3 from "../../../assets/audio/ClassBook/U6/Page 51 - E/Item_004_you'd.mp3";
import clip2 from "../../../assets/audio/ClassBook/U6/Page 51 - E/Item_003_cannot.mp3";

import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
  AudioSpeaker,
} from "../unit5/ExerciseAudioText";
import { SentenceGroup, SentencePart } from "../unit5/SentenceAudio";
import React, { useState } from "react";

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

const Unit6_Page6_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const leftTable = [
    {
      long: "cannot",
      contraction: "",
      answer: "can't",
      side: "contraction",
    },

    {
      long: "",
      contraction: "she’ll",
      answer: "she will",
      side: "long",
    },

    {
      long: "will not",
      contraction: "",
      answer: "won't",
      side: "contraction",
    },

    {
      long: "",
      contraction: "mustn’t",
      answer: "must not",
      side: "long",
    },
  ];

  const rightTable = [
    {
      long: "",
      contraction: "you’d",
      answer: "you would",
      side: "long",
    },

    {
      long: "they would",
      contraction: "",
      answer: "they’d",
      side: "contraction",
    },

    {
      long: "",
      contraction: "I’d",
      answer: "I would",
      side: "long",
    },

    {
      long: "should not",
      contraction: "",
      answer: "shouldn’t",
      side: "contraction",
    },
  ];

  const allQuestions = [...leftTable, ...rightTable];

  const [answers, setAnswers] = useState(["", "", "", "", "", "", "", ""]);

  const [locked, setLocked] = useState(false);

  const [result, setResult] = useState([]);

  const normalize = normalizeAnswer;

  const handleChange = (i, val) => {
    if (locked || result[i] === true) return;

    const updated = [...answers];

    updated[i] = val;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;
    audio.stop();

    if (answers.some((a) => !a.trim())) {
      (setAnnouncement(
        String("Please complete all fields.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Please complete all fields."));

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((ans, i) => {
      const ok = normalize(ans) === normalize(allQuestions[i].answer);

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = answers.length;

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

  const showAnswers = () => {
    audio.stop();
    setAnnouncement("Model answers shown and locked.");
    resetButtonRef.current?.focus({ preventScroll: true });
    setAnswers(allQuestions.map((q) => q.answer));

    setResult([true, true, true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const renderTable = (data, startIndex) => (
    <table
      className="
        border-2
        border-[#7A2D91]
        rounded-[18px]
        overflow-hidden
        border-separate
        border-spacing-0
        text-[20px]
      "
    >
      <thead>
        <tr>
          <th
            className="
              border-b
              border-r
              border-[#7A2D91]
              px-8
              py-3
              text-[#7A2D91]
              font-bold
              bg-[#F8F3FB]
            "
          >
            long form
          </th>

          <th
            className="
              border-b
              border-[#7A2D91]
              px-8
              py-3
              text-[#7A2D91]
              font-bold
              bg-[#F8F3FB]
            "
          >
            contraction
          </th>
        </tr>
      </thead>

      <tbody>
        {data.map((item, i) => {
          const idx = startIndex + i;

          return (
            <tr key={i}>
              {/* LONG */}
              <td
                className="
                    border-r
                    border-b
                    border-[#7A2D91]
                    px-6
                    py-4
                    min-w-[190px]
                    text-center
                    relative
                  "
              >
                {item.side === "long" ? (
                  <>
                    <input placeholder={item.side==="long"?"Long form":"Contraction"}
                      aria-invalid={!!(result[idx] === false)}
                      style={{
                        ...(result[idx] === true
                          ? { borderBottomColor: "#16a34a" }
                          : {}),
                        ...(result[idx] === true
                          ? { boxShadow: "inset 0 -2px #16a34a" }
                          : {}),
                      }}
                      title={`Row ${idx + 1}, write the ${item.side === "long" ? "long form" : "contraction"} of ${item.long || item.contraction}`}
                      aria-label={`Row ${idx + 1}, write the ${item.side === "long" ? "long form" : "contraction"} of ${item.long || item.contraction}`}
                      {...fieldKeys}
                      type="text"
                      value={answers[idx]}
                      disabled={locked || result[idx] === true}
                      onChange={(e) => handleChange(idx, e.target.value)}
                      className={`
                          w-full
                          text-center
                          outline-none
                          bg-transparent
                          text-[20px]
                          font-semibold

                          ${
                            result[idx] === false
                              ? "text-[#6D2980]"
                              : "text-[#6D2980]"
                          }
                        `}
                    />

                    {result[idx] === false && (
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "8px",
                          width: "22px",
                          height: "22px",
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
                        }}
                      >
                        ✕
                      </span>
                    )}
                  </>
                ) : (
                  <AudioText
                    audio={audio}
                    id={`clue-${idx}`}
                    src={
                      [clip2, clip4, clip6, clip8, clip3, clip5, clip7, clip9][
                        idx
                      ]
                    }
                    label={`Hear ${item.long || item.contraction}`}
                  >
                    {item.long}
                  </AudioText>
                )}
              </td>

              {/* CONTRACTION */}
              <td
                className="
                    border-b
                    border-[#7A2D91]
                    px-6
                    py-4
                    min-w-[190px]
                    text-center
                    relative
                  "
              >
                {item.side === "contraction" ? (
                  <>
                    <input placeholder={item.side==="long"?"Long form":"Contraction"}
                      aria-invalid={!!(result[idx] === false)}
                      style={{
                        ...(result[idx] === true
                          ? { borderBottomColor: "#16a34a" }
                          : {}),
                        ...(result[idx] === true
                          ? { boxShadow: "inset 0 -2px #16a34a" }
                          : {}),
                      }}
                      title={`Row ${idx + 1}, write the ${item.side === "long" ? "long form" : "contraction"} of ${item.long || item.contraction}`}
                      aria-label={`Row ${idx + 1}, write the ${item.side === "long" ? "long form" : "contraction"} of ${item.long || item.contraction}`}
                      {...fieldKeys}
                      type="text"
                      value={answers[idx]}
                      disabled={locked || result[idx] === true}
                      onChange={(e) => handleChange(idx, e.target.value)}
                      className={`
                          w-full
                          text-center
                          outline-none
                          bg-transparent
                          text-[20px]
                          font-semibold

                          ${
                            result[idx] === false
                              ? "text-[#6D2980]"
                              : "text-[#6D2980]"
                          }
                        `}
                    />

                    {result[idx] === false && (
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "8px",
                          width: "22px",
                          height: "22px",
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
                        }}
                      >
                        ✕
                      </span>
                    )}
                  </>
                ) : (
                  <AudioText
                    audio={audio}
                    id={`clue-${idx}`}
                    src={
                      [clip2, clip4, clip6, clip8, clip3, clip5, clip7, clip9][
                        idx
                      ]
                    }
                    label={`Hear ${item.long || item.contraction}`}
                  >
                    {item.contraction}
                  </AudioText>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  return (
    <div
      data-exercise-scope={"Unit6_Page6_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit6_Page6_Q2.jsx"] input:focus-visible,[data-exercise-scope="Unit6_Page6_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Unit6_Page6_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall" style={{gap:"50px"}}>
        {/* TITLE */}
        <ExerciseHeader
          sectionLetter="E"
          title={
            <>Write either the long form or the contraction for each item.</>
          }
          subTitle="Use the picture, definition, chart, or grammar clue, then complete each answer before checking."
        />

        {/* TABLES */}
        <div className="flex justify-center gap-12">
          {renderTable(leftTable, 0)}

          {renderTable(rightTable, 4)}
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

export default Unit6_Page6_Q2;
