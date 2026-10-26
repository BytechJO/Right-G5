import clip0 from "../../../assets/audio/ClassBook/U6/Page 55 - F/Item_001_It_could_be_a_feather.mp3";
import clip1 from "../../../assets/audio/ClassBook/U6/Page 55 - F/Item_002_It_could_be.mp3";
import clip2 from "../../../assets/audio/ClassBook/U6/Page 55 - F/Item_003_It_might_be_a_toad.mp3";
import clip3 from "../../../assets/audio/ClassBook/U6/Page 55 - F/Item_004_It_might_be.mp3";
import clip4 from "../../../assets/audio/ClassBook/U6/Page 55 - F/Item_005_Might_it_be_a_toaster.mp3";
import clip5 from "../../../assets/audio/ClassBook/U6/Page 55 - F/Item_006_Might_it_be_a.mp3";
import clip6 from "../../../assets/audio/ClassBook/U6/Page 55 - F/Item_007_It_couldn't_be_a_road.mp3";
import clip7 from "../../../assets/audio/ClassBook/U6/Page 55 - F/Item_008_It_couldn't_be_a.mp3";
import clip8 from "../../../assets/audio/ClassBook/U6/Page 55 - F/Item_009_Will_you_look_inside_the_box.mp3";
import clip9 from "../../../assets/audio/ClassBook/U6/Page 55 - F/Item_010_Will_you.mp3";
import clip10 from "../../../assets/audio/ClassBook/U6/Page 55 - F/Item_011_Would_you_like_to_know.mp3";
import clip11 from "../../../assets/audio/ClassBook/U6/Page 55 - F/Item_012_Would_you.mp3";
import clip12 from "../../../assets/audio/ClassBook/U6/Page 55 - F/Item_013_No,_let's_wait_for_a_little_more.mp3";
import clip13 from "../../../assets/audio/ClassBook/U6/Page 55 - F/Item_014_No,_let's.mp3";
import clip14 from "../../../assets/audio/ClassBook/U6/Page 55 - F/Item_015_I_know!_It_could_be_snow.mp3";
import clip15 from "../../../assets/audio/ClassBook/U6/Page 55 - F/Item_016_I_know!.mp3";
import clip16 from "../../../assets/audio/ClassBook/U6/Page 55 - F/Item_017_We_could_have_all_the_answers.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
  AudioSpeaker,
} from "../unit5/ExerciseAudioText";
import { SentenceGroup, SentencePart } from "../unit5/SentenceAudio";
import React, { useState } from "react";
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
const fieldKeys = {
  onKeyDown: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
  onKeyUp: (event) => {
    if (event.key === "Enter" || event.key === " ") event.stopPropagation();
  },
};

