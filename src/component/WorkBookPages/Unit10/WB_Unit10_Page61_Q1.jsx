import soundK12 from "../../../assets/audio/Workbook/Unit 10/Page 61 - K/Item_012_Why_were_the_narrator_and_his_family_having_a_special_dinner_last_night.mp3";
import soundK11 from "../../../assets/audio/Workbook/Unit 10/Page 61 - K/Item_011_think_I_ate_too_much!.mp3";
import soundK10 from "../../../assets/audio/Workbook/Unit 10/Page 61 - K/Item_010_was_getting_sleepy.mp3";
import soundK9 from "../../../assets/audio/Workbook/Unit 10/Page 61 - K/Item_009_that_tasty_chocolate_cake._It_was_very_good._After_dinner,.mp3";
import soundK8 from "../../../assets/audio/Workbook/Unit 10/Page 61 - K/Item_008_arrive._We_finally_ate_the_turkey._It_was_delicious!_Then,_we_each_took.mp3";
import soundK7 from "../../../assets/audio/Workbook/Unit 10/Page 61 - K/Item_007_were_getting_hungry._Everyone_was_waiting_impatiently_for_my_grandparent.mp3";
import soundK6 from "../../../assets/audio/Workbook/Unit 10/Page 61 - K/Item_006_was_my_favorite_chocolate_cake._My_mom_took_the_turkey_from_the_oven._We.mp3";
import soundK5 from "../../../assets/audio/Workbook/Unit 10/Page 61 - K/Item_005_She_was_setting_the_table._My_dad_was_getting_a_special_cake_from_the_ba.mp3";
import soundK4 from "../../../assets/audio/Workbook/Unit 10/Page 61 - K/Item_004_from_the_cupboard._My_sister,_Ana,_was_putting_the_plates_neatly_on_the.mp3";
import soundK3 from "../../../assets/audio/Workbook/Unit 10/Page 61 - K/Item_003_almost_ready._My_mom_was_also_making_soup._My_big_brother,_George,_was_g.mp3";
import soundK2 from "../../../assets/audio/Workbook/Unit 10/Page 61 - K/Item_002_evening_because_everyone_was_working_together._The_turkey_that_my_mom_ma.mp3";
import soundK1 from "../../../assets/audio/Workbook/Unit 10/Page 61 - K/Item_001_Last_night_my_family_was_having_a_special_dinner!_It_was_special_because.mp3";
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
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import { HiArrowUpCircle } from "react-icons/hi2";
// IMAGE
import turkeyImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U10/Page 61/Asset 8.svg";
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

