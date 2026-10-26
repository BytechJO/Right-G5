import clip0 from "../../../assets/audio/ClassBook/U6/Page 50 - B/Item_001_take_advantage_of.mp3";
import clip1 from "../../../assets/audio/ClassBook/U6/Page 50 - B/Item_002_half_price.mp3";
import clip2 from "../../../assets/audio/ClassBook/U6/Page 50 - B/Item_003_in_a_row.mp3";
import clip3 from "../../../assets/audio/ClassBook/U6/Page 50 - B/Item_004_made_it.mp3";
import clip4 from "../../../assets/audio/ClassBook/U6/Page 50 - B/Item_005_try_it_out.mp3";
import clip5 from "../../../assets/audio/ClassBook/U6/Page 50 - B/Item_006_We_should_the_discount._Let's_buy_five.mp3";
import clip6 from "../../../assets/audio/ClassBook/U6/Page 50 - B/Item_007_Yes,_at_,_they_would_only_be_fifty_cents_each.mp3";
import clip7 from "../../../assets/audio/ClassBook/U6/Page 50 - B/Item_008_Hooray!_I_!_I_got_three_baskets.mp3";
import clip8 from "../../../assets/audio/ClassBook/U6/Page 50 - B/Item_009_Good_job!_Now_can_I_I_want_to_see_if_I_can_win.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
  AudioSpeaker,
} from "../unit5/ExerciseAudioText";
import { SentenceGroup, SentencePart } from "../unit5/SentenceAudio";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import boxArrowRight from "../../../assets/imgs/pages/classbook/Right 5 Unit 6 Shall We Should We Folder/Page 50/Asset 2.svg";
import boxArrowleft from "../../../assets/imgs/pages/classbook/Right 5 Unit 6 Shall We Should We Folder/Page 50/Asset 3.svg";
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

const Unit6_Page5_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const words = [
    "take advantage of",
    "half price",
    "in a row",
    "made it",
    "try it out",
  ];

  const correctAnswers = [
    ["take advantage of"],
    ["half price"],
    ["made it", "made it!"],
    ["in a row"],
    ["try it out"],
  ];
  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);

  const normalize = normalizeAnswer;

  const handleChange = (i, val) => {
    if (locked || result[i] === true) return;

    const updated = [...answers];
    updated[i] = val;

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
        String("Please complete all fields.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Please complete all fields."));
      return;
    }

    let correctCount = 0;

    const newResults = answers.map((ans, i) => {
      const ok = correctAnswers[i].some(
        (correct) => normalize(correct) === normalize(ans),
      );

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

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
      correctAnswers[0][0],
      correctAnswers[1][0],
      correctAnswers[2][0],
      correctAnswers[3][0],
      correctAnswers[4][0],
    ]);

    setResult([true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", "", "", ""]);
    setResult([]);
    setLocked(false);
  };
  const input = (i, width = "w-[220px]") => (
    <span className="relative inline-block  mb-2.5">
      <input
        aria-invalid={!!(result[i] === false)}
        style={{
          ...(result[i] === true ? { borderBottomColor: "#16a34a" } : {}),
        }}
        title={`Conversation blank ${i + 1}, use the expressions in the box`}
        aria-label={`Conversation blank ${i + 1}, use the expressions in the box`}
        {...fieldKeys}
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        disabled={locked || result[i] === true}
        className={`border-b outline-none text-[#6D2980] font-bold bg-transparent
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
      data-exercise-scope={"Unit6_Page5_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit6_Page5_Q2.jsx"] input:focus-visible,[data-exercise-scope="Unit6_Page5_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Unit6_Page5_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
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
          sectionLetter="B"
          title={<>Read and complete the conversations.</>}
          subTitle="Read the whole sentence first, then choose the word that fits both the meaning and grammar before checking."
        />

        {/* WORD BANK */}
        <div className="flex justify-center">
          <div
            className="
              bg-[#E8DFF0]
              rounded-2xl
              px-8
              py-4
              flex
              gap-16
              text-[18px]
            "
          >
            {words.map((word, i) => (
              <AudioText
                label={`Hear ${word}`}
                src={
                  [
                    clip0,
                    clip1,
                    clip2,
                    clip3,
                    clip4,
                    clip5,
                    clip6,
                    clip7,
                    clip8,
                  ][i]
                }
                id={`bank-${i}`}
                audio={audio}
                key={i}
              >
                {word}
              </AudioText>
            ))}
          </div>
        </div>

        {/* CONVERSATIONS */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-8">
          {/* BOX 1 */}
          <div className="relative w-[420px] min-h-[170px]">
            <img
              src={boxArrowRight}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "fill",
              }}
            />

            <SentenceGroup
              label={"Hear conversation 1"}
              src={clip5}
              id={"conversation-0"}
              audio={audio}
              className="relative z-10 p-6"
            >
              <span className="absolute -left-8 top-3 font-bold text-[18px]">
                1
              </span>

              {/* BOX 1 */}
              <p className="text-[18px]">We should</p>

              {input(0, "w-[220px]")}

              <p className="text-[18px]">the discount. Let’s buy five.</p>
            </SentenceGroup>
          </div>

          {/* BOX 2 */}
          <div className="relative w-[420px] min-h-[170px]">
            <img
              src={boxArrowleft}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "fill",
              }}
            />

            <SentenceGroup
              label={"Hear conversation 2"}
              src={clip6}
              id={"conversation-1"}
              audio={audio}
              style={{
                position: "relative",
                zIndex: 10,
                paddingTop: "20px",
                paddingLeft: "50px",
              }}
            >
              <span className="absolute -left-5 top-3 font-bold text-[18px]">
                2
              </span>

              <p className="text-[18px]">Yes, at</p>

              {input(1, "w-[220px]")}

              <p className="text-[18px]">
                , they would only be fifty cents each.
              </p>
            </SentenceGroup>
          </div>

          {/* BOX 3 */}
          {/* BOX 3 */}
          <div className="relative w-[420px] min-h-[170px]">
            <img
              src={boxArrowRight}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "fill",
              }}
            />

            <SentenceGroup
              label={"Hear conversation 3"}
              src={clip7}
              id={"conversation-2"}
              audio={audio}
              style={{
                position: "relative",
                zIndex: 10,
                paddingTop: "10px",
                paddingLeft: "10px",
              }}
            >
              <span className="absolute -left-8 top-3 font-bold text-[18px]">
                3
              </span>

              <p className="text-[18px]">Hooray! I</p>

              {input(2, "w-[240px]")}

              <div style={{ fontSize: "18px" }}>
                {/* السطر الأول */}
                <div>
                  <span>! I got three baskets</span>
                </div>

                {/* السطر الثاني */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    marginTop: "5px",
                  }}
                >
                  {input(3, "w-[210px]")}

                  <span>.</span>
                </div>
              </div>
            </SentenceGroup>
          </div>
          {/* BOX 4 */}
          <div className="relative w-[420px] min-h-[170px]">
            <img
              src={boxArrowleft}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "fill",
              }}
            />

            <SentenceGroup
              label={"Hear conversation 4"}
              src={clip8}
              id={"conversation-3"}
              audio={audio}
              style={{
                position: "relative",
                zIndex: 10,
                paddingTop: "25px",
                paddingLeft: "50px",
              }}
            >
              <span className="absolute -left-5 top-3 font-bold text-[18px]">
                4
              </span>

              <p className="text-[18px]">Good job! Now can I</p>

              {input(4, "w-[220px]")}

              <p className="text-[18px]">? I want to see if I can win.</p>
            </SentenceGroup>
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

export default Unit6_Page5_Q2;
