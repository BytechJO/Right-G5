import React from "react";
import page_8 from "../../assets/imgs/pages/posters/G5 Poster_Page_08.png";
import VocabularAudio from "../../assets/audio/ClassBook/U4/PG 28/cd17pg28-vocab.mp3";
import sound1 from "../../assets/audio/ClassBook/U4/PG 28/sound1.mp3";
import sound2 from "../../assets/audio/ClassBook/U4/PG 28/sound2.mp3";
import sound3 from "../../assets/audio/ClassBook/U4/PG 28/sound3.mp3";
import sound4 from "../../assets/audio/ClassBook/U4/PG 28/sound4.mp3";
import sound5 from "../../assets/audio/ClassBook/U4/PG 28/sound5.mp3";
import sound6 from "../../assets/audio/ClassBook/U4/PG 28/sound6.mp3";
import sound7 from "../../assets/audio/ClassBook/U4/PG 28/sound7.mp3";
import sound8 from "../../assets/audio/ClassBook/U4/PG 28/sound8.mp3";
import sound9 from "../../assets/audio/ClassBook/U4/PG 28/sound9.mp3";
import sound10 from "../../assets/audio/ClassBook/U4/PG 28/sound10.mp3";
import sound11 from "../../assets/audio/ClassBook/U4/PG 28/sound11.mp3";
import sound12 from "../../assets/audio/ClassBook/U4/PG 28/sound12.mp3";
import sound13 from "../../assets/audio/ClassBook/U4/PG 28/sound13.mp3";
import sound14 from "../../assets/audio/ClassBook/U4/PG 28/sound14.mp3";
import audioBtn from "../../assets/Page 01/Audio btn.svg";

import Vocabulary from "../Vocabulary";
const Posters_Page8 = ({ openPopup }) => {
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
  ];
  const captionVoc = [
    {
      start: 0.479,
      end: 8.22,
      text: "Page 28, Unit 4, Vocabulary. Listen and repeat. Find the words and expressions in the conversation above.",
    },

    { start: 9.399, end: 11.199, text: "1. grocery store." },
    { start: 11.96, end: 13.96, text: "2. clothes store." },
    { start: 14.92, end: 16.899, text: "3. jeans." },
    { start: 17.84, end: 19.719, text: "4. arcade." },

    { start: 20.739, end: 22.779, text: "5. bookstore." },
    { start: 23.68, end: 25.5, text: "6. boots." },
    { start: 26.379, end: 28.519, text: "7. electronics." },
    { start: 29.399, end: 31.399, text: "8. food court." },

    { start: 32.119, end: 35.059, text: "9. check out (verb)." },
    { start: 35.7, end: 37.579, text: "10. not me." },
    { start: 38.439, end: 40.54, text: "11. head over." },

    { start: 41.439, end: 43.319, text: "12. wait a minute." },
    { start: 44.219, end: 46.399, text: "13. split up." },
    { start: 47.239, end: 49.2, text: "14. straight ahead." },
  ];

  const wordTimingsVoc = [
    { start: 9.399, end: 11.199 },
    { start: 11.96, end: 13.96 },
    { start: 14.92, end: 16.899 },
    { start: 17.84, end: 19.719 },

    { start: 20.739, end: 22.779 },
    { start: 23.68, end: 25.5 },
    { start: 26.379, end: 28.519 },
    { start: 29.399, end: 31.399 },

    { start: 32.119, end: 35.059 },
    { start: 35.7, end: 37.579 },
    { start: 38.439, end: 40.54 },

    { start: 41.439, end: 43.319 },
    { start: 44.219, end: 46.399 },
    { start: 47.239, end: 49.2 },
  ];
  return (
    <div
      className="poster-wrapper"
      style={{ backgroundImage: `url(${page_8})` }}
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
                  stopAtSecond={8.5}
                  sounds={sounds}
                  wordTimings={wordTimingsVoc}
                  words={[
                    "grocery store",
                    "clothes store",
                    "jeans",
                    "arcade",
                    "bookstore",
                    "boots",
                    "electronics",
                    "food court",
                    "check out (verb)",
                    "not me",
                    "head over",
                    "wait a minute",
                    "split up",
                    "straight ahead",
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

export default Posters_Page8;
