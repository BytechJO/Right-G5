/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";

const ComprehensionA = ({
  onChange,
  showTrigger,
  resetTrigger,
  locked,
  result,
}) => {
  const [answers, setAnswers] = React.useState([
    { record: "", who: "", what: "", when: "" },
    { record: "", who: "", what: "", when: "" },
    { record: "", who: "", what: "", when: "" },
  ]);
  const correctAnswers = [
    {
      record: "how tight",
      who: "Alistair Moffatt",
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
  const data = [
    { record: "how tight", who: "", what: "parallel parking", when: "2015" },
    { record: "how fast", who: "Pavol Durdik", what: "", when: "" },
    { record: "", who: "Sarah Chapman", what: "", when: "2002" },
  ];

  const handleChange = (i, field, value) => {
    const updated = [...answers];
    updated[i][field] = value;
    setAnswers(updated);
  };
  useEffect(() => {
    if (resetTrigger) {
      setAnswers([
        { record: "", who: "", what: "", when: "" },
        { record: "", who: "", what: "", when: "" },
        { record: "", who: "", what: "", when: "" },
      ]);
    }
  }, [resetTrigger]);
  useEffect(() => {
    if (showTrigger) {
      setAnswers(correctAnswers);
    }
  }, [showTrigger]);
  // 🔥 المهم
  useEffect(() => {
    onChange(answers);
  }, [answers]);

  return (
    <div className="mb-6 mx-auto">
      <div className="flex items-center gap-3 mb-7">
        <h5 className="header-title-page8-read pb-2.5">
          <span className="ex-A-read" style={{ marginRight: "10px" }}>
            A
          </span>
          Finish the chart.
        </h5>
      </div>

      <table className="w-full border-2 border-[#6D2980] text-[14px] text-center border-collapse">
        <thead>
          <tr className="bg-purple-100">
            <th className="border p-2">Record</th>
            <th className="border p-2">Who</th>
            <th className="border p-2">What</th>
            <th className="border p-2">When</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {["record", "who", "what", "when"].map((field) => (
                <td className="border p-2 relative">
                  {row[field] ? (
                    row[field]
                  ) : (
                    <>
                      <input
                        disabled={locked}
                        value={answers[i][field]}
                        onChange={(e) => handleChange(i, field, e.target.value)}
                        className={`w-full text-center outline-none ${
                          answers[i][field]
                            ? "text-[#6D2980] font-semibold"
                            : ""
                        }`}
                      />

                      {locked && result && result[i] === false && (
                        <div
                          style={{
                            position: "absolute",
                            top: "15px",
                            right: "10%",
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
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComprehensionA;
