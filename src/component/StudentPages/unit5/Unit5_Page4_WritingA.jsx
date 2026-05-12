import React, { useState } from "react";
import { FaRedo } from "react-icons/fa";

const Unit4_Page6_SpeakingA = () => {
  const [answers, setAnswers] = useState(["", "", ""]);

  const [foodAnswer, setFoodAnswer] = useState("");

  const situations = [
    {
      text: "You forgot and took the clerk’s pen when you signed the receipt. Now, you’re going back to return it.",
      example:
        "I’m so sorry. I wasn’t paying attention and I accidentally took your pen.",
      label: "Clerk:",
    },

    {
      text: "The clerk did not give you enough change back when you overpaid for an item.",
      example:
        "Pardon me. I gave you $20, but you gave me back change for $10. Here’s the change you gave me, and there’s my $20 on the register.",
      label: "Clerk:",
    },

    {
      text: "The server gave you the wrong food; you ordered something different.",
      label: "Server:",
    },
  ];

  // reset
  const handleReset = () => {
    setAnswers(["", "", ""]);

    setFoodAnswer("");
  };

  // update
  const updateAnswer = (index, value) => {
    const updated = [...answers];
    updated[index] = value;

    setAnswers(updated);
  };

  return (
    <div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-10">
        <span className="ex-A-read mr-2">A</span>
        Read the situations and write a polite answer for the clerk or server.
      </h5>

      {/* QUESTIONS */}
      <div className="space-y-10 text-[18px] mt-10">
        {situations.map((item, i) => (
          <div key={i}>
            {/* NUMBER + TEXT */}
            <div className="flex gap-4 mb-4">
              <span className="font-bold">{i + 1}</span>

              <span>{item.text}</span>
            </div>

            {/* EXAMPLES */}
            {i !== 2 ? (
              <div className="ml-8 text-[#00AEEF] leading-normal mb-4">
                {item.example}
              </div>
            ) : (
              <div className="ml-8 text-[#00AEEF] leading-normal mb-4 flex flex-wrap items-center">
                <span>
                  Sorry to bother you, but this is not what I ordered. Could I
                  please get a
                </span>

                <input
                  type="text"
                  value={foodAnswer}
                  onChange={(e) => setFoodAnswer(e.target.value)}
                  className="border-b border-[#00AEEF] outline-none w-[140px] mx-2 bg-transparent text-[#6D2980] font-semibold text-center"
                />

                <span>instead?</span>
              </div>
            )}

            {/* LABEL + INPUT */}
            <div className="ml-8 flex items-center">
              <span className="text-[#00AEEF] font-semibold mr-2">
                {item.label}
              </span>

              <input
                type="text"
                value={answers[i]}
                onChange={(e) => updateAnswer(i, e.target.value)}
                className="border-b border-black outline-none flex-1 px-2 bg-transparent text-[#6D2980] font-semibold"
              />
            </div>
          </div>
        ))}
      </div>

      {/* RESET BUTTON */}
      <div className="flex justify-center mt-10">
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
      </div>
    </div>
  );
};

export default Unit4_Page6_SpeakingA;
