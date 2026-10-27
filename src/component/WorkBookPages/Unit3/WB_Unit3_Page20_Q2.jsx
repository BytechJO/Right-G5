import soundK6 from "../../../assets/audio/Workbook/Unit 3/Page 20 - K/Item_006_She.mp3";
import soundK5 from "../../../assets/audio/Workbook/Unit 3/Page 20 - K/Item_005_They.mp3";
import soundK4 from "../../../assets/audio/Workbook/Unit 3/Page 20 - K/Item_004_salty.mp3";
import soundK3 from "../../../assets/audio/Workbook/Unit 3/Page 20 - K/Item_003_The_chips.mp3";
import soundK2 from "../../../assets/audio/Workbook/Unit 3/Page 20 - K/Item_002_nice.mp3";
import soundK1 from "../../../assets/audio/Workbook/Unit 3/Page 20 - K/Item_001_The_song.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
} from "../../StudentPages/unit5/ExerciseAudioText";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U3/Page 20/SVG/Asset 8.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U3/Page 20/SVG/Asset 9.svg";
import img3 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U3/Page 20/SVG/Asset 11.svg";
import img4 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U3/Page 20/SVG/Asset 16.svg";
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
const WB_Unit3_Page20_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");
  const answers = [
    ["sounds"],
    ["are"],
    ["were in", "the park"],
    ["looks", "tired"],
  ];
  const [studentAnswers, setStudentAnswers] = useState([
    [""],
    [""],
    ["", ""],
    ["", ""],
  ]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);
  const normalize = normalizeAnswer;
  const handleChange = (qIndex, inputIndex, value) => {
    if (locked || result[qIndex]?.overall === true) return;
    const updated = studentAnswers.map((row) => [...row]);
    updated[qIndex][inputIndex] = value;
    setStudentAnswers(updated);
    setResult((prev) => {
      const copy = [...prev];
      copy[qIndex] = undefined;
      return copy;
    });
  };
  const checkAnswers = () => {
    if (locked) return;
    audio.stop();
    const hasEmpty = studentAnswers.some((row) => row.some((a) => !a.trim()));
    if (hasEmpty) {
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
    const newResults = studentAnswers.map((row, i) => {
      const expected = answers[i];
      const line1Ok = normalize(row[0]) === normalize(expected[0]);
      const line2Ok = expected[1]
        ? normalize(row[1]) === normalize(expected[1])
        : true;
      const ok = line1Ok && line2Ok;
      if (ok) correctCount++;
      return {
        overall: ok,
        line1Wrong: !line1Ok,
        line2Wrong: expected[1] ? !line2Ok : false,
      };
    });
    setResult(newResults);
    const total = answers.length;
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
    setAnnouncement("Model answers shown and locked.");
    resetButtonRef.current?.focus({
      preventScroll: true,
    });
    setStudentAnswers(answers);
    setResult(
      answers.map(() => ({
        overall: true,
        line1Wrong: false,
        line2Wrong: false,
      })),
    );
    setLocked(true);
  };
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setStudentAnswers([[""], [""], ["", ""], ["", ""]]);
    setResult([]);
    setLocked(false);
  };
  const inputField = (qIndex, inputIndex, width = "120px") => (
    <div className="relative inline-block">
      <input
        aria-invalid={
          !!(inputIndex === 0
            ? result[qIndex]?.line1Wrong
            : result[qIndex]?.line2Wrong)
        }
        placeholder={"Word"}
        title={`Sentence ${qIndex + 1}, blank ${inputIndex + 1}: ${["The song ___ nice.", "The chips ___ salty.", "They ___ ___.", "She ___ ___."][qIndex]}`}
        aria-label={`Sentence ${qIndex + 1}, blank ${inputIndex + 1}: ${["The song ___ nice.", "The chips ___ salty.", "They ___ ___.", "She ___ ___."][qIndex]}`}
        {...fieldKeys}
        type="text"
        value={studentAnswers[qIndex][inputIndex]}
        disabled={locked || result[qIndex]?.overall === true}
        onChange={(e) => handleChange(qIndex, inputIndex, e.target.value)}
        className={`
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6D2980]
          font-semibold
          px-1

          ${(inputIndex === 0 && result[qIndex]?.line1Wrong) || (inputIndex === 1 && result[qIndex]?.line2Wrong) ? "border-[#D1232A]" : "border-black"}
        `}
        style={{
          width,
          borderBottomColor:
            result[qIndex] === true || result[qIndex]?.overall === true
              ? "#16a34a"
              : undefined,
        }}
      />

      {((inputIndex === 0 && result[qIndex]?.line1Wrong) ||
        (inputIndex === 1 && result[qIndex]?.line2Wrong)) && (
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
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
          }}
        >
          ✕
        </span>
      )}
    </div>
  );
  return (
    <div
      data-exercise-scope={"WB_Unit3_Page20_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit3_Page20_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit3_Page20_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit3_Page20_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[18px] mb-10">
        {/* TITLE */}
        <ExerciseHeader
          isWorkbook
          sectionLetter="K"
          title={<>Look and write. Use linking verbs.</>}
          subTitle="Look at what the subject seems, looks, feels, sounds, or tastes like, then choose the linking verb that connects it to the description."
        />

        {/* TOP ROW */}
        <div className="grid grid-cols-2 gap-x-20 gap-y-14">
          {/* Q1 */}
          <div>
            <img
              src={img1}
              alt={
                "A girl holding a microphone and singing, with musical notes beside her."
              }
              style={{
                width: "220px",
                height: "auto",
                objectFit: "contain",
                marginBottom: "20px",
              }}
            />

            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-bold">1</span>

              <span>
                <AudioText
                  audio={audio}
                  id={"fragment-0"}
                  src={soundK1}
                  label={"Hear The song"}
                >
                  The song
                </AudioText>
              </span>

              {inputField(0, 0, "130px")}

              <span>
                <AudioText
                  audio={audio}
                  id={"fragment-1"}
                  src={soundK2}
                  label={"Hear nice."}
                >
                  nice.
                </AudioText>
              </span>
            </div>
          </div>

          {/* Q2 */}
          <div>
            <img
              src={img2}
              alt={"A yellow packet labeled Chips."}
              style={{
                width: "220px",
                height: "auto",
                objectFit: "contain",
                marginBottom: "20px",
              }}
            />
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-bold">2</span>

              <span>
                <AudioText
                  audio={audio}
                  id={"fragment-2"}
                  src={soundK3}
                  label={"Hear The chips"}
                >
                  The chips
                </AudioText>
              </span>

              {inputField(1, 0, "90px")}

              <span>
                <AudioText
                  audio={audio}
                  id={"fragment-3"}
                  src={soundK4}
                  label={"Hear salty."}
                >
                  salty.
                </AudioText>
              </span>
            </div>
          </div>

          {/* Q3 */}
          <div>
            <img
              src={img4}
              alt={
                "Two adults and a child sitting on a picnic blanket with a basket, fruit and drinks."
              }
              style={{
                width: "220px",
                height: "auto",
                objectFit: "contain",
                marginBottom: "20px",
              }}
            />

            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-bold">3</span>

              <span>
                <AudioText
                  audio={audio}
                  id={"fragment-4"}
                  src={soundK5}
                  label={"Hear They"}
                >
                  They
                </AudioText>
              </span>

              {inputField(2, 0, "120px")}

              {inputField(2, 1, "120px")}

              <span>.</span>
            </div>
          </div>

          {/* Q4 */}
          <div>
            <img
              src={img3}
              alt={
                "A woman resting in an armchair with her eyes closed and her head supported by one hand."
              }
              style={{
                width: "220px",
                height: "auto",
                objectFit: "contain",
                marginBottom: "20px",
              }}
            />

            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-bold">4</span>

              <span>
                <AudioText
                  audio={audio}
                  id={"fragment-5"}
                  src={soundK6}
                  label={"Hear She"}
                >
                  She
                </AudioText>
              </span>

              {inputField(3, 0, "120px")}

              {inputField(3, 1, "120px")}

              <span>.</span>
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
          onPointerDown={(e) => {
            if (locked) e.preventDefault();
          }}
          style={{
            cursor: locked ? "not-allowed" : "pointer",
          }}
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
export default WB_Unit3_Page20_Q2;
