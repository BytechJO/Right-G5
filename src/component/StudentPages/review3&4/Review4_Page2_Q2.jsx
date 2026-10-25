import { PassageAudio } from "./PassageAudio";
import clip0 from "../../../assets/audio/ClassBook/U4/Page 37 - E/Item_001_There_are_many_different_plans_on_how_to_lose_weight._Some_claim_that_ea.mp3";
import clip1 from "../../../assets/audio/ClassBook/U4/Page 37 - E/Item_002_your_body_to_lose_weight._Others_believe_that_eating_less_regularly_is_a.mp3";
import clip2 from "../../../assets/audio/ClassBook/U4/Page 37 - E/Item_003_Generally,_your_body_needs_about_three_hours_to_digest_a_meal._Eating_me.mp3";
import clip3 from "../../../assets/audio/ClassBook/U4/Page 37 - E/Item_004_means_your_body_is_always_in_the_process_of_digesting_food._Waiting_long.mp3";
import clip4 from "../../../assets/audio/ClassBook/U4/Page 37 - E/Item_005_body_begins_to_use_the_stored_energy_in_your_body._People_who_want_to_lo.mp3";
import clip5 from "../../../assets/audio/ClassBook/U4/Page 37 - E/Item_006_high_in_fiber_and_protein,_like_vegetables,_whole_grains,_and_nuts.mp3";
import clip6 from "../../../assets/audio/ClassBook/U4/Page 37 - E/Item_007_What_do_some_people_believe_is_better.mp3";
import clip7 from "../../../assets/audio/ClassBook/U4/Page 37 - E/Item_008_What_do_some_people_believe_is_a_healthier_way_to_losing_weight.mp3";
import clip8 from "../../../assets/audio/ClassBook/U4/Page 37 - E/Item_009_What_happens_if_you_eat_meals_every_two_to_three_hours.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import { SentenceGroup } from "./SentenceAudio";
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
    .replace(/[.,!?;:…“”"()–—-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const Review4_Page2_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState(["", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);
  const [selectedWords, setSelectedWords] = useState([[], [], []]);
  const [circleResult, setCircleResult] = useState([]);
  const correctAnswers = [
    "Some people claim that eating frequently is better for losing weight.",
    "Some people believe that eating less regularly is a healthier way to lose weight.",
    "Your body is always digesting food.",
  ];
  const adverbs = ["frequently", "regularly", "always"];
  const normalize = normalizeAnswer;
  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;
    setAnswers((previous) => previous.map((a, j) => (j === i ? value : a)));
    setResult((previous) => previous.map((v, j) => (j === i ? undefined : v)));
  };
  const toggleWord = (questionIndex, word) => {
    if (locked || circleResult[questionIndex] === true) return;
    setSelectedWords((previous) =>
      previous.map((words, i) =>
        i === questionIndex ? (words.includes(word) ? [] : [word]) : words,
      ),
    );
    setCircleResult((previous) => {
      const next = [...previous];
      next[questionIndex] = undefined;
      return next;
    });
    setAnnouncement(
      "Item " + (questionIndex + 1) + ": " + word + " selection changed.",
    );
  };
  const renderSentence = (sentence, qIndex) => {
    return sentence.split(" ").map((word, index) => {
      const cleanWord = word.replace(/[.?!,]/g, "");
      const selected = selectedWords[qIndex].includes(cleanWord);
      const wrong = circleResult[qIndex] === false && selected;
      return (
        <React.Fragment key={index}>
          <span
            {...activationKeys}
            aria-disabled={locked || circleResult[qIndex] === true}
            aria-pressed={selected}
            aria-label={`Answer ${qIndex + 1}, choose ${cleanWord} as the adverb. ${circleResult[qIndex] === true ? "Selection correct and locked." : ""}`}
            data-choice={true}
            tabIndex={0}
            role={"button"}
            onClick={() => toggleWord(qIndex, cleanWord)}
            style={{
              border: selected
                ? wrong
                  ? "2px solid red"
                  : "2px solid #7A2D91"
                : "2px solid transparent",
              borderRadius: "999px",
              padding: "0px 6px",
              margin: "0 2px",
              cursor: "pointer",
              display: "inline-block",
              ...(selected && circleResult[qIndex] === true
                ? {
                    borderColor: "#16a34a",
                  }
                : {}),
            }}
          >
            {word}
          </span>{" "}
        </React.Fragment>
      );
    });
  };
  const input = (i) => (
    <span className="relative inline-block">
      <input
        style={{
          ...(result[i] === true
            ? {
                borderBottomColor: "#16a34a",
              }
            : {}),
        }}
        {...fieldKeys}
        aria-invalid={result[i] === false}
        title={`Answer ${i + 1}: ${["What do some people believe is better?", "What do some people believe is a healthier way to losing weight?", "What happens if you eat meals every two to three hours?"][i]}`}
        aria-label={`Answer ${i + 1}: ${["What do some people believe is better?", "What do some people believe is a healthier way to losing weight?", "What happens if you eat meals every two to three hours?"][i]}`}
        disabled={locked || result[i] === true}
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`border-b outline-none text-[#6D2980] font-semibold w-[700px] px-2
        ${result[i] === false ? "border-red-500" : "border-black"}
      `}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            width: "20px",
            height: "20px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        >
          ✕
        </span>
      )}
    </span>
  );
  const checkAnswers = () => {
    if (locked) return;
    audio.stop();
    if (answers.some((a) => !a.trim())) {
      (setAnnouncement(
        String("Please complete all fields.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Please complete all fields."));
      return;
    }
    const missingCircle = selectedWords.some((arr) => arr.length === 0);
    if (missingCircle) {
      (setAnnouncement(
        String("Please circle the adverbs.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Please circle the adverbs."));
      return;
    }
    let correctCount = 0;
    const sentenceResults = [];
    const circleResults = [];
    answers.forEach((a, i) => {
      const sentenceOk = normalize(a) === normalize(correctAnswers[i]);
      const selected = selectedWords[i][0]?.toLowerCase();
      const circleOk = selected === adverbs[i].toLowerCase();
      sentenceResults[i] = sentenceOk;
      circleResults[i] = circleOk;
      if (sentenceOk && circleOk) {
        correctCount++;
      }
    });
    setResult(sentenceResults);
    setCircleResult(circleResults);
    const total = answers.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const msg = `
      <div style="font-size:20px;text-align:center;">
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
    setAnnouncement("Correct answers shown and locked.");
    setAnswers(correctAnswers);
    setSelectedWords([["frequently"], ["regularly"], ["always"]]);
    setResult([true, true, true]);
    setCircleResult([true, true, true]);
    setLocked(true);
  };
  const handleReset = () => {
    audio.stop();
    setAnnouncement("All answers and feedback cleared.");
    setAnswers(["", "", ""]);
    setResult([]);
    setCircleResult([]);
    setSelectedWords([[], [], []]);
    setLocked(false);
  };
  return (
    <div
      data-exercise-scope={"Review4_Page2_Q2.jsx"}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review4_Page2_Q2.jsx"] input:focus-visible,[data-exercise-scope="Review4_Page2_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall mb-20">
        <ExerciseHeader
          isReview
          sectionLetter="E"
          title={
            <>
              Read and answer the questions with adverbs of frequency. Then
              circle the adverbs in your answer.
            </>
          }
          subTitle={
            <>
              Task 1: Answer each question using the given adverb of frequency
              in the correct position. <br />
              Task 2: Then select or highlight the adverb inside your completed
              answer.
            </>
          }
        />

        {/* READING BOX */}
        <div
          style={{
            border: "2px solid #7A2D91",
            borderRadius: "14px",
            padding: "20px",
            fontSize: "18px",
            lineHeight: "2",
            marginBottom: "35px",
          }}
        >
          <PassageAudio
            audio={audio}
            id="reading"
            text="There are many different plans on how to lose weight. Some claim that eating frequently is better for your body to lose weight. Others believe that eating less regularly is a healthier way to lose weight. Generally, your body needs about three hours to digest a meal. Eating meals every two or three hours means your body is always in the process of digesting food. Waiting longer between meals means the body begins to use the stored energy in your body. People who want to lose weight should eat foods high in fiber and protein, like vegetables, whole grains, and nuts."
            sources={[clip0, clip1, clip2, clip3, clip4, clip5]}
            starts={[
              "There are many different plans",
              "your body to lose weight.",
              "Generally,",
              "means your body",
              "body begins to use",
              "high in fiber",
            ]}
          />
        </div>

        {/* QUESTIONS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "34px",
            fontSize: "18px",
          }}
        >
          {/* 1 */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                1
              </span>

              <SentenceGroup
                label={
                  "Hear question 1: What do some people believe is better?"
                }
                src={clip6}
                id={"question-0"}
                audio={audio}
              >
                What do some people believe is better?
              </SentenceGroup>
            </div>

            <div
              style={{
                marginLeft: "30px",
              }}
            >
              {input(0)}

              {answers[0] && (
                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "20px",
                  }}
                >
                  {renderSentence(answers[0], 0)}
                </div>
              )}
            </div>
          </div>

          {/* 2 */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                2
              </span>

              <SentenceGroup
                label={
                  "Hear question 2: What do some people believe is a healthier way to losing weight?"
                }
                src={clip7}
                id={"question-1"}
                audio={audio}
              >
                {" "}
                What do some people believe is a healthier way to losing weight?
              </SentenceGroup>
            </div>

            <div
              style={{
                marginLeft: "30px",
              }}
            >
              {input(1)}

              {answers[1] && (
                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "20px",
                  }}
                >
                  {renderSentence(answers[1], 1)}
                </div>
              )}
            </div>
          </div>

          {/* 3 */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                3
              </span>

              <SentenceGroup
                label={
                  "Hear question 3: What happens if you eat meals every two to three hours?"
                }
                src={clip8}
                id={"question-2"}
                audio={audio}
              >
                What happens if you eat meals every two to three hours?
              </SentenceGroup>
            </div>

            <div
              style={{
                marginLeft: "30px",
              }}
            >
              {input(2)}

              {answers[2] && (
                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "20px",
                  }}
                >
                  {renderSentence(answers[2], 2)}
                </div>
              )}
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
          {...activationKeys}
          style={{
            cursor: locked ? "not-allowed" : "pointer",
          }}
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
export default Review4_Page2_Q2;
