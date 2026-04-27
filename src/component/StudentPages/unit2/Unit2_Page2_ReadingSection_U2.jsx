import React, { useState } from "react";
import ReadingSection from "../../ReadingSection";
import ComprehensionA from "./Unit2_Page2_ComprehensionA";
import ComprehensionB from "./Unit2_Page2_ComprehensionB";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import imgReading from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 11/SVG/Asset 1.svg";
import readingAudio from "../../../assets/audio/ClassBook/U2/PG 11/reading_U2.mp3";

const ReadingSection_U2 = () => {
  const [answersA, setAnswersA] = useState([]);
  const [answersB, setAnswersB] = useState([]);
  const [showTrigger, setShowTrigger] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [locked, setLocked] = useState(false);
  const [resultA, setResultA] = useState([]);
  const [resultB, setResultB] = useState([]);
  const paragraphs = [
    "Twins are babies who are born at the same time from the same mom. Most of us know about twins who look the same and sometimes dress the same. Also, there are unusual sets of twins that are born very so often.",

    "For example, there are twins who look alike, but it's the opposite sides of their bodies that are alike. They are called mirror-image twins. For example, one has a birthmark on the right arm, and the other twin will have the same birthmark on the left arm.",

    "Another type of twin is dwarf twins. A dwarf is a person who does not grow at a usual rate, so their body is sized differently than other people's. Sometimes one twin has a disability and the other doesn't. In one case, twins were born and both were dwarfs, but this doesn't happen very often.",

    "Sometimes, twins are joined together at one part of their body. They are called conjoined twins, and they can often be separated. If they are twins who share the same heart or another important part of the body, they must stay together. Conjoined twins are not born very often, either.",

    'All twins usually grow up being very close. They might like the same things, choose similar jobs, or dress alike. Being a twin must be a "one-of-a-kind" experience!',
  ];

  const captions = [
    {
      start: 0.439,
      end: 8.38,
      text: "Page eleven reading. Have you ever seen two people who look exactly alike? Do you have a brother or sister who looks exactly like you?",
    },
    {
      start: 9.04,
      end: 49.419,
      text: "Unusual sets of twins. Twins are babies who are born at the same time from the same mom. Most of us know about twins who look the same and sometimes dress the same. Also, there are unusual sets of twins that are born every so often. For example, there are twins who look alike, but it's the opposite sides of their bodies that are alike. They are called mirror image twins. For example, one has a birthmark on the right arm, and the other twin will have the same birthmark on the left arm. Another type of twin is dwarf twins. A dwarf is a person who does not grow at a usual rate, so their body is sized differently than other people's.",
    },
    {
      start: 50.579,
      end: 89.18,
      text: "Sometimes one twin has a disability and the other doesn't. In one case, twins were born and both were dwarfs, but this doesn't happen very often. Sometimes twins are joined together at one part of their body. They are called conjoined twins, and they can often be separated. If they are twins who share the same heart or another important part of the body, they must stay together. Conjoined twins are not born very often either. All twins usually grow up being very close. They might like the same things, choose similar jobs, or dress alike. Being a twin must be a one-of-a-kind experience.",
    },
  ];

  const correctA = [
    "at the same time to the same mom",
    "mirror image twins",
    "Siamese twins",
  ];

  const correctBArray = ["dwarf", "unusual", "disability"];

  const checkAll = () => {
    if (locked) return;

    // 🛑 VALIDATION
    const isAEmpty = answersA.some((ans) => !ans || ans.trim() === "");

    const isBEmpty = answersB.some((ans) => !ans || ans.trim() === "");
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
    correctA.forEach((ans, i) => {
      total++;

      const isCorrect = answersA[i]?.toLowerCase().trim() === ans.toLowerCase();

      tempResultA[i] = isCorrect;

      if (isCorrect) correct++;
    });

    // ====================
    // 🔵 B
    // ====================
    correctBArray.forEach((ans, i) => {
      total++;

      const isCorrect = answersB[i]?.toLowerCase().trim() === ans.toLowerCase();

      tempResultB[i] = isCorrect;

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
        mainTitle={
          <>
            Have you ever seen two people who look exactly alike? <br />
            Do you have a brother or sister who looks exactly like you?
          </>
        }
        title="Unusual Sets of Twins"
        image={imgReading}
        paragraphs={paragraphs}
        question="Think of two other things that would be unusual about being a twin."
        sound={readingAudio}
        captions={captions}
        stopAtSecond={8.5}
      />

      <div className="w-[60%] mt-4 space-y-6 mb-20">
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
          setLocked(false);
          setResultA([]); // 🔥 مهم
          setResultB([]); // 🔥 مهم
        }}
      />
    </div>
  );
};

export default ReadingSection_U2;
