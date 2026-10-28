import soundC10 from "../../../assets/audio/Workbook/Unit 5/Page 28 - C/Item_010_Underline_all_the_vocabulary_words_and_write_them_down_below._@.mp3";
import soundC9 from "../../../assets/audio/Workbook/Unit 5/Page 28 - C/Item_009_lots_of_fun_there.mp3";
import soundC8 from "../../../assets/audio/Workbook/Unit 5/Page 28 - C/Item_008_everything_was_written_in_an_information_booklet_in_English._We_had.mp3";
import soundC7 from "../../../assets/audio/Workbook/Unit 5/Page 28 - C/Item_007_know_the_language,_but_we_didn't_need_to_ask_around_for_help_because.mp3";
import soundC6 from "../../../assets/audio/Workbook/Unit 5/Page 28 - C/Item_006_dish._It_was_so_delicious_that_my_mom_asked_for_the_recipe._We_didn't.mp3";
import soundC5 from "../../../assets/audio/Workbook/Unit 5/Page 28 - C/Item_005_My_sister_and_I_both_shared_a_plate_of_shish_kebabs._We_ate_the_entire.mp3";
import soundC4 from "../../../assets/audio/Workbook/Unit 5/Page 28 - C/Item_004_Mediterranean_food._The_shish_kebabs_were_part_of_a_big_barbecue.mp3";
import soundC3 from "../../../assets/audio/Workbook/Unit 5/Page 28 - C/Item_003_some_fish_in_the_water._Luckily,_there_weren't_any_sharks!_We_ate.mp3";
import soundC2 from "../../../assets/audio/Workbook/Unit 5/Page 28 - C/Item_002_our_vacation_on_the_beach,_and_we_sat_next_to_the_sea._There_were.mp3";
import soundC1 from "../../../assets/audio/Workbook/Unit 5/Page 28 - C/Item_001_In_the_summer,_my_family_and_I_went_to_the_Middle_East._We_started_off.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import {
  AudioFeedback,
  AudioSpeaker,
} from "../../StudentPages/unit5/ExerciseAudioText";

import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import { HiArrowUpCircle } from "react-icons/hi2";

// IMAGES
import grillImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U5/Page 28/Asset 12.svg";
import foodImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U5/Page 28/Asset 13.svg";

// Each existing recording owns its corresponding printed range; no timestamp guesses.
const STORY_AUDIO_PARTS = [
  { id: "story-part-1", src: soundC1, start: 0, end: 15 },
  { id: "story-part-2", src: soundC2, start: 15, end: 29 },
  { id: "story-part-3", src: soundC3, start: 29, end: 41 },
  { id: "story-part-4", src: soundC4, start: 41, end: 52 },
  { id: "story-part-5", src: soundC5, start: 52, end: 67 },
  { id: "story-part-6", src: soundC6, start: 67, end: 81 },
  { id: "story-part-7", src: soundC7, start: 81, end: 94 },
  { id: "story-part-8", src: soundC8, start: 94, end: 105 },
  { id: "story-part-9", src: soundC9, start: 105, end: 109 },
];

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

