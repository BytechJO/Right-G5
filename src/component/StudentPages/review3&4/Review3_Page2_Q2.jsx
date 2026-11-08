import clip0 from "../../../assets/audio/ClassBook/U4/Page 35 - E/Item_001_Is_Wayne_short.mp3";
import clip1 from "../../../assets/audio/ClassBook/U4/Page 35 - E/Item_002_They_are_sad_after_losing_the_game.mp3";
import clip2 from "../../../assets/audio/ClassBook/U4/Page 35 - E/Item_003_The_car_is_shiny.mp3";
import clip3 from "../../../assets/audio/ClassBook/U4/Page 35 - E/Item_004_Is_he_unhappy.mp3";
import clip4 from "../../../assets/audio/ClassBook/U4/Page 35 - E/Item_005_The_students_are_helpful.mp3";
import clip5 from "../../../assets/audio/ClassBook/U4/Page 35 - E/Item_006_Tina_is_slim_and_tall.mp3";
import clip6 from "../../../assets/audio/ClassBook/U4/Page 35 - E/Item_007_We_are_a_large_family.mp3";
import clip7 from "../../../assets/audio/ClassBook/U4/Page 35 - E/Item_008_The_room_is_dark.mp3";
import clip8 from "../../../assets/audio/ClassBook/U4/Page 35 - E/Item_009_Are_you_angry.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import { SentenceGroup } from "./SentenceAudio";
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
const Review3_Page2_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");

  // ✅ IDs للكلمات الصح
  const correctAnswers = [
    "1-2",
    // short
    "2-2",
    // sad
    "3-3",
    // shiny
    "4-2",
    // unhappy
    "5-3",
    // helpful
    "6-2",
    // slim
    "6-4",
    // tall
    "7-3",
    // large
    "8-3",
    // dark
    "9-2", // angry
  ];
  const [selectedWords, setSelectedWords] = useState([]);
  const [wrongWords, setWrongWords] = useState([]);
  const [correctWordsLocked, setCorrectWordsLocked] = useState([]);
  const [locked, setLocked] = useState(false);

  // =========================
  // TOGGLE
  // =========================
  const toggleWord = (id) => {
    if (locked) return;

    // يمنع تعديل الصح
    if (correctWordsLocked.includes(id)) return;
    if (selectedWords.includes(id)) {
      setSelectedWords(selectedWords.filter((w) => w !== id));
    } else {
      setSelectedWords([...selectedWords, id]);
    }

    // يخفي X
    setWrongWords(wrongWords.filter((w) => w !== id));
  };

  // =========================
  // CHECK
  // =========================
  const handleCheck = () => {
    if (locked) return;
    audio.stop();
    if (selectedWords.length === 0) {
      (setAnnouncement(
        String("Please select the adjectives.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Please select the adjectives."));
      return;
    }
    const wrong = [];

    // ✅ الصح الجديد فقط
    const newCorrect = [];
    selectedWords.forEach((id) => {
      const correct = correctAnswers.includes(id);
      if (correct) {
        newCorrect.push(id);
      } else {
        wrong.push(id);
      }
    });
    setWrongWords(wrong);

    // ✅ جمع الصح القديم + الجديد
    const updatedCorrect = [...new Set([...correctWordsLocked, ...newCorrect])];
    setCorrectWordsLocked(updatedCorrect);
    const total = correctAnswers.length;
    const allCorrect = updatedCorrect.length === total && wrong.length === 0;
    const color = allCorrect
      ? "green"
      : updatedCorrect.length === 0
        ? "red"
        : "orange";
    const msg = `
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${updatedCorrect.length} / ${total}
      </span>
    </div>
  `;
    if (allCorrect) {
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
    } else if (updatedCorrect.length === 0) {
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

  // =========================
  // SHOW
  // =========================
  const handleShow = () => {
    audio.stop();
    setAnnouncement("Correct answers shown and locked.");
    setSelectedWords(correctAnswers);
    setCorrectWordsLocked(correctAnswers);
    setWrongWords([]);
    setLocked(true);
  };

  // =========================
  // RESET
  // =========================
  const handleReset = () => {
    audio.stop();
    setAnnouncement("All answers and feedback cleared.");
    setSelectedWords([]);
    setWrongWords([]);
    setCorrectWordsLocked([]);
    setLocked(false);
  };

  // =========================
  // RENDER WORD
  // =========================
  const renderWord = (word, id) => {
    const selected = selectedWords.includes(id);
    const wrong = wrongWords.includes(id);
    return (
      <span
        {...activationKeys}
        aria-disabled={locked || correctWordsLocked.includes(id)}
        aria-pressed={selected}
        aria-label={
          word +
          ". " +
          (correctWordsLocked.includes(id)
            ? "Correct and locked."
            : "Select an adjective.")
        }
        data-choice={true}
        tabIndex={0}
        role={"button"}
        key={id}
        onClick={() => toggleWord(id)}
        style={{
          position: "relative",
          display: "inline-block",
          margin: "0 0.5px",
          borderRadius: 999,
        }}
      >
        <span
          style={{
            cursor: locked ? "default" : "pointer",
            border: selected
              ? wrong
                ? "2px solid red"
                : "2px solid #6D2980"
              : "2px solid transparent",
            borderRadius: "999px",
            padding: "2px 2px",
            transition: "0.2s",
            userSelect: "none",
            display: "inline-block",
            ...(correctWordsLocked.includes(id)
              ? {
                  borderColor: "#16a34a",
                }
              : {}),
          }}
        >
          {word}
        </span>

        {/* ❌ */}
        {wrong && (
          <span
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              width: "18px",
              height: "18px",
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
            }}
          >
            ✕
          </span>
        )}
      </span>
    );
  };
  return (
    <div
      data-exercise-scope={"Review3_Page2_Q2.jsx"}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review3_Page2_Q2.jsx"] input:focus-visible,[data-exercise-scope="Review3_Page2_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall" style={{gap:"100px"}}>
        <ExerciseHeader
          isReview
          sectionLetter="E"
          title={<>Read and circle the adjectives in the chart.</>}
          subTitle="Read the text carefully and select only the target words; review your selections before checking."
        />

        <table className="w-full border-collapse text-[20px]">
          <tbody>
            {/* ROW 1 */}
            <tr>
              <td
                style={{
                  position: "relative",
                  ...(audio.activeId === "sentence-0"
                    ? {
                        boxShadow: "0 0 0 3px #2563eb",
                        backgroundColor: "#dbeafe",
                      }
                    : {}),
                }}
                onClick={(event) => {
                  if (event.target.closest?.("[role=button]")) return;
                  event.stopPropagation();
                  audio.play("sentence-0", clip0);
                }}
                onKeyUp={(event) => {
                  if (
                    event.target === event.currentTarget &&
                    (event.key === "Enter" || event.key === " ")
                  ) {
                    event.preventDefault();
                    event.stopPropagation();
                  }
                }}
                onKeyDown={(event) => {
                  if (
                    event.target !== event.currentTarget ||
                    (event.key !== "Enter" && event.key !== " ")
                  )
                    return;
                  event.preventDefault();
                  event.stopPropagation();
                  if (!event.repeat) audio.play("sentence-0", clip0);
                }}
                aria-label={"Hear sentence 1"}
                aria-roledescription={"sentence audio"}
                role={"group"}
                tabIndex={0}
                data-choice={true}
                className="border border-[#7A2D91] p-4 align-top whitespace-nowrap"
              >
                <span className="font-bold mr-3">1</span>

                {["Is", "Wayne", "short", "?"].map((word, index) => (
                  <React.Fragment key={index}>
                    {word === "?" || word === "." ? (
                      <span className="mx-[1px]">{word}</span>
                    ) : (
                      renderWord(word, `1-${index}`)
                    )}
                  </React.Fragment>
                ))}
                {audio.activeId === "sentence-0" && <AudioSpeaker />}
              </td>

              <td
                style={{
                  position: "relative",
                  ...(audio.activeId === "sentence-1"
                    ? {
                        boxShadow: "0 0 0 3px #2563eb",
                        backgroundColor: "#dbeafe",
                      }
                    : {}),
                }}
                onClick={(event) => {
                  if (event.target.closest?.("[role=button]")) return;
                  event.stopPropagation();
                  audio.play("sentence-1", clip1);
                }}
                onKeyUp={(event) => {
                  if (
                    event.target === event.currentTarget &&
                    (event.key === "Enter" || event.key === " ")
                  ) {
                    event.preventDefault();
                    event.stopPropagation();
                  }
                }}
                onKeyDown={(event) => {
                  if (
                    event.target !== event.currentTarget ||
                    (event.key !== "Enter" && event.key !== " ")
                  )
                    return;
                  event.preventDefault();
                  event.stopPropagation();
                  if (!event.repeat) audio.play("sentence-1", clip1);
                }}
                aria-label={"Hear sentence 2"}
                aria-roledescription={"sentence audio"}
                role={"group"}
                tabIndex={0}
                data-choice={true}
                className="border border-[#7A2D91] p-4 align-top whitespace-nowrap"
              >
                <span className="font-bold mr-3">2</span>

                {[
                  "They",
                  "are",
                  "sad",
                  "after",
                  "losing",
                  "the",
                  "game",
                  ".",
                ].map((word, index) => (
                  <React.Fragment key={index}>
                    {word === "?" || word === "." ? (
                      <span className="mx-[1px]">{word}</span>
                    ) : (
                      renderWord(word, `2-${index}`)
                    )}
                  </React.Fragment>
                ))}
                {audio.activeId === "sentence-1" && <AudioSpeaker />}
              </td>

              <td
                style={{
                  position: "relative",
                  ...(audio.activeId === "sentence-2"
                    ? {
                        boxShadow: "0 0 0 3px #2563eb",
                        backgroundColor: "#dbeafe",
                      }
                    : {}),
                }}
                onClick={(event) => {
                  if (event.target.closest?.("[role=button]")) return;
                  event.stopPropagation();
                  audio.play("sentence-2", clip2);
                }}
                onKeyUp={(event) => {
                  if (
                    event.target === event.currentTarget &&
                    (event.key === "Enter" || event.key === " ")
                  ) {
                    event.preventDefault();
                    event.stopPropagation();
                  }
                }}
                onKeyDown={(event) => {
                  if (
                    event.target !== event.currentTarget ||
                    (event.key !== "Enter" && event.key !== " ")
                  )
                    return;
                  event.preventDefault();
                  event.stopPropagation();
                  if (!event.repeat) audio.play("sentence-2", clip2);
                }}
                aria-label={"Hear sentence 3"}
                aria-roledescription={"sentence audio"}
                role={"group"}
                tabIndex={0}
                data-choice={true}
                className="border border-[#7A2D91] p-4 align-top whitespace-nowrap"
              >
                <span className="font-bold mr-3">3</span>

                {["The", "car", "is", "shiny", "."].map((word, index) => (
                  <React.Fragment key={index}>
                    {word === "?" || word === "." ? (
                      <span className="mx-px">{word}</span>
                    ) : (
                      renderWord(word, `3-${index}`)
                    )}
                  </React.Fragment>
                ))}
                {audio.activeId === "sentence-2" && <AudioSpeaker />}
              </td>
            </tr>

            {/* ROW 2 */}
            <tr>
              <td
                style={{
                  position: "relative",
                  ...(audio.activeId === "sentence-3"
                    ? {
                        boxShadow: "0 0 0 3px #2563eb",
                        backgroundColor: "#dbeafe",
                      }
                    : {}),
                }}
                onClick={(event) => {
                  if (event.target.closest?.("[role=button]")) return;
                  event.stopPropagation();
                  audio.play("sentence-3", clip3);
                }}
                onKeyUp={(event) => {
                  if (
                    event.target === event.currentTarget &&
                    (event.key === "Enter" || event.key === " ")
                  ) {
                    event.preventDefault();
                    event.stopPropagation();
                  }
                }}
                onKeyDown={(event) => {
                  if (
                    event.target !== event.currentTarget ||
                    (event.key !== "Enter" && event.key !== " ")
                  )
                    return;
                  event.preventDefault();
                  event.stopPropagation();
                  if (!event.repeat) audio.play("sentence-3", clip3);
                }}
                aria-label={"Hear sentence 4"}
                aria-roledescription={"sentence audio"}
                role={"group"}
                tabIndex={0}
                data-choice={true}
                className="border border-[#7A2D91] p-4 align-top whitespace-nowrap"
              >
                <span className="font-bold mr-3">4</span>

                {["Is", "he", "unhappy", "?"].map((word, index) => (
                  <React.Fragment key={index}>
                    {word === "?" || word === "." ? (
                      <span className="mx-px">{word}</span>
                    ) : (
                      renderWord(word, `4-${index}`)
                    )}
                  </React.Fragment>
                ))}
                {audio.activeId === "sentence-3" && <AudioSpeaker />}
              </td>

              <td
                style={{
                  position: "relative",
                  ...(audio.activeId === "sentence-4"
                    ? {
                        boxShadow: "0 0 0 3px #2563eb",
                        backgroundColor: "#dbeafe",
                      }
                    : {}),
                }}
                onClick={(event) => {
                  if (event.target.closest?.("[role=button]")) return;
                  event.stopPropagation();
                  audio.play("sentence-4", clip4);
                }}
                onKeyUp={(event) => {
                  if (
                    event.target === event.currentTarget &&
                    (event.key === "Enter" || event.key === " ")
                  ) {
                    event.preventDefault();
                    event.stopPropagation();
                  }
                }}
                onKeyDown={(event) => {
                  if (
                    event.target !== event.currentTarget ||
                    (event.key !== "Enter" && event.key !== " ")
                  )
                    return;
                  event.preventDefault();
                  event.stopPropagation();
                  if (!event.repeat) audio.play("sentence-4", clip4);
                }}
                aria-label={"Hear sentence 5"}
                aria-roledescription={"sentence audio"}
                role={"group"}
                tabIndex={0}
                data-choice={true}
                className="border border-[#7A2D91] p-4 align-top whitespace-nowrap"
              >
                <span className="font-bold mr-3">5</span>

                {["The", "students", "are", "helpful", "."].map(
                  (word, index) => (
                    <React.Fragment key={index}>
                      {word === "?" || word === "." ? (
                        <span className="mx-px">{word}</span>
                      ) : (
                        renderWord(word, `5-${index}`)
                      )}
                    </React.Fragment>
                  ),
                )}
                {audio.activeId === "sentence-4" && <AudioSpeaker />}
              </td>

              <td
                style={{
                  position: "relative",
                  ...(audio.activeId === "sentence-5"
                    ? {
                        boxShadow: "0 0 0 3px #2563eb",
                        backgroundColor: "#dbeafe",
                      }
                    : {}),
                }}
                onClick={(event) => {
                  if (event.target.closest?.("[role=button]")) return;
                  event.stopPropagation();
                  audio.play("sentence-5", clip5);
                }}
                onKeyUp={(event) => {
                  if (
                    event.target === event.currentTarget &&
                    (event.key === "Enter" || event.key === " ")
                  ) {
                    event.preventDefault();
                    event.stopPropagation();
                  }
                }}
                onKeyDown={(event) => {
                  if (
                    event.target !== event.currentTarget ||
                    (event.key !== "Enter" && event.key !== " ")
                  )
                    return;
                  event.preventDefault();
                  event.stopPropagation();
                  if (!event.repeat) audio.play("sentence-5", clip5);
                }}
                aria-label={"Hear sentence 6"}
                aria-roledescription={"sentence audio"}
                role={"group"}
                tabIndex={0}
                data-choice={true}
                className="border border-[#7A2D91] p-4 align-top whitespace-nowrap"
              >
                <span className="font-bold mr-3">6</span>

                {["Tina", "is", "slim", "and", "tall", "."].map(
                  (word, index) => (
                    <React.Fragment key={index}>
                      {word === "?" || word === "." ? (
                        <span className="mx-px">{word}</span>
                      ) : (
                        renderWord(word, `6-${index}`)
                      )}
                    </React.Fragment>
                  ),
                )}
                {audio.activeId === "sentence-5" && <AudioSpeaker />}
              </td>
            </tr>

            {/* ROW 3 */}
            <tr>
              <td
                style={{
                  position: "relative",
                  ...(audio.activeId === "sentence-6"
                    ? {
                        boxShadow: "0 0 0 3px #2563eb",
                        backgroundColor: "#dbeafe",
                      }
                    : {}),
                }}
                onClick={(event) => {
                  if (event.target.closest?.("[role=button]")) return;
                  event.stopPropagation();
                  audio.play("sentence-6", clip6);
                }}
                onKeyUp={(event) => {
                  if (
                    event.target === event.currentTarget &&
                    (event.key === "Enter" || event.key === " ")
                  ) {
                    event.preventDefault();
                    event.stopPropagation();
                  }
                }}
                onKeyDown={(event) => {
                  if (
                    event.target !== event.currentTarget ||
                    (event.key !== "Enter" && event.key !== " ")
                  )
                    return;
                  event.preventDefault();
                  event.stopPropagation();
                  if (!event.repeat) audio.play("sentence-6", clip6);
                }}
                aria-label={"Hear sentence 7"}
                aria-roledescription={"sentence audio"}
                role={"group"}
                tabIndex={0}
                data-choice={true}
                className="border border-[#7A2D91] p-4 align-top whitespace-nowrap"
              >
                <span className="font-bold mr-3">7</span>

                {["We", "are", "a", "large", "family", "."].map(
                  (word, index) => (
                    <React.Fragment key={index}>
                      {word === "?" || word === "." ? (
                        <span className="mx-px">{word}</span>
                      ) : (
                        renderWord(word, `7-${index}`)
                      )}
                    </React.Fragment>
                  ),
                )}
                {audio.activeId === "sentence-6" && <AudioSpeaker />}
              </td>

              <td
                style={{
                  position: "relative",
                  ...(audio.activeId === "sentence-7"
                    ? {
                        boxShadow: "0 0 0 3px #2563eb",
                        backgroundColor: "#dbeafe",
                      }
                    : {}),
                }}
                onClick={(event) => {
                  if (event.target.closest?.("[role=button]")) return;
                  event.stopPropagation();
                  audio.play("sentence-7", clip7);
                }}
                onKeyUp={(event) => {
                  if (
                    event.target === event.currentTarget &&
                    (event.key === "Enter" || event.key === " ")
                  ) {
                    event.preventDefault();
                    event.stopPropagation();
                  }
                }}
                onKeyDown={(event) => {
                  if (
                    event.target !== event.currentTarget ||
                    (event.key !== "Enter" && event.key !== " ")
                  )
                    return;
                  event.preventDefault();
                  event.stopPropagation();
                  if (!event.repeat) audio.play("sentence-7", clip7);
                }}
                aria-label={"Hear sentence 8"}
                aria-roledescription={"sentence audio"}
                role={"group"}
                tabIndex={0}
                data-choice={true}
                className="border border-[#7A2D91] p-4 align-top whitespace-nowrap"
              >
                <span className="font-bold mr-3">8</span>

                {["The", "room", "is", "dark", "."].map((word, index) => (
                  <React.Fragment key={index}>
                    {word === "?" || word === "." ? (
                      <span className="mx-px">{word}</span>
                    ) : (
                      renderWord(word, `8-${index}`)
                    )}
                  </React.Fragment>
                ))}
                {audio.activeId === "sentence-7" && <AudioSpeaker />}
              </td>

              <td
                style={{
                  position: "relative",
                  ...(audio.activeId === "sentence-8"
                    ? {
                        boxShadow: "0 0 0 3px #2563eb",
                        backgroundColor: "#dbeafe",
                      }
                    : {}),
                }}
                onClick={(event) => {
                  if (event.target.closest?.("[role=button]")) return;
                  event.stopPropagation();
                  audio.play("sentence-8", clip8);
                }}
                onKeyUp={(event) => {
                  if (
                    event.target === event.currentTarget &&
                    (event.key === "Enter" || event.key === " ")
                  ) {
                    event.preventDefault();
                    event.stopPropagation();
                  }
                }}
                onKeyDown={(event) => {
                  if (
                    event.target !== event.currentTarget ||
                    (event.key !== "Enter" && event.key !== " ")
                  )
                    return;
                  event.preventDefault();
                  event.stopPropagation();
                  if (!event.repeat) audio.play("sentence-8", clip8);
                }}
                aria-label={"Hear sentence 9"}
                aria-roledescription={"sentence audio"}
                role={"group"}
                tabIndex={0}
                data-choice={true}
                className="border border-[#7A2D91] p-4 align-top whitespace-nowrap"
              >
                <span className="font-bold mr-3">9</span>

                {["Are", "you", "angry", "?"].map((word, index) => (
                  <React.Fragment key={index}>
                    {word === "?" || word === "." ? (
                      <span className="mx-px">{word}</span>
                    ) : (
                      renderWord(word, `9-${index}`)
                    )}
                  </React.Fragment>
                ))}
                {audio.activeId === "sentence-8" && <AudioSpeaker />}
              </td>
            </tr>
          </tbody>
        </table>
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
          onClick={handleShow}
        >
          Show Answer
        </button>

        <button
          {...activationKeys}
          style={{
            cursor: locked ? "not-allowed" : "pointer",
          }}
          disabled={locked}
          aria-label={"Check Answer"}
          type={"button"}
          className="check-button2"
          onClick={handleCheck}
        >
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};
export default Review3_Page2_Q2;
