import soundJ10 from "../../../assets/audio/Workbook/Unit 5/Page 30 - J/Item_010_(_have_in_mind_give_a_presentation_).mp3";
import soundJ9 from "../../../assets/audio/Workbook/Unit 5/Page 30 - J/Item_009_have_the_right_books_for_both_of_you!_Follow_me_and_I'll_show_you_what.mp3";
import soundJ8 from "../../../assets/audio/Workbook/Unit 5/Page 30 - J/Item_008_Librarian.mp3";
import soundJ7 from "../../../assets/audio/Workbook/Unit 5/Page 30 - J/Item_007_(_recipe_sharks_)_books_so_I_can_make_food.mp3";
import soundJ6 from "../../../assets/audio/Workbook/Unit 5/Page 30 - J/Item_006_Harley_I'm_looking_for.mp3";
import soundJ5 from "../../../assets/audio/Workbook/Unit 5/Page 30 - J/Item_005_to_read.mp3";
import soundJ4 from "../../../assets/audio/Workbook/Unit 5/Page 30 - J/Item_004_(_Good_luck_to_you_both_What_would_you_like_).mp3";
import soundJ3 from "../../../assets/audio/Workbook/Unit 5/Page 30 - J/Item_003_Librarian_Okay._How_about_you.mp3";
import soundJ2 from "../../../assets/audio/Workbook/Unit 5/Page 30 - J/Item_002_Tom_I_have_to.mp3";
import soundJ1 from "../../../assets/audio/Workbook/Unit 5/Page 30 - J/Item_001_(_information_give_a_presentation_)_in_front_of_the_class.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import { AudioFeedback, AudioSpeaker } from "../../StudentPages/unit5/ExerciseAudioText";
import { SentenceGroup } from "../../StudentPages/unit5/SentenceAudio";
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

