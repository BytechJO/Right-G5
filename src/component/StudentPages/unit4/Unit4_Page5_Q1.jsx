import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import grammer_u1 from "../../../assets/audio/ClassBook/U4/PG 32/cd20pg32.mp3";
import trueImg from "../../../assets/imgs/true.svg";
import flaseImg from "../../../assets/imgs/false.svg";
const Unit4_Page5_Q1 = () => {
  const captions = [
    {
      start: 0.219,
      end: 20.06,
      text: "Page 32, write activities exercise A. Listen and write check or X. For X, write the correct word. We'll check out the boots, but we don't really need to buy them. Joan can play at the jeans all day. The clothes store has many books to choose from. Let's head over to the restaurant for dinner.",
    },
  ];
  const questions = [
    {
      text: "We’ll check out the boots, but we don’t really need to buy them.",
      answer: "✓",
      correction: "",
    },
    {
      text: "Joan can play at the jeans all day.",
      answer: "✕",
      correction: "arcade",
    },
    {
      text: "The clothes store has many books to choose from.",
      answer: "✕",
      correction: "bookstore",
    },
    {
      text: "They are going to the electronics store to find a radio.",
      answer: "✓",
      correction: "",
    },
    {
      text: "Let’s head over to the restaurant for dinner.",
      answer: "✓",
      correction: "",
    },
  ];

  const [answers, setAnswers] = useState(
    questions.map(() => ({
      symbol: "",
      correction: "",
    })),
  );

  const [errors, setErrors] = useState(
    questions.map(() => ({
      symbol: false,
      correction: false,
    })),
  );

  const [correctLocked, setCorrectLocked] = useState(
    questions.map(() => ({
      symbol: false,
      correction: false,
    })),
  );

  const [locked, setLocked] = useState(false);

  // normalize
  const normalize = (text) => {
    return text.trim().toLowerCase().replace(/\s+/g, " ");
  };

  // update field
  const updateField = (index, field, value) => {
    if (correctLocked[index][field]) return;

    const updated = [...answers];
    updated[index][field] = value;

    // اذا حط ✓ فضّي التصحيح
    if (field === "symbol" && value === "✓") {
      updated[index].correction = "";
    }

    setAnswers(updated);

    // شيل الخطأ مباشرة
    const updatedErrors = [...errors];
    updatedErrors[index][field] = false;

    if (field === "symbol" && value === "✓") {
      updatedErrors[index].correction = false;
    }

    setErrors(updatedErrors);
  };

  // check
  const handleCheck = () => {
    if (locked) return;

    const isEmpty = answers.some((a) => {
      // لازم يختار ✓ أو ✕
      if (!a.symbol) return true;

      // فقط إذا الجواب ✕ لازم يكتب التصحيح
      if (normalize(a.symbol) === "✕" && normalize(a.correction) === "") {
        return true;
      }

      return false;
    });

    if (isEmpty) {
      ValidationAlert.info("Complete all fields.");
      return;
    }

    let score = 0;

    const newErrors = answers.map((ans, i) => {
      const symbolCorrect =
        normalize(ans.symbol) === normalize(questions[i].answer);

      const correctionCorrect =
        normalize(ans.correction) === normalize(questions[i].correction);

      const isCheck = questions[i].answer === "✓";

      // ✅ سؤال صح
      if (isCheck) {
        const questionCorrect =
          symbolCorrect && normalize(ans.correction) === "";

        if (questionCorrect) score++;

        return {
          symbol: !symbolCorrect,
          correction: normalize(ans.correction) !== "",
        };
      }

      // ❌ سؤال غلط
      const questionCorrect = symbolCorrect && correctionCorrect;

      if (questionCorrect) score++;

      return {
        symbol: !symbolCorrect,
        correction: !correctionCorrect,
      };
    });

    // lock الصح فقط
    const updatedLocked = answers.map((ans, i) => {
      const symbolCorrect =
        normalize(ans.symbol) === normalize(questions[i].answer);

      const correctionCorrect =
        normalize(ans.correction) === normalize(questions[i].correction);

      const isCheck = questions[i].answer === "✓";

      return {
        symbol: symbolCorrect,

        correction: isCheck
          ? symbolCorrect && normalize(ans.correction) === ""
          : correctionCorrect,
      };
    });

    setErrors(newErrors);
    setCorrectLocked(updatedLocked);

    const total = questions.length;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${score} / ${total}
        </span>
      </div>
    `;

    if (score === total) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (score === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // show answers
  const handleShow = () => {
    setAnswers(
      questions.map((q) => ({
        symbol: q.answer,
        correction: q.correction,
      })),
    );

    setErrors(
      questions.map(() => ({
        symbol: false,
        correction: false,
      })),
    );

    setCorrectLocked(
      questions.map(() => ({
        symbol: true,
        correction: true,
      })),
    );

    setLocked(true);
  };

  // reset
  const handleReset = () => {
    setAnswers(
      questions.map(() => ({
        symbol: "",
        correction: "",
      })),
    );

    setErrors(
      questions.map(() => ({
        symbol: false,
        correction: false,
      })),
    );

    setCorrectLocked(
      questions.map(() => ({
        symbol: false,
        correction: false,
      })),
    );

    setLocked(false);
  };

  return (
    <div
      style={{
        padding: "30px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="div-forall">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-10">
          <span className="ex-A" style={{ marginRight: "10px" }}>
            A
          </span>
          Listen and write <span className="text-[#D1232A]">✓</span> or{" "}
          <span className="text-[#D1232A]">✗</span>. For{" "}
          <span className="text-[#D1232A]">✗</span>, write the correct word.
        </h5>
        <QuestionAudioPlayer
          src={grammer_u1}
          captions={captions}
          stopAtSecond={8.88}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            marginBottom: "70px",
          }}
        >
          {questions.map((q, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                fontSize: "18px",
              }}
            >
              {/* NUMBER */}
              <span style={{ fontWeight: "bold", width: "20px" }}>{i + 1}</span>

              {/* TEXT */}
              <div style={{ flex: 1 }}>
                {i === 0 && (
                  <>
                    We’ll{" "}
                    <span
                      style={{
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                      }}
                    >
                      check out
                    </span>{" "}
                    the boots, but we don’t really need to buy them.
                  </>
                )}

                {i === 1 && (
                  <>
                    Joan can play at the{" "}
                    <span
                      style={{
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                      }}
                    >
                      jeans
                    </span>{" "}
                    all day.
                  </>
                )}

                {i === 2 && (
                  <>
                    The{" "}
                    <span
                      style={{
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                      }}
                    >
                      clothes store
                    </span>{" "}
                    has many books to choose from.
                  </>
                )}

                {i === 3 && (
                  <>
                    They are going to the{" "}
                    <span
                      style={{
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                      }}
                    >
                      electronics
                    </span>{" "}
                    store to find a radio.
                  </>
                )}

                {i === 4 && (
                  <>
                    Let’s{" "}
                    <span
                      style={{
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                      }}
                    >
                      head over
                    </span>{" "}
                    to the restaurant for dinner.
                  </>
                )}
              </div>
              {/* SYMBOL CHOICES */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  position: "relative",
                }}
              >
                {/* ✓ BUTTON */}
                <div
                  onClick={() => {
                    if (!locked && !correctLocked[i]?.symbol) {
                      updateField(
                        i,
                        "symbol",
                        answers[i].symbol === "✓" ? "" : "✓",
                      );
                    }
                  }}
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    border: "2px solid #7b1fa2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor:
                      locked || correctLocked[i]?.symbol
                        ? "default"
                        : "pointer",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#6D2980",
                    userSelect: "none",
                  }}
                >
                  {answers[i].symbol === "✓" && (
                    <img
                      src={trueImg}
                      alt=""
                      style={{
                        width: "24px",
                        height: "24px",
                        objectFit: "contain",
                      }}
                    />
                  )}
                </div>

                {/* ✕ BUTTON */}
                <div
                  onClick={() => {
                    if (!locked && !correctLocked[i]?.symbol) {
                      updateField(
                        i,
                        "symbol",
                        answers[i].symbol === "✕" ? "" : "✕",
                      );
                    }
                  }}
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    border: "2px solid #7b1fa2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor:
                      locked || correctLocked[i]?.symbol
                        ? "default"
                        : "pointer",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#6D2980",
                    userSelect: "none",
                  }}
                >
                  {answers[i].symbol === "✕" && (
                    <img
                      src={flaseImg}
                      alt=""
                      style={{
                        width: "24px",
                        height: "24px",
                        objectFit: "contain",
                      }}
                    />
                  )}
                </div>

                {/* ERROR */}
                {errors[i]?.symbol && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      transform: "translateY(-50%)",
                      width: "22px",
                      height: "22px",
                      background: "#ef4444",
                      color: "white",
                      borderRadius: "50%",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      border: "2px solid white",
                      boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    ✕
                  </span>
                )}
              </div>
              {/* CORRECTION */}
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  value={answers[i].correction}
                  disabled={
                    locked ||
                    correctLocked[i]?.correction ||
                    normalize(answers[i].symbol) === "✓"
                  }
                  onChange={(e) => updateField(i, "correction", e.target.value)}
                  style={{
                    width: "240px",
                    border: "none",
                    borderBottom: errors[i]?.correction
                      ? "1px solid red"
                      : "1px solid black",
                    outline: "none",
                    fontSize: "20px",
                    textAlign: "center",
                    color: "#6D2980",
                    background: "transparent",
                    fontWeight: 600,
                  }}
                />

                {/* ❌ */}
                {errors[i]?.correction && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-20px",
                      transform: "translateY(-50%)",
                      width: "22px",
                      height: "22px",
                      background: "#ef4444",
                      color: "white",
                      borderRadius: "50%",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      border: "2px solid white",
                      boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    ✕
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* BUTTONS */}
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={handleReset}>
            Start Again ↻
          </button>

          <button className="show-answer-btn" onClick={handleShow}>
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

export default Unit4_Page5_Q1;
