import clip0 from "../../../assets/audio/ClassBook/U5/Page 44 - A/Item_001_Dad_prepared_a_barbecue_with_a_lot_of_meat.mp3";
import clip1 from "../../../assets/audio/ClassBook/U5/Page 44 - A/Item_002_Sharks_live_in_water_and_eat_fish.mp3";
import clip2 from "../../../assets/audio/ClassBook/U5/Page 44 - A/Item_003_The_entire_the_teacher_gave_us_was_very_challenging.mp3";
import clip3 from "../../../assets/audio/ClassBook/U5/Page 44 - A/Item_004_Tom_had_to_give_a_presentation_in_front_of_the_class.mp3";
import clip4 from "../../../assets/audio/ClassBook/U5/Page 44 - A/Item_005_Henry_wants_the_shish_kebab_for_German_chocolate_cake.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import { SentenceGroup } from "./SentenceAudio";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 44/Asset 16.svg";
import trueImg from "../../../assets/imgs/true.svg";
import flaseImg from "../../../assets/imgs/false.svg";
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
const Unit5_Page5_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);
  const correctAnswers = ["check", "check", "x", "check", "x"];
  const handleSelect = (i, val) => {
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
  const choiceBox = (i, val) => {
    const isWrongBox = result[i] === false && answers[i] === val;
    return (
      <button
        {...activationKeys}
        aria-pressed={answers[i] === val}
        aria-label={`Statement ${i + 1}, ${val === "check" ? "correct use" : "incorrect use"}`}
        data-choice={true}
        type="button"
        disabled={locked || result[i] === true}
        onClick={() => handleSelect(i, val)}
        style={{
          width: "45px",
          position: "relative",
          height: "45px",
          border: "2px solid #6D2980",
          borderRadius: "8px",
          color: "#6D2980",
          fontSize: "24px",
          fontWeight: "bold",
          cursor: locked || result[i] === true ? "default" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...(answers[i] === val
            ? {
                backgroundColor: "#dbeafe",
                ...(result[i] === true
                  ? {
                      borderColor: "#16a34a",
                    }
                  : result[i] === false
                    ? {
                        borderColor: "#ef4444",
                      }
                    : {}),
              }
            : {}),
        }}
      >
        {answers[i] === val && (
          <img
            src={val === "check" ? trueImg : flaseImg}
            alt=""
            style={{
              width: "24px",
              height: "24px",
              objectFit: "contain",
            }}
          />
        )}
        {isWrongBox && (
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
      </button>
    );
  };
  const answerBoxes = (i) => (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        gap: "8px",
        marginRight: "8px",
      }}
    >
      {choiceBox(i, "check", "✓")}
      {choiceBox(i, "x", "✕")}
    </span>
  );
  const checkAnswers = () => {
    if (locked) return;
    audio.stop();
    if (answers.some((a) => !a)) {
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
      const ok = a === correctAnswers[i];
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
    setAnnouncement("Model answers shown and locked.");
    setAnswers(correctAnswers);
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
  return (
    <div
      data-exercise-scope={"Unit5_Page5_Q1.jsx"}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit5_Page5_Q1.jsx"] input:focus-visible,[data-exercise-scope="Unit5_Page5_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="Unit5_Page5_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div
        className="div-forall"
        style={{
          gap: "30px",
        }}
      >
        <ExerciseHeader
          sectionLetter="A"
          title={
            <>
              Read and write <span className="text-[#D1232A]">✓</span> or{" "}
              <span className="text-[#D1232A]">✗</span>. Is the underlined word
              used correctly or incorrectly?
            </>
          }
          subTitle="Read or listen to each item carefully, then choose true or false only after checking the key detail."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 300px",
            gap: "30px",
            alignItems: "start",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              display: "flex",
              flexDirection: "column",
              gap: "35px",
            }}
          >
            <SentenceGroup
              label={"Hear statement 1"}
              src={clip0}
              id={"sentence-0"}
              audio={audio}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {answerBoxes(0)}
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                1
              </span>
              <span>
                Dad prepared a{" "}
                <span
                  style={{
                    textDecoration: "underline",
                  }}
                >
                  barbecue
                </span>{" "}
                with a lot of meat.
              </span>
            </SentenceGroup>

            <SentenceGroup
              label={"Hear statement 2"}
              src={clip1}
              id={"sentence-1"}
              audio={audio}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {answerBoxes(1)}
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                2
              </span>
              <span>
                <span
                  style={{
                    textDecoration: "underline",
                  }}
                >
                  Sharks
                </span>{" "}
                live in water and eat fish.
              </span>
            </SentenceGroup>

            <SentenceGroup
              label={"Hear statement 3"}
              src={clip2}
              id={"sentence-2"}
              audio={audio}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {answerBoxes(2)}
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                3
              </span>
              <span>
                The{" "}
                <span
                  style={{
                    textDecoration: "underline",
                  }}
                >
                  entire
                </span>{" "}
                the teacher gave us was very challenging.
              </span>
            </SentenceGroup>

            <SentenceGroup
              label={"Hear statement 4"}
              src={clip3}
              id={"sentence-3"}
              audio={audio}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {answerBoxes(3)}
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                4
              </span>
              <span>
                Tom had to give a{" "}
                <span
                  style={{
                    textDecoration: "underline",
                  }}
                >
                  presentation
                </span>{" "}
                in front of the class.
              </span>
            </SentenceGroup>

            <SentenceGroup
              label={"Hear statement 5"}
              src={clip4}
              id={"sentence-4"}
              audio={audio}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {answerBoxes(4)}
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                5
              </span>
              <span>
                Henry wants the{" "}
                <span
                  style={{
                    textDecoration: "underline",
                  }}
                >
                  shish kebab
                </span>{" "}
                for German chocolate cake.
              </span>
            </SentenceGroup>
          </div>

          <div>
            <img
              src={img1}
              alt={"A man and a boy beside a barbecue grill outdoors."}
              style={{
                width: "300px",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </div>

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
export default Unit5_Page5_Q1;
