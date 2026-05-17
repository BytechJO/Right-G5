import React from "react";

const Unit10_Page3_GrammarB = () => {
  const boxes = [
    "they ride bikes",
    "we read books",
    "you play piano",
    "I play soccer",
    "Ann and Alice shop",
  ];

  return (
    <div>
      {/* HEADER */}
      <h5 className="header-title-page8-read mb-6 leading-relaxed">
        <span className="ex-A-read mr-2">B</span>
        Read, and then substitute the given words or phrases.
      </h5>

      {/* SENTENCE */}
      <p className="text-[18px] mb-8 leading-relaxed mt-10">
        During the summer,
        <span className="text-[#1ea7ff]"> she was waterskiing</span> a lot.
      </p>

      {/* BOXES */}
      <div className="border-2 border-[#7A2D91] rounded-2xl overflow-hidden flex text-[18px]">
        {boxes.map((box, i) => (
          <div
            key={i}
            className={`flex items-center justify-center text-center px-6 py-5 min-h-20 flex-1
            ${i !== boxes.length - 1 ? "border-r-2 border-[#7A2D91]" : ""}
            `}
          >
            {box}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Unit10_Page3_GrammarB;
