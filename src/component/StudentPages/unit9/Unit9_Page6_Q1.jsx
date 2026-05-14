import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const Unit9_Page6_Q1 = () => {
  const matchingAnswers = ["b", "d", "c", "a"];

  const sentenceAnswers = [
    "If someone invents a tire that won’t go flat, everyone will probably buy it.",
    "If William knows how to build a tree house, he can build one this summer.",
    "When Bryan gets his pilot’s license, he will fly us to Toledo.",
    "If that team plays just a little harder, they might win the game.",
  ];

  const [matchingInputs, setMatchingInputs] = useState(["", "", "", ""]);

  const [sentenceInputs, setSentenceInputs] = useState(["", "", "", ""]);

  const [matchingResult, setMatchingResult] = useState([]);

  const [sentenceResult, setSentenceResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[.?!,’']/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const handleMatchingChange = (i, value) => {
    if (locked || matchingResult[i] === true) return;

    const updated = [...matchingInputs];

    updated[i] = value;

    setMatchingInputs(updated);

    setMatchingResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const handleSentenceChange = (i, value) => {
    if (locked || sentenceResult[i] === true) return;

    const updated = [...sentenceInputs];

    updated[i] = value;

    setSentenceInputs(updated);

    setSentenceResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const checkAnswers = () => {
    if (locked) return;

    const hasEmptyMatching = matchingInputs.some((a) => !a.trim());

    const hasEmptySentences = sentenceInputs.some((a) => !a.trim());

    if (hasEmptyMatching || hasEmptySentences) {
      ValidationAlert.info("Please complete all answers.");

      return;
    }

    let correctCount = 0;

    const newMatchingResults = matchingInputs.map((a, i) => {
      const ok = normalize(a) === normalize(matchingAnswers[i]);

      if (ok) correctCount++;

      return ok;
    });

    const newSentenceResults = sentenceInputs.map((a, i) => {
      const ok = normalize(a) === normalize(sentenceAnswers[i]);

      if (ok) correctCount++;

      return ok;
    });

    setMatchingResult(newMatchingResults);

    setSentenceResult(newSentenceResults);

    const total = matchingAnswers.length + sentenceAnswers.length;

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
    setMatchingInputs(["b", "d", "c", "a"]);

    setSentenceInputs([
      "If someone invents a tire that won’t go flat, everyone will probably buy it.",
      "If William knows how to build a tree house, he can build one this summer.",
      "When Bryan gets his pilot’s license, he will fly us to Toledo.",
      "If that team plays just a little harder, they will win the game.",
    ]);

    setMatchingResult([true, true, true, true]);

    setSentenceResult([true, true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setMatchingInputs(["", "", "", ""]);

    setSentenceInputs(["", "", "", ""]);

    setMatchingResult([]);

    setSentenceResult([]);

    setLocked(false);
  };

  const matchingInput = (i) => (
    <span className="relative inline-block">
      <input
        type="text"
        maxLength={1}
        value={matchingInputs[i]}
        disabled={locked || matchingResult[i] === true}
        onChange={(e) => handleMatchingChange(i, e.target.value)}
        className={`
          w-[55px]
          border-0
          border-b
          outline-none
          bg-transparent
          text-center
          text-[18px]
          text-[#6D2980]
          font-semibold

          ${matchingResult[i] === false ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {matchingResult[i] === false && (
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
    </span>
  );

  const sentenceInput = (i, width) => (
    <span className="relative inline-block">
      <input
        type="text"
        value={sentenceInputs[i]}
        disabled={locked || sentenceResult[i] === true}
        onChange={(e) => handleSentenceChange(i, e.target.value)}
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

          ${sentenceResult[i] === false ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {sentenceResult[i] === false && (
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
    </span>
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-10">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            D
          </span>
          Match the two sentence parts, and then write the whole sentence below.
        </h5>

        {/* MATCHING */}
        <div className="flex justify-between mb-10">
          {/* LEFT */}
          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-4">
              {matchingInput(0)}

              <div className="flex gap-4">
                <span className="font-bold text-[18px]">1</span>

                <span className="text-[18px] leading-normal ">
                  If someone invents a tire that won’t go flat,
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              {matchingInput(1)}

              <div className="flex gap-4">
                <span className="font-bold text-[18px]">2</span>

                <span className="text-[18px] leading-normal">
                  If William knows how to build a tree house,
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              {matchingInput(2)}

              <div className="flex gap-4">
                <span className="font-bold text-[18px]">3</span>

                <span className="text-[18px] leading-normal">
                  When Bryan gets his pilot’s license,
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              {matchingInput(3)}

              <div className="flex gap-4">
                <span className="font-bold text-[18px]">4</span>

                <span className="text-[18px] leading-normal">
                  If that team plays just a little harder,
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-8 mr-[60px]">
            <div className="flex gap-4">
              <span className="font-bold text-[18px]">a</span>

              <span className="text-[18px]">they might win the game.</span>
            </div>

            <div className="flex gap-4">
              <span className="font-bold text-[18px]">b</span>

              <span className="text-[18px]">
                everyone will probably buy it.
              </span>
            </div>

            <div className="flex gap-4">
              <span className="font-bold text-[18px]">c</span>

              <span className="text-[18px]">he will fly us to Toledo.</span>
            </div>

            <div className="flex gap-4">
              <span className="font-bold text-[18px]">d</span>

              <span className="text-[18px]">he can build one this summer.</span>
            </div>
          </div>
        </div>

        {/* SENTENCES */}
        <div className="flex flex-col gap-8">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="font-bold text-[18px]">{i + 1}</span>

              {sentenceInput(i, "w-[780px]")}
            </div>
          ))}
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

export default Unit9_Page6_Q1;
