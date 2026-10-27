import soundG18 from "../../../assets/audio/Workbook/Unit 3/Page 18 - G/Item_018_talkative.mp3";
import soundG17 from "../../../assets/audio/Workbook/Unit 3/Page 18 - G/Item_017_funny.mp3";
import soundG16 from "../../../assets/audio/Workbook/Unit 3/Page 18 - G/Item_016_black-eyed.mp3";
import soundG15 from "../../../assets/audio/Workbook/Unit 3/Page 18 - G/Item_015_brown-eyed.mp3";
import soundG14 from "../../../assets/audio/Workbook/Unit 3/Page 18 - G/Item_014_blue-eyed.mp3";
import soundG13 from "../../../assets/audio/Workbook/Unit 3/Page 18 - G/Item_013_blonde.mp3";
import soundG12 from "../../../assets/audio/Workbook/Unit 3/Page 18 - G/Item_012_dark-haired.mp3";
import soundG11 from "../../../assets/audio/Workbook/Unit 3/Page 18 - G/Item_011_red-haired.mp3";
import soundG10 from "../../../assets/audio/Workbook/Unit 3/Page 18 - G/Item_010_quiet.mp3";
import soundG9 from "../../../assets/audio/Workbook/Unit 3/Page 18 - G/Item_009_hard-working.mp3";
import soundG8 from "../../../assets/audio/Workbook/Unit 3/Page 18 - G/Item_008_impatient.mp3";
import soundG7 from "../../../assets/audio/Workbook/Unit 3/Page 18 - G/Item_007_patient.mp3";
import soundG6 from "../../../assets/audio/Workbook/Unit 3/Page 18 - G/Item_006_light-haired.mp3";
import soundG5 from "../../../assets/audio/Workbook/Unit 3/Page 18 - G/Item_005_friendly.mp3";
import soundG4 from "../../../assets/audio/Workbook/Unit 3/Page 18 - G/Item_004_determined.mp3";
import soundG3 from "../../../assets/audio/Workbook/Unit 3/Page 18 - G/Item_003_easy-going.mp3";
import soundG2 from "../../../assets/audio/Workbook/Unit 3/Page 18 - G/Item_002_serious.mp3";
import soundG1 from "../../../assets/audio/Workbook/Unit 3/Page 18 - G/Item_001_cheerful.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import {
  AudioFeedback,
  AudioSpeaker,
} from "../../StudentPages/unit5/ExerciseAudioText";
import React, { useRef, useState } from "react";
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
const WB_Unit3_Page18_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");
  const words = [
    "cheerful",
    "serious",
    "easy-going",
    "determined",
    "friendly",
    "light-haired",
    "patient",
    "impatient",
    "hard-working",
    "quiet",
    "red-haired",
    "dark-haired",
    "blonde",
    "blue-eyed",
    "brown-eyed",
    "black-eyed",
    "funny",
    "talkative",
  ];
  const [selectedWords, setSelectedWords] = useState([]);
  const [paragraphLines, setParagraphLines] = useState(["", "", "", "", ""]);
  const inputRefs = useRef([]);
  const toggleWord = (word) => {
    audio.play(
      `personal-${word}`,
      [
        soundG1,
        soundG2,
        soundG3,
        soundG4,
        soundG5,
        soundG6,
        soundG7,
        soundG8,
        soundG9,
        soundG10,
        soundG11,
        soundG12,
        soundG13,
        soundG14,
        soundG15,
        soundG16,
        soundG17,
        soundG18,
      ][words.indexOf(word)],
    );
    setAnnouncement(
      word + (selectedWords.includes(word) ? " deselected." : " selected."),
    );
    setSelectedWords((prev) =>
      prev.includes(word) ? prev.filter((w) => w !== word) : [...prev, word],
    );
  };
  const handleLineChange = (index, value) => {
    const updated = [...paragraphLines];
    updated[index] = value;
    setParagraphLines(updated);
    if (value.length >= 90 && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === " ") e.stopPropagation();
    if (e.key === "Enter" && e.repeat) {
      e.preventDefault();
      return;
    }
    if (e.key === "Enter" && index < 4) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }

    // Backspace يرجع لفوق
    if (e.key === "Backspace" && paragraphLines[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setSelectedWords([]);
    setParagraphLines(["", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };
  return (
    <div
      data-exercise-scope={"WB_Unit3_Page18_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit3_Page18_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit3_Page18_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit3_Page18_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
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
          sectionLetter="G"
          title={
            <>
              Look below, read, and circle the words that describe you.
            Then, write a paragraph about yourself using these words.
            </>
          }
          subTitle="Select only words that genuinely describe you, then use those choices to write a short, connected paragraph rather than separate sentences."
        />

        {/* WORDS */}
        <div
          className="
            grid 
            grid-cols-6
            gap-y-3
            gap-x-10
            mb-10
            text-center
            
          "
        >
          {words.map((word, i) => {
            const isSelected = selectedWords.includes(word);
            return (
              <button
                aria-pressed={isSelected}
                aria-label={`Describe yourself: ${word}`}
                data-choice={true}
                {...activationKeys}
                key={i}
                type="button"
                onClick={() => toggleWord(word)}
                style={{
                  position: "relative",
                  background: "transparent",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                  padding: "2px 6px",
                  whiteSpace: "nowrap",
                  // backgroundColor: isSelected ? "#dbeafe" : undefined,
                  "--exercise-focus-radius": "50%",
                  ...(audio.activeId === `personal-${word}`
                    ? {
                        backgroundColor: "#dbeafe",
                        boxShadow: "0 0 0 3px #2563eb",
                      }
                    : {}),
                }}
              >
                {word}

                {isSelected && (
                  <span
                    style={{
                      position: "absolute",
                      left: "-6px",
                      top: "-6px",
                      width: "calc(100% + 8px)",
                      height: "calc(100% + 8px)",
                      border: "3px solid #6D2980",
                      borderRadius: "50%",
                      pointerEvents: "none",
                    }}
                  />
                )}
                {audio.activeId === `personal-${word}` && <AudioSpeaker />}
              </button>
            );
          })}
        </div>

        {/* PARAGRAPH */}
        <div className="flex flex-col gap-6">
          {[0, 1, 2, 3, 4].map((i) => (
            <input
              placeholder={"About yourself"}
              title={`Paragraph about yourself, line ${i + 1}`}
              aria-label={`Paragraph about yourself, line ${i + 1}`}
              {...fieldKeys}
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              value={paragraphLines[i]}
              onChange={(e) => handleLineChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, i)}
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
          ))}
        </div>
      </div>

      {/* BUTTON */}
      <div className="action-buttons-container">
        <button
          {...activationKeys}
          ref={resetButtonRef}
          aria-label={"Start Again"}
          type={"button"}
          className="
            try-again-button
          "
          onClick={handleReset}
        >
          Start Again ↻
        </button>
      </div>
    </div>
  );
};
export default WB_Unit3_Page18_Q1;
