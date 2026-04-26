import React, { useState } from "react";
import Rabbit from "../assets/Page 01/Rabbit.svg";

const CriticalThinking = ({title}) => {
  const [answer, setAnswer] = useState("");

  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* السؤال */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src={Rabbit} style={{ height: "50px" }} />
        <h5 className="header-title-page8">
            {title}
          
        </h5>
      </div>

      {/* الانبوت */}
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Write your answer here..."
        style={{
          marginTop: "20px",
          width: "60%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "14px",
        }}
      />
    </div>
  );
};

export default CriticalThinking;