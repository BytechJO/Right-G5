import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

const WB_Unit8_Page46_Q3 = () => {
  const answers = [
    "somebody",
    "someone",

    "everyone",
    "no one",

    "somebody",
    "someone",

    "everything",
    "everything",
  ];

  const [studentAnswers, setStudentAnswers] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [locked, setLocked] = useState(false);

  // ------------------------
  // HANDLE INPUT
  // ------------------------

  const handleChange = (i, value) => {
    if (locked) return;

    const updated = [...studentAnswers];

    updated[i] = value;

    setStudentAnswers(updated);
  };

  // ------------------------
  // SHOW ANSWERS
  // ------------------------

  const showAnswers = () => {
    setStudentAnswers(answers);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    setStudentAnswers(["", "", "", "", "", "", "", ""]);

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i) => (
    <div className="relative inline-flex flex-1">
      <input
        type="text"
        value={studentAnswers[i]}
        disabled={locked}
        onChange={(e) => handleChange(i, e.target.value)}
        className="
        w-full
        border-0
        border-b
        border-black
        outline-none
        bg-transparent

        text-[18px]
        text-[#6D2980]
        font-semibold

        px-1
      "
      />
    </div>
  );

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <h5 className="header-title-page8 mb-10 leading-[1.4]">
          <span
            className="ex-A"
            style={{
              marginRight: "10px",
            }}
          >
            E
          </span>
          Read and write the correct{" "}
          <span className="text-[#00AEEF]">indefinite pronouns</span> to
          complete each sentence.
        </h5>

        {/* QUESTIONS */}
        <div className="flex flex-col gap-8 leading-loose">
          {/* QUESTION 1 */}

          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="font-bold mr-1">1</span>

              <span>Can</span>

              {inputField(0)}

              <span>please help me carry these books?</span>
            </div>

            <div className="pl-[25px] flex items-center gap-2">
              <span>Sure,</span>

              {inputField(1)}

              <span>will help.</span>
            </div>
          </div>

          {/* QUESTION 2 */}

          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="font-bold mr-1">2</span>

              <span>Is</span>

              {inputField(2)}

              <span>ready for the hot-air balloon ride?</span>
            </div>

            <div className="pl-[25px] flex items-center gap-2">
              <span>No, there’s</span>

              {inputField(3)}

              <span>who is ready.</span>
            </div>
          </div>

          {/* QUESTION 3 */}

          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="font-bold mr-1">3</span>

              <span>Will</span>

              {inputField(4)}

              <span>visit me today?</span>
            </div>

            <div className="pl-[25px] flex items-center gap-2">
              <span>Yes,</span>

              {inputField(5)}

              <span>is coming over.</span>
            </div>
          </div>

          {/* QUESTION 4 */}

          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="font-bold mr-1">4</span>

              <span>Did you ride</span>

              {inputField(6)}

              <span>in the carnival?</span>
            </div>

            <div className="pl-[25px] flex items-center gap-2">
              <span>Yes, I rode</span>

              {inputField(7)}

              <span>.</span>
            </div>
          </div>
        </div>
      </div>

      {/* BUTTONS */}

      <div className="action-buttons-container">
        <button className="try-again-button" onClick={handleReset}>
          Start Again ↻
        </button>

        <button className="show-answer-btn" onClick={showAnswers}>
          Show Answer
        </button>
      </div>
    </div>
  );
};

export default WB_Unit8_Page46_Q3;
