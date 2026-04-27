import React, { useEffect, useState } from "react";

const Unit2_Page2_ComprehensionA = ({
  onChange,
  showTrigger,
  resetTrigger,
  result,
  locked,
}) => {
  const [answers, setAnswers] = useState(["", "", ""]);

  const correctAnswers = [
    "at the same time to the same mom",
    "mirror image twins",
    "Siamese twins",
  ];

  const questions = [
    "Twins are people who are born",
    "Twins that are exactly the same on the opposite sides of their bodies are",
    "Twins that are joined together are",
  ];

  const handleChange = (i, value) => {
    const updated = [...answers];
    updated[i] = value;
    setAnswers(updated);
  };

  useEffect(() => {
    if (resetTrigger) {
      setAnswers(["", "", ""]);
    }
  }, [resetTrigger]);

  useEffect(() => {
    if (showTrigger) {
      setAnswers(correctAnswers);
    }
  }, [showTrigger]);

  useEffect(() => {
    onChange(answers);
  }, [answers]);

  return (
    <div className="mb-15 mx-auto w-full">
      {/* العنوان */}
      <div className="flex items-center gap-3 mb-7">
        <h5 className="header-title-page8-read pb-2.5">
          <span className="ex-A-read mr-2">A</span>
          Finish the sentence with a fact from the story.
        </h5>
      </div>

      {/* الأسئلة */}
      <div className="space-y-6">
        {questions.map((q, i) => {
          const isCorrect =
            result && result[i] === true
              ? "border-black"
              : result && result[i] === false
                ? "border-red-500"
                : "";
          return (
            <div key={i} className="relative flex items-start gap-3">
              {/* الرقم */}
              <span className="font-bold">{i + 1}</span>

              {/* الجملة */}
              {i === 1 ? (
                // 🔥 السؤال الثاني (الخط تحت)
                <div className="flex-1 relative">
                  <span>{q}</span>

                  <input
                    disabled={locked}
                    value={answers[i]}
                    onChange={(e) => handleChange(i, e.target.value)}
                    className={`outline-none border-b-2 ${isCorrect} w-full mt-1 text-[#6D2980] font-bold`}
                  />
                </div>
              ) : (
                // 🔥 الأول والثالث (الخط جنب)
                <div className="flex-1 flex items-center gap-2 relative">
                  <span className="whitespace-nowrap">{q}</span>

                  <input
                    disabled={locked}
                    value={answers[i]}
                    onChange={(e) => handleChange(i, e.target.value)}
                    className={`outline-none border-b-2 ${isCorrect} w-full mt-1 text-[#6D2980] font-bold`}
                  />
                </div>
              )}

              {/* ❌ علامة الخطأ */}
              {locked && result && result[i] === false && (
                <div
                  style={{
                    position: "absolute",
                    top: "0px",
                    left: "100%",
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Unit2_Page2_ComprehensionA;
