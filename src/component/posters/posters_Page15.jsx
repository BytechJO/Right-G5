import React from "react";
import page_15 from "../../assets/imgs/pages/posters/G5 Poster_Page_15.png";
import imgConversation1 from "../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 64/SVG/1.svg";
import imgConversation2 from "../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 64/SVG/2.svg";
import imgConversation3 from "../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 64/SVG/3.svg";
import imgConversation4 from "../../assets/imgs/pages/classbook/Right 5 Unit 8 Lets Ride In a Hot-Air Balloon Folder/Page 64/SVG/4.svg";
import wordJson from "../../assets/json/cd36pg64-conversation_eng.json";
import video from "../../assets/videos/grade 5 unit 8 page 64.mp4";
import longAudio from "../../assets/audio/ClassBook/U8/PG 64/cd36pg64-conversation.mp3";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import Conversation from "../Conversation";
const Posters_Page15 = ({ openPopup }) => {
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
  return (
    <div
      className="poster-wrapper"
      style={{ backgroundImage: `url(${page_15})` }}
    >
      <div
        className="headset-icon-CD-page15-p hover:scale-110 transition"
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

export default Posters_Page15;
