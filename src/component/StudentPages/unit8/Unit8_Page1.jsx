import page_1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 64.png";
import "./Unit8_Page1.css";
import longAudio from "../../../assets/audio/ClassBook/U8/PG 64/cd36pg64-conversation.mp3";
import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";
import Conversation from "../../Conversation";
import Vocabulary from "../../Vocabulary";
import VocabularAudio from "../../../assets/audio/ClassBook/U8/PG 64/cd37pg64-vocab.mp3";
import sound1 from "../../../assets/audio/ClassBook/U8/PG 64/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/U8/PG 64/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/U8/PG 64/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/U8/PG 64/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/U8/PG 64/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/U8/PG 64/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/U8/PG 64/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/U8/PG 64/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/U8/PG 64/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/U8/PG 64/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/U8/PG 64/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/U8/PG 64/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/U8/PG 64/sound13.mp3";
import sound14 from "../../../assets/audio/ClassBook/U8/PG 64/sound14.mp3";
import sound15 from "../../../assets/audio/ClassBook/U8/PG 64/sound15.mp3";
import sound16 from "../../../assets/audio/ClassBook/U8/PG 64/sound16.mp3";
import CriticalThinking from "../../CriticalThinking";
import imgConversation1 from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 64/SVG/1.svg";
import imgConversation2 from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 64/SVG/2.svg";
import imgConversation3 from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 64/SVG/3.svg";
import imgConversation4 from "../../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 64/SVG/4.svg";
import wordJson from "../../../assets/json/cd36pg64-conversation_eng.json";
import video from "../../../assets/videos/grade 5 unit 8 page 64.mp4";

