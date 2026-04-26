import React, { useState, useEffect } from "react";

const WritingB = ({ onChange, locked, showTrigger, resetTrigger }) => {
  const [answers, setAnswers] = useState({
    topic: "",
    who: "",
    what: "",
    when: "",
    where: "",
    how: "",
    why: "",
  });

  useEffect(() => {
    onChange(answers);
  }, [answers]);
  
  useEffect(() => {
    if (resetTrigger) {
      setAnswers({
        topic: "",
        who: "",
        what: "",
        when: "",
        where: "",
        how: "",
        why: "",
      });
    }
  }, [resetTrigger]);
  
  const handleChange = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const inputStyle =
    "border-b border-black outline-none flex-1 mx-2 px-1 bg-transparent text-left";

  return (
    <div>
      {/* العنوان */}{" "}
      <h5 className="header-title-page8-read pb-2.5">
        <span className="ex-A-read" style={{ marginRight: "10px" }}>
          B{" "}
        </span>
        Choose a topic that interests you. Answer the questions below about your
        topic.{" "}
      </h5>
      <div className="space-y-4 text-sm">
        {/* Topic */}
        <div className="flex items-center gap-2">
          <span>Topic:</span>
          <input
            disabled={locked}
            value={answers.topic}
            onChange={(e) => handleChange("topic", e.target.value)}
            className={inputStyle}
          />
        </div>

        {/* Who */}
        <div className="flex items-center gap-2">
          <span>Who?</span>
          <input
            disabled={locked}
            value={answers.who}
            onChange={(e) => handleChange("who", e.target.value)}
            className={inputStyle}
          />
        </div>

        {/* What */}
        <div className="flex items-center gap-2">
          <span>What?</span>
          <input
            disabled={locked}
            value={answers.what}
            onChange={(e) => handleChange("what", e.target.value)}
            className={inputStyle}
          />
        </div>

        {/* When + Where */}
        <div className="flex gap-6">
          <div className="flex items-center gap-2 flex-1">
            <span>When?</span>
            <input
              disabled={locked}
              value={answers.when}
              onChange={(e) => handleChange("when", e.target.value)}
              className={inputStyle}
            />
          </div>

          <div className="flex items-center gap-2 flex-1">
            <span>Where?</span>
            <input
              disabled={locked}
              value={answers.where}
              onChange={(e) => handleChange("where", e.target.value)}
              className={inputStyle}
            />
          </div>
        </div>

        {/* How + Why */}
        <div className="flex gap-6">
          <div className="flex items-center gap-2 flex-1">
            <span>How?</span>
            <input
              disabled={locked}
              value={answers.how}
              onChange={(e) => handleChange("how", e.target.value)}
              className={inputStyle}
            />
          </div>

          <div className="flex items-center gap-2 flex-1">
            <span>Why?</span>
            <input
              disabled={locked}
              value={answers.why}
              onChange={(e) => handleChange("why", e.target.value)}
              className={inputStyle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingB;
