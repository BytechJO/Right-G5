import { PassageAudio } from "./PassageAudio";
import clip0 from "../../../assets/audio/ClassBook/U4/Page 35 - D/Item_001_Have_you_ever_eaten_something_really_strange_Haggis,_a_traditional_dish.mp3";
import clip1 from "../../../assets/audio/ClassBook/U4/Page 35 - D/Item_002_The_organs_of_the_sheep_are_minced_and_then_mixed_with_onion,_oatmeal,_s.mp3";
import clip2 from "../../../assets/audio/ClassBook/U4/Page 35 - D/Item_003_If_that_doesn't_sound_strange_enough,_the_mixture_is_then_stuffed_into_t.mp3";
import clip3 from "../../../assets/audio/ClassBook/U4/Page 35 - D/Item_004_Nowadays,_haggis_can_be_purchased_at_supermarkets_in_tin_cans.mp3";
import clip4 from "../../../assets/audio/ClassBook/U4/Page 35 - D/Item_005_A_popular_encyclopedia_on_food_gives_haggis_wonderful_reviews,_claiming.mp3";
import clip5 from "../../../assets/audio/ClassBook/U4/Page 35 - D/Item_006_Perhaps,_you'll_be_brave_enough_to_try_it_someday!.mp3";
import clip6 from "../../../assets/audio/ClassBook/U4/Page 35 - D/Item_007_If_that_doesn't_sound_,_the_mixture_is_then_stuffed_into_the_stomach_of.mp3";
import clip7 from "../../../assets/audio/ClassBook/U4/Page 35 - D/Item_008_,_haggis_can_be_purchased_at_supermarkets_in.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import { SentenceGroup } from "./SentenceAudio";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
const activationKeys = {
  onKeyDown: event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  }
};
const fieldKeys = {
  onKeyDown: event => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
  onKeyUp: event => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  }
};
const normalizeAnswer = text => text.normalize("NFKC").toLowerCase().replace(/[‘’']/g, "").replace(/[.,!?;:…“”"()–—-]/g, " ").replace(/\s+/g, " ").trim();
const Review3_Page2_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);
  const correctAnswers = ["popular", "wonderful", "strange enough", "Nowadays", "tin cans"];
  const normalize = normalizeAnswer;
  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;
    setAnswers(previous => previous.map((a, j) => j === i ? value : a));
    setResult(previous => previous.map((v, j) => j === i ? undefined : v));
  };
  const handleReset = () => {
    audio.stop();
    setAnnouncement("All answers and feedback cleared.");
    setAnswers(["", "", "", "", ""]);
    setResult([]);
    setLocked(false);
  };
  const input = (i, width = "w-[180px]") => <span className="relative inline-block mx-1">
      <input placeholder={"Word"} style={{
      ...(result[i] === true ? {
        borderBottomColor: "#16a34a"
      } : {})
    }} {...fieldKeys} aria-invalid={result[i] === false} title={["Sentence 3, first blank: A blank encyclopedia on food", "Sentence 3, second blank: gives haggis blank reviews", "Sentence 1: If that does not sound blank", "Sentence 2, first blank: blank, haggis can be purchased", "Sentence 2, second blank: supermarkets in blank"][i]} aria-label={["Sentence 3, first blank: A blank encyclopedia on food", "Sentence 3, second blank: gives haggis blank reviews", "Sentence 1: If that does not sound blank", "Sentence 2, first blank: blank, haggis can be purchased", "Sentence 2, second blank: supermarkets in blank"][i]} disabled={locked || result[i] === true} value={answers[i]} onChange={e => handleChange(i, e.target.value)} className={`border-b outline-none  font-semibold text-[#6D2980] ${width}
      ${result[i] === false ? "border-red-500" : "border-black"}
    `} />

      {result[i] === false && <span style={{
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
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      pointerEvents: "none",
      zIndex: 3
    }}>
          ✕
        </span>}
    </span>;
  const checkAnswers = () => {
    if (locked) return;
    audio.stop();
    if (answers.some(a => !a?.trim())) {
      setAnnouncement(String("Please complete all fields.").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.info();
      return;
    }
    let correctCount = 0;
    const res = answers.map((a, i) => {
      const ok = normalize(a) === normalize(correctAnswers[i]);
      if (ok) correctCount++;
      return ok;
    });
    setResult(res);
    const total = correctAnswers.length;
    const color = correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";
    const msg = `
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${correctCount} / ${total}
      </span>
    </div>
  `;
    if (correctCount === total) {
      resetButtonRef.current?.focus({
        preventScroll: true
      });
      setLocked(true);
      setAnnouncement(String(msg).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      setAnnouncement(String(msg).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.error(msg);
    } else {
      setAnnouncement(String(msg).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.warning(msg);
    }
  };
  const showAnswers = () => {
    audio.stop();
    setAnswers([...correctAnswers]);
    setResult(correctAnswers.map(() => true));
    setLocked(true);
    setAnnouncement("Correct answers shown and locked.");
  };
  return <div data-exercise-scope={"Review3_Page2_Q1.jsx"} style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px"
  }}><AudioFeedback audio={audio} /><style>{`[data-exercise-scope="Review3_Page2_Q1.jsx"] input:focus-visible,[data-exercise-scope="Review3_Page2_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall mb-15">
        <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "30px"
      }}>
          <ExerciseHeader isReview sectionLetter="D" title={<>
            
            Read and complete the sentences.
          </>} subTitle="Read the whole sentence first, then choose the word that fits both the meaning and grammar before checking." />

          {/* Reading Box */}
          <div className="text-[18px] leading-[2.2] p-8 rounded-[20px] mb-5" style={{
          border: "2px solid #7A2D91"
        }}><PassageAudio audio={audio} id="reading" text="Have you ever eaten something really strange? Haggis, a traditional dish of Scotland, is made from the liver, heart, and lungs of a sheep. The organs of the sheep are minced and then mixed with onion, oatmeal, spices, and salt. If that doesn’t sound strange enough, the mixture is then stuffed into the stomach of the sheep and boiled for a couple of hours. Nowadays, haggis can be purchased at supermarkets in tin cans. A popular encyclopedia on food gives haggis wonderful reviews, claiming it to have an excellent nutty taste, as well as delicious and tasty. Perhaps, you’ll be brave enough to try it someday!" sources={[clip0, clip1, clip2, clip3, clip4, clip5]} starts={["Have you ever eaten", "The organs of the sheep", "If that", "Nowadays,", "A popular encyclopedia", "Perhaps,"]} /></div>

          {/* Questions */}
          <div className="text-[18px] flex flex-col gap-y-15">
            <div className="flex items-start">
              <span className="font-bold mr-4 shrink-0">1</span>

              <SentenceGroup label={"Hear completion sentence 1"} src={clip6} id={"question-0"} audio={audio}>
                If that doesn’t sound {input(2, "w-[300px]")}, the mixture is
                then stuffed into the stomach of the sheep and boiled for a
                couple of hours.
              </SentenceGroup>
            </div>

            <SentenceGroup label={"Hear completion sentence 2"} src={clip7} id={"question-1"} audio={audio}>
              <span className="font-bold mr-4">2</span>
              {input(3, "w-[180px]")}, haggis can be purchased at supermarkets
              in {input(4, "w-[180px]")}.
            </SentenceGroup>
            <div>
              <span className="font-bold mr-4">3</span>A {input(0, "w-[180px]")}{" "}
              encyclopedia on food gives haggis {input(1, "w-[180px]")} reviews.
            </div>
          </div>
        </div>
      </div>

      <div className="action-buttons-container">
        <button {...activationKeys} ref={resetButtonRef} aria-label={"Start Again"} type={"button"} className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>

        <button {...activationKeys} aria-label={"Show Answer"} type={"button"} onClick={showAnswers} className="show-answer-btn">
          Show Answer
        </button>

        <button {...activationKeys} style={{
        cursor: locked ? "not-allowed" : "pointer"
      }} disabled={locked} aria-label={"Check Answer"} type={"button"} className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>;
};
export default Review3_Page2_Q1;
