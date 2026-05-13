import page_1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 40.png";
import "./Unit5_Page1.css";
import longAudio from "../../../assets/audio/ClassBook/U5/PG 40/cd21pg40-conversation.mp3";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import Conversation from "../../Conversation";
import Vocabulary from "../../Vocabulary";
import VocabularAudio from "../../../assets/audio/ClassBook/U5/PG 40/cd22pg40-vocab.mp3";
import sound1 from "../../../assets/audio/ClassBook/U5/PG 40/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/U5/PG 40/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/U5/PG 40/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/U5/PG 40/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/U5/PG 40/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/U5/PG 40/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/U5/PG 40/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/U5/PG 40/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/U5/PG 40/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/U5/PG 40/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/U5/PG 40/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/U5/PG 40/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/U5/PG 40/sound13.mp3";
import sound14 from "../../../assets/audio/ClassBook/U5/PG 40/sound14.mp3";
import sound15 from "../../../assets/audio/ClassBook/U5/PG 40/sound15.mp3";
import sound16 from "../../../assets/audio/ClassBook/U5/PG 40/sound16.mp3";
import sound17 from "../../../assets/audio/ClassBook/U5/PG 40/sound17.mp3";
import sound18 from "../../../assets/audio/ClassBook/U5/PG 40/sound18.mp3";
import sound19 from "../../../assets/audio/ClassBook/U5/PG 40/sound19.mp3";
import CriticalThinking from "../../CriticalThinking";
import imgConversation1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 40/SVG/23.svg";
import imgConversation2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 40/SVG/24.svg";
import imgConversation3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 40/SVG/25.svg";
import imgConversation4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 40/SVG/Asset 8.svg";
import wordJson from "../../../assets/json/cd21pg40-conversation_eng.json";
import video from "../../../assets/videos/grade 5 unit 5 page 40.mp4";

