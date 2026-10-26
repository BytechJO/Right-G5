import clip0 from "../../../assets/audio/ClassBook/U9/Page 81 - D/Item_001_If_someone_invents_a_tire_that_won't_go_flat,.mp3";
import clip1 from "../../../assets/audio/ClassBook/U9/Page 81 - D/Item_002_they_might_win_the_game.mp3";
import clip2 from "../../../assets/audio/ClassBook/U9/Page 81 - D/Item_003_If_William_knows_how_to_build_a_tree_house,.mp3";
import clip3 from "../../../assets/audio/ClassBook/U9/Page 81 - D/Item_004_everyone_will_probably_buy_it.mp3";
import clip4 from "../../../assets/audio/ClassBook/U9/Page 81 - D/Item_005_When_Bryan_gets_his_pilot's_license,.mp3";
import clip5 from "../../../assets/audio/ClassBook/U9/Page 81 - D/Item_006_he_will_fly_us_to_Toledo.mp3";
import clip6 from "../../../assets/audio/ClassBook/U9/Page 81 - D/Item_007_If_that_team_plays_just_a_little_harder,.mp3";
import clip7 from "../../../assets/audio/ClassBook/U9/Page 81 - D/Item_008_he_can_build_one_this_summer.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import { AudioText, AudioFeedback } from "../unit5/ExerciseAudioText";
import { SentenceGroup } from "../unit5/SentenceAudio";
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

