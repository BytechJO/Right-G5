import { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { FaCheck, FaRedo, FaEye } from "react-icons/fa";

const ComprehensionA = () => {
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
  const normalize = (text) => {
    return text.trim().toLowerCase().replace(/\.$/, "").replace(/\s+/g, " ");
  };

  // ✅ CHECK
  const handleCheck = () => {
    if (locked) return;

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
      ValidationAlert.success(msg);
    } else if (correctCount === 0) {
      ValidationAlert.error(msg);
    } else {
      ValidationAlert.warning(msg);
    }
  };

  // 👁️ SHOW
  const handleShow = () => {
    setAnswers(correctAnswers);
    setErrors({});
    setLocked(true);
  };

  // 🔄 RESET
  const handleReset = () => {
    setAnswers(initialAnswers);
    setErrors({});
    setLocked(false);
  };

  const handleChange = (i, field, value) => {
    const updated = [...answers];
    updated[i][field] = value;
    setAnswers(updated);
  };

  return (
    <div className="mb-6 mx-auto">
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
                        <input
                          disabled={locked || errors[i]?.[field] === false}
                          value={answers[i][field] || ""}
                          placeholder="Type here..."
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

export default ComprehensionA;
