import soundF21 from "../../../assets/audio/Workbook/Unit 8/Page 47 - F/Item_021_Why_was_John_shocked_to_see_the_pilot_of_the_small_airplane.mp3";
import soundF20 from "../../../assets/audio/Workbook/Unit 8/Page 47 - F/Item_020_Underline_all_the_indefinite_pronouns_in_the_story._@.mp3";
import soundF19 from "../../../assets/audio/Workbook/Unit 8/Page 47 - F/Item_019_It_was_a_ride_I'll_never_forget.mp3";
import soundF18 from "../../../assets/audio/Workbook/Unit 8/Page 47 - F/Item_018_of_the_world._everything_looked_so_small_from_above._everyone_waiting_in.mp3";
import soundF17 from "../../../assets/audio/Workbook/Unit 8/Page 47 - F/Item_017_Myers._Come_on_in_and_let's_fly_over_the_town._I_happily_accepted._It_wa.mp3";
import soundF16 from "../../../assets/audio/Workbook/Unit 8/Page 47 - F/Item_016_started_going_towards_the_hot-air_balloon_ride._Wait,_said_Mr.mp3";
import soundF15 from "../../../assets/audio/Workbook/Unit 8/Page 47 - F/Item_015_said_as.mp3";
import soundF14 from "../../../assets/audio/Workbook/Unit 8/Page 47 - F/Item_014_later,_Mr._Myers,.mp3";
import soundF13 from "../../../assets/audio/Workbook/Unit 8/Page 47 - F/Item_013_towards_Mr._Myers._Get_ready._The_flight_will_take_off_in_five_minutes,.mp3";
import soundF12 from "../../../assets/audio/Workbook/Unit 8/Page 47 - F/Item_012_the_original_pilot_was_busy._someone_walked_towards_us._He_was_another_p.mp3";
import soundF11 from "../../../assets/audio/Workbook/Unit 8/Page 47 - F/Item_011_told_me_that_he_became_a_pilot!_He_told_me_he_was_volunteering_to_fly_th.mp3";
import soundF10 from "../../../assets/audio/Workbook/Unit 8/Page 47 - F/Item_010_science_class_he_shouted_back._Mr._Myers_was_my_third_grade_science_teac.mp3";
import soundF9 from "../../../assets/audio/Workbook/Unit 8/Page 47 - F/Item_009_looking_confused._Hello,_John._How_are_you_Are_you_still_getting_good_gr.mp3";
import soundF8 from "../../../assets/audio/Workbook/Unit 8/Page 47 - F/Item_008_asked,.mp3";
import soundF7 from "../../../assets/audio/Workbook/Unit 8/Page 47 - F/Item_007_recognized_him_from_third_grade._Mr._Myers.mp3";
import soundF6 from "../../../assets/audio/Workbook/Unit 8/Page 47 - F/Item_006_spotted_the_pilot.mp3";
import soundF5 from "../../../assets/audio/Workbook/Unit 8/Page 47 - F/Item_005_when.mp3";
import soundF4 from "../../../assets/audio/Workbook/Unit 8/Page 47 - F/Item_004_in_one_ride._There_was_a_small_airplane_ride_nearby._I_went_over_to_it_a.mp3";
import soundF3 from "../../../assets/audio/Workbook/Unit 8/Page 47 - F/Item_003_was_shocked_to_see_so_many_people._no_one_knew_how_many_people_were_allo.mp3";
import soundF2 from "../../../assets/audio/Workbook/Unit 8/Page 47 - F/Item_002_crowded_in_line_and_were_waiting_for_their_turn_to_ride_in_the_rainbow_h.mp3";
import soundF1 from "../../../assets/audio/Workbook/Unit 8/Page 47 - F/Item_001_Everyone_was_talking_about_the_hot-air_balloon_ride_that_opened_in_town.mp3";
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
import img1 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U8/Page 47/Asset 5.svg";
import img2 from "../../../assets/imgs/pages/workbook/Right Int WB G5 U8/Page 47/Asset 17.svg";
// Printed character ranges identify matching fragments; these are not playback timestamps.
const STORY_AUDIO_PARTS = [
  { id: "story-part-1", src: soundF1, start: 0, end: 86 },
  { id: "story-part-2", src: soundF2, start: 86, end: 176 },
  { id: "story-part-3", src: soundF3, start: 176, end: 258 },
  { id: "story-part-4", src: soundF4, start: 258, end: 345 },
  { id: "story-part-5", src: soundF5, start: 345, end: 352 },
  { id: "story-part-6", src: soundF6, start: 352, end: 373 },
  { id: "story-part-7", src: soundF7, start: 373, end: 421 },
  { id: "story-part-8", src: soundF8, start: 421, end: 428 },
  { id: "story-part-9", src: soundF9, start: 428, end: 510 },
  { id: "story-part-10", src: soundF10, start: 510, end: 596 },
  { id: "story-part-11", src: soundF11, start: 596, end: 683 },
  { id: "story-part-12", src: soundF12, start: 683, end: 771 },
  { id: "story-part-13", src: soundF13, start: 771, end: 867 },
  { id: "story-part-14", src: soundF14, start: 867, end: 888 },
  { id: "story-part-15", src: soundF15, start: 888, end: 898 },
  { id: "story-part-16", src: soundF16, start: 898, end: 963 },
  { id: "story-part-17", src: soundF17, start: 963, end: 1061 },
  { id: "story-part-18", src: soundF18, start: 1061, end: 1157 },
  { id: "story-part-19", src: soundF19, start: 1157, end: 1190 }
];

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

