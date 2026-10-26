import clip0 from "../../../assets/audio/ClassBook/U7/Page 62 - A/Item_001_album.mp3";
import clip1 from "../../../assets/audio/ClassBook/U7/Page 62 - A/Item_002_orphanage.mp3";
import clip2 from "../../../assets/audio/ClassBook/U7/Page 62 - A/Item_003_treasure.mp3";
import clip3 from "../../../assets/audio/ClassBook/U7/Page 62 - A/Item_004_miss.mp3";
import clip4 from "../../../assets/audio/ClassBook/U7/Page 62 - A/Item_005_jotting_down.mp3";
import clip5 from "../../../assets/audio/ClassBook/U7/Page 62 - A/Item_006_super.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import { AudioText, AudioFeedback } from "../unit5/ExerciseAudioText";

import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

// IMAGES
import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 7 Helen Is Visiting Grandma Folder/Page 62/SVG/Asset 12.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 7 Helen Is Visiting Grandma Folder/Page 62/SVG/Asset 13.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 7 Helen Is Visiting Grandma Folder/Page 62/SVG/Asset 14.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 7 Helen Is Visiting Grandma Folder/Page 62/SVG/Asset 15.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 5 Unit 7 Helen Is Visiting Grandma Folder/Page 62/SVG/Asset 16.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 5 Unit 7 Helen Is Visiting Grandma Folder/Page 62/SVG/Asset 17.svg";
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

const Unit7_Page5_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      image: img1,
      answer: "super",
    },

    {
      image: img2,
      answer: "album",
    },

    {
      image: img3,
      answer: "jotting down",
    },

    {
      image: img4,
      answer: "treasure",
    },

    {
      image: img5,
      answer: "orphanage",
    },

    {
      image: img6,
      answer: "miss",
    },
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);

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
      const ok = normalize(a) === normalize(questions[i].answer);

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
    setAnswers([
      "super",
      "album",
      "jotting down",
      "treasure",
      "orphanage",
      "miss",
    ]);

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  return (
    <div
      data-exercise-scope={"Unit7_Page5_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit7_Page5_Q1.jsx"] input:focus-visible,[data-exercise-scope="Unit7_Page5_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="Unit7_Page5_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall" style={{gap:"30px"}}>
        {/* TITLE */}
        <ExerciseHeader
          sectionLetter="A"
          title={<>Look and match.</>}
          subTitle="Start with one item, find the matching partner, then connect the pair before moving to the next one."
        />

        {/* WORD BOX */}
        <div
          style={{
            width: "760px",
            height: "52px",
            background: "#E9E1EC",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            margin: "0 auto 35px auto",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          <span>
            <AudioText
              audio={audio}
              id="bank-album"
              src={clip0}
              label="Hear album"
            >
              {" "}
              <span className="font-bold mr-2">a</span> album
            </AudioText>
          </span>

          <span>
            <AudioText
              audio={audio}
              id="bank-orphanage"
              src={clip1}
              label="Hear orphanage"
            >
              <span className="font-bold mr-2">b</span> orphanage
            </AudioText>
          </span>

          <span>
            <AudioText
              audio={audio}
              id="bank-treasure"
              src={clip2}
              label="Hear treasure"
            >
              <span className="font-bold mr-2">c</span> treasure
            </AudioText>
          </span>

          <span>
            <AudioText
              audio={audio}
              id="bank-miss"
              src={clip3}
              label="Hear miss"
            >
              <span className="font-bold mr-2">d </span>miss
            </AudioText>
          </span>

          <span>
            <AudioText
              audio={audio}
              id="bank-jotting down"
              src={clip4}
              label="Hear jotting down"
            >
              <span className="font-bold mr-2">e </span>jotting down
            </AudioText>
          </span>

          <span>
            <AudioText
              audio={audio}
              id="bank-super"
              src={clip5}
              label="Hear super"
            >
              <span className="font-bold mr-2">f </span>super
            </AudioText>
          </span>
        </div>

        {/* QUESTIONS */}
        <div
          className="
            grid
            grid-cols-3
            gap-y-14
            gap-x-20
          "
        >
          {questions.map((q, i) => (
            <div
              key={i}
              className="
                  flex
                  items-start
                  gap-4
                "
            >
              {/* NUMBER */}
              <span className="font-bold text-[18px]">{i + 1}</span>

              {/* IMAGE + INPUT */}
              <div
                className="
    flex
    items-end
    gap-3
  "
              >
                <img
                  src={q.image}
                  alt={
                    [
                      "Four people giving a thumbs-up.",
                      "An open photo album with family pictures.",
                      "A hand writing on a sheet of paper with a pen.",
                      "An open chest filled with jewelry and watches.",
                      "Four children standing outside a yellow building.",
                      "A girl reaching toward a framed photograph of a woman, with the woman pictured in a thought bubble.",
                    ][i]
                  }
                  style={{
                    width: "130px",
                    height: "130px",
                    objectFit: "cover",
                  }}
                />

                <div className="relative">
                  <input
                    style={{
                      ...(result[i] === true
                        ? { borderBottomColor: "#16a34a" }
                        : {}),
                    }}
                    aria-invalid={!!(result[i] === false)}
                    title={`Picture ${i + 1}, matching vocabulary word from the box`}
                    aria-label={`Picture ${i + 1}, matching vocabulary word from the box`}
                    {...fieldKeys}
                    type="text"
                    value={answers[i]}
                    disabled={locked || result[i] === true}
                    onChange={(e) => handleChange(i, e.target.value)}
                    className={`
        w-[145px]
        border-0
        border-b
        outline-none
        bg-transparent
        text-[18px]
        font-bold
        pb-1

        ${
          result[i] === false
            ? "border-[#D1232A] text-[#6D2980]"
            : "border-black text-[#6D2980]"
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

export default Unit7_Page5_Q1;
