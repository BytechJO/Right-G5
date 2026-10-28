import soundF8 from "../../../assets/audio/Workbook/Unit 6/Page 35 - F/Item_008_Circle_each_modal_verb_in_the_story._@.mp3";
import soundF6 from "../../../assets/audio/Workbook/Unit 6/Page 35 - F/Item_006_Their_parents_would_worry_if_they_stay_later_than_6_p.m.mp3";
import soundF5 from "../../../assets/audio/Workbook/Unit 6/Page 35 - F/Item_005_go_to_the_park_a_few_blocks_away._They_shouldn't_stay_later_than_6_p.m.mp3";
import soundF4 from "../../../assets/audio/Workbook/Unit 6/Page 35 - F/Item_004_may_meet_after_the_science_fair_is_over._They_could_have_lunch_together.mp3";
import soundF3 from "../../../assets/audio/Workbook/Unit 6/Page 35 - F/Item_003_submit_their_science_project_by_10_a.m._tomorrow._They_can't_submit_it_l.mp3";
import soundF2 from "../../../assets/audio/Workbook/Unit 6/Page 35 - F/Item_002_there._They_should_wear_their_name_tags_and_get_their_own_table._Their_p.mp3";
import soundF1 from "../../../assets/audio/Workbook/Unit 6/Page 35 - F/Item_001_Fred_and_his_friends_might_meet_at_the_science_fair_tomorrow._Each_one_o.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../../StudentPages/unit5/useExerciseAudio";
import {
  AudioText,
  AudioFeedback,
  AudioSpeaker,
} from "../../StudentPages/unit5/ExerciseAudioText";
import {
  SentenceGroup,
  SentencePart,
} from "../../StudentPages/unit5/SentenceAudio";
import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import { HiArrowUpCircle } from "react-icons/hi2";

