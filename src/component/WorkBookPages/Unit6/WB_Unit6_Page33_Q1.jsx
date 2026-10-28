import soundA19 from "../../../assets/audio/Workbook/Unit 6/Page 33 - A/Item_019_new.mp3";
import soundD2 from "../../../assets/audio/Workbook/Unit 6/Page 34 - D/Item_002_half_price.mp3";
import soundD10 from "../../../assets/audio/Workbook/Unit 6/Page 34 - D/Item_010_made_it.mp3";
import soundD8 from "../../../assets/audio/Workbook/Unit 6/Page 34 - D/Item_008_try_out.mp3";
import soundA17 from "../../../assets/audio/Workbook/Unit 6/Page 33 - A/Item_017_¢_expert.mp3";
import soundA16 from "../../../assets/audio/Workbook/Unit 6/Page 33 - A/Item_016_¢_Shall_we.mp3";
import soundA15 from "../../../assets/audio/Workbook/Unit 6/Page 33 - A/Item_015_take_advantage_of.mp3";
import soundA14 from "../../../assets/audio/Workbook/Unit 6/Page 33 - A/Item_014_inarow.mp3";
import soundA10 from "../../../assets/audio/Workbook/Unit 6/Page 33 - A/Item_010_¢_shoot.mp3";
import soundA9 from "../../../assets/audio/Workbook/Unit 6/Page 33 - A/Item_009_¢_booth.mp3";
import soundA8 from "../../../assets/audio/Workbook/Unit 6/Page 33 - A/Item_008_bowling.mp3";
import soundA7 from "../../../assets/audio/Workbook/Unit 6/Page 33 - A/Item_007_bunch.mp3";
import soundA6 from "../../../assets/audio/Workbook/Unit 6/Page 33 - A/Item_006_action_figure.mp3";
import soundA5 from "../../../assets/audio/Workbook/Unit 6/Page 33 - A/Item_005_trade.mp3";
import soundA13 from "../../../assets/audio/Workbook/Unit 6/Page 33 - A/Item_013_basketballs.mp3";
import soundA12 from "../../../assets/audio/Workbook/Unit 6/Page 33 - A/Item_012_I_won_four_games.mp3";
import soundA11 from "../../../assets/audio/Workbook/Unit 6/Page 33 - A/Item_011_I_love_to.mp3";
import soundA4 from "../../../assets/audio/Workbook/Unit 6/Page 33 - A/Item_004_that_looked_like_an_army_man.mp3";
import soundA3 from "../../../assets/audio/Workbook/Unit 6/Page 33 - A/Item_003_of_gifts_for_my_birthday.mp3";
import soundA2 from "../../../assets/audio/Workbook/Unit 6/Page 33 - A/Item_002_Iwonanice.mp3";
import soundA1 from "../../../assets/audio/Workbook/Unit 6/Page 33 - A/Item_001_My_dad_gave_mea.mp3";
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
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 33/Asset 26.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 33/Asset 31.svg";
import img3 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 33/Asset 4.svg";
import img4 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 33/Asset 5.svg";
import img5 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 33/Asset 6.svg";
import img6 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 33/Asset 7.svg";
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

