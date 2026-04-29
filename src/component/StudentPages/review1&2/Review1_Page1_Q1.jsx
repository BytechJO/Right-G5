import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Page_Read_Write = () => {
  const words = ["actually", "pancakes", "starving", "alarm", "face"];

  const correct = ["pancakes", "alarm", "face", "starving", "actually"];

  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  // ✅ CHECK
  const handleCheck = () => {
    if (locked) return;

    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Complete all answers.");
      return;
    }

    let correctCount = 0;
 const normalize = (s) => s.toLowerCase().replace(/[.,]/g, "").trim();
    const res = answers.map((a, i) => {
      const ok = normalize(a) === normalize(correct[i]);
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

  // 👀 SHOW
  const handleShow = () => {
    setAnswers(correct);
    setResult([]);
    setLocked(true);
  };

  // 🔄 RESET
  const handleReset = () => {
    setAnswers(["", "", "", "", ""]);
    setResult([]);
    setLocked(false);
  };

  // 🎯 input line
  const input = (i, width = "w-[200px]") => (
    <span className="relative inline-block mx-2">
      <input
        value={answers[i]}
        onChange={(e) => {
          if (result[i] === true) return;

          const updated = [...answers];
          updated[i] = e.target.value;
          setAnswers(updated);

          // 🔥 يمسح الخطأ
          setResult((prev) => {
            const copy = [...prev];
            copy[i] = undefined;
            return copy;
          });
        }}
        className={`border-b-1 outline-none text-center text-[#6D2980] font-semibold bg-transparent
        ${result[i] === false ? "border-red-500" : "border-black"}
        ${width}`}
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div className="div-forall">
        <h5 className="header-title-page8">
          <span className="mr-3 mb-20">A</span>
          Read and write the correct word.
        </h5>

        <div className="flex justify-between gap-10">
          {/* LEFT */}
          <div className="space-y-12 text-[18px] ">
            <div>
              {" "}
              <span className="mr-3 font-bold">1</span> I wanted to have syrup
              on my {input(0)}.
            </div>

            <div>
              {" "}
              <span className="mr-3 font-bold">2</span> I set the {input(1)} so
              I could wake up.
            </div>

            <div>
              {" "}
              <span className="mr-3 font-bold">3</span> Tim is going to wash his{" "}
              {input(2)}.
            </div>

            <div>
              {" "}
              <span className="mr-3 font-bold">4</span> Jake was {input(3)}{" "}
              after not eating all day.
            </div>

            <div className="flex items-start gap-3">
              <span className="font-bold w-[20px]">5</span>

              <div className="flex-1">
                Megan was {input(4)} very happy because her cousin would visit
                soon.
              </div>
            </div>
          </div>

          {/* RIGHT WORD BANK */}
          <div className="bg-[#E8E1EC]  rounded-xl flex flex-col gap-3 text-[18px] h-80 w-[150px] ">
            {words.map((w, i) => (
              <div key={i} className="px-4 py-3 rounded-lg text-center">
                {w}
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="action-buttons-container mt-6">
          <button className="try-again-button" onClick={handleReset}>
            Start Again ↻
          </button>

          <button onClick={handleShow} className="show-answer-btn">
            Show Answer
          </button>

          <button className="check-button2" onClick={handleCheck}>
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page_Read_Write;
