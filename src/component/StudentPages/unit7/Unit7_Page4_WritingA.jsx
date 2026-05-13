import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

const Unit7_Page4_WritingA = () => {
  const [errors, setErrors] = useState([false, false, false, false, false]);

  const [correctLocked, setCorrectLocked] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const paragraphs = [
    {
      text: "Let’s trot for a while, I suggested.",

      quotes: [
        [0, 1],
        [23, 24, 25, 26],
      ],
    },

    {
      text: "Yes, good idea, agreed Lori.",

      quotes: [
        [0, 1],
        [15, 14, 16],
      ],
    },

    {
      text: "Maybe when we get back to the ranch, we could do some jumping, I added.",

      quotes: [
        [0, 1],
        [62, 63],
      ],
    },

    {
      text: "Lori smiled, Yes, I’d love to. Do you do a lot of jumping? ",

      quotes: [[12, 13], [58]],
    },

    {
      text: "Well, I’m not very good, but I love to practice, I answered.",

      quotes: [
        [0, 1],
        [48, 49],
      ],
    },
  ];

  const [selectedQuotes, setSelectedQuotes] = useState([[], [], [], [], []]);

  const [locked, setLocked] = useState(false);

  // toggle quote
  const toggleQuote = (paragraphIndex, charIndex) => {
    if (locked || correctLocked[paragraphIndex]) return;

    const updated = [...selectedQuotes];

    if (updated[paragraphIndex].includes(charIndex)) {
      updated[paragraphIndex] = updated[paragraphIndex].filter(
        (i) => i !== charIndex,
      );
    } else {
      updated[paragraphIndex] = [...updated[paragraphIndex], charIndex];
    }

    setSelectedQuotes(updated);

    // يشيل الاكس أول ما يعدل
    const updatedErrors = [...errors];
    updatedErrors[paragraphIndex] = false;
    setErrors(updatedErrors);
  };

  // check
  const handleCheck = () => {
    if (locked) return;

    let score = 0;

    let hasMissingQuotes = false;

    const newErrors = [];
    const newLocked = [];

    paragraphs.forEach((paragraph, i) => {
      const selected = [...selectedQuotes[i]].sort((a, b) => a - b);

      // إذا أقل من المطلوب فقط
      if (selected.length < paragraph.quotes.length) {
        newErrors[i] = false;
        newLocked[i] = false;

        hasMissingQuotes = true;

        return;
      }

      // التحقق مع السماح بأكثر من مكان صحيح
      const isCorrect =
        selected.length === paragraph.quotes.length &&
        selected.every((selectedValue, idx) =>
          paragraph.quotes[idx].includes(selectedValue),
        );

      if (isCorrect) score++;

      newErrors[i] = !isCorrect;
      newLocked[i] = isCorrect;
    });

    // إذا في نقص لا تظهر ✕
    if (hasMissingQuotes) {
      setErrors([false, false, false, false, false]);

      ValidationAlert.info("Please complete all quotation marks.");

      return;
    }

    setErrors(newErrors);

    setCorrectLocked(newLocked);

    const total = paragraphs.length;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${score} / ${total}
      </span>
    </div>
  `;

    if (score === total) {
      setLocked(true);

      ValidationAlert.success(msg);
    } else if (score === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // reset
  const handleReset = () => {
    setSelectedQuotes([[], [], [], [], []]);

    setErrors([false, false, false, false, false]);

    setCorrectLocked([false, false, false, false, false]);

    setLocked(false);
  };

  // show
  const handleShow = () => {
    const showAnswers = paragraphs.map((paragraph) =>
      paragraph.quotes.map((group) => group[0]),
    );

    setSelectedQuotes(showAnswers);

    setLocked(true);
  };

  // render line
  const renderLine = (text, paragraphIndex) => {
    const chars = text.split("");

    return (
      <>
        {chars.map((char, charIndex) => {
          const hasQuote = selectedQuotes[paragraphIndex].includes(charIndex);

          return (
            <span key={charIndex} className="relative">
              <span
                onClick={() => toggleQuote(paragraphIndex, charIndex)}
                className="cursor-pointer"
              >
                {hasQuote && <span className="text-red-600 font-bold">"</span>}

                {char}
              </span>
            </span>
          );
        })}

        {/* clickable end area */}
        <span
          onClick={() => toggleQuote(paragraphIndex, chars.length)}
          className="cursor-pointer inline-block min-w-3"
        >
          {selectedQuotes[paragraphIndex].includes(chars.length) && (
            <span className="text-red-600 font-bold">"</span>
          )}
        </span>
      </>
    );
  };

  return (
    <div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">A</span>
        Put quotation marks into the conversation below.
      </h5>

      {/* PARAGRAPHS */}
      <div className="space-y-5 text-[18px] leading-relaxed mt-10">
        {paragraphs.map((paragraph, i) => (
          <div key={i} className="relative">
            {renderLine(paragraph.text, i)}

            {errors[i] && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "-35px",
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
                }}
              >
                ✕
              </div>
            )}
          </div>
        ))}
      </div>

      {/* BUTTONS */}
      <div className="flex justify-center gap-6 mt-10">
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

export default Unit7_Page4_WritingA;
