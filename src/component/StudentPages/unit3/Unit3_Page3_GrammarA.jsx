import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import { SentenceGroup } from "./SentenceAudio";
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
    "tall",
    { subject: "milk", adjective: "sour" },
  ]);
  const choose = (row, value) => {
    setExamples((previous) =>
      previous.map((old, i) => (i === row ? value : old)),
    );
    setAnnouncement("Example " + (row + 1) + " changed.");
  };

  const audio = useExerciseAudio();

  const [announcement, setAnnouncement] = useState("");

  return (
    <div data-exercise-scope="Unit3_Page3_GrammarA.jsx">
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit3_Page3_GrammarA.jsx"] input:focus-visible,[data-exercise-scope="Unit3_Page3_GrammarA.jsx"] textarea:focus-visible,[data-exercise-scope="Unit3_Page3_GrammarA.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb;outline-offset:3px;border-radius:6px;}`}</style>
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
        <div className="flex items-start gap-5 mt-7 ">
          <img
            src={img}
            alt=""
            style={{ width: "40px", height: "40px", marginTop: -6 }}
          />

          <div>
            <p className=" text-[18px] ml-2.5">
              Jimmy is
              <span className="text-[#12C8F9]"> {examples[0]} </span> .
            </p>

            <div className="grid grid-cols-3 gap-15 mt-5 ml-2.5 text-[17px]">
              <span
                {...activationKeys}
                onClick={() => choose(0, "a dentist")}
                aria-pressed={examples[0] === "a dentist"}
                aria-label={"Use a dentist in example 1"}
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b>1</b> a dentist
              </span>
              <span
                {...activationKeys}
                onClick={() => choose(0, "athletic")}
                aria-pressed={examples[0] === "athletic"}
                aria-label={"Use athletic in example 1"}
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b>2</b> athletic
              </span>
              <span
                {...activationKeys}
                onClick={() => choose(0, "slim")}
                aria-pressed={examples[0] === "slim"}
                aria-label={"Use slim in example 1"}
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b>3</b> slim
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
              Does the{" "}
              <span className="text-[#12C8F9]"> {examples[1].subject} </span>{" "}
              taste{" "}
              <span className="text-[#12C8F9]">{examples[1].adjective}</span> ?
            </p>

            <div className="grid grid-cols-3 gap-15 mt-5 text-[17px]">
              <span
                {...activationKeys}
                onClick={() =>
                  choose(1, { subject: "bread", adjective: "stale" })
                }
                aria-pressed={examples[1].subject === "bread"}
                aria-label={"Use bread, stale in example 2"}
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b>1</b> bread, stale
              </span>
              <span
                {...activationKeys}
                onClick={() =>
                  choose(1, { subject: "lemon", adjective: "bitter" })
                }
                aria-pressed={examples[1].subject === "lemon"}
                aria-label={"Use lemon, bitter in example 2"}
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b>2</b> lemon, bitter
              </span>
              <span
                {...activationKeys}
                onClick={() =>
                  choose(1, { subject: "cake", adjective: "sweet" })
                }
                aria-pressed={examples[1].subject === "cake"}
                aria-label={"Use cake, sweet in example 2"}
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b>3</b> cake, sweet
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;
