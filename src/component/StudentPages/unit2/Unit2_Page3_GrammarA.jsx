import React, { useState } from "react";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 6/SVG/Asset 1.svg";
const activationKeys = {
  onKeyDown: (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  },
};

const GrammarA = () => {
  const [examples, setExamples] = useState([
    "who design the best roller coaster",
    "that has the bells on its feet",
  ]);
  const [announcement, setAnnouncement] = useState("");
  const choose = (row, text) => {
    setExamples((previous) =>
      previous.map((value, index) => (index === row ? text : value)),
    );
    setAnnouncement("Example " + (row + 1) + " now uses " + text + ".");
  };
  return (
    <div data-exercise-scope="Unit2_Page3_GrammarA.jsx">
      <style>{`[data-exercise-scope="Unit2_Page3_GrammarA.jsx"] input:focus-visible,[data-exercise-scope="Unit2_Page3_GrammarA.jsx"] textarea:focus-visible,[data-exercise-scope="Unit2_Page3_GrammarA.jsx"] [data-choice]:focus-visible {outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      {/* العنوان */}
      <div className="flex items-center gap-2 mb-5 mt-5">
        <h5 className="header-title-page8-read pb-2.5">
          <span className="ex-A-read" style={{ marginRight: "10px" }}>
            A
          </span>
          Read and say. Replace the highlighted words with the new words.
        </h5>
      </div>

      {/* السؤال 1 */}
      <div className="mb-12">
        <div className="flex items-start gap-5 mt-7">
          <img
            src={img}
            alt=""
            style={{ width: "40px", height: "40px", marginTop: -6 }}
          />

          <div>
            <p className=" text-[18px]">
              The students{" "}
              <span className="text-[#12C8F9]"> {examples[0]} </span> get a
              special trophy.
            </p>

            <div className="flex flex-wrap gap-10 mt-5 text-[17px] ">
              <span
                role="button"
                tabIndex={0}
                data-choice
                {...activationKeys}
                aria-label="Use who win the race in example 1"
                aria-pressed={examples[0] === "who win the race"}
                onClick={() => choose(0, "who win the race")}
                style={{ borderRadius: 6, cursor: "pointer" }}
              >
                <b>1</b> who win the race
              </span>
              <span
                role="button"
                tabIndex={0}
                data-choice
                {...activationKeys}
                aria-label="Use who help with the charity project in example 1"
                aria-pressed={
                  examples[0] === "who help with the charity project"
                }
                onClick={() => choose(0, "who help with the charity project")}
                style={{ borderRadius: 6, cursor: "pointer" }}
              >
                <b>2</b> who help with the charity project
              </span>
              <span
                role="button"
                tabIndex={0}
                data-choice
                {...activationKeys}
                aria-label="Use who were on the winning team in example 1"
                aria-pressed={examples[0] === "who were on the winning team"}
                onClick={() => choose(0, "who were on the winning team")}
                style={{ borderRadius: 6, cursor: "pointer" }}
              >
                <b>3</b> who were on the winning team
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* السؤال 2 */}
      <div>
        <div className="flex items-start gap-5 mt-7">
          <img
            src={img}
            alt=""
            style={{ width: "40px", height: "40px", marginTop: -6 }}
          />

          <div>
            <p className=" text-[18px]">
              Did you ride the elephant{" "}
              <span className="text-[#12C8F9]"> {examples[1]}</span> ?
            </p>

            <div className="flex flex-wrap gap-10 mt-5 text-[17px]">
              <span
                role="button"
                tabIndex={0}
                data-choice
                {...activationKeys}
                aria-label="Use that ate the peanuts in example 2"
                aria-pressed={examples[1] === "that ate the peanuts"}
                onClick={() => choose(1, "that ate the peanuts")}
                style={{ borderRadius: 6, cursor: "pointer" }}
              >
                <b>1</b> that ate the peanuts
              </span>
              <span
                role="button"
                tabIndex={0}
                data-choice
                {...activationKeys}
                aria-label="Use that has the big ears in example 2"
                aria-pressed={examples[1] === "that has the big ears"}
                onClick={() => choose(1, "that has the big ears")}
                style={{ borderRadius: 6, cursor: "pointer" }}
              >
                <b>2</b> that has the big ears
              </span>
              <span
                role="button"
                tabIndex={0}
                data-choice
                {...activationKeys}
                aria-label="Use that touched me with its trunk in example 2"
                aria-pressed={examples[1] === "that touched me with its trunk"}
                onClick={() => choose(1, "that touched me with its trunk")}
                style={{ borderRadius: 6, cursor: "pointer" }}
              >
                <b>3</b> that touched me with its trunk
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;
