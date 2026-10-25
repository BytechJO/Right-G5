import { SentencePart } from "./SentenceAudio";
const fieldKeys = {
  onKeyDown: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
};
const actionKeys = {
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
import clip0 from "../../../assets/audio/ClassBook/U2/Page 14 - A/Item_001_A_pushmi-pullyu_is_a_make-believe_animal_that_has_a_head_at_both_ends_of.mp3";
import clip1 from "../../../assets/audio/ClassBook/U2/Page 14 - A/Item_002_carnival.mp3";
import clip2 from "../../../assets/audio/ClassBook/U2/Page 14 - A/Item_003_crazy.mp3";
import clip3 from "../../../assets/audio/ClassBook/U2/Page 14 - A/Item_004_trims.mp3";
import clip4 from "../../../assets/audio/ClassBook/U2/Page 14 - A/Item_005_giraffe.mp3";
import clip5 from "../../../assets/audio/ClassBook/U2/Page 14 - A/Item_006_beg.mp3";
import clip6 from "../../../assets/audio/ClassBook/U2/Page 14 - A/Item_007_twisty.mp3";
import clip7 from "../../../assets/audio/ClassBook/U2/Page 14 - A/Item_008_couple.mp3";
import clip8 from "../../../assets/audio/ClassBook/U2/Page 14 - A/Item_009_still.mp3";
import clip9 from "../../../assets/audio/ClassBook/U2/Page 14 - A/Item_010_forward_and_backward.mp3";
import clip10 from "../../../assets/audio/ClassBook/U2/Page 14 - A/Item_011_a_fun_place_with_rides,_shows_and_games.mp3";
import clip11 from "../../../assets/audio/ClassBook/U2/Page 14 - A/Item_012_continuing_to_be.mp3";
import clip12 from "../../../assets/audio/ClassBook/U2/Page 14 - A/Item_013_cut.mp3";
import clip13 from "../../../assets/audio/ClassBook/U2/Page 14 - A/Item_014_ask.mp3";
import clip14 from "../../../assets/audio/ClassBook/U2/Page 14 - A/Item_015_wild,_amazing,_or_without_control.mp3";
import clip15 from "../../../assets/audio/ClassBook/U2/Page 14 - A/Item_016_having_lots_of_turns.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback } from "./ExerciseAudioText";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 14/SVG/Asset 7.svg";
const Unit2_Page5_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const questions = [
    {
      combined: "CARNIVALLITS",
      word1: "carnival",
      word2: "still",
      clue1: "a fun place with rides, shows and games",
      clue2: "continuing to be",
    },
    {
      combined: "TRIMSGEB",
      word1: "trims",
      word2: "beg",
      clue1: "cut",
      clue2: "ask",
    },
    {
      combined: "CRAZYYTSIW",
      word1: "crazy",
      word2: "twisty",
      clue1: "wild, amazing, or without control",
      clue2: "having lots of turns",
    },
    {
      combined: "COUPLEFFARIG",
      word1: "couple",
      word2: "giraffe",
      clue1: "about two",
      clue2: "a tall, thin animal",
    },
  ];

  const wordBankWords = [
    "carnival",
    "crazy",
    "trims",
    "giraffe",
    "beg",
    "twisty",
    "couple",
    "still",
  ];

  const [letterValues, setLetterValues] = useState(() =>
    questions.map((q) => Array(q.combined.length).fill("")),
  );
  const [word1Values, setWord1Values] = useState(["", "", "", ""]);
  const [word2Values, setWord2Values] = useState(["", "", "", ""]);
  const [result, setResult] = useState([null, null, null, null]);
  const [locked, setLocked] = useState(false);
  const letterRefs = useRef(
    questions.map((q) => Array(q.combined.length).fill(null)),
  );
  const emptyFeedback = () =>
    questions.map((q) => ({
      letters: Array(q.combined.length).fill(null),
      w1: null,
      w2: null,
    }));
  const [feedback, setFeedback] = useState(emptyFeedback);
  const lockedParts = feedback.map((row) => ({
    letters: row.letters.every((value) => value === true),
    w1: row.w1 === true,
    w2: row.w2 === true,
  }));
  const normalize = (text) =>
    text
      .normalize("NFKC")
      .toLowerCase()
      .replace(/[‘’']/g, "")
      .replace(/[.,!?;:…“”"–—-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  const isLetterLocked = (qIdx, i) =>
    locked || feedback[qIdx].letters[i] === true;
  const isWordLocked = (qIdx, field) =>
    locked || feedback[qIdx][field === 1 ? "w1" : "w2"] === true;
  const clearQuestionStyling = (qIdx, field, indices = []) => {
    setResult((previous) =>
      previous.map((value, index) => (index === qIdx ? null : value)),
    );
    setFeedback((previous) =>
      previous.map((row, index) =>
        index !== qIdx
          ? row
          : field === "letters"
            ? {
                ...row,
                letters: row.letters.map((value, i) =>
                  indices.includes(i) && value !== true ? null : value,
                ),
              }
            : { ...row, [field]: row[field] === true ? true : null },
      ),
    );
  };
  const editableLetter = (qIdx, start, step = 1) => {
    for (
      let i = start;
      i >= 0 && i < questions[qIdx].combined.length;
      i += step
    )
      if (!isLetterLocked(qIdx, i)) return i;
    return -1;
  };
  const focusLetter = (qIdx, i) => {
    if (i >= 0) letterRefs.current[qIdx][i]?.focus({ preventScroll: true });
  };
  const onLetterInput = (qIdx, i, event) => {
    if (isLetterLocked(qIdx, i)) return;
    const value = event.target.value.replace(/[^a-zA-Z]/g, "").slice(0, 1);
    setLetterValues((previous) =>
      previous.map((row, index) =>
        index === qIdx
          ? row.map((letter, at) => (at === i ? value : letter))
          : row,
      ),
    );
    clearQuestionStyling(qIdx, "letters", [i]);
    if (value) focusLetter(qIdx, editableLetter(qIdx, i + 1));
  };
  const onLetterKeydown = (qIdx, i, event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.stopPropagation();
      return;
    }
    if (!["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(event.key))
      return;
    event.stopPropagation();
    if (isLetterLocked(qIdx, i)) {
      event.preventDefault();
      return;
    }
    if (event.key === "Backspace" && !letterValues[qIdx][i]) {
      event.preventDefault();
      const previous = editableLetter(qIdx, i - 1, -1);
      if (previous < 0) return;
      setLetterValues((rows) =>
        rows.map((row, index) =>
          index === qIdx
            ? row.map((letter, at) => (at === previous ? "" : letter))
            : row,
        ),
      );
      clearQuestionStyling(qIdx, "letters", [previous]);
      focusLetter(qIdx, previous);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      const step = event.key === "ArrowLeft" ? -1 : 1;
      focusLetter(qIdx, editableLetter(qIdx, i + step, step));
    }
  };
  const onLetterPaste = (qIdx, i, event) => {
    event.preventDefault();
    event.stopPropagation();
    if (isLetterLocked(qIdx, i)) return;
    const text = event.clipboardData.getData("text").replace(/[^a-zA-Z]/g, "");
    if (!text) return;
    const changed = [];
    setLetterValues((previous) =>
      previous.map((row, index) =>
        index !== qIdx
          ? row
          : row.map((letter, at) => {
              if (at < i || at - i >= text.length || isLetterLocked(qIdx, at))
                return letter;
              return text[at - i];
            }),
      ),
    );
    for (
      let at = i;
      at < questions[qIdx].combined.length && at - i < text.length;
      at++
    )
      if (!isLetterLocked(qIdx, at)) changed.push(at);
    clearQuestionStyling(qIdx, "letters", changed);
    const next = editableLetter(qIdx, i + text.length);
    focusLetter(qIdx, next < 0 ? changed.at(-1) : next);
  };
  const onWordChange = (qIdx, field, value) => {
    if (isWordLocked(qIdx, field)) return;
    const update = (previous) =>
      previous.map((word, index) => (index === qIdx ? value : word));
    if (field === 1) setWord1Values(update);
    else setWord2Values(update);
    clearQuestionStyling(qIdx, field === 1 ? "w1" : "w2");
  };
  const getLetterStatus = (qIdx, i) =>
    locked || feedback[qIdx].letters[i] === true
      ? "correct"
      : feedback[qIdx].letters[i] === false
        ? "wrong"
        : "";
  const getWordStatus = (qIdx, field) =>
    locked || feedback[qIdx][field === 1 ? "w1" : "w2"] === true
      ? "correct"
      : feedback[qIdx][field === 1 ? "w1" : "w2"] === false
        ? "wrong"
        : "";
  const isQuestionDisabled = (qIdx) => locked || result[qIdx] === true;
  const usedWords = () =>
    new Set([...word1Values, ...word2Values].filter(Boolean).map(normalize));
  const checkAnswers = () => {
    if (locked) return;
    audio.stop();
    if (
      letterValues.some((row) => row.some((letter) => !letter.trim())) ||
      word1Values.some((word) => !normalize(word)) ||
      word2Values.some((word) => !normalize(word))
    ) {
      const message =
        "Please complete every letter box and both words for each item.";
      setAnnouncement(message);
      ValidationAlert.info(message);
      return;
    }
    const next = questions.map((q, index) => ({
      letters: feedback[index].letters.map(
        (value, i) =>
          value === true ||
          letterValues[index][i].toUpperCase() === q.combined[i],
      ),
      w1:
        feedback[index].w1 === true ||
        normalize(word1Values[index]) === normalize(q.word1),
      w2:
        feedback[index].w2 === true ||
        normalize(word2Values[index]) === normalize(q.word2),
    }));
    const groups = next.map((row) => row.letters.every(Boolean));
    const score = next.reduce(
      (total, row, i) =>
        total + Number(groups[i]) + Number(row.w1) + Number(row.w2),
      0,
    );
    setFeedback(next);
    setResult(next.map((row, i) => groups[i] && row.w1 && row.w2));
    const total = questions.length * 3,
      message = `Score: ${score} / ${total}`;
    setAnnouncement(
      message +
        ". " +
        next
          .map(
            (row, i) =>
              `Question ${i + 1}: combined word ${groups[i] ? "correct" : "not correct"}, first word ${row.w1 ? "correct" : "not correct"}, second word ${row.w2 ? "correct" : "not correct"}.`,
          )
          .join(" "),
    );
    if (score === total) {
      setLocked(true);
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(message);
    } else if (score === 0) ValidationAlert.error(message);
    else ValidationAlert.warning(message);
  };
  const showAnswers = () => {
    audio.stop();
    setLocked(true);
    setLetterValues(questions.map((q) => q.combined.split("")));
    setWord1Values(questions.map((q) => q.word1));
    setWord2Values(questions.map((q) => q.word2));
    setFeedback(
      questions.map((q) => ({
        letters: Array(q.combined.length).fill(true),
        w1: true,
        w2: true,
      })),
    );
    setResult(questions.map(() => true));
    setAnnouncement("Correct answers shown and locked.");
  };
  const reset = () => {
    audio.stop();
    setLetterValues(questions.map((q) => Array(q.combined.length).fill("")));
    setWord1Values(questions.map(() => ""));
    setWord2Values(questions.map(() => ""));
    setFeedback(emptyFeedback());
    setResult(questions.map(() => null));
    setLocked(false);
    setAnnouncement("Answers, results and locks cleared.");
  };
  /* ── Styles ── */

  const letterBoxStyle = {
    width: "25px",
    height: "34px",
    border: "none",
    borderBottom: "1px solid #444",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: 700,
    color: "#6D2980",
    outline: "none",
    textTransform: "uppercase",
    background: "transparent",
    padding: 0,
    caretColor: "#6D2980",
    transition: "border-color 0.2s",
  };

  const wordInputStyle = {
    border: "none",
    borderBottom: "1px solid #444",
    outline: "none",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: 700,
    color: "#6D2980",
    background: "transparent",
    padding: "6px 10px",
    width: "100px",
    caretColor: "#6D2980",
    transition: "border-color 0.2s",
  };

  const getStatusBorder = (status) => {
    if (status === "correct") return "#16a34a";
    if (status === "wrong") return "#ef4444";
    return "#444";
  };
  const uw = usedWords();
  const spacing = ["32px", "80px", "70px", "70px"];
  return (
    <div
      data-word-building="unit2-page5-q1"
      className="flex flex-col items-center p-[30px]"
    >
      <style>{`[data-word-building="unit2-page5-q1"] input:focus-visible,[data-word-building="unit2-page5-q1"] [data-choice]:focus-visible{outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <AudioFeedback audio={audio} />
      <div className="div-forall">
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginBottom: "6px",
            position: "relative",
          }}
        >
          <div className="flex flex-col justify-start">
            <ExerciseHeader
              sectionLetter="A"
              title={
                <>
                  Make words for the pushmi-pullyu to read by adding the
                  <br />
                  letters of one word backwards to another word.
                </>
              }
              subTitle="Read both clue meanings, reverse or combine the needed word parts, then type the new pushmi-pullyu word."
            />
            <span
              style={{
                fontSize: "20px",
                color: "#743486",
              }}
            >
              {" "}
              <AudioText
                audio={audio}
                id="description"
                src={clip0}
                label="Hear the description of a pushmi-pullyu"
              >
                A pushmi-pullyu is a make-believe animal that has a head at both
                ends of its body.
              </AudioText>
            </span>
          </div>
          <img
            src={img}
            alt="An imaginary llama-like animal with a head at each end of its body."
            style={{
              position: "absolute", // لازم مع zIndex
              right: "-123px",
              top: "0",
              width: "120px",
              height: "auto",
              zIndex: 10, // 🔥 هذا اللي بدك إياه
            }}
          />
        </div>

        {/* WORD BANK */}
        <div
          style={{
            background: "#ede8f1",
            borderRadius: "14px",
            padding: "14px 20px",
            display: "flex",
            flexWrap: "wrap",
            gap: "6px 16px",
            fontSize: "14px",
            marginBottom: "24px",
            marginTop: "12px",
          }}
        >
          <span style={{ fontWeight: 700, color: "#6D2980" }}>Word Bank:</span>
          {wordBankWords.map((w) => (
            <span
              key={w}
              style={{
                color: uw.has(w.toLowerCase()) ? "#aaa" : "#444",
                fontWeight: 500,
                textDecoration: uw.has(w.toLowerCase())
                  ? "line-through"
                  : "none",
              }}
            >
              <AudioText
                audio={audio}
                id={"bank-" + w}
                src={
                  {
                    carnival: clip1,
                    crazy: clip2,
                    trims: clip3,
                    giraffe: clip4,
                    beg: clip5,
                    twisty: clip6,
                    couple: clip7,
                    still: clip8,
                  }[w]
                }
                label={"Hear " + w}
              >
                {w}
              </AudioText>
            </span>
          ))}
        </div>

        {/* QUESTIONS */}
        <div>
          {questions.map((q, idx) => {
            const disabled = isQuestionDisabled(idx);

            return (
              <div key={idx} style={{ marginBottom: spacing[idx] }}>
                <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
                  {/* LEFT SIDE */}
                  <div style={{ width: "420px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      {/* Number */}
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: "16px",
                          color: "#333",
                          width: "28px",
                        }}
                      >
                        {idx + 1}
                      </span>

                      {/* Letter Boxes */}
                      <div style={{ display: "flex", gap: "3px" }}>
                        {q.combined.split("").map((_, i) => {
                          const status = getLetterStatus(idx, i);
                          return (
                            <input
                              key={i}
                              aria-label={`Item ${idx + 1}, combined word, letter ${i + 1} of ${q.combined.length}`}
                              title={`Item ${idx + 1}, combined word, letter ${i + 1} of ${q.combined.length}`}
                              aria-invalid={status === "wrong"}
                              onKeyUp={fieldKeys.onKeyUp}
                              ref={(el) => (letterRefs.current[idx][i] = el)}
                              type="text"
                              maxLength={1}
                              value={letterValues[idx][i]}
                              onChange={(e) => onLetterInput(idx, i, e)}
                              onKeyDown={(e) => onLetterKeydown(idx, i, e)}
                              onPaste={(e) => onLetterPaste(idx, i, e)}
                              onFocus={(e) => e.target.select()}
                              disabled={disabled || isLetterLocked(idx, i)}
                              style={{
                                ...letterBoxStyle,
                                borderBottomColor: getStatusBorder(status),
                                color: "#6D2980",
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div
                    style={{
                      width: "200px", // 🔥 ثبّت العرض
                      position: "relative",
                    }}
                  >
                    {/* ROW: inputs */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "20px",
                      }}
                    >
                      {/* = */}
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: "16px",
                          color: "#333",
                          marginTop: "8px",
                        }}
                      >
                        =
                      </span>

                      {/* COLUMN 1 */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          position: "relative",
                        }}
                      >
                        <input
                          type="text"
                          {...fieldKeys}
                          aria-label={`Item ${idx + 1}, first word. Clue: ${q.clue1}`}
                          title={`Item ${idx + 1}, first word. Clue: ${q.clue1}`}
                          aria-invalid={getWordStatus(idx, 1) === "wrong"}
                          value={word1Values[idx]}
                          onChange={(e) => onWordChange(idx, 1, e.target.value)}
                          disabled={disabled || lockedParts[idx].w1}
                          style={{
                            ...wordInputStyle,
                            borderBottomColor: getStatusBorder(
                              getWordStatus(idx, 1),
                            ),
                            color: "#6D2980",
                          }}
                        />
                        {getWordStatus(idx, 1) === "wrong" && (
                          <span
                            style={{
                              position: "absolute",
                              top: "-8px",
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
                              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                              pointerEvents: "none",
                              zIndex: 3,
                            }}
                          >
                            ✕
                          </span>
                        )}
                        <span
                          style={{
                            color: "#00AEEF",
                            fontSize: "12.5px",
                            marginTop: "6px",
                          }}
                        >
                          {idx < 3 ? (
                            <AudioText
                              audio={audio}
                              id={"clue-" + idx + "-1"}
                              src={[clip10, clip12, clip14][idx]}
                              label={
                                "Hear the first clue for item " + (idx + 1)
                              }
                            >
                              {q.clue1}
                            </AudioText>
                          ) : (
                            q.clue1
                          )}
                        </span>
                      </div>

                      {/* middle text */}
                      <span
                        style={{
                          marginTop: "8px",
                          color: "black",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {idx === 0 ? (
                          <SentencePart first={true}
                            audio={audio}
                            id="sentence-clip9"
                            src={clip9}
                            label="Hear forward and backward"
                          >
                            forward and
                          </SentencePart>
                        ) : (
                          "and"
                        )}
                      </span>

                      {/* COLUMN 2 */}
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <input
                          type="text"
                          {...fieldKeys}
                          aria-label={`Item ${idx + 1}, second word. Clue: ${q.clue2}`}
                          title={`Item ${idx + 1}, second word. Clue: ${q.clue2}`}
                          aria-invalid={getWordStatus(idx, 2) === "wrong"}
                          value={word2Values[idx]}
                          onChange={(e) => onWordChange(idx, 2, e.target.value)}
                          disabled={disabled || lockedParts[idx].w2}
                          style={{
                            ...wordInputStyle,
                            borderBottomColor: getStatusBorder(
                              getWordStatus(idx, 2),
                            ),
                            color: "#6D2980",
                          }}
                        />
                        {getWordStatus(idx, 2) === "wrong" && (
                          <span
                            style={{
                              position: "absolute",
                              top: "-8px",
                              right: "-350px",
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
                              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                              pointerEvents: "none",
                              zIndex: 3,
                            }}
                          >
                            ✕
                          </span>
                        )}
                        <span
                          style={{
                            color: "#00AEEF",
                            fontSize: "12.5px",
                            marginTop: "6px",
                          }}
                        >
                          {idx < 3 ? (
                            <AudioText
                              audio={audio}
                              id={"clue-" + idx + "-2"}
                              src={[clip11, clip13, clip15][idx]}
                              label={
                                "Hear the second clue for item " + (idx + 1)
                              }
                            >
                              {q.clue2}
                            </AudioText>
                          ) : (
                            q.clue2
                          )}
                        </span>
                      </div>

                      {/* backward لأول سؤال */}
                      {idx === 0 && (
                        <span style={{ marginTop: "8px", color: "black" }}>
                          <SentencePart first={false}
                            audio={audio}
                            id="sentence-clip9"
                            src={clip9}
                            label="Hear forward and backward"
                          >
                            backward
                          </SentencePart>
                        </span>
                      )}
                    </div>

                    {/* clues label لأول سؤال فقط */}
                    {idx === 0 && (
                      <div
                        style={{
                          position: "absolute",
                          left: "-29px", // 👉 حرّكها يمين/يسار
                          top: "44px", // 👉 حرّكها فوق/تحت
                          fontWeight: 700,
                          fontSize: "12px",
                          color: "#00AEEF",
                        }}
                      >
                        Clues:
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container">
        <button
          type="button"
          aria-label="Start Again"
          {...actionKeys}
          ref={resetButtonRef}
          onClick={reset}
          className="try-again-button"
        >
          Start Again ↻
        </button>
        <button
          type="button"
          aria-label="Show Answer"
          {...actionKeys}
          onClick={showAnswers}
          className="show-answer-btn swal-continue"
        >
          Show Answer
        </button>
        <button
          type="button"
          aria-label="Check Answer"
          {...actionKeys}
          onClick={checkAnswers}
          className="check-button2"
          disabled={locked}
          style={{ cursor: locked ? "not-allowed" : "pointer" }}
        >
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Unit2_Page5_Q1;