const normalizeAnswer = (text) =>
  text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[‘’']/g, "")
    .replace(/[.,!?;:…“”"–—-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const WB_Unit5_Page30_Q3 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      speaker: "Tom:",

      before: "I have to",

      options: ["information", "give a presentation"],

      correct: "give a presentation",

      after: "in front of the class.",
    },

    {
      speaker: "Librarian:",

      before: "Okay. How about you?",

      options: ["Good luck to you both", "What would you like"],

      correct: "What would you like",

      after: "to read?",
    },

    {
      speaker: "Harley:",

      before: "I'm looking for",

      options: ["recipe", "sharks"],

      correct: "recipe",

      after: "books so I can make food.",
    },

    {
      speaker: "Librarian:",

      before:
        "I have the right books for both of you! Follow me and I'll show you what I",

      options: ["have in mind", "give a presentation"],

      correct: "have in mind",

      after: ".",
    },
  ];

  const [selectedAnswers, setSelectedAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  // ------------------------
  // SELECT OPTION
  // ------------------------

  const handleSelect = (i, option) => {
    if (locked || result[i] === true) return;

    setAnnouncement(`Sentence ${i + 1}: ${option} selected.`);
    const updated = [...selectedAnswers];

    updated[i] = option;

    setSelectedAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (locked) return;
    audio.stop();

    const hasEmpty = selectedAnswers.some((a) => !a);

    if (hasEmpty) {
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

    const newResults = selectedAnswers.map((answer, i) => {
      const ok = normalize(answer) === normalize(questions[i].correct);

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

  // ------------------------
  // SHOW ANSWERS
  // ------------------------

  const showAnswers = () => {
    audio.stop();
    setAnnouncement("Model answers shown and locked.");
    resetButtonRef.current?.focus({ preventScroll: true });
    setSelectedAnswers(questions.map((q) => q.correct));

    setResult([true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setSelectedAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // OPTION BUTTON
  // ------------------------

    // Keep each recording attached to its actual printed fragment, not each choice.
  const dialogueAudio = [
    { lead: soundJ2, choices: soundJ1, choicesIncludeEnding: true },
    { lead: soundJ3, choices: soundJ4, ending: soundJ5 },
    { lead: soundJ6, choices: soundJ7, choicesIncludeEnding: true },
    { speaker: soundJ8, lead: soundJ9, choices: soundJ10 },
  ];
  const fragmentProps = (id, src, label, first = true) => ({
    "data-audio-fragment": id,
    "data-choice": first || undefined,
    role: first ? "button" : undefined,
    tabIndex: first ? 0 : undefined,
    "aria-label": first ? label : undefined,
    onClick: (event) => { event.stopPropagation(); audio.play(id, src); },
    onKeyDown: first ? (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault(); event.stopPropagation();
      if (!event.repeat) audio.play(id, src);
    } : undefined,
    onKeyUp: first ? activationKeys.onKeyUp : undefined,
  });
  const fragmentStyle = (id) => ({
    position: "relative", cursor: "pointer", borderRadius: 6,
    ...(audio.activeId === id ? { backgroundColor: "#dbeafe", boxShadow: "0 0 0 3px #2563eb" } : {}),
  });

return (
    <div
      data-exercise-scope={"WB_Unit5_Page30_Q3.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit5_Page30_Q3.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit5_Page30_Q3.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit5_Page30_Q3.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall"  style={{gap:"50px"}}>
        {/* TITLE */}

        <ExerciseHeader
          isWorkbook
          sectionLetter="J"
          title={<>Read and circle.</>}
          subTitle="Read all choices before selecting; choose only the option that makes the full sentence or expression correct."
        />

        {/* QUESTIONS */}

        <div className="flex flex-col gap-14 w-[110%]">
          {questions.map((question, index) => (
            <div key={index} className="text-[18px] ">
              {/* LINE */}
              <SentenceGroup
                label={`Hear dialogue line ${index + 1}, including its two choices`}
                src={
                  [
                    [soundJ2, soundJ1],
                    [soundJ3, soundJ4, soundJ5],
                    [soundJ6, soundJ7],
                    [soundJ8, soundJ9, soundJ10],
                  ][index]
                }
                id={`dialogue-${index}`}
                audio={audio}
                className="flex flex-wrap items-center"
              >
                {/* NUMBER */}
                <span style={{...fragmentStyle(dialogueAudio[index].speaker?`speaker-${index}`:`prefix-${index}`)}} {...fragmentProps(dialogueAudio[index].speaker?`speaker-${index}`:`prefix-${index}`,dialogueAudio[index].speaker || dialogueAudio[index].lead,`Hear ${question.speaker} ${dialogueAudio[index].speaker?"":question.before}`,false)} className="font-bold mr-3 w-5">{index + 1}</span>
                {/* SPEAKER */}
                <span style={{...fragmentStyle(dialogueAudio[index].speaker?`speaker-${index}`:`prefix-${index}`)}} {...fragmentProps(dialogueAudio[index].speaker?`speaker-${index}`:`prefix-${index}`,dialogueAudio[index].speaker || dialogueAudio[index].lead,`Hear ${question.speaker}`,!!dialogueAudio[index].speaker)} className="font-bold mr-1">{question.speaker}{dialogueAudio[index].speaker && audio.activeId===`speaker-${index}`&&<AudioSpeaker/>}</span>
                {/* BEFORE */}
                <span style={{...fragmentStyle(`prefix-${index}`)}} {...fragmentProps(`prefix-${index}`,dialogueAudio[index].lead,`Hear ${dialogueAudio[index].speaker?"":question.speaker} ${question.before}`,true)}>{question.before}{audio.activeId===(`prefix-${index}`)&&<AudioSpeaker/>}</span>
                {/* ANSWER LINE */}
                <span {...fragmentProps(`choices-${index}`,dialogueAudio[index].choices,`Sentence ${index+1}. Hear both choices${dialogueAudio[index].choicesIncludeEnding?" and the ending":""}. Current answer: ${selectedAnswers[index]||"not selected"}.`,true)}
                  
                  
                  style={{
                    display: "inline-block",
                    minWidth: "260px",
                    borderBottom: "1px solid black",
                    margin: "0 6px",
                    padding: "0 6px",
                    textAlign: "center",
                    borderBottomColor:
                      result[index] === true
                        ? "#16a34a"
                        : result[index] === false
                          ? "#D1232A"
                          : undefined,
                  ...fragmentStyle(`choices-${index}`),borderRadius:0}}
                >
                  {selectedAnswers[index] ? (
                    <span
                      style={{
                        color: "#6D2980",
                        fontWeight: "600",
                      }}
                    >
                      {selectedAnswers[index]}
                    </span>
                  ) : (
                    <span>&nbsp;</span>
                  )}
                {audio.activeId===(`choices-${index}`)&&<AudioSpeaker/>}</span>
                {/* OPTIONS */}(
                {question.options.map((option, optionIndex) => {
                  const selected = selectedAnswers[index] === option;

                  const wrong = result[index] === false && selected;

                  return (
                    <React.Fragment key={option}>
                      <button
                        aria-label={`Sentence ${index + 1}: ${option}. ${result[index] === true ? "Correct and locked." : wrong ? "Not correct. Choose another answer." : "Press to choose."}`}
                        aria-pressed={selected}
                        data-option={option}
                        data-question={index}
                        data-choice={true}
                        {...activationKeys}
                        type="button"
                        disabled={locked || result[index] === true}
                        onClick={() => handleSelect(index, option)}
                        style={{
                          position: "relative",
                          background: "transparent",
                          border: selected
                            ? "2px solid #6D2980"
                            : "2px solid transparent",
                          borderRadius: "999px",
                          padding: "0 4px",
                          margin: "0 2px",
                          cursor:
                            locked || result[index] === true
                              ? "default"
                              : "pointer",
                          color: "black",
                          fontWeight: "400",
                          backgroundColor: selected ? "#dbeafe" : undefined,
                          borderColor: selected
                            ? result[index] === true
                              ? "#16a34a"
                              : wrong
                                ? "#D1232A"
                                : "#6D2980"
                            : "transparent",
                        ...(audio.activeId===`choices-${index}`?{backgroundColor:"#dbeafe",boxShadow:"0 0 0 3px #2563eb"}:{})}}
                      >
                        {option}

                        {wrong && (
                          <span
                            style={{
                              position: "absolute",
                              top: "-10px",
                              right: "-10px",
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
                      </button>

                      {optionIndex === 0 && <span>/</span>}
                    </React.Fragment>
                  );
                })}
                ){/* AFTER */}
                <span style={{...(dialogueAudio[index].ending || dialogueAudio[index].choicesIncludeEnding ? fragmentStyle(dialogueAudio[index].ending?`ending-${index}`:`choices-${index}`):{})}} {...(dialogueAudio[index].ending || dialogueAudio[index].choicesIncludeEnding ? fragmentProps(dialogueAudio[index].ending?`ending-${index}`:`choices-${index}`,dialogueAudio[index].ending || dialogueAudio[index].choices,`Hear ${question.after}`,!!dialogueAudio[index].ending):{})} className="ml-1">{question.after}{dialogueAudio[index].ending && audio.activeId===`ending-${index}` && <AudioSpeaker/>}</span>
              </SentenceGroup>
            </div>
          ))}
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

export default WB_Unit5_Page30_Q3;
