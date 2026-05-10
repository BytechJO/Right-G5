import page_1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 22.png";
import "./Unit3_Page1.css";
import longAudio from "../../../assets/audio/ClassBook/U3/PG 22/pg22-conversation.mp3";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import Conversation from "../../Conversation";
import Vocabulary from "../../Vocabulary";
import VocabularAudio from "../../../assets/audio/ClassBook/U3/PG 22/vocab.mp3";
import sound1 from "../../../assets/audio/ClassBook/U3/PG 22/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/U3/PG 22/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/U3/PG 22/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/U3/PG 22/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/U3/PG 22/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/U3/PG 22/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/U3/PG 22/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/U3/PG 22/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/U3/PG 22/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/U3/PG 22/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/U3/PG 22/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/U3/PG 22/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/U3/PG 22/sound13.mp3";
import sound14 from "../../../assets/audio/ClassBook/U3/PG 22/sound14.mp3";
import sound15 from "../../../assets/audio/ClassBook/U3/PG 22/sound15.mp3";
import sound16 from "../../../assets/audio/ClassBook/U3/PG 22/sound16.mp3";
import sound17 from "../../../assets/audio/ClassBook/U3/PG 22/sound17.mp3";
import CriticalThinking from "../../CriticalThinking";
import imgConversation1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 22/SVG/Asset 1.svg";
import imgConversation2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 22/SVG/Asset 2.svg";
import imgConversation3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 22/SVG/Asset 22.svg";
import imgConversation4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 22/SVG/Asset 4.svg";
import wordJson from "../../../assets/json/pg22-conversation_eng.json";
import video from "../../../assets/videos/grade 5 unit 3 page 22.mp4";

const Unit3_Page1 = ({ openPopup }) => {
  // ==================== conversation data ==================== //
  const data = [
    {
      number: 1,
      image: imgConversation1,
      dialogues: [
        {
          speaker: "Jack",
          text: "Hi, Sarah! This curry tastes great! Try some!",
        },
        {
          speaker: "Sarah",
          text: "Thanks, Jack, but no way! Curry tastes funny. Can I make a sandwich?",
        },
        {
          speaker: "Jack",
          text: "Sure! Help yourself from the fridge and cupboards.",
        },
      ],
    },
    {
      number: 2,
      image: imgConversation2,

      dialogues: [
        {
          speaker: "Sarah",
          text: "You have rye bread. It is very tasty.",
        },
        {
          speaker: "Jack",
          text: "Rye bread is my favorite.",
        },
        {
          speaker: "Sarah",
          text: "Oh, here is a can of sardines. They are small salty fish. I love them!",
        },
      ],
    },
    {
      number: 3,
      image: imgConversation3,
      dialogues: [
        {
          speaker: "Jack",
          text: "Really! That doesn’t sound good to me.",
        },
        {
          speaker: "Sarah",
          text: "Do you have any peanut butter?",
        },
        {
          speaker: "Jack",
          text: "Yes, there’s some peanut butter in the cupboard.",
        },
      ],
    },
    {
      number: 4,
      image: imgConversation4,

      dialogues: [
        {
          speaker: "Sarah",
          text: "Now, I’ll just top off my sandwich with some marshmallows.",
        },
        {
          speaker: "Jack",
          text: "Are you going to eat that sandwich?",
        },
        {
          speaker: "Sarah",
          text: "You bet! This is delicious. Have some.",
        },
        {
          speaker: "Jack",
          text: "No, thank you. My curry is yummy!",
        },
      ],
    },
  ];
  const captionsExample = [
    {
      start: 0.219,
      end: 5.939,
      text: "Page 22, conversation. Listen and read, then say",
    },
    {
      start: 5.94,
      end: 9.46,
      text: "Hi, Sarah. This curry tastes great. Try some.",
    },
    {
      start: 10.479,
      end: 15.819,
      text: "Thanks, Jack, but no way. Curry tastes funny. Can I make a sandwich?",
    },
    {
      start: 16.94,
      end: 19.499,
      text: "Sure. Help yourself from the fridge and cupboards.",
    },
    {
      start: 20.559,
      end: 23.279,
      text: "You have rye bread. It is very tasty.",
    },
    {
      start: 24.34,
      end: 25.819,
      text: "Rye bread is my favorite.",
    },
    {
      start: 26.859,
      end: 32.52,
      text: "Oh, here's a can of sardines. They are small, salty fish. I love them.",
    },
    {
      start: 33.68,
      end: 36.879,
      text: "Really? That doesn't sound good to me.",
    },
    {
      start: 36.88,
      end: 38.419,
      text: "Do you have any peanut butter?",
    },
    {
      start: 39.479,
      end: 42.239,
      text: "Yes, there's some peanut butter in the cupboard.",
    },
    {
      start: 42.239,
      end: 46.119,
      text: "Now I'll just top off my sandwich with some marshmallows.",
    },
    {
      start: 47.139,
      end: 48.819,
      text: "Are you going to eat that sandwich?",
    },
    {
      start: 50.0,
      end: 53.219,
      text: "You bet. This is delicious. Have some.",
    },
    {
      start: 54.259,
      end: 56.079,
      text: "No, thank you. My curry is yummy.",
    },
  ];
  const captionTimings = [
    [captionsExample[1], captionsExample[2], captionsExample[3]],
    [captionsExample[4], captionsExample[5], captionsExample[6]],
    [captionsExample[7], captionsExample[8], captionsExample[9]],
    [
      captionsExample[10],
      captionsExample[11],
      captionsExample[12],
      captionsExample[13],
    ],
  ];
  const filteredSegments = wordJson.segments.slice(1);

  const Voc = [
    [
      filteredSegments[0]?.words || [],
      filteredSegments[1]?.words || [],
      filteredSegments[2]?.words || [],
    ],
    [
      filteredSegments[3]?.words || [],
      filteredSegments[4]?.words || [],
      filteredSegments[5]?.words || [],
    ],
    [
      filteredSegments[6]?.words || [],
      filteredSegments[7]?.words || [],
      filteredSegments[8]?.words || [],
    ],
    [
      filteredSegments[9]?.words || [],
      filteredSegments[10]?.words || [],
      filteredSegments[11]?.words || [],
      filteredSegments[12]?.words || [],
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
                  stopAtSecond={6}
                  captionTimings={captionTimings}
                  wordTimings={Voc}
                  openPopup={openPopup}
                  video={video}
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
                  stopAtSecond={8}
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
                title={
                  "Why do you think Sarah asks to make the sandwich herself?"
                }
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

export default Unit3_Page1;
