import React, { useState } from "react";
import GrammarA from "./page6_GrammarA";
import GrammarB from "./page6_GrammarB";
import GrammarC from "./page6_GrammarC";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ReadingBG from "../../../assets/imgs/conversation.svg";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 6/SVG/sch.svg";
import grammer_u1 from "../../../assets/audio/ClassBook/U1/PG 6/grammer_u1.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const GrammarSection_U1 = () => {
  const [answersB, setAnswersB] = useState(["", "", "", ""]);
  const [answersC, setAnswersC] = useState(["", "", "", ""]);

  const [showTrigger, setShowTrigger] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [locked, setLocked] = useState(false);

  const [resultB, setResultB] = useState([]);
  const [resultC, setResultC] = useState([]);
  const captions = [
    {
      start: 0.34,
      end: 17.539,
      text: "Page six. Grammar. Questions with how. How much is the beach ball? How can you measure a giraffe? How does your grandma make such delicious cookies? Answering a how question. The swimmer dives ten meters deep. It is ten kilometers away.",
    },
  ];
  // ✅ الصح
  const correctB = ["How long", "How much", "How fast", "How high"];
  const correctC = ["eggs", "water", "lions", "sugar"];
  const checkAll = () => {
    if (locked) return;

    // 🧼 تنظيف القيم
    const cleanB = answersB.map((a) => (a || "").trim());
    const cleanC = answersC.map((a) => (a || "").trim());

    console.log("B:", cleanB);
    console.log("C:", cleanC);

    // ====================
    // 🛑 VALIDATION
    // ====================
    const isBEmpty = cleanB.some((a) => !a);
    const isCEmpty = cleanC.some((a) => !a);

    if (isBEmpty || isCEmpty) {
      console.log("❌ Empty detected:", {
        B: cleanB.map((a, i) => [i, a]),
        C: cleanC.map((a, i) => [i, a]),
      });

      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correct = 0;
    let total = 0;

    // ====================
    // 🔵 B
    // ====================
    const resB = cleanB.map((a, i) => {
      total++;
      const ok = a.toLowerCase() === correctB[i].toLowerCase();
      if (ok) correct++;
      return ok;
    });

    // ====================
    // 🔵 C
    // ====================
    const resC = cleanC.map((a, i) => {
      total++;
      const ok = a.toLowerCase() === correctC[i];
      if (ok) correct++;
      return ok;
    });

    // ====================
    // 🔥 SET RESULTS
    // ====================
    setResultB(resB);
    setResultC(resC);

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

    // ====================
    // 🔔 ALERT TYPE
    // ====================
    if (correct === total) {
      ValidationAlert.success(msg);
    } else if (correct === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  return (
    <div>
      <div className="w-[60%] mx-auto mb-4 flex items-center mt-3">
        <div
          className="px-4 py-1 font-bold text-black w-fit"
          style={{
            backgroundImage: `url(${ReadingBG})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          Grammar
        </div>
      </div>
      <div className="w-[70%] mx-auto">
        <QuestionAudioPlayer
          src={grammer_u1}
          captions={captions}
          stopAtSecond={2}
        />
      </div>

      <div className="flex flex-col w-[60%] mx-auto">
        <img
          src={img}
          alt=""
          style={{ width: "100%", height: "auto" }}
          className="w-full object-contain"
        />
        <div className=" mt-4 space-y-15 mb-20">
          <GrammarA />

          <GrammarB
            onChange={setAnswersB}
            showTrigger={showTrigger}
            resetTrigger={resetTrigger}
            locked={locked}
            result={resultB}
          />

          <GrammarC
            onChange={setAnswersC}
            showTrigger={showTrigger}
            resetTrigger={resetTrigger}
            locked={locked}
            result={resultC}
          />
        </div>

        <Button
          checkAnswers={checkAll}
          handleShowAnswer={() => {
            setShowTrigger((p) => p + 1);
            setLocked(true);
          }}
          handleStartAgain={() => {
            setResetTrigger((p) => p + 1);
            setLocked(false);

            setAnswersB(["", "", "", ""]);
            setAnswersC(["", "", "", ""]);
            setResultB([]);
            setResultC([]);
          }}
        />
      </div>
    </div>
  );
};

export default GrammarSection_U1;
