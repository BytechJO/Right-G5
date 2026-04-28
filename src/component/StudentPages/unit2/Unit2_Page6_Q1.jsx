import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 15/SVG/Asset 8.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 15/SVG/Asset 9.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 15/SVG/Asset 10.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 15/SVG/Asset 11.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 15/SVG/Asset 12.svg";
import grammer_u1 from "../../../assets/audio/ClassBook/U2/PG 15/sound_P15.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const Page9_Q3 = () => {
  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);

  // ✅ الإجابات الصح
  const correct = ["d", "c", "b", "e", "a"];
  const captions = [
    {
      start: 0.319,
      end: 44.899,
      text: "Page 15, Write Activities, Exercise C. Listen, read, and match. The carnival comes to town this week, and the children are very excited. Tom is helping his dad with the car engine on Monday, so he is going to the carnival on Tuesday. Hansel goes to the carnival and hopes to get a trophy on Friday. Sarah is going to the carnival and riding the Ferris wheel on Monday. Sarah's dad takes care of his responsibilities on Wednesday, so he can go with her on Monday. Harley gets a trophy with his soccer team on Tuesday at the carnival, and Hansel eats apple pie on that day because it's his birthday. Helen's mom is sending her to get oil for the fridge motor next Monday. So after that, Helen is going to the carnival.",
    },
  ];
  const handleChange = (i, val) => {
    const updated = [...answers];
    updated[i] = val.toLowerCase();
    setAnswers(updated);

    // 🔥 امسح حالة الغلط أول ما يعدّل
    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  const input = (i) => (
    <span className="relative mx-2">
      <input
        disabled={locked || result[i] === true}
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        maxLength={1}
        className={`w-[40px] border-b outline-none text-center font-bold uppercase
        ${result[i] === false ? "border-red-500 text-[#6D2980]" : "border-black text-[#6D2980]"}
      `}
      />

      {/* ❌ */}
      {result[i] === false && (
        <span
          style={{
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
            zIndex: 3,
          }}
        >
          ✕
        </span>
      )}
    </span>
  );

  // ====================
  // ✅ CHECK
  // ====================
  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;

    const res = answers.map((a, i) => {
      const ok = a === correct[i];
      if (ok) correctCount++;
      return ok;
    });

    setResult(res);

    const total = correct.length;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // ====================
  // 👀 SHOW ANSWERS
  // ====================
  const showAnswers = () => {
    setAnswers(correct);
    setLocked(true);
    setResult([true, true, true, true, true]);
  };

  // ====================
  // 🔄 RESET
  // ====================
  const reset = () => {
    setAnswers(["", "", "", "", ""]);
    setLocked(false);
    setResult([]);
  };

  return (
    <div className="p-8 flex flex-col items-center">
        <div className="div-forall">
        <h5 className="header-title-page8 mb-10">
          <span className="ex-A mr-2">C</span>
          Listen, read, and match
        </h5>
        <QuestionAudioPlayer
          src={grammer_u1}
          captions={captions}
          stopAtSecond={6.6}
        />
        <div className="flex justify-between w-full text-[18px] mb-10">
          {" "}
          {/* LEFT */}
          <div className="space-y-25">
            <div>
              {input(0)} <span className="font-bold mr-2">1</span> Who goes to
              the carnival and probably wins a trophy on Friday?
            </div>

            <div>
              {input(1)} <span className="font-bold mr-2 ">2</span> Who is
              helping his dad with the car engine?
            </div>

            <div>
              {input(2)} <span className="font-bold mr-2">3</span> Who gets a
              trophy on Tuesday?
            </div>

            <div>
              {input(3)} <span className="font-bold mr-2">4</span> Who gets a
              trophy on Tuesday?
            </div>

            <div>
              {input(4)} <span className="font-bold mr-2">5</span> Who eats
              apple pie on his birthday?
            </div>
          </div>
          {/* RIGHT */}
          <div className="space-y-10 flex flex-col items-end">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={img1}
                alt=""
                style={{ height: "80px", objectFit: "contain" }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={img2}
                alt=""
                style={{ height: "80px", objectFit: "contain" }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={img3}
                alt=""
                style={{ height: "80px", objectFit: "contain" }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={img4}
                alt=""
                style={{ height: "80px", objectFit: "contain" }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={img5}
                alt=""
                style={{ height: "80px", objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="action-buttons-container mt-6">
        <button className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>

        <button onClick={showAnswers} className="show-answer-btn">
          Show Answer
        </button>

        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Page9_Q3;