const WB_Unit5_Page28_Q1 = () => {
  const returnToStory = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const story = event.currentTarget.closest('[data-exercise-scope]')?.querySelector('[data-return-story]');
    if (!story) return;
    story.focus({ preventScroll: true });
    story.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  };

  const audio = useExerciseAudio();
  const passageTouch = React.useRef(null);
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const vocabAnswers = [
    "sharks",
    "Mediterranean food",
    "shish kebabs",
    "barbecue",
    "both",
    "entire",
    "recipe",
    "information",
  ];

  const questionAnswer =
    "Can I please have a second plate of the shish kebab dish?";

  const [studentAnswers, setStudentAnswers] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const storyWords = [
    "In",
    "the",
    "summer,",
    "my",
    "family",
    "and",
    "I",
    "went",
    "to",
    "the",
    "Middle",
    "East.",
    "We",
    "started",
    "off",
    "our",
    "vacation",
    "on",
    "the",
    "beach,",
    "and",
    "we",
    "sat",
    "next",
    "to",
    "the",
    "sea.",
    "There",
    "were",
    "some",
    "fish",
    "in",
    "the",
    "water.",
    "Luckily,",
    "there",
    "weren’t",
    "any",
    "sharks!",
    "We",
    "ate",
    "Mediterranean",
    "food.",
    "The",
    "shish",
    "kebabs",
    "were",
    "part",
    "of",
    "a",
    "big",
    "barbecue.",
    "My",
    "sister",
    "and",
    "I",
    "both",
    "shared",
    "a",
    "plate",
    "of",
    "shish",
    "kebabs.",
    "We",
    "ate",
    "the",
    "entire",
    "dish.",
    "It",
    "was",
    "so",
    "delicious",
    "that",
    "my",
    "mom",
    "asked",
    "for",
    "the",
    "recipe.",
    "We",
    "didn’t",
    "know",
    "the",
    "language,",
    "but",
    "we",
    "didn’t",
    "need",
    "to",
    "ask",
    "around",
    "for",
    "help",
    "because",
    "everything",
    "was",
    "written",
    "in",
    "an",
    "information",
    "booklet",
    "in",
    "English.",
    "We",
    "had",
    "lots",
    "of",
    "fun",
    "there.",
  ];

  const clickablePhrases = [
    "sharks!",
    "Mediterranean food.",
    "shish kebabs",
    "barbecue.",
    "both",
    "entire",
    "recipe.",
    "information",
  ];
  const [selectedWords, setSelectedWords] = useState([]);
  const [lockedWords, setLockedWords] = useState([]);
  const [wrongWords, setWrongWords] = useState([]);
  const underlineGroups = clickablePhrases.map((phrase) => {
    const tokens = normalizeAnswer(phrase).split(" ");
    const occurrences = storyWords.flatMap((_, start) =>
      tokens.every((token, offset) => normalizeAnswer(storyWords[start + offset] || "") === token)
        ? [tokens.map((_, offset) => start + offset)]
        : [],
    );
    return { phrase, occurrences };
  });
  const correctWordIndexes = new Set(underlineGroups.flatMap((group) => group.occurrences.flat()));

  const toggleUnderline = (index) => {
    if (locked || lockedWords.includes(index)) return;
    setAnnouncement(storyWords[index] + (selectedWords.includes(index) ? " underline removed." : " underlined."));
    setSelectedWords((previous) => previous.includes(index) ? previous.filter((value) => value !== index) : [...previous, index]);
    setWrongWords((previous) => previous.filter((value) => value !== index));
  };
  const [questionInput, setQuestionInput] = useState("");

  const [result, setResult] = useState([]);

  const [questionResult, setQuestionResult] = useState(undefined);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...studentAnswers];

    updated[i] = value;

    setStudentAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const handleQuestionChange = (value) => {
    if (locked || questionResult === true) return;

    setQuestionInput(value);

    setQuestionResult(undefined);
  };

  const checkAnswers = () => {
    if (locked) return;
    passageTouch.current = null;
    audio.stop();

    // لازم يعمل underline لكل الكلمات
    if (selectedWords.length === 0) {
      setAnnouncement("Please underline at least one word first.");
      ValidationAlert.info("Please underline at least one word first.");
      return;
    }

    const hasEmptyInputs = studentAnswers.some((a) => !a.trim());

    if (hasEmptyInputs || !questionInput.trim()) {
      (setAnnouncement(
        String("Please complete all answers.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Please complete all answers."));

      return;
    }

    const missingUnderlines = underlineGroups.filter((group) =>
      !group.occurrences.some((indices) => indices.every((index) => selectedWords.includes(index))),
    );
    const wrong = selectedWords.filter((index) => !correctWordIndexes.has(index));
    setWrongWords(wrong);
    setLockedWords((previous) => [...new Set([...previous, ...selectedWords.filter((index) => correctWordIndexes.has(index))])]);
    let correctCount = 0;

    // --------------------------------
    // CHECK INPUTS
    // --------------------------------

    const normalizedAnswers = vocabAnswers.map((a) => normalize(a));

    const usedAnswers = studentAnswers.flatMap((answer, index) =>
      result[index] === true
        ? [normalizedAnswers.indexOf(normalize(answer))]
        : [],
    );

    const newResults = studentAnswers.map((answer, slot) => {
      const normalized = normalize(answer);

      const foundIndex = normalizedAnswers.findIndex(
        (a, i) => a === normalized && !usedAnswers.includes(i),
      );

      const ok = result[slot] === true || foundIndex !== -1;

      if (ok) {
        if (foundIndex !== -1) usedAnswers.push(foundIndex);

        correctCount++;
      }

      return ok;
    });

    // --------------------------------
    // CHECK QUESTION
    // --------------------------------

    const questionOk = normalize(questionInput) === normalize(questionAnswer);

    if (questionOk) {
      correctCount++;
    }

    setResult(newResults);

    setQuestionResult(questionOk);

    // --------------------------------
    // SCORE
    // --------------------------------

    const total = 9;
    const complete = correctCount === total && missingUnderlines.length === 0 && wrong.length === 0;
    const underlineFeedback = `${missingUnderlines.length} vocabulary phrases still need complete underlines. ${wrong.length} incorrect word underlines. You can change the incorrect answers.`;

    const color =
      complete ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
    <div style="font-size:18px;text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${correctCount} / ${total}
      </span>
    </div>
  ` + (complete ? "" : `<div style="font-size:16px;text-align:center;">${underlineFeedback}</div>`);

    if (complete) {
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

    passageTouch.current = null;
    audio.stop();
    setAnnouncement("Model answers shown and locked.");
    resetButtonRef.current?.focus({ preventScroll: true });
    setStudentAnswers(vocabAnswers);

    setQuestionInput(questionAnswer);

    setSelectedWords([...correctWordIndexes]);
    setLockedWords([...correctWordIndexes]);
    setWrongWords([]);

    setResult([true, true, true, true, true, true, true, true]);

    setQuestionResult(true);

    setLocked(true);
  };

  const handleReset = () => {
    setLockedWords([]);
    setWrongWords([]);
    passageTouch.current = null;
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", "", "", "", "", "", "", ""]);

    setQuestionInput("");

    setSelectedWords([]);

    setResult([]);

    setQuestionResult(undefined);

    setLocked(false);
  };
  const inputField = (value, onChange, isWrong, width = "240px", label) => (
    <div className="relative inline-block">
      <input
        aria-invalid={isWrong === false}
        placeholder={
          label.startsWith("How")
            ? "Polite request"
            : "Vocabulary word or phrase"
        }
        title={label}
        aria-label={label}
        {...fieldKeys}
        type="text"
        value={value}
        disabled={locked || isWrong === true}
        onChange={onChange}
        className={`
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6D2980]
          font-semibold
          px-1

          ${isWrong === false ? "border-[#D1232A]" : "border-black"}
        `}
        style={{
          width,
          borderBottomColor: isWrong === true ? "#16a34a" : undefined,
        }}
      />

      {isWrong === false && (
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

    const renderStoryWord = (word, index) => {
    const selected = selectedWords.includes(index);
    const isWordLocked = lockedWords.includes(index);
    const wrong = wrongWords.includes(index);
    return <span
                        role="button"
                        tabIndex={locked || isWordLocked ? -1 : 0}
                        data-choice
                        data-word-index={index}
                        aria-pressed={selected}
                        aria-disabled={locked || isWordLocked}
                        aria-label={`Word ${index + 1}: ${word}. ${isWordLocked ? "Correct and locked." : locked ? "The answers are locked." : wrong ? "Not correct. Press to remove the underline." : selected ? "Underlined. Press to remove." : "Press to underline."}`}
                        {...activationKeys}
                        onClick={() => toggleUnderline(index)}
                        style={{
                          cursor: locked || isWordLocked ? "default" : "pointer",
                          borderBottom: `3px solid ${selected ? isWordLocked ? "#16a34a" : wrong ? "#D1232A" : "#6D2980" : "transparent"}`,
                        }}
                      >
                        {word}
                      </span>;
  };

const renderStoryRange = (start, end) => {
                  let skipCount = 0;
                  return storyWords.slice(start, end).map((word, offset) => { const index = start + offset;
                    if (skipCount > 0) { skipCount--; return null; }
                    // Keep the original phrase footprints while each word is its own control.
                    const phrase = clickablePhrases.find((phrase) => phrase.split(" ").every((token, offset) => storyWords[index + offset] === token));
                    if (phrase) {
                      const tokens = phrase.split(" ");
                      skipCount = tokens.length - 1;
                      return <React.Fragment key={index}>
                        <span style={{display:"inline-block",borderBottom:"3px solid transparent",padding:"0 2px",fontSize:"18px"}}>
                          {tokens.map((token, offset) => <React.Fragment key={offset}>{offset > 0 ? " " : null}{renderStoryWord(token, index + offset)}</React.Fragment>)}
                        </span>{" "}
                      </React.Fragment>;
                    }
                    return <React.Fragment key={index}>{renderStoryWord(word,index)}{" "}</React.Fragment>;
                  });
                };

return (
    <div
      data-exercise-scope={"WB_Unit5_Page28_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit5_Page28_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit5_Page28_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit5_Page28_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[18px]">
        {/* TITLE */}
        <ExerciseHeader
          isWorkbook
          sectionLetter="C"
          title={<>Read and write.</>}
          subTitle="Read the passage once for meaning, then go back to identify the requested vocabulary before writing the answers."
        />

        {/* READING BOX */}
        <div
          onTouchStartCapture={(event) => {
            passageTouch.current = null;
            if (event.touches.length !== 1) return;
            const touch = event.changedTouches[0];
            const hit = document.elementFromPoint(touch.clientX, touch.clientY);
            const part = hit?.getAttribute("data-audio-part");
            if (part === null || part === undefined || !event.currentTarget.contains(hit)) return;
            passageTouch.current = { identifier: touch.identifier, x: touch.clientX, y: touch.clientY, part: Number(part) };
          }}
          onTouchMoveCapture={(event) => {
            const pending = passageTouch.current;
            if (!pending) return;
            const touch = Array.from(event.touches).find((item) => item.identifier === pending.identifier);
            if (event.touches.length !== 1 || !touch || Math.hypot(touch.clientX - pending.x, touch.clientY - pending.y) > 8) passageTouch.current = null;
          }}
          onTouchEndCapture={(event) => {
            const pending = passageTouch.current;
            passageTouch.current = null;
            if (!pending || event.touches.length !== 0) return;
            const touch = Array.from(event.changedTouches).find((item) => item.identifier === pending.identifier);
            if (!touch || Math.hypot(touch.clientX - pending.x, touch.clientY - pending.y) > 8) return;
            const hit = document.elementFromPoint(touch.clientX, touch.clientY);
            if (hit?.getAttribute("data-audio-part") !== String(pending.part) || !event.currentTarget.contains(hit)) return;
            // Use the exact touched gap, not the browser's nearby-word click adjustment.
            event.preventDefault();
            event.stopPropagation();
            const part = STORY_AUDIO_PARTS[pending.part];
            audio.play(part.id, part.src);
          }}
          onTouchCancelCapture={() => { passageTouch.current = null; }}

          style={{ borderRadius: "0.75rem" }}
          
          
          
          
          className="border-2 border-[#7D3C98] rounded-xl p-5 mb-8"
        >
          <div className="flex gap-5 items-start">
            <div className="leading-normal flex-1">
              <div data-choice={true} aria-label={"Story above the questions"} role={"region"} tabIndex={-1} data-return-story={true} className="leading-normal flex-1">
                {STORY_AUDIO_PARTS.map((part, partIndex) => {
                  const playing = audio.activeId === part.id;
                  const audioKeys = (event) => {
                    if (event.target !== event.currentTarget || (event.key !== "Enter" && event.key !== " ")) return;
                    event.preventDefault();
                    event.stopPropagation();
                    if (event.type === "keydown" && !event.repeat) audio.play(part.id, part.src);
                  };
                  return (
                    <span
                      key={part.id}
                      role="group"
                      aria-roledescription="passage audio"
                      aria-label={`Hear passage part ${partIndex + 1} of ${STORY_AUDIO_PARTS.length}. Press Enter or Space to listen.`}
                      aria-keyshortcuts="Enter Space"
                      tabIndex={0}
                      data-choice
                      data-audio-part={partIndex}
                      onKeyDown={audioKeys}
                      onKeyUp={audioKeys}
                      onClick={(event) => {
                        if (event.target.closest?.('button, input, textarea, select, a, [role="button"]')) return;
                        event.stopPropagation();
                        audio.play(part.id, part.src);
                      }}
                      style={{
                        position: "relative",
                        cursor: "pointer",
                        borderRadius: 6,
                        boxShadow: playing ? "0 0 0 3px #2563eb" : undefined,
                        backgroundColor: playing ? "#dbeafe" : undefined,
                      }}
                    >
                      {renderStoryRange(part.start, part.end)}
                      {playing && <AudioSpeaker />}
                    </span>
                  );
                })}
              </div>
            </div>

            <img
              src={grillImg}
              alt={"Meat skewers cooking on an outdoor barbecue grill."}
              style={{
                width: "250px",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        {/* Q1 */}
        <div className="mb-10">
          <div className="mb-5">
            <span
              style={{
                position: "relative",
                cursor: "pointer",
                borderRadius: 6,
                backgroundColor:
                  audio.activeId === "underline-instructions"
                    ? "#dbeafe"
                    : undefined,
                boxShadow:
                  audio.activeId === "underline-instructions"
                    ? "0 0 0 3px #2563eb"
                    : undefined,
              }}
              onClick={() => audio.play("underline-instructions", soundC10)}
              aria-label={"Hear the vocabulary underlining instructions"}
              data-choice={true}
              tabIndex={0}
              role={"button"}
              {...activationKeys}
              className="flex items-center gap-2"
            >
              <span className="font-bold mr-2">1</span>
              Underline all the vocabulary words and write them down below.
              <HiArrowUpCircle onKeyUp={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}} onKeyDown={event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)returnToStory(event);}} onClick={returnToStory} aria-label={"Return to the story above"} data-return-arrow={true} data-choice={true} tabIndex={0} role={"button"}
                style={{
                  color: "#6D2980",
                  fontSize: "26px",
                  flexShrink: 0,
                cursor:"pointer",borderRadius:"50%","--exercise-focus-radius":"50%"}}
              />
              {audio.activeId === "underline-instructions" && <AudioSpeaker />}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-y-5 gap-x-14">
            {studentAnswers.map((answer, index) => (
              <div key={index}>
                {inputField(
                  answer,
                  (e) => handleChange(index, e.target.value),
                  result[index],
                  "260px",
                  `Vocabulary answer ${index + 1}: write an underlined word or phrase`,
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Q2 */}
        <div>
          <div className="flex items-start justify-between gap-8 mb-10">
            <div className="flex-1">
              <div className="mb-5">
                <span className="font-bold mr-2">2</span>
                How would you politely ask the server for a second plate of
                shish kebabs?
              </div>

              {inputField(
                questionInput,
                (e) => handleQuestionChange(e.target.value),
                questionResult,
                "600px",
                "How would you politely ask the server for a second plate of shish kebabs?",
              )}
            </div>

            <img
              src={foodImg}
              alt={
                "Grilled meat and vegetables on skewers, served on a plate with salad."
              }
              style={{
                width: "170px",
                height: "auto",
                objectFit: "contain",
              }}
            />
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

export default WB_Unit5_Page28_Q1;
