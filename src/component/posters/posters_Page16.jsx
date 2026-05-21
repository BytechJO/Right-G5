import React from "react";
import page_16 from "../../assets/imgs/pages/posters/G5 Poster_Page_16.png";
import VocabularAudio from "../../assets/audio/ClassBook/U8/PG 64/cd37pg64-vocab.mp3";
import sound1 from "../../assets/audio/ClassBook/U8/PG 64/sound1.mp3";
import sound2 from "../../assets/audio/ClassBook/U8/PG 64/sound2.mp3";
import sound3 from "../../assets/audio/ClassBook/U8/PG 64/sound3.mp3";
import sound4 from "../../assets/audio/ClassBook/U8/PG 64/sound4.mp3";
import sound5 from "../../assets/audio/ClassBook/U8/PG 64/sound5.mp3";
import sound6 from "../../assets/audio/ClassBook/U8/PG 64/sound6.mp3";
import sound7 from "../../assets/audio/ClassBook/U8/PG 64/sound7.mp3";
import sound8 from "../../assets/audio/ClassBook/U8/PG 64/sound8.mp3";
import sound9 from "../../assets/audio/ClassBook/U8/PG 64/sound9.mp3";
import sound10 from "../../assets/audio/ClassBook/U8/PG 64/sound10.mp3";
import sound11 from "../../assets/audio/ClassBook/U8/PG 64/sound11.mp3";
import sound12 from "../../assets/audio/ClassBook/U8/PG 64/sound12.mp3";
import sound13 from "../../assets/audio/ClassBook/U8/PG 64/sound13.mp3";
import sound14 from "../../assets/audio/ClassBook/U8/PG 64/sound14.mp3";
import sound15 from "../../assets/audio/ClassBook/U8/PG 64/sound15.mp3";
import sound16 from "../../assets/audio/ClassBook/U8/PG 64/sound16.mp3";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import Vocabulary from "../Vocabulary";

const Posters_Page16 = ({ openPopup }) => {
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
  ];
  const captionVoc = [
    {
      start: 0.399,
      end: 4.94,
      text: "Page 64, unit eight, vocabulary. Listen and repeat.",
    },

    {
      start: 5.46,
      end: 8.119,
      text: "Find the words and expressions in the conversation above.",
    },

    {
      start: 8.92,
      end: 10.939,
      text: "1. hot air balloon.",
    },

    {
      start: 11.759,
      end: 13.639,
      text: "2. rainbow.",
    },

    {
      start: 14.659,
      end: 16.819,
      text: "3. volunteer.",
    },

    {
      start: 17.76,
      end: 19.379,
      text: "4. doubt.",
    },

    {
      start: 20.399,
      end: 22.379,
      text: "5. landscape.",
    },

    {
      start: 23.359,
      end: 25.359,
      text: "6. recognize.",
    },

    {
      start: 26.239,
      end: 28.019,
      text: "7. pilot.",
    },

    {
      start: 28.939,
      end: 30.739,
      text: "8. crowded.",
    },

    {
      start: 31.699,
      end: 33.539,
      text: "9. lean.",
    },

    {
      start: 34.239,
      end: 36.699,
      text: "10. be shocked.",
    },

    {
      start: 37.559,
      end: 40.079,
      text: "11. looks like ants.",
    },

    {
      start: 41.04,
      end: 43.519,
      text: "12. top of the world.",
    },

    {
      start: 44.399,
      end: 46.699,
      text: "13. fly over.",
    },

    {
      start: 47.759,
      end: 50.619,
      text: "14. her second home.",
    },

    {
      start: 51.52,
      end: 53.699,
      text: "15. board games.",
    },

    {
      start: 54.639,
      end: 57.68,
      text: "16. spot (noun).",
    },
  ];

  const wordTimingsVoc = [
    { start: 8.92, end: 10.939 },
    { start: 11.759, end: 13.639 },
    { start: 14.659, end: 16.819 },
    { start: 17.76, end: 19.379 },
    { start: 20.399, end: 22.379 },

    { start: 23.359, end: 25.359 },
    { start: 26.239, end: 28.019 },
    { start: 28.939, end: 30.739 },
    { start: 31.699, end: 33.539 },
    { start: 34.239, end: 36.699 },

    { start: 37.559, end: 40.079 },
    { start: 41.04, end: 43.519 },
    { start: 44.399, end: 46.699 },
    { start: 47.759, end: 50.619 },
    { start: 51.52, end: 53.699 },

    { start: 54.639, end: 57.68 },
  ];

  return (
    <div
      className="poster-wrapper"
      style={{ backgroundImage: `url(${page_16})` }}
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
                  stopAtSecond={8.3}
                  sounds={sounds}
                  wordTimings={wordTimingsVoc}
                  words={[
                    "hot air balloon",
                    "rainbow",
                    "volunteer",
                    "doubt",
                    "landscape",
                    "recognize",
                    "pilot",
                    "crowded",
                    "lean",
                    "(be) shocked",
                    "looks like ants",
                    "top of the world",
                    "fly over",
                    "(her) second home",
                    "board games",
                    "spot (noun)",
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

export default Posters_Page16;
