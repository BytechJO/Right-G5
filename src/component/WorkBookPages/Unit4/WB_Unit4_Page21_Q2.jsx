import soundB11 from "../../../assets/audio/Workbook/Unit 4/Page 21 - B/Item_011_You_don't_need_to_go_left_or_right.mp3";
import soundB10 from "../../../assets/audio/Workbook/Unit 4/Page 21 - B/Item_010_The_mall_is.mp3";
import soundB8 from "../../../assets/audio/Workbook/Unit 4/Page 21 - B/Item_008_and_went_in_different_directions._Then_we_all_met_again_in_the_food_cour.mp3";
import soundB9 from "../../../assets/audio/Workbook/Unit 4/Page 21 - B/Item_009_We.mp3";
import soundB7 from "../../../assets/audio/Workbook/Unit 4/Page 21 - B/Item_007_!I_just_need_to_tie_my_shoelaces_before_we_go_inside.mp3";
import soundB5 from "../../../assets/audio/Workbook/Unit 4/Page 21 - B/Item_005_to_the_mall.mp3";
import soundB6 from "../../../assets/audio/Workbook/Unit 4/Page 21 - B/Item_006_Let's.mp3";
import soundB4 from "../../../assets/audio/Workbook/Unit 4/Page 21 - B/Item_004_atiw_a_imunte.mp3";
import soundB3 from "../../../assets/audio/Workbook/Unit 4/Page 21 - B/Item_003_ehda_eovr.mp3";
import soundB2 from "../../../assets/audio/Workbook/Unit 4/Page 21 - B/Item_002_rtasigth_aedah.mp3";
import soundB1 from "../../../assets/audio/Workbook/Unit 4/Page 21 - B/Item_001_slpti_pu.mp3";
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

