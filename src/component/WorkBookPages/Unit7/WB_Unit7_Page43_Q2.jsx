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

import springImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U7/Page 43/Asset 19.svg";
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

const WB_Unit7_Page43_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const ingVerbs = [
    "playing",
    "enjoying",
    "catching",
    "putting",
    "blowing",
    "chirping",
    "waiting",
    "keeping",
    "playing",
    "counting",
    "blooming",
    "eating",
    "watching",
  ];

  const story =
    "It is springtime. Helen and her friends are playing in her backyard. They are enjoying the wonderful breeze and the super colors of spring. They are catching butterflies and putting them in glass jars that have openings for air. The wind is blowing lightly. The birds are chirping. They were waiting for spring all winter long. Finally, it has arrived. There are many fun outdoor games and activities to do. Everyone is keeping busy with something. Hansel is playing tag with Sarah. Stella is counting the flowers that are blooming. Harley is eating his sandwich. Tom is watching the grasshoppers hop.";

  const storyWords = story.split(" ");

  const [lockedWords, setLockedWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);

  const [wrongWords, setWrongWords] = useState([]);

  const [locked, setLocked] = useState(false);

  const cleanWord = (word) =>
    word
      .replace(/[.?!,’']/g, "")
      .toLowerCase()
      .trim();

  const toggleWord = (index) => {
    if (locked || lockedWords.includes(index)) return;
    setWrongWords((prev) => prev.filter((i) => i !== index));
    setSelectedWords((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
    setAnnouncement(
      `${storyWords[index]} ${selectedWords.includes(index) ? "unselected" : "circled"}.`,
    );
  };

  const checkAnswers = () => {
    if (locked) return;
    audio.stop();

    const correctIndexes = storyWords
      .map((word, index) => (ingVerbs.includes(cleanWord(word)) ? index : null))
      .filter((i) => i !== null);

    const missing = correctIndexes.filter((i) => !selectedWords.includes(i));

    const wrong = selectedWords.filter((i) => !correctIndexes.includes(i));

    setWrongWords(wrong);
    setLockedWords(correctIndexes.filter((i) => selectedWords.includes(i)));

    const score = Math.max(
      0,
      correctIndexes.length - missing.length - wrong.length,
    );

    const total = correctIndexes.length;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:18px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${score} / ${total}
        </span>
      </div>
    `;

    if (missing.length === 0 && wrong.length === 0) {
      resetButtonRef.current?.focus({ preventScroll: true });
      setLocked(true);
      (setAnnouncement(
        String(msg)
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.success(msg));
    } else if (score === 0) {
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
    const correctIndexes = storyWords
      .map((word, index) => (ingVerbs.includes(cleanWord(word)) ? index : null))
      .filter((i) => i !== null);

    setSelectedWords(correctIndexes);
    setLockedWords(correctIndexes);
    setWrongWords([]);
    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setSelectedWords([]);
    setLockedWords([]);
    setWrongWords([]);
    setLocked(false);
  };

  const renderWord = (word, index) => {
    const selected = selectedWords.includes(index);
    const wrong = wrongWords.includes(index);
    const correct = lockedWords.includes(index);

    return (
      <React.Fragment key={index}>
        <button
          aria-label={`${word}${correct ? ". Correct and locked." : wrong ? ". Incorrect selection." : ""}`}
          aria-pressed={selected}
          data-choice={true}
          {...activationKeys}
          type="button"
          disabled={locked || correct}
          onClick={() => toggleWord(index)}
          className="relative"
          style={{
            border: wrong
              ? "2px solid #ef4444"
              : selected
                ? "2px solid #6D2980"
                : "2px solid transparent",
            borderRadius: "999px",
            padding: "0 4px",
            fontSize: "17px",
            color: "#3d2b1f",
            cursor: locked ? "default" : "pointer",
            background: selected ? "#dbeafe" : "transparent",
            borderColor: correct
              ? "#16a34a"
              : wrong
                ? "#ef4444"
                : selected
                  ? "#6D2980"
                  : "transparent",
            "--exercise-focus-radius": "999px",
          }}
        >
          {word}

          {wrong && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                width: "18px",
                height: "18px",
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
        </button>{" "}
      </React.Fragment>
    );
  };

  return (
    <div
      data-exercise-scope={"WB_Unit7_Page43_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit7_Page43_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit7_Page43_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit7_Page43_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[18px] w-full">
        <ExerciseHeader
          isWorkbook
          sectionLetter="K"
          title={
            <>
              Circle all the <span className="text-[#00AEEF]">–ing</span> verbs
              in the story for Ex. J.
            </>
          }
          subTitle="Scan the story line by line and circle only verbs ending in -ing that function as the target verb forms."
        />

      
          {/* الجزء العلوي */}

          <div
            style={{
              fontSize: "17px",
              lineHeight: "1.7",
              color: "#3d2b1f",
              textAlign: "left",
            }}
          >
            {storyWords
              .slice(0, 55)
              .map((word, index) => renderWord(word, index))}
          </div>

          {/* الجزء السفلي */}

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "14px",
              marginTop: "2px",
            }}
          >
            {/* النص */}

            <div
              style={{
                flex: 1,
                fontSize: "17px",
                lineHeight: "1.7",
                color: "#3d2b1f",
                textAlign: "left",
              }}
            >
              {storyWords
                .slice(55)
                .map((word, index) => renderWord(word, index + 55))}
            </div>

            {/* الصورة */}

            <img
              src={springImg}
              alt={
                "Children outdoors among trees, flowers and butterflies; one child holds a butterfly net."
              }
              style={{
                width: "220px",
                height: "170px",
                objectFit: "contain",
                flexShrink: 0,
                marginTop: "4px",
              }}
            />
          </div>

      </div>

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

export default WB_Unit7_Page43_Q2;
