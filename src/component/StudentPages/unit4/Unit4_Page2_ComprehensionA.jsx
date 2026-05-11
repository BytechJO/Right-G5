import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

const Unit4_Page2_ComprehensionA = () => {
  const correctAnswers = [
    { tf: "false", correction: "never" },
    { tf: "false", correction: "never" },
    { tf: "true", correction: "" },
  ];

  const sentences = [
    {
      before: "Parents",
      underlined: "always",
      after: "stop working.",
    },
    {
      before: "The job of a parent is",
      underlined: "usually",
      after: "easy.",
    },
    {
      before: "Parents will",
      underlined: "rarely",
      after: "say that their job is the best.",
    },
  ];

  const [answers, setAnswers] = useState([
    { tf: "", correction: "" },
    { tf: "", correction: "" },
    { tf: "", correction: "" },
  ]);

  const [errors, setErrors] = useState([
    { tf: false, correction: false },
    { tf: false, correction: false },
    { tf: false, correction: false },
  ]);
  const [correctLocked, setCorrectLocked] = useState([
    { tf: false, correction: false },
    { tf: false, correction: false },
    { tf: false, correction: false },
  ]);
  const [locked, setLocked] = useState(false);

  // normalize
  const normalize = (text) => {
    return text.trim().toLowerCase().replace(/\s+/g, " ");
  };

  // check
  const handleCheck = () => {
    if (locked) return;

    const isEmpty = answers.some((a) => {
      const tf = normalize(a.tf);

      // لازم اول فراغ يتعبى
      if (!tf) return true;

      // اذا مش true لازم الثاني يتعبى
      if (tf !== "true" && normalize(a.correction) === "") {
        return true;
      }

      return false;
    });

    if (isEmpty) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let score = 0;

    const newErrors = answers.map((ans, i) => {
      const tfValue = normalize(ans.tf);

      const tfCorrect = tfValue === normalize(correctAnswers[i].tf);

      const correctionCorrect =
        normalize(ans.correction) === normalize(correctAnswers[i].correction);

      const isTrueQuestion = normalize(correctAnswers[i].tf) === "true";

      // ✅ TRUE question
      if (isTrueQuestion) {
        const questionCorrect = tfCorrect && normalize(ans.correction) === "";

        if (questionCorrect) score++;

        return {
          tf: !tfCorrect,
          correction: normalize(ans.correction) !== "",
        };
      }

      // ✅ FALSE question
      const questionCorrect = tfCorrect && correctionCorrect;

      if (questionCorrect) score++;

      return {
        tf: !tfCorrect,
        correction: !correctionCorrect,
      };
    });
    const updatedLocked = answers.map((ans, i) => {
      const tfValue = normalize(ans.tf);

      const tfCorrect = tfValue === normalize(correctAnswers[i].tf);

      const correctionCorrect =
        normalize(ans.correction) === normalize(correctAnswers[i].correction);

      const isTrueQuestion = normalize(correctAnswers[i].tf) === "true";

      return {
        // ✅ سكّر الأول إذا صح
        tf: tfCorrect,

        // ✅ بحالة true نسكر الثاني لأنه لازم يكون فاضي
        correction: isTrueQuestion
          ? tfCorrect && normalize(ans.correction) === ""
          : correctionCorrect,
      };
    });

    setCorrectLocked(updatedLocked);
    setErrors(newErrors);

    const total = 3;

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

  // show
  const handleShow = () => {
    setAnswers(correctAnswers);

    setErrors([
      { tf: false, correction: false },
      { tf: false, correction: false },
      { tf: false, correction: false },
    ]);
    setCorrectLocked([
      { tf: true, correction: true },
      { tf: true, correction: true },
      { tf: true, correction: true },
    ]);
    setLocked(true);
  };

  // reset
  const handleReset = () => {
    setAnswers([
      { tf: "", correction: "" },
      { tf: "", correction: "" },
      { tf: "", correction: "" },
    ]);

    setErrors([
      { tf: false, correction: false },
      { tf: false, correction: false },
      { tf: false, correction: false },
    ]);
    setCorrectLocked([
      { tf: false, correction: false },
      { tf: false, correction: false },
      { tf: false, correction: false },
    ]);
    setLocked(false);
  };

  // update
  const updateField = (index, field, value) => {
    const updated = [...answers];

    updated[index][field] = value;

    // ✅ إذا صار TRUE فضّي الفراغ الثاني
    if (field === "tf" && normalize(value) === "true") {
      updated[index].correction = "";
    }

    setAnswers(updated);

    // ✅ امسح الأخطاء مباشرة أول ما يعدل
    const updatedErrors = [...errors];

    if (field === "tf") {
      updatedErrors[index].tf = false;

      // إذا صار TRUE شيل خطأ الفراغ الثاني
      if (normalize(value) === "true") {
        updatedErrors[index].correction = false;
      }
    }

    if (field === "correction") {
      updatedErrors[index].correction = false;
    }

    setErrors(updatedErrors);
  };

  return (
    <div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">A</span>
        Write <span className="text-[#31B7F5]">true</span> or{" "}
        <span className="text-[#31B7F5]">false</span> for each statement. If the
        statement is false, correct it by changing the underlined adverb.
      </h5>

      {/* QUESTIONS */}
      <div className="space-y-8 text-[18px] mt-10">
        {sentences.map((s, i) => (
          <div key={i} className="flex items-center gap-6">
            {/* TRUE / FALSE */}
            <div className="relative">
              <input
                type="text"
                value={answers[i].tf}
                disabled={locked || correctLocked[i]?.tf}
                onChange={(e) => updateField(i, "tf", e.target.value)}
                className={`border-b outline-none w-[120px] text-center font-semibold text-[#00AEEF]
                ${errors[i]?.tf ? "border-red-500" : "border-black"}
                `}
              />

              {/* ❌ TF */}
              {errors[i]?.tf && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "100px",
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

            {/* SENTENCE */}
            <div className="flex-1">
              <span className="font-bold mr-2">{i + 1}</span>
              {s.before} <span className="underline">{s.underlined}</span>{" "}
              {s.after}
            </div>

            {/* CORRECTION */}
            <div className="relative">
              <input
                type="text"
                value={answers[i].correction}
                disabled={
                  locked ||
                  correctLocked[i]?.correction ||
                  normalize(answers[i].tf) === "true"
                }
                onChange={(e) => updateField(i, "correction", e.target.value)}
                className={`border-b outline-none w-[140px] text-center font-semibold text-[#6D2980]
                ${errors[i]?.correction ? "border-red-500" : "border-black"}
                `}
              />

              {/* ❌ CORRECTION */}
              {errors[i]?.correction && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "-30px",
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

export default Unit4_Page2_ComprehensionA;
