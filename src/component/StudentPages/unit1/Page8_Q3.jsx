import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 8/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 8/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 8/SVG/Asset 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 8/SVG/Asset 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 8/SVG/Asset 5.svg";

const Page8_Q3 = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [locked, setLocked] = useState(false);
  const [selectedSentence, setSelectedSentence] = useState(null);

  const imageRefs = useRef([]);
  const sentenceRefs = useRef([]);
  const containerRef = useRef(null);

  const images = [
    { id: 0, img: img1 },
    { id: 1, img: img2 },
    { id: 2, img: img3 },
    { id: 3, img: img4 },
    { id: 4, img: img5 },
  ];

  const sentences = [
    { id: 0, text: "pancakes" },
    { id: 1, text: "mirror" },
    { id: 2, text: "face" },
    { id: 3, text: "notebook" },
    { id: 4, text: "pillow" },
  ];

  const correct = {
    0: 4,
    1: 1,
    2: 0,
    3: 3,
    4: 2,
  };

  const selectImage = (id) => {
    if (locked || showResult) return;

    // إذا اختار جملة → اربط
    if (selectedSentence !== null) {
      setMatches((prev) => {
        const updated = { ...prev };

        Object.keys(updated).forEach((imgKey) => {
          if (updated[imgKey] === selectedSentence) {
            delete updated[imgKey];
          }
        });

        updated[id] = selectedSentence;
        return updated;
      });

      setSelectedSentence(null);
      return;
    }

    // السلوك القديم (اختيار صورة)
    setSelectedImg(id);
  };

  const selectSentence = (id) => {
    if (locked || showResult) return;

    // إذا في صورة مختارة → اربط
    if (selectedImg !== null) {
      setMatches((prev) => {
        const updated = { ...prev };

        Object.keys(updated).forEach((imgKey) => {
          if (updated[imgKey] === id) {
            delete updated[imgKey];
          }
        });

        updated[selectedImg] = id;
        return updated;
      });

      setSelectedImg(null);
      return;
    }
    setSelectedSentence(id);
  };
  const checkAnswers = () => {
    if (locked || showResult) return;

    if (Object.keys(matches).length !== images.length) {
      ValidationAlert.info("Please match all.");
      return;
    }

    let correctCount = 0;

    Object.entries(matches).forEach(([imgId, sentId]) => {
      if (correct[imgId] === sentId) correctCount++;
    });

    const total = images.length;

    const message = `
        Score: ${correctCount} / ${total}
  `;

    if (correctCount === total) {
      ValidationAlert.success(message);
    } else if (correctCount === 0) {
      ValidationAlert.error(message);
    } else {
      ValidationAlert.warning(message);
    }

    setShowResult(true);
    setLocked(true);
  };

  const showAnswers = () => {
    setMatches(correct);
    setLocked(true);
    setShowResult(true);
  };

  const reset = () => {
    setSelectedSentence(null);
    setSelectedImg(null);
    setMatches({});
    setShowResult(false);
    setLocked(false);
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
        position: "relative",
      }}
    >
      <div
        className="div-forall"
        style={{
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        <h5 className="header-title-page8  mb-12">
          <span className="ex-A mr-2.5">C</span>
          Look, read, and match.{" "}
        </h5>

        <div className="w-full flex flex-col items-center gap-50">
          {/* 🔥 الصور فوق */}
          <div className="grid grid-cols-5 w-full">
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => selectImage(i)}
                className="flex flex-col items-center gap-2 cursor-pointer transition"
              >
                <img
                  src={img.img}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "contain",
                    border:
                      selectedImg === i
                        ? "3px solid #6d2980"
                        : "3px solid transparent",
                    borderRadius: "12px",
                    padding: "4px",
                    backgroundColor:
                      selectedImg === i ? "#6d2980" : "transparent",
                  }}
                />

                <div
                  ref={(el) => (imageRefs.current[i] = el)} // 🔥 الريف هون على الدوت
                  className="w-3 h-3 rounded-full mt-2 transition"
                  style={{
                    backgroundColor: selectedImg === i ? "#00AEEF" : "#00AEEF",
                    transform: selectedImg === i ? "scale(1.4)" : "scale(1)",
                   
                  }}
                ></div>
              </div>
            ))}
          </div>

          {/* 🔥 الجمل تحت */}
          <div className="grid grid-cols-5 w-full">
            {sentences.map((sent, i) => (
              <div
                key={i}
                onClick={() => selectSentence(i)}
                className="relative flex flex-col items-center cursor-pointer"
              >
                {/* 🔥 الدوت */}
                <div
                  ref={(el) => (sentenceRefs.current[i] = el)} // 🔥 هون كمان
                  className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full z-10 transition"
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#00AEEF",
                    transform:
                      selectedSentence === i ? "scale(1.4)" : "scale(1)",
                    boxShadow:
                      selectedSentence === i
                        ? "0 0 0 4px rgba(249,115,22,0.2)"
                        : "none",
                  }}
                ></div>

                {/* 🔥 البوكس */}
                <div
                  className="relative px-4 py-2 rounded-2xl text-sm text-center transition"
                  style={{
                    border:
                      selectedSentence === i
                        ? "2px solid #f97316"
                        : "2px solid transparent",
                  }}
                >
                  {sent.text}
                  {showResult &&
                    Object.entries(matches).some(
                      ([imgId, sentId]) =>
                        sentId == i && correct[imgId] !== sentId,
                    ) && (
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {Object.entries(matches).map(([imgId, sentId], i) => {
          const imgDot = imageRefs.current[imgId];
          const sentDot = sentenceRefs.current[sentId];

          if (!imgDot || !sentDot || !containerRef.current) return null;

          const imgRect = imgDot.getBoundingClientRect();
          const sentRect = sentDot.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();

          const x1 = sentRect.left + sentRect.width / 2 - containerRect.left;
          const y1 = sentRect.top + sentRect.height / 2 - containerRect.top;

          const x2 = imgRect.left + imgRect.width / 2 - containerRect.left;
          const y2 = imgRect.top + imgRect.height / 2 - containerRect.top;
          return (
            <g key={i}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#6d2980"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>
          );
        })}
      </svg>

      <div className="action-buttons-container">
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

export default Page8_Q3;
