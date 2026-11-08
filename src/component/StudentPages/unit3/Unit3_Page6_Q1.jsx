import clip0 from "../../../assets/audio/ClassBook/U3/Page 27 - D/Item_001_no.mp3";
import clip1 from "../../../assets/audio/ClassBook/U3/Page 27 - D/Item_002_way.mp3";
import clip2 from "../../../assets/audio/ClassBook/U3/Page 27 - D/Item_003_tastes.mp3";
import clip3 from "../../../assets/audio/ClassBook/U3/Page 27 - D/Item_004_some.mp3";
import clip4 from "../../../assets/audio/ClassBook/U3/Page 27 - D/Item_005_funny.mp3";
import clip5 from "../../../assets/audio/ClassBook/U3/Page 27 - D/Item_006_try.mp3";
import clip6 from "../../../assets/audio/ClassBook/U3/Page 27 - D/Item_007_yourself.mp3";
import clip7 from "../../../assets/audio/ClassBook/U3/Page 27 - D/Item_008_help.mp3";
import clip8 from "../../../assets/audio/ClassBook/U3/Page 27 - D/Item_009_top.mp3";
import clip9 from "../../../assets/audio/ClassBook/U3/Page 27 - D/Item_010_off.mp3";
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

const Unit3_Page6_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");

  // ✅ الأزواج الصحيحة
  const correctPairs = [
    ["no", "way"],
    ["tastes", "funny"],
    ["try", "some"],
    ["help", "yourself"],
    ["top", "off"],
  ];

  const [answers, setAnswers] = useState(
    Array(5)
      .fill(0)
      .map(() => ["", ""]),
  );
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  // ✅ CHECK
  const handleCheck = () => {
    if (locked) return;

    audio.stop();

    if (locked) return;

    if (answers.some((pair) => pair.some((word) => !word.trim()))) {
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

    const userPairs = answers.map((pair) => pair.map(normalize).join(" "));

    const correctFormatted = correctPairs.map((pair) =>
      pair.map(normalize).join(" "),
    );

    const used = new Set(userPairs.filter((_, i) => result[i] === true));
    const res = userPairs.map((pair, i) => {
      if (result[i] === true) {
        correctCount++;
        return true;
      }
      const ok = correctFormatted.includes(pair) && !used.has(pair);
      if (ok) used.add(pair);
      if (ok) correctCount++;
      return ok;
    });

    setResult(res);

    const total = correctPairs.length;

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
    setAnswers(correctPairs.map((pair) => [...pair]));
    setResult(correctPairs.map(() => true));
    setLocked(true);
    setAnnouncement("Correct expression pairs shown and locked.");
  };

  // 🔄 RESET
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers, feedback and locks cleared.");

    setAnswers(
      Array(5)
        .fill(0)
        .map(() => ["", ""]),
    );
    setResult([]);
    setLocked(false);
  };

  // 🎯 input
  const input = (row, col) => (
    <span className="relative inline-block mx-2">
      <input placeholder={"Word"}
        style={{
          borderBottomColor:
            locked || result[row] === true
              ? "#16a34a"
              : result[row] === false
                ? "#ef4444"
                : undefined,
        }}
        {...fieldKeys}
        aria-invalid={result[row] === false}
        title={`Expression ${row + 1}, ${col === 0 ? "first" : "second"} word from the bank`}
        aria-label={`Expression ${row + 1}, ${col === 0 ? "first" : "second"} word from the bank`}
        value={answers[row][col]}
        disabled={locked || result[row] === true}
        onFocus={(e) => e.target.select()}
        onChange={(e) => {
          if (locked || result[row] === true) return;
          if (result[row] === true) return;

          const updated = [...answers];
          updated[row][col] = e.target.value;
          setAnswers(updated);

          setResult((prev) => {
            const copy = [...prev];
            copy[row] = undefined;
            return copy;
          });
        }}
        className={`border-b outline-none text-center text-[#6D2980] font-bold bg-transparent w-[120px]
        ${result[row] === false ? "border-red-500" : "border-black"}`}
      />

      {result[row] === false && (
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
      data-exercise-scope="Unit3_Page6_Q1.jsx"
      className="flex flex-col items-center p-8"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit3_Page6_Q1.jsx"] input:focus-visible,[data-exercise-scope="Unit3_Page6_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="Unit3_Page6_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
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
          sectionLetter="D"
          title={<>Put the words together to make expressions or sentences.</>}
          subTitle="Read the available words, build one correct expression or sentence pair at a time, then use each word only as allowed."
        />

        {/* WORD BANK */}
        <div className="bg-[#D4C7DC] rounded-xl flex justify-between text-[18px] p-6 mb-2 w-[500px] mx-auto">
          {/* العمود الأول */}
          <div className="flex flex-col gap-6">
            <div>
              <AudioText audio={audio} id="bank-no" src={clip0} label="Hear no">
                no
              </AudioText>
            </div>
            <div>
              <AudioText
                audio={audio}
                id="bank-try"
                src={clip5}
                label="Hear try"
              >
                try
              </AudioText>
            </div>
          </div>

          {/* العمود الثاني */}
          <div className="flex flex-col gap-6">
            <div>
              <AudioText
                audio={audio}
                id="bank-way"
                src={clip1}
                label="Hear way"
              >
                way
              </AudioText>
            </div>
            <div>
              <AudioText
                audio={audio}
                id="bank-yourself"
                src={clip6}
                label="Hear yourself"
              >
                yourself
              </AudioText>
            </div>
          </div>

          {/* العمود الثالث */}
          <div className="flex flex-col gap-6">
            <div>
              <AudioText
                audio={audio}
                id="bank-tastes"
                src={clip2}
                label="Hear tastes"
              >
                tastes
              </AudioText>
            </div>
            <div>
              <AudioText
                audio={audio}
                id="bank-help"
                src={clip7}
                label="Hear help"
              >
                help
              </AudioText>
            </div>
          </div>

          {/* العمود الرابع */}
          <div className="flex flex-col gap-6">
            <div>
              <AudioText
                audio={audio}
                id="bank-some"
                src={clip3}
                label="Hear some"
              >
                some
              </AudioText>
            </div>
            <div>
              <AudioText
                audio={audio}
                id="bank-top"
                src={clip8}
                label="Hear top"
              >
                top
              </AudioText>
            </div>
          </div>

          {/* العمود الخامس */}
          <div className="flex flex-col gap-6">
            <div>
              <AudioText
                audio={audio}
                id="bank-funny"
                src={clip4}
                label="Hear funny"
              >
                funny
              </AudioText>
            </div>
            <div>
              <AudioText
                audio={audio}
                id="bank-off"
                src={clip9}
                label="Hear off"
              >
                off
              </AudioText>
            </div>
          </div>
        </div>

        {/* QUESTIONS */}
        <div className="space-y-15 text-[18px]">
          {/* الصف الأول */}
          <div className="flex justify-between">
            <div>
              <span className="font-bold mr-3">1</span>
              {input(0, 0)} {input(0, 1)}
            </div>

            <div>
              <span className="font-bold mr-3">2</span>
              {input(1, 0)} {input(1, 1)}
            </div>
          </div>

          {/* الصف الثاني */}
          <div className="flex justify-between">
            <div>
              <span className="font-bold mr-3">3</span>
              {input(2, 0)} {input(2, 1)}
            </div>

            <div>
              <span className="font-bold mr-3">4</span>
              {input(3, 0)} {input(3, 1)}
            </div>
          </div>

          {/* الصف الثالث */}
          <div>
            <span className="font-bold mr-3">5</span>
            {input(4, 0)} {input(4, 1)}
          </div>
        </div>
        {/* BUTTONS */}
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

export default Unit3_Page6_Q1;
