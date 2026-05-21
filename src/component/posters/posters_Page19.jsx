import React from "react";
import page_19 from "../../assets/imgs/pages/posters/G5 Poster_Page_19.png";
import imgConversation1 from "../../assets/imgs/pages/classbook/Right 5 Unit 10 It Was the Best Day! Folder/Page 82/SVG/3.svg";
import imgConversation2 from "../../assets/imgs/pages/classbook/Right 5 Unit 10 It Was the Best Day! Folder/Page 82/SVG/1.svg";
import imgConversation3 from "../../assets/imgs/pages/classbook/Right 5 Unit 10 It Was the Best Day! Folder/Page 82/SVG/2.svg";
import imgConversation4 from "../../assets/imgs/pages/classbook/Right 5 Unit 10 It Was the Best Day! Folder/Page 82/SVG/4.svg";
import wordJson from "../../assets/json/cd46pg82-conversation_eng.json";
import video from "../../assets/videos/grade 5 unit 10 page 82.mp4";
import longAudio from "../../assets/audio/ClassBook/U10/PG 82/cd46pg82-conversation.mp3";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import Conversation from "../Conversation";
const Posters_Page19 = ({ openPopup }) => {
  const data = [
    {
      number: 1,
      image: imgConversation1,
      dialogues: [
        {
          speaker: "Eric",
          text: "What were you doing last night, Jen and Jeremy? There was a great symphony.",
        },
        {
          speaker: "Jen",
          text: "Our family was visiting my uncle’s house. We were harvesting lettuce there. It was the best day!",
        },
        {
          speaker: "Eric",
          text: "Nice! Your uncle must have several acres, huh?",
        },
        {
          speaker: "Jen",
          text: "Yes, he has a large ranch of 40 acres. He raises cattle there, and he has an enormous garden near his house.",
        },
      ],
    },

    {
      number: 2,
      image: imgConversation2,
      dialogues: [
        {
          speaker: "Jeremy",
          text: "It’s your turn, Eric. Were you playing in the symphony or listening to it last night?",
        },
        {
          speaker: "Eric",
          text: "I was listening to it. I play the violin, but I’ve got a long way to go before I’m ready for the symphony!",
        },
      ],
    },

    {
      number: 3,
      image: imgConversation3,
      dialogues: [
        {
          speaker: "Jeremy",
          text: "Were they playing anything lively? I don’t like lots of slow symphony music. It makes me sad.",
        },
        {
          speaker: "Eric",
          text: "Actually, symphony music can be very lively. During Mozart’s and Beethoven’s time, composers were writing very beautiful music. Often it depended on the composer and the times.",
        },
      ],
    },

    {
      number: 4,
      image: imgConversation4,
      dialogues: [
        {
          speaker: "Jen",
          text: "Which type of music do you play on your violin?",
        },
        {
          speaker: "Eric",
          text: "I like to play music with a variety of moods.",
        },
        {
          speaker: "Jeremy",
          text: "There are even some rock and roll songs that use the violin. It’s a very flexible instrument.",
        },
        {
          speaker: "Eric",
          text: "That’s a good point! That’s one reason that makes the violin so appealing to me.",
        },
      ],
    },
  ];
  const captionsExample = [
    {
      start: 0.179,
      end: 6.139,
      text: "Page 82, conversation. Listen and read, then say.",
    },

    // Conversation 1
    {
      start: 5.519,
      end: 9.88,
      text: "What were you doing last night, Jen and Jeremy? There was a great symphony.",
    },
    {
      start: 10.899,
      end: 17.92,
      text: "Our family was visiting my uncle’s house. We were harvesting lettuce there. It was the best day!",
    },
    {
      start: 18.979,
      end: 22.159,
      text: "Nice! Your uncle must have several acres, huh?",
    },
    {
      start: 23.239,
      end: 34.699,
      text: "Yes, he has a large ranch of 40 acres. He raises cattle there, and he has an enormous garden near his house.",
    },

    // Conversation 2
    {
      start: 34.7,
      end: 39.899,
      text: "It’s your turn, Eric. Were you playing in the symphony or listening to it last night?",
    },
    {
      start: 39.899,
      end: 46.939,
      text: "I was listening to it. I play the violin, but I’ve got a long way to go before I’m ready for the symphony!",
    },

    // Conversation 3
    {
      start: 46.939,
      end: 53.419,
      text: "Were they playing anything lively? I don’t like lots of slow symphony music. It makes me sad.",
    },
    {
      start: 53.419,
      end: 65.779,
      text: "Actually, symphony music can be very lively. During Mozart and Beethoven’s time, composers were writing very beautiful music. Often it depended on the composer and the times.",
    },

    // Conversation 4
    {
      start: 65.779,
      end: 69.76,
      text: "Which type of music do you play on your violin?",
    },
    {
      start: 69.76,
      end: 72.819,
      text: "I like to play music with a variety of moods.",
    },
    {
      start: 73.879,
      end: 80.4,
      text: "There are even some rock and roll songs that use the violin. It’s a very flexible instrument.",
    },
    {
      start: 80.4,
      end: 84.479,
      text: "That’s a good point! That’s one reason that makes the violin so appealing to me.",
    },
  ];
  const captionTimings = [
    [
      captionsExample[1],
      captionsExample[2],
      captionsExample[3],
      captionsExample[4],
    ],

    [captionsExample[5], captionsExample[6]],

    [captionsExample[7], captionsExample[8]],

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
      filteredSegments[3]?.words || [],
    ],

    [filteredSegments[4]?.words || [], filteredSegments[5]?.words || []],

    [filteredSegments[6]?.words || [], filteredSegments[7]?.words || []],

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
      style={{ backgroundImage: `url(${page_19})` }}
    >
      <div
        className="headset-icon-CD-page19-p hover:scale-110 transition"
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
                  stopAtSecond={5.2}
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

export default Posters_Page19;
