import soundK21 from "../../../assets/audio/Workbook/Unit 9/Page 56 - K/Item_021_For_you_and_for_me!.mp3";
import soundK20 from "../../../assets/audio/Workbook/Unit 9/Page 56 - K/Item_020_is_that_I_can_find_a_time.mp3";
import soundK19 from "../../../assets/audio/Workbook/Unit 9/Page 56 - K/Item_019_The.mp3";
import soundK18 from "../../../assets/audio/Workbook/Unit 9/Page 56 - K/Item_018_And_they_might_not_give_a_welcome_greeting.mp3";
import soundK17 from "../../../assets/audio/Workbook/Unit 9/Page 56 - K/Item_017_The_other_members_would_not_be_happy,.mp3";
import soundK16 from "../../../assets/audio/Workbook/Unit 9/Page 56 - K/Item_016_in_late_for_the_meeting.mp3";
import soundK15 from "../../../assets/audio/Workbook/Unit 9/Page 56 - K/Item_015_great_news.mp3";
import soundK14 from "../../../assets/audio/Workbook/Unit 9/Page 56 - K/Item_014_It'll_almost_feel_like_a_crime,.mp3";
import soundK13 from "../../../assets/audio/Workbook/Unit 9/Page 56 - K/Item_013_join.mp3";
import soundK12 from "../../../assets/audio/Workbook/Unit 9/Page 56 - K/Item_012_There_will_be_disappointment,.mp3";
import soundK11 from "../../../assets/audio/Workbook/Unit 9/Page 56 - K/Item_011_I_must_come_right_on_time.mp3";
import soundK10 from "../../../assets/audio/Workbook/Unit 9/Page 56 - K/Item_010_club.mp3";
import soundK9 from "../../../assets/audio/Workbook/Unit 9/Page 56 - K/Item_009_When_I_have_a_club.mp3";
import soundK8 from "../../../assets/audio/Workbook/Unit 9/Page 56 - K/Item_008_appointment.mp3";
import soundK7 from "../../../assets/audio/Workbook/Unit 9/Page 56 - K/Item_007_Just_like_I_am_in_school.mp3";
import soundK6 from "../../../assets/audio/Workbook/Unit 9/Page 56 - K/Item_006_rush.mp3";
import soundK5 from "../../../assets/audio/Workbook/Unit 9/Page 56 - K/Item_005_And_be_nice_to_everyone.mp3";
import soundK4 from "../../../assets/audio/Workbook/Unit 9/Page 56 - K/Item_004_that'll_work.mp3";
import soundK3 from "../../../assets/audio/Workbook/Unit 9/Page 56 - K/Item_003_I_must_follow_every_rule.mp3";
import soundK2 from "../../../assets/audio/Workbook/Unit 9/Page 56 - K/Item_002_that_is_fun,.mp3";
import soundK1 from "../../../assets/audio/Workbook/Unit 9/Page 56 - K/Item_001_When_I.mp3";
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

