import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";

const Review2_Page2_Q3 = () => {
  const [answers, setAnswers] = useState(["", "", ""]);
  const [result, setResult] = useState([]);
  const [locked, setLocked] = useState(false);

  const correct = [
    "Mary, who is a good teacher, works at the school in our neighborhood.",
    "I think the repairman fixed the computer that was broken.",
    "We went to the restaurant that had just opened yesterday.",
  ];

  const normalize = (t) => t.toLowerCase().replace(/[.,]/g, "").trim();

  const handleChange = (i, val) => {
    if (result[i] === true) return;

    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  const handleCheck = () => {
    if (locked) return;

    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Complete all answers.");
      return;
    }

    let correctCount = 0;

    const res = answers.map((a, i) => {
      const ok = normalize(a) === normalize(correct[i]);
      if (ok) correctCount++;
      return ok;
    });

    setResult(res);

    const msg = `Score: ${correctCount} / 3`;

    if (correctCount === 3) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const handleShow = () => {
    setAnswers(correct);
    setResult([]);
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(["", "", ""]);
    setResult([]);
    setLocked(false);
  };

  const input = (i) => (
    <span style={{position:"relative "}}>
      <input
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        disabled={result[i] === true}
        style={{
          width: "100%",
          borderBottom:
            result[i] === false ? "1px solid red" : "1px solid black",
          outline: "none",
          fontSize: "18px",
          fontWeight: "bold",
          color: "#6D2980",
          background: "transparent",
        }}
      />
      {result[i] === false && answers[i] && (
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
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* HEADER */}
        <h5 className="header-title-page8 mb-20">
          <span className="mr-2">F</span>
          Make one sentence into a relative clause, and then rewrite the
          sentence.
        </h5>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-15 text-[20px]">
          {/* 1 */}
          <div>
            <div>
              <span className="font-bold mr-3">1</span>
              Mary is a good teacher. She works at the school in our
              neighborhood.
            </div>

            <div className="ml-[30px] mt-10">{input(0)}</div>
          </div>

          {/* 2 */}
          <div>
            <div>
              <span className="font-bold mr-3">2</span>I think the repairman
              fixed the computer. The computer was broken.
            </div>

            <div className="ml-[30px] mt-2">{input(1)}</div>
          </div>

          {/* 3 */}
          <div>
            <div>
              <span className="font-bold mr-3">3</span>
              We went to the restaurant. The restaurant had just opened
              yesterday.
            </div>

            <div className="ml-[30px] mt-2">{input(2)}</div>
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <Button
        handleShowAnswer={handleShow}
        handleStartAgain={handleReset}
        checkAnswers={handleCheck}
      />
    </div>
  );
};

export default Review2_Page2_Q3;
