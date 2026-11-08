import { SentenceGroup } from "../unit2/SentenceAudio";
import clip0 from "../../../assets/audio/ClassBook/U2/Page 19 - E/Item_001_I_found_a_small_bird.mp3";
import clip1 from "../../../assets/audio/ClassBook/U2/Page 19 - E/Item_002_Does_Jimmy,_,_live_in_this_neighborhood.mp3";
import clip2 from "../../../assets/audio/ClassBook/U2/Page 19 - E/Item_003_Perhaps_someone_can_bake_a_cake_for_Sally's_birthday,.mp3";
import clip3 from "../../../assets/audio/ClassBook/U2/Page 19 - E/Item_004_If_we_have_a_race,_maybe_Tim,_,_could_win_it.mp3";
import { useExerciseAudio } from "../unit2/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
  AudioSpeaker,
} from "../unit2/ExerciseAudioText";
import ExerciseHeader from "../../ExerciseHeader";
import React, { useState, useRef } from "react";
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

const Review2_Page2_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);

  const handleChange = (i, val) => {
    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);
  };

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Your writing has been cleared.");
    setAnswers(["", "", "", ""]);
  };

  const input = (i, width = "300px") => (
    <input
      placeholder="Add a relative clause"
      {...fieldKeys}
      aria-label={
        [
          "Item 1, add a relative clause about the small bird.",
          "Item 2, add a relative clause about Jimmy.",
          "Item 3, complete the sentence about baking a cake for Sally's birthday with a relative clause.",
          "Item 4, add a relative clause about Tim in the race.",
        ][i]
      }
      title={
        [
          "Item 1, add a relative clause about the small bird.",
          "Item 2, add a relative clause about Jimmy.",
          "Item 3, complete the sentence about baking a cake for Sally's birthday with a relative clause.",
          "Item 4, add a relative clause about Tim in the race.",
        ][i]
      }
      value={answers[i]}
      onChange={(e) => handleChange(i, e.target.value)}
      style={{
        display: "inline-block", // 🔥 مهم
        width: width, // 🔥 نتحكم بالطول
        borderBottom: "2px solid black",
        outline: "none",
        fontSize: "18px",
        color: "#6D2980",
        fontWeight: "bold",
        background: "transparent",
        margin: "0 6px",
      }}
    />
  );

  return (
    <div
      data-exercise-scope="Review2_Page2_Q2.jsx"
      style={{ padding: "30px", display: "flex", justifyContent: "center" }}
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review2_Page2_Q2.jsx"] input:focus-visible,[data-exercise-scope="Review2_Page2_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Review2_Page2_Q2.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb !important;outline-offset:3px;border-radius:6px;}`}</style>
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
          isReview
          sectionLetter="E"
          title={
            <>Add a relative clause that tells about the noun next to it.</>
          }
          subTitle="Use the prompt and grammar pattern to write a complete sentence, then reread it for meaning, tense, and punctuation."
        />

        {/* الأسئلة */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "50px",
            fontSize: "20px",
          }}
        >
          <SentenceGroup audio={audio} id="sentence-0" src={clip0} label="Hear the sentence: 1 I found a small bird blank .">
            {" "}
            
              <span style={{ fontWeight: "bold", marginRight: "10px" }}>1</span>
              I found a small bird{" "}
            
            {input(0, "400px")}.
          </SentenceGroup>

          <SentenceGroup audio={audio} id="sentence-1" src={clip1} label="Hear the sentence: 2 Does Jimmy, blank , live in this neighborhood?">
            
              <span style={{ fontWeight: "bold", marginRight: "10px" }}>2</span>
              Does Jimmy, {input(1, "300px")}, live in this neighborhood?
            
          </SentenceGroup>

          <SentenceGroup audio={audio} id="sentence-2" src={clip2} label="Hear the sentence: 3 Perhaps someone can bake a cake for Sally’s birthday, blank ." style={{ display: "flex", flexDirection: "column" }}>
            <div>
              
                <span style={{ fontWeight: "bold", marginRight: "10px" }}>
                  3
                </span>
                Perhaps someone can bake a cake for Sally’s birthday,
              
            </div>

            {/* 🔥 السطر الثاني */}
            <div style={{ marginLeft: "30px" }}>{input(2, "600px")}.</div>
          </SentenceGroup>

          <SentenceGroup audio={audio} id="sentence-3" src={clip3} label="Hear the sentence: 4 If we have a race, maybe Tim, blank , could win it.">
            
              <span style={{ fontWeight: "bold", marginRight: "10px" }}>4</span>
              If we have a race, maybe Tim, {input(3, "350px")}, could win it.
            
          </SentenceGroup>
        </div>

        {/* 🔄 Reset */}
        <div className="action-buttons-container">
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
        </div>
      </div>
    </div>
  );
};

export default Review2_Page2_Q2;
