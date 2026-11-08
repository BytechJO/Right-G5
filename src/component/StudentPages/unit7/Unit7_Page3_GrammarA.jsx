import { useExerciseAudio } from "../unit5/useExerciseAudio";
import { AudioFeedback } from "../unit5/ExerciseAudioText";

import React from "react";
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
  const [examples, setExamples] = React.useState([
    " playing in the finals",
    " players winning the first game",
  ]);
  const choose = (row, value) => {
    setExamples((previous) =>
      previous.map((old, i) => (i === row ? " " + value : old)),
    );
    setAnnouncement("Example " + (row + 1) + " changed to " + value);
  };
  const audio = useExerciseAudio();
  const [announcement, setAnnouncement] = React.useState("");

  return (
    <div data-exercise-scope={"Unit7_Page3_GrammarA.jsx"}>
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit7_Page3_GrammarA.jsx"] input:focus-visible,[data-exercise-scope="Unit7_Page3_GrammarA.jsx"] textarea:focus-visible,[data-exercise-scope="Unit7_Page3_GrammarA.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      {/* العنوان */}
      <div className="flex items-center gap-2 mb-5 mt-5">
        <h5 className="header-title-page8-read ">
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
              My brother is
              <span className="text-[#12C8F9]">{examples[0]}</span>.
            </p>

            <div className="flex flex-wrap justify-center gap-10 mt-5 text-[17px]">
              <span
                {...activationKeys}
                onClick={() => choose(0, "jumping on the trampoline")}
                aria-pressed={
                  examples[0].trim() === "jumping on the trampoline"
                }
                aria-label={"Use jumping on the trampoline in example 1"}
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b className="mr-2">1</b>jumping on the trampoline
              </span>
              <span
                {...activationKeys}
                onClick={() => choose(0, "catching butterflies in the net")}
                aria-pressed={
                  examples[0].trim() === "catching butterflies in the net"
                }
                aria-label={"Use catching butterflies in the net in example 1"}
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b className="mr-2">2</b>catching butterflies in the net
              </span>
              <span
                {...activationKeys}
                onClick={() => choose(0, "jumping rope in the gym")}
                aria-pressed={examples[0].trim() === "jumping rope in the gym"}
                aria-label={"Use jumping rope in the gym in example 1"}
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b className="mr-2">3</b>jumping rope in the gym
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
              Are the
              <span className="text-[#12C8F9]">{examples[1]}</span>?
            </p>

            <div className="flex flex-wrap justify-start gap-10 mt-5 text-[17px]">
              <span
                {...activationKeys}
                onClick={() =>
                  choose(1, "squirrels searching the grass for nuts")
                }
                aria-pressed={
                  examples[1].trim() ===
                  "squirrels searching the grass for nuts"
                }
                aria-label={
                  "Use squirrels searching the grass for nuts in example 2"
                }
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b className="mr-2">1</b>squirrels searching the grass for nuts
              </span>
              <span
                {...activationKeys}
                onClick={() =>
                  choose(1, "violinists playing for the first time")
                }
                aria-pressed={
                  examples[1].trim() === "violinists playing for the first time"
                }
                aria-label={
                  "Use violinists playing for the first time in example 2"
                }
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b className="mr-2">2</b>violinists playing for the first time
              </span>
              <span
                {...activationKeys}
                onClick={() => choose(1, "farmers harvesting the wheat")}
                aria-pressed={
                  examples[1].trim() === "farmers harvesting the wheat"
                }
                aria-label={"Use farmers harvesting the wheat in example 2"}
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b className="mr-2">3</b>farmers harvesting the wheat
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;