const WB_Unit8_Page47_Q1 = () => {const passageTouchRef=React.useRef(null);

  const returnToStory = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const story = event.currentTarget
      .closest("[data-exercise-scope]")
      ?.querySelector("[data-return-story]");
    story?.focus({ preventScroll: true });
    story?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const clickableWords = [
    "Everyone",
    "no one",
    "nobody",
    "someone",
    "everything",
    "everyone",
  ];

  const answer = "Because the pilot was his 3rd grade science teacher.";

  const firstPart = `
Everyone was talking about the hot-air balloon ride that opened in town.
People were crowded in line and were waiting for their turn to ride in the
rainbow hot-air balloon. I was shocked to see so many people. no one knew
how many people were allowed to be in one ride. There was a small airplane
ride nearby. I went over to it and was shocked when I spotted the pilot. I
recognized him from third grade. “Mr. Myers?” I asked, looking confused.
“Hello, John. How are you? Are you still getting good grades in science
class?” he shouted back. Mr. Myers was my third grade science teacher.
nobody told me that he became a pilot!
`;

  const secondPart = `
He told me he was volunteering to fly the plane since the original pilot
was busy. someone walked towards us. He was another pilot. He leaned
towards Mr. Myers. “Get ready. The flight will take off in five minutes,”
he told him. “See you later, Mr. Myers,” I said as I started going towards
the hot-air balloon ride. “Wait,” said Mr. Myers. “Come on in and let’s
fly over the town.” I happily accepted. It was so fun feeling on top of
the world. everything looked so small from above. everyone waiting in line
looked like ants. It was a ride I’ll never forget.
`;

  const [lockedWords, setLockedWords] = useState([]),
    [wrongWords, setWrongWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);

  const [studentAnswer, setStudentAnswer] = useState("");

  const [result, setResult] = useState({
    paragraph: false,
    input: undefined,
  });

  const [locked, setLocked] = useState(false);

  const normalize = normalizeAnswer;

  // ------------------------
  // TOGGLE WORD
  // ------------------------

  const pronounGroups = () =>
    [firstPart, secondPart].flatMap((text, part) =>
      Array.from(
        text.matchAll(
          /\b(no one|Everyone|nobody|someone|everything|everyone)\b/g,
        ),
        (m) => ({
          word: m[0],
          keys: Array.from(
            m[0].matchAll(/\S+/g),
            (w) => `${part}-${m.index + w.index}`,
          ),
        }),
      ),
    );
  const toggleWord = (key) => {
    if (locked || lockedWords.includes(key)) return;
    setSelectedWords((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
    setWrongWords((prev) => prev.filter((k) => k !== key));
    setAnnouncement("Word selection updated.");
  };
  const renderParagraph = (text) => {
    const partId = text === firstPart ? 0 : 1,
      regex = /\b(no one|Everyone|nobody|someone|everything|everyone)\b/g,
      base = partId === 0 ? 0 : firstPart.length;
    
    const renderText = (part, start) => {
      let local = 0;
      return part.split(/(\s+)/).map((token, i) => {
        const at = start + local;
        local += token.length;
        if (!token.trim()) return token;
        const key = `${partId}-${at}`,
          selected = selectedWords.includes(key),
          correct = lockedWords.includes(key),
          wrong = wrongWords.includes(key);
        return (
          <span
            key={i}
            role="button"
            data-choice
            tabIndex={0}
            aria-pressed={selected}
            aria-disabled={locked || correct}
            aria-label={`${token}${correct ? ". Correct and locked." : wrong ? ". Incorrect selection." : ""}`}
            {...activationKeys}
            onClick={(event) => {
              event.stopPropagation();
              toggleWord(key);
            }}
            style={{
              cursor: locked || correct ? "default" : "pointer",
              borderRadius: 6,
              boxShadow: selected
                ? `inset 0 -2px ${correct ? "#16a34a" : wrong ? "#D1232A" : "#6D2980"}`
                : undefined,
            }}
          >
            {token}
          </span>
        );
      });
    };
    const renderRange=(start,end)=>{let offset=start;return text.slice(start,end).split(regex).map((part, i) => {
      const at = offset;
      offset += part.length;
      return clickableWords.includes(part) ? (
        <span
          key={i}
          style={{
            display: "inline-block",
            border: "none",
            borderBottom: "2px solid transparent",
            padding: 0,
            margin: 0,
            lineHeight: "inherit",
            color: "inherit",
          }}
        >
          {renderText(part, at)}
        </span>
      ) : (
        <span key={i}>{renderText(part, at)}</span>
      );
    });};
return STORY_AUDIO_PARTS.map(part=>{const start=Math.max(0,part.start-base),end=Math.min(text.length,part.end-base);if(end<=start)return null;const first=part.start>=base;const playing=audio.activeId===part.id;return <span onTouchCancelCapture={()=>{passageTouchRef.current=null;}} onTouchEndCapture={event=>{const pending=passageTouchRef.current;passageTouchRef.current=null;if(!pending||pending.part!==part.id)return;const touch=Array.from(event.changedTouches).find(t=>t.identifier===pending.id);if(!touch||event.touches.length||Math.hypot(touch.clientX-pending.x,touch.clientY-pending.y)>8)return;event.preventDefault();event.stopPropagation();audio.play(part.id,part.src);}} onTouchStartCapture={event=>{passageTouchRef.current=null;if(event.touches.length!==1)return;const touch=event.touches[0],point={x:touch.clientX,y:touch.clientY};const onWord=Array.from(event.currentTarget.querySelectorAll("[role=button]")).some(word=>Array.from(word.getClientRects()).some(r=>point.x>=r.left&&point.x<=r.right&&point.y>=r.top&&point.y<=r.bottom));if(!onWord)passageTouchRef.current={id:touch.identifier,...point,part:part.id};}} key={part.id} role="group" aria-roledescription="passage audio" aria-label={`Hear story part ${STORY_AUDIO_PARTS.indexOf(part)+1} of ${STORY_AUDIO_PARTS.length}`} tabIndex={first?0:undefined} data-choice={first||undefined} data-audio-part={part.id} onClick={event=>{event.stopPropagation();if(event.target.closest('button,input,[role="button"]'))return;audio.play(part.id,part.src);}} onKeyDown={event=>{if(event.target!==event.currentTarget||event.key!=="Enter"&&event.key!==" ")return;event.preventDefault();event.stopPropagation();if(!event.repeat)audio.play(part.id,part.src);}} onKeyUp={event=>{if(event.target===event.currentTarget&&(event.key==="Enter"||event.key===" ")){event.preventDefault();event.stopPropagation();}}} style={{position:"relative",cursor:"pointer",borderRadius:6,backgroundColor:playing?"#dbeafe":undefined,boxShadow:playing?"0 0 0 3px #2563eb":undefined}}>{renderRange(start,end)}{first&&playing&&<AudioSpeaker/>}</span>;});
  };
  // ------------------------
  // HANDLE INPUT
  // ------------------------

  const handleChange = (value) => {
    if (locked || result.input === true) return;

    setStudentAnswer(value);

    setResult((prev) => ({
      ...prev,
      input: undefined,
    }));
  };

  // ------------------------
  // CHECK
  // ------------------------

  const checkAnswers = () => {passageTouchRef.current=null;
    if (locked) return;
    audio.stop();

    // ------------------------
    // VALIDATION
    // ------------------------

    if (selectedWords.length === 0) {
      (setAnnouncement(
        String("Please underline at least one word.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Please underline at least one word."));

      return;
    }

    if (!studentAnswer.trim()) {
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
    // PARAGRAPH SCORE
    // ------------------------

    const groups = pronounGroups(),
      targets = groups.flatMap((g) => g.keys),
      completed = groups.filter((g) =>
        g.keys.every((k) => selectedWords.includes(k)),
      ),
      wrong = selectedWords.filter((k) => !targets.includes(k));
    setLockedWords(completed.flatMap((g) => g.keys));
    setWrongWords(wrong);
    const paragraphCorrect = Math.max(0, completed.length - wrong.length);

    const paragraphOk = paragraphCorrect === 6;

    // ------------------------
    // INPUT
    // ------------------------

    const inputOk = normalize(studentAnswer) === normalize(answer);

    // ------------------------
    // SCORE
    // ------------------------

    let correctCount = 0;

    // 6 marks for paragraph
    correctCount += paragraphCorrect;

    // 1 mark for writing answer
    if (inputOk) correctCount++;

    setResult({
      paragraph: paragraphOk,
      input: inputOk,
    });

    const total = 7;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const msg = `
    <div style="font-size:18px;text-align:center;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${correctCount} / ${total}
      </span>
    </div>
  `;

    if (correctCount === total) {
      resetButtonRef.current?.focus({ preventScroll: true });
      setLocked(true);

      (setAnnouncement(
        String(msg)
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.success(msg));
    } else if (correctCount === 0) {
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

  const showAnswers = () => {passageTouchRef.current=null;
    audio.stop();
    setAnnouncement("Model answers shown and locked.");
    resetButtonRef.current?.focus({ preventScroll: true });
    const keys = pronounGroups().flatMap((g) => g.keys);
    setSelectedWords(keys);
    setLockedWords(keys);
    setWrongWords([]);

    setStudentAnswer(answer);

    setResult({
      paragraph: true,
      input: true,
    });

    setLocked(true);
  };

  // ------------------------
  // RESET
  // ------------------------

  const handleReset = () => {passageTouchRef.current=null;
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setSelectedWords([]);
    setLockedWords([]);
    setWrongWords([]);

    setStudentAnswer("");

    setResult({
      paragraph: false,
      input: undefined,
    });

    setLocked(false);
  };

  // ------------------------
  // INPUT
  // ------------------------

  const inputField = () => (
    <div className="relative w-full">
      <input
        style={{
          borderBottomColor:
            result.input === true
              ? "#16a34a"
              : result.input === false
                ? "#D1232A"
                : undefined,
        }}
        aria-invalid={result.input === false}
        placeholder={"Your answer"}
        title={"Why was John shocked to see the pilot of the small airplane?"}
        aria-label={
          "Why was John shocked to see the pilot of the small airplane?"
        }
        {...fieldKeys}
        type="text"
        value={studentAnswer}
        disabled={locked || result.input === true}
        onChange={(e) => handleChange(e.target.value)}
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

          ${result.input === false ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {result.input === false && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            width: "20px",
            height: "20px",
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
      data-exercise-scope={"WB_Unit8_Page47_Q1.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="WB_Unit8_Page47_Q1.jsx"] input:focus-visible,[data-exercise-scope="WB_Unit8_Page47_Q1.jsx"] textarea:focus-visible,[data-exercise-scope="WB_Unit8_Page47_Q1.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
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
          subTitle="Read the passage once, underline the indefinite pronouns on a second pass, then use the text evidence to answer the question."
        />

        {/* PARAGRAPH BOX */}

        <div
          onKeyUp={(event) => {
            if (event.target === event.currentTarget)
              activationKeys.onKeyUp(event);
          }}
          onKeyDown={(event) => {
            if (
              event.target !== event.currentTarget ||
              (event.key !== "Enter" && event.key !== " ")
            )
              return;
            event.preventDefault();
            event.stopPropagation();
            if (!event.repeat)
              audio.play("story", [
                soundF1,
                soundF2,
                soundF3,
                soundF4,
                soundF5,
                soundF6,
                soundF7,
                soundF8,
                soundF9,
                soundF10,
                soundF11,
                soundF12,
                soundF13,
                soundF14,
                soundF15,
                soundF16,
                soundF17,
                soundF18,
                soundF19,
              ]);
          }}
          onClick={(event) => {
            if (event.target.closest("img,button,input,[role=button]")) return;
            event.stopPropagation();
            audio.play("story", [
              soundF1,
              soundF2,
              soundF3,
              soundF4,
              soundF5,
              soundF6,
              soundF7,
              soundF8,
              soundF9,
              soundF10,
              soundF11,
              soundF12,
              soundF13,
              soundF14,
              soundF15,
              soundF16,
              soundF17,
              soundF18,
              soundF19,
            ]);
          }}
          aria-label={
            "Hear the complete story about John and the pilot. Use Tab to select words for underlining."
          }
          tabIndex={0}
          role={"group"}
          data-choice={true}
          data-return-story={true}
          style={{
            border: "2px solid #6D2980",
            borderRadius: "12px",
            padding: "14px",
            overflow: "hidden",
            fontSize: "17px",
            color: "#3b2b20",
            position: "relative",
            boxShadow:
              audio.activeId === "story" ? "0 0 0 3px #2563eb" : undefined,
            background: audio.activeId === "story" ? "#dbeafe" : "#fff",
            "--exercise-focus-radius": "12px",
          }}
        >
          {/* TOP IMAGE */}
          <img
            src={img1}
            alt={"A smiling pilot in uniform standing in front of an airplane."}
            style={{
              float: "right",
              width: "170px",
              height: "auto",
              objectFit: "contain",
              marginLeft: "12px",
              marginBottom: "8px",
              borderRadius: "6px",
            }}
          />
          {renderParagraph(firstPart)}

          {/* BOTTOM IMAGE */}
          <img
            src={img2}
            alt={
              "The nose and front landing gear of a passenger airplane on the ground."
            }
            style={{
              float: "left",
              width: "120px",
              height: "auto",
              objectFit: "contain",
              marginRight: "12px",
              marginTop: "10px",
              clear: "both",
            }}
          />
          {renderParagraph(secondPart)}
          {audio.activeId === "story" && (
            <span style={{ position: "absolute", top: 22, right: 22 }}>
              <AudioSpeaker />
            </span>
          )}
        </div>

        {/* QUESTION 1 */}

        <div className="mt-10 mb-8">
          <div className="flex items-start gap-4">
            <span
              style={{
                position: "relative",
                borderRadius: 6,
                backgroundColor:
                  audio.activeId === "instruction" ? "#dbeafe" : undefined,
                boxShadow:
                  audio.activeId === "instruction"
                    ? "0 0 0 3px #2563eb"
                    : undefined,
              }}
              {...activationKeys}
              onClick={() => audio.play("instruction", soundF20)}
              aria-label={
                "Hear: Underline all the indefinite pronouns in the story."
              }
              data-choice={true}
              tabIndex={0}
              role={"button"}
              className="flex items-center gap-2"
            >
              <span className="font-bold mr-2">1</span>
              Underline all the indefinite pronouns in the story.
              <HiArrowUpCircle
                onKeyUp={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    event.stopPropagation();
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key !== "Enter" && event.key !== " ") return;
                  event.preventDefault();
                  event.stopPropagation();
                  if (!event.repeat) returnToStory(event);
                }}
                onClick={returnToStory}
                aria-label={"Return to the story above"}
                data-choice={true}
                tabIndex={0}
                role={"button"}
                style={{
                  color: "#6D2980",
                  fontSize: "26px",
                  flexShrink: 0,
                  cursor: "pointer",
                  borderRadius: "50%",
                  "--exercise-focus-radius": "50%",
                }}
              />
              {audio.activeId === "instruction" && <AudioSpeaker />}
            </span>
          </div>
        </div>

        {/* QUESTION 2 */}

        <div className="mb-12">
          <div className="flex items-start gap-4 mb-5">
            <span className="font-bold">2</span>

            <span>
              <AudioText
                audio={audio}
                id="question"
                src={soundF21}
                label="Hear the question about John"
              >
                Why was John shocked to see the pilot of the small airplane?
              </AudioText>
            </span>
          </div>

          <div className="pl-[35px]">{inputField()}</div>
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

export default WB_Unit8_Page47_Q1;
