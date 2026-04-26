import React, { useState } from "react";
import WritingA from "./page7_WritingA";
import WritingB from "./page7_WritingB";
import WritingC from "./page7_WritingC";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ReadingBG from "../../../assets/imgs/conversation.svg";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 7/SVG/Asset 1.svg";

const WritingSection_U1 = () => {
  const [answersA, setAnswersA] = useState({});
  const [answersB, setAnswersB] = useState({
    topic: "",
    who: "",
    what: "",
    when: "",
    where: "",
    how: "",
    why: "",
  });

  const [showTrigger, setShowTrigger] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [locked, setLocked] = useState(false);

  const checkAll = () => {
    if (locked) return;

    // 🛑 validation
    const isAEmpty = Object.values(answersA).some((a) => !a?.trim());
    const isBEmpty = Object.values(answersB).some((a) => !a || a.trim() === "");

    if (isAEmpty || isBEmpty) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    // ====================
    // ✅ CHECK A ONLY
    // ====================

    const correctA = {
      what: "Built the Coral Castle by himself",
      when: "in the 1900s",
      where: "the state of Florida in the U.S",
      how: "Maybe pulleys, or magnets, but no one really knows",
      why: "To build a castle",
    };

    let correct = 0;
    let total = Object.keys(correctA).length;

    Object.keys(correctA).forEach((key) => {
      const userAnswer = answersA[key]?.toLowerCase().trim();
      const rightAnswer = correctA[key].toLowerCase();

      if (userAnswer === rightAnswer) {
        correct++;
      }
    });

    setLocked(true);

    // ====================
    // 🎨 ALERT STYLE
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
      {/* العنوان */}
      <div className="w-[60%] mx-auto mb-4 flex items-center">
        <div
          className="px-4 py-1 font-bold text-black w-fit"
          style={{
            backgroundImage: `url(${ReadingBG})`,
            backgroundSize: "cover",
          }}
        >
          Writing
        </div>
      </div>

      {/* المحتوى */}
      <div className="flex flex-col w-[60%] mx-auto space-y-10">
        <img
          src={img}
          alt=""
          style={{ width: "auto", height: "500px", objectFit: "contain" }}
        />
        <WritingA
          onChange={setAnswersA}
          locked={locked}
          showTrigger={showTrigger}
          resetTrigger={resetTrigger}
        />
        <WritingB
          onChange={setAnswersB}
          locked={locked}
          showTrigger={showTrigger}
          resetTrigger={resetTrigger} // 👈 مهم
        />
        <WritingC resetTrigger={resetTrigger} />
      </div>

      {/* الأزرار */}
      <Button
        checkAnswers={checkAll}
        handleShowAnswer={() => {
          setShowTrigger((p) => p + 1);
          setLocked(true);
        }}
        handleStartAgain={() => {
          setResetTrigger((p) => p + 1);
          setLocked(false);
          setAnswersA({});
          setAnswersB({});
        }}
      />
    </div>
  );
};

export default WritingSection_U1;
