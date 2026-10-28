import soundB16 from "../../../assets/audio/Workbook/Unit 7/Page 39 - B/Item_016_for_next_weekend.mp3";
import soundB15 from "../../../assets/audio/Workbook/Unit 7/Page 39 - B/Item_015_right_now,_Grandma._You're.mp3";
import soundB14 from "../../../assets/audio/Workbook/Unit 7/Page 39 - B/Item_014_Helen_I'm.mp3";
import soundB12 from "../../../assets/audio/Workbook/Unit 7/Page 39 - B/Item_012_you_if_you_can_come_next_weekend.mp3";
import soundB11 from "../../../assets/audio/Workbook/Unit 7/Page 39 - B/Item_011_would_love_to_see.mp3";
import soundB10 from "../../../assets/audio/Workbook/Unit 7/Page 39 - B/Item_010_Grandma_The_children_at_the.mp3";
import soundB9 from "../../../assets/audio/Workbook/Unit 7/Page 39 - B/Item_009_that's_for_sure!.mp3";
import soundB8 from "../../../assets/audio/Workbook/Unit 7/Page 39 - B/Item_008_Grandma_I'm.mp3";
import soundB7 from "../../../assets/audio/Workbook/Unit 7/Page 39 - B/Item_007_What_are_you_doing_on_weekends.mp3";
import soundB6 from "../../../assets/audio/Workbook/Unit 7/Page 39 - B/Item_006_Helen_That's_a_good_way_to.mp3";
import soundB5 from "../../../assets/audio/Workbook/Unit 7/Page 39 - B/Item_005_also.mp3";
import soundB4 from "../../../assets/audio/Workbook/Unit 7/Page 39 - B/Item_004_my_life_now_very_much,.mp3";
import soundB3 from "../../../assets/audio/Workbook/Unit 7/Page 39 - B/Item_003_Grandma_Yes,_but_I'm.mp3";
import soundB2 from "../../../assets/audio/Workbook/Unit 7/Page 39 - B/Item_002_being_young,_Grandma.mp3";
import soundB1 from "../../../assets/audio/Workbook/Unit 7/Page 39 - B/Item_001_Helen_Do_you_ever.mp3";
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

// IMAGES
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U7/Page 39/Asset 13.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U7/Page 39/Asset 14.svg";
import img3 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U7/Page 39/Asset 15.svg";
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

