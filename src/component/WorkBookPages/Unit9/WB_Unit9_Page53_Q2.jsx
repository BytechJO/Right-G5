import soundF12 from "../../../assets/audio/Workbook/Unit 9/Page 53 - F/Item_012_If_we_go_to_the_beach,.mp3";
import soundF11 from "../../../assets/audio/Workbook/Unit 9/Page 53 - F/Item_011_when_we_go_on_a_picnic.mp3";
import soundF10 from "../../../assets/audio/Workbook/Unit 9/Page 53 - F/Item_010_When_the_rain_stops,.mp3";
import soundF9 from "../../../assets/audio/Workbook/Unit 9/Page 53 - F/Item_009_we_can_go_out_and_play.mp3";
import soundF8 from "../../../assets/audio/Workbook/Unit 9/Page 53 - F/Item_008_We_could_make_a_snowman.mp3";
import soundF7 from "../../../assets/audio/Workbook/Unit 9/Page 53 - F/Item_007_we_might_travel_to_a_cooler_country.mp3";
import soundF6 from "../../../assets/audio/Workbook/Unit 9/Page 53 - F/Item_006_Karen_can_bring_the_desserts.mp3";
import soundF5 from "../../../assets/audio/Workbook/Unit 9/Page 53 - F/Item_005_we_can_collect_seashells.mp3";
import soundF4 from "../../../assets/audio/Workbook/Unit 9/Page 53 - F/Item_004_When_Gary_learns_how_to_ride_a_bike,.mp3";
import soundF3 from "../../../assets/audio/Workbook/Unit 9/Page 53 - F/Item_003_he_will_join_us_in_a_bike_race.mp3";
import soundF2 from "../../../assets/audio/Workbook/Unit 9/Page 53 - F/Item_002_if_it_snows_tomorrow.mp3";
import soundF1 from "../../../assets/audio/Workbook/Unit 9/Page 53 - F/Item_001_If_this_summer_gets_too_hot,.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import {useExerciseAudio} from "../../StudentPages/unit5/useExerciseAudio";
import {AudioText,AudioFeedback,AudioSpeaker} from "../../StudentPages/unit5/ExerciseAudioText";
import {SentenceGroup,SentencePart} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
const activationKeys={onKeyDown:event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)event.currentTarget.click();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}};
const fieldKeys={onKeyDown:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();},onKeyUp:event=>{if(event.key==="Enter"||event.key===" ")event.stopPropagation();}};
const normalizeAnswer=text=>text.normalize("NFKC").toLowerCase().replace(/[‘’']/g,"").replace(/[.,!?;:…“”"–—-]/g," ").replace(/\s+/g," ").trim();


const WB_Unit9_Page53_Q2 = () => {const audio=useExerciseAudio();const resetButtonRef=React.useRef(null);const [announcement,setAnnouncement]=React.useState("");

  const leftSide = [
    "If this summer gets too hot,",

    "When Gary learns how to ride a bike,",

    "Karen can bring the desserts",

    "We could make a snowman",

    "When the rain stops,",

    "If we go to the beach,",
  ];

  const rightSide = [
    {
      letter: "a",

      text: "if it snows tomorrow.",
    },

    {
      letter: "b",

      text: "he will join us in a bike race.",
    },

    {
      letter: "c",

      text: "we can collect seashells.",
    },

    {
      letter: "d",

      text: "we might travel to a cooler country.",
    },

    {
      letter: "e",

      text: "we can go out and play.",
    },

    {
      letter: "f",

      text: "when we go on a picnic.",
    },
  ];

  const correctMatches = ["d", "b", "f", "a", "e", "c"];

  const sentenceAnswers = [
    "If this summer gets too hot, we might travel to a cooler country.",

    "When Gary learns how to ride a bike, he will join us in a bike race.",

    "Karen can bring the desserts when we go on a picnic.",

    "We could make a snowman if it snows tomorrow.",

    "When the rain stops, we can go out and play.",

    "If we go to the beach, we can collect seashells.",
  ];

  const [matches, setMatches] = useState(["", "", "", "", "", ""]);

  const [studentAnswers, setStudentAnswers] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [matchResult, setMatchResult] = useState([]);

  const [sentenceResult, setSentenceResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  // ------------------------
  // MATCH INPUT
  // ------------------------

  const handleMatchChange = (i, value) => {
    if (locked || matchResult[i] === true) return;

    const updated = [...matches];

    updated[i] = value.toLowerCase().slice(0, 1);

    setMatches(updated);

    setMatchResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  // ------------------------
  // SENTENCE INPUT
  // ------------------------

  const handleSentenceChange = (i, value) => {
    if (locked || sentenceResult[i] === true) return;

    const updated = [...studentAnswers];

    updated[i] = value;

    setStudentAnswers(updated);

    setSentenceResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (locked) return;audio.stop();

    const hasEmptyMatch = matches.some((a) => !a.trim());

    const hasEmptySentence = studentAnswers.some((a) => !a.trim());

    if (hasEmptyMatch || hasEmptySentence) {
      (setAnnouncement(String("Please complete all answers.").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.info("Please complete all answers."));

      return;
    }

    let correctCount = 0;

    // MATCHES

    const newMatchResults = matches.map((answer, i) => {
      const ok = normalize(answer) === normalize(correctMatches[i]);

      if (ok) correctCount++;

      return ok;
    });

    // SENTENCES

    const normalizedCorrectAnswers = sentenceAnswers.map((s) => normalize(s));

    const usedAnswers = studentAnswers.flatMap((answer,i)=>sentenceResult[i]===true?[normalizedCorrectAnswers.indexOf(normalize(answer))]:[]);

    const newSentenceResults = studentAnswers.map((answer, slot) => {
      const normalizedAnswer = normalize(answer);

      const matchedIndex = normalizedCorrectAnswers.findIndex(
        (correct, i) =>
          !usedAnswers.includes(i) && normalizedAnswer === correct,
      );

      const ok = sentenceResult[slot]===true || matchedIndex !== -1;

      if (ok) {
        if(matchedIndex!==-1)usedAnswers.push(matchedIndex);
        correctCount++;
      }

      return ok;
    });
    setMatchResult(newMatchResults);

    setSentenceResult(newSentenceResults);

    const total = correctMatches.length + sentenceAnswers.length;

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
      resetButtonRef.current?.focus({preventScroll:true});setLocked(true);

      (setAnnouncement(String(msg).replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.success(msg));
    } else if (correctCount === 0) {
      (setAnnouncement(String(msg).replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.error(msg));
    } else {
      (setAnnouncement(String(msg).replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim()),ValidationAlert.warning(msg));
    }
  };

  // ------------------------
  // SHOW ANSWERS
  // ------------------------

  const showAnswers = () => {audio.stop();setAnnouncement("Model answers shown and locked.");resetButtonRef.current?.focus({preventScroll:true});
    setMatches(correctMatches);

    setStudentAnswers(sentenceAnswers);

    setMatchResult([true, true, true, true, true, true]);

    setSentenceResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {audio.stop();setAnnouncement("Answers and feedback cleared.");
    setMatches(["", "", "", "", "", ""]);

    setStudentAnswers(["", "", "", "", "", ""]);

    setMatchResult([]);

    setSentenceResult([]);

    setLocked(false);
  };

  // ------------------------
  // SMALL INPUT
  // ------------------------

  const matchInput = (i) => (
    <div className="relative inline-block">
      <input style={{borderBottomColor:(matchResult[i]===true)?"#16a34a":(matchResult[i]===false)?"#D1232A":undefined}} aria-invalid={matchResult[i]===false} title={`Match ${i+1}: ${leftSide[i]}. Enter the ending letter a to f.`} aria-label={`Match ${i+1}: ${leftSide[i]}. Enter the ending letter a to f.`} {...fieldKeys}
        type="text"
        maxLength={1}
        value={matches[i]}
        disabled={locked || matchResult[i] === true}
        onChange={(e) => handleMatchChange(i, e.target.value)}
        className={`
  w-7
  h-7
  border-0
  border-b
  outline-none
  bg-transparent
  text-center
  text-[18px]
  text-[#6D2980]
  font-semibold

  ${matchResult[i] === false ? "border-[#D1232A]" : "border-black"}
`}
      />
    </div>
  );

  // ------------------------
  // BIG INPUT
  // ------------------------

  const sentenceInput = (i) => (
    <div className="relative w-full">
      <input style={{borderBottomColor:(sentenceResult[i]===true)?"#16a34a":(sentenceResult[i]===false)?"#D1232A":undefined}} placeholder={"Complete sentence"} aria-invalid={sentenceResult[i]===false} title={`Complete matched sentence ${i+1}: use the clauses above`} aria-label={`Complete matched sentence ${i+1}: use the clauses above`} {...fieldKeys}
        type="text"
        value={studentAnswers[i]}
        disabled={locked || sentenceResult[i] === true}
        onChange={(e) => handleSentenceChange(i, e.target.value)}
        className={`
          w-full
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
    </div>
  );

  return (
    <div data-exercise-scope={"WB_Unit9_Page53_Q2.jsx"} className="flex flex-col items-center p-[30px]"><AudioFeedback audio={audio}/><style>{`[data-exercise-scope="WB_Unit9_Page53_Q2.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit9_Page53_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit9_Page53_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <ExerciseHeader isWorkbook sectionLetter="F" title={<>
          
          Read, match, and write.
        </>} subTitle="Match each condition with the result that makes logical sense first, then write the complete paired sentence below." />

        {/* MATCHING */}

        <div className="grid grid-cols-2 gap-x-14 mb-10">
          {/* LEFT */}

          <div className="flex flex-col gap-5">
            {leftSide.map((sentence, index) => (
              <SentenceGroup label={`Hear beginning ${index+1}: ${sentence}`} src={[soundF1,soundF4,soundF6,soundF8,soundF10,soundF12][index]} id={`left-${index}`} audio={audio} key={index} className="flex items-start gap-3">
                {matchInput(index)}

                <span className="font-bold">{index + 1}</span>

                <span>{sentence}</span>
              </SentenceGroup>
            ))}
          </div>

          {/* RIGHT */}

          <div className="flex flex-col gap-5">
            {rightSide.map((item, index) => (
              <SentenceGroup label={`Hear ending ${item.letter}: ${item.text}`} src={[soundF2,soundF3,soundF5,soundF7,soundF9,soundF11][index]} id={`right-${index}`} audio={audio} key={index} className="flex items-start gap-3">
                <span className="font-bold">{item.letter}</span>

                <span>{item.text}</span>
              </SentenceGroup>
            ))}
          </div>
        </div>

        {/* WRITING */}

        <div className="flex flex-col gap-6 mb-10">
          {sentenceAnswers.map((_, index) => (
            <div key={index} className="flex items-start gap-4">
              <span className="font-bold">{index + 1}</span>

              <div className="flex-1">{sentenceInput(index)}</div>
            </div>
          ))}
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

        <button style={{cursor:locked?"not-allowed":"pointer"}} {...activationKeys} disabled={locked} aria-label={"Check Answer"} type={"button"} className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default WB_Unit9_Page53_Q2;
