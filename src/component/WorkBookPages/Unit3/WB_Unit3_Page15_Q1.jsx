import soundA7 from "../../../assets/audio/Workbook/Unit 3/Page 15 - A/Item_007_Directions.mp3";
import soundA6 from "../../../assets/audio/Workbook/Unit 3/Page 15 - A/Item_006_other_foods_found_in_the_fridge_or_the_cupboards.mp3";
import soundA5 from "../../../assets/audio/Workbook/Unit 3/Page 15 - A/Item_005_curry.mp3";
import soundA4 from "../../../assets/audio/Workbook/Unit 3/Page 15 - A/Item_004_marshmallows.mp3";
import soundA3 from "../../../assets/audio/Workbook/Unit 3/Page 15 - A/Item_003_peanut_butter.mp3";
import soundA2 from "../../../assets/audio/Workbook/Unit 3/Page 15 - A/Item_002_sardines.mp3";
import soundA1 from "../../../assets/audio/Workbook/Unit 3/Page 15 - A/Item_001_rye_bread.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
} from "../../StudentPages/unit5/ExerciseAudioText";
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
const WB_Unit3_Page15_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");
  const [usedAnswers, setUsedAnswers] = useState(["", "", ""]);
  const [unusedAnswers, setUnusedAnswers] = useState(["", "", ""]);
  const [directionsAnswer, setDirectionsAnswer] = useState("");
  const handleUsedChange = (i, value) => {
    const updated = [...usedAnswers];
    updated[i] = value;
    setUsedAnswers(updated);
  };
  const handleUnusedChange = (i, value) => {
    const updated = [...unusedAnswers];
    updated[i] = value;
    setUnusedAnswers(updated);
  };
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setUsedAnswers(["", "", ""]);
    setUnusedAnswers(["", "", ""]);
    setDirectionsAnswer("");
  };
  const boxInput = (value, onChange, label) => (
    <input
      placeholder={"Ingredient"}
      title={label}
      aria-label={label}
      {...fieldKeys}
      type="text"
      value={value}
      onChange={onChange}
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
  );
  return (
    <div
      data-exercise-scope={"WB_Unit3_Page15_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit3_Page15_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit3_Page15_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit3_Page15_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[17px]">
        {/* TITLE */}
        <ExerciseHeader
          isWorkbook
          sectionLetter="A"
          title={
            <>
              Read and write. If you had the foods below, what would you make?
              Use the words below and describe what you would use and what you
              would not use. You can add some of your own ideas, too.
            </>
          }
          subTitle="Decide which ingredients you would use first, place each item in Used or Unused, then write clear directions for your food idea."
        />

        {/* WORD BOX */}
        <div className="flex justify-center mb-8">
          <div
            style={{
              border: "2px solid #7D3C98",
              borderRadius: "10px",
              padding: "12px 20px",
              width: "100%",
              maxWidth: "900px",
            }}
          >
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-2 text-[18px]">
              <span>
                <AudioText
                  audio={audio}
                  id={"fragment-0"}
                  src={soundA5}
                  label={"Hear curry"}
                >
                  curry
                </AudioText>
              </span>

              <span>
                <AudioText
                  audio={audio}
                  id={"fragment-1"}
                  src={soundA1}
                  label={"Hear rye bread"}
                >
                  rye bread
                </AudioText>
              </span>

              <span>
                <AudioText
                  audio={audio}
                  id={"fragment-2"}
                  src={soundA2}
                  label={"Hear sardines"}
                >
                  sardines
                </AudioText>
              </span>

              <span>
                <AudioText
                  audio={audio}
                  id={"fragment-3"}
                  src={soundA3}
                  label={"Hear peanut butter"}
                >
                  peanut butter
                </AudioText>
              </span>

              <span>
                <AudioText
                  audio={audio}
                  id={"fragment-4"}
                  src={soundA4}
                  label={"Hear marshmallows"}
                >
                  marshmallows
                </AudioText>
              </span>
            </div>

            <div className="text-center mt-2">
              <AudioText
                audio={audio}
                id={"fragment-5"}
                src={soundA6}
                label={"Hear other foods found in the fridge or the cupboards"}
              >
                other foods found in the fridge or the cupboards
              </AudioText>
            </div>
          </div>
        </div>

        {/* USED / UNUSED */}
        <div className="grid grid-cols-2 gap-10 mb-5">
          {/* USED */}
          <div>
            <div className="flex justify-center mb-4">
              <div
                style={{
                  border: "2px solid #7D3C98",
                  borderRadius: "10px",
                  padding: "4px 24px",
                  color: "#5F2A84",
                  fontWeight: "600",
                }}
              >
                Used
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    border: "2px solid #7D3C98",
                    borderRadius: "10px",
                    padding: "12px 16px",
                  }}
                >
                  {boxInput(
                    usedAnswers[i],
                    (e) => handleUsedChange(i, e.target.value),
                    `Used ingredient ${i + 1}`,
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* UNUSED */}
          <div>
            <div className="flex justify-center mb-4">
              <div
                style={{
                  border: "2px solid #7D3C98",
                  borderRadius: "10px",
                  padding: "4px 24px",
                  color: "#5F2A84",
                  fontWeight: "600",
                }}
              >
                Unused
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    border: "2px solid #7D3C98",
                    borderRadius: "10px",
                    padding: "12px 16px",
                  }}
                >
                  {boxInput(
                    unusedAnswers[i],
                    (e) => handleUnusedChange(i, e.target.value),
                    `Unused ingredient ${i + 1}`,
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DIRECTIONS */}
        <div className="mt-2 mb-10">
          <div className="font-bold mb-1">
            <AudioText
              audio={audio}
              id={"fragment-6"}
              src={soundA7}
              label={"Hear Directions:"}
            >
              Directions:
            </AudioText>
          </div>

          <div className="flex flex-col gap-5">
            <input
              placeholder={"Your directions"}
              title={"Directions for your food idea"}
              aria-label={"Directions for your food idea"}
              {...fieldKeys}
              type="text"
              value={directionsAnswer}
              onChange={(e) => setDirectionsAnswer(e.target.value)}
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

            <div className="border-b border-black h-2.5" />
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
      </div>
    </div>
  );
};
export default WB_Unit3_Page15_Q1;
