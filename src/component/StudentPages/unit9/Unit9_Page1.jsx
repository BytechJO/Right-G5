import page_1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 9 What If Folder/Page 76.png";
import "./Unit9_Page1.css";
import longAudio from "../../../assets/audio/ClassBook/U9/PG 76/cd41pg76-conversation.mp3";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import Conversation from "../../Conversation";
import Vocabulary from "../../Vocabulary";
import VocabularAudio from "../../../assets/audio/ClassBook/U9/PG 76/cd42pg76-vocab.mp3";
import sound1 from "../../../assets/audio/ClassBook/U9/PG 76/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/U9/PG 76/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/U9/PG 76/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/U9/PG 76/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/U9/PG 76/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/U9/PG 76/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/U9/PG 76/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/U9/PG 76/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/U9/PG 76/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/U9/PG 76/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/U9/PG 76/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/U9/PG 76/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/U9/PG 76/sound13.mp3";
import sound14 from "../../../assets/audio/ClassBook/U9/PG 76/sound14.mp3";
import sound15 from "../../../assets/audio/ClassBook/U9/PG 76/sound15.mp3";
import sound16 from "../../../assets/audio/ClassBook/U9/PG 76/sound16.mp3";
import sound17 from "../../../assets/audio/ClassBook/U9/PG 76/sound17.mp3";
import CriticalThinking from "../../CriticalThinking";
import imgConversation1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 9 What If Folder/Page 76/SVG/1.svg";
import imgConversation2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 9 What If Folder/Page 76/SVG/2.svg";
import imgConversation3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 9 What If Folder/Page 76/SVG/3.svg";
import imgConversation4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 9 What If Folder/Page 76/SVG/4.svg";
import wordJson from "../../../assets/json/cd41pg76-conversation_eng.json";
import video from "../../../assets/videos/grade 5 unit 9 page 76 .mp4";

