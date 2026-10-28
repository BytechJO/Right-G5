import soundJ12 from "../../../assets/audio/Workbook/Unit 7/Page 43 - J/Item_012_Helen_and_her_friends_are_catching_grasshoppers.mp3";
import soundJ11 from "../../../assets/audio/Workbook/Unit 7/Page 43 - J/Item_011_true.mp3";
import soundJ10 from "../../../assets/audio/Workbook/Unit 7/Page 43 - J/Item_010_false.mp3";
import soundJ9 from "../../../assets/audio/Workbook/Unit 7/Page 43 - J/Item_009_The_wind_is_blowing_lightly.mp3";
import soundJ7 from "../../../assets/audio/Workbook/Unit 7/Page 43 - J/Item_007_sandwich._Tom_is_watching_the_grasshoppers_hop.mp3";
import soundJ6 from "../../../assets/audio/Workbook/Unit 7/Page 43 - J/Item_006_Stella_is_counting_the_flowers_that_are_blooming._Harley_is_eating_his.mp3";
import soundJ5 from "../../../assets/audio/Workbook/Unit 7/Page 43 - J/Item_005_Everyone_is_keeping_busy_with_something._Hansel_is_playing_tag_with_Sara.mp3";
import soundJ4 from "../../../assets/audio/Workbook/Unit 7/Page 43 - J/Item_004_arrived._There_are_many_fun_outdoor_games_and_activities_to_do.mp3";
import soundJ3 from "../../../assets/audio/Workbook/Unit 7/Page 43 - J/Item_003_The_wind_is_blowing_lightly._The_birds_are_chirping._They_were_waiting_f.mp3";
import soundJ2 from "../../../assets/audio/Workbook/Unit 7/Page 43 - J/Item_002_the_super_colors_of_spring._They_are_catching_butterflies_and_putting_th.mp3";
import soundJ1 from "../../../assets/audio/Workbook/Unit 7/Page 43 - J/Item_001_It_is_springtime._Helen_and_her_friends_are_playing_in_her_backyard._The.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
  AudioSpeaker,
} from "../../StudentPages/unit5/ExerciseAudioText";
import {
  SentenceGroup,
  SentencePart,
} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
// IMAGE
import springImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U7/Page 43/Asset 19.svg";
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

