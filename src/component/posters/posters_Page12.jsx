import React from "react";
import page_12 from "../../assets/imgs/pages/posters/G5 Poster_Page_12.png";
import VocabularAudio from "../../assets/audio/ClassBook/U6/PG 46/cd27pg46-vocab.mp3";
import sound1 from "../../assets/audio/ClassBook/U6/PG 46/sound1.mp3";
import sound2 from "../../assets/audio/ClassBook/U6/PG 46/sound2.mp3";
import sound3 from "../../assets/audio/ClassBook/U6/PG 46/sound3.mp3";
import sound4 from "../../assets/audio/ClassBook/U6/PG 46/sound4.mp3";
import sound5 from "../../assets/audio/ClassBook/U6/PG 46/sound5.mp3";
import sound6 from "../../assets/audio/ClassBook/U6/PG 46/sound6.mp3";
import sound7 from "../../assets/audio/ClassBook/U6/PG 46/sound7.mp3";
import sound8 from "../../assets/audio/ClassBook/U6/PG 46/sound8.mp3";
import sound9 from "../../assets/audio/ClassBook/U6/PG 46/sound9.mp3";
import sound10 from "../../assets/audio/ClassBook/U6/PG 46/sound10.mp3";
import sound11 from "../../assets/audio/ClassBook/U6/PG 46/sound11.mp3";
import sound12 from "../../assets/audio/ClassBook/U6/PG 46/sound12.mp3";
import sound13 from "../../assets/audio/ClassBook/U6/PG 46/sound13.mp3";
import sound14 from "../../assets/audio/ClassBook/U6/PG 46/sound14.mp3";
import sound15 from "../../assets/audio/ClassBook/U6/PG 46/sound15.mp3";
import sound16 from "../../assets/audio/ClassBook/U6/PG 46/sound16.mp3";
import sound17 from "../../assets/audio/ClassBook/U6/PG 46/sound17.mp3";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import Vocabulary from "../Vocabulary";

const Posters_Page12 = ({ openPopup }) => {
  const sounds = [
    sound1,
    sound2,
    sound3,
    sound4,
    sound5,
    sound6,
    sound7,
    sound8,
    sound9,
    sound10,
    sound11,
    sound12,
    sound13,
    sound14,
    sound15,
    sound16,
    sound17,
  ];
  const captionVoc = [
    {
      start: 0.399,
      end: 4.519,
      text: "Page 46, unit six, vocabulary. Listen and repeat.",
    },

    {
      start: 5.0,
      end: 7.819,
      text: "Find the words and expressions in the conversation above.",
    },

    {
      start: 8.399,
      end: 10.099,
      text: "1. attractions.",
    },

    {
      start: 10.8,
      end: 12.5,
      text: "2. discount.",
    },

    {
      start: 13.46,
      end: 15.139,
      text: "3. booth.",
    },

    {
      start: 16.1,
      end: 19.279,
      text: "4. shoot (a basketball).",
    },

    {
      start: 20.279,
      end: 22.02,
      text: "5. bowling.",
    },

    {
      start: 23.119,
      end: 25.159,
      text: "6. (a) bunch.",
    },

    {
      start: 26.199,
      end: 28.079,
      text: "7. expert.",
    },

    {
      start: 28.799,
      end: 30.959,
      text: "8. action figure.",
    },

    {
      start: 31.819,
      end: 33.679,
      text: "9. generous.",
    },

    {
      start: 34.579,
      end: 36.459,
      text: "10. doll.",
    },

    {
      start: 37.399,
      end: 39.34,
      text: "11. trade.",
    },

    {
      start: 40.2,
      end: 42.139,
      text: "12. made it.",
    },

    {
      start: 43.159,
      end: 45.539,
      text: "13. half price.",
    },

    {
      start: 46.419,
      end: 48.84,
      text: "14. take advantage of.",
    },

    {
      start: 49.739,
      end: 51.759,
      text: "15. in a row.",
    },

    {
      start: 52.84,
      end: 55.019,
      text: "16. shall we?",
    },

    {
      start: 55.959,
      end: 59.899,
      text: "17. try out (verb).",
    },
  ];

  const wordTimingsVoc = [
    { start: 8.399, end: 10.099 },
    { start: 10.8, end: 12.5 },
    { start: 13.46, end: 15.139 },
    { start: 16.1, end: 19.279 },
    { start: 20.279, end: 22.02 },

    { start: 23.119, end: 25.159 },
    { start: 26.199, end: 28.079 },
    { start: 28.799, end: 30.959 },
    { start: 31.819, end: 33.679 },
    { start: 34.579, end: 36.459 },

    { start: 37.399, end: 39.34 },
    { start: 40.2, end: 42.139 },
    { start: 43.159, end: 45.539 },
    { start: 46.419, end: 48.84 },
    { start: 49.739, end: 51.759 },

    { start: 52.84, end: 55.019 },
    { start: 55.959, end: 59.899 },
  ];
  return (
    <div
      className="poster-wrapper"
      style={{ backgroundImage: `url(${page_12})` }}
    >
      <div
        className="headset-icon-CD-page2-p hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "html",
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Vocabulary
                  title="VOCABULARY"
                  subtitle="Listen and repeat. Find the words and expressions in the conversation above."
                  sound={VocabularAudio}
                  captions={captionVoc}
                  stopAtSecond={8}
                  sounds={sounds}
                  wordTimings={wordTimingsVoc}
                  words={[
                    "attractions",
                    "discount",
                    "booth",
                    "shoot (a basketball)",
                    "bowling",
                    "(a) bunch",
                    "expert",
                    "action figure",
                    "generous",
                    "doll",
                    "trade",
                    "made it",
                    "half price",
                    "take advantage of",
                    "in a row",
                    "shall we?",
                    "try out (verb)",
                  ]}
                />
              </div>,
            )
          }
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={audioBtn}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div>
    </div>
  );
};

export default Posters_Page12;
