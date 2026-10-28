import soundF15 from "../../../assets/audio/Workbook/Unit 7/Page 41 - F/Item_015_We_always_have_fun.mp3";
import soundF14 from "../../../assets/audio/Workbook/Unit 7/Page 41 - F/Item_014_pictures_and_put_them_in.mp3";
import soundF13 from "../../../assets/audio/Workbook/Unit 7/Page 41 - F/Item_013_We.mp3";
import soundF12 from "../../../assets/audio/Workbook/Unit 7/Page 41 - F/Item_012_seeing_you._When_you_decide_to_come,_we_can_take_some.mp3";
import soundF11 from "../../../assets/audio/Workbook/Unit 7/Page 41 - F/Item_011_Come_visit_us_and.mp3";
import soundF10 from "../../../assets/audio/Workbook/Unit 7/Page 41 - F/Item_010_You_have_grown.mp3";
import soundF9 from "../../../assets/audio/Workbook/Unit 7/Page 41 - F/Item_009_Oh,_children_in_the.mp3";
import soundF8 from "../../../assets/audio/Workbook/Unit 7/Page 41 - F/Item_008_day.mp3";
import soundF7 from "../../../assets/audio/Workbook/Unit 7/Page 41 - F/Item_007_It's_a_beautiful_morning._It's_a.mp3";
import soundF6 from "../../../assets/audio/Workbook/Unit 7/Page 41 - F/Item_006_Hey,_dear_children,_let's_go_out_and_play.mp3";
import soundF5 from "../../../assets/audio/Workbook/Unit 7/Page 41 - F/Item_005_miss.mp3";
import soundF4 from "../../../assets/audio/Workbook/Unit 7/Page 41 - F/Item_004_orphanage.mp3";
import soundF3 from "../../../assets/audio/Workbook/Unit 7/Page 41 - F/Item_003_wonderful.mp3";
import soundF2 from "../../../assets/audio/Workbook/Unit 7/Page 41 - F/Item_002_albums.mp3";
import soundF1 from "../../../assets/audio/Workbook/Unit 7/Page 41 - F/Item_001_make_yourself_at_home.mp3";
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

// IMAGE
import familyImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U7/Page 41/Asset 9.svg";
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

const WB_Unit7_Page41_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const wordBank = [
    "make yourself at home",
    "albums",
    "wonderful",
    "orphanage",
    "miss",
  ];

  const answers = [
    "wonderful",
    "orphanage",
    "make yourself at home",
    "miss",
    "albums",
  ];

  const [studentAnswers, setStudentAnswers] = useState(["", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  // ------------------------
  // HANDLE INPUT
  // ------------------------

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...studentAnswers];

    updated[i] = value;

    setStudentAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  // ------------------------
  // CHECK
  // ------------------------

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

  // ------------------------
  // SHOW ANSWERS
  // ------------------------

  const showAnswers = () => {
    audio.stop();
    setAnnouncement("Model answers shown and locked.");
    resetButtonRef.current?.focus({ preventScroll: true });
    setStudentAnswers(answers);

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i, width) => (
    <div className="relative inline-block">
      <input
        aria-invalid={result[i] === false}
        placeholder={"Word or expression"}
        title={`Passage blank ${i + 1}: use a word or expression from the visible bank`}
        aria-label={`Passage blank ${i + 1}: use a word or expression from the visible bank`}
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
          borderBottomColor:
            result[i] === true
              ? "#16a34a"
              : result[i] === false
                ? "#D1232A"
                : undefined,
        }}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "1px",
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
      data-exercise-scope={"WB_Unit7_Page41_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit7_Page41_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit7_Page41_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit7_Page41_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[18px] w-full mb-10">
        {/* TITLE */}

        <ExerciseHeader
          isWorkbook
          sectionLetter="F"
          title={<>Read and write.</>}
          subTitle="Read the full sentence first, then choose the word or expression that fits both the meaning and grammar."
        />

        {/* WORD BANK */}

        <div className="flex flex-wrap gap-4 ml-[45px]">
          {wordBank.map((word, index) => (
            <div
              key={index}
              className="
                  border
                  border-[#7D3C98]
                  rounded-lg
                  px-4
                  py-1
                  text-[18px]
                "
            >
              <AudioText
                audio={audio}
                id={`bank-${index}`}
                src={[soundF1, soundF2, soundF3, soundF4, soundF5][index]}
                label={`Hear ${word}`}
              >
                {word}
              </AudioText>
            </div>
          ))}
        </div>

        {/* CONTENT */}

        <div className="flex justify-between gap-8">
          {/* LEFT SIDE */}

          <div className="flex-1 leading-[2.5]">
            <div>
              <AudioText
                audio={audio}
                id={"fragment-0"}
                src={soundF6}
                label={"Hear Hey, dear children, let’s go out and play."}
              >
                Hey, dear children, let’s go out and play.
              </AudioText>
            </div>

            <div className="mt-2">
              <AudioText
                audio={audio}
                id="fragment-7"
                src={soundF7}
                label="Hear It’s a beautiful morning. It’s a"
              >
                It’s a beautiful morning. It’s a
              </AudioText>{" "}
              {inputField(0, "240px")}{" "}
              <AudioText
                audio={audio}
                id="fragment-8"
                src={soundF8}
                label="Hear day."
              >
                day.
              </AudioText>
            </div>

            <div>
              <AudioText
                audio={audio}
                id="fragment-9"
                src={soundF9}
                label="Hear Oh, children in the"
              >
                Oh, children in the
              </AudioText>{" "}
              {inputField(1, "340px")}
              <AudioText
                audio={audio}
                id="fragment-10"
                src={soundF10}
                label="Hear . You have grown."
              >
                . You have grown.
              </AudioText>
            </div>

            <div>
              <AudioText
                audio={audio}
                id="fragment-11"
                src={soundF11}
                label="Hear Come visit us and"
              >
                Come visit us and
              </AudioText>{" "}
              {inputField(2, "520px")}.
            </div>

            <div>
              <AudioText
                audio={audio}
                id="fragment-13"
                src={soundF13}
                label="Hear We"
              >
                We
              </AudioText>{" "}
              {inputField(3, "180px")}{" "}
              <AudioText
                audio={audio}
                id="fragment-12"
                src={soundF12}
                label="Hear seeing you through some"
              >
                seeing you. When you decide to come, we can take some
              </AudioText>{" "}
              <AudioText
                audio={audio}
                id="fragment-14"
                src={soundF14}
                label="Hear pictures and put them in"
              >
                pictures and put them in
              </AudioText>
              {inputField(4, "320px")}.
            </div>
            <div>
              <AudioText
                audio={audio}
                id={"fragment-1"}
                src={soundF15}
                label={"Hear We always have fun."}
              >
                We always have fun.
              </AudioText>
            </div>
          </div>

          {/* RIGHT IMAGE */}

          <div
            className="
    pt-[140px]
    shrink-0
  "
          >
            <img
              src={familyImg}
              alt={"A man, a woman and a child standing together."}
              style={{
                width: "170px",
                height: "auto",
                objectFit: "contain",
              }}
            />
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

export default WB_Unit7_Page41_Q2;
