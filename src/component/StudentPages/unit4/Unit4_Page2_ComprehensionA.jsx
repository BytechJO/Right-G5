import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
const activationKeys = {
  onKeyDown: event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  }
};
const fieldKeys = {
  onKeyDown: event => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
  onKeyUp: event => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  }
};
const normalizeAnswer = text => text.normalize("NFKC").toLowerCase().replace(/[‘’']/g, "").replace(/[.,!?;:…“”"–—-]/g, " ").replace(/\s+/g, " ").trim();
const Unit4_Page2_ComprehensionA = () => {
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const correctAnswers = [{
    tf: "false",
    correction: "never"
  }, {
    tf: "false",
    correction: "never"
  }, {
    tf: "true",
    correction: ""
  }];
  const sentences = [{
    before: "Parents",
    underlined: "always",
    after: "stop working."
  }, {
    before: "The job of a parent is",
    underlined: "usually",
    after: "easy."
  }, {
    before: "Parents will",
    underlined: "rarely",
    after: "say that their job is the best."
  }];
  const [answers, setAnswers] = useState([{
    tf: "",
    correction: ""
  }, {
    tf: "",
    correction: ""
  }, {
    tf: "",
    correction: ""
  }]);
  const [errors, setErrors] = useState([{
    tf: false,
    correction: false
  }, {
    tf: false,
    correction: false
  }, {
    tf: false,
    correction: false
  }]);
  const [correctLocked, setCorrectLocked] = useState([{
    tf: false,
    correction: false
  }, {
    tf: false,
    correction: false
  }, {
    tf: false,
    correction: false
  }]);
  const [locked, setLocked] = useState(false);

  // normalize
  const normalize = normalizeAnswer;

  // check
  const handleCheck = () => {
    if (locked) return;
    const isEmpty = answers.some(a => {
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
      setAnnouncement(String("Please complete all fields.").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.info("Please complete all fields.");
      return;
    }
    let score = 0;
    const newErrors = answers.map((ans, i) => {
      const tfValue = normalize(ans.tf);
      const tfCorrect = tfValue === normalize(correctAnswers[i].tf);
      const correctionCorrect = normalize(ans.correction) === normalize(correctAnswers[i].correction);
      const isTrueQuestion = normalize(correctAnswers[i].tf) === "true";

      // ✅ TRUE question
      if (isTrueQuestion) {
        const questionCorrect = tfCorrect && normalize(ans.correction) === "";
        if (questionCorrect) score++;
        return {
          tf: !tfCorrect,
          correction: normalize(ans.correction) !== ""
        };
      }

      // ✅ FALSE question
      const questionCorrect = tfCorrect && correctionCorrect;
      if (questionCorrect) score++;
      return {
        tf: !tfCorrect,
        correction: !correctionCorrect
      };
    });
    const updatedLocked = answers.map((ans, i) => {
      const tfValue = normalize(ans.tf);
      const tfCorrect = tfValue === normalize(correctAnswers[i].tf);
      const correctionCorrect = normalize(ans.correction) === normalize(correctAnswers[i].correction);
      const isTrueQuestion = normalize(correctAnswers[i].tf) === "true";
      return {
        // ✅ سكّر الأول إذا صح
        tf: tfCorrect,
        // ✅ بحالة true نسكر الثاني لأنه لازم يكون فاضي
        correction: isTrueQuestion ? tfCorrect && normalize(ans.correction) === "" : correctionCorrect
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
      resetButtonRef.current?.focus({
        preventScroll: true
      });
      setLocked(true);
      setAnnouncement(String(msg).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.success(msg);
    } else if (score === 0) {
      setAnnouncement(String(msg).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.error(msg);
    } else {
      setAnnouncement(String(msg).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()), ValidationAlert.warning(msg);
    }
  };

  // show
  const handleShow = () => {
    setAnnouncement("Correct answers shown and locked.");
    setAnswers(correctAnswers);
    setErrors([{
      tf: false,
      correction: false
    }, {
      tf: false,
      correction: false
    }, {
      tf: false,
      correction: false
    }]);
    setCorrectLocked([{
      tf: true,
      correction: true
    }, {
      tf: true,
      correction: true
    }, {
      tf: true,
      correction: true
    }]);
    setLocked(true);
  };

  // reset
  const handleReset = () => {
    setAnnouncement("Answers and feedback cleared.");
    setAnswers([{
      tf: "",
      correction: ""
    }, {
      tf: "",
      correction: ""
    }, {
      tf: "",
      correction: ""
    }]);
    setErrors([{
      tf: false,
      correction: false
    }, {
      tf: false,
      correction: false
    }, {
      tf: false,
      correction: false
    }]);
    setCorrectLocked([{
      tf: false,
      correction: false
    }, {
      tf: false,
      correction: false
    }, {
      tf: false,
      correction: false
    }]);
    setLocked(false);
  };

  // update
  const updateField = (index, field, value) => {
    if (locked || correctLocked[index]?.[field]) return;
    const clearCorrection = field === "tf" && normalize(value) === normalize("true") && !correctLocked[index]?.correction;
    setAnswers(previous => previous.map((answer, j) => j === index ? {
      ...answer,
      [field]: value,
      ...(clearCorrection ? {
        correction: ""
      } : {})
    } : answer));
    setErrors(previous => previous.map((error, j) => j === index ? {
      ...error,
      [field]: false,
      ...(clearCorrection ? {
        correction: false
      } : {})
    } : error));
    setAnnouncement("Item " + (index + 1) + ", " + field + " updated.");
  };
  return <div data-exercise-scope="Unit4_Page2_ComprehensionA.jsx"><style>{`[data-exercise-scope="Unit4_Page2_ComprehensionA.jsx"] input:focus-visible,[data-exercise-scope="Unit4_Page2_ComprehensionA.jsx"] textarea:focus-visible,[data-exercise-scope="Unit4_Page2_ComprehensionA.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-8">
        <span className="ex-A-read mr-2">A</span>
        Write <span className="text-[#31B7F5]">true</span> or{" "}
        <span className="text-[#31B7F5]">false</span> for each statement. If the
        statement is false, correct it by changing the underlined adverb.
      </h5>

      {/* QUESTIONS */}
      <div className="space-y-8 text-[18px] mt-10">
        {sentences.map((s, i) => <div key={i} className="flex items-center gap-6">
            {/* TRUE / FALSE */}
            <div className="relative">
              <input placeholder={"True/false"} style={{
            ...(correctLocked[i]?.tf ? {
              borderBottomColor: "#16a34a"
            } : {})
          }} {...fieldKeys} aria-invalid={!!errors[i]?.tf} title={`Item ${i + 1}, write true or false: ${sentences[i].before + " " + sentences[i].underlined + " " + sentences[i].after}`} aria-label={`Item ${i + 1}, write true or false: ${sentences[i].before + " " + sentences[i].underlined + " " + sentences[i].after}`} type="text" value={answers[i].tf} disabled={locked || correctLocked[i]?.tf} onChange={e => updateField(i, "tf", e.target.value)} className={`border-b outline-none w-[120px] text-center font-semibold text-[#00AEEF]
                ${errors[i]?.tf ? "border-red-500" : "border-black"}
                `} />

              {/* ❌ TF */}
              {errors[i]?.tf && <div style={{
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
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)"
          }}>
                  ✕
                </div>}
            </div>

            {/* SENTENCE */}
            <div className="flex-1">
              <span className="font-bold mr-2">{i + 1}</span>
              {s.before} <span className="underline">{s.underlined}</span>{" "}
              {s.after}
            </div>

            {/* CORRECTION */}
            <div className="relative">
              <input placeholder={"Correction"} style={{
            ...(correctLocked[i]?.correction ? {
              borderBottomColor: "#16a34a"
            } : {})
          }} {...fieldKeys} aria-invalid={!!errors[i]?.correction} title={`Item ${i + 1}, correct the underlined word or phrase if false: ${sentences[i].before + " " + sentences[i].underlined + " " + sentences[i].after}`} aria-label={`Item ${i + 1}, correct the underlined word or phrase if false: ${sentences[i].before + " " + sentences[i].underlined + " " + sentences[i].after}`} type="text" value={answers[i].correction} disabled={locked || correctLocked[i]?.correction || normalize(answers[i].tf) === "true"} onChange={e => updateField(i, "correction", e.target.value)} className={`border-b outline-none w-[140px] text-center font-semibold text-[#6D2980]
                ${errors[i]?.correction ? "border-red-500" : "border-black"}
                `} />

              {/* ❌ CORRECTION */}
              {errors[i]?.correction && <div style={{
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
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)"
          }}>
                  ✕
                </div>}
            </div>
          </div>)}
      </div>

      {/* BUTTONS */}
      <div className="flex justify-center gap-6 mt-10">
        {/* Reset */}
        <div className="relative group">
          <button {...activationKeys} ref={resetButtonRef} aria-label={"Start Again"} type={"button"} onClick={handleReset} className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm">
            <div className="bg-white p-3 rounded-full shadow">
              <FaRedo size={14} />
            </div>
          </button>

          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Reset
          </span>
        </div>

        {/* Show */}
        <div className="relative group">
          <button {...activationKeys} aria-label={"Show Answer"} type={"button"} onClick={handleShow} className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm">
            <div className="bg-white p-3 rounded-full shadow">
              <FaEye size={14} />
            </div>
          </button>

          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Show Answer
          </span>
        </div>

        {/* Check */}
        <div className="relative group">
          <button {...activationKeys} style={{
          cursor: locked ? "not-allowed" : "pointer"
        }} disabled={locked} aria-label={"Check Answer"} type={"button"} onClick={handleCheck} className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm">
            <div className="bg-white p-3 rounded-full shadow">
              <FaCheck size={14} />
            </div>
          </button>

          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Check Answer
          </span>
        </div>
      </div>
    </div>;
};
export default Unit4_Page2_ComprehensionA;
