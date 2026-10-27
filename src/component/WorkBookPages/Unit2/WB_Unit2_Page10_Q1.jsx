import soundC25 from "../../../assets/audio/Workbook/unit 2/Page 10 - C/Item_025_Dad_That's_not_a_lo!.mp3";
import soundC24 from "../../../assets/audio/Workbook/unit 2/Page 10 - C/Item_024_Jack_I_don't_like_to.mp3";
import soundC23 from "../../../assets/audio/Workbook/unit 2/Page 10 - C/Item_023_Dad_Well,_it_may_be_30_minutes.mp3";
import soundC22 from "../../../assets/audio/Workbook/unit 2/Page 10 - C/Item_022_How_many_minutes_will_it_take_you_exactly.mp3";
import soundC21 from "../../../assets/audio/Workbook/unit 2/Page 10 - C/Item_021_minutes.mp3";
import soundC20 from "../../../assets/audio/Workbook/unit 2/Page 10 - C/Item_020_I'm_not_sure._It_may_be_a.mp3";
import soundC19 from "../../../assets/audio/Workbook/unit 2/Page 10 - C/Item_019_How_long_will_it_take_you.mp3";
import soundC18 from "../../../assets/audio/Workbook/unit 2/Page 10 - C/Item_018_of_trees.mp3";
import soundC17 from "../../../assets/audio/Workbook/unit 2/Page 10 - C/Item_017_Don't_worry._There_are_only_a.mp3";
import soundC16 from "../../../assets/audio/Workbook/unit 2/Page 10 - C/Item_016_,_son._I_am_the_one_who_to.mp3";
import soundC15 from "../../../assets/audio/Workbook/unit 2/Page 10 - C/Item_015_Great!_Let's_go.mp3";
import soundC13 from "../../../assets/audio/Workbook/unit 2/Page 10 - C/Item_013_Okay.mp3";
import soundC14 from "../../../assets/audio/Workbook/unit 2/Page 10 - C/Item_014_Hmmm.mp3";
import soundC11 from "../../../assets/audio/Workbook/unit 2/Page 10 - C/Item_011_I_want_to_play_on_the_rides_there.mp3";
import soundC10 from "../../../assets/audio/Workbook/unit 2/Page 10 - C/Item_010_Dad,_can_we_go_to_the.mp3";
import soundC12 from "../../../assets/audio/Workbook/unit 2/Page 10 - C/Item_012_Dad.mp3";
import soundC9 from "../../../assets/audio/Workbook/unit 2/Page 10 - C/Item_009_Jack.mp3";
import soundC8 from "../../../assets/audio/Workbook/unit 2/Page 10 - C/Item_008_trims.mp3";
import soundC7 from "../../../assets/audio/Workbook/unit 2/Page 10 - C/Item_007_twisty.mp3";
import soundC6 from "../../../assets/audio/Workbook/unit 2/Page 10 - C/Item_006_Not_so_fast.mp3";
import soundC5 from "../../../assets/audio/Workbook/unit 2/Page 10 - C/Item_005_Let's_see.mp3";
import soundC4 from "../../../assets/audio/Workbook/unit 2/Page 10 - C/Item_004_couple.mp3";
import soundC3 from "../../../assets/audio/Workbook/unit 2/Page 10 - C/Item_003_few.mp3";
import soundC2 from "../../../assets/audio/Workbook/unit 2/Page 10 - C/Item_002_carnival.mp3";
import soundC1 from "../../../assets/audio/Workbook/unit 2/Page 10 - C/Item_001_I_merry-go-round_hil.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
} from "../../StudentPages/unit5/ExerciseAudioText";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img from "../../../assets/imgs/pages/workbook/Right Int WB G5 U2/Page 10/Asset 7.svg";
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
const WB_Unit2_Page10_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");
  const questions = [
    "carnival",
    "Let's see",
    "Not so fast",
    "trims",
    "couple",
    "few",
    "twisty",
    "merry-go-round",
  ];
  const [answers, setAnswers] = useState(["", "", "", "", "", "", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);
  const normalize = normalizeAnswer;
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
      resetButtonRef.current?.focus({
        preventScroll: true,
      });
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
    resetButtonRef.current?.focus({
      preventScroll: true,
    });
    setAnswers([
      "carnival",
      "Let's see",
      "Not so fast",
      "trims",
      "couple",
      "few",
      "twisty",
      "merry-go-round",
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
    <div className="relative inline-block">
      <input
        style={{
          borderBottomColor:
            result[i] === true || result[i]?.overall === true
              ? "#16a34a"
              : undefined,
        }}
        placeholder={"Answer"}
        title={
          [
            "Jack: Dad, can we go to the ___?",
            "Dad: Hmmm. ___. Okay.",
            "Dad: ___, son.",
            "Dad: I am the one who to ___.",
            "Dad: There are only a ___ of trees.",
            "Dad: It may be a ___ minutes.",
            "Jack: I am going to go on all the ___ rides!",
            "Dad: The simple rides, like the ___.",
          ][i]
        }
        aria-label={
          [
            "Jack: Dad, can we go to the ___?",
            "Dad: Hmmm. ___. Okay.",
            "Dad: ___, son.",
            "Dad: I am the one who to ___.",
            "Dad: There are only a ___ of trees.",
            "Dad: It may be a ___ minutes.",
            "Jack: I am going to go on all the ___ rides!",
            "Dad: The simple rides, like the ___.",
          ][i]
        }
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
  const wordBox = (word) => (
    <div
      style={{
        border: "2px solid #7D3C98",
        borderRadius: "12px",
        padding: "8px 22px",
        fontSize: "17px",
        minWidth: "150px",
        textAlign: "center",
      }}
    >
      <AudioText
        audio={audio}
        id={`bank-${word}`}
        src={
          {
            "merry-go-round": soundC1,
            carnival: soundC2,
            few: soundC3,
            couple: soundC4,
            "Let’s see": soundC5,
            "Not so fast": soundC6,
            twisty: soundC7,
            trims: soundC8,
          }[word]
        }
        label={`Hear ${word}`}
      >
        {word}
      </AudioText>
    </div>
  );
  return (
    <div
      data-exercise-scope={"WB_Unit2_Page10_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit2_Page10_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit2_Page10_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit2_Page10_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall ">
        {/* TITLE */}
        <ExerciseHeader
          isWorkbook
          sectionLetter="C"
          title={<>Read and write.</>}
          subTitle="Read the full sentence first, then choose the word or expression that fits both the meaning and grammar."
        />

        {/* WORD BOXES */}
        <div className="flex flex-wrap gap-4 justify-center">
          {wordBox("merry-go-round")}
          {wordBox("carnival")}
          {wordBox("Let’s see")}
          {wordBox("few")}
          {wordBox("couple")}
          {wordBox("Not so fast")}
          {wordBox("twisty")}
          {wordBox("trims")}
        </div>

        {/* DIALOG */}
        <div className="relative text-[17px] mb-15">
          {/* JACK */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-bold">
              <AudioText
                audio={audio}
                id={"fragment-0"}
                src={soundC9}
                label={"Hear Jack:"}
              >
                Jack:
              </AudioText>
            </span>

            <span>
              <AudioText
                audio={audio}
                id={"fragment-1"}
                src={soundC10}
                label={"Hear Dad, can we go to the"}
              >
                Dad, can we go to the
              </AudioText>
            </span>

            {inputField(0, "w-[170px]")}

            <span>
              <AudioText
                audio={audio}
                id={"fragment-2"}
                src={soundC11}
                label={"Hear ? I want to play on the rides there."}
              >
                ? I want to play on the rides there.
              </AudioText>
            </span>
          </div>

          {/* DAD */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-bold">
              <AudioText
                audio={audio}
                id={"fragment-3"}
                src={soundC12}
                label={"Hear Dad:"}
              >
                Dad:
              </AudioText>
            </span>

            <span>
              <AudioText
                audio={audio}
                id={"fragment-4"}
                src={soundC14}
                label={"Hear Hmmm."}
              >
                Hmmm.
              </AudioText>
            </span>

            {inputField(1, "w-[150px]")}

            <span>
              <AudioText
                audio={audio}
                id={"fragment-5"}
                src={soundC13}
                label={"Hear . Okay."}
              >
                . Okay.
              </AudioText>
            </span>
          </div>

          {/* JACK */}
          <div className="mb-5">
            <AudioText
              audio={audio}
              id={"fragment-6"}
              src={soundC15}
              label={"Hear Great! Let’s go."}
            >
              <span className="font-bold">
                <AudioText
                  audio={audio}
                  id={"fragment-7"}
                  src={soundC9}
                  label={"Hear Jack:"}
                >
                  Jack:
                </AudioText>
              </span>{" "}
              Great! Let’s go.
            </AudioText>
          </div>

          {/* DAD */}
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-bold">
              <AudioText
                audio={audio}
                id={"fragment-8"}
                src={soundC12}
                label={"Hear Dad:"}
              >
                Dad:
              </AudioText>
            </span>

            {inputField(2, "w-[170px]")}

            <span>
              <AudioText
                audio={audio}
                id={"fragment-9"}
                src={soundC16}
                label={"Hear , son. I am the one who to"}
              >
                , son. I am the one who to
              </AudioText>
            </span>

            {inputField(3, "w-[140px]")}
          </div>

          <div className="flex flex-wrap items-center gap-2 ml-[52px] mb-5">
            <span>
              <AudioText
                audio={audio}
                id={"fragment-10"}
                src={soundC17}
                label={"Hear Don’t worry. There are only a"}
              >
                Don’t worry. There are only a
              </AudioText>
            </span>

            {inputField(4, "w-[130px]")}

            <span>
              <AudioText
                audio={audio}
                id={"fragment-11"}
                src={soundC18}
                label={"Hear of trees."}
              >
                of trees.
              </AudioText>
            </span>
          </div>

          {/* JACK */}
          <div className="mb-3">
            <AudioText
              audio={audio}
              id={"fragment-12"}
              src={soundC19}
              label={"Hear How long will it take you?"}
            >
              <span className="font-bold">
                <AudioText
                  audio={audio}
                  id={"fragment-13"}
                  src={soundC9}
                  label={"Hear Jack:"}
                >
                  Jack:
                </AudioText>
              </span>{" "}
              How long will it take you?
            </AudioText>
          </div>

          {/* DAD */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="font-bold">
              <AudioText
                audio={audio}
                id={"fragment-14"}
                src={soundC12}
                label={"Hear Dad:"}
              >
                Dad:
              </AudioText>
            </span>

            <span>
              <AudioText
                audio={audio}
                id={"fragment-15"}
                src={soundC20}
                label={"Hear I’m not sure. It may be a"}
              >
                I’m not sure. It may be a
              </AudioText>
            </span>

            {inputField(5, "w-[120px]")}

            <span>
              <AudioText
                audio={audio}
                id={"fragment-16"}
                src={soundC21}
                label={"Hear minutes."}
              >
                minutes.
              </AudioText>
            </span>
          </div>

          {/* JACK */}
          <div className="mb-3">
            <AudioText
              audio={audio}
              id={"fragment-17"}
              src={soundC22}
              label={"Hear How many minutes will it take you exactly?"}
            >
              <span className="font-bold">
                <AudioText
                  audio={audio}
                  id={"fragment-18"}
                  src={soundC9}
                  label={"Hear Jack:"}
                >
                  Jack:
                </AudioText>
              </span>{" "}
              How many minutes will it take you exactly?
            </AudioText>
          </div>

          {/* DAD */}
          <div className="mb-5">
            <AudioText
              audio={audio}
              id={"fragment-19"}
              src={soundC23}
              label={"Hear Well, it may be 30 minutes."}
            >
              <span className="font-bold">
                <AudioText
                  audio={audio}
                  id={"fragment-20"}
                  src={soundC12}
                  label={"Hear Dad:"}
                >
                  Dad:
                </AudioText>
              </span>{" "}
              Well, it may be 30 minutes.
            </AudioText>
          </div>

          {/* JACK */}
          <div className="mb-3">
            <AudioText
              audio={audio}
              id={"fragment-21"}
              src={soundC24}
              label={"Hear I don’t like to wait a long time. I’ll get bored."}
            >
              <span className="font-bold">
                <AudioText
                  audio={audio}
                  id={"fragment-22"}
                  src={soundC9}
                  label={"Hear Jack:"}
                >
                  Jack:
                </AudioText>
              </span>{" "}
              I don’t like to wait a long time. I’ll get bored.
            </AudioText>
          </div>

          {/* DAD */}
          <div className="mb-5">
            <AudioText
              audio={audio}
              id={"fragment-23"}
              src={soundC25}
              label={"Hear That’s not a long time!"}
            >
              <span className="font-bold">
                <AudioText
                  audio={audio}
                  id={"fragment-24"}
                  src={soundC12}
                  label={"Hear Dad:"}
                >
                  Dad:
                </AudioText>
              </span>{" "}
              That’s not a long time!
            </AudioText>
          </div>

          {/* JACK */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-bold">
              <AudioText
                audio={audio}
                id={"fragment-25"}
                src={soundC9}
                label={"Hear Jack:"}
              >
                Jack:
              </AudioText>
            </span>

            <span>I’m going to go on all the</span>

            {inputField(6, "w-[140px]")}

            <span>rides!</span>
          </div>

          {/* DAD + IMAGE */}
          <div className="flex justify-between items-end gap-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold">
                <AudioText
                  audio={audio}
                  id={"fragment-26"}
                  src={soundC12}
                  label={"Hear Dad:"}
                >
                  Dad:
                </AudioText>
              </span>

              <span>Not me! I will settle for the simple rides, like the</span>

              {inputField(7, "w-[220px]")}

              <span>.</span>
            </div>
          </div>
          <img
            src={img}
            alt={"A boy talking to a man seated on a sofa."}
            style={{
              position: "absolute",
              width: "300px",
              height: "auto",
              objectFit: "contain",
              top: "50%",
              right: "0%",
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
          onPointerDown={(event) => {
            if (locked) event.preventDefault();
          }}
          style={{
            cursor: locked ? "not-allowed" : "pointer",
          }}
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
export default WB_Unit2_Page10_Q1;
