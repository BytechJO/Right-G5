import clip0 from "../../../assets/audio/ClassBook/U8/Page 71 - D/Item_001_John_is_baking_a_cake.mp3";
import clip1 from "../../../assets/audio/ClassBook/U8/Page 71 - D/Item_002_First,_John_is_mixing_the_flour.mp3";
import clip2 from "../../../assets/audio/ClassBook/U8/Page 71 - D/Item_003_He_is_taking_the_cake_out_of_the_oven.mp3";
import clip3 from "../../../assets/audio/ClassBook/U8/Page 71 - D/Item_004_He_is_putting_the_cake_batter_into_the_pan.mp3";
import clip4 from "../../../assets/audio/ClassBook/U8/Page 71 - D/Item_005_Now,_he_is_adding_the_eggs.mp3";
import clip5 from "../../../assets/audio/ClassBook/U8/Page 71 - D/Item_006_He_and_his_friends_are_eating_the_cake.mp3";
import clip6 from "../../../assets/audio/ClassBook/U8/Page 71 - D/Item_007_He_is_baking_the_cake_in_the_oven.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import { AudioText, AudioFeedback } from "../unit5/ExerciseAudioText";
import { SentenceGroup } from "../unit5/SentenceAudio";
import React, { useState } from "react";

import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 71/SVG/Asset 18.svg";

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

const Review7_Page2_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = ["1", "5", "3", "2", "6", "4"];

  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;
    const number = value.trim();
    if (
      number &&
      (!/^[1-6]$/.test(number) ||
        answers.some(
          (answer, index) => index !== i && answer.trim() === number,
        ))
    ) {
      setAnnouncement("Choose an unused number from 1 to 6.");
      return;
    }

    const updated = [...answers];

    updated[i] = value;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;
    audio.stop();

    if (answers.some((a) => !a.trim())) {
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

    const newResults = answers.map((a, i) => {
      const ok = normalize(a) === normalize(questions[i]);

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

  const showAnswers = () => {
    audio.stop();
    setAnnouncement("Model answers shown and locked.");
    resetButtonRef.current?.focus({ preventScroll: true });
    setAnswers(["1", "5", "3", "2", "6", "4"]);

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const numberInput = (i) => (
    <span className="relative inline-block">
      <input
        inputMode={"numeric"}
        style={{
          ...(result[i] === true ? { borderBottomColor: "#16a34a" } : {}),
        }}
        aria-invalid={!!(result[i] === false)}
        title={`Step ${i + 1}, enter a unique sequence number from 1 to 6`}
        aria-label={`Step ${i + 1}, enter a unique sequence number from 1 to 6`}
        {...fieldKeys}
        type="text"
        maxLength={1}
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          w-[120px]
          border-0
          border-b
          outline-none
          bg-transparent
          text-center
          text-[18px]
          text-[#6D2980]
          font-semibold
          leading-none
          align-middle

          ${result[i] === false ? "border-[#D1232A]" : "border-black"}
        `}
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
    </span>
  );

  return (
    <div
      data-exercise-scope={"Review7_Page2_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review7_Page2_Q2.jsx"] input:focus-visible,[data-exercise-scope="Review7_Page2_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Review7_Page2_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall mb-10" style={{gap:"30px"}}>
        {/* TITLE */}
        <ExerciseHeader
          isReview
          sectionLetter="D"
          title={<>Read and number the steps.</>}
          subTitle="Read all the steps first, identify the first event, then number the remaining steps in logical order."
        />

        {/* SUBTITLE */}
        <SentenceGroup
          label={"John is baking a cake."}
          src={clip0}
          id={"clue-0"}
          audio={audio}
          className="text-[18px] mb-2 "
        >
          John is baking a cake.
        </SentenceGroup>

        <div className="flex justify-between items-start gap-10">
          {/* QUESTIONS */}
          <div className="text-[18px] leading-[3.8] flex-1">
            <div className="flex items-center gap-3">
              {numberInput(0)}

              <span className="font-bold">a</span>

              <span>
                <AudioText
                  audio={audio}
                  id="clue-1"
                  src={clip1}
                  label="First, John is mixing the flour."
                >
                  First, John is mixing the flour.
                </AudioText>
              </span>
            </div>

            <div className="flex items-center gap-3">
              {numberInput(1)}

              <span className="font-bold">b</span>

              <span>
                <AudioText
                  audio={audio}
                  id="clue-2"
                  src={clip2}
                  label="He is taking the cake out of the oven."
                >
                  He is taking the cake out of the oven.
                </AudioText>
              </span>
            </div>

            <div className="flex items-center gap-3">
              {numberInput(2)}

              <span className="font-bold">c</span>

              <span>
                <AudioText
                  audio={audio}
                  id="clue-3"
                  src={clip3}
                  label="He is putting the cake batter into the pan."
                >
                  He is putting the cake batter into the pan.
                </AudioText>
              </span>
            </div>

            <div className="flex items-center gap-3">
              {numberInput(3)}

              <span className="font-bold">d</span>

              <span>
                <AudioText
                  audio={audio}
                  id="clue-4"
                  src={clip4}
                  label="Now, he is adding the eggs."
                >
                  Now, he is adding the eggs.
                </AudioText>
              </span>
            </div>

            <div className="flex items-center gap-3">
              {numberInput(4)}

              <span className="font-bold">e</span>

              <span>
                <AudioText
                  audio={audio}
                  id="clue-5"
                  src={clip5}
                  label="He and his friends are eating the cake."
                >
                  He and his friends are eating the cake.
                </AudioText>
              </span>
            </div>

            <div className="flex items-center gap-3">
              {numberInput(5)}

              <span className="font-bold">f</span>

              <span>
                <AudioText
                  audio={audio}
                  id="clue-6"
                  src={clip6}
                  label="He is baking the cake in the oven."
                >
                  He is baking the cake in the oven.
                </AudioText>
              </span>
            </div>
          </div>

          {/* IMAGE */}
          <img
            src={img}
            alt={"A boy wearing a chef hat preparing a mixture in a bowl."}
            style={{
              width: "280px",
              height: "auto",
            }}
          />
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

export default Review7_Page2_Q2;