// IMAGES
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 35/Asset 8.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 35/Asset 9.svg";
import img3 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U6/Page 35/Asset 10.svg";
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
const normalizeAnswer = (text) =>
  text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[‘’']/g, "")
    .replace(/[.,!?;:…“”"–—-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const WB_Unit6_Page35_Q1 = () => {
  const returnToStory = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const story = event.currentTarget.closest('[data-exercise-scope]')?.querySelector('[data-return-story]');
    if (!story) return;
    story.focus({ preventScroll: true });
    story.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  };

  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const clickableWords = [
    "might",
    "will",
    "should",
    "must",
    "can't",
    "may",
    "could",
    "shouldn't",
    "would",
  ];

  const answers = [
    "They will each submit a science project at the fair.",

    "They should be home by 6 p.m.",
  ];

  const [lockedWords, setLockedWords] = useState([]);
  const [wrongWords, setWrongWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);

  const [studentAnswers, setStudentAnswers] = useState(["", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  // ------------------------
  // TOGGLE WORD
  // ------------------------

  const toggleWord = (wordKey) => {
    if (locked) return;

    setSelectedWords((prev) => {
      if (prev.includes(wordKey)) {
        return prev.filter((w) => w !== wordKey);
      }

      return [...prev, wordKey];
    });
  };

  // ------------------------
  // HANDLE INPUT
  // ------------------------

  const handleChange = (i, value) => {
    if (locked || result[i]?.input === true) return;

    const updated = [...studentAnswers];

    updated[i] = value;

    setStudentAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      if (copy[i]) {
        copy[i].input = undefined;
      }

      return copy;
    });
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {
    if (locked) return;
    audio.stop();

    // ✅ لازم يختار دائرة وحدة على الأقل
    if (selectedWords.length === 0) {
      (setAnnouncement(
        String("Please circle at least one modal verb.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Please circle at least one modal verb."));

      return;
    }

    // ✅ لازم يحل السؤالين
    if (studentAnswers.some((a) => !a.trim())) {
      (setAnnouncement(
        String("Please complete all answers.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Please complete all answers."));

      return;
    }

    // ------------------------
    // MODAL VERBS
    // ------------------------

    const correctModalKeys = paragraph
      .split(" ")
      .map((word, index) => {
        const cleanWord = word.replace(/[.?!]/g, "").trim();

        if (clickableWords.includes(cleanWord)) {
          return `${cleanWord}-${index}`;
        }

        return null;
      })
      .filter(Boolean);

    const wrong = selectedWords.filter((k) => !correctModalKeys.includes(k));
    setWrongWords(wrong);
    setLockedWords(correctModalKeys.filter((k) => selectedWords.includes(k)));
    let modalCorrectCount = 0;

    correctModalKeys.forEach((key) => {
      if (selectedWords.includes(key)) {
        modalCorrectCount++;
      }
    });

    // ------------------------
    // INPUTS
    // ------------------------

    let inputCorrect = 0;

    const inputResults = studentAnswers.map((answer, i) => {
      const ok = normalize(answer) === normalize(answers[i]);

      if (ok) inputCorrect++;

      return ok;
    });

    // ------------------------
    // SAVE RESULTS
    // ------------------------

    const finalResults = inputResults.map((ok) => ({
      input: ok,
      modal: true,
    }));

    setResult(finalResults);

    // ------------------------
    // TOTAL
    // ------------------------

    const totalCorrect = modalCorrectCount + inputCorrect;

    const total = correctModalKeys.length + answers.length;

    const color =
      totalCorrect === total && wrong.length === 0
        ? "green"
        : totalCorrect === 0
          ? "red"
          : "orange";

    const msg = `
    <div style="font-size:18px;text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${totalCorrect} / ${total}
      </span>
    </div>
  `;

    if (totalCorrect === total && wrong.length === 0) {
      resetButtonRef.current?.focus({ preventScroll: true });
      setLocked(true);

      (setAnnouncement(
        String(msg)
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.success(msg));
    } else if (totalCorrect === 0) {
      (setAnnouncement(
        String(msg)
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.error(msg));
    } else {
      (setAnnouncement(
        String(msg)
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.warning(msg));
    }
  };
  // ------------------------
  // SHOW ANSWERS
  // ------------------------

  const showAnswers = () => {
    audio.stop();
    setAnnouncement("Model answers shown and locked.");
    resetButtonRef.current?.focus({ preventScroll: true });
    const modalKeys = paragraph
      .split(" ")
      .map((word, index) => {
        const cleanWord = word.replace(/[.?!]/g, "").trim();

        if (clickableWords.includes(cleanWord)) {
          return `${cleanWord}-${index}`;
        }

        return null;
      })
      .filter(Boolean);

    setSelectedWords(modalKeys);
    setLockedWords(modalKeys);
    setWrongWords([]);

    setStudentAnswers(answers);

    setResult([
      {
        input: true,
        modal: true,
      },

      {
        input: true,
        modal: true,
      },
    ]);

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setSelectedWords([]);
    setLockedWords([]);
    setWrongWords([]);

    setStudentAnswers(["", ""]);

    setResult([]);

    setLocked(false);
  };

  // ------------------------
  // PARAGRAPH
  // ------------------------

  const paragraph = `
Fred and his friends might meet at the science fair tomorrow. Each one of them will bring a science project there. They should wear their name tags and get their own table. Their parents will come and watch. They must submit their science project by 10 a.m. tomorrow. They can't submit it later. There will be five winners. They may meet after the science fair is over. They could have lunch together at the restaurant nearby, or they could go to the park a few blocks away. They shouldn't stay later than 6 p.m. because they still have homework to do. Their parents would worry if they stay later than 6 p.m.
`;

  // ------------------------
  // RENDER PARAGRAPH
  // ------------------------

  const renderParagraph = () => {
    const words = paragraph.split(" ");
    const starts = [
      0,
      ...[
        "there.",
        "submit their science project",
        "may meet after",
        "go to the park",
        "Their parents would",
      ].map((t) => paragraph.indexOf(t)),
    ];
    const offsets = [];
    let offset = 0;
    words.forEach((w) => {
      offsets.push(offset);
      offset += w.length + 1;
    });
    const sources = [soundF1, soundF2, soundF3, soundF4, soundF5, soundF6];
    return starts.map((start, part) => {
      const end = starts[part + 1] ?? paragraph.length;
      return (
        <span
          key={part}
          role="group"
          aria-roledescription="passage audio"
          aria-label={`Hear story part ${part + 1}`}
          tabIndex={0}
          data-choice
          data-story-part={part}
          onClick={(event) => {
            if (event.target.closest('[role="button"]')) return;
            event.stopPropagation();
            audio.play(`story-${part}`, sources[part]);
          }}
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return;
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            event.stopPropagation();
            if (!event.repeat) audio.play(`story-${part}`, sources[part]);
          }}
          onKeyUp={(event) => {
            if (event.target === event.currentTarget)
              activationKeys.onKeyUp(event);
          }}
          style={{
            position: "relative",
            borderRadius: 6,
            backgroundColor:
              audio.activeId === `story-${part}` ? "#dbeafe" : undefined,
            boxShadow:
              audio.activeId === `story-${part}`
                ? "0 0 0 3px #2563eb"
                : undefined,
          }}
        >
          {words.map((word, index) => {
            if (offsets[index] < start || offsets[index] >= end) return null;
            const cleanWord = word.replace(/[.?!]/g, "").trim();
            if (!cleanWord) return word + " ";
            const key = `${cleanWord}-${index}`,
              selected = selectedWords.includes(key),
              correct = lockedWords.includes(key),
              wrong = wrongWords.includes(key);
            return (
              <span
                key={index}
                role="button"
                data-choice
                aria-label={`${cleanWord}${correct ? ". Correct and locked." : wrong ? ". Not a target modal verb." : ""}`}
                aria-pressed={selected}
                aria-disabled={locked || correct}
                tabIndex={0}
                {...activationKeys}
                onClick={(event) => {
                  event.stopPropagation();
                  toggleWord(key);
                }}
                style={{
                  display: "inline",
                  outline: selected
                    ? `2px solid ${correct ? "#16a34a" : wrong ? "#D1232A" : "#6D2980"}`
                    : undefined,
                  borderRadius: 999,
                  cursor: locked || correct ? "default" : "pointer",
                }}
              >
                {word}{" "}
              </span>
            );
          })}
          {audio.activeId === `story-${part}` && <AudioSpeaker />}
        </span>
      );
    });
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = (i) => (
    <div className="relative w-full">
      <input
        style={{
          borderBottomColor:
            result[i]?.input === true
              ? "#16a34a"
              : result[i]?.input === false
                ? "#D1232A"
                : undefined,
        }}
        placeholder={"Your answer"}
        aria-invalid={result[i]?.input === false}
        title={
          [
            "What will they do in the science fair?",
            "When should they be home? Why?",
          ][i]
        }
        aria-label={
          [
            "What will they do in the science fair?",
            "When should they be home? Why?",
          ][i]
        }
        {...fieldKeys}
        type="text"
        value={studentAnswers[i]}
        disabled={locked || result[i]?.input === true}
        onChange={(e) => handleChange(i, e.target.value)}
        className={`
          w-full
          border-0
          border-b
          outline-none
          bg-transparent
          text-[18px]
          text-[#6D2980]
          font-semibold
          px-1

          ${result[i]?.input === false ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {result[i]?.input === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            width: "18px",
            height: "18px",
            background: "#ef4444",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
          }}
        >
          ✕
        </span>
      )}
    </div>
  );

  return (
    <div
      data-exercise-scope={"WB_Unit6_Page35_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit6_Page35_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit6_Page35_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit6_Page35_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall text-[18px] w-full">
        {/* TITLE */}

        <ExerciseHeader
          isWorkbook
          sectionLetter="F"
          title={<>Read and write.</>}
          subTitle="Read the story for meaning first, then identify the modal verbs and use the passage to answer the follow-up question."
        />

        {/* PARAGRAPH */}

        <div data-choice={true} aria-label={"Story above the questions"} role={"region"} tabIndex={-1} data-return-story={true} className="leading-[1.7] mb-8 px-10 w-[110%]">
          {renderParagraph()}
        </div>

        {/* IMAGES */}

        <div className="flex justify-center gap-8 mb-10">
          {[img1, img2, img3].map((img, index) => (
            <img
              key={index}
              src={img}
              alt={
                [
                  "A boy standing beside an empty display table.",
                  "A microscope and laboratory equipment on a display table.",
                  "A girl standing beside a jar on a display table.",
                ][index]
              }
              style={{
                width: "250px",
                height: "auto",
                objectFit: "contain",
              }}
            />
          ))}
        </div>

        {/* QUESTION 1 */}

        <div className="mb-8">
          <div className="flex items-start gap-4 mb-4">
           
              <span className="font-bold mr-2">1</span>
             <AudioText
              label={"Hear: Circle each modal verb in the story."}
              src={soundF8}
              id={"instruction"}
              audio={audio}
              className="flex items-center gap-2 w-full"
            >  Circle each modal verb in the story. 
            </AudioText>
              <HiArrowUpCircle onKeyUp={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();}}} onKeyDown={event=>{if(event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)returnToStory(event);}} onClick={returnToStory} aria-label={"Return to the story above"} data-return-arrow={true} data-choice={true} tabIndex={0} role={"button"}
                style={{
                  color: "#6D2980",
                  fontSize: "26px",
                  // flexShrink: 0,
                cursor:"pointer",borderRadius:"50%","--exercise-focus-radius":"50%"}}
              />
           
          </div>
        </div>

        {/* QUESTION 2 */}

        <div className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <span className="font-bold">2</span>

            <span>What will they do in the science fair?</span>
          </div>

          <div className="pl-[35px]">{inputField(0)}</div>
        </div>

        {/* QUESTION 3 */}

        <div className="mb-10">
          <div className="flex items-start gap-4 mb-4">
            <span className="font-bold">3</span>

            <span>When should they be home? Why?</span>
          </div>

          <div className="pl-[35px]">{inputField(1)}</div>
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
          onClick={handleReset}
        >
          Start Again ↻
        </button>

        <button
          {...activationKeys}
          aria-label={"Show Answer"}
          type={"button"}
          className="show-answer-btn"
          onClick={showAnswers}
        >
          Show Answer
        </button>

        <button
          style={{ cursor: locked ? "not-allowed" : "pointer" }}
          {...activationKeys}
          disabled={locked}
          aria-label={"Check Answer"}
          type={"button"}
          className="check-button2"
          onClick={checkAnswers}
        >
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default WB_Unit6_Page35_Q1;
