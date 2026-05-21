import React from "react";
import page_1 from "../../assets/imgs/pages/posters/G5 Poster_Page_05.png";
import imgConversation1 from "../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 22/SVG/Asset 1.svg";
import imgConversation2 from "../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 22/SVG/Asset 2.svg";
import imgConversation3 from "../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 22/SVG/Asset 22.svg";
import imgConversation4 from "../../assets/imgs/pages/classbook/Right 5 Unit 3 Curry Tastes Great! Folder/Page 22/SVG/Asset 4.svg";
import wordJson from "../../assets/json/pg22-conversation_eng.json";
import video from "../../assets/videos/grade 5 unit 3 page 22.mp4";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import Conversation from "../Conversation";
import longAudio from "../../assets/audio/ClassBook/U3/PG 22/pg22-conversation.mp3";

const Posters_Page5 = ({ openPopup }) => {
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
  return (
    <div
      className="poster-wrapper"
      style={{ backgroundImage: `url(${page_1})` }}
    >
      <div
        className="headset-icon-CD-page5-p hover:scale-110 transition"
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
                  stopAtSecond={5.8}
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
    </div>
  );
};

export default Posters_Page5;
