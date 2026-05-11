import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

const Unit5_Page2_ComprehensionA = () => {
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [locked, setLocked] = useState(false);
  const [result, setResult] = useState([]);

  const rightRefs = React.useRef([]);
  const textRefs = React.useRef([]); // 🔥 جديد

  const correct = ["d", "c", "a", "b"];
  const rightItems = ["a", "b", "c", "d"];

  const handleChange = (i, val) => {
    const updated = [...answers];
    updated[i] = val.toLowerCase();
    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];
      copy[i] = undefined;
      return copy;
    });
  };

  const input = (i) => (
    <span className="relative mx-2">
      <input
        disabled={locked || result[i] === true}
        value={answers[i]}
        onChange={(e) => handleChange(i, e.target.value)}
        maxLength={1}
        className={`w-10 border-b outline-none text-center font-bold uppercase
        ${
          result[i] === false
            ? "border-red-500 text-[#6D2980]"
            : "border-black text-[#6D2980]"
        }`}
      />

      {result[i] === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
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
    </span>
  );

  // ====================
  // SVG LINES
  // ====================
  const renderLines = () => {
    return answers.map((ans, i) => {
      if (!ans) return null;

      const rightIndex = rightItems.indexOf(ans);
      if (rightIndex === -1) return null;

      const textEl = textRefs.current[i];
      const rightEl = rightRefs.current[rightIndex];

      if (!textEl || !rightEl) return null;

      const textRect = textEl.getBoundingClientRect();
      const rightRect = rightEl.getBoundingClientRect();
      const parentRect =
        textEl.parentElement.parentElement.getBoundingClientRect();

      // 🔥 من بداية الكلمة
      const x1 = textRect.right - parentRect.left;
      const y1 = textRect.top + textRect.height / 2 - parentRect.top;

      const x2 = rightRect.left - parentRect.left;
      const y2 = rightRect.top + rightRect.height / 2 - parentRect.top;

      return (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#6d2980"
          strokeWidth="3"
          strokeLinecap="round"
        />
      );
    });
  };

  // ====================
  // CHECK
  // ====================
  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((a) => !a.trim())) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;

    const res = answers.map((a, i) => {
      const ok = a === correct[i];
      if (ok) correctCount++;
      return ok;
    });

    setResult(res);
    const msg = `Score: ${correctCount} / ${correct.length}`;

    if (correctCount === correct.length) {
      setLocked(true);
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  const showAnswers = () => {
    setAnswers(correct);
    setLocked(true);
  };

  const reset = () => {
    setAnswers(["", "", "", ""]);
    setLocked(false);
    setResult([]);
  };

  return (
    <div>
      <h5 className="header-title-page8-read mb-5">
        <span className="ex-A-read mr-2">A</span>
        Look at the underlined words in the reading. See if you can tell what
        they mean <br /> by how they are used in the sentences. Then match them
        with the meanings on the right.
      </h5>

      <div className="relative grid grid-cols-2 gap-25 text-[18px] mt-10 min-h-[280px]">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {renderLines()}
        </svg>

        {/* LEFT */}
        <div className="space-y-10">
          <div>
            {input(0)}
            <span className="font-bold mr-4">1</span>
            <span ref={(el) => (textRefs.current[0] = el)}>
              A table for (number)?
            </span>
          </div>

          <div>
            {input(1)}
            <span className="font-bold mr-4">2</span>
            <span ref={(el) => (textRefs.current[1] = el)}>
              May I take your order now?
            </span>
          </div>

          <div>
            {input(2)}
            <span className="font-bold mr-4">3</span>
            <span ref={(el) => (textRefs.current[2] = el)}>
              I’ll take care of it right away.
            </span>
          </div>

          <div>
            {input(3)}
            <span className="font-bold mr-4">4</span>
            <span ref={(el) => (textRefs.current[3] = el)}>
              As soon as possible
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-10">
          <div ref={(el) => (rightRefs.current[0] = el)}>
            <span className="font-bold mr-4">a</span>saying that you will solve
            the problem quickly
          </div>

          <div ref={(el) => (rightRefs.current[1] = el)}>
            <span className="font-bold mr-4">b</span>to do it as quickly as one
            can
          </div>

          <div ref={(el) => (rightRefs.current[2] = el)}>
            <span className="font-bold mr-4">c</span>The server is asking if the
            customer is ready to tell them what they’d like to eat.
          </div>

          <div ref={(el) => (rightRefs.current[3] = el)}>
            <span className="font-bold mr-4">d</span>offering to seat customers
            at a table for a certain number of people
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-6 mt-2">
        {/* Reset */}
        <div className="relative group">
          <div
            onClick={reset}
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
            onClick={showAnswers}
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
            onClick={checkAnswers}
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

export default Unit5_Page2_ComprehensionA;
