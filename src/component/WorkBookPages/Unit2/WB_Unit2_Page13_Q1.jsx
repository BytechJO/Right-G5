import soundJ9 from "../../../assets/audio/Workbook/unit 2/Page 13 - J/Item_009_Write_all_the_vocabulary_words_and_expressions_used_in_the_story.mp3";
import soundJ8 from "../../../assets/audio/Workbook/unit 2/Page 13 - J/Item_008_Underline_the_relative_clauses_in_the_story._@.mp3";
import soundJ7 from "../../../assets/audio/Workbook/unit 2/Page 13 - J/Item_007_sister_who_is_so_cute.mp3";
import soundJ6 from "../../../assets/audio/Workbook/unit 2/Page 13 - J/Item_006_and_twisty._We_go_to_the_carnival_a_couple_of_times_a_month._I_love_my.mp3";
import soundJ5 from "../../../assets/audio/Workbook/unit 2/Page 13 - J/Item_005_there,_she_wants_to_ride_the_merry-go-round._I_like_rides_that_are_crazy.mp3";
import soundJ3 from "../../../assets/audio/Workbook/unit 2/Page 13 - J/Item_003_wants_me_to_take_her_there_first_thing_after_school._Whenever_we_go.mp3";
import soundJ2 from "../../../assets/audio/Workbook/unit 2/Page 13 - J/Item_002_play_with_my_kite._She_loves_the_carnival_that_is_near_our_school._She.mp3";
import soundJ1 from "../../../assets/audio/Workbook/unit 2/Page 13 - J/Item_001_Wendy,_who_is_my_sister,_always_begs_me_to_play_with_her._She_loves_to.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
} from "../../StudentPages/unit5/ExerciseAudioText";
import { SentenceGroup } from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img from "../../../assets/imgs/pages/workbook/Right Int WB G5 U2/Page 13/Asset 8.svg";
import { HiArrowUpCircle } from "react-icons/hi2";
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
const WB_Unit2_Page13_Q1 = () => {
  const returnToStory = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const story = event.currentTarget.closest('[data-exercise-scope]')?.querySelector('[data-return-story]');
    if (!story) return;
    story.focus({ preventScroll: true });
    story.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  };

  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");
  const vocabAnswers = [
    "begs",
    "carnival",
    "merry-go-round",
    "crazy",
    "twisty",
    "couple",
  ];
  const qaAnswers = [
    "They go to the carnival near their school.",
    " They go to the carnival a couple of times a month",
    "The narrator likes rides that are crazy and twisty.",
  ];
  const storyWords = [
    "Wendy,",
    "who",
    "is",
    "my",
    "sister,",
    "always",
    "begs",
    "me",
    "to",
    "play",
    "with",
    "her.",
    "She",
    "loves",
    "to",
    "play",
    "with",
    "my",
    "kite.",
    "She",
    "loves",
    "the",
    "carnival",
    "that",
    "is",
    "near",
    "our",
    "school.",
    "She",
    "wants",
    "me",
    "to",
    "take",
    "her",
    "there",
    "first",
    "thing",
    "after",
    "school.",
    "Whenever",
    "we",
    "go",
    "there,",
    "she",
    "wants",
    "to",
    "ride",
    "the",
    "merry-go-round.",
    "I",
    "like",
    "rides",
    "that",
    "are",
    "crazy",
    "and",
    "twisty.",
    "We",
    "go",
    "to",
    "the",
    "carnival",
    "a",
    "couple",
    "of",
    "times",
    "a",
    "month.",
    "I",
    "love",
    "my",
    "sister",
    "who",
    "is",
    "so",
    "cute.",
  ];
  const clauses = [
      {
        start: 1,
        text: "who is my sister",
      },
      {
        start: 23,
        text: "that is near our school",
      },
      {
        start: 72,
        text: "who is so cute",
      },
    ];
  const [wrongWords, setWrongWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [vocabAnswersState, setVocabAnswersState] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [qaAnswersState, setQaAnswersState] = useState(["", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);
  const normalize = normalizeAnswer;
  const underliningComplete = clauses.every((_, i) => result[i] === true);
  const toggleUnderline = (index) => {
    const clauseIndex = clauses.findIndex(clause => index >= clause.start && index < clause.start + clause.text.split(" ").length);
    if (locked || underliningComplete || (clauseIndex !== -1 && result[clauseIndex] === true)) return;
    const selected = selectedWords.includes(index);
    setSelectedWords(previous => selected ? previous.filter(value => value !== index) : [...previous, index]);
    setWrongWords(previous => previous.filter(value => value !== index));
    if (clauseIndex !== -1) setResult(previous => { const next = [...previous]; next[clauseIndex] = undefined; return next; });
    setAnnouncement(storyWords[index] + (selected ? " underline removed." : " underlined."));
  };
  const handleVocabChange = (i, value) => {
    if (locked || result[i + 3] === true) return;
    const updated = [...vocabAnswersState];
    updated[i] = value;
    setVocabAnswersState(updated);
    setResult((prev) => {
      const copy = [...prev];
      copy[i + 3] = undefined;
      return copy;
    });
  };
  const handleQaChange = (i, value) => {
    if (locked || (i === 2 && result[9] === true)) return;
    const updated = [...qaAnswersState];
    updated[i] = value;
    setQaAnswersState(updated);
    setResult((prev) => {
      const copy = [...prev];
      copy[i + 9] = undefined;
      return copy;
    });
  };
  const checkAnswers = () => {
    if (locked) return;
    audio.stop();
    
    const hasEmptyVocab = vocabAnswersState.some((a) => !a.trim());
    const hasEmptyQa = !qaAnswersState[0].trim() || !qaAnswersState[1].trim();
    if (selectedWords.length === 0) {
      (setAnnouncement(
        String("Underline at least one clause.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Underline at least one clause."));
      return;
    }
    if (hasEmptyVocab) {
      (setAnnouncement(
        String("Please complete all vocabulary answers.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Please complete all vocabulary answers."));
      return;
    }
    if (hasEmptyQa) {
      (setAnnouncement(
        String("Please answer all questions.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Please answer all questions."));
      return;
    }
    let correctCount = 0;
    const newResults = [];

    const extraWords = selectedWords.filter(index => !clauses.some(clause => index >= clause.start && index < clause.start + clause.text.split(" ").length));
    setWrongWords(extraWords);

    // UNDERLINE RESULTS
    const underlineResults = clauses.map((clause, clauseIndex) => {
      const words = clause.text.split(" ");
      let indexes = [];
      for (let i = 0; i < words.length; i++) {
        indexes.push(clause.start + i);
      }
      const ok = result[clauseIndex] === true || (extraWords.length === 0 && indexes.every((idx) => selectedWords.includes(idx)));
      if (ok) correctCount++;
      return ok;
    });
    newResults.push(...underlineResults);

    // VOCAB RESULTS
    const usedAnswers = vocabAnswersState.flatMap((a, i) =>
      result[i + 3] === true
        ? [vocabAnswers.findIndex((v) => normalize(v) === normalize(a))]
        : [],
    );
    vocabAnswersState.forEach((userAnswer, slot) => {
      const normalizedUser = normalize(userAnswer);
      const matchedIndex = vocabAnswers.findIndex(
        (correctAnswer, idx) =>
          normalize(correctAnswer) === normalizedUser &&
          !usedAnswers.includes(idx),
      );
      const ok = result[slot + 3] === true || matchedIndex !== -1;
      newResults.push(ok);
      if (ok) {
        correctCount++;
        if (matchedIndex !== -1) usedAnswers.push(matchedIndex);
      }
    });

    // Q5 ONLY
    const q5ok = normalize(qaAnswersState[2]) === normalize(qaAnswers[2]);
    newResults.push(q5ok);
    if (q5ok) correctCount++;
    setResult(newResults);
    const total = 10;
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
    resetButtonRef.current?.focus({
      preventScroll: true,
    });
    setWrongWords([]);
    setSelectedWords([1, 2, 3, 4, 23, 24, 25, 26, 27, 72, 73, 74, 75]);
    setVocabAnswersState(vocabAnswers);
    setResult(Array(10).fill(true));
    setQaAnswersState(qaAnswers);
    setLocked(true);
  };
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setWrongWords([]);
    setSelectedWords([]);
    setVocabAnswersState(["", "", "", "", "", ""]);
    setQaAnswersState(["", "", ""]);
    setResult([]);
    setLocked(false);
  };
  const inputField = (value, onChange, isWrong, label, isCorrect = false) => (
    <div className="relative inline-block w-full">
      <input
        style={{
          borderBottomColor: isCorrect || locked ? "#16a34a" : undefined,
        }}
        placeholder={"Answer"}
        title={label}
        aria-label={label}
        {...fieldKeys}
        type="text"
        value={value}
        disabled={locked || isCorrect}
        onChange={onChange}
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

          ${isWrong ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {isWrong && (
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
      data-exercise-scope={"WB_Unit2_Page13_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit2_Page13_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit2_Page13_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit2_Page13_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
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
          sectionLetter="J"
          title={<>Read and write.</>}
          subTitle="Read the whole passage once, return to the sentence that contains the answer, then write a short response based on the text."
        />

        {/* STORY */}
        <div className="flex gap-8 items-start mb-12">
          <SentenceGroup data-return-story={true}
            label={"Hear the story about Wendy and the carnival"}
            src={[soundJ1, soundJ2, soundJ3, soundJ5, soundJ6, soundJ7]}
            id={"story"}
            audio={audio}
            className="flex-1 leading-[1.9]"
          >
            {storyWords.map((word, index) => {
              const clauseIndex = clauses.findIndex(clause => index >= clause.start && index < clause.start + clause.text.split(" ").length);
              const isUnderlined = selectedWords.includes(index);
              const correct = clauseIndex !== -1 && result[clauseIndex] === true;
              const disabled = locked || underliningComplete || correct;
              const wrong = wrongWords.includes(index) || (clauseIndex !== -1 && result[clauseIndex] === false);
              return <React.Fragment key={index}>
                <button type="button" {...activationKeys} data-choice data-word-index={index}
                  aria-pressed={isUnderlined}
                  aria-label={`Word ${index + 1}: ${word}. ${correct ? "Correct and locked." : isUnderlined && wrong ? "Not correct. Press to remove underlining." : isUnderlined ? "Underlined. Press to remove." : "Press to underline."}`}
                  disabled={disabled} onClick={event => { event.stopPropagation(); toggleUnderline(index); }}
                  style={{ background: "transparent", border: "none", padding: 0, margin: 0, font: "inherit", color: "inherit", lineHeight: "inherit", position: "relative", borderRadius: 4,
                    cursor: disabled ? "default" : "pointer",
                    borderBottom: "3px solid " + (isUnderlined ? correct ? "#16a34a" : wrong ? "#D1232A" : "#6D2980" : "transparent") }}>
                  {word}
                </button>{" "}
              </React.Fragment>;
            })}
          </SentenceGroup>

          <img
            src={img}
            alt={"Two children looking at carnival rides and striped tents."}
            style={{
              width: "260px",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Q1 */}
        <div className="mb-10">
          <div className="mb-4">
            <span className="flex items-center gap-2">
              <AudioText
                audio={audio}
                id={"fragment-0"}
                src={soundJ8}
                label={"Hear Underline the relative clauses in the story."}
              >
                <span className="font-bold mr-2">1</span>
                Underline the relative clauses in the story.
                <HiArrowUpCircle onKeyUp={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}} onKeyDown={event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)returnToStory(event);}} onClick={returnToStory} aria-label={"Return to the story above"} data-return-arrow={true} data-choice={true} tabIndex={0} role={"button"}
                  style={{
                    color: "#6D2980",
                    fontSize: "26px",
                    flexShrink: 0,
                  cursor:"pointer",borderRadius:"50%","--exercise-focus-radius":"50%"}}
                />
              </AudioText>
            </span>
          </div>
        </div>

        {/* Q2 */}
        <div className="mb-10">
          <div className="mb-6">
            <AudioText
              audio={audio}
              id={"fragment-1"}
              src={soundJ9}
              label={
                "Hear Write all the vocabulary words and expressions used in the story."
              }
            >
              <span className="font-bold mr-2">2</span> Write all the vocabulary
              words and expressions used in the story.
            </AudioText>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {vocabAnswersState.map((answer, i) => (
              <div key={i}>
                {inputField(
                  answer,
                  (e) => handleVocabChange(i, e.target.value),
                  result[i + 3] === false,
                  `Vocabulary word ${i + 1} from the story`,
                  result[i + 3] === true,
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Q3 */}
        <div className="mb-10">
          <div className="mb-4">
            <span className="font-bold mr-2">3</span> Where is the carnival that
            the narrator and her sister go to?
          </div>

          {inputField(
            qaAnswersState[0],
            (e) => handleQaChange(0, e.target.value),
            false,
            "Where is the carnival that the narrator and her sister go to?",
            false,
          )}
        </div>

        {/* Q4 */}
        <div className="mb-10">
          <div className="mb-4">
            <span className="font-bold mr-2">4</span> How often do they go to
            this carnival?
          </div>

          {inputField(
            qaAnswersState[1],
            (e) => handleQaChange(1, e.target.value),
            false,
            "How often do they go to this carnival?",
            false,
          )}
        </div>

        {/* Q5 */}
        <div className="mb-10">
          <div className="mb-4">
            <span className="font-bold mr-2">5</span> What kinds of rides does
            the narrator like?
          </div>

          {inputField(
            qaAnswersState[2],
            (e) => handleQaChange(2, e.target.value),
            result[9] === false,
            "What kinds of rides does the narrator like?",
            result[9] === true,
          )}
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
          onPointerDown={(event) => {
            if (locked) event.preventDefault();
          }}
          style={{
            cursor: locked ? "not-allowed" : "pointer",
          }}
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
export default WB_Unit2_Page13_Q1;
