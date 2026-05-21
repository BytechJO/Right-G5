import React from "react";
import page_17 from "../../assets/imgs/pages/posters/G5 Poster_Page_17.png";
import imgConversation1 from "../../assets/imgs/pages/classbook/Right 5 Unit 9 What If Folder/Page 76/SVG/1.svg";
import imgConversation2 from "../../assets/imgs/pages/classbook/Right 5 Unit 9 What If Folder/Page 76/SVG/2.svg";
import imgConversation3 from "../../assets/imgs/pages/classbook/Right 5 Unit 9 What If Folder/Page 76/SVG/3.svg";
import imgConversation4 from "../../assets/imgs/pages/classbook/Right 5 Unit 9 What If Folder/Page 76/SVG/4.svg";
import wordJson from "../../assets/json/cd41pg76-conversation_eng.json";
import video from "../../assets/videos/grade 5 unit 9 page 76 .mp4";
import longAudio from "../../assets/audio/ClassBook/U9/PG 76/cd41pg76-conversation.mp3";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import Conversation from "../Conversation";
const Posters_Page17 = ({ openPopup }) => {
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
  return (
    <div
      className="poster-wrapper"
      style={{ backgroundImage: `url(${page_17})` }}
    >
      <div
        className="headset-icon-CD-page17-p hover:scale-110 transition"
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
    </div>
  );
};

export default Posters_Page17;