const Review6_Page2_Q1 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const poemLines = [
    ["It", "could", "be", "a", "feather."],

    ["It", "might", "be", "a", "toad."],

    ["Might", "it", "be", "a", "toaster?"],

    ["It", "couldn’t", "be", "a", "road."],

    [],

    ["Will", "you", "look", "inside", "the", "box?"],

    ["Would", "you", "like", "to", "know?"],

    ["No,", "let’s", "wait", "for", "a", "little", "more."],

    ["I", "know!", "It", "could", "be", "snow."],

    ["We", "could", "have", "all", "the", "answers"],

    ["By", "looking", "inside."],

    ["But", "then", "we", "might", "miss", "all", "the", "fun"],

    ["Of", "trying", "to", "decide."],
  ];

  const [selectedWords, setSelectedWords] = useState({});

  const [answers, setAnswers] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const toggleWord = (lineIndex, wordIndex) => {
    setAnnouncement(
      selectedWords[lineIndex] === wordIndex
        ? "Selection cleared."
        : "Line " +
            (lineIndex + 1) +
            ": " +
            poemLines[lineIndex][wordIndex] +
            " selected.",
    );
    setSelectedWords((prev) => ({
      ...prev,

      [lineIndex]: prev[lineIndex] === wordIndex ? null : wordIndex,
    }));
  };

  const handleChange = (index, value) => {
    const updated = [...answers];

    updated[index] = value;

    setAnswers(updated);
  };

  return (
    <div
      data-exercise-scope={"Review6_Page2_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review6_Page2_Q2.jsx"] input:focus-visible,[data-exercise-scope="Review6_Page2_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Review6_Page2_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall" style={{gap:"30px"}}>
        {/* TITLE */}
        <ExerciseHeader
          isReview
          sectionLetter="F"
          title={
            <>
              Circle all the modal verbs in the poem below called, WHAT IS IT{" "}
              Write your own version of this poem by filling in the blank lines.
              Remember to use rhyming words in your poem.
            </>
          }
          subTitle={
            <>
              Task 1: Find and select every modal verb in the model poem. <br />
              Task 2: Then use the pattern and rhyming clues to write your own
              version in the blanks
            </>
          }
        />

        {/* CONTENT */}
        <div className="flex gap-14 mb-10">
          {/* LEFT POEM */}
          <div className="flex flex-col gap-4 w-[360px]">
            {/* TITLE */}
            <div
              className="
                text-[18px]
                mb-1
              "
            >
              WHAT IS IT?
            </div>

            {poemLines.map((line, lineIndex) => {
              if (line.length === 0) {
                return <div key={lineIndex} className="h-5"></div>;
              }

              return (
                <SentenceGroup
                  label={`Hear poem line ${lineIndex + 1}: ${line.join(" ")}`}
                  src={
                    [
                      clip0,
                      clip2,
                      clip4,
                      clip6,
                      null,
                      clip8,
                      clip10,
                      clip12,
                      clip14,
                      clip16,
                    ][lineIndex]
                  }
                  id={`poem-${lineIndex}`}
                  audio={audio}
                  key={lineIndex}
                  className="
                      flex
                      flex-wrap
                      gap-2
                      text-[18px]
                    "
                >
                  {line.map((word, wordIndex) => {
                    const isSelected = selectedWords[lineIndex] === wordIndex;

                    return (
                      <span
                        style={{
                          borderRadius: 6,
                          ...(selectedWords[lineIndex] === wordIndex
                            ? {
                                boxShadow: "0 0 0 2px " + "#2563eb",
                                backgroundColor: "#dbeafe",
                              }
                            : {}),
                        }}
                        {...activationKeys}
                        aria-label={`Poem line ${lineIndex + 1}, circle ${word}`}
                        aria-disabled={false}
                        aria-pressed={selectedWords[lineIndex] === wordIndex}
                        data-choice={true}
                        tabIndex={0}
                        role={"button"}
                        key={wordIndex}
                        onClick={() => toggleWord(lineIndex, wordIndex)}
                        className="
                              relative
                              cursor-pointer
                              inline-block
                              px-[3px]
                              py-px
                            "
                      >
                        {/* CIRCLE */}
                        {isSelected && (
                          <span
                            className="
                                  absolute
                                  inset-[-5px]
                                  border-2
                                  border-[#6D2980]
                                  rounded-full
                                  pointer-events-none
                                "
                          ></span>
                        )}

                        <span className="relative z-10">{word}</span>
                      </span>
                    );
                  })}
                </SentenceGroup>
              );
            })}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-4 w-[430px]">
            {/* TITLE */}
            <div
              className="
                text-[18px]
                underline
                mb-1
              "
            >
              WHAT IS IT?
            </div>

            {/* 1 */}
            <SentenceGroup
              label={"Hear your poem starter 1"}
              src={clip1}
              id={"writing-clue-0"}
              audio={audio}
              className="flex items-end text-[18px]"
            >
              <span>It could be</span>

              <input
                title={"Your poem, response 1"}
                aria-label={"Your poem, response 1"}
                {...fieldKeys}
                type="text"
                value={answers[0]}
                onChange={(e) => handleChange(0, e.target.value)}
                className="
                  flex-1
                  border-0
                  border-b
                  border-black
                  outline-none
                  bg-transparent
                  font-semibold
                  text-[18px]
                  ml-2
                  text-[#6D2980]
                "
              />

              <span>.</span>
            </SentenceGroup>

            {/* 2 */}
            <SentenceGroup
              label={"Hear your poem starter 2"}
              src={clip3}
              id={"writing-clue-1"}
              audio={audio}
              className="flex items-end text-[18px]"
            >
              <span>It might be</span>

              <input
                title={"Your poem, response 2"}
                aria-label={"Your poem, response 2"}
                {...fieldKeys}
                type="text"
                value={answers[1]}
                onChange={(e) => handleChange(1, e.target.value)}
                className="
                  flex-1
                  border-0
                  border-b
                  border-black
                  outline-none
                  bg-transparent
                  font-semibold
                  text-[18px]
                  ml-2
                  text-[#6D2980]
                "
              />

              <span>.</span>
            </SentenceGroup>

            {/* 3 */}
            <SentenceGroup
              label={"Hear your poem starter 3"}
              src={clip5}
              id={"writing-clue-2"}
              audio={audio}
              className="flex items-end text-[18px]"
            >
              <span>Might it be a</span>

              <input
                title={"Your poem, response 3"}
                aria-label={"Your poem, response 3"}
                {...fieldKeys}
                type="text"
                value={answers[2]}
                onChange={(e) => handleChange(2, e.target.value)}
                className="
                  flex-1
                  border-0
                  border-b
                  border-black
                  outline-none
                  bg-transparent
                  font-semibold
                  text-[18px]
                  ml-2
                  text-[#6D2980]
                "
              />

              <span>?</span>
            </SentenceGroup>

            {/* 4 */}
            <SentenceGroup
              label={"Hear your poem starter 4"}
              src={clip7}
              id={"writing-clue-3"}
              audio={audio}
              className="flex items-end text-[18px]"
            >
              <span>It couldn’t be a</span>

              <input
                title={"Your poem, response 4"}
                aria-label={"Your poem, response 4"}
                {...fieldKeys}
                type="text"
                value={answers[3]}
                onChange={(e) => handleChange(3, e.target.value)}
                className="
                  flex-1
                  border-0
                  border-b
                  border-black
                  outline-none
                  bg-transparent
                  font-semibold
                  text-[18px]
                  ml-2
                  text-[#6D2980]
                "
              />
            </SentenceGroup>

            <div className="h-5"></div>

            {/* 5 */}
            <SentenceGroup
              label={"Hear your poem starter 5"}
              src={clip9}
              id={"writing-clue-4"}
              audio={audio}
              className="flex items-end text-[18px]"
            >
              <span>Will you</span>

              <input
                title={"Your poem, response 5"}
                aria-label={"Your poem, response 5"}
                {...fieldKeys}
                type="text"
                value={answers[4]}
                onChange={(e) => handleChange(4, e.target.value)}
                className="
                  flex-1
                  border-0
                  border-b
                  border-black
                  outline-none
                  bg-transparent
                  font-semibold
                  text-[18px]
                  ml-2
                  text-[#6D2980]
                "
              />

              <span>?</span>
            </SentenceGroup>

            {/* 6 */}
            <SentenceGroup
              label={"Hear your poem starter 6"}
              src={clip11}
              id={"writing-clue-5"}
              audio={audio}
              className="flex items-end text-[18px]"
            >
              <span>Would you</span>

              <input
                title={"Your poem, response 6"}
                aria-label={"Your poem, response 6"}
                {...fieldKeys}
                type="text"
                value={answers[5]}
                onChange={(e) => handleChange(5, e.target.value)}
                className="
                  flex-1
                  border-0
                  border-b
                  border-black
                  outline-none
                  bg-transparent
                  font-semibold
                  text-[18px]
                  ml-2
                  text-[#6D2980]
                "
              />

              <span>?</span>
            </SentenceGroup>

            {/* 7 */}
            <SentenceGroup
              label={"Hear your poem starter 7"}
              src={clip13}
              id={"writing-clue-6"}
              audio={audio}
              className="flex items-end text-[18px]"
            >
              <span>No, let’s</span>

              <input
                title={"Your poem, response 7"}
                aria-label={"Your poem, response 7"}
                {...fieldKeys}
                type="text"
                value={answers[6]}
                onChange={(e) => handleChange(6, e.target.value)}
                className="
                  flex-1
                  border-0
                  border-b
                  border-black
                  outline-none
                  bg-transparent
                  font-semibold
                  text-[18px]
                  ml-2
                  text-[#6D2980]
                "
              />

              <span>.</span>
            </SentenceGroup>

            {/* 8 */}
            <SentenceGroup
              label={"Hear your poem starter 8"}
              src={clip15}
              id={"writing-clue-7"}
              audio={audio}
              className="flex items-end text-[18px]"
            >
              <span>I know!</span>

              <input
                title={"Your poem, response 8"}
                aria-label={"Your poem, response 8"}
                {...fieldKeys}
                type="text"
                value={answers[7]}
                onChange={(e) => handleChange(7, e.target.value)}
                className="
                  flex-1
                  border-0
                  border-b
                  border-black
                  outline-none
                  bg-transparent
                  text-[18px]
                  font-semibold
                  ml-2
                  text-[#6D2980]
                "
              />

              <span>.</span>
            </SentenceGroup>

            {/* 9 */}
            <div className="flex items-end text-[18px]">
              <span>We could</span>

              <input
                title={"Your poem, response 9"}
                aria-label={"Your poem, response 9"}
                {...fieldKeys}
                type="text"
                value={answers[8]}
                onChange={(e) => handleChange(8, e.target.value)}
                className="
                  flex-1
                  border-0
                  border-b
                  border-black
                  outline-none
                  bg-transparent
                  font-semibold
                  text-[18px]
                  ml-2
                  text-[#6D2980]
                "
              />
            </div>

            {/* 10 */}
            <div className="flex items-end text-[18px]">
              <span>By</span>

              <input
                title={"Your poem, response 10"}
                aria-label={"Your poem, response 10"}
                {...fieldKeys}
                type="text"
                value={answers[9]}
                onChange={(e) => handleChange(9, e.target.value)}
                className="
                  flex-1
                  border-0
                  border-b
                  border-black
                  outline-none
                  bg-transparent
                  font-semibold
                  text-[18px]
                  ml-2
                  text-[#6D2980]
                "
              />

              <span>.</span>
            </div>

            {/* 11 */}
            <div className="flex items-end text-[18px]">
              <span>But then we might</span>

              <input
                title={"Your poem, response 11"}
                aria-label={"Your poem, response 11"}
                {...fieldKeys}
                type="text"
                value={answers[10]}
                onChange={(e) => handleChange(10, e.target.value)}
                className="
                  flex-1
                  border-0
                  border-b
                  border-black
                  outline-none
                  bg-transparent
                  font-semibold
                  text-[18px]
                  ml-2
                  text-[#6D2980]
                "
              />
            </div>

            {/* 12 */}
            <div className="flex items-end text-[18px]">
              <span>Of trying</span>

              <input
                title={"Your poem, response 12"}
                aria-label={"Your poem, response 12"}
                {...fieldKeys}
                type="text"
                value={answers[11]}
                onChange={(e) => handleChange(11, e.target.value)}
                className="
                  flex-1
                  border-0
                  border-b
                  border-black
                  outline-none
                  bg-transparent
                  font-semibold
                  text-[18px]
                  ml-2
                  text-[#6D2980]
                "
              />

              <span>.</span>
            </div>
          </div>
        </div>
        {/* BUTTONS */}
        <div className="action-buttons-container">
          <button
            {...activationKeys}
            ref={resetButtonRef}
            aria-label={"Start Again"}
            type={"button"}
            className="try-again-button"
            onClick={() => {
              audio.stop();
              setAnnouncement("Poem selections and writing cleared.");
              setAnswers(["", "", "", "", "", "", "", "", "", "", "", ""]);

              setSelectedWords({});
            }}
          >
            Start Again ↻
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review6_Page2_Q1;
