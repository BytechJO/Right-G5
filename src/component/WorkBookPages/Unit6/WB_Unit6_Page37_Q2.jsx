import soundL6 from "../../../assets/audio/Workbook/Unit 6/Page 37 - L/Item_006_She_couldn't_go_to_school_today.mp3";
import soundL5 from "../../../assets/audio/Workbook/Unit 6/Page 37 - L/Item_005_She_can_ride_a_bike.mp3";
import soundL2 from "../../../assets/audio/Workbook/Unit 6/Page 37 - L/Item_002_We_will_go_to_the_museum.mp3";
import soundL1 from "../../../assets/audio/Workbook/Unit 6/Page 37 - L/Item_001_You_should_wear_a_coat_when_it's_cold_outside.mp3";
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

// LEFT IMAGES
import left1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 37/Asset 15.svg";
import left2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 37/Asset 17.svg";
import left3 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 37/Asset 19.svg";
import left4 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 37/Asset 30.svg";
import left5 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 37/Asset 23.svg";

// RIGHT IMAGES
import right1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 37/Asset 16.svg";
import right2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 37/Asset 18.svg";
import right3 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 37/Asset 20.svg";
import right4 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 37/Asset 22.svg";
import right5 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 37/Asset 24.svg";
import trueImg from "../../../assets/imgs/true.svg";
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

const WB_Unit_Page_Q29 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      sentence: "You should wear a coat when it’s cold outside.",

      correct: "left",
    },

    {
      sentence: "We will go to the museum.",

      correct: "right",
    },

    {
      sentence: "She can ride a bike.",

      correct: "left",
    },

    {
      sentence: "She couldn’t go to school today.",

      correct: "right",
    },

    {
      sentence: "We might ride the train.",

      correct: "right",
    },
  ];

  const leftDescriptions = [
    "A person wearing a long coat and a hat.",
    "Trees and grass in a park.",
    "A helmeted child riding a bicycle.",
    "A girl walking toward a school building.",
    "A yellow taxi with a driver.",
  ];
  const rightDescriptions = [
    "A boy wearing a short-sleeved shirt and shorts.",
    "A building with MUSEUM above its entrance.",
    "A child riding a bicycle with both hands lifted.",
    "A girl resting in bed.",
    "A red train on railway tracks.",
  ];
  const leftImages = [left1, left2, left3, left4, left5];

  const rightImages = [right1, right2, right3, right4, right5];

  const [selected, setSelected] = useState(["", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  // ------------------------
  // SELECT
  // ------------------------

  const handleSelect = (index, side) => {
    if (locked || result[index] === true) return;
    setAnnouncement(`Sentence ${index + 1}: ${side} picture selected.`);

    const updated = [...selected];

    updated[index] = side;

    setSelected(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[index] = undefined;

      return copy;
    });
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (locked) return;
    audio.stop();

    const hasEmpty = selected.some((s) => !s);

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

    const newResults = selected.map((answer, i) => {
      const ok = answer === questions[i].correct;

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
    setSelected(["left", "right", "left", "right", "right"]);

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setSelected(["", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // CHECKBOX
  // ------------------------

  const checkbox = (index, side) => {
    const isSelected = selected[index] === side;

    const isCorrect = questions[index].correct === side;

    const showWrong = result[index] === false && isSelected && !isCorrect;

    return (
      <button
        {...activationKeys}
        aria-label={`Sentence ${index + 1}: select the ${side} picture. ${side === "left" ? leftDescriptions[index] : rightDescriptions[index]}`}
        aria-pressed={isSelected}
        data-choice={true}
        type="button"
        onClick={() => handleSelect(index, side)}
        disabled={locked || result[index] === true}
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          width: "32px",
          height: "32px",
          border: "1.5px solid #7D3C98",
          borderRadius: "0 6px 0 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: locked ? "default" : "pointer",
          background: isSelected ? "#dbeafe" : "white",
          borderColor:
            isSelected && result[index] === true
              ? "#16a34a"
              : showWrong
                ? "#D1232A"
                : "#7D3C98",
        }}
      >
        {isSelected && (
          <img
            aria-hidden={true}
            src={trueImg}
            alt={""}
            style={{
              width: "18px",
              height: "18px",
              objectFit: "contain",
            }}
          />
        )}

        {showWrong && (
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
      </button>
    );
  };

  return (
    <div
      data-exercise-scope={"WB_Unit6_Page37_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit6_Page37_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit6_Page37_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit6_Page37_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <ExerciseHeader
          isWorkbook
          sectionLetter="L"
          title={
            <>
              Read and write <span className="text-[#D1232A]">✓</span>.
            </>
          }
          subTitle="Check the picture or text evidence carefully, then choose the two-way answer only after confirming the key detail."
        />

        {/* QUESTIONS */}

        <div className="flex flex-col gap-6 mb-10">
          {questions.map((item, index) => (
            <div
              key={index}
              className="relative  grid grid-cols-[140px_1fr_140px] items-center gap-10"
            >
              {/* NUMBER */}

              <div className="absolute ml-[-25px] mt-[-5px] font-bold">
                {index + 1}
              </div>

              {/* LEFT IMAGE */}

              <div
                style={{
                  position: "relative",
                  width: "140px",
                  height: "auto",
                }}
              >
                <img
                  onClick={() => handleSelect(index, "left")}
                  src={leftImages[index]}
                  alt={
                    [
                      "A person wearing a long coat and a hat.",
                      "Trees and grass in a park.",
                      "A helmeted child riding a bicycle.",
                      "A girl walking toward a school building.",
                      "A yellow taxi with a driver.",
                    ][index]
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    cursor:
                      locked || result[index] === true ? "default" : "pointer",
                  }}
                />

                {checkbox(index, "left")}
              </div>

              {/* SENTENCE */}

              <div className="text-center leading-[1.4]">
                {[soundL1, soundL2, soundL5, soundL6, null][index] ? (
                  <AudioText
                    audio={audio}
                    id={`sentence-${index}`}
                    src={[soundL1, soundL2, soundL5, soundL6, null][index]}
                    label={`Hear sentence ${index + 1}: ${item.sentence}`}
                  >
                    {item.sentence}
                  </AudioText>
                ) : (
                  <>{item.sentence}</>
                )}
              </div>

              {/* RIGHT IMAGE */}

              <div
                style={{
                  position: "relative",
                  width: "140px",
                  height: "auto",
                }}
              >
                <img
                  onClick={() => handleSelect(index, "right")}
                  src={rightImages[index]}
                  alt={
                    [
                      "A boy wearing a short-sleeved shirt and shorts.",
                      "A building with MUSEUM above its entrance.",
                      "A child riding a bicycle with both hands lifted from the handlebars.",
                      "A girl resting in bed beside a teddy bear.",
                      "A red train on railway tracks.",
                    ][index]
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    cursor:
                      locked || result[index] === true ? "default" : "pointer",
                  }}
                />

                {checkbox(index, "right")}
              </div>
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

export default WB_Unit_Page_Q29;
