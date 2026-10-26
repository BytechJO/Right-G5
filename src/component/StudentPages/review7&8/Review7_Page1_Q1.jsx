import clip0 from "../../../assets/audio/ClassBook/U8/Page 70 - A/Item_001_limping.mp3";
import clip1 from "../../../assets/audio/ClassBook/U8/Page 70 - A/Item_002_stiff.mp3";
import clip2 from "../../../assets/audio/ClassBook/U8/Page 70 - A/Item_003_oddly.mp3";
import clip3 from "../../../assets/audio/ClassBook/U8/Page 70 - A/Item_004_albums.mp3";
import clip4 from "../../../assets/audio/ClassBook/U8/Page 70 - A/Item_005_super.mp3";
import clip5 from "../../../assets/audio/ClassBook/U8/Page 70 - A/Item_006_treasure.mp3";
import clip6 from "../../../assets/audio/ClassBook/U8/Page 70 - A/Item_007_miss.mp3";
import clip7 from "../../../assets/audio/ClassBook/U8/Page 70 - A/Item_008_orphanage.mp3";
import clip8 from "../../../assets/audio/ClassBook/U8/Page 70 - A/Item_009_jotting_down.mp3";
import clip9 from "../../../assets/audio/ClassBook/U8/Page 70 - A/Item_010_Today,_as_my_sister_and_I_were_looking_through_some_photo_,_a_worker_fro.mp3";
import clip10 from "../../../assets/audio/ClassBook/U8/Page 70 - A/Item_011_He_looked_at_us_because_he_wasn't_sure_how_to_begin,_and_then_he_told_us.mp3";
import clip11 from "../../../assets/audio/ClassBook/U8/Page 70 - A/Item_012_He_wanted_to_know_if_we_knew_of_anyone_who_was_missing_a_small_box_full.mp3";
import clip12 from "../../../assets/audio/ClassBook/U8/Page 70 - A/Item_013_Some_workers_at_the_orphanage_had_found_one_sitting_outside_the_back_doo.mp3";
import clip13 from "../../../assets/audio/ClassBook/U8/Page 70 - A/Item_014_They_thought_someone_might_it_and_then_come_looking_for_it,_so_they_put.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
  AudioSpeaker,
} from "../unit5/ExerciseAudioText";

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

