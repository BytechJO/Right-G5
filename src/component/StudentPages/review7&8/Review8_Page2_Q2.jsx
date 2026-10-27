import clip5 from "../../../assets/audio/ClassBook/U8/Page 73 - E/Item_006_I_remembered_reading_that_cats_like_anything_shiny_to_play_with,_and_tha.mp3";
import clip4 from "../../../assets/audio/ClassBook/U8/Page 73 - E/Item_005_No_one_had_thought_that_the_thief_might_be_an_it_and_not_a_person.mp3";
import clip3 from "../../../assets/audio/ClassBook/U8/Page 73 - E/Item_004_Hey,_everybody,_come_here!_I_yelled._Mew_had_my_mom's_necklace_on_the_ca.mp3";
import clip2 from "../../../assets/audio/ClassBook/U8/Page 73 - E/Item_003_Suddenly,_I_noticed_she_had_stopped_following_me_and_was_playing._I_look.mp3";
import clip1 from "../../../assets/audio/ClassBook/U8/Page 73 - E/Item_002_She_always_kept_it_on_a_necklace_holder_on_her_dresser,_but_it_was_gone.mp3";
import clip0 from "../../../assets/audio/ClassBook/U8/Page 73 - E/Item_001_No_one_knew_how_the_necklace_had_disappeared,_but_someone_must_have_take.mp3";
import ExerciseHeader from "../../ExerciseHeader";
import { useExerciseAudio } from "../unit5/useExerciseAudio";
import { AudioFeedback, AudioSpeaker } from "../unit5/ExerciseAudioText";

import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
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

