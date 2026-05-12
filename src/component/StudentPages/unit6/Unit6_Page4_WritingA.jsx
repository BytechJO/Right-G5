import React, { useState } from "react";
import { FaRedo, FaEye } from "react-icons/fa";

const Unit6_Page4_WritingA = () => {
  const correctAnswers = [
    "Can I come over to your house?",
    "We could go out and do a few things.",
    "Around five o’clock or so. We could get something to eat.",
    "We could get something to eat from a place.",
    "No, I’m not really in the mood for ice cream. We could pick up something from the store like fruit. Just something light.",
    "I ought to be there at five o’clock then.",
  ];

  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);

  const [locked, setLocked] = useState(false);

  // show
  const handleShow = () => {
    setAnswers(correctAnswers);

    setLocked(true);
  };

  // reset
  const handleReset = () => {
    setAnswers(["", "", "", "", "", ""]);

    setLocked(false);
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
      <h5 className="header-title-page8-read mb-10 leading-relaxed">
        <span className="ex-A-read mr-2">A</span>
        Now finish the conversation by writing what you think the other person
        might have said. Use modal verbs.
      </h5>

      {/* CONVERSATION */}
      <div className="space-y-5 text-[16px] mt-10">
        {/* 1 */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[#27aae1] font-medium">Person A:</span>

            <div className="flex-1">
              <input
                type="text"
                value={answers[0]}
                disabled={locked}
                onChange={(e) => updateAnswer(0, e.target.value)}
                className="border-b border-black outline-none w-full text-[#6D2980] font-medium px-2 bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* fixed */}
        <div className="flex gap-2">
          <span className="text-[#27aae1] font-medium">Person B:</span>

          <span>Really? Today?</span>
        </div>

        {/* 2 */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[#27aae1] font-medium">Person A:</span>

            <div className="flex-1">
              <input
                type="text"
                value={answers[1]}
                disabled={locked}
                onChange={(e) => updateAnswer(1, e.target.value)}
                className="border-b border-black outline-none w-full text-[#6D2980] font-medium px-2 bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* fixed */}
        <div className="flex gap-2">
          <span className="text-[#27aae1] font-medium">Person B:</span>

          <span>Oh, that’s wonderful! What time are you coming?</span>
        </div>

        {/* 3 */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[#27aae1] font-medium">Person A:</span>

            <div className="flex-1">
              <input
                type="text"
                value={answers[2]}
                disabled={locked}
                onChange={(e) => updateAnswer(2, e.target.value)}
                className="border-b border-black outline-none w-full text-[#6D2980] font-medium px-2 bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* fixed */}
        <div className="flex gap-2">
          <span className="text-[#27aae1] font-medium">Person B:</span>

          <span>Are you kidding? How will I get dinner cooked that fast?</span>
        </div>

        {/* 4 */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[#27aae1] font-medium">Person A:</span>

            <div className="flex-1">
              <input
                type="text"
                value={answers[3]}
                disabled={locked}
                onChange={(e) => updateAnswer(3, e.target.value)}
                className="border-b border-black outline-none w-full text-[#6D2980] font-medium px-2 bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* fixed */}
        <div className="flex gap-2 leading-relaxed">
          <span className="text-[#27aae1] font-medium">Person B:</span>

          <span>
            I’d rather do that so I won’t have to cook, and we can have a nice
            visit. Would you like to get ice cream? There’s an ice cream shop
            not too far away from the restaurant.
          </span>
        </div>

        {/* 5 */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[#27aae1] font-medium">Person A:</span>

            <div className="flex-1">
              <input
                type="text"
                value={answers[4]}
                disabled={locked}
                onChange={(e) => updateAnswer(4, e.target.value)}
                className="border-b border-black outline-none w-full text-[#6D2980] font-medium px-2 bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* fixed */}
        <div className="flex gap-2">
          <span className="text-[#27aae1] font-medium">Person B:</span>

          <span>
            Oh, okay. We’ll pick up some fruit on the way home instead.
          </span>
        </div>

        {/* 6 */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[#27aae1] font-medium">Person A:</span>

            <div className="flex-1">
              <input
                type="text"
                value={answers[5]}
                disabled={locked}
                onChange={(e) => updateAnswer(5, e.target.value)}
                className="border-b border-black outline-none w-full text-[#6D2980] font-medium px-2 bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* fixed */}
        <div className="flex gap-2">
          <span className="text-[#27aae1] font-medium">Person A:</span>

          <span>Okay, I’ll see you then. Thanks so much for calling!</span>
        </div>
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
      </div>
    </div>
  );
};

export default Unit6_Page4_WritingA;
