import page_1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 28.png";
import "./Unit4_Page1.css";
import longAudio from "../../../assets/audio/ClassBook/U4/PG 28/pg28-conversation.mp3";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import Conversation from "../../Conversation";
import Vocabulary from "../../Vocabulary";
import VocabularAudio from "../../../assets/audio/ClassBook/U4/PG 28/cd17pg28-vocab.mp3";
import sound1 from "../../../assets/audio/ClassBook/U4/PG 28/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/U4/PG 28/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/U4/PG 28/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/U4/PG 28/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/U4/PG 28/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/U4/PG 28/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/U4/PG 28/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/U4/PG 28/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/U4/PG 28/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/U4/PG 28/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/U4/PG 28/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/U4/PG 28/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/U4/PG 28/sound13.mp3";
import sound14 from "../../../assets/audio/ClassBook/U4/PG 28/sound14.mp3";
import CriticalThinking from "../../CriticalThinking";
import imgConversation1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 28/SVG/Asset 32.svg";
import imgConversation2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 28/SVG/Asset 33.svg";
import imgConversation3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 28/SVG/Asset 34.svg";
import imgConversation4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 28/SVG/Asset 36.svg";
import wordJson from "../../../assets/json/pg28-conversation_eng.json";
import video from "../../../assets/videos/grade 5 unit 4 page 28.mp4";

const Unit4_Page1 = ({ openPopup }) => {
  // ==================== conversation data ==================== //
  const data = [
    {
      number: 1,
      image: imgConversation1,
      dialogues: [
        {
          speaker: "Stella",
          text: "This mall is wonderful! We can go shopping because my mom’s at the grocery store.",
        },
        {
          speaker: "Helen",
          text: "I like this mall, too. It has fantastic clothes stores. You can find good jeans.",
        },
      ],
    },
    {
      number: 2,
      image: imgConversation2,
      dialogues: [
        {
          speaker: "John",
          text: "Girls always like clothes! Not me! The arcade is my favorite place.",
        },
        {
          speaker: "Tom",
          text: "The arcade is fine, but the bookstores are even better. Let’s head over to a bookstore now.",
        },
      ],
    },
    {
      number: 3,
      image: imgConversation3,
      dialogues: [
        {
          speaker: "Stella",
          text: "Wait a minute, Tom. Who said anything about a bookstore? Helen and I often like to go shopping for clothes and shoes, and I need some boots today.",
        },
        {
          speaker: "Harley",
          text: "Okay. We want to check out the electronics store first.",
        },
      ],
    },
    {
      number: 4,
      image: imgConversation4,
      dialogues: [
        {
          speaker: "Hansel",
          text: "The electronics can wait, too! I want to go to the food court. I’m starving.",
        },
        {
          speaker: "Stella",
          text: "Okay. We can all go with Hansel, then split up and go to the stores we want to shop in.",
        },
        {
          speaker: "Helen",
          text: "There’s a chicken place straight ahead. They will have juice and some food for Hansel.",
        },
      ],
    },
  ];
  const captionsExample = [
    {
      start: 0.239,
      end: 5.299,
      text: "Page 28, Conversation. Listen and read, then say",
    },
    {
      start: 5.299,
      end: 10.659,
      text: "This mall is wonderful! We can go shopping because my mom’s at the grocery store.",
    },
    {
      start: 11.779,
      end: 15.119,
      text: "I like this mall, too. It has fantastic clothes stores.",
    },
    {
      start: 16.139,
      end: 17.539,
      text: "You can find good jeans.",
    },
    {
      start: 18.659,
      end: 24.059,
      text: "Girls always like clothes! Not me! The arcade is my favorite place.",
    },
    {
      start: 25.119,
      end: 31.719,
      text: "The arcade is fine, but the bookstores are even better. Let’s head over to a bookstore now.",
    },
    {
      start: 31.719,
      end: 42.219,
      text: "Wait a minute, Tom. Who said anything about a bookstore? Helen and I often like to go shopping for clothes and shoes, and I need some boots today.",
    },
    {
      start: 42.219,
      end: 46.139,
      text: "Okay. We want to check out the electronics store first.",
    },
    {
      start: 46.139,
      end: 51.899,
      text: "The electronics can wait, too! I want to go to the food court. I’m starving.",
    },
    {
      start: 51.899,
      end: 58.219,
      text: "Okay, we can all go with Hansel, then split up and go to the stores we wanna shop in.",
    },
    {
      start: 59.359,
      end: 63.2,
      text: "There’s a chicken place straight ahead. They will have juice and some food for Hansel.",
    },
  ];
  const captionTimings = [
    [
      captionsExample[1],
      {
        start: captionsExample[2].start,
        end: captionsExample[3].end,
      },
    ],

    [captionsExample[4], captionsExample[5]],

    [captionsExample[6], captionsExample[7]],

    [captionsExample[8], captionsExample[9], captionsExample[10]],
  ];
  const filteredSegments = wordJson.segments.slice(1);

  const Voc = [
    [
      filteredSegments[0]?.words || [],
      [
        ...(filteredSegments[1]?.words || []),
        ...(filteredSegments[2]?.words || []),
      ],
    ],

    [filteredSegments[3]?.words || [], filteredSegments[4]?.words || []],

    [filteredSegments[5]?.words || [], filteredSegments[6]?.words || []],

    [
      filteredSegments[7]?.words || [],
      filteredSegments[8]?.words || [],
      filteredSegments[9]?.words || [],
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
                  stopAtSecond={5.0}
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
                title={"Why do the children have some time to shop?"}
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

export default Unit4_Page1;