const WB_Unit7_Page39_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const answers = [
    "miss",
    "treasuring",

    "deal with it",
    "keeping busy",

    "orphanage",
    "jotting it down",
    "at the top of my list",
  ];

  const [studentAnswers, setStudentAnswers] = useState([
    "",
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

    setResult([true, true, true, true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", "", "", "", "", "", ""]);

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
        placeholder={"Word / phrase"}
        title={`Dialogue blank ${i + 1}. ${["Helen: Do you ever ___ being young, Grandma?", "Grandma: Yes, but I am ___ my life now very much, also.", "Helen: That is a good way to ___.", "Grandma: I am ___, that is for sure!", "Grandma: The children at the ___ would love to see you.", "Helen: I am ___ right now, Grandma.", "Helen: You are ___ for next weekend."][i]}`}
        aria-label={`Dialogue blank ${i + 1}. ${["Helen: Do you ever ___ being young, Grandma?", "Grandma: Yes, but I am ___ my life now very much, also.", "Helen: That is a good way to ___.", "Grandma: I am ___, that is for sure!", "Grandma: The children at the ___ would love to see you.", "Helen: I am ___ right now, Grandma.", "Helen: You are ___ for next weekend."][i]}`}
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
            top: "2px",
            right: "-6px",
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

  // ------------------------
  // WORD CLOUD
  // ------------------------

  const wordCloud = (image, number) => (
    <div className="relative w-60">
      <span className="absolute top-0 left-0 font-bold text-[18px]">
        {number}
      </span>

      <img
        src={image}
        alt={
          [
            "A girl and her grandmother beside the choices miss, treasuring, of course, limping.",
            "A girl and her grandmother beside the choices albums, keeping busy, deal with it, wonderful.",
            "A girl and her grandmother beside the choices jotting it down, at the top of my list, super, keeping busy, orphanage.",
          ][number - 1]
        }
        style={{
          width: "220px",
          height: "auto",
          objectFit: "contain",
          marginLeft: "25px",
        }}
      />
    </div>
  );

  return (
    <div
      data-exercise-scope={"WB_Unit7_Page39_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit7_Page39_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit7_Page39_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit7_Page39_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
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
          sectionLetter="B"
          title={<>Read and write.</>}
          subTitle="Read the full sentence first, then choose the word or expression that fits both the meaning and grammar."
        />

        {/* SECTION 1 */}

        <div className="grid grid-cols-[260px_1fr] gap-8 mb-8">
          {/* LEFT */}

          <div>{wordCloud(img1, 1)}</div>

          {/* RIGHT */}

          <div className="leading-[1.8] pt-6">
            <div>
              <AudioText
                audio={audio}
                id="prefix-0"
                src={soundB1}
                label="Hear dialogue beginning 1"
              >
                <span className="font-bold">Helen:</span> Do you ever{" "}
              </AudioText>
              {inputField(0, "160px")}{" "}
              <AudioText
                audio={audio}
                id="ending-0-0"
                src={soundB2}
                label="Hear being young, Grandma?"
              >
                being young, Grandma?
              </AudioText>
            </div>

            <div className="mt-3">
              <AudioText
                audio={audio}
                id="prefix-1"
                src={soundB3}
                label="Hear dialogue beginning 2"
              >
                <span className="font-bold">Grandma:</span> Yes, but I’m{" "}
              </AudioText>
              {inputField(1, "220px")}{" "}
              <AudioText
                audio={audio}
                id="ending-1-0"
                src={soundB4}
                label="Hear my life now very much,"
              >
                my life now very much,
              </AudioText>{" "}
              <AudioText
                audio={audio}
                id="ending-1-1"
                src={soundB5}
                label="Hear also."
              >
                also.
              </AudioText>
            </div>
          </div>
        </div>

        {/* SECTION 2 */}

        <div className="grid grid-cols-[260px_1fr] gap-8 mb-8">
          {/* LEFT */}

          <div>{wordCloud(img2, 2)}</div>

          {/* RIGHT */}

          <div className="leading-[1.8] pt-2">
            <div>
              <AudioText
                audio={audio}
                id="prefix-2"
                src={soundB6}
                label="Hear dialogue beginning 3"
              >
                <span className="font-bold">Helen:</span> That’s a good way
                to{" "}
              </AudioText>
              {inputField(2, "200px")}.
            </div>

            <div>
              <AudioText
                audio={audio}
                id={"fragment-0"}
                src={soundB7}
                label={"Hear What are you doing on weekends?"}
              >
                What are you doing on weekends?
              </AudioText>
            </div>

            <div className="mt-3">
              <AudioText
                audio={audio}
                id="prefix-3"
                src={soundB8}
                label="Hear dialogue beginning 4"
              >
                <span className="font-bold">Grandma:</span> I’m{" "}
              </AudioText>
              {inputField(3, "220px")}
              <AudioText
                audio={audio}
                id="ending-3-0"
                src={soundB9}
                label="Hear , that’s for sure!"
              >
                , that’s for sure!
              </AudioText>
            </div>
          </div>
        </div>

        {/* SECTION 3 */}

        <div className="grid grid-cols-[260px_1fr] gap-8">
          {/* LEFT */}

          <div>{wordCloud(img3, 3)}</div>

          {/* RIGHT */}

          <div className="leading-[1.8] pt-2">
            <div>
              <AudioText
                audio={audio}
                id="prefix-4"
                src={soundB10}
                label="Hear dialogue beginning 5"
              >
                <span className="font-bold">Grandma:</span> The children at
                the{" "}
              </AudioText>
              {inputField(4, "180px")}{" "}
              <AudioText
                audio={audio}
                id="ending-4-0"
                src={soundB11}
                label="Hear would love to see"
              >
                would love to see
              </AudioText>{" "}
              <AudioText
                audio={audio}
                id="ending-4-1"
                src={soundB12}
                label="Hear you if you can come next weekend."
              >
                you if you can come next weekend.
              </AudioText>
            </div>

            <div className="mt-3">
              <AudioText
                audio={audio}
                id="prefix-5"
                src={soundB14}
                label="Hear dialogue beginning 6"
              >
                <span className="font-bold">Helen:</span> I’m{" "}
              </AudioText>
              {inputField(5, "230px")}
              <AudioText
                audio={audio}
                id="middle-5"
                src={soundB15}
                label="Hear right now, Grandma. You are"
              >
                {" "}
                right now, Grandma. You’re{" "}
              </AudioText>
              {inputField(6, "320px")}{" "}
              <AudioText
                audio={audio}
                id="ending-5-0"
                src={soundB16}
                label="Hear for next weekend."
              >
                for next weekend.
              </AudioText>
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

export default WB_Unit7_Page39_Q2;
