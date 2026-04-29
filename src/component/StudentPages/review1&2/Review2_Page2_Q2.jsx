import React, { useState } from "react";

const Review2_Page2_Q2 = () => {
  const [answers, setAnswers] = useState(["", "", "", ""]);

  const handleChange = (i, val) => {
    const updated = [...answers];
    updated[i] = val;
    setAnswers(updated);
  };

  const handleReset = () => {
    setAnswers(["", "", "", ""]);
  };

  const input = (i, width = "300px") => (
    <input
      value={answers[i]}
      onChange={(e) => handleChange(i, e.target.value)}
      style={{
        display: "inline-block", // 🔥 مهم
        width: width, // 🔥 نتحكم بالطول
        borderBottom: "2px solid black",
        outline: "none",
        fontSize: "18px",
        color: "#6D2980",
        fontWeight: "bold",
        background: "transparent",
        margin: "0 6px",
      }}
    />
  );

  return (
    <div style={{ padding: "30px", display: "flex", justifyContent: "center" }}>
      <div className="div-forall">
        <h5 className="header-title-page8 mb-25">
          <span className="mr-3">E</span>
          Add a relative clause that tells about the noun next to it.
        </h5>

        {/* الأسئلة */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "50px",
            fontSize: "20px",
          }}
        >
          <div>
            <span style={{ fontWeight: "bold", marginRight: "10px" }}>1</span>I
            found a small bird {input(0, "400px")}.
          </div>

          <div>
            <span style={{ fontWeight: "bold", marginRight: "10px" }}>2</span>
            Does Jimmy, {input(1, "300px")}, live in this neighborhood?
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <span style={{ fontWeight: "bold", marginRight: "10px" }}>3</span>
              Perhaps someone can bake a cake for Sally’s birthday,
            </div>

            {/* 🔥 السطر الثاني */}
            <div style={{ marginLeft: "30px" }}>{input(2, "600px")}.</div>
          </div>

          <div>
            <span style={{ fontWeight: "bold", marginRight: "10px" }}>4</span>
            If we have a race, maybe Tim, {input(3, "350px")}, could win it.
          </div>
        </div>

        {/* 🔄 Reset */}
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={handleReset}>
            Start Again ↻
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review2_Page2_Q2;
