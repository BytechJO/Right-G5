import React from "react";
import page_1 from "../../assets/imgs/pages/posters/G5 Poster_Page_06.png";
import VocabularAudio from "../../assets/audio/ClassBook/U3/PG 22/vocab.mp3";
import sound1 from "../../assets/audio/ClassBook/U3/PG 22/sound1.mp3";
import sound2 from "../../assets/audio/ClassBook/U3/PG 22/sound2.mp3";
import sound3 from "../../assets/audio/ClassBook/U3/PG 22/sound3.mp3";
import sound4 from "../../assets/audio/ClassBook/U3/PG 22/sound4.mp3";
import sound5 from "../../assets/audio/ClassBook/U3/PG 22/sound5.mp3";
import sound6 from "../../assets/audio/ClassBook/U3/PG 22/sound6.mp3";
import sound7 from "../../assets/audio/ClassBook/U3/PG 22/sound7.mp3";
import sound8 from "../../assets/audio/ClassBook/U3/PG 22/sound8.mp3";
import sound9 from "../../assets/audio/ClassBook/U3/PG 22/sound9.mp3";
import sound10 from "../../assets/audio/ClassBook/U3/PG 22/sound10.mp3";
import sound11 from "../../assets/audio/ClassBook/U3/PG 22/sound11.mp3";
import sound12 from "../../assets/audio/ClassBook/U3/PG 22/sound12.mp3";
import sound13 from "../../assets/audio/ClassBook/U3/PG 22/sound13.mp3";
import sound14 from "../../assets/audio/ClassBook/U3/PG 22/sound14.mp3";
import sound15 from "../../assets/audio/ClassBook/U3/PG 22/sound15.mp3";
import sound16 from "../../assets/audio/ClassBook/U3/PG 22/sound16.mp3";
import sound17 from "../../assets/audio/ClassBook/U3/PG 22/sound17.mp3";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import Vocabulary from "../Vocabulary";

const Posters_Page6 = ({ openPopup }) => {
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
      start: 0.14,
      end: 8.079,
      text: "Page 22, Unit 3, Vocabulary. Listen and repeat. Find the words and expressions in the conversation above.",
    },

    { start: 9.099, end: 10.599, text: "1. curry." },
    { start: 11.479, end: 13.199, text: "2. fridge." },
    { start: 14.079, end: 15.979, text: "3. cupboards." },
    { start: 16.879, end: 19.239, text: "4. rye bread." },

    { start: 20.219, end: 22.079, text: "5. tasty." },
    { start: 23.079, end: 25.079, text: "6. sardines." },
    { start: 26.0, end: 27.819, text: "7. salty." },
    { start: 28.68, end: 30.639, text: "8. peanut butter." },

    { start: 31.5, end: 33.579, text: "9. marshmallows." },
    { start: 34.34, end: 36.059, text: "10. yummy." },
    { start: 37.059, end: 39.18, text: "11. try some." },

    { start: 40.2, end: 42.18, text: "12. no way." },
    { start: 43.139, end: 45.539, text: "13. tastes funny." },
    { start: 46.539, end: 48.599, text: "14. help yourself." },
    { start: 49.52, end: 51.399, text: "15. really?" },

    { start: 52.459, end: 55.379, text: "16. that doesn't sound good." },

    { start: 56.419, end: 58.36, text: "17. top off." },
  ];
  const wordTimingsVoc = [
    { start: 9.099, end: 10.599 }, // curry
    { start: 11.479, end: 13.199 }, // fridge
    { start: 14.079, end: 15.979 }, // cupboards
    { start: 16.879, end: 19.239 }, // rye bread

    { start: 20.219, end: 22.079 }, // tasty
    { start: 23.079, end: 25.079 }, // sardines
    { start: 26.0, end: 27.819 }, // salty
    { start: 28.68, end: 30.639 }, // peanut butter

    { start: 31.5, end: 33.579 }, // marshmallows
    { start: 34.34, end: 36.059 }, // yummy
    { start: 37.059, end: 39.18 }, // try some

    { start: 40.2, end: 42.18 }, // no way
    { start: 43.139, end: 45.539 }, // tastes funny
    { start: 46.539, end: 48.599 }, // help yourself
    { start: 49.52, end: 51.399 }, // really

    { start: 52.459, end: 55.379 }, // that doesn't sound good
    { start: 56.419, end: 58.36 }, // top off
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
                    "curry",
                    "fridge",
                    "cupboards",
                    "rye bread",
                    "tasty",
                    "sardines",
                    "salty",
                    "peanut butter",
                    "marshmallows",
                    "yummy",
                    "try some",
                    "no way",
                    "tastes funny",
                    "help yourself",
                    "really",
                    "that doesn't sound good",
                    "top off",
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

export default Posters_Page6;
