import soundI11 from "../../../assets/audio/Workbook/Unit 3/Page 19 - I/Item_011_4A_Wow_does_the_food_taste.mp3";
import soundI10 from "../../../assets/audio/Workbook/Unit 3/Page 19 - I/Item_010_What_did_Sarah_and_her_family_bring_with_them_to_the_picnic.mp3";
import soundI9 from "../../../assets/audio/Workbook/Unit 3/Page 19 - I/Item_009_How_does_the_weather_feel_in_the_story.mp3";
import soundI8 from "../../../assets/audio/Workbook/Unit 3/Page 19 - I/Item_008_Circle_the_linking_verbs_in_the_story._@.mp3";
import soundI7 from "../../../assets/audio/Workbook/Unit 3/Page 19 - I/Item_007_happy._Everyone_feels_happy_today._It's_a_wonderful_day.mp3";
import soundI6 from "../../../assets/audio/Workbook/Unit 3/Page 19 - I/Item_006_The_food_is_tasty._The_chips_taste_salty_and_delicious._The_birds_are_si.mp3";
import soundI5 from "../../../assets/audio/Workbook/Unit 3/Page 19 - I/Item_005_family_sits_near_a_nice_tree._The_tree_looks_big_and_green._Sarah_takes.mp3";
import soundI4 from "../../../assets/audio/Workbook/Unit 3/Page 19 - I/Item_004_marshmallow_sandwiches_using_rye_bread._Rye_bread_is_healthy._They_broug.mp3";
import soundI3 from "../../../assets/audio/Workbook/Unit 3/Page 19 - I/Item_003_trees_and_grass._There_are_lots_of_colorful_flowers._Sarah's_mom_made_pe.mp3";
import soundI2 from "../../../assets/audio/Workbook/Unit 3/Page 19 - I/Item_002_Sarah_and_her_family_go_out_for_a_picnic_at_the_park._The_park_looks_pre.mp3";
import soundI1 from "../../../assets/audio/Workbook/Unit 3/Page 19 - I/Item_001_The_weather_feels_beautiful_today._The_day_is_bright_and_sunny._There_is.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import { AudioText, AudioFeedback } from "../../StudentPages/unit5/ExerciseAudioText";
import { SentenceGroup } from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U3/Page 19/SVG/Asset 17.svg";
import { HiArrowUpCircle } from "react-icons/hi2";
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
const normalizeAnswer = text => text.normalize("NFKC").toLowerCase().replace(/[‘’']/g, "").replace(/[.,!?;:…“”"–—-]/g, " ").replace(/\s+/g, " ").trim();
const WB_Unit3_Page19_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");
  const linkingVerbIndexes = [2, 7, 12, 31, 59, 88, 92, 102, 105, 75, 108];
  const qaAnswers = ["The weather feels beautiful.", "They brought peanut butter and marshmallow sandwiches on rye bread. They also brought chips.", "The food is tasty.", "Everyone feels happy."];
  const storyWords = ["The", "weather", "feels", "beautiful", "today.", "The", "day", "is", "bright", "and", "sunny.", "There", "is", "a", "light,", "cool", "breeze.", "Sarah", "and", "her", "family", "go", "out", "for", "a", "picnic", "at", "the", "park.", "The", "park", "looks", "pretty", "with", "all", "the", "green", "trees", "and", "grass.", "There", "are", "lots", "of", "colorful", "flowers.", "Sarah’s", "mom", "made", "peanut", "butter", "and", "marshmallow", "sandwiches", "using", "rye", "bread.", "Rye", "bread", "is", "healthy.", "They", "brought", "some", "chips,", "too.", "The", "family", "sits", "near", "a", "nice", "tree.", "The", "tree", "looks", "big", "and", "green.", "Sarah", "takes", "a", "bite", "of", "her", "sandwich.", "The", "food", "is", "tasty.", "The", "chips", "taste", "salty", "and", "delicious.", "The", "birds", "are", "singing", "cheerfully.", "They", "sound", "happy.", "Everyone", "feels", "happy", "today.", "It’s", "a", "wonderful", "day."];
  const [selectedWords, setSelectedWords] = useState([]);
  const [lockedWords, setLockedWords] = useState([]);
  const [wrongWords, setWrongWords] = useState([]);
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);
  const normalize = normalizeAnswer;
  const toggleCircle = index => {
    if (locked || lockedWords.includes(index)) return;
    setWrongWords(previous => previous.filter(value => value !== index));
    setAnnouncement(storyWords[index] + (selectedWords.includes(index) ? " deselected." : " circled."));
    if (selectedWords.includes(index)) {
      setSelectedWords(selectedWords.filter(i => i !== index));
    } else {
      setSelectedWords([...selectedWords, index]);
    }
  };
  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;
    const updated = [...answers];
    updated[i] = value;
    setAnswers(updated);
    setResult(prev => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };
  const checkAnswers = () => {
    if (locked) return;
    audio.stop();
    if (selectedWords.length === 0) {
      setAnnouncement(String("Please circle at least one linking verb.").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.info("Please circle at least one linking verb.");
      return;
    }
    const hasEmpty = answers.some(a => !a.trim());
    if (hasEmpty) {
      setAnnouncement(String("Please complete all answers.").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.info("Please complete all answers.");
      return;
    }
    let correctCount = 0;
    linkingVerbIndexes.forEach(index => {
      if (selectedWords.includes(index)) {
        correctCount++;
      }
    });
    const newResults = answers.map((answer, i) => {
      const ok = normalize(answer) === normalize(qaAnswers[i]);
      if (ok) correctCount++;
      return ok;
    });
    setResult(newResults);
    const wrong = selectedWords.filter(index => !linkingVerbIndexes.includes(index));
    setWrongWords(wrong);
    setLockedWords(previous => [...new Set([...previous, ...selectedWords.filter(index => linkingVerbIndexes.includes(index))])]);
    const total = linkingVerbIndexes.length + qaAnswers.length;
    const complete = correctCount === total && wrong.length === 0;
    const color = complete ? "green" : correctCount === 0 ? "red" : "orange";
    const msg = `
      <div style="font-size:18px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;
    if (complete) {
      resetButtonRef.current?.focus({
        preventScroll: true
      });
      setLocked(true);
      setAnnouncement(String(msg + (wrong.length ? ` ${wrong.length} incorrect word selections. Remove the red circles and check again.` : "")).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      setAnnouncement(String(msg + (wrong.length ? ` ${wrong.length} incorrect word selections. Remove the red circles and check again.` : "")).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.error(msg);
    } else {
      setAnnouncement(String(msg + (wrong.length ? ` ${wrong.length} incorrect word selections. Remove the red circles and check again.` : "")).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.warning(msg);
    }
  };
  const showAnswers = () => {
    audio.stop();
    setAnnouncement("Model answers shown and locked.");
    resetButtonRef.current?.focus({
      preventScroll: true
    });
    setLockedWords([...linkingVerbIndexes]);
    setWrongWords([]);
    setSelectedWords(linkingVerbIndexes);
    setAnswers(["The weather feels beautiful.", "They brought peanut butter and marshmallow sandwiches on rye bread. They also brought chips.", "The food is tasty.", "Everyone feels happy."]);
    setResult([true, true, true, true]);
    setLocked(true);
  };
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setLockedWords([]);
    setWrongWords([]);
    setSelectedWords([]);
    setAnswers(["", "", "", ""]);
    setResult([]);
    setLocked(false);
  };
  const inputField = i => <div className="relative w-full">
      <input aria-invalid={result[i] === false} style={{
      borderBottomColor: result[i] === true || result[i]?.overall === true ? "#16a34a" : undefined
    }} placeholder={"Your answer"} title={["How does the weather feel in the story?", "What did Sarah and her family bring with them to the picnic?", "How does the food taste?", "How does everyone feel?"][i]} aria-label={["How does the weather feel in the story?", "What did Sarah and her family bring with them to the picnic?", "How does the food taste?", "How does everyone feel?"][i]} {...fieldKeys} type="text" value={answers[i]} disabled={locked || result[i] === true} onChange={e => handleChange(i, e.target.value)} className={`
          w-full
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6D2980]
          font-semibold
          px-1

          ${result[i] === false ? "border-[#D1232A]" : "border-black"}
        `} />

      {result[i] === false && <span style={{
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
      boxShadow: "0 1px 6px rgba(0,0,0,0.2)"
    }}>
          ✕
        </span>}
    </div>;
  const renderStoryWord = (word, index) => {
    const isWordLocked = lockedWords.includes(index);
    const isSelected = selectedWords.includes(index);
    return <button aria-label={`Word ${index + 1}: ${word}. ${isWordLocked ? "Correct and locked." : wrongWords.includes(index) ? "Not correct. Press to remove the circle." : isSelected ? "Circled. Press to remove." : "Press to circle."}`} aria-pressed={isSelected} data-word-index={index} data-choice={true} {...activationKeys} key={index} type="button" disabled={locked || isWordLocked} onClick={() => toggleCircle(index)} style={{
      position: "relative",
      background: "transparent",
      border: "none",
      padding: "0 3px",
      fontSize: "18px",
      cursor: locked || isWordLocked ? "default" : "pointer",
      lineHeight: "1.8",
      "--exercise-focus-radius": "50%"
    }}>
        {word}

        {isSelected && <span style={{
        position: "absolute",
        left: "-6px",
        top: "-6px",
        width: "calc(100% + 12px)",
        height: "calc(100% + 12px)",
        border: isWordLocked ? "3px solid #16a34a" : wrongWords.includes(index) ? "3px solid #D1232A" : "3px solid #6D2980",
        borderRadius: "50%",
        pointerEvents: "none"
      }} />}
      </button>;
  };
  return <div data-exercise-scope={"WB_Unit3_Page19_Q1.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio} /><style>{`[data-exercise-scope="WB_Unit3_Page19_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit3_Page19_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit3_Page19_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[18px]">
        {/* TITLE */}
        <ExerciseHeader isWorkbook sectionLetter="I" title={<>
          
          Read and write.
        </>} subTitle="Read the whole passage once, return to the sentence that contains the answer, then write a short response based on the text." />

        {/* STORY */}
        <SentenceGroup label={"Hear the story about Sarah and her family at the picnic"} src={[soundI1, soundI2, soundI3, soundI4, soundI5, soundI6, soundI7]} id={"picnic-story"} audio={audio} className="mb-10">
          {storyWords.map((word, index) => <React.Fragment key={index}>
              {renderStoryWord(word, index)}{" "}
            </React.Fragment>)}
        </SentenceGroup>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-10">
          {/* 1 */}
          <div>
            <div className="flex gap-3 mb-4">
              <span className="flex items-center gap-2"><AudioText audio={audio} id={"fragment-0"} src={soundI8} label={"Hear Circle the linking verbs in the story."}>
                <span className="font-bold mr-2">1</span>
                Circle the linking verbs in the story.
                <HiArrowUpCircle style={{
                  color: "#6D2980",
                  fontSize: "26px",
                  flexShrink: 0
                }} />
              </AudioText></span>
            </div>
          </div>

          {/* 2 */}
          <div>
            <div className="flex gap-3 mb-4">
              <span className="font-bold">2</span>

              <span><AudioText audio={audio} id={"fragment-1"} src={soundI9} label={"Hear How does the weather feel in the story?"}>How does the weather feel in the story?</AudioText></span>
            </div>

            <div className="pl-7">{inputField(0)}</div>
          </div>

          {/* 3 */}
          <div>
            <div className="flex gap-3 mb-4">
              <span className="font-bold">3</span>

              <span><AudioText audio={audio} id={"fragment-2"} src={soundI10} label={"Hear What did Sarah and her family bring with them to the picnic?"}>
                What did Sarah and her family bring with them to the picnic?
              </AudioText></span>
            </div>

            <div className="pl-7">{inputField(1)}</div>
          </div>

          {/* 4 */}
          <div>
            <div className="flex gap-3 mb-4">
              <span className="font-bold">4</span>

              <span><AudioText audio={audio} id={"fragment-3"} src={soundI11} label={"Hear How does the food taste?"}>How does the food taste?</AudioText></span>
            </div>

            <div className="pl-7">{inputField(2)}</div>
          </div>

          {/* 5 */}
          <div>
            <div className="flex gap-3 mb-4">
              <span className="font-bold">5</span>

              <span>How does everyone feel?</span>
            </div>

            <div className="pl-7">{inputField(3)}</div>
          </div>
        </div>

        {/* IMAGE */}
        <div className="flex justify-center mt-10 mb-10">
          <img src={img1} alt={"A family sharing food on a picnic blanket in a park, with a basket, trees and birds nearby."} style={{
          width: "820px",
          height: "auto",
          objectFit: "contain"
        }} />
        </div>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container">
        <button {...activationKeys} ref={resetButtonRef} aria-label={"Start Again"} type={"button"} className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>

        <button {...activationKeys} aria-label={"Show Answer"} type={"button"} className="show-answer-btn" onClick={showAnswers}>
          Show Answer
        </button>

        <button onPointerDown={e => {
        if (locked) e.preventDefault();
      }} style={{
        cursor: locked ? "not-allowed" : "pointer"
      }} {...activationKeys} disabled={locked} aria-label={"Check Answer"} type={"button"} className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>;
};
export default WB_Unit3_Page19_Q1;
