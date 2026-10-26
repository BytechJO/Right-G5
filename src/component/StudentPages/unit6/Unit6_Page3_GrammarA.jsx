import { useExerciseAudio } from "../unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
  AudioSpeaker,
} from "../unit5/ExerciseAudioText";
import { SentenceGroup, SentencePart } from "../unit5/SentenceAudio";
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
    "go to the concert",
    " art gallery",
  ]);
  const choose = (row, value) => {
    setExamples((previous) =>
      previous.map((old, i) => (i === row ? value : old)),
    );
    setAnnouncement("Example " + (row + 1) + " changed to " + value);
  };
  const audio = useExerciseAudio();
  const [announcement, setAnnouncement] = React.useState("");

  return (
    <div data-exercise-scope={"Unit6_Page3_GrammarA.jsx"}>
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit6_Page3_GrammarA.jsx"] input:focus-visible,[data-exercise-scope="Unit6_Page3_GrammarA.jsx"] textarea:focus-visible,[data-exercise-scope="Unit6_Page3_GrammarA.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
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
              Shall we <span className="text-[#12C8F9]">{examples[0]}</span>?
            </p>

            <div className="grid grid-cols-3 mt-5 text-[17px]">
              <span
                {...activationKeys}
                onClick={() => choose(0, "sing together")}
                aria-pressed={examples[0].trim() === "sing together"}
                aria-label={"Use sing together in example 1"}
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b className="mr-2">1</b>sing together
              </span>
              <span
                {...activationKeys}
                onClick={() => choose(0, "go to the beach on Thursday")}
                aria-pressed={
                  examples[0].trim() === "go to the beach on Thursday"
                }
                aria-label={"Use go to the beach on Thursday in example 1"}
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b className="mr-2">2</b>go to the beach on Thursday
              </span>
              <span
                {...activationKeys}
                onClick={() => choose(0, "go to the museum")}
                aria-pressed={examples[0].trim() === "go to the museum"}
                aria-label={"Use go to the museum in example 1"}
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b className="mr-2">3</b>go to the museum
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
              Shall we go to the
              <span className="text-[#12C8F9]">{examples[1]}</span>?
            </p>

            <div className="grid grid-cols-3 gap-15 mt-5 text-[17px]">
              <span
                {...activationKeys}
                onClick={() => choose(1, "symphony")}
                aria-pressed={examples[1].trim() === "symphony"}
                aria-label={"Use symphony in example 2"}
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b className="mr-2">1</b>symphony
              </span>
              <span
                {...activationKeys}
                onClick={() => choose(1, "carnival")}
                aria-pressed={examples[1].trim() === "carnival"}
                aria-label={"Use carnival in example 2"}
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b className="mr-2">2</b>carnival
              </span>
              <span
                {...activationKeys}
                onClick={() => choose(1, "ice rink")}
                aria-pressed={examples[1].trim() === "ice rink"}
                aria-label={"Use ice rink in example 2"}
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b className="mr-2">3</b>ice rink
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;