const Unit9_Page6_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const matchingAnswers = ["b", "d", "c", "a"];

  const sentenceAnswers = [
    "If someone invents a tire that won’t go flat, everyone will probably buy it.",
    "If William knows how to build a tree house, he can build one this summer.",
    "When Bryan gets his pilot’s license, he will fly us to Toledo.",
    "If that team plays just a little harder, they might win the game.",
  ];

  const [matchingInputs, setMatchingInputs] = useState(["", "", "", ""]);

  const [sentenceInputs, setSentenceInputs] = useState(["", "", "", ""]);

  const [matchingResult, setMatchingResult] = useState([]);

  const [sentenceResult, setSentenceResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  const handleMatchingChange = (i, value) => {
    if (locked || matchingResult[i] === true) return;

    const updated = [...matchingInputs];

    updated[i] = value;

    setMatchingInputs(updated);

    setMatchingResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const handleSentenceChange = (i, value) => {
    if (locked || sentenceResult[i] === true) return;

    const updated = [...sentenceInputs];

    updated[i] = value;

    setSentenceInputs(updated);

    setSentenceResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;
    audio.stop();

    const hasEmptyMatching = matchingInputs.some((a) => !a.trim());

    const hasEmptySentences = sentenceInputs.some((a) => !a.trim());

    if (hasEmptyMatching || hasEmptySentences) {
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

    const newMatchingResults = matchingInputs.map((a, i) => {
      const ok = normalize(a) === normalize(matchingAnswers[i]);

      if (ok) correctCount++;

      return ok;
    });

    const newSentenceResults = sentenceInputs.map((a, i) => {
      const ok = normalize(a) === normalize(sentenceAnswers[i]);

      if (ok) correctCount++;

      return ok;
    });

    setMatchingResult(newMatchingResults);

    setSentenceResult(newSentenceResults);

    const total = matchingAnswers.length + sentenceAnswers.length;

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

  const showAnswers = () => {
    audio.stop();
    setAnnouncement("Model answers shown and locked.");
    resetButtonRef.current?.focus({ preventScroll: true });
    setMatchingInputs(["b", "d", "c", "a"]);

    setSentenceInputs([
      "If someone invents a tire that won’t go flat, everyone will probably buy it.",
      "If William knows how to build a tree house, he can build one this summer.",
      "When Bryan gets his pilot’s license, he will fly us to Toledo.",
      "If that team plays just a little harder, they will win the game.",
    ]);

    setMatchingResult([true, true, true, true]);

    setSentenceResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setMatchingInputs(["", "", "", ""]);

    setSentenceInputs(["", "", "", ""]);

    setMatchingResult([]);

    setSentenceResult([]);

    setLocked(false);
  };

  const matchingInput = (i) => (
    <span className="relative inline-block">
      <input
        style={{
          ...(matchingResult[i] === true
            ? { borderBottomColor: "#16a34a" }
            : {}),
        }}
        aria-invalid={!!(matchingResult[i] === false)}
        title={`Item ${i + 1}, matching sentence-ending letter a to d`}
        aria-label={`Item ${i + 1}, matching sentence-ending letter a to d`}
        {...fieldKeys}
        type="text"
        maxLength={1}
        value={matchingInputs[i]}
        disabled={locked || matchingResult[i] === true}
        onChange={(e) => handleMatchingChange(i, e.target.value)}
        className={`
          w-[55px]
          border-0
          border-b
          outline-none
          bg-transparent
          text-center
          text-[18px]
          text-[#6D2980]
          font-semibold

          ${matchingResult[i] === false ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {matchingResult[i] === false && (
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
    </span>
  );

  const sentenceInput = (i, width) => (
    <span className="relative inline-block">
      <input
        style={{
          ...(sentenceResult[i] === true
            ? { borderBottomColor: "#16a34a" }
            : {}),
        }}
        aria-invalid={!!(sentenceResult[i] === false)}
        title={`Item ${i + 1}, write the complete matched sentence`}
        aria-label={`Item ${i + 1}, write the complete matched sentence`}
        {...fieldKeys}
        type="text"
        value={sentenceInputs[i]}
        disabled={locked || sentenceResult[i] === true}
        onChange={(e) => handleSentenceChange(i, e.target.value)}
        className={`
          ${width}
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6D2980]
          font-semibold
          px-1

          ${sentenceResult[i] === false ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {sentenceResult[i] === false && (
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
    </span>
  );

  return (
    <div
      data-exercise-scope={"Unit9_Page6_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit9_Page6_Q1.jsx"] input:focus-visible,[data-exercise-scope="Unit9_Page6_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="Unit9_Page6_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall mb-10" style={{ gap: "30px" }}>
        {/* TITLE */}
        <ExerciseHeader
          sectionLetter="D"
          title={
            <>
              Match the two sentence parts, and then write the whole sentence
              below.
            </>
          }
          subTitle={
            <>
              Task 1: Match each sentence beginning with the ending that makes a
              complete idea. <br />
              Task 2: Then write the complete matched sentence on the line
              below.
            </>
          }
        />

        {/* MATCHING */}
        <div className="flex justify-between mb-10">
          {/* LEFT */}
          <div className="flex flex-col gap-8">
            <SentenceGroup
              label={"Hear sentence beginning 1"}
              src={clip0}
              id={"beginning-0"}
              audio={audio}
              className="flex items-start gap-4"
            >
              {matchingInput(0)}

              <div className="flex gap-4">
                <span className="font-bold text-[18px]">1</span>

                <span className="text-[18px] leading-normal ">
                  If someone invents a tire that won’t go flat,
                </span>
              </div>
            </SentenceGroup>

            <SentenceGroup
              label={"Hear sentence beginning 2"}
              src={clip2}
              id={"beginning-1"}
              audio={audio}
              className="flex items-start gap-4"
            >
              {matchingInput(1)}

              <div className="flex gap-4">
                <span className="font-bold text-[18px]">2</span>

                <span className="text-[18px] leading-normal">
                  If William knows how to build a tree house,
                </span>
              </div>
            </SentenceGroup>

            <SentenceGroup
              label={"Hear sentence beginning 3"}
              src={clip4}
              id={"beginning-2"}
              audio={audio}
              className="flex items-start gap-4"
            >
              {matchingInput(2)}

              <div className="flex gap-4">
                <span className="font-bold text-[18px]">3</span>

                <span className="text-[18px] leading-normal">
                  When Bryan gets his pilot’s license,
                </span>
              </div>
            </SentenceGroup>

            <SentenceGroup
              label={"Hear sentence beginning 4"}
              src={clip6}
              id={"beginning-3"}
              audio={audio}
              className="flex items-start gap-4"
            >
              {matchingInput(3)}

              <div className="flex gap-4">
                <span className="font-bold text-[18px]">4</span>

                <span className="text-[18px] leading-normal">
                  If that team plays just a little harder,
                </span>
              </div>
            </SentenceGroup>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-8 mr-[60px]">
            <div className="flex gap-4">
              <span className="font-bold text-[18px]">a</span>

              <span className="text-[18px]">
                <AudioText
                  audio={audio}
                  id="ending-0"
                  src={clip1}
                  label="Hear ending a: they might win the game."
                >
                  they might win the game.
                </AudioText>
              </span>
            </div>

            <div className="flex gap-4">
              <span className="font-bold text-[18px]">b</span>

              <span className="text-[18px]">
                <AudioText
                  audio={audio}
                  id="ending-1"
                  src={clip3}
                  label="Hear ending b: everyone will probably buy it."
                >
                  everyone will probably buy it.
                </AudioText>
              </span>
            </div>

            <div className="flex gap-4">
              <span className="font-bold text-[18px]">c</span>

              <span className="text-[18px]">
                <AudioText
                  audio={audio}
                  id="ending-2"
                  src={clip5}
                  label="Hear ending c: he will fly us to Toledo."
                >
                  he will fly us to Toledo.
                </AudioText>
              </span>
            </div>

            <div className="flex gap-4">
              <span className="font-bold text-[18px]">d</span>

              <span className="text-[18px]">
                <AudioText
                  audio={audio}
                  id="ending-3"
                  src={clip7}
                  label="Hear ending d: he can build one this summer."
                >
                  he can build one this summer.
                </AudioText>
              </span>
            </div>
          </div>
        </div>

        {/* SENTENCES */}
        <div className="flex flex-col gap-8">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="font-bold text-[18px]">{i + 1}</span>

              {sentenceInput(i, "w-[780px]")}
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

export default Unit9_Page6_Q1;
