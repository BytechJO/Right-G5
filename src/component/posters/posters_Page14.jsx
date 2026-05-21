import React from "react";
import page_14 from "../../assets/imgs/pages/posters/G5 Poster_Page_14.png";
import VocabularAudio from "../../assets/audio/ClassBook/U7/PG 58/cd32pg58-vocab.mp3";
import sound1 from "../../assets/audio/ClassBook/U7/PG 58/sound1.mp3";
import sound2 from "../../assets/audio/ClassBook/U7/PG 58/sound2.mp3";
import sound3 from "../../assets/audio/ClassBook/U7/PG 58/sound3.mp3";
import sound4 from "../../assets/audio/ClassBook/U7/PG 58/sound4.mp3";
import sound5 from "../../assets/audio/ClassBook/U7/PG 58/sound5.mp3";
import sound6 from "../../assets/audio/ClassBook/U7/PG 58/sound6.mp3";
import sound7 from "../../assets/audio/ClassBook/U7/PG 58/sound7.mp3";
import sound8 from "../../assets/audio/ClassBook/U7/PG 58/sound8.mp3";
import sound9 from "../../assets/audio/ClassBook/U7/PG 58/sound9.mp3";
import sound10 from "../../assets/audio/ClassBook/U7/PG 58/sound10.mp3";
import sound11 from "../../assets/audio/ClassBook/U7/PG 58/sound11.mp3";
import sound12 from "../../assets/audio/ClassBook/U7/PG 58/sound12.mp3";
import sound13 from "../../assets/audio/ClassBook/U7/PG 58/sound13.mp3";
import sound14 from "../../assets/audio/ClassBook/U7/PG 58/sound14.mp3";
import sound15 from "../../assets/audio/ClassBook/U7/PG 58/sound15.mp3";
import sound16 from "../../assets/audio/ClassBook/U7/PG 58/sound16.mp3";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import Vocabulary from "../Vocabulary";

const Posters_Page14 = ({ openPopup }) => {
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
      start: 0.379,
      end: 4.579,
      text: "Page 58, unit seven, vocabulary. Listen and repeat.",
    },

    {
      start: 5.0,
      end: 7.919,
      text: "Find the words and expressions in the conversation above.",
    },

    {
      start: 8.399,
      end: 10.039,
      text: "1. limping.",
    },

    {
      start: 10.939,
      end: 12.619,
      text: "2. stiff.",
    },

    {
      start: 13.819,
      end: 15.559,
      text: "3. oddly.",
    },

    {
      start: 16.52,
      end: 18.44,
      text: "4. albums.",
    },

    {
      start: 19.299,
      end: 21.119,
      text: "5. super.",
    },

    {
      start: 22.139,
      end: 25.359,
      text: "6. treasure (treasuring)",
    },

    {
      start: 26.459,
      end: 29.379,
      text: "7. miss (verb).",
    },

    {
      start: 30.399,
      end: 32.179,
      text: "8. orphanage.",
    },

    {
      start: 33.0,
      end: 34.859,
      text: "9. jotting down.",
    },

    {
      start: 35.779,
      end: 37.679,
      text: "10. wonderful.",
    },

    {
      start: 38.379,
      end: 41.279,
      text: "11. where do you want me to start?",
    },

    {
      start: 42.239,
      end: 44.539,
      text: "12. make yourself at home.",
    },

    {
      start: 45.5,
      end: 47.619,
      text: "13. of course.",
    },

    {
      start: 48.619,
      end: 50.759,
      text: "14. deal with it.",
    },

    {
      start: 51.68,
      end: 53.739,
      text: "15. keeping busy.",
    },

    {
      start: 54.819,
      end: 57.88,
      text: "16. at the top of my list.",
    },
  ];

  const wordTimingsVoc = [
    { start: 8.399, end: 10.039 },
    { start: 10.939, end: 12.619 },
    { start: 13.819, end: 15.559 },
    { start: 16.52, end: 18.44 },
    { start: 19.299, end: 21.119 },

    { start: 22.139, end: 25.359 },
    { start: 26.459, end: 29.379 },
    { start: 30.399, end: 32.179 },
    { start: 33.0, end: 34.859 },
    { start: 35.779, end: 37.679 },

    { start: 38.379, end: 41.279 },
    { start: 42.239, end: 44.539 },
    { start: 45.5, end: 47.619 },
    { start: 48.619, end: 50.759 },
    { start: 51.68, end: 53.739 },

    { start: 54.819, end: 57.88 },
  ];
  return (
    <div
      className="poster-wrapper"
      style={{ backgroundImage: `url(${page_14})` }}
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
                    "limping",
                    "stiff",
                    "oddly",
                    "albums",
                    "super",
                    "treasure (treasuring)",
                    "miss (verb)",
                    "orphanage",
                    "jotting down",
                    "wonderful",
                    "where do you want me to start?",
                    "make yourself at home",
                    "of course",
                    "deal with it",
                    "keeping busy",
                    "at the top of my list",
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

export default Posters_Page14;
