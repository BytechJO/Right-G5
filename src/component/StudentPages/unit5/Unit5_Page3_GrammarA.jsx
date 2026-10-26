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
  const [examples, setExamples] = useState(["bring more water", "black tea"]);
  const choose = (row, value) => {
    setExamples((previous) =>
      previous.map((old, i) => (i === row ? value : old)),
    );
    setAnnouncement("Example " + (row + 1) + " changed to " + value + ".");
  };
  const audio = useExerciseAudio();
  const [announcement, setAnnouncement] = useState("");
  return (
    <div data-exercise-scope={"Unit5_Page3_GrammarA.jsx"}>
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit5_Page3_GrammarA.jsx"] input:focus-visible,[data-exercise-scope="Unit5_Page3_GrammarA.jsx"] textarea:focus-visible,[data-exercise-scope="Unit5_Page3_GrammarA.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
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
          <span
            className="ex-A-read"
            style={{
              marginRight: "10px",
            }}
          >
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
            style={{
              width: "40px",
              height: "40px",
              marginTop: -6,
            }}
          />

          <div>
            <p className=" text-[18px]">
              Would you please{" "}
              <span className="text-[#12C8F9]"> {examples[0]} </span>?
            </p>

            <div className="grid grid-cols-3 mt-5 text-[17px]">
              <span
                {...activationKeys}
                onClick={() => choose(0, "close the door")}
                aria-pressed={examples[0] === "close the door"}
                aria-label={"Use close the door in example 1"}
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b className="mr-2">1</b> close the door
              </span>
              <span
                {...activationKeys}
                onClick={() => choose(0, "do your homework")}
                aria-pressed={examples[0] === "do your homework"}
                aria-label={"Use do your homework in example 1"}
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b className="mr-2">2</b>do your homework
              </span>
              <span
                {...activationKeys}
                onClick={() => choose(0, "listen to the instructions")}
                aria-pressed={examples[0] === "listen to the instructions"}
                aria-label={"Use listen to the instructions in example 1"}
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b className="mr-2">3</b> listen to the instructions
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
            style={{
              width: "40px",
              height: "40px",
              marginTop: -6,
            }}
          />

          <div>
            <p className=" text-[18px]">
              I would prefer
              <span className="text-[#12C8F9]"> {examples[1]} </span> , please.
            </p>

            <div className="grid grid-cols-3 gap-10 mt-5 text-[17px]">
              <span
                {...activationKeys}
                onClick={() => choose(1, "wheat bread")}
                aria-pressed={examples[1] === "wheat bread"}
                aria-label={"Use wheat bread in example 2"}
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b className="mr-2">1</b> wheat bread
              </span>
              <span
                {...activationKeys}
                onClick={() => choose(1, "vanilla ice cream")}
                aria-pressed={examples[1] === "vanilla ice cream"}
                aria-label={"Use vanilla ice cream in example 2"}
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b className="mr-2">2</b> vanilla ice cream
              </span>
              <span
                {...activationKeys}
                onClick={() => choose(1, "fried chicken")}
                aria-pressed={examples[1] === "fried chicken"}
                aria-label={"Use fried chicken in example 2"}
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b className="mr-2">3</b> fried chicken
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GrammarA;
