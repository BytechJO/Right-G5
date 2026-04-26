import React, { useState } from "react";
import ReadingSection from "../../ReadingSection";
import ComprehensionA from "./page5_ComprehensionA";
import ComprehensionB from "./page5_ComprehensionB";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import imgReading from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 5/SVG/Asset 5.svg";
import readingAudio from "../../../assets/audio/ClassBook/U1/PG 5/readingU1.mp3";

const ReadingSection_U1 = () => {
  const [answersA, setAnswersA] = useState([]);
  const [answersB, setAnswersB] = useState({});
  const [showTrigger, setShowTrigger] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [locked, setLocked] = useState(false);
  const [resultA, setResultA] = useState([]);
  const [resultB, setResultB] = useState({});
  const paragraphs = [
    "How fast can you run? How deep can you dive? How long are your fingernails? Probably not as fast, deep, or long as some people who have made it into the record books! For some reason, people like to try to set records. They want to be the best at something. Here are some amazing records that people have set over the years.",
    "How tightly can your mom or dad park a car? In 2015, Alistair Moffatt set a record for parallel parking. He only needed 7.5 cm more than the length of his car.",
    "How fast can you put on your socks? In 2016, Pavol Durdik from Slovakia put 52 socks on his foot in one minute!",
    "How far can you walk on your hands? Sarah Chapman walked over 5,000 meters in eight hours on her hands in 2002.",
  ];

  const captions = [
    {
      start: 0.439,
      end: 5.96,
      text: "Page five, Reading. Is there something that you can do better than most people? What is it?",
    },
    {
      start: 6.86,
      end: 27.719,
      text: "Page five, Reading. Is there something that you can do better than most people? What is it? How fast can you run? How deep can you dive? How long are your fingernails? Probably not as fast, deep, or long as some people who have made it into the record books. For some reason, people like to try to set records. They want to be the best at something. Here are some amazing records that people have set over the years.",
    },
    {
      start: 28.979,
      end: 42.059,
      text: "How tightly can your mom or dad park a car? In two thousand and fifteen, Alastair Moffat set a record for parallel parking. He only needed seven-point-five centimeters more than the length of his car.",
    },
    {
      start: 43.079,
      end: 61.84,
      text: "How fast can you put on your socks? In two thousand and sixteen, Pavol Durdík from Slovakia put fifty-two socks on his foot in one minute! How far can you walk on your hands? Sarah Chapman walked over five thousand meters in eight hours on her hands in two thousand and two.",
    },
    {
      start: 62.919,
      end: 66.559,
      text: "For some of us, the question might be, how can we walk on our hands?",
    },
  ];

  const correctA = [
    {
      record: "how tight",
      who: "Alistair Moffatt",
      what: "parallel parking",
      when: "2015",
    },
    {
      record: "how fast",
      who: "Pavol Durdik",
      what: "put on 52 socks/one minute",
      when: "2016",
    },
    {
      record: "how far",
      who: "Sarah Chapman",
      what: "walked 5,000 meters",
      when: "2002",
    },
  ];

  const correctB = {
    tight: "the way that clothes fit",
    deep: "the ocean",
    far: "a long walk",
    high: "an airplane",
  };

  const checkAll = () => {
    if (locked) return;

    // 🛑 VALIDATION
    const isAEmpty = answersA.some((row, i) => {
      return Object.entries(row).some(([field, val]) => {
        // إذا هذا الحقل أصلاً موجود في data → تجاهله
        if (correctA[i][field]) return false;

        return !val || val.trim() === "";
      });
    });

    const isBEmpty = Object.keys(correctB).some((key) => !answersB[key]);

    if (isAEmpty || isBEmpty) {
      ValidationAlert.info("Please answer all questions first!");
      return;
    }

    let correct = 0;
    let total = 0;

    const tempResultA = [];
    const tempResultB = {};

    // ====================
    // 🔵 A
    // ====================
    correctA.forEach((row, i) => {
      total++;

      const isRowCorrect = Object.keys(row).every(
        (field) =>
          answersA[i][field].toLowerCase().trim() === row[field].toLowerCase(),
      );

      tempResultA[i] = isRowCorrect;

      if (isRowCorrect) correct++;
    });

    // ====================
    // 🔵 B
    // ====================
    Object.keys(correctB).forEach((key) => {
      total++;

      const isCorrect = answersB[key] === correctB[key];

      tempResultB[key] = isCorrect;

      if (isCorrect) correct++;
    });

    // ====================
    // 🔥 SET RESULTS
    // ====================
    setResultA(tempResultA);
    setResultB(tempResultB);

    // 🔒 LOCK
    setLocked(true);

    // ====================
    // 🎯 SCORE
    // ====================
    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${correct} / ${total}
      </span>
    </div>
  `;

    if (correct === total) ValidationAlert.success(msg);
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  return (
    <div className=" flex flex-col items-center">
      <ReadingSection
        mainTitle="Is there something that you can do better than most people?"
        title="Radical Records and Fantastic Facts"
        image={imgReading}
        paragraphs={paragraphs}
        question="Why do you think many people like to set records?"
        sound={readingAudio}
        captions={captions}
        stopAtSecond={6.1}
      />

      <div className="w-[60%] mt-4 space-y-6 mb-7">
        <ComprehensionA
          onChange={setAnswersA}
          showTrigger={showTrigger}
          resetTrigger={resetTrigger}
          locked={locked}
          result={resultA}
        />

        <ComprehensionB
          onChange={setAnswersB}
          showTrigger={showTrigger}
          resetTrigger={resetTrigger}
          locked={locked}
          result={resultB}
        />
      </div>

      <Button
        checkAnswers={checkAll}
        handleShowAnswer={() => {
          setShowTrigger((p) => p + 1);
          setLocked(true); // 🔒
        }}
        handleStartAgain={() => {
          setResetTrigger((p) => p + 1);
          setLocked(false); // 🔓
        }}
      />
    </div>
  );
};

export default ReadingSection_U1;
