import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

import springImg from "../../../assets/imgs/pages/workbook/Right Int WB G5 U7/Page 43/Asset 19.svg";

const WB_Unit7_Page43_Q2 = () => {
  const ingVerbs = [
    "playing",
    "enjoying",
    "catching",
    "putting",
    "blowing",
    "chirping",
    "waiting",
    "keeping",
    "playing",
    "counting",
    "blooming",
    "eating",
    "watching",
  ];

  const story =
    "It is springtime. Helen and her friends are playing in her backyard. They are enjoying the wonderful breeze and the super colors of spring. They are catching butterflies and putting them in glass jars that have openings for air. The wind is blowing lightly. The birds are chirping. They were waiting for spring all winter long. Finally, it has arrived. There are many fun outdoor games and activities to do. Everyone is keeping busy with something. Hansel is playing tag with Sarah. Stella is counting the flowers that are blooming. Harley is eating his sandwich. Tom is watching the grasshoppers hop.";

  const storyWords = story.split(" ");

  const [selectedWords, setSelectedWords] = useState([]);

  const [wrongWords, setWrongWords] = useState([]);

  const [locked, setLocked] = useState(false);

  const cleanWord = (word) =>
    word
      .replace(/[.?!,’']/g, "")
      .toLowerCase()
      .trim();

  const toggleWord = (index) => {
    if (locked) return;

    setWrongWords([]);

    setSelectedWords((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const checkAnswers = () => {
    if (locked) return;

    const correctIndexes = storyWords
      .map((word, index) => (ingVerbs.includes(cleanWord(word)) ? index : null))
      .filter((i) => i !== null);

    const missing = correctIndexes.filter((i) => !selectedWords.includes(i));

    const wrong = selectedWords.filter((i) => !correctIndexes.includes(i));

    setWrongWords(wrong);

    const score = Math.max(
      0,
      correctIndexes.length - missing.length - wrong.length,
    );

    const total = correctIndexes.length;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:18px;text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${score} / ${total}
        </span>
      </div>
    `;

    if (missing.length === 0 && wrong.length === 0) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (score === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const showAnswers = () => {
    const correctIndexes = storyWords
      .map((word, index) => (ingVerbs.includes(cleanWord(word)) ? index : null))
      .filter((i) => i !== null);

    setSelectedWords(correctIndexes);
    setWrongWords([]);
    setLocked(true);
  };

  const handleReset = () => {
    setSelectedWords([]);
    setWrongWords([]);
    setLocked(false);
  };

  const renderWord = (word, index) => {
    const selected = selectedWords.includes(index);
    const wrong = wrongWords.includes(index);

    return (
      <React.Fragment key={index}>
        <button
          type="button"
          disabled={locked}
          onClick={() => toggleWord(index)}
          className="relative"
          style={{
            background: "transparent",
            border: wrong
              ? "2px solid #ef4444"
              : selected
                ? "2px solid #6D2980"
                : "2px solid transparent",
            borderRadius: "999px",
            padding: "0 4px",
            fontSize: "17px",
            color: "#3d2b1f",
            cursor: locked ? "default" : "pointer",
          }}
        >
          {word}

          {wrong && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                width: "18px",
                height: "18px",
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
        </button>{" "}
      </React.Fragment>
    );
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall text-[18px] w-full">
        <h5 className="header-title-page8 mb-[8vh]">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            K
          </span>
          Circle all the <span className="text-[#00AEEF]">–ing</span> verbs in
          the story for Ex. J.
        </h5>

        <div
          style={{
            border: "2px solid #8C3FAF",
            borderRadius: "10px",
            padding: "14px 16px",
            background: "#fff",
          }}
        >
          {/* الجزء العلوي */}

          <div
            style={{
              fontSize: "17px",
              lineHeight: "1.7",
              color: "#3d2b1f",
              textAlign: "left",
            }}
          >
            {storyWords
              .slice(0, 55)
              .map((word, index) => renderWord(word, index))}
          </div>

          {/* الجزء السفلي */}

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "14px",
              marginTop: "2px",
            }}
          >
            {/* النص */}

            <div
              style={{
                flex: 1,
                fontSize: "17px",
                lineHeight: "1.7",
                color: "#3d2b1f",
                textAlign: "left",
              }}
            >
              {storyWords
                .slice(55)
                .map((word, index) => renderWord(word, index + 55))}
            </div>

            {/* الصورة */}

            <img
              src={springImg}
              alt=""
              style={{
                width: "220px",
                height: "170px",
                objectFit: "contain",
                flexShrink: 0,
                marginTop: "4px",
              }}
            />
          </div>
        </div>
      </div>

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

export default WB_Unit7_Page43_Q2;
