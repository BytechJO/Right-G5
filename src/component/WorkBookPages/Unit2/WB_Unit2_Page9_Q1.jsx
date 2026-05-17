import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U2/Page 9/SVG/Asset 11.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U2/Page 9/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U2/Page 9/SVG/Asset 3.svg";
import img4 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U2/Page 9/SVG/Asset 4.svg";
import img5 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U2/Page 9/SVG/Asset 5.svg";
import img6 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U2/Page 9/SVG/Asset 11.svg";
const WB_Unit2_Page9_Q1 = () => {
  const questions = [
    {
      answer: "carnival",
      options: ["couple", "merry-go-round", "carnival"],
      image: img1,
    },
    {
      answer: "trims",
      options: ["first thing", "crazy", "trims"],
      image: img2,
    },
    {
      answer: "beg",
      options: ["still", "beg", "keep my feet on the ground"],
      image: img3,
    },
    {
      answer: "first thing",
      options: ["twisty", "first thing", "few"],
      image: img4,
    },
    {
      answer: "merry-go-round",
      options: ["merry-go-round", "giraffe", "carnival"],
      image: img5,
    },
    {
      answer: "twisty",
      options: ["still", "not so fast", "twisty"],
      image: img6,
    },
  ];

  const [selected, setSelected] = useState(["", "", "", "", "", ""]);

  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const handleSelect = (i, option) => {
    if (locked || result[i] === true) return;

    const updatedSelected = [...selected];

    updatedSelected[i] = option;

    setSelected(updatedSelected);

    const updatedAnswers = [...answers];

    updatedAnswers[i] = option;

    setAnswers(updatedAnswers);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = selected.some((s) => !s);

    if (hasEmpty) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newResults = selected.map((s, i) => {
      const ok = s.toLowerCase() === questions[i].answer.toLowerCase();

      if (ok) correctCount++;

      return ok;
    });

    setResult(newResults);

    const total = questions.length;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:18px;text-align:center;">
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

  const showAnswers = () => {
    const solved = questions.map((q) => q.answer);

    setSelected(solved);

    setAnswers(solved);

    setResult([true, true, true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setSelected(["", "", "", "", "", ""]);

    setAnswers(["", "", "", "", "", ""]);

    setResult([]);

    setLocked(false);
  };

  const inputField = (i, width) => (
    <div className="relative inline-block">
      <input
        type="text"
        value={answers[i]}
        readOnly
        className={`
          ${width}
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6D2980]
          font-semibold
          px-1

          ${result[i] === false ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            width: "20px",
            height: "20px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
          }}
        >
          ✕
        </span>
      )}
    </div>
  );

  const optionCircle = (i, option) => {
    const active = selected[i] === option;

    return (
      <button
        type="button"
        disabled={locked || result[i] === true}
        onClick={() => handleSelect(i, option)}
        style={{
          position: "relative",
          background: "transparent",
          border: "none",
          fontSize: "18px",
          cursor: locked || result[i] === true ? "default" : "pointer",
          color: "black",
          textAlign: "left",
          width: "fit-content",
        }}
      >
        {option}

        {active && (
          <span
            style={{
              position: "absolute",
              top: "-6px",
              left: "-10px",
              width: "calc(100% + 20px)",
              height: "calc(100% + 12px)",
              border: "3px solid #6D2980",
              borderRadius: "50%",
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
            }}
          />
        )}
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall text-[18px]">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-10">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            A
          </span>
          Read, look, and circle.
        </h5>

        {/* QUESTIONS */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-10 whitespace-nowrap w-[110%] mb-15">
          {/* 1 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-bold">1</span>

              <span>The</span>

              {inputField(0, "w-[180px]")}

              <span>had fun rides!</span>
            </div>

            <div className="flex gap-4">
              <img
                src={questions[0].image}
                alt="ferris-wheel"
                style={{
                  width: "165px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />

              <div
                style={{
                  border: "2px solid #7D3C98",
                  borderRadius: "10px",
                  padding: "12px 18px",
                  width: "230px",
                }}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <span className="font-bold">a</span>

                    {optionCircle(0, "couple")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">b</span>

                    {optionCircle(0, "merry-go-round")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">c</span>

                    {optionCircle(0, "carnival")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-bold">2</span>

              <span>The gardener always</span>

              {inputField(1, "w-[150px]")}
              <span>our trees.</span>
            </div>

            <div className="flex gap-4">
              <img
                src={questions[1].image}
                alt="gardener"
                alt="father-son"
                style={{
                  width: "165px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />

              <div
                style={{
                  border: "2px solid #7D3C98",
                  borderRadius: "10px",
                  padding: "12px 18px",
                  width: "220px",
                }}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <span className="font-bold">a</span>

                    {optionCircle(1, "first thing")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">b</span>

                    {optionCircle(1, "crazy")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">c</span>

                    {optionCircle(1, "trims")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-bold">3</span>

              <span>I</span>

              {inputField(2, "w-[160px]")}

              <span>my dad to take us</span>
            </div>

            <div className="ml-7 mb-4">to fun places on the weekend.</div>

            <div className="flex gap-4">
              <img
                src={questions[2].image}
                alt="father-son"
                style={{
                  width: "180px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />

              <div
                style={{
                  border: "2px solid #7D3C98",
                  borderRadius: "10px",
                  padding: "12px 18px",
                  width: "220px",
                  height: "150px",
                }}
              >
                <div className="flex flex-col gap-3 whitespace-normal">
                  <div className="flex gap-3">
                    <span className="font-bold">a</span>

                    {optionCircle(2, "still")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">b</span>

                    {optionCircle(2, "beg")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">c</span>

                    {optionCircle(2, "keep my feet on the ground")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-bold">4</span>

              <span>We are going to Europe</span>

              {inputField(3, "w-[150px]")}
            </div>

            <div className="ml-7 mb-4">this summer!</div>

            <div className="flex gap-4">
              <img
                src={questions[3].image}
                alt="europe"
                style={{
                  width: "180px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />

              <div
                style={{
                  border: "2px solid #7D3C98",
                  borderRadius: "10px",
                  padding: "12px 18px",
                  width: "210px",
                  height: "150px",
                }}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <span className="font-bold">a</span>

                    {optionCircle(3, "twisty")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">b</span>

                    {optionCircle(3, "first thing")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">c</span>

                    {optionCircle(3, "few")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-bold">5</span>

              <span>The</span>

              {inputField(4, "w-[220px]")}
            </div>

            <div className="ml-7 mb-4">is one of my favorite rides.</div>

            <div className="flex gap-4">
              <img
                src={questions[4].image}
                alt="merry-go-round"
                style={{
                  width: "165px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />

              <div
                style={{
                  border: "2px solid #7D3C98",
                  borderRadius: "10px",
                  padding: "12px 18px",
                  width: "240px",
                }}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <span className="font-bold">a</span>

                    {optionCircle(4, "merry-go-round")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">b</span>

                    {optionCircle(4, "giraffe")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">c</span>

                    {optionCircle(4, "carnival")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 6 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-bold">6</span>

              <span>I’m scared of</span>

              {inputField(5, "w-[150px]")}
            </div>

            <div className="ml-7 mb-4">rides.</div>

            <div className="flex gap-4">
              <img
                src={questions[5].image}
                alt="rollercoaster"
                style={{
                  width: "165px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />

              <div
                style={{
                  border: "2px solid #7D3C98",
                  borderRadius: "10px",
                  padding: "12px 18px",
                  width: "220px",
                }}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <span className="font-bold">a</span>

                    {optionCircle(5, "still")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">b</span>

                    {optionCircle(5, "not so fast")}
                  </div>

                  <div className="flex gap-3">
                    <span className="font-bold">c</span>

                    {optionCircle(5, "twisty")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>

        <button className="show-answer-btn" onClick={showAnswers}>
          Show Answer
        </button>

        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default WB_Unit2_Page9_Q1;