const Review7_Page1_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const wordBank = [
    "limping",
    "stiff",
    "oddly",
    "albums",
    "super",
    "treasure",
    "miss",
    "orphanage",
    "jotting down",
  ];

  const questions = [
    "albums",
    "orphanage",
    "oddly",
    "treasure",
    "miss",
    "jotting down",
    "super",
    "limping",
    "stiff",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...answers];

    updated[i] = value;

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
        String("Please complete all answers.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Please complete all answers."));

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((a, i) => {
      const ok = normalize(a) === normalize(questions[i]);

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = questions.length;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:18px;text-align:center;">
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
    setAnswers([
      "albums",
      "orphanage",
      "oddly",
      "treasure",
      "miss",
      "jotting down",
      "super",
      "limping",
      "stiff",
    ]);

    setResult([true, true, true, true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width) => (
    <span className="relative inline-block">
      <input
        style={{
          ...(result[i] === true ? { borderBottomColor: "#16a34a" } : {}),
        }}
        aria-invalid={!!(result[i] === false)}
        title={`Story blank ${i + 1}, word from the box`}
        aria-label={`Story blank ${i + 1}, word from the box`}
        {...fieldKeys}
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          ${width}
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6D2980]
          font-semibold
          leading-none
          align-middle
          px-1

          ${result[i] === false ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {result[i] === false && (
        <span
          style={{
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
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
          }}
        >
          ✕
        </span>
      )}
    </span>
  );

  return (
    <div
      data-exercise-scope={"Review7_Page1_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review7_Page1_Q1.jsx"] input:focus-visible,[data-exercise-scope="Review7_Page1_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="Review7_Page1_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall" style={{gap:"30px"}}>
        {/* TITLE */}
        <ExerciseHeader
          isReview
          sectionLetter="A"
          title={<>Using the words in the box, finish the story.</>}
          subTitle="Read the whole sentence first, then choose the word that fits both the meaning and grammar before checking."
        />

        {/* WORD BOX */}
        <div
          style={{
            width: "-webkit-fill-available",
            background: "#E9E1EC",
            borderRadius: "14px",
            padding: "16px 30px",
            display: "grid",
            gridTemplateColumns: "repeat(5,1fr)",
            rowGap: "10px",
            margin: "0 auto 0px auto",
            fontSize: "17px",
          }}
        >
          {wordBank.map((word, i) => {
            return (
              <span key={i}>
                <AudioText
                  audio={audio}
                  id={`word-${i}`}
                  src={
                    {
                      limping: clip0,
                      stiff: clip1,
                      oddly: clip2,
                      albums: clip3,
                      super: clip4,
                      treasure: clip5,
                      miss: clip6,
                      orphanage: clip7,
                      "jotting down": clip8,
                    }[word]
                  }
                  label={`Hear ${word}`}
                >
                  {word}
                </AudioText>
              </span>
            );
          })}
        </div>

        {/* STORY */}
        <div className="text-[17px] leading-[2.5] mb-10">
          {/* Paragraph 1 */}
          <p className="mb-5">
            <span
              role="group"
              aria-roledescription="sentence audio"
              aria-keyshortcuts="Enter Space"
              tabIndex={0}
              data-choice
              data-sentence-audio="door-story-0"
              aria-label="Hear door-story part 1"
              onKeyDown={(event) => {
                if (
                  event.target !== event.currentTarget ||
                  (event.key !== "Enter" && event.key !== " ")
                )
                  return;
                event.preventDefault();
                event.stopPropagation();
                if (!event.repeat) audio.play("door-story-0", clip9);
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
              onClick={(event) => {
                if (
                  event.target.closest?.(
                    'input,textarea,select,button,[role="button"],[data-choice]',
                  ) !== event.currentTarget
                )
                  return;
                event.stopPropagation();
                audio.play("door-story-0", clip9);
              }}
              style={{
                position: "relative",
                borderRadius: 6,
                ...(audio.activeId === "door-story-0"
                  ? {
                      boxShadow: "0 0 0 3px #2563eb",
                      backgroundColor: "#dbeafe",
                    }
                  : {}),
              }}
            >
              Today, as my sister and I were looking through some photo{" "}
              {inputField(0, "w-[180px]")}, a worker from the local{" "}
              {inputField(1, "w-[190px]")} came to our door.{" "}
              {audio.activeId === "door-story-0" && <AudioSpeaker />}
            </span>
            <span
              role="group"
              aria-roledescription="sentence audio"
              aria-keyshortcuts="Enter Space"
              tabIndex={0}
              data-choice
              data-sentence-audio="door-story-1"
              aria-label="Hear door-story part 2"
              onKeyDown={(event) => {
                if (
                  event.target !== event.currentTarget ||
                  (event.key !== "Enter" && event.key !== " ")
                )
                  return;
                event.preventDefault();
                event.stopPropagation();
                if (!event.repeat) audio.play("door-story-1", clip10);
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
              onClick={(event) => {
                if (
                  event.target.closest?.(
                    'input,textarea,select,button,[role="button"],[data-choice]',
                  ) !== event.currentTarget
                )
                  return;
                event.stopPropagation();
                audio.play("door-story-1", clip10);
              }}
              style={{
                position: "relative",
                borderRadius: 6,
                ...(audio.activeId === "door-story-1"
                  ? {
                      boxShadow: "0 0 0 3px #2563eb",
                      backgroundColor: "#dbeafe",
                    }
                  : {}),
              }}
            >
              He looked at us {inputField(2, "w-[170px]")} because he wasn’t
              sure how to begin, and then he told us why he had come by.
              {audio.activeId === "door-story-1" && <AudioSpeaker />}
            </span>
          </p>

          {/* Paragraph 2 */}
          <p className="mb-5">
            <span
              role="group"
              aria-roledescription="sentence audio"
              aria-keyshortcuts="Enter Space"
              tabIndex={0}
              data-choice
              data-sentence-audio="treasure-story-0"
              aria-label="Hear treasure-story part 1"
              onKeyDown={(event) => {
                if (
                  event.target !== event.currentTarget ||
                  (event.key !== "Enter" && event.key !== " ")
                )
                  return;
                event.preventDefault();
                event.stopPropagation();
                if (!event.repeat) audio.play("treasure-story-0", clip11);
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
              onClick={(event) => {
                if (
                  event.target.closest?.(
                    'input,textarea,select,button,[role="button"],[data-choice]',
                  ) !== event.currentTarget
                )
                  return;
                event.stopPropagation();
                audio.play("treasure-story-0", clip11);
              }}
              style={{
                position: "relative",
                borderRadius: 6,
                ...(audio.activeId === "treasure-story-0"
                  ? {
                      boxShadow: "0 0 0 3px #2563eb",
                      backgroundColor: "#dbeafe",
                    }
                  : {}),
              }}
            >
              He wanted to know if we knew of anyone who was missing a small{" "}
              {inputField(3, "w-[180px]")} box full of gold coins.{" "}
              {audio.activeId === "treasure-story-0" && <AudioSpeaker />}
            </span>
            <span
              role="group"
              aria-roledescription="sentence audio"
              aria-keyshortcuts="Enter Space"
              tabIndex={0}
              data-choice
              data-sentence-audio="treasure-story-1"
              aria-label="Hear treasure-story part 2"
              onKeyDown={(event) => {
                if (
                  event.target !== event.currentTarget ||
                  (event.key !== "Enter" && event.key !== " ")
                )
                  return;
                event.preventDefault();
                event.stopPropagation();
                if (!event.repeat) audio.play("treasure-story-1", clip12);
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
              onClick={(event) => {
                if (
                  event.target.closest?.(
                    'input,textarea,select,button,[role="button"],[data-choice]',
                  ) !== event.currentTarget
                )
                  return;
                event.stopPropagation();
                audio.play("treasure-story-1", clip12);
              }}
              style={{
                position: "relative",
                borderRadius: 6,
                ...(audio.activeId === "treasure-story-1"
                  ? {
                      boxShadow: "0 0 0 3px #2563eb",
                      backgroundColor: "#dbeafe",
                    }
                  : {}),
              }}
            >
              Some workers at the orphanage had found one sitting outside the
              back door last week, and they brought it into the house
              {audio.activeId === "treasure-story-1" && <AudioSpeaker />}
            </span>
            <span
              role="group"
              aria-roledescription="sentence audio"
              aria-keyshortcuts="Enter Space"
              tabIndex={0}
              data-choice
              data-sentence-audio="treasure-story-2"
              aria-label="Hear treasure-story part 3"
              onKeyDown={(event) => {
                if (
                  event.target !== event.currentTarget ||
                  (event.key !== "Enter" && event.key !== " ")
                )
                  return;
                event.preventDefault();
                event.stopPropagation();
                if (!event.repeat) audio.play("treasure-story-2", clip13);
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
              onClick={(event) => {
                if (
                  event.target.closest?.(
                    'input,textarea,select,button,[role="button"],[data-choice]',
                  ) !== event.currentTarget
                )
                  return;
                event.stopPropagation();
                audio.play("treasure-story-2", clip13);
              }}
              style={{
                position: "relative",
                borderRadius: 6,
                ...(audio.activeId === "treasure-story-2"
                  ? {
                      boxShadow: "0 0 0 3px #2563eb",
                      backgroundColor: "#dbeafe",
                    }
                  : {}),
              }}
            >
              . They thought someone might {inputField(4, "w-[180px]")} it and
              then come looking for it, so they put it in a safe place,{" "}
              {inputField(5, "w-[220px]")} the amount that was found inside it.
              It had been more than a week, though, and there was no sign of
              anyone, except for an ice cream man selling some{" "}
              {inputField(6, "w-[170px]")} ice cream because it was the best
              they had ever tasted.
              {audio.activeId === "treasure-story-2" && <AudioSpeaker />}
            </span>
          </p>

          {/* Paragraph 3 */}
          <p>
            Anyway, now the workers are starting to wonder if maybe this was a
            donation. As the older man walked away, {inputField(7, "w-[180px]")}{" "}
            and {inputField(8, "w-[160px]")}, I thought to myself that I hoped
            the treasure box really was a donation and that the orphanage could
            keep the money.
          </p>
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

export default Review7_Page1_Q1;
