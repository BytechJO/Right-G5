import clip9 from "../../../assets/audio/ClassBook/U8/Page 72 - B/Item_010_Rick_said,_No,_she_loves_having_people_over._You're_always_welcome_at_ou.mp3";
import vocabAnts from "../../../assets/audio/ClassBook/U8/PG 64/sound11.mp3";
import clip0 from "../../../assets/audio/ClassBook/U8/Page 72 - B/Item_001_hot-air_balloon.mp3";
import clip1 from "../../../assets/audio/ClassBook/U8/Page 72 - B/Item_002_spotted.mp3";
import clip2 from "../../../assets/audio/ClassBook/U8/Page 72 - B/Item_003_I'm_shocked.mp3";
import clip3 from "../../../assets/audio/ClassBook/U8/Page 72 - B/Item_004_second_home.mp3";
import clip4 from "../../../assets/audio/ClassBook/U8/Page 72 - B/Item_005_Look_at_the_._It's_up_so_high.mp3";
import clip5 from "../../../assets/audio/ClassBook/U8/Page 72 - B/Item_006_Yeah,_we_probably_down_here._they're_flying_today._It_looks_like_there_c.mp3";
import clip6 from "../../../assets/audio/ClassBook/U8/Page 72 - B/Item_007_Oh,_I_see_what_you_mean._I_hope_the_balloon_pilot_has_the_clouds_already.mp3";
import clip7 from "../../../assets/audio/ClassBook/U8/Page 72 - B/Item_008_Rick_offered,_Maybe_we_don't_want_to_stay_at_the_park_much_longer._Do_yo.mp3";
import clip8 from "../../../assets/audio/ClassBook/U8/Page 72 - B/Item_009_Frank_replied,_Thank_you._Your_house_is_getting_to_be_my_._Are_you_sure.mp3";

import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
  AudioSpeaker,
} from "../unit5/ExerciseAudioText";
import { SentenceGroup } from "../unit5/SentenceAudio";
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

const Review8_Page1_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const wordBank = [
    "hot-air balloon",
    "spotted",
    "I’m shocked",
    "look like ants",
    "second home",
  ];

  const questions = [
    "hot-air balloon",
    "look like ants",
    "I’m shocked",
    "spotted",
    "second home",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", ""]);

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
      "hot-air balloon",
      "look like ants",
      "I’m shocked",
      "spotted",
      "second home",
    ]);

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", ""]);

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
        title={`Conversation blank ${i + 1}, expression from the box`}
        aria-label={`Conversation blank ${i + 1}, expression from the box`}
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
      data-exercise-scope={"Review8_Page1_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review8_Page1_Q2.jsx"] input:focus-visible,[data-exercise-scope="Review8_Page1_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Review8_Page1_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall mb-10" style={{gap:"30px"}}>
        {/* TITLE */}
        <ExerciseHeader
          isReview
          sectionLetter="B"
          title={<>Write the correct words in each blank.</>}
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
            margin: "0 auto 35px auto",
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
                      "hot-air balloon": clip0,
                      spotted: clip1,
                      "I'm shocked": clip2,
                      "I’m shocked": clip2,
                      "second home": clip3,
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

        {/* STORY */}
        <div className="text-[17px] leading-[2.2] mb-7">
          <SentenceGroup
            label={"Hear dialogue part 1"}
            src={clip4}
            id={"dialog-0"}
            audio={audio}
            className="mb-3"
          >
            “Look at the {inputField(0, "w-[220px]")}. It’s up so high.”
          </SentenceGroup>

          <SentenceGroup
            label={"Hear dialogue part 2"}
            src={clip5}
            id={"dialog-1"}
            audio={audio}
            className="mb-3"
          >
            “Yeah, we probably {inputField(1, "w-[220px]")} down here.
            {inputField(2, "w-[220px]")} they’re flying today. It looks like
            there could be a storm coming soon,” noticed Rick.
          </SentenceGroup>

          <SentenceGroup
            label={"Hear dialogue part 3"}
            src={clip6}
            id={"dialog-2"}
            audio={audio}
            className="mb-3"
          >
            “Oh, I see what you mean. I hope the balloon pilot has{" "}
            {inputField(3, "w-[220px]")} the clouds already.”
          </SentenceGroup>

          <div className="mb-3">
            <span
              role="group"
              aria-roledescription="sentence audio"
              aria-keyshortcuts="Enter Space"
              tabIndex={0}
              data-choice
              data-sentence-audio="invitation-0"
              aria-label="Hear invitation part 1"
              onKeyDown={(event) => {
                if (
                  event.target !== event.currentTarget ||
                  (event.key !== "Enter" && event.key !== " ")
                )
                  return;
                event.preventDefault();
                event.stopPropagation();
                if (!event.repeat) audio.play("invitation-0", clip7);
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
                audio.play("invitation-0", clip7);
              }}
              style={{
                position: "relative",
                borderRadius: 6,
                ...(audio.activeId === "invitation-0"
                  ? {
                      boxShadow: "0 0 0 3px #2563eb",
                      backgroundColor: "#dbeafe",
                    }
                  : {}),
              }}
            >
              Rick offered, “Maybe we don’t want to stay at the park much
              longer. Do you want to come over?”
              <br />
              {audio.activeId === "invitation-0" && <AudioSpeaker />}
            </span>
            <span
              role="group"
              aria-roledescription="sentence audio"
              aria-keyshortcuts="Enter Space"
              tabIndex={0}
              data-choice
              data-sentence-audio="invitation-1"
              aria-label="Hear invitation part 2"
              onKeyDown={(event) => {
                if (
                  event.target !== event.currentTarget ||
                  (event.key !== "Enter" && event.key !== " ")
                )
                  return;
                event.preventDefault();
                event.stopPropagation();
                if (!event.repeat) audio.play("invitation-1", clip8);
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
                audio.play("invitation-1", clip8);
              }}
              style={{
                position: "relative",
                borderRadius: 6,
                ...(audio.activeId === "invitation-1"
                  ? {
                      boxShadow: "0 0 0 3px #2563eb",
                      backgroundColor: "#dbeafe",
                    }
                  : {}),
              }}
            >
              {" "}
              Frank replied, “Thank you. Your house is getting to be my{" "}
              {inputField(4, "w-[220px]")}. Are you sure your mom won’t mind?”
              {audio.activeId === "invitation-1" && <AudioSpeaker />}
            </span>
          </div>

          <SentenceGroup
            label={"Hear Rick reply"}
            src={clip9}
            id={"dialog-4"}
            audio={audio}
          >
            Rick said, “No, she loves having people over. You’re always welcome
            at our house.”
          </SentenceGroup>
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

export default Review8_Page1_Q2;
