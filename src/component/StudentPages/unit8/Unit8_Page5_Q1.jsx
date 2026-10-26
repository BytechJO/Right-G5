import vocabAnts from "../../../assets/audio/ClassBook/U8/PG 64/sound11.mp3";
import clip0 from "../../../assets/audio/ClassBook/U8/Page 68 - A/Item_001_spotted.mp3";
import clip1 from "../../../assets/audio/ClassBook/U8/Page 68 - A/Item_002_board_game.mp3";
import clip2 from "../../../assets/audio/ClassBook/U8/Page 68 - A/Item_003_be_shocked.mp3";
import clip3 from "../../../assets/audio/ClassBook/U8/Page 68 - A/Item_004_Top_of_the_World.mp3";
import clip4 from "../../../assets/audio/ClassBook/U8/Page 68 - A/Item_005_second_home.mp3";
import clip5 from "../../../assets/audio/ClassBook/U8/Page 68 - A/Item_006_There's_a_great_new_you_can_play_with_your_friends._I_it_at_the_toy_stor.mp3";
import clip6 from "../../../assets/audio/ClassBook/U8/Page 68 - A/Item_007_That_toy_store_is_sometimes_my_._I_like_to_go_there_a_lot_to_look_at_the.mp3";
import clip7 from "../../../assets/audio/ClassBook/U8/Page 68 - A/Item_008_Anyway,_you_might_at_how_fun_and_inexpensive_this_game_is.mp3";
import clip8 from "../../../assets/audio/ClassBook/U8/Page 68 - A/Item_009_It's_all_about_climbing_a_mountain,_so_it's_called_On.mp3";
import clip9 from "../../../assets/audio/ClassBook/U8/Page 68 - A/Item_010_The_board_in_the_game_has_a_bunch_of_people_on_it_that_because_that's_ho.mp3";
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

