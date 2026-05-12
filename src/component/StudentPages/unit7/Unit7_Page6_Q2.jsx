import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import grammer_u1 from "../../../assets/audio/ClassBook/U7/PG 63/cd35pg63.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const Unit7_Page6_Q2 = () => {
  const questions = [
    {
      question: "David is playing basketball with his brother.",

      answer: "true",
    },

    {
      question: "Jimmy is winning the game.",

      answer: "false",
    },

    {
      question: "Jimmy is feeling disappointed.",

      answer: "true",
    },

    {
      question: "John doesn’t want to play basketball.",

      answer: "false",
    },
  ];
  const captions = [
    {
      start: 0.259,
      end: 7.079,
      text: "Page 63, Write Activities, Exercise D. Listen, read, and write true or false.",
    },

    {
      start: 8.119,
      end: 16.219,
      text: "David and his little brother Jimmy are playing basketball in their backyard. David is winning. His brother doesn't like this. He walks away from the game.",
    },

    {
      start: 17.6,
      end: 26.439,
      text: "“Are you leaving?” David asks. “I thought we were having a great time.” “Not me,” said Jimmy. “You're the one who's winning. I am losing.”",
    },

    {
      start: 28.0,
      end: 34.819,
      text: "David feels bad for his brother. Jimmy is feeling disappointed. Just as Jimmy is leaving, David's friend John passes by.",
    },

    {
      start: 36.0,
      end: 43.619,
      text: "“Is your brother leaving the game?” “Yes,” said David. “He is losing. He doesn't like to lose. You can join me if you like.”",
    },

    {
      start: 44.68,
      end: 53.52,
      text: "John is happy that David invited him. They start playing basketball together. John is doing really well. David is trying to beat him, but it seems like John is winning.",
    },
  ];
  const [answers, setAnswers] = useState(["", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) => str.toLowerCase().trim();

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

    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please answer all questions.");

      return;
    }

    let correctCount = 0;

    const newResults = answers.map((a, i) => {
      const ok = normalize(a) === questions[i].answer;

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
    setAnswers(["true", "false", "true", "false"]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
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
            D
          </span>
          Listen, read, and write <span className="text-[#00AEEF]">true</span>{" "}
          or <span className="text-[#00AEEF]">false</span>.
        </h5>
        <QuestionAudioPlayer
          src={grammer_u1}
          captions={captions}
          stopAtSecond={7.5}
        />
        {/* STORY */}
        <div
          style={{
            width: "860px",
            border: "3px solid #7A2D91",
            borderRadius: "20px",
            padding: "22px",
            fontSize: "18px",
            lineHeight: "1.35",
            marginBottom: "30px",
          }}
        >
          <p className="mb-6">
            David and his little brother, Jimmy, are playing basketball in their
            backyard. David is winning. His brother doesn’t like this. He walks
            away from the game. “Are you leaving?” David asks. “I thought we
            were having a great time.”
          </p>

          <p className="mb-6">
            “Not me!” said Jimmy. “You’re the one who is winning. I am losing.”
            David feels bad for his brother. Jimmy is feeling disappointed. Just
            as Jimmy is leaving, David’s friend John passes by. “Is your brother
            leaving the game?”
          </p>

          <p>
            “Yes,” says David. “He is losing. He doesn’t like to lose. You can
            join me if you like.” John is happy that David invited him. They
            start playing basketball together. John is doing really well. David
            is trying to beat him, but it seems like John is winning!
          </p>
        </div>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-4 mb-12">
          {questions.map((q, i) => (
            <div
              key={i}
              className="
                  flex
                  items-center
                  gap-5
                "
            >
              {/* NUMBER */}
              <span className="font-bold text-[18px] w-5">{i + 1}</span>

              {/* QUESTION */}
              <div className="text-[18px] w-[470px]">{q.question}</div>

              {/* INPUT */}
              <div className="relative">
                <input
                  type="text"
                  value={answers[i]}
                  disabled={locked || result[i] === true}
                  onChange={(e) => handleChange(i, e.target.value)}
                  className={`
                      w-[150px]
                      h-10
                      rounded-[18px]
                      border-2
                      outline-none
                      bg-transparent
                      text-[18px]
                      font-semibold
                      text-center

                      ${
                        result[i] === false
                          ? "border-[#7A2D91] text-[#00AEEF]"
                          : "border-[#7A2D91] text-[#00AEEF]"
                      }
                    `}
                />

                {/* WRONG */}
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
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    ✕
                  </span>
                )}
              </div>
            </div>
          ))}
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

export default Unit7_Page6_Q2;
