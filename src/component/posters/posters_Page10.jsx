import React from "react";
import page_10 from "../../assets/imgs/pages/posters/G5 Poster_Page_10.png";
import VocabularAudio from "../../assets/audio/ClassBook/U5/PG 40/cd22pg40-vocab.mp3";
import sound1 from "../../assets/audio/ClassBook/U5/PG 40/sound1.mp3";
import sound2 from "../../assets/audio/ClassBook/U5/PG 40/sound2.mp3";
import sound3 from "../../assets/audio/ClassBook/U5/PG 40/sound3.mp3";
import sound4 from "../../assets/audio/ClassBook/U5/PG 40/sound4.mp3";
import sound5 from "../../assets/audio/ClassBook/U5/PG 40/sound5.mp3";
import sound6 from "../../assets/audio/ClassBook/U5/PG 40/sound6.mp3";
import sound7 from "../../assets/audio/ClassBook/U5/PG 40/sound7.mp3";
import sound8 from "../../assets/audio/ClassBook/U5/PG 40/sound8.mp3";
import sound9 from "../../assets/audio/ClassBook/U5/PG 40/sound9.mp3";
import sound10 from "../../assets/audio/ClassBook/U5/PG 40/sound10.mp3";
import sound11 from "../../assets/audio/ClassBook/U5/PG 40/sound11.mp3";
import sound12 from "../../assets/audio/ClassBook/U5/PG 40/sound12.mp3";
import sound13 from "../../assets/audio/ClassBook/U5/PG 40/sound13.mp3";
import sound14 from "../../assets/audio/ClassBook/U5/PG 40/sound14.mp3";
import sound15 from "../../assets/audio/ClassBook/U5/PG 40/sound15.mp3";
import sound16 from "../../assets/audio/ClassBook/U5/PG 40/sound16.mp3";
import sound17 from "../../assets/audio/ClassBook/U5/PG 40/sound17.mp3";
import sound18 from "../../assets/audio/ClassBook/U5/PG 40/sound18.mp3";
import sound19 from "../../assets/audio/ClassBook/U5/PG 40/sound19.mp3";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import Vocabulary from "../Vocabulary";

const Posters_Page10 = ({ openPopup }) => {
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
    sound18,
    sound19,
  ];
  const captionVoc = [
    {
      start: 0.379,
      end: 4.38,
      text: "Page 40, Unit 5, Vocabulary. Listen and repeat.",
    },

    {
      start: 5.759,
      end: 8.659,
      text: "Find the words and expressions in the conversation above.",
    },

    { start: 9.42, end: 11.039, text: "1. sharks." },
    { start: 11.859, end: 13.579, text: "2. report." },
    { start: 14.519, end: 16.52, text: "3. assignment." },
    { start: 17.26, end: 19.339, text: "4. presentation." },
    { start: 20.26, end: 22.139, text: "5. recipe." },

    { start: 23.18, end: 25.76, text: "6. Mediterranean food." },
    { start: 26.699, end: 28.739, text: "7. information." },
    { start: 29.639, end: 31.519, text: "8. barbecue." },
    { start: 32.419, end: 34.299, text: "9. librarian." },
    { start: 35.139, end: 37.059, text: "10. shish kebab." },
    { start: 37.899, end: 39.639, text: "11. both." },
    { start: 40.54, end: 42.359, text: "12. entire." },

    { start: 43.259, end: 45.639, text: "13. give a presentation." },
    { start: 46.599, end: 49.059, text: "14. what would you like?" },
    {
      start: 50.059,
      end: 53.18,
      text: "15. do you have anything available?",
    },
    { start: 54.139, end: 56.659, text: "16. have in mind." },
    { start: 57.539, end: 59.719, text: "17. here you go." },
    { start: 60.719, end: 62.859, text: "18. start off." },
    {
      start: 63.84,
      end: 66.519,
      text: "19. good luck to you both.",
    },
  ];

  const wordTimingsVoc = [
    { start: 9.42, end: 11.039 },
    { start: 11.859, end: 13.579 },
    { start: 14.519, end: 16.52 },
    { start: 17.26, end: 19.339 },
    { start: 20.26, end: 22.139 },

    { start: 23.18, end: 25.76 },
    { start: 26.699, end: 28.739 },
    { start: 29.639, end: 31.519 },
    { start: 32.419, end: 34.299 },
    { start: 35.139, end: 37.059 },
    { start: 37.899, end: 39.639 },
    { start: 40.54, end: 42.359 },

    { start: 43.259, end: 45.639 },
    { start: 46.599, end: 49.059 },
    { start: 50.059, end: 53.18 },
    { start: 54.139, end: 56.659 },
    { start: 57.539, end: 59.719 },
    { start: 60.719, end: 62.859 },
    { start: 63.84, end: 66.519 },
  ];
  return (
    <div
      className="poster-wrapper"
      style={{ backgroundImage: `url(${page_10})` }}
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
                  stopAtSecond={8.7}
                  sounds={sounds}
                  wordTimings={wordTimingsVoc}
                  words={[
                    "sharks",
                    "report",
                    "assignment",
                    "presentation",
                    "recipe",
                    "Mediterranean food",
                    "information",
                    "barbecue",
                    "librarian",
                    "shish kebab",
                    "both",
                    "entire",
                    "give a presentation",
                    "what would you like?",
                    "do you have anything available?",
                    "have in mind",
                    "here you go!",
                    "start off",
                    "good luck to you both",
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

export default Posters_Page10;
