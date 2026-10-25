import { useExerciseAudio } from "./useExerciseAudio";
import { AudioText, AudioFeedback, AudioSpeaker } from "./ExerciseAudioText";
import clip0 from "../../../assets/audio/ClassBook/U4/Page 33 - E/Item_001_Max_likes_to_do_different_activities_on_the_weekends._Max_usually.mp3";
import clip1 from "../../../assets/audio/ClassBook/U4/Page 33 - E/Item_002_skateboards_at_the_skate_park_near_his_house._His_friend_Nick_sometimes.mp3";
import clip2 from "../../../assets/audio/ClassBook/U4/Page 33 - E/Item_003_skateboards_with_him._Max's_neighbor_occasionally_plays_a_chess_game_wit.mp3";
import clip3 from "../../../assets/audio/ClassBook/U4/Page 33 - E/Item_004_him._They_rarely_sit_outside_when_they_play_chess._Instead,_they_often_p.mp3";
import clip4 from "../../../assets/audio/ClassBook/U4/Page 33 - E/Item_005_chess_in_each_other's_houses._Every_once_in_a_while,_Max_likes_to_watch.mp3";
import clip5 from "../../../assets/audio/ClassBook/U4/Page 33 - E/Item_006_a_movie_at_the_theater._However,_he_often_rents_movies_to_watch_at.mp3";
import clip6 from "../../../assets/audio/ClassBook/U4/Page 33 - E/Item_007_home._During_the_summer,_Max_always_reads_a_lot_of_books._Sometimes,.mp3";
import clip7 from "../../../assets/audio/ClassBook/U4/Page 33 - E/Item_008_it_is_just_too_hot_to_do_anything_outside._Max_is_never_bored_on_his.mp3";
import clip8 from "../../../assets/audio/ClassBook/U4/Page 33 - E/Item_009_weekends_because_he_regularly_finds_things_to_do.mp3";
import ExerciseHeader from "../../ExerciseHeader";
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
const Unit4_Page6_Q2 = () => {
  const audio = useExerciseAudio();
  const resetButtonRef = React.useRef(null);
  const [announcement, setAnnouncement] = useState("");
  const [correctWordsLocked, setCorrectWordsLocked] = useState([]);
  const paragraph = [
    "Max likes to do different activities on the weekends.",
    "Max usually skateboards at the skate park near his house.",
    "His friend Nick sometimes skateboards with him.",
    "Max’s neighbor occasionally plays a chess game with him.",
    "They rarely sit outside when they play chess.",
    "Instead, they often play chess in each other’s houses.",
    "Every once in a while, Max likes to watch a movie at the theater.",
    "However, he often rents movies to watch at home.",
    "During the summer, Max always reads a lot of books.",
    "Sometimes, it is just too hot to do anything outside.",
    "Max is never bored on his weekends because he regularly finds things to do.",
  ];
  // Recording boundaries follow the supplied files, not invented sentence timings.
  // Keep the original word IDs and the original spaces between sentences.
  const paragraphWords = paragraph.flatMap((line, lineIndex) =>
    line
      .split(" ")
      .map((word, wordIndex, words) => ({
        word,
        id: lineIndex + "-" + wordIndex,
        endsSentence: wordIndex === words.length - 1,
      })),
  );
  const recordingStarts = [
    "Max likes to do",
    "skateboards at the skate",
    "skateboards with him.",
    "him. They rarely",
    "chess in each",
    "a movie at",
    "home. During the",
    "it is just",
    "weekends because he",
  ];
  const startIndices = recordingStarts.map((prefix) => {
    const words = prefix.split(" ");
    return paragraphWords.findIndex((_, index) =>
      words.every(
        (word, offset) => paragraphWords[index + offset]?.word === word,
      ),
    );
  });
  const recordingSources = [
    clip0,
    clip1,
    clip2,
    clip3,
    clip4,
    clip5,
    clip6,
    clip7,
    clip8,
  ];
  const audioSegments = startIndices.map((start, index) => ({
    id: "segment-" + index,
    src: recordingSources[index],
    words: paragraphWords.slice(
      start,
      startIndices[index + 1] ?? paragraphWords.length,
    ),
  }));
  const playSegment = (event, segment) => {
    if (
      event.target !== event.currentTarget &&
      (event.type !== "click" || event.target.closest?.('[role="button"]'))
    )
      return;
    if (event.type !== "click" && event.key !== "Enter" && event.key !== " ")
      return;
    event.preventDefault();
    event.stopPropagation();
    if (event.type !== "keyup" && !event.repeat)
      audio.play(segment.id, segment.src);
  };

  const correctWords = [
    "usually",
    "sometimes",
    "occasionally",
    "rarely",
    "often",
    "often",
    "always",
    "Sometimes",
    "never",
    "regularly",
  ];
  const [selectedWords, setSelectedWords] = useState([]);
  const [wrongWords, setWrongWords] = useState([]);
  const [locked, setLocked] = useState(false);

  // toggle
  const toggleWord = (id) => {
    if (locked) return;

    // ✅ لا تعدل الصح المثبت
    if (correctWordsLocked.includes(id)) return;
    if (selectedWords.includes(id)) {
      setSelectedWords(selectedWords.filter((w) => w !== id));
    } else {
      setSelectedWords([...selectedWords, id]);
    }
    setWrongWords(wrongWords.filter((w) => w !== id));
  };

  // check
  const handleCheck = () => {
    if (locked) return;
    audio.stop();
    if (selectedWords.length === 0) {
      (setAnnouncement(
        String("Select the adverbs.")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.info("Select the adverbs."));
      return;
    }
    let score = 0;
    const wrong = [];
    const correctLockedNow = [];
    selectedWords.forEach((id) => {
      const [lineIndex, wordIndex] = id.split("-");
      const word = paragraph[lineIndex]
        .split(" ")
        // eslint-disable-next-line no-unexpected-multiline
        [wordIndex].replace(/[.,]/g, "");
      const correct = correctWords.some(
        (w) => w.toLowerCase() === word.toLowerCase(),
      );
      if (correct) {
        score++;
        correctLockedNow.push(id);
      } else {
        wrong.push(id);
      }
    });
    setWrongWords(wrong);

    // ✅ ثبت الصح فقط
    setCorrectWordsLocked((prev) => [
      ...new Set([...prev, ...correctLockedNow]),
    ]);
    const total = correctWords.length;
    const allCorrect = correctLockedNow.length === total && wrong.length === 0;
    const msg = `Score: ${score} / ${total}`;
    if (allCorrect) {
      resetButtonRef.current?.focus({
        preventScroll: true,
      });
      setLocked(true);
      (setAnnouncement(
        String(msg)
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      ),
        ValidationAlert.success(msg));
    } else if (score === 0) {
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

  // show
  const handleShow = () => {
    audio.stop();
    setAnnouncement("Correct answers shown and locked.");
    const allCorrectIds = [];
    paragraph.forEach((line, lineIndex) => {
      line.split(" ").forEach((word, wordIndex) => {
        const cleanWord = word.replace(/[.,]/g, "");
        const correct = correctWords.some(
          (w) => w.toLowerCase() === cleanWord.toLowerCase(),
        );
        if (correct) {
          allCorrectIds.push(`${lineIndex}-${wordIndex}`);
        }
      });
    });
    setSelectedWords(allCorrectIds);
    setWrongWords([]);
    setCorrectWordsLocked(allCorrectIds);
    setLocked(true);
  };

  // reset
  const handleReset = () => {
    audio.stop();
    setAnnouncement("Answers and feedback cleared.");
    setSelectedWords([]);
    setWrongWords([]);
    setLocked(false);
    setCorrectWordsLocked([]);
  };

  // render word
  const renderWord = (word, id) => {
    const selected = selectedWords.includes(id);
    const wrong = wrongWords.includes(id);
    return (
      <span
        {...activationKeys}
        aria-disabled={locked || correctWordsLocked.includes(id)}
        aria-pressed={selected}
        aria-label={
          word +
          ". " +
          (correctWordsLocked.includes(id)
            ? "Correct and locked."
            : "Select an adverb of frequency.")
        }
        data-choice={true}
        tabIndex={0}
        role={"button"}
        key={id}
        onClick={() => toggleWord(id)}
        style={{
          position: "relative",
          display: "inline-block",
          margin: "0 2px",
          borderRadius: 999,
        }}
      >
        <span
          style={{
            cursor: locked ? "default" : "pointer",
            border: selected
              ? wrong
                ? "2px solid red"
                : "2px solid #6D2980"
              : "2px solid transparent",
            borderRadius: "999px",
            padding: "2px 6px",
            transition: "0.2s",
            userSelect: "none",
            display: "inline-block",
            ...(correctWordsLocked.includes(id)
              ? {
                  borderColor: "#16a34a",
                }
              : {}),
          }}
        >
          {word}
        </span>

        {/* ❌ */}
        {wrong && (
          <span
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              width: "18px",
              height: "18px",
              background: "#ef4444",
              color: "white",
              borderRadius: "50%",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
  };
  return (
    <div
      data-exercise-scope="Unit4_Page6_Q2.jsx"
      style={{
        padding: "30px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <AudioFeedback audio={audio} />
      <style>{`[data-exercise-scope="Unit4_Page6_Q2.jsx"] input:focus-visible,[data-exercise-scope="Unit4_Page6_Q2.jsx"] textarea:focus-visible,[data-exercise-scope="Unit4_Page6_Q2.jsx"] [data-choice]:focus-visible{outline:4px solid #2563eb!important;outline-offset:3px;border-radius:6px;}`}</style>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      <div className="div-forall mb-10">
        {/* HEADER */}
        <ExerciseHeader
          sectionLetter="E"
          title={<>Read and circle the adverbs of frequency.</>}
          subTitle="Read the text carefully and select only the target words; review your selections before checking."
        />

        {/* PARAGRAPH */}
        <div style={{ marginTop: "35px", padding: "0 20px" }}>
          <p
            style={{
              fontSize: "20px",
              lineHeight: "2.15",
              color: "#111",
              textAlign: "left",
              maxWidth: "980px",
              margin: "0 auto",
              wordSpacing: "1px",
            }}
          >
            {audioSegments.map((segment) => (
              <span
                key={segment.id}
                role="group"
                aria-roledescription="text audio"
                aria-label={
                  "Hear: " + segment.words.map((item) => item.word).join(" ")
                }
                aria-keyshortcuts="Enter Space"
                tabIndex={0}
                data-choice
                data-sentence-audio={segment.id}
                onClick={(event) => playSegment(event, segment)}
                onKeyDown={(event) => playSegment(event, segment)}
                onKeyUp={(event) => playSegment(event, segment)}
                style={{
                  position: "relative",
                  borderRadius: 6,
                  ...(audio.activeId === segment.id
                    ? {
                        boxShadow: "0 0 0 3px #2563eb",
                        backgroundColor: "#dbeafe",
                      }
                    : {}),
                }}
              >
                {segment.words.map((item) => (
                  <React.Fragment key={item.id}>
                    {renderWord(item.word, item.id)}
                    {item.endsSentence ? " " : null}
                  </React.Fragment>
                ))}
                {audio.activeId === segment.id && <AudioSpeaker />}
              </span>
            ))}
          </p>
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
            onClick={handleShow}
          >
            Show Answer
          </button>

          <button
            {...activationKeys}
            style={{
              cursor: locked ? "not-allowed" : "pointer",
            }}
            disabled={locked}
            aria-label={"Check Answer"}
            type={"button"}
            className="check-button2"
            onClick={handleCheck}
          >
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};
export default Unit4_Page6_Q2;
