import clip0 from "../../../assets/audio/ClassBook/U2/Page 16 - A/Item_001_actually.mp3";
import clip1 from "../../../assets/audio/ClassBook/U2/Page 16 - A/Item_002_pancakes.mp3";
import clip2 from "../../../assets/audio/ClassBook/U2/Page 16 - A/Item_003_starving.mp3";
import clip3 from "../../../assets/audio/ClassBook/U2/Page 16 - A/Item_004_alarm.mp3";
import clip4 from "../../../assets/audio/ClassBook/U2/Page 16 - A/Item_005_face.mp3";
import clip5 from "../../../assets/audio/ClassBook/U2/Page 16 - A/Item_006_I_wanted_to_have_syrup_on_my.mp3";
import clip6 from "../../../assets/audio/ClassBook/U2/Page 16 - A/Item_007_I_set_the_so_I_could_wake_up.mp3";
import clip7 from "../../../assets/audio/ClassBook/U2/Page 16 - A/Item_008_Tim_is_going_to_wash_his.mp3";
import clip8 from "../../../assets/audio/ClassBook/U2/Page 16 - A/Item_009_Jake_was_after_not_eating_all_day.mp3";
import clip9 from "../../../assets/audio/ClassBook/U2/Page 16 - A/Item_010_Megan_was_very_happy_because_her_cousin_would_visit_soon.mp3";
import { useExerciseAudio } from "../unit2/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
  AudioSpeaker,
} from "../unit2/ExerciseAudioText";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
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

const Page_Read_Write = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const words = ["actually", "pancakes", "starving", "alarm", "face"];

  const correct = ["pancakes", "alarm", "face", "starving", "actually"];

  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  // ✅ CHECK
  const handleCheck = () => {
    if (locked) return;
    audio.stop();
    setAnnouncement(
      "Answers checked. Correct answers stay locked; incorrect answers can be changed.",
    );

    if (answers.some((a) => !a.trim())) {
      setAnnouncement("Complete all answers.");
      ValidationAlert.info("Complete all answers.");
      return;
    }

    let correctCount = 0;
    const normalize = normalizeAnswer;
    const res = answers.map((a, i) => {
      const ok = normalize(a) === normalize(correct[i]);
      if (ok) correctCount++;
      return ok;
    });

    setResult(res);

    const total = correct.length;

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
    setResult(correct.map(() => true));
    setLocked(true);
  };

  // 🔄 RESET
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", ""]);
    setResult([]);
    setLocked(false);
  };

  // 🎯 input line
  const input = (i, width = "w-[200px]") => (
    <span className="relative inline-block mx-2">
      <input placeholder="Word"
        style={{
          borderBottom:
            locked || result[i] === true
              ? "2px solid #16a34a"
              : result[i] === false
                ? "2px solid #ef4444"
                : undefined,
        }}
        disabled={locked || result[i] === true}
        {...fieldKeys}
        aria-label={["Item 1, word from the bank: I wanted to have syrup on my blank.","Item 2, word from the bank: I set the blank so I could wake up.","Item 3, word from the bank: Tim is going to wash his blank.","Item 4, word from the bank: Jake was blank after not eating all day.","Item 5, word from the bank: Megan was blank very happy because her cousin would visit soon."][i]}
        title={["Item 1, word from the bank: I wanted to have syrup on my blank.","Item 2, word from the bank: I set the blank so I could wake up.","Item 3, word from the bank: Tim is going to wash his blank.","Item 4, word from the bank: Jake was blank after not eating all day.","Item 5, word from the bank: Megan was blank very happy because her cousin would visit soon."][i]}
        value={answers[i]}
        onChange={(e) => {
          if (locked || result[i] === true) return;

          const updated = [...answers];
          updated[i] = e.target.value;
          setAnswers(updated);

          // 🔥 يمسح الخطأ
          setResult((prev) => {
            const copy = [...prev];
            copy[i] = undefined;
            return copy;
          });
        }}
        className={`border-b-1 outline-none text-center text-[#6D2980] font-semibold bg-transparent
        ${result[i] === false ? "border-red-500" : "border-black"}
        ${width}`}
      />

      {/* ❌ */}
      {result[i] === false && (
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
      data-exercise-scope="Review1_Page1_Q1.jsx"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review1_Page1_Q1.jsx"] input:focus-visible,[data-exercise-scope="Review1_Page1_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="Review1_Page1_Q1.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      <div className="div-forall" style={{gap:"30px"}}>
        <ExerciseHeader
          isReview
          sectionLetter="A"
          title={<>Read and write the correct word.</>}
          subTitle="Read the whole sentence first, then choose the word that fits both the meaning and grammar before checking."
        />

        <div className="flex justify-between gap-10">
          {/* LEFT */}
          <div className="space-y-12 text-[18px] ">
            <div>
              {" "}
              <span className="mr-3 font-bold">1</span>
              <AudioText
                audio={audio}
                id="fragment-0-0"
                src={clip5}
                label="Hear item 1"
              >
                {" "}
                I wanted to have syrup on my{" "}
              </AudioText>
              {input(0)}.
            </div>

            <div>
              {" "}
              <span className="mr-3 font-bold">2</span>
              <AudioText
                audio={audio}
                id="fragment-1-1"
                src={clip6}
                label="Hear item 2"
              >
                {" "}
                I set the{" "}
              </AudioText>
              {input(1)}
              <AudioText
                audio={audio}
                id="fragment-1-2"
                src={clip6}
                label="Hear item 2"
              >
                {" "}
                so I could wake up.
              </AudioText>
            </div>

            <div>
              {" "}
              <span className="mr-3 font-bold">3</span>
              <AudioText
                audio={audio}
                id="fragment-2-3"
                src={clip7}
                label="Hear item 3"
              >
                {" "}
                Tim is going to wash his
              </AudioText>{" "}
              {input(2)}.
            </div>

            <div>
              {" "}
              <span className="mr-3 font-bold">4</span>
              <AudioText
                audio={audio}
                id="fragment-3-4"
                src={clip8}
                label="Hear item 4"
              >
                {" "}
                Jake was{" "}
              </AudioText>
              {input(3)}{" "}
              <AudioText
                audio={audio}
                id="fragment-3-5"
                src={clip8}
                label="Hear item 4"
              >
                after not eating all day.
              </AudioText>
            </div>

            <div className="flex items-start gap-3">
              <span className="font-bold w-[20px]">5</span>

              <div className="flex-1">
                <AudioText
                  audio={audio}
                  id="fragment-4-6"
                  src={clip9}
                  label="Hear item 5"
                >
                  Megan was{" "}
                </AudioText>
                {input(4)}
                <AudioText
                  audio={audio}
                  id="fragment-4-7"
                  src={clip9}
                  label="Hear item 5"
                >
                  {" "}
                  very happy because her cousin would visit soon.
                </AudioText>
              </div>
            </div>
          </div>

          {/* RIGHT WORD BANK */}
          <div className="bg-[#E8E1EC]  rounded-xl flex flex-col gap-3 text-[18px] h-80 w-[150px] ">
            {words.map((w, i) => (
              <div key={i} className="px-4 py-3 rounded-lg text-center">
                <AudioText
                  audio={audio}
                  id={"bank-" + i}
                  src={[clip0, clip1, clip2, clip3, clip4][i]}
                  label={"Hear " + w}
                >
                  {w}
                </AudioText>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="action-buttons-container mt-6">
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

export default Page_Read_Write;
