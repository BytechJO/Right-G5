/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

const WritingA = ({ onChange, locked, showTrigger, resetTrigger }) => {
  const [answers, setAnswers] = useState({
    who: "Ed Leedskalnin",
    what: "",
    when: "",
    where: "",
    how: "",
    why: "",
  });
  const correct = {
    what: "Built the Coral Castle by himself.",
    when: "in the 1900s",
    where: "the state of Florida in the U.S.",
    how: "Maybe pulleys, or magnets, but no one really knows",
    why: "To build a castle",
  };
  useEffect(() => {
    onChange(answers);
  }, [answers]);
  useEffect(() => {
    if (showTrigger) {
      setAnswers((prev) => ({
        ...prev,
        ...correct,
      }));
    }
  }, [showTrigger]);
  useEffect(() => {
    if (resetTrigger) {
      setAnswers({
        who: "Ed Leedskalnin",
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

  const inputStyle = "border-b border-black outline-none mx-2 w-[180px] ";

  return (
    <div>
      <h5 className="header-title-page8-read pb-2.5">
        <span className="ex-A-read" style={{ marginRight: "10px" }}>
          A
        </span>
        Use the information from the article to write a short answer for each
        question.
      </h5>

      <div className="space-y-4 text-sm">
        {/* Who */}
        <div className="flex  gap-2">
          <span>Who?</span>
          <span className="underline flex-1">Ed Leedskalnin</span>
        </div>

        {/* What */}
        <div className="flex  gap-2">
          <span>What?</span>
          <input
            value={answers.what}
            onChange={(e) => handleChange("what", e.target.value)}
            className={`${inputStyle} flex-1 ${
              locked ? "text-[#6D2980] font-medium" : ""
            }`}
          />
        </div>

        {/* When + Where */}
        <div className="flex gap-6">
          <div className="flex  gap-2 flex-1">
            <span>When?</span>
            <input
              value={answers.when}
              onChange={(e) => handleChange("when", e.target.value)}
              className={`${inputStyle} flex-1 ${
                locked ? "text-[#6D2980] font-medium" : ""
              }`}
            />
          </div>

          <div className="flex  gap-2 flex-1">
            <span>Where?</span>
            <input
              value={answers.where}
              onChange={(e) => handleChange("where", e.target.value)}
              className={`${inputStyle} flex-1 ${
                locked ? "text-[#6D2980] font-medium" : ""
              }`}
            />
          </div>
        </div>

        {/* How + Why */}
        <div className="flex gap-6">
          <div className="flex  gap-2 flex-1">
            <span>How?</span>
            <input
              value={answers.how}
              onChange={(e) => handleChange("how", e.target.value)}
              className={`${inputStyle} flex-1 ${
                locked ? "text-[#6D2980] font-medium" : ""
              }`}
            />
          </div>

          <div className="flex  gap-2 flex-1">
            <span>Why?</span>
            <input
              value={answers.why}
              onChange={(e) => handleChange("why", e.target.value)}
              className={`${inputStyle} flex-1 ${
                locked ? "text-[#6D2980] font-medium" : ""
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingA;
