import React from "react";
import page_1 from "../../assets/imgs/pages/posters/G5 Poster_Page_02.png";
import sound1 from "../../assets/audio/ClassBook/U1/PG 4/sound1.mp3";
import sound2 from "../../assets/audio/ClassBook/U1/PG 4/sound2.mp3";
import sound3 from "../../assets/audio/ClassBook/U1/PG 4/sound3.mp3";
import sound4 from "../../assets/audio/ClassBook/U1/PG 4/sound4.mp3";
import sound5 from "../../assets/audio/ClassBook/U1/PG 4/sound5.mp3";
import sound6 from "../../assets/audio/ClassBook/U1/PG 4/sound6.mp3";
import sound7 from "../../assets/audio/ClassBook/U1/PG 4/sound7.mp3";
import sound8 from "../../assets/audio/ClassBook/U1/PG 4/sound8.mp3";
import sound9 from "../../assets/audio/ClassBook/U1/PG 4/sound9.mp3";
import sound10 from "../../assets/audio/ClassBook/U1/PG 4/sound10.mp3";
import sound11 from "../../assets/audio/ClassBook/U1/PG 4/sound11.mp3";
import sound12 from "../../assets/audio/ClassBook/U1/PG 4/sound12.mp3";
import sound13 from "../../assets/audio/ClassBook/U1/PG 4/sound13.mp3";
import sound14 from "../../assets/audio/ClassBook/U1/PG 4/sound14.mp3";
import sound15 from "../../assets/audio/ClassBook/U1/PG 4/sound15.mp3";
import sound16 from "../../assets/audio/ClassBook/U1/PG 4/sound16.mp3";
import VocabularAudio from "../../assets/audio/ClassBook/U1/PG 4/vocab.mp3";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import Vocabulary from "../Vocabulary";

const Posters_Page2 = ({ openPopup }) => {
  const captionVoc = [
    {
      start: 0.159,
      end: 8.5,
      text: "Page four, unit one vocabulary. Listen and repeat. Find the words and expressions in the conversation above.",
    },

    { start: 8.8, end: 11.1, text: "1. alarm." },
    { start: 11.2, end: 13.6, text: "2. notebook." },
    { start: 13.94, end: 15.5, text: "3. pillow." },
    { start: 16.4, end: 17.6, text: "4. counting." },

    { start: 19.04, end: 20.26, text: "5. face." },
    { start: 21.6, end: 22.94, text: "6. figure." },
    { start: 24.2, end: 25.38, text: "7. reviewing." },
    { start: 26.8, end: 28.64, text: "8. pancakes." },

    { start: 29.719, end: 31.5, text: "9. starving." },
    { start: 32.32, end: 34.18, text: "10. actually." },
    { start: 35.06, end: 37.06, text: "11. mirror." },

    { start: 37.719, end: 39.579, text: "12. uh-oh." },
    { start: 40.36, end: 42.499, text: "13. fell asleep." },
    { start: 43.279, end: 45.459, text: "14. how did you know?" },

    { start: 46.259, end: 48.459, text: "15. right away." },
    { start: 49.52, end: 52.119, text: "16. on one side." },
  ];
  const wordTimingsVoc = [
    { start: 8.8, end: 11.1 },
    { start: 11.2, end: 13.6 },
    { start: 13.94, end: 15.5 },
    { start: 16.4, end: 17.6 },

    { start: 19.04, end: 20.26 },
    { start: 21.6, end: 22.94 },
    { start: 24.2, end: 25.38 },
    { start: 26.8, end: 28.64 },

    { start: 29.719, end: 31.5 },
    { start: 32.32, end: 34.18 },
    { start: 35.06, end: 37.06 },
    { start: 37.719, end: 39.579 },
    { start: 40.36, end: 42.499 },
    { start: 43.279, end: 45.459 },

    { start: 46.259, end: 48.459 },
    { start: 49.52, end: 52.119 },
  ];
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
  return (
    <div
      className="poster-wrapper"
      style={{ backgroundImage: `url(${page_1})` }}
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
                    "alarm",
                    "notebook",
                    "pillow",
                    "counting",
                    "face",
                    "figure",
                    "reviewing",
                    "pancakes",
                    "starving",
                    "actually",
                    "mirror",
                    "Uh-oh!",
                    "fell asleep",
                    "How did you know?",
                    "right away",
                    "on one side",
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

export default Posters_Page2;
