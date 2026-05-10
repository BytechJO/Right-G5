import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ladderImg from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 34/SVG/Asset 17.svg";

const Review3_Page1_Q3 = () => {
  const initialData = [
    {
      number: "1",

      leftWord: "",
      rightWord: "way",

      answer: "",
      correctAnswer: "No way!",

      missingLeft: true,
      missingRight: false,
      correctLeft: "No",

      // POSITIONS
      numberPos: {
        top: "11%",
        left: "-2%",
      },

      leftPos: {
        top: "10%",
        left: "5%",
      },

      rightPos: {
        top: "10%",
        left: "23%",
      },

      answerPos: {
        top: "9%",
        right: "10%",
      },
    },

    {
      number: "2",

      leftWord: "tastes",
      rightWord: "",

      answer: "",
      correctAnswer: "tastes good",

      missingLeft: false,
      missingRight: true,
      correctRight: "good",

      numberPos: {
        top: "24%",
        left: "-2%",
      },

      leftPos: {
        top: "23%",
        left: "6%",
      },

      rightPos: {
        top: "22.5%",
        left: "20%",
      },

      answerPos: {
        top: "22%",
        right: "10%",
      },
    },

    {
      number: "3",

      leftWord: "",
      rightWord: "off",

      answer: "",
      correctAnswer: "top off",

      missingLeft: true,
      missingRight: false,
      correctLeft: "top",

      numberPos: {
        top: "38%",
        left: "-2%",
      },

      leftPos: {
        top: "35.5%",
        left: "5%",
      },

      rightPos: {
        top: "36%",
        left: "23%",
      },

      answerPos: {
        top: "35%",
        right: "10%",
      },
    },

    {
      number: "4",

      leftWord: "try",
      rightWord: "",

      answer: "",
      correctAnswer: "try some",

      missingLeft: false,
      missingRight: true,
      correctRight: "some",

      numberPos: {
        top: "52%",
        left: "-2%",
      },

      leftPos: {
        top: "49%",
        left: "7%",
      },

      rightPos: {
        top: "48.5%",
        left: "20%",
      },

      answerPos: {
        top: "48%",
        right: "10%",
      },
    },

    {
      number: "5",

      leftWord: "",
      rightWord: "yourself",

      answer: "",
      correctAnswer: "help yourself",

      missingLeft: true,
      missingRight: false,
      correctLeft: "help",

      numberPos: {
        top: "66%",
        left: "-2%",
      },

      leftPos: {
        top: "62%",
        left: "5%",
      },

      rightPos: {
        top: "62.5%",
        left: "20%",
      },

      answerPos: {
        top: "61%",
        right: "10%",
      },
    },
  ];

  const [rows, setRows] = useState(initialData);

  const [leftErrors, setLeftErrors] = useState(
    Array(initialData.length).fill(false),
  );

  const [rightErrors, setRightErrors] = useState(
    Array(initialData.length).fill(false),
  );

  const [answerErrors, setAnswerErrors] = useState(
    Array(initialData.length).fill(false),
  );

  const [leftLocked, setLeftLocked] = useState(
    Array(initialData.length).fill(false),
  );

  const [rightLocked, setRightLocked] = useState(
    Array(initialData.length).fill(false),
  );

  const [answerLocked, setAnswerLocked] = useState(
    Array(initialData.length).fill(false),
  );

  const [locked, setLocked] = useState(false);

  // normalize
  const normalize = (text) => {
    return text
      .toLowerCase()
      .replace(/[.,!?]/g, "")
      .trim();
  };

  // typing
  const handleChange = (index, side, value) => {
    const updated = [...rows];

    if (side === "left") {
      if (leftLocked[index]) return;

      updated[index].leftWord = value;

      const updatedErrors = [...leftErrors];
      updatedErrors[index] = false;

      setLeftErrors(updatedErrors);
    } else if (side === "right") {
      if (rightLocked[index]) return;

      updated[index].rightWord = value;

      const updatedErrors = [...rightErrors];
      updatedErrors[index] = false;

      setRightErrors(updatedErrors);
    } else {
      if (answerLocked[index]) return;

      updated[index].answer = value;

      const updatedErrors = [...answerErrors];
      updatedErrors[index] = false;

      setAnswerErrors(updatedErrors);
    }

    setRows(updated);
  };

  // check
  const handleCheck = () => {
    if (locked) return;
    const hasEmpty = rows.some((item) => {
      const leftEmpty = item.missingLeft && normalize(item.leftWord) === "";

      const rightEmpty = item.missingRight && normalize(item.rightWord) === "";

      const answerEmpty = normalize(item.answer) === "";

      return leftEmpty || rightEmpty || answerEmpty;
    });

    if (hasEmpty) {
      ValidationAlert.info();

      return;
    }
    let score = 0;

    const newLeftErrors = [...leftErrors];
    const newRightErrors = [...rightErrors];
    const newAnswerErrors = [...answerErrors];

    const newLeftLocked = [...leftLocked];
    const newRightLocked = [...rightLocked];
    const newAnswerLocked = [...answerLocked];

    rows.forEach((item, index) => {
      // LEFT
      if (item.missingLeft) {
        const correct =
          normalize(item.leftWord) === normalize(item.correctLeft);

        newLeftErrors[index] = !correct;
        newLeftLocked[index] = correct;

        if (correct) score++;
      }

      // RIGHT
      if (item.missingRight) {
        const correct =
          normalize(item.rightWord) === normalize(item.correctRight);

        newRightErrors[index] = !correct;
        newRightLocked[index] = correct;

        if (correct) score++;
      }

      // ANSWER
      const answerCorrect =
        normalize(item.answer) === normalize(item.correctAnswer);

      newAnswerErrors[index] = !answerCorrect;
      newAnswerLocked[index] = answerCorrect;

      if (answerCorrect) score++;
    });

    setLeftErrors(newLeftErrors);
    setRightErrors(newRightErrors);
    setAnswerErrors(newAnswerErrors);

    setLeftLocked(newLeftLocked);
    setRightLocked(newRightLocked);
    setAnswerLocked(newAnswerLocked);

    const total =
      rows.length +
      rows.filter((r) => r.missingLeft).length +
      rows.filter((r) => r.missingRight).length;

    const msg = `Score: ${score} / ${total}`;

    if (score === total) {
      setLocked(true);

      ValidationAlert.success(msg);
    } else if (score === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // show
  const handleShow = () => {
    const updated = rows.map((item) => ({
      ...item,

      leftWord: item.correctLeft || item.leftWord,

      rightWord: item.correctRight || item.rightWord,

      answer: item.correctAnswer,
    }));

    setRows(updated);

    setLeftErrors(Array(initialData.length).fill(false));

    setRightErrors(Array(initialData.length).fill(false));

    setAnswerErrors(Array(initialData.length).fill(false));

    setLeftLocked(Array(initialData.length).fill(true));

    setRightLocked(Array(initialData.length).fill(true));

    setAnswerLocked(Array(initialData.length).fill(true));

    setLocked(true);
  };

  // reset
  const handleReset = () => {
    setRows(initialData);

    setLeftErrors(Array(initialData.length).fill(false));

    setRightErrors(Array(initialData.length).fill(false));

    setAnswerErrors(Array(initialData.length).fill(false));

    setLeftLocked(Array(initialData.length).fill(false));

    setRightLocked(Array(initialData.length).fill(false));

    setAnswerLocked(Array(initialData.length).fill(false));

    setLocked(false);
  };

  const renderX = () => (
    <span
      style={{
        position: "absolute",
        top: "-10px",
        right: "0px",
        width: "20px",
        transform: "translateY(-50%)",
        height: "20px",
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
  );

  return (
    <div
      style={{
        padding: "30px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="div-forall">
        {/* HEADER */}
        <h5 className="header-title-page8 mb-6">
          <span className=" mr-2">C</span>
          The painters can’t climb the ladder. Help them by finishing each step
          with the missing words.
        </h5>

        {/* MAIN */}
        <div className="relative w-full">
          {/* IMAGE */}
          <img
            src={ladderImg}
            alt=""
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
            }}
          />

          {/* ITEMS */}
          {rows.map((item, index) => (
            <React.Fragment key={index}>
              {/* NUMBER */}
              <div
                className="absolute text-[20px] font-bold"
                style={{
                  top: item.numberPos.top,
                  left: item.numberPos.left,
                }}
              >
                {item.number}
              </div>

              {/* LEFT WORD */}
              <div
                className="absolute"
                style={{
                  top: item.leftPos.top,
                  left: item.leftPos.left,
                }}
              >
                {item.missingLeft ? (
                  <span
                    style={{
                      position: "relative",
                    }}
                  >
                    <input
                      type="text"
                      disabled={locked || leftLocked[index]}
                      value={item.leftWord}
                      placeholder="write here"
                      onChange={(e) =>
                        handleChange(index, "left", e.target.value)
                      }
                      className={`w-[5vw] border-b bg-transparent text-center text-[18px] font-semibold outline-none placeholder:text-[1vw]

                      ${
                        leftErrors[index]
                          ? "border-red-500 text-[#6D2980]"
                          : "border-black text-[#6D2980]"
                      }
                    `}
                    />

                    {leftErrors[index] && renderX()}
                  </span>
                ) : (
                  <span className="text-[20px] font-semibold">
                    {item.leftWord}
                  </span>
                )}
              </div>

              {/* RIGHT WORD */}
              <div
                className="absolute"
                style={{
                  top: item.rightPos.top,
                  left: item.rightPos.left,
                }}
              >
                {item.missingRight ? (
                  <span
                    style={{
                      position: "relative",
                    }}
                  >
                    <input
                      type="text"
                      disabled={locked || rightLocked[index]}
                      value={item.rightWord}
                      placeholder="write here"
                      onChange={(e) =>
                        handleChange(index, "right", e.target.value)
                      }
                      className={`w-[5vw] border-b bg-transparent text-center text-[18px] font-semibold outline-none placeholder:text-[1vw]

                      ${
                        rightErrors[index]
                          ? "border-red-500 text-[#6D2980]"
                          : "border-black text-[#6D2980]"
                      }
                    `}
                    />

                    {rightErrors[index] && renderX()}
                  </span>
                ) : (
                  <span className="text-[20px] font-semibold">
                    {item.rightWord}
                  </span>
                )}
              </div>

              {/* ANSWER */}
              <div
                className="absolute"
                style={{
                  top: item.answerPos.top,
                  right: item.answerPos.right,
                }}
              >
                <span
                  style={{
                    position: "relative",
                  }}
                >
                  <input
                    type="text"
                    disabled={locked || answerLocked[index]}
                    value={item.answer}
                    placeholder="write here"
                    onChange={(e) =>
                      handleChange(index, "answer", e.target.value)
                    }
                    className={`w-[10vw] border-b bg-transparent text-center text-[20px] font-semibold outline-none placeholder:text-[1vw]

                    ${
                      answerErrors[index]
                        ? "border-red-500 text-[#6D2980]"
                        : "border-black text-[#6D2980]"
                    }
                  `}
                  />

                  {answerErrors[index] && renderX()}
                </span>
              </div>
            </React.Fragment>
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

export default Review3_Page1_Q3;