const WB_Unit_Test_Q34 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  // ------------------------
  // CLICKABLE WORDS
  // ------------------------

  const clickableWords = [
    "was having",
    "was working",
    "was baking",
    "was getting",
    "was putting",
    "was setting",
    "was getting",
    "were getting",
    "was waiting",
    "was getting",
  ];

  // ------------------------
  // QUESTIONS
  // ------------------------

  const answers = [
    "They were having a special dinner because it was the narrator’s birthday",

    "Everyone was getting hungry because the narrator’s mom took the turkey out of the oven. ",

    clickableWords,
  ];

  // ------------------------
  // STATES
  // ------------------------

  const [selectedWords, setSelectedWords] = useState([]);
  const [studentAnswers, setStudentAnswers] = useState(["", ""]);

  const [result, setResult] = useState({
    q1: undefined,
    q2: undefined,
    underline: false,
  });

  const [locked, setLocked] = useState(false);

  // ------------------------
  // NORMALIZE
  // ------------------------

  const normalize = normalizeAnswer;

  // ------------------------
  // TOGGLE WORD
  // ------------------------

  const [lockedWords, setLockedWords] = useState([]);
  const [wrongWords, setWrongWords] = useState([]);
  const storyParts = [
    "Last night my family was having a special dinner! It was special because we invited my grandparents. It was a great evening because everyone was working together. The turkey that my mom made was baking in the oven. It was almost ready. My mom was also making soup. My big brother, George, was getting the glasses",
    "from the cupboard. My sister, Ana, was putting the plates neatly on the table. She was setting the table. My dad was getting a special cake from the bakery. It was my favorite: chocolate cake. My mom took the turkey from the oven. We were getting hungry. Everyone was waiting impatiently for my grandparents to arrive. We finally ate the turkey. It was delicious! Then, we each took a slice from that tasty chocolate cake. It was very good. After dinner, I was getting sleepy. I think I ate too much!",
  ];
  const targets = () =>
    storyParts.flatMap((text, part) => {
      let local = 0;
      return text
        .split(
          /(was having|was working|was baking|was getting|was putting|was setting|were getting|was waiting)/g,
        )
        .flatMap((chunk) => {
          const start = local;
          local += chunk.length;
          return clickableWords.includes(chunk)
            ? [
                {
                  keys: Array.from(
                    chunk.matchAll(/\S+/g),
                    (word) => part + "-" + (start + word.index),
                  ),
                },
              ]
            : [];
        });
    });
  const returnToStory = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const story = event.currentTarget
      .closest("[data-exercise-scope]")
      .querySelector("[data-return-story]");
    story?.focus({ preventScroll: true });
    story?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const toggleWord = (key) => {
    if (locked || lockedWords.includes(key)) return;
    setSelectedWords((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
    setWrongWords((prev) => prev.filter((k) => k !== key));
    setResult((prev) => ({ ...prev, underline: false }));
    setAnnouncement("Word selection updated.");
  };

  // ------------------------
  // RENDER STORY
  // ------------------------

  const renderStory = (raw, offset = 0) => {
    const partId = offset === 0 ? 0 : 1,
      text = raw.replace(/\s+/g, " ").trim(),
      base = partId === 0 ? 0 : storyParts[0].length + 1;
    const renderTokens = (chunk, start) => {
      let at = start;
      return chunk.split(/(\s+)/).map((token, i) => {
        const position = at;
        at += token.length;
        if (!token.trim()) return token;
        const key = partId + "-" + position,
          selected = selectedWords.includes(key),
          correct = lockedWords.includes(key),
          wrong = wrongWords.includes(key);
        return (
          <span
            data-story-word={key}
            key={i}
            role="button"
            data-choice
            tabIndex={0}
            aria-pressed={selected}
            aria-disabled={locked || correct}
            aria-label={
              token +
              (correct
                ? ". Correct and locked."
                : wrong
                  ? ". Incorrect selection."
                  : "")
            }
            {...activationKeys}
            onClick={(event) => {
              event.stopPropagation();
              toggleWord(key);
            }}
            style={{
              cursor: locked || correct ? "default" : "pointer",
              borderRadius: 6,
              boxShadow: selected
                ? "inset 0 -3px " +
                  (correct ? "#16a34a" : wrong ? "#D1232A" : "#6D2980")
                : undefined,
            }}
          >
            {token}
          </span>
        );
      });
    };
    const renderRange = (start, end) => {
      let at = start;
      return text
        .slice(start, end)
        .split(
          /(was having|was working|was baking|was getting|was putting|was setting|were getting|was waiting)/g,
        )
        .map((chunk, i) => {
          const position = at;
          at += chunk.length;
          return clickableWords.includes(chunk) ? (
            <span
              key={i}
              style={{
                display: "inline-block",
                background: "transparent",
                border: "none",
                borderBottom: "3px solid transparent",
                padding: 0,
                margin: 0,
                lineHeight: "inherit",
              }}
            >
              {renderTokens(chunk, position)}
            </span>
          ) : (
            <span key={i}>{renderTokens(chunk, position)}</span>
          );
        });
    };
    return [
      { id: "story-0", src: soundK1, start: 0, end: 116 },
      { id: "story-1", src: soundK2, start: 116, end: 222 },
      { id: "story-2", src: soundK3, start: 222, end: 313 },
      { id: "story-3", src: soundK4, start: 313, end: 392 },
      { id: "story-4", src: soundK5, start: 392, end: 473 },
      { id: "story-5", src: soundK6, start: 473, end: 547 },
      { id: "story-6", src: soundK7, start: 547, end: 624 },
      { id: "story-7", src: soundK8, start: 624, end: 709 },
      { id: "story-8", src: soundK9, start: 709, end: 770 },
      { id: "story-9", src: soundK10, start: 770, end: 792 },
      { id: "story-10", src: soundK11, start: 792, end: 813 },
    ].map((part) => {
      const start = Math.max(0, part.start - base),
        end = Math.min(text.length, part.end - base);
      if (end <= start) return null;
      const first = part.start >= base,
        playing = audio.activeId === part.id;
      return (
        <span
          key={part.id}
          role="group"
          aria-roledescription="passage audio"
          aria-label={"Hear story part " + (Number(part.id.split("-")[1]) + 1)}
          tabIndex={first ? 0 : undefined}
          data-choice={first || undefined}
          data-audio-part={part.id}
          onClick={(event) => {
            event.stopPropagation();
            if (event.target.closest('[role="button"],button,input')) return;
            audio.play(part.id, part.src);
          }}
          onKeyDown={(event) => {
            if (
              event.target !== event.currentTarget ||
              (event.key !== "Enter" && event.key !== " ")
            )
              return;
            event.preventDefault();
            event.stopPropagation();
            if (!event.repeat) audio.play(part.id, part.src);
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
          style={{
            position: "relative",
            borderRadius: 6,
            cursor: "pointer",
            boxShadow: playing ? "0 0 0 3px #2563eb" : undefined,
            backgroundColor: playing ? "#dbeafe" : undefined,
          }}
        >
          {renderRange(start, end)}
          {first && playing && <AudioSpeaker />}
        </span>
      );
    });
  };

  // ------------------------
  // HANDLE INPUT
  // ------------------------

  const handleChange = (i, value) => {
    if (locked || result[`q${i + 1}`] === true) return;

    const updated = [...studentAnswers];

    updated[i] = value;

    setStudentAnswers(updated);

    setResult((prev) => ({
      ...prev,
      [`q${i + 1}`]: undefined,
    }));
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (locked) return;
    audio.stop();

    // VALIDATION

    if (selectedWords.length === 0) {
      (setAnnouncement(
        String("Please underline the phrases.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Please underline the phrases."));

      return;
    }

    if (studentAnswers.some((a) => !a.trim())) {
      (setAnnouncement(
        String("Please complete all answers.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Please complete all answers."));

      return;
    }

    // ------------------------
    // UNDERLINE
    // ------------------------

    const groups = targets(),
      allKeys = groups.flatMap((g) => g.keys),
      completed = groups.filter((g) =>
        g.keys.every((key) => selectedWords.includes(key)),
      ),
      wrong = selectedWords.filter((key) => !allKeys.includes(key));
    setLockedWords(completed.flatMap((g) => g.keys));
    setWrongWords(wrong);
    const underlineCorrect = Math.max(0, completed.length - wrong.length);

    const underlineOk = underlineCorrect === 10;

    // ------------------------
    // QUESTION 1
    // ------------------------

    const q1Ok = normalize(studentAnswers[0]) === normalize(answers[0]);

    // ------------------------
    // QUESTION 2
    // ------------------------

    const q2Ok = normalize(studentAnswers[1]) === normalize(answers[1]);

    // ------------------------
    // SCORE
    // ------------------------

    let correctCount = 0;

    correctCount += underlineCorrect;

    if (q1Ok) correctCount++;

    if (q2Ok) correctCount++;

    setResult({
      q1: q1Ok,
      q2: q2Ok,
      underline: underlineOk,
    });

    const total = 12;

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

  // ------------------------
  // SHOW ANSWERS
  // ------------------------

  const showAnswers = () => {
    audio.stop();
    setAnnouncement("Model answers shown and locked.");
    resetButtonRef.current?.focus({ preventScroll: true });
    setSelectedWords(targets().flatMap((g) => g.keys));
    setLockedWords(targets().flatMap((g) => g.keys));
    setWrongWords([]);

    setStudentAnswers([answers[0], answers[1]]);

    setResult({
      q1: true,
      q2: true,
      underline: true,
    });

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setSelectedWords([]);
    setLockedWords([]);
    setWrongWords([]);

    setStudentAnswers(["", ""]);

    setResult({
      q1: undefined,
      q2: undefined,
      underline: false,
    });

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i) => (
    <div className="relative w-full">
      <input
        style={{
          borderBottomColor:
            result[`q${i + 1}`] === true
              ? "#16a34a"
              : result[`q${i + 1}`] === false
                ? "#D1232A"
                : undefined,
        }}
        placeholder={"Your answer"}
        aria-invalid={result[`q${i + 1}`] === false}
        title={
          [
            "Why were the narrator and his family having a special dinner last night?",
            "Why do you think everyone was getting hungry?",
          ][i]
        }
        aria-label={
          [
            "Why were the narrator and his family having a special dinner last night?",
            "Why do you think everyone was getting hungry?",
          ][i]
        }
        {...fieldKeys}
        type="text"
        value={studentAnswers[i]}
        disabled={locked || result[`q${i + 1}`] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          w-full
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6D2980]
          font-semibold
          px-1

          ${result[`q${i + 1}`] === false ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {result[`q${i + 1}`] === false && (
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
    </div>
  );

  return (
    <div
      data-exercise-scope={"WB_Unit10_Page61_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit10_Page61_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit10_Page61_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit10_Page61_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[18px] w-full mb-10">
        {/* TITLE */}

        <ExerciseHeader
          isWorkbook
          sectionLetter="K"
          title={<>Read and write.</>}
          subTitle="Read the story for sequence and detail, then answer each question with evidence from the passage."
        />

        {/* STORY BOX */}
        <div
          aria-label={"Read the story and underline past progressive phrases"}
          role={"group"}
          tabIndex={-1}
          data-return-story={true}
          style={{
            position: "relative",
            padding: "10px 10px 0px 10px",
            fontSize: "17px",
            color: "#3b2b20",
            lineHeight: "2",
          }}
        >
          {/* الجزء العلوي الكامل */}

          <div>
            {renderStory(
              `
              Last night my family was having a special dinner! It was special because we invited my grandparents.

              It was a great evening because everyone was working together. The turkey that my mom made was baking in the oven. It was almost ready. My mom was also making soup. My big brother, George, was getting the glasses 
              `,
              0,
            )}
          </div>

          {/* الجزء السفلي مع الصورة */}

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "14px",
              marginTop: "10px",
            }}
          >
            {/* النص */}

            <div style={{ flex: 1 }}>
              {renderStory(
                `
from the cupboard. My sister, Ana, was putting the plates neatly on the table. She was setting the table. My dad was getting a special cake from the bakery. It was my favorite: chocolate cake. My mom took the turkey from the oven. We were getting hungry. Everyone was waiting impatiently for my grandparents to arrive. We finally ate the turkey. It was delicious! Then, we each took a slice from that tasty chocolate cake. It was very good. After dinner, I was getting sleepy. I think I ate too much!
`,
                100,
              )}
            </div>

            {/* الصورة */}

            <img
              src={turkeyImg}
              alt={"A roasted turkey on a platter with fruit and vegetables."}
              style={{
                width: "235px",
                height: "auto",
                objectFit: "contain",
                flexShrink: 0,
              }}
            />
          </div>
        </div>

        {/* QUESTION 1 */}

        <div className="mt-0 mb-2 ">
          <div className="flex items-start gap-4 mb-5">
            <span className="font-bold">1</span>

            <span>
              <AudioText
                audio={audio}
                id={"fragment-0"}
                src={soundK12}
                label={
                  "Hear Why were the narrator and his family having a special dinner last night?"
                }
              >
                Why were the narrator and his family having a special dinner
                last night?
              </AudioText>
            </span>
          </div>

          <div className="pl-[35px]">{inputField(0)}</div>
        </div>

        {/* QUESTION 2 */}

        <div className="mb-8">
          <div className="flex items-start gap-4 mb-5">
            <span className="font-bold">2</span>

            <span>Why do you think everyone was getting hungry?</span>
          </div>

          <div className="pl-[35px]">{inputField(1)}</div>
        </div>

        {/* QUESTION 3 */}

        <div className="mb-8">
          <div className="flex items-start gap-4">
            <span className="font-bold">3</span>

            <span className="flex items-center gap-2">
              Underline the past progressive phrases in the story.
              <HiArrowUpCircle
                onClick={returnToStory}
                aria-label={"Return to the story above"}
                data-choice={true}
                tabIndex={0}
                role={"button"}
                {...activationKeys}
                style={{
                  color: "#6D2980",
                  fontSize: "26px",
                  flexShrink: 0,
                }}
              />
            </span>
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

export default WB_Unit_Test_Q34;
