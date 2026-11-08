import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import { SentenceGroup } from "./SentenceAudio";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
import img5 from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 24/SVG/Asset 7.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 24/SVG/Asset 8.svg";
import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 24/SVG/Asset 24.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 24/SVG/Asset 10.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 24/SVG/Asset 25.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 24/SVG/Asset 11.svg";

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

const GrammarB = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");

  const correct = [
    { inputs: ["tall"], select: "tall" }, // 1
    { inputs: ["is", "sad"], select: "sad" }, // 2
    { inputs: ["is", "dirty"], select: "dirty" }, // 3
    { inputs: ["are", "scary"], select: "scary" }, // 4
    { inputs: ["is"], select: "is" }, // 5
    { inputs: ["are"], select: "are" }, // 6
  ];

  const [answers, setAnswers] = useState([
    { inputs: [""], select: "" },
    { inputs: ["", ""], select: "" },
    { inputs: ["", ""], select: "" },
    { inputs: ["", ""], select: "" },
    { inputs: [""], select: "" },
    { inputs: [""], select: "" },
  ]);

  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  // ✍️ كتابة
  const handleInput = (q, i, val) => {
    if (locked || result[q]?.inputs?.[i] === true) return;
    setAnswers((previous) =>
      previous.map((answer, j) =>
        j === q
          ? {
              ...answer,
              inputs: answer.inputs.map((v, k) => (k === i ? val : v)),
            }
          : answer,
      ),
    );
    setResult((previous) => {
      const next = [...previous];
      next[q] = { ...next[q], inputs: [...(next[q]?.inputs || [])] };
      next[q].inputs[i] = undefined;
      return next;
    });
  };

  // 🎯 اختيار
  const handleSelect = (q, val) => {
    if (locked || result[q]?.select === true) return;
    setAnswers((previous) =>
      previous.map((answer, j) =>
        j === q ? { ...answer, select: val } : answer,
      ),
    );
    setResult((previous) => {
      const next = [...previous];
      next[q] = { ...next[q], select: undefined };
      return next;
    });
    setAnnouncement("Item " + (q + 1) + ": " + val + " selected.");
  };

  // ✅ CHECK
  const checkAnswers = () => {
    if (locked) return;

    audio.stop();

    if (locked) return;
    const hasEmpty = answers.some((q) => {
      const emptyInput = q.inputs.some((inp) => inp.trim() === "");
      const emptySelect = q.select === "";
      return emptyInput || emptySelect;
    });

    if (hasEmpty) {
      (setAnnouncement(
        String("Complete all answers.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info());
      return;
    }
    let totalScore = 0;
    let total = 0;
    let res = answers.map(() => ({
      inputs: [],
      select: null,
    }));
    answers.forEach((ans, i) => {
      const correctAns = correct[i];

      // inputs
      ans.inputs.forEach((val, idx) => {
        total++;

        if (normalizeAnswer(val) === normalizeAnswer(correctAns.inputs[idx])) {
          res[i].inputs[idx] = true;
          totalScore++;
        } else {
          res[i].inputs[idx] = false;
        }
      });

      // select
      total++;
      if (ans.select === correctAns.select) {
        res[i].select = true;
        totalScore++;
      } else {
        res[i].select = false;
      }
    });

    setResult(res);

    const msg = `
        Score: ${totalScore} / ${total}
    `;

    if (totalScore === total) {
      resetButtonRef.current?.focus({ preventScroll: true });
      setLocked(true);
      (setAnnouncement(
        String(msg)
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.success(msg));
    } else if (totalScore === 0) {
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
  const showAnswers = () => {
    audio.stop();
    setAnswers(
      correct.map((answer) => ({ ...answer, inputs: [...answer.inputs] })),
    );
    setResult(
      correct.map((answer) => ({
        inputs: answer.inputs.map(() => true),
        select: true,
      })),
    );
    setLocked(true);
    setAnnouncement("All correct words and selections shown and locked.");
  };

  // 🔄 RESET
  const reset = () => {
    audio.stop();
    setAnnouncement("Answers, feedback and locks cleared.");

    setAnswers([
      { inputs: [""], select: "" },
      { inputs: ["", ""], select: "" },
      { inputs: ["", ""], select: "" },
      { inputs: ["", ""], select: "" },
      { inputs: [""], select: "" },
      { inputs: [""], select: "" },
    ]);
    setResult([]);
    setLocked(false);
  };

  // UI helpers
  const input = (q, i) => (
    <span className="u3gb-field">
      <input placeholder={"Word"}
        style={{
          borderBottomColor:
            locked || result[q]?.inputs?.[i] === true
              ? "#16a34a"
              : result[q]?.inputs?.[i] === false
                ? "#ef4444"
                : undefined,
        }}
        {...fieldKeys}
        aria-invalid={result[q]?.inputs?.[i] === false}
        title={`Item ${q + 1}, blank ${i + 1}: complete the sentence about ${["the man", "the girl", "the boy", "the lions", "the announcer", "the mechanics"][q]}`}
        aria-label={`Item ${q + 1}, blank ${i + 1}: complete the sentence about ${["the man", "the girl", "the boy", "the lions", "the announcer", "the mechanics"][q]}`}
        value={answers[q].inputs[i]}
        disabled={locked || result[q]?.inputs?.[i] === true}
        onChange={(e) => handleInput(q, i, e.target.value)}
        className={`u3gb-input ${q === 0 ? "u3gb-input-wide" : ""}`}
      />
      {result[q]?.inputs?.[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
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
  const option = (q, text) => {
    const isSelected = answers[q].select === text;
    const isWrong = result[q]?.select === false && isSelected;
    return (
      <div
        {...activationKeys}
        aria-disabled={locked || result[q]?.select === true}
        aria-pressed={isSelected}
        aria-label={`Item ${q + 1}, choose ${text}`}
        data-choice={true}
        tabIndex={0}
        role={"button"}
        onClick={() => {
          if (locked || result[q]?.select === true) return;
          handleSelect(q, text);
        }}
        className="u3gb-option relative cursor-pointer rounded-full transition"
        style={{
          border: isWrong
            ? "2px solid red"
            : isSelected
              ? "2px solid #6D2980"
              : "2px solid transparent",
          color: "#00AEEF",
          fontWeight: isSelected ? "bold" : "normal",
          opacity: result[q] === true ? 0.6 : 1, // شكل disabled
          cursor: result[q] === true ? "not-allowed" : "pointer",
          borderColor:
            isSelected && (locked || result[q]?.select === true)
              ? "#16a34a"
              : isWrong
                ? "red"
                : isSelected
                  ? "#6D2980"
                  : "transparent",
        }}
      >
        {text}

        {isWrong && (
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
            ✕
          </span>
        )}
      </div>
    );
  };
  return (
    <div className="u3gb-root" data-exercise-scope="Unit3_Page3_GrammarB.jsx">
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit3_Page3_GrammarB.jsx"] input:focus-visible,[data-exercise-scope="Unit3_Page3_GrammarB.jsx"] textarea:focus-visible,[data-exercise-scope="Unit3_Page3_GrammarB.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}
.u3gb-root { width:100%; max-width:1000px; min-width:0; margin-inline:auto; box-sizing:border-box; container-type:inline-size; container-name:unit3-grammar-b; }
.u3gb-root 
.u3gb-grid { box-sizing:border-box; padding-inline-start:32px; font-family:Arial,Helvetica,sans-serif; color:#000; display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); column-gap:clamp(12px,2cqi,24px); row-gap:clamp(4px,.6cqi,8px); margin-top:0; font-size:clamp(12px,2.2cqi,18px); line-height:1.3; }
.u3gb-item { display:grid; grid-template-columns:minmax(0,1fr) max-content clamp(44px,8cqi,72px); align-items:center; column-gap:clamp(4px,.8cqi,10px); min-width:0; }
.u3gb-prompt { display:flex; align-items:baseline; gap:2px; min-width:0; white-space:nowrap; }
.u3gb-prompt > span:not(.u3gb-field) { flex:0 0 auto; }
.u3gb-prompt .font-bold { display:inline-block; margin-right:10px; }
.u3gb-field { position:relative; display:inline-flex; flex:0 0 auto; align-items:baseline; margin-inline:2px; }
.u3gb-root .u3gb-input { box-sizing:border-box; width:clamp(30px,6.6cqi,64px); min-width:0; height:1.3em; padding:0; border:0; border-bottom:1px solid black; border-radius:0; outline:none; background:transparent; color:#6D2980; font:inherit; font-weight:bold; text-align:center; }
.u3gb-root .u3gb-input-wide { width:clamp(56px,11cqi,108px); }
.u3gb-root 
.u3gb-options { display:flex; flex-direction:column; align-items:flex-start; justify-content:center; gap:0; min-width:0; }
.u3gb-root .u3gb-option { box-sizing:border-box; padding:0 2px; text-align:left; line-height:1.15; white-space:nowrap; }
.u3gb-image { display:block; width:100%; height:clamp(42px,8cqi,72px); object-fit:contain; justify-self:center; }
@container unit3-grammar-b (max-width:520px) {
 .u3gb-root 
 .u3gb-grid { padding-inline-start:0; grid-template-columns:minmax(0,1fr); row-gap:12px; font-size:clamp(14px,4cqi,18px); }
 .u3gb-item { grid-template-columns:minmax(0,1fr) max-content clamp(48px,16cqi,68px); column-gap:6px; }
 .u3gb-prompt .font-bold { margin-right:8px; }
 .u3gb-root .u3gb-input { width:clamp(30px,10cqi,52px); }
 .u3gb-root .u3gb-input-wide { width:clamp(52px,17cqi,90px); }
 .u3gb-image { height:64px; }
 .u3gb-root .u3gb-option { padding:2px 4px; min-height:28px; }
}

@container unit3-grammar-b (max-width:300px) {
 .u3gb-actions { flex-wrap:wrap; gap:12px; }
 .u3gb-actions > .group:last-child > span { left:auto; right:0; transform:none; }
 .u3gb-item { grid-template-columns:minmax(0,1fr) 52px; row-gap:4px; }
 .u3gb-prompt { grid-column:1; flex-wrap:wrap; line-height:1.6; }
 .u3gb-options { grid-column:1; flex-direction:row; flex-wrap:wrap; gap:8px; }
 .u3gb-image { grid-column:2; grid-row:1 / span 2; }
}
`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>

      <h5 className="header-title-page8-read mb-5">
        <span className="ex-A-read mr-2">B</span>
        Look, read, choose, and write.
      </h5>

      <div className="u3gb-grid">
        {/* 1 */}
        <div className="u3gb-item">
          <div className="u3gb-prompt">
            <span>
              {" "}
              <span className="font-bold mr-1">1</span> The man is
            </span>
            {input(0, 0)}
          </div>

          <div className="u3gb-options">
            {option(0, "tall")}
            {option(0, "short")}
          </div>

          <img
            alt={"A man and a boy standing beside each other."}
            className="u3gb-image"
            src={img1}
          />
        </div>

        {/* 2 */}
        <div className="u3gb-item">
          <div className="u3gb-prompt">
            <span>
              {" "}
              <span className="font-bold mr-1">2</span> She
            </span>
            {input(1, 0)}
            {input(1, 1)}
          </div>

          <div className="u3gb-options">
            {option(1, "sad")}
            {option(1, "happy")}
          </div>

          <img
            alt={"A smiling girl with two ponytails."}
            className="u3gb-image"
            src={img2}
          />
        </div>

        {/* 3 */}
        <div className="u3gb-item">
          <div className="u3gb-prompt">
            <span>
              {" "}
              <span className="font-bold mr-1">3</span> The boy
            </span>
            {input(2, 0)}
            {input(2, 1)}
          </div>

          <div className="u3gb-options">
            {option(2, "clean")}
            {option(2, "dirty")}
          </div>

          <img
            alt={"A boy wearing a shirt with dirty marks."}
            className="u3gb-image"
            src={img3}
          />
        </div>

        {/* 4 */}
        <div className="u3gb-item">
          <div className="u3gb-prompt">
            <span>
              {" "}
              <span className="font-bold mr-1">4</span> The lions
            </span>
            {input(3, 0)}
            {input(3, 1)}
          </div>

          <div className="u3gb-options">
            {option(3, "sleepy")}
            {option(3, "scary")}
          </div>

          <img
            alt={"Two lions with open mouths."}
            className="u3gb-image"
            src={img4}
          />
        </div>

        {/* 5 */}
        <div className="u3gb-item">
          <div className="u3gb-prompt">
            <span>
              {" "}
              <span className="font-bold mr-1">5</span> He
            </span>
            {input(4, 0)}
            <span>an announcer</span>
          </div>

          <div className="u3gb-options">
            {option(4, "is")}
            {option(4, "are")}
          </div>

          <img
            alt={"A presenter on a television screen."}
            className="u3gb-image"
            src={img5}
          />
        </div>

        {/* 6 */}
        <div className="u3gb-item">
          <div className="u3gb-prompt">
            <span>
              {" "}
              <span className="font-bold mr-1">6</span> They
            </span>
            {input(5, 0)}
            <span>mechanics</span>
          </div>

          <div className="u3gb-options">
            {option(5, "is")}
            {option(5, "are")}
          </div>

          <img
            alt={"Three mechanics holding tools."}
            className="u3gb-image"
            src={img6}
          />
        </div>
      </div>
      <div className="u3gb-actions flex justify-center gap-6 mt-8">
        {/* Reset */}
        <div className="relative group">
          <button
            type="button"
            {...activationKeys}
            aria-label="Start Again"
            ref={resetButtonRef}
            onClick={reset}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaRedo size={14} />
            </div>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Reset
          </span>
        </div>

        {/* Show */}
        <div className="relative group">
          <button
            type="button"
            {...activationKeys}
            aria-label="Show Answer"
            onClick={showAnswers}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaEye size={14} />
            </div>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Show Answer
          </span>
        </div>

        {/* Check */}
        <div className="relative group">
          <button
            type="button"
            {...activationKeys}
            aria-label="Check Answer"
            disabled={locked}
            style={{ cursor: locked ? "not-allowed" : "pointer" }}
            onClick={checkAnswers}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaCheck size={14} />
            </div>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Check Answer
          </span>
        </div>
      </div>
    </div>
  );
};

export default GrammarB;
