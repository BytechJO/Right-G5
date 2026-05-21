import React from "react";
import page_20 from "../../assets/imgs/pages/posters/G5 Poster_Page_20.png";
import VocabularAudio from "../../assets/audio/ClassBook/U10/PG 82/cd47pg82-vocab.mp3";
import sound1 from "../../assets/audio/ClassBook/U10/PG 82/sound1.mp3";
import sound2 from "../../assets/audio/ClassBook/U10/PG 82/sound2.mp3";
import sound3 from "../../assets/audio/ClassBook/U10/PG 82/sound3.mp3";
import sound4 from "../../assets/audio/ClassBook/U10/PG 82/sound4.mp3";
import sound5 from "../../assets/audio/ClassBook/U10/PG 82/sound5.mp3";
import sound6 from "../../assets/audio/ClassBook/U10/PG 82/sound6.mp3";
import sound7 from "../../assets/audio/ClassBook/U10/PG 82/sound7.mp3";
import sound8 from "../../assets/audio/ClassBook/U10/PG 82/sound8.mp3";
import sound9 from "../../assets/audio/ClassBook/U10/PG 82/sound9.mp3";
import sound10 from "../../assets/audio/ClassBook/U10/PG 82/sound10.mp3";
import sound11 from "../../assets/audio/ClassBook/U10/PG 82/sound11.mp3";
import sound12 from "../../assets/audio/ClassBook/U10/PG 82/sound12.mp3";
import sound13 from "../../assets/audio/ClassBook/U10/PG 82/sound13.mp3";
import sound14 from "../../assets/audio/ClassBook/U10/PG 82/sound14.mp3";
import sound15 from "../../assets/audio/ClassBook/U10/PG 82/sound15.mp3";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import Vocabulary from "../Vocabulary";

const Posters_Page20 = ({ openPopup }) => {
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
  ];
  const captionVoc = [
    {
      start: 0.239,
      end: 2.879,
      text: "Page 82, unit ten, vocabulary.",
    },

    {
      start: 3.659,
      end: 5.38,
      text: "1. symphony.",
    },

    {
      start: 6.259,
      end: 8.159,
      text: "2. harvesting.",
    },

    {
      start: 9.039,
      end: 10.88,
      text: "3. acres.",
    },

    {
      start: 11.819,
      end: 13.979,
      text: "4. enormous.",
    },

    {
      start: 14.939,
      end: 16.899,
      text: "5. lively.",
    },

    {
      start: 17.959,
      end: 20.139,
      text: "6. composers.",
    },

    {
      start: 21.159,
      end: 23.159,
      text: "7. variety.",
    },

    {
      start: 24.1,
      end: 25.979,
      text: "8. moods.",
    },

    {
      start: 26.92,
      end: 28.879,
      text: "9. flexible.",
    },

    {
      start: 29.879,
      end: 31.859,
      text: "10. instrument.",
    },

    {
      start: 32.84,
      end: 34.899,
      text: "11. appealing.",
    },

    {
      start: 35.759,
      end: 37.399,
      text: "12. ... huh?",
    },

    {
      start: 38.459,
      end: 40.599,
      text: "13. it’s your turn.",
    },

    {
      start: 41.379,
      end: 43.959,
      text: "14. a long way to go.",
    },

    {
      start: 44.819,
      end: 47.24,
      text: "15. that’s a good point!",
    },
  ];

  const wordTimingsVoc = [
    { start: 3.659, end: 5.38 },
    { start: 6.259, end: 8.159 },
    { start: 9.039, end: 10.88 },
    { start: 11.819, end: 13.979 },
    { start: 14.939, end: 16.899 },

    { start: 17.959, end: 20.139 },
    { start: 21.159, end: 23.159 },
    { start: 24.1, end: 25.979 },
    { start: 26.92, end: 28.879 },
    { start: 29.879, end: 31.859 },

    { start: 32.84, end: 34.899 },
    { start: 35.759, end: 37.399 },
    { start: 38.459, end: 40.599 },
    { start: 41.379, end: 43.959 },
    { start: 44.819, end: 47.24 },
  ];
  return (
    <div
      className="poster-wrapper"
      style={{ backgroundImage: `url(${page_20})` }}
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
                  stopAtSecond={3}
                  sounds={sounds}
                  wordTimings={wordTimingsVoc}
                  words={[
                    "symphony",
                    "harvesting",
                    "acres",
                    "enormous",
                    "lively",
                    "composers",
                    "variety",
                    "moods",
                    "flexible",
                    "instrument",
                    "appealing",
                    "... huh?",
                    "it’s your turn",
                    "a long way to go",
                    "that’s a good point!",
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

export default Posters_Page20;