const WB_Unit4_Page21_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const unscrambleAnswers = [
    "split up",
    "straight ahead",
    "head over",
    "wait a minute",
  ];

  const sentenceAnswers = [
    "head over",
    "wait a minute",
    "split up",
    "straight ahead",
  ];

  const scrambledWords = [
    "slpti pu",
    "rtasigth aedah",
    "ehda eovr",
    "atiw a imunte",
  ];

  const [unscrambleInputs, setUnscrambleInputs] = useState(["", "", "", ""]);

  const [sentenceInputs, setSentenceInputs] = useState(["", "", "", ""]);

  const [unscrambleResults, setUnscrambleResults] = useState([]);

  const [sentenceResults, setSentenceResults] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const handleUnscrambleChange = (i, value) => {
    if (locked || unscrambleResults[i] === true) return;

    const updated = [...unscrambleInputs];

    updated[i] = value;

    setUnscrambleInputs(updated);

    setUnscrambleResults((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const handleSentenceChange = (i, value) => {
    if (locked || sentenceResults[i] === true) return;

    const updated = [...sentenceInputs];

    updated[i] = value;

    setSentenceInputs(updated);

    setSentenceResults((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;
    audio.stop();

    const hasEmpty = [...unscrambleInputs, ...sentenceInputs].some(
      (a) => !a.trim(),
    );

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

    const newUnscrambleResults = unscrambleInputs.map((answer, i) => {
      const ok = normalize(answer) === normalize(unscrambleAnswers[i]);

      if (ok) correctCount++;

      return ok;
    });

    const newSentenceResults = sentenceInputs.map((answer, i) => {
      const ok = normalize(answer) === normalize(sentenceAnswers[i]);

      if (ok) correctCount++;

      return ok;
    });

    setUnscrambleResults(newUnscrambleResults);

    setSentenceResults(newSentenceResults);

    const total = 8;

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
    setUnscrambleInputs(unscrambleAnswers);

    setSentenceInputs(sentenceAnswers);

    setUnscrambleResults([true, true, true, true]);

    setSentenceResults([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setUnscrambleInputs(["", "", "", ""]);

    setSentenceInputs(["", "", "", ""]);

    setUnscrambleResults([]);

    setSentenceResults([]);

    setLocked(false);
  };

  const inputField = (
    value,
    onChange,
    isWrong,
    disabled,
    width = "250px",
    label,
  ) => (
    <div className="relative inline-block">
      <input
        aria-invalid={isWrong}
        placeholder={"Expression"}
        title={label}
        aria-label={label}
        {...fieldKeys}
        type="text"
        value={value}
        disabled={disabled}
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

          ${isWrong ? "border-[#D1232A]" : "border-black"}
        `}
        style={{
          width,
          borderBottomColor: disabled ? "#16a34a" : undefined,
        }}
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
      data-exercise-scope={"WB_Unit4_Page21_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit4_Page21_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit4_Page21_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit4_Page21_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[18px] mb-12">
        {/* TITLE */}
        <ExerciseHeader
          isWorkbook
          sectionLetter="B"
          title={
            <>
              Unscramble and write. Then use them to fill in the blanks for the
              sentences below.
            </>
          }
          subTitle="Unscramble each expression first, then reuse the completed expressions in the sentence blanks so the meaning stays consistent."
        />

        {/* UNSCRAMBLE */}
        <div className="flex flex-col gap-5 mb-5">
          {scrambledWords.map((word, index) => (
            <div key={index} className="flex items-center gap-4">
              <span
                style={{
                  letterSpacing: "4px",
                }}
              >
                <AudioText
                  audio={audio}
                  id={`scramble-${index}`}
                  src={[soundB1, soundB2, soundB3, soundB4][index]}
                  label={`Hear scrambled expression ${index + 1}`}
                >
                  {word}
                </AudioText>
              </span>

              {inputField(
                unscrambleInputs[index],
                (e) => handleUnscrambleChange(index, e.target.value),
                unscrambleResults[index] === false,
                locked || unscrambleResults[index] === true,
                "520px",
                `Unscramble expression ${index + 1}: ${scrambledWords[index]}`,
              )}
            </div>
          ))}
        </div>

        {/* SENTENCES */}
        <div className="flex flex-col gap-8 w-[120%]">
          {/* 1 */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold">1</span>

            <span>
              <AudioText
                audio={audio}
                id={"fragment-0"}
                src={soundB6}
                label={"Hear Let’s"}
              >
                Let’s
              </AudioText>
            </span>

            {inputField(
              sentenceInputs[0],
              (e) => handleSentenceChange(0, e.target.value),
              sentenceResults[0] === false,
              locked || sentenceResults[0] === true,
              "360px",
              `Complete sentence 1 using an expression above`,
            )}

            <span>
              <AudioText
                audio={audio}
                id={"fragment-1"}
                src={soundB5}
                label={"Hear to the mall."}
              >
                to the mall.
              </AudioText>
            </span>
          </div>

          {/* 2 */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold">2</span>

            {inputField(
              sentenceInputs[1],
              (e) => handleSentenceChange(1, e.target.value),
              sentenceResults[1] === false,
              locked || sentenceResults[1] === true,
              "220px",
              `Complete sentence 2 using an expression above`,
            )}

            <span>
              <AudioText
                audio={audio}
                id={"fragment-2"}
                src={soundB7}
                label={
                  "Hear ! I just need to tie my shoelaces before we go inside."
                }
              >
                ! I just need to tie my shoelaces before we go inside.
              </AudioText>
            </span>
          </div>

          {/* 3 */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold">3</span>

            <span>
              <AudioText
                audio={audio}
                id={"fragment-3"}
                src={soundB9}
                label={"Hear We"}
              >
                We
              </AudioText>
            </span>

            {inputField(
              sentenceInputs[2],
              (e) => handleSentenceChange(2, e.target.value),
              sentenceResults[2] === false,
              locked || sentenceResults[2] === true,
              "320px",
              `Complete sentence 3 using an expression above`,
            )}

            <span>
              <AudioText
                audio={audio}
                id={"fragment-4"}
                src={soundB8}
                label={
                  "Hear and went in different directions. Then we all met again in the food court."
                }
              >
                and went in different directions. Then we all met again in the
                food court.
              </AudioText>
            </span>
          </div>

          {/* 4 */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold">4</span>

            <span>
              <AudioText
                audio={audio}
                id={"fragment-5"}
                src={soundB10}
                label={"Hear The mall is"}
              >
                The mall is
              </AudioText>
            </span>

            {inputField(
              sentenceInputs[3],
              (e) => handleSentenceChange(3, e.target.value),
              sentenceResults[3] === false,
              locked || sentenceResults[3] === true,
              "250px",
              `Complete sentence 4 using an expression above`,
            )}

            <span>
              <AudioText
                audio={audio}
                id={"fragment-6"}
                src={soundB11}
                label={"Hear . You don’t need to go left or right."}
              >
                . You don’t need to go left or right.
              </AudioText>
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

export default WB_Unit4_Page21_Q2;
