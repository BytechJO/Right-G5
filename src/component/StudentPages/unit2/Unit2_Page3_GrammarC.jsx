/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

const GrammarC = () => {
  const [selected, setSelected] = useState(null);
  const [matches, setMatches] = useState({});
  const [lines, setLines] = useState([]);
  const [errors, setErrors] = useState({});
  const [locked, setLocked] = useState(false);
  const left = ["who", "which", "that"];

  const right = [
    "used to describe people and things",
    "used to describe people",
    "used to describe things",
  ];

  const correctB = {
    who: "used to describe people",
    which: "used to describe things",
    that: "used to describe people and things",
  };

  const wrapperRef = useRef(null);
  const leftRefs = useRef({});
  const rightRefs = useRef({});

  const updateLines = (newMatches = matches) => {
    if (!wrapperRef.current) return;

    const wrapperRect = wrapperRef.current.getBoundingClientRect();

    const newLines = Object.entries(newMatches)
      .map(([leftItem, rightItem]) => {
        const leftEl = leftRefs.current[leftItem];
        const rightEl = rightRefs.current[rightItem];

        if (!leftEl || !rightEl) return null;

        const leftRect = leftEl.getBoundingClientRect();
        const rightRect = rightEl.getBoundingClientRect();

        return {
          leftItem,
          rightItem,
          x1: leftRect.right - wrapperRect.left - 6, // 🔥 عند النقطة
          y1: leftRect.top + leftRect.height / 2 - wrapperRect.top,

          x2: rightRect.left - wrapperRect.left + 6, // 🔥 عند النقطة
          y2: rightRect.top + rightRect.height / 2 - wrapperRect.top,
        };
      })
      .filter(Boolean);

    setLines(newLines);
  };

  const handleLeft = (item) => {
    if (locked || matches[item] === correctB[item]) return;
    setSelected(item);
  };

  const handleRight = (item) => {
    if (!selected || locked) return;

    // 🔒 لا تعدل الصح
    if (matches[selected] === correctB[selected]) return;

    setMatches((prev) => {
      const cleaned = Object.fromEntries(
        Object.entries(prev).filter(([_, value]) => {
          // 🔥 لا تحذف الصح
          const leftKey = Object.keys(prev).find((k) => prev[k] === value);

          if (value === item && prev[leftKey] === correctB[leftKey]) {
            return true;
          }

          return value !== item;
        }),
      );

      return {
        ...cleaned,
        [selected]: item,
      };
    });

    // 🔥 امسح الخطأ
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[selected];
      return copy;
    });

    setSelected(null);
  };
  useEffect(() => {
    updateLines();
  }, [matches]);

  useEffect(() => {
    const handleResize = () => updateLines();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [matches]);

  const handleCheck = () => {
    if (locked) return;

    if (Object.keys(matches).length !== left.length) {
      ValidationAlert.info("Please match all items.");
      return;
    }

    let correctCount = 0;
    const newErrors = {};

    left.forEach((item) => {
      if (matches[item] === correctB[item]) {
        correctCount++;
        newErrors[item] = false;
      } else {
        newErrors[item] = true;
      }
    });

    setErrors(newErrors);

    const total = left.length;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
    <div style="font-size:20px;text-align:center;">
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
  const handleShow = () => {
    setMatches(correctB);
    setErrors({});
    setLocked(true);
    setTimeout(() => updateLines(correctB), 0);
  };
  const handleReset = () => {
    setMatches({});
    setSelected(null);
    setLines([]);
    setErrors({});
    setLocked(false);
  };
  const isMatchedLeft = (item) => Object.keys(matches).includes(item);
  const isMatchedRight = (item) => Object.values(matches).includes(item);
  const isWrong = (item) => errors[item];
  return (
    <div>
      <div className="flex items-center gap-3 mb-7">
        <h5 className="header-title-page8-read pb-2.5">
          <span className="ex-A-read" style={{ marginRight: "10px" }}>
            C
          </span>
          Look and match.
        </h5>
      </div>

      <div
        ref={wrapperRef}
        className="relative flex justify-center items-start gap-100 w-full"
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {lines.map((line, i) => (
            <line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#6D2980"
              strokeWidth="2"
            />
          ))}
        </svg>

        <div className="relative z-10 flex flex-col gap-4 w-[10%]  text-[15px] ">
          {left.map((item, i) => (
            <div
              key={item}
              onClick={() => handleLeft(item)}
              className={`relative cursor-pointer flex items-center justify-between px-2 py-1 rounded
                ${selected === item ? "bg-[#E9D5F5]" : ""}
            `}
            >
              {isWrong(item) && (
                <div
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "100%",
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
                    pointerEvents: "none",
                  }}
                >
                  ✕
                </div>
              )}
              <span>
                {i + 1}. {item}
              </span>

              <span
                ref={(el) => (leftRefs.current[item] = el)}
                className={`w-2 h-2 rounded-full ${
                  selected === item || isMatchedLeft(item)
                    ? "bg-blue-500"
                    : "bg-blue-400"
                }`}
              />
            </div>
          ))}
        </div>

        <div className="relative z-10 flex flex-col gap-4 w-[30%]">
          {right.map((item) => (
            <div
              key={item}
              ref={(el) => (rightRefs.current[item] = el)}
              onClick={() => handleRight(item)}
              className="cursor-pointer flex items-center gap-2"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isMatchedRight(item) ? "bg-blue-500" : "bg-blue-400"
                }`}
              />

              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-8">
        {/* Reset */}
        <div className="relative group">
          <div
            onClick={handleReset}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaRedo size={14} />
            </div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Reset
          </span>
        </div>

        {/* Show */}
        <div className="relative group">
          <div
            onClick={handleShow}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaEye size={14} />
            </div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Show Answer
          </span>
        </div>

        {/* Check */}
        <div className="relative group">
          <div
            onClick={handleCheck}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm"
          >
            <div className="bg-white p-3 rounded-full shadow">
              <FaCheck size={14} />
            </div>
          </div>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Check Answer
          </span>
        </div>
      </div>
    </div>
  );
};

export default GrammarC;