const Review8_Page2_Q2 = () => {
  const [lockedWords, setLockedWords] = useState([]);
  const [wrongWords, setWrongWords] = useState([]);
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = React.useState("");

  const pronouns = [
    "No one",
    "someone",
    "Everybody",
    "something",
    "everybody",
    "No one",
    "anything",
  ];
  const paragraphWords = [
    "No one",
    "knew",
    "how",
    "the",
    "necklace",
    "had",
    "disappeared,",
    "but",
    "someone",
    "must",
    "have",
    "taken",
    "it.",
    "It",
    "was",
    "Mom’s",
    "favorite",
    "necklace.",
    "She",
    "always",
    "kept",
    "it",
    "on",
    "a",
    "necklace",
    "holder",
    "on",
    "her",
    "dresser,",
    "but",
    "it",
    "was",
    "gone.",
    "Everybody",
    "in",
    "our",
    "family",
    "helped",
    "to",
    "look",
    "for",
    "it,",
    "including",
    "our",
    "new",
    "cat,",
    "Mew.",
    "Suddenly,",
    "I",
    "noticed",
    "she",
    "had",
    "stopped",
    "following",
    "me",
    "and",
    "was",
    "playing.",
    "I",
    "looked",
    "over",
    "to",
    "see",
    "what",
    "she",
    "was",
    "doing,",
    "and",
    "I",
    "saw",
    "something",
    "shiny",
    "on",
    "the",
    "carpet",
    "near",
    "Mew.",
    "“Hey,",
    "everybody,",
    "come",
    "here!”",
    "I",
    "yelled.",
    "Mew",
    "had",
    "my",
    "mom’s",
    "necklace",
    "on",
    "the",
    "carpet,",
    "and",
    "she",
    "was",
    "playing",
    "with",
    "it!",
    "No one",
    "had",
    "thought",
    "that",
    "the",
    "thief",
    "might",
    "be",
    "an",
    "“it”",
    "and",
    "not",
    "a",
    "person.",
    "I",
    "remembered",
    "reading",
    "that",
    "cats",
    "like",
    "anything",
    "shiny",
    "to",
    "play",
    "with,",
    "and",
    "that",
    "was",
    "certainly",
    "true",
    "for",
    "our",
    "cat!",
  ];

  const correctPronounKeys = paragraphWords.flatMap((word, index) =>
    pronouns.includes(word.replace(/[.,!?\u201c\u201d]/g, ""))
      ? [word + "-" + index]
      : [],
  );
  const questions = [
    "a necklace",
    "Everybody in the family was helping to look for it.",
    "Mew, the cat, had taken it to play with.",
  ];

  const [answers, setAnswers] = useState(["", "", ""]);

  const [result, setResult] = useState([]);

  const [locked, setLocked] = useState(false);

  const [selectedWords, setSelectedWords] = useState([]);

  const normalize = normalizeAnswer;

  const handleChange = (i, value) => {
    if (locked || result[i] === true) return;

    const updated = [...answers];

    updated[i] = value;

    setAnswers(updated);

    setResult((prev) => {
      const copy = [...prev];

      copy[i] = undefined;

      return copy;
    });
  };

  const toggleWord = (word, index) => {
    const key = word + "-" + index;
    if (locked || lockedWords.includes(key)) {
      setAnnouncement("Correct selection is locked.");
      return;
    }
    setSelectedWords((previous) =>
      previous.includes(key)
        ? previous.filter((item) => item !== key)
        : [...previous, key],
    );
    setWrongWords((previous) => previous.filter((item) => item !== key));
    setAnnouncement(
      word + (selectedWords.includes(key) ? " deselected." : " selected."),
    );
  };
  const checkAnswers = () => {
    if (locked) return;
    audio.stop();
    if (answers.some((answer) => !answer.trim())) {
      setAnnouncement("Please complete all fields.");
      ValidationAlert.info("Please complete all fields.");
      return;
    }
    if (!selectedWords.length) {
      setAnnouncement("Please select the indefinite pronouns.");
      ValidationAlert.info("Please select the indefinite pronouns.");
      return;
    }
    const nextResults = answers.map(
      (answer, index) => normalize(answer) === normalize(questions[index]),
    );
    const correctChosen = selectedWords.filter((key) =>
      correctPronounKeys.includes(key),
    );
    const wrong = selectedWords.filter(
      (key) => !correctPronounKeys.includes(key),
    );
    const total = questions.length + correctPronounKeys.length;
    const totalCorrect =
      nextResults.filter(Boolean).length + correctChosen.length;
    const complete = totalCorrect === total && !wrong.length;
    if (complete) resetButtonRef.current?.focus({ preventScroll: true });
    setResult(nextResults);
    setLockedWords((previous) => [...new Set([...previous, ...correctChosen])]);
    setWrongWords(wrong);
    setLocked(complete);
    setAnnouncement(
      "Score " +
        totalCorrect +
        " out of " +
        total +
        ". " +
        wrong.length +
        " incorrect word selections. " +
        (complete
          ? "All answers are correct and locked."
          : "You can change incorrect answers and select missing pronouns."),
    );
    const color = complete ? "green" : totalCorrect === 0 ? "red" : "orange";
    const message = `<div style="font-size:18px;text-align:center;"><span style="color:${color};font-weight:bold;">Score: ${totalCorrect} / ${total}</span></div>`;
    if (complete) ValidationAlert.success(message);
    else if (totalCorrect === 0) ValidationAlert.error(message);
    else ValidationAlert.warning(message);
  };

  const showAnswers = () => {
    setLockedWords([...correctPronounKeys]);
    setWrongWords([]);
    audio.stop();
    setAnnouncement("Model answers shown and locked.");
    resetButtonRef.current?.focus({ preventScroll: true });
    setAnswers([
      "a necklace",
      "Everybody in the family was helping to look for it.",
      "Mew, the cat, had taken it to play with.",
    ]);

    const correctSelections = [];

    paragraphWords.forEach((word, index) => {
      const cleanWord = word.replace(/[.,!?”“]/g, "");

      if (pronouns.includes(cleanWord)) {
        correctSelections.push(`${word}-${index}`);
      }
    });

    setSelectedWords(correctSelections);
    setResult([true, true, true]);

    setLocked(true);
  };

  const handleReset = () => {
    setLockedWords([]);
    setWrongWords([]);
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setAnswers(["", "", ""]);

    setResult([]);
    setSelectedWords([]);

    setLocked(false);
  };

  const sentenceInput = (i) => (
    <span className="relative flex-1">
      <input placeholder={"Your answer"}
        style={{
          ...(result[i] === true ? { borderBottomColor: "#16a34a" } : {}),
        }}
        aria-invalid={!!(result[i] === false)}
        title={`Response ${i + 1}: ${["What was missing in the family house?", "Who was helping to look for it?", "Why had the necklace disappeared?"][i]}`}
        aria-label={`Response ${i + 1}: ${["What was missing in the family house?", "Who was helping to look for it?", "Why had the necklace disappeared?"][i]}`}
        {...fieldKeys}
        type="text"
        value={answers[i]}
        disabled={locked || result[i] === true}
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
          leading-none
          align-middle
          px-1

          ${result[i] === false ? "border-[#D1232A]" : "border-black"}
        `}
      />

      {result[i] === false && (
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
    </span>
  );

  return (
    <div
      data-exercise-scope={"Review8_Page2_Q2.jsx"}
      className="flex flex-col items-center p-[30px]"
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Review8_Page2_Q2.jsx"] input:focus-visible,[data-exercise-scope="Review8_Page2_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Review8_Page2_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:var(--exercise-focus-radius,6px);}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall" style={{ gap: "30px" }}>
        {/* TITLE */}
        <ExerciseHeader
          isReview
          sectionLetter="E"
          title={
            <>Read, and then follow the instructions or answer the questions.</>
          }
          subTitle={
            <>
              Task 1: Select the indefinite pronouns in the paragraph first.{" "}
              <br /> Task 2: Then use the paragraph to answer each question in
              the response fields.
            </>
          }
        />

        {/* PARAGRAPH */}
        <div
          onClick={(event) => {
            if (event.target !== event.currentTarget) return;
            const targets = Array.from(
              event.currentTarget.querySelectorAll("[data-sentence-audio]"),
            );
            let best = null,
              distance = Infinity;
            targets.forEach((element, index) =>
              Array.from(element.getClientRects()).forEach((rect) => {
                const d =
                  Math.max(
                    rect.left - event.clientX,
                    0,
                    event.clientX - rect.right,
                  ) **
                    2 +
                  Math.max(
                    rect.top - event.clientY,
                    0,
                    event.clientY - rect.bottom,
                  ) **
                    2;
                if (d < distance) {
                  distance = d;
                  best = index;
                }
              }),
            );
            if (best !== null)
              audio.play(
                "mystery-" + best,
                [clip0, clip1, clip2, clip3, clip4, clip5][best],
              );
          }}
          style={{
            border: "2px solid #8D3DAF",
            borderRadius: "18px",
            padding: "18px",
            fontSize: "18px",
            lineHeight: "2.3",
            width: "900px",
            marginBottom: "30px",
          }}
        >
          <>
            <span
              role="group"
              aria-roledescription="sentence audio"
              aria-keyshortcuts="Enter Space"
              tabIndex={0}
              data-choice
              data-sentence-audio="mystery-0"
              aria-label="Hear mystery passage part 1"
              onKeyDown={(event) => {
                if (
                  event.target !== event.currentTarget ||
                  (event.key !== "Enter" && event.key !== " ")
                )
                  return;
                event.preventDefault();
                event.stopPropagation();
                if (!event.repeat) audio.play("mystery-0", clip0);
              }}
              onKeyUp={(event) => {
                if (
                  event.target === event.currentTarget &&
                  (event.key === "Enter" || event.key === " ")
                ) {
                  event.preventDefault();
                  event.stopPropagation();
                }
              }}
              onClick={(event) => {
                if (
                  event.target.closest?.(
                    'input,textarea,select,button,[role="button"],[data-choice]',
                  ) !== event.currentTarget
                )
                  return;
                event.stopPropagation();
                audio.play("mystery-0", clip0);
              }}
              style={{
                position: "relative",
                borderRadius: 6,
                ...(audio.activeId === "mystery-0"
                  ? {
                      boxShadow: "0 0 0 3px #2563eb",
                      backgroundColor: "#dbeafe",
                    }
                  : {}),
              }}
            >
              {paragraphWords.slice(0, 18).map((word, offset) => {
                const index = 0 + offset;
                const key = `${word}-${index}`;

                const selected = selectedWords.includes(key);

                return (
                  <span
                    {...activationKeys}
                    aria-label={
                      word +
                      (lockedWords.includes(key)
                        ? ". Correct and locked."
                        : wrongWords.includes(key)
                          ? ". Not correct; activate to remove."
                          : "")
                    }
                    aria-disabled={locked || lockedWords.includes(key)}
                    aria-pressed={selected}
                    data-choice={true}
                    tabIndex={0}
                    role={"button"}
                    key={index}
                    onClick={() => toggleWord(word, index)}
                    style={{
                      display: "inline-block",
                      marginRight: "0px",
                      marginBottom: "2px",
                      padding: "0px 2px",
                      borderRadius: "999px",
                      cursor: locked ? "default" : "pointer",
                      userSelect: "none",
                      position: "relative",
                      border: selected
                        ? "2px solid #6D2980"
                        : "2px solid transparent",

                      transition: "0.2s",
                      "--exercise-focus-radius": "999px",
                      ...(selected
                        ? {
                            backgroundColor: "#dbeafe",
                            ...(lockedWords.includes(key)
                              ? { borderColor: "#16a34a" }
                              : wrongWords.includes(key)
                                ? { borderColor: "#D1232A" }
                                : {}),
                          }
                        : {}),
                    }}
                  >
                    {word}
                  </span>
                );
              })}
              {audio.activeId === "mystery-0" && <AudioSpeaker />}
            </span>
            <span
              role="group"
              aria-roledescription="sentence audio"
              aria-keyshortcuts="Enter Space"
              tabIndex={0}
              data-choice
              data-sentence-audio="mystery-1"
              aria-label="Hear mystery passage part 2"
              onKeyDown={(event) => {
                if (
                  event.target !== event.currentTarget ||
                  (event.key !== "Enter" && event.key !== " ")
                )
                  return;
                event.preventDefault();
                event.stopPropagation();
                if (!event.repeat) audio.play("mystery-1", clip1);
              }}
              onKeyUp={(event) => {
                if (
                  event.target === event.currentTarget &&
                  (event.key === "Enter" || event.key === " ")
                ) {
                  event.preventDefault();
                  event.stopPropagation();
                }
              }}
              onClick={(event) => {
                if (
                  event.target.closest?.(
                    'input,textarea,select,button,[role="button"],[data-choice]',
                  ) !== event.currentTarget
                )
                  return;
                event.stopPropagation();
                audio.play("mystery-1", clip1);
              }}
              style={{
                position: "relative",
                borderRadius: 6,
                ...(audio.activeId === "mystery-1"
                  ? {
                      boxShadow: "0 0 0 3px #2563eb",
                      backgroundColor: "#dbeafe",
                    }
                  : {}),
              }}
            >
              {paragraphWords.slice(18, 47).map((word, offset) => {
                const index = 18 + offset;
                const key = `${word}-${index}`;

                const selected = selectedWords.includes(key);

                return (
                  <span
                    {...activationKeys}
                    aria-label={
                      word +
                      (lockedWords.includes(key)
                        ? ". Correct and locked."
                        : wrongWords.includes(key)
                          ? ". Not correct; activate to remove."
                          : "")
                    }
                    aria-disabled={locked || lockedWords.includes(key)}
                    aria-pressed={selected}
                    data-choice={true}
                    tabIndex={0}
                    role={"button"}
                    key={index}
                    onClick={() => toggleWord(word, index)}
                    style={{
                      display: "inline-block",
                      marginRight: "0px",
                      marginBottom: "2px",
                      padding: "0px 2px",
                      borderRadius: "999px",
                      cursor: locked ? "default" : "pointer",
                      userSelect: "none",
                      position: "relative",
                      border: selected
                        ? "2px solid #6D2980"
                        : "2px solid transparent",

                      transition: "0.2s",
                      "--exercise-focus-radius": "999px",
                      ...(selected
                        ? {
                            backgroundColor: "#dbeafe",
                            ...(lockedWords.includes(key)
                              ? { borderColor: "#16a34a" }
                              : wrongWords.includes(key)
                                ? { borderColor: "#D1232A" }
                                : {}),
                          }
                        : {}),
                    }}
                  >
                    {word}
                  </span>
                );
              })}
              {audio.activeId === "mystery-1" && <AudioSpeaker />}
            </span>
            <span
              role="group"
              aria-roledescription="sentence audio"
              aria-keyshortcuts="Enter Space"
              tabIndex={0}
              data-choice
              data-sentence-audio="mystery-2"
              aria-label="Hear mystery passage part 3"
              onKeyDown={(event) => {
                if (
                  event.target !== event.currentTarget ||
                  (event.key !== "Enter" && event.key !== " ")
                )
                  return;
                event.preventDefault();
                event.stopPropagation();
                if (!event.repeat) audio.play("mystery-2", clip2);
              }}
              onKeyUp={(event) => {
                if (
                  event.target === event.currentTarget &&
                  (event.key === "Enter" || event.key === " ")
                ) {
                  event.preventDefault();
                  event.stopPropagation();
                }
              }}
              onClick={(event) => {
                if (
                  event.target.closest?.(
                    'input,textarea,select,button,[role="button"],[data-choice]',
                  ) !== event.currentTarget
                )
                  return;
                event.stopPropagation();
                audio.play("mystery-2", clip2);
              }}
              style={{
                position: "relative",
                borderRadius: 6,
                ...(audio.activeId === "mystery-2"
                  ? {
                      boxShadow: "0 0 0 3px #2563eb",
                      backgroundColor: "#dbeafe",
                    }
                  : {}),
              }}
            >
              {paragraphWords.slice(47, 77).map((word, offset) => {
                const index = 47 + offset;
                const key = `${word}-${index}`;

                const selected = selectedWords.includes(key);

                return (
                  <span
                    {...activationKeys}
                    aria-label={
                      word +
                      (lockedWords.includes(key)
                        ? ". Correct and locked."
                        : wrongWords.includes(key)
                          ? ". Not correct; activate to remove."
                          : "")
                    }
                    aria-disabled={locked || lockedWords.includes(key)}
                    aria-pressed={selected}
                    data-choice={true}
                    tabIndex={0}
                    role={"button"}
                    key={index}
                    onClick={() => toggleWord(word, index)}
                    style={{
                      display: "inline-block",
                      marginRight: "0px",
                      marginBottom: "2px",
                      padding: "0px 2px",
                      borderRadius: "999px",
                      cursor: locked ? "default" : "pointer",
                      userSelect: "none",
                      position: "relative",
                      border: selected
                        ? "2px solid #6D2980"
                        : "2px solid transparent",

                      transition: "0.2s",
                      "--exercise-focus-radius": "999px",
                      ...(selected
                        ? {
                            backgroundColor: "#dbeafe",
                            ...(lockedWords.includes(key)
                              ? { borderColor: "#16a34a" }
                              : wrongWords.includes(key)
                                ? { borderColor: "#D1232A" }
                                : {}),
                          }
                        : {}),
                    }}
                  >
                    {word}
                  </span>
                );
              })}
              {audio.activeId === "mystery-2" && <AudioSpeaker />}
            </span>
            <span
              role="group"
              aria-roledescription="sentence audio"
              aria-keyshortcuts="Enter Space"
              tabIndex={0}
              data-choice
              data-sentence-audio="mystery-3"
              aria-label="Hear mystery passage part 4"
              onKeyDown={(event) => {
                if (
                  event.target !== event.currentTarget ||
                  (event.key !== "Enter" && event.key !== " ")
                )
                  return;
                event.preventDefault();
                event.stopPropagation();
                if (!event.repeat) audio.play("mystery-3", clip3);
              }}
              onKeyUp={(event) => {
                if (
                  event.target === event.currentTarget &&
                  (event.key === "Enter" || event.key === " ")
                ) {
                  event.preventDefault();
                  event.stopPropagation();
                }
              }}
              onClick={(event) => {
                if (
                  event.target.closest?.(
                    'input,textarea,select,button,[role="button"],[data-choice]',
                  ) !== event.currentTarget
                )
                  return;
                event.stopPropagation();
                audio.play("mystery-3", clip3);
              }}
              style={{
                position: "relative",
                borderRadius: 6,
                ...(audio.activeId === "mystery-3"
                  ? {
                      boxShadow: "0 0 0 3px #2563eb",
                      backgroundColor: "#dbeafe",
                    }
                  : {}),
              }}
            >
              {paragraphWords.slice(77, 97).map((word, offset) => {
                const index = 77 + offset;
                const key = `${word}-${index}`;

                const selected = selectedWords.includes(key);

                return (
                  <span
                    {...activationKeys}
                    aria-label={
                      word +
                      (lockedWords.includes(key)
                        ? ". Correct and locked."
                        : wrongWords.includes(key)
                          ? ". Not correct; activate to remove."
                          : "")
                    }
                    aria-disabled={locked || lockedWords.includes(key)}
                    aria-pressed={selected}
                    data-choice={true}
                    tabIndex={0}
                    role={"button"}
                    key={index}
                    onClick={() => toggleWord(word, index)}
                    style={{
                      display: "inline-block",
                      marginRight: "0px",
                      marginBottom: "2px",
                      padding: "0px 2px",
                      borderRadius: "999px",
                      cursor: locked ? "default" : "pointer",
                      userSelect: "none",
                      position: "relative",
                      border: selected
                        ? "2px solid #6D2980"
                        : "2px solid transparent",

                      transition: "0.2s",
                      "--exercise-focus-radius": "999px",
                      ...(selected
                        ? {
                            backgroundColor: "#dbeafe",
                            ...(lockedWords.includes(key)
                              ? { borderColor: "#16a34a" }
                              : wrongWords.includes(key)
                                ? { borderColor: "#D1232A" }
                                : {}),
                          }
                        : {}),
                    }}
                  >
                    {word}
                  </span>
                );
              })}
              {audio.activeId === "mystery-3" && <AudioSpeaker />}
            </span>
            <span
              role="group"
              aria-roledescription="sentence audio"
              aria-keyshortcuts="Enter Space"
              tabIndex={0}
              data-choice
              data-sentence-audio="mystery-4"
              aria-label="Hear mystery passage part 5"
              onKeyDown={(event) => {
                if (
                  event.target !== event.currentTarget ||
                  (event.key !== "Enter" && event.key !== " ")
                )
                  return;
                event.preventDefault();
                event.stopPropagation();
                if (!event.repeat) audio.play("mystery-4", clip4);
              }}
              onKeyUp={(event) => {
                if (
                  event.target === event.currentTarget &&
                  (event.key === "Enter" || event.key === " ")
                ) {
                  event.preventDefault();
                  event.stopPropagation();
                }
              }}
              onClick={(event) => {
                if (
                  event.target.closest?.(
                    'input,textarea,select,button,[role="button"],[data-choice]',
                  ) !== event.currentTarget
                )
                  return;
                event.stopPropagation();
                audio.play("mystery-4", clip4);
              }}
              style={{
                position: "relative",
                borderRadius: 6,
                ...(audio.activeId === "mystery-4"
                  ? {
                      boxShadow: "0 0 0 3px #2563eb",
                      backgroundColor: "#dbeafe",
                    }
                  : {}),
              }}
            >
              {paragraphWords.slice(97, 111).map((word, offset) => {
                const index = 97 + offset;
                const key = `${word}-${index}`;

                const selected = selectedWords.includes(key);

                return (
                  <span
                    {...activationKeys}
                    aria-label={
                      word +
                      (lockedWords.includes(key)
                        ? ". Correct and locked."
                        : wrongWords.includes(key)
                          ? ". Not correct; activate to remove."
                          : "")
                    }
                    aria-disabled={locked || lockedWords.includes(key)}
                    aria-pressed={selected}
                    data-choice={true}
                    tabIndex={0}
                    role={"button"}
                    key={index}
                    onClick={() => toggleWord(word, index)}
                    style={{
                      display: "inline-block",
                      marginRight: "0px",
                      marginBottom: "2px",
                      padding: "0px 2px",
                      borderRadius: "999px",
                      cursor: locked ? "default" : "pointer",
                      userSelect: "none",
                      position: "relative",
                      border: selected
                        ? "2px solid #6D2980"
                        : "2px solid transparent",

                      transition: "0.2s",
                      "--exercise-focus-radius": "999px",
                      ...(selected
                        ? {
                            backgroundColor: "#dbeafe",
                            ...(lockedWords.includes(key)
                              ? { borderColor: "#16a34a" }
                              : wrongWords.includes(key)
                                ? { borderColor: "#D1232A" }
                                : {}),
                          }
                        : {}),
                    }}
                  >
                    {word}
                  </span>
                );
              })}
              {audio.activeId === "mystery-4" && <AudioSpeaker />}
            </span>
            <span
              role="group"
              aria-roledescription="sentence audio"
              aria-keyshortcuts="Enter Space"
              tabIndex={0}
              data-choice
              data-sentence-audio="mystery-5"
              aria-label="Hear mystery passage part 6"
              onKeyDown={(event) => {
                if (
                  event.target !== event.currentTarget ||
                  (event.key !== "Enter" && event.key !== " ")
                )
                  return;
                event.preventDefault();
                event.stopPropagation();
                if (!event.repeat) audio.play("mystery-5", clip5);
              }}
              onKeyUp={(event) => {
                if (
                  event.target === event.currentTarget &&
                  (event.key === "Enter" || event.key === " ")
                ) {
                  event.preventDefault();
                  event.stopPropagation();
                }
              }}
              onClick={(event) => {
                if (
                  event.target.closest?.(
                    'input,textarea,select,button,[role="button"],[data-choice]',
                  ) !== event.currentTarget
                )
                  return;
                event.stopPropagation();
                audio.play("mystery-5", clip5);
              }}
              style={{
                position: "relative",
                borderRadius: 6,
                ...(audio.activeId === "mystery-5"
                  ? {
                      boxShadow: "0 0 0 3px #2563eb",
                      backgroundColor: "#dbeafe",
                    }
                  : {}),
              }}
            >
              {paragraphWords.slice(111, 130).map((word, offset) => {
                const index = 111 + offset;
                const key = `${word}-${index}`;

                const selected = selectedWords.includes(key);

                return (
                  <span
                    {...activationKeys}
                    aria-label={
                      word +
                      (lockedWords.includes(key)
                        ? ". Correct and locked."
                        : wrongWords.includes(key)
                          ? ". Not correct; activate to remove."
                          : "")
                    }
                    aria-disabled={locked || lockedWords.includes(key)}
                    aria-pressed={selected}
                    data-choice={true}
                    tabIndex={0}
                    role={"button"}
                    key={index}
                    onClick={() => toggleWord(word, index)}
                    style={{
                      display: "inline-block",
                      marginRight: "0px",
                      marginBottom: "2px",
                      padding: "0px 2px",
                      borderRadius: "999px",
                      cursor: locked ? "default" : "pointer",
                      userSelect: "none",
                      position: "relative",
                      border: selected
                        ? "2px solid #6D2980"
                        : "2px solid transparent",

                      transition: "0.2s",
                      "--exercise-focus-radius": "999px",
                      ...(selected
                        ? {
                            backgroundColor: "#dbeafe",
                            ...(lockedWords.includes(key)
                              ? { borderColor: "#16a34a" }
                              : wrongWords.includes(key)
                                ? { borderColor: "#D1232A" }
                                : {}),
                          }
                        : {}),
                    }}
                  >
                    {word}
                  </span>
                );
              })}
              {audio.activeId === "mystery-5" && <AudioSpeaker />}
            </span>
          </>
        </div>

        {/* QUESTIONS */}
        <div className="text-[18px] leading-[4] mb-7">
          <div className="flex items-center gap-4">
            <span className="font-bold">1</span>

            <span>
              Circle all the indefinite pronouns in the paragraph above.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-bold">2</span>

            <span>What was missing in the family’s house?</span>

            {sentenceInput(0, "w-[320px]")}
          </div>

          <div className="flex items-center gap-4">
            <span className="font-bold">3</span>

            <span>Who was helping to look for it?</span>

            {sentenceInput(1, "w-[430px]")}
          </div>

          <div className="flex items-center gap-4">
            <span className="font-bold">4</span>

            <span>Why had the necklace disappeared?</span>

            {sentenceInput(2, "w-[420px]")}
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

export default Review8_Page2_Q2;