const Unit5_Page1 = ({ openPopup }) => {
  // ==================== conversation data ==================== //
  const data = [
    {
      number: 1,
      image: imgConversation1,
      dialogues: [
        {
          speaker: "Librarian",
          text: "Good afternoon! How can I help you both today?",
        },
        {
          speaker: "Tom",
          text: "I’d like to read some books about sharks. I have to write a report about them and give a presentation in front of the class.",
        },
        {
          speaker: "Librarian",
          text: "Okay, and how about you? What would you like to read?",
        },
        {
          speaker: "Harley",
          text: "I’m actually looking for some recipe books about Mediterranean food. Do you have anything available?",
        },
      ],
    },
    {
      number: 2,
      image: imgConversation2,
      dialogues: [
        {
          speaker: "Librarian",
          text: "Yes, I do. I have great books for you. Follow me, and I’ll show you what I have in mind.",
        },
        {
          speaker: "Harley",
          text: "Thanks very much!",
        },
        {
          speaker: "Tom",
          text: "Thanks for your help.",
        },
      ],
    },
    {
      number: 3,
      image: imgConversation3,
      dialogues: [
        {
          speaker: "Librarian",
          text: "Would you like big picture books about sharks or books with more information?",
        },
        {
          speaker: "Tom",
          text: "I would actually prefer to look at both. I think it would really be great to include pictures in my presentation.",
        },
      ],
    },
    {
      number: 4,
      image: imgConversation4,
      dialogues: [
        {
          speaker: "Librarian",
          text: "Here you go! I hope these help with your assignment.",
        },
        {
          speaker: "Tom",
          text: "Thanks! These look great.",
        },
        {
          speaker: "Librarian",
          text: "I have five recipe books on Mediterranean food, but I think you should start off with these two books as they are the best.",
        },
        {
          speaker: "Harley",
          text: "Thanks for all your help. I can’t wait till I find a shish kebab recipe. I plan to do a barbecue for the entire family.",
        },
        {
          speaker: "Librarian",
          text: "Good luck to you both!",
        },
      ],
    },
  ];
  const captionsExample = [
    {
      start: 0.239,
      end: 5.5,
      text: "Page 40, Conversation. Listen and read, then say",
    },
    {
      start: 6.54,
      end: 10.48,
      text: "Good afternoon! How can I help you both today?",
    },
    {
      start: 10.479,
      end: 17.779,
      text: "I’d like to read some books about sharks. I have to write a report about them and give a presentation in front of the class.",
    },
    {
      start: 17.779,
      end: 21.399,
      text: "Okay, and how about you? What would you like to read?",
    },
    {
      start: 21.399,
      end: 28.259,
      text: "I’m actually looking for some recipe books about Mediterranean food. Do you have anything available?",
    },
    {
      start: 28.26,
      end: 31.439,
      text: "Yes, I do. I have great books for you.",
    },
    {
      start: 31.439,
      end: 33.259,
      text: "Thanks very much!",
    },
    {
      start: 33.259,
      end: 34.679,
      text: "Thanks for your help.",
    },
    {
      start: 34.68,
      end: 39.459,
      text: "Would you like big picture books about sharks or books with more information?",
    },
    {
      start: 39.459,
      end: 46.52,
      text: "I would actually prefer to look at both. I think it would really be great to include pictures in my presentation.",
    },
    {
      start: 46.52,
      end: 50.259,
      text: "Here you go! I hope these help with your assignment.",
    },
    {
      start: 50.259,
      end: 52.039,
      text: "Thanks! These look great.",
    },
    {
      start: 53.119,
      end: 59.879,
      text: "I have five recipe books on Mediterranean food, but I think you should start off with these two books as they are the best.",
    },
    {
      start: 59.879,
      end: 69.019,
      text: "Thanks for all your help. I can’t wait till I find a shish kebab recipe. I plan to do a barbecue for the entire family.",
    },
    {
      start: 69.019,
      end: 70.019,
      text: "Good luck to you both!",
    },
  ];
  const captionTimings = [
    [
      captionsExample[1],
      captionsExample[2],
      captionsExample[3],
      captionsExample[4],
    ],

    [captionsExample[5], captionsExample[6], captionsExample[7]],

    [captionsExample[8], captionsExample[9]],

    [
      captionsExample[10],
      captionsExample[11],
      captionsExample[12],
      captionsExample[13],
      captionsExample[14],
    ],
  ];
  const filteredSegments = wordJson.segments.slice(1);

  const Voc = [
    [
      filteredSegments[0]?.words || [],
      filteredSegments[1]?.words || [],
      filteredSegments[2]?.words || [],
      filteredSegments[3]?.words || [],
    ],

    [
      filteredSegments[4]?.words || [],
      filteredSegments[5]?.words || [],
      filteredSegments[6]?.words || [],
    ],

    [filteredSegments[7]?.words || [], filteredSegments[8]?.words || []],

    [
      filteredSegments[9]?.words || [],
      filteredSegments[10]?.words || [],
      filteredSegments[11]?.words || [],
      filteredSegments[12]?.words || [],
      filteredSegments[13]?.words || [],
    ],
  ];
  /////////////////VOCABULARY/////////////////
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
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_1})` }}
    >
      <div
        className="headset-icon-CD-page4-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
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
                <Conversation
                  title="Conversation"
                  items={data}
                  sound={longAudio}
                  captions={captionsExample}
                  stopAtSecond={5.7}
                  captionTimings={captionTimings}
                  wordTimings={Voc}
                  openPopup={openPopup}
                  video={video}
                  imageWidth="270px"
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
      <div
        className="headset-icon-CD-page4-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
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
      <div
        className="headset-icon-CD-page4-3 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() =>
            openPopup(
              "html",
              <CriticalThinking
                title={"Why did Tomneed books about sharks?"}
              />,
            )
          }
          style={{ overflow: "visible" }}
        >
          <image
            className="svg-img"
            href={arrowBtn}
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

export default Unit5_Page1;
