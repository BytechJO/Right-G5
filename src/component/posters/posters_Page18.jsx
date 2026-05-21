import React from "react";
import page_18 from "../../assets/imgs/pages/posters/G5 Poster_Page_18.png";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import VocabularAudio from "../../assets/audio/ClassBook/U9/PG 76/cd42pg76-vocab.mp3";
import sound1 from "../../assets/audio/ClassBook/U9/PG 76/sound1.mp3";
import sound2 from "../../assets/audio/ClassBook/U9/PG 76/sound2.mp3";
import sound3 from "../../assets/audio/ClassBook/U9/PG 76/sound3.mp3";
import sound4 from "../../assets/audio/ClassBook/U9/PG 76/sound4.mp3";
import sound5 from "../../assets/audio/ClassBook/U9/PG 76/sound5.mp3";
import sound6 from "../../assets/audio/ClassBook/U9/PG 76/sound6.mp3";
import sound7 from "../../assets/audio/ClassBook/U9/PG 76/sound7.mp3";
import sound8 from "../../assets/audio/ClassBook/U9/PG 76/sound8.mp3";
import sound9 from "../../assets/audio/ClassBook/U9/PG 76/sound9.mp3";
import sound10 from "../../assets/audio/ClassBook/U9/PG 76/sound10.mp3";
import sound11 from "../../assets/audio/ClassBook/U9/PG 76/sound11.mp3";
import sound12 from "../../assets/audio/ClassBook/U9/PG 76/sound12.mp3";
import sound13 from "../../assets/audio/ClassBook/U9/PG 76/sound13.mp3";
import sound14 from "../../assets/audio/ClassBook/U9/PG 76/sound14.mp3";
import sound15 from "../../assets/audio/ClassBook/U9/PG 76/sound15.mp3";
import sound16 from "../../assets/audio/ClassBook/U9/PG 76/sound16.mp3";
import sound17 from "../../assets/audio/ClassBook/U9/PG 76/sound17.mp3";
import Vocabulary from "../Vocabulary";
const Posters_Page18 = ({ openPopup }) => {
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
      start: 0.179,
      end: 4.039,
      text: "Page 76, unit nine, vocabulary. Listen and repeat.",
    },

    {
      start: 4.4,
      end: 7.139,
      text: "Find the words and expressions in the conversation above.",
    },

    {
      start: 7.98,
      end: 9.46,
      text: "1. club.",
    },

    {
      start: 10.42,
      end: 12.239,
      text: "2. exactly.",
    },

    {
      start: 13.179,
      end: 14.899,
      text: "3. ring.",
    },

    {
      start: 15.96,
      end: 17.76,
      text: "4. appointment.",
    },

    {
      start: 18.619,
      end: 20.419,
      text: "5. braces.",
    },

    {
      start: 21.359,
      end: 23.659,
      text: "6. congratulations.",
    },

    {
      start: 24.68,
      end: 26.599,
      text: "7. stadium.",
    },

    {
      start: 27.439,
      end: 29.139,
      text: "8. rush.",
    },

    {
      start: 30.179,
      end: 32.02,
      text: "9. mowing.",
    },

    {
      start: 34.439,
      end: 35.119,
      text: "10. lawns.",
    },

    {
      start: 35.899,
      end: 37.939,
      text: "11. that'll work.",
    },

    {
      start: 38.84,
      end: 41.759,
      text: "12. join (noun).",
    },

    {
      start: 42.659,
      end: 46.2,
      text: "13. great/good news.",
    },

    {
      start: 47.18,
      end: 49.659,
      text: "14. see how it goes.",
    },

    {
      start: 50.659,
      end: 52.84,
      text: "15. right over.",
    },

    {
      start: 53.879,
      end: 56.86,
      text: "16. get a (noun).",
    },

    {
      start: 57.719,
      end: 60.359,
      text: "17. we'd love to have you.",
    },
  ];

  const wordTimingsVoc = [
    { start: 7.98, end: 9.46 },
    { start: 10.42, end: 12.239 },
    { start: 13.179, end: 14.899 },
    { start: 15.96, end: 17.76 },
    { start: 18.619, end: 20.419 },

    { start: 21.359, end: 23.659 },
    { start: 24.68, end: 26.599 },
    { start: 27.439, end: 29.139 },
    { start: 30.179, end: 32.02 },
    { start: 34.439, end: 35.119 },

    { start: 35.899, end: 37.939 },
    { start: 38.84, end: 41.759 },
    { start: 42.659, end: 46.2 },
    { start: 47.18, end: 49.659 },
    { start: 50.659, end: 52.84 },

    { start: 53.879, end: 56.86 },
    { start: 57.719, end: 60.359 },
  ];
  return (
    <div
      className="poster-wrapper"
      style={{ backgroundImage: `url(${page_18})` }}
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
                  stopAtSecond={7.1}
                  sounds={sounds}
                  wordTimings={wordTimingsVoc}
                  words={[
                    "club",
                    "exactly",
                    "ring",
                    "appointment",
                    "braces",
                    "congratulations",
                    "stadium",
                    "rush",
                    "mowing",
                    "lawns",
                    "that’ll work",
                    "join (noun)",
                    "great/good news",
                    "see how it goes",
                    "right over",
                    "get a (noun)",
                    "we’d love to have you",
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

export default Posters_Page18;
