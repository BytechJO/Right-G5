import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U1/Page 4/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U1/Page 4/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U1/Page 4/SVG/Asset 3.svg";

const WB_Unit1_Page4_Q2 = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [locked, setLocked] = useState(false);
  const [validatedMatches, setValidatedMatches] = useState({});
  const imageRefs = useRef([]);
  const sentenceRefs = useRef([]);
  const containerRef = useRef(null);

  const images = [
    { id: 0, img: img1 },
    { id: 1, img: img2 },
    { id: 2, img: img3 },
  ];

  const sentences = [
    { id: 0, text: "mirror" },
    { id: 1, text: "pancakes" },
    { id: 2, text: "notebook" },
  ];

  const correct = {
    0: 2,
    1: 0,
    2: 1,
  };

  const selectImage = (id) => {
    if (showResult && validatedMatches[id] === correct[id]) return;

    setSelectedImg(id);

    // أول ما يبدأ يعدل شيل التقييم القديم
    setValidatedMatches((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const selectSentence = (id) => {
    if (selectedImg === null) return;

    // إذا الصورة مثبتة صح لا تعدلها
    if (showResult && validatedMatches[selectedImg] === correct[selectedImg]) {
      setSelectedImg(null);
      return;
    }

    // إذا الجملة مثبتة صح لا تستخدمها
    const alreadyCorrectlyUsed =
      showResult &&
      Object.entries(validatedMatches).some(
        ([imgId, sentId]) =>
          Number(sentId) === id &&
          correct[imgId] === Number(sentId) &&
          Number(imgId) !== selectedImg,
      );

    if (alreadyCorrectlyUsed) {
      return;
    }

    setMatches((prev) => {
      const updated = { ...prev };

      // احذف الربط القديم لنفس الكلمة
      Object.keys(updated).forEach((imgKey) => {
        // إذا الكلمة مستخدمة بصورة ثانية
        if (updated[imgKey] === id) {
          // إذا الصورة مثبتة صح لا تحذفها
          if (showResult && validatedMatches[imgKey] === correct[imgKey]) {
            return;
          }

          // غير هيك احذف الربط القديم
          delete updated[imgKey];
        }
      });

      updated[selectedImg] = id;

      return updated;
    });

    setSelectedImg(null);
  };
  const checkAnswers = () => {
    if (locked) return;

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
      setLocked(true);
      ValidationAlert.success(message);
    } else if (correctCount === 0) {
      ValidationAlert.error(message);
    } else {
      ValidationAlert.warning(message);
    }
    setValidatedMatches(matches);
    setShowResult(true);
  };

  const showAnswers = () => {
    setMatches(correct);
    setLocked(true);
    setShowResult(true);
  };

  const reset = () => {
    setSelectedImg(null);
    setValidatedMatches({});
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
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        <h5 className="header-title-page8  mb-12">
          <span className="ex-A mr-2.5">D</span>
          Look, read, and match.{" "}
        </h5>

        <div className="w-full flex flex-col items-center gap-50">
          {/* 🔥 الصور فوق */}
          <div className="grid grid-cols-3 w-full">
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => selectImage(i)}
                className="relative  flex flex-col items-center gap-2 cursor-pointer transition"
              >
                <img
                  src={img.img}
                  style={{
                    width: "200px",
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
                {showResult &&
                  validatedMatches[i] !== undefined &&
                  correct[i] !== validatedMatches[i] && (
                    <span
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        width: "20px",
                        height: "20px",
                        background: "#ef4444",
                        color: "white",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        fontWeight: "bold",
                        border: "2px solid white",
                        boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                        zIndex: 5,
                      }}
                    >
                      ✕
                    </span>
                  )}
                <div
                  ref={(el) => (imageRefs.current[i] = el)} // 🔥 الريف هون على الدوت
                  className="w-3 h-3 rounded-full mt-2 transition"
                  style={{
                    backgroundColor: selectedImg === i ? "#6d2980" : "#6d2980",
                    transform: selectedImg === i ? "scale(1.4)" : "scale(1)",
                  }}
                ></div>
              </div>
            ))}
          </div>

          {/* 🔥 الجمل تحت */}
          <div className="grid grid-cols-3 w-full">
            {sentences.map((sent, i) => (
              <div
                key={i}
                onClick={() => selectSentence(i)}
                className="relative flex flex-col items-center cursor-pointer "
              >
                {/* 🔥 الدوت */}
                <div
                  ref={(el) => (sentenceRefs.current[i] = el)} // 🔥 هون كمان
                  className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full z-10 transition"
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#6d2980",
                  }}
                ></div>

                {/* 🔥 البوكس */}
                <div className="relative px-4 py-2 rounded-2xl text-sm text-center transition text-[20px]">
                  <span className="font-bold mr-3">{i + 1}</span>
                  {sent.text}
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

export default WB_Unit1_Page4_Q2;
