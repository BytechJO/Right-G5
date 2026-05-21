import React from "react";
import page_9 from "../../assets/imgs/pages/posters/G5 Poster_Page_09.png";
import longAudio from "../../assets/audio/ClassBook/U5/PG 40/cd21pg40-conversation.mp3";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import imgConversation1 from "../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 40/SVG/23.svg";
import imgConversation2 from "../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 40/SVG/24.svg";
import imgConversation3 from "../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 40/SVG/25.svg";
import imgConversation4 from "../../assets/imgs/pages/classbook/Right 5 Unit 5 What Would You Like to Read Folder/Page 40/SVG/Asset 8.svg";
import wordJson from "../../assets/json/cd21pg40-conversation_eng.json";
import video from "../../assets/videos/grade 5 unit 5 page 40.mp4";
import Conversation from "../Conversation";

const Posters_Page9 = ({ openPopup }) => {
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
  return (
    <div
      className="poster-wrapper"
      style={{ backgroundImage: `url(${page_9})` }}
    >
      <div
        className="headset-icon-CD-page9-p hover:scale-110 transition"
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
    </div>
  );
};

export default Posters_Page9;
