import soundC18 from "../../../assets/audio/Workbook/Unit 4/Page 22 - C/Item_018_travel_during_the_winter.mp3";
import soundC17 from "../../../assets/audio/Workbook/Unit 4/Page 22 - C/Item_017_do_their_homework_together.mp3";
import soundC15 from "../../../assets/audio/Workbook/Unit 4/Page 22 - C/Item_015_go_for_a_walk_in_the_park.mp3";
import soundC12 from "../../../assets/audio/Workbook/Unit 4/Page 22 - C/Item_012_cross_the_street_when_the_traffic_light_is_green.mp3";
import soundC11 from "../../../assets/audio/Workbook/Unit 4/Page 22 - C/Item_011_comes_over_to_my_house.mp3";
import soundC8 from "../../../assets/audio/Workbook/Unit 4/Page 22 - C/Item_008_go_to_the_grocery_store.mp3";
import soundC19 from "../../../assets/audio/Workbook/Unit 4/Page 22 - C/Item_019_We_30.mp3";
import soundC16 from "../../../assets/audio/Workbook/Unit 4/Page 22 - C/Item_016_Sarah_and_Tina_60.mp3";
import soundC14 from "../../../assets/audio/Workbook/Unit 4/Page 22 - C/Item_014_They_40.mp3";
import soundC13 from "../../../assets/audio/Workbook/Unit 4/Page 22 - C/Item_013_We_0.mp3";
import soundC10 from "../../../assets/audio/Workbook/Unit 4/Page 22 - C/Item_010_My_friend_80.mp3";
import soundC9 from "../../../assets/audio/Workbook/Unit 4/Page 22 - C/Item_009_We_100.mp3";
import soundC7 from "../../../assets/audio/Workbook/Unit 4/Page 22 - C/Item_007_usually.mp3";
import soundC6 from "../../../assets/audio/Workbook/Unit 4/Page 22 - C/Item_006_often.mp3";
import soundC5 from "../../../assets/audio/Workbook/Unit 4/Page 22 - C/Item_005_sometimes.mp3";
import soundC3 from "../../../assets/audio/Workbook/Unit 4/Page 22 - C/Item_003_always.mp3";
import soundC2 from "../../../assets/audio/Workbook/Unit 4/Page 22 - C/Item_002_never.mp3";
import soundC1 from "../../../assets/audio/Workbook/Unit 4/Page 22 - C/Item_001_occasionally.mp3";
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

const WB_Unit4_Page22_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const answers = [
    "always",
    "usually",
    "never",
    "occasionally",
    "often",
    "sometimes",
  ];

  const wordBank = [
    "occasionally",
    "never",
    "always",
    "sometimes",
    "often",
    "usually",
  ];

  const sentences = [
    {
      before: "We (100%)",
      after: "go to the grocery store.",
    },

    {
      before: "My friend (80%)",
      after: "comes over to my house.",
    },

    {
      before: "We (0%)",
      after: "cross the street when the traffic light is green.",
    },

    {
      before: "They (40%)",
      after: "go for a walk in the park.",
    },

    {
      before: "Sarah and Tina (60%)",
      after: "do their homework together.",
    },

    {
      before: "We (30%)",
      after: "travel during the winter.",
    },
  ];

  const [studentAnswers, setStudentAnswers] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = studentAnswers.map((row) =>
      Array.isArray(row) ? [...row] : row,
    );

    updated[i] = value;

    setStudentAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;
    audio.stop();

    const hasEmpty = studentAnswers.some((a) => !a.trim());

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

    const newResults = studentAnswers.map((answer, i) => {
      const ok = normalize(answer) === normalize(answers[i]);

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = answers.length;

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
    setStudentAnswers(answers);

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width = "190px") => (
    <div className="relative inline-block">
      <input
        aria-invalid={result[i] === false}
        placeholder={"Adverb"}
        title={`Sentence ${i + 1}: ${sentences[i].before} ___ ${sentences[i].after}`}
        aria-label={`Sentence ${i + 1}: ${sentences[i].before} ___ ${sentences[i].after}`}
        {...fieldKeys}
        type="text"
        value={studentAnswers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6D2980]
          font-semibold
          px-1

          ${result[i] === false ? "border-[#D1232A]" : "border-black"}
        `}
        style={{
          width,
          borderBottomColor: result[i] === true ? "#16a34a" : undefined,
        }}
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
    </div>
  );

  return (
    <div
      data-exercise-scope={"WB_Unit4_Page22_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit4_Page22_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit4_Page22_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit4_Page22_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
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
          title={
            <>
              Read and write the correct{" "}
              <span className="text-[#00AEEF]">adverb of frequency.</span>
            </>
          }
          subTitle="Use the percentage, picture, or context clue to choose the adverb, then place it in the natural position in the sentence."
        />

        {/* WORD BANK */}
        <div className="w-full flex justify-center">
        <div className="flex flex-wrap justify-center gap-8 border-2 border-[#7D3C98] rounded-xl px-6 py-3 w-fit">
          {wordBank.map((word, index) => (
            <span key={index} className="text-[18px]">
              <AudioText
                audio={audio}
                id={`bank-${index}`}
                src={
                  [soundC1, soundC2, soundC3, soundC5, soundC6, soundC7][index]
                }
                label={`Hear ${word}`}
              >
                {word}
              </AudioText>
            </span>
          ))}
        </div>
</div>
        {/* QUESTIONS */}
        <div className="flex flex-col gap-8">
          {sentences.map((sentence, index) => (
            <div key={index} className="flex items-center gap-3 flex-wrap">
              <span className="font-bold w-5">{index + 1}</span>

              <span>
                <AudioText
                  audio={audio}
                  id={`before-${index}`}
                  src={
                    [soundC9, soundC10, soundC13, soundC14, soundC16, soundC19][
                      index
                    ]
                  }
                  label={`Hear ${sentence.before}`}
                >
                  {sentence.before}
                </AudioText>
              </span>

              {inputField(index)}

              <span>
                <AudioText
                  audio={audio}
                  id={`after-${index}`}
                  src={
                    [soundC8, soundC11, soundC12, soundC15, soundC17, soundC18][
                      index
                    ]
                  }
                  label={`Hear ${sentence.after}`}
                >
                  {sentence.after}
                </AudioText>
              </span>
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

export default WB_Unit4_Page22_Q1;
