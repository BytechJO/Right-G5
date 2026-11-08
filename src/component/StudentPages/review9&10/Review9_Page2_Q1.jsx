import clip0 from "../../../assets/audio/ClassBook/U10/Page 89 - D/Item_001_If_we_go_to_the_stadium_tomorrow,.mp3";
import clip1 from "../../../assets/audio/ClassBook/U10/Page 89 - D/Item_002_we_won't_have_to_water_the_plants.mp3";
import clip2 from "../../../assets/audio/ClassBook/U10/Page 89 - D/Item_003_If_Alex_calls_before_dinnertime,.mp3";
import clip3 from "../../../assets/audio/ClassBook/U10/Page 89 - D/Item_004_maybe_we_can_sit_in_the_front_row_to_watch_the_game.mp3";
import clip4 from "../../../assets/audio/ClassBook/U10/Page 89 - D/Item_005_If_it_rains_tomorrow,.mp3";
import clip5 from "../../../assets/audio/ClassBook/U10/Page 89 - D/Item_006_I'll_ask_him_to_come_over_for_dinner.mp3";
import clip6 from "../../../assets/audio/ClassBook/U10/Page 89 - D/Item_007_When_school_finishes_early_on_Thursday,.mp3";
import clip7 from "../../../assets/audio/ClassBook/U10/Page 89 - D/Item_008_we_could_go_bike_riding_in_the_afternoon.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import { AudioText, AudioFeedback } from "../unit5/ExerciseAudioText";

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

const Review9_Page2_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    "3",
    "1",
    "2",
    "4",
    "If we go to the stadium tomorrow, maybe we can sit in the front row to watch the game.",
    "If Alex calls before dinnertime, I’ll ask him to come over for dinner.",
    "If it rains tomorrow, we won’t have to water the plants.",
    "When school finishes early on Thursday, we could go bike riding in the afternoon.",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;
    if (i < 4) {
      const number = value.trim();
      if (
        number &&
        (!/^[1-4]$/.test(number) ||
          answers.some(
            (answer, other) =>
              other < 4 && other !== i && answer.trim() === number,
          ))
      ) {
        setAnnouncement("Choose an unused number from 1 to 4.");
        return;
      }
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

    const hasEmpty = answers.some((a) => !a.trim());

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
    setAnswers([
      "3",
      "1",
      "2",
      "4",
      "If we go to the stadium tomorrow, maybe we can sit in the front row to watch the game.",
      "If Alex calls before dinnertime, I’ll ask him to come over for dinner.",
      "If it rains tomorrow, we won’t have to water the plants.",
      "When school finishes early on Thursday, we could go bike riding in the afternoon.",
    ]);

    setResult([true, true, true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width) => (
    <span className="relative inline-block">
      <input placeholder={i<4?undefined:"Complete sentence"}
        style={{
          ...(result[i] === true
            ? {
                ...(i < 4
                  ? { borderColor: "#16a34a" }
                  : { borderBottomColor: "#16a34a" }),
              }
            : {}),
        }}
        aria-invalid={result[i] === false}
        title={
          i < 4
            ? `Sentence beginning ${i + 1}, matching ending number from 1 to 4`
            : `Complete sentence ${i - 3}, use the two matched parts`
        }
        aria-label={
          i < 4
            ? `Sentence beginning ${i + 1}, matching ending number from 1 to 4`
            : `Complete sentence ${i - 3}, use the two matched parts`
        }
        {...fieldKeys}
        type="text"
        value={answers[i]}
        maxLength={i < 4 ? 1 : undefined}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
  ${width}

   ${
     i < 4
       ? "border border-[#3A3A3A] rounded-md h-[34px] text-center"
       : "border-0 border-b border-black"
   }

  outline-none
  bg-transparent
  text-[18px]
  text-[#6D2980]
  font-semibold
  px-1

  ${result[i] === false ? "border-[#D1232A]" : ""}
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
      data-exercise-scope={"Review9_Page2_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review9_Page2_Q1.jsx"] input:focus-visible,[data-exercise-scope="Review9_Page2_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="Review9_Page2_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall mb-10"   style={{
          gap:"30px"
        }}>
        {/* TITLE */}
        <ExerciseHeader
          isReview
          sectionLetter="D"
          title={
            <>
              Match the two sentence parts, and then write the whole sentence
              below.
            </>
          }
          subTitle={<>Task 1: Match each sentence beginning with the ending that makes sense.<br/> Task 2: Then write each complete sentence below using the matched pair.</>}
        />

        {/* QUESTIONS */}
        <div className="text-[18px]">
          <div className="grid grid-cols-[360px_40px_360px] gap-x-10 gap-y-3 items-center mb-10">
            <div className="flex gap-4">
              <span className="font-bold">1</span>
              <span>
                <AudioText
                  audio={audio}
                  id={"audio-0"}
                  src={clip0}
                  label={"Hear If we go to the stadium tomorrow,"}
                >
                  If we go to the stadium tomorrow,
                </AudioText>
              </span>
            </div>

            {inputField(0, "w-[40px] text-center")}

            <span>
              <AudioText
                audio={audio}
                id={"audio-1"}
                src={clip1}
                label={"Hear we won’t have to water the plants."}
              >
                we won’t have to water the plants.
              </AudioText>
            </span>

            <div className="flex gap-4">
              <span className="font-bold">2</span>
              <span>
                <AudioText
                  audio={audio}
                  id={"audio-2"}
                  src={clip2}
                  label={"Hear If Alex calls before dinnertime,"}
                >
                  If Alex calls before dinnertime,
                </AudioText>
              </span>
            </div>

            {inputField(1, "w-[40px] text-center")}

            <span>
              <AudioText
                audio={audio}
                id={"audio-3"}
                src={clip3}
                label={
                  "Hear maybe we can sit in the front row to watch the game."
                }
              >
                maybe we can sit in the front row to watch the game.
              </AudioText>
            </span>

            <div className="flex gap-4">
              <span className="font-bold">3</span>
              <span>
                <AudioText
                  audio={audio}
                  id={"audio-4"}
                  src={clip4}
                  label={"Hear If it rains tomorrow,"}
                >
                  If it rains tomorrow,
                </AudioText>
              </span>
            </div>

            {inputField(2, "w-[40px] text-center")}

            <span>
              <AudioText
                audio={audio}
                id={"audio-5"}
                src={clip5}
                label={"Hear I’ll ask him to come over for dinner."}
              >
                I’ll ask him to come over for dinner.
              </AudioText>
            </span>

            <div className="flex gap-4">
              <span className="font-bold">4</span>
              <span>
                <AudioText
                  audio={audio}
                  id={"audio-6"}
                  src={clip6}
                  label={"Hear When school finishes early on Thursday,"}
                >
                  When school finishes early on Thursday,
                </AudioText>
              </span>
            </div>

            {inputField(3, "w-[40px] text-center")}

            <span>
              <AudioText
                audio={audio}
                id={"audio-7"}
                src={clip7}
                label={"Hear we could go bike riding in the afternoon."}
              >
                we could go bike riding in the afternoon.
              </AudioText>
            </span>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-5">
              <span className="font-bold">1</span>
              {inputField(4, "w-[890px]")}
            </div>

            <div className="flex items-center gap-5">
              <span className="font-bold">2</span>
              {inputField(5, "w-[890px]")}
            </div>

            <div className="flex items-center gap-5">
              <span className="font-bold">3</span>
              {inputField(6, "w-[890px]")}
            </div>

            <div className="flex items-center gap-5">
              <span className="font-bold">4</span>
              {inputField(7, "w-[890px]")}
            </div>
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

export default Review9_Page2_Q1;
