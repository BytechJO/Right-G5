import React, { useState, useEffect } from "react";

const WritingA = ({ resetTrigger }) => {
  const [answers, setAnswers] = useState({
    name: "",
    think: "",
    look: "",
    other: "",
  });

  const handleChange = (field, value) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (resetTrigger) {
      setAnswers({
        name: "",
        think: "",
        look: "",
        other: "",
      });
    }
  }, [resetTrigger]);

  return (
    <div className="space-y-6">
      {/* العنوان */}
      <h5 className="header-title-page8-read">
        <span className="ex-A-read mr-2">A</span>
        Choose a character to write about. Give the character a name. Tell about
        what the
        <br /> character thinks about, what the character does, what they look
        like, etc.
      </h5>

      {/* 1 */}
      <div>
        <span className="font-bold mr-2">1</span>
        Character’s name:
        <input
          value={answers.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="border-b-2 border-black outline-none ml-2 w-[60%] bg-transparent"
        />
      </div>

      {/* 2 */}
      <div>
        <span className="font-bold mr-2">2</span>
        What does the character think about?

        <div className="mt-2 space-y-2">
          <input
            value={answers.think}
            onChange={(e) => handleChange("think", e.target.value)}
            className="w-full outline-none border-b-2 border-black bg-transparent"
          />
          <div className="border-b-2 border-black"></div>
        </div>
      </div>

      {/* 3 */}
      <div>
        <span className="font-bold mr-2">3</span>
        What do they look like?

        <div className="mt-2 space-y-2">
          <input
            value={answers.look}
            onChange={(e) => handleChange("look", e.target.value)}
            className="w-full outline-none border-b-2 border-black bg-transparent"
          />
          <div className="border-b-2 border-black"></div>
        </div>
      </div>

      {/* 4 */}
      <div>
        <span className="font-bold mr-2">4</span>
        Other information about your character:

        <div className="mt-2 space-y-2">
          <input
            value={answers.other}
            onChange={(e) => handleChange("other", e.target.value)}
            className="w-full outline-none border-b-2 border-black bg-transparent"
          />
          <div className="border-b-2 border-black"></div>
        </div>
      </div>
    </div>
  );
};

export default WritingA;