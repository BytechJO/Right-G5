import React, { useState } from "react";

const Review6_Page2_Q1 = () => {
  const poemLines = [
    ["It", "could", "be", "a", "feather."],

    ["It", "might", "be", "a", "toad."],

    ["Might", "it", "be", "a", "toaster?"],

    ["It", "couldn’t", "be", "a", "road."],

    [],

    ["Will", "you", "look", "inside", "the", "box?"],

    ["Would", "you", "like", "to", "know?"],

    ["No,", "let’s", "wait", "for", "a", "little", "more."],

    ["I", "know!", "It", "could", "be", "snow."],

    ["We", "could", "have", "all", "the", "answers"],

    ["By", "looking", "inside."],

    ["But", "then", "we", "might", "miss", "all", "the", "fun"],

    ["Of", "trying", "to", "decide."],
  ];

  const [selectedWords, setSelectedWords] = useState({});

  const [answers, setAnswers] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const toggleWord = (lineIndex, wordIndex) => {
    setSelectedWords((prev) => ({
      ...prev,

      [lineIndex]: prev[lineIndex] === wordIndex ? null : wordIndex,
    }));
  };

  const handleChange = (index, value) => {
    const updated = [...answers];

    updated[index] = value;

    setAnswers(updated);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall">
        {/* TITLE */}
        <h5 className="header-title-page8 mb-10">
          <span
            style={{
              marginRight: "10px",
            }}
          >
            F
          </span>
          Circle all the modal verbs in the poem below called, WHAT IS IT{" "}
          <br /> Write your own version of this poem by filling in the blank
          lines.
          <br /> Remember to use rhyming words in your poem.
        </h5>

        {/* CONTENT */}
        <div className="flex gap-14 mb-10">
          {/* LEFT POEM */}
          <div className="flex flex-col gap-4 w-[360px]">
            {/* TITLE */}
            <div
              className="
                text-[18px]
                mb-1
              "
            >
              WHAT IS IT?
            </div>

            {poemLines.map((line, lineIndex) => {
              if (line.length === 0) {
                return <div key={lineIndex} className="h-5"></div>;
              }

              return (
                <div
                  key={lineIndex}
                  className="
                      flex
                      flex-wrap
                      gap-2
                      text-[18px]
                    "
                >
                  {line.map((word, wordIndex) => {
                    const isSelected = selectedWords[lineIndex] === wordIndex;

                    return (
                      <span
                        key={wordIndex}
                        onClick={() => toggleWord(lineIndex, wordIndex)}
                        className="
                              relative
                              cursor-pointer
                              inline-block
                              px-[3px]
                              py-px
                            "
                      >
                        {/* CIRCLE */}
                        {isSelected && (
                          <span
                            className="
                                  absolute
                                  inset-[-5px]
                                  border-2
                                  border-[#6D2980]
                                  rounded-full
                                  pointer-events-none
                                "
                          ></span>
                        )}

                        <span className="relative z-10">{word}</span>
                      </span>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-4 w-[430px]">
            {/* TITLE */}
            <div
              className="
                text-[18px]
                underline
                mb-1
              "
            >
              WHAT IS IT?
            </div>

            {/* 1 */}
            <div className="flex items-end text-[18px]">
              <span>It could be</span>

              <input
                type="text"
                value={answers[0]}
                onChange={(e) => handleChange(0, e.target.value)}
                className="
                  flex-1
                  border-0
                  border-b
                  border-black
                  outline-none
                  bg-transparent
                  font-semibold
                  text-[18px]
                  ml-2
                  text-[#6D2980]
                "
              />

              <span>.</span>
            </div>

            {/* 2 */}
            <div className="flex items-end text-[18px]">
              <span>It might be</span>

              <input
                type="text"
                value={answers[1]}
                onChange={(e) => handleChange(1, e.target.value)}
                className="
                  flex-1
                  border-0
                  border-b
                  border-black
                  outline-none
                  bg-transparent
                  font-semibold
                  text-[18px]
                  ml-2
                  text-[#6D2980]
                "
              />

              <span>.</span>
            </div>

            {/* 3 */}
            <div className="flex items-end text-[18px]">
              <span>Might it be a</span>

              <input
                type="text"
                value={answers[2]}
                onChange={(e) => handleChange(2, e.target.value)}
                className="
                  flex-1
                  border-0
                  border-b
                  border-black
                  outline-none
                  bg-transparent
                  font-semibold
                  text-[18px]
                  ml-2
                  text-[#6D2980]
                "
              />

              <span>?</span>
            </div>

            {/* 4 */}
            <div className="flex items-end text-[18px]">
              <span>It couldn’t be a</span>

              <input
                type="text"
                value={answers[3]}
                onChange={(e) => handleChange(3, e.target.value)}
                className="
                  flex-1
                  border-0
                  border-b
                  border-black
                  outline-none
                  bg-transparent
                  font-semibold
                  text-[18px]
                  ml-2
                  text-[#6D2980]
                "
              />
            </div>

            <div className="h-5"></div>

            {/* 5 */}
            <div className="flex items-end text-[18px]">
              <span>Will you</span>

              <input
                type="text"
                value={answers[4]}
                onChange={(e) => handleChange(4, e.target.value)}
                className="
                  flex-1
                  border-0
                  border-b
                  border-black
                  outline-none
                  bg-transparent
                  font-semibold
                  text-[18px]
                  ml-2
                  text-[#6D2980]
                "
              />

              <span>?</span>
            </div>

            {/* 6 */}
            <div className="flex items-end text-[18px]">
              <span>Would you</span>

              <input
                type="text"
                value={answers[5]}
                onChange={(e) => handleChange(5, e.target.value)}
                className="
                  flex-1
                  border-0
                  border-b
                  border-black
                  outline-none
                  bg-transparent
                  font-semibold
                  text-[18px]
                  ml-2
                  text-[#6D2980]
                "
              />

              <span>?</span>
            </div>

            {/* 7 */}
            <div className="flex items-end text-[18px]">
              <span>No, let’s</span>

              <input
                type="text"
                value={answers[6]}
                onChange={(e) => handleChange(6, e.target.value)}
                className="
                  flex-1
                  border-0
                  border-b
                  border-black
                  outline-none
                  bg-transparent
                  font-semibold
                  text-[18px]
                  ml-2
                  text-[#6D2980]
                "
              />

              <span>.</span>
            </div>

            {/* 8 */}
            <div className="flex items-end text-[18px]">
              <span>I know!</span>

              <input
                type="text"
                value={answers[7]}
                onChange={(e) => handleChange(7, e.target.value)}
                className="
                  flex-1
                  border-0
                  border-b
                  border-black
                  outline-none
                  bg-transparent
                  text-[18px]
                  font-semibold
                  ml-2
                  text-[#6D2980]
                "
              />

              <span>.</span>
            </div>

            {/* 9 */}
            <div className="flex items-end text-[18px]">
              <span>We could</span>

              <input
                type="text"
                value={answers[8]}
                onChange={(e) => handleChange(8, e.target.value)}
                className="
                  flex-1
                  border-0
                  border-b
                  border-black
                  outline-none
                  bg-transparent
                  font-semibold
                  text-[18px]
                  ml-2
                  text-[#6D2980]
                "
              />
            </div>

            {/* 10 */}
            <div className="flex items-end text-[18px]">
              <span>By</span>

              <input
                type="text"
                value={answers[9]}
                onChange={(e) => handleChange(9, e.target.value)}
                className="
                  flex-1
                  border-0
                  border-b
                  border-black
                  outline-none
                  bg-transparent
                  font-semibold
                  text-[18px]
                  ml-2
                  text-[#6D2980]
                "
              />

              <span>.</span>
            </div>

            {/* 11 */}
            <div className="flex items-end text-[18px]">
              <span>But then we might</span>

              <input
                type="text"
                value={answers[10]}
                onChange={(e) => handleChange(10, e.target.value)}
                className="
                  flex-1
                  border-0
                  border-b
                  border-black
                  outline-none
                  bg-transparent
                  font-semibold
                  text-[18px]
                  ml-2
                  text-[#6D2980]
                "
              />
            </div>

            {/* 12 */}
            <div className="flex items-end text-[18px]">
              <span>Of trying</span>

              <input
                type="text"
                value={answers[11]}
                onChange={(e) => handleChange(11, e.target.value)}
                className="
                  flex-1
                  border-0
                  border-b
                  border-black
                  outline-none
                  bg-transparent
                  font-semibold
                  text-[18px]
                  ml-2
                  text-[#6D2980]
                "
              />

              <span>.</span>
            </div>
          </div>
        </div>
        {/* BUTTONS */}
        <div className="action-buttons-container">
          <button
            className="try-again-button"
            onClick={() => {
              setAnswers(["", "", "", "", "", "", "", "", "", "", "", ""]);

              setSelectedWords({});
            }}
          >
            Start Again ↻
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review6_Page2_Q1;
