import React from "react";
import page_1 from "../../assets/imgs/pages/posters/G5 Poster_Page_03.png";
import audioBtn from "../../assets/Page 01/Audio btn.svg";
import imgConversation1 from "../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 10/SVG/Asset 1.svg";
import imgConversation2 from "../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 10/SVG/Asset 2.svg";
import imgConversation3 from "../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 10/SVG/Asset 3.svg";
import imgConversation4 from "../../assets/imgs/pages/classbook/Right 5 Unit 2 Whos the One Folder/Page 10/SVG/Asset 4.svg";
import wordJson from "../../assets/json/conversation2_eng.json";
import video from "../../assets/videos/grade 5 unit 2 page 10.mp4";
import longAudio from "../../assets/audio/ClassBook/U2/PG 10/conversation_p10.mp3";
import Conversation from "../Conversation";

const Posters_Page3 = ({ openPopup }) => {
  const data = [
    {
      number: 1,
      image: imgConversation1,
      dialogues: [
        {
          speaker: "Sarah",
          text: "Dad! Are we going to the carnival that is coming to town?",
        },
        {
          speaker: "Jack",
          text: "That will be fun! Let’s go!",
        },
        {
          speaker: "Dad",
          text: "Not so fast. The man who trims the trees is coming tomorrow.",
        },
        {
          speaker: "Sarah",
          text: "Do you know what time?",
        },
      ],
    },
    {
      number: 2,
      image: imgConversation2,
      dialogues: [
        {
          speaker: "Dad",
          text: "Let’s see. He just said in the morning, but maybe I could call and ask him to come by first thing.",
        },
        {
          speaker: "Jack",
          text: "Yeah, and we could go to the carnival after the fun rides are open.",
        },
        {
          speaker: "Sarah",
          text: "Do you mean the rides that are crazy? You like to go on rides that are fast and twisty, don’t you, Jack?",
        },
      ],
    },
    {
      number: 3,
      image: imgConversation3,
      dialogues: [
        {
          speaker: "Dad",
          text: "It was just a couple of years ago I was taking you on the merry-go-round!",
        },
        {
          speaker: "Jack",
          text: "The merry-go-round is for small children who are still babies!",
        },
        {
          speaker: "Dad",
          text: "You used to beg me to take you on the giraffe!",
        },
      ],
    },
    {
      number: 4,
      image: imgConversation4,
      dialogues: [
        {
          speaker: "Sarah",
          text: "Oh, I still like the merry-go-round! I might go on a few of the faster rides with Jack, too.",
        },
        {
          speaker: "Sarah",
          text: "I’ll be the one who stays behind to take pictures.",
        },
        {
          speaker: "Dad",
          text: "Do you like fast rides, Dad?",
        },
        {
          speaker: "Dad",
          text: "No, I like to keep my feet on the ground… and my lunch in my stomach!",
        },
        {
          speaker: "Jack",
          text: "Well, that works out great! You can be the photographer.",
        },
      ],
    },
  ];
  const captionsExample = [
    {
      start: 0.219,
      end: 5.359,
      text: "Page 10, Conversation. Listen and read, then say",
    },
    {
      start: 5.359,
      end: 8.679,
      text: "Dad, are we going to the carnival that is coming to town?",
    },
    {
      start: 9.719,
      end: 12.219,
      text: "That will be fun. Let's go.",
    },
    {
      start: 12.219,
      end: 16.119,
      text: "Not so fast. The man who trims the trees is coming tomorrow.",
    },
    {
      start: 16.119,
      end: 17.579,
      text: "Do you know what time?",
    },
    {
      start: 17.579,
      end: 23.519,
      text: "Let's see. He just said in the morning, but maybe I could call and ask him to come by first thing.",
    },
    {
      start: 23.519,
      end: 27.399,
      text: "Yeah, and we could go to the carnival after the fun rides are open.",
    },
    {
      start: 28.439,
      end: 35.2,
      text: "Do you mean the rides that are crazy? You like to go on rides that are fast and twisty, don't you, Jack?",
    },
    {
      start: 35.2,
      end: 39.559,
      text: "It was just a couple of years ago I was taking you on the merry-go-round.",
    },
    {
      start: 39.559,
      end: 44.34,
      text: "The merry-go-round is for small children who are still babies.",
    },
    {
      start: 44.34,
      end: 47.359,
      text: "You used to beg me to take you on the giraffe.",
    },
    {
      start: 47.36,
      end: 55.139,
      text: "Oh, I still like the merry-go-round. I might go on a few of the faster rides with Jack, too.",
    },
    {
      start: 55.139,
      end: 58.199,
      text: "I'll be the one who stays behind to take pictures.",
    },
    {
      start: 58.199,
      end: 60.779,
      text: "Do you like fast rides, Dad?",
    },
    {
      start: 60.779,
      end: 65.339,
      text: "No, I like to keep my feet on the ground, and my lunch in my stomach.",
    },
    {
      start: 65.339,
      end: 68.839,
      text: "Well, that works out great. You can be the photographer.",
    },
  ];
  const captionTimings = [
    [
      captionsExample[1],
      captionsExample[2],
      captionsExample[3],
      captionsExample[4], // 🔥 هاي أضفها
    ],
    [captionsExample[5], captionsExample[6], captionsExample[7]],
    [captionsExample[8], captionsExample[9], captionsExample[10]],
    [
      captionsExample[11],
      captionsExample[12],
      captionsExample[13],
      captionsExample[14],
      captionsExample[15],
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
    [
      filteredSegments[7]?.words || [],
      filteredSegments[8]?.words || [],
      filteredSegments[9]?.words || [],
    ],
    [
      filteredSegments[10]?.words || [],
      filteredSegments[11]?.words || [],
      filteredSegments[12]?.words || [],
      filteredSegments[13]?.words || [],
      filteredSegments[14]?.words || [],
    ],
  ];
  return (
    <div
      className="poster-wrapper"
      style={{ backgroundImage: `url(${page_1})` }}
    >
      <div
        className="headset-icon-CD-page3-p hover:scale-110 transition"
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

export default Posters_Page3;