const WB_Unit7_Page43_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const questions = [
    {
      sentence: "The wind is blowing lightly.",

      correct: true,
    },

    {
      sentence: "Helen and her friends are catching grasshoppers.",

      correct: false,
    },

    {
      sentence: "Everyone is getting bored.",

      correct: false,
    },

    {
      sentence: "Stella is smelling the flowers.",

      correct: false,
    },

    {
      sentence: "Harley is eating a sandwich.",

      correct: true,
    },

    {
      sentence: "Tom is watching the football game.",

      correct: false,
    },
  ];

  const [selected, setSelected] = useState(Array(questions.length).fill(""));

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  // ------------------------
  // SELECT
  // ------------------------

  const handleSelect = (index, value) => {
    audio.play(
      `option-${index}-${value}`,
      value === "true" ? soundJ11 : soundJ10,
    );
    if (locked || result[index] === true) return;
    setAnnouncement(`Sentence ${index + 1}: ${value} selected.`);

    const updated = [...selected];

    updated[index] = value;

    setSelected(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[index] = undefined;

      return copy;
    });
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (locked) return;
    audio.stop();

    const hasEmpty = selected.some((s) => !s);

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

    const newResults = questions.map((q, i) => {
      const correctSymbol = q.correct ? "true" : "false";

      const ok = selected[i] === correctSymbol;

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

  // ------------------------
  // SHOW ANSWERS
  // ------------------------

  const showAnswers = () => {
    audio.stop();
    setAnnouncement("Model answers shown and locked.");
    resetButtonRef.current?.focus({ preventScroll: true });
    setSelected(questions.map((q) => (q.correct ? "true" : "false")));

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setSelected(Array(questions.length).fill(""));

    setResult([]);

    setLocked(false);
  };

  return (
    <div
      data-exercise-scope={"WB_Unit7_Page43_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit7_Page43_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit7_Page43_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit7_Page43_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <ExerciseHeader
          isWorkbook
          sectionLetter="J"
          title={
            <>
              Read and circle <span className="text-[#00AEEF]">true</span> or{" "}
              <span className="text-[#00AEEF]">false</span>.
            </>
          }
          subTitle="Check the picture or text evidence carefully, then choose the two-way answer only after confirming the key detail."
        />
        <div
          style={{
            border: "2px solid #8C3FAF",
            borderRadius: "10px",
            padding: "14px 16px",
            background: "#fff",
          }}
        >
          {/* الجزء العلوي الكامل */}

          <div
            style={{
              fontSize: "17px",
              lineHeight: "2.7",
              color: "#3d2b1f",
              textAlign: "left",
            }}
          >
            <SentencePart
              audio={audio}
              id="story-0"
              src={soundJ1}
              first={true}
              label="Hear story part 1"
            >
              It is springtime. Helen and her friends are playing in her
              backyard. They are enjoying the wonderful breeze and
            </SentencePart>{" "}
            <SentencePart
              audio={audio}
              id="story-1"
              src={soundJ2}
              first={true}
              label="Hear story part 2"
            >
              the super colors of spring. They are catching butterflies and
              putting them in glass jars that have openings for air.
            </SentencePart>{" "}
            <SentencePart
              audio={audio}
              id="story-2"
              src={soundJ3}
              first={true}
              label="Hear story part 3"
            >
              The wind is blowing lightly. The birds are chirping. They were
              waiting for spring all winter long. Finally, it has
            </SentencePart>{" "}
            <SentencePart
              audio={audio}
              id="story-3"
              src={soundJ4}
              first={true}
              label="Hear story part 4"
            >
              arrived. There are many fun outdoor games and activities to do.
            </SentencePart>
          </div>

          {/* الجزء السفلي */}

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "14px",
              marginTop: "4px",
            }}
          >
            {/* النص */}

            <div
              style={{
                flex: 1,
                fontSize: "18px",
                lineHeight: "2.7",
                color: "#3d2b1f",
                textAlign: "left",
              }}
            >
              <SentencePart
                audio={audio}
                id="story-4"
                src={soundJ5}
                first={true}
                label="Hear story part 5"
              >
                Everyone is keeping busy with something. Hansel is playing tag
                with Sarah.
              </SentencePart>{" "}
              <SentencePart
                audio={audio}
                id="story-5"
                src={soundJ6}
                first={true}
                label="Hear story part 6"
              >
                Stella is counting the flowers that are blooming. Harley is
                eating his
              </SentencePart>{" "}
              <SentencePart
                audio={audio}
                id="story-6"
                src={soundJ7}
                first={true}
                label="Hear story part 7"
              >
                sandwich. Tom is watching the grasshoppers hop.
              </SentencePart>
            </div>

            {/* الصورة */}

            <img
              src={springImg}
              alt={
                "Children outdoors among trees, flowers and butterflies; one child holds a butterfly net."
              }
              style={{
                width: "220px",
                height: "170px",
                objectFit: "contain",
                flexShrink: 0,
                marginTop: "4px",
              }}
            />
          </div>
        </div>
        {/* QUESTIONS */}

        <div className="flex flex-col gap-7 mt-8 mb-10">
          {questions.map((q, index) => (
            <div
              key={index}
              className="
          flex
          items-center
          justify-between
          gap-6
        "
            >
              {/* SENTENCE */}

              <SentenceGroup
                label={`Hear statement ${index + 1}: ${q.sentence}`}
                src={[soundJ9, soundJ12, null, null, null, null][index]}
                id={`sentence-${index}`}
                audio={audio}
                className="flex items-center gap-3 flex-1"
              >
                <span className="font-bold">{index + 1}</span>

                <span>{q.sentence}</span>
              </SentenceGroup>

              {/* OPTIONS */}

              <div className="flex items-center gap-10">
                {/* TRUE */}

                <button
                  aria-label={`Sentence ${index + 1}: true${result[index] === true ? ". Answer locked." : ""}`}
                  aria-pressed={selected[index] === "true"}
                  data-choice={true}
                  {...activationKeys}
                  type="button"
                  aria-disabled={locked || result[index] === true}
                  onClick={() => handleSelect(index, "true")}
                  className="relative"
                  style={{
                    borderRadius: "50%",
                    padding: "2px 8px",
                    background:
                      selected[index] === "true" ? "#dbeafe" : "transparent",
                    "--exercise-focus-radius": "50%",
                    boxShadow:
                      audio.activeId === `option-${index}-true`
                        ? "0 0 0 3px #2563eb"
                        : undefined,
                  }}
                >
                  <span
                    style={{
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    true
                  </span>

                  {selected[index] === "true" && (
                    <div
                      style={{
                        position: "absolute",
                        inset: "-6px",
                        border: "2px solid #6D2980",
                        borderRadius: "50%",
                        borderColor:
                          result[index] === true
                            ? "#16a34a"
                            : result[index] === false
                              ? "#D1232A"
                              : "#6D2980",
                      }}
                    />
                  )}

                  {result[index] === false &&
                    selected[index] === "true" &&
                    !questions[index].correct && (
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
                  {audio.activeId === `option-${index}-true` && (
                    <AudioSpeaker />
                  )}
                </button>

                {/* FALSE */}

                <button
                  aria-label={`Sentence ${index + 1}: false${result[index] === true ? ". Answer locked." : ""}`}
                  aria-pressed={selected[index] === "false"}
                  data-choice={true}
                  {...activationKeys}
                  type="button"
                  aria-disabled={locked || result[index] === true}
                  onClick={() => handleSelect(index, "false")}
                  className="relative"
                  style={{
                    borderRadius: "50%",
                    padding: "2px 8px",
                    background:
                      selected[index] === "false" ? "#dbeafe" : "transparent",
                    "--exercise-focus-radius": "50%",
                    boxShadow:
                      audio.activeId === `option-${index}-false`
                        ? "0 0 0 3px #2563eb"
                        : undefined,
                  }}
                >
                  <span
                    style={{
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    false
                  </span>

                  {selected[index] === "false" && (
                    <div
                      style={{
                        position: "absolute",
                        inset: "-6px",
                        border: "2px solid #6D2980",
                        borderRadius: "50%",
                        borderColor:
                          result[index] === true
                            ? "#16a34a"
                            : result[index] === false
                              ? "#D1232A"
                              : "#6D2980",
                      }}
                    />
                  )}

                  {result[index] === false &&
                    selected[index] === "false" &&
                    questions[index].correct && (
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
                  {audio.activeId === `option-${index}-false` && (
                    <AudioSpeaker />
                  )}
                </button>
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

export default WB_Unit7_Page43_Q1;