const WB_Unit9_Page56_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const wordBank = [
    "that’ll work",
    "rush",
    "appointment",
    "club",
    "join",
    "great news",
  ];

  const answers = [
    "join",
    "club",
    "appointment",
    "rush",
    "great news",
    "that’ll work",
  ];

  const [studentAnswers, setStudentAnswers] = useState([
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

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers(["", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i, width = "140px") => (
    <div className="relative w-full">
      <input
        placeholder={"Word / phrase"}
        aria-invalid={result[i] === false}
        title={`Poem blank ${i + 1}: ${["When I ___ a club that is fun", "When I join a ___ that is fun", "When I have a club ___", "If I ___ in late for the meeting", "The ___ is that I can find a time", "I can find a time ___ for you and for me"][i]}`}
        aria-label={`Poem blank ${i + 1}: ${["When I ___ a club that is fun", "When I join a ___ that is fun", "When I have a club ___", "If I ___ in late for the meeting", "The ___ is that I can find a time", "I can find a time ___ for you and for me"][i]}`}
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
      data-exercise-scope={"WB_Unit9_Page56_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit9_Page56_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit9_Page56_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit9_Page56_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
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
          sectionLetter="K"
          title={<>Read and write the correct words in the blanks.</>}
          subTitle="Read the full sentence first, then choose the word or expression that fits both the meaning and grammar."
        />

        {/* CONTENT */}

        <div className="flex gap-10 items-start">
          {/* LEFT */}

          <div className="flex-1 leading-[1.7] flex flex-col gap-0.5">
            {/* LINE 1 */}

            <div className="flex items-end gap-3 w-full">
              <span className="shrink-0">
                <AudioText
                  audio={audio}
                  id={"fragment-0"}
                  src={soundK1}
                  label={"Hear When I"}
                >
                  When I
                </AudioText>
              </span>

              <div>{inputField(0, "100%")}</div>

              <span className="shrink-0">a</span>

              <div>{inputField(1, "100%")}</div>

              <span className="shrink-0">
                <AudioText
                  audio={audio}
                  id={"fragment-1"}
                  src={soundK2}
                  label={"Hear that is fun,"}
                >
                  that is fun,
                </AudioText>
              </span>
            </div>

            <div>
              <AudioText
                audio={audio}
                id={"fragment-2"}
                src={soundK3}
                label={"Hear I must follow every rule."}
              >
                {" "}
                I must follow every rule.
              </AudioText>
            </div>

            <div>
              <AudioText
                audio={audio}
                id={"fragment-3"}
                src={soundK5}
                label={"Hear And be nice to everyone"}
              >
                And be nice to everyone
              </AudioText>
            </div>

            <div>
              <AudioText
                audio={audio}
                id={"fragment-4"}
                src={soundK7}
                label={"Hear Just like I am in school."}
              >
                Just like I am in school.
              </AudioText>
            </div>

            <div className="h-3" />

            {/* LINE 2 */}

            <div className="flex items-end gap-3 w-full">
              <span className="shrink-0">
                <AudioText
                  audio={audio}
                  id={"fragment-5"}
                  src={soundK9}
                  label={"Hear When I have a club"}
                >
                  When I have a club
                </AudioText>
              </span>

              <div className="flex-1">{inputField(2, "100%")}</div>

              <span className="shrink-0">,</span>
            </div>

            <div>
              <AudioText
                audio={audio}
                id={"fragment-6"}
                src={soundK11}
                label={"Hear I must come right on time."}
              >
                I must come right on time.
              </AudioText>
            </div>

            <div>
              <AudioText
                audio={audio}
                id={"fragment-7"}
                src={soundK12}
                label={"Hear There will be disappointment,"}
              >
                There will be disappointment,
              </AudioText>
            </div>

            <div>
              <AudioText
                audio={audio}
                id={"fragment-8"}
                src={soundK14}
                label={"Hear It’ll almost feel like a crime,"}
              >
                It’ll almost feel like a crime,
              </AudioText>
            </div>

            <div className="flex items-end gap-3 w-full">
              <span className="shrink-0">If I</span>

              <div className="flex-1">{inputField(3, "100%")}</div>

              <span className="shrink-0">
                <AudioText
                  audio={audio}
                  id={"fragment-9"}
                  src={soundK16}
                  label={"Hear in late for the meeting."}
                >
                  in late for the meeting.
                </AudioText>
              </span>
            </div>

            <div>
              <AudioText
                audio={audio}
                id={"fragment-10"}
                src={soundK17}
                label={"Hear The other members would not be happy,"}
              >
                The other members would not be happy,
              </AudioText>
            </div>

            <div>
              <AudioText
                audio={audio}
                id={"fragment-11"}
                src={soundK18}
                label={"Hear And they might not give a welcome greeting."}
              >
                And they might not give a welcome greeting.
              </AudioText>
            </div>

            <div className="h-3" />

            {/* LINE 3 */}

            <div className="flex items-end gap-3 w-full">
              <span className="shrink-0">
                <AudioText
                  audio={audio}
                  id={"fragment-12"}
                  src={soundK19}
                  label={"Hear The"}
                >
                  The
                </AudioText>
              </span>

              <div className="w-[170px]">{inputField(4, "100%")}</div>

              <span className="shrink-0">
                <AudioText
                  audio={audio}
                  id={"fragment-13"}
                  src={soundK20}
                  label={"Hear is that I can find a time"}
                >
                  is that I can find a time
                </AudioText>
              </span>

              <div className="w-[170px]">{inputField(5, "100%")}</div>
            </div>

            <div>
              <AudioText
                audio={audio}
                id={"fragment-14"}
                src={soundK21}
                label={"Hear For you and for me!"}
              >
                For you and for me!
              </AudioText>
            </div>
          </div>

          {/* RIGHT */}

          <div
            style={{
              border: "2px solid #6D2980",
              borderRadius: "10px",
              padding: "18px 28px",
              minWidth: "180px",
            }}
            className="
              flex
              flex-col
              gap-5
              text-[18px]
              mt-5
            "
          >
            {wordBank.map((word, index) => (
              <span key={index}>
                <AudioText
                  audio={audio}
                  id={`bank-${index}`}
                  src={
                    [soundK4, soundK6, soundK8, soundK10, soundK13, soundK15][
                      index
                    ]
                  }
                  label={`Hear ${word}`}
                >
                  {word}
                </AudioText>
              </span>
            ))}
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

export default WB_Unit9_Page56_Q2;
