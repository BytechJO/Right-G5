/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

const GrammarB = ({ onChange, showTrigger, resetTrigger, locked }) => {
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [selected, setSelected] = useState("");

  // 🔹 handle change
  const handleChange = (i, value) => {
    const updated = [...answers];
    updated[i] = value;
    setAnswers(updated);
    onChange(updated); // 🔥 مهم
  };
useEffect(() => {
  if (resetTrigger) {
    setSelected(""); // 🔥 يرجّع الدائرة
  }
}, [resetTrigger]);
  // 🔹 reset
  useEffect(() => {
    if (resetTrigger) {
      const empty = ["", "", "", ""];
      setAnswers(empty);
      onChange(empty);
    }
  }, [resetTrigger]);

  // 🔹 show answer (ما في answers → نخليها فاضية)
  useEffect(() => {
    if (showTrigger) {
      const empty = ["", "", "", ""];
      setAnswers(empty);
      onChange(empty);
    }
  }, [showTrigger]);

  return (
    <div>
      {/* العنوان */}
      <h5 className="header-title-page8-read mb-7">
        <span className="ex-A-read mr-2">B</span>
        Add a relative clause to the sentence. Circle the noun it tells about.
      </h5>

      <div className="flex flex-col gap-6 text-[15px] max-w-[900px]">
        {/* 1 */}
        <div>
          <span className="font-bold mr-4">1</span>
          Have you met my{" "}
          <span
            onClick={() => setSelected("cousin")}
            className={`cursor-pointer px-1 rounded-full ${
              selected === "cousin" ? "border-2 border-blue-400" : ""
            }`}
          >
            cousin
          </span>
          <input
            disabled={locked}
            value={answers[0]}
            onChange={(e) => handleChange(0, e.target.value)}
            className="border-b-2 border-black outline-none w-[300px] mx-2 text-[#6D2980] font-bold"
          />
          ?
        </div>

        {/* 2 */}
        <div>
          <span className="font-bold mr-4">2</span>
          One of my{" "}
          <span
            onClick={() => setSelected("friends")}
            className={`cursor-pointer px-1 rounded-full ${
              selected === "friends" ? "border-2 border-blue-400" : ""
            }`}
          >
            friends
          </span>
          ,
          <input
            disabled={locked}
            value={answers[1]}
            onChange={(e) => handleChange(1, e.target.value)}
            className="border-b-2 border-black outline-none w-[250px] mx-2 text-[#6D2980] font-bold"
          />
          , can juggle four balls.
        </div>

        {/* 3 */}
        <div>
          <span className="font-bold mr-4">3</span>A baby{" "}
          <span
            onClick={() => setSelected("giraffe")}
            className={`cursor-pointer px-1 rounded-full ${
              selected === "giraffe" ? "border-2 border-blue-400" : ""
            }`}
          >
            giraffe
          </span>
          ,
          <input
            disabled={locked}
            value={answers[2]}
            onChange={(e) => handleChange(2, e.target.value)}
            className="border-b-2 border-black outline-none w-[250px] mx-2 text-[#6D2980] font-bold"
          />
          , can walk minutes after it is born.
        </div>

        {/* 4 */}
        <div className="flex items-center">
          <span className="font-bold mr-4">4</span>
          <span className="whitespace-nowrap">
            I saw the{" "}
            <span
              onClick={() => setSelected("wheel")}
              className={`cursor-pointer px-1 rounded-full ${
                selected === "wheel" ? "border-2 border-blue-400" : ""
              }`}
            >
              Ferris wheel
            </span>
          </span>

          <input
            disabled={locked}
            value={answers[3]}
            onChange={(e) => handleChange(3, e.target.value)}
            className="border-b-2 border-black outline-none flex-1 mx-2 text-[#6D2980] font-bold"
          />
        </div>
      </div>
    </div>
  );
};

export default GrammarB;
