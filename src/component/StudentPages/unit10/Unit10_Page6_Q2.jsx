import clip0 from "../../../assets/audio/ClassBook/U10/Page 87 - E/Item_001_After_the_game,.mp3";
import clip1 from "../../../assets/audio/ClassBook/U10/Page 87 - E/Item_002_In_addition_to_playing_the_guitar,.mp3";
import clip2 from "../../../assets/audio/ClassBook/U10/Page 87 - E/Item_003_Was_while_the_band_played.mp3";
import clip3 from "../../../assets/audio/ClassBook/U10/Page 87 - E/Item_004_Were_when_school_ended.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import { AudioFeedback } from "../unit5/ExerciseAudioText";
import { SentenceGroup } from "../unit5/SentenceAudio";
import React, { useState } from "react";
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

const Unit10_Page6_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const [answers, setAnswers] = useState(["", "", "", ""]);

  const handleChange = (i, value) => {
    const updated = [...answers];

    updated[i] = value;

    setAnswers(updated);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", ""]);
  };

  const inputField = (i, width) => (
    <input placeholder={"Complete the sentence"}
      title={`Sentence ${i + 1}, finish the past progressive prompt: ${["After the game,", "In addition to playing the guitar,", "Was … while the band played?", "Were … when school ended?"][i]}`}
      aria-label={`Sentence ${i + 1}, finish the past progressive prompt: ${["After the game,", "In addition to playing the guitar,", "Was … while the band played?", "Were … when school ended?"][i]}`}
      {...fieldKeys}
      type="text"
      value={answers[i]}
      onChange={(e) => handleChange(i, e.target.value)}
      className={`
        ${width}
        border-0
        border-b
        border-black
        outline-none
        bg-transparent
        text-[18px]
        text-[#6D2980]
        font-semibold
        px-1
      `}
    />
  );

  return (
    <div
      data-exercise-scope={"Unit10_Page6_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit10_Page6_Q2.jsx"] input:focus-visible,[data-exercise-scope="Unit10_Page6_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Unit10_Page6_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div
        className="div-forall"
        style={{gap:"50px"}}
      >
        {/* TITLE */}
        <ExerciseHeader
          sectionLetter="E"
          title={<>Finish the sentences, using the past progressive tense.</>}
          subTitle="Use the prompt and grammar pattern to write a complete sentence, then reread it for meaning, tense, and punctuation."
        />

        {/* QUESTIONS */}
        <div className="flex flex-col gap-10">
          {/* 1 */}
          <SentenceGroup
            label={"Hear sentence prompt 1"}
            src={clip0}
            id={"prompt-0"}
            audio={audio}
            className="flex items-center gap-4"
          >
            <span className="font-bold text-[18px]">1</span>

            <span className="text-[18px]">After the game,</span>

            {inputField(0, "w-[620px]")}
          </SentenceGroup>

          {/* 2 */}
          <SentenceGroup
            label={"Hear sentence prompt 2"}
            src={clip1}
            id={"prompt-1"}
            audio={audio}
            className="flex items-center gap-4"
          >
            <span className="font-bold text-[18px]">2</span>

            <span className="text-[18px]">
              In addition to playing the guitar,
            </span>

            {inputField(1, "w-[520px]")}
          </SentenceGroup>

          {/* 3 */}
          <SentenceGroup
            label={"Hear sentence prompt 3"}
            src={clip2}
            id={"prompt-2"}
            audio={audio}
            className="flex items-center gap-4"
          >
            <span className="font-bold text-[18px]">3</span>

            <span className="text-[18px]">Was</span>

            {inputField(2, "w-[500px]")}

            <span className="text-[18px]">while the band played?</span>
          </SentenceGroup>

          {/* 4 */}
          <SentenceGroup
            label={"Hear sentence prompt 4"}
            src={clip3}
            id={"prompt-3"}
            audio={audio}
            className="flex items-center gap-4"
          >
            <span className="font-bold text-[18px]">4</span>

            <span className="text-[18px]">Were</span>

            {inputField(3, "w-[500px]")}

            <span className="text-[18px]">when school ended?</span>
          </SentenceGroup>
        </div>
      </div>

      {/* BUTTON */}
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

export default Unit10_Page6_Q2;
