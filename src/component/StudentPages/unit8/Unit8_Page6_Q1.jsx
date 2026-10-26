import clip0 from "../../../assets/audio/ClassBook/U8/Page 69 - C/Item_001_Did_anyone_forget_(their_his)_book_today.mp3";
import clip1 from "../../../assets/audio/ClassBook/U8/Page 69 - C/Item_002_I_think_someone_left_(his_their)_tennis_racket_here.mp3";
import clip2 from "../../../assets/audio/ClassBook/U8/Page 69 - C/Item_003_No_one_is_going_to_forget_(their_his)_pencil_on_testing_day,_I_hope!.mp3";
import clip3 from "../../../assets/audio/ClassBook/U8/Page 69 - C/Item_004_Does_someone_have_(his_their)_car_here.mp3";
import clip4 from "../../../assets/audio/ClassBook/U8/Page 69 - C/Item_005_Everybody_knew_(their_his)_cell_phone_wouldn't_work_in_the_countryside.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import { AudioFeedback } from "../unit5/ExerciseAudioText";
import { SentenceGroup } from "../unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import grammer_u1 from "../../../assets/audio/ClassBook/U8/PG 69/CD40.Pg69_Instructions_Adult Lady.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
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

const normalizeAnswer = (text) =>
  text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[‘’']/g, "")
    .replace(/[.,!?;:…“”"–—-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const Unit8_Page6_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = ["his", "his", "his", "his", "his"];
  const captions = [
    {
      start: 0.379,
      end: 14.119,
      text: "Page 69, right activities, exercise C. First, listen to the sample paragraph. Then underline the correct pronoun that agrees with the indefinite pronoun. Finally, read each sentence aloud.",
    },

    {
      start: 16.039,
      end: 36.579,
      text: "Timothy was surprised when he got to school. Everyone was at his/her locker, hurrying to class. He couldn't understand why because school wasn't supposed to start for an hour. When he asked someone, though, she said it was because class started one hour early today, so everybody could finish his/her classes today before the big show.",
    },

    {
      start: 37.919,
      end: 67.259,
      text: "That's when Timothy remembered. Of course, somebody was coming to the school today to show his pets to the students, and his pets happened to include a ten-foot snake, a crocodile, an eagle, and a lion cub. Anyone who hadn't finished his/her assignments by two o'clock that day had to stay in class and complete them. So everyone was hurrying to his/her classes to get an early start. Timothy hurried as well, so he wouldn't miss the show that afternoon.",
    },
  ];
  const [answers, setAnswers] = useState(["", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const handleSelect = (i, value) => {
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
    setAnswers(["his", "his", "his", "his", "his"]);

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

  const optionCircle = (qIndex, option) => {
    const isSelected = answers[qIndex] === option;

    const isWrong = result[qIndex] === false && isSelected;

    return (
      <span className="relative inline-flex items-center">
        <button
          style={{
            borderRadius: 6,
            ...(isSelected
              ? {
                  backgroundColor: "#dbeafe",
                  ...(result[qIndex] === true
                    ? {
                        borderBottomColor: "#16a34a",
                        boxShadow: "0 0 0 2px #16a34a",
                      }
                    : result[qIndex] === false
                      ? { boxShadow: "0 0 0 2px #D1232A" }
                      : {}),
                }
              : {}),
          }}
          {...activationKeys}
          aria-disabled={locked || result[qIndex] === true}
          aria-pressed={isSelected}
          aria-label={`Sentence ${qIndex + 1}, choose ${option}`}
          data-choice={true}
          type={"button"}
          onClick={() => handleSelect(qIndex, option)}
          className={`
  relative
  px-2
  pb-1
  leading-none
  flex
  items-center
  justify-center
  text-[18px]
  font-medium
  transition-all

  ${
    isWrong
      ? "border-b-2 border-[#D1232A] text-[#1DA1F2]"
      : isSelected
        ? "border-b-2 border-[#6D2980] text-[#1DA1F2]"
        : "border-b-2 border-transparent text-[#1DA1F2]"
  }
`}
        >
          {option}

          {isWrong && (
            <span
              style={{
                position: "absolute",
                top: "-15px",
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
        </button>
      </span>
    );
  };
  return (
    <div
      data-exercise-scope={"Unit8_Page6_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit8_Page6_Q1.jsx"] input:focus-visible,[data-exercise-scope="Unit8_Page6_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="Unit8_Page6_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall mb-10">
        {/* TITLE */}
        <ExerciseHeader
          sectionLetter="C"
          title={
            <>
              First, listen to the sample paragraph. Then underline the correct
              pronoun that agrees with the indefinite pronoun. Finally, read
              each sentence aloud.
            </>
          }
          subTitle={
            <>
              Task 1: Listen to the sample first and notice how the pronoun
              agrees with the indefinite pronoun.
              <br /> Task 2: Select the correct pronoun in each sentence. <br />
              Task 3: Read each completed sentence aloud once to check that it
              sounds natural.
            </>
          }
        />
        <QuestionAudioPlayer
          pageId="sb_unit8_page6_q1"
          src={grammer_u1}
          captions={captions}
          stopAtSecond={14.8}
        />
        {/* QUESTIONS */}
        <div className="text-[18px] leading-[3.3] flex flex-col gap-2">
          <SentenceGroup
            label={"Hear sentence 1"}
            src={clip0}
            id={"sentence-0"}
            audio={audio}
          >
            <span className="font-bold mr-4">1</span>
            Did anyone forget ({optionCircle(0, "their")},{" "}
            {optionCircle(0, "his")}) book today?
          </SentenceGroup>

          <SentenceGroup
            label={"Hear sentence 2"}
            src={clip1}
            id={"sentence-1"}
            audio={audio}
          >
            <span className="font-bold mr-4">2</span>I think someone left (
            {optionCircle(1, "his")}, {optionCircle(1, "their")}) tennis racket
            here.
          </SentenceGroup>

          <SentenceGroup
            label={"Hear sentence 3"}
            src={clip2}
            id={"sentence-2"}
            audio={audio}
          >
            <span className="font-bold mr-4">3</span>
            No one is going to forget ({optionCircle(2, "their")},{" "}
            {optionCircle(2, "his")}) pencil on testing day, I hope!
          </SentenceGroup>

          <SentenceGroup
            label={"Hear sentence 4"}
            src={clip3}
            id={"sentence-3"}
            audio={audio}
          >
            <span className="font-bold mr-4">4</span>
            Does someone have ({optionCircle(3, "his")},{" "}
            {optionCircle(3, "their")}) car here?
          </SentenceGroup>

          <SentenceGroup
            label={"Hear sentence 5"}
            src={clip4}
            id={"sentence-4"}
            audio={audio}
          >
            <span className="font-bold mr-4">5</span>
            Everybody knew ({optionCircle(4, "their")}, {optionCircle(4, "his")}
            ) cell phone wouldn’t work in the countryside.
          </SentenceGroup>
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

export default Unit8_Page6_Q1;
