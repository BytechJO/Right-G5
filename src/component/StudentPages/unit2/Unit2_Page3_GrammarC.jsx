/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";

const GrammarC = ({ onChange, showTrigger, resetTrigger,  result }) => {
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

  const [selected, setSelected] = useState(null);
  const [matches, setMatches] = useState({});
  const [lines, setLines] = useState([]);

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
    if (result && result[item] === true) return; // 🔒 الصح بس
    setSelected(item);
  };

  const handleRight = (item) => {
    if (!selected) return;

    // 🔥 إذا العنصر المختار صح → لا تعدل
    if (result && result[selected] === true) return;
    setMatches((prev) => {
      // 🔥 احذف أي عنصر مربوط بنفس الـ right
      const cleaned = Object.fromEntries(
        Object.entries(prev).filter(([ value]) => value !== item),
      );

      return {
        ...cleaned,
        [selected]: item,
      };
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

  useEffect(() => {
    if (!showTrigger) return;

    setMatches(correctB);
    setSelected(null);
    setTimeout(() => updateLines(correctB), 0);
  }, [showTrigger]);

  useEffect(() => {
    if (!resetTrigger) return;

    setMatches({});
    setSelected(null);
    setLines([]);
  }, [resetTrigger]);

  useEffect(() => {
    onChange(matches);
  }, [matches]);

  const isMatchedLeft = (item) => Object.keys(matches).includes(item);
  const isMatchedRight = (item) => Object.values(matches).includes(item);
  const isWrong = (item) => result && result[item] === false;
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
    </div>
  );
};

export default GrammarC;
