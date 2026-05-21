import React from "react";
import page_1 from "../../assets/imgs/pages/posters/G5 Poster_Page_07.png";
import imgConversation1 from "../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 28/SVG/Asset 32.svg";
import imgConversation2 from "../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 28/SVG/Asset 33.svg";
import imgConversation3 from "../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 28/SVG/Asset 34.svg";
import imgConversation4 from "../../assets/imgs/pages/classbook/Right 5 Unit 4 Shopping with Our Friends Folder/Page 28/SVG/Asset 36.svg";
import wordJson from "../../assets/json/pg28-conversation_eng.json";
import video from "../../assets/videos/grade 5 unit 4 page 28.mp4";
import longAudio from "../../assets/audio/ClassBook/U4/PG 28/pg28-conversation.mp3";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import Conversation from "../Conversation";
const Posters_Page7 = ({ openPopup }) => {
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
  return (
    <div
      className="poster-wrapper"
      style={{ backgroundImage: `url(${page_1})` }}
    >
      <div
        className="headset-icon-CD-page7-p hover:scale-110 transition"
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

export default Posters_Page7;
