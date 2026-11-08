import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback } from "./ExerciseAudioText";
import clip0 from "../../../assets/audio/ClassBook/U1/Page 8 - B/Item_001_hh-ou!.mp3";
import clip1 from "../../../assets/audio/ClassBook/U1/Page 8 - B/Item_002_lelf_scelep.mp3";
import clip2 from "../../../assets/audio/ClassBook/U1/Page 8 - B/Item_003_ghtir_yawa.mp3";
import clip3 from "../../../assets/audio/ClassBook/U1/Page 8 - B/Item_004_no_neo_dise.mp3";
import clip4 from "../../../assets/audio/ClassBook/U1/Page 8 - B/Item_005_ohw_od_ouy_ownk.mp3";
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
    .replace(/[.,!?;:…“”"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const Page8_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const inputsRef = useRef([]);
  const [answers, setAnswers] = useState(Array(32).fill(""));
  const [locked, setLocked] = useState(false);
  const correct = [
    "u",
    "h", // 1 → u h-o n
    "n",
    "n",
    "e",
    "i",
    "d",
    "e", // 2 → one one side
    "f",
    "l",
    "a",
    "l",
    "e",
    "e", // 3
    "o",
    "w",
    "d",
    "i",
    "d",
    "y",
    "o",
    "u",
    "n",
    "o",
    "w", // 4
    "i",
    "g",
    "h",
    "t",
    "w",
    "a",
    "y", // 5
  ];
  const showAnswers = () => {
    audio.stop();
    setAnnouncement("Correct answers shown and locked.");
    setAnswers(correct);
    setLocked(true);

    setResult(correct.map(() => true));
  };
  const reset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(Array(32).fill(""));
    setResult([]);
    setLocked(false);
  };
  const [result, setResult] = useState([]);
  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;
    const lastChar = value.slice(-1);
    setAnswers((previous) =>
      previous.map((answer, index) => (index === i ? lastChar : answer)),
    );
    setResult((previous) =>
      previous.map((answer, index) => (index === i ? undefined : answer)),
    );
    if (lastChar) {
      const next = answers.findIndex(
        (_, index) => index > i && result[index] !== true,
      );
      if (next !== -1) inputsRef.current[next]?.focus();
    }
  };
  const checkAnswers = () => {
    if (locked) return;
    audio.stop();
    setAnnouncement(
      "Checking answers. Correct answers stay locked; incorrect answers can be changed.",
    );

    // 🛑 validation
    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all fields");
      return;
    }

    let correctCount = 0;

    answers.forEach((a, i) => {
      if (normalizeAnswer(a) === normalizeAnswer(correct[i])) correctCount++;
    });

    const total = correct.length;

    // 🎨 اللون
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    // 💬 الرسالة
    const msg = `
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${correctCount} / ${total}
      </span>
    </div>
  `;

    // 🔔 Alert
    if (correctCount === total) {
      setLocked(true);
      resetButtonRef.current?.focus({ preventScroll: true });
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }

    // 🧠 حفظ النتيجة لكل حرف (عشان ❌ و ✔)
    const res = answers.map(
      (a, i) => normalizeAnswer(a) === normalizeAnswer(correct[i]),
    );
    setResult(res);
  };

  const input = (i) => (
    <span className="relative mx-1">
      <input
        {...fieldKeys}
        aria-label={`Expression ${i < 2 ? 1 : i < 8 ? 2 : i < 14 ? 3 : i < 25 ? 4 : 5}, missing letter ${i + 1}`}
        title={`Expression ${i < 2 ? 1 : i < 8 ? 2 : i < 14 ? 3 : i < 25 ? 4 : 5}, missing letter ${i + 1}`}
        style={{
          borderBottom:
            locked || result[i] === true
              ? "2px solid #16a34a"
              : result[i] === false
                ? "2px solid #ef4444"
                : undefined,
        }}
        placeholder="…"
        ref={(el) => (inputsRef.current[i] = el)}
        disabled={locked || result[i] === true}
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        maxLength={1}
        className={`relative w-[35px] border-b outline-none text-center font-medium
    ${result[i] === false ? "border-red-500 text-[#6D2980]" : "border-black text-[#6D2980]"}
  `}
      />

      {result[i] === false && (
        <div
          style={{
            position: "absolute",
            top: "-2px",
            left: "50%",
            transform: "translateY(-50%)",
            width: "20px",
            height: "20px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
            pointerEvents: "none",
          }}
        >
          ✕
        </div>
      )}
    </span>
  );
  return (
    <div
      data-unit1-scope="Page8_Q2.jsx"
      className="p-[30px] flex flex-col items-center"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-unit1-scope="Page8_Q2.jsx"] input:focus-visible,[data-unit1-scope="Page8_Q2.jsx"] textarea:focus-visible,[data-unit1-scope="Page8_Q2.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
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
          sectionLetter="B"
          title={<>Write the missing letters to complete the expression.</>}
          subTitle="Use the picture, definition, chart, or grammar clue, then complete each answer before checking."
        />

        <div className="space-y-10 text-[22px]">
          {/* 1 */}
          <div
            className="flex"
            onClick={(event) => {
              if (!event.target.closest("input, button, [role=button]"))
                audio.play("expression-1", clip0);
            }}
            style={{
              borderRadius: 6,
              boxShadow:
                audio.activeId === "expression-1"
                  ? "0 0 0 3px #2563eb"
                  : undefined,
              backgroundColor:
                audio.activeId === "expression-1" ? "#dbeafe" : undefined,
            }}
          >
            <b className="w-10">
              <AudioText
                audio={audio}
                id="expression-1"
                src={clip0}
                label="Hear expression 1"
              >
                1
              </AudioText>
            </b>

            <div className="flex ">
              {input(0)}
              <span>h-o</span>
              {input(1)}!
            </div>
          </div>

          {/* 2 */}
          <div
            className="flex"
            onClick={(event) => {
              if (!event.target.closest("input, button, [role=button]"))
                audio.play("expression-2", clip3);
            }}
            style={{
              borderRadius: 6,
              boxShadow:
                audio.activeId === "expression-2"
                  ? "0 0 0 3px #2563eb"
                  : undefined,
              backgroundColor:
                audio.activeId === "expression-2" ? "#dbeafe" : undefined,
            }}
          >
            <b className="w-10">
              <AudioText
                audio={audio}
                id="expression-2"
                src={clip3}
                label="Hear expression 2"
              >
                2
              </AudioText>
            </b>

            <div className="flex gap-8">
              <span>o{input(2)}</span>
              <span>
                o{input(3)}
                {input(4)}
              </span>
              <span>
                s{input(5)}
                {input(6)}
                {input(7)}
              </span>
            </div>
          </div>

          {/* 3 */}
          <div
            className="flex"
            onClick={(event) => {
              if (!event.target.closest("input, button, [role=button]"))
                audio.play("expression-3", clip1);
            }}
            style={{
              borderRadius: 6,
              boxShadow:
                audio.activeId === "expression-3"
                  ? "0 0 0 3px #2563eb"
                  : undefined,
              backgroundColor:
                audio.activeId === "expression-3" ? "#dbeafe" : undefined,
            }}
          >
            <b className="w-10">
              <AudioText
                audio={audio}
                id="expression-3"
                src={clip1}
                label="Hear expression 3"
              >
                3
              </AudioText>
            </b>

            <div className="flex gap-8">
              <span>
                {input(8)}el{input(9)}
              </span>
              <span>
                {input(10)}s{input(11)}
                {input(12)}
                {input(13)}p
              </span>
            </div>
          </div>

          {/* 4 */}
          <div
            className="flex"
            onClick={(event) => {
              if (!event.target.closest("input, button, [role=button]"))
                audio.play("expression-4", clip4);
            }}
            style={{
              borderRadius: 6,
              boxShadow:
                audio.activeId === "expression-4"
                  ? "0 0 0 3px #2563eb"
                  : undefined,
              backgroundColor:
                audio.activeId === "expression-4" ? "#dbeafe" : undefined,
            }}
          >
            <b className="w-10">
              <AudioText
                audio={audio}
                id="expression-4"
                src={clip4}
                label="Hear expression 4"
              >
                4
              </AudioText>
            </b>

            <div className="flex gap-8">
              <span>
                H{input(14)}
                {input(15)}
              </span>
              <span>
                {input(16)}
                {input(17)}
                {input(18)}
              </span>
              <span>
                {input(19)}
                {input(20)}
                {input(21)}
              </span>
              <span>
                k{input(22)}
                {input(23)}
                {input(24)}?
              </span>
            </div>
          </div>

          {/* 5 */}
          <div
            className="flex"
            onClick={(event) => {
              if (!event.target.closest("input, button, [role=button]"))
                audio.play("expression-5", clip2);
            }}
            style={{
              borderRadius: 6,
              boxShadow:
                audio.activeId === "expression-5"
                  ? "0 0 0 3px #2563eb"
                  : undefined,
              backgroundColor:
                audio.activeId === "expression-5" ? "#dbeafe" : undefined,
            }}
          >
            <b className="w-10">
              <AudioText
                audio={audio}
                id="expression-5"
                src={clip2}
                label="Hear expression 5"
              >
                5
              </AudioText>
            </b>

            <div className="flex gap-8">
              <span>
                r{input(25)}
                {input(26)}
                {input(27)}
                {input(28)}
              </span>
              <span>
                a{input(29)}
                {input(30)}
                {input(31)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="action-buttons-container">
        <button
          type="button"
          {...activationKeys}
          aria-label="Start Again"
          ref={resetButtonRef}
          className="try-again-button"
          onClick={reset}
        >
          Start Again ↻
        </button>
        <button
          type="button"
          {...activationKeys}
          aria-label="Show Answer"
          className="show-answer-btn swal-continue"
          onClick={showAnswers}
        >
          Show Answer
        </button>
        <button
          type="button"
          {...activationKeys}
          aria-label="Check Answer"
          className="check-button2"
          onClick={checkAnswers}
          disabled={locked}
          style={{ cursor: locked ? "not-allowed" : "pointer" }}
        >
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Page8_Q2;
