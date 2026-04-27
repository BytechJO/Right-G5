import React, { useState } from "react";
import GrammarA from "./Unit2_Page3_GrammarA";
import GrammarB from "./Unit2_Page3_GrammarB";
import GrammarC from "./Unit2_Page3_GrammarC";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ReadingBG from "../../../assets/imgs/conversation.svg";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 6/SVG/sch.svg";
import grammer_u1 from "../../../assets/audio/ClassBook/U2/PG 12/grammer.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const GrammarSection_U1 = () => {
  const [answersB, setAnswersB] = useState(["", "", "", ""]);
  const [answersC, setAnswersC] = useState(["", "", "", ""]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showTrigger, setShowTrigger] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [locked, setLocked] = useState(false);

  const [resultB, setResultB] = useState([]);
  const [resultC, setResultC] = useState([]);
  const captions = [
    {
      start: 0.099,
      end: 18.56,
      text: "Page 12, grammar, relative clauses. My sister who runs on the track team won first place on Wednesday. My sister won first place, which is a hard thing to do. The elephant that stood on its back legs ate the peanut. The elephant ate the peanut that was on my hand.",
    },
  ];
  // ✅ الصح
  const correctC = {
    who: "used to describe people",
    which: "used to describe things",
    that: "used to describe people and things",
  };
  const checkAll = () => {
    // ❌ لا توقف إذا showAnswer

    const cleanB = answersB.map((a) => (a || "").trim());

    const isBEmpty = cleanB.some((a) => !a);
    const isCEmpty = Object.keys(correctC).some((key) => !answersC[key]);

    if (isBEmpty || isCEmpty) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correct = 0;
    let total = 0;

    const resC = {};

    Object.keys(correctC).forEach((key) => {
      total++;

      const ok = answersC[key] === correctC[key];

      resC[key] = ok;

      if (ok) correct++;
    });

    setResultC(resC); // 🔥 هذا المهم

    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${correct} / ${total}
      </span>
    </div>
  `;

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
          stopAtSecond={3}
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
            setShowAnswer(true);
          }}
          handleStartAgain={() => {
            setResetTrigger((p) => p + 1);
            setLocked(false);

            setAnswersB(["", "", "", ""]);
            setAnswersC(["", "", "", ""]);
            setResultB([]);
            setResultC([]);
            setShowAnswer(false);
          }}
        />
      </div>
    </div>
  );
};

export default GrammarSection_U1;
