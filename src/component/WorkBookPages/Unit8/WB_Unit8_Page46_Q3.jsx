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

  const inputField = (i, width = "260px") => (
    <input
      type="text"
      value={studentAnswers[i]}
      disabled={locked}
      onChange={(e) => handleChange(i, e.target.value)}
      className="
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
      style={{
        width,
      }}
    />
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
            <div className="flex items-center gap-3 mb-5">
              <span className="font-bold">1</span>

              <div>Can {inputField(0)} please help me carry these books?</div>
            </div>

            <div className="pl-[35px] ">
              Sure, {inputField(1, "350px")} will help.
            </div>
          </div>

          {/* QUESTION 2 */}

          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="font-bold">2</span>

              <div className="">
                Is {inputField(2)} ready for the hot-air balloon ride?
              </div>
            </div>

            <div className="pl-[35px] ">
              No, there’s {inputField(3, "320px")} who is ready.
            </div>
          </div>

          {/* QUESTION 3 */}

          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="font-bold">3</span>

              <div>Will {inputField(4, "330px")} visit me today?</div>
            </div>

            <div className="pl-[35px] ">
              Yes, {inputField(5, "330px")} is coming over.
            </div>
          </div>

          {/* QUESTION 4 */}

          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="font-bold">4</span>

              <div>Did you ride {inputField(6, "360px")} in the carnival?</div>
            </div>

            <div className="pl-[35px] ">
              Yes, I rode {inputField(7, "360px")} .
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
