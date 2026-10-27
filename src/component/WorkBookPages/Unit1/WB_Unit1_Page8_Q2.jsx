import clip0 from "../../../assets/audio/Workbook/Unit 1/Page 8 - M/Item_001_Teacher_How_long.mp3";

import clip1 from "../../../assets/audio/Workbook/Unit 1/Page 8 - M/Item_002_Student_I_only_studied_for_about_an_hour.mp3";

import clip3 from "../../../assets/audio/Workbook/Unit 1/Page 8 - M/Item_004_Nancy_How_deep_can_you_dive.mp3";
import clip4 from "../../../assets/audio/Workbook/Unit 1/Page 8 - M/Item_005_Paula.mp3";

import clip6 from "../../../assets/audio/Workbook/Unit 1/Page 8 - M/Item_007_Team_member_How_far_do_we_have_to_run_today.mp3";
import clip7 from "../../../assets/audio/Workbook/Unit 1/Page 8 - M/Item_008_Coach.mp3";

import clip9 from "../../../assets/audio/Workbook/Unit 1/Page 8 - M/Item_010_Team_member_I_do_50_push-ups_every_morning_during_football_season.mp3";

import clip11 from "../../../assets/audio/Workbook/Unit 1/Page 8 - M/Item_012_Student_1.mp3";
import clip12 from "../../../assets/audio/Workbook/Unit 1/Page 8 - M/Item_013_Student_2_It's_for_30_minutes,_and_then_I_have_to_go_back_to_class.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
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

const WB_Unit1_Page8_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    "did you study",
    "I can dive two feet.",
    "We have to run half a mile.",
    "How do you prepare to play football?",
    "How long is your break?",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (text) => normalizeAnswer(text).replace(/%/g, "");

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

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
      "did you study",
      "I can dive two feet.",
      "We have to run half a mile.",
      "How do you prepare to play football?",
      "How long is your break?",
    ]);

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width = "w-full") => (
    <div className="relative inline-block flex-1">
      <input
        placeholder={"Your reply"}
        style={{
          ...(result[i] === true ? { borderBottomColor: "#16a34a" } : {}),
        }}
        aria-invalid={result[i] === false}
        title={`Dialogue blank ${i + 1}, complete the question or reply using the surrounding lines`}
        aria-label={`Dialogue blank ${i + 1}, complete the question or reply using the surrounding lines`}
        {...fieldKeys}
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          ${width}
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
      data-exercise-scope={"WB_Unit1_Page8_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit1_Page8_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit1_Page8_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit1_Page8_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div
        className="div-forall text-[18px]"
        style={{
          lineHeight: "1.8",
         
        }}
      >
       
        {/* TITLE */}
        <ExerciseHeader
          subTitle="Use the prompt and grammar pattern to write one complete answer at a time, then reread it before checking."
          isWorkbook
          sectionLetter="M"
          title={
            <>
              Read and write questions for answers and answer some of the
              questions.
            </>
          }
        />
 <div>
        {/* 1 */}
        <div className="mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold">
              <SentencePart
                audio={audio}
                id="teacher-how-long"
                src={clip0}
                label="Hear Teacher: How long"
                first={true}
              >
                Teacher:
              </SentencePart>
            </span>

            <span>
              <SentencePart
                audio={audio}
                id="teacher-how-long"
                src={clip0}
                label="Hear Teacher: How long"
                first={false}
              >
                How long
              </SentencePart>
            </span>

            {inputField(0)}

            <span>?</span>
          </div>

          <SentenceGroup
            label={"Hear dialogue line: I only studied for about an hour."}
            src={clip1}
            id={"dialogue-line-1"}
            audio={audio}
          >
            <span className="font-bold">Student:</span> I only studied for about
            an hour.
          </SentenceGroup>
        </div>

        <div className="mb-2 font-bold">*************</div>

        {/* 2 */}
        <div className="mb-2">
          <SentenceGroup
            label={"Hear dialogue line: How deep can you dive?"}
            src={clip3}
            id={"dialogue-line-3"}
            audio={audio}
          >
            <span className="font-bold">Nancy:</span> How deep can you dive?
          </SentenceGroup>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold">
              <AudioText
                audio={audio}
                id="dialogue-line-4"
                src={clip4}
                label="Hear Paula:"
              >
                Paula:
              </AudioText>
            </span>

            {inputField(1)}
          </div>
        </div>

        <div className="mb-2 font-bold">*************</div>

        {/* 3 */}
        <div className="mb-2">
          <SentenceGroup
            label={"Hear dialogue line: How far do we have to run today?"}
            src={clip6}
            id={"dialogue-line-6"}
            audio={audio}
          >
            <span className="font-bold">Team member:</span> How far do we have
            to run today?
          </SentenceGroup>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold">
              <AudioText
                audio={audio}
                id="dialogue-line-7"
                src={clip7}
                label="Hear Coach:"
              >
                Coach:
              </AudioText>
            </span>

            {inputField(2)}
          </div>
        </div>

        <div className="mb-2 font-bold">*************</div>

        {/* 4 */}
        <div className="mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold">
              <AudioText
                audio={audio}
                id="coach-question"
                src={clip7}
                label="Hear Coach"
              >
                Coach:
              </AudioText>
            </span>

            {inputField(3)}

            <span>?</span>
          </div>

          <SentenceGroup
            label={
              "Hear dialogue line: I do 50 push-ups every morning during football season."
            }
            src={clip9}
            id={"dialogue-line-9"}
            audio={audio}
          >
            <span className="font-bold">Team member:</span> I do 50 push-ups
            every morning during football season.
          </SentenceGroup>
        </div>

        <div className="mb-2 font-bold">*************</div>

        {/* 5 */}
        <div className="mb-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold">
              <AudioText
                audio={audio}
                id="dialogue-line-11"
                src={clip11}
                label="Hear Student 1:"
              >
                Student 1:
              </AudioText>
            </span>

            {inputField(4)}

            <span>?</span>
          </div>

          <SentenceGroup
            label={
              "Hear dialogue line: It’s for 30 minutes, and then I have to go back to class."
            }
            src={clip12}
            id={"dialogue-line-12"}
            audio={audio}
          >
            <span className="font-bold">Student 2:</span> It’s for 30 minutes,
            and then I have to go back to class.
          </SentenceGroup>
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

export default WB_Unit1_Page8_Q2;