const WB_Unit6_Page33_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const wordSoundFor = (word) =>
    ({
      trade: soundA5,
      "action figure": soundA6,
      bunch: soundA7,
      bowling: soundA8,
      booth: soundA9,
      shoot: soundA10,
      "in a row": soundA14,
      "take advantage of": soundA15,
      "Shall we?": soundA16,
      expert: soundA17,
      "try out": soundD8,
      "made it": soundD10,
      "half price": soundD2,
    })[word];
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      answer: "bunch",
      options: ["trade", "bunch", "booth"],
      image: img1,
    },
    {
      answer: "action figure",
      options: ["action figure", "bowling", "shoot"],
      image: img2,
    },
    {
      answer: "shoot",
      options: ["shoot", "in a row", "expert"],
      image: img3,
    },
    {
      answer: "in a row",
      options: ["in a row", "take advantage of", "Shall we?"],
      image: img4,
    },
    {
      answer: "discount",
      options: ["bowling", "doll", "discount"],
      image: img5,
    },
    {
      answer: "try out",
      options: ["made it", "try out", "half price"],
      image: img6,
    },
  ];

  const [selected, setSelected] = useState(["", "", "", "", "", ""]);

  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const handleSelect = (i, option) => {
    if (wordSoundFor(option))
      audio.play(`word-${i}-${option}`, wordSoundFor(option));
    if (locked || result[i] === true) return;
    setAnnouncement(`Sentence ${i + 1}: ${option} selected.`);

    const updatedSelected = [...selected];

    updatedSelected[i] = option;

    setSelected(updatedSelected);

    const updatedAnswers = [...answers];

    updatedAnswers[i] = option;

    setAnswers(updatedAnswers);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;
    audio.stop();

    const hasEmpty = selected.some((s) => !s);

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

    const newResults = selected.map((s, i) => {
      const ok = s.toLowerCase() === questions[i].answer.toLowerCase();

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
    const solved = questions.map((q) => q.answer);

    setSelected(solved);

    setAnswers(solved);

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setSelected(["", "", "", "", "", ""]);

    setAnswers(["", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width) => (
    <div className="relative inline-block">
      <input
        tabIndex={-1}
        style={{
          borderBottomColor:
            result[i] === true
              ? "#16a34a"
              : result[i] === false
                ? "#D1232A"
                : undefined,
        }}
        aria-invalid={result[i] === false}
        title={`Sentence ${i + 1}: chosen word or expression`}
        aria-label={`Sentence ${i + 1}: chosen word or expression`}
        {...fieldKeys}
        type="text"
        value={answers[i]}
        readOnly
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

  const optionCircle = (i, option) => {
    const active = selected[i] === option;

    return (
      <button
        {...activationKeys}
        aria-label={`Sentence ${i + 1}: ${option}${result[i] === true ? ". Answer locked." : ""}`}
        aria-pressed={active}
        data-choice={true}
        type="button"
        aria-disabled={locked || result[i] === true}
        onClick={() => handleSelect(i, option)}
        style={{
          position: "relative",
          background: "transparent",
          border: "none",
          fontSize: "18px",
          cursor: locked || result[i] === true ? "default" : "pointer",
          color: "black",
          textAlign: "left",
          width: "fit-content",
          borderRadius: 999,
          backgroundColor:
            audio.activeId === `word-${i}-${option}` 
              ? "#dbeafe"
              : undefined,
          boxShadow:
            audio.activeId === `word-${i}-${option}`
              ? "0 0 0 3px #2563eb"
              : undefined,
        }}
      >
        {option}

        {active && (
          <span
            style={{
              position: "absolute",
              top: "-6px",
              left: "-10px",
              width: "calc(100% + 20px)",
              height: "calc(100% + 12px)",
              border:
                result[i] === true
                  ? "3px solid #16a34a"
                  : result[i] === false
                    ? "3px solid #D1232A"
                    : "3px solid #6D2980",
              borderRadius: "50%",
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
            }}
          />
        )}
        {audio.activeId === `word-${i}-${option}` && <AudioSpeaker />}
      </button>
    );
  };

  return (
    <div
      data-exercise-scope={"WB_Unit6_Page33_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit6_Page33_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit6_Page33_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit6_Page33_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
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
          sectionLetter="A"
          title={<>Read, look, and circle.</>}
          subTitle="Read all choices before selecting; choose only the option that makes the full sentence or expression correct."
        />

        {/* QUESTIONS */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-10 w-[110%] mb-15">
          {/* 1 */}
          <div>
            <div className="flex items-start gap-3 mb-4">
              <span className="font-bold">1</span>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap">
                    <AudioText
                      audio={audio}
                      id={"fragment-0"}
                      src={soundA1}
                      label={"Hear My dad gave me a"}
                    >
                      My dad gave me a
                    </AudioText>
                  </span>

                  {inputField(0, "w-[180px]")}
                </div>

                <span className="mt-2">
                  <AudioText
                    audio={audio}
                    id={"fragment-1"}
                    src={soundA3}
                    label={"Hear of gifts for my birthday."}
                  >
                    of gifts for my birthday.
                  </AudioText>
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <img
                src={questions[0].image}
                alt={"A young woman holding several wrapped gifts."}
                style={{
                  width: "165px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />

              <div
                style={{
                  border: "2px solid #7D3C98",
                  borderRadius: "10px",
                  padding: "12px 18px",
                  width: "230px",
                }}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <span className="font-bold">a</span>

                    {optionCircle(0, "trade")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">b</span>

                    {optionCircle(0, "bunch")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">c</span>

                    {optionCircle(0, "booth")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2 */}
          <div>
            <div className="flex items-start gap-3 mb-4">
              <span className="font-bold">2</span>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap">
                    <AudioText
                      audio={audio}
                      id={"fragment-2"}
                      src={soundA2}
                      label={"Hear I won a nice"}
                    >
                      I won a nice
                    </AudioText>
                  </span>

                  {inputField(1, "w-[180px]")}
                </div>

                <span className="mt-2">
                  <AudioText
                    audio={audio}
                    id={"fragment-3"}
                    src={soundA4}
                    label={"Hear that looked like an army man."}
                  >
                    that looked like an army man.
                  </AudioText>
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <img
                src={questions[1].image}
                alt={"A small green toy soldier."}
                style={{
                  width: "165px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />

              <div
                style={{
                  border: "2px solid #7D3C98",
                  borderRadius: "10px",
                  padding: "12px 18px",
                  width: "220px",
                }}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <span className="font-bold">a</span>

                    {optionCircle(1, "action figure")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">b</span>

                    {optionCircle(1, "bowling")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">c</span>

                    {optionCircle(1, "shoot")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 */}
          <div>
            <div className="flex items-start gap-3 mb-4">
              <span className="font-bold">3</span>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap">
                    <AudioText
                      audio={audio}
                      id={"fragment-4"}
                      src={soundA11}
                      label={"Hear I love to"}
                    >
                      I love to
                    </AudioText>
                  </span>

                  {inputField(2, "w-[180px]")}
                </div>

                <span className="mt-2">
                  <AudioText
                    audio={audio}
                    id={"fragment-5"}
                    src={soundA13}
                    label={"Hear basketballs."}
                  >
                    basketballs.
                  </AudioText>
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <img
                src={questions[2].image}
                alt={"A person aiming a basketball toward a hoop."}
                style={{
                  width: "180px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />

              <div
                style={{
                  border: "2px solid #7D3C98",
                  borderRadius: "10px",
                  padding: "12px 18px",
                  width: "220px",
                  height: "150px",
                }}
              >
                <div className="flex flex-col gap-3 whitespace-normal">
                  <div className="flex gap-3">
                    <span className="font-bold">a</span>

                    {optionCircle(2, "shoot")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">b</span>

                    {optionCircle(2, "in a row")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">c</span>

                    {optionCircle(2, "expert")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 */}
          <div>
            <div className="flex items-start gap-3 mb-4">
              <span className="font-bold">4</span>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap mb-4">
                    <AudioText
                      audio={audio}
                      id={"fragment-6"}
                      src={soundA12}
                      label={"Hear I won four games"}
                    >
                      I won four games
                    </AudioText>
                  </span>

                  {inputField(3, "w-[180px]")}
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <img
                src={questions[3].image}
                alt={"A child and a woman celebrating over a board game."}
                style={{
                  width: "180px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />

              <div
                style={{
                  border: "2px solid #7D3C98",
                  borderRadius: "10px",
                  padding: "12px 18px",
                  width: "210px",
                  height: "150px",
                }}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <span className="font-bold">a</span>

                    {optionCircle(3, "in a row")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">b</span>

                    {optionCircle(3, "take advantage of")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">c</span>

                    {optionCircle(3, "Shall we?")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5 */}
          <div>
            <div className="flex items-start gap-3 mb-4">
              <span className="font-bold">5</span>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap"> I got a 40%</span>

                  {inputField(4, "w-[180px]")}
                </div>

                <span className="mt-2">on this pair of jeans.</span>
              </div>
            </div>
            <div className="flex gap-4">
              <img
                src={questions[4].image}
                alt={"A pair of blue jeans."}
                style={{
                  width: "165px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />

              <div
                style={{
                  border: "2px solid #7D3C98",
                  borderRadius: "10px",
                  padding: "12px 18px",
                  width: "240px",
                }}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <span className="font-bold">a</span>

                    {optionCircle(4, "bowling")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">b</span>

                    {optionCircle(4, "doll")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">c</span>

                    {optionCircle(4, "discount")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 6 */}
          <div>
            <div className="flex items-start gap-3 mb-4">
              <span className="font-bold">6</span>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap"> I like to </span>
                  {inputField(5, "w-[180px]")}{" "}
                  <AudioText
                    audio={audio}
                    id="new"
                    src={soundA19}
                    label="Hear new"
                  >
                    new
                  </AudioText>
                </div>

                <span className="mt-2">games and see if I like them.</span>
              </div>
            </div>

            <div className="flex gap-4">
              <img
                src={questions[5].image}
                alt={"A blue video game controller."}
                style={{
                  width: "165px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />

              <div
                style={{
                  border: "2px solid #7D3C98",
                  borderRadius: "10px",
                  padding: "12px 18px",
                  width: "220px",
                }}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <span className="font-bold">a</span>

                    {optionCircle(5, "made it")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">b</span>

                    {optionCircle(5, "try out")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">c</span>

                    {optionCircle(5, "half price")}
                  </div>
                </div>
              </div>
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

export default WB_Unit6_Page33_Q1;
