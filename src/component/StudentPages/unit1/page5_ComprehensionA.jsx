import { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";
const activationKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault(); event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); event.stopPropagation(); }
  },
};
const fieldKeys = {
  onKeyDown: (event) => { if (event.key === "Enter" || event.key === " ") event.stopPropagation(); },
  onKeyUp: (event) => { if (event.key === "Enter" || event.key === " ") event.stopPropagation(); },
};
const normalizeAnswer = (text) => text.normalize("NFKC").toLowerCase()
  .replace(/[‘’']/g, "")
  .replace(/[.,!?;:…“”"]/g, " ")
  .replace(/\s+/g, " ").trim();


const ComprehensionA = () => {
  const resetButtonRef = useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const initialAnswers = [
    { record: "how tight", who: "", what: "parallel parking", when: "2015" },
    { record: "how fast", who: "Pavol Durdik", what: "", when: "" },
    { record: "", who: "Sarah Chapman", what: "", when: "2002" },
  ];

  const correctAnswers = [
    {
      record: "how tight",
      who: "Alaistair Moffat",
      what: "parallel parking",
      when: "2015",
    },
    {
      record: "how fast",
      who: "Pavol Durdik",
      what: "put on 52 socks/one minute",
      when: "2016",
    },
    {
      record: "how far",
      who: "Sarah Chapman",
      what: "walked 5,000 meters",
      when: "2002",
    },
  ];

  const [answers, setAnswers] = useState(initialAnswers);
  const [errors, setErrors] = useState({});
  const [locked, setLocked] = useState(false);

  // 🧠 normalize
  const normalize = normalizeAnswer;

  // ✅ CHECK
  const handleCheck = () => {
    if (locked) return;
    setAnnouncement("Checking answers. Correct answers stay locked; incorrect answers can be changed.");

    const isEmpty = answers.some((row, i) =>
      Object.keys(row).some((field) => {
        if (initialAnswers[i][field] !== "") return false;
        return !row[field] || row[field].trim() === "";
      }),
    );

    if (isEmpty) {
      ValidationAlert.info("Please complete all fields.");
      return;
    }

    let correctCount = 0;
    let total = 0;
    const newErrors = {};

    answers.forEach((row, i) => {
      newErrors[i] = {};

      Object.keys(row).forEach((field) => {
        if (initialAnswers[i][field] !== "") return;

        total++;

        if (normalize(row[field]) === normalize(correctAnswers[i][field])) {
          correctCount++;
          newErrors[i][field] = false;
        } else {
          newErrors[i][field] = true;
        }
      });
    });

    setErrors(newErrors);

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
      resetButtonRef.current?.focus({preventScroll:true});
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // 👁️ SHOW
  const handleShow = () => {
    setAnnouncement("Correct answers shown and locked.");
    setAnswers(correctAnswers);
    setErrors({});
    setLocked(true);
  };

  // 🔄 RESET
  const handleReset = () => {
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(initialAnswers);
    setErrors({});
    setLocked(false);
  };

  const handleChange = (i, field, value) => {
  if (locked || errors[i]?.[field] === false) return;
  setAnswers(previous => previous.map((row, index) => index === i ? {
    ...row,
    [field]: value
  } : row));
  setErrors(previous => {
    const next = {
      ...previous,
      [i]: {
        ...previous[i]
      }
    };
    delete next[i][field];
    return next;
  });
};

  return (
    <div data-unit1-scope="page5_ComprehensionA.jsx" className="mb-6 mx-auto">
<style>{`[data-unit1-scope="page5_ComprehensionA.jsx"] input:focus-visible,[data-unit1-scope="page5_ComprehensionA.jsx"] textarea:focus-visible,[data-unit1-scope="page5_ComprehensionA.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      <h5 className="header-title-page8-read mb-6">
        <span className="ex-A-read mr-2">A</span>
        Finish the chart.
      </h5>

      <table className="w-full border-2 border-[#6D2980] text-[14px] text-center border-collapse mt-10">
        <thead>
          <tr className="bg-purple-100">
            <th className="border p-2">Record</th>
            <th className="border p-2">Who</th>
            <th className="border p-2">What</th>
            <th className="border p-2">When</th>
          </tr>
        </thead>

        <tbody>
          {answers.map((row, i) => (
            <tr key={i}>
              {["record", "who", "what", "when"].map((field) => {
                const isStatic = initialAnswers[i][field] !== "";

                return (
                  <td className="border p-2 relative" key={field}>
                    {isStatic ? (
                      initialAnswers[i][field]
                    ) : (
                      <>
                        <input {...fieldKeys} aria-label={`Record ${i + 1}, ${field}`} title={`Record ${i + 1}, ${field}`} style={{borderBottom:locked || errors[i]?.[field] === false ? "2px solid #16a34a" : errors[i]?.[field] === true ? "2px solid #ef4444" : undefined}}
                          disabled={locked || errors[i]?.[field] === false}
                          value={answers[i][field] || ""}
                          placeholder={({record:"Record",who:"Name",what:"Achievement",when:"Date"})[field]}
                          onChange={(e) =>
                            handleChange(i, field, e.target.value)
                          }
                          className={` w-full text-center text-[#6D2980] font-semibold
                              bg-transparent h-[22px] leading-[22px] align-middle
                              ${errors[i]?.[field] ? "border-red-500" : "border-black"}
                              `}
                        />

                        {/* ❌ */}
                        {errors[i]?.[field] && (
                          <div
                            style={{
                              position: "absolute",
                              top: "15px",
                              left: "90%",
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
                      </>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-8">
        {/* Reset */}
        <div className="relative group">
          <button type="button" aria-label="Start Again" {...activationKeys} ref={resetButtonRef}
            onClick={handleReset}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#ffc107] hover:bg-[#e0a800] cursor-pointer transition shadow-sm"
          >
            <span className="bg-white p-3 rounded-full shadow">
              <FaRedo size={14} />
            </span>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Reset
          </span>
        </div>

        {/* Show */}
        <div className="relative group">
          <button type="button" aria-label="Show Answer" {...activationKeys}
            onClick={handleShow}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#2c78b4] hover:bg-[#1a5a8a] cursor-pointer transition shadow-sm"
          >
            <span className="bg-white p-3 rounded-full shadow">
              <FaEye size={14} />
            </span>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Show Answer
          </span>
        </div>

        {/* Check */}
        <div className="relative group">
          <button type="button" aria-label="Check Answer" {...activationKeys} disabled={locked} style={{cursor:locked ? "not-allowed":"pointer"}}
            onClick={handleCheck}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#55c271] hover:bg-[#449d5a] cursor-pointer transition shadow-sm"
          >
            <span className="bg-white p-3 rounded-full shadow">
              <FaCheck size={14} />
            </span>
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Check Answer
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComprehensionA;
