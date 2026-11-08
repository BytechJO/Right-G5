import React, { useState } from "react";
// import Rabbit from "../../assets/Page 01/Rabbit.svg";
import ExerciseHeader from "./ExerciseHeader";
const activationKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault(); event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); event.stopPropagation(); }
  },
};
const fieldKeys = {
  onKeyDown: (event) => { if (event.key === "Enter" || event.key === " ") event.stopPropagation(); },
  onKeyUp: (event) => { if (event.key === "Enter" || event.key === " ") event.stopPropagation(); },
};


const CriticalThinking = ({ title, keyboardAccessible = false }) => {
  const [answer, setAnswer] = useState("");

  const handleReset = () => {
    setAnswer("");
  };

  return (
    <div
      data-critical-access={keyboardAccessible || undefined}
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginTop: "20px",
        }}
      >
        {/* <img
          src={Rabbit}
          style={{ height: "50px", width: "auto", paddingTop: "5px" }}
        /> */}
        {/* <h5 style={{ paddingTop: "8px" }} className="header-title-page8">
          {title}
        </h5> */}
        <ExerciseHeader
          // sectionLetter="D"
          // questionNumber="1"
          title={title}
          subTitle=""
        />
      </div>

      {keyboardAccessible && <style>{`[data-critical-access] textarea:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:8px;}`}</style>}
      {/* input */}
      <textarea
        type="text"
        {...(keyboardAccessible ? {...fieldKeys,"aria-label":typeof title === "string" ? title : "Your critical-thinking response",title:typeof title === "string" ? title : "Your response"} : {})}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Write your answer here..."
        style={{
          margin: "7% 0",
          width: "60%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "14px",
          minHeight: "260px",
        }}
      />
      <div className="action-buttons-container">
        <button type="button" {...(keyboardAccessible?activationKeys:{})} className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>
      </div>
    </div>
  );
};

export default CriticalThinking;