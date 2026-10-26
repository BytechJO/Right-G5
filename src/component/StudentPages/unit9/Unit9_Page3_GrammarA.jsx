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
    ["shoots a basket ", " will make it "],
    [" will arrive shortly ", " her plane is on time "],
  ]);
  const substitutions = [
    [
      ["cooks some eggs ", " will give us some "],
      ["goes swimming ", " will practice diving "],
      ["gets an A on his test ", " would be so happy "],
    ],
    [
      [" would call us ", " she’s going to be late "],
      [" will jog ", " it’s not too hot "],
      [" will know three languages ", " she learns English well "],
    ],
  ];
  const choose = (row, option) => {
    setExamples((previous) =>
      previous.map((value, i) =>
        i === row ? substitutions[row][option] : value,
      ),
    );
    setAnnouncement(
      "Example " +
        (row + 1) +
        " changed to " +
        substitutions[row][option].join(", "),
    );
  };
  const audio = useExerciseAudio();
  const [announcement, setAnnouncement] = React.useState("");

  return (
    <div data-exercise-scope={"Unit9_Page3_GrammarA.jsx"}>
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit9_Page3_GrammarA.jsx"] input:focus-visible,[data-exercise-scope="Unit9_Page3_GrammarA.jsx"] textarea:focus-visible,[data-exercise-scope="Unit9_Page3_GrammarA.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
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
              If Jeremy <span className="text-[#12C8F9]">{examples[0][0]}</span>
              , he <span className="text-[#12C8F9]">{examples[0][1]}</span>.
            </p>

            <div className="flex flex-wrap gap-10 mt-5 text-[17px]">
              <span
                {...activationKeys}
                onClick={() => choose(0, 0)}
                aria-pressed={examples[0].every(
                  (value, index) => value === substitutions[0][0][index],
                )}
                aria-label={
                  "Use cooks some eggs, will give us some in example 1"
                }
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b className="mr-2">1</b>cooks some eggs, will give us some
              </span>
              <span
                {...activationKeys}
                onClick={() => choose(0, 1)}
                aria-pressed={examples[0].every(
                  (value, index) => value === substitutions[0][1][index],
                )}
                aria-label={
                  "Use goes swimming, will practice diving in example 1"
                }
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b className="mr-2">2</b>goes swimming, will practice diving
              </span>
              <span
                {...activationKeys}
                onClick={() => choose(0, 2)}
                aria-pressed={examples[0].every(
                  (value, index) => value === substitutions[0][2][index],
                )}
                aria-label={
                  "Use gets an A on his test, would be so happy in example 1"
                }
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b className="mr-2">3</b>gets an A on his test, would be so
                happy
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
              Nancy <span className="text-[#12C8F9]">{examples[1][0]}</span>
              if <span className="text-[#12C8F9]">{examples[1][1]}</span>.
            </p>

            <div className="flex flex-wrap gap-10 mt-5 text-[17px]">
              <span
                {...activationKeys}
                onClick={() => choose(1, 0)}
                aria-pressed={examples[1].every(
                  (value, index) => value === substitutions[1][0][index],
                )}
                aria-label={
                  "Use would call us, she’s going to be late in example 2"
                }
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b className="mr-2">1</b>would call us she’s going to be late
              </span>
              <span
                {...activationKeys}
                onClick={() => choose(1, 1)}
                aria-pressed={examples[1].every(
                  (value, index) => value === substitutions[1][1][index],
                )}
                aria-label={"Use will jog, it’s not too hot in example 2"}
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b className="mr-2">2</b>will jog, it’s not too hot
              </span>
              <span
                {...activationKeys}
                onClick={() => choose(1, 2)}
                aria-pressed={examples[1].every(
                  (value, index) => value === substitutions[1][2][index],
                )}
                aria-label={
                  "Use will know three languages, she learns English well in example 2"
                }
                data-choice={true}
                tabIndex={0}
                role={"button"}
              >
                <b className="mr-2">3</b>will know three languages, she learns
                English well
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarA;
