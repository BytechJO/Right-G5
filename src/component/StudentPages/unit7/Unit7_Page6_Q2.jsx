import { PassageAudio } from "../review3&4/PassageAudio";
import clip0 from "../../../assets/audio/ClassBook/U7/Page 63 - D/Item_001_David_and_his_little_brother,_Jimmy,_are_playing_basketball_in_their_bac.mp3";
import clip1 from "../../../assets/audio/ClassBook/U7/Page 63 - D/Item_002_His_brother_does_not_like_this._He_walks_away_from_the_game._Are_you_lea.mp3";
import clip2 from "../../../assets/audio/ClassBook/U7/Page 63 - D/Item_003_Not_me!_said_Jimmy._You_are_the_one_who_is_winning._I_am_losing._David_f.mp3";
import clip3 from "../../../assets/audio/ClassBook/U7/Page 63 - D/Item_004_Jimmy_is_feeling_disappointed._Just_as_Jimmy_is_leaving,_David's_friend.mp3";
import clip4 from "../../../assets/audio/ClassBook/U7/Page 63 - D/Item_005_Yes,_says_David._He_is_losing._He_does_not_like_to_lose._You_can_join_me.mp3";
import clip5 from "../../../assets/audio/ClassBook/U7/Page 63 - D/Item_006_John_is_happy_that_David_invited_him._They_start_playing_basketball_toge.mp3";
import clip6 from "../../../assets/audio/ClassBook/U7/Page 63 - D/Item_007_David_is_playing_basketball_with_his_brother.mp3";
import clip7 from "../../../assets/audio/ClassBook/U7/Page 63 - D/Item_008_Jimmy_is_winning.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import { AudioFeedback } from "../unit5/ExerciseAudioText";
import { SentenceGroup } from "../unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import grammer_u1 from "../../../assets/audio/ClassBook/U7/PG 63/cd35pg63.mp3";
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

const Unit7_Page6_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

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

    if (answers.some((a) => !a.trim())) {
      (setAnnouncement(
        String("Please answer all questions.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Please answer all questions."));

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
    setAnswers(["true", "false", "true", "false"]);

    setResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  return (
    <div
      data-exercise-scope={"Unit7_Page6_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit7_Page6_Q2.jsx"] input:focus-visible,[data-exercise-scope="Unit7_Page6_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Unit7_Page6_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall">
        {/* TITLE */}
        <ExerciseHeader
          sectionLetter="D"
          title={
            <>
              Listen, read, and write{" "}
              <span className="text-[#00AEEF]">true</span> or{" "}
              <span className="text-[#00AEEF]">false</span>.
            </>
          }
          subTitle="Read or listen to each item carefully, then choose true or false only after checking the key detail."
        />
        <QuestionAudioPlayer
          pageId="sb_unit7_page6_q2"
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
            <PassageAudio
              audio={audio}
              id="story-0"
              text="David and his little brother, Jimmy, are playing basketball in their backyard. David is winning. His brother doesn’t like this. He walks away from the game. “Are you leaving?” David asks. “I thought we were having a great time.”"
              sources={[clip0, clip1]}
              starts={["David and his l", "His brother"]}
            />
          </p>

          <p className="mb-6">
            <PassageAudio
              audio={audio}
              id="story-1"
              text="“Not me!” said Jimmy. “You’re the one who is winning. I am losing.” David feels bad for his brother. Jimmy is feeling disappointed. Just as Jimmy is leaving, David’s friend John passes by. “Is your brother leaving the game?”"
              sources={[clip2, clip3]}
              starts={["“Not me!” said ", "Jimmy is feeling"]}
            />
          </p>

          <p>
            <PassageAudio
              audio={audio}
              id="story-2"
              text="“Yes,” says David. “He is losing. He doesn’t like to lose. You can join me if you like.” John is happy that David invited him. They start playing basketball together. John is doing really well. David is trying to beat him, but it seems like John is winning!"
              sources={[clip4, clip5]}
              starts={["“Yes,” says Dav", "John is happy"]}
            />
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
              <SentenceGroup
                label={`Hear statement ${i + 1}: ${q.question}`}
                src={[clip6, clip7][i]}
                id={`statement-${i}`}
                audio={audio}
                className="text-[18px] w-[470px]"
              >
                {q.question}
              </SentenceGroup>

              {/* INPUT */}
              <div className="relative">
                <input placeholder={"True/false"}
                  style={{
                    ...(result[i] === true
                      ? { borderBottomColor: "#16a34a" }
                      : {}),
                  }}
                  aria-invalid={!!(result[i] === false)}
                  title={`Statement ${i + 1}, write true or false: ${q.question}`}
                  aria-label={`Statement ${i + 1}, write true or false: ${q.question}`}
                  {...fieldKeys}
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

export default Unit7_Page6_Q2;
