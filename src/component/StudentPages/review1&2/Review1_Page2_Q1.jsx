import { SentenceGroup } from "../unit2/SentenceAudio";
import clip0 from "../../../assets/audio/ClassBook/U2/Page 17 - D/Item_001_milk_does_he_drink.mp3";
import clip1 from "../../../assets/audio/ClassBook/U2/Page 17 - D/Item_002_He_drinks.mp3";
import clip2 from "../../../assets/audio/ClassBook/U2/Page 17 - D/Item_003_photos_does_he_take.mp3";
import clip3 from "../../../assets/audio/ClassBook/U2/Page 17 - D/Item_004_He_takes.mp3";

import clip5 from "../../../assets/audio/ClassBook/U2/Page 17 - D/Item_006_The_elephant_is.mp3";
import { useExerciseAudio } from "../unit2/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
  AudioSpeaker,
} from "../unit2/ExerciseAudioText";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 17/SVG/Asset 32.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 17/SVG/Asset 19.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 17/SVG/Asset 20.svg";
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

const Page_D_Questions = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState([
    { q: "", a: "" },
    { q: "", a: "" },
    { q: "", a: "" },
  ]);

  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  // ✅ الإجابات الصح
  const correct = [
    {
      q: "How much",
      a: "one cup of milk",
    },
    {
      q: "How many",
      a: "a lot of photos",
    },
    {
      q: "How tall is the elephant",
      a: "is twenty feet tall",
    },
  ];

  const normalize = normalizeAnswer;

  const handleChange = (i, field, val) => {
    if (locked || result[i]?.[field] === true) return;
    if (result[i]?.[field] === true) return;

    const updated = answers.map((row) => ({ ...row }));
    updated[i][field] = val;
    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];
      if (copy[i]) copy[i] = { ...copy[i], [field]: undefined };
      return copy;
    });
  };

  // ✅ CHECK
  const handleCheck = () => {
    if (locked) return;
    audio.stop();
    setAnnouncement(
      "Answers checked. Correct answers stay locked; incorrect answers can be changed.",
    );

    if (answers.some((a) => !a.q.trim() || !a.a.trim())) {
      setAnnouncement("Complete all fields.");
      ValidationAlert.info("Complete all fields.");
      return;
    }

    let correctCount = 0;

    const res = answers.map((ans, i) => {
      const qOk = normalize(ans.q) === normalize(correct[i].q);
      const aOk = normalize(ans.a) === normalize(correct[i].a);

      if (qOk) correctCount++;
      if (aOk) correctCount++;

      return { q: qOk, a: aOk };
    });

    setResult(res);

    const total = correct.length * 2;

    const msg = `Score: ${correctCount} / ${total}`;

    if (correctCount === total) {
      setLocked(true);
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // 👀 SHOW
  const handleShow = () => {
    audio.stop();
    setAnnouncement("Correct answers shown and locked.");
    setAnswers(correct);
    setResult(correct.map(() => ({ q: true, a: true })));
    setLocked(true);
  };

  // 🔄 RESET
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers([
      { q: "", a: "" },
      { q: "", a: "" },
      { q: "", a: "" },
    ]);
    setResult([]);
    setLocked(false);
  };

  // 🎯 input
  const input = (i, field, width = "350px") => (
    <span className="relative inline-block mx-2">
      <input
        {...fieldKeys}
        aria-label={
          [
            {
              q: "Item 1, question words before: milk does he drink?",
              a: "Item 1, amount of milk: complete He drinks.",
            },
            {
              q: "Item 2, question words before: photos does he take?",
              a: "Item 2, number of photos: complete He takes.",
            },
            {
              q: "Item 3, write the question about the height of the pictured elephant.",
              a: "Item 3, height of the elephant: complete The elephant is.",
            },
          ][i][field]
        }
        title={
          [
            {
              q: "Item 1, question words before: milk does he drink?",
              a: "Item 1, amount of milk: complete He drinks.",
            },
            {
              q: "Item 2, question words before: photos does he take?",
              a: "Item 2, number of photos: complete He takes.",
            },
            {
              q: "Item 3, write the question about the height of the pictured elephant.",
              a: "Item 3, height of the elephant: complete The elephant is.",
            },
          ][i][field]
        }
        value={answers[i][field]}
        onChange={(e) => handleChange(i, field, e.target.value)}
        disabled={locked || result[i]?.[field] === true}
        style={{
          outline: "none",
          textAlign: "center",
          width: width,
          fontWeight: "bold",
          color: "#6D2980",
          background: "transparent",
          borderBottom:
            locked || result[i]?.[field] === true
              ? "2px solid #16a34a"
              : result[i]?.[field] === false
                ? "2px solid #ef4444"
                : "1px solid",
        }}
      />

      {result[i]?.[field] === false && (
        <span
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            transform: "translateY(-50%)",
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

  return (
    <div
      data-exercise-scope="Review1_Page2_Q1.jsx"
      className="p-8 flex flex-col items-center"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review1_Page2_Q1.jsx"] input:focus-visible,[data-exercise-scope="Review1_Page2_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="Review1_Page2_Q1.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <div className="div-forall">
        <ExerciseHeader
          isReview
          sectionLetter="D"
          title={<>Look and write the questions and answers.</>}
          subTitle="Use the picture, definition, chart, or grammar clue, then complete each answer before checking."
        />
        <div className="mb-7">
          {/* 🔥 السؤال 1 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "40px",
              fontSize: "18px",
            }}
          >
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: "-10px",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                1
              </span>

              <img
                alt="A glass of milk on a saucer."
                src={img1}
                style={{
                  width: "120px",
                  height: "120px",
                  marginLeft: "20px",
                  padding: "5px",
                }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <SentenceGroup audio={audio} id="sentence-0" src={clip0} label="Hear the sentence: blank milk does he drink?">
                {input(0, "q")}
                
                  {" "}
                  milk does he drink?
                
              </SentenceGroup>
              <SentenceGroup audio={audio} id="sentence-1" src={clip1} label="Hear the sentence: He drinks blank ." style={{ marginTop: "10px" }}>
                
                  He drinks{" "}
                
                {input(0, "a", "350px")}.
              </SentenceGroup>
            </div>
          </div>

          {/* 🔥 السؤال 2 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "40px",
              fontSize: "18px",
            }}
          >
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: "-10px",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                2
              </span>

              <img
                alt="A boy holding photographs with a camera around his neck."
                src={img2}
                style={{
                  width: "120px",
                  height: "120px",
                  marginLeft: "20px",
                  padding: "5px",
                }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <SentenceGroup audio={audio} id="sentence-2" src={clip2} label="Hear the sentence: blank photos does he take?">
                {input(1, "q")}
                
                  {" "}
                  photos does he take?
                
              </SentenceGroup>
              <SentenceGroup audio={audio} id="sentence-3" src={clip3} label="Hear the sentence: He takes blank ." style={{ marginTop: "10px" }}>
                
                  He takes{" "}
                
                {input(1, "a", "350px")}.
              </SentenceGroup>
            </div>
          </div>

          {/* 🔥 السؤال 3 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              fontSize: "18px",
            }}
          >
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: "-10px",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                3
              </span>

              <img
                alt="An elephant beside a height scale."
                src={img3}
                style={{
                  width: "120px",
                  height: "120px",
                  padding: "5px",
                  marginLeft: "20px",
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div>{input(2, "q", "350px")}?</div>
              <SentenceGroup audio={audio} id="sentence-4" src={clip5} label="Hear the sentence: The elephant is blank ." style={{ marginTop: "10px" }}>
                
                  The elephant is{" "}
                
                {input(2, "a", "350px")}.
              </SentenceGroup>
            </div>
          </div>
        </div>
        <div className="action-buttons-container">
          <button
            type="button"
            aria-label="Start Again"
            {...activationKeys}
            ref={resetButtonRef}
            className="try-again-button"
            onClick={handleReset}
          >
            Start Again ↻
          </button>

          <button
            type="button"
            aria-label="Show Answer"
            {...activationKeys}
            onClick={handleShow}
            className="show-answer-btn"
          >
            Show Answer
          </button>

          <button
            type="button"
            aria-label="Check Answer"
            {...activationKeys}
            disabled={locked}
            style={{ cursor: locked ? "not-allowed" : "pointer" }}
            className="check-button2"
            onClick={handleCheck}
          >
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page_D_Questions;
