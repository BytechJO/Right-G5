import clip0 from "../../../assets/audio/ClassBook/U4/Page 36 - A/Item_001_The_store_is_a_place_where_you_can_find_food_for_your_fridge_and_cupboar.mp3";
import clip1 from "../../../assets/audio/ClassBook/U4/Page 36 - A/Item_002_are_a_type_of_pants.mp3";
import clip2 from "../../../assets/audio/ClassBook/U4/Page 36 - A/Item_003_A_has_many_books.mp3";
import clip3 from "../../../assets/audio/ClassBook/U4/Page 36 - A/Item_004_include_computers,_printers,_stereos,_and_TVs.mp3";
import clip4 from "../../../assets/audio/ClassBook/U4/Page 36 - A/Item_005_You_can_find_many_fast_food_places_in_a.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import { SentenceGroup } from "./SentenceAudio";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 36/SVG/Asset 41.svg";
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
const Review4_Page1_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);
  const correctAnswers = [
    "grocery",
    "Jeans",
    "book store",
    "Electronics",
    "food court",
  ];
  const normalize = (text) =>
    normalizeAnswer(text).replace(/\bbook\s+store\b/g, "bookstore");
  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;
    setAnswers((previous) => previous.map((a, j) => (j === i ? value : a)));
    setResult((previous) => previous.map((v, j) => (j === i ? undefined : v)));
  };
  const input = (i, width = "w-[210px]") => (
    <span className="relative inline-block mx-1">
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
        title={`Sentence ${i + 1}, missing word: ${["The blank store is a place to find food", "blank are a type of pants", "A blank has many books", "blank include computers, printers, stereos and TVs", "Fast food places in a blank"][i]}`}
        aria-label={`Sentence ${i + 1}, missing word: ${["The blank store is a place to find food", "blank are a type of pants", "A blank has many books", "blank include computers, printers, stereos and TVs", "Fast food places in a blank"][i]}`}
        disabled={locked || result[i] === true}
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`border-b outline-none text-[#6D2980] font-semibold ${width}
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
    let correctCount = 0;
    const res = answers.map((a, i) => {
      const ok = normalize(a) === normalize(correctAnswers[i]);
      if (ok) correctCount++;
      return ok;
    });
    setResult(res);
    const total = correctAnswers.length;
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
    setResult([true, true, true, true, true]);
    setLocked(true);
  };
  const handleReset = () => {
    audio.stop();
    setAnnouncement("All answers and feedback cleared.");
    setAnswers(["", "", "", "", ""]);
    setResult([]);
    setLocked(false);
  };
  return (
    <div
      data-exercise-scope={"Review4_Page1_Q1.jsx"}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review4_Page1_Q1.jsx"] input:focus-visible,[data-exercise-scope="Review4_Page1_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall"  style={{gap:"50px"}}>
        <ExerciseHeader
          isReview
          sectionLetter="A"
          title={<>Read and write. Use vocabulary words.</>}
          subTitle="Read the whole sentence first, then choose the word that fits both the meaning and grammar before checking."
        />
        <div
          style={{
            position: "relative",
            minHeight: "350px",
          }}
        >
          {/* LEFT SIDE */}
          <div
            className="text-[18px] flex flex-col gap-y-5"
            style={{
              width: "68%",
            }}
          >
            {/* 1 */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  minWidth: "20px",
                }}
              >
                1
              </span>

              <SentenceGroup
                label={"Hear sentence 1"}
                src={clip0}
                id={"sentence-0"}
                audio={audio}
                style={{
                  lineHeight: "1.9",
                }}
              >
                The {input(0)} store is a place where you can find food for your
                fridge and cupboards.
              </SentenceGroup>
            </div>

            {/* 2 */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  minWidth: "20px",
                }}
              >
                2
              </span>

              <SentenceGroup
                label={"Hear sentence 2"}
                src={clip1}
                id={"sentence-1"}
                audio={audio}
                style={{
                  lineHeight: "1.9",
                }}
              >
                {input(1)} are a type of pants.
              </SentenceGroup>
            </div>

            {/* 3 */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  minWidth: "20px",
                }}
              >
                3
              </span>

              <SentenceGroup
                label={"Hear sentence 3"}
                src={clip2}
                id={"sentence-2"}
                audio={audio}
                style={{
                  lineHeight: "1.9",
                }}
              >
                A {input(2)} has many books.
              </SentenceGroup>
            </div>

            {/* 4 */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  minWidth: "20px",
                }}
              >
                4
              </span>

              <SentenceGroup
                label={"Hear sentence 4"}
                src={clip3}
                id={"sentence-3"}
                audio={audio}
                style={{
                  lineHeight: "1.9",
                }}
              >
                {input(3)} include computers, printers, stereos, and TVs.
              </SentenceGroup>
            </div>

            {/* 5 */}
            <div
              style={{
                display: "flex",
                gap: "16px",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  minWidth: "20px",
                }}
              >
                5
              </span>

              <SentenceGroup
                label={"Hear sentence 5"}
                src={clip4}
                id={"sentence-4"}
                audio={audio}
                style={{
                  lineHeight: "1.9",
                }}
              >
                You can find many fast food places in a {input(4)}.
              </SentenceGroup>
            </div>
          </div>

          {/* IMAGE */}
          <div
            style={{
              position: "absolute",
              top: "50px",
              right: "0",
            }}
          >
            <img
              src={img1}
              alt={"Three laptop computers on display in an electronics store."}
              style={{
                width: "80%",
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
export default Review4_Page1_Q1;
