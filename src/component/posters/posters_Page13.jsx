import React from "react";
import page_13 from "../../assets/imgs/pages/posters/G5 Poster_Page_13.png";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import imgConversation1 from "../../assets/imgs/pages/classbook/Right 5 Unit 7 Helen Is Visiting Grandma Folder/Page 58/SVG/Asset 15.svg";
import imgConversation2 from "../../assets/imgs/pages/classbook/Right 5 Unit 7 Helen Is Visiting Grandma Folder/Page 58/SVG/Asset 22.svg";
import imgConversation3 from "../../assets/imgs/pages/classbook/Right 5 Unit 7 Helen Is Visiting Grandma Folder/Page 58/SVG/Asset 23.svg";
import imgConversation4 from "../../assets/imgs/pages/classbook/Right 5 Unit 7 Helen Is Visiting Grandma Folder/Page 58/SVG/Asset 25.svg";
import wordJson from "../../assets/json/cd31pg58-conversation_eng.json";
import video from "../../assets/videos/grade 5 unit 7 page 58.mp4";
import longAudio from "../../assets/audio/ClassBook/U7/PG 58/cd31pg58-conversation.mp3";
import Conversation from "../Conversation";

const Posters_Page13 = ({ openPopup }) => {
  const data = [
    {
      number: 1,
      image: imgConversation1,
      dialogues: [
        {
          speaker: "Grandma",
          text: "Come in. I am putting some water in the kettle for tea.",
        },
        {
          speaker: "Helen",
          text: "Hi, Grandma! You’re limping today. Are you okay?",
        },
        {
          speaker: "Grandma",
          text: "Come inside, Helen. I’m fine, but I am feeling a little tired today. I’m stiff from sitting down, so that’s why I’m walking oddly.",
        },
      ],
    },

    {
      number: 2,
      image: imgConversation2,
      dialogues: [
        {
          speaker: "Helen",
          text: "I’m glad I’m helping you today, Grandma. Where do you want me to start?",
        },
        {
          speaker: "Grandma",
          text: "First, thank you for coming. Now, sit down. Make yourself at home. I’m getting the photo albums out for us to look at.",
        },
      ],
    },

    {
      number: 3,
      image: imgConversation3,
      dialogues: [
        {
          speaker: "Helen",
          text: "Super! Are you getting Mom’s baby book also?",
        },
        {
          speaker: "Grandma",
          text: "Of course! I know you love looking at your mom’s baby pictures.",
        },
        {
          speaker: "Helen",
          text: "You like seeing when you were a young mom! In some ways you look so different, but in other ways you look the same! Do you ever miss being young, Grandma?",
        },
      ],
    },

    {
      number: 4,
      image: imgConversation4,
      dialogues: [
        {
          speaker: "Grandma",
          text: "Oh, those were wonderful years, but I’m treasuring my life now. I learned a long time ago to treasure each minute of what I have so I don’t miss it later.",
        },
        {
          speaker: "Helen",
          text: "That’s a good way to deal with it. What are you doing these weekends now, Grandma?",
        },
        {
          speaker: "Grandma",
          text: "Well, I’m keeping busy, that’s for sure! I ride my bike to the orphanage to visit the children. They would love to meet you. Can you come next weekend?",
        },
        {
          speaker: "Helen",
          text: "I’m jotting it down right now, Grandma! You’re at the top of my list for next weekend!",
        },
      ],
    },
  ];
  const captionsExample = [
    {
      start: 0.299,
      end: 4.8,
      text: "Page 58, Conversation. Listen and read, then say.",
    },
    {
      start: 5.4,
      end: 9.199,
      text: "Come in. I am putting some water in the kettle for tea.",
    },

    {
      start: 9.199,
      end: 12.539,
      text: "Hi, Grandma. You're limping today. Are you okay?",
    },

    {
      start: 13.779,
      end: 21.299,
      text: "Come inside, Helen. I'm fine, but I'm feeling a little tired today. I'm stiff from sitting down, so that's why I'm walking oddly.",
    },

    {
      start: 21.299,
      end: 25.92,
      text: "I'm glad I'm helping you today, Grandma. Where do you want me to start?",
    },

    {
      start: 25.92,
      end: 33.52,
      text: "First, thank you for coming. Now, sit down. Make yourself at home. I'm getting the photo albums for us to look at.",
    },

    {
      start: 33.52,
      end: 36.899,
      text: "Super. Are you getting Mom's baby book also?",
    },

    {
      start: 36.899,
      end: 40.959,
      text: "Of course. I know you love looking at your mom's baby pictures.",
    },

    {
      start: 40.959,
      end: 50.639,
      text: "You like seeing when you were a young mom. In some ways, you look so different, but in other ways you look the same. Do you ever miss being young, Grandma?",
    },

    {
      start: 50.639,
      end: 60.159,
      text: "Oh, those were wonderful years. But I'm treasuring my life now. I learned a long time ago to treasure each minute of what I have so I don't miss it later.",
    },

    {
      start: 60.159,
      end: 64.999,
      text: "That's a good way to deal with it. What are you doing on the weekends now, Grandma?",
    },

    {
      start: 65.0,
      end: 73.839,
      text: "Well, I'm keeping busy, that's for sure. I ride my bike to the orphanage to visit the children. They would love to meet you. Can you come next weekend?",
    },

    {
      start: 73.839,
      end: 79.099,
      text: "I'm jotting it down right now, Grandma. You're at the top of my list for next weekend.",
    },
  ];
  const captionTimings = [
    [captionsExample[1], captionsExample[2], captionsExample[3]],

    [captionsExample[4], captionsExample[5]],

    [captionsExample[6], captionsExample[7], captionsExample[8]],

    [
      captionsExample[9],
      captionsExample[10],
      captionsExample[11],
      captionsExample[12],
    ],
  ];
  const filteredSegments = wordJson.segments.slice(1);

  const Voc = [
    [
      filteredSegments[0]?.words || [],
      filteredSegments[1]?.words || [],
      filteredSegments[2]?.words || [],
    ],

    [filteredSegments[3]?.words || [], filteredSegments[4]?.words || []],

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
  ];
  return (
    <div
      className="poster-wrapper"
      style={{ backgroundImage: `url(${page_13})` }}
    >
      <div
        className="headset-icon-CD-page13-p hover:scale-110 transition"
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
                  stopAtSecond={4.8}
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

export default Posters_Page13;
