import React, { useRef, useState } from "react";

const WB_Unit3_Page18_Q1 = () => {
  const words = [
    "cheerful",
    "serious",
    "easy-going",
    "determined",
    "friendly",
    "light-haired",

    "patient",
    "impatient",
    "hard-working",
    "quiet",
    "red-haired",
    "dark-haired",

    "blonde",
    "blue-eyed",
    "brown-eyed",
    "black-eyed",
    "funny",
    "talkative",
  ];

  const [selectedWords, setSelectedWords] = useState([]);

  const [paragraphLines, setParagraphLines] = useState(["", "", "", "", ""]);

  const inputRefs = useRef([]);

  const toggleWord = (word) => {
    setSelectedWords((prev) =>
      prev.includes(word) ? prev.filter((w) => w !== word) : [...prev, word],
    );
  };

  const handleLineChange = (index, value) => {
    const updated = [...paragraphLines];

    updated[index] = value;

    setParagraphLines(updated);

    if (value.length >= 90 && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" && index < 4) {
      e.preventDefault();

      inputRefs.current[index + 1]?.focus();
    }

    // Backspace يرجع لفوق
    if (e.key === "Backspace" && paragraphLines[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleReset = () => {
    setSelectedWords([]);

    setParagraphLines(["", "", "", "", ""]);

    inputRefs.current[0]?.focus();
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall text-[18px]">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-10 ">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            G
          </span>
          Look below, read, and circle the words that describe you.
          <br /> Then, write a paragraph about yourself using these words.
        </h5>

        {/* WORDS */}
        <div
          className="
            grid 
            grid-cols-6
            gap-y-3
            gap-x-10
            mb-10
            text-center
            
          "
        >
          {words.map((word, i) => {
            const isSelected = selectedWords.includes(word);

            return (
              <button
                key={i}
                type="button"
                onClick={() => toggleWord(word)}
                style={{
                  position: "relative",
                  background: "transparent",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                  padding: "2px 6px",
                }}
              >
                {word}

                {isSelected && (
                  <span
                    style={{
                      position: "absolute",
                      left: "-6px",
                      top: "-6px",
                      width: "calc(100% + 8px)",
                      height: "calc(100% + 8px)",
                      border: "3px solid #6D2980",
                      borderRadius: "50%",
                      pointerEvents: "none",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* PARAGRAPH */}
        <div className="flex flex-col gap-6">
          {[0, 1, 2, 3, 4].map((i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              value={paragraphLines[i]}
              onChange={(e) => handleLineChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="
                  w-full
                  border-0
                  border-b
                  border-black
                  outline-none
                  bg-transparent
                  text-[18px]
                  text-[#6D2980]
                  font-semibold
                  px-1
                "
            />
          ))}
        </div>
      </div>

      {/* BUTTON */}
      <div className="action-buttons-container">
        <button
          className="
            try-again-button
          "
          onClick={handleReset}
        >
          Start Again ↻
        </button>
      </div>
    </div>
  );
};

export default WB_Unit3_Page18_Q1;