const Unit8_Page5_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const wordBank = [
    "spotted",
    "board game",
    "look like ants",
    "be shocked",
    "Top of the World",
    "second home",
  ];

  const questions = [
    "board game",
    "spotted",
    "second home",
    "be shocked",
    "Top of the World",
    "look like ants",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);

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
      "board game",
      "spotted",
      "second home",
      "be shocked",
      "Top of the World",
      "look like ants",
    ]);

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", "", ""]);

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
        title={`Paragraph blank ${i + 1}, vocabulary word or expression from the box`}
        aria-label={`Paragraph blank ${i + 1}, vocabulary word or expression from the box`}
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
      data-exercise-scope={"Unit8_Page5_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit8_Page5_Q1.jsx"] input:focus-visible,[data-exercise-scope="Unit8_Page5_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="Unit8_Page5_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall" style={{ gap: "30px" ,marginBottom:"30px"}}>
        {/* TITLE */}
        <ExerciseHeader
          sectionLetter="A"
          title={<>Read and write.</>}
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
            gridTemplateColumns: "repeat(3,1fr)",
            rowGap: "10px",
            margin: "0 auto 0px auto",
            fontSize: "18px",
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
                      spotted: clip0,
                      "board game": clip1,
                      "be shocked": clip2,
                      "Top of the World": clip3,
                      "second home": clip4,
                      "look like ants": vocabAnts,
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

        {/* PARAGRAPH */}
        {/* PARAGRAPH */}
        <div className="text-[18px] leading-[3.3]">
          <span
            role="group"
            aria-roledescription="sentence audio"
            aria-keyshortcuts="Enter Space"
            tabIndex={0}
            data-choice
            data-sentence-audio="game-story-0"
            aria-label="Hear game-story part 1"
            onKeyDown={(event) => {
              if (
                event.target !== event.currentTarget ||
                (event.key !== "Enter" && event.key !== " ")
              )
                return;
              event.preventDefault();
              event.stopPropagation();
              if (!event.repeat) audio.play("game-story-0", clip5);
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
              audio.play("game-story-0", clip5);
            }}
            style={{
              position: "relative",
              borderRadius: 6,
              ...(audio.activeId === "game-story-0"
                ? { boxShadow: "0 0 0 3px #2563eb", backgroundColor: "#dbeafe" }
                : {}),
            }}
          >
            There’s a great new {inputField(0, "w-[180px]")} you can play with
            your friends. I {inputField(1, "w-[130px]")} it at the toy store the
            other day.{audio.activeId === "game-story-0" && <AudioSpeaker />}
          </span>
          <span
            role="group"
            aria-roledescription="sentence audio"
            aria-keyshortcuts="Enter Space"
            tabIndex={0}
            data-choice
            data-sentence-audio="game-story-1"
            aria-label="Hear game-story part 2"
            onKeyDown={(event) => {
              if (
                event.target !== event.currentTarget ||
                (event.key !== "Enter" && event.key !== " ")
              )
                return;
              event.preventDefault();
              event.stopPropagation();
              if (!event.repeat) audio.play("game-story-1", clip6);
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
              audio.play("game-story-1", clip6);
            }}
            style={{
              position: "relative",
              borderRadius: 6,
              ...(audio.activeId === "game-story-1"
                ? { boxShadow: "0 0 0 3px #2563eb", backgroundColor: "#dbeafe" }
                : {}),
            }}
          >
            {" "}
            That toy store is sometimes my {inputField(2, "w-[180px]")}. I like
            to go there a lot to look at the games and play on the computer
            {audio.activeId === "game-story-1" && <AudioSpeaker />}
          </span>
          <span
            role="group"
            aria-roledescription="sentence audio"
            aria-keyshortcuts="Enter Space"
            tabIndex={0}
            data-choice
            data-sentence-audio="game-story-2"
            aria-label="Hear game-story part 3"
            onKeyDown={(event) => {
              if (
                event.target !== event.currentTarget ||
                (event.key !== "Enter" && event.key !== " ")
              )
                return;
              event.preventDefault();
              event.stopPropagation();
              if (!event.repeat) audio.play("game-story-2", clip7);
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
              audio.play("game-story-2", clip7);
            }}
            style={{
              position: "relative",
              borderRadius: 6,
              ...(audio.activeId === "game-story-2"
                ? { boxShadow: "0 0 0 3px #2563eb", backgroundColor: "#dbeafe" }
                : {}),
            }}
          >
            . Anyway, you might {inputField(3, "w-[170px]")} at how fun and
            inexpensive this game is.
            {audio.activeId === "game-story-2" && <AudioSpeaker />}
          </span>
          <span
            role="group"
            aria-roledescription="sentence audio"
            aria-keyshortcuts="Enter Space"
            tabIndex={0}
            data-choice
            data-sentence-audio="game-story-3"
            aria-label="Hear game-story part 4"
            onKeyDown={(event) => {
              if (
                event.target !== event.currentTarget ||
                (event.key !== "Enter" && event.key !== " ")
              )
                return;
              event.preventDefault();
              event.stopPropagation();
              if (!event.repeat) audio.play("game-story-3", clip8);
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
              audio.play("game-story-3", clip8);
            }}
            style={{
              position: "relative",
              borderRadius: 6,
              ...(audio.activeId === "game-story-3"
                ? { boxShadow: "0 0 0 3px #2563eb", backgroundColor: "#dbeafe" }
                : {}),
            }}
          >
            {" "}
            It’s all about climbing a mountain, so it’s called On{" "}
            {inputField(4, "w-[210px]")}.{" "}
            {audio.activeId === "game-story-3" && <AudioSpeaker />}
          </span>
          <span
            role="group"
            aria-roledescription="sentence audio"
            aria-keyshortcuts="Enter Space"
            tabIndex={0}
            data-choice
            data-sentence-audio="game-story-4"
            aria-label="Hear game-story part 5"
            onKeyDown={(event) => {
              if (
                event.target !== event.currentTarget ||
                (event.key !== "Enter" && event.key !== " ")
              )
                return;
              event.preventDefault();
              event.stopPropagation();
              if (!event.repeat) audio.play("game-story-4", clip9);
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
              audio.play("game-story-4", clip9);
            }}
            style={{
              position: "relative",
              borderRadius: 6,
              ...(audio.activeId === "game-story-4"
                ? { boxShadow: "0 0 0 3px #2563eb", backgroundColor: "#dbeafe" }
                : {}),
            }}
          >
            The board in the game has a bunch of people on it that{" "}
            {inputField(5, "w-[190px]")} because that’s how you will see them
            when you get to the top of the mountain.
            {audio.activeId === "game-story-4" && <AudioSpeaker />}
          </span>
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

export default Unit8_Page5_Q1;