const Unit9_Page1 = ({ openPopup }) => {
  // ==================== conversation data ==================== //
  const data = [
    {
      number: 1,
      image: imgConversation1,
      dialogues: [
        {
          speaker: "Paul",
          text: "Hello?",
        },
        {
          speaker: "Victor",
          text: "Hi, Paul. This is Victor. I’m bored today. If you finish studying, will you play soccer with me this afternoon?",
        },
        {
          speaker: "Paul",
          text: "I would love to go if there’s a game today. Is the soccer club meeting at the school?",
        },
        {
          speaker: "Victor",
          text: "Exactly. If I come to get you, will you be ready by 3:00?",
        },
        {
          speaker: "Paul",
          text: "Yes, that’ll work. Why don’t we call Mark and Joe as well? Could you give Mark a ring and I’ll ring Joe?",
        },
      ],
    },

    {
      number: 2,
      image: imgConversation2,
      dialogues: [
        {
          speaker: "Victor",
          text: "Hi, Mark. What’s up?",
        },
        {
          speaker: "Mark",
          text: "Not much. My family and I are relaxing at the pool today.",
        },
        {
          speaker: "Victor",
          text: "Ah, that sounds nice. Hey, if Paul and I get a game going today at 3:00, will you join us?",
        },
      ],
    },

    {
      number: 3,
      image: imgConversation3,
      dialogues: [
        {
          speaker: "Mark",
          text: "I’d love to, but I have an appointment. I will get my braces off today!",
        },
        {
          speaker: "Victor",
          text: "Hey, that’s great news! Congratulations! If you finish in time, will you come to the stadium?",
        },
        {
          speaker: "Mark",
          text: "I’ll see how it goes. If I can, I’ll rush right over.",
        },
        {
          speaker: "Victor",
          text: "Okay. Look for the team with the red shirts.",
        },
      ],
    },

    {
      number: 4,
      image: imgConversation4,
      dialogues: [
        {
          speaker: "Paul",
          text: "Hello, Joe. What’s new with you?",
        },
        {
          speaker: "Joe",
          text: "A bike! Remember the money I saved from mowing people’s lawns last summer?",
        },
        {
          speaker: "Paul",
          text: "Yes. Did you get a new bike with it?",
        },
        {
          speaker: "Joe",
          text: "Yes. If you’re not busy, I will ride it over to show you later.",
        },
        {
          speaker: "Paul",
          text: "Could you ride your bike to the stadium for soccer? We’d love to have you play a game with us!",
        },
      ],
    },
  ];
  const captionsExample = [
    {
      start: 0.179,
      end: 6.139,
      text: "Page 76, Conversation. Listen and read, then say.",
    },

    // Conversation 1
    {
      start: 6.139,
      end: 6.46,
      text: "Hello?",
    },
    {
      start: 7.44,
      end: 14.659,
      text: "Hi, Paul. This is Victor. I’m bored today. If you finish studying, will you play soccer with me this afternoon?",
    },
    {
      start: 15.539,
      end: 20.119,
      text: "I would love to go if there’s a game today. Is the soccer club meeting at the school?",
    },
    {
      start: 21.159,
      end: 25.219,
      text: "Exactly. If I come to get you, will you be ready by 3:00?",
    },
    {
      start: 26.159,
      end: 32.04,
      text: "Yes, that’ll work. Why don’t we call Mark and Joe as well? Could you give Mark a ring and I’ll ring Joe?",
    },

    // Conversation 2
    {
      start: 32.939,
      end: 33.979,
      text: "Hi, Mark. What’s up?",
    },
    {
      start: 34.939,
      end: 38.779,
      text: "Not much. My family and I are relaxing at the pool today.",
    },
    {
      start: 39.7,
      end: 45.839,
      text: "Ah, that sounds nice. Hey, if Paul and I get a game going today at 3:00, will you join us?",
    },

    // Conversation 3
    {
      start: 46.879,
      end: 51.219,
      text: "I’d love to, but I have an appointment. I will get my braces off today!",
    },
    {
      start: 52.059,
      end: 57.399,
      text: "Hey, that’s great news! Congratulations! If you finish in time, will you come to the stadium?",
    },
    {
      start: 58.319,
      end: 61.539,
      text: "I’ll see how it goes. If I can, I’ll rush right over.",
    },
    {
      start: 62.52,
      end: 65.659,
      text: "Okay. Look for the team with the red shirts.",
    },

    // Conversation 4
    {
      start: 66.76,
      end: 68.76,
      text: "Hello, Joe. What’s new with you?",
    },
    {
      start: 69.819,
      end: 75.119,
      text: "A bike! Remember the money I saved from mowing people’s lawns last summer?",
    },
    {
      start: 76.119,
      end: 78.199,
      text: "Yes. Did you get a new bike with it?",
    },
    {
      start: 79.139,
      end: 83.0,
      text: "Yes. If you’re not busy, I will ride it over to show you later.",
    },
    {
      start: 83.939,
      end: 88.639,
      text: "Could you ride your bike to the stadium for soccer? We’d love to have you play a game with us!",
    },
  ];
  const captionTimings = [
    [
      captionsExample[1],
      captionsExample[2],
      captionsExample[3],
      captionsExample[4],
      captionsExample[5],
    ],

    [captionsExample[6], captionsExample[7], captionsExample[8]],

    [
      captionsExample[9],
      captionsExample[10],
      captionsExample[11],
      captionsExample[12],
    ],

    [
      captionsExample[13],
      captionsExample[14],
      captionsExample[15],
      captionsExample[16],
      captionsExample[17],
    ],
  ];
  const filteredSegments = wordJson.segments.slice(1);

  const Voc = [
    [
      filteredSegments[0]?.words || [],
      filteredSegments[1]?.words || [],
      filteredSegments[2]?.words || [],
      filteredSegments[3]?.words || [],
      filteredSegments[4]?.words || [],
    ],

    [
      filteredSegments[5]?.words || [],
      filteredSegments[6]?.words || [],
      filteredSegments[7]?.words || [],
    ],

    [
      filteredSegments[8]?.words || [],
      filteredSegments[9]?.words || [],
      filteredSegments[10]?.words || [],
      filteredSegments[11]?.words || [],
    ],

    [
      filteredSegments[12]?.words || [],
      filteredSegments[13]?.words || [],
      filteredSegments[14]?.words || [],
      filteredSegments[15]?.words || [],
      filteredSegments[16]?.words || [],
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
      start: 0.179,
      end: 4.039,
      text: "Page 76, unit nine, vocabulary. Listen and repeat.",
    },

    {
      start: 4.4,
      end: 7.139,
      text: "Find the words and expressions in the conversation above.",
    },

    {
      start: 7.98,
      end: 9.46,
      text: "1. club.",
    },

    {
      start: 10.42,
      end: 12.239,
      text: "2. exactly.",
    },

    {
      start: 13.179,
      end: 14.899,
      text: "3. ring.",
    },

    {
      start: 15.96,
      end: 17.76,
      text: "4. appointment.",
    },

    {
      start: 18.619,
      end: 20.419,
      text: "5. braces.",
    },

    {
      start: 21.359,
      end: 23.659,
      text: "6. congratulations.",
    },

    {
      start: 24.68,
      end: 26.599,
      text: "7. stadium.",
    },

    {
      start: 27.439,
      end: 29.139,
      text: "8. rush.",
    },

    {
      start: 30.179,
      end: 32.02,
      text: "9. mowing.",
    },

    {
      start: 34.439,
      end: 35.119,
      text: "10. lawns.",
    },

    {
      start: 35.899,
      end: 37.939,
      text: "11. that'll work.",
    },

    {
      start: 38.84,
      end: 41.759,
      text: "12. join (noun).",
    },

    {
      start: 42.659,
      end: 46.2,
      text: "13. great/good news.",
    },

    {
      start: 47.18,
      end: 49.659,
      text: "14. see how it goes.",
    },

    {
      start: 50.659,
      end: 52.84,
      text: "15. right over.",
    },

    {
      start: 53.879,
      end: 56.86,
      text: "16. get a (noun).",
    },

    {
      start: 57.719,
      end: 60.359,
      text: "17. we'd love to have you.",
    },
  ];

  const wordTimingsVoc = [
    { start: 7.98, end: 9.46 },
    { start: 10.42, end: 12.239 },
    { start: 13.179, end: 14.899 },
    { start: 15.96, end: 17.76 },
    { start: 18.619, end: 20.419 },

    { start: 21.359, end: 23.659 },
    { start: 24.68, end: 26.599 },
    { start: 27.439, end: 29.139 },
    { start: 30.179, end: 32.02 },
    { start: 34.439, end: 35.119 },

    { start: 35.899, end: 37.939 },
    { start: 38.84, end: 41.759 },
    { start: 42.659, end: 46.2 },
    { start: 47.18, end: 49.659 },
    { start: 50.659, end: 52.84 },

    { start: 53.879, end: 56.86 },
    { start: 57.719, end: 60.359 },
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
                  stopAtSecond={5}
                  captionTimings={captionTimings}
                  wordTimings={Voc}
                  openPopup={openPopup}
                  video={video}
                  imageWidth="300px"
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
                  stopAtSecond={7.1}
                  sounds={sounds}
                  wordTimings={wordTimingsVoc}
                  words={[
                    "club",
                    "exactly",
                    "ring",
                    "appointment",
                    "braces",
                    "congratulations",
                    "stadium",
                    "rush",
                    "mowing",
                    "lawns",
                    "that’ll work",
                    "join (noun)",
                    "great/good news",
                    "see how it goes",
                    "right over",
                    "get a (noun)",
                    "we’d love to have you",
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
                  "If Joe goes to the game, how will he probably get there?"
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

export default Unit9_Page1;