const Unit8_Page1 = ({ openPopup }) => {
  // ==================== conversation data ==================== //
  const data = [
    {
      number: 1,
      image: imgConversation1,
      dialogues: [
        {
          speaker: "Tom",
          text: "Hey, everyone! Those are the hot-air balloons! Do you think anyone is giving rides?",
        },
        {
          speaker: "Helen",
          text: "We could ask someone.",
        },
        {
          speaker: "Harley",
          text: "I’m shocked our parents said we could take a ride.",
        },
        {
          speaker: "Stella",
          text: "Wow, there’s a rainbow one over there. It’s beautiful!",
        },
        {
          speaker: "Tom",
          text: "Excuse me, sir. Is somebody giving hot-air balloon rides today?",
        },
      ],
    },

    {
      number: 2,
      image: imgConversation2,
      dialogues: [
        {
          speaker: "Helen",
          text: "What a view! Everyone down there looks like ants.",
        },
        {
          speaker: "Tom",
          text: "Someone has to get some pictures.",
        },
        {
          speaker: "Stella",
          text: "I brought my camera, so I’ll volunteer.",
        },
        {
          speaker: "Helen",
          text: "I feel like I’m on the top of the world! The landscape is beautiful up here.",
        },
      ],
    },

    {
      number: 3,
      image: imgConversation3,
      dialogues: [
        {
          speaker: "Harley",
          text: "Is that your house, Tom? We’re about to fly over it.",
        },
        {
          speaker: "Tom",
          text: "Let me see. Yeah, that is my house! Oh, I recognize the lady out in front, my aunt Phyllis. Our house is her second home. She plays board games with me. She’s a pilot.",
        },
      ],
    },

    {
      number: 4,
      image: imgConversation4,
      dialogues: [
        {
          speaker: "Stella",
          text: "Now, we are flying over my favorite mall. There are so many people there. It’s really crowded. It has a nice cinema.",
        },
        {
          speaker: "Harley",
          text: "Yes, let’s go there this weekend! Hey, do you think anyone can spot us?",
        },
        {
          speaker: "Stella",
          text: "I doubt it. Don’t lean too far out of the basket, Harley! Let’s see if we can find the park from up here!",
        },
      ],
    },
  ];
  const captionsExample = [
    {
      start: 0.219,
      end: 4.98,
      text: "Page 64, Conversation. Listen and read, then say.",
    },

    {
      start: 6.019,
      end: 10.619,
      text: "Hey, everyone. Those are the hot air balloons. Do you think anyone is giving rides?",
    },

    {
      start: 11.739,
      end: 13.719,
      text: "We could ask someone.",
    },

    {
      start: 13.719,
      end: 16.5,
      text: "I'm shocked our parents said we could take a ride.",
    },

    {
      start: 17.539,
      end: 21.879,
      text: "Wow, there's a rainbow one over there. It's beautiful.",
    },

    {
      start: 21.879,
      end: 25.559,
      text: "Excuse me, sir. Is somebody giving hot air balloon rides today?",
    },

    {
      start: 26.619,
      end: 29.5,
      text: "What a view. Everyone down there looks like ants.",
    },

    {
      start: 30.659,
      end: 33.259,
      text: "Someone has to get some pictures.",
    },

    {
      start: 33.259,
      end: 35.599,
      text: "I brought my camera, so I'll volunteer.",
    },

    {
      start: 36.719,
      end: 42.0,
      text: "I feel like I'm on the top of the world. The landscape is beautiful up here.",
    },

    {
      start: 42.0,
      end: 45.86,
      text: "Is that your house, Tom? We're about to fly over it.",
    },

    {
      start: 45.86,
      end: 59.979,
      text: "Let me see. Yeah, that is my house. Oh, I recognize the lady out in front, my Aunt Phyllis. Our house is her second home. She plays board games with me. She's a pilot.",
    },

    {
      start: 59.979,
      end: 69.719,
      text: "Now we are flying over my favorite mall. There are so many people there. It's really crowded. It has a nice cinema.",
    },

    {
      start: 69.72,
      end: 75.199,
      text: "Yes, let's go there this weekend. Hey, do you think anyone can spot us?",
    },

    {
      start: 76.239,
      end: 82.999,
      text: "I doubt it. Don't lean too far out of the basket, Harley. Let's see if we can find the park from up here.",
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

    [
      captionsExample[6],
      captionsExample[7],
      captionsExample[8],
      captionsExample[9],
    ],

    [captionsExample[10], captionsExample[11]],

    [captionsExample[12], captionsExample[13], captionsExample[14]],
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
      filteredSegments[8]?.words || [],
    ],

    [filteredSegments[9]?.words || [], filteredSegments[10]?.words || []],

    [
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
  ];
  const captionVoc = [
    {
      start: 0.399,
      end: 4.94,
      text: "Page 64, unit eight, vocabulary. Listen and repeat.",
    },

    {
      start: 5.46,
      end: 8.119,
      text: "Find the words and expressions in the conversation above.",
    },

    {
      start: 8.92,
      end: 10.939,
      text: "1. hot air balloon.",
    },

    {
      start: 11.759,
      end: 13.639,
      text: "2. rainbow.",
    },

    {
      start: 14.659,
      end: 16.819,
      text: "3. volunteer.",
    },

    {
      start: 17.76,
      end: 19.379,
      text: "4. doubt.",
    },

    {
      start: 20.399,
      end: 22.379,
      text: "5. landscape.",
    },

    {
      start: 23.359,
      end: 25.359,
      text: "6. recognize.",
    },

    {
      start: 26.239,
      end: 28.019,
      text: "7. pilot.",
    },

    {
      start: 28.939,
      end: 30.739,
      text: "8. crowded.",
    },

    {
      start: 31.699,
      end: 33.539,
      text: "9. lean.",
    },

    {
      start: 34.239,
      end: 36.699,
      text: "10. be shocked.",
    },

    {
      start: 37.559,
      end: 40.079,
      text: "11. looks like ants.",
    },

    {
      start: 41.04,
      end: 43.519,
      text: "12. top of the world.",
    },

    {
      start: 44.399,
      end: 46.699,
      text: "13. fly over.",
    },

    {
      start: 47.759,
      end: 50.619,
      text: "14. her second home.",
    },

    {
      start: 51.52,
      end: 53.699,
      text: "15. board games.",
    },

    {
      start: 54.639,
      end: 57.68,
      text: "16. spot (noun).",
    },
  ];

  const wordTimingsVoc = [
    { start: 8.92, end: 10.939 },
    { start: 11.759, end: 13.639 },
    { start: 14.659, end: 16.819 },
    { start: 17.76, end: 19.379 },
    { start: 20.399, end: 22.379 },

    { start: 23.359, end: 25.359 },
    { start: 26.239, end: 28.019 },
    { start: 28.939, end: 30.739 },
    { start: 31.699, end: 33.539 },
    { start: 34.239, end: 36.699 },

    { start: 37.559, end: 40.079 },
    { start: 41.04, end: 43.519 },
    { start: 44.399, end: 46.699 },
    { start: 47.759, end: 50.619 },
    { start: 51.52, end: 53.699 },

    { start: 54.639, end: 57.68 },
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
                  stopAtSecond={8.3}
                  sounds={sounds}
                  wordTimings={wordTimingsVoc}
                  words={[
                    "hot air balloon",
                    "rainbow",
                    "volunteer",
                    "doubt",
                    "landscape",
                    "recognize",
                    "pilot",
                    "crowded",
                    "lean",
                    "(be) shocked",
                    "looks like ants",
                    "top of the world",
                    "fly over",
                    "(her) second home",
                    "board games",
                    "spot (noun)",
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
                title={"Why does Tom like his aunt Phyllis?"}
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

export default Unit8_Page1;
