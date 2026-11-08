import React, { useState } from "react";
import img from "../../../assets/imgs/pages/classbook/Right 5 Unit 1 How Late Am I Folder/Page 6/SVG/Asset 1.svg";
const activationKeys = {
  onKeyDown: event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) event.currentTarget.click();
  },
  onKeyUp: event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }
  }
};
const GrammarA = () => {
  const [examples, setExamples] = useState(["often", "barber sometimes"]);
  const choose = (row, value) => {
    setExamples(previous => previous.map((old, i) => i === row ? value : old));
    setAnnouncement("Example " + (row + 1) + " changed to " + value + ".");
  };
  const [announcement, setAnnouncement] = useState("");
  return <div data-exercise-scope="Unit4_Page3_GrammarA.jsx"><style>{`[data-exercise-scope="Unit4_Page3_GrammarA.jsx"] input:focus-visible,[data-exercise-scope="Unit4_Page3_GrammarA.jsx"] textarea:focus-visible,[data-exercise-scope="Unit4_Page3_GrammarA.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style><div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      {/* العنوان */}
      <div className="flex items-center gap-2 mb-5 mt-5">
        <h5 className="header-title-page8-read ">
          <span className="ex-A-read" style={{
          marginRight: "10px"
        }}>
            A
          </span>
          Read and say. Replace the highlighted words with the new words.
        </h5>
      </div>

      {/* السؤال 1 */}
      <div className="mb-12">
        <div className="flex items-start gap-5 mt-7">
          <img src={img} alt="" style={{
          width: "40px",
          height: "40px",
          marginTop: -6
        }} />

          <div>
            <p className=" text-[18px]">
              Sally <span className="text-[#12C8F9]"> {examples[0]} </span> studies at
              the library.
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px] w-[900px]">
              <span {...activationKeys} onClick={() => choose(0, "sometimes")} aria-pressed={examples[0] === "sometimes"} aria-label={"Use sometimes in example 1"} data-choice={true} tabIndex={0} role={"button"}>
                <b>1</b> sometimes
              </span>
              <span {...activationKeys} onClick={() => choose(0, "rarely")} aria-pressed={examples[0] === "rarely"} aria-label={"Use rarely in example 1"} data-choice={true} tabIndex={0} role={"button"}>
                <b>2</b> rarely
              </span>
              <span {...activationKeys} onClick={() => choose(0, "usually")} aria-pressed={examples[0] === "usually"} aria-label={"Use usually in example 1"} data-choice={true} tabIndex={0} role={"button"}>
                <b>3</b> usually
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* السؤال 2 */}
      <div>
        <div className="flex items-start gap-5 mt-7">
          <img src={img} alt="" style={{
          width: "40px",
          height: "40px",
          marginTop: -6
        }} />

          <div>
            <p className=" text-[18px]">
              Does the{" "}
              <span className="text-[#12C8F9]"> {examples[1]} </span>{" "}
              work on Sunday?
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px] w-[900px]">
              <span {...activationKeys} onClick={() => choose(1, "fisherman usually")} aria-pressed={examples[1] === "fisherman usually"} aria-label={"Use fisherman usually in example 2"} data-choice={true} tabIndex={0} role={"button"}>
                <b>1</b> fisherman usually
              </span>
              <span {...activationKeys} onClick={() => choose(1, "fireman frequently")} aria-pressed={examples[1] === "fireman frequently"} aria-label={"Use fireman frequently in example 2"} data-choice={true} tabIndex={0} role={"button"}>
                <b>2</b> fireman frequently
              </span>
              <span {...activationKeys} onClick={() => choose(1, "baker often")} aria-pressed={examples[1] === "baker often"} aria-label={"Use baker often in example 2"} data-choice={true} tabIndex={0} role={"button"}>
                <b>3</b> baker often
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default GrammarA;
