import React from "react";
import page_11 from "../../assets/imgs/pages/posters/G5 Poster_Page_11.png";
import imgConversation1 from "../../assets/imgs/pages/classbook/Right 5 Unit 6 Shall We Should We Folder/Page 46/SVG/1.svg";
import imgConversation2 from "../../assets/imgs/pages/classbook/Right 5 Unit 6 Shall We Should We Folder/Page 46/SVG/2.svg";
import imgConversation3 from "../../assets/imgs/pages/classbook/Right 5 Unit 6 Shall We Should We Folder/Page 46/SVG/3.svg";
import imgConversation4 from "../../assets/imgs/pages/classbook/Right 5 Unit 6 Shall We Should We Folder/Page 46/SVG/4.svg";
import wordJson from "../../assets/json/cd26pg46-conversation_eng.json";
import video from "../../assets/videos/grade 5 unit 6 page 46.mp4";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import longAudio from "../../assets/audio/ClassBook/U6/PG 46/cd26pg46-conversation.mp3";
import Conversation from "../Conversation";

const Posters_Page11 = ({ openPopup }) => {
  
  const data = [
    {
      number: 1,
      image: imgConversation1,
      dialogues: [
        {
          speaker: "Harley",
          text: "Hooray, we made it to the carnival!",
        },
        {
          speaker: "Tom",
          text: "Yes, and we are lucky because it’s the last day.",
        },
        {
          speaker: "Stella",
          text: "I think it’s great that all the attractions are half price.",
        },
        {
          speaker: "Tom",
          text: "I’d like to take advantage of the discount and try to go on all the rides.",
        },
      ],
    },

    {
      number: 2,
      image: imgConversation2,
      dialogues: [
        {
          speaker: "Sarah",
          text: "I could ride the white horse on the merry-go-round!",
        },
        {
          speaker: "Harley",
          text: "I’ll try the flying cars, but that new ride might not be what I like.",
        },
        {
          speaker: "Tom",
          text: "I’ll try out a bunch of the rides, but I’d also like to play some games. Should we all try to win a prize?",
        },
        {
          speaker: "Stella",
          text: "We must try the basketball game. I can sometimes shoot three baskets in a row.",
        },
      ],
    },

    {
      number: 3,
      image: imgConversation3,
      dialogues: [
        {
          speaker: "Helen",
          text: "Here it is. Shall we? You first, Stella.",
        },
        {
          speaker: "Stella",
          text: "Okay, I’ll give it a try. It looks easy when the man in the booth shoots it.",
        },
        {
          speaker: "Tom",
          text: "Yeah, they can always make it look easy. While you’re doing that, we’re going to try out the bowling game.",
        },
        {
          speaker: "Harley",
          text: "We’ll see if any of us is an expert at the games!",
        },
        {
          speaker: "Sarah",
          text: "Hey, I got one in!",
        },
      ],
    },

    {
      number: 4,
      image: imgConversation4,
      dialogues: [
        {
          speaker: "Stella",
          text: "We got an action figure for a prize. I’ll be really generous and give it to you, Helen!",
        },
        {
          speaker: "Helen",
          text: "No thanks. I don’t like action figures.",
        },
        {
          speaker: "Harley",
          text: "Ugh. I got a doll with a pink dress for my prize! Who would want something like that?",
        },
        {
          speaker: "Sarah",
          text: "We’ll take it! Pink is my favorite color!",
        },
        {
          speaker: "Harley",
          text: "Good idea. We’ll trade prizes. There’s no way I’ll carry a pink doll around the carnival!",
        },
      ],
    },
  ];
  const captionsExample = [
    {
      start: 0.56,
      end: 7.019,
      text: "Page 46, Conversation.Listen and read, then say.",
    },
    {
      start: 7.019,
      end: 9.859,
      text: "Hooray, we made it to the carnival.",
    },
    {
      start: 9.859,
      end: 14.079,
      text: "Yes, and we're lucky because it's the last day.",
    },
    {
      start: 14.079,
      end: 18.399,
      text: "I think it's great that all the attractions are half price.",
    },
    {
      start: 19.459,
      end: 23.219,
      text: "I'd like to take advantage of the discount and try to go on all the rides.",
    },
    {
      start: 24.34,
      end: 28.139,
      text: "I could ride the white horse on the merry-go-round.",
    },
    {
      start: 28.139,
      end: 32.819,
      text: "I'll try the flying cars, but that new ride might not be what I like.",
    },
    {
      start: 33.939,
      end: 40.459,
      text: "I'll try out a bunch of the rides, but I'd also like to play some games. Should we all try to win a prize?",
    },
    {
      start: 40.459,
      end: 46.619,
      text: "We must try the basketball game. I can sometimes shoot three baskets in a row.",
    },
    {
      start: 46.619,
      end: 49.399,
      text: "Here it is. Shall we? You first, Stella.",
    },
    {
      start: 50.459,
      end: 55.239,
      text: "Okay, I'll give it a try. It looks easy when the man in the booth shoots it.",
    },
    {
      start: 56.299,
      end: 62.979,
      text: "Yeah, they can always make it look easy. While you're doing that, we're going to try out the bowling game.",
    },
    {
      start: 62.979,
      end: 67.079,
      text: "We'll see if any of us is an expert at the games.",
    },
    {
      start: 67.08,
      end: 68.199,
      text: "Hey, I got one in.",
    },
    {
      start: 69.199,
      end: 74.9,
      text: "We got an action figure for a prize. I'll be really generous and give it to you, Helen.",
    },
    {
      start: 75.939,
      end: 79.079,
      text: "No, thanks. I don't like action figures.",
    },
    {
      start: 79.08,
      end: 85.799,
      text: "Ugh, I got a doll with a pink dress for my prize. Who would want something like that?",
    },
    {
      start: 85.799,
      end: 89.699,
      text: "We'll take it. Pink is my favorite color.",
    },
    {
      start: 89.699,
      end: 95.819,
      text: "Good idea. We'll trade prizes. There's no way I'll carry a pink doll around the carnival.",
    },
  ];
  const captionTimings = [
    [
      captionsExample[1],
      captionsExample[2],
      captionsExample[3],
      captionsExample[4],
    ],

    [
      captionsExample[5],
      captionsExample[6],
      captionsExample[7],
      captionsExample[8],
    ],

    [
      captionsExample[9],
      captionsExample[10],
      captionsExample[11],
      captionsExample[12],
      captionsExample[13],
    ],

    [
      captionsExample[14],
      captionsExample[15],
      captionsExample[16],
      captionsExample[17],
      captionsExample[18],
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
      filteredSegments[7]?.words || [],
    ],

    [
      filteredSegments[8]?.words || [],
      filteredSegments[9]?.words || [],
      filteredSegments[10]?.words || [],
      filteredSegments[11]?.words || [],
      filteredSegments[12]?.words || [],
    ],

    [
      filteredSegments[13]?.words || [],
      filteredSegments[14]?.words || [],
      filteredSegments[15]?.words || [],
      filteredSegments[16]?.words || [],
      filteredSegments[17]?.words || [],
    ],
  ];
  return (
    <div
      className="poster-wrapper"
      style={{ backgroundImage: `url(${page_11})` }}
    >
      <div
        className="headset-icon-CD-page11-p hover:scale-110 transition"
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
                  stopAtSecond={6.5}
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

export default Posters_Page11;
