import clip0 from "../../../assets/audio/ClassBook/U3/Page 26 - C/Item_001_A_spicy_Eastern_flavor.mp3";
import clip1 from "../../../assets/audio/ClassBook/U3/Page 26 - C/Item_002_said_when_someone_disagrees.mp3";
import clip2 from "../../../assets/audio/ClassBook/U3/Page 26 - C/Item_003_said_when_someone_likes_something_tasty.mp3";
import clip3 from "../../../assets/audio/ClassBook/U3/Page 26 - C/Item_004_chips_usually_have_this_flavor.mp3";
import clip4 from "../../../assets/audio/ClassBook/U3/Page 26 - C/Item_005_No_way!.mp3";
import clip5 from "../../../assets/audio/ClassBook/U3/Page 26 - C/Item_006_yummy.mp3";
import clip6 from "../../../assets/audio/ClassBook/U3/Page 26 - C/Item_007_salty.mp3";
import clip7 from "../../../assets/audio/ClassBook/U3/Page 26 - C/Item_008_curry.mp3";
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
    .replace(/[.,!?;:…“”"–—-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const Unit3_Page5_Q3 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");

  const words = ["No way!", "yummy", "salty", "curry"];

  const correct = ["curry", "No way!", "yummy", "salty"];

  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  // ✅ CHECK
  const handleCheck = () => {
    if (locked) return;

    audio.stop();

    if (locked) return;

    if (answers.some((a) => !a.trim())) {
      (setAnnouncement(
        String("Complete all answers.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Complete all answers."));
      return;
    }

    let correctCount = 0;

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

  // 👀 SHOW
  const handleShow = () => {
    audio.stop();
    setAnswers([...correct]);
    setResult(correct.map(() => true));
    setLocked(true);
    setAnnouncement("Correct answers shown and locked.");
  };

  // 🔄 RESET
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers, feedback and locks cleared.");

    setAnswers(["", "", "", ""]);
    setResult([]);
    setLocked(false);
  };

  // 🎯 INPUT
  const input = (i, width = "w-[220px]") => (
    <span className="relative inline-block mx-2">
      <input
        style={{
          borderBottomColor:
            locked || result[i] === true
              ? "#16a34a"
              : result[i] === false
                ? "#ef4444"
                : undefined,
        }}
        {...fieldKeys}
        placeholder="Word from the bank"
        disabled={locked || result[i] === true}
        aria-invalid={result[i] === false}
        title={`Definition ${i + 1}, word from the bank: ${["A spicy Eastern flavor", "said when someone disagrees", "said when someone likes something tasty", "chips usually have this flavor"][i]}`}
        aria-label={`Definition ${i + 1}, word from the bank: ${["A spicy Eastern flavor", "said when someone disagrees", "said when someone likes something tasty", "chips usually have this flavor"][i]}`}
        value={answers[i]}
        onChange={(e) => {
          if (locked || result[i] === true) return;
          if (result[i] === true) return;

          const updated = [...answers];
          updated[i] = e.target.value;
          setAnswers(updated);

          setResult((prev) => {
            const copy = [...prev];
            copy[i] = undefined;
            return copy;
          });
        }}
        className={`border-b outline-none  text-[#6D2980] font-bold bg-transparent
        ${result[i] === false ? "border-red-500" : "border-black"}
        ${width}`}
      />

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
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
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
      data-exercise-scope="Unit3_Page5_Q3.jsx"
      className="flex flex-col items-center p-8"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit3_Page5_Q3.jsx"] input:focus-visible,[data-exercise-scope="Unit3_Page5_Q3.jsx"] textarea:focus-visible,[data-exercise-scope="Unit3_Page5_Q3.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>

      <div className="div-forall" style={{gap:"50px"}}>
        <ExerciseHeader
          sectionLetter="C"
          title={<>Read, match, and write.</>}
          subTitle="Read the whole sentence first, then choose the word that fits both the meaning and grammar before checking."
        />

        <div className="flex justify-between gap-16">
          {/* LEFT */}
          <div className="space-y-10 text-[20px]">
            <SentenceGroup
              label={"Hear the definition: A spicy Eastern flavor"}
              src={[clip0, clip1, clip2, clip3][0]}
              id={"sentence-0"}
              audio={audio}
            >
              <span className="font-bold mr-3">1</span>A spicy Eastern flavor{" "}
              {input(0)}
            </SentenceGroup>

            <SentenceGroup
              label={"Hear the definition: said when someone disagrees"}
              src={[clip0, clip1, clip2, clip3][1]}
              id={"sentence-1"}
              audio={audio}
            >
              <span className="font-bold mr-3">2</span>
              said when someone disagrees {input(1)}
            </SentenceGroup>

            <SentenceGroup
              label={
                "Hear the definition: said when someone likes something tasty"
              }
              src={[clip0, clip1, clip2, clip3][2]}
              id={"sentence-2"}
              audio={audio}
            >
              <span className="font-bold mr-3">3</span>
              said when someone likes something tasty {input(2)}
            </SentenceGroup>

            <SentenceGroup
              label={"Hear the definition: chips usually have this flavor"}
              src={[clip0, clip1, clip2, clip3][3]}
              id={"sentence-3"}
              audio={audio}
            >
              <span className="font-bold mr-3">4</span>
              chips usually have this flavor {input(3)}
            </SentenceGroup>
          </div>

          {/* RIGHT WORD BANK */}
          <div className="bg-[#D4C7DC] rounded-xl flex flex-col justify-between text-[20px] p-4 w-40 h-56">
            {words.map((w, i) => (
              <div key={i} className="text-center">
                <AudioText
                  audio={audio}
                  id={"bank-" + i}
                  src={[clip4, clip5, clip6, clip7][i]}
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
            {...activationKeys}
            aria-label="Start Again"
            ref={resetButtonRef}
            className="try-again-button"
            onClick={handleReset}
          >
            Start Again ↻
          </button>

          <button
            type="button"
            {...activationKeys}
            aria-label="Show Answer"
            onClick={handleShow}
            className="show-answer-btn"
          >
            Show Answer
          </button>

          <button
            type="button"
            {...activationKeys}
            aria-label="Check Answer"
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

export default Unit3_Page5_Q3;
