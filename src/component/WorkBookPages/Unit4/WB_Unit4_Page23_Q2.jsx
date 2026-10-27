import soundG5 from "../../../assets/audio/Workbook/Unit 4/Page 23 - G/Item_005_Do_you_go_to_the_mall_(frequently).mp3";
import soundG4 from "../../../assets/audio/Workbook/Unit 4/Page 23 - G/Item_004_How_often_do_you_go_to_school_(regularly).mp3";
import soundG3 from "../../../assets/audio/Workbook/Unit 4/Page 23 - G/Item_003_How_often_does_Sarah_play_in_her_backyard_(occasionally).mp3";
import soundG2 from "../../../assets/audio/Workbook/Unit 4/Page 23 - G/Item_002_How_often_do_you_go_to_the_grocery_store_(weekly).mp3";
import soundG1 from "../../../assets/audio/Workbook/Unit 4/Page 23 - G/Item_001_How_often_do_you_eat_breakfast_(daily).mp3";
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
import React, { useRef, useState } from "react";
import img from "../../../assets/imgs/pages/workbook/Right Int WB G5 U4/Page 23/Asset 1.svg";
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

const WB_Unit4_Page23_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      text: "How often do you eat breakfast?",
      word: "daily",
    },

    {
      text: "How often do you go to the grocery store?",
      word: "weekly",
    },

    {
      text: "How often does Sarah play in her backyard?",
      word: "occasionally",
    },

    {
      text: "How often do you go to school?",
      word: "regularly",
    },

    {
      text: "Do you go to the mall?",
      word: "frequently",
    },
  ];

  const [answers, setAnswers] = useState([
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
    ["", ""],
  ]);

  const inputRefs = useRef([]);

  const MAX_CHARS = 50;

  const handleChange = (qIndex, inputIndex, value) => {
    // فقط الانبوت الأول عليه حد 50 حرف
    if (inputIndex === 0 && value.length > MAX_CHARS) {
      return;
    }

    const updated = answers.map((row) => (Array.isArray(row) ? [...row] : row));

    updated[qIndex][inputIndex] = value;

    setAnswers(updated);

    // فقط الانبوت الأول ينزل تلقائي
    if (inputIndex === 0 && value.length >= MAX_CHARS) {
      inputRefs.current[qIndex]?.[1]?.focus();
    }
  };
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers([
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
    ]);

    inputRefs.current[0]?.[0]?.focus();
  };

  return (
    <div
      data-exercise-scope={"WB_Unit4_Page23_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit4_Page23_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit4_Page23_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit4_Page23_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[18px] w-full " style={{gap:"50px"}}>
        {/* TITLE */}
        <ExerciseHeader
          isWorkbook
          sectionLetter="G"
          title={<>Read and write.</>}
          subTitle="Use the percentage, picture, or context clue to choose the adverb, then place it in the natural position in the sentence."
        />

        {/* QUESTIONS */}
        <div className="flex flex-col gap-8 mb-10">
          {questions.map((question, qIndex) => (
            <div key={qIndex}>
              {/* السطر الأول */}
              <div className="flex items-center flex-wrap gap-2 mb-4">
                <span className="font-bold">{qIndex + 1}</span>

                <span>
                  <AudioText
                    audio={audio}
                    id={`question-${qIndex}`}
                    src={[soundG1, soundG2, soundG3, soundG4, soundG5][qIndex]}
                    label={`Hear question ${qIndex + 1}: ${question.text} (${question.word})`}
                  >
                    {question.text} ({question.word})
                  </AudioText>
                </span>

                <input
                  placeholder={"Your answer"}
                  title={`Question ${qIndex + 1}: ${question.text} (${question.word}), answer line 1`}
                  aria-label={`Question ${qIndex + 1}: ${question.text} (${question.word}), answer line 1`}
                  {...fieldKeys}
                  ref={(el) => {
                    if (!inputRefs.current[qIndex]) {
                      inputRefs.current[qIndex] = [];
                    }

                    inputRefs.current[qIndex][0] = el;
                  }}
                  type="text"
                  value={answers[qIndex][0]}
                  onChange={(e) => handleChange(qIndex, 0, e.target.value)}
                  maxLength={MAX_CHARS}
                  className="
                    flex-1
                    min-w-[250px]
                    border-0
                    border-b
                    border-black
                    outline-none
                    bg-transparent
                    text-[18px]
                    text-[#6D2980]
                    font-semibold
                    px-1
                  "
                />
              </div>

              {/* السطر الثاني */}
              <div className="pl-7">
                <input
                  placeholder={"Continue your answer"}
                  title={`Question ${qIndex + 1}: ${question.text} (${question.word}), answer line 2`}
                  aria-label={`Question ${qIndex + 1}: ${question.text} (${question.word}), answer line 2`}
                  {...fieldKeys}
                  ref={(el) => {
                    if (!inputRefs.current[qIndex]) {
                      inputRefs.current[qIndex] = [];
                    }

                    inputRefs.current[qIndex][1] = el;
                  }}
                  type="text"
                  value={answers[qIndex][1]}
                  onChange={(e) => handleChange(qIndex, 1, e.target.value)}
                  className="
    w-full
    border-0
    border-b
    border-black
    outline-none
    bg-transparent
    text-[18px]
    text-[#6D2980]
    font-semibold
    px-1
  "
                />
              </div>
            </div>
          ))}
        </div>

        {/* IMAGE */}
        <div className="flex justify-center">
          <img
            src={img}
            alt={
              "Children playing, watering plants, and picking flowers in a park."
            }
            style={{
              width: "800px",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      {/* RESET BUTTON */}
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
      </div>
    </div>
  );
};

export default WB_Unit4_Page23_Q2;
