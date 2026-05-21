import React from "react";
import page_1 from "../../assets/imgs/pages/posters/G5 Poster_Page_04.png";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import VocabularAudio from "../../assets/audio/ClassBook/U2/PG 10/vocab_U2.mp3";
import sound1 from "../../assets/audio/ClassBook/U2/PG 10/sound1.mp3";
import sound2 from "../../assets/audio/ClassBook/U2/PG 10/sound2.mp3";
import sound3 from "../../assets/audio/ClassBook/U2/PG 10/sound3.mp3";
import sound4 from "../../assets/audio/ClassBook/U2/PG 10/sound4.mp3";
import sound5 from "../../assets/audio/ClassBook/U2/PG 10/sound5.mp3";
import sound6 from "../../assets/audio/ClassBook/U2/PG 10/sound6.mp3";
import sound7 from "../../assets/audio/ClassBook/U2/PG 10/sound7.mp3";
import sound8 from "../../assets/audio/ClassBook/U2/PG 10/sound8.mp3";
import sound9 from "../../assets/audio/ClassBook/U2/PG 10/sound9.mp3";
import sound10 from "../../assets/audio/ClassBook/U2/PG 10/sound10.mp3";
import sound11 from "../../assets/audio/ClassBook/U2/PG 10/sound11.mp3";
import sound12 from "../../assets/audio/ClassBook/U2/PG 10/sound12.mp3";
import sound13 from "../../assets/audio/ClassBook/U2/PG 10/sound13.mp3";
import sound14 from "../../assets/audio/ClassBook/U2/PG 10/sound14.mp3";
import sound15 from "../../assets/audio/ClassBook/U2/PG 10/sound15.mp3";
import sound16 from "../../assets/audio/ClassBook/U2/PG 10/sound16.mp3";
import Vocabulary from "../Vocabulary";
const Posters_Page4 = ({ openPopup }) => {
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
      start: 0.099,
      end: 7.58,
      text: "Page 10, Unit 2, Vocabulary. Listen and repeat. Find the words and expressions in the conversation above.",
    },

    { start: 8.679, end: 11.019, text: "1. carnival." },
    { start: 11.019, end: 13.579, text: "2. trims." },
    { start: 13.579, end: 16.319, text: "3. crazy." },
    { start: 16.319, end: 19.059, text: "4. twisty." },

    { start: 19.059, end: 21.619, text: "5. couple." },
    { start: 21.619, end: 24.439, text: "6. merry-go-round." },
    { start: 24.439, end: 27.099, text: "7. still." },
    { start: 27.099, end: 29.639, text: "8. bag." },

    { start: 29.639, end: 32.599, text: "9. a few." },
    { start: 32.599, end: 34.779, text: "10. giraffe." },
    { start: 34.779, end: 37.879, text: "11. not so fast." },

    { start: 37.879, end: 40.779, text: "12. let's see." },
    { start: 40.779, end: 44.159, text: "13. first thing." },
    { start: 44.159, end: 47.419, text: "14. stays behind." },

    { start: 47.419, end: 51.18, text: "15. keep my feet on the ground." },
    { start: 51.18, end: 53.419, text: "16. works out." },
  ];
  const wordTimingsVoc = [
    { start: 8.679, end: 11.019 },
    { start: 11.019, end: 13.579 },
    { start: 13.579, end: 16.319 },
    { start: 16.319, end: 19.059 },

    { start: 19.059, end: 21.619 },
    { start: 21.619, end: 24.439 },
    { start: 24.439, end: 27.099 },
    { start: 27.099, end: 29.639 },

    { start: 29.639, end: 32.599 },
    { start: 32.599, end: 34.779 },
    { start: 34.779, end: 37.879 },

    { start: 37.879, end: 40.779 },
    { start: 40.779, end: 44.159 },
    { start: 44.159, end: 47.419 },

    { start: 47.419, end: 51.18 },
    { start: 51.18, end: 53.419 },
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
                    "carnival",
                    "trims",
                    "crazy",
                    "twisty",
                    "couple",
                    "merry-go-round",
                    "still",
                    "bag",
                    "(a) few",
                    "giraffe",
                    "not so fast",
                    "let's see",
                    "first thing",
                    "stays behind",
                    "keep my feet on the ground",
                    "works out",
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

export default Posters_Page4;
