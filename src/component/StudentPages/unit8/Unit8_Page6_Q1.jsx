import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import grammer_u1 from "../../../assets/audio/ClassBook/U8/PG 69/CD40.Pg69_Instructions_Adult Lady.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const Unit8_Page6_Q1 = () => {
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

  const normalize = (str) => str.toLowerCase().replace(/\s+/g, " ").trim();

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

    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all answers.");

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
      setLocked(true);

      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const showAnswers = () => {
    setAnswers(["his", "his", "his", "his", "his"]);

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
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
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-4">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            C
          </span>
          First, listen to the sample paragraph. Then underline the correct
          pronoun <br /> that agrees with the indefinite pronoun. Finally, read
          each sentence aloud.
        </h5>
        <QuestionAudioPlayer
          src={grammer_u1}
          captions={captions}
          stopAtSecond={14.8}
        />
        {/* QUESTIONS */}
        <div className="text-[18px] leading-[3.3] flex flex-col gap-2">
          <div>
            <span className="font-bold mr-4">1</span>
            Did anyone forget ({optionCircle(0, "their")},{" "}
            {optionCircle(0, "his")}) book today?
          </div>

          <div>
            <span className="font-bold mr-4">2</span>I think someone left (
            {optionCircle(1, "his")}, {optionCircle(1, "their")}) tennis racket
            here.
          </div>

          <div>
            <span className="font-bold mr-4">3</span>
            No one is going to forget ({optionCircle(2, "their")},{" "}
            {optionCircle(2, "his")}) pencil on testing day, I hope!
          </div>

          <div>
            <span className="font-bold mr-4">4</span>
            Does someone have ({optionCircle(3, "his")},{" "}
            {optionCircle(3, "their")}) car here?
          </div>

          <div>
            <span className="font-bold mr-4">5</span>
            Everybody knew ({optionCircle(4, "their")}, {optionCircle(4, "his")}
            ) cell phone wouldn’t work in the countryside.
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>

        <button className="show-answer-btn" onClick={showAnswers}>
          Show Answer
        </button>

        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Unit8_Page6_Q1;
