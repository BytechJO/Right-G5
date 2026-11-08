import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback } from "./ExerciseAudioText";
import clip0 from "../../../assets/audio/ClassBook/U1/Page 8 - A/Item_001_Hansel's_didn't_ring,_so_he_slept_too_long._Hansel's_mom_woke_him_up_ins.mp3";
import clip1 from "../../../assets/audio/ClassBook/U1/Page 8 - A/Item_002_The_night_before_he_was_for_a_math_test,_so_he_used_his_as_a_that_night.mp3";
import clip2 from "../../../assets/audio/ClassBook/U1/Page 8 - A/Item_003_Hansel's_mom_told_him_he_should_wash_his_because_it_was_blue!.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
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

const Page8_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = useRef(null);
  const [answers, setAnswers] = useState(["", "", "", "", ""]);

  const handleChange = (i, val) => {
    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);
  };
  const handleReset = () => {
    audio.stop();
    setAnswers(["", "", "", "", ""]);
  };
  const input = (i, width = "w-[120px]") => (
    <input placeholder={"Word"}
      {...fieldKeys}
      aria-label={`Conversation summary, blank ${i + 1}`}
      title={`Conversation summary, blank ${i + 1}`}
      value={answers[i]}
      onChange={(e) => handleChange(i, e.target.value)}
      className={`border-b border-black outline-none text-center text-[#6D2980] font-semibold mx-1 ${width}`}
    />
  );

  return (
    <div
      data-unit1-scope="Page8_Q1.jsx"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-unit1-scope="Page8_Q1.jsx"] input:focus-visible,[data-unit1-scope="Page8_Q1.jsx"] textarea:focus-visible,[data-unit1-scope="Page8_Q1.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      <div className="div-forall">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <ExerciseHeader
            sectionLetter="A"
            title={
           "Use vocabulary words to make a summary of the conversation."
            }
            subTitle="Read the whole sentence first, then choose the word that fits both the meaning and grammar before checking."
          />
          <div className="text-[22px] gap-y-9 flex flex-col">
            <div>
              <AudioText
                audio={audio}
                id="a-0"
                src={clip0}
                label="Hear the first summary sentence"
              >
                Hansel’s
              </AudioText>{" "}
              {input(0, "w-[220px]")}{" "}
              <AudioText
                audio={audio}
                id="a-1"
                src={clip0}
                label="Hear the first summary sentence"
              >
                didn’t ring, so he slept too long. Hansel’s mom
              </AudioText>
            </div>

            {/* line 2 */}
            <div>
              <AudioText
                audio={audio}
                id="a-2"
                src={clip0}
                label="Hear the first summary sentence"
              >
                woke him up instead.
              </AudioText>{" "}
              <AudioText
                audio={audio}
                id="a-3"
                src={clip1}
                label="Hear the second summary sentence"
              >
                The night before he was
              </AudioText>{" "}
              {input(1, "w-[260px]")}{" "}
              <AudioText
                audio={audio}
                id="a-4"
                src={clip1}
                label="Hear the second summary sentence"
              >
                for a math
              </AudioText>
            </div>

            {/* line 3 */}
            <div>
              <AudioText
                audio={audio}
                id="a-5"
                src={clip1}
                label="Hear the second summary sentence"
              >
                test, so he used his
              </AudioText>{" "}
              {input(2, "w-[200px]")}{" "}
              <AudioText
                audio={audio}
                id="a-6"
                src={clip1}
                label="Hear the second summary sentence"
              >
                as a
              </AudioText>{" "}
              {input(3, "w-[200px]")}
            </div>

            {/* line 4 */}
            <div>
              <AudioText
                audio={audio}
                id="a-7"
                src={clip1}
                label="Hear the second summary sentence"
              >
                that night.
              </AudioText>{" "}
              <AudioText
                audio={audio}
                id="a-8"
                src={clip2}
                label="Hear the third summary sentence"
              >
                Hansel’s mom told him he should wash his
              </AudioText>{" "}
              {input(4, "w-[260px]")}
            </div>

            {/* line 5 */}
            <div>
              <AudioText
                audio={audio}
                id="a-9"
                src={clip2}
                label="Hear the third summary sentence"
              >
                because it was blue!
              </AudioText>
            </div>
          </div>
        </div>
      </div>

      <div className="action-buttons-container">
        <button
          type="button"
          aria-label="Start Again"
          {...activationKeys}
          ref={resetButtonRef}
          className="try-again-button"
          onClick={handleReset}
        >
          Start Again ↻
        </button>
      </div>
    </div>
  );
};

export default Page8_Q1;
